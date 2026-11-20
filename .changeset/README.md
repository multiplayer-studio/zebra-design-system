# Changesets

Versioning for all six packages: tokens, icons, patterns, react-baseui,
web-components and zeta-web. The three component libraries (react-baseui,
web-components, zeta-web) are a fixed group: they always carry the same
version, so a change to one releases all three.

With any PR that changes a published package, add a changeset:

    pnpm exec changeset

Pick the bump by the versioning policy (VERSIONING.md): a token or API
addition is a minor, a removal or rename is a major, everything exported from
a `/experimental` subpath promises nothing. CI turns accumulated changesets
into a release PR; merging it versions, rewrites `workspace:*` ranges to real
versions, and publishes.
