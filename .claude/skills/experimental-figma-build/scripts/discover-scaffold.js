// discover-scaffold.js — read-only. Run with use_figma, once per page.
// Maps a component page: its boards (top-level frames), what each holds —
// details card text layers, component sets, status/log instances — any
// metadata frames, and where free space starts. Replace INPUT before running.
const INPUT = {
  nodeId: "__NODE_ID__", // the page, or any node on it
  depth: 4               // how deep to list each board
};

const start = await figma.getNodeByIdAsync(INPUT.nodeId);
if (!start) return { error: "Node " + INPUT.nodeId + " not found" };
let page = start;
while (page && page.type !== "PAGE") page = page.parent;
if (!page) return { error: "No page for " + INPUT.nodeId };
await figma.setCurrentPageAsync(page);

const tree = (n, d) => {
  const o = { id: n.id, type: n.type, name: n.name, w: Math.round(n.width), h: Math.round(n.height), x: Math.round(n.x), y: Math.round(n.y) };
  if (n.type === "TEXT") o.text = n.characters.slice(0, 120);
  if (n.type === "INSTANCE" && n.mainComponent) {
    const m = n.mainComponent;
    o.of = m.parent && m.parent.type === "COMPONENT_SET" ? m.parent.name + " {" + m.name + "}" : m.name;
    o.remote = m.remote || undefined;
  }
  if (n.type === "COMPONENT_SET") o.variants = n.children.length;
  if (d < INPUT.depth && "children" in n && n.type !== "INSTANCE" && n.type !== "COMPONENT_SET") o.children = n.children.map((c) => tree(c, d + 1));
  return o;
};

const boards = page.children.filter((c) => c.type === "FRAME" || c.type === "SECTION");
const sets = page.findAllWithCriteria({ types: ["COMPONENT_SET", "COMPONENT"] })
  .filter((c) => !(c.type === "COMPONENT" && c.parent && c.parent.type === "COMPONENT_SET"))
  .map((s) => {
    let b = s; while (b.parent && b.parent.type !== "PAGE") b = b.parent;
    return { id: s.id, name: s.name, type: s.type, board: b.name,
      variants: s.type === "COMPONENT_SET" ? s.children.length : 1,
      props: Object.fromEntries(Object.entries(s.componentPropertyDefinitions).map(([k, v]) => [k, v.type + (v.variantOptions ? ":" + v.variantOptions.join("|") : "")])) };
  });
const metadata = page.findAllWithCriteria({ types: ["FRAME", "SECTION"] })
  .filter((f) => /metadata\s*$/i.test(f.name.trim())).map((f) => ({ id: f.id, name: f.name }));

// Status pill options, so the build can pick an existing in-progress value.
const status = page.findAllWithCriteria({ types: ["INSTANCE"] }).find((i) => /component status/i.test(i.name));
let statusOptions = null;
if (status) {
  const m = await status.getMainComponentAsync();
  const set = m && m.parent && m.parent.type === "COMPONENT_SET" ? m.parent : null;
  if (set) statusOptions = Object.fromEntries(Object.entries(set.componentPropertyDefinitions).filter(([, v]) => v.variantOptions).map(([k, v]) => [k, v.variantOptions]));
}

const right = page.children.reduce((m, c) => Math.max(m, c.x + c.width), 0);
return {
  page: { id: page.id, name: page.name },
  boards: boards.map((b) => tree(b, 0)),
  sets,
  metadata,
  statusOptions,
  freeSpaceStartsAtX: Math.round(right + 200)
};
