#!/usr/bin/env node
/**
 * EXPERIMENT: confirms the AAA palette modes against every Storybook story.
 *
 *   node scripts/aaa-contrast.mjs [--url=http://localhost:6021] [--modes=aaa-light,aaa-dark,light,dark]
 *                                 [--filter=button] [--concurrency=6]
 *
 * --url points it at any package's Storybook, and --report names its report, so the
 * web-components and zeta-web Storybooks are swept the same way. Needs Storybook running. Two checks, because each misses what the other sees:
 *
 *   1. Token pairs. Every foreground against the surfaces and state fills it sits
 *      on, 7:1. This is the only cover for hover and pressed, which a static
 *      render never shows.
 *   2. Stories. axe's color-contrast-enhanced rule, WCAG 1.4.6 AAA: 7:1, or
 *      4.5:1 for large text. Disabled controls are exempt, as WCAG has them. Each
 *      story is checked at rest, then with up to three of its popups open.
 *
 * axe marks text it can't judge, over a gradient or an image, as incomplete
 * rather than failed. Those are counted and listed, never treated as a pass.
 * Icon glyphs land there too, as non-BMP text; text contrast doesn't apply.
 *
 * ext-* panes in the Theming Cascade stories are brands, which the AAA modes
 * don't cover, so they are excluded and the stories holding them counted.
 *
 * The report goes to node_modules/.cache/aaa-contrast/report.json. Exits 1 if a
 * checked AAA mode fails.
 */
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`)) ?? `--${n}=${d}`).split("=").slice(1).join("=");
const URL_BASE = arg("url", "http://localhost:6021");
const MODES = arg("modes", "aaa-light,aaa-dark").split(",");
const FILTER = arg("filter", "");
const CONCURRENCY = +arg("concurrency", 6);
const REPORT = arg("report", "report");

// axe comes with this package's a11y addon; Playwright is borrowed from zeta-web, so the experiment adds no dependency.
const pnpm = join(HERE, "../node_modules/.pnpm");
const axeDir = readdirSync(pnpm).find((d) => d.startsWith("axe-core@"));
const axe = readFileSync(join(pnpm, axeDir, "node_modules/axe-core/axe.min.js"), "utf8");
const zeta = join(HERE, "../../zeta-web");
const req = createRequire(join(zeta, "package.json"));
const { chromium } = req(req.resolve("playwright", { paths: [join(zeta, "node_modules/@web/test-runner-playwright")] }));

const BRAND = '[class*="ext-"], [data-theme-ext]:not([data-theme-ext="base"]), [data-brand]';
const STATES = ["default", "hover", "pressed", "focused", "selected"];
// No selection: those fills are the switch track and the radio and checkbox marks, which carry no text.
const FILLS = ["primary", "secondary", "destructive", "positive", "inverse", "neutral", "subtle"];
const SURFACES = ["page", "section", "card", "subtle", "menu", "dialog", "sheet", "popover"];
const pairs = [];
for (const flavour of FILLS)
  for (const state of STATES)
    pairs.push([`interactive-${flavour}-foreground-default`, `interactive-${flavour}-background-${state}`]);
for (const surface of SURFACES) {
  for (const fg of ["primary", "secondary", "tertiary", "link", "error", "success", "warning", "info", "gradient-start", "gradient-end"])
    pairs.push([`foreground-${fg}`, `surface-${surface}`]);
  for (const state of ["default", "hover", "pressed", "selected"])
    pairs.push([`interactive-ghost-foreground-default`, `interactive-ghost-background-${state}@surface-${surface}`]);
  pairs.push(["feedback-error-foreground", `surface-${surface}`]);
}
for (const kind of ["error", "info", "success", "warning"]) {
  pairs.push([`feedback-${kind}-foreground`, `feedback-${kind}-background-subtle`], [`foreground-${kind}`, `surface-${kind}`]);
  pairs.push(["foreground-on-strong", `feedback-${kind}-background-strong`], ["foreground-primary", `surface-${kind}`]);
}
pairs.push(["foreground-on-strong", "feedback-neutral-background-strong"], ["feedback-neutral-foreground", "feedback-neutral-background-subtle"]);
pairs.push(["foreground-inverse", "surface-inverse"], ["foreground-inverse", "surface-tooltip"], ["selection-text", "selection-background"]);
pairs.push(["foreground-on-strong", "surface-gradient-start"], ["foreground-on-strong", "surface-gradient-end"]);

async function tokenPairs(browser, mode) {
  const page = await browser.newPage();
  await page.goto(`${URL_BASE}/iframe.html?id=${firstStory}&viewMode=story&globals=mode:${mode}`);
  await page.waitForSelector("#storybook-root > *", { state: "attached", timeout: 30000 });
  const rows = await page.evaluate(({ pairs, mode }) => {
    const probe = document.createElement("div");
    probe.className = `mode-${mode}`;
    probe.dataset.theme = mode;
    document.body.append(probe);
    const parse = (text) => {
      const m = /color\(srgb ([\d.e-]+) ([\d.e-]+) ([\d.e-]+)(?: \/ ([\d.e-]+))?\)/.exec(text);
      if (m) return { r: +m[1] * 255, g: +m[2] * 255, b: +m[3] * 255, a: m[4] === undefined ? 1 : +m[4] };
      const n = text.match(/[\d.]+/g).map(Number);
      return { r: n[0], g: n[1], b: n[2], a: n[3] ?? 1 };
    };
    const read = (token) => {
      probe.style.color = "";
      // Zeta aliases the names its legacy tokens share with Zebra's.
      probe.style.color = `var(--zebra-${token}, var(--${token}))`;
      return parse(getComputedStyle(probe).color);
    };
    const over = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
    const lum = ({ r, g, b }) => {
      const c = [r, g, b].map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    return pairs.map(([fg, bg]) => {
      const [fill, surface] = bg.split("@");
      const ground = surface ? over(read(fill), read(surface)) : read(fill);
      const [a, b] = [lum(over(read(fg), ground)), lum(ground)];
      return { fg, bg, ratio: +((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2) };
    });
  }, { pairs, mode });
  await page.close();
  return rows;
}

const runAxe = (page, scope) => page.evaluate(async ({ scope, BRAND }) => {
  // An ext-* pane is a brand, which the AAA modes don't cover, so it is left out and counted.
  const r = await window.axe.run({ include: [[scope]], exclude: [[BRAND]] }, { runOnly: ["color-contrast-enhanced", "color-contrast"], resultTypes: ["violations", "incomplete"] });
  const pick = (list) => list.flatMap((rule) => rule.nodes.map((n) => {
    const d = (n.any[0] ?? n.all[0] ?? n.none[0])?.data ?? {};
    return { rule: rule.id, target: String(n.target.at(-1)), html: n.html.slice(0, 120), ratio: d.contrastRatio, fg: d.fgColor, bg: d.bgColor, size: d.fontSize, weight: d.fontWeight, reason: d.messageKey };
  }));
  return { violations: pick(r.violations), incomplete: pick(r.incomplete) };
}, { scope, BRAND });

async function checkStory(context, story, mode) {
  const page = await context.newPage();
  const out = { id: story.id, title: story.title, name: story.name, mode, violations: [], incomplete: [], error: null, brandPanes: 0 };
  const add = (found, stage) => {
    out.violations.push(...found.violations.map((v) => ({ ...v, stage })));
    out.incomplete.push(...found.incomplete.map((v) => ({ ...v, stage })));
  };
  try {
    await page.goto(`${URL_BASE}/iframe.html?id=${story.id}&viewMode=story&globals=mode:${mode}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("#storybook-root > *", { state: "attached", timeout: 30000 });
    await page.waitForTimeout(500);
    await page.addScriptTag({ content: axe });
    out.brandPanes = await page.locator(BRAND).count();
    add(await runAxe(page, "#storybook-root"), "rest");
    const triggers = await page.$$("#storybook-root [aria-haspopup]:not([disabled]):not([aria-disabled='true'])");
    for (const trigger of triggers.slice(0, 3)) {
      await trigger.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(250);
      add(await runAxe(page, "body"), "popup");
      await page.keyboard.press("Escape");
      await page.waitForTimeout(120);
    }
  } catch (e) {
    out.error = String(e.message).split("\n")[0].slice(0, 200);
  }
  await page.close();
  return out;
}

const index = await (await fetch(`${URL_BASE}/index.json`)).json();
const stories = Object.values(index.entries).filter((e) => e.type === "story" && !/^(Icons|Assets)/.test(e.title) && (!FILTER || e.id.includes(FILTER)));
const firstStory = stories[0].id;
const browser = await chromium.launch();
const report = { generatedAt: new Date().toISOString(), stories: stories.length, components: new Set(stories.map((s) => s.title)).size, modes: {} };
let failed = false;

for (const mode of MODES) {
  const tokens = await tokenPairs(browser, mode);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const queue = [...stories];
  const results = [];
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const story = queue.shift();
      results.push(await checkStory(context, story, mode));
    }
  }));
  await context.close();
  const bad = results.filter((r) => r.violations.length || r.error);
  const errors = results.filter((r) => r.error);
  const tokenFails = tokens.filter((t) => t.ratio < 7);
  const nodes = results.reduce((n, r) => n + r.violations.length, 0);
  report.modes[mode] = { tokenPairs: tokens.length, tokenFails, storiesFailing: bad.length, failingNodes: nodes, errors: errors.map((e) => [e.id, e.error]), incomplete: results.reduce((n, r) => n + r.incomplete.filter((i) => i.reason !== "nonBmp").length, 0), brandStories: results.filter((r) => r.brandPanes).length, results };
  console.log(`${mode.padEnd(10)} token pairs ${tokens.length - tokenFails.length}/${tokens.length} · stories ${results.length - bad.length}/${results.length} clean · ${nodes} failing nodes · ${report.modes[mode].incomplete} undetermined · ${errors.length} errored · ${report.modes[mode].brandStories} stories with brand panes excluded`);
  if (mode.startsWith("aaa") && (tokenFails.length || bad.length || errors.length)) failed = true;
}
await browser.close();

const dir = join(HERE, "../node_modules/.cache/aaa-contrast");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `${REPORT}.json`), JSON.stringify(report));
console.log(`report: ${join(dir, `${REPORT}.json`)}`);
process.exit(failed ? 1 : 0);
