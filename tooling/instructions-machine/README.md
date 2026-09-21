# Instructions Machine

Given a list of Figma **page** links, auto-discovers every component (and nested
subcomponent) on each page, extracts its variants/properties/layer structure with every
color/spacing/radius/typography value resolved to a real design-token name, pulls in the
human-authored documentation (what it does, anatomy, how-to-use, accessibility notes) if
the page has it, and renders one comprehensive Markdown file per page — a static,
durable doc a future LLM session can read to build or update those components without
needing live Figma access.

Pure Figma REST API + local token lookup, no MCP, no screenshots. One self-contained
package — no cross-package dependencies. The whole pipeline (discovery, extraction,
metadata, rendering) runs from one command: `pnpm run docs:figma`.

## Setup

1. Ensure root `.env` has `FIGMA_PERSONAL_ACCESS_TOKEN=<your-token>` (no `FIGMA_FILE_KEY`
   needed — each page's file key is parsed from its own URL).
2. Run `pnpm run sync:tokens` first (or confirm
   `packages/foundations/tokens/dist/json/resolved-tokens.json` already exists) — that's
   the value → token-name lookup source.
3. Add page links to `pages.json`: `{ "Buttons": "<figma page URL>" }`. Right-click the
   page/frame in Figma → Copy link.

## Usage

```bash
# Generate docs for every page in pages.json
pnpm run docs:figma

# Generate docs for a single page
pnpm --filter @zebra-design-system/instructions-machine run generate -- Buttons

# Self-check
pnpm --filter @zebra-design-system/instructions-machine run selfcheck

# Type check
pnpm --filter @zebra-design-system/instructions-machine run typecheck
```

## Output

One Markdown file per page, committed at `docs/instructions/<page-slug>.md`. Per
component: its metadata (overview, property breakdown, anatomy, how-to-use,
accessibility, etc. — only if a sibling `"<Name> Metadata"` frame exists on the page),
layer structure outline, and a resolved-token table for its default variant. No
separate structurally-extracted properties table — the metadata's own Property
Breakdown already covers name/type/default/description, with actual descriptions
instead of just an enum list.

Debug JSON dumps per component land in `tooling/instructions-machine/output/`
(gitignored, not the durable artifact — the committed `.md` is): the raw extracted
`ComponentSpecDoc` in `output/specs/`, and the raw parsed `ComponentMetadataDoc` (Hero +
sections) in `output/metadata/` — the same JSON shape `figma-metadata-scraper` used to
write on its own before being folded into this tool.

## File layout

- `discover.ts` — page-scoped discovery: every `COMPONENT_SET`/`COMPONENT` on the page,
  plus any sibling `"<Name> Metadata"` frame.
- `extract.ts` — walks a discovered component's variants into a `ComponentSpecDoc`
  (structure, properties, resolved values).
- `metadata.ts` — classifies a `"<Name> Metadata"` frame's content into Hero + sections
  (table/anatomy/how-to-use/bullet-list/unknown) by structure, not by name.
- `token-resolver.ts` — value-based typography (fontSize/lineHeight) matching against
  `resolved-tokens.json` — the one case bound variables can't resolve (see below).
- `variables.ts` — fetches a file's Figma Variables once and maps id → token name.
- `variant-parser.ts` / `url.ts` — small pure-function helpers.
- `render-markdown.ts` — turns a page's `ComponentSpecDoc[]` + metadata into the final
  Markdown.
- `generate-page-docs.ts` — CLI entrypoint wiring all of the above together.

## Metadata integration

Design system pages in this file follow a convention: each component's actual set
(e.g. `Button`) has a sibling frame named `"<Name> Metadata"` (e.g. `"Button Metadata"`)
containing hero/anatomy/how-to-use/accessibility content authored by hand. Discovery
picks up both the component and its metadata frame in the same page fetch — no separate
node-id list for metadata. A component with no matching metadata frame on the page just
renders without that section.

## Token resolution

Colors, spacing, radius, and stroke weight are resolved from each node's actual Figma
`boundVariables` — the real applied Variable, fetched once per file via
`GET /v1/files/{fileKey}/variables/local` — not a guess from the raw hex/px value. This
matters: many raw values are shared by several differently-named tokens (e.g. `#1f69ff`
is both `interactive.primary.background.default` and `foreground.link`), so a
value-based reverse lookup would routinely pick a plausible-looking but wrong token. A
property with no bound variable is reported as `token: null` — an honest "not tokenized
in Figma", never a guess.

Typography (fontSize/lineHeight/letterSpacing) is the one exception: those variables are
bound to an external type-scale library that this file's own `/variables/local` response
can't resolve, so they're matched by value instead — as a (fontSize, lineHeight) *pair*
(matching either field alone is far more ambiguous; several styles share the same
font-size or line-height).

## Notes / known limitations

- Discovery can't distinguish a page's actual subject components from an unrelated
  component instance nested purely for illustration inside a doc frame. Not filtered in
  v1 — add a name/section-prefix filter if this shows up in practice.
- Metadata frame matching is an exact `"<Name> Metadata"` suffix match — a page that
  doesn't follow this naming convention just won't get a metadata section.
- Corner radius only reads the top-left corner when radii are bound per-corner
  (`rectangleCornerRadii`) — fine for uniform radii, wrong if a component intentionally
  uses different radii per corner.
- Typography matching only reads `typography.mobile` — other breakpoints aren't
  matched (the data exists in `resolved-tokens.json`; wiring another mode in is
  straightforward if needed).
- Gradient fills aren't resolved (`raw: null, token: null`) — only `SOLID` paints are.
- No exhaustive per-variant listing, and no separate structurally-extracted properties
  table, in the output (both dropped — high token cost for no new information once the
  metadata's own Property Breakdown and hero content are rendered).
- A component with no metadata frame gets no properties listing at all (only layer
  structure + resolved tokens) — `componentProperties` is still captured in the debug
  JSON if needed.
