// Builds docs/guide/dist from the project's own source, so the guide always shows
// the real components: node docs/guide/build.mjs (from the repo root).
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { figmaStatus } from "./figma-status.mjs";

const HERE = import.meta.dirname;
const ROOT = resolve(HERE, "../..");
const WC = join(ROOT, "packages/web-components");
const ICONS = join(ROOT, "packages/icons");
const OUT = join(HERE, "dist");
mkdirSync(OUT, { recursive: true });

execFileSync("node", ["scripts/build-tokens-css.mjs"], { cwd: WC, stdio: "inherit" });
execFileSync(join(WC, "node_modules/.bin/vite"), ["build", "--config", join(HERE, "vite.config.mjs")], { cwd: WC, stdio: "inherit" });

// Follow @import so one stylesheet holds every token layer. The page links Google Fonts itself.
const inline = (file) =>
  readFileSync(file, "utf8")
    .replace(/@import url\([^)]*\);?\n?/g, "")
    .replace(/@import "(.+?)";/g, (_, path) => inline(join(dirname(file), path)));

// Fonts travel inside the stylesheet, so nothing else has to be served beside it.
const font = (name) => readFileSync(join(ICONS, "fonts", `${name}.woff2`)).toString("base64");
const faces = ["Rounded", "Sharp"]
  .map((style) => `@font-face {
  font-family: "ZdsIcons-${style}";
  src: url("data:font/woff2;base64,${font(`ZdsIcons-${style}`)}") format("woff2");
  font-display: block;
}`)
  .join("\n");

writeFileSync(join(OUT, "zds.css"), `${faces}\n${inline(join(WC, "src/tokens/index.css"))}`);
// Shown on the page, so a reader can see how fresh it is.
const commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();
// The Figma Status tab: Figma's components (figma-components.json, from figma-sync.mjs) against the repo.
writeFileSync(join(OUT, "build.json"), JSON.stringify({ builtAt: new Date().toISOString(), commit, figma: figmaStatus(ROOT) }));
console.log("Built docs/guide/dist");
