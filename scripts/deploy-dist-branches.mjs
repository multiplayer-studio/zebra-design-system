/* Git distribution (DISTRIBUTION.md §Git channel): deploys each package's
 * PACKED root — dist included, denylist-checked — to an orphan branch
 * `dist/<pkg>` in this repo, plus an immutable tag `<pkg>-v<version>` per
 * deploy, so consumers install without any npm registry:
 *
 *   npm i "git+https://github.com/zebratechnologies/zebra-design-system.git#dist/tokens"        # latest
 *   npm i "git+https://github.com/zebratechnologies/zebra-design-system.git#tokens-v0.1.0"      # pinned
 *
 * The branch copy differs from the npm tarball in exactly two sanitizations
 * (both required for git installs, both documented in DISTRIBUTION.md):
 *   1. lifecycle scripts are stripped — npm re-packs a git dep and would run
 *      prepack, which only builds inside this workspace;
 *   2. internal @zebra-design-system dependencies are rewritten from
 *      workspace/semver to this repo's version tags, so they resolve with no
 *      registry at all.
 *
 * Usage: node scripts/deploy-dist-branches.mjs [pkg ...] [--push] [--force] [--repo <git url>]
 *   pkg      any of: tokens icons react-baseui web-components zeta-web (default: all)
 *   --push   also push the branches and tags to origin
 *   --force  allow moving an existing version tag (otherwise an unchanged
 *            tag is skipped and a changed one is an error — bump instead)
 *   --repo   git URL baked into internal dependency rewrites
 *            (default: `git remote get-url origin`)
 *
 * Branches are single-commit and force-updated; every version stays
 * reachable through its tag, so consumer lockfile SHAs never dangle.
 * Requires dist/ to be built first (`pnpm run build` / `pnpm run zeta:build`).
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ALL = ["tokens", "icons", "react-baseui", "web-components", "zeta-web"];
const DENY = [
  /(^|\/)\.env/i, /(^|\/)_dump(\/|$)/, /(^|\/)_docs(\/|$)/, /\.spec\.json$/,
  /(^|\/)stories(\/|$)/, /\.stories\./, /(^|\/)\.claude(\/|$)/, /\.DS_Store$/,
];

const args = process.argv.slice(2);
const push = args.includes("--push");
const force = args.includes("--force");
const repoFlag = args.indexOf("--repo");
const pkgs = args.filter((a, i) => !a.startsWith("--") && i !== repoFlag + 1);
const targets = pkgs.length ? pkgs : ALL;
for (const t of targets) if (!ALL.includes(t)) { console.error(`unknown package: ${t}`); process.exit(1); }

const git = (cwd, ...a) => execFileSync("git", a, { cwd, encoding: "utf8" }).trim();
const repoUrl = repoFlag >= 0 ? args[repoFlag + 1] : git(ROOT, "remote", "get-url", "origin");
const mainSha = git(ROOT, "rev-parse", "--short", "HEAD");

// name -> {dir, version} for internal dependency rewrites
const manifests = {};
for (const p of ALL) {
  const m = JSON.parse(readFileSync(join(ROOT, "packages", p, "package.json"), "utf8"));
  manifests[m.name] = { dir: p, version: m.version };
}

const summary = [];
for (const p of targets) {
  const dir = join(ROOT, "packages", p);
  const meta = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  const tag = `${p}-v${meta.version}`;
  const branch = `dist/${p}`;

  if (!existsSync(join(dir, "dist"))) {
    console.error(`✗ ${p}: no dist/ — build first (pnpm run build / pnpm run zeta:build)`);
    process.exitCode = 1;
    continue;
  }

  // Pack with scripts off (dist is prebuilt) to get the exact publish file set.
  const tmp = mkdtempSync(join(tmpdir(), `zds-dist-${p}-`));
  try {
    const packOut = execFileSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", tmp],
      { cwd: dir, encoding: "utf8" });
    const tarball = join(tmp, JSON.parse(packOut)[0].filename.replace(/\//g, "-"));
    const stage = join(tmp, "stage");
    execFileSync("tar", ["xzf", tarball, "-C", tmp]);
    cpSync(join(tmp, "package"), stage, { recursive: true });

    // Denylist, same rules as scripts/assert-tarballs.mjs.
    const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(d, e.name)) : [relative(stage, join(d, e.name))]);
    const files = walk(stage);
    const hits = files.filter((f) => DENY.some((re) => re.test(f)));
    if (hits.length) throw new Error(`denylisted files would ship:\n  ${hits.join("\n  ")}`);

    // Sanitize the manifest for git installs.
    const pkg = JSON.parse(readFileSync(join(stage, "package.json"), "utf8"));
    for (const s of ["prepack", "prepare", "prepublishOnly", "preinstall", "install", "postinstall"]) {
      if (pkg.scripts) delete pkg.scripts[s];
    }
    if (pkg.scripts && !Object.keys(pkg.scripts).length) delete pkg.scripts;
    delete pkg.devDependencies;
    delete pkg.packageManager;
    delete pkg.pnpm;
    for (const field of ["dependencies", "optionalDependencies"]) {
      for (const [name] of Object.entries(pkg[field] ?? {})) {
        if (manifests[name] && name !== pkg.name) {
          pkg[field][name] = `git+${repoUrl}#${manifests[name].dir}-v${manifests[name].version}`;
        }
      }
    }
    pkg.distChannel = { type: "git", repo: repoUrl, tag, builtFrom: mainSha };
    writeFileSync(join(stage, "package.json"), JSON.stringify(pkg, null, 2) + "\n");

    // Commit the stage as an orphan commit and land it in this repo.
    const env = {
      ...process.env,
      GIT_AUTHOR_NAME: "zds-dist", GIT_AUTHOR_EMAIL: "zds-dist@local",
      GIT_COMMITTER_NAME: "zds-dist", GIT_COMMITTER_EMAIL: "zds-dist@local",
    };
    const g = (...a) => execFileSync("git", a, { cwd: stage, encoding: "utf8", env }).trim();
    g("init", "-q");
    g("add", "-A");
    g("commit", "-q", "-m", `${pkg.name}@${meta.version} (built from ${mainSha})`);
    const newTree = g("rev-parse", "HEAD^{tree}");

    // An existing version tag is immutable: identical tree = skip, different = error.
    let tagExists = false;
    try { git(ROOT, "rev-parse", "--verify", "-q", `refs/tags/${tag}`); tagExists = true; } catch {}
    if (tagExists && !force) {
      const oldTree = git(ROOT, "rev-parse", `${tag}^{tree}`);
      if (oldTree === newTree) {
        console.log(`• ${p}: ${tag} already deployed with identical content — skipped`);
        summary.push({ p, tag, status: "unchanged" });
        continue;
      }
      throw new Error(`${tag} exists with different content — bump the version, or --force to move it`);
    }

    g("push", "-q", ROOT, `+HEAD:refs/heads/${branch}`);
    g("push", "-q", ROOT, `${force ? "+" : ""}HEAD:refs/tags/${tag}`);
    const size = files.reduce((n, f) => n + statSync(join(stage, f)).size, 0);
    console.log(`✓ ${p}: ${branch} + ${tag} (${files.length} files, ${(size / 1024).toFixed(0)} KB)`);
    summary.push({ p, tag, status: "deployed" });
  } catch (e) {
    console.error(`✗ ${p}: ${e.message}`);
    process.exitCode = 1;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

if (push && !process.exitCode) {
  const refs = summary.flatMap(({ p, tag }) => [`+refs/heads/dist/${p}:refs/heads/dist/${p}`, `refs/tags/${tag}:refs/tags/${tag}`]);
  if (refs.length) {
    execFileSync("git", ["push", "origin", ...(force ? ["--force"] : []), ...refs], { cwd: ROOT, stdio: "inherit" });
    console.log("pushed to origin");
  }
}

if (summary.length) {
  console.log("\nInstall lines:");
  for (const { p, tag } of summary) {
    console.log(`  npm i "git+${repoUrl}#dist/${p}"   # latest, or #${tag} to pin`);
  }
}
