# Versioning

Five packages leave this repo. Four version through Changesets
(`pnpm exec changeset` with your PR); zeta-web keeps its
Conventional-Commits flow. All five follow SemVer with these rules.

## What counts as what

| Change | Bump |
|---|---|
| New token, new component, new prop, new export | **minor** |
| Token removed or renamed | **major** |
| Component prop or export removed, renamed, or changed in behaviour a consumer can observe | **major** |
| A token's *value* changes (same name, new colour/size) | **patch** — themes are allowed to move |
| Bug fix, visual correction within the spec | **patch** |
| Anything under an `/experimental` subpath | exempt — may change or vanish in a **minor**; it graduates by landing a spec and moving to the main entry |
| Icon glyph added | **minor**; glyph removed or renamed | **major** |

The token rules are the ones that bite: a palette can re-tune in a patch,
but `surface/menu` disappearing (as it did in export v3) is a major. The
tokens package sits at the base of the graph, so its major is everyone's
major — plan removals in batches.

## Mechanics

- **The four pnpm packages:** every PR that changes a published package adds
  a changeset. CI accumulates them into a "Version Packages" PR; merging it
  versions, rewrites `workspace:*` to real ranges, builds, re-runs the
  tarball denylist and publishes.
- **zeta-web (`@zebra-fed/zeta-web`):** stays on its 1.x line. `feat` =
  minor, `fix`/`perf` = patch, `BREAKING CHANGE:` = major (CONTRIBUTING.md
  table). Publishes through the manual lane in the Release workflow.
- **First release:** the 0.1.0 manifests publish as-is — `changeset publish`
  releases any version the registry lacks, so no baseline changeset is
  needed.
- **0.x caveat:** until 1.0, minors may carry breaking changes per SemVer
  convention; we still *write* the changesets as if the table above were
  enforced, so the changelog reads honestly and 1.0 is a rename, not a
  reform.

## While the packages are not yet on npmjs

A local Verdaccio registry vends all five for consumer testing
(`~/zds-local-packages/README.md`). Versions published there follow the
same rules; prerelease suffixes (`0.1.1-local.0`) mark local-only iterations.
