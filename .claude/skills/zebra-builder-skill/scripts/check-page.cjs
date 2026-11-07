// Drives a page story in a real browser: runs the flow's steps, screenshots
// each state, measures every visible text, and fails on console errors.
//
//   node check-page.cjs <steps.cjs> <outDir>        (from the repo root)
//
// Playwright is resolved from the repo's packages automatically (CommonJS so
// the fallback require works; NODE_PATH still wins if set).
// <steps.cjs> exports { story, viewport?, steps(page, ui) }, e.g.
//
//   module.exports = {
//     story: "experimental-pages-my-flow--flow",
//     viewport: { width: 1440, height: 900 },
//     async steps(p, { shot, go, wait }) {
//       await shot("01-start");
//       await p.getByRole("button", { name: "Next", exact: true }).click();
//       await shot("02-next");
//       await go("experimental-pages-my-flow--dark"); await shot("dark");
//     },
//   };
//
// Storybook must be running (React on 6008; PORT overrides). Each shot is of
// the story's root element, so Storybook's own padding is left out. Prints a
// text table per shot (text | size/line-height weight) to compare with Figma.
const path = require("path");
const fs = require("fs");
const { chromium } = (() => {
  const candidates = ["playwright", ...["zeta-web", "react-baseui", "web-components"].map((p) => path.join(__dirname, "../../../../packages", p, "node_modules/playwright"))];
  for (const c of candidates) { try { return require(c); } catch {} }
  throw new Error("playwright not found in NODE_PATH or packages/*/node_modules");
})();

const [stepsFile, outDir] = process.argv.slice(2);
if (!stepsFile || !outDir) { console.error("usage: check-page.cjs <steps.cjs> <outDir>"); process.exit(1); }
const spec = require(path.resolve(stepsFile));
const port = process.env.PORT || 6008;
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const vp = spec.viewport || { width: 1440, height: 900 };
  const browser = await chromium.launch();
  // Viewport larger than the page so the frame is never clipped.
  const page = await browser.newPage({ viewport: { width: vp.width + 80, height: vp.height + 80 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  const go = async (id) => {
    await page.goto(`http://localhost:${port}/iframe.html?id=${id}&viewMode=story`);
    await page.waitForSelector("#storybook-root > *");
    await page.waitForTimeout(600);
  };
  const wait = (ms) => page.waitForTimeout(ms);
  const texts = () => page.evaluate(() => {
    const root = document.querySelector("#storybook-root");
    return [...root.querySelectorAll("*")]
      // Skip icon glyphs (Private Use Area characters); they aren't text.
      .filter((e) => [...e.childNodes].some((c) => c.nodeType === 3 && c.textContent.replace(/[\uE000-\uF8FF]/g, "").trim()))
      .filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== "hidden")
      .map((e) => { const s = getComputedStyle(e); return `${e.textContent.trim().slice(0, 48)} | ${s.fontSize}/${s.lineHeight} ${s.fontWeight}`; });
  });
  const shot = async (name) => {
    await page.locator("#storybook-root > *").first().screenshot({ path: path.join(outDir, `${name}.png`) });
    const t = [...new Set(await texts())];
    fs.writeFileSync(path.join(outDir, `${name}.txt`), t.join("\n") + "\n");
    console.log(`shot ${name}  (${t.length} texts)`);
  };

  try {
    await go(spec.story);
    await spec.steps(page, { shot, go, wait });
  } catch (e) {
    errors.push(`STEP FAILED: ${e.message.split("\n")[0]}`);
    await page.screenshot({ path: path.join(outDir, "failure.png") }).catch(() => {});
  }
  await browser.close();
  console.log(errors.length ? `ERRORS\n${errors.join("\n")}` : "No console errors.");
  process.exit(errors.length ? 1 : 0);
})();
