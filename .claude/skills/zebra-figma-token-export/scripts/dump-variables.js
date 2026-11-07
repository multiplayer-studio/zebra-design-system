// dump-variables.js — read-only. Run with use_figma, once per page.
// Returns a COMPACT dump of the file's variable graph. This is NOT the output format;
// build-tokens.py turns it into the tokens/ folder. Compact on purpose: the tool truncates
// a response at ~20KB and a DTCG tree is roughly 4x the size of this.
// Replace INPUT before running.
const INPUT = {
  offset: 0,   // index into the file's local variables, sorted by id
  limit: 60,   // lower it if a page still truncates — long $descriptions are the usual cause
  withCollections: true // true on the first page only
};

const hex = (c) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  const a = c.a === undefined ? 1 : c.a;
  return "#" + h(c.r) + h(c.g) + h(c.b) + (a < 1 ? h(a) : "");
};
const isAlias = (v) => v && typeof v === "object" && v.type === "VARIABLE_ALIAS";
// An alias at an opacity ({ color: alias, opacity: 10 }) keeps both: o is the 0–1 alpha laid over the target.
const enc = (val) => {
  if (isAlias(val)) return { a: val.id };
  if (val && typeof val === "object" && isAlias(val.color)) return { a: val.color.id, o: Math.round(val.opacity * 10) / 1000 };
  if (val && typeof val === "object" && "r" in val) return hex(val);
  if (typeof val === "number") return Math.round(val * 1000) / 1000;
  return val;
};

const cols = await figma.variables.getLocalVariableCollectionsAsync();
// Only modes the collection actually declares. valuesByMode can carry ids of deleted modes;
// those are reported as orphans rather than written out.
const declared = {};
for (const c of cols) declared[c.id] = c.modes.map((m) => m.modeId);

const out = { offset: INPUT.offset };

if (INPUT.withCollections) {
  out.collections = cols.map((c) => {
    const e = {
      id: c.id, name: c.name, key: c.key, defaultModeId: c.defaultModeId,
      modes: c.modes.map((m) => {
        const x = { id: m.modeId, name: m.name };
        if (m.parentModeId) x.parent = m.parentModeId;
        return x;
      }),
      count: c.variableIds.length
    };
    if (c.remote) e.remote = true;
    if (c.hiddenFromPublishing) e.hidden = true;
    if (c.isExtension) {
      e.isExtension = true;
      e.parentId = c.parentVariableCollectionId;
      e.rootId = c.rootVariableCollectionId;
      const ov = c.variableOverrides || {};
      e.overrides = {};
      for (const [vid, byMode] of Object.entries(ov)) {
        const m = {};
        for (const [modeId, val] of Object.entries(byMode)) m[modeId] = enc(val);
        e.overrides[vid] = m;
      }
    }
    return e;
  });
}

const all = await figma.variables.getLocalVariablesAsync();
all.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
out.total = all.length;
const page = all.slice(INPUT.offset, INPUT.offset + INPUT.limit);

const orphans = [];
out.variables = page.map((v) => {
  const e = { i: v.id, n: v.name, t: v.resolvedType, c: v.variableCollectionId };
  const ok = declared[v.variableCollectionId] || [];
  const vals = {};
  for (const [modeId, val] of Object.entries(v.valuesByMode)) {
    if (ok.indexOf(modeId) < 0) { orphans.push(v.name + " @ " + modeId); continue; }
    vals[modeId] = enc(val);
  }
  // Collapse when every declared mode carries the same value — common for size and
  // typography, where most tokens do not vary by breakpoint. "*" means "all modes".
  const keys = Object.keys(vals);
  const first = JSON.stringify(vals[keys[0]]);
  if (keys.length === ok.length && keys.length > 1 && keys.every((k) => JSON.stringify(vals[k]) === first)) {
    e.v = { "*": vals[keys[0]] };
  } else {
    e.v = vals;
  }
  if (v.scopes && v.scopes.length && !(v.scopes.length === 1 && v.scopes[0] === "ALL_SCOPES")) e.s = v.scopes;
  if (v.description) e.d = v.description;
  if (v.codeSyntax && Object.keys(v.codeSyntax).length) e.x = v.codeSyntax;
  if (v.hiddenFromPublishing) e.h = 1;
  return e;
});

const end = INPUT.offset + page.length;
out.returned = page.length;
out.hasMore = end < all.length;
out.nextOffset = out.hasMore ? end : null;
if (orphans.length) out.orphanModeValues = orphans;
return out;
