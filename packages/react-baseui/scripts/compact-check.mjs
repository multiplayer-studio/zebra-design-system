#!/usr/bin/env node
/**
 * EXPERIMENT: measures Desktop Compact against Desktop on every Storybook story.
 *
 *   node scripts/compact-check.mjs [--url=http://localhost:6021] [--filter=button] [--concurrency=6]
 *
 * Tightening is only worth having if nothing breaks, so each story is rendered in
 * both modes and compared: how much shorter it got, and whether any text is
 * clipped or any content overflows in compact that didn't on Desktop. Exits 1 if
 * compact introduces either. The report goes to
 * node_modules/.cache/compact-check/report.json.
 */
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`)) ?? `--${n}=${d}`).split("=").slice(1).join("=");
const URL_BASE = arg("url", "http://localhost:6021");
const FILTER = arg("filter", "");
const CONCURRENCY = +arg("concurrency", 6);
const REPORT = arg("report", "report");

const zeta = join(HERE, "../../zeta-web");
const req = createRequire(join(zeta, "package.json"));
const { chromium } = req(req.resolve("playwright", { paths: [join(zeta, "node_modules/@web/test-runner-playwright")] }));

const probe = () => {
  const root = document.querySelector("#storybook-root");
  const label = (el) => `${typeof el.className === "string" && el.className ? "." + el.className.split(" ")[0] : el.tagName.toLowerCase()}:${(el.textContent ?? "").trim().slice(0, 24)}`;
  const clipped = [];
  // Through open shadow roots, where web-components and zeta-web keep their text.
  const all = (node) => [...node.querySelectorAll("*")].flatMap((el) => [el, ...(el.shadowRoot ? all(el.shadowRoot) : [])]);
  for (const el of all(root)) {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const style = getComputedStyle(el);
    const hides = [style.overflowX, style.overflowY].some((v) => v === "hidden" || v === "clip");
    if (!hides || style.display === "inline") continue;
    if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) clipped.push(label(el));
  }
  const box = root.getBoundingClientRect();
  return { height: Math.round(root.scrollHeight), width: Math.round(box.width), overflow: root.scrollWidth > root.clientWidth + 1, clipped };
};

async function measure(context, story, breakpoint) {
  const page = await context.newPage();
  try {
    await page.goto(`${URL_BASE}/iframe.html?id=${story.id}&viewMode=story&globals=breakpoint:${breakpoint}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("#storybook-root > *", { state: "attached", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState("load", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(400);
    return await page.evaluate(probe);
  } catch (e) {
    return { error: String(e.message).split("\n")[0].slice(0, 160) };
  } finally {
    await page.close();
  }
}

const index = await (await fetch(`${URL_BASE}/index.json`)).json();
const stories = Object.values(index.entries).filter((e) => e.type === "story" && !/^(Icons|Assets)/.test(e.title) && (!FILTER || e.id.includes(FILTER)));
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const queue = [...stories];
const rows = [];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const story = queue.shift();
    const desktop = await measure(context, story, "desktop");
    const compact = await measure(context, story, "desktop-compact");
    const before = new Set(desktop.clipped ?? []);
    rows.push({
      id: story.id, title: story.title, desktop: desktop.height, compact: compact.height,
      saved: desktop.height && compact.height ? +(1 - compact.height / desktop.height).toFixed(3) : 0,
      newlyClipped: (compact.clipped ?? []).filter((c) => !before.has(c)),
      newOverflow: Boolean(compact.overflow && !desktop.overflow),
      error: desktop.error ?? compact.error ?? null,
    });
  }
}));
await browser.close();

const sorted = rows.filter((r) => !r.error).map((r) => r.saved).sort((a, b) => a - b);
const median = sorted[Math.floor(sorted.length / 2)];
const unchanged = rows.filter((r) => r.saved <= 0 && !r.error);
const clipped = rows.filter((r) => r.newlyClipped.length);
const overflow = rows.filter((r) => r.newOverflow);
const errors = rows.filter((r) => r.error);
const dir = join(HERE, "../node_modules/.cache/compact-check");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `${REPORT}.json`), JSON.stringify({ median, rows }));
console.log(`${rows.length} stories · median ${(median * 100).toFixed(1)}% shorter · ${unchanged.length} no shorter · ${clipped.length} newly clip text · ${overflow.length} newly overflow · ${errors.length} errored`);
process.exit(clipped.length || overflow.length || errors.length ? 1 : 0);
