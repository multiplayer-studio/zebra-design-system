# token-machine

Pulls design tokens from Figma (via the Figma Variables REST API) and compiles them into CSS custom properties and JavaScript objects shipped in `packages/tokens`.

Pipeline:

```
Figma Variables API
      │  fetch-tokens.ts
      ▼
tokens/raw-tokens.json
      │  convert-tokens.ts
      ▼
tokens/dtcg-tokens/*.json         (DTCG format, one per collection+mode)
      │  build-tokens/ (Style Dictionary + CSS synthesizers)
      ▼
CSS (colors.css, sizes.css, typography.css, etc.)
      │  export-resolved-tokens.ts
      ▼
JSON (resolved-tokens.json, resolved-companion-tokens.json, etc.)
```

## Prerequisites

- Node 18+ (uses the native `fetch` API).
- A `.env` file at the **repo root** (`zebra-design-system/.env`, already gitignored) with:

  ```
  FIGMA_PERSONAL_ACCESS_TOKEN=your-figma-pat
  FIGMA_FILE_KEY=the-figma-file-key
  ```

  `FIGMA_FILE_KEY` is the file ID in the Figma URL (`figma.com/design/<FILE_KEY>/...`). The PAT needs read access to that file's variables. `fetch`/`convert` load this via `tsx --env-file=../../.env`, so the path is relative to `tooling/token-machine`.

## Configuration

Token-machine constants are centralized in `config.json`. When Figma collections, modes, or breakpoints change:

- **`directories`**: output paths for CSS and JavaScript artifacts.
- **`collections`**: DTCG collections for color, size, typography.
- **`modes`**: color modes (`light`/`dark`) and breakpoint modes.
- **`tokens`**: font weights, px patterns (e.g., `fontsize`, `space`), and group value key.

If a Figma collection, mode, or breakpoint is added, update the corresponding array in `config.json` and re-run `sync:tokens`.

## Running it

From the repo root:

```bash
npm run fetch:tokens    # Figma → tokens/raw-tokens.json
npm run convert:tokens  # raw-tokens.json → tokens/dtcg-tokens/*.json
npm run build:tokens    # dtcg-tokens/ → dist/css/
npm run export:tokens   # css/ → dist/json/resolved-tokens.json
npm run clean:tokens    # delete tokens/ and tokens package dist/

npm run sync:tokens     # clean → fetch → convert → build → export (full cycle)
```

`sync:tokens` is the standard "update all tokens from Figma" command. Run `build:tokens` alone if you've edited `tokens/dtcg-tokens/` directly and only need to regenerate outputs.

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

### 3. `build-tokens/` — DTCG tokens → CSS (Style Dictionary + Synthesizers)

**Discovery & Compilation:**
1. **Theme discovery** (`index.ts`): filenames with exactly 3 hyphen-separated parts (where the middle part isn't a known mode) are treated as themed variants. Default theme is always `default`.
2. **Token compilation** (`compile-tokens.ts`): for each theme and mode, compiles with Style Dictionary:
   - **Color**: `primitives-value.json` + `palette-{light,dark}.json` + `semantics-base.json` → CSS.
   - **Size/Typography**: per breakpoint mode → CSS.
   - `style-dictionary-formats.ts` registers custom filters (`encapsulationFilter`: emit only `semantics`, `size`, `typography`) and CSS output.

**Output Synthesis:**
- **CSS** (`css-synthesizer.ts`): 
  - `colors.css`: light under `:root`, dark under `@media (prefers-color-scheme: dark)` + `.dark-mode`.
  - `sizes.css` / `typography.css`: mobile under `:root`, then breakpoint-scoped variants.
  - Theme-specific variants (e.g., `target-colors.css`, `companion-sizes.css`).

**Building-block layers** (`building-block-css-synthesizer.ts`):
- Emit layer-specific CSS files with `var()` references (not flattened literals), enabling mix-and-match of `primitives/`, `palette/`, `size/`, `typography/` from different themes.

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
<link rel="stylesheet" href="node_modules/design-system-tokens/dist/css/primitives/target.css">
<link rel="stylesheet" href="node_modules/design-system-tokens/dist/css/palette/companion.css">
<link rel="stylesheet" href="node_modules/design-system-tokens/dist/css/size/target.css">
<link rel="stylesheet" href="node_modules/design-system-tokens/dist/css/typography/companion.css">
<link rel="stylesheet" href="node_modules/design-system-tokens/dist/css/semantics.css">
```
(or the equivalent package imports, e.g. `@zebra-design-system/tokens/css/primitives/target`, per the `exports` map below — the wildcard export matches across the `/`, so no `package.json` changes were needed for the folder structure.) Once loaded, use the variables exactly like normal (`var(--surface-page)`, `var(--interactive-primary-background-default)`, `var(--space-md)`, `var(--body-medium-fontsize)`, etc.) — the resolved values depend on which layer files you actually loaded.

**Important constraint:** these building-block files are all `:root`-scoped (not class-scoped like `.{theme}-theme`), because the selection mechanism is *which files you include*, not a runtime class toggle. Load exactly one `primitives/*.css`, exactly one `palette/*.css`, exactly one `size/*.css`, and exactly one `typography/*.css` per page — loading two of the same layer silently collides at `:root` (last one in source order wins, no error).

### 4. `export-resolved-tokens.ts` — Resolved fragments → JSON

Merges resolved token fragments from the build process and exports comprehensive JSON files to `packages/foundations/tokens/dist/json/`:

- **`resolved-tokens.json`**: All default theme tokens (color, size, typography) merged into one file, organized by type.
- **`resolved-{theme}-tokens.json`** (e.g., `resolved-companion-tokens.json`, `resolved-target-tokens.json`): Theme-specific resolved tokens, available if that theme overrides the respective layers.

These files group tokens by type and provide a consumable JSON format for JavaScript/TypeScript applications that need token values at runtime (as an alternative to CSS custom properties).

### 5. `clean-tokens.ts`

Deletes `./tokens` (both `raw-tokens.json` and `dtcg-tokens/`) and `../../packages/tokens/dist/`. Run before `sync:tokens` if you want a guaranteed-fresh build; the scripts otherwise just overwrite files in place.

## Output: `design-system-tokens`

`packages/tokens/` exports:

- **CSS**: `dist/css/*.css` — import e.g. `design-system-tokens/css/colors` (CSS custom properties, fully resolved)
- **JSON**: `dist/json/*.json` — import e.g. `design-system-tokens/dist/json/resolved-tokens.json` (resolved tokens, organized by type)
- **CSS Building Blocks**: `dist/css/{primitives,palette,size,typography}/*.css` — mix-and-match layer files with `var()` references

Generated files are committed to the repo. Changes to `packages/tokens/dist/**` should be committed alongside token source updates.

## Known quirks to watch for

- **Collection/mode names are matched case-sensitively and by exact string** in `config.json` (`collections.color`, `collections.size`, `collections.typography`, `modes.color`, `modes.breakpoint`). If someone renames a Figma collection or mode (e.g. `Palette` → `Palettes`, or adds a new breakpoint mode), you must update the corresponding array in `config.json` or the new/renamed data will silently be excluded from the output.
- **Theme auto-discovery is a naming-convention hack**, not real config: it splits filenames on `-` and assumes exactly 3 parts means `{parent}-{theme}-{mode}.json`. Keep collection/theme/mode names free of extra hyphens, or this heuristic misfires (it's also why `size-desktop compact.json` is safe — the space, not a hyphen, keeps "desktop compact" as one part).
- **`primitives`, `palette`, and `typography` tokens never appear directly in the resolved CSS files** (`colors.css`/`sizes.css`/`typography.css`/`{theme}-colors.css`/`{theme}-sizes.css`/`{theme}-typography.css`) — only `semantics`, `size`, and `typography` do there (see `encapsulationFilter`). `primitives` and `palette` *do* appear as their own building-block CSS files under `primitives/`, `palette/`, `size/`, `typography/` (see [§3b](#3b-building-block-css--mixing-primitivespalette-extensions-independently)), which is the supported way to consume a raw primitive/palette value or a custom typography scale directly. Resolved JSON tokens include all types, fully resolved into their final values.
- **`raw-tokens.json` and the per-mode `dtcg-tokens/*.json` files are checked into git**, so a `fetch`+`convert` from a stale or wrong `FIGMA_FILE_KEY` will show up as a large, confusing diff. Diff `tokens/raw-tokens.json` first if a sync produces unexpected changes.
- **Building-block files (`:root`-scoped, not class-scoped)** — loading two `primitives/*.css` (or two `palette/*.css`, etc.) on the same page silently collides; last one wins. Pick exactly one of each per page.
- **Building block warnings** — Style Dictionary logs benign "filtered out token references" warnings when building layers that use `var()` references. Expected, not an error.

## Common tasks

- **Add a token:** add to Figma collection, then `npm run sync:tokens`.
- **Add a breakpoint mode:** add to Figma, update `modes.breakpoint` in `config.json`, update `breakpoints.ts` if needed, then `sync:tokens`.
- **Add a theme (e.g., second brand):** create an extension collection in Figma that overrides `palette`/`primitives`/`size`/`typography`, run `sync:tokens`. `build-tokens/index.ts` auto-discovers it and emits `{theme}-colors.css`, `{theme}-sizes.js`, etc.
- **Update font weights or px patterns:** edit `config.json`, then `sync:tokens`.
- **Rotate Figma PAT:** update `FIGMA_PERSONAL_ACCESS_TOKEN` in `.env`.
