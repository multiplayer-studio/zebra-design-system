// Screenshot a Zeta story with the pointer over each given point, in light and dark.
// Usage (Storybook running on 6010, run from packages/zeta-web so playwright resolves):
//   node ../../.claude/skills/zeta-web-components/scripts/hover-shot.mjs components-accordion--accordion 300,158 40,158
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";

// Resolve playwright from the working directory (packages/zeta-web), not from this script's folder.
const { chromium } = createRequire(`${process.cwd()}/`)("playwright");

const [story, ...points] = process.argv.slice(2);
if (!story || points.length === 0) {
  console.error("usage: hover-shot.mjs <story-id> <x,y> [x,y ...]");
  process.exit(1);
}
const out = process.env.OUT ?? `${tmpdir()}/zeta-hover-shots`;
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 640, height: 360 }, reducedMotion: "reduce" });
for (const mode of ["light", "dark"]) {
  await page.goto(`http://localhost:6010/iframe.html?id=${story}&viewMode=story&globals=mode:${mode}`);
  await page.waitForTimeout(2500);
  for (const point of points) {
    const [x, y] = point.split(",").map(Number);
    await page.mouse.move(x, y);
    await page.waitForTimeout(300);
    const file = `${out}/${story}-${mode}-${x}x${y}.png`;
    await page.screenshot({ path: file });
    console.log(file);
  }
}
await browser.close();
