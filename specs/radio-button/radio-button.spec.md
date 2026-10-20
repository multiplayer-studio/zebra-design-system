# Radio Button

A circular control for choosing exactly one option from a set, with an optional text label beside it. Every option in the set shares a group and exactly one carries Checked at a time. A short, fixed list of mutually exclusive options is what it fits, a long or growing list is better served by a dropdown.

Source: [Radio Button page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3843-2543) · component set `4294:3121` · extracted 2026-10-15 · 14 variants (Checked × State × Size = 16; the two checked + disabled variants aren't built) · re-extracted the same day: ghost fill removed, medium ring height bound

> **One blocker:** a disabled radio can't show whether it's chosen. See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `checked` | enum | `false`, `true` | `false` |
| `state` | enum | `enabled`, `hover`, `focus`, `disabled` | `enabled` |
| `size` | enum | `medium`, `large` | `large` |
| `hasLabel` | boolean | | `true` |

**checked**
- `false`: The option is not the one currently chosen in its group. The inner fill stays hidden in every interactive state.
- `true`: The option is the one currently chosen in its group. Only one Radio Button in a group carries this at a time.

**state**
- `enabled`: Resting and interactive. Ring colour follows Checked, the inner fill is hidden when unchecked and shown when Checked. The default.
- `hover`: Pointer over the control. Ring colour steps to its hover tone for both Checked and unchecked, the inner fill’s visibility does not change.
- `focus`: Keyboard focus. A second ring is drawn around the control at the same colour as the inner ring, the inner fill keeps whatever visibility Checked already gives it.
- `disabled`: Not interactive. Ring and inner fill both move to their disabled tones. Ships only in its unchecked form, a chosen option that becomes disabled has no variant of its own.

**size**
- `large`: 24px ring, 12px inner fill when Checked. The default.
- `medium`: 16px ring, 8px inner fill when Checked. The surrounding touch target and the label’s type size stay the same, only the circle itself changes.

**hasLabel**
- `true`: Shows a text label beside the control, as a separate element rather than part of the circle itself. The default.
- `false`: Removes the label, leaving only the circular control at a fixed 40 by 40 size. The option’s meaning then has to be communicated some other way nearby.

In code, `hover` and `focus` come from the pointer and keyboard, `disabled` is a prop, and `checked` is a boolean normally owned by the group.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes, measurements suffixed `Px`, and the issues.

## Content inputs

**Label:** the text is consumer owned (sample "Label") and isn't a text property in Figma.

## Anatomy

The root is a horizontal row: gap `space/none`, padding `space/none`, centred, hugging its content (`measuredSizePx` 75 × 40 with a label).

- **target:** a 40 × 40 touch target bound to `control/target-min`, with the ring centred in it.

1. **Ring:** "A circular frame with a stroke, sized by Size and coloured by Checked and State together." Radius `radius/pill`, stroke `stroke/thick` drawn inside, colour per the table below. It has no fill. Padding is `space/xs` at large and `space/2xs` at medium.
2. **Inner fill (dot):** "A separate circular layer centred inside the ring, hidden when unchecked in every state except disabled." An ellipse, coloured per the table.
   - **focusRing:** on focus, a `border/focus` ring at `stroke/thick` directly around the ring, with no gap. It's built two ways in Figma (see issues); in code it's one outline with offset 0.
3. **Label:** "Plain text beside the touch target, consumer owned and fixed in type size across both sizes." Type `label/medium`, colour `foreground/primary`, or `foreground/disabled` when disabled. Visible when `hasLabel`.

## Variants

**Size**

| size | ring (`Px`) | inner fill (`Px`) | ring padding | token the ring size matches |
|---|---|---|---|---|
| medium | 16 | 8 | `space/2xs` | `control/icon-sm` (height bound outside focus; width unbound) |
| large | 24 | 12 | `space/xs` | `control/xs` (unbound) |

The touch target (`control/target-min`), the ring stroke (`stroke/thick`) and the label type (`label/medium`) are the same at both sizes.

**Checked × State**

| checked | state | ring stroke | inner fill | focus ring | label |
|---|---|---|---|---|---|
| false | enabled | `interactive/selection/border/default` | hidden | — | `foreground/primary` |
| false | hover | `interactive/selection/border/hover` | hidden | — | `foreground/primary` |
| false | focus | `interactive/selection/border/default` | hidden | `border/focus` | `foreground/primary` |
| false | disabled | `interactive/selection/border/disabled` | **shown**, `interactive/selection/background/disabled` (see issues) | — | `foreground/disabled` |
| true | enabled | `interactive/selection/border/pressed` | `interactive/selection/background/pressed` | — | `foreground/primary` |
| true | hover | `interactive/selection/border/hover` | `interactive/selection/background/hover` | — | `foreground/primary` |
| true | focus | `interactive/selection/border/pressed` | `interactive/selection/background/pressed` | `border/focus` | `foreground/primary` |
| true | disabled | **not built** | | | |

## Subcomponents

None.

## Tokens & theming

- **Color:**
  - `interactive/selection/border/{default,hover,pressed,disabled}`
  - `interactive/selection/background/{hover,pressed,disabled}`
  - `border/focus`, `foreground/{primary,disabled}`
  - `foreground/{tertiary,secondary}`, on the hidden inner fill only
- **Dimension:** `control/{target-min,icon-sm}`, `space/{none,2xs,xs}`, `radius/{none,pill}`, `stroke/thick`
- **Typography:** `label/medium`

Every token resolves in `tokens/`.

Theme axes:
- **palette:** Light, Dark
- **size** and **typography:** Desktop, Mobile, Tablet, Desktop Compact
- **extensions:** companion, target, condensed

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| enabled | Resting | — | Ring colour follows Checked. Unchecked rings use the default border tone, Checked rings and the inner fill both use a stronger tone. The inner fill is hidden entirely when unchecked rather than drawn in a lighter shade. |
| hover | Pointer over the control | — | Ring colour steps to its hover tone for both Checked and unchecked. The inner fill’s visibility does not change with hover, it stays tied to Checked. |
| focus | Keyboard focus | — | A second ring is drawn around the control, independent of the inner ring, both using the same focus colour. The inner fill keeps whatever visibility Checked already gives it. |
| disabled | Disabled set to true | — | Ring and inner fill both move to their disabled tones. The inner fill is visible here even though the variant is unchecked, unlike every other unchecked state, where it is visible only when Checked. |

| Type | Description |
|---|---|
| Motion | No transition is defined. Every state change is a colour and visibility change, except Focus, which adds a second ring rather than altering the existing one. |
| Resize | Removing the label collapses the control to its 40 by 40 touch target, nothing else in the layout shifts position. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | Plain text | Consumer owned. Positioned directly beside the touch target with no gap token between them, at a fixed type size that does not change with Size. |

## Usage

**Do**
- Give every option in a set its own Radio Button sharing a group, with exactly one Checked at a time.
- Pair Checked with a label that states the option in full, the control alone does not say what is being chosen.

**Don't**
- Don’t leave more than one Radio Button in the same group Checked at once, the control is built for a single choice.
- Don’t reach for Radio Button for a single standalone yes or no choice, Checkbox or Switch fits that better.

## Accessibility

- Grouping, the relationship that makes exactly one option in a set selectable, is not something Figma represents, it is carried by whatever groups the instances in code. Focus here is the only visual record of keyboard interaction, pair it with a label so the option reads on its own.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Touch target | 40×40, fixed | Does not change with Size, both ring sizes sit inside the same touch target. |
| Ring | 24px at Large, 16px at Medium | A 2px stroke at both sizes, drawn on a frame with a 9999 corner radius rather than an ellipse shape. |
| Inner fill | 12px at Large, 8px at Medium | A separate circular layer rather than a change to the ring’s own fill. |
| Gap | 0, no token | The label sits directly against the touch target’s edge with no spacing token between them. |
| Type | 16px at both sizes | Does not change between Large and Medium, only the ring and inner fill do. |

## Visual reference

No images are stored. Pull a fresh shot from these links:
[component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3121) ·
[metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6079-33) ·
unchecked: [enabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3122) ·
[hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3133) ·
[focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3127) ·
[disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3149) ·
checked: [enabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3138) ·
[hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3154) ·
[focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3143) ·
[medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3159)

## Issues

### Blocker

- **A disabled radio can't show whether it's chosen.** There's no checked + disabled variant, and the unchecked disabled variant shows the inner fill, so it looks checked. Build disabled-unchecked with the fill hidden, and add a disabled-checked look: `interactive/selection/border/disabled` ring with the dot in `interactive/selection/background/disabled`. Alternatively, confirm the intent in Figma.

### Warn

- **The focus colour is described wrongly.** The metadata says the focus ring matches the inner ring's colour, or that both use the focus colour. As built, only the outer ring is `border/focus`; the inner ring keeps its own colour.
- **The label size is stated wrongly.** The metadata says 16px, but `label/medium` resolves to 14. The text style wins.
- **The focus ring is built two ways.** Unchecked draws it inside a larger frame; checked draws it outside a ring-sized frame. Both end up in the same place, but they'd diverge if a stroke token changed.
- **One geometry outlier.** Medium + unchecked + hover has a 6.67 inner fill instead of 8 (hidden, so nothing renders differently). Medium + unchecked + focus has no inner-fill layer at all.
- **The ring is only partly bound.** The medium ring's height is bound to `control/icon-sm` in its five non-focus variants; its width isn't, and neither is bound in the medium focus variants or at large (24, which matches `control/xs`). The inner fills have no matching token.

### Note

- The hidden inner fill carries `foreground/tertiary` and `foreground/secondary` in states where it never shows.
- Checked uses the *pressed* tokens to mean "selected", the same as Switch.
- The ring's bindings show in only 10 of 14 variants because focus nests the ring one level deeper. The binding is the same in all 14.
- In code: a radiogroup with one tab stop, arrow keys to move, and a label associated with each input. Every enabled state meets 3:1 against the page in both modes; the lowest is the unchecked ring at 3.61 in Light.
- There's no invalid or required state. The set has no native description. No motion is defined.
