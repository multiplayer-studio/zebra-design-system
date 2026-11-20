/* Packs every publishable package (dry-run) and fails if anything from the
 * distribution denylist would ship: manager working data, specs internals,
 * secrets, stories, or editor/Finder droppings. This is the §6 denylist of
 * the distribution plan as an executable gate — run locally or in CI. */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DENY = [
  /(^|\/)\.env/i,
  /(^|\/)_dump(\/|$)/,
  /(^|\/)_docs(\/|$)/,
  /\.spec\.json$/,
  /(^|\/)stories(\/|$)/,
  /\.stories\./,
  /(^|\/)\.claude(\/|$)/,
  /\.DS_Store$/,
];

const PACKAGES = ["tokens", "icons", "patterns", "react-baseui", "web-components", "zeta-web"];
let failed = false;

const check = (name, files) => {
  const hits = files.filter((f) => DENY.some((re) => re.test(f)));
  if (hits.length) {
    failed = true;
    console.error(`✗ ${name} would ship denylisted files:\n  ${hits.join("\n  ")}`);
  } else {
    console.log(`✓ ${name}: ${files.length} files clean`);
  }
};

for (const p of PACKAGES) {
  const dir = join(root, "packages", p);
  // --ignore-scripts keeps prepack logs out of the JSON; require the build
  // to have run first, or the files list would be hollow and pass vacuously.
  if (!existsSync(join(dir, "dist"))) {
    failed = true;
    console.error(`✗ packages/${p}/dist missing — run the build before the tarball gate`);
    continue;
  }
  const out = execSync("npm pack --dry-run --json --ignore-scripts", { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  const files = JSON.parse(out)[0].files.map((f) => f.path);
  check(`@zebra-design-system/${p}`, files);
}

if (failed) process.exit(1);
console.log("All tarballs clean.");
