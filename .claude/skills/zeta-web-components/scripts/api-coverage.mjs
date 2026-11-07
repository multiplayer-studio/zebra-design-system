#!/usr/bin/env node
// api-coverage.mjs — every property a spec defines must be implemented on the zeta element, or mapped on purpose.
//
//   node .claude/skills/zeta-web-components/scripts/api-coverage.mjs <spec-slug> [<spec-slug> ...]
//   node .claude/skills/zeta-web-components/scripts/api-coverage.mjs --all      # every slug in api-map.json
//
// Run from the repo root. For each spec it reads the API of every part (the top-level `api`, plus
// `family[]`, `subcomponents[]` and `compositions[]` entries that carry one), finds the zeta element mapped to
// that part in references/api-map.json, and collects what the element really exposes: @property declarations on
// its class, its base classes and its mixins, and its slots. A spec property passes when
//   - the element has a property or slot of a matching name (see `matches` below), or
//   - api-map.json maps it to a property or slot by another name, or explains why it has none ("figma-only: …",
//     "css-state: …", "composed: …").
// Anything else is MISSING and the script exits 1. That is the point: a spec property never disappears silently.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKILL = join(ROOT, ".claude/skills/zeta-web-components");
const ZETA = join(ROOT, "packages/zeta-web/src");
const MAP = JSON.parse(readFileSync(join(SKILL, "references/api-map.json"), "utf8"));

const args = process.argv.slice(2);
const slugs = args.includes("--all") ? Object.keys(MAP).filter((k) => !k.startsWith("_")) : args;
if (!slugs.length) {
  console.error("usage: api-coverage.mjs <spec-slug> [...] | --all");
  process.exit(2);
}

// ---------- zeta source index -------------------------------------------------------------------------------
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".ts") && !p.includes("/test/") && !p.includes("/stories/")) files.push(p);
  }
};
walk(join(ZETA, "components"));
walk(join(ZETA, "mixins"));
const source = Object.fromEntries(files.map((f) => [f, readFileSync(f, "utf8")]));

const PROP = /@property\(([^)]*)\)\s*(?:(?:public|protected|private|override|declare|accessor|readonly)\s+)*(?:get\s+)?(\w+)/g;
const propsIn = (text) => [...text.matchAll(PROP)].map((m) => ({ name: m[2], attr: /attribute:\s*"([^"]+)"/.exec(m[1])?.[1] }));

// Mixins: `export const Name = <T ...>(superClass: T) => { class X ... }` — props declared inside.
const mixins = {};
for (const [f, text] of Object.entries(source)) {
  if (!f.includes("/mixins/")) continue;
  const starts = [...text.matchAll(/export const (\w+)\s*=/g)];
  starts.forEach((m, i) => {
    const body = text.slice(m.index, starts[i + 1]?.index ?? text.length);
    mixins[m[1]] = propsIn(body);
  });
}

// Classes: name -> { file, extendsExpr, body }
const classes = {};
for (const [f, text] of Object.entries(source)) {
  for (const m of text.matchAll(/export\s+(?:abstract\s+)?class\s+(\w+)\s+extends\s+([^{]+)\{/g)) {
    const end = text.indexOf("\ndeclare global", m.index);
    classes[m[1]] = { file: f, ext: m[2], body: text.slice(m.index, end > 0 ? end : undefined) };
  }
}
const tagClass = {};
for (const [f, text] of Object.entries(source))
  for (const m of text.matchAll(/@customElement\("([^"]+)"\)\s*export\s+(?:abstract\s+)?class\s+(\w+)/g)) tagClass[m[1]] = m[2];

function exposed(tag) {
  const cls = tagClass[tag];
  if (!cls) return null;
  const props = new Map();
  const slots = new Set();
  const seen = new Set();
  const visit = (name) => {
    if (!name || seen.has(name)) return;
    seen.add(name);
    if (mixins[name]) return mixins[name].forEach((p) => props.set(p.name, p));
    const c = classes[name];
    if (!c) return;
    propsIn(c.body).forEach((p) => props.set(p.name, p));
    for (const m of c.body.matchAll(/@slot\s+(?:\{[^}]*\}\s*)?(-|[\w-]+)/g)) slots.add(m[1] === "-" ? "(default)" : m[1]);
    for (const m of c.body.matchAll(/<slot(?:\s+name="([^"]+)")?/g)) slots.add(m[1] ?? "(default)");
    // Doc comment sits above the class: include it for @slot tags.
    const head = source[c.file].slice(0, source[c.file].indexOf(c.body));
    const doc = head.slice(head.lastIndexOf("/**"));
    for (const m of doc.matchAll(/@slot\s+(?:\{[^}]*\}\s*)?(-|[\w-]+)/g)) slots.add(m[1] === "-" ? "(default)" : m[1]);
    for (const id of c.ext.matchAll(/(\w+)\s*(?=\(|$|\)|\s)/g)) visit(id[1]);
  };
  visit(cls);
  return { cls, props, slots };
}

// ---------- matching ------------------------------------------------------------------------------------------
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const EQUIV = { flavour: ["flavor"], shape: ["rounded", "shape"], text: ["label"], title: ["title", "headline", "heading"] };
function matches(specName, el) {
  const n = norm(specName);
  const names = new Set([n, ...(EQUIV[n] ?? []), n.replace(/^(show|has|is)/, "")]);
  for (const [name, p] of el.props) if (names.has(norm(name)) || (p.attr && names.has(norm(p.attr)))) return `property ${name}`;
  for (const s of el.slots) if (s !== "(default)" && names.has(norm(s))) return `slot ${s}`;
  return null;
}

// ---------- run -----------------------------------------------------------------------------------------------
let missing = 0;
for (const slug of slugs) {
  const entry = MAP[slug];
  if (!entry) {
    console.log(`\n${slug}: no entry in api-map.json — add one mapping each spec part to its zeta element.`);
    missing++;
    continue;
  }
  const spec = JSON.parse(readFileSync(join(ROOT, entry.spec), "utf8"));
  // A page with several public sets (Stepper) groups its api by set: each group, an object of props with no
  // `type` of its own, is a part named after its key.
  const grouped = Object.entries(spec.api ?? {}).filter(([, v]) => v && typeof v === "object" && !v.type && !v.figmaName);
  const parts = grouped.length && grouped.length === Object.keys(spec.api).length
    ? grouped.map(([name, api]) => ({ name, api }))
    : [{ name: "", api: spec.api }];
  for (const key of ["family", "subcomponents", "compositions"]) {
    const list = Array.isArray(spec[key]) ? spec[key] : Object.entries(spec[key] ?? {}).map(([name, v]) => ({ name, ...v }));
    for (const p of list) if (p?.api) parts.push({ name: p.name, api: p.api });
  }
  console.log(`\n${slug}  (${relative(ROOT, join(ROOT, entry.spec))})`);
  for (const part of parts) {
    if (!part.api || !Object.keys(part.api).length) continue;
    const target = entry.parts[part.name];
    const label = part.name || "(root)";
    if (target === undefined) {
      console.log(`  ${label}: MISSING part mapping in api-map.json`);
      missing++;
      continue;
    }
    if (typeof target === "string" && /^(figma-only|composed|not-built)/.test(target)) {
      console.log(`  ${label}: ${target}`);
      continue;
    }
    const el = exposed(target);
    if (!el) {
      console.log(`  ${label}: MISSING element <${target}> in packages/zeta-web`);
      missing++;
      continue;
    }
    console.log(`  ${label} -> <${target}>`);
    for (const [prop, def] of Object.entries(part.api)) {
      const key = part.name ? `${part.name}.${prop}` : prop;
      const mapped = entry.props?.[key];
      const raw = def.values ?? def.options ?? [];
      const values = Array.isArray(raw) ? raw.map(String) : String(raw).split(/[,|]/).map((v) => v.trim());
      let result = null;
      if (mapped) {
        const ref = /^(property|slot) (\S+)/.exec(mapped);
        if (ref) {
          const ok = ref[1] === "property" ? el.props.has(ref[2]) : el.slots.has(ref[2]);
          result = ok ? `${mapped} (mapped)` : null;
          if (!ok) console.log(`    ${prop}: MISSING — api-map.json says "${mapped}" but <${target}> has no such ${ref[1]}`);
        } else result = mapped;
      } else if (/^state$/i.test(prop) && values.length) {
        // An interaction-state axis is CSS, except disabled, which must be a property.
        result = values.some((v) => /disabled/i.test(v)) && !el.props.has("disabled") ? null : "css-state (automatic)";
        if (!result) console.log(`    ${prop}: MISSING — the state axis includes disabled, but <${target}> has no disabled property`);
      } else result = matches(prop, el);
      if (!result && !(mapped && /^(property|slot) /.test(mapped))) console.log(`    ${prop}: MISSING`);
      else if (result) console.log(`    ${prop}: ${result}`);
      if (!result) missing++;
    }
  }
}
console.log(missing ? `\n${missing} spec propert${missing === 1 ? "y is" : "ies are"} not covered.` : "\nEvery spec property is covered.");
process.exit(missing ? 1 : 0);
