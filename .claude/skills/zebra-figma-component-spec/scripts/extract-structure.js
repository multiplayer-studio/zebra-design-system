// extract-structure.js — read-only. Run with use_figma, once per component set.
// Returns: public API, base-variant anatomy with token bindings, per-variant
// deltas, subcomponent references, used variable/style ids, and token gaps.
// Replace INPUT before running.
const INPUT = {
  setId: "__SET_ID__", // COMPONENT_SET (or standalone COMPONENT) id
  maxVariants: 80,     // safety cap for very large sets; extra variants are reported, not diffed
  maxDepth: 12         // how deep to walk inside each variant (instances are never entered)
};

let node = await figma.getNodeByIdAsync(INPUT.setId);
if (!node) return { error: "Node " + INPUT.setId + " not found" };
let page = node;
while (page && page.type !== "PAGE") page = page.parent;
if (page) await figma.setCurrentPageAsync(page);
if (node.type === "COMPONENT" && node.parent && node.parent.type === "COMPONENT_SET") node = node.parent;
if (node.type !== "COMPONENT_SET" && node.type !== "COMPONENT") {
  return { error: "Expected COMPONENT_SET or COMPONENT, got " + node.type };
}
const owner = node;

// ---------- helpers ----------
const r2 = (v) => (typeof v === "number" ? Math.round(v * 100) / 100 : v);
const mixed = (v) => v === figma.mixed;
const hex = (c, a) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  const alpha = a === undefined ? 1 : a;
  return "#" + h(c.r) + h(c.g) + h(c.b) + (alpha < 1 ? h(alpha) : "");
};
const slug = (s) => s.trim().replace(/\//g, "-");
const has = (o) => o && Object.keys(o).length > 0;

const varCache = new Map();
const usedVarIds = new Set();
async function vName(alias) {
  if (!alias || !alias.id) return null;
  usedVarIds.add(alias.id);
  if (!varCache.has(alias.id)) {
    const v = await figma.variables.getVariableByIdAsync(alias.id);
    varCache.set(alias.id, v ? v.name : "unresolved:" + alias.id);
  }
  return varCache.get(alias.id);
}

const styleCache = new Map();
const usedStyles = { text: new Set(), effect: new Set(), paint: new Set() };
async function sName(id, kind) {
  if (!id || typeof id !== "string") return null;
  usedStyles[kind].add(id);
  if (!styleCache.has(id)) {
    const s = await figma.getStyleByIdAsync(id);
    styleCache.set(id, s ? s.name : "unresolved:" + id);
  }
  return styleCache.get(id);
}

async function paints(list) {
  if (mixed(list)) return "mixed";
  if (!Array.isArray(list)) return undefined;
  const out = [];
  for (const p of list) {
    if (p.visible === false) continue;
    const e = { type: p.type };
    if (p.opacity !== undefined && p.opacity !== 1) e.opacity = r2(p.opacity);
    if (p.type === "SOLID") {
      e.value = hex(p.color);
      const t = await vName(p.boundVariables && p.boundVariables.color);
      if (t) e.token = t;
    } else if (p.type.indexOf("GRADIENT") === 0) {
      e.stops = [];
      for (const s of p.gradientStops) {
        const t = await vName(s.boundVariables && s.boundVariables.color);
        const stop = { pos: r2(s.position), value: hex(s.color, s.color.a) };
        if (t) stop.token = t;
        e.stops.push(stop);
      }
    } else if (p.type === "IMAGE") {
      e.scaleMode = p.scaleMode;
      e.imageHash = p.imageHash;
    }
    out.push(e);
  }
  return out.length ? out : undefined;
}

async function effects(n) {
  if (!("effects" in n) || mixed(n.effects) || !n.effects.length) return undefined;
  const list = [];
  for (const e of n.effects) {
    if (e.visible === false) continue;
    const x = { type: e.type, radius: r2(e.radius) };
    if (e.color) x.color = hex(e.color, e.color.a);
    if (e.offset) x.offset = [r2(e.offset.x), r2(e.offset.y)];
    if (e.spread) x.spread = r2(e.spread);
    const toks = {};
    for (const [k, a] of Object.entries(e.boundVariables || {})) {
      const t = await vName(a);
      if (t) toks[k] = t;
    }
    if (has(toks)) x.tokens = toks;
    list.push(x);
  }
  if (!list.length) return undefined;
  const style = await sName(n.effectStyleId, "effect");
  const out = { list };
  if (style) out.style = style;
  return out;
}

const SCALAR_KEYS = [
  "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight",
  "itemSpacing", "counterAxisSpacing",
  "paddingLeft", "paddingRight", "paddingTop", "paddingBottom",
  "topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius",
  "strokeWeight", "strokeTopWeight", "strokeRightWeight", "strokeBottomWeight", "strokeLeftWeight",
  "opacity", "visible", "characters",
  "fontSize", "fontFamily", "fontStyle", "fontWeight", "lineHeight", "letterSpacing", "paragraphSpacing"
];
async function scalarTokens(n) {
  const bv = n.boundVariables || {};
  const out = {};
  for (const k of SCALAR_KEYS) {
    const a = bv[k];
    if (!a) continue;
    const arr = Array.isArray(a) ? a : [a];
    const names = [];
    for (const x of arr) {
      const t = await vName(x);
      if (t && names.indexOf(t) < 0) names.push(t);
    }
    if (names.length) out[k] = names.length === 1 ? names[0] : names;
  }
  return out;
}

const subRefs = new Map();

async function record(n, rootNode, path) {
  const rec = { path, name: n.name, type: n.type };
  if (n.visible === false) rec.visible = false;
  const rt = rootNode.absoluteTransform, nt = n.absoluteTransform;
  rec.box = { x: r2(nt[0][2] - rt[0][2]), y: r2(nt[1][2] - rt[1][2]), w: r2(n.width), h: r2(n.height) };
  if ("rotation" in n && n.rotation) rec.rotation = r2(n.rotation);
  if (n.type === "ELLIPSE") rec.shape = "ellipse";

  const tokens = await scalarTokens(n);

  if ("layoutMode" in n && n.layoutMode && n.layoutMode !== "NONE") {
    rec.layout = {
      mode: n.layoutMode,
      gap: r2(n.itemSpacing),
      padding: [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].map(r2),
      primaryAlign: n.primaryAxisAlignItems,
      counterAlign: n.counterAxisAlignItems
    };
    if (n.layoutWrap === "WRAP") { rec.layout.wrap = true; rec.layout.crossGap = r2(n.counterAxisSpacing); }
    if (n.layoutMode === "GRID" && "gridColumnCount" in n) {
      rec.layout.grid = { columns: n.gridColumnCount, rows: n.gridRowCount };
    }
  }
  if (n !== rootNode || n.type === "COMPONENT") {
    rec.sizing = { h: n.layoutSizingHorizontal, v: n.layoutSizingVertical };
  }
  const limits = {};
  for (const k of ["minWidth", "maxWidth", "minHeight", "maxHeight"]) {
    if (k in n && n[k] !== null && n[k] !== undefined) limits[k] = r2(n[k]);
  }
  if (has(limits)) rec.limits = limits;

  const parentAuto = n.parent && "layoutMode" in n.parent && n.parent.layoutMode && n.parent.layoutMode !== "NONE";
  if (n !== rootNode && ((n.layoutPositioning === "ABSOLUTE") || !parentAuto)) {
    rec.position = { mode: n.layoutPositioning === "ABSOLUTE" ? "absolute" : "free", constraints: n.constraints };
  }

  if ("cornerRadius" in n && n.type !== "ELLIPSE") {
    if (mixed(n.cornerRadius)) rec.radius = [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius].map(r2);
    else if (n.cornerRadius) rec.radius = r2(n.cornerRadius);
  }
  if ("clipsContent" in n && n.clipsContent && n.type !== "INSTANCE") rec.clips = true;
  if ("opacity" in n && n.opacity !== 1) rec.opacity = r2(n.opacity);
  if ("blendMode" in n && n.blendMode !== "PASS_THROUGH" && n.blendMode !== "NORMAL") rec.blend = n.blendMode;

  if ("fills" in n) {
    const f = await paints(n.fills);
    if (f) rec.fills = f;
    const fs = await sName(n.fillStyleId, "paint");
    if (fs) rec.fillStyle = fs;
  }
  if ("strokes" in n && Array.isArray(n.strokes) && n.strokes.length) {
    const s = await paints(n.strokes);
    if (s) {
      rec.stroke = {
        paints: s,
        weight: mixed(n.strokeWeight)
          ? [n.strokeTopWeight, n.strokeRightWeight, n.strokeBottomWeight, n.strokeLeftWeight].map(r2)
          : r2(n.strokeWeight),
        align: n.strokeAlign
      };
      if (Array.isArray(n.dashPattern) && n.dashPattern.length) rec.stroke.dash = n.dashPattern;
      const ss = await sName(n.strokeStyleId, "paint");
      if (ss) rec.stroke.style = ss;
    }
  }
  const fx = await effects(n);
  if (fx) rec.effects = fx;

  if (n.type === "TEXT") {
    const fn = n.fontName;
    rec.text = {
      characters: n.characters,
      fontFamily: mixed(fn) ? "mixed" : fn.family,
      fontStyle: mixed(fn) ? "mixed" : fn.style,
      fontWeight: mixed(n.fontWeight) ? "mixed" : n.fontWeight,
      fontSize: mixed(n.fontSize) ? "mixed" : r2(n.fontSize),
      lineHeight: mixed(n.lineHeight) ? "mixed" : n.lineHeight,
      letterSpacing: mixed(n.letterSpacing) ? "mixed" : n.letterSpacing,
      textCase: mixed(n.textCase) ? "mixed" : n.textCase,
      alignH: n.textAlignHorizontal,
      alignV: n.textAlignVertical,
      autoResize: n.textAutoResize
    };
    if (n.textTruncation && n.textTruncation !== "DISABLED") {
      rec.text.truncation = n.textTruncation;
      rec.text.maxLines = n.maxLines;
    }
    const ts = await sName(n.textStyleId, "text");
    if (ts) rec.text.style = ts;
  }

  if (n.type === "INSTANCE") {
    const mc = await n.getMainComponentAsync();
    if (mc) {
      const set = mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent : null;
      const target = set || mc;
      rec.instanceOf = { component: target.name, id: target.id, remote: !!mc.remote };
      if (set) rec.instanceOf.variant = mc.name;
      if (!subRefs.has(target.id)) subRefs.set(target.id, { id: target.id, name: target.name, key: target.key, remote: !!mc.remote, usedAt: [] });
      const ref = subRefs.get(target.id);
      if (ref.usedAt.indexOf(path) < 0) ref.usedAt.push(path);
    }
    const props = {};
    for (const [k, v] of Object.entries(n.componentProperties || {})) {
      if (v.type === "INSTANCE_SWAP") {
        const sw = await figma.getNodeByIdAsync(v.value);
        props[k] = { swap: sw ? sw.name : v.value };
      } else props[k] = v.value;
    }
    if (has(props)) rec.instanceProps = props;
  }

  if (n.componentPropertyReferences && has(n.componentPropertyReferences)) {
    rec.boundToProp = n.componentPropertyReferences;
  }
  if (has(tokens)) rec.tokens = tokens;
  return rec;
}

async function walk(n, rootNode, path, depth, out) {
  out.push(await record(n, rootNode, path));
  if (depth >= INPUT.maxDepth || n.type === "INSTANCE" || !("children" in n)) return;
  const counts = {};
  for (const c of n.children) { const s = slug(c.name); counts[s] = (counts[s] || 0) + 1; }
  const idx = {};
  for (const c of n.children) {
    let s = slug(c.name);
    if (counts[s] > 1) { idx[s] = (idx[s] || 0) + 1; s = s + "[" + idx[s] + "]"; }
    await walk(c, rootNode, path + "/" + s, depth + 1, out);
  }
}

// ---------- gaps: visual values with no token or style ----------
const gapSet = new Set();
let gapVariant = "";
function checkGaps(rec) {
  if (rec.type === "INSTANCE") return; // instance internals are checked in the subcomponent's own run
  const t = rec.tokens || {};
  const add = (msg) => gapSet.add(gapVariant + " › " + msg);
  const solidUntokened = (ps) => Array.isArray(ps) && ps.some((p) => p.type === "SOLID" && !p.token);
  if (solidUntokened(rec.fills) && !rec.fillStyle) add(rec.path + " fill " + rec.fills.map((p) => p.value).join(","));
  if (rec.stroke) {
    if (solidUntokened(rec.stroke.paints) && !rec.stroke.style) add(rec.path + " stroke color");
    const w = rec.stroke.weight;
    const nonZero = Array.isArray(w) ? w.some((x) => x > 0) : w > 0;
    if (nonZero && !t.strokeWeight && !t.strokeTopWeight) add(rec.path + " strokeWeight " + JSON.stringify(w));
  }
  if (rec.layout) {
    if (rec.layout.gap > 0 && !t.itemSpacing && rec.layout.primaryAlign !== "SPACE_BETWEEN") add(rec.path + " gap " + rec.layout.gap);
    const sides = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"];
    rec.layout.padding.forEach((v, i) => { if (v > 0 && !t[sides[i]]) add(rec.path + " " + sides[i] + " " + v); });
  }
  if (rec.radius) {
    const r = Array.isArray(rec.radius) ? rec.radius : [rec.radius];
    if (r.some((x) => x > 0) && !t.topLeftRadius && !t.topRightRadius && !t.bottomLeftRadius && !t.bottomRightRadius) {
      add(rec.path + " radius " + JSON.stringify(rec.radius));
    }
  }
  if (rec.text && !rec.text.style && !t.fontSize) add(rec.path + " typography (no text style or font tokens)");
  if (rec.effects && !rec.effects.style && !rec.effects.list.some((e) => e.tokens)) add(rec.path + " effects");
}

// ---------- variants ----------
const isSet = owner.type === "COMPONENT_SET";
const variants = isSet ? owner.children.filter((c) => c.type === "COMPONENT") : [owner];
const baseVariant = isSet ? (owner.defaultVariant || variants[0]) : owner;
const extracted = variants.slice(0, INPUT.maxVariants);
if (extracted.indexOf(baseVariant) < 0) extracted.unshift(baseVariant);

const perVariant = {};
for (const v of extracted) {
  const nodes = [];
  await walk(v, v, "root", 0, nodes);
  gapVariant = v.name;
  nodes.forEach(checkGaps);
  perVariant[v.name] = { props: v.variantProperties || {}, nodes };
}

const indexBy = (nodes) => { const m = {}; nodes.forEach((r) => { m[r.path] = r; }); return m; };
const baseIdx = indexBy(perVariant[baseVariant.name].nodes);
const deltas = {};
for (const v of extracted) {
  if (v === baseVariant) continue;
  const vIdx = indexBy(perVariant[v.name].nodes);
  const d = {};
  for (const p of Object.keys(vIdx)) {
    const b = baseIdx[p], r = vIdx[p];
    if (!b) { if (!d.added) d.added = []; d.added.push(r); continue; }
    const ch = {};
    const keys = new Set(Object.keys(b).concat(Object.keys(r)));
    keys.forEach((k) => {
      if (k === "path") return;
      if (JSON.stringify(b[k]) !== JSON.stringify(r[k])) ch[k] = r[k] === undefined ? null : r[k];
    });
    if (has(ch)) { if (!d.changed) d.changed = {}; d.changed[p] = ch; }
  }
  for (const p of Object.keys(baseIdx)) if (!vIdx[p]) { if (!d.removed) d.removed = []; d.removed.push(p); }
  deltas[v.name] = d;
}

// ---------- binding drift: a token bound on a part in some variants but not others ----------
const drift = {};
const pathCount = {};
for (const [vn, pv] of Object.entries(perVariant)) {
  for (const r of pv.nodes) {
    pathCount[r.path] = (pathCount[r.path] || 0) + 1;
    for (const k of Object.keys(r.tokens || {})) {
      const key = r.path + " " + k;
      if (!drift[key]) drift[key] = [];
      drift[key].push(vn);
    }
  }
}
const bindingDrift = [];
for (const [key, vs] of Object.entries(drift)) {
  const path = key.slice(0, key.lastIndexOf(" "));
  if (vs.length < pathCount[path]) bindingDrift.push({ binding: key, boundIn: vs, of: pathCount[path] });
}

// ---------- public API ----------
const camel = (s) => s.replace(/#.*$/, "").trim()
  .replace(/[^A-Za-z0-9]+(.)?/g, (m, c) => (c ? c.toUpperCase() : ""))
  .replace(/^./, (c) => c.toLowerCase());
const defs = owner.componentPropertyDefinitions;
const api = {};
for (const [k, def] of Object.entries(defs)) {
  const entry = { figmaName: k, name: camel(k), type: def.type, default: def.defaultValue };
  if (def.variantOptions) entry.options = def.variantOptions;
  if (def.type === "INSTANCE_SWAP") {
    const dn = await figma.getNodeByIdAsync(def.defaultValue);
    entry.default = dn ? dn.name : def.defaultValue;
    if (def.preferredValues) entry.preferredCount = def.preferredValues.length;
  }
  entry.controls = def.type === "VARIANT" ? ["variant"] : [];
  api[k] = entry;
}
Object.values(perVariant).forEach((pv) => pv.nodes.forEach((r) => {
  if (!r.boundToProp) return;
  for (const [field, prop] of Object.entries(r.boundToProp)) {
    const ref = r.path + " (" + field + ")";
    if (api[prop] && api[prop].controls.indexOf(ref) < 0) api[prop].controls.push(ref);
  }
}));
// Suggested ordering for VARIANT options, by rendered root width (useful for sizes)
for (const entry of Object.values(api)) {
  if (entry.type !== "VARIANT") continue;
  const widths = {};
  for (const pv of Object.values(perVariant)) {
    const opt = pv.props[entry.figmaName];
    if (opt === undefined) continue;
    if (!widths[opt]) widths[opt] = [];
    widths[opt].push(pv.nodes[0].box.w);
  }
  const avg = {};
  for (const [o, ws] of Object.entries(widths)) avg[o] = r2(ws.reduce((a, b) => a + b, 0) / ws.length);
  if (new Set(Object.values(avg)).size > 1) {
    entry.rootWidthByOption = avg;
    entry.optionsByRootWidth = Object.keys(avg).sort((a, b) => avg[a] - avg[b]);
  }
}

return {
  component: owner.name,
  id: owner.id,
  key: owner.key,
  type: owner.type,
  page: page ? page.name : null,
  description: owner.description || "",
  documentationLinks: (owner.documentationLinks || []).map((l) => l.uri),
  variantCount: variants.length,
  extractedVariants: extracted.length,
  truncated: variants.length > extracted.length,
  api,
  base: { variant: baseVariant.name, props: perVariant[baseVariant.name].props, nodes: perVariant[baseVariant.name].nodes },
  deltas,
  variantProps: Object.fromEntries(Object.entries(perVariant).map(([k, v]) => [k, v.props])),
  subcomponents: Array.from(subRefs.values()),
  usedVariableIds: Array.from(usedVarIds),
  usedStyleIds: { text: Array.from(usedStyles.text), effect: Array.from(usedStyles.effect), paint: Array.from(usedStyles.paint) },
  gaps: Array.from(gapSet),
  bindingDrift
};
