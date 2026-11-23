#!/usr/bin/env node
/* `npx zebra-theme` — builds a project theme for the Zebra Design System from a
 * small file of overrides, the same way the shipped extensions are built: every
 * token that depends on an override is re-declared for every mode, so the theme
 * holds wherever its class is put and whatever mode sits inside or around it.
 *
 *   npx zebra-theme <theme.json> [out.css]     build the theme's CSS
 *   npx zebra-theme --list[=filter]            list the tokens a theme can change
 *   npx zebra-theme --init <name>              write a starter <name>.theme.json
 *   npx zebra-theme --ramp=<hex> [--like=<ramp>]   work out a ramp from one colour
 *
 *   --attributes     also accept data-theme-ext="<name>" beside the class
 *   --profile=zeta   Zeta Web's vocabulary: [data-brand="<name>"]
 *   --strict         exit with an error if the theme loses text contrast
 *
 * The theme file:
 *   { "name": "route-planner",              the class becomes .ext-route-planner
 *     "extends": "companion",               optional: start from a shipped extension
 *     "values": { "primitives": { "color/brand/main/60": "#7a1fa2" } },
 *     "modes":  { "Dark": { "palette": { "brand/primary/default": "{primitives.color.brand.main.40}" } } } }
 *
 * --ramp answers two questions about a project's colour, by calculation: is it
 * already a Zebra colour (the nearest shipped step and how far off it is), and
 * what full ramp does it make. The ramp keeps the colour's hue and strength and
 * takes each step's lightness from the ramp it replaces (--like, by default
 * color/brand/main), so the system's contrast carries over. It prints the
 * "values" block to paste into the theme file.
 *
 * Load the generated CSS after @zebra-design-system/tokens/css and put the class
 * on the page root or any container.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const TOKENS = join(here, "..", "dist");
const BUILDER = join(TOKENS, "tools", "build-tokens-css.mjs");
const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const rest = args.filter((a) => !a.startsWith("--"));
const run = (extra) => {
  try { execFileSync(process.execPath, [BUILDER, TOKENS, ...extra], { stdio: "inherit" }); }
  catch (e) { process.exit(e.status ?? 1); }
};

if (!existsSync(BUILDER)) {
  console.error("zebra-theme: the token builder is missing from this package's dist/. Reinstall @zebra-design-system/tokens.");
  process.exit(1);
}

// ---- --ramp: colour arithmetic in OKLCH, so lightness steps look even ----------
const flag = (name) => flags.find((f) => f.startsWith(`--${name}=`))?.slice(name.length + 3);
const toLab = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt((h.length === 3 ? [...h].map((c) => c + c).join("") : h).slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
};
const toRgb = ([L, a, b]) => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
};
const inGamut = (rgb) => rgb.every((c) => c >= -0.0005 && c <= 1.0005);
const toHex = (rgb) => "#" + rgb.map((c) => Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.max(c, 0) ** (1 / 2.4) - 0.055)).toString(16).padStart(2, "0")).map((x) => x.slice(-2)).join("");
// A colour at this lightness and hue, with as much of the wanted strength as the screen can show.
const fit = (L, C, H) => {
  let lo = 0, hi = C;
  const at = (c) => [L, c * Math.cos(H), c * Math.sin(H)];
  if (inGamut(toRgb(at(C)))) return toHex(toRgb(at(C)).map((c) => Math.min(1, Math.max(0, c))));
  for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (inGamut(toRgb(at(mid)))) lo = mid; else hi = mid; }
  return toHex(toRgb(at(lo)).map((c) => Math.min(1, Math.max(0, c))));
};
const distance = (x, y) => 100 * Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);

if (flag("ramp") !== undefined) {
  const hex = flag("ramp").toLowerCase();
  if (!/^#?([0-9a-f]{3}|[0-9a-f]{6})$/.test(hex)) { console.error('usage: zebra-theme --ramp=<hex> [--like=color/brand/main]   for example --ramp=#7a1fa2'); process.exit(1); }
  const like = (flag("like") ?? "color/brand/main").replace(/^primitives\//, "");
  const manifest = JSON.parse(readFileSync(join(TOKENS, "manifest.json"), "utf8"));
  const primitives = manifest.collections.find((c) => c.name === "primitives") ?? manifest.collections.find((c) => c.modes.length === 1);
  const tree = JSON.parse(readFileSync(join(TOKENS, primitives.files[0]), "utf8"));
  const steps = []; // every colour step the system ships: [path, hex]
  (function walk(node, path) {
    for (const [k, v] of Object.entries(node)) {
      if (!v || typeof v !== "object") continue;
      if ("$value" in v) { if (/^#([0-9a-f]{6})$/i.test(String(v.$value))) steps.push([[...path, k].join("/"), String(v.$value).toLowerCase()]); }
      else walk(v, [...path, k]);
    }
  })(tree, []);
  const ramp = steps.filter(([p]) => p.startsWith(like + "/")).sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));
  if (!ramp.length) { console.error(`--like: no ramp at "${like}". Run: zebra-theme --list=color`); process.exit(1); }
  const lab = toLab(hex), C = Math.hypot(lab[1], lab[2]), H = Math.atan2(lab[2], lab[1]);
  const nearest = steps.map(([p, h]) => [p, h, distance(lab, toLab(h))]).sort((a, b) => a[2] - b[2])[0];
  const likeLab = ramp.map(([p, h]) => [p, h, toLab(h)]);
  const likeHue = (() => { const mid = likeLab[Math.floor(likeLab.length / 2)][2]; return Math.atan2(mid[2], mid[1]); })();
  const hueOff = Math.abs(((H - likeHue) * 180 / Math.PI + 540) % 360 - 180);
  const made = likeLab.map(([p, , l]) => [p, fit(l[0], C, H)]);
  const carrier = made.map(([p, h]) => [p, h, distance(lab, toLab(h))]).sort((a, b) => a[2] - b[2])[0];
  console.log(`colour ${hex.startsWith("#") ? hex : "#" + hex}`);
  console.log(`  nearest Zebra step: ${nearest[0]} ${nearest[1]} — difference ${nearest[2].toFixed(1)}${nearest[2] <= 2 ? " (the same colour: use the Zebra step)" : nearest[2] <= 5 ? " (close: the same colour at another tone)" : " (a different colour)"}`);
  console.log(`  hue against ${like}: ${hueOff.toFixed(0)}° apart${hueOff > 15 ? " (a different brand colour)" : " (the same family)"}`);
  console.log(`  the exact colour sits nearest step ${carrier[0].split("/").pop()} of the new ramp (${carrier[1]}, difference ${carrier[2].toFixed(1)})${carrier[2] > 5 ? " — no step carries it; keep the exact value for brand touches such as the logo" : ""}`);
  console.log(`\nramp for ${like}, each step at the lightness of the step it replaces:\n`);
  console.log(JSON.stringify({ values: { primitives: Object.fromEntries(made) } }, null, 2));
  console.log(`\nDifference is the distance between two colours in OKLab, times 100: about 2 is the smallest most people see.`);
  process.exit(0);
}

if (flags.includes("--init")) {
  const name = rest[0];
  if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) { console.error("usage: zebra-theme --init <name>   (lowercase letters, digits and hyphens)"); process.exit(1); }
  const file = `${name}.theme.json`;
  if (existsSync(file)) { console.error(`${file} already exists.`); process.exit(1); }
  writeFileSync(file, JSON.stringify({
    name,
    description: "Values only: every path is an existing token. Run `npx zebra-theme --list` to see them, then `npx zebra-theme " + file + "`.",
    values: { primitives: {} },
    modes: {},
  }, null, 2) + "\n");
  console.log(`wrote ${file}. Add values, then run: npx zebra-theme ${file}`);
} else if (flags.some((f) => f === "--list" || f.startsWith("--list="))) {
  run(flags);
} else if (rest[0]) {
  const out = rest[1] ?? rest[0].replace(/(\.theme)?\.json$/, "") + ".theme.css";
  run([out, `--theme=${rest[0]}`, ...flags]);
} else {
  console.log("usage:\n  npx zebra-theme <theme.json> [out.css]\n  npx zebra-theme --list[=filter]\n  npx zebra-theme --init <name>");
  process.exit(1);
}
