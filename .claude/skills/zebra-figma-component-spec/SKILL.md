---
name: zebra-figma-component-spec
description: Extract a technology-agnostic component spec from a Figma component page — public API, anatomy, variant deltas, token bindings by semantic name, subcomponent graph, and the behavior/usage intent from the page's "Component Metadata" frame — so the component can be rebuilt in any stack (a fresh library, a reskinned Base UI/Radix/MUI, React, Flutter, SwiftUI). Use whenever the user wants to recreate, rebuild, port, reskin, hand off or spec a Figma component, asks what a developer needs to build a component from Figma, wants the tokens or structure a component uses, or shares a Figma component-page link with any of those goals, even if they never say "spec". Read-only; companion to figma-component-metadata (that skill writes the intent, this one reads the page and produces the spec).
---

# Figma Component Spec

Turn one Figma component page into a spec a developer can implement in any technology without opening Figma. Three sources are merged:

1. **Structure**: the master component set and every on-page subcomponent, read through the Plugin API.
2. **Tokens**: every variable the component binds, named. Values live in the token export, never in the spec.
3. **Intent**: the "Component Metadata" frame (what it does, property breakdown, states, behavior, content & slots, anatomy, how to use, accessibility, layout & theming).

Structure and tokens say *what* to build. Intent says *when and why*. The spec needs both, and the cross-check between them is where most of the value is.

## Principles

- **Read-only.** Never write to the Figma file. Every script here only reads. Problems found go in the spec's `issues`, not into fixes on the canvas.
- **Ground everything in the page.** Use only the component's own Figma page. Never fill gaps from a codebase or from another library's same-named component. If something isn't on the page, it's a gap, not a guess.
- **Only the component.** The spec covers the component sets and their metadata. Stray instances, test frames and other loose elements on the page are ignored, not noted in `issues`.
- **Copy intent verbatim.** Metadata text goes into the spec as authored. Do not paraphrase, summarize or "improve" it.
- **Tokens, not values.** Every visual value is expressed as a token name and nothing else — `interactive/primary/background/default`, not `#1f69ff`, and not `{token, resolved}`. Resolved values belong to the token export, which is the one place they are allowed to live; duplicating them into the spec creates a second source of truth that goes stale the moment a palette changes. A raw value that has no token stays raw, and is reported as a gap — that is the only circumstance in which a literal appears in the spec.
- **Measurements are not values.** A rendered width, a box size or a variant count is an observation about the file, not a design decision to implement. Keep them when they help (a size table's rendered width is genuinely useful), but label them as observations and never present one where a token belongs.
- **Neutral vocabulary.** Parts are named by role (`ring`, `close`, `status`), and props get neutral camelCase names (`showClose`). No framework code, class names or component-library idioms.

## Icons are glyphs, not drawings

If the project has an icon font at `packages/icons/codepoints.json` (the
**zebra-figma-icon-font** skill builds it), then a Figma icon instance inside a
component is a **glyph name**, not artwork to re-export.

- An `INSTANCE_SWAP` whose default is an icon component resolves to a glyph
  name. Record the name (`arrow-forward`), not the Figma node, not an SVG.
  `codepoints.json` maps the Figma `setId` to the glyph, so the lookup is exact
  rather than a guess from the layer name.
- **Check the name is really in the font.** A Figma icon may have no glyph —
  ones drawn with strokes or on a non-square canvas are rejected by the font
  build and listed in `packages/icons/inventory.json`. A spec that names a glyph
  that does not exist produces an invisible icon at runtime, so a missing one is
  a `blocker`, and the fallback (inline SVG for that icon) belongs in `issues`.
- **Icon colour is not a token on the parent.** A font glyph takes
  `currentColor`. Where the metadata says the icon follows the label, that is
  satisfied by the font, and the spec should say so rather than inventing a
  per-flavour icon colour token.
- **Icon size is not a token on the parent either**, unless the parent really
  binds one. It is usually the nested Icon's own size variant, which the parent
  pins. Say which.
- The style axis (`Style=rounded` / `Style=sharp`) is a **font family**, not a
  different glyph: both families share codepoints. Record which family the
  component pins and to what.

Without an icon font in the project, treat icon instances as ordinary
subcomponents and note that the spec assumes SVG delivery.

## The token folder comes first

Before extracting anything, look for a token export at `tokens/manifest.json` (the **zebra-figma-token-export** skill writes it; the path may differ, so check the project).

**If it exists**, it is the component's token source of truth:

- Read `manifest.json` for the collections, their modes, and the extension graph. That is where the spec's theme axes come from.
- Reference every token by its Figma name. Do not copy values out of `tokens/` into the spec.
- The spec's `tokens` section lists the names the component binds and points at the files that define them. It does not restate them.
- **Do not write a `<slug>.tokens.json`.** It would duplicate `tokens/` and drift from it.
- Cross-check: every token the component binds must exist in the export. One that doesn't means the export is stale, the variable is remote, or the binding is broken — report it, don't paper over it.

**If it doesn't exist**, run `scripts/export-tokens.js` (step 4) and write `<slug>.tokens.json` beside the spec as the local stand-in, and note in `issues` that the component spec is carrying its own token copy because the project has no export yet.

Either way the spec itself holds names only.

## Before you start

- The Figma MCP must be connected. The scripts run through `use_figma`, so load the **figma-use** skill first (the tool requires it), and pass `skillNames: "figma-use"` on each call.
- From the URL `figma.com/design/<fileKey>/<name>?node-id=<a>-<b>`, take `fileKey` and `nodeId` = `<a>:<b>`. Any node on the component page works; so does the page itself.

## Running a script

Each file in `scripts/` starts with an `INPUT` block. Read the file, replace the placeholder values in `INPUT`, and pass the whole file as `code` to `use_figma`. Every script switches to the right page itself and returns JSON. Keep each result in context — later steps consume it.

**Do not write the raw script output to disk.** It is working material, not a deliverable: it duplicates the spec, it is lossy the moment a result is too large to save whole, and a folder that looks like authoritative raw data will eventually be trusted over the spec. Everything worth keeping ends up in `<slug>.spec.json`; how the extraction was sliced belongs in `component.source.extractionNote`.

## Workflow

### 1. Discover (`scripts/discover.js`)

Set `INPUT.nodeId`. It returns the page's top-level frames, every component set (public vs `_private`), the metadata frame, and a `guess` for the master set, subcomponents and metadata frame.

Confirm the guess against the page. The master is the public set whose name matches the page. Subcomponents are the other sets on the page, usually `_`-prefixed and in a "Subcomponents/<Name>" frame. If there's no metadata frame, continue anyway and note in `issues` that intent is missing.

### 2. Extract structure (`scripts/extract-structure.js`)

Run once for the master and once per on-page subcomponent. **Issue all of these calls in one message** so they run in parallel. Set `INPUT.setId` for each.

Each result contains:
- `api`: every Figma property with its type, default, options, and `controls` (which parts it shows, hides or fills). For VARIANT properties that change size, `optionsByRootWidth` gives the real order, because Figma stores options in creation order.
- `base`: the default variant's full node tree. Per part it records box, layout (direction, gap, padding, alignment, sizing), position (absolute plus constraints), radius, fills, strokes, effects, text, instance references and `tokens`.
- `deltas`: for every other variant, only what changed from `base`. `null` means the property was removed in that variant (for example `tokens: null` means the binding disappeared).
- `subcomponents`: every instance's main component, with where it's used and `remote: true` if it comes from a library outside this file.
- `usedVariableIds`, `usedStyleIds`: feed these to step 4.
- `gaps`: visual values with no token or style, tagged with their variant.
- `bindingDrift`: a token bound on a part in some variants but not others.

For large sets of sample content (a 40-photo library, placeholder names), rerun with `maxVariants: 3`. Such sets are content inputs, not API, so a sample is enough. Record the full count from `variantCount`.

Remote subcomponents (library icons, shared primitives) can't be extracted from this page. List them as external dependencies with their name and key.

### 3. Read intent (`scripts/read-metadata.js`)

Set `INPUT.frameId` to the metadata frame. It returns `sections` in reading order. Each section has `tables` (columns plus rows) and/or `blocks` (prose grouped by parent layer, so a "Do"/"Don't" label stays with its guidance). Continuation rows, like the `false` row under a boolean, inherit the property name and carry `_continuation: true`. A cell containing only an icon comes back as `[icon: <name>]`; in a "Default" column that marks the default row.

If the frame isn't built from the Button Metadata template (no "Component Name" heading layers), the script falls back to treating each child frame's first text as its heading. Check the result makes sense before relying on it.

### 4. Resolve the tokens

**If the project has a token export**, you do not run this step for values. Merge the `usedVariableIds` and `usedStyleIds` from every step-2 run, turn them into names (step 2 already reports the names), and check each one appears in `tokens/`. Take the theme axes from `tokens/manifest.json`. Then move on — the spec needs nothing else from here.

**Only if there is no export**, run `scripts/export-tokens.js` to produce a local `<slug>.tokens.json`. Merge the `usedVariableIds` and `usedStyleIds` from **every** step-2 run into one list, and run once. The script follows alias chains into other collections and adds every referenced variable. It returns:
- `tokens`: DTCG-style nested JSON (`$type`, `$value` as a `{dotted.alias}` or literal, `$description`). Under `$extensions["com.figma"]` it keeps the collection, scopes, codeSyntax, raw per-mode values, and `resolved`.
- `resolved`: the final literal for each theme context. In Figma, each collection's mode is chosen independently, so the keys name only multi-mode collections: `"palette=Light"`, `"palette=Dark"`, `"size=Mobile"`. `"default"` means the value never varies.
- `styles`: the text, effect and paint styles used, with their bound tokens.
- `collections`: mode names and defaults. Use these to describe the theming axes (light/dark, density, breakpoint).
- `descriptionDrift`: tokens whose description states a px value that doesn't match what they resolve to.
- `collisions`, `unresolved`: report these if they're non-empty.

### 5. Record where to look — don't store images

**Do not save screenshots.** Record deep links instead, under `visualReference`:

```
https://www.figma.com/design/<fileKey>/<name>?node-id=<a>-<b>
```

for the page, the component set, and one node per axis worth eyeballing (each size, each state, each flavour). Node ids come from `discover` and the step-2 `base`/`deltas`.

The reasoning, so you don't reintroduce them: colour and geometry are fully specified by token names, so a screenshot is a sanity check rather than a source of truth. A stored PNG also goes stale silently — it cannot tell you the component changed underneath it — whereas a link is always current. And a screenshot only shows what a variant happens to reveal: Button's icon-colour blocker was invisible in every one of its 405 variants, because they all hide their icon slots, and was found by reading bindings.

If someone needs a picture, `get_screenshot` on the recorded node id takes seconds and is guaranteed fresh.

### 6. Assemble the spec

Write the files described in `references/spec-schema.md`. Read that file now; it has the exact shape and a filled-in example. The mapping rules from Figma to neutral spec:

| Figma | Spec |
|---|---|
| VARIANT property | `enum` prop. Use `optionsByRootWidth` order when the options are sizes; otherwise keep Figma's order |
| BOOLEAN bound to a part's `visible` | Boolean prop, plus `visibleWhen` on that part |
| TEXT property bound to `characters` | String content prop on that part |
| INSTANCE_SWAP property | Slot, with its default and the subcomponent it expects |
| Nested instance varied only by swapping (the metadata says "swap the nested instance", no exposed property) | Record under `internalVariations`, with the options taken from the subcomponent's `api`. Don't promote it to a prop: whether it becomes one in code is the implementer's call. Surface it as a decision in `issues` |
| Set of sample content (photos, avatars, placeholder copy) | A content input (`src`, `label`) with the sample count. Never an enum of sample names |
| `INSTANCE_SWAP` holding an icon, where the project has an icon font | A glyph name from `packages/icons`, verified against `codepoints.json`. Not a node id, not an SVG |
| `position.mode: absolute` + constraints | `anchor` (MIN/MAX per axis → top-left, top-right, bottom-right…), `SCALE`/`STRETCH` → fills parent. Size and offset per variant come from `deltas` |
| Auto-layout | `layout` with gap and padding as token names. `sizing` FILL/HUG/FIXED → `fill` / `hug` / `fixed` |
| Solid paint with `token` | the token name alone. With no token → the raw value, plus an entry in `gaps` |

Build `variants` as a size (or style) table: one row per option, holding only the values that change, taken from `deltas`. That table is usually what a developer needs most.

### 7. Cross-check and report issues

Compare the sources and list every mismatch under `issues`, each with the source and severity (`blocker` = can't build faithfully, `warn` = can build but something is inconsistent, `note` = worth knowing):

1. **API vs Property Breakdown:** every Figma property appears in the metadata and vice versa, with the same options, and the default marked in the metadata matches the Figma default.
2. **Stated values vs extracted values:** px sizes, weights and token names quoted in the metadata (e.g. "24×24px", "2px (stroke/thick)") match `rootWidthByOption`, `deltas` and `tokens`.
3. **Token health:** every entry in `gaps`, `bindingDrift`, `descriptionDrift`, and any `unresolved` or `remote` variable.
3a. **Spec vs icon font:** every glyph name the spec uses exists and is not
   retired in `packages/icons/codepoints.json`, and none of them appears in that
   build's `rejected` list.
3b. **Spec vs token export:** every token named in the spec resolves in `tokens/`, and the spec contains no literal colour, px or font value outside `gaps` and the verbatim metadata. Grep the finished spec for `#`, `px` and bare numbers before declaring it done — a hex or a size outside an issue or a quoted metadata sentence is a bug in the spec, not in Figma. Numbers hide in three places worth checking by hand: a type style written as `label/medium (14/20)`, a measured `box`, and a paint-level `opacity`. Suffix every measurement `…Px` so the next reader can tell a measurement from a value at a glance.
4. **Dependencies:** subcomponents that are remote or missing from the page.
5. **Coverage:** metadata sections that are empty, missing, or say "none modeled" (motion, states), so the developer knows these are intentionally absent rather than forgotten.

Report issues; never fix them. Fixing belongs in Figma or in `figma-component-metadata`.

### 8. Output

Write to `specs/<component-slug>/` in the project if you're working in a project directory; otherwise use `/mnt/user-data/outputs/specs/<component-slug>/` and present the files:

```
specs/avatar/
├── avatar.spec.json     # the contract (schema in references/spec-schema.md)
├── avatar.spec.md       # the same spec, readable by a developer
└── avatar.tokens.json   # ONLY when the project has no tokens/ export; otherwise omitted
```

Two files, usually. No image folder and no raw-output folder: the first goes
stale silently and the second duplicates the spec while looking more
authoritative than it is.

Finish with a short summary in chat: parts, props, variants, subcomponents and tokens counted, then the blocker and warn issues. Keep it brief; the files hold the detail.
