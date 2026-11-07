// inventory.js — read-only. Run with use_figma on the file being rebuilt.
// Works out WHAT to rebuild from the link the user shared and WHERE a rebuild could go.
//   - A screen (frame, component or instance) → that one screen.
//   - A section, or a frame that only holds screens → every screen in it, in reading order, plus the
//     annotations around them (labels, arrows, notes) so the rebuild can carry them across.
// Per screen it counts what the old design is made of, so you know how far it is from Zebra before reading it:
// instances by library, variable collections (Zebra's are lowercase: size, typography, primitives, semantics,
// palette), text styles and image layers. It also lists the page's existing "Rebuild" sections for placement.
const INPUT = {
  nodeId: "__NODE_ID__",
  minScreen: 320, // a frame at least this wide and tall counts as a screen
};

const ZEBRA = /^(size|typography|primitives|semantics|palette)$/;
const root = await figma.getNodeByIdAsync(INPUT.nodeId);
if (!root) return { error: "Node " + INPUT.nodeId + " not found" };
let page = root;
while (page && page.type !== "PAGE") page = page.parent;
await figma.setCurrentPageAsync(page);

const isScreenType = (n) => ["FRAME", "COMPONENT", "INSTANCE", "COMPONENT_SET"].includes(n.type);
const isScreen = (n) => isScreenType(n) && n.visible !== false && n.width >= INPUT.minScreen && n.height >= INPUT.minScreen;
const box = (n) => ({ x: Math.round(n.absoluteBoundingBox ? n.absoluteBoundingBox.x : n.x), y: Math.round(n.absoluteBoundingBox ? n.absoluteBoundingBox.y : n.y), w: Math.round(n.width), h: Math.round(n.height) });
const order = (a, b) => (Math.abs(a.y - b.y) > 40 ? a.y - b.y : a.x - b.x);

// A container is a section, a page, or a non-auto-layout frame whose screen-sized children are all frames.
let mode = "single", screens = [], annotations = [];
const kids = "children" in root ? root.children.filter((c) => c.visible !== false) : [];
const screenKids = kids.filter(isScreen);
const containerFrame = root.type === "FRAME" && (root.layoutMode === "NONE" || !root.layoutMode) && screenKids.length >= 2;
if (root.type === "SECTION" || root.type === "PAGE" || containerFrame) {
  mode = "container";
  // Screens may sit one level down inside a sub-section or a grouping frame. A screen-sized frame is itself a
  // screen (a dialog state is often a base screen + scrim + modal stacked at full size); only a frame clearly
  // bigger than the screens it holds is a grouping frame to look inside.
  const groups = (c) => {
    if (c.type === "SECTION" || c.type === "GROUP") return "children" in c && c.children.some(isScreen);
    if (c.type !== "FRAME" || !("children" in c)) return false;
    const inner = c.children.filter(isScreen);
    if (inner.length < 2) return false;
    const biggest = Math.max(...inner.map((g) => g.width * g.height));
    return c.width * c.height > biggest * 1.5;
  };
  for (const c of kids) {
    if (groups(c)) for (const g of c.children) { if (isScreen(g)) screens.push(g); else if (g.visible !== false) annotations.push(g); }
    else if (isScreen(c)) screens.push(c);
    else annotations.push(c);
  }
} else if (isScreen(root)) screens = [root];
else return { error: "Not a screen, frame of screens or section: " + root.type + " " + root.name };

screens.sort((a, b) => order(box(a), box(b)));

const varCache = {};
async function collectionOf(id) {
  if (!(id in varCache)) {
    const v = await figma.variables.getVariableByIdAsync(id);
    let c = "?";
    if (v) { const col = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); c = col ? col.name : "?"; }
    varCache[id] = c;
  }
  return varCache[id];
}

async function summary(s) {
  const libs = { zebraVars: 0, foreignVars: {}, instances: {}, textStyles: {}, images: 0, rawFills: 0, texts: 0 };
  for (const n of s.findAll(() => true)) {
    if (n.type === "INSTANCE") {
      const mc = await n.getMainComponentAsync();
      if (mc) { const set = mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent : mc; const k = set.name + (mc.remote ? "" : " (local)"); libs.instances[k] = (libs.instances[k] || 0) + 1; }
    }
    if (n.type === "TEXT") {
      libs.texts++;
      const st = typeof n.textStyleId === "string" && n.textStyleId ? await figma.getStyleByIdAsync(n.textStyleId) : null;
      const k = st ? st.name : "(no style) " + (n.fontSize === figma.mixed ? "mixed" : n.fontSize);
      libs.textStyles[k] = (libs.textStyles[k] || 0) + 1;
    }
    const ids = [];
    for (const v of Object.values(n.boundVariables || {})) for (const a of Array.isArray(v) ? v : [v]) if (a && a.id) ids.push(a.id);
    for (const key of ["fills", "strokes"]) {
      if (!Array.isArray(n[key])) continue;
      for (const p of n[key]) {
        if (p.visible === false) continue;
        if (p.type === "IMAGE") libs.images++;
        else if (p.type === "SOLID") { if (p.boundVariables && p.boundVariables.color) ids.push(p.boundVariables.color.id); else if (n.type !== "INSTANCE") libs.rawFills++; }
      }
    }
    for (const id of ids) { const c = await collectionOf(id); if (ZEBRA.test(c)) libs.zebraVars++; else libs.foreignVars[c] = (libs.foreignVars[c] || 0) + 1; }
  }
  const top = (o, n) => Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n));
  return { instances: top(libs.instances, 14), textStyles: top(libs.textStyles, 10), zebraVars: libs.zebraVars, foreignVars: libs.foreignVars, images: libs.images, rawFills: libs.rawFills, texts: libs.texts };
}

const out = [];
for (const s of screens) out.push(Object.assign({ id: s.id, name: s.name, type: s.type, ...box(s), parent: s.parent.type + " " + s.parent.name }, await summary(s)));

const rebuildSections = page.findAllWithCriteria({ types: ["SECTION"] }).filter((x) => /rebuild/i.test(x.name)).map((x) => ({ id: x.id, name: x.name, ...box(x), children: x.children.length }));
const all = screens.map(box);
const bounds = all.length ? { x: Math.min(...all.map((b) => b.x)), y: Math.min(...all.map((b) => b.y)), right: Math.max(...all.map((b) => b.x + b.w)), bottom: Math.max(...all.map((b) => b.y + b.h)) } : null;

return {
  page: { id: page.id, name: page.name },
  source: { id: root.id, type: root.type, name: root.name, ...box(root) },
  mode,
  screens: out,
  annotations: annotations.slice(0, 60).map((a) => ({ id: a.id, type: a.type, name: a.name, ...box(a), text: a.type === "TEXT" ? a.characters.slice(0, 120) : undefined })),
  bounds,
  rebuildSections,
};
