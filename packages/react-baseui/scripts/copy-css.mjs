/* tsc emits the JS and keeps each component's side-effect CSS import
 * (`import "./button.css"`); this copies the CSS files themselves into dist
 * at the same relative paths so those imports resolve. Consumers bundle CSS
 * as usual — every stylesheet is listed in sideEffects so tree-shaking keeps
 * them. */
import { cpSync, mkdirSync } from "node:fs";
import { globSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "..", "src");
const DIST = join(here, "..", "dist");

const files = globSync("**/*.css", { cwd: SRC });
if (files.length === 0) throw new Error("no CSS found under src — run pnpm run tokens first");
for (const rel of files) {
  mkdirSync(join(DIST, dirname(rel)), { recursive: true });
  cpSync(join(SRC, rel), join(DIST, rel));
}
console.log(`copied ${files.length} stylesheets into dist`);
