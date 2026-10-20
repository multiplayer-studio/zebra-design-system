# Checkbox

A square control for turning a single option on or off, with an optional label beside it. Checked carries three values rather than two, so a checkbox that summarises a set of others can say indeterminate instead of guessing between on and off. Reach for it wherever options are independent of each other, and reach for Radio Button where exactly one of a set has to win.

Source: [Checkbox page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6382-52) · component set `6384:207` · extracted 2026-10-15 · 24 variants (Checked × State × Size = 3 × 4 × 2, complete)

> **No blockers.** Four warnings, the main one a dark-mode contrast failure on checked hover. See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `checked` | enum | `false`, `true`, `indeterminate` | `false` |
| `state` | enum | `enabled`, `hover`, `focus`, `disabled` | `enabled` |
| `size` | enum | `medium`, `large` | `large` |
| `hasLabel` | boolean | | `true` |
| `label` | string | | `Label` |

**checked**
- `false`: The option is off. The box carries a border and no fill, which is the only state with nothing inside it.
- `true`: The option is on, shown by a check mark on a filled box.
- `indeterminate`: Some of what this control stands for is on and some is off. Reach for it on a parent that summarises other checkboxes, never as a third value a person can choose, because nothing cycles into it.

**state**
- `enabled`: Resting and interactive.
- `hover`: Pointer over the control. The border answers, and the fill answers too once checked.
- `focus`: Keyboard focus. A second ring is drawn at the box's own size, so the control stays exactly where it was.
- `disabled`: Not interactive. The mark stays visible, so a disabled checkbox still reports its value rather than hiding it.

**size**
- `large`: The default, and the right choice wherever the checkbox stands on its own.
- `medium`: For dense lists and table rows. The target does not shrink with it, so the control is no harder to hit.

**hasLabel**
- `true`: Shows the label beside the control. Keep it on, because the box carries no name and the target beside it is the part most people aim at.
- `false`: Leaves the control as the target alone. Only safe where something else already names the option, such as a column header in a table of rows.

**label**: Consumer owned, set through the Label property and sitting directly beside the target.

**Internal variation (not a prop):** the mark's glyph follows `checked`: `check-mark` for `true`, `remove` for `indeterminate`.

## Content inputs

None.

## Anatomy

| Part | Kind | What it is |
|---|---|---|
| `root` | container | Horizontal, gap `space/none`, padding `space/none`, hugs its content |
| `target` | container | Touch target. A fixed 40 square holding the box. It is the pressable area, and it supplies the space between the box and the label on its own. `control/target-min` square, centred, clips. |
| `focusRing` | container | Only at `state = focus`. A frame the box's size, stroke `border/focus` at `stroke/thick` aligned **outside**, same radius as the box. The box is nested inside it. |
| `box` | container | The square itself, carrying the border at every state and the fill once checked. The mark sits inside it rather than replacing it. Size `control/xs` / `control/icon-sm`; radius `radius/element-sm` / `radius/xs`; stroke `stroke/thick`, inside. |
| `mark` | Icon | Only when `checked` is `true` or `indeterminate`. Glyph `check-mark` or `remove`, rounded family. Colour `foreground/on-strong`; `foreground/disabled` when disabled. |
| `label` | text | The option's name, turned on by hasLabel and set through Label. It extends the area a person can aim at. `label/medium`, `foreground/primary` (`foreground/disabled` when disabled). |

## Variants

### Size

| size | box.size | box.radius | mark | measured box / mark |
|---|---|---|---|---|
| medium | `control/icon-sm` | `radius/xs` | Icon Size=small, scaled (unbound) | 16 / 12 Px |
| large | `control/xs` | `radius/element-sm` | Icon Size=medium | 24 / 20 Px |

Target (`control/target-min`), stroke (`stroke/thick`) and label (`label/medium`) do not change with size.

### Checked × State

Identical at both sizes.

| checked | state | box.stroke | box.fill | mark | label |
|---|---|---|---|---|---|
| false | enabled | `interactive/selection/border/default` | none | — | `foreground/primary` |
| false | hover | `interactive/selection/border/hover` | none | — | `foreground/primary` |
| false | focus | `interactive/selection/border/default` | none | — | `foreground/primary` |
| false | disabled | `interactive/selection/border/disabled` | none | — | `foreground/disabled` |
| true | enabled | `interactive/selection/border/pressed` | `interactive/selection/background/pressed` | check-mark, `foreground/on-strong` | `foreground/primary` |
| true | hover | `interactive/selection/border/hover` | `interactive/selection/background/hover` | check-mark, `foreground/on-strong` | `foreground/primary` |
| true | focus | `interactive/selection/border/pressed` | `interactive/selection/background/pressed` | check-mark, `foreground/on-strong` | `foreground/primary` |
| true | disabled | `interactive/selection/border/disabled` | `interactive/selection/background/disabled` | check-mark, `foreground/disabled` | `foreground/disabled` |
| indeterminate | enabled | `interactive/selection/border/pressed` | `interactive/selection/background/pressed` | remove, `foreground/on-strong` | `foreground/primary` |
| indeterminate | hover | `interactive/selection/border/hover` | `interactive/selection/background/hover` | remove, `foreground/on-strong` | `foreground/primary` |
| indeterminate | focus | `interactive/selection/border/pressed` | `interactive/selection/background/pressed` | remove, `foreground/on-strong` | `foreground/primary` |
| indeterminate | disabled | `interactive/selection/border/disabled` | `interactive/selection/background/disabled` | remove, `foreground/disabled` | `foreground/disabled` |

All three focus rows add the `border/focus` ring.

## Subcomponents

None on the page. Depends on the file's local **Icon** set (`2046:15010`), pinned to Size=medium (large box) or Size=small (medium box), Framed=false, Style=rounded. In code the mark is a font glyph from `packages/icons` (`check-mark`, `remove`, both present in `codepoints.json`); its colour is the box's content colour (currentColor), not an Icon property.

## Tokens & theming

Names only; values live in `tokens/` (see `tokens/manifest.json`).

- **Colour:** `interactive/selection/border/{default,hover,pressed,disabled}`, `interactive/selection/background/{pressed,hover,disabled}`, `border/focus`, `foreground/{primary,disabled,on-strong}`
- **Dimension:** `control/{target-min,xs,icon-sm}`, `space/none`, `radius/{element-sm,xs}`, `stroke/thick`
- **Typography:** `label/medium`
- **Theme axes:** palette Light/Dark · size Desktop/Mobile/Tablet/Desktop Compact · typography Desktop/Tablet/Mobile/Desktop Compact · extensions companion, target, condensed

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| enabled | Resting | The border follows Checked. Unchecked draws interactive/selection/border/default over no fill. Checked and indeterminate fill with interactive/selection/background/pressed and border with interactive/selection/border/pressed. |
| hover | Pointer over the control | The border steps to interactive/selection/border/hover, and once checked the fill steps to interactive/selection/background/hover. The label holds. |
| focus | Keyboard focus | A ring bound to border/focus is drawn at the box's own size, sitting over the state border rather than replacing it. Nothing else changes. |
| disabled | — | The border moves to interactive/selection/border/disabled, any fill to interactive/selection/background/disabled, and the label to foreground/disabled. The mark stays where it is. |

- **Motion:** No transition is defined. Every state is a swap of border, fill and, where it applies, the glyph inside the box.
- **Selection model:** Checked carries all three values on one axis rather than pairing a two-value checked with a separate indeterminate flag. A control can therefore be off, on or mixed and never two of those at once, which a separate flag allows by accident.
- **Resize:** Turning the label off collapses the control to the 40 target alone. With the label on the width hugs it, so a long option name widens the control rather than wrapping inside a fixed box.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | Plain text, toggled by hasLabel | Consumer owned, set through the Label property and sitting directly beside the target. Turning hasLabel off leaves the control with no visible name, so one has to come from the surrounding structure. |
| Mark | nested Icon, not exposed | A check mark when Checked is true and a dash when it is indeterminate. The Checkbox decides both the glyph and its size and surfaces none of the Icon's own properties, so the mark is not a slot a consumer fills. |

## Usage

**Do**
- Use indeterminate on a parent that summarises a mixed set of children. It is the one value that says some without claiming all or none.
- Keep the label on. The 40 target already reaches past the box, and the label extends the thing a person aims at, which is most of what makes a small control easy to hit.

**Don't**
- Don't reach for Checkbox where only one option may win. That is Radio Button, and a row of checkboxes gives a person no way to see the constraint before breaking it.
- Don't offer indeterminate as a third value someone can select. Nothing cycles into it. It is set from the state of the things underneath it and read back, never chosen.

## Accessibility

- The label is the control's name. Turning hasLabel off removes it from view, so the name has to come from the surrounding structure before the control is usable without sight.
- indeterminate is a third value, not a styling of checked. It has to be exposed as one, or a mixed parent is announced as simply on or off.
- The 40 square target is larger than the box at both sizes. Keep the whole square pressable rather than only the box, and let the label extend it further.
- disabled keeps the mark visible so the value stays readable. Both the border and the fill move to their disabled tokens while the glyph does not, so check the mark still holds contrast against the dimmed fill.
- Focus is a ring at the box's own size rather than an outset halo. Check it reads against the state border directly beneath it, particularly on a busy surface.
- A checkbox rarely stands alone. Where several belong together, the grouping and its name have to be expressed in the structure around them, because nothing in the control carries it.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Touch target | 40×40, fixed | Does not change with Size. Both sizes centre their box inside the same 40 square, so a column of mixed sizes still aligns and every control keeps the same target regardless of how small its box is. |
| Box | 24 at large, 16 at medium | control/xs at large and control/icon-sm at medium, with a 2px stroke at both. Radius is radius/element-sm at large and radius/xs at medium, so the corner softens in proportion rather than holding one value. |
| Mark | 20 at large, 12 at medium | An Icon at Size=medium for the large box and Size=small for the medium one. It sits inside the box rather than replacing its fill, and is present only when Checked is true or indeterminate. |
| Focus ring | Matches the box | A second stroke bound to border/focus, carried on a frame the same size as the box rather than outside it, so gaining focus does not change the control's footprint or shift anything beside it. |
| Gap | 0, space/none | The label sits directly against the target with nothing between them. The 40 square supplies the visual gap on its own, because the box is only 24 or 16 and sits centred inside it. |
| Label | 14px at both sizes | label/medium at large and medium alike. Size moves the box and the mark and never the text, so the label stays at full legibility in the denser option. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6382-52) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-207) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6387-94)
- [Unchecked](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-40) · [Checked](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-57) · [Indeterminate](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-91)
- [Checked, hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-66) · [Checked, focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-74) · [Checked, disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-83) · [Medium, checked](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6384-141)

## Issues

### Warn

1. **Checked hover fails contrast in dark mode.** The mark is `foreground/on-strong` (white in every mode). On hover it sits on `interactive/selection/background/hover`, which turns light in dark mode: 1.51:1, so the mark all but disappears under the pointer. Light mode is 7.03:1; the enabled checked fill is 4.64:1 in both modes. Either the hover fill should stay saturated in dark mode, or the mark needs a token that flips with it.
2. **The metadata says the disabled glyph keeps its colour; it doesn't.** Accessibility: "Both the border and the fill move to their disabled tokens while the glyph does not". As built, disabled marks are `foreground/disabled`. Mark on disabled fill measures 2.35:1 light and 3.43:1 dark. Disabled controls are exempt from WCAG contrast, but the metadata asks for the check.
3. **The focus ring doesn't read against a checked border.** `border/focus` next to `interactive/selection/border/pressed` is 1.33:1 in both modes, so on a checked box ring and border merge into one thicker blue edge. The metadata asks for exactly this check.
4. **The medium mark is unbound.** It is the Icon at Size=small scaled down to fit (12, against the Icon's 16), with its size bindings removed. No `control/icon` token matches.

### Note

- **Focus ring placement.** The focus frame is the box's size, but its stroke is aligned outside, so the ring renders just outside the box's edge (an outline at offset 0), not "over the state border". The footprint claim holds, and the ring stays inside the clipped 40 target.
- **Property Breakdown omits Label.** The Label text property is described under Content & Slot instead. The Type column lists option values where Radio Button lists types.
- **Checked uses pressed tokens.** "Selected" is drawn with `…/pressed`, as on Radio Button and Switch. In dark mode the checked border and fill are different blues (1.33:1), so a checked box shows a lighter rim.
- **Checked hover changes hue.** `interactive/selection/background/hover` is a neutral grey, so a checked box turns from blue to grey under the pointer.
- **Focus variants nest the box** inside the Focus frame, so bindings sit under a different layer path there. They are the same in all 24 variants. No gaps, no binding drift.
- The component set has no description in Figma.
- No motion is defined, by the metadata's own statement. No invalid or required state is modelled.
