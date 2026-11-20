# Versioning

Six packages leave this repo. All six version through Changesets
(`pnpm exec changeset` with your PR) and follow SemVer with these rules.

## What counts as what

| Change | Bump |
|---|---|
| New token, new component, new prop, new export | **minor** |
| Token removed or renamed | **major** |
| Component prop or export removed, renamed, or changed in behaviour a consumer can observe | **major** |
| A token's *value* changes (same name, new colour/size) | **patch** — themes are allowed to move |
| Bug fix, visual correction within the spec | **patch** |
| Shipped context changes (AGENTS.md, DESIGN.md, llms.txt, component docs) | **patch** — agents read these from the installed version, so they only update through a release |
| Anything under an `/experimental` subpath | exempt — may change or vanish in a **minor**; it graduates by landing a spec and moving to the main entry |
| Icon glyph added | **minor** |
| Icon glyph removed or renamed | **major** |
| Pattern wording made clearer, a device added | **patch** |
| Pattern rule or pattern file added | **minor** |
| Pattern rule or file removed, renamed or reversed | **major** |

The token rules are the ones that bite: a palette can re-tune in a patch,
but `surface/menu` disappearing (as it did in export v3) is a major. The
tokens package sits at the base of the graph, so its major is everyone's
major — plan removals in batches.

## Mechanics

- **All six packages:** every PR that changes a published package adds
  a changeset. CI accumulates them into a "Version Packages" PR; merging it
  versions, rewrites `workspace:*` to real ranges, builds, re-runs the
  tarball denylist and publishes.
- **The three component libraries share one version.** react-baseui,
  web-components and zeta-web are a fixed group in `.changeset/config.json`:
  a changeset for one bumps all three to the same number.
- **zeta-web (`@zebra-design-system/zeta-web`)** joined this process at
  0.5.1. It was `@zebra-fed/zeta-web` on its own 1.x line before; the
  `zeta-web-v1.x` tags stay installable under the old name.
- **First release:** the 0.1.0 manifests publish as-is — `changeset publish`
  releases any version the registry lacks, so no baseline changeset is
  needed.
- **0.x caveat:** until 1.0, minors may carry breaking changes per SemVer
  convention; we still *write* the changesets as if the table above were
  enforced, so the changelog reads honestly and 1.0 is a rename, not a
  reform.

## While the packages are not yet on npmjs

All six install from the repo's git distribution branches
(`DISTRIBUTION.md` §Git distribution): `dist/<pkg>` tracks the latest
version, and the immutable `<pkg>-v<version>` tags follow the same
versioning rules as npm releases will.
