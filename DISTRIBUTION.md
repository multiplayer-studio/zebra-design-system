# Distribution state and migration

The running record of how the system is distributed **today** (local test
channels) and exactly what flips when it moves to the real registry. The full
plan with phases lives in the Zebra Distribution Plan artifact; versioning
rules in `VERSIONING.md`; release mechanics in `.github/workflows/release.yml`.

## Where distribution stands today (local test channels)

| Channel | Today | Lives at |
|---|---|---|
| **Git distribution ×5 (live, registry-free)** | Orphan branches `dist/<pkg>` + immutable tags `<pkg>-v<version>` on this repo; `npm i "git+https://github.com/zebratechnologies/zebra-design-system.git#dist/tokens"` | deployed by `scripts/deploy-dist-branches.mjs` (§Git distribution below) |
| npm packages ×5 | Local Verdaccio registry on `http://localhost:4873` | storage + config + teardown notes: `~/zds-local-packages/README.md` |
| Consumer projects | Install from the git branches (no `.npmrc` needed), or two `.npmrc` scope lines point `@zebra-design-system` and `@zebra-fed` at localhost | each test project |
| Claude Code plugin | Installable from this repo as a marketplace — **pin the working branch**, since `main` doesn't carry the plugin until the merge | `claude plugin marketplace add "https://github.com/zebratechnologies/zebra-design-system.git#design/init"` (or a local path to a design/init checkout), then `claude plugin install zebra-design-system@zebra-design-system` |
| In-package skills | Already real — ship in the library tarballs | `npx zebra-skills` in the consumer project |
| CDN | Not live (needs real npm) | `docs/cdn-smoke.html` is armed with pinned jsDelivr URLs |

Local registry rules: Verdaccio refuses republishing a version — bump a
`-local.N` prerelease, or delete the package's folder from
`~/zds-local-packages/registry/storage/` and publish again. Restart after a
reboot: `npx verdaccio@6 --config ~/zds-local-packages/registry/config.yaml --listen 4873`.

## Git distribution (live, no registry account needed)

Each package's **packed root** — dist built, `files`-filtered, denylist-checked
— lives on its own orphan branch, with an immutable tag per version:

| Package | Latest branch | Pinned tag (current) |
|---|---|---|
| `@zebra-design-system/tokens` | `dist/tokens` | `tokens-v0.1.0` |
| `@zebra-design-system/icons` | `dist/icons` | `icons-v0.1.0` |
| `@zebra-design-system/react-baseui` | `dist/react-baseui` | `react-baseui-v0.1.0` |
| `@zebra-design-system/web-components` | `dist/web-components` | `web-components-v0.1.0` |
| `@zebra-fed/zeta-web` | `dist/zeta-web` | `zeta-web-v1.3.6` |

Consumers install with plain npm/pnpm/yarn and git access to the repo:

```bash
npm i "git+https://github.com/zebratechnologies/zebra-design-system.git#dist/react-baseui"      # track latest
npm i "git+https://github.com/zebratechnologies/zebra-design-system.git#react-baseui-v0.1.0"    # pin a version
```

Internal dependencies resolve themselves: the branch manifests point
`@zebra-design-system/*` deps at this repo's version tags, so installing
react-baseui pulls icons from `#icons-v0.1.0` with no registry anywhere.
Updates: branches are force-updated to the newest version (re-run `npm update`
/ reinstall to move); tags never move, and every branch commit is tagged, so
old lockfile SHAs stay fetchable forever.

**Deploying** (after `pnpm run build` and, for zeta, `pnpm run zeta:build`):

```bash
node scripts/deploy-dist-branches.mjs              # all five, local branches/tags only
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

## Migration to the real registry (gated on step 0.2)

Account work, once, by a manager:

1. Create the `@zebra-design-system` org on npmjs.com; confirm publish rights
   on `@zebra-fed` (zeta-web already lives there).
2. `npm login` locally (optional, for manual publishes) and add `NPM_TOKEN`
   to the repo's GitHub Actions secrets — or configure npm trusted publishing
   if the repo goes public, and drop the token.

Then the flip, in order:

3. Merge `design/init` → `main`. CI gates arm; the Release workflow's
   Changesets job publishes every version the registry lacks (the 0.1.0s),
   and the manual lane dispatches zeta-web.
4. Open `docs/cdn-smoke.html` in a browser — it must say "CDN smoke PASS"
   and theme the dark row. That is the go/no-go for the designer channel.
5. Consumer projects: delete the two `.npmrc` lines (and the lockfile, which
   pins localhost tarball URLs), reinstall. Versions are identical; nothing
   else changes.
6. Plugin consumers: `claude plugin marketplace remove zebra-design-system`
   (if added by local path or with the `#design/init` ref), then re-add by
   plain repo reference —
   `claude plugin marketplace add zebratechnologies/zebra-design-system` —
   so `claude plugin update` tracks the repo. (Terminal CLI users can use the
   `/plugin` commands; the IDE extension uses the `claude plugin` CLI.)
7. Tear down the local channel: `pkill -f verdaccio && rm -rf ~/zds-local-packages`.
   That is its entire footprint; the global `~/.npmrc` was never touched.

## Invariants that hold in both worlds

- Tarball contents are identical local vs. real — `scripts/assert-tarballs.mjs`
  gates both, and `prepack` builds the same artefacts either way.
- All shipped context (AGENTS.md, DESIGN.md, llms.txt, component docs, skills,
  the plugin) is generated from single sources and CI-diffed; consumers only
  receive updates through a release (a shipped-context change is a patch).
- Nothing under `_dump`, `_docs`, `*.spec.json`, `.claude/`, or `.env` can
  ship — the denylist is executable, not a convention.
