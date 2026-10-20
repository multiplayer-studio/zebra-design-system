// clone-node.js — WRITES. Run with use_figma on a BRANCH file only.
// Clones a node (a reference board, details card or metadata frame) onto the
// target page, renames it, places it clear of existing content, and returns
// every text layer in it so the next call can rewrite them all at once.
// Replace INPUT before running.
const INPUT = {
  sourceId: "__SOURCE_NODE_ID__",   // node to copy (may be on another page)
  targetPageId: "__TARGET_PAGE_ID__",
  name: "__NEW_NAME__",
  removeComponentSets: true,        // drop the reference's own sets/components from the clone
  gap: 200                          // space to the right of existing content
};

const page = await figma.getNodeByIdAsync(INPUT.targetPageId);
if (!page || page.type !== "PAGE") return { error: "Target " + INPUT.targetPageId + " is not a page" };
await figma.setCurrentPageAsync(page);
if (page.children.some((c) => c.name === INPUT.name)) return { error: "\"" + INPUT.name + "\" already exists on this page — update it instead of cloning again" };

const src = await figma.getNodeByIdAsync(INPUT.sourceId);
if (!src) return { error: "Source " + INPUT.sourceId + " not found" };

const right = page.children.reduce((m, c) => Math.max(m, c.x + c.width), 0);
const copy = src.clone();
page.appendChild(copy);
copy.name = INPUT.name;
copy.x = page.children.length > 1 ? right + INPUT.gap : 0;
copy.y = 0;

const removed = [];
if (INPUT.removeComponentSets && "findAll" in copy) {
  for (const n of copy.findAll((x) => x.type === "COMPONENT_SET" || x.type === "COMPONENT")) {
    if (n.parent && n.parent.type === "COMPONENT_SET") continue;
    removed.push(n.name); n.remove();
  }
}
// Loose instances of the reference component (e.g. a demo instance) stay —
// list them so the build can replace or delete them.
const instances = "findAllWithCriteria" in copy ? copy.findAllWithCriteria({ types: ["INSTANCE"] }).map((i) => ({ id: i.id, name: i.name })) : [];
const texts = "findAllWithCriteria" in copy
  ? copy.findAllWithCriteria({ types: ["TEXT"] }).map((t) => ({ id: t.id, name: t.name, parent: t.parent.name, text: t.characters }))
  : [];

return { createdNodeIds: [copy.id], id: copy.id, name: copy.name, x: copy.x, y: copy.y, w: Math.round(copy.width), h: Math.round(copy.height),
  removedComponents: removed, instances: instances.slice(0, 80), texts };
