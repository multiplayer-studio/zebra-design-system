// Read-only. Pass this whole file as `code` to use_figma after editing INPUT.
// Returns, per node: layout (gap/padding with token names), fills and strokes
// as token names (RAW#hex when unbound), every text's style and exact
// size/line-height/weight, and every instance's component, variant and
// properties. Library instances are summarised (their texts and nested
// components), not walked, which keeps a whole screen inside the output limit.
// A token from a collection outside Zebra's lowercase five is tagged [Collection].
const INPUT = {
  ids: ["0:0"],          // screen content frames, dialogs, local components
  maxDepth: 8,
  includeImages: true,   // list image layers with their id, size and scale mode
};

const ZEBRA = /^(size|typography|primitives|semantics|palette)$/;
const vcache = {};
async function vn(id) {
  if (!id) return null;
  if (!(id in vcache)) {
    const v = await figma.variables.getVariableByIdAsync(id);
    let c = null;
    if (v) { const col = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); c = col && col.name; }
    vcache[id] = v ? v.name + (c && !ZEBRA.test(c) ? " [" + c + "]" : "") : "?" + id;
  }
  return vcache[id];
}
const hex = (c) => [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
async function paints(ps) {
  if (!ps || ps === figma.mixed || !ps.length) return undefined;
  const out = [];
  for (const p of ps) {
    if (p.visible === false) continue;
    const op = p.opacity < 1 ? "@" + p.opacity.toFixed(2) : "";
    if (p.type === "SOLID") { const b = p.boundVariables && p.boundVariables.color; out.push((b ? await vn(b.id) : "RAW#" + hex(p.color)) + op); }
    else out.push(p.type);
  }
  return out.length ? out.join(",") : undefined;
}
async function bv(n, k) { const b = n.boundVariables && n.boundVariables[k]; if (!b) return undefined; const x = Array.isArray(b) ? b[0] : b; return x && x.id ? await vn(x.id) : undefined; }
async function textInfo(x) {
  const st = x.textStyleId && x.textStyleId !== figma.mixed ? await figma.getStyleByIdAsync(x.textStyleId) : null;
  const lh = x.lineHeight === figma.mixed ? "mixed" : x.lineHeight.unit === "AUTO" ? "auto" : x.lineHeight.value;
  const weight = x.fontName === figma.mixed ? "mixed" : x.fontName.style;
  return { style: st ? st.name : x.textStyleId === figma.mixed ? "MIXED" : "none", f: (x.fontSize === figma.mixed ? "mixed" : x.fontSize) + "/" + lh + " " + weight };
}
async function modes(n) {
  const out = {};
  for (const [k, v] of Object.entries(n.explicitVariableModes || {})) {
    const c = await figma.variables.getVariableCollectionByIdAsync(k);
    if (c) out[c.name] = (c.modes.find((m) => m.modeId === v) || {}).name;
  }
  return Object.keys(out).length ? out : undefined;
}

async function walk(n, d) {
  if (n.visible === false) return null;
  const o = { t: n.type.slice(0, 4), n: n.name };
  if (d < 4) o.wh = Math.round(n.width) + "x" + Math.round(n.height);
  const m = await modes(n); if (m) o.modes = m;
  if (n.type === "INSTANCE") {
    const mc = await n.getMainComponentAsync();
    const set = mc && mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent : null;
    o.c = (set ? set.name + " {" + mc.name + "}" : mc && mc.name) + (mc && mc.remote ? " (lib)" : " (local)");
    const props = {};
    for (const [k, v] of Object.entries(n.componentProperties || {})) if (v.type !== "VARIANT") props[k.split("#")[0]] = v.value;
    if (Object.keys(props).length) o.p = props;
  }
  if (n.type === "TEXT") {
    o.s = n.characters.slice(0, 160);
    Object.assign(o, await textInfo(n));
    o.fill = await paints(n.fills);
  } else {
    const f = await paints(n.fills); if (f) o.fill = f;
    const s = await paints(n.strokes); if (s) o.stroke = s;
  }
  if ("layoutMode" in n && n.layoutMode && n.layoutMode !== "NONE" && n.type !== "INSTANCE") {
    const gap = await bv(n, "itemSpacing"), pt = await bv(n, "paddingTop"), pl = await bv(n, "paddingLeft");
    o.l = n.layoutMode[0] + " gap" + n.itemSpacing + (gap ? "(" + gap + ")" : "") + " pad" + [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].join(",") + (pt || pl ? " (" + pt + "|" + pl + ")" : "");
  }
  if ("cornerRadius" in n && n.cornerRadius && n.type !== "INSTANCE") o.r = (await bv(n, "topLeftRadius")) || n.cornerRadius;
  if (INPUT.includeImages && "fills" in n && Array.isArray(n.fills)) {
    const img = n.fills.find((f) => f.type === "IMAGE");
    if (img) o.image = { id: n.id, scale: img.scaleMode };
  }
  // Summarise nested library instances instead of walking their internals.
  if (n.type === "INSTANCE" && d > 0) {
    const tx = n.findAll((x) => x.type === "TEXT" && x.visible);
    if (tx.length) { o.txt = []; for (const x of tx) { const i = await textInfo(x); o.txt.push(x.characters.slice(0, 80) + " | " + i.style + " " + i.f); } }
    const ins = n.findAll((x) => x.type === "INSTANCE" && x.visible);
    if (ins.length) { o.nested = []; for (const x of ins.slice(0, 8)) { const mm = await x.getMainComponentAsync(); o.nested.push(mm && mm.parent && mm.parent.type === "COMPONENT_SET" ? mm.parent.name + "{" + mm.name + "}" : mm && mm.name); } }
    return o;
  }
  if ("children" in n && d < INPUT.maxDepth) {
    const ch = [];
    for (const c of n.children) { const w = await walk(c, d + 1); if (w) ch.push(w); }
    if (ch.length) o.k = ch;
  }
  return o;
}

const out = {};
for (const id of INPUT.ids) { const n = await figma.getNodeByIdAsync(id); out[id] = n ? await walk(n, 0) : "missing"; }
return out;
