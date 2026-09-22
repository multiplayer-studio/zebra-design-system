#!/usr/bin/env node
/**
 * Resolves the generated CSS the way a browser would for a given set of
 * classes, and asserts the theming contract:
 *   an ext-* / mode-* class re-themes every semantic token that depends on it.
 * Catches layering mistakes that a Storybook screenshot would not.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "../src/tokens");
const FILES = ["primitives", "palette", "semantics", "size", "typography", "extensions"];

// --- parse ---------------------------------------------------------------
const rules = [];
for (const f of FILES) {
  const css = readFileSync(join(DIR, `${f}.css`), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const decls = [...m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1], d[2].trim()]);
    if (!decls.length) continue;
    for (const sel of m[1].split(",").map((s) => s.trim()).filter(Boolean)) {
      rules.push({ sel, decls, order: rules.length });
    }
  }
}

// --- match + specificity -------------------------------------------------
// Selectors here are only :root, .a, .a.b, and ".a .b" descendant pairs.
function matches(sel, scopes) {
  const own = scopes[scopes.length - 1];
  const parts = sel.split(/\s+/).filter(Boolean);
  const has = (compound, classes) =>
    compound.split(".").filter(Boolean).every((c) => classes.has(c));
  if (sel === ":root") return true;
  if (parts.length === 1) return has(parts[0], own);
  // descendant: ancestor part must match some outer scope, last part the element
  const [anc, el] = parts;
  if (!has(el, own)) return false;
  return scopes.slice(0, -1).some((s) => has(anc, s));
}
const specificity = (sel) => (sel === ":root" ? 1 : (sel.match(/\./g) || []).length * 10);

function computed(scopes) {
  const out = new Map();
  const winner = new Map();
  for (const r of rules) {
    if (!matches(r.sel, scopes)) continue;
    const s = specificity(r.sel);
    for (const [k, v] of r.decls) {
      const prev = winner.get(k);
      if (!prev || s > prev.s || (s === prev.s && r.order > prev.order)) {
        winner.set(k, { s, order: r.order });
        out.set(k, v);
      }
    }
  }
  return out;
}

const deref = (map, value, depth = 0) => {
  if (depth > 20) return value;
  const m = /^var\((--[\w-]+)\)$/.exec(value.trim());
  if (!m) return value.trim();
  const next = map.get(m[1]);
  return next === undefined ? value.trim() : deref(map, next, depth + 1);
};

// --- assertions ----------------------------------------------------------
const cases = [
  { name: "base / light",              scopes: [new Set()],                                   token: "--interactive-primary-background-default", expect: "#1f69ff" },
  { name: "base / dark  (surface)",    scopes: [new Set(["mode-dark"])],                       token: "--surface-page",                           expect: "#1d1e23" },
  { name: "base / light (surface)",    scopes: [new Set()],                                    token: "--surface-page",                           expect: "#f3f6fa" },
  { name: "companion (palette layer)", scopes: [new Set(["ext-companion"])],                   token: "--interactive-primary-background-default", expect: "#7e0cff" },
  { name: "companion + dark",          scopes: [new Set(["ext-companion","mode-dark"])],       token: "--interactive-primary-background-default", expect: "#7e0cff" },
  { name: "target (primitives layer)", scopes: [new Set(["ext-target"])],                      token: "--interactive-primary-background-default", expect: "#cc0000" },
  { name: "mode above ext (nested)",   scopes: [new Set(["mode-dark"]), new Set(["ext-companion"])], token: "--palette-brand-primary-faint",      expect: "#180f22" },
  { name: "ext above mode (nested)",   scopes: [new Set(["ext-companion"]), new Set(["mode-dark"])], token: "--palette-brand-primary-faint",      expect: "#180f22" },
  { name: "companion light faint",     scopes: [new Set(["ext-companion"])],                   token: "--palette-brand-primary-faint",            expect: "#f7f0ff" },
  { name: "dark does not leak to base",scopes: [new Set(["mode-dark"])],                       token: "--interactive-primary-background-default", expect: "#1f69ff" },
  { name: "size token unaffected",     scopes: [new Set(["ext-target","mode-dark"])],          token: "--control-sm",                             expect: "36px" },
];

let bad = 0;
for (const c of cases) {
  const map = computed(c.scopes);
  const got = deref(map, map.get(c.token) ?? "<undefined>");
  const ok = got === c.expect;
  if (!ok) bad++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${c.name.padEnd(30)} ${c.token} = ${got}${ok ? "" : `  (expected ${c.expect})`}`);
}
console.log(bad ? `\n${bad} failing` : "\nall theming assertions pass");
process.exit(bad ? 1 : 0);
