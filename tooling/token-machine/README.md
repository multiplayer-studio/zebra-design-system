# token-machine

Internal tool that pulls design tokens out of Figma (via the Figma Variables REST API) and turns them into the CSS custom properties shipped in `packages/zebra-design-system-tokens`.

Pipeline, end to end:

```
Figma Variables API
      │  fetch-tokens.ts
      ▼
tokens/raw-tokens.json            (flat dump of Figma collections/variables)
      │  convert-tokens.ts
      ▼
tokens/dtcg-tokens/*.json         (one file per collection+mode, DTCG format)
      │  build-tokens/ (Style Dictionary + format synthesizers)
      ▼
┌─────────────────────────────────────────┐
│ CSS         │ JavaScript  │ Flutter/Dart│
│ colors.css  │ colors.js   │ colors.dart │
│ sizes.css   │ sizes.js    │ sizes.dart  │
│ typography  │ typography  │ typography  │
│   .css      │    .js      │    .dart    │
└─────────────────────────────────────────┘
      │  export-resolved-tokens.ts
      ▼
services/mcp-server/src/resources/resolved-tokens.json
```

`clean-tokens.ts` wipes the generated output (`tokens/` and the tokens package's `dist/`) so you can rebuild from scratch.

## Prerequisites

- Node 18+ (uses the native `fetch` API).
- A `.env` file at the **repo root** (`zebra-design-system/.env`, already gitignored) with:

  ```
  FIGMA_PERSONAL_ACCESS_TOKEN=your-figma-pat
  FIGMA_FILE_KEY=the-figma-file-key
  ```

  `FIGMA_FILE_KEY` is the file ID in the Figma URL (`figma.com/design/<FILE_KEY>/...`). The PAT needs read access to that file's variables. `fetch`/`convert` load this via `tsx --env-file=../../.env`, so the path is relative to `tooling/token-machine`.

## Configuration

Token-machine constants (collection names, modes, breakpoints, px conversion rules, etc.) are centralized in `tooling/token-machine/config.json`. Updating Figma collections, modes, or breakpoint rules requires editing this file:

- **`directories`**: output paths for CSS, JavaScript, Flutter, and token artifacts.
- **`collections`**: which DTCG collections feed into each output type (color, size, typography).
- **`modes`**: color modes (`light`/`dark`) and breakpoint modes (`mobile`/`tablet`/`desktop`/`desktop compact`).
- **`tokens.fontWeights`**: Figma font weight names → numeric values (Light→300, Regular→400, Medium→500, Bold→700).
- **`tokens.pxPatterns`**: token name patterns that should be suffixed with `px` in CSS/JS output (e.g., `fontsize`, `space`, `radius`).
- **`tokens.groupValueKey`**: reserved key for group-level token values (normally `selfvalue`).

If a Figma collection, mode, or breakpoint is added, update the corresponding array in `config.json` and re-run `sync:tokens`.

## Running it

From the repo root, use the workspace scripts (defined in the root `package.json`):

```bash
npm run fetch:tokens    # pull latest variables from Figma -> tokens/raw-tokens.json
npm run convert:tokens  # raw-tokens.json -> tokens/dtcg-tokens/*.json
npm run build:tokens    # dtcg-tokens/*.json -> dist/css/*.js/*.dart (via Style Dictionary + synthesizers)
npm run export:tokens   # css/*.css -> services/mcp-server/src/resources/resolved-tokens.json
npm run clean:tokens    # delete tokens/ and the tokens package's dist/

npm run sync:tokens     # clean -> fetch -> convert -> build -> export, in order

npm run dev:tokens-web      # launch web token showcase (React)
npm run dev:tokens-flutter  # launch Flutter token showcase
```

Or from inside `tooling/token-machine/` directly (`npm run fetch`, `npm run convert`, `npm run build`, `npm run clean`, `npm run export`).

`sync:tokens` is the one you want for "give me the latest tokens from Figma end to end." Run `build:tokens` on its own if you've hand-edited a file in `tokens/dtcg-tokens/` and just want to regenerate tokens without hitting the Figma API.

## The pipeline, stage by stage

### 1. `fetch-tokens.ts` — Figma → `raw-tokens.json`

Calls `GET https://api.figma.com/v1/files/{FIGMA_FILE_KEY}/variables/local` and writes a trimmed-down copy of the response to `tokens/raw-tokens.json`:

- Every **variable collection** in the file (id, name, modes, extension/override info) — unfiltered.
- Every **variable**, with `hiddenFromPublishing` and `deletedButReferenced` variables dropped, and literal color values pre-normalized to `{r,g,b,a}` and aliases normalized to `{kind: 'alias', variableId}`.

**Important:** this pulls in *every* variable collection in the Figma file, not just the ones meant to be design tokens. If someone adds an unrelated collection to that file (a FigJam template, a one-off exploration, a duplicate/renamed copy of an existing collection), it comes along for the ride. See [Known quirks](#known-quirks-to-watch-for) below.

### 2. `convert-tokens.ts` — `raw-tokens.json` → DTCG token files

Reads `tokens/raw-tokens.json` and, for every `(collection, mode)` pair, writes one [DTCG](https://tr.designtokens.org/format/)-format JSON file to `tokens/dtcg-tokens/`:

- **File naming:** `{collection}-{mode}.json`, e.g. `palette-light.json`, `size-desktop.json`. Names and modes are lowercased for the filename but the JSON root key preserves the collection's actual name.
- **Nesting:** a variable named `brand/primary/500` in Figma becomes `{ "palette": { "brand": { "primary": { "500": { "$type": ..., "$value": ... } } } } }`.
- **Sanitization:** spaces in Figma variable names are automatically stripped out (e.g. `font family` → `fontfamily`). This prevents downstream issues where spaces in token names break CSS custom property generation and token reference resolution.
- **Aliases:** a Figma variable-alias becomes a DTCG reference string, e.g. `"{primitives.color.brand.main.60}"`, built from the *target* variable's collection name + its `/`-separated name.
- **Colors:** RGBA floats (0–1) are converted to hex, alpha channel omitted when opacity is 100%.
- **Extension/override collections** (Figma "collection extends collection" — `isExtension: true` with `variableOverrides`): the script resolves the parent collection, writes the file as `{parentName}-{extensionName}-{mode}.json`, and merges every variable from the base collection (overridden or not) under the parent's root key. This is how a themed variant (e.g. a "Companion" brand overriding `palette`) is meant to produce `palette-companion-light.json` alongside the base `palette-light.json`.
- **Empty collections are skipped:** after populating a `(collection, mode)` file, the script checks whether the root key actually has any properties; if a collection has no variables assigned to it (or none that resolve for that mode), no file is written for it. This filters out stray/junk Figma collections at conversion time rather than emitting empty JSON files for `build-tokens.ts` to ignore later.

### 3. `build-tokens/` — DTCG tokens → CSS/JS/Flutter (Style Dictionary + Synthesizers)

The build process is now modular, split across specialized files:

**Discovery & Compilation:**
1. **Theme discovery** (`index.ts`): globs `tokens/dtcg-tokens/*.json` looking for filenames with exactly 3 hyphen-separated parts where the middle part isn't a known mode (`light`, `dark`, `mobile`, `tablet`, `desktop`, `desktop compact`, `base`, `value`) — that middle part is treated as a theme name. Default theme is always `default`.
2. **Token compilation** (`compile-tokens.ts`): for each theme and mode, compiles temporary files with Style Dictionary:
   - **Color**: sources `primitives-value.json` + `palette-{light,dark}.json` + `semantics-base.json` into temp CSS + Dart files.
   - **Size**: sources `primitives-value.json` + `size-{mobile,tablet,desktop,desktop compact}.json` per breakpoint.
   - **Typography**: sources `primitives-value.json` + `typography-{mobile,tablet,desktop,desktop compact}.json` per breakpoint.
   - Style Dictionary formats are registered in `style-dictionary-formats.ts` and include custom filters (`encapsulationFilter` — only emit `semantics`, `size`, `typography` tokens, not internal `primitives`/`palette`) and CSS/Dart outputs.

**Synthesis to Final Formats:**
- **CSS** (`css-synthesizer.ts`): synthesizes temp CSS files into `packages/zebra-design-system-tokens/dist/css/`:
  - `colors.css`: light values under `:root`, dark values under `@media (prefers-color-scheme: dark)` + `.dark-mode` class override.
  - `sizes.css`: mobile under `:root`, then tablet/desktop/desktop-compact behind `@media (min-width: ...)` breakpoints.
  - `typography.css`: mobile under `:root`, then breakpoint-scoped variants.

- **JavaScript** (`js-synthesizer.ts`): synthesizes temp files into `packages/zebra-design-system-tokens/dist/js/`:
  - `colors.js`: exported as `{ light: {...}, dark: {...} }` objects.
  - `sizes.js`: exported as `{ mobile: {...}, tablet: {...}, desktop: {...}, desktopCompact: {...} }` objects.
  - `typography.js`: exported as `{ mobile: {...}, tablet: {...}, ... }` objects.

- **Flutter/Dart** (`flutter-building-blocks.ts`, `dart-helpers.ts`): generates Dart classes:
  - `colors_light.dart`, `colors_dark.dart`: Dart classes with static token properties.
  - `sizes_*.dart`, `typography_*.dart`: Dart classes per breakpoint mode.

**Building-block CSS** (see [§3b](#3b-building-block-css--mixing-primitives-palette-extensions-independently)):
- `building-block-css-synthesizer.ts` & `building-block-js-synthesizer.ts`: emit layer-specific files that use `var()` references instead of flattened literals, enabling mix-and-match composition of `primitives/`, `palette/`, `size/`, `typography/` from different themes.

### 3b. Building-block CSS — mixing primitives/palette/size/typography extensions independently

Steps 1–3 above produce fully-resolved, self-contained CSS (`colors.css`, `sizes.css`, `typography.css`, `{theme}-colors.css`, `{theme}-sizes.css`, `{theme}-typography.css`) — pick one file per layer, done. That works great as long as a "theme" (e.g. `Companion`, `Target`) is really one designer's complete, coherent bundle of overrides sharing a single name across `primitives`/`palette`/`size`/`typography`.

But Figma lets designers create `primitives`, `palette`, `size`, and `typography` extensions completely independently of each other, under different names. There's no way to get CSS for an arbitrary pairing (e.g. "Target's primitives + Companion's palette + Default's typography") from the fully-resolved files without pre-baking every possible combination.

To solve that, `build-tokens/` *additionally* emits each layer as its own standalone file, using `var()` to reference the layer below instead of a flattened literal, via Style Dictionary's built-in `css/variables` format with `outputReferences: true`:

These are organized into two kinds of file: **ingredients** (`primitives/`, `palette/`, `size/`, `typography/` — multiple interchangeable variants, one per theme) and **entry points** (`semantics.css` — always the same single file a developer actually links, referencing whichever ingredients happen to be loaded alongside it):

- `primitives/default.css`, `primitives/{theme}.css` — literal leaf values as CSS variables (e.g. `--primitives-color-brand-main-60: #1f69ff;`). Only emitted for a theme if that theme actually has a `primitives` override.
- `palette/default.css`, `palette/{theme}.css` — references primitives (`--palette-brand-primary: var(--primitives-color-brand-main-60);`), light/dark handled the same way as `colors.css` (media query + `.dark-mode` class), just without the `.{theme}-theme` class scoping. Only emitted for a theme if it has a `palette` override.
- `size/default.css`, `size/{theme}.css` — references primitives, breakpoint-scoped like `sizes.css`. This one is also an "entry point" in the sense that `size` tokens (`--space-page`, etc.) already are the public-facing names — there's no separate semantic layer for sizing. Only emitted if a theme has a `size` override.
- `typography/default.css`, `typography/{theme}.css` — references primitives, breakpoint-scoped like `typography.css`. Typography tokens (`--body-medium-fontsize`, `--body-medium-lineheight`, etc.) are public-facing names — there's no separate semantic layer for typography. Only emitted if a theme has a `typography` override.
- `semantics.css` — **always exactly one file, no theme variants, not in a folder.** Every token in `semantics-base.json` is a single-hop `{palette.<path>}` reference (confirmed — none reference `primitives` directly, none vary by mode), so `semantics.css` doesn't need light/dark logic or a theme-specific version of its own; that all happens one layer down in whichever `palette/*.css` you load. Its declared variable names are unprefixed (`--surface-page`, matching `colors.css`'s public API) — only the *referenced* name inside `var(...)` keeps its `palette-` prefix.

**Recipe — mixing primitives, palette, size, and typography from different themes** (impossible via the resolved files, since no single theme bundle spans all combinations):

```html
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/primitives/target.css">
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/palette/companion.css">
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/size/target.css">
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/typography/companion.css">
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/semantics.css">
```
(or the equivalent package imports, e.g. `zebra-design-system-tokens/css/primitives/target`, per the `exports` map below — the wildcard export matches across the `/`, so no `package.json` changes were needed for the folder structure.) Once loaded, use the variables exactly like normal (`var(--surface-page)`, `var(--interactive-primary-background-default)`, `var(--space-md)`, `var(--body-medium-fontsize)`, etc.) — the resolved values depend on which layer files you actually loaded.

**Important constraint:** these building-block files are all `:root`-scoped (not class-scoped like `.{theme}-theme`), because the selection mechanism is *which files you include*, not a runtime class toggle. Load exactly one `primitives/*.css`, exactly one `palette/*.css`, exactly one `size/*.css`, and exactly one `typography/*.css` per page — loading two of the same layer silently collides at `:root` (last one in source order wins, no error).

### 4. `export-resolved-tokens.ts` — CSS → `resolved-tokens.json`

Parses the resolved CSS output files (`colors.css`, `sizes.css`, `typography.css`) and exports a flattened JSON representation to `services/mcp-server/src/resources/resolved-tokens.json` for use by the MCP server. This file groups tokens by type (color, size, typography) and is used to power token queries in the MCP server.

### 5. `clean-tokens.ts`

Deletes `./tokens` (both `raw-tokens.json` and `dtcg-tokens/`) and `../../packages/zebra-design-system-tokens/dist/`. Run before `sync:tokens` if you want a guaranteed-fresh build; the scripts otherwise just overwrite files in place.

## Output package: `zebra-design-system-tokens`

`packages/zebra-design-system-tokens/package.json` exports three formats:

- **CSS**: `./css/*` → `./dist/css/*.css` — import e.g. `zebra-design-system-tokens/css/colors` or `.../css/sizes`.
- **JavaScript**: `./js/*` → `./dist/js/*.js` — import e.g. `zebra-design-system-tokens/js/colors` (ESM, JSON objects per breakpoint).
- **Flutter/Dart**: `./dart/*` → `./dist/flutter/lib/*.dart` — import as Dart classes with static token properties.

The generated files are committed to the repo (not gitignored) — regenerating tokens will show up as a diff in `packages/zebra-design-system-tokens/dist/**`, so commit that alongside the token source changes deliberately, not as incidental noise.

## Known quirks to watch for

- **Collection/mode names are matched case-sensitively and by exact string** in `config.json` (`collections.color`, `collections.size`, `collections.typography`, `modes.color`, `modes.breakpoint`). If someone renames a Figma collection or mode (e.g. `Palette` → `Palettes`, or adds a new breakpoint mode), you must update the corresponding array in `config.json` or the new/renamed data will silently be excluded from the output.
- **Theme auto-discovery is a naming-convention hack**, not real config: it splits filenames on `-` and assumes exactly 3 parts means `{parent}-{theme}-{mode}.json`. Keep collection/theme/mode names free of extra hyphens, or this heuristic misfires (it's also why `size-desktop compact.json` is safe — the space, not a hyphen, keeps "desktop compact" as one part).
- **`primitives`, `palette`, and `typography` tokens never appear directly in the resolved files** (`colors.css`/`sizes.css`/`typography.css`/`{theme}-colors.css`/`{theme}-sizes.css`/`{theme}-typography.css`) — only `semantics`, `size`, and `typography` do there (see `encapsulationFilter`). `primitives` and `palette` *do* appear as their own building-block files under `primitives/`, `palette/`, `size/`, `typography/` (see [§3b](#3b-building-block-css--mixing-primitivespalette-extensions-independently)), which is the supported way to consume a raw primitive/palette value or a custom typography scale directly.
- **`raw-tokens.json` and the per-mode `dtcg-tokens/*.json` files are checked into git**, so a `fetch`+`convert` from a stale or wrong `FIGMA_FILE_KEY` will show up as a large, confusing diff. Diff `tokens/raw-tokens.json` first if a sync produces unexpected changes.
- **Building-block files (`primitives/*.css`, `palette/*.css`, `size/*.css`, `typography/*.css`, `semantics.css`) are `:root`-scoped, not class-scoped** — loading two `primitives/*.css` files (or two `palette/*.css` files, or two `size/*.css` files, or two `typography/*.css` files) on the same page silently collides, last one in source order wins. Pick exactly one of each per page. This is different from the resolved `.{theme}-theme`-scoped files, which are deliberately safe to load side-by-side.
- **Building the `palette/*.css`/`size/*.css`/`semantics.css` building blocks logs a benign Style Dictionary warning** ("filtered out token references were found") — expected, not a bug. Those files intentionally filter out `primitives`/`palette` tokens from the *output* while still referencing them via `var(...)`; Style Dictionary still resolves the reference correctly (it uses the full unfiltered token set to do so), it just warns because the referenced token isn't in that file. "Token collisions detected" is a separate, also-benign warning that predates this feature — it fires whenever a themed override file and its base file both define the same token path, which is how overrides work by design (the source list is base-file-then-override-file; Style Dictionary resolves it deterministically, last source wins).

## Common maintenance tasks

- **Add a new semantic, size, or typography token:** add the variable in Figma under the `semantics`, `size`, or `typography` collection, then `npm run sync:tokens`.
- **Add a new breakpoint/mode for sizes or typography:** add the mode in the Figma `size` or `typography` collection, then add it to the `modes.breakpoint` array in `config.json`, and update `breakpoints` if necessary (e.g., if the new mode has a different media-query threshold). Re-run `sync:tokens`.
- **Add a themed override (e.g. a second brand):** create an extension collection in Figma that overrides `palette`, `primitives`, `size`, `typography`, or another base collection, run `sync:tokens`, and confirm `convert-tokens.ts` produces the appropriate `{collection}-{themeName}-{mode}.json` files — `build-tokens/index.ts` will auto-discover the theme and emit corresponding CSS/JS/Dart files (`{themeName}-colors.css`, `colors_{theme}_light.dart`, etc.) and building-block files for the overridden layers.
- **Update font weights:** edit `tokens.fontWeights` in `config.json` (e.g., if Figma renames "Medium" to "Semi-Bold"), then re-run `sync:tokens`. The mapping is used during `convert-tokens.ts` to translate variable font weights to numeric CSS values.
- **Change token px conversion rules:** edit `tokens.pxPatterns` in `config.json` (e.g., add `"gap"` if new size tokens use that naming). The pattern list is used by `convert-tokens.ts` to auto-suffix matching tokens with `px` in resolved outputs.
- **Rotate the Figma PAT:** update `FIGMA_PERSONAL_ACCESS_TOKEN` in the repo-root `.env`; nothing else references it.
