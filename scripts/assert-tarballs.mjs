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

// Files a package must ship. The patterns package always carries the
// compositions with it: their README, blocks, spacing steps and the graph
// written from them, even while the set of compositions is empty. The same
// files must sit in both plugin copies of the patterns.
const REQUIRE = {
  patterns: ["dist/compositions/README.md", "dist/compositions/organisms.md", "dist/compositions/spacing.md", "dist/graph.json", "dist/manifest.json"],
};
const PLUGIN_PATTERNS = ["distribution/plugin/zebra-patterns/patterns", "distribution/plugin/zebra-design-system/patterns"];
const requireFiles = (name, files, wanted) => {
  const missing = wanted.filter((w) => !files.includes(w));
  if (missing.length) {
    failed = true;
    console.error(`✗ ${name} is missing files it must ship:\n  ${missing.join("\n  ")}`);
  }
};

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
  if (REQUIRE[p]) requireFiles(`@zebra-design-system/${p}`, files, REQUIRE[p]);
}

for (const dir of PLUGIN_PATTERNS) {
  const wanted = REQUIRE.patterns.map((f) => f.replace(/^dist\//, ""));
  const missing = wanted.filter((f) => !existsSync(join(root, dir, f)));
  if (missing.length) {
    failed = true;
    console.error(`✗ ${dir} is missing the compositions it must ship — run pnpm run docs:components:\n  ${missing.join("\n  ")}`);
  } else {
    console.log(`✓ ${dir}: compositions and graph present`);
  }
}

if (failed) process.exit(1);
console.log("All tarballs clean.");
