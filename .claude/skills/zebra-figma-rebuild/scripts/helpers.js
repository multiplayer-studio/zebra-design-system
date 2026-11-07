// helpers.js — paste this whole file at the top of every BUILD call (use_figma keeps no state between calls),
// after `const K = {...}`: the { name: key } map from `node catalog.mjs --keys "<names>"`.
// Every helper takes a NAME from K, never a raw value, so nothing unbound can slip in.
//
//   const s = await inst("Button", { Size: "large", Flavour: "primary" }, { Label: "Save", "Leading Icon": true });
//   await iconInto(s, "Leading Icon", "Sync");            // swap an exposed Icon's glyph
//   const f = frame("VERTICAL", "Card body"); await gap(f, "space/md"); await pad(f, "space/lg");
//   await fill(f, "surface/card"); await stroke(f, "border/default", "stroke/thin"); await radius(f, "radius/md");
//   await mode(header, "Light");                         // library parts locked to Dark, on a light design
//   const t = await text("My Printers", "heading/medium", "foreground/primary");
//   parent.appendChild(t); t.layoutSizingHorizontal = "FILL";   // FILL/HUG only after appending
//
// Missing names throw, which is the point: add the name to the --keys list rather than inlining a value.

const _cache = new Map();
const _key = (name) => { const k = K[name]; if (!k) throw new Error(`"${name}" is not in K — add it to catalog.mjs --keys`); return k; };
async function _get(kind, name) {
  const id = kind + ":" + name;
  if (_cache.has(id)) return _cache.get(id);
  const key = _key(name);
  let v;
  if (kind === "set") { try { v = await figma.importComponentSetByKeyAsync(key); } catch (e) { v = await figma.importComponentByKeyAsync(key); } }
  else if (kind === "var") v = await figma.variables.importVariableByKeyAsync(key);
  else v = await figma.importStyleByKeyAsync(key);
  _cache.set(id, v);
  return v;
}

// Property names may be given short ("Label") or full ("Label#2111:8"); variants by axis name.
function _props(node, props) {
  const defs = node.componentProperties || {};
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    const full = Object.keys(defs).find((d) => d === k || d.split("#")[0] === k);
    if (!full) throw new Error(`"${node.name}" has no property "${k}". Has: ${Object.keys(defs).map((d) => d.split("#")[0]).join(", ")}`);
    out[full] = typeof v === "boolean" || defs[full].type !== "VARIANT" ? v : String(v);
  }
  return out;
}

/** An instance of a Zebra component, variant chosen by axis values, then text/boolean/variant props set. */
async function inst(name, variant = {}, props = {}) {
  const set = await _get("set", name);
  let comp = set;
  if (set.type === "COMPONENT_SET") {
    comp = set.children.find((c) => Object.entries(variant).every(([a, v]) => c.variantProperties && c.variantProperties[a] === String(v)));
    if (!comp) throw new Error(`${name}: no variant ${JSON.stringify(variant)}. Axes: ${JSON.stringify(set.componentPropertyDefinitions && Object.fromEntries(Object.entries(set.componentPropertyDefinitions).filter(([, d]) => d.type === "VARIANT").map(([k, d]) => [k, d.variantOptions])))}`);
  }
  const i = comp.createInstance();
  if (Object.keys(props).length) i.setProperties(_props(i, props));
  return i;
}

/** Set props on an instance already placed (or on a nested, exposed instance). */
function setProps(i, props) { i.setProperties(_props(i, props)); return i; }

/** The component id a glyph swap needs, for an icon NAME in K (e.g. "Chevron Right"). */
async function glyph(name) { const g = await _get("set", name); return (g.type === "COMPONENT_SET" ? g.defaultVariant : g).id; }

/** Swap the glyph of an Icon instance, or of the exposed Icon named `child` inside `host`. */
async function iconInto(host, child, iconName) {
  const target = child ? host.findOne((n) => n.type === "INSTANCE" && n.name === child) : host;
  if (!target) throw new Error(`${host.name} has no nested instance "${child}"`);
  return setProps(target, { Name: await glyph(iconName) });
}

/** A standalone Zebra Icon (K must hold "Icon") showing the glyph `iconName`. */
async function icon(iconName, size = "medium") {
  const i = await inst("Icon", { Size: size, Framed: "false" });
  return setProps(i, { Name: await glyph(iconName) });
}

/** Set an instance to a mode of a collection it pins (e.g. "Light" for Global Header and Navigation Rail, which the
 *  library locks to Dark). Only collections the instance already sets explicitly are changed. Returns what changed. */
async function mode(node, modeName = "Light") {
  const changed = [];
  for (const colId of Object.keys(node.explicitVariableModes || {})) {
    const col = await figma.variables.getVariableCollectionByIdAsync(colId);
    const m = col && col.modes.find((x) => x.name === modeName);
    if (m) { node.setExplicitVariableModeForCollection(col, m.modeId); changed.push(col.name + "=" + modeName); }
  }
  return changed;
}

/** An auto-layout frame with no fill (fill it with a token if it needs one). */
function frame(dir = "VERTICAL", name = "Frame") {
  const f = figma.createAutoLayout(dir, { name });
  f.fills = [];
  return f;
}

const _paint = async (name) => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", await _get("var", name));
async function fill(node, name) { node.fills = [await _paint(name)]; return node; }
async function stroke(node, colorName, weightName, align = "INSIDE") {
  node.strokes = [await _paint(colorName)];
  node.strokeAlign = align;
  if (weightName) node.setBoundVariable("strokeWeight", await _get("var", weightName));
  return node;
}
/** Bind any numeric field (itemSpacing, paddingLeft, width, height, minWidth, opacity …) to a variable. */
async function bind(node, field, name) { node.setBoundVariable(field, await _get("var", name)); return node; }
async function gap(node, name) { return bind(node, "itemSpacing", name); }
/** pad(node, all) · pad(node, vertical, horizontal) · pad(node, top, right, bottom, left) — names, not numbers. */
async function pad(node, t, r = t, b = t, l = r) {
  for (const [f, n] of [["paddingTop", t], ["paddingRight", r], ["paddingBottom", b], ["paddingLeft", l]]) if (n) await bind(node, f, n);
  return node;
}
async function radius(node, name) {
  for (const f of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) await bind(node, f, name);
  return node;
}
async function effect(node, styleName) { await node.setEffectStyleIdAsync((await _get("style", styleName)).id); return node; }

/** A text node in a Zebra text style and colour token. Width hugs; set FILL after appending to wrap. */
async function text(chars, styleName, colorName = "foreground/primary") {
  const st = await _get("style", styleName);
  await figma.loadFontAsync(st.fontName);
  const t = figma.createText();
  await t.setTextStyleIdAsync(st.id);
  t.characters = chars;
  await fill(t, colorName);
  return t;
}

/** Copy an image fill from a source node (same file), keeping its crop and scale mode. */
function imageFrom(sourceNode, target) {
  const img = (sourceNode.fills || []).find((p) => p.type === "IMAGE");
  if (!img) throw new Error(`${sourceNode.name} has no image fill`);
  target.fills = [JSON.parse(JSON.stringify(img))];
  return target;
}

/** Append and size in one go: add(parent, child, "FILL", "HUG"). */
function add(parent, child, h, v) {
  parent.appendChild(child);
  if (h) child.layoutSizingHorizontal = h;
  if (v) child.layoutSizingVertical = v;
  return child;
}
