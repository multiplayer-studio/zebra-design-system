// discover.js — read-only. Run with use_figma.
// Finds the component page, its master component set, subcomponent sets,
// and the "<Name> Metadata" frame. Replace INPUT before running.
const INPUT = {
  nodeId: "__NODE_ID__" // any node on the component page, or the page itself ("2364:6017")
};

const start = await figma.getNodeByIdAsync(INPUT.nodeId);
if (!start) return { error: "Node " + INPUT.nodeId + " not found" };
let page = start;
while (page && page.type !== "PAGE") page = page.parent;
if (!page) return { error: "Could not resolve a page for " + INPUT.nodeId };
await figma.setCurrentPageAsync(page);

const topAncestor = (n) => { let x = n; while (x.parent && x.parent.type !== "PAGE") x = x.parent; return x; };

const all = page.findAllWithCriteria({ types: ["COMPONENT_SET", "COMPONENT"] })
  .filter((c) => !(c.type === "COMPONENT" && c.parent && c.parent.type === "COMPONENT_SET"));

const componentSets = all.map((s) => {
  const defs = s.componentPropertyDefinitions;
  const props = {};
  for (const [k, v] of Object.entries(defs)) {
    props[k] = v.type + (v.variantOptions ? " (" + v.variantOptions.length + " options)" : "");
  }
  return {
    id: s.id,
    name: s.name,
    type: s.type,
    private: /^[_.]/.test(s.name.trim()),
    variantCount: s.type === "COMPONENT_SET" ? s.children.length : 1,
    props,
    hasDescription: !!(s.description && s.description.trim()),
    frame: topAncestor(s).name
  };
});

const metadataFrames = page.findAllWithCriteria({ types: ["FRAME", "SECTION"] })
  .filter((f) => /metadata\s*$/i.test(f.name.trim()))
  .map((f) => ({ id: f.id, name: f.name }));

const pub = componentSets.filter((s) => !s.private);
const pageName = page.name.trim().toLowerCase();
const master = pub.find((s) => s.name.trim().toLowerCase() === pageName) || pub[0] || null;

return {
  page: { id: page.id, name: page.name },
  topLevel: page.children.map((c) => ({ id: c.id, name: c.name, type: c.type })),
  componentSets,
  metadataFrames,
  guess: {
    masterId: master ? master.id : null,
    subcomponentIds: componentSets.filter((s) => !master || s.id !== master.id).map((s) => s.id),
    metadataFrameId: metadataFrames.length ? metadataFrames[0].id : null
  }
};
