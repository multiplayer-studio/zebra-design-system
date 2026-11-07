#!/usr/bin/env node
// Builds the Zebra catalog: every published component set, standalone component, icon, variable and style in the
// Zebra Design System library, each with the key that imports it into any file (importComponentSetByKeyAsync,
// importVariableByKeyAsync, importStyleByKeyAsync).
//
//   node catalog.mjs                 refresh cache/catalog.json (skips if under a day old; --force to refetch)
//   node catalog.mjs --find button   print matching components, icons, variables and styles with their keys
//   node catalog.mjs --keys "surface/page,Button,body/medium,icon:Sync"   exact names → { name: key } for INPUT.K
//   node catalog.mjs --api "Button,Status Label"   component APIs (props, variants, size, exposed instances)
//                                    over REST, cached in cache/apis.json — no use_figma call needed
//
// Published only, because only published assets can be imported. Same-named component sets are resolved from
// specs/<slug>/<slug>.spec.json (component.source.key / .page) when run from the repo root. Reads
// FIGMA_PERSONAL_ACCESS_TOKEN from the environment or the repo's .env. Never prints the token.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const LIBRARY = process.env.ZEBRA_LIBRARY_FILE_KEY || "hvRmnZZOZrmTW0wf8hbrt5";
const CACHE = resolve(import.meta.dirname, "../cache/catalog.json");
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const findIdx = args.indexOf("--find");

function token() {
  if (process.env.FIGMA_PERSONAL_ACCESS_TOKEN) return process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  for (let dir = process.cwd(); dir !== "/"; dir = resolve(dir, "..")) {
    const env = join(dir, ".env");
    if (!existsSync(env)) continue;
    const m = readFileSync(env, "utf8").match(/^FIGMA_PERSONAL_ACCESS_TOKEN=(.*)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  console.error("FIGMA_PERSONAL_ACCESS_TOKEN not found in the environment or .env");
  process.exit(1);
}

async function get(path) {
  const res = await fetch(`https://api.figma.com/v1/files/${LIBRARY}/${path}`, { headers: { "X-Figma-Token": token() } });
  if (!res.ok) throw new Error(`Figma ${res.status} for ${path}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).meta;
}

async function getNodes(ids, depth) {
  const out = {};
  for (let i = 0; i < ids.length; i += 8) {
    const q = encodeURIComponent(ids.slice(i, i + 8).join(","));
    const res = await fetch(`https://api.figma.com/v1/files/${LIBRARY}/nodes?ids=${q}${depth ? `&depth=${depth}` : ""}`, { headers: { "X-Figma-Token": token() } });
    if (!res.ok) throw new Error(`Figma ${res.status} for nodes: ${(await res.text()).slice(0, 200)}`);
    Object.assign(out, (await res.json()).nodes);
  }
  return out;
}

const isPrivate = (name) => /^[_.]/.test(name.trim()) || /^template\//i.test(name.trim());

async function build() {
  const [sets, comps, styles, vars] = await Promise.all([get("component_sets"), get("components"), get("styles"), get("variables/published")]);
  const page = (c) => (c.containing_frame || {}).pageName || "";
  const components = [];
  const icons = [];
  for (const s of sets.component_sets) {
    if (isPrivate(s.name)) continue;
    const row = { name: s.name.trim(), key: s.key, kind: "set", page: page(s), frame: (s.containing_frame || {}).name || "", id: s.node_id };
    if (row.page === "Icons") icons.push({ name: row.name, key: row.key, id: row.id });
    else components.push(row);
  }
  // Standalone components (not variants of a set).
  for (const c of comps.components) {
    if ((c.containing_frame || {}).containingComponentSet || isPrivate(c.name)) continue;
    components.push({ name: c.name.trim(), key: c.key, kind: "component", page: page(c), frame: (c.containing_frame || {}).name || "", id: c.node_id });
  }
  const cols = Object.fromEntries(Object.entries(vars.variableCollections).map(([id, c]) => [id, c.name]));
  const variables = Object.values(vars.variables)
    .map((v) => ({ name: v.name, key: v.key, collection: cols[v.variableCollectionId] || "?", type: v.resolvedDataType }))
    .sort((a, b) => a.collection.localeCompare(b.collection) || a.name.localeCompare(b.name));
  const styleRows = styles.styles.map((s) => ({ name: s.name, key: s.key, type: s.style_type }));
  return {
    library: LIBRARY,
    fetchedAt: new Date().toISOString(),
    counts: { components: components.length, icons: icons.length, variables: variables.length, styles: styleRows.length },
    components: components.sort((a, b) => a.name.localeCompare(b.name)),
    icons: icons.sort((a, b) => a.name.localeCompare(b.name)),
    variables,
    styles: styleRows,
  };
}

async function load() {
  const fresh = existsSync(CACHE) && Date.now() - statSync(CACHE).mtimeMs < 24 * 3600e3;
  if (fresh && !flag("--force")) {
    const c = JSON.parse(readFileSync(CACHE, "utf8"));
    if (!c.components.length || c.components[0].id) return c; // old cache shape (no node ids) → refetch
  }
  const cat = await build();
  mkdirSync(dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, JSON.stringify(cat, null, 1));
  return cat;
}

const cat = await load();

// specs/*/*.spec.json → { "Component Name": { key, page } }, for resolving same-named sets.
function specIndex() {
  const dir = join(process.cwd(), "specs");
  const out = {};
  if (!existsSync(dir)) return out;
  for (const slug of readdirSync(dir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    for (const f of readdirSync(join(dir, slug.name))) {
      if (!f.endsWith(".spec.json")) continue;
      try {
        const c = JSON.parse(readFileSync(join(dir, slug.name, f), "utf8")).component || {};
        if (c.name && c.source) out[c.name] = { key: c.source.key, page: c.source.page };
      } catch {}
    }
  }
  return out;
}

// Several sets share a name → the one the repo's spec points at, by key then page; null when no spec settles it.
function bySpec(name, matches, specs) {
  const sp = specs[name];
  if (!sp) return null;
  return matches.find((r) => r.key === sp.key) || matches.find((r) => r.page === sp.page) || null;
}

// Close names for a miss, so a typo doesn't need another --find round trip. Character-bigram similarity.
function suggest(name) {
  const grams = (s) => { const g = new Set(); for (let i = 0; i < s.length - 1; i++) g.add(s.slice(i, i + 2)); return g; };
  const q = name.toLowerCase(), qg = grams(q);
  const all = new Set([...cat.variables, ...cat.styles, ...cat.components, ...cat.icons].map((r) => r.name));
  const score = (n) => {
    const l = n.toLowerCase();
    if (l.includes(q) || q.includes(l)) return 1;
    const lg = grams(l);
    let hit = 0;
    for (const g of qg) if (lg.has(g)) hit++;
    return (2 * hit) / (qg.size + lg.size);
  };
  return [...all].map((n) => [score(n), n]).filter(([s]) => s > 0.5).sort((a, b) => b[0] - a[0]).slice(0, 3).map(([, n]) => n);
}
const missMsg = (misses) => misses.map((m) => { const s = suggest(m); return m + (s.length ? ` (close: ${s.join(", ")})` : ""); }).join("; ");

if (findIdx >= 0) {
  const q = (args[findIdx + 1] || "").toLowerCase();
  const hit = (r) => r.name.toLowerCase().includes(q);
  const show = (label, rows, fmt) => { const m = rows.filter(hit); if (m.length) { console.log(`${label} (${m.length})`); m.slice(0, 40).forEach((r) => console.log("  " + fmt(r))); } };
  show("components", cat.components, (r) => `${r.name}  [${r.kind}, ${r.page}]  ${r.key}`);
  show("icons", cat.icons, (r) => `${r.name}  ${r.key}`);
  show("variables", cat.variables, (r) => `${r.collection}/${r.name}  [${r.type}]  ${r.key}`);
  show("styles", cat.styles, (r) => `${r.name}  [${r.type}]  ${r.key}`);
} else if (args.indexOf("--keys") >= 0) {
  // Exact names, comma-separated, to a { name: key } map for a build call's INPUT. A name may be a variable
  // ("surface/page"), a style ("body/medium", "Shadow/small"), a component ("Button") or an icon ("Chevron Right").
  // Prefix with "icon:" when a component and an icon share a name.
  const names = (args[args.indexOf("--keys") + 1] || "").split(",").map((s) => s.trim()).filter(Boolean);
  const specs = specIndex();
  const out = {}, misses = [], dupes = [], specPicks = [];
  for (const raw of names) {
    const iconOnly = raw.startsWith("icon:");
    const name = iconOnly ? raw.slice(5) : raw;
    const pools = iconOnly ? [cat.icons] : [cat.variables.filter((v) => v.collection === "semantics"), cat.variables, cat.styles, cat.components, cat.icons];
    let found = null;
    for (const pool of pools) {
      const m = pool.filter((r) => r.name === name);
      if (m.length > 1) {
        const sp = pool === cat.components ? bySpec(name, m, specs) : null;
        if (sp) { found = sp; specPicks.push(`${name}: took the set on "${sp.page}" (specs/)`); }
        else dupes.push(`${name}: ${m.map((r) => (r.page || r.collection || "") + " " + r.key).join(" | ")}`);
      }
      if (m.length) { found = found || m[0]; break; }
    }
    if (found) out[raw] = found.key; else misses.push(raw);
  }
  console.log(JSON.stringify(out));
  if (specPicks.length) console.error(specPicks.join("\n"));
  if (dupes.length) console.error("ambiguous (first taken):\n  " + dupes.join("\n  "));
  if (misses.length) console.error("not in the library: " + missMsg(misses));
} else if (args.indexOf("--api") >= 0) {
  // Component APIs over REST, cached: what component-api.js reads with use_figma, without a Figma call.
  // Covers published structure; it can't verify the TARGET file can import — a failed import in a build still
  // means checking the file's libraries (or component-api.js).
  const names = (args[args.indexOf("--api") + 1] || "").split(",").map((s) => s.trim()).filter(Boolean);
  const specs = specIndex();
  const APIS = resolve(import.meta.dirname, "../cache/apis.json");
  const apiCache = existsSync(APIS) && !flag("--force") ? JSON.parse(readFileSync(APIS, "utf8")) : {};
  const rows = [], misses = [];
  for (const name of names) {
    let m = cat.components.filter((r) => r.name === name);
    if (!m.length) m = cat.icons.filter((r) => r.name === name);
    if (!m.length) { misses.push(name); continue; }
    const pick = m.length > 1 ? bySpec(name, m, specs) || m[0] : m[0];
    if (m.length > 1) console.error(`${name}: ${m.length} sets, took the one on "${pick.page || "Icons"}"${bySpec(name, m, specs) ? " (specs/)" : ""}`);
    rows.push(pick);
  }
  const need = rows.filter((r) => !apiCache[r.key]);
  if (need.length) {
    const shallow = await getNodes(need.map((r) => r.id), 1);
    const plan = [];
    for (const r of need) {
      const doc = (shallow[r.id] || {}).document;
      if (!doc) { apiCache[r.key] = { error: "node " + r.id + " not found in the library file" }; continue; }
      const base = doc.type === "COMPONENT_SET" ? (doc.children || [])[0] : doc;
      plan.push({ r, doc, baseId: base && base.id });
    }
    const deep = plan.length ? await getNodes(plan.map((p) => p.baseId).filter(Boolean)) : {};
    const walk = (n, fn) => { fn(n); for (const c of n.children || []) walk(c, fn); };
    for (const { r, doc, baseId } of plan) {
      const props = {};
      for (const [k, d] of Object.entries(doc.componentPropertyDefinitions || {})) {
        const p = { type: d.type, default: d.defaultValue };
        if (d.variantOptions) p.options = d.variantOptions;
        props[k] = p;
      }
      const base = baseId && deep[baseId] ? deep[baseId].document : null;
      const bb = base && base.absoluteBoundingBox;
      const exposed = [], seen = new Set();
      if (base) walk(base, (n) => {
        if (n.type !== "INSTANCE" || !n.isExposedInstance) return;
        const e = { name: n.name, props: Object.fromEntries(Object.entries(n.componentProperties || {}).map(([k, v]) => [k, v.type])) };
        const sig = JSON.stringify(e);
        if (!seen.has(sig)) { seen.add(sig); exposed.push(e); }
      });
      apiCache[r.key] = {
        key: r.key, kind: r.kind || "set", id: r.id,
        defaultVariant: doc.type === "COMPONENT_SET" && base ? base.name : undefined,
        size: bb ? Math.round(bb.width) + "x" + Math.round(bb.height) : undefined,
        props,
        exposed: exposed.length ? exposed : undefined,
        variantCount: doc.type === "COMPONENT_SET" ? (doc.children || []).length : undefined,
      };
    }
    writeFileSync(APIS, JSON.stringify(apiCache, null, 1));
  }
  console.log(JSON.stringify(Object.fromEntries(rows.map((r) => [r.name, apiCache[r.key]])), null, 1));
  if (misses.length) console.error("not in the library: " + missMsg(misses));
} else {
  console.log(`catalog ${CACHE}`);
  console.log(`library ${cat.library}, fetched ${cat.fetchedAt}`);
  console.log(`components ${cat.counts.components} · icons ${cat.counts.icons} · variables ${cat.counts.variables} · styles ${cat.counts.styles}`);
}
