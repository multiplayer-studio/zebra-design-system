#!/usr/bin/env node
/**
 * tokens/  ->  CSS custom properties, with theme scopes that actually work.
 *
 *   node build-tokens-css.mjs [tokensDir] [outDir]
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
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const TOKENS = process.argv[2] || join(HERE, "../../../tokens");
const OUT = process.argv[3] || join(HERE, "../src/tokens");

const manifest = JSON.parse(readFileSync(join(TOKENS, "manifest.json"), "utf8"));
const read = (rel) => JSON.parse(readFileSync(join(TOKENS, rel), "utf8"));
const slug = (s) => s.trim().toLowerCase().replace(/[\s/]+/g, "-");

const varName = (collection, path, prefixed) =>
  "--" + (prefixed ? slug(collection) + "-" : "") +
  path.replace(/[\s/]+/g, "-").replace(/-+/g, "-").toLowerCase();

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
const expr = (leaf) => {
  const m = /^\{([^}]+)\}$/.exec(String(leaf.$value));
  if (!m) return { literal: String(leaf.$value) };
  const [c, ...rest] = m[1].split(".");
  return collectionOf.has(c) ? { ref: K(c, rest.join("/")) } : { literal: String(leaf.$value) };
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
// A collection with >1 mode is an axis. One whose modes are Light/Dark is the
// theme axis (class `mode-*`); any other is a breakpoint axis (`bp-*`).
// Derived, not hard-coded, so a differently shaped file still works.
const multi = manifest.collections.filter((c) => c.modes.length > 1);
const themeAxis = multi.find((c) => c.modes.every((m) => ["light", "dark"].includes(slug(m)))) ?? null;
const bpAxes = multi.filter((c) => c !== themeAxis);

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
  return d.literal !== undefined ? d.literal : resolve(d.ref, ctx, depth + 1);
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
const nameOf = (key) => { const [c, p] = parts(key); return varName(c, p, isPrefixed(c)); };
const cssValue = (key, ctx) => {
  const d = declFor(key, ctx);
  return d.literal !== undefined ? d.literal : `var(${nameOf(d.ref)})`;
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
    `:root {\n${keys.map((k) => `  ${nameOf(k)}: ${cssValue(k, baseCtx)};`).join("\n")}\n}\n`);
}

// A scope must declare not just what IT changes, but everything any sibling
// scope in the same family changes — otherwise nesting one scope inside another
// leaves the outer scope's values showing through. `.mode-light` inside
// `.mode-dark` is the obvious case: its own diff against base is empty, so
// without this it would emit nothing and never restore light.
const scopes = [];
const push = (family, selectors, ctx, label) => {
  scopes.push({ family, selectors, ctx, label, changed: allKeys.filter((k) => resolve(k, ctx) !== baseResolved.get(k)) });
};

for (const c of bpAxes)
  for (const m of c.modes)
    if (m !== c.defaultMode)
      push(`bp:${c.name}`, [`.bp-${slug(m)}`], { modes: { ...defaultModes, [c.name]: m }, ext: null }, `${c.name} = ${m}`);

// Colour family: the theme axis and every extension share one affected set, so
// any of them can be nested inside any other and still fully re-theme.
if (themeAxis)
  for (const m of themeAxis.modes)
    push("colour", [`.mode-${slug(m)}`], { modes: { ...defaultModes, [themeAxis.name]: m }, ext: null },
      `${themeAxis.name} = ${m}`);

for (const eslug of extensions.keys()) {
  push("colour", [`.ext-${eslug}`], { modes: defaultModes, ext: eslug }, `extension ${eslug}`);
  if (!themeAxis) continue;
  for (const m of themeAxis.modes) {
    const mc = `mode-${slug(m)}`;
    // The three ways the classes can meet: same element, mode above the
    // extension, extension above the mode.
    push("colour", [`.ext-${eslug}.${mc}`, `.${mc} .ext-${eslug}`, `.ext-${eslug} .${mc}`],
      { modes: { ...defaultModes, [themeAxis.name]: m }, ext: eslug },
      `extension ${eslug} + ${themeAxis.name} = ${m}`);
  }
}

// Widen every scope to its family's union, then drop scopes that still say
// nothing (a breakpoint mode identical to the default, for example).
const universe = new Map();
for (const s of scopes) {
  const u = universe.get(s.family) ?? new Set();
  s.changed.forEach((k) => u.add(k));
  universe.set(s.family, u);
}
for (const s of scopes) s.changed = [...universe.get(s.family)].sort();
const live = scopes.filter((s) => s.changed.length);
scopes.length = 0; scopes.push(...live);

// An extension that overrode a breakpoint-varying collection would need the
// cross product of both axes; say so rather than emit something half-right.
for (const [eslug, e] of extensions) {
  const touched = new Set([...Object.keys(e.always), ...Object.values(e.byMode).flatMap(Object.keys)].map((k) => parts(k)[0]));
  const clash = bpAxes.filter((c) => touched.has(c.name));
  if (clash.length) console.warn(`  WARNING extension "${eslug}" overrides ${clash.map((c) => c.name).join(", ")}, which also varies by breakpoint. Emitted for the default breakpoint only.`);
}

write("themes.css",
  HEAD("Theme scopes",
    "Each block re-declares every token whose value changes in that scope, dependents\n" +
    "   included — a custom property substitutes where it is declared, not where it is\n" +
    "   used, so a 'redundant looking' line here is what makes theming work at all.") +
  scopes.map(({ selectors, ctx, label, changed }) =>
    `/* ${label} — ${changed.length} tokens */\n${selectors.join(",\n")} {\n` +
    changed.map((k) => `  ${nameOf(k)}: ${cssValue(k, ctx)};`).join("\n") + `\n}\n`).join("\n"));

// ---------- webfonts ------------------------------------------------------
{
  const fams = allKeys.filter((k) => /font family\//i.test(parts(k)[1])).map((k) => baseResolved.get(k));
  const W = { thin: 100, extralight: 200, light: 300, regular: 400, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
  const weights = [...new Set(allKeys.filter((k) => /font weight\//i.test(parts(k)[1]))
    .map((k) => W[String(baseResolved.get(k)).toLowerCase().replace(/[^a-z]/g, "")]).filter(Boolean))].sort((a, b) => a - b);
  const GOOGLE = { "IBM Plex Sans": "IBM+Plex+Sans", "IBM Plex Mono": "IBM+Plex+Mono", "IBM Plex Serif": "IBM+Plex+Serif" };
  const hosted = [...new Set(fams.filter((f) => GOOGLE[f]))];
  const selfHost = [...new Set(fams.filter((f) => !GOOGLE[f]))];
  let out = HEAD("Webfonts", "Derived from the font family and weight tokens.");
  for (const f of hosted)
    out += `/* ${f} — weights ${weights.join(", ")} */\n@import url("https://fonts.googleapis.com/css2?family=${GOOGLE[f]}:wght@${weights.join(";")}&display=swap");\n\n`;
  for (const f of selfHost)
    out += `/* ${f} is not on Google Fonts and must be self-hosted; add its @font-face\n   blocks here, or tokens naming it fall back down the stack. */\n\n`;
  out += `/* Production: prefer self-hosting, or preconnect + <link> in the document head —\n   an @import is render-blocking. */\n`;
  write("fonts.css", out);
  console.log(`fonts: ${hosted.join(", ") || "none"} @ ${weights.join("/")}${selfHost.length ? ` · self-host: ${selfHost.join(", ")}` : ""}`);
}

write("index.css", HEAD("All layers, in cascade order") +
  ["fonts", ...manifest.collections.map((c) => slug(c.name)), "themes"].map((n) => `@import "./${n}.css";`).join("\n") + "\n");

console.log(`collections: ${manifest.collections.map((c) => `${c.name}${isPrefixed(c.name) ? "" : "*"}`).join(", ")}   (* = public, unprefixed)`);
console.log(`theme axis: ${themeAxis ? themeAxis.name : "none"} · breakpoint axes: ${bpAxes.map((c) => c.name).join(", ") || "none"} · extensions: ${[...extensions.keys()].join(", ")}`);
for (const s of scopes) console.log(`  ${s.selectors[0].padEnd(32)} ${String(s.changed.length).padStart(4)} tokens`);
console.log("wrote:", written.join(", "));
