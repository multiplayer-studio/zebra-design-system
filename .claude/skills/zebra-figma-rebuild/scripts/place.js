// place.js — WRITES. Run with use_figma once, after the user has chosen where the rebuild goes.
// Creates one empty frame per source screen, same name and size, and returns sourceId → targetId so the build
// calls know where to draw. Never moves, edits or deletes the source.
//
//   mode "beside"            right of each screen (gap), or below it when that spot is taken
//   mode "new-section"       a new section (sectionName) below the source, screens in their original
//                            relative layout so the flow still reads the same way
//   mode "existing-section"  appended to the bottom of sectionId, same relative layout, section grows to fit
//
// The section fill binds surface/page: pass its key (catalog.mjs --keys "surface/page") as pageFillKey.
const INPUT = {
  mode: "new-section",
  screenIds: ["__SCREEN_ID__"],
  sectionId: null,          // existing-section only
  sectionName: "Rebuild",
  gap: 160,                 // between a screen and its rebuild in "beside"
  sectionPad: 240,          // inner padding of a section, room for stage labels above the screens
  pageFillKey: "__KEY__",   // surface/page
};

const screens = [];
for (const id of INPUT.screenIds) {
  const n = await figma.getNodeByIdAsync(id);
  if (!n) return { error: "Screen " + id + " not found" };
  screens.push(n);
}
let page = screens[0];
while (page && page.type !== "PAGE") page = page.parent;
await figma.setCurrentPageAsync(page);

const abs = (n) => { const b = n.absoluteBoundingBox || { x: n.x, y: n.y, width: n.width, height: n.height }; return { x: b.x, y: b.y, w: b.width, h: b.height }; };
const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const makeFrame = (src) => {
  const f = figma.createFrame();
  f.name = src.name;
  f.resize(src.width, src.height);
  f.fills = [];
  f.clipsContent = true;
  return f;
};
const sectionFill = async (s) => {
  const v = await figma.variables.importVariableByKeyAsync(INPUT.pageFillKey);
  s.fills = [figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", v)];
};

const map = [];

if (INPUT.mode === "beside") {
  for (const s of screens) {
    // Place in the screen's own container unless that container lays its children out itself.
    let parent = s.parent;
    if (parent.type === "COMPONENT_SET" || (parent.type === "FRAME" && parent.layoutMode && parent.layoutMode !== "NONE") || parent.type === "INSTANCE") parent = page;
    const sb = abs(s);
    const siblings = parent.children.filter((c) => c !== s).map(abs);
    let at = { x: sb.x + sb.w + INPUT.gap, y: sb.y, w: sb.w, h: sb.h };
    if (siblings.some((b) => hit(b, at))) at = { x: sb.x, y: sb.y + sb.h + INPUT.gap, w: sb.w, h: sb.h };
    let tries = 0;
    while (siblings.some((b) => hit(b, at)) && tries++ < 50) at.y += sb.h + INPUT.gap;
    const f = makeFrame(s);
    parent.appendChild(f);
    const pb = parent.type === "PAGE" ? { x: 0, y: 0 } : abs(parent);
    f.x = at.x - pb.x;
    f.y = at.y - pb.y;
    if (parent.type === "SECTION") {
      const r = abs(parent);
      const need = { w: Math.max(r.w, at.x + at.w - r.x + INPUT.sectionPad), h: Math.max(r.h, at.y + at.h - r.y + INPUT.sectionPad) };
      if (need.w > r.w || need.h > r.h) parent.resizeWithoutConstraints(need.w, need.h);
    }
    map.push({ source: s.id, target: f.id, name: s.name, placed: at.x > sb.x ? "right" : "below", dx: at.x - sb.x, dy: at.y - sb.y });
  }
  return { mode: INPUT.mode, map };
}

// Section modes: keep the screens' relative layout.
const boxes = screens.map(abs);
const minX = Math.min(...boxes.map((b) => b.x)), minY = Math.min(...boxes.map((b) => b.y));
const spanW = Math.max(...boxes.map((b) => b.x + b.w)) - minX, spanH = Math.max(...boxes.map((b) => b.y + b.h)) - minY;
const P = INPUT.sectionPad;

let section, originX, originY;
if (INPUT.mode === "new-section") {
  section = figma.createSection();
  section.name = INPUT.sectionName;
  page.appendChild(section);
  await sectionFill(section);
  // Below the source, clear of anything already on the page.
  const others = page.children.filter((c) => c !== section).map(abs);
  const at = { x: minX - P, y: Math.max(...boxes.map((b) => b.y + b.h)) + 400, w: spanW + 2 * P, h: spanH + 2 * P };
  // Start below the source's own section/frame if it sits in one.
  const holder = screens[0].parent;
  if (holder.type !== "PAGE") { const hb = abs(holder); if (hb.y + hb.h + 400 > at.y && hb.x < at.x + at.w && hb.x + hb.w > at.x) at.y = hb.y + hb.h + 400; }
  let tries = 0;
  while (others.some((b) => hit(b, at)) && tries++ < 100) {
    const blocker = others.filter((b) => hit(b, at)).reduce((m, b) => Math.max(m, b.y + b.h), at.y);
    at.y = blocker + 400;
  }
  section.x = at.x; section.y = at.y;
  section.resizeWithoutConstraints(at.w, at.h);
  originX = P; originY = P;
} else if (INPUT.mode === "existing-section") {
  section = await figma.getNodeByIdAsync(INPUT.sectionId);
  if (!section || section.type !== "SECTION") return { error: "sectionId is not a section" };
  const r = abs(section);
  const contentBottom = section.children.length ? Math.max(...section.children.map((c) => c.y + c.height)) : 0;
  // One screen joins the bottom row, right of its last screen, when that row holds screens of the same height
  // (a run of rebuilds stays one row); anything else starts a new row below.
  const lastRow = section.children.filter((c) => Math.abs(c.y + c.height - contentBottom) < 2 && Math.abs(c.height - spanH) < 2);
  if (screens.length === 1 && lastRow.length) {
    const right = lastRow.reduce((m, c) => (c.x + c.width > m.x + m.width ? c : m));
    originX = right.x + right.width + 160; originY = right.y;
  } else { originX = P; originY = contentBottom + (section.children.length ? 400 : P); }
  section.resizeWithoutConstraints(Math.max(r.w, originX + spanW + P), Math.max(r.h, originY + spanH + P));
} else return { error: "mode must be beside, new-section or existing-section" };

for (let i = 0; i < screens.length; i++) {
  const s = screens[i], b = boxes[i];
  const f = makeFrame(s);
  section.appendChild(f);
  f.x = originX + (b.x - minX);
  f.y = originY + (b.y - minY);
  map.push({ source: s.id, target: f.id, name: s.name });
}
const sb = abs(section);
// Offset from a source position (absolute) to its rebuild (absolute): use it to carry annotations across.
return { mode: INPUT.mode, section: { id: section.id, name: section.name, x: sb.x, y: sb.y, w: sb.w, h: sb.h }, offset: { dx: sb.x + originX - minX, dy: sb.y + originY - minY }, map };
