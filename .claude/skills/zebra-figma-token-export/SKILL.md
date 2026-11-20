---
name: zebra-figma-token-export
description: Export every design token in a Figma file — all variable collections, every mode, and every extension collection — into a tokens/ folder of DTCG JSON. Base collections are written in full, one file per mode; each extension collection gets its own folder holding only the values it actually overrides. Use whenever the user wants to pull tokens out of Figma, refresh the token folder, add or re-sync a brand/theme extension, inspect what an extension overrides, or asks what tokens or modes a Figma file has. Read-only; companion to zebra-figma-component-spec (that skill reads one component, this one reads the whole variable graph).
---

# Figma Token Export

Pull the complete variable graph out of a Figma file and write it as DTCG JSON, split so that a base collection and a theme extension are never mixed in the same file. Text styles and the fonts they need come out alongside it.

Four things come out of Figma, and all four matter:

1. **Collections and modes** — every local variable collection, its modes, and which mode is the default.
2. **Variables** — name, type, description, scopes, codeSyntax, and the value in each mode (literal or alias).
3. **Extensions** — Figma's "collection extends collection" feature. An extension inherits every variable from its parent and overrides some of them. Only the overrides belong in the extension's files.
4. **Text styles** — each style's font, size, line height, letter spacing and weight, and the variable bound to each. A style becomes one typography token that aliases those variables, and its families and weights go into `fonts.json` so the font files can be fetched.

## Principles

- **Read-only.** Every script here only reads. Never write variables, collections or modes back to the file.
- **Overrides only, in extensions.** An extension file contains exactly the variables that extension overrides — never a merged copy of the parent. A consumer reads base first, then layers the extension on top. Merging is a build-step decision, not an extraction one.
- **One file per (collection, mode).** A file holds a single `$value` per token, so a diff between two modes, or between base and an extension, is readable.
- **Names verbatim.** Figma variable names are preserved exactly, spaces and all (`label/large/font family` → `label.large.font family`). Sanitising for CSS is a build concern; this folder is the source of truth.
- **Nothing is dropped silently.** Empty collections, missing variables, unresolved aliases, name collisions and orphan modes are recorded in `manifest.json`, not discarded.

## Two ways in — pick the REST path when you can

**The REST path (preferred, one command, no context cost).** `GET /v1/files/<key>/variables/local` returns the whole graph, extensions and all, in a single response written straight to disk.

```bash
set -a && . ./.env && set +a
curl -s -H "X-Figma-Token: $FIGMA_PERSONAL_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/variables/local" \
  -o tokens/_dump/rest.json
```

It needs a token with the **`file_variables:read`** scope, and the endpoint is Enterprise-only. A token without that scope fails with `403 Invalid scope(s): … This endpoint requires the file_variables:read scope` — this is the single most common failure, and it is worth checking before anything else, because the alternative costs far more. If the scope is missing, say so and offer the MCP path.

REST also returns variables deleted from the file while something still references them, flagged `deletedButReferenced`. `scripts/rest-to-dump.py` leaves those out, as the Plugin API does, and the builder lists them in the manifest warnings.

The REST shape differs from the MCP dump (`meta.variables` / `meta.variableCollections`, colors as `{r,g,b,a}` floats, aliases as `{type:"VARIABLE_ALIAS",id}`). Normalise it into the dump shape below before running the builder.

**The MCP path (always available).** `use_figma` runs in the file directly and needs no token. It is paged, because the tool truncates a response at about 20KB.

## Before you start (MCP path)

- The Figma MCP must be connected. The scripts run through `use_figma`, so load the **figma-use** skill first (the tool requires it), and pass `skillNames: "figma-use"` on each call.
- Take `fileKey` from the URL `figma.com/design/<fileKey>/<name>`. No node id is needed — variables are file-level.
- Decide the output root. Default is `tokens/` at the repo root.

## Workflow

### 1. Discover (`scripts/discover-collections.js`)

No input to replace. Returns every local collection with its modes, default, variable count, `remote`, `hiddenFromPublishing`, and for extensions the parent id, root id, per-mode override counts and the `mode → parentMode` map. Read `graph` for the plan: which collections are bases, which are extensions of what, and how many pages each needs.

Check before continuing: a collection with 0 variables gets no files; a `remote: true` collection belongs to another library and cannot be enumerated here; an extension mode with 0 overrides is normal and gets no file.

### 2. Dump the variables (`scripts/dump-variables.js`)

Run once per page, raising `INPUT.offset` by `INPUT.limit` until `hasMore` is false. Set `withCollections: true` on the first page only.

The dump is deliberately compact — it is not the output format. A DTCG tree is roughly 4x its size, so dumping compactly and expanding locally is what keeps a whole file affordable.

- **Page size.** 60 is safe everywhere. Collections with long `$description` text (semantics-style) are the binding constraint; collections of bare primitives take 120 comfortably. If a response comes back truncated, halve the limit and refetch that page — a truncated page is unusable, not merely short.
- **Mode collapse.** When every declared mode of a collection carries the same value, the dump writes `{"*": value}` once. Size and typography collections usually collapse almost entirely.
- **Orphan modes.** `valuesByMode` can carry ids of deleted modes. The script skips them and lists them under `orphanModeValues`; report them, do not write them.

Write each page to `<root>/_dump/vars-*.json` as an array of the `variables` rows, and the first page's `collections` to `<root>/_dump/collections.json`. Pages may overlap; the builder de-duplicates by variable id.

### 2b. Dump the text styles (`scripts/dump-text-styles.js`)

Always through `use_figma`, on either path: the REST variables endpoint has no styles, and `/v1/files/:key/styles` lists only styles published to a library. Run it once (no INPUT) and save the returned `styles` array to `<root>/_dump/text-styles.json`. Without it the builder still runs, skips text styles and fonts, and says so in the manifest warnings.

### 3. Build the folder (`scripts/build-tokens.py`)

```bash
python3 .claude/skills/zebra-figma-token-export/scripts/build-tokens.py tokens
```

Reads `<root>/_dump/*.json` and writes the whole tree plus both levels of manifest. It types every token, resolves alias references to `{collection.dotted.name}`, un-escapes HTML entities in descriptions (Figma returns `&#39;`), splits per mode, and takes each extension's file from `variableOverrides` alone.

It prints the counts and every warning. **Check the counts against `discover-collections.js`:** the builder warns when a collection holds fewer variables than it declares, which is how a dropped or truncated page shows up. Fetch the missing rows and re-run — the build is idempotent.

### 3b. Fetch the fonts (`scripts/fetch-fonts.mjs`)

```bash
node .claude/skills/zebra-figma-token-export/scripts/fetch-fonts.mjs tokens
```

Figma cannot export font files. This downloads each family in `fonts.json` from Google Fonts (latin and latin-ext by default; `--subsets=` to change) into `tokens/fonts/`, with an `@font-face` file. A family Google does not serve (Zebra Sans today) is listed under `selfHost`; report it, do not guess a source.

### 3c. Rebuild the CSS in each package

`packages/web-components/scripts/build-tokens-css.mjs` (run by `pnpm run tokens`, `pnpm run tokens` in zeta-web, and react-baseui's `tokens`) turns the text styles into one `--text-<group>-<size>` font shorthand each, plus a `.text-<group>-<size>` class that also sets letter spacing, re-declared in every scope where a part changes. `--fonts=self` swaps the Google Fonts import for the fetched files. It writes weights as numbers: a keyword like `Medium` is not valid CSS and the browser drops it.

### 4. Verify

- Every JSON file parses.
- Total tokens = Σ (variables × modes) per base collection. Total overrides = Σ per-mode override counts from step 1.
- No count warnings remain in the manifest.
- Spot-check one extension file against `overridesByMode` from step 1: it must contain exactly those tokens and no others.
- Text styles: the count matches `dump-text-styles.js`, and every part aliases a variable unless the manifest lists it as unbound.
- Fonts: `fonts/manifest.json` lists every family in `fonts.json` as fetched or self-host.

Report the counts and the warnings. Do not fix a problem found in Figma; record it.

## Output layout

See `references/output-layout.md` for the exact folder contract, the DTCG leaf shape, alias syntax and a filled example.

```
tokens/
├── manifest.json
├── fonts.json                   # families and weights the tokens need
├── fonts/                       # fetched woff2 + fonts.css (fetch-fonts.mjs)
├── _dump/                       # compact source data, re-runnable input for the builder
├── base/
│   ├── text-styles.json         # one typography token per text style, aliasing its variables
│   ├── primitives/value.json
│   ├── palette/light.json · dark.json
│   ├── semantics/base.json
│   ├── size/desktop.json · mobile.json · tablet.json · desktop-compact.json
│   └── typography/…
└── extensions/
    ├── companion/
    │   ├── manifest.json
    │   └── palette/light.json · dark.json     ← only what companion overrides
    └── target/
        ├── manifest.json
        ├── primitives/value.json
        └── palette/light.json · dark.json
```

Two extensions may share a name while extending different parents (a `target` over `primitives` and a `target` over `palette`). The parent-collection subfolder is what keeps them apart, so never flatten it away.
