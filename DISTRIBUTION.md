# Distribution state and migration

The running record of how the system is distributed **today** (the git
channel) and exactly what flips when it moves to the real registry. The full
plan with phases lives in the Zebra Distribution Plan artifact; versioning
rules in `VERSIONING.md`; release mechanics in `.github/workflows/release.yml`.

## Where distribution stands today (pre-npmjs)

| Channel | Today | Lives at |
|---|---|---|
| **Git distribution ×6 (live, registry-free)** | Orphan branches `dist/<pkg>` + immutable tags `<pkg>-v<version>` on this repo; `npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/tokens"` | deployed by `scripts/deploy-dist-branches.mjs` (§Git distribution below) |
| npm packages ×6 | Not on npmjs yet — the git channel above is the only package source. (The local Verdaccio test registry was torn down 10 Nov 2026.) | — |
| Consumer projects | Install from the git branches; no `.npmrc` needed | each test project |
| Claude Code plugin | Installable from this repo as a marketplace, from `main` | `claude plugin marketplace add "https://github.com/multiplayer-studio/zebra-design-system.git#main"` (or a local path to a main checkout), then `claude plugin install zebra-design-system@zebra-design-system` |
| UX pattern plugin | Installable from the same marketplace, with no Zebra package needed | `claude plugin install zebra-patterns@zebra-design-system` |
| In-package skills | Already real — ship in the library tarballs | `npx zebra-skills` in the consumer project (`npx zebra-patterns-skills` where only the patterns package is installed) |
| CDN | Not live (needs real npm) | `docs/cdn-smoke.html` is armed with pinned jsDelivr URLs |
| Consumer onboarding | Zebra Quickstart artifact (private; share from its Share menu) | source `docs/start/index.html`, published at <https://claude.ai/artifact/ByQaUbTKkN1EXDyp5bEvg7> |

The local Verdaccio registry that previously vended the packages was torn
down on 10 Nov 2026 (`~/zds-local-packages` deleted, process stopped; the
global `~/.npmrc` was never touched). Registry-behaviour tests (semver
ranges, `npm outdated`) now wait for real npmjs.

## Git distribution (live, no registry account needed)

Each package's **packed root** — dist built, `files`-filtered, denylist-checked
— lives on its own orphan branch, with an immutable tag per version:

| Package | Latest branch | Pinned tag (current) |
|---|---|---|
| `@zebra-design-system/tokens` | `dist/tokens` | `tokens-v0.3.0` |
| `@zebra-design-system/icons` | `dist/icons` | `icons-v0.2.1` |
| `@zebra-design-system/patterns` | `dist/patterns` | `patterns-v0.2.0` |
| `@zebra-design-system/react-baseui` | `dist/react-baseui` | `react-baseui-v0.7.1` |
| `@zebra-design-system/web-components` | `dist/web-components` | `web-components-v0.7.1` |
| `@zebra-design-system/zeta-web` | `dist/zeta-web` | `zeta-web-v0.7.1` |

Consumers install with plain npm/pnpm/yarn and git access to the repo:

```bash
npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/react-baseui"      # track latest
npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#react-baseui-v0.5.0"    # pin a version
```

Internal dependencies resolve themselves: the branch manifests point
`@zebra-design-system/*` deps at this repo's version tags, so installing
react-baseui pulls icons from `#icons-v0.2.1` with no registry anywhere.
Updates: branches are force-updated to the newest version (re-run `npm update`
/ reinstall to move); tags never move, and every branch commit is tagged, so
old lockfile SHAs stay fetchable forever.

**Deploying** (after `pnpm run build`):

```bash
node scripts/deploy-dist-branches.mjs              # all six, local branches/tags only
node scripts/deploy-dist-branches.mjs tokens icons # a subset
node scripts/deploy-dist-branches.mjs --push       # …and push to origin
```

CI: the Release workflow's manual `git-dist` lane builds everything and runs
the script with `--push`. The script refuses to redeploy an existing version
tag with different content — bump the version instead (`--force` exists for
genuine repairs and moves the tag).

**One documented exception to the identical-tarballs invariant:** the branch
copy differs from the npm tarball in exactly two sanitizations the script
applies — lifecycle scripts are stripped (npm re-packs git deps and would run
`prepack`, which only builds inside this workspace) and internal deps are
rewritten from semver to git tags. Everything else is byte-identical, and the
same denylist gates both.

**Not covered by this channel:** semver ranges (`^0.1.0` can't target one
package's tags in a shared repo — pin tags or track the branch) and the CDN
designer channel (jsDelivr's npm endpoint still needs npmjs).

## Project themes

`@zebra-design-system/tokens` ships the token builder (`dist/tools/`) and a
`zebra-theme` command that runs it against the installed tokens:

```bash
npx zebra-theme --init route-planner        # writes route-planner.theme.json
npx zebra-theme --list=brand                # the tokens a theme can change
npx zebra-theme route-planner.theme.json    # writes route-planner.theme.css
```

The theme file holds only what the project changes. The builder treats it as
one more extension, so the CSS re-declares every dependent token for every mode
and every way `.ext-<name>` and a mode can meet: on the page root, on a
container, above or below a mode. It refuses a path that is not a token, a raw
value on a role, and size or type scales, and it reports text contrast the
theme loses (`--strict` makes that an error). `packages/tokens/test/` checks
the command on every `pnpm run check`.

## The UX patterns (one source, four wrappers)

The patterns are authored once in `patterns/` and leave the repo four ways.
`packages/patterns/build.mjs` copies the folder and generates `manifest.json`
and, from `patterns/compositions/`, `graph.json`,
from the files it finds (never hand-written, never in `patterns/`);
`docs/components/generate.mjs` makes the other copies.

| Consumer | Gets the pack from | Updates by |
|---|---|---|
| Project with a Zebra library | `node_modules/@zebra-design-system/patterns`, a dependency of `react-baseui` and `web-components` | updating packages |
| Project on another component system | the `zebra-patterns` plugin, or the package installed alone from `#dist/patterns` | `claude plugin update`, or reinstalling |
| Another tool or agent | the `dist/patterns` branch or a `patterns-v<version>` tag: plain Markdown and a generated `manifest.json` under `dist/` | pulling the branch or a new tag |
| `zebra-design-system` plugin users | the plugin's bundled `patterns/` copy, used when the package is not installed | `claude plugin update` |

Guard rails (`packages/patterns/guard.mjs`) run every time the patterns are
packaged: by `pnpm run build`, by `pnpm run check`, by the generator, by
`prepack`, and again by `scripts/deploy-dist-branches.mjs`, which repackages
the patterns from source before deploying them. A failure stops that step and
names the file and line. They keep token and component names out of the rule
files, keep each file's shape, catch a rule number used twice or pointed at
but missing, catch broken links and unlisted files, check
that `zebra.md` only names tokens and theme classes that exist, and catch
leftovers such as TODO text. The token and component lists are read from
`tokens/` and `specs/` each run. A changed pack under an existing version
tag is refused by the deploy script, as for every package.

Skills read the generated `manifest.json` for the file list, so a new,
removed or renamed file reaches every consumer without a skill change. The `zebra-patterns` plugin's version
is set to the patterns package version by the generator.

On the git channel, a library pins the patterns package to a version tag, so
a new pack reaches library users with the next library release, or sooner by
installing `#dist/patterns` directly. On npm the dependency is a semver
range and `npm update` is enough.

## Migration to the real registry (gated on step 0.2)

Account work, once, by a manager:

1. Create the `@zebra-design-system` org on npmjs.com; confirm publish rights
   (zeta-web moved into this scope at 0.5.1; `@zebra-fed/zeta-web` on npm
   stays at its last 1.x release and is no longer published from here).
2. `npm login` locally (optional, for manual publishes) and add `NPM_TOKEN`
   to the repo's GitHub Actions secrets — or configure npm trusted publishing
   if the repo goes public, and drop the token.

Then the flip, in order:

3. ~~Merge `design/init` → `main`~~ — done 18 Nov 2026; all work and releases
   now go from `main`. With `NPM_TOKEN` set, the Release workflow's
   Changesets job publishes every version the registry lacks (the 0.1.0s),
   zeta-web included.
4. Open `docs/cdn-smoke.html` in a browser — it must say "CDN smoke PASS"
   and theme the dark row. That is the go/no-go for the designer channel.
5. Consumer projects on the git channel: swap each
   `git+…#dist/<pkg>` / `#<pkg>-v<version>` dependency for the npm semver
   range and reinstall. Versions are identical; nothing else changes.
6. Plugin consumers: `claude plugin marketplace remove zebra-design-system`
   (if added by local path or with a branch ref), then re-add by
   plain repo reference —
   `claude plugin marketplace add multiplayer-studio/zebra-design-system` —
   so `claude plugin update` tracks the repo. (Terminal CLI users can use the
   `/plugin` commands; the IDE extension uses the `claude plugin` CLI.)
7. ~~Tear down the local Verdaccio channel~~ — already done (10 Nov 2026).

## Invariants that hold in both worlds

- Tarball contents are identical local vs. real — `scripts/assert-tarballs.mjs`
  gates both, and `prepack` builds the same artefacts either way.
- All shipped context (AGENTS.md, DESIGN.md, llms.txt, component docs, skills,
  the plugin) is generated from single sources and CI-diffed; consumers only
  receive updates through a release (a shipped-context change is a patch).
- Nothing under `_dump`, `_docs`, `*.spec.json`, `.claude/`, or `.env` can
  ship — the denylist is executable, not a convention.
