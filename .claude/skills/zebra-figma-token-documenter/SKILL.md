---
name: zebra-figma-token-documenter
description: Update the token documentation on the Figma Tokens page, one frame per collection and mode, inside the page's fixed section layout. Covers Primitive, Palette, Semantic, Companion, Target, Typography and Sizes, tracks what changed between versions, and reports colour tokens whose descriptions are missing or repeated. Use whenever the user wants to document tokens in Figma, refresh the Tokens page, rebuild colour, typography or size frames, see what tokens changed, or audit token descriptions, including after a token export.
---

# Figma Token Documenter

Keeps the Tokens page of the Zebra file in step with the live variables. Every value on a frame is read from Figma or the token export, never typed by hand, so a frame can't drift from the tokens it documents.

- **Page:** `7819:31376`, file `hvRmnZZOZrmTW0wf8hbrt5`
- **Output:** frames named `Docs / …`, rebuilt in place. A frame keeps its node id, section and position.

## The page structure is fixed

The designer owns this layout. Keep it. Left to right, under large headings:

| Heading | Section | Holds |
|---|---|---|
| Typography | `Typography` | `Docs / Typography` |
| Sizes | `Sizes` | `Docs / Sizes` |
| Colors and Modes | `Base Theme: AA Light` | `Docs / Primitive`, `Docs / Palette / Light`, `Docs / Semantic / Light` |
| | `AA Dark` | `Docs / Palette / Dark`, `Docs / Semantic / Dark` |
| | `AAA Light` | `Docs / Palette / AAA Light`, `Docs / Semantic / AAA Light` |
| | `AAA Dark` | `Docs / Palette / AAA Dark`, `Docs / Semantic / AAA Dark` |
| Extended Collections | `Extensions` | `Extensions Row`: `Docs / Companion`, `Docs / Target`, then "How to use extensions" |

`Docs / Parts`, below the page, holds `_Token Card` and `_Token Swatch`, the components the frames use.

**Spacing:** one value, 160, everywhere: section padding, gaps between frames, gaps between sections, and heading to section. Every section is the same height, set by the tallest frame, and every frame starts at the same top edge. The `fit` step enforces this, and changes nothing on a page that's already right, so run it last every time.

**Rules:**

- **Only rebuild what's inside a `Docs /` frame.** Headings and section names are written by hand, so never rewrite them.
- **"How to use extensions" is a guide, not a generated frame.** It's a single column that the designer edits. Leave its wording alone, and don't bring back anything they removed, such as the Modes table. When a theme is added, add it to "Choosing the right collections" and "The same token in each theme".
- **A brand takes all of its collections.** A palette token inherits any change to its primitive, so Target needs both target collections set, in Figma and on every grid. `applyBrand()` does this. Tokens that change only by inheritance get their own "Inherited in Palette" sections, in every mode.
- **Everything is internal except the Zebra logo.** Colours, spacing, radius, text styles and components all come from this file. Replace anything external with its local equivalent, and report anything that has none. The page headings are the one literal, at 260: no size token reaches that, so only their colour, family and weight are bound.
- **New themes expand Extensions.** A brand or theme frame goes in `Extensions Row`, ahead of "How to use extensions", and `fit` widens the section. Don't add a new section or heading for one.
- **Nothing else is added to the canvas.** Changes and audit results go in `tokens/_docs/` and your report, because the designer removed the panels.
- **No templates remain.** A new frame is cloned from `Docs / Typography`, and placed by `HOME` in the script.
- **If the layout has changed, follow it.** Re-read the page before building, then update this file and `SECTIONS`, `HEADINGS` and `HOME` to match, and say so in your report. The page wins over this file.

## Each frame

| Frame | Shows |
|---|---|
| `Docs / Primitive` | Colour ramps as swatches |
| `Docs / Palette / <Mode>`, `Docs / Semantic / <Mode>` | Cards, in that mode |
| `Docs / Companion`, `Docs / Target` | Only what the brand overrides |
| `Docs / Typography` | Text styles with Compact and Condensed values |
| `Docs / Sizes` | Size tokens per breakpoint, plus Condensed and the scale |

## Workflow

### 1. Export first

Run **zebra-figma-token-export**. The audit reads `tokens/_dump/`, so an old export produces an old report.

### 2. Compare and audit

```bash
python3 .claude/skills/zebra-figma-token-documenter/scripts/audit-tokens.py tokens
```

This writes nothing to Figma. It prints the counts and the frames to rebuild, and writes:

| File | Holds |
|---|---|
| `tokens/_docs/audit.md` | The full report |
| `tokens/_docs/status.json` | The next version and the `rebuild` list |
| `tokens/_docs/snapshot.json` | What is documented now, updated in step 5 |
| `tokens/_docs/changelog.md` | One entry per version, updated in step 5 |

Changes are matched by variable id, so a rename is one rename and not an add plus a remove. If nothing changed and the frames exist, stop and report that. `rebuild` already includes frames that resolve through a change: a new primitive value changes the hex text on Palette, Semantic and both brands.

### 3. Build

Read `scripts/build-docs.js`, set `INPUT`, and pass the whole file as `code` to `use_figma` with `skillNames: "figma-use,figma-generate-design"`. Load **figma-use** and **figma-generate-design** first.

`steps` runs in order:

```
primitive
palette:Light          also Dark, AAA Light, AAA Dark
semantic:Light         also Dark, AAA Light, AAA Dark
extension:companion    any brand or theme, by its collection name
extension:target
typography
size
fit                    always last
```

Set `version` and `updated` from `status.json`. Build only the frames in `rebuild`.

**Run calls one at a time, never in parallel.** Two large calls at once dropped the Figma connection and lost both results. Keep each call to about two frames: a Semantic frame alone is roughly 200 cards. If a call is lost, read the page before retrying, because a rebuild is safe but an assumption isn't.

To avoid resending 25KB per call, wrap the script body in `const main = async function (INPUT) { … }`, store `main.toString()` with `figma.root.setSharedPluginData("zebra_docs", "builder", …)` in the first call, and `eval` it in later ones. Clear that key when you finish, and copy any fix back into `build-docs.js`.

### 4. Check

- **Against the export.** Download the file over REST and compare each card's hex and alias path with `tokens/_dump/`. Don't compare against what the builder resolved, because that only proves it agrees with itself. Sizes rows compare the same way.
- **By eye.** Screenshot one frame of each kind, including a Dark one and a brand. A value check can't see an invisible heading.
- **The structure.** Record each frame's parent and position before the build, and compare afterwards. Measure the gaps too: all of them should be 160, including inside `Extensions Row`, because a wrapper hides its children from a top-level scan.
- **External items.** Scan every node for remote variables, remote styles, remote components and unbound solid paints. Only the Zebra logo may remain.
- **Rendered colour.** Look at each brand's swatches next to their hex text. Text is computed and a swatch is rendered by Figma, so they can disagree when a mode is missing, and comparing text with the export can't show that. Check each card's stored fill against its hex too.
- **Base colours.** A correct binding can still render wrong, so compare each frame and section paint's stored colour with its resolved value. A token scan can't see this.

### 5. Record it

Only after the frames pass:

```bash
python3 .claude/skills/zebra-figma-token-documenter/scripts/audit-tokens.py tokens --mark
```

This saves the snapshot and adds the changelog entry. Marking before the frames are right hides those changes from the next run.

### 6. Report

Say what changed, which frames were rebuilt, and the audit counts. Point at `tokens/_docs/audit.md` for the full lists.

## The audit

For colour tokens in `primitives`, `palette` and `semantics`:

- **Not added:** tokens with an empty description.
- **Repeated:** one description on more than one token in a collection. Often a copy that was never rewritten, such as `status/ghost/default` described as "Info color".

Primitive ramps are listed by group, because naming all 194 steps tells a reader nothing. Size descriptions are checked for a stated px value or scale step that no longer matches.

Report these and leave them. Descriptions are design content: only change them in Figma when asked. When asked, write one short line on what the token is used for, never its colour, and check real use first: the components that read it, or the semantic tokens that alias it. Avoid apostrophes, because Figma stores them as `&#39;`. The full lists are in `tokens/_docs/audit.md`, and your report gives the counts and the worst cases.

## Things that went wrong, so you don't repeat them

- **`resolveForConsumer` returns null under an extension mode.** Follow the override's alias chain instead, as `follow()` does.
- **An alias at an opacity arrives as `{ color: alias, opacity }`,** not as a plain alias. `aliasOf()` handles both.
- **Setting one brand collection isn't enough.** With only target palette set, Target's cards said `#CC0000` and drew the base indigo, and the text check passed.
- **The mode goes on the card grid, not the section.** On the section, the heading follows the mode and vanishes on a light frame.
- **A bound paint keeps its base colour on a frame or section.** Bind with `framePaint()`, or it can render black, or light in a dark section.
- **Frames came from a template on a remote library,** and some of those variables are deleted. `localise()` moves each rebuilt frame onto local tokens by measured value, and leaves library instances alone.
- **Frames live inside sections.** `findChild` on the page misses them and would create duplicates. Use `doc()`.
- **`setPluginData` and `clientStorage` aren't supported in `use_figma`.** `setSharedPluginData` is.
