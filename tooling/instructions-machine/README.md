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

1. Ensure root `.env` has `FIGMA_PERSONAL_ACCESS_TOKEN=<your-token>` and
   `FIGMA_FILE_KEY=<the design file's key>`.
2. Run `pnpm run sync:tokens` first (or confirm
   `packages/foundations/tokens/dist/json/resolved-tokens.json` already exists) — that's
   the value → token-name lookup source.

Nothing else to configure — the page list is auto-discovered (see below), not hand-maintained.

## Usage

```bash
# Generate docs for every Figma page that matches a zeta-web component folder
pnpm run docs:figma

# Generate docs for a single page
pnpm --filter @zebra-design-system/instructions-machine run generate -- Buttons

# Self-check
pnpm --filter @zebra-design-system/instructions-machine run selfcheck

# Type check
pnpm --filter @zebra-design-system/instructions-machine run typecheck
```

## Output

One Markdown file per page, committed at `docs/figma-generated-instructions/<page-slug>.md`. Per
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

- `pages.ts` — auto-discovers which Figma pages to process (see below).
- `discover.ts` — page-scoped discovery: every `COMPONENT_SET`/`COMPONENT` on the page,
  plus any sibling `"<Name> Metadata"` frame.
- `extract.ts` — walks a discovered component's variants into a `ComponentSpecDoc`
  (structure, properties, resolved values).
- `metadata.ts` — classifies a `"<Name> Metadata"` frame's content into Hero + sections
  (table/anatomy/how-to-use/bullet-list/unknown) by structure, not by name.
- `variables.ts` — fetches a file's Figma Variables once and maps id → token name.
- `variant-parser.ts` / `url.ts` — small pure-function helpers.
- `render-markdown.ts` — turns a page's `ComponentSpecDoc[]` + metadata into the final
  Markdown.
- `generate-page-docs.ts` — CLI entrypoint wiring all of the above together.

## Page discovery

The list of Figma pages to process isn't hand-maintained — `pages.ts` fetches the design
file's top-level page list (`GET /v1/files/{fileKey}?depth=1`) and keeps only the pages
that name an actual zeta-web component: each Figma page name and each folder under
`packages/zeta-web/src/components/` is lowercased and stripped of its own convention
(spaces for Figma page names, dashes for folder names) before comparing, so "Top App Bar"
and "top-appbar" both normalize to "topappbar" and match. Pages naming no component
folder (Cover, token-exploration canvases, section dividers like "COMPONENTS") are
skipped automatically — nothing to configure when a new component's page is added, as
long as its Figma page name and its component folder name agree once normalized.

A Figma page whose name doesn't reduce to the same string as its component folder (e.g. a
plural/singular mismatch) won't auto-match — rename one side to align them.

## Metadata integration

Design system pages in this file follow a convention: each component's actual set
(e.g. `Button`) has a sibling frame named `"<Name> Metadata"` (e.g. `"Button Metadata"`)
containing hero/anatomy/how-to-use/accessibility content authored by hand. Discovery
picks up both the component and its metadata frame in the same page fetch — no separate
node-id list for metadata. A component with no matching metadata frame on the page just
renders without that section.

A page can carry several metadata frames (the Button page has both `"Button Metadata"`
and `"Icon Button Metadata"`); each is matched and rendered independently under its own
component, never merged. Matching is loose — case-insensitive and ignoring the `_` /
`Template/` prefixes used for subcomponents — and a frame matching no component on the
page is still rendered, as its own `## <Name> (documentation only)` section with a
warning, rather than being silently dropped.

## Token resolution

Colors, spacing, radius, and stroke weight are resolved from each node's actual Figma
`boundVariables` — the real applied Variable, fetched once per file via
`GET /v1/files/{fileKey}/variables/local` — not a guess from the raw hex/px value. This
matters: many raw values are shared by several differently-named tokens (e.g. `#1f69ff`
is both `interactive.primary.background.default` and `foreground.link`), so a
value-based reverse lookup would routinely pick a plausible-looking but wrong token. A
property with no bound variable is reported as `token: null` — an honest "not tokenized
in Figma", never a guess.

Typography (fontSize/lineHeight/letterSpacing) resolves the same way — each is its own
`boundVariables` entry on the text node (arrives as a one-element array, since Figma's
shape also supports mixed-style runs within one text node). Gradient fills/strokes/text
colors resolve too: each gradient stop carries its own `boundVariables.color`, and the
whole thing becomes a CSS `linear-gradient()` in both raw (hex stops) and token form —
token form only when every stop is itself tokenized.

## Icon resolution

A zeta-web icon is always rendered through the shared "Icon" wrapper component (matches
the `<zeta-icon>` element), with the actual glyph swapped in as a nested `INSTANCE`. The
layer structure resolves this the same way as everything else — through Figma's own
structure, not the layer's own (freely renameable) name: an `INSTANCE` whose applied
component resolves to `Icon` gets its nested swapped child (found via
`componentPropertyReferences.mainComponent`) resolved to its own component/componentSet
name, e.g. `- Search/Search-Icon (INSTANCE, icon: Search)`. Any other `INSTANCE_SWAP`
(e.g. a dropdown's swappable trigger) is left alone — only a swap nested inside the `Icon`
wrapper is reported as an icon.

## Notes / known limitations

- Discovery can't distinguish a page's actual subject components from an unrelated
  component instance nested purely for illustration inside a doc frame. Not filtered in
  v1 — add a name/section-prefix filter if this shows up in practice.
- Metadata frames are found by the `"<Name> Metadata"` suffix on a `FRAME` — a page that
  names its doc frames some other way won't get a metadata section at all. Two frames
  with the identical name on one page: first wins, second warned about and ignored.
- Corner radius and stroke weight only read the top-left corner / top side when bound
  per-corner or per-side (`rectangleCornerRadii` / `individualStrokeWeights`) — fine for
  uniform values, wrong if a component intentionally uses different radii/widths per
  corner or side.
- Only `SOLID` and `GRADIENT_LINEAR` paints resolve — `RADIAL`/`ANGULAR`/`DIAMOND`
  gradients and image fills come back as `{ raw: null, token: null }`.
- A Figma page name and its zeta-web component folder name must agree once each side's
  own separator is stripped (see Page discovery above) — a plural/singular mismatch
  (e.g. a page named "Badge" for a `badges/` folder) won't auto-match.
- No exhaustive per-variant listing, and no separate structurally-extracted properties
  table, in the output (both dropped — high token cost for no new information once the
  metadata's own Property Breakdown and hero content are rendered).
- A component with no metadata frame gets no properties listing at all (only layer
  structure + resolved tokens) — `componentProperties` is still captured in the debug
  JSON if needed.
