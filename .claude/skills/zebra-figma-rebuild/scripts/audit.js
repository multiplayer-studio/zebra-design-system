// audit.js — read-only. Run with use_figma on the rebuilt frames (and the local components row, if any).
// The quality gate: everything visible must come from the Zebra system. Reports, per node:
//   foreign-instance   an instance whose component isn't in the Zebra library or this rebuild's local components
//   raw-color          a solid/gradient fill or stroke not bound to a variable or a Zebra style
//   foreign-token      a variable from another library, or a local variable of this file
//   non-semantic       a Zebra palette/primitives variable where a semantic one should be (warn)
//   unbound-spacing    gap, padding, radius or stroke weight with a raw number
//   text-style         text without a Zebra text style
//   effect             a shadow/blur without a Zebra effect style
//   opacity            a layer opacity under 1 (warn: usually a state the component should carry)
// Instances are not entered — their insides belong to the library — except their slots, which hold the rebuild's
// own content. Local components are audited as their own roots.
// INPUT.K is the same { name: key } map the build calls used (merge them if they differed): a component or style
// that isn't in it didn't come from the catalog, so it is flagged.
const INPUT = {
  rootIds: ["__TARGET_ID__"],
  K: {},
  allowLocal: [],     // ids of local components reused from an earlier rebuild (already audited there)
  libraryFile: false, // true only when rebuilding inside the Zebra library file itself
  max: 60,            // violations listed in full; the counts cover all of them
};

const ZEBRA = /^(size|typography|primitives|semantics|palette)$/;
const SEMANTIC_ONLY_FOR_COLOR = /^(palette|primitives)$/;
const allowed = new Set(Object.values(INPUT.K));
const setOk = allowed, styleOk = allowed;
const p12 = (k) => k || "";

const roots = [];
for (const id of INPUT.rootIds) { const n = await figma.getNodeByIdAsync(id); if (n) roots.push(n); }
if (!roots.length) return { error: "No roots found" };
let page = roots[0];
while (page && page.type !== "PAGE") page = page.parent;
await figma.setCurrentPageAsync(page);

const localMains = new Set(INPUT.allowLocal || []);
for (const r of roots) for (const c of r.type === "COMPONENT" || r.type === "COMPONENT_SET" ? [r, ...r.findAllWithCriteria({ types: ["COMPONENT"] })] : r.findAllWithCriteria({ types: ["COMPONENT", "COMPONENT_SET"] })) localMains.add(c.id);

const vcache = {};
async function vinfo(id) {
  if (!(id in vcache)) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (!v) vcache[id] = { name: "?" + id, col: "?", remote: false };
    else { const c = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); vcache[id] = { name: v.name, col: c ? c.name : "?", remote: v.remote }; }
  }
  return vcache[id];
}
const scache = {};
async function sinfo(id) {
  if (!(id in scache)) { const s = await figma.getStyleByIdAsync(id); scache[id] = s ? { name: s.name, key: s.key, remote: s.remote } : null; }
  return scache[id];
}

const found = [], counts = {};
const flag = (kind, n, detail, path) => { counts[kind] = (counts[kind] || 0) + 1; if (found.length < INPUT.max) found.push({ kind, id: n.id, path, detail }); };

async function checkVar(n, id, path, what, isColor) {
  const v = await vinfo(id);
  if (!ZEBRA.test(v.col) || (!v.remote && !INPUT.libraryFile)) flag("foreign-token", n, `${what} → ${v.name} [${v.col}${v.remote ? "" : ", local"}]`, path);
  else if (isColor && SEMANTIC_ONLY_FOR_COLOR.test(v.col)) flag("non-semantic", n, `${what} → ${v.col}/${v.name}`, path);
}

async function paints(n, key, path, styleId) {
  const list = n[key];
  if (!Array.isArray(list)) return;
  if (styleId && typeof styleId === "string") {
    const s = await sinfo(styleId);
    if (!s || !styleOk.has(p12(s.key))) flag("raw-color", n, `${key} uses a non-Zebra style ${s ? s.name : "?"}`, path);
    return;
  }
  for (const p of list) {
    if (p.visible === false || p.type === "IMAGE" || p.type === "VIDEO") continue;
    if (p.type === "SOLID") {
      if (p.boundVariables && p.boundVariables.color) await checkVar(n, p.boundVariables.color.id, path, key, true);
      else flag("raw-color", n, `${key} solid unbound`, path);
    } else if (p.type.startsWith("GRADIENT")) {
      const bound = (p.gradientStops || []).every((s) => s.boundVariables && s.boundVariables.color);
      if (!bound) flag("raw-color", n, `${key} gradient with unbound stops (use a Zebra Gradient style)`, path);
    }
  }
}

const NUM = ["itemSpacing", "counterAxisSpacing", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"];
const RAD = ["topLeftRadius", "topRightRadius", "bottomRightRadius", "bottomLeftRadius"];

async function visit(n, path) {
  if (n.visible === false) return;
  const bv = n.boundVariables || {};
  if (n.type === "INSTANCE") {
    const mc = await n.getMainComponentAsync();
    const set = mc && mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent : mc;
    const ok = mc && (localMains.has(set.id) || localMains.has(mc.id) || setOk.has(p12(set.key)) || setOk.has(p12(mc.key)));
    if (!ok) flag("foreign-instance", n, `${set ? set.name : "?"}${mc && !mc.remote ? " (local, not from this rebuild)" : ""}`, path);
    // Size/position bindings on the instance itself still count.
    for (const [k, v] of Object.entries(bv)) for (const a of Array.isArray(v) ? v : [v]) if (a && a.id && k !== "componentProperties") await checkVar(n, a.id, path, k, false);
    // Colour overrides on the instance (a state border, a selected fill) are the rebuild's own choices.
    for (const key of ["fills", "strokes"]) if (Array.isArray(n[key])) for (const p of n[key]) if (p.type === "SOLID" && p.visible !== false && p.boundVariables && p.boundVariables.color) await checkVar(n, p.boundVariables.color.id, path, key, true);
    if (n.opacity < 1) flag("opacity", n, `opacity ${Math.round(n.opacity * 100)}%`, path);
    // Content placed into an instance's slots is the rebuild's own work, so it's audited like any other layer.
    for (const slot of n.findAllWithCriteria({ types: ["SLOT"] })) for (const c of slot.children) await visit(c, path + "/" + slot.name + "/" + c.name);
    return;
  }
  if (n.type === "TEXT") {
    const sid = n.textStyleId;
    if (sid === figma.mixed) flag("text-style", n, "mixed styles in one text", path);
    else if (!sid) flag("text-style", n, `no text style ("${n.characters.slice(0, 40)}")`, path);
    else { const s = await sinfo(sid); if (!s || !styleOk.has(p12(s.key))) flag("text-style", n, `non-Zebra style ${s ? s.name : "?"}`, path); }
  }
  if ("fills" in n) await paints(n, "fills", path, n.fillStyleId);
  if ("strokes" in n && n.strokes.length) {
    await paints(n, "strokes", path, n.strokeStyleId);
    const w = n.strokeWeight;
    if (w !== figma.mixed && w > 0 && !bv.strokeWeight && !bv.strokeTopWeight) flag("unbound-spacing", n, `strokeWeight ${w}`, path);
  }
  if ("effects" in n && n.effects.some((e) => e.visible !== false)) {
    const sid = n.effectStyleId;
    const s = sid ? await sinfo(sid) : null;
    if (!s || !styleOk.has(p12(s.key))) flag("effect", n, s ? `non-Zebra effect style ${s.name}` : "effect without a style", path);
  }
  if ("layoutMode" in n && n.layoutMode && n.layoutMode !== "NONE") {
    for (const f of NUM) {
      if (f === "itemSpacing" && n.primaryAxisAlignItems === "SPACE_BETWEEN") continue;
      if (f === "counterAxisSpacing" && n.layoutWrap !== "WRAP") continue;
      if (n[f] > 0 && !bv[f]) flag("unbound-spacing", n, `${f} ${n[f]}`, path);
    }
  }
  if ("topLeftRadius" in n) for (const f of RAD) if (n[f] > 0 && !bv[f]) { flag("unbound-spacing", n, `radius ${n[f]}`, path); break; }
  for (const [k, v] of Object.entries(bv)) {
    if (k === "fills" || k === "strokes") continue; // checked per paint
    for (const a of Array.isArray(v) ? v : [v]) if (a && a.id) await checkVar(n, a.id, path, k, false);
  }
  if ("opacity" in n && n.opacity < 1 && !bv.opacity) flag("opacity", n, `opacity ${Math.round(n.opacity * 100)}%`, path);
  if ("children" in n) for (const c of n.children) await visit(c, path + "/" + c.name);
}

for (const r of roots) await visit(r, r.name);
const blocking = Object.entries(counts).filter(([k]) => !["non-semantic", "opacity"].includes(k)).reduce((s, [, v]) => s + v, 0);
return { clean: blocking === 0, counts, violations: found };
