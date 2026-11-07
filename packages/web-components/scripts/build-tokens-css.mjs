#!/usr/bin/env node
/**
 * tokens/  ->  CSS custom properties, with theme scopes that actually work.
 *
 *   node build-tokens-css.mjs [tokensDir] [outDir] [--profile=zeta] [--overrides=file.json] [--attributes]
 *
 * --profile picks the theme selectors. The default is the class vocabulary
 * this package and react-baseui use (.mode-dark, .ext-companion, .bp-mobile).
 * "zeta" is packages/zeta-web's attribute vocabulary: [data-theme="dark"],
 * [data-brand="companion"], [data-breakpoint="mobile"], plus the OS dark
 * preference on :root, as its legacy tokens do.
 *
 * --attributes adds a data attribute beside each class, so a scope can be set either
 * way and the two mix: data-theme-mode="dark", data-theme-ext="companion",
 * data-size-mode="compact" (Desktop Compact). Leaving one off is its default, so
 * data-theme-ext="base" and data-size-mode="desktop" select nothing.
 *
 * --overrides layers a package's own values over tokens/, which stays as Figma
 * exported it. Every value is an alias to a token that exists:
 *
 *     {
 *       "themeModes": { "AAA Light": { "extends": "Light", "tokens": { "ink/low": "{primitives.color.neutral.cool.80}" } } },
 *       "values": { "size": { "Desktop Compact": { "control/md": "{primitives.scale.11}" } } }
 *     }
 *
 * themeModes adds a mode to the theme axis, starting from the mode it extends, or
 * changes one tokens/ already has. values changes tokens in an existing mode. An
 * override that tokens/ now matches is reported, so the file can shrink.
 *
 * A theme mode past Light and Dark, from either source, gets a scope with each
 * extension and claims the mode it extends inside it, so a component locked to Dark
 * stays in its family.
 *
 * WHY THIS IS NOT A FLAT DUMP
 * ---------------------------
 * Custom properties substitute at computed-value time on the element that
 * declares them. Given
 *
 *     :root { --palette-brand: blue; --semantic-bg: var(--palette-brand); }
 *     .ext  { --palette-brand: red; }
 *
 * an element inside .ext computes --semantic-bg as BLUE: it inherits the value
 * already substituted at :root. Re-pointing a dependency deeper in the tree
 * does not re-resolve its dependents. (Verified in Chrome.)
 *
 * So for every theme scope we emit the full dependency CLOSURE: every token
 * whose resolved value differs from base, re-declared in that scope so it
 * substitutes again there. The closure comes from the token graph, so this
 * adapts to whatever collections, modes and extensions Figma ships — nothing
 * is hard-coded to "primitives / palette / semantics".
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ARGS = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const PROFILE = (process.argv.find((a) => a.startsWith("--profile=")) || "--profile=classes").slice(10);
const TOKENS = ARGS[0] || join(HERE, "../../../tokens");
const OUT = ARGS[1] || join(HERE, "../src/tokens");

// Theme selectors per profile. `osDark` adds a prefers-color-scheme scope.
const SEL = PROFILE === "zeta"
  ? { bp: (m) => `[data-breakpoint="${m}"]`, mode: (m) => `[data-theme="${m}"]`, ext: (e) => `[data-brand="${e}"]`, osDark: true }
  : { bp: (m) => `.bp-${m}`, mode: (m) => `.mode-${m}`, ext: (e) => `.ext-${e}`, osDark: false };
if (PROFILE !== "zeta" && PROFILE !== "classes") throw new Error(`unknown --profile "${PROFILE}" (classes | zeta)`);
const ATTRIBUTES = process.argv.includes("--attributes");
const OVERRIDES_FILE = (process.argv.find((a) => a.startsWith("--overrides=")) ?? "--overrides=").slice(12);

const manifest = JSON.parse(readFileSync(join(TOKENS, "manifest.json"), "utf8"));
const read = (rel) => JSON.parse(readFileSync(join(TOKENS, rel), "utf8"));
const slug = (s) => s.trim().toLowerCase().replace(/[\s/]+/g, "-");

// A segment that is a negative number keeps its sign as "minus-": collapsing
// "scale/-5" to "scale-5" would collide with "scale/5", and the later
// declaration would silently win.
const varName = (collection, path, prefixed) =>
  "--" + (prefixed ? slug(collection) + "-" : "") +
  path.replace(/(^|[\s/])-(?=\d)/g, "$1minus-")
    .replace(/[\s/]+/g, "-").replace(/-+/g, "-").toLowerCase();

// ---------- load the graph ------------------------------------------------
function* leaves(node, path = []) {
  for (const [k, v] of Object.entries(node)) {
    if (k === "$root") { yield [path.join("/"), v]; continue; }
    if (!v || typeof v !== "object") continue;
    if ("$value" in v) yield [[...path, k].join("/"), v];
    else yield* leaves(v, [...path, k]);
  }
}

const collectionOf = new Map(manifest.collections.map((c) => [c.name, c]));
const fileFor = (c, mode) => c.files.find((f) => f.endsWith(`/${slug(mode)}.json`));

// A token key is "<collection>::<path>"; neither part contains "::".
const SEP = "::";
const K = (c, p) => `${c}${SEP}${p}`;
const parts = (k) => { const i = k.indexOf(SEP); return [k.slice(0, i), k.slice(i + SEP.length)]; };

const tokens = new Map(); // key -> { collection, path, modes: { [mode]: expr } }
// DTCG allows a weight keyword ("medium"); CSS does not, and an invalid font-weight is dropped at computed-value
// time, so every weight token is written as its number.
const WEIGHT = { thin: 100, extralight: 200, light: 300, regular: 400, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
const literalOf = (leaf) => {
  const v = String(leaf.$value);
  if (leaf.$type === "fontWeight") return String(WEIGHT[v.toLowerCase().replace(/[^a-z]/g, "")] ?? v);
  return v;
};
// An alias at an opacity (com.figma.aliasOpacity) keeps its reference and carries the alpha alongside it.
const expr = (leaf) => {
  const m = /^\{([^}]+)\}$/.exec(String(leaf.$value));
  if (!m) return { literal: literalOf(leaf) };
  const [c, ...rest] = m[1].split(".");
  if (!collectionOf.has(c)) return { literal: literalOf(leaf) };
  const opacity = leaf.$extensions?.["com.figma"]?.aliasOpacity;
  return opacity === undefined ? { ref: K(c, rest.join("/")) } : { ref: K(c, rest.join("/")), opacity };
};

for (const c of manifest.collections) {
  for (const mode of c.modes) {
    const f = fileFor(c, mode);
    if (!f) continue;
    for (const [path, leaf] of leaves(read(f))) {
      const k = K(c.name, path);
      if (!tokens.has(k)) tokens.set(k, { collection: c.name, path, modes: {} });
      tokens.get(k).modes[mode] = expr(leaf);
    }
  }
}

// extensions: slug -> { always: {key: expr}, byMode: { [parentMode]: {key: expr} } }
const extensions = new Map();
for (const e of manifest.extensions) {
  const ext = extensions.get(e.slug) ?? { slug: e.slug, always: {}, byMode: {} };
  for (const f of e.files) {
    const modeSlug = f.split("/").pop().replace(/\.json$/, "");
    const parentSlug = f.split("/")[2];
    const pc = manifest.collections.find((c) => slug(c.name) === parentSlug);
    if (!pc) continue;
    const parentMode = pc.modes.find((m) => slug(m) === modeSlug);
    const bucket = parentMode && pc.modes.length > 1
      ? (ext.byMode[parentMode] ??= {})
      : ext.always;
    for (const [path, leaf] of leaves(read(f))) bucket[K(pc.name, path)] = expr(leaf);
  }
  extensions.set(e.slug, ext);
}

// ---------- axes ----------------------------------------------------------
// A collection with >1 mode is an axis. One holding Light and Dark is the theme
// axis (class `mode-*`), whatever other modes it has; any other is a breakpoint
// axis (`bp-*`). Derived, not hard-coded, so a differently shaped file still works.
const multi = manifest.collections.filter((c) => c.modes.length > 1);
const isBaseTheme = (m) => ["light", "dark"].includes(slug(m));
const themeAxis = multi.find((c) => c.modes.filter(isBaseTheme).length === 2) ?? null;
const bpAxes = multi.filter((c) => c !== themeAxis);

// ---------- overrides -----------------------------------------------------
const overrides = OVERRIDES_FILE ? JSON.parse(readFileSync(OVERRIDES_FILE, "utf8")) : {};
const overridden = (key, alias, base) => {
  const e = expr({ $value: alias, $type: "" });
  if (!tokens.has(key)) throw new Error(`overrides: no token ${key}`);
  if (!e.ref || !tokens.has(e.ref)) throw new Error(`overrides: ${key} must alias a token that exists, got ${alias}`);
  if (base?.ref === e.ref) console.warn(`  overrides: ${key} already has this value in tokens/, remove it`);
  return { ...e, opacity: base?.opacity };
};
for (const [collection, byMode] of Object.entries(overrides.values ?? {})) {
  for (const [mode, paths] of Object.entries(byMode)) {
    if (!collectionOf.get(collection)?.modes.includes(mode)) throw new Error(`overrides: no mode ${collection} / ${mode}`);
    for (const [path, alias] of Object.entries(paths)) {
      const key = K(collection, path);
      tokens.get(key).modes[mode] = overridden(key, alias, tokens.get(key)?.modes[mode]);
    }
  }
}
// Any theme mode past Light and Dark, from tokens/ or from --overrides. One from tokens/ extends the mode its name says.
const added = new Map((themeAxis?.modes ?? []).filter((m) => !isBaseTheme(m))
  .map((m) => [m, { extends: themeAxis.modes.find((b) => slug(b) === (/dark/i.test(m) ? "dark" : "light")) }]));
for (const [mode, o] of Object.entries(overrides.themeModes ?? {})) added.set(mode, { ...added.get(mode), ...o });
const addedThemeModes = [...added];
for (const [mode, { extends: base, tokens: paths = {} }] of addedThemeModes) {
  if (!themeAxis?.modes.includes(base)) throw new Error(`overrides: theme mode ${mode} extends unknown mode ${base}`);
  for (const [path, alias] of Object.entries(paths)) {
    const key = K(themeAxis.name, path);
    tokens.get(key).modes[mode] = overridden(key, alias, tokens.get(key)?.modes[mode] ?? tokens.get(key)?.modes[base]);
  }
  for (const t of tokens.values())
    if (t.collection === themeAxis.name) t.modes[mode] ??= t.modes[base];
}

// ---------- resolution ----------------------------------------------------
// ctx = { modes: { [collection]: mode }, ext: slug | null }
const declFor = (key, ctx) => {
  const t = tokens.get(key);
  if (!t) return null;
  if (ctx.ext) {
    const e = extensions.get(ctx.ext);
    const pm = ctx.modes[t.collection];
    if (e && e.byMode[pm] && e.byMode[pm][key]) return e.byMode[pm][key];
    if (e && e.always[key]) return e.always[key];
  }
  return t.modes[ctx.modes[t.collection]] ?? t.modes[collectionOf.get(t.collection).defaultMode] ?? null;
};
const resolve = (key, ctx, depth = 0) => {
  if (depth > 24) return "<cycle>";
  const d = declFor(key, ctx);
  if (!d) return "<missing>";
  if (d.literal !== undefined) return d.literal;
  const v = resolve(d.ref, ctx, depth + 1);
  return d.opacity === undefined ? v : `${v}@${d.opacity}`;
};

const defaultModes = Object.fromEntries(manifest.collections.map((c) => [c.name, c.defaultMode]));
const baseCtx = { modes: defaultModes, ext: null };
const allKeys = [...tokens.keys()];
const baseResolved = new Map(allKeys.map((k) => [k, resolve(k, baseCtx)]));

// A collection that nothing OUTSIDE itself references is the public API and
// stays unprefixed. Self-references don't count: a semantic token pointing at
// another semantic token (border/transparent -> interactive/ghost/background/
// default) must not demote the whole layer to an internal one.
const referenced = new Set();
const noteRefs = (bucket, from) => {
  for (const [key, d] of Object.entries(bucket)) {
    if (!d.ref) continue;
    const target = parts(d.ref)[0];
    const owner = from ?? parts(key)[0];
    if (target !== owner) referenced.add(target);
  }
};
for (const t of tokens.values()) noteRefs(t.modes, t.collection);
for (const e of extensions.values()) {
  noteRefs(e.always, null);
  for (const b of Object.values(e.byMode)) noteRefs(b, null);
}
const isPrefixed = (c) => referenced.has(c);
// --shadowed=a,b: names another token set in the same page also defines (zeta-web's legacy set wins on them).
// Each is also emitted as --zebra-<name>, declared wherever the original is, so a component can reach the Zebra
// value without renaming the token or disturbing the legacy one.
const SHADOWED = new Set((process.argv.find((a) => a.startsWith("--shadowed=")) ?? "--shadowed=").slice(11).split(",").filter(Boolean).map((n) => n.replace(/^--/, "")));
const nameOf = (key) => { const [c, p] = parts(key); return varName(c, p, isPrefixed(c)); };
const cssValue = (key, ctx) => {
  const d = declFor(key, ctx);
  if (d.literal !== undefined) return d.literal;
  const v = `var(${nameOf(d.ref)})`;
  return d.opacity === undefined ? v : `color-mix(in srgb, ${v} ${+(d.opacity * 100).toFixed(1)}%, transparent)`;
};
const decls = (key, ctx) => {
  const n = nameOf(key), v = cssValue(key, ctx);
  return SHADOWED.has(n.slice(2)) ? [`  ${n}: ${v};`, `  --zebra-${n.slice(2)}: ${v};`] : [`  ${n}: ${v};`];
};

// ---------- emit ----------------------------------------------------------
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
const written = [];
const write = (n, body) => { writeFileSync(join(OUT, n), body); written.push(n); };
const HEAD = (t, note) =>
  `/* ${t}\n   Generated from tokens/ by scripts/build-tokens-css.mjs — do not edit by hand.\n${note ? "   " + note + "\n" : ""}*/\n\n`;

for (const c of manifest.collections) {
  const keys = allKeys.filter((k) => parts(k)[0] === c.name).sort();
  if (!keys.length) continue;
  write(`${slug(c.name)}.css`,
    HEAD(`${c.name} — ${c.defaultMode}`,
      isPrefixed(c.name) ? "Referenced by other layers, so prefixed." : "Public API; use these names in components.") +
    `:root {\n${keys.flatMap((k) => decls(k, baseCtx)).join("\n")}\n}\n`);
}

// A scope must declare not just what IT changes, but everything any sibling
// scope in the same family changes — otherwise nesting one scope inside another
// leaves the outer scope's values showing through. `.mode-light` inside
// `.mode-dark` is the obvious case: its own diff against base is empty, so
// without this it would emit nothing and never restore light.
const scopes = [];
const push = (family, selectors, ctx, label, media) => {
  scopes.push({ family, selectors, ctx, label, media, changed: allKeys.filter((k) => resolve(k, ctx) !== baseResolved.get(k)) });
};

for (const c of bpAxes)
  for (const m of c.modes)
    if (m !== c.defaultMode)
      push(`bp:${c.name}`, [SEL.bp(slug(m))], { modes: { ...defaultModes, [c.name]: m }, ext: null }, `${c.name} = ${m}`);

// Colour family: the theme axis and every extension share one affected set, so
// any of them can be nested inside any other and still fully re-theme.
if (themeAxis) {
  // The OS preference first, so an explicit theme scope later in the file
  // always wins. Plain :root, as zeta-web's legacy dark tokens use, so the
  // import order decides between the two sets rather than specificity.
  const dark = themeAxis.modes.find((m) => slug(m) === "dark");
  if (SEL.osDark && dark && dark !== themeAxis.defaultMode)
    push("colour", [":root"], { modes: { ...defaultModes, [themeAxis.name]: dark }, ext: null },
      `${themeAxis.name} = ${dark}, from prefers-color-scheme`, "(prefers-color-scheme: dark)");
  for (const m of themeAxis.modes.filter(isBaseTheme))
    push("colour", [SEL.mode(slug(m))], { modes: { ...defaultModes, [themeAxis.name]: m }, ext: null },
      `${themeAxis.name} = ${m}`);
}

for (const eslug of extensions.keys()) {
  push("colour", [SEL.ext(eslug)], { modes: defaultModes, ext: eslug }, `extension ${eslug}`);
  if (!themeAxis) continue;
  for (const m of [...themeAxis.modes.filter(isBaseTheme), ...added.keys()]) {
    const mc = SEL.mode(slug(m)), ec = SEL.ext(eslug);
    // The three ways the selectors can meet: same element, mode above the
    // extension, extension above the mode.
    push("colour", [`${ec}${mc}`, `${mc} ${ec}`, `${ec} ${mc}`],
      { modes: { ...defaultModes, [themeAxis.name]: m }, ext: eslug },
      `extension ${eslug} + ${themeAxis.name} = ${m}`);
  }
}

// A theme mode past Light and Dark also claims the mode it extends inside it, so a component locked to Dark stays in
// its family.
if (themeAxis && addedThemeModes.length) {
  const within = `:is(${addedThemeModes.map(([m]) => SEL.mode(slug(m))).join(", ")})`;
  for (const [m, { extends: base }] of addedThemeModes)
    push("colour", [SEL.mode(slug(m)), `${within} ${SEL.mode(slug(base))}`],
      { modes: { ...defaultModes, [themeAxis.name]: m }, ext: null }, `${themeAxis.name} = ${m}`);
}

// Widen every scope to its family's union, then drop scopes that still say
// nothing (a breakpoint mode identical to the default, for example).
const universe = new Map();
for (const s of scopes) {
  const u = universe.get(s.family) ?? new Set();
  s.changed.forEach((k) => u.add(k));
  universe.set(s.family, u);
}
// A breakpoint collection is the exception. A colour scope says nothing about size, and an extension that overrides
// size (condensed) puts size in the colour family's universe. Widening to it would make every mode scope reset size
// to Desktop's values, so anything under .mode-dark would ignore a .bp-* scope above it.
const breakpointOwned = new Set(bpAxes.map((c) => c.name));
for (const s of scopes) {
  const own = new Set(s.changed);
  s.changed = [...universe.get(s.family)].filter((k) => s.family !== "colour" || own.has(k) || !breakpointOwned.has(parts(k)[0])).sort();
}
const live = scopes.filter((s) => s.changed.length);
scopes.length = 0; scopes.push(...live);

// A class and its attribute are the same scope, so every selector is written with each of them in every position: a
// component locked with .mode-dark still has to meet data-theme-ext on an ancestor.
const attributeOf = (kind, value) => {
  if (kind === "mode") return `[data-theme-mode="${value}"]`;
  if (kind === "ext") return `[data-theme-ext="${value}"]`;
  return `[data-size-mode="${value.replace(/^desktop-/, "")}"]`;
};
const withAttributes = (selector) => {
  let forms = [""];
  for (const piece of selector.split(/(\.(?:mode|ext|bp)-[a-z0-9-]+)/)) {
    const m = /^\.(mode|ext|bp)-(.+)$/.exec(piece);
    forms = forms.flatMap((f) => (m ? [f + piece, f + attributeOf(m[1], m[2])] : [f + piece]));
  }
  return forms;
};
if (ATTRIBUTES) for (const s of scopes) s.selectors = s.selectors.flatMap(withAttributes);

// An extension that overrode a breakpoint-varying collection would need the
// cross product of both axes; say so rather than emit something half-right.
for (const [eslug, e] of extensions) {
  const touched = new Set([...Object.keys(e.always), ...Object.values(e.byMode).flatMap(Object.keys)].map((k) => parts(k)[0]));
  const clash = bpAxes.filter((c) => touched.has(c.name));
  if (clash.length) console.warn(`  WARNING extension "${eslug}" overrides ${clash.map((c) => c.name).join(", ")}, which also varies by breakpoint. Emitted for the default breakpoint only.`);
}

// ---------- text styles ---------------------------------------------------
// One CSS font shorthand per Figma text style (tokens/base/text-styles.json), built from the variables the style
// binds. Letter spacing has no place in the shorthand, so the class sets it beside. A shorthand is re-declared in
// every scope where one of its parts changes, for the same reason the tokens themselves are.
const textStyles = [];
if (manifest.textStyles?.file && existsSync(join(TOKENS, manifest.textStyles.file))) {
  const part = (v) => {
    const e = expr({ $value: v, $type: "" });
    return e.ref ? { key: e.ref, css: `var(${nameOf(e.ref)})` } : { css: e.literal };
  };
  for (const [path, leaf] of leaves(read(manifest.textStyles.file))) {
    if (leaf.$type !== "typography") continue;
    const p = Object.fromEntries(Object.entries(leaf.$value).map(([k, v]) => [k, part(v)]));
    const name = "--text-" + path.replace(/[\s/]+/g, "-").toLowerCase();
    textStyles.push({
      name, cls: name.slice(2), keys: Object.values(p).map((x) => x.key).filter(Boolean),
      value: `${p.fontWeight.css} ${p.fontSize.css}/${p.lineHeight.css} ${p.fontFamily.css}, system-ui, sans-serif`,
      letterSpacing: p.letterSpacing.css,
    });
  }
  write("text-styles.css",
    HEAD("Text styles", "One font shorthand per Figma text style. Use var(--text-<style>) in a component, or the class in a page.") +
    `:root {\n${textStyles.map((t) => `  ${t.name}: ${t.value};`).join("\n")}\n}\n\n` +
    textStyles.map((t) => `.${t.cls} {\n  font: var(${t.name});\n  letter-spacing: ${t.letterSpacing};\n}\n`).join("\n"));
}
const stylesIn = (changed) => textStyles.filter((t) => t.keys.some((k) => changed.includes(k)));

write("themes.css",
  HEAD("Theme scopes",
    "Each block re-declares every token whose value changes in that scope, dependents\n" +
    "   included — a custom property substitutes where it is declared, not where it is\n" +
    "   used, so a 'redundant looking' line here is what makes theming work at all.") +
  scopes.map(({ selectors, ctx, label, changed, media }) => {
    const restyled = stylesIn(changed).map((t) => `  ${t.name}: ${t.value};`);
    const block = `${selectors.join(",\n")} {\n` + [...changed.flatMap((k) => decls(k, ctx)), ...restyled].join("\n") + `\n}\n`;
    return `/* ${label} — ${changed.length} tokens */\n` +
      (media ? `@media ${media} {\n${block.replace(/^/gm, "  ").replace(/ +$/gm, "")}}\n` : block);
  }).join("\n"));

// ---------- webfonts ------------------------------------------------------
{
  const fams = allKeys.filter((k) => /font family\//i.test(parts(k)[1])).map((k) => baseResolved.get(k));
  const W = { thin: 100, extralight: 200, light: 300, regular: 400, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
  const weights = [...new Set(allKeys.filter((k) => /font weight\//i.test(parts(k)[1]))
    .map((k) => { const v = String(baseResolved.get(k)); return /^\d+$/.test(v) ? Number(v) : W[v.toLowerCase().replace(/[^a-z]/g, "")]; })
    .filter(Boolean))].sort((a, b) => a - b);
  const GOOGLE = { "IBM Plex Sans": "IBM+Plex+Sans", "IBM Plex Mono": "IBM+Plex+Mono", "IBM Plex Serif": "IBM+Plex+Serif" };
  const hosted = [...new Set(fams.filter((f) => GOOGLE[f]))];
  const selfHost = [...new Set(fams.filter((f) => !GOOGLE[f]))];
  let out = HEAD("Webfonts", "Derived from the font family and weight tokens, plus the platform default for <body>.");
  // --fonts=self uses the files fetch-fonts.mjs downloaded into tokens/fonts instead of the Google Fonts import.
  const selfFonts = process.argv.includes("--fonts=self") && existsSync(join(TOKENS, "fonts", "fonts.css"));
  if (selfFonts) {
    const dest = join(OUT, "fonts");
    cpSync(join(TOKENS, "fonts"), dest, { recursive: true, filter: (f) => !f.endsWith("manifest.json") });
    out += `@import "./fonts/fonts.css";\n\n`;
    hosted.length = 0;
  }
  for (const f of hosted)
    out += `/* ${f} — weights ${weights.join(", ")} */\n@import url("https://fonts.googleapis.com/css2?family=${GOOGLE[f]}:wght@${weights.join(";")}&display=swap");\n\n`;
  for (const f of selfHost)
    out += `/* ${f} is not on Google Fonts and must be self-hosted; add its @font-face\n   blocks here, or tokens naming it fall back down the stack. */\n\n`;
  out += `/* Production: prefer self-hosting, or preconnect + <link> in the document head —\n   an @import is render-blocking. */\n\n`;
  // Every platform's default running text: body/medium is the type ramp's own
  // base reading size, foreground/primary the base ink colour. Without this,
  // a page that only imports the token layer (no component library styling)
  // renders with the browser's own black-on-serif default the moment text
  // sits outside a component — which is exactly what a design system's own
  // token CSS should not require a consumer to patch by hand.
  out += `body {\n` +
    `  font-family: var(--body-medium-font-family), system-ui, sans-serif;\n` +
    `  font-size: var(--body-medium-font-size);\n` +
    `  font-weight: var(--body-medium-font-weight);\n` +
    `  line-height: var(--body-medium-line-height);\n` +
    `  letter-spacing: var(--body-medium-letter-spacing);\n` +
    `  color: var(--foreground-primary);\n` +
    `}\n`;
  write("fonts.css", out);
  console.log(`fonts: ${hosted.join(", ") || "none"} @ ${weights.join("/")}${selfHost.length ? ` · self-host: ${selfHost.join(", ")}` : ""}`);
}

if (SHADOWED.size) {
  const found = allKeys.map(nameOf).filter((n) => SHADOWED.has(n.slice(2)));
  const missing = [...SHADOWED].filter((n) => !found.includes(`--${n}`));
  console.log(`shadowed: ${found.length} aliased as --zebra-*${missing.length ? ` · not in tokens: ${missing.join(", ")}` : ""}`);
}

write("index.css", HEAD("All layers, in cascade order") +
  ["fonts", ...manifest.collections.map((c) => slug(c.name)), ...(textStyles.length ? ["text-styles"] : []), "themes"]
    .map((n) => `@import "./${n}.css";`).join("\n") + "\n");

console.log(`collections: ${manifest.collections.map((c) => `${c.name}${isPrefixed(c.name) ? "" : "*"}`).join(", ")}   (* = public, unprefixed)`);
console.log(`theme axis: ${themeAxis ? themeAxis.name : "none"} · breakpoint axes: ${bpAxes.map((c) => c.name).join(", ") || "none"} · extensions: ${[...extensions.keys()].join(", ")}`);
for (const s of scopes) console.log(`  ${s.selectors[0].padEnd(32)} ${String(s.changed.length).padStart(4)} tokens`);
console.log("wrote:", written.join(", "));
