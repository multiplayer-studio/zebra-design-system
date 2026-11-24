#!/usr/bin/env node
/* The parity check, in one run (SOURCE-PARITY.md, 2, and
 * builder-design-check, which keeps an identical copy).
 *
 * Compares a build with a saved reference of the source and lists every gap:
 * parts missing, extra, moved or nested differently, and every value that
 * differs.
 *
 *   Check a build against a reference
 *     node parity.mjs <reference.json> --page=<file or address> [--shot=<png>]
 *     node parity.mjs <reference.json> --measured=<measured.json>
 *
 *   Save a reference from a source that is running at an address
 *     node parity.mjs --capture --page=<address> --map=<map.json> --out=<reference.json> [--shot=<png>]
 *
 *   Options
 *     --width=1440 --height=900   the screen size to render at (default: the reference's)
 *     --scheme=dark               render in dark (prefers-color-scheme)
 *     --attr=data-theme=dark      set an attribute on <html> before measuring
 *     --map=<map.json>            { "name": "css selector" } instead of data-parity marks
 *     --only=header,filters       check only these parts
 *     --tolerance=1               how many px may differ (default 1)
 *     --json                      print the gaps as JSON
 *
 * --page needs Playwright in the project (or on NODE_PATH). Without it,
 * evaluate measure.js in the page with the browser tool you have, save what
 * it returns, and pass that file as --measured.
 *
 * Exit code: 0 no gap, 1 gaps, 2 it couldn't run.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const opt = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const has = (name) => argv.includes(`--${name}`);
const positional = argv.filter((a) => !a.startsWith("--"));
const fail = (msg) => { console.error(msg); process.exit(2); };
const readJson = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { fail(`Can't read ${p}: ${e.message}`); } };

/* ---- measuring a page ----------------------------------------------------- */
async function measurePage({ page: target, width, height, map, shot }) {
  let playwright = null;
  for (const from of [join(process.cwd(), "x.js"), join(here, "x.js")]) {
    for (const name of ["playwright", "playwright-core", "@playwright/test"]) {
      try { playwright = createRequire(from)(name); break; } catch { /* next */ }
    }
    if (playwright) break;
  }
  if (!playwright?.chromium) {
    fail("No browser to render with here (Playwright isn't installed).\nEvaluate measure.js in the page with the browser tool you have, save what it returns as JSON, and run this again with --measured=<file>.");
  }
  const url = /^[a-z]+:\/\//i.test(target) ? target : pathToFileURL(resolve(target)).href;
  const browser = await playwright.chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      colorScheme: opt("scheme") === "dark" ? "dark" : "light",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "load" });
    const attr = opt("attr");
    if (attr) {
      const [k, ...v] = attr.split("=");
      await page.evaluate(([key, value]) => document.documentElement.setAttribute(key, value), [k, v.join("=")]);
    }
    await page.evaluate(() => (document.fonts ? document.fonts.ready.then(() => true) : true));
    await page.waitForTimeout(300);
    if (map) await page.evaluate((m) => { window.__parityMap = m; }, map);
    const measured = await page.evaluate(readFileSync(join(here, "measure.js"), "utf8"));
    if (shot) {
      mkdirSync(dirname(resolve(shot)), { recursive: true });
      await page.screenshot({ path: resolve(shot), fullPage: true });
    }
    return measured;
  } finally {
    await browser.close();
  }
}

/* ---- comparing values ----------------------------------------------------- */
const NAMED = { transparent: [0, 0, 0, 0], white: [255, 255, 255, 1], black: [0, 0, 0, 1] };
function colour(v) {
  if (typeof v !== "string") return null;
  const s = v.trim().toLowerCase();
  if (NAMED[s]) return NAMED[s];
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    if (h.length !== 6 && h.length !== 8) return null;
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), h.length === 8 ? Math.round((n(6) / 255) * 100) / 100 : 1];
  }
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map((x) => (x.endsWith("%") ? (parseFloat(x) / 100) : parseFloat(x)));
    if (p.length < 3 || p.some(Number.isNaN)) return null;
    return [Math.round(p[0]), Math.round(p[1]), Math.round(p[2]), p.length > 3 ? Math.round(p[3] * 100) / 100 : 1];
  }
  return null;
}
const asHex = (c) => `#${c.slice(0, 3).map((n) => n.toString(16).padStart(2, "0")).join("")}${c[3] < 1 ? ` at ${Math.round(c[3] * 100)}%` : ""}`;
const num = (v) => (typeof v === "number" ? v : typeof v === "string" && /^-?[\d.]+(px)?$/.test(v.trim()) ? parseFloat(v) : null);
const text = (v) => String(v).replace(/\s+/g, " ").trim();
const COLOUR_KEYS = /colou?r$/i;
const EXACT_NUMBER = new Set(["fontWeight", "opacity"]);

function differs(key, want, got, tolerance) {
  if (got === undefined) return `not measured`;
  if (COLOUR_KEYS.test(key)) {
    const a = colour(want), b = colour(got);
    if (a && b) {
      // fully transparent is the same whatever the colour under it
      if (a[3] === 0 && b[3] === 0) return null;
      const same = a.slice(0, 3).every((n, i) => Math.abs(n - b[i]) <= 1) && Math.abs(a[3] - b[3]) <= 0.02;
      return same ? null : `${asHex(b)}, should be ${asHex(a)}`;
    }
  }
  const a = num(want), b = num(got);
  if (a !== null && b !== null) {
    const allow = EXACT_NUMBER.has(key) ? 0.001 : key === "letterSpacing" ? 0.1 : tolerance;
    const off = Math.round((b - a) * 10) / 10;
    return Math.abs(off) <= allow ? null : `${b}, should be ${a} (${off > 0 ? "+" : ""}${off})`;
  }
  if (key === "fontFamily") {
    const first = (s) => text(s).split(",")[0].replace(/["']/g, "").trim().toLowerCase();
    return first(want) === first(got) ? null : `"${text(got)}", should be "${text(want)}"`;
  }
  const same = key === "text" ? text(want) === text(got) : text(want).toLowerCase() === text(got).toLowerCase();
  return same ? null : `"${text(got)}", should be "${text(want)}"`;
}

function compare(reference, measured, { only, tolerance }) {
  const gaps = [];
  const want = reference.parts ?? {};
  const got = measured.parts ?? {};
  const names = Object.keys(want).filter((n) => !only || only.includes(n));

  for (const name of names) {
    if (!got[name] || got[name].missing) { gaps.push({ part: name, kind: "missing", detail: "in the source, not in the build" }); continue; }
    for (const [key, value] of Object.entries(want[name])) {
      if (value === null && key !== "parent") continue;
      if (key === "note") continue;
      if (key === "parent") {
        if ((got[name].parent ?? null) !== (value ?? null)) gaps.push({ part: name, kind: "structure", detail: `sits inside ${got[name].parent ?? "the page"}, should sit inside ${value ?? "the page"}` });
        continue;
      }
      const d = differs(key, value, got[name][key], tolerance);
      if (d) gaps.push({ part: name, kind: "value", key, detail: `${key}: ${d}` });
    }
  }
  if (!only) {
    for (const name of Object.keys(got)) {
      if (!want[name]) gaps.push({ part: name, kind: "extra", detail: "in the build, not in the source" });
    }
    const refOrder = (reference.order ?? Object.keys(want)).filter((n) => got[n] && !got[n].missing);
    const gotOrder = (measured.order ?? []).filter((n) => want[n]);
    // compare order among siblings only: nesting is reported above
    const byParent = (order, parts) => {
      const groups = {};
      for (const n of order) (groups[parts[n]?.parent ?? ""] ??= []).push(n);
      return groups;
    };
    const a = byParent(refOrder, want), b = byParent(gotOrder, want);
    for (const [parent, list] of Object.entries(a)) {
      const other = b[parent] ?? [];
      if (list.join("|") !== other.join("|")) gaps.push({ part: parent || "page", kind: "order", detail: `order is ${other.join(", ")}; should be ${list.join(", ")}` });
    }
  }
  return gaps;
}

/* ---- run ------------------------------------------------------------------ */
const mapFile = opt("map");
const map = mapFile ? readJson(mapFile) : null;
const tolerance = Number(opt("tolerance") ?? 1);
const only = opt("only")?.split(",").map((s) => s.trim()).filter(Boolean);

if (has("capture")) {
  const out = opt("out");
  if (!opt("page") || !out || !map) fail("Saving a reference needs --page, --map and --out.");
  const measured = await measurePage({ page: opt("page"), width: Number(opt("width") ?? 1440), height: Number(opt("height") ?? 900), map, shot: opt("shot") });
  const missing = Object.entries(measured.parts).filter(([, p]) => p.missing).map(([n]) => n);
  const reference = {
    source: opt("page"),
    captured: new Date().toISOString().slice(0, 10),
    width: measured.width,
    scheme: opt("scheme") ?? "light",
    order: measured.order,
    parts: Object.fromEntries(Object.entries(measured.parts).filter(([, p]) => !p.missing)),
  };
  mkdirSync(dirname(resolve(out)), { recursive: true });
  writeFileSync(resolve(out), `${JSON.stringify(reference, null, 1)}\n`);
  console.log(`Saved ${Object.keys(reference.parts).length} parts to ${out}.`);
  if (missing.length) { console.log(`Not found on the page, fix the selector: ${missing.join(", ")}`); process.exit(1); }
  process.exit(0);
}

const refFile = positional[0];
if (!refFile || !existsSync(refFile)) fail("Give the reference file first: node parity.mjs <reference.json> --page=<file or address>");
const reference = readJson(refFile);

let measured;
if (opt("measured")) measured = readJson(opt("measured"));
else if (opt("page")) {
  measured = await measurePage({
    page: opt("page"),
    width: Number(opt("width") ?? reference.width ?? 1440),
    height: Number(opt("height") ?? 900),
    map,
    shot: opt("shot"),
  });
} else fail("Give the build to check: --page=<file or address>, or --measured=<measured.json>.");

const gaps = compare(reference, measured, { only, tolerance });
const checked = Object.keys(reference.parts ?? {}).filter((n) => !only || only.includes(n)).length;

if (has("json")) console.log(JSON.stringify({ checked, gaps }, null, 1));
else if (!gaps.length) console.log(`No gap. ${checked} parts checked${only ? " (only the ones named)" : ""}.`);
else {
  console.log(`${gaps.length} gap${gaps.length === 1 ? "" : "s"} in ${new Set(gaps.map((g) => g.part)).size} of ${checked} parts:`);
  let last = null;
  for (const g of gaps) {
    if (g.part !== last) { console.log(`\n${g.part}`); last = g.part; }
    console.log(`  ${g.kind === "value" ? "" : `${g.kind}: `}${g.detail}`);
  }
}
process.exit(gaps.length ? 1 : 0);
