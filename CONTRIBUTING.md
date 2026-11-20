# Contributing to Zebra Design System

## Setting up

Every package is in one pnpm workspace. Install once, at the repo root:

```bash
corepack enable   # once, provides pnpm
pnpm install
```

`pnpm run build` builds all six packages, and `pnpm run check` runs all their checks.

## Adding a package

1. Create `packages/<name>/` with a `package.json` named `@zebra-design-system/<name>`.
2. Give it `build`, `check` and `prepack` scripts, and a `files` list. Its build writes to `dist/`.
3. Run `pnpm install`.
4. Add it to the package lists in `scripts/deploy-dist-branches.mjs`, `scripts/assert-tarballs.mjs` and `docs/components/generate.mjs`.

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>): <description>`.

Commit messages describe a change. They no longer decide a version. Versions come from changesets (see below).

| Type | Use for |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `perf` | A performance improvement |
| `docs` | Documentation only |
| `chore` | Housekeeping: dependencies, CI, releases |
| `test` | Tests only |
| `refactor` | A change that neither fixes a bug nor adds a feature |
| `style` | Formatting |

| Scope | Package or area |
|---|---|
| `(tokens)` | `@zebra-design-system/tokens` |
| `(icons)` | `@zebra-design-system/icons` |
| `(patterns)` | `@zebra-design-system/patterns` and `patterns/` |
| `(react-baseui)` | `@zebra-design-system/react-baseui` |
| `(web-components)` | `@zebra-design-system/web-components` |
| `(zeta-web)` | `@zebra-design-system/zeta-web` |
| `(button)`, `(card)` and so on | One component, across the libraries |
| `(skills)`, `(guide)`, `(ci)`, `(repo)` | Skills, the playbook, workflows, repo setup |

A commit that touches several packages lists them: `fix(tokens,zeta-web): …`.

## Versions and releases

All six packages version and release the same way. [VERSIONING.md](VERSIONING.md) has the rules for what is a patch, a minor and a major.

1. With any change to a published package, add a changeset: `pnpm exec changeset`.
2. CI collects changesets into a "Version Packages" pull request. Merging it sets the versions and changelogs.
3. Until the packages are on npm, they are deployed to the repo's distribution branches: `node scripts/deploy-dist-branches.mjs --push`. [DISTRIBUTION.md](DISTRIBUTION.md) describes the channel.

The three component libraries (react-baseui, web-components and zeta-web) always share one version. A changeset for one releases all three.
