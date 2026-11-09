/* Derives the publishable package from the manager-maintained source at
 * <repo>/tokens. Nothing here is hand-edited: the DTCG tree, manifest and
 * fonts are copied verbatim, and the CSS layers are built by the shared
 * generator in packages/web-components. The working folders (_dump, _docs)
 * and anything dotfile-shaped never enter dist — asserted at the end, since
 * the tarball is only as clean as this folder. */
import { cpSync, rmSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(here, "..", "..", "tokens");
const BUILDER = join(here, "..", "web-components", "scripts", "build-tokens-css.mjs");
const DIST = join(here, "dist");

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// 1. The DTCG source of truth, verbatim.
for (const entry of ["base", "extensions", "manifest.json", "fonts.json", "fonts"]) {
  const from = join(SOURCE, entry);
  if (!existsSync(from)) throw new Error(`tokens source is missing ${entry} — run the token export first`);
  cpSync(from, join(DIST, entry), {
    recursive: true,
    filter: (src) => {
      const base = src.split("/").pop();
      return !(base.startsWith(".") || base.startsWith("_"));
    },
  });
}

// 2. Both CSS profiles from the shared generator.
execFileSync("node", [BUILDER, SOURCE, join(DIST, "css")], { stdio: "inherit" });
execFileSync("node", [BUILDER, SOURCE, join(DIST, "css-attributes"), "--attributes"], { stdio: "inherit" });

// 3. Denylist assert: fail the build rather than ship working data.
const offenders = [];
(function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name.startsWith("_") || name.name.startsWith(".")) offenders.push(join(dir, name.name));
    else if (name.isDirectory()) walk(join(dir, name.name));
  }
})(DIST);
if (offenders.length) throw new Error(`working files reached dist:\n${offenders.join("\n")}`);

console.log("Built @zebra-design-system/tokens dist (json + css + css-attributes + fonts)");
