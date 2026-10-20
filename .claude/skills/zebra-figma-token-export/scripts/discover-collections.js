// discover-collections.js — read-only. Run with use_figma.
// Lists every local variable collection, its modes, and the extension graph.
// No INPUT to replace; the file key is passed to use_figma itself.

const collections = await figma.variables.getLocalVariableCollectionsAsync();

const PAGE = 60; // variables per export call, to stay under the ~20KB response cap

const rows = collections.map((c) => {
  const isExt = !!c.isExtension;
  const row = {
    id: c.id,
    name: c.name,
    key: c.key,
    remote: !!c.remote,
    hiddenFromPublishing: !!c.hiddenFromPublishing,
    isExtension: isExt,
    defaultModeId: c.defaultModeId,
    defaultMode: (c.modes.find((m) => m.modeId === c.defaultModeId) || c.modes[0] || {}).name,
    modes: c.modes.map((m) => {
      const e = { modeId: m.modeId, name: m.name };
      if (m.parentModeId) e.parentModeId = m.parentModeId;
      return e;
    }),
    variableCount: c.variableIds.length
  };
  if (isExt) {
    row.parentVariableCollectionId = c.parentVariableCollectionId;
    row.rootVariableCollectionId = c.rootVariableCollectionId;
    const ov = c.variableOverrides || {};
    row.overrideCount = Object.keys(ov).length;
    // how many overridden values exist per mode, so an empty mode is visible up front
    const perMode = {};
    for (const m of c.modes) perMode[m.name] = 0;
    for (const byMode of Object.values(ov)) {
      for (const modeId of Object.keys(byMode)) {
        const mode = c.modes.find((m) => m.modeId === modeId);
        if (mode) perMode[mode.name] = (perMode[mode.name] || 0) + 1;
      }
    }
    row.overridesByMode = perMode;
    row.note = "variableCount includes variables inherited from the parent; only overrideCount get files";
  }
  return row;
});

const byId = {};
rows.forEach((r) => { byId[r.id] = r; });
const nameOf = (id) => (byId[id] ? byId[id].name : "unknown:" + id);

const bases = rows.filter((r) => !r.isExtension);
const extensions = rows.filter((r) => r.isExtension).map((r) => ({
  id: r.id,
  name: r.name,
  parent: nameOf(r.parentVariableCollectionId),
  parentId: r.parentVariableCollectionId,
  root: nameOf(r.rootVariableCollectionId),
  rootId: r.rootVariableCollectionId,
  overrideCount: r.overrideCount,
  overridesByMode: r.overridesByMode,
  modeMap: r.modes.map((m) => ({
    mode: m.name,
    modeId: m.modeId,
    parentMode: (() => {
      const p = byId[r.parentVariableCollectionId];
      if (!p || !m.parentModeId) return null;
      const pm = p.modes.find((x) => x.modeId === m.parentModeId);
      return pm ? pm.name : null;
    })()
  }))
}));

const warnings = [];
for (const r of rows) {
  if (!r.isExtension && r.variableCount === 0) warnings.push("Collection '" + r.name + "' has no variables; no files will be written for it.");
  if (r.isExtension && r.overrideCount === 0) warnings.push("Extension '" + r.name + "' overrides nothing; no files will be written for it.");
  if (r.remote) warnings.push("Collection '" + r.name + "' is remote (owned by another library); its variables cannot be enumerated from this file.");
}

return {
  fileName: figma.root.name,
  collectionCount: rows.length,
  collections: rows,
  graph: {
    bases: bases.map((b) => ({
      id: b.id, name: b.name, variableCount: b.variableCount, modes: b.modes.map((m) => m.name),
      pages: Math.max(1, Math.ceil(b.variableCount / PAGE)), pageSize: PAGE
    })),
    extensions
  },
  warnings
};
