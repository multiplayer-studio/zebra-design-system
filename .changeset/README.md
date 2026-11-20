# Changesets

Versioning for the five pnpm-workspace packages: tokens, icons,
patterns, react-baseui and web-components. zeta-web is not covered here — it sits
outside the pnpm workspace (Yarn Berry) and versions through its existing
Conventional-Commits flow, driven by the same CI release workflow.

With any PR that changes a published package, add a changeset:

    pnpm exec changeset

Pick the bump by the versioning policy (VERSIONING.md, step 1.1):
a token or API addition is a minor, a removal or rename is a major,
everything exported from a `/experimental` subpath promises nothing.
CI turns accumulated changesets into a release PR; merging it versions,
rewrites `workspace:*` ranges to real versions, and publishes.
