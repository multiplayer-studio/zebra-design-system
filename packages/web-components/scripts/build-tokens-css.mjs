#!/usr/bin/env node
/**
 * tokens/  ->  src/tokens/*.css
 *
 * Emits CSS custom properties in the same layering Figma uses, so that a theme
 * switch only has to redeclare the layer it actually changes:
 *
 *   primitives.css   literal values                    --primitives-*
 *   palette.css      references primitives, per mode   --palette-*
 *   semantics.css    references palette, mode-free     unprefixed (public API)
 *   size.css         references primitives             unprefixed (public API)
 *   typography.css   references primitives             unprefixed (public API)
 *   extensions.css   per extension, only its overrides
 *
 * References are emitted as var(), never flattened. That is the whole trick:
 * redeclaring --palette-brand-primary-default on any element recomputes every
 * semantic token that points at it, for that element and everything inside it,
 * because custom properties inherit.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const TOKENS = process.argv[2] || join(HERE, "../../../tokens");
const OUT = process.argv[3] || join(HERE, "../src/tokens");

const manifest = JSON.parse(readFileSync(join(TOKENS, "manifest.json"), "utf8"));

// ---- naming -------------------------------------------------------------
// Figma path -> CSS custom property. Spaces become dashes ("font family" ->
// font-family) rather than being stripped, so the result reads like CSS.
const PREFIX = { primitives: "primitives-", palette: "palette-" }; // others are public, unprefixed
const varName = (collection, path) =>
  "--" + (PREFIX[collection] ?? "") + path.replace(/[\s/]+/g, "-").replace(/-+/g, "-").toLowerCase();

// {collection.a.b.c} -> var(--…)
const collectionOf = new Map(manifest.collections.map((c) => [c.name, c]));
function refToVar(value) {
  const m = /^\{([^}]+)\}$/.exec(String(value));
  if (!m) return null;
  const [collection, ...rest] = m[1].split(".");
  if (!collectionOf.has(collection)) return null;
  return `var(${varName(collection, rest.join("/"))})`;
}

const cssValue = (leaf) => refToVar(leaf.$value) ?? String(leaf.$value);

// ---- flatten a DTCG tree to [path, leaf] --------------------------------
function* leaves(node, path = []) {
  for (const [k, v] of Object.entries(node)) {
    // A name that is both a leaf and a group ("fill/transparent" alongside
    // "fill/transparent/elevate") is parked at $root by the token export; it
    // belongs to the parent path, not to a segment called "$root".
    if (k === "$root") { yield [path.join("/"), v]; continue; }
    if (!v || typeof v !== "object") continue;
    if ("$value" in v) yield [[...path, k].join("/"), v];
    else yield* leaves(v, [...path, k]);
  }
}

const read = (rel) => JSON.parse(readFileSync(join(TOKENS, rel), "utf8"));
const decls = (collection, tree, indent = "  ") =>
  [...leaves(tree)]
    .map(([path, leaf]) => `${indent}${varName(collection, path)}: ${cssValue(leaf)};`)
    .sort()
    .join("\n");

const HEAD = (title, note) =>
  `/* ${title}\n   Generated from tokens/ by scripts/build-tokens-css.mjs — do not edit by hand.\n${
    note ? "   " + note + "\n" : ""}*/\n\n`;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
const written = [];
const write = (name, body) => { writeFileSync(join(OUT, name), body); written.push(name); };

const col = (name) => manifest.collections.find((c) => c.name === name);
const fileFor = (c, mode) => c.files.find((f) => f.endsWith(`/${slug(mode)}.json`));
const slug = (s) => s.trim().toLowerCase().replace(/[\s/]+/g, "-");

// ---- primitives (single mode) -------------------------------------------
{
  const c = col("primitives");
  const tree = read(fileFor(c, c.defaultMode));
  write("primitives.css", HEAD("Primitives — literal values") + `:root {\n${decls("primitives", tree)}\n}\n`);
}

// ---- palette (Light / Dark) ---------------------------------------------
// :root carries Light. .mode-dark carries only what actually differs.
{
  const c = col("palette");
  const light = read(fileFor(c, "Light"));
  const dark = read(fileFor(c, "Dark"));
  const lightMap = new Map([...leaves(light)].map(([p, l]) => [p, cssValue(l)]));
  const darkMap = new Map([...leaves(dark)].map(([p, l]) => [p, cssValue(l)]));
  const differing = [...darkMap].filter(([p, v]) => lightMap.get(p) !== v);

  let out = HEAD("Palette — references primitives", "Light on :root; .mode-dark redeclares only what differs.");
  out += `:root {\n${[...lightMap].map(([p, v]) => `  ${varName("palette", p)}: ${v};`).sort().join("\n")}\n}\n\n`;
  out += `.mode-dark {\n${differing.map(([p, v]) => `  ${varName("palette", p)}: ${v};`).sort().join("\n")}\n}\n\n`;
  out += `/* Explicit return to light inside a dark subtree. */\n`;
  out += `.mode-light {\n${differing.map(([p]) => `  ${varName("palette", p)}: ${lightMap.get(p)};`).sort().join("\n")}\n}\n`;
  write("palette.css", out);
  console.log(`palette: ${lightMap.size} tokens, ${differing.length} differ in dark`);
}

// ---- semantics (single mode, the public API) ----------------------------
{
  const c = col("semantics");
  const tree = read(fileFor(c, c.defaultMode));
  write("semantics.css",
    HEAD("Semantics — the public API", "Single mode: every value is a palette reference, so light/dark is handled one layer down.") +
    `:root {\n${decls("semantics", tree)}\n}\n`);
}

// ---- size + typography --------------------------------------------------
// Both are multi-mode, but in practice almost nothing varies. Emit the default
// mode on :root and a class per mode carrying only the differences.
for (const name of ["size", "typography"]) {
  const c = col(name);
  const base = read(fileFor(c, c.defaultMode));
  const baseMap = new Map([...leaves(base)].map(([p, l]) => [p, cssValue(l)]));
  let out = HEAD(`${name} — references primitives`,
    `Default mode ${c.defaultMode} on :root; a class per other mode carries only what differs.`);
  out += `:root {\n${[...baseMap].map(([p, v]) => `  ${varName(name, p)}: ${v};`).sort().join("\n")}\n}\n`;
  for (const mode of c.modes) {
    if (mode === c.defaultMode) continue;
    const m = new Map([...leaves(read(fileFor(c, mode)))].map(([p, l]) => [p, cssValue(l)]));
    const diff = [...m].filter(([p, v]) => baseMap.get(p) !== v);
    if (!diff.length) { out += `\n/* .bp-${slug(mode)} — identical to ${c.defaultMode}, nothing to redeclare. */\n`; continue; }
    out += `\n.bp-${slug(mode)} {\n${diff.map(([p, v]) => `  ${varName(name, p)}: ${v};`).sort().join("\n")}\n}\n`;
  }
  write(`${name}.css`, out);
}

// ---- extensions ---------------------------------------------------------
// One block per (extension, mode). The selector list covers the three ways a
// consumer can combine the classes: on the same element, mode above ext, or
// ext above mode. Every block declares the extension's FULL override set for
// that mode, so nothing falls through to the wrong mode's values.
{
  let out = HEAD("Extensions — brand/theme overrides",
    "Apply .ext-<name> on any element; values cascade to its subtree. Combine with .mode-dark / .mode-light.");
  const groups = new Map();
  for (const e of manifest.extensions) (groups.get(e.slug) ?? groups.set(e.slug, []).get(e.slug)).push(e);

  for (const [eslug, entries] of groups) {
    out += `\n/* ── ${eslug} ${"─".repeat(Math.max(0, 56 - eslug.length))} */\n`;
    // Collect every (mode -> declarations) across the parent collections this
    // name extends. Two extensions may share a slug while extending different
    // parents (a "target" over primitives and a "target" over palette).
    const byMode = new Map();
    for (const e of entries) {
      for (const f of e.files) {
        const mode = f.split("/").pop().replace(/\.json$/, "");
        const parent = f.split("/")[2];
        const tree = read(f);
        const lines = [...leaves(tree)].map(([p, l]) => `  ${varName(parent, p)}: ${cssValue(l)};`);
        const key = mode === "value" ? "*" : mode; // primitives extensions have one nameless mode
        if (!byMode.has(key)) byMode.set(key, []);
        byMode.get(key).push(...lines);
      }
    }
    const always = byMode.get("*") ?? [];
    const light = [...always, ...(byMode.get("light") ?? [])].sort();
    const dark = [...always, ...(byMode.get("dark") ?? [])].sort();

    if (light.length) out += `.ext-${eslug} {\n${light.join("\n")}\n}\n`;
    if (dark.length) {
      out += `\n.ext-${eslug}.mode-dark,\n.mode-dark .ext-${eslug},\n.ext-${eslug} .mode-dark {\n${dark.join("\n")}\n}\n`;
      out += `\n.ext-${eslug}.mode-light,\n.mode-light .ext-${eslug},\n.ext-${eslug} .mode-light {\n${light.join("\n")}\n}\n`;
    }
  }
  write("extensions.css", out);
}

// ---- index --------------------------------------------------------------
write("index.css",
  HEAD("All token layers, in cascade order") +
  ["primitives", "palette", "semantics", "size", "typography", "extensions"]
    .map((n) => `@import "./${n}.css";`).join("\n") + "\n");

console.log("wrote:", written.join(", "));
