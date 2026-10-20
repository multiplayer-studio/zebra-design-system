// export-tokens.js — read-only. Run with use_figma.
// Takes the union of usedVariableIds / usedStyleIds from every extract-structure run,
// follows alias chains (adding referenced variables), resolves every mode, and returns
// DTCG-style tokens plus the text / effect / paint styles the component uses.
// Replace INPUT before running.
const INPUT = {
  variableIds: [/* "VariableID:1:2", ... */],
  styleIds: { text: [], effect: [], paint: [] }
};

const r2 = (v) => (typeof v === "number" ? Math.round(v * 1000) / 1000 : v);
const hex = (c) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  const a = c.a === undefined ? 1 : c.a;
  return "#" + h(c.r) + h(c.g) + h(c.b) + (a < 1 ? h(a) : "");
};
const isAlias = (v) => v && typeof v === "object" && v.type === "VARIABLE_ALIAS";

const queue = INPUT.variableIds.slice();
const vars = new Map();
const cols = new Map();
async function col(id) {
  if (!cols.has(id)) cols.set(id, await figma.variables.getVariableCollectionByIdAsync(id));
  return cols.get(id);
}

// Styles first: their bound variables join the queue.
const styles = { text: [], effect: [], paint: [] };
async function boundNames(bv) {
  const out = {};
  for (const [k, a] of Object.entries(bv || {})) {
    const arr = Array.isArray(a) ? a : [a];
    const names = [];
    for (const x of arr) {
      if (!x || !x.id) continue;
      queue.push(x.id);
      const v = await figma.variables.getVariableByIdAsync(x.id);
      names.push(v ? v.name : x.id);
    }
    if (names.length) out[k] = names.length === 1 ? names[0] : names;
  }
  return out;
}
for (const id of INPUT.styleIds.text || []) {
  const s = await figma.getStyleByIdAsync(id);
  if (!s) continue;
  styles.text.push({
    name: s.name, description: s.description || undefined,
    fontFamily: s.fontName.family, fontStyle: s.fontName.style, fontSize: s.fontSize,
    lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, textCase: s.textCase,
    paragraphSpacing: s.paragraphSpacing || undefined,
    tokens: await boundNames(s.boundVariables)
  });
}
for (const id of INPUT.styleIds.effect || []) {
  const s = await figma.getStyleByIdAsync(id);
  if (!s) continue;
  const effects = [];
  for (const e of s.effects) {
    effects.push({
      type: e.type, radius: e.radius, spread: e.spread || undefined,
      offset: e.offset ? [e.offset.x, e.offset.y] : undefined,
      color: e.color ? hex(e.color) : undefined,
      tokens: await boundNames(e.boundVariables)
    });
  }
  styles.effect.push({ name: s.name, description: s.description || undefined, effects });
}
for (const id of INPUT.styleIds.paint || []) {
  const s = await figma.getStyleByIdAsync(id);
  if (!s) continue;
  const paints = [];
  for (const p of s.paints) {
    const e = { type: p.type };
    if (p.type === "SOLID") {
      e.value = hex(p.color);
      if (p.boundVariables && p.boundVariables.color) {
        queue.push(p.boundVariables.color.id);
        const v = await figma.variables.getVariableByIdAsync(p.boundVariables.color.id);
        if (v) e.token = v.name;
      }
    }
    paints.push(e);
  }
  styles.paint.push({ name: s.name, description: s.description || undefined, paints });
}

// Walk variables + their alias targets.
while (queue.length) {
  const id = queue.shift();
  if (vars.has(id)) continue;
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) { vars.set(id, null); continue; }
  vars.set(id, v);
  for (const val of Object.values(v.valuesByMode)) if (isAlias(val)) queue.push(val.id);
}

// Resolve every theme context. In Figma each collection's mode is chosen independently,
// so a chain like semantics(Base) → palette(Light|Dark) fans out over palette's modes.
// Context key lists only collections with more than one mode, e.g. "palette=Dark".
async function resolveAll(v, ctx, depth) {
  if (!v || depth > 12) return [{ ctx, value: null }];
  const c = await col(v.variableCollectionId);
  const pinned = ctx[c.name] ? c.modes.filter((m) => m.name === ctx[c.name]) : c.modes;
  const out = [];
  for (const m of pinned) {
    const next = Object.assign({}, ctx);
    if (c.modes.length > 1) next[c.name] = m.name;
    const val = v.valuesByMode[m.modeId];
    if (isAlias(val)) {
      const t = vars.get(val.id) || await figma.variables.getVariableByIdAsync(val.id);
      out.push.apply(out, await resolveAll(t, next, depth + 1));
    } else out.push({ ctx: next, value: val });
  }
  return out;
}
const ctxKey = (ctx) => Object.keys(ctx).sort().map((k) => k + "=" + ctx[k]).join(", ") || "default";

const DIM_SCOPES = ["GAP", "WIDTH_HEIGHT", "CORNER_RADIUS", "STROKE_FLOAT", "FONT_SIZE", "LINE_HEIGHT",
  "LETTER_SPACING", "PARAGRAPH_SPACING", "PARAGRAPH_INDENT", "EFFECT_FLOAT"];
function baseType(v) {
  const sc = v.scopes || [];
  if (v.resolvedType === "COLOR") return "color";
  if (v.resolvedType === "FLOAT") {
    if (sc.indexOf("FONT_WEIGHT") >= 0) return "fontWeight";
    if (sc.indexOf("OPACITY") >= 0) return "number";
    if (sc.some((s) => DIM_SCOPES.indexOf(s) >= 0)) return "dimension";
    return "number";
  }
  if (v.resolvedType === "STRING") return sc.indexOf("FONT_FAMILY") >= 0 ? "fontFamily" : "string";
  if (v.resolvedType === "BOOLEAN") return "boolean";
  return "string";
}
// Type every variable, then let unscoped primitives inherit the type of what references them,
// so aliases stay type-consistent (a dimension never points at a bare number).
const types = new Map();
for (const [id, v] of vars) if (v) types.set(id, baseType(v));
let changed = true;
while (changed) {
  changed = false;
  for (const [id, v] of vars) {
    if (!v) continue;
    const t = types.get(id);
    for (const val of Object.values(v.valuesByMode)) {
      if (!isAlias(val) || !types.has(val.id)) continue;
      const tt = types.get(val.id);
      if (tt === "number" && (t === "dimension" || t === "fontWeight")) { types.set(val.id, t); changed = true; }
    }
  }
}
function fmt(val, type) {
  if (val && typeof val === "object" && "r" in val) return hex(val);
  if (type === "dimension" && typeof val === "number") return r2(val) + "px";
  return typeof val === "number" ? r2(val) : val;
}
const ref = (name) => "{" + name.split("/").join(".") + "}";

const tokens = {};
const collisions = [];
function setDeep(path, leaf) {
  let o = tokens;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (o[k] && o[k].$value !== undefined) { collisions.push(path.join("/")); o[k] = { $root: o[k] }; }
    if (!o[k]) o[k] = {};
    o = o[k];
  }
  const last = path[path.length - 1];
  if (o[last] && o[last].$value === undefined && Object.keys(o[last]).length) { o[last].$root = leaf; collisions.push(path.join("/")); }
  else o[last] = leaf;
}

const collections = {};
const unresolved = [];
const descriptionDrift = [];
for (const [id, v] of vars) {
  if (!v) { unresolved.push(id); continue; }
  const c = await col(v.variableCollectionId);
  const defMode = c.modes.find((m) => m.modeId === c.defaultModeId) || c.modes[0];
  collections[c.name] = { modes: c.modes.map((m) => m.name), default: defMode.name, remote: !!c.remote };
  const type = types.get(id);
  const modes = {};
  for (const m of c.modes) {
    const raw = v.valuesByMode[m.modeId];
    if (isAlias(raw)) {
      const t = vars.get(raw.id);
      modes[m.name] = t ? ref(t.name) : "{unresolved:" + raw.id + "}";
    } else modes[m.name] = fmt(raw, type);
  }
  const resolved = {};
  for (const r of await resolveAll(v, {}, 0)) resolved[ctxKey(r.ctx)] = r.value === null ? null : fmt(r.value, type);

  // Descriptions that state a px value ("= 32px") but resolve to something else.
  const m = (v.description || "").match(/=\s*(-?\d+(?:\.\d+)?)\s*px/);
  if (m) {
    const stated = parseFloat(m[1]);
    const actual = Object.values(resolved).map((x) => parseFloat(x)).filter((x) => !isNaN(x));
    if (actual.length && actual.every((x) => x !== stated)) {
      descriptionDrift.push({ token: v.name, description: v.description, resolved });
    }
  }

  const leaf = { $type: type, $value: modes[defMode.name] };
  if (v.description) leaf.$description = v.description;
  leaf.$extensions = {
    "com.figma": {
      id: v.id, collection: c.name, scopes: v.scopes,
      codeSyntax: Object.keys(v.codeSyntax || {}).length ? v.codeSyntax : undefined,
      modes, resolved
    }
  };
  setDeep(v.name.split("/"), leaf);
}

return { collections, tokens, styles, collisions, unresolved, descriptionDrift, variableCount: vars.size };
