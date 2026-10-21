# Status Chip

Shows a read-only state or attribute of an item, such as its progress or availability, so it can be scanned at a glance. It is not interactive and carries no states of its own. Use a filter or assist chip when someone needs to act on it.

Source: [Chip page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5122-2783) · component set `5126:3791` · extracted 2026-10-20 · 10 variants · default `Rounded=true, status=default`

> **No blockers, 4 warnings.** The main one: this chip duplicates [Status Label](../badges/status-label.spec.md). See [Issues](#issues). One of four chips on the Chip page, each with its own board and metadata frame (see also [input-chip](../input-chip/input-chip.spec.md), [filter-chip](../filter-chip/filter-chip.spec.md), [assist-chip](../assist-chip/assist-chip.spec.md)).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `label` | string | | `Label` | label |
| `status` | enum | `default`, `success`, `warning`, `negative`, `info` | `default` | root |
| `rounded` | boolean | true, false | `true` | root |

**label**: "The state being reported, in a word or two. The chip carries no icon, so the word does all the work and an abbreviation that only makes sense in context will not survive being scanned."

**status**
- `default`: "No particular standing, for an attribute that is a plain fact rather than good or bad news. Its background is currently an interactive hover token rather than a neutral surface, so it can read as something pressable."
- `success`: "A finished or healthy state. The label still has to name what succeeded, because the colour does not."
- `warning`: "Something needs attention but has not failed."
- `negative`: "A failed or blocking state. Reserve it for something that has to be dealt with, or it stops reading as urgent."
- `info`: "Neutral supporting information, where the other four would overstate it."

**rounded**: true: "Match the contour of the surface the chip sits on. This chip takes a gentler corner than the other three chip types, so a row that mixes them will not line up." · false: "The square-cornered pairing, for surfaces built from sharp controls."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

None.

## Anatomy

1. **Chip (root)**: "The component frame. A horizontal auto-layout hugging the label at a fixed height." Horizontal, cross-axis centred, gap `space/xs` (separates nothing), padding `space/xs` top/bottom and `space/sm` left/right. Hugs both ways (46×24Px measured). Radius `radius/element-sm` (rounded) or `radius/none`. A border bound to `interactive/neutral/border/default` at `stroke/base` never renders (see issues).
2. **Label**: "The status word. The only content, and the only part that names the state." Text `body/xsmall`, colour `interactive/neutral/foreground/default` on every status.
3. **Background**: "The status signal itself. It is the frame's own fill rather than a separate layer, which is why there is nothing to restyle independently."

## Variants

Complete grid, 10 of 10. Only the fill and the radius change.

| status | root fill | node |
|---|---|---|
| default | interactive/neutral/background/hover | `5126:3792` |
| success | feedback/success/background/subtle | `5194:5051` |
| warning | feedback/warning/background/subtle | `5194:5055` |
| negative | feedback/error/background/subtle | `5194:5060` |
| info | feedback/info/background/subtle | `5194:5065` |

| rounded | radius |
|---|---|
| true | radius/element-sm |
| false | radius/none |

## Subcomponents

None.

## Tokens & theming

- **Colour:** interactive/neutral/background/hover, feedback/success/background/subtle, feedback/warning/background/subtle, feedback/error/background/subtle, feedback/info/background/subtle, interactive/neutral/foreground/default, interactive/neutral/border/default (dead border)
- **Dimension:** space/xs, space/sm, radius/element-sm, radius/none, stroke/base (dead border)
- **Typography:** body/xsmall

Theme axes (from tokens/manifest.json): palette Light / Dark; size Desktop / Mobile / Tablet / Desktop Compact; typography Desktop / Tablet / Mobile / Desktop Compact. Extensions: companion (palette), target (primitives, palette), condensed (typography, size). All names resolve in `tokens/base`.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | The set declares no hover, focus, pressed or disabled axis. A status chip is a label, not a control. |
| status | The status axis | — | The only things that change across the ten variants are the background token and the corner radius. The label colour stays at interactive/neutral/foreground/default for all five statuses. |

- **Motion:** "Figma stores no timing and nothing transitions. A status chip is replaced when the underlying state changes rather than animated into a new one."
- **Not interactive:** "There is no state axis and no nested control. If the chip has to be clicked, it is the wrong component."

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. The only content the chip takes. |
| Leading icon | not provided | There is no icon slot. Status is carried by background colour and the word alone, which is why the word has to be explicit. |

## Usage

**Do**
- Keep the label to the state itself, such as Shipped or Overdue. The colour supports the word, it does not replace it.
- Use one status chip per item. A row of them turns a scannable attribute into a puzzle.

**Don't**
- Don't make a status chip clickable. It has no states, so it will not respond to hover or focus.
- Don't use status=default for a real status. Its background is an interactive hover token, so it reads as a control rather than a label.

## Accessibility

- Status is carried by background colour and the label. The label has to name the state in words, because the colour is not available to everyone.
- The label colour is the same token for all five statuses, so contrast varies with the background. Check interactive/neutral/foreground/default against each feedback background.
- The chip is not focusable and carries no role. If a screen reader should announce the status, it has to be associated with the item it describes.
- The label uses body/xsmall at 12px, the smallest text across the four chip types. Avoid reducing it further.
- status=default renders on an interactive hover background, which can read as a control that can be pressed.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | "24 tall across all ten variants, the shortest of the four chip types. Width hugs the label." |
| Padding and gap | Fixed | "space/xs top and bottom, space/sm left and right, with a space/xs gap that currently separates nothing because the label is the only child." |
| Radius | Per Rounded | "radius/element-sm when true and radius/none when false. The other three chip types use radius/pill in the same place." |
| Fill | Per status | "feedback/success, warning, error and info backgrounds for those four values. status=default uses interactive/neutral/background/hover, an interactive token rather than a surface." |
| Border | Dead | "A stroke bound to interactive/neutral/border/default sits on all ten variants at zero weight, so it never renders. Give it a weight or remove it." |
| Label | Theming | "body/xsmall at 12 over a 16px line, in interactive/neutral/foreground/default on every status." |

Visual reference: [component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5126-3791) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5689-626) · [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5126-3792) · [negative](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5194-5060)

## Issues

**Warn**
- **Duplicates Status Label.** [Status Label](../badges/status-label.spec.md) (Badges, `6403:297`) is the same read-only, non-interactive state word with five standings and the same four `feedback/*/background/subtle` fills. Status Label is richer: a border per status, an optional dot or icon, `body/small`, `radius/pill`, and `feedback/neutral/background/subtle` for neutral. Decide which survives before building both; if both stay, share one status→token map (success↔positive, default↔neutral).
- **default looks pressable.** It fills with `interactive/neutral/background/hover`. Status Label uses `feedback/neutral/background/subtle` for the same role.
- **Dead border.** Bound to `interactive/neutral/border/default` at `stroke/base`, which resolves to 0px. Omit it in code.
- **Stale token description.** `stroke/base` says "= 1px" but resolves to 0px.

**Note**
- One label colour on five backgrounds; check contrast per status in both palette modes.
- Gap separates nothing; height comes from padding plus the line, so it follows the size and typography modes.
- Radius (`radius/element-sm`) and label style (`body/xsmall`, Regular) differ from the other three chips.
- No interaction states by design; no motion.
