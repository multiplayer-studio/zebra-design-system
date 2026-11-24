// Read-only. Pass this whole file as `code` to use_figma after editing INPUT.
// Lists every line that divides a screen: strokes on frames and instances
// (with the sides they draw, so a top-only border reads as a divider), Divider
// instances, LINE nodes, and 1–2px rectangles or frames with a fill. Library
// instances count too: a sub menu's right border or a footer's top border is
// drawn by the instance itself, and is easy to miss. Walks into library
// instances only to `instanceDepth` so the output stays short.
const INPUT = {
  ids: ["0:0"],        // screen frames
  maxDepth: 6,         // layout levels below each screen
  instanceDepth: 1,    // levels inside a library instance (its own border is depth 0)
};

const vcache = {};
async function vn(id) {
  if (!(id in vcache)) { const v = await figma.variables.getVariableByIdAsync(id); vcache[id] = v ? v.name : "?"; }
  return vcache[id];
}
const hex = (c) => [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
async function paint(ps) {
  if (!ps || ps === figma.mixed) return null;
  const p = ps.find((x) => x.visible !== false && x.type === "SOLID");
  if (!p) return null;
  const b = p.boundVariables && p.boundVariables.color;
  return b ? await vn(b.id) : "RAW#" + hex(p.color);
}
function sides(n) {
  if (!("strokeTopWeight" in n)) return n.strokeWeight === figma.mixed ? "mixed" : "all " + n.strokeWeight;
  const w = [n.strokeTopWeight, n.strokeRightWeight, n.strokeBottomWeight, n.strokeLeftWeight];
  if (w.every((x) => x === w[0])) return w[0] ? "all " + w[0] : null;
  return ["top", "right", "bottom", "left"].filter((_, i) => w[i]).map((s, i) => s).join("+") + " " + Math.max(...w);
}
const out = {};
async function walk(n, path, d, inInst, screen) {
  if (n.visible === false) return;
  const here = path ? path + " > " + n.name : n.name;
  const box = Math.round(n.width) + "x" + Math.round(n.height);
  const at = n.absoluteBoundingBox && screen.absoluteBoundingBox
    ? "@" + Math.round(n.absoluteBoundingBox.x - screen.absoluteBoundingBox.x) + "," + Math.round(n.absoluteBoundingBox.y - screen.absoluteBoundingBox.y) : "";
  const rows = out[screen.name];
  if (n.type === "INSTANCE") {
    const mc = await n.getMainComponentAsync();
    const name = mc ? (mc.parent && mc.parent.type === "COMPONENT_SET" ? mc.parent.name : mc.name) : n.name;
    if (/divider/i.test(name)) { rows.push({ kind: "Divider", path: here, box, at, color: await paint(n.fills) || await paint(n.strokes), variant: mc && mc.name }); return; }
  }
  if (n.type === "LINE") { rows.push({ kind: "line", path: here, box, at, color: await paint(n.strokes) }); return; }
  if ((n.type === "RECTANGLE" || n.type === "FRAME") && (n.width <= 2 || n.height <= 2) && Math.max(n.width, n.height) >= 16) {
    const c = await paint(n.fills); if (c) rows.push({ kind: "thin " + n.type.toLowerCase(), path: here, box, at, color: c });
  }
  if ("strokes" in n && n.strokes.length && n.type !== "TEXT" && n.type !== "VECTOR") {
    const c = await paint(n.strokes), s = sides(n);
    // Strokes on small controls (inputs, buttons, chips) are their own outline, not layout dividers.
    if (c && s && (n.width >= 120 || n.height >= 120)) rows.push({ kind: "border", sides: s, align: n.strokeAlign, path: here, box, at, color: c });
  }
  if (!("children" in n) || d >= INPUT.maxDepth) return;
  const isInst = n.type === "INSTANCE";
  const depthIn = inInst + (isInst || inInst ? 1 : 0);
  if (depthIn > INPUT.instanceDepth) return;
  for (const c of n.children) await walk(c, here, d + 1, depthIn, screen);
}

for (const id of INPUT.ids) {
  const s = await figma.getNodeByIdAsync(id);
  if (!s) { out[id] = "missing"; continue; }
  out[s.name] = [];
  for (const c of s.children) await walk(c, "", 1, 0, s);
}
return out;
