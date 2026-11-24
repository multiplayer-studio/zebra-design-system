// Read-only. Pass this whole file as `code` to use_figma after editing INPUT.
// Lists a section's top-level children (screens, stage labels, local
// components) in reading order, and for each screen the footer buttons that
// are disabled, the overlays it holds (dialogs, scrims, toasts) and the
// variant state of every local option row. Enough to map the flow's states
// without reading every screen in full.
const INPUT = {
  sectionId: "0:0",
};

const section = await figma.getNodeByIdAsync(INPUT.sectionId);
const kids = [...section.children].sort((a, b) => a.y - b.y || a.x - b.x);
const out = [];
for (const n of kids) {
  const row = { id: n.id, type: n.type, name: n.name, x: Math.round(n.x), y: Math.round(n.y), wh: Math.round(n.width) + "x" + Math.round(n.height) };
  if (n.type === "TEXT") row.text = n.characters.slice(0, 120);
  if (n.type === "FRAME" && n.width >= 360 && n.height >= 360) {
    // Direct children above the screen's main layout are overlays.
    row.overlays = n.children.filter((c) => c.visible && n.children.indexOf(c) > 2).map((c) => c.name);
    const states = [];
    for (const i of n.findAll((x) => x.type === "INSTANCE" && x.visible)) {
      const mc = await i.getMainComponentAsync();
      if (!mc || mc.remote) continue;
      if (mc.parent && mc.parent.type === "COMPONENT_SET") {
        const p = Object.fromEntries(Object.entries(i.componentProperties).filter(([, v]) => v.type === "TEXT").map(([k, v]) => [k.split("#")[0], v.value]));
        states.push((p.Label || p.Title || i.name) + ":" + mc.name.replace(/^State=/, ""));
      }
    }
    if (states.length) row.localStates = states;
    const disabled = [];
    for (const b of n.findAll((x) => x.type === "INSTANCE" && x.visible)) {
      const mc = await b.getMainComponentAsync();
      if (mc && /Disabled=true/.test(mc.name)) {
        const label = Object.entries(b.componentProperties || {}).find(([k]) => k.startsWith("Label"));
        disabled.push(label ? label[1].value : b.name);
      }
    }
    if (disabled.length) row.disabled = disabled;
  }
  out.push(row);
}
return out;
