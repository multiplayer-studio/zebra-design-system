# Filter Chip

Lets someone narrow a set of content by switching criteria on and off, such as categories in a list of results. Use them in groups where more than one can be on at once. Reach for an assist chip when the control triggers an action rather than a filter.

Source: [Chip page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5122-2783) · component set `5126:3677` · extracted 2026-10-20 · 16 variants · default `State=default, disabled=false, Rounded=true, active=false`

> **No blockers, 3 warnings.** See [Issues](#issues). One of four chips on the Chip page, each with its own board and metadata frame (see also [input-chip](../input-chip/input-chip.spec.md), [status-chip](../status-chip/status-chip.spec.md), [assist-chip](../assist-chip/assist-chip.spec.md)).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `label` | string | | `Label` | label |
| `active` | boolean | true, false | `false` | root, check, label |
| `state` | enum (interaction) | `default`, `hover`, `focus`, `selected`, `dragged` | `default` | root |
| `disabled` | boolean | true, false | `false` | root, label |
| `rounded` | boolean | true, false | `true` | root |

**label**: "The criterion the chip switches. Name the filter, not the result. A chip reading Show only items in stock is doing a sentence's work."

**active**: false: "The filter is off and the chip shows its label alone." · true: "The filter is on. This is the real switch for a filter chip, and the only value that both adds the check mark and flips to the inverse palette. Built only alongside State=default and State=focus, so an active chip has no hover or dragged appearance."

**state**: default: "The resting chip, and where placed instances should stay." · hover: "Pointer over the chip." · focus: "Keyboard focus, and the only state carrying a visible outline." · selected: "A second way to show a chosen chip, separate from active. It darkens the background without adding the check mark, so a row mixing selected and active will not read consistently. Prefer active until that overlap is resolved." · dragged: "The chip while it is being moved, for filter rows that can be reordered. It reuses the pressed background rather than carrying a token of its own."

**disabled**: false: "The usual case." · true: "The criterion cannot be switched right now. Say why nearby, because the chip itself gives no other clue."

**rounded**: true: "Match the contour of the controls around the filter row rather than deciding per chip." · false: "The square-cornered pairing, for surfaces built from sharp controls."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

None. The check mark is fixed to `check-mark` and appears only with `active`.

## Anatomy

1. **Chip (root)**: "The component frame. A horizontal auto-layout hugging its content at a fixed height." Horizontal, cross-axis centred. Padding `space/md` left/right; `space/sm` top/bottom when inactive, `space/xs` when active. Gap `space/xs` inactive, `space/sm` active. Width hugs; height fixed and unbound (32Px measured, see issues). Radius `radius/pill` (rounded) or `radius/none`. Fill `interactive/neutral/background/default`; border `interactive/neutral/border/default` at `stroke/thin`, inside.
2. **Check mark**: "The leading icon, present only when active is true. It is what makes the on state readable without colour." Glyph `check-mark` (rounded family), Icon Size=small pinned (16Px). Colour is `currentColor`, following the label.
3. **Label**: "The criterion itself, and the only content the chip takes." Text `indicator/medium`, colour `interactive/neutral/foreground/default`, cap-height leading trim.

## Variants

16 of 40 combinations built. Rounded swaps the radius only (`radius/pill` / `radius/none`).

| active | state | disabled | root fill | root border | label colour | width (measured) | node |
|---|---|---|---|---|---|---|---|
| false | default | false | interactive/neutral/background/default | interactive/neutral/border/default @ stroke/thin, inside | interactive/neutral/foreground/default | 56Px | `5126:3678` |
| false | hover | false | interactive/neutral/background/hover | same | same | 56Px | `5126:3682` |
| false | focus | false | interactive/neutral/background/focused | focus/outline @ stroke/thick, outside | same | 54Px | `5126:3690` |
| false | selected | false | interactive/neutral/background/selected | interactive/neutral/border/default @ stroke/thin, inside | same | 56Px | `5161:4401` |
| false | dragged | false | interactive/neutral/background/pressed | interactive/neutral/border/default @ stroke/thin, inside | same | 56Px | `5161:4412` |
| false | default | true | interactive/neutral/background/disabled | none | interactive/neutral/foreground/disabled | 54Px | `5126:3686` |
| true | default | false | interactive/inverse/background/selected | interactive/inverse/border/pressed @ stroke/thin, inside | interactive/inverse/foreground/default | 80Px | `5161:4390` |
| true | focus | false | interactive/inverse/background/selected | focus/outline @ stroke/thick, outside | interactive/inverse/foreground/default | 78Px | `5161:4380` |

Active rows also show the check mark and switch to gap `space/sm`, vertical padding `space/xs`.

## Subcomponents

No on-page private subcomponents. Library dependency: **Icon** (`2046:15010`), see [specs/icon](../icon/icon.spec.md); glyph `check-mark`.

## Tokens & theming

- **Colour:** interactive/neutral/background/default, interactive/neutral/background/hover, interactive/neutral/background/focused, interactive/neutral/background/selected, interactive/neutral/background/pressed, interactive/neutral/background/disabled, interactive/neutral/border/default, interactive/neutral/foreground/default, interactive/neutral/foreground/disabled, interactive/inverse/background/selected, interactive/inverse/border/pressed, interactive/inverse/foreground/default, focus/outline
- **Dimension:** space/xs, space/sm, space/md, radius/pill, radius/none, stroke/thin, stroke/thick
- **Typography:** indicator/medium
- **Glyphs:** check-mark

Theme axes (from tokens/manifest.json): palette Light / Dark; size Desktop / Mobile / Tablet / Desktop Compact; typography Desktop / Tablet / Mobile / Desktop Compact. Extensions: companion (palette), target (primitives, palette), condensed (typography, size). All names resolve in `tokens/base`.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | — | — | interactive/neutral/background/default behind a 1px inside border in interactive/neutral/border/default. |
| hover | Pointer over the chip | — | Background moves to interactive/neutral/background/hover. Nothing else changes. |
| focus | Keyboard focus | — | Background moves to interactive/neutral/background/focused and the border becomes 2px focus/outline drawn outside the chip. |
| selected | State set to selected | — | Background moves to interactive/neutral/background/selected. Border and label are unchanged and no check mark appears. |
| dragged | Chip being reordered | — | Background moves to interactive/neutral/background/pressed, the same token a pressed state would use. |
| disabled | disabled set to true | — | Background becomes interactive/neutral/background/disabled, the label drops to the disabled foreground, and the border is removed. |

- **Motion:** "Figma stores no timing and no transition is authored. Turning a filter on is a flat swap of fill, text colour and the presence of the check mark."
- **Turning on:** "active is what switches the filter. It replaces the neutral palette with interactive/inverse and inserts a leading check mark, which also changes the chip's vertical padding and its gap."
- **Coverage:** "Sixteen of the forty possible combinations are built. active=true exists only with State=default and State=focus, so hovering or dragging an active chip is not drawn."

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. The only text the chip takes. |
| Selected Icon | nested Icon, present when active is true | An Icon at Size=small swapped to Check Mark, inserted before the label. It is not a slot and carries no property of its own on the chip. |
| Trailing content | not provided | There is no trailing slot. A filter chip cannot carry a count or a remove control without detaching. |

## Usage

**Do**
- Use active to turn a filter on. It is the only value that both recolours the chip and shows the check mark.
- Keep filter chips in a group where more than one can be on. A single chip that toggles is usually a switch or a checkbox.

**Don't**
- Don't mix State=selected with active in one row. They are two different ways to look chosen and they do not match.
- Don't rely on the colour flip alone for the on state. The check mark is what carries it.

## Accessibility

- An active chip carries a check mark as well as the inverse palette, which is what keeps the on state readable without colour. Do not remove it.
- State=selected shows a chosen chip through colour alone with no check mark, so it fails that test. Prefer active.
- Focus is the only state with a visible outline and it is drawn outside the chip, so check it is not clipped by a scrolling filter row.
- Each chip is an on and off control. Expose a pressed or checked state, not just a label.
- The label uses indicator/medium at 12px over a 14px line. Check it against the inverse palette as well as the neutral one.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | "32 tall across all sixteen variants. Width hugs the label, plus the check mark when active." |
| Padding | Per active | "space/md left and right throughout. Vertically space/sm when active is false and space/xs when it is true, because the 16px check is taller than the label." |
| Gap | Per active | "space/xs when active is false, space/sm when true." |
| Radius | Per Rounded | "radius/pill when true and radius/none when false." |
| Fill | Per state | "interactive/neutral/background at default, hover, focused, selected and disabled, with pressed reused for dragged. active=true overrides all of it with interactive/inverse/background/selected." |
| Border | Per state | "1px inside interactive/neutral/border/default at rest. Focus swaps to 2px focus/outline drawn outside. active=true uses interactive/inverse/border/pressed. Disabled carries none." |
| Label | Theming | "indicator/medium, IBM Plex Sans Medium 12 over a 14px line, in interactive/neutral/foreground/default, dropping to the disabled token and flipping to interactive/inverse/foreground/default when active." |

Visual reference: [component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5126-3677) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5689-430) · [active](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4390) · [active focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4380) · [selected](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4401)

## Issues

**Warn**
- **selected overlaps active.** Two ways to look chosen; the metadata says prefer active. Model only `active` (a pressed/checked toggle) in code until design resolves it.
- **Missing combinations.** No hover, dragged or disabled for an active chip; no disabled hover/focus. Decide in code.
- **Height is raw.** Fixed 32px with no token in all 16 variants (Input Chip binds `control/target-min`). Hug in code or add a token.

**Note**
- The inside border counts in layout and the outside focus border doesn't, so focus and disabled are 2px narrower (56 → 54 measured). Keep borders out of layout in code.
- The label uses cap-height leading trim (8px text box against a 14px line).
- Disabled variants have no stroke (strokeAlign left at CENTER), so missing stroke-weight bindings there are expected.
- No trailing slot and no leading slot beyond the check mark.
- No duplicate among existing specs; Checkbox and Switch cover single toggles.
