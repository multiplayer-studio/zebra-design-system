// build-docs.js — writes to Figma. Run with use_figma, skillNames "figma-use,figma-generate-design".
// Replace INPUT, pass the whole file as `code`. A frame that exists keeps its section and position,
// and only its contents are rebuilt. The fit step keeps the page on its spacing grid.
const INPUT = {
  pageId: "7819:31376",
  version: "v1",
  updated: "Nov 2, 2026",
  // primitive | palette:<Mode> | semantic:<Mode> | extension:<brand> | typography | size | fit
  steps: ["fit"],
};

// Where a frame goes if it has to be created. Anything not listed is a new theme, and joins Extensions.
const HOME = { Primitive: "Base Theme: AA Light", Light: "Base Theme: AA Light", Dark: "AA Dark", "AAA Light": "AAA Light", "AAA Dark": "AAA Dark", Typography: "Typography", Sizes: "Sizes" };
// Left to right. Each page heading sits over its section.
const SECTIONS = ["Typography", "Sizes", "Base Theme: AA Light", "AA Dark", "AAA Light", "AAA Dark", "Extensions"];
const HEADINGS = { Typography: "Typography", Sizes: "Sizes", "Colors and Modes": "Base Theme: AA Light", "Extended Collections": "Extensions" };
const COPY = {
  Primitive: ["Primitive tokens are the raw ingredients of our color system. They represent our entire available palette at its most granular level, defined by literal color values (HEX or RGB) rather than by how they are used.", "Aug 3, 2026"],
  Palette: ["The palette tokens handle theming and are structured to enable easily extending the collection to adapt to new visual directions.", "Aug 3, 2026"],
  Semantic: ["Our semantic tokens translate our raw palette into a functional language by defining color variables based on their intent and purpose, creating a purposeful bridge between our base colors and the components they power.", "Aug 3, 2026"],
  Sizes: ["Size tokens set spacing, control dimensions, radius, stroke and shadow. Components read these names, and each one can change with the breakpoint or the brand.", INPUT.updated],
};
const ORDER = {
  primitive: ["pure", "neutral", "brand", "system", "accent", "extend", "alpha"],
  palette: ["fill", "ink", "line", "status", "brand", "data", "gradient"],
  semantic: ["surface", "foreground", "border", "interactive/primary", "interactive/secondary", "interactive/ghost", "interactive/destructive", "interactive/inverse", "interactive/neutral", "interactive/positive", "interactive/subtle", "interactive/selection", "selection", "overlay", "feedback", "focus", "shadow", "chart"],
  size: ["space", "control", "radius", "stroke", "shadow", "container", "animations", "shape"],
};
// Section padding, gaps between frames, gaps between sections, and heading to section.
const SPACE = 160;
const PX_SPACE = ["none", "3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];

const page = await figma.getNodeByIdAsync(INPUT.pageId);
await figma.setCurrentPageAsync(page);
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const all = await figma.variables.getLocalVariablesAsync();
const styles = await figma.getLocalTextStylesAsync();
for (const s of styles) await figma.loadFontAsync(s.fontName);
const byId = new Map(all.map((v) => [v.id, v]));
const byName = new Map();
for (const v of all) if (!byName.has(v.name)) byName.set(v.name, v);
const base = (name) => collections.find((c) => c.name === name && !c.isExtension);
const extensions = (name) => collections.filter((c) => c.name === name && c.isExtension);
const style = (name) => styles.find((s) => s.name === name);
const inCollection = (c) => c.variableIds.map((id) => byId.get(id)).filter(Boolean);
const paintOf = (v) => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", v);
const paint = (name) => paintOf(byName.get(name));
// A bound paint keeps its base colour on a frame or section, so start from the resolved one.
const framePaint = (name, node) => {
  const { r, g, b } = byName.get(name).resolveForConsumer(node).value;
  return figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r, g, b } }, "color", byName.get(name));
};
const bindPad = (n, gap, key = "itemSpacing") => n.setBoundVariable(key, byName.get(gap));
const title = (s) => s.split(/[/-]/).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
const byNumber = (a, b) => Number(a) - Number(b);

async function setText(node, value) {
  for (const f of node.getRangeAllFontNames(0, node.characters.length)) await figma.loadFontAsync(f);
  node.characters = value;
}
async function text(parent, value, styleName, colour) {
  const t = figma.createText();
  await t.setTextStyleIdAsync(style(styleName).id);
  t.characters = value;
  t.fills = [paint(colour)];
  parent.appendChild(t);
  return t;
}
function stack(parent, direction, name, gap) {
  const n = figma.createAutoLayout(direction);
  n.name = name;
  n.fills = [];
  parent.appendChild(n);
  n.layoutSizingHorizontal = "FILL";
  if (gap) bindPad(n, gap);
  return n;
}

// Colour helpers: the swatch text takes whichever pure token reads better on the swatch.
const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (c) => 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
const over = (c, bg) => { const a = c.a ?? 1; return { r: c.r * a + bg.r * (1 - a), g: c.g * a + bg.g * (1 - a), b: c.b * a + bg.b * (1 - a) }; };
const ink = (c, bg) => { const l = luminance(over(c, bg)); return (1.05) / (l + 0.05) >= (l + 0.05) / 0.05 ? "color/pure/white" : "color/pure/black"; };
const hexPart = (x) => Math.round(x * 255).toString(16).padStart(2, "0").toUpperCase();
const hex = (c) => `#${hexPart(c.r)}${hexPart(c.g)}${hexPart(c.b)}${(c.a ?? 1) < 1 ? ` ${Math.round(c.a * 100)}%` : ""}`;

// An alias at an opacity arrives as { color: alias, opacity }.
const aliasOf = (value) => (value?.type === "VARIABLE_ALIAS" ? value : value?.color?.type === "VARIABLE_ALIAS" ? value.color : null);

// The alias path from a token down to its primitive, read in the frame's own modes.
async function reference(v, modes, first) {
  const chain = [];
  let value = first ?? (v.valuesByMode[modes[v.variableCollectionId]] ?? Object.values(v.valuesByMode)[0]);
  while (aliasOf(value)) {
    const id = aliasOf(value).id;
    const next = byId.get(id) ?? (await figma.variables.getVariableByIdAsync(id));
    if (!next) break;
    chain.push(next.name);
    value = next.valuesByMode[modes[next.variableCollectionId]] ?? Object.values(next.valuesByMode)[0];
  }
  return chain.length ? chain.join(" -> ") : "(literal)";
}

// resolveForConsumer returns null under an extension mode, so overrides are followed by hand.
async function follow(value, modes, overrides = new Map()) {
  while (aliasOf(value)) {
    const id = aliasOf(value).id;
    const next = byId.get(id) ?? (await figma.variables.getVariableByIdAsync(id));
    value = overrides.get(next.id) ?? next.valuesByMode[modes[next.variableCollectionId]] ?? Object.values(next.valuesByMode)[0];
  }
  return value;
}

// The frames were cloned from a template on a remote library: move what's left onto local tokens.
async function localise(f) {
  const probe = figma.createFrame();
  const measured = (names) => new Map(names.map((n) => [byName.get(n).resolveForConsumer(probe).value, byName.get(n)]));
  const space = measured(PX_SPACE.map((n) => `space/${n}`));
  const radius = measured(["sm", "md", "lg", "xl"].map((n) => `radius/${n}`));
  probe.remove();
  const remote = async (id) => (await figma.variables.getVariableByIdAsync(id))?.remote;
  for (const n of [f, ...f.children.filter((c) => c.type === "FRAME")]) {
    for (const k of ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "itemSpacing"]) {
      const id = n.boundVariables?.[k]?.id;
      if (id && (await remote(id))) n.setBoundVariable(k, space.get(n[k]) ?? null);
    }
    for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) {
      const id = n.boundVariables?.[k]?.id;
      if (id && (await remote(id))) n.setBoundVariable(k, radius.get(n[k]) ?? null);
    }
  }
  if (f.strokes.length) f.strokes = [framePaint("border/default", f)];
}
const doc = (name) => page.findOne((n) => n.type === "FRAME" && n.name === name);
const parts = {};
function part(name) {
  parts[name] ??= page.findOne((n) => n.type === "COMPONENT" && n.name === name);
  if (!parts[name]) throw new Error(`${name} is missing from Docs / Parts, and the frames need it`);
  return parts[name];
}

// A frame that doesn't exist yet is cloned from Typography. A new theme goes in the Extensions row,
// ahead of "How to use extensions", and the row's auto layout widens to take it.
async function newFrame(name) {
  const key = name.split(" / ").pop();
  const f = doc("Docs / Typography").clone();
  f.name = name;
  if (HOME[key]) {
    const home = page.findOne((n) => n.type === "SECTION" && n.name === HOME[key]);
    home.appendChild(f);
    f.x = Math.max(...home.children.filter((c) => c !== f).map((c) => c.x + c.width)) + SPACE;
    f.y = SPACE;
    return f;
  }
  const row = doc("Docs / Companion").parent;
  row.insertChild(row.children.findIndex((c) => c.name === "How to use extensions"), f);
  return f;
}

async function chrome(name, label, heading, copy, width, fill) {
  let f = doc(name);
  const created = !f;
  if (created) f = await newFrame(name);
  f.resize(width, f.height);
  f.layoutSizingVertical = "HUG";
  f.fills = [framePaint(fill, f)];
  const hero = f.findChild((n) => n.name === "Hero");
  await setText(hero.findOne((n) => n.name === "Title"), label);
  await setText(hero.findOne((n) => n.name === "Component Name"), heading);
  await setText(hero.findOne((n) => n.name === "Details").findChild((n) => n.name === "Description"), copy[0]);
  const stamps = hero.findAll((n) => n.type === "TEXT" && n.parent.name === "Time Stamp");
  if (created) await setText(stamps[1], copy[1]);
  await setText(stamps[3], INPUT.updated);
  await localise(f);
  return { f, log: f.findChild((n) => n.name === "Change Log") };
}
async function clearLog(log, keep = () => false) {
  for (const c of [...log.children]) if (!keep(c)) c.remove();
  bindPad(log, "space/3xl");
}
const stamp = (log, count) => text(log, `Version ${INPUT.version.slice(1)} - ${count}`, "label/small", "foreground/tertiary");
async function section(parent, heading) {
  const s = stack(parent, "VERTICAL", heading, "space/lg");
  await text(s, heading, "heading/small", "foreground/primary");
  return s;
}
function cardGrid(parent) {
  const g = stack(parent, "HORIZONTAL", "Cards", "space/md");
  g.layoutWrap = "WRAP";
  bindPad(g, "space/md", "counterAxisSpacing");
  return g;
}
async function addCard(grid, v, consumer, modes, bg, label, first, resolved) {
  const c = part("_Token Card").createInstance();
  grid.appendChild(c);
  c.name = v.name;
  c.fills = [paintOf(v)];
  const value = resolved ?? v.resolveForConsumer(consumer).value;
  const [name, details] = c.children;
  const [code, source] = details.children;
  name.characters = label;
  code.characters = hex(value);
  source.characters = await reference(v, modes, first);
  const colour = paint(ink(value, bg));
  for (const t of [name, code, source]) t.fills = [colour];
}
const modeId = (collection, name) => collection.modes.find((m) => m.name === name).modeId;
const defaults = () => Object.fromEntries(collections.filter((c) => !c.isExtension).map((c) => [c.id, c.defaultModeId]));

async function buildPrimitive() {
  const { f, log } = await chrome("Docs / Primitive", "COLOR TOKENS", "Primitive", COPY.Primitive, 1471, "surface/page");
  await clearLog(log);
  const modes = defaults();
  const bg = byName.get("surface/page").resolveForConsumer(f).value;
  const tokens = inCollection(base("primitives")).filter((v) => v.resolvedType === "COLOR");
  await stamp(log, `${tokens.length} tokens`);
  const groups = {};
  for (const v of tokens) {
    const [, group, ramp, step] = v.name.split("/");
    ((groups[group] ??= {})[step === undefined ? "" : ramp] ??= []).push(v);
  }
  for (const group of ORDER.primitive) {
    const s = await section(log, title(group));
    const rows = stack(s, "VERTICAL", "Ramps", "space/lg");
    for (const [ramp, vars] of Object.entries(groups[group])) {
      const strip = stack(rows, "HORIZONTAL", ramp || group);
      const sorted = [...vars].sort((a, b) => (ramp ? byNumber(b.name.split("/").pop(), a.name.split("/").pop()) : 0));
      for (const v of sorted) {
        const c = part("_Token Swatch").createInstance();
        strip.appendChild(c);
        if (ramp) c.layoutSizingHorizontal = "FILL";
        c.name = v.name;
        c.fills = [paintOf(v)];
        const value = v.resolveForConsumer(f).value;
        const [name, code] = c.children[0].children;
        name.characters = v.name.split("/").slice(1).filter((p) => group !== "pure" || p !== "pure").join("-");
        code.characters = hex(value);
        const colour = paint(ink(value, bg));
        name.fills = code.fills = [colour];
      }
    }
  }
  return f;
}

function groupOf(kind, name) {
  const p = name.split("/");
  return kind === "semantic" && p[0] === "interactive" ? `${p[0]}/${p[1]}` : p[0];
}
function sectionsFor(kind, tokens) {
  const groups = {};
  for (const v of tokens) (groups[groupOf(kind, v.name)] ??= []).push(v);
  const known = ORDER[kind].filter((k) => groups[k]);
  return [...known, ...Object.keys(groups).filter((k) => !known.includes(k)).sort()].map((k) => {
    const list = groups[k];
    list.sort((a, b) => { const x = a.name.split("/").pop(), y = b.name.split("/").pop(); return isNaN(x) || isNaN(y) ? 0 : byNumber(x, y); });
    return [k, list];
  });
}
async function buildColour(kind, mode) {
  const collection = base(kind === "palette" ? "palette" : "semantics");
  const palette = base("palette");
  const heading = kind === "palette" ? "Palette" : "Semantic";
  const { f, log } = await chrome(`Docs / ${heading} / ${mode}`, `COLOR TOKENS · ${mode.toUpperCase()}`, heading, COPY[heading], 1410, "surface/page");
  f.setExplicitVariableModeForCollection(palette, modeId(palette, mode));
  await clearLog(log);
  const modes = { ...defaults(), [palette.id]: modeId(palette, mode) };
  const bg = byName.get("surface/page").resolveForConsumer(f).value;
  const tokens = inCollection(collection).filter((v) => v.resolvedType === "COLOR");
  await stamp(log, `${tokens.length} tokens`);
  for (const [key, list] of sectionsFor(kind, tokens)) {
    const s = await section(log, title(key));
    const grid = cardGrid(s);
    for (const v of list) await addCard(grid, v, f, modes, bg, v.name.slice(key.length + 1));
  }
  return f;
}

// A palette token inherits any change to its primitive, so a brand needs every one of its
// collections set, or its primitive overrides never reach the palette. Returns the merged overrides.
function applyBrand(grid, name, paletteMode) {
  const overrides = new Map();
  for (const e of extensions(name)) {
    const mode = e.modes.length === 1 ? e.modes[0].modeId : e.modes.find((m) => m.parentModeId === paletteMode)?.modeId;
    grid.setExplicitVariableModeForCollection(e, mode);
    for (const [id, values] of Object.entries(e.variableOverrides)) if (values[mode] !== undefined) overrides.set(id, values[mode]);
  }
  return overrides;
}
// Palette tokens the brand never overrides, but which change because a primitive under them did.
async function inherited(name, palette, modes, bg, log) {
  const primitive = extensions(name).find((e) => e.modes.length === 1);
  const brand = extensions(name).find((e) => e.modes.length > 1);
  if (!primitive || !brand) return;
  for (const mode of brand.modes) {
    const local = { ...modes, [palette.id]: mode.parentModeId };
    const hits = [];
    for (const v of inCollection(palette).filter((x) => x.resolvedType === "COLOR" && brand.variableOverrides[x.id]?.[mode.modeId] === undefined)) {
      let value = v.valuesByMode[mode.parentModeId];
      while (aliasOf(value)) {
        const next = byId.get(aliasOf(value).id);
        if (primitive.variableOverrides[next.id]) { hits.push(v); break; }
        value = next.valuesByMode[local[next.variableCollectionId]] ?? Object.values(next.valuesByMode)[0];
      }
    }
    if (!hits.length) continue;
    const s = await section(log, `Inherited in Palette ${mode.name}`);
    const grid = cardGrid(s);
    const overrides = applyBrand(grid, name, mode.parentModeId);
    for (const v of hits) await addCard(grid, v, s, local, bg, v.name, v.valuesByMode[mode.parentModeId], await follow(v.valuesByMode[mode.parentModeId], local, overrides));
  }
}

async function buildExtension(name) {
  const heading = title(name);
  const { f, log } = await chrome(`Docs / ${heading}`, "BRAND EXTENSION", heading, [`${heading} overrides these tokens and inherits everything else from the base collections.`, INPUT.updated], 1410, "surface/page");
  await clearLog(log);
  const palette = base("palette");
  const modes = defaults();
  const bg = byName.get("surface/page").resolveForConsumer(f).value;
  const sections = [];
  for (const ext of extensions(name)) {
    for (const mode of ext.modes) {
      const ids = Object.entries(ext.variableOverrides).filter(([, m]) => m[mode.modeId] !== undefined).map(([id]) => id);
      if (ids.length) sections.push([ext, mode, ids]);
    }
  }
  await stamp(log, `${sections.reduce((n, e) => n + e[2].length, 0)} overrides`);
  for (const [ext, mode, ids] of sections) {
    const parent = ext.modes.length === 1 ? "Primitives" : `Palette ${mode.name}`;
    const s = await section(log, parent);
    const grid = cardGrid(s);
    const local = { ...modes, [palette.id]: ext.modes.length === 1 ? modes[palette.id] : mode.parentModeId };
    const overrides = applyBrand(grid, name, local[palette.id]);
    for (const id of ids) {
      const v = byId.get(id) ?? (await figma.variables.getVariableByIdAsync(id));
      if (v.resolvedType !== "COLOR") continue;
      const first = ext.variableOverrides[id][mode.modeId];
      await addCard(grid, v, s, local, bg, v.name, first, await follow(first, local, overrides));
    }
  }
  await inherited(name, palette, modes, bg, log);
  return f;
}

// Value tables. A hidden probe frame per mode lets Figma resolve each token, extensions included.
function probeFor(collection, name) {
  const p = figma.createFrame();
  p.setExplicitVariableModeForCollection(collection, modeId(collection, name));
  page.appendChild(p);
  return p;
}
// Condensed overrides one Desktop value per token, so everything else shows as inherited.
function condensedFor(parent) {
  const ext = extensions("condensed").find((e) => e.parentVariableCollectionId === parent.id);
  const mode = modeId(ext, "Desktop");
  return { value: async (v) => { const o = ext.variableOverrides[v.id]?.[mode]; return o === undefined ? undefined : follow(o, defaults()); } };
}
const px = (x) => (typeof x === "number" ? `${Math.round(x * 100) / 100}px` : String(x).split(" ")[0]);
async function tableFrame(table, cols) {
  for (const c of [...table.children]) c.remove();
  bindPad(table, "space/xl");
  table.layoutSizingHorizontal = "FILL";
  const head = stack(table, "HORIZONTAL", "Header");
  for (const [i, [label, width]] of cols.entries()) {
    const t = await text(head, label, "label/large", "foreground/secondary");
    t.textAutoResize = "HEIGHT";
    if (i) t.resize(width, t.height);
    t.layoutSizingHorizontal = i ? "FIXED" : "FILL";
  }
  return stack(table, "VERTICAL", "Styles", "space/2xl");
}
async function row(parent, first, values, cols, name) {
  const r = stack(parent, "HORIZONTAL", name);
  r.counterAxisAlignItems = "CENTER";
  r.appendChild(first);
  if (first.type === "TEXT") first.textAutoResize = "HEIGHT";
  first.layoutSizingHorizontal = "FILL";
  for (const [i, value] of values.entries()) {
    const t = await text(r, value, "body/medium", "foreground/secondary");
    t.textAutoResize = "HEIGHT";
    t.resize(cols[i + 1][1], t.height);
  }
}

async function buildTypography() {
  const { f, log } = await chrome("Docs / Typography", "TEXT STYLES", "Typography", [doc("Docs / Typography").findOne((n) => n.name === "Description").characters, "Aug 13, 2026"], 1240, "surface/section");
  await clearLog(log, (c) => c.name === "Frame 101" || c.name === "Text Styles");
  const type = base("typography");
  const compact = probeFor(type, "Desktop Compact");
  const condensed = condensedFor(type);
  const cols = [["Style"], ["Weight", 140], ["Size", 140], ["Line Height", 140], ["Compact", 140], ["Condensed", 140]];
  const body = await tableFrame(log.findChild((n) => n.name === "Text Styles"), cols);
  const groups = {};
  for (const s of styles) (groups[s.name.split("/")[0]] ??= []).push(s);
  for (const key of ["display", "heading", "title", "body", "label", "indicator"]) {
    const g = stack(body, "VERTICAL", title(key), "space/lg");
    await text(g, title(key), "label/large", "foreground/info");
    for (const s of groups[key]) {
      const size = byId.get(s.boundVariables?.fontSize?.id), line = byId.get(s.boundVariables?.lineHeight?.id);
      const pair = (p) => `${size.resolveForConsumer(p).value}/${line.resolveForConsumer(p).value}`;
      const brand = [await condensed.value(size), await condensed.value(line)];
      const name = await text(g, title(s.name), s.name, "foreground/primary");
      await row(g, name, [s.fontName.style, px(s.fontSize), px(s.lineHeight.value), pair(compact), brand[0] === undefined && brand[1] === undefined ? "--" : `${brand[0] ?? s.fontSize}/${brand[1] ?? s.lineHeight.value}`], cols, s.name);
    }
  }
  compact.remove();
  return f;
}

function specimen(v, group, consumer) {
  const box = figma.createFrame();
  box.name = "Specimen";
  box.fills = [];
  box.resize(72, 24);
  const value = v.resolveForConsumer(consumer).value;
  if (typeof value !== "number" || value < 0 || !["space", "radius", "stroke"].includes(group)) return box;
  const s = figma.createRectangle();
  box.appendChild(s);
  s.fills = [paint("interactive/primary/background/default")];
  if (group === "radius") {
    s.resize(24, 24);
    for (const k of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) s.setBoundVariable(k, v);
  } else if (group === "stroke") {
    s.resize(48, Math.max(value, 1));
    s.setBoundVariable("height", v);
  } else if (group === "space") {
    s.resize(Math.max(value, 1), 16);
    s.setBoundVariable("width", v);
  }
  return box;
}
async function buildSize() {
  const { f, log } = await chrome("Docs / Sizes", "SIZE TOKENS", "Sizes", COPY.Sizes, 1240, "surface/section");
  const size = base("size");
  const table = log.findChild((n) => n.name === "Text Styles");
  await clearLog(log, (c) => c === table);
  const names = ["Desktop", "Tablet", "Mobile", "Desktop Compact"];
  const probes = names.map((n) => probeFor(size, n));
  const condensed = condensedFor(size);
  const cols = [["Token"], ["Source", 160], ["Desktop", 100], ["Tablet", 100], ["Mobile", 100], ["Compact", 100], ["Condensed", 100]];
  const body = await tableFrame(table, cols);
  const groups = {};
  for (const v of inCollection(size)) (groups[v.name.split("/")[0]] ??= []).push(v);
  const modes = defaults();
  for (const key of ORDER.size) {
    if (!groups[key]) continue;
    const g = stack(body, "VERTICAL", title(key), "space/md");
    await text(g, title(key), "label/large", "foreground/info");
    const rank = (v) => { const x = v.resolveForConsumer(probes[0]).value; return typeof x !== "number" ? 0 : x < 0 ? 1e6 - x : x; };
    for (const v of [...groups[key]].sort((a, b) => rank(a) - rank(b))) {
      const first = figma.createAutoLayout("HORIZONTAL");
      first.name = v.name;
      first.fills = [];
      first.itemSpacing = 12;
      first.counterAxisAlignItems = "CENTER";
      first.appendChild(specimen(v, key, probes[0]));
      await text(first, v.name, "label/medium", "foreground/primary");
      const source = await reference(v, modes);
      const values = probes.map((p) => px(v.resolveForConsumer(p).value));
      const brand = await condensed.value(v);
      await row(g, first, [source === "(literal)" ? "--" : source.split(" -> ").pop(), ...values, brand === undefined ? "--" : px(brand)], cols, v.name);
    }
  }
  const g = stack(body, "VERTICAL", "Scale", "space/md");
  await text(g, "Scale", "label/large", "foreground/info");
  for (const v of inCollection(base("primitives")).filter((x) => x.name.startsWith("scale/"))) {
    const first = await text(g, v.name, "label/medium", "foreground/primary");
    await row(g, first, ["primitive", px(v.resolveForConsumer(f).value), "--", "--", "--", "--"], cols, v.name);
  }
  for (const p of probes) p.remove();
  return f;
}

// Sections don't hug their contents, so this holds the page to one spacing value and one height.
function fit() {
  const sections = SECTIONS.map((n) => page.findOne((x) => x.type === "SECTION" && x.name === n));
  const heading = page.children.find((n) => n.type === "TEXT");
  const top = heading.y + heading.height + SPACE;
  const height = Math.max(...sections.flatMap((s) => s.children.map((c) => c.height))) + SPACE * 2;
  let x = sections[0].x;
  for (const s of sections) {
    let inner = SPACE;
    for (const c of [...s.children].sort((a, b) => a.x - b.x)) { c.x = inner; c.y = SPACE; inner += c.width + SPACE; }
    s.resizeWithoutConstraints(inner, height);
    s.x = x;
    s.y = top;
    x += inner + SPACE;
  }
  for (const [label, name] of Object.entries(HEADINGS)) {
    const text = page.children.find((n) => n.type === "TEXT" && n.characters === label);
    if (!text) throw new Error(`Page heading "${label}" has changed. Update HEADINGS to match the page`);
    text.x = sections[SECTIONS.indexOf(name)].x;
  }
  const parts = page.findChild((n) => n.name === "Docs / Parts");
  parts.x = sections[0].x;
  parts.y = top + height + SPACE;
}

const built = {};
for (const step of INPUT.steps) {
  const [kind, arg] = step.split(":");
  const run = { primitive: buildPrimitive, palette: () => buildColour("palette", arg), semantic: () => buildColour("semantic", arg), extension: () => buildExtension(arg), typography: buildTypography, size: buildSize, fit }[kind];
  const node = await run();
  built[step] = node?.id ?? "done";
}
return { built, mutatedNodeIds: Object.values(built).filter((x) => x !== "done") };
