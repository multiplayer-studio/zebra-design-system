// component-api.js — read-only. Run with use_figma in the TARGET file (the one being rebuilt).
// FALLBACK: `node catalog.mjs --api "<names>"` returns the same shape over REST, cached, with no Figma call —
// use this script only to verify that the target file can actually import a component (a build import failed,
// or the library may not be enabled there).
// Imports Zebra component sets by key (from cache/catalog.json) and returns what a build call needs:
// property keys (with their #ids), types, defaults, variant options, the default variant's size, and the
// exposed nested instances' own properties. Places nothing on the canvas.
// Replace INPUT.keys with catalog keys, up to ~15 per call.
const INPUT = {
  keys: ["__KEY__"],
};

const out = {};
for (const key of INPUT.keys) {
  let node = null, kind = "set";
  try { node = await figma.importComponentSetByKeyAsync(key); }
  catch (e) { try { node = await figma.importComponentByKeyAsync(key); kind = "component"; } catch (e2) { out[key] = "import failed: " + String(e2.message || e2).slice(0, 120); continue; } }
  const defs = node.componentPropertyDefinitions || {};
  const props = {};
  for (const [k, d] of Object.entries(defs)) {
    const p = { type: d.type, default: d.defaultValue };
    if (d.variantOptions) p.options = d.variantOptions;
    if (d.type === "INSTANCE_SWAP" && d.preferredValues) p.preferred = d.preferredValues.length;
    props[k] = p;
  }
  const base = kind === "set" ? node.defaultVariant : node;
  // Nested instances the set exposes: their properties are set on the nested instance, not the parent.
  const exposed = [];
  for (const inst of base.findAllWithCriteria({ types: ["INSTANCE"] })) {
    if (!inst.isExposedInstance) continue;
    const ep = {};
    for (const [k, v] of Object.entries(inst.componentProperties)) ep[k] = v.type + (v.type === "VARIANT" ? "" : "");
    exposed.push({ name: inst.name, props: ep });
  }
  out[node.name] = {
    key, kind, id: node.id,
    defaultVariant: kind === "set" ? base.name : undefined,
    size: Math.round(base.width) + "x" + Math.round(base.height),
    props,
    exposed: exposed.length ? exposed : undefined,
    variantCount: kind === "set" ? node.children.length : undefined,
  };
}
return out;
