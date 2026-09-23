#!/usr/bin/env node
/**
 * Asserts the theming contract in a REAL browser.
 *
 * An earlier version of this script resolved var() chains lazily at use time
 * and passed while theming was in fact broken: CSS substitutes a custom
 * property where it is DECLARED, not where it is used, so a scoped override of
 * a dependency never reaches its dependents unless they are re-declared in the
 * same scope. Hand-modelling that is exactly the mistake this file exists to
 * catch, so it drives headless Chrome and reads getComputedStyle instead.
 *
 *   node check-theming.mjs [tokensCssDir]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = process.argv[2] || join(HERE, "../src/tokens");

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => existsSync(p));

if (!CHROME) {
  console.error("No Chrome/Chromium found. This check needs a real browser: the bug class it\n" +
                "guards against (substitution at declaration scope) cannot be modelled reliably\n" +
                "by hand. Install Chrome or run it in CI with one available.");
  process.exit(2);
}

// Every generated layer except fonts.css, which would hit the network.
const css = readdirSync(DIR)
  .filter((f) => f.endsWith(".css") && !["index.css", "fonts.css"].includes(f))
  .sort((a, b) => (a === "themes.css" ? 1 : b === "themes.css" ? -1 : 0)) // themes last
  .map((f) => readFileSync(join(DIR, f), "utf8"))
  .join("\n");

// [id, nesting of classes from outermost to the probed element]
const PROBES = [
  ["base", []],
  ["dark", ["mode-dark"]],
  ["companion", ["ext-companion"]],
  ["companion-dark-same", ["ext-companion mode-dark"]],
  ["dark-then-companion", ["mode-dark", "ext-companion"]],
  ["companion-then-dark", ["ext-companion", "mode-dark"]],
  ["target", ["ext-target"]],
  ["target-dark", ["ext-target mode-dark"]],
  ["dark-then-light", ["mode-dark", "mode-light"]],
  ["deep", ["ext-target", "", "", "mode-dark", ""]],
];

const READ = [
  "--interactive-primary-background-default",
  "--interactive-primary-foreground-default",
  "--surface-page",
  "--control-sm",
];

const html = `<!doctype html><meta charset=utf-8><style>${css}</style>
${PROBES.map(([id, chain]) => {
  let open = "", close = "";
  chain.forEach((c) => { open += `<div class="${c}">`; close += "</div>"; });
  return `${open}<i id="${id}"></i>${close}`;
}).join("\n")}
<script>
  const out = {};
  for (const id of ${JSON.stringify(PROBES.map(([id]) => id))}) {
    const s = getComputedStyle(document.getElementById(id));
    out[id] = Object.fromEntries(${JSON.stringify(READ)}.map((p) => [p, s.getPropertyValue(p).trim()]));
  }
  document.body.setAttribute("data-result", JSON.stringify(out));
</script>`;

const file = join(tmpdir(), `zds-theming-${Date.now()}.html`);
writeFileSync(file, html);
const dom = execFileSync(CHROME, ["--headless", "--disable-gpu", "--dump-dom", "--virtual-time-budget=3000", `file://${file}`],
  { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });

const m = /data-result="([^"]*)"/.exec(dom);
if (!m) { console.error("Probe did not run; the generated CSS may be invalid."); process.exit(1); }
const got = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));

const P = "--interactive-primary-background-default";
const EXPECT = [
  ["base", P, "#1f69ff", "base primary"],
  ["base", "--surface-page", "#f3f6fa", "base surface"],
  ["dark", "--surface-page", "#1d1e23", "dark surface"],
  ["dark", P, "#1f69ff", "brand does not change in dark"],
  ["companion", P, "#7e0cff", "extension reaches semantics (palette layer)"],
  ["companion-dark-same", P, "#7e0cff", "extension + mode on one element"],
  ["dark-then-companion", P, "#7e0cff", "mode outside, extension inside"],
  ["companion-then-dark", P, "#7e0cff", "extension outside, mode inside"],
  ["target", P, "#cc0000", "extension reaches semantics THROUGH primitives"],
  ["target-dark", P, "#cc0000", "two-layer extension + dark"],
  ["dark-then-light", "--surface-page", "#f3f6fa", "mode-light returns to light inside dark"],
  ["deep", P, "#cc0000", "survives several levels of nesting"],
  ["deep", "--control-sm", "36px", "dimension tokens unaffected by colour themes"],
];

let bad = 0;
for (const [id, prop, want, label] of EXPECT) {
  const have = got[id]?.[prop] ?? "<none>";
  const ok = have === want;
  if (!ok) bad++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(48)} ${prop.replace("--interactive-primary-background-", "…")} = ${have}${ok ? "" : `  (expected ${want})`}`);
}
console.log(bad ? `\n${bad} failing` : `\nall ${EXPECT.length} theming assertions pass (headless Chrome)`);
process.exit(bad ? 1 : 0);
