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

// The plugin carries its own copy of the theming tool, so a designer with
// the plugin and no packages can still theme a project. Check it is there
// and that it runs.
{
  const tool = join(root, "distribution/plugin/zebra-design-system/tools/zebra-theme");
  const wanted = ["bin/zebra-theme.mjs", "dist/manifest.json", "dist/tools/build-tokens-css.mjs", "dist/base", "dist/extensions"];
  const missing = wanted.filter((f) => !existsSync(join(tool, f)));
  if (missing.length) {
    failed = true;
    console.error(`✗ the plugin's theming tool is missing — run the build, then pnpm run docs:components:\n  ${missing.join("\n  ")}`);
  } else {
    try {
      execSync(`"${process.execPath}" bin/zebra-theme.mjs --list=brand`, { cwd: tool, stdio: ["ignore", "pipe", "pipe"] });
      console.log("✓ plugin theming tool: present and runs");
      // The plugin is installed from git, so every file of the tool must be
      // tracked. A folder caught by .gitignore runs here and is missing there.
      const rel = "distribution/plugin/zebra-design-system/tools/zebra-theme";
      const ignored = execSync(`git ls-files --others --ignored --exclude-standard -- "${rel}"`, { cwd: root, encoding: "utf8" }).trim();
      if (ignored) {
        failed = true;
        console.error(`✗ the plugin's theming tool has files git ignores, so they would not ship:\n  ${ignored.split("\n").slice(0, 5).join("\n  ")}`);
      } else {
        console.log("✓ plugin theming tool: every file is tracked by git");
      }
    } catch (e) {
      failed = true;
      console.error(`✗ the plugin's theming tool does not run:\n  ${String(e.stderr || e.message).trim().split("\n")[0]}`);
    }
  }
}

// Shipped skills are named for who they are for: designer-, builder- or
// shared-. No skill folder may use another prefix, and no shipped skill or
// AGENTS.md may still point at a name retired in 0.8.0. (`zebra-theme` is left
// out of the text check: it is still the name of the theming tool.)
{
  const { readdirSync, readFileSync, statSync } = await import("node:fs");
  const RETIRED = /zebra-(prototype|onboard-project|handoff|figma-to-code|build-ui|ux-patterns|ux-audit)\b/;
  const homes = [
    ...["patterns", "react-baseui", "web-components", "zeta-web"].map((p) => join(root, "packages", p)),
    join(root, "distribution", "plugin", "zebra-design-system"),
    join(root, "distribution", "plugin", "zebra-patterns"),
  ];
  const bad = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(md|mjs|js|json)$/.test(e.name) && statSync(p).size < 400_000 && RETIRED.test(readFileSync(p, "utf8"))) bad.push(`${p.slice(root.length + 1)} names a retired skill`);
    }
  };
  for (const home of homes) {
    const skillsDir = join(home, "skills");
    if (!existsSync(skillsDir)) continue;
    for (const e of readdirSync(skillsDir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      if (!/^(designer|builder|shared)-/.test(e.name)) bad.push(`${skillsDir.slice(root.length + 1)}/${e.name} is not named designer-, builder- or shared-`);
      const name = readFileSync(join(skillsDir, e.name, "SKILL.md"), "utf8").match(/^name:\s*(.+)$/m)?.[1]?.trim();
      if (name !== e.name) bad.push(`${skillsDir.slice(root.length + 1)}/${e.name} has name "${name}" in its SKILL.md`);
    }
    walk(skillsDir);
    for (const f of ["AGENTS.md", "commands"]) {
      const p = join(home, f);
      if (!existsSync(p)) continue;
      if (statSync(p).isDirectory()) walk(p);
      else if (RETIRED.test(readFileSync(p, "utf8"))) bad.push(`${p.slice(root.length + 1)} names a retired skill`);
    }
  }
  if (bad.length) {
    failed = true;
    console.error(`✗ skill names:\n  ${bad.join("\n  ")}`);
  } else {
    console.log("✓ skill names: every shipped skill is designer-, builder- or shared-, and no retired name is left");
  }
}

if (failed) process.exit(1);
console.log("All tarballs clean.");
