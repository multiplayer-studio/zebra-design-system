# Assist Chip

Offers a contextual action related to nearby content, such as adding an event to a calendar, when the action helps but is not the main task. Reach for a button when the action is the primary next step, and a filter chip when the control narrows content rather than doing something.

Source: [Chip page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5122-2783) · component set `5161:4423` · extracted 2026-10-20 · 12 variants · default `State=default, disabled=false, Rounded=true, active=false`

> **No blockers, 3 warnings.** See [Issues](#issues). One of four chips on the Chip page, each with its own board and metadata frame (see also [input-chip](../input-chip/input-chip.spec.md), [filter-chip](../filter-chip/filter-chip.spec.md), [status-chip](../status-chip/status-chip.spec.md)).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `label` | string | | `Label` | label |
| `showLeadingIcon` | boolean | true, false | `true` | icon |
| `state` | enum (interaction) | `default`, `hover`, `focus`, `selected`, `dragged` | `default` | root |
| `disabled` | boolean | true, false | `false` | root, label |
| `rounded` | boolean | true, false | `true` | root |

Figma also has an `active` axis with a single value (`false`); it is omitted (see issues).

**label**: "The action, phrased as a verb. An assist chip whose label names a noun reads as a filter or a tag instead."

**showLeadingIcon**: true: "Show the glyph naming the action's domain, which is what separates an assist chip from a filter chip at a glance. Keep it consistent across a row, because one chip without an icon among several with them looks misaligned rather than different." · false: "Text only, for an action with no settled icon. Prefer this to inventing one."

**state**: default: "The resting chip, and where placed instances should stay." · hover: "Pointer over the chip." · focus: "Keyboard focus, and the only state carrying a visible outline." · selected: "A chosen or sticky appearance. Worth questioning on a chip that performs an action, because an action does not usually stay selected afterwards." · dragged: "The chip while it is being moved. It reuses the pressed background rather than carrying a token of its own."

**disabled**: false: "The usual case." · true: "The action is unavailable. Say why nearby, because the chip itself gives no other clue."

**rounded**: true: "Match the contour of the controls around the chip rather than deciding per chip." · false: "The square-cornered pairing, for surfaces built from sharp controls."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Leading glyph** (via the nested Icon's Name swap): any glyph in `packages/icons`, default `star`. "An Icon at Size=small, shipped swapped to Star. The swap runs through the Icon's own Name property, so the glyph can be changed per instance, while visibility is the one thing the chip itself surfaces." Not a chip property in Figma; an `icon` glyph-name input is the natural shape in code.

## Anatomy

1. **Chip (root)**: "The component frame. A horizontal auto-layout hugging its content, carrying the fill and the border." Horizontal, cross-axis centred, gap `space/xs`, padding `space/sm` top/bottom and `space/md` left/right. Hugs both ways (76×34Px measured at rest). Radius `radius/pill` (rounded) or `radius/none`. Fill `interactive/neutral/background/default`; border `interactive/neutral/border/default` at `stroke/thin`, inside.
2. **Leading icon**: "The optional glyph naming the action's domain, present when Show Leading Icon is on." Glyph `star` by default (rounded family), Icon Size=small pinned (16Px). Colour is `currentColor`. Visible when `showLeadingIcon`.
3. **Label**: "The action itself, and the only text the chip takes." Text `indicator/medium`, colour `interactive/neutral/foreground/default`, cap-height leading trim.

## Variants

12 of 20 combinations built: `disabled=true` only with `state=default`. Rounded swaps the radius only (`radius/pill` / `radius/none`).

| state | disabled | root fill | root border | label colour | height (measured) | node |
|---|---|---|---|---|---|---|
| default | false | interactive/neutral/background/default | interactive/neutral/border/default @ stroke/thin, inside | interactive/neutral/foreground/default | 34Px | `5161:4424` |
| hover | false | interactive/neutral/background/hover | same | same | 34Px | `5161:4427` |
| focus | false | interactive/neutral/background/focused | focus/outline @ stroke/thick, outside | same | 32Px | `5161:4436` |
| selected | false | interactive/neutral/background/selected | interactive/neutral/border/default @ stroke/thin, inside | same | 34Px | `5161:4460` |
| dragged | false | interactive/neutral/background/pressed | interactive/neutral/border/default @ stroke/thin, inside | same | 34Px | `5161:4466` |
| default | true | interactive/neutral/background/disabled | none | interactive/neutral/foreground/disabled | 32Px | `5161:4433` |

## Subcomponents

No on-page private subcomponents. Library dependency: **Icon** (`2046:15010`), see [specs/icon](../icon/icon.spec.md); default glyph `star`.

## Tokens & theming

- **Colour:** interactive/neutral/background/default, interactive/neutral/background/hover, interactive/neutral/background/focused, interactive/neutral/background/selected, interactive/neutral/background/pressed, interactive/neutral/background/disabled, interactive/neutral/border/default, interactive/neutral/foreground/default, interactive/neutral/foreground/disabled, focus/outline
- **Dimension:** space/xs, space/sm, space/md, radius/pill, radius/none, stroke/thin, stroke/thick
- **Typography:** indicator/medium
- **Glyphs:** star (default)

Theme axes (from tokens/manifest.json): palette Light / Dark; size Desktop / Mobile / Tablet / Desktop Compact; typography Desktop / Tablet / Mobile / Desktop Compact. Extensions: companion (palette), target (primitives, palette), condensed (typography, size). All names resolve in `tokens/base`.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | — | — | interactive/neutral/background/default behind a 1px inside border in interactive/neutral/border/default. |
| hover | Pointer over the chip | — | Background moves to interactive/neutral/background/hover. Nothing else changes. |
| focus | Keyboard focus | — | Background moves to interactive/neutral/background/focused and the border becomes 2px focus/outline drawn outside. The chip is also 2px shorter than at rest, which looks like a drafting slip rather than an intended change. |
| selected | State set to selected | — | Background moves to interactive/neutral/background/selected. Border, icon and label are unchanged. |
| dragged | Chip being reordered | — | Background moves to interactive/neutral/background/pressed. |
| disabled | disabled set to true | — | Background becomes interactive/neutral/background/disabled, the label drops to the disabled foreground, the border is removed, and the chip is 2px shorter than at rest. |

- **Motion:** "Figma stores no timing and no transition is authored. Every state change is a flat swap of fill, border or text colour."
- **Action:** "Nothing in the set records what the chip does or what happens afterwards. An assist chip is a trigger, and the result belongs entirely to the implementation."
- **Coverage:** "Twelve of the twenty possible combinations are built. disabled appears only with State=default, and active offers a single value, so neither can be combined freely."

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. Phrase it as the action itself. |
| Leading Icon | nested Icon, toggled by Show Leading Icon | An Icon at Size=small, shipped swapped to Star. The swap runs through the Icon's own Name property, so the glyph can be changed per instance, while visibility is the one thing the chip itself surfaces. |
| Trailing content | not provided | There is no trailing slot. An assist chip cannot carry a count, a caret or a remove control without detaching. |

## Usage

**Do**
- Phrase the label as a verb. The chip is a thing to do, not a thing to pick.
- Keep Show Leading Icon consistent across a row. One chip without an icon among several with them looks misaligned.

**Don't**
- Don't reach for an assist chip when the action is the main one on the screen. That is a button.
- Don't use State=selected to mean an action has stuck. A chip that stays selected is usually a filter chip in disguise.

## Accessibility

- The chip is a control. It needs a button role and a name stating the action, not just the label text.
- Focus is the only state with a visible outline and it is drawn outside the chip, so check it is not clipped by a scrolling row.
- The leading icon sits next to the label and is decorative. If it ever carries meaning the label does not, that meaning has to be in text.
- Disabled chips lose the border and rely on fill and text colour alone. Check both against the surface behind them.
- The label uses indicator/medium at 12px over a 14px line. It is the action's only name, so it should not be shortened to an abbreviation.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | "34 tall at default, hover, selected and dragged, but 32 at focus and disabled. That 2px difference is unintended and makes a mixed row sit unevenly." |
| Padding and gap | Fixed | "space/sm top and bottom, space/md left and right, with a space/xs gap between the icon and the label." |
| Radius | Per Rounded | "radius/pill when true and radius/none when false." |
| Fill | Per state | "interactive/neutral/background at default, hover, focused, selected and disabled, with pressed reused for dragged." |
| Border | Per state | "1px inside interactive/neutral/border/default at rest. Focus swaps to 2px focus/outline drawn outside. Disabled carries none, and its strokeAlign is left at CENTER where every other variant is INSIDE." |
| Label | Theming | "indicator/medium, IBM Plex Sans Medium 12 over a 14px line, in interactive/neutral/foreground/default and dropping to the disabled token." |
| Leading icon | Fixed | "Icon at Size=small, 16 square." |

Visual reference: [component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4423) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5689-822) · [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4424) · [focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4436) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4433)

## Issues

**Warn**
- **Height jumps between states (cause found).** 34px at rest, 32px at focus and disabled. The root hugs vertically and its 1px inside border counts in layout; the outside focus border and the missing disabled border don't. Build 32 tall throughout with the border kept out of layout.
- **active has one value.** Copied from Filter Chip and unfinished; omitted from the API.
- **selected on an action chip.** The metadata questions it; leave it out of code until design confirms a use.

**Note**
- The glyph is reachable only through the nested Icon's Name swap; an `icon` input in code is the implementer's call. Default `star`.
- Disabled has no stroke and strokeAlign left at CENTER; missing stroke-weight bindings there are expected.
- The label uses cap-height leading trim (8px text box against a 14px line).
- No disabled hover/focus, no pressed state, no motion; the action's result belongs to the implementation.
- No duplicate among existing specs; Button covers the primary action.
