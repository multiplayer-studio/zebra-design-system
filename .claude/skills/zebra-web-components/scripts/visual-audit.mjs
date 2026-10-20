#!/usr/bin/env node
/**
 * Visual audit for @zebra-design-system/web-components.
 *
 *   node visual-audit.mjs <component> [--pkg <dir>] [--specs <dir>] [--full] [--keep]
 *   node visual-audit.mjs button
 *
 * WHY THIS EXISTS
 * ---------------
 * Typecheck and check-theming both pass on a component that renders as a
 * zero-height sliver, or whose label is the same colour as its background, or
 * whose icon is an invisible .notdef box because the font never loaded. Those
 * are the failures that reach a reviewer's eyes first and a test suite's
 * assertions last. This script renders the component for real, in a real
 * browser, across the theme scopes, and asserts the handful of things that are
 * only observable once it is painted.
 *
 * It is driven by the component's spec (specs/<name>/<name>.spec.json), so the
 * variants it renders are the variants the design actually has. Each enum axis
 * is swept independently against the defaults — that is the "quick" audit and
 * what you want on every change. `--full` sweeps the cross product instead.
 *
 * Pipeline: regenerate tokens -> write a harness into <pkg>/.audit -> vite
 * build -> serve over loopback http (NOT file://, which gives Chrome an opaque
 * origin and blocks the webfont) -> drive headless Chrome over the DevTools
 * protocol to read the probe and capture the screenshot.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, appendFileSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:http";
import { join, dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const HERE = dirname(fileURLToPath(import.meta.url));

// ---------- arguments -----------------------------------------------------
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const component = argv.find((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1]?.startsWith("--") !== true);

if (!component) {
  console.error("usage: node visual-audit.mjs <component> [--pkg <dir>] [--specs <dir>] [--full] [--keep]");
  process.exit(2);
}

const PKG = resolve(opt("--pkg", join(HERE, "../../../../packages/web-components")));
const SPECS = resolve(opt("--specs", join(PKG, "../../specs")));
const FULL = flag("--full");
const KEEP = flag("--keep");
const AUDIT = join(PKG, ".audit");
const SHOTS = join(PKG, ".audit-shots");
const TAG = `zds-${component}`;

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => existsSync(p));
if (!CHROME) {
  console.error("No Chrome/Chromium found. This audit needs a real browser — the failures it\n" +
                "looks for (collapsed boxes, unloaded fonts, invisible labels) only exist once\n" +
                "something is actually painted.");
  process.exit(2);
}

// ---------- 1. the spec drives the specimens ------------------------------
const specPath = join(SPECS, component, `${component}.spec.json`);
if (!existsSync(specPath)) {
  console.error(`No spec at ${specPath}.\nSpec the component first with the zebra-figma-component-spec skill — the audit\nrenders the spec's variants, so without one there is nothing to check against.`);
  process.exit(2);
}
const spec = JSON.parse(readFileSync(specPath, "utf8"));

// Neutral camelCase prop -> the attribute the element actually takes.
const attrName = (p) => p.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

// A real glyph, so the icon assertions mean something. Specs record an icon
// slot as a boolean ("is there one") — the value it needs is a name.
const glyphNames = (() => {
  const p = join(PKG, "../icons/codepoints.json");
  if (!existsSync(p)) return [];
  const g = JSON.parse(readFileSync(p, "utf8")).glyphs ?? {};
  return Object.entries(g).filter(([, v]) => !v.retired).map(([k]) => k);
})();
const SAMPLE_GLYPH = ["check-mark", "add", "alarm"].find((n) => glyphNames.includes(n)) ?? glyphNames[0] ?? null;

/**
 * Normalise one spec value into what the DOM should receive.
 * `null` means "omit this attribute" — which matters most for disabled, whose
 * spec values are the STRINGS "false"/"true": setting disabled="false" in HTML
 * disables the element, because presence is the signal.
 */
const normalise = (name, v) => {
  if (v === null || v === undefined || v === false || v === "false") return null;
  if (v === true || v === "true") return /icon/i.test(name) ? SAMPLE_GLYPH : "";
  return String(v);
};

const props = Object.entries(spec.api ?? {});
// values may be absent on a boolean prop; derive them rather than trusting shape.
const axes = props
  .filter(([, d]) => d.type === "enum" || d.type === "boolean")
  .map(([name, d]) => ({ name, attr: attrName(name), values: d.values ?? [false, true] }));

const textProp = props.find(([n, d]) => d.type === "string" && /^(label|text|children)$/i.test(n));
const text = textProp ? String(textProp[1].default ?? spec.component?.name ?? component) : (spec.component?.name ?? component);

const baseAttrs = Object.fromEntries(
  props.flatMap(([n, d]) => {
    if (textProp && n === textProp[0]) return [];
    const v = normalise(n, d.default);
    return v === null ? [] : [[attrName(n), v]];
  }),
);

// The harness filters these against what the element really exposes, then
// builds the specimens — only the browser knows which of a spec's axes are
// properties and which are CSS states.
const plan = { tag: TAG, text, baseAttrs, axes, full: FULL, sampleGlyph: SAMPLE_GLYPH, normalise: null };

// ---------- 2. theme panes ------------------------------------------------
// The last pane is the nesting case: light inside dark. It is here because a
// scope that only emits its own diff against base emits nothing for light and
// never restores it — the exact bug build-tokens-css.mjs computes closures to
// avoid, and the one that survived per-agent review on Navigation Rail.
//
// `chain` is outermost-to-innermost ANCESTORS, as in check-theming.mjs: one
// entry per element, a space inside an entry meaning "both classes on the same
// element". The distinction is the whole point — `.ext-companion.mode-dark` on
// one element and `.mode-dark > .ext-companion` are different selectors, and
// flattening a chain onto a single element silently tests neither.
const PANES = [
  { id: "light", chain: ["mode-light"], note: "base light" },
  { id: "dark", chain: ["mode-dark"], note: "base dark" },
  { id: "companion-dark", chain: ["ext-companion mode-dark"], note: "extension + dark, same element" },
  { id: "dark-then-light", chain: ["mode-dark", "mode-light"], note: "light nested inside dark" },
];

// ---------- 3. write the harness -----------------------------------------
rmSync(AUDIT, { recursive: true, force: true });
mkdirSync(AUDIT, { recursive: true });

writeFileSync(join(AUDIT, "specimens.json"), JSON.stringify({ plan, panes: PANES }, null, 2));

writeFileSync(join(AUDIT, "index.html"), `<!doctype html>
<html><head><meta charset="utf-8"><title>${component} audit</title>
<style>
  html,body { margin:0; font: 13px/1.4 system-ui, sans-serif; }
  .pane { padding: 20px 24px; background: var(--surface-page); color: var(--foreground-primary); }
  .pane > h2 { margin: 0 0 12px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; opacity: .7; }
  .row { display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
  .cell { display:flex; flex-direction:column; gap:4px; align-items:flex-start; }
  .cap { font-size: 10px; opacity: .6; }
</style></head>
<body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>
`);

writeFileSync(join(AUDIT, "main.ts"), `
// Generated by visual-audit.mjs. Do not edit; do not commit.
import "../src/tokens/index.css";
import "@zebra-design-system/icons/icons.css";
import "../src/index.js";
import data from "./specimens.json";

const app = document.getElementById("app")!;
const plan = data.plan;

// A spec axis is only renderable if the element actually exposes it. Button's
// spec has a "state" axis covering hover/pressed/focus — those are CSS states,
// not properties, and setting state="hover" would silently render the default
// and quietly pass. Ask the element instead of guessing.
const probe = document.createElement(plan.tag) as any;
customElements.upgrade(probe);
const live = plan.axes.filter((a: any) => a.name in probe || probe.hasAttribute?.(a.attr));
const skipped = plan.axes.filter((a: any) => !live.includes(a));

const norm = (name: string, v: any) => {
  if (v === null || v === undefined || v === false || v === "false") return null;
  if (v === true || v === "true") return /icon/i.test(name) ? plan.sampleGlyph : "";
  return String(v);
};

const specimens: any[] = [];
const add = (id: string, over: Record<string, any>, axis: string) => {
  const attrs: Record<string, string> = { ...plan.baseAttrs };
  for (const [n, v] of Object.entries(over)) {
    const a = n.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
    const val = norm(n, v);
    if (val === null) delete attrs[a]; else attrs[a] = val;
  }
  specimens.push({ id, attrs, axis });
};

if (plan.full) {
  const combos = live.reduce((acc: any[], a: any) => acc.flatMap((c) => a.values.map((v: any) => ({ ...c, [a.name]: v }))), [{}]);
  combos.forEach((c: any, i: number) => add("full-" + i, c, "full"));
} else {
  add("default", {}, "default");
  for (const a of live) for (const v of a.values) add(a.name + "=" + v, { [a.name]: v }, a.name);
}
// Guarantee the icon path is exercised even when no axis happens to show one.
if (plan.sampleGlyph && !specimens.some((s) => Object.keys(s.attrs).some((k) => /icon/.test(k)))) {
  const iconish = plan.axes.find((a: any) => /icon/i.test(a.name));
  if (iconish) add("icon", { [iconish.name]: true }, "icon");
}

for (const pane of data.panes) {
  // Build the ancestor chain for real; the innermost element is the pane.
  let outer: HTMLElement | null = null;
  let el: HTMLElement | null = null;
  for (const classes of pane.chain) {
    const node = document.createElement("div");
    node.className = classes;
    if (el) el.appendChild(node); else outer = node;
    el = node;
  }
  el = el!;
  el.classList.add("pane");
  el.dataset.pane = pane.id;
  const h = document.createElement("h2");
  h.textContent = pane.id + " — " + pane.note;
  el.appendChild(h);
  const row = document.createElement("div");
  row.className = "row";
  for (const s of specimens) {
    const cell = document.createElement("div");
    cell.className = "cell";
    const node = document.createElement(plan.tag) as HTMLElement;
    for (const [k, v] of Object.entries(s.attrs)) node.setAttribute(k, v as string);
    if (plan.text) node.textContent = plan.text;
    node.dataset.auditId = s.id;
    node.dataset.auditPane = pane.id;
    const cap = document.createElement("span");
    cap.className = "cap";
    cap.textContent = s.id;
    cell.append(node, cap);
    row.appendChild(cell);
  }
  el.appendChild(row);
  app.appendChild(outer ?? el);
}

// Probe once fonts have settled — an icon measured before the webfont arrives
// reports the fallback's metrics and looks fine when it is not. The result is
// a promise on window rather than an attribute: the driver awaits it over CDP,
// and requestAnimationFrame never fires in this headless build.
(window as any).__auditReady = (async () => {
  await (document as any).fonts.ready;
  await new Promise((r) => setTimeout(r, 250));

  const out: any = {
    panes: {},
    specimens: [],
    skippedAxes: skipped.map((a: any) => a.name),
    sweptAxes: live.map((a: any) => a.name),
  };

  for (const pane of data.panes) {
    const el = document.querySelector('[data-pane="' + pane.id + '"]') as HTMLElement;
    const cs = getComputedStyle(el);
    out.panes[pane.id] = {
      surface: cs.backgroundColor,
      foreground: cs.color,
      surfaceToken: cs.getPropertyValue("--surface-page").trim(),
    };
  }

  for (const node of Array.from(document.querySelectorAll("[data-audit-id]")) as HTMLElement[]) {
    // The painted box lives in the shadow root; the host is just a wrapper.
    const paint = (node.shadowRoot?.querySelector("[part]") ?? node.shadowRoot?.firstElementChild ?? node) as HTMLElement;
    const pcs = getComputedStyle(paint);
    const r = paint.getBoundingClientRect();

    // Any element whose family resolved to the icon font, host or shadow.
    const all = [node, ...Array.from(node.shadowRoot?.querySelectorAll("*") ?? [])] as HTMLElement[];
    const glyphs = all
      .flatMap((n) => [n, ...Array.from((n as any).shadowRoot?.querySelectorAll("*") ?? [])] as HTMLElement[])
      .filter((n) => /ZdsIcons/i.test(getComputedStyle(n).fontFamily))
      .map((n) => {
        const gr = n.getBoundingClientRect();
        return { family: getComputedStyle(n).fontFamily, w: gr.width, h: gr.height, chars: (n.textContent ?? "").length };
      });

    out.specimens.push({
      id: node.dataset.auditId,
      pane: node.dataset.auditPane,
      axis: (specimens.find((s: any) => s.id === node.dataset.auditId) || {}).axis,
      w: r.width, h: r.height,
      bg: pcs.backgroundColor,
      fg: pcs.color,
      border: pcs.borderTopColor,
      radius: pcs.borderTopLeftRadius,
      font: pcs.fontFamily,
      fontSize: pcs.fontSize,
      glyphs,
    });
  }

  out.docHeight = document.documentElement.scrollHeight;
  return out;
})();
`);

writeFileSync(join(AUDIT, "vite.config.mjs"), `
import { defineConfig } from "vite";
export default defineConfig({
  root: ${JSON.stringify(AUDIT)},
  base: "./",
  logLevel: "warn",
  build: { outDir: ${JSON.stringify(join(AUDIT, "dist"))}, emptyOutDir: true, target: "esnext" },
});
`);

// Keep the harness and the shots out of git. Checked per entry, not with one
// "does .audit appear anywhere" test — that guard passes as soon as the first
// entry exists and silently never adds the second.
const gi = join(PKG, ".gitignore");
if (existsSync(gi)) {
  const cur = readFileSync(gi, "utf8");
  const missing = [".audit/", ".audit-shots/"].filter((e) => !cur.split(/\r?\n/).includes(e));
  if (missing.length) appendFileSync(gi, (cur.endsWith("\n") ? "" : "\n") + missing.join("\n") + "\n");
}

// ---------- 4. tokens, then build ----------------------------------------
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

process.stdout.write("tokens… ");
run("node", [join(PKG, "scripts/build-tokens-css.mjs")], PKG);
process.stdout.write("build… ");
try {
  run(join(PKG, "node_modules/.bin/vite"), ["build", "--config", join(AUDIT, "vite.config.mjs")], PKG);
} catch (e) {
  console.error("\nvite build failed:\n" + (e.stdout || "") + (e.stderr || ""));
  process.exit(1);
}

// ---------- 5. serve + drive Chrome --------------------------------------
const DIST = join(AUDIT, "dist");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
               ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".svg": "image/svg+xml" };
const server = createServer(async (req, res) => {
  const p = join(DIST, decodeURIComponent(req.url.split("?")[0]) === "/" ? "index.html" : decodeURIComponent(req.url.split("?")[0]));
  try {
    const body = await readFile(p);
    res.writeHead(200, { "content-type": MIME[extname(p)] ?? "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const URL_ = `http://127.0.0.1:${server.address().port}/`;

/*
 * Driven over the DevTools protocol rather than with --dump-dom/--screenshot.
 * Those flags stall indefinitely here: requestAnimationFrame never fires under
 * --virtual-time-budget in this headless build, so a probe that waits for a
 * frame waits forever and the process has to be killed. CDP gives a real
 * promise to await, a real timeout, and a full-page screenshot without having
 * to guess the window height in advance.
 *
 * A private --user-data-dir is also not optional: without one, a Chrome that
 * is already running on this machine takes the request over and opens a tab in
 * the user's own window instead of rendering anything headless.
 */
const PROFILE = join(AUDIT, "chrome-profile");
mkdirSync(PROFILE, { recursive: true });

process.stdout.write("render… ");
const proc = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${PROFILE}`,
  "--no-first-run", "--no-default-browser-check", "--disable-extensions",
  "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2", "about:blank",
], { stdio: "ignore" });

const cleanup = () => { try { proc.kill(); } catch {} server.close(); };
process.on("exit", cleanup);

// Chrome writes the port it chose into the profile dir once it is listening.
const portFile = join(PROFILE, "DevToolsActivePort");
let port = null;
for (let i = 0; i < 80 && !port; i++) {
  await new Promise((r) => setTimeout(r, 250));
  if (existsSync(portFile)) port = readFileSync(portFile, "utf8").split("\n")[0].trim();
}
if (!port) { cleanup(); console.error("\nheadless Chrome never opened a debugging port"); process.exit(1); }

const target = await (await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(URL_)}`, { method: "PUT" })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const cdp = (method, params = {}) => new Promise((res, rej) => {
  const id = ++msgId;
  const t = setTimeout(() => rej(new Error(`${method} timed out`)), 60_000);
  pending.set(id, (m) => { clearTimeout(t); m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result); });
  ws.send(JSON.stringify({ id, method, params }));
});

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Emulation.setDeviceMetricsOverride", { width: 1500, height: 1200, deviceScaleFactor: 2, mobile: false });

// The harness sets window.__auditReady to a promise that resolves once fonts
// are ready and layout has settled. The module may not have executed yet when
// we first ask, so poll for the handle before awaiting it — evaluating too
// early returns undefined and looks like a probe that produced nothing.
let evalResult = null;
for (let i = 0; i < 60; i++) {
  const present = await cdp("Runtime.evaluate", { expression: "typeof window.__auditReady", returnByValue: true });
  if (present.result.value === "object") {
    evalResult = await cdp("Runtime.evaluate", { expression: "window.__auditReady", awaitPromise: true, returnByValue: true });
    break;
  }
  await new Promise((r) => setTimeout(r, 250));
}
if (!evalResult) {
  cleanup();
  console.error("\nThe harness never started — a module failed to load.\nRe-run with --keep and serve .audit/dist to see the console error.");
  process.exit(1);
}
if (evalResult.exceptionDetails) {
  cleanup();
  console.error("\nThe harness threw while probing:\n" +
    (evalResult.exceptionDetails.exception?.description ?? JSON.stringify(evalResult.exceptionDetails)) +
    "\nRe-run with --keep and open .audit/dist in a browser to see it directly.");
  process.exit(1);
}
const got = evalResult.result.value;

// Shots live OUTSIDE .audit: the cleanup below removes the harness, and deleting
// the screenshot the last line tells you to open is not a useful default.
mkdirSync(SHOTS, { recursive: true });
const shot = join(SHOTS, `${component}.png`);
// Resize to the content before capturing, or the PNG is mostly empty page.
await cdp("Emulation.setDeviceMetricsOverride", {
  width: 1500, height: Math.min(Math.ceil(got.docHeight) + 24, 8000), deviceScaleFactor: 2, mobile: false,
});
const png = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
writeFileSync(shot, Buffer.from(png.data, "base64"));

ws.close();
cleanup();
console.log("done\n");

// ---------- 6. assertions -------------------------------------------------
const RGB = (s) => { const n = (s.match(/[\d.]+/g) ?? []).map(Number); return n.length >= 3 ? n : null; };
const lum = (c) => { const [r, g, b] = c.slice(0, 3).map((v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.0722 * b + 0.7152 * g; };
const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
const opaque = (s) => { const c = RGB(s); return c && (c[3] === undefined || c[3] > 0.05); };

const results = [];
const check = (level, name, ok, detail = "") => results.push({ level: ok ? "pass" : level, name, detail });

const byPane = (p) => got.specimens.filter((s) => s.pane === p);
const find = (p, id) => got.specimens.find((s) => s.pane === p && s.id === id);

// (a) Nothing collapsed. The failure mode that looks like "the component is missing".
const collapsed = got.specimens.filter((s) => s.w < 1 || s.h < 1);
check("fail", "no specimen collapsed to zero width or height", collapsed.length === 0,
  collapsed.slice(0, 4).map((s) => `${s.pane}/${s.id} ${s.w}x${s.h}`).join(", "));

// (b) The size axis is actually wired: rendered heights increase with the size option.
const sizeDef = spec.api?.size;
if (sizeDef?.values) {
  const hs = sizeDef.values.map((v) => find("light", `size=${v}`)?.h ?? 0);
  const increasing = hs.every((h, i) => i === 0 || h > hs[i - 1]);
  check("fail", "height grows across the size axis", increasing, sizeDef.values.map((v, i) => `${v}=${hs[i]}`).join(" "));
}

// (c) The label is visible against its own background. Advisory: the Figma
// palette has known contrast shortfalls that are tracked in the spec's issues,
// so this must not block a build that faithfully implements the spec.
const contrast = got.specimens
  .filter((s) => opaque(s.bg) && opaque(s.fg))
  .map((s) => ({ s, r: ratio(RGB(s.fg), RGB(s.bg)) }));
const invisible = contrast.filter((c) => c.r < 1.2);
check("fail", "no label painted onto its own background colour", invisible.length === 0,
  invisible.slice(0, 4).map((c) => `${c.s.pane}/${c.s.id}`).join(", "));
const low = contrast.filter((c) => c.r < 4.5);
check("warn", "label contrast >= 4.5:1 everywhere", low.length === 0,
  `${low.length} below 4.5:1, lowest ${low.length ? low.reduce((a, b) => (a.r < b.r ? a : b)).r.toFixed(2) : "-"}:1 — cross-check against the spec's known contrast issues`);

// (d) The icon font actually loaded and a glyph actually drew.
const withGlyphs = got.specimens.filter((s) => s.glyphs.length);
if (withGlyphs.length) {
  const dead = withGlyphs.filter((s) => s.glyphs.some((g) => g.w < 1 || g.chars === 0));
  check("fail", "every icon glyph resolved and drew a box", dead.length === 0,
    dead.slice(0, 4).map((s) => `${s.pane}/${s.id}`).join(", "));
} else {
  check("warn", "at least one specimen exercises the icon font", false,
    "no element resolved to a ZdsIcons family — the font may not be loaded, or no variant shows an icon");
}

// (e) Dark mode did something, and did it to the component and not just the page.
const lightSurface = got.panes.light.surface, darkSurface = got.panes.dark.surface;
check("fail", "dark mode changes the page surface", lightSurface !== darkSurface, `${lightSurface} vs ${darkSurface}`);
const movedInDark = byPane("light").filter((s) => { const d = find("dark", s.id); return d && (d.bg !== s.bg || d.fg !== s.fg || d.border !== s.border); });
check("fail", "dark mode reaches the component, not only the page", movedInDark.length > 0,
  `${movedInDark.length}/${byPane("light").length} specimens change`);

// (f) The nesting case: mode-light inside mode-dark must return to light.
check("fail", "mode-light nested inside mode-dark restores light",
  got.panes["dark-then-light"].surface === lightSurface,
  `${got.panes["dark-then-light"].surface} (expected ${lightSurface})`);

// (g) The extension reaches the component.
const movedInExt = byPane("dark").filter((s) => { const e = find("companion-dark", s.id); return e && e.bg !== s.bg; });
check("warn", "the companion extension re-themes the component", movedInExt.length > 0,
  `${movedInExt.length}/${byPane("dark").length} specimens change under .ext-companion`);

// (h) No var() fell through to nothing.
const unresolved = got.specimens.filter((s) => !s.fontSize || s.fontSize === "0px" || !RGB(s.fg));
check("fail", "no custom property resolved to an empty value", unresolved.length === 0,
  unresolved.slice(0, 4).map((s) => `${s.pane}/${s.id}`).join(", "));

// (i) Axes the spec declares but the element does not expose. Sometimes right
// (an interaction state is CSS, not a property), sometimes a missing prop —
// the audit cannot tell which, so it reports rather than judges.
if (got.skippedAxes.length) {
  check("warn", "every spec axis is a property on the element", false,
    `not swept: ${got.skippedAxes.join(", ")} — CSS-only states, or genuinely unimplemented`);
}

// ---------- 7. report -----------------------------------------------------
const icon = { pass: "PASS", warn: "WARN", fail: "FAIL" };
for (const r of results) console.log(`${icon[r.level]}  ${r.name.padEnd(52)} ${r.detail}`);

const fails = results.filter((r) => r.level === "fail").length;
const warns = results.filter((r) => r.level === "warn").length;
console.log(`\n${got.specimens.length} specimens across ${PANES.length} theme panes · ${fails} failing, ${warns} warning`);
console.log(`screenshot: ${shot}`);
console.log("Open it. These assertions catch collapse, invisibility and theming — they do not\n" +
            "catch a button that is simply the wrong shape, and only your eyes will.");

if (!KEEP) rmSync(AUDIT, { recursive: true, force: true });
process.exit(fails ? 1 : 0);
