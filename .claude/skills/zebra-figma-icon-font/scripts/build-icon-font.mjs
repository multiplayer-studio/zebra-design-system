#!/usr/bin/env node
/**
 * Figma icon page -> icon fonts.
 *
 *   node build-icon-font.mjs --node 2046:6754 --out packages/icons [--limit N] [--dry-run]
 *
 * Read-only against Figma. Codepoints are append-only: see assignCodepoints().
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { SVGIcons2SVGFontStream } from "svgicons2svgfont";
import svg2ttf from "svg2ttf";
import ttf2woff2 from "ttf2woff2";
import svgpath from "svgpath";

// ---------- args ----------------------------------------------------------
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i < 0 ? d : argv[i + 1]; };
const flag = (n) => argv.includes(`--${n}`);

const NODE_ID = (arg("node") || "").replace("-", ":");
const OUT = resolve(arg("out", "packages/icons"));
const LIMIT = Number(arg("limit", 0)) || 0;
const ONLY_STYLES = (arg("styles", "") || "").split(",").filter(Boolean);
const DRY = flag("dry-run");
const NO_CACHE = flag("no-cache");
const PREFIX = arg("prefix", "zds-icon");
const FAMILY = arg("family", "ZdsIcons");
const EM = 1000;          // font units per em
const PUA_START = 0xe000; // Private Use Area

if (!NODE_ID) { console.error("--node <id> is required (e.g. --node 2046:6754)"); process.exit(1); }

// ---------- env -----------------------------------------------------------
// Walk up from the working directory, then from this script, looking for .env.
// The script is normally invoked from a package directory (pnpm run generate),
// not from the repo root, so resolving against cwd alone finds nothing.
function findEnv() {
  const starts = [process.cwd(), dirname(fileURLToPath(import.meta.url))];
  for (const start of starts) {
    let dir = resolve(start);
    for (let i = 0; i < 8; i++) {
      const f = join(dir, ".env");
      if (existsSync(f)) return f;
      const up = dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  }
  return null;
}
const envPath = findEnv();
if (envPath) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = /^\s*([A-Z_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
const FILE = process.env.FIGMA_FILE_KEY;
if (!TOKEN || !FILE) { console.error("FIGMA_PERSONAL_ACCESS_TOKEN and FIGMA_FILE_KEY must be set.\n" + (envPath ? `Read ${envPath}, but it is missing one of them.` : "No .env found walking up from the working directory or the script.")); process.exit(1); }

const api = async (path) => {
  const r = await fetch(`https://api.figma.com/v1/${path}`, { headers: { "X-Figma-Token": TOKEN } });
  if (!r.ok) {
    const body = await r.text();
    if (r.status === 403 && body.includes("scope")) {
      throw new Error(`403 from Figma. This endpoint needs the file_content:read scope.\n${body}`);
    }
    throw new Error(`${r.status} ${path}: ${body.slice(0, 300)}`);
  }
  return r.json();
};

// ---------- 1. discover ---------------------------------------------------
console.log(`Reading ${NODE_ID} from ${FILE}…`);
const doc = (await api(`files/${FILE}/nodes?ids=${NODE_ID.replace(":", "-")}&depth=6`)).nodes[NODE_ID]?.document;
if (!doc) throw new Error(`Node ${NODE_ID} not found`);

const icons = [];
(function walk(n, category) {
  // A frame that groups icons lends its name as the category.
  const cat = n.type === "FRAME" && n.children?.some((c) => c.type === "COMPONENT_SET" || c.type === "COMPONENT")
    ? n.name : category;
  if (n.type === "COMPONENT_SET") {
    const variants = (n.children || []).filter((c) => c.type === "COMPONENT").map((c) => {
      const m = /(?:^|,\s*)Style=([^,]+)/.exec(c.name);
      return { style: (m ? m[1] : "default").trim().toLowerCase(), id: c.id, figmaName: c.name };
    });
    icons.push({ figmaName: n.name, setId: n.id, category: category ?? null, variants });
    return;
  }
  if (n.type === "COMPONENT") { // a lone component, no style axis
    icons.push({ figmaName: n.name, setId: n.id, category: category ?? null, variants: [{ style: "default", id: n.id, figmaName: n.name }] });
    return;
  }
  for (const c of n.children || []) walk(c, cat);
})(doc, null);

if (!icons.length) throw new Error("No COMPONENT_SET or COMPONENT found under that node");

const styles = [...new Set(icons.flatMap((i) => i.variants.map((v) => v.style)))]
  .filter((s) => !ONLY_STYLES.length || ONLY_STYLES.includes(s)).sort();

console.log(`Found ${icons.length} icons, styles: ${styles.join(", ")}`);

// ---------- 2. names ------------------------------------------------------
const kebab = (s) => s.trim().toLowerCase()
  .replace(/[''"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

mkdirSync(OUT, { recursive: true });
const cpPath = join(OUT, "codepoints.json");
const store = existsSync(cpPath) ? JSON.parse(readFileSync(cpPath, "utf8")) : { glyphs: {}, nextCodepoint: PUA_START };
const bySetId = new Map(Object.entries(store.glyphs).filter(([, g]) => g.setId).map(([name, g]) => [g.setId, { name, ...g }]));

const collisions = [], renamed = [];
const taken = new Set(Object.keys(store.glyphs));
for (const icon of icons) {
  const prior = bySetId.get(icon.setId);
  if (prior) {                                    // known icon — name is frozen
    icon.name = prior.name;
    if (prior.figmaName !== icon.figmaName) renamed.push({ name: prior.name, was: prior.figmaName, now: icon.figmaName });
    continue;
  }
  let name = kebab(icon.figmaName);
  if (taken.has(name)) {                          // disambiguate once, then freeze
    const withCat = kebab(`${icon.category ?? "x"}-${icon.figmaName}`);
    collisions.push({ figmaName: icon.figmaName, category: icon.category, resolved: withCat });
    name = withCat;
    let n = 2; while (taken.has(name)) name = `${withCat}-${n++}`;
  }
  taken.add(name);
  icon.name = name;
}

// ---------- 3. codepoints (append-only) -----------------------------------
function assignCodepoints() {
  let next = store.nextCodepoint ?? PUA_START;
  const used = new Set(Object.values(store.glyphs).map((g) => g.codepoint));
  for (const icon of icons) {
    const existing = store.glyphs[icon.name];
    if (existing) { icon.codepoint = existing.codepoint; existing.retired = false; existing.setId = icon.setId; existing.figmaName = icon.figmaName; existing.category = icon.category; continue; }
    while (used.has(next)) next++;
    icon.codepoint = next;
    used.add(next);
    store.glyphs[icon.name] = { codepoint: next, setId: icon.setId, figmaName: icon.figmaName, category: icon.category, retired: false };
    next++;
  }
  store.nextCodepoint = next;
  const present = new Set(icons.map((i) => i.name));
  const missing = [];
  for (const [name, g] of Object.entries(store.glyphs)) {
    if (!present.has(name)) { g.retired = true; missing.push({ name, codepoint: g.codepoint }); }
  }
  return missing;
}
const missing = assignCodepoints();

const hex = (c) => c.toString(16).toUpperCase().padStart(4, "0");
const work = LIMIT ? icons.slice(0, LIMIT) : icons;

if (DRY) {
  console.log(`\nDRY RUN — nothing downloaded.`);
  console.log(`icons ${icons.length} · styles ${styles.join(",")} · glyphs ${icons.length * styles.length}`);
  console.log(`codepoints U+${hex(Math.min(...icons.map((i) => i.codepoint)))} … U+${hex(Math.max(...icons.map((i) => i.codepoint)))}`);
  if (collisions.length) console.log(`collisions (${collisions.length}):`, collisions.slice(0, 10));
  if (renamed.length) console.log(`renamed (${renamed.length}):`, renamed.slice(0, 10));
  if (missing.length) console.log(`missing/retired (${missing.length}):`, missing.slice(0, 10));
  const cats = {}; for (const i of icons) cats[i.category ?? "—"] = (cats[i.category ?? "—"] || 0) + 1;
  console.log("categories:", cats);
  process.exit(0);
}

// ---------- 4. export SVG -------------------------------------------------
const ids = [];
for (const icon of work) for (const v of icon.variants) if (styles.includes(v.style)) ids.push({ id: v.id, icon, style: v.style });

// Exported SVGs are cached on disk by node id. Normalisation and font build
// are the parts most likely to need another pass; re-downloading 1400 files to
// change a transform is pure waste.
const cacheDir = join(OUT, ".svg-cache");
mkdirSync(cacheDir, { recursive: true });
const cacheFile = (id) => join(cacheDir, `${id.replace(/[:/]/g, "_")}.svg`);
const svgs = new Map();
if (!NO_CACHE) {
  for (const { id } of ids) {
    const f = cacheFile(id);
    if (existsSync(f)) svgs.set(id, readFileSync(f, "utf8"));
  }
  if (svgs.size) console.log(`Reusing ${svgs.size} cached SVGs (--no-cache to refetch)`);
}
const need = ids.filter(({ id }) => !svgs.has(id));

if (need.length) {
console.log(`Requesting ${need.length} SVG exports…`);
const urls = {};
for (let i = 0; i < need.length; i += 80) {
  const batch = need.slice(i, i + 80);
  const res = await api(`images/${FILE}?ids=${batch.map((b) => b.id).join(",")}&format=svg`);
  Object.assign(urls, res.images);
  process.stdout.write(`\r  urls ${Object.keys(urls).length}/${need.length}`);
}
console.log();

let done = 0, failed = 0;
const pool = 12;
// The export URLs are served from S3, which can drop or rate-limit a
// connection part-way through a run of this size. Retry with backoff rather
// than losing a glyph to a transient network error.
const fetchText = async (u, tries = 4) => {
  for (let t = 0; t < tries; t++) {
    try {
      const r = await fetch(u);
      if (r.ok) return await r.text();
      if (r.status < 500 && r.status !== 429) return null;
    } catch { /* DNS or socket — retry */ }
    await new Promise((r) => setTimeout(r, 300 * 2 ** t));
  }
  return null;
};
await Promise.all(Array.from({ length: pool }, async (_, w) => {
  for (let i = w; i < need.length; i += pool) {
    const { id } = need[i];
    const u = urls[id];
    if (!u) { failed++; continue; }
    const text = await fetchText(u);
    if (text) { svgs.set(id, text); writeFileSync(cacheFile(id), text); } else failed++;
    if (++done % 50 === 0) process.stdout.write(`\r  downloaded ${done}/${need.length}`);
  }
}));
console.log(`\r  downloaded ${done}/${need.length}${failed ? ` (${failed} failed)` : ""}`);
}

// ---------- 5. normalise --------------------------------------------------
const rejected = [];
function toGlyphPath(svg, label) {
  if (/<image|<text\b/i.test(svg)) { rejected.push({ label, why: "embedded image or text" }); return null; }
  if (/stroke="(?!none)/i.test(svg)) { rejected.push({ label, why: "stroked path — outline it in Figma" }); return null; }
  const vb = /viewBox="([\d.\-\s]+)"/.exec(svg);
  if (!vb) { rejected.push({ label, why: "no viewBox" }); return null; }
  const [, , w, h] = vb[1].trim().split(/\s+/).map(Number);
  if (Math.abs(w - h) > 0.01) { rejected.push({ label, why: `non-square viewBox ${w}x${h}` }); return null; }
  const ds = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  if (!ds.length) { rejected.push({ label, why: "no path data" }); return null; }
  const colours = new Set([...svg.matchAll(/fill="(#[0-9a-fA-F]{3,8})"/g)].map((m) => m[1].toLowerCase()));
  if (colours.size > 1) rejected.push({ label, why: `multi-colour (${[...colours].join(" ")}) — flattened to one`, soft: true });
  // Scale the viewBox to the em square. Do NOT flip Y here: svgicons2svgfont
  // already converts SVG's Y-down space to the font's Y-up space, so flipping
  // first lands every glyph upside down. Verified by inspecting the emitted
  // <glyph d="…">: a bar at the top of the source must come out at y 750-1000.
  const k = EM / w;
  return ds.map((d) => svgpath(d).scale(k).abs().round(2).toString()).join(" ");
}

const glyphsByStyle = new Map(styles.map((s) => [s, []]));
for (const { id, icon, style } of ids) {
  const svg = svgs.get(id);
  if (!svg) { rejected.push({ label: `${icon.name}/${style}`, why: "export failed" }); continue; }
  const d = toGlyphPath(svg, `${icon.name}/${style}`);
  if (!d) continue;
  glyphsByStyle.get(style).push({ name: icon.name, codepoint: icon.codepoint, d });
}

// ---------- 6. build fonts ------------------------------------------------
const fontsDir = join(OUT, "fonts");
mkdirSync(fontsDir, { recursive: true });

const buildSvgFont = (fontName, glyphs) => new Promise((res, rej) => {
  const chunks = [];
  const stream = new SVGIcons2SVGFontStream({ fontName, fontHeight: EM, normalize: false, descent: 0, log: () => {} });
  stream.on("data", (c) => chunks.push(Buffer.from(c)));
  stream.on("end", () => res(Buffer.concat(chunks).toString("utf8")));
  stream.on("error", rej);
  for (const g of glyphs.sort((a, b) => a.codepoint - b.codepoint)) {
    const s = Readable.from([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${EM} ${EM}"><path d="${g.d}"/></svg>`]);
    // Codepoint first, then the name as a ligature.
    s.metadata = { unicode: [String.fromCodePoint(g.codepoint), g.name], name: g.name };
    stream.write(s);
  }
  stream.end();
});

const built = [];
for (const style of styles) {
  const glyphs = glyphsByStyle.get(style);
  if (!glyphs.length) { console.log(`  ${style}: no glyphs, skipped`); continue; }
  const fontName = `${FAMILY}-${style[0].toUpperCase()}${style.slice(1)}`;
  const svgFont = await buildSvgFont(fontName, glyphs);
  const ttf = Buffer.from(svg2ttf(svgFont, { description: `${FAMILY} ${style}`, url: `figma:${FILE}/${NODE_ID}` }).buffer);
  writeFileSync(join(fontsDir, `${fontName}.ttf`), ttf);
  writeFileSync(join(fontsDir, `${fontName}.woff2`), ttf2woff2(ttf));
  built.push({ style, fontName, glyphs: glyphs.length });
  console.log(`  ${fontName}: ${glyphs.length} glyphs`);
}

// ---------- 7. emit -------------------------------------------------------
writeFileSync(cpPath, JSON.stringify(store, null, 2) + "\n");

const live = icons.filter((i) => glyphsByStyle.get(styles[0])?.some((g) => g.name === i.name) || true);
const face = (b) => `@font-face {
  font-family: "${b.fontName}";
  src: url("./fonts/${b.fontName}.woff2") format("woff2"),
       url("./fonts/${b.fontName}.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}`;

const base = built[0];
// Only advertise glyphs that are actually in the font. codepoints.json still
// records every icon on the page (assignment must be stable regardless of
// --limit), but the CSS and the name union must not promise more than the
// binary delivers.
const builtNames = new Set(styles.flatMap((s) => (glyphsByStyle.get(s) || []).map((g) => g.name)));
const shipped = Object.entries(store.glyphs)
  .filter(([name, g]) => !g.retired && builtNames.has(name))
  .sort((a, b) => a[1].codepoint - b[1].codepoint);
const css = `/* ${FAMILY} — generated by the zebra-figma-icon-font skill from ${NODE_ID}. Do not edit. */

${built.map(face).join("\n\n")}

.${PREFIX} {
  font-family: "${base.fontName}", sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: inherit;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  /* Ligatures turn the glyph name into the glyph. */
  -webkit-font-feature-settings: "liga";
  font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  /* Inherits colour and size from its context, which is the point of a font. */
  color: inherit;
}

${built.filter((b) => b !== base).map((b) => `.${PREFIX}--${b.style} { font-family: "${b.fontName}", sans-serif; }`).join("\n")}

${shipped.map(([name, g]) => `.${PREFIX}-${name}::before { content: "\\${hex(g.codepoint).toLowerCase()}"; }`).join("\n")}
`;
writeFileSync(join(OUT, "icons.css"), css);

const names = shipped.map(([n]) => n).sort();
writeFileSync(join(OUT, "icon-names.ts"),
  `// Generated by the zebra-figma-icon-font skill. Do not edit.\n\nexport const iconNames = ${JSON.stringify(names, null, 2)} as const;\n\nexport type IconName = (typeof iconNames)[number];\n`);

// A name -> character map, so a component can render the glyph as text inside
// a shadow root. @font-face is document-scoped and reaches shadow trees, but
// the .zds-icon-* class rules do not — a component needs the character itself.
const charMap = Object.fromEntries(shipped.map(([n, g]) => [n, String.fromCodePoint(g.codepoint)]));
writeFileSync(join(OUT, "codepoints.ts"),
  `// Generated by the zebra-figma-icon-font skill. Do not edit.\n` +
  `// name -> glyph character. Both font families use the same codepoints, so\n` +
  `// this map is style-independent; pick the family to switch rounded/sharp.\n\n` +
  `import type { IconName } from "./icon-names.js";\n\n` +
  `export const iconFamily = {\n${built.map((b) => `  ${b.style}: "${b.fontName}",`).join("\n")}\n} as const;\n\n` +
  `export type IconStyle = keyof typeof iconFamily;\n\n` +
  `export const iconGlyphs: Record<IconName, string> = ${JSON.stringify(charMap, null, 2)};\n`);

writeFileSync(join(OUT, "inventory.json"), JSON.stringify({
  source: { fileKey: FILE, nodeId: NODE_ID },
  generatedAt: new Date().toISOString().slice(0, 10),
  styles, fonts: built,
  counts: { icons: icons.length, glyphs: built.reduce((a, b) => a + b.glyphs, 0), rejected: rejected.length, retired: missing.length },
  collisions, renamed, missing,
  rejected,
  icons: icons.map((i) => ({ name: i.name, codepoint: `U+${hex(i.codepoint)}`, figmaName: i.figmaName, category: i.category, setId: i.setId })),
}, null, 2) + "\n");

// preview
writeFileSync(join(OUT, "preview.html"), `<!doctype html><meta charset="utf-8"><title>${FAMILY}</title>
<link rel="stylesheet" href="./icons.css">
<style>
 body{font:14px/1.4 system-ui;margin:24px;background:#fff;color:#111}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px}
 .cell{border:1px solid #e0e3e9;border-radius:8px;padding:10px;text-align:center}
 .${PREFIX}{font-size:32px}
 .n{font-size:11px;color:#545963;margin-top:6px;word-break:break-all}
 h2{margin:24px 0 8px}
</style>
<h1>${FAMILY}</h1>
${built.map((b) => `<h2>${b.style} — ${b.glyphs} glyphs</h2><div class="grid">${
  shipped.map(([n, g]) => `<div class="cell"><i class="${PREFIX} ${b.style !== base.style ? `${PREFIX}--${b.style}` : ""} ${PREFIX}-${n}"></i><div class="n">${n}<br>U+${hex(g.codepoint)}</div></div>`).join("")
}</div>`).join("")}
`);

// ---------- report --------------------------------------------------------
if (LIMIT) console.log(`\n  NOTE --limit ${LIMIT}: fonts and CSS contain ${builtNames.size} of ${icons.length} icons. codepoints.json still holds all ${icons.length}, so a later full run keeps every assignment.`);
console.log(`\nwrote ${OUT}/`);
console.log(`  icons ${icons.length} · glyphs ${built.reduce((a, b) => a + b.glyphs, 0)} · families ${built.length}`);
const hard = rejected.filter((r) => !r.soft);
if (hard.length) { console.log(`  rejected ${hard.length}:`); for (const r of hard.slice(0, 15)) console.log(`    ${r.label}: ${r.why}`); if (hard.length > 15) console.log(`    …and ${hard.length - 15} more (see inventory.json)`); }
const soft = rejected.filter((r) => r.soft);
if (soft.length) console.log(`  warning ${soft.length} multi-colour icons flattened (see inventory.json)`);
if (collisions.length) console.log(`  name collisions resolved: ${collisions.map((c) => c.resolved).join(", ")}`);
if (renamed.length) console.log(`  renamed in Figma, glyph name kept: ${renamed.map((r) => `${r.was} -> ${r.now} (glyph ${r.name})`).join(", ")}`);
if (missing.length) console.log(`  retired (codepoint reserved): ${missing.map((m) => m.name).join(", ")}`);
console.log(`\nOpen ${join(OUT, "preview.html")} and check the glyphs — a filled hole is a fill-rule problem no check catches.`);
