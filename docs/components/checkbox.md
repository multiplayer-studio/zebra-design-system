# Checkbox

> A square control for turning a single option on or off, with an optional label beside it. Checked carries three values rather than two, so a checkbox that summarises a set of others can say indeterminate instead of guessing between on and off. Reach for it wherever options are independent of each other, and reach for Radio Button where exactly one of a set has to win.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-checkbox>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `checked` | enum | `false` | `false` `true` `indeterminate` |  |
| `state` | enum | `enabled` | `enabled` `hover` `focus` `disabled` |  |
| `size` | enum | `large` | `medium` `large` |  |
| `hasLabel` | boolean | `true` |  |  |
| `label` | string | `Label` |  |  |

## When and how to use

### Do

- Use indeterminate on a parent that summarises a mixed set of children. It is the one value that says some without claiming all or none.
- Keep the label on. The 40 target already reaches past the box, and the label extends the thing a person aims at, which is most of what makes a small control easy to hit.

### Don't

- Don't reach for Checkbox where only one option may win. That is Radio Button, and a row of checkboxes gives a person no way to see the constraint before breaking it.
- Don't offer indeterminate as a third value someone can select. Nothing cycles into it. It is set from the state of the things underneath it and read back, never chosen.

## States

| State | Trigger | What changes |
|---|---|---|
| enabled | Resting |  |
| hover | Pointer over the control |  |
| focus | Keyboard focus |  |
| disabled | — |  |

## Behaviour

- **Motion** — No transition is defined. Every state is a swap of border, fill and, where it applies, the glyph inside the box.
- **Selection model** — Checked carries all three values on one axis rather than pairing a two-value checked with a separate indeterminate flag. A control can therefore be off, on or mixed and never two of those at once, which a separate flag allows by accident.
- **Resize** — Turning the label off collapses the control to the 40 target alone. With the label on the width hugs it, so a long option name widens the control rather than wrapping inside a fixed box.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | Plain text, toggled by hasLabel | Consumer owned, set through the Label property and sitting directly beside the target. Turning hasLabel off leaves the control with no visible name, so one has to come from the surrounding structure. |
| Mark | nested Icon, not exposed | A check mark when Checked is true and a dash when it is indeterminate. The Checkbox decides both the glyph and its size and surfaces none of the Icon's own properties, so the mark is not a slot a consumer fills. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Touch target | 40×40, fixed | Does not change with Size. Both sizes centre their box inside the same 40 square, so a column of mixed sizes still aligns and every control keeps the same target regardless of how small its box is. |
| Box | 24 at large, 16 at medium | control/xs at large and control/icon-sm at medium, with a 2px stroke at both. Radius is radius/element-sm at large and radius/xs at medium, so the corner softens in proportion rather than holding one value. |
| Mark | 20 at large, 12 at medium | An Icon at Size=medium for the large box and Size=small for the medium one. It sits inside the box rather than replacing its fill, and is present only when Checked is true or indeterminate. |
| Focus ring | Matches the box | A second stroke bound to border/focus, carried on a frame the same size as the box rather than outside it, so gaining focus does not change the control's footprint or shift anything beside it. |
| Gap | 0, space/none | The label sits directly against the target with nothing between them. The 40 square supplies the visual gap on its own, because the box is only 24 or 16 and sits centred inside it. |
| Label | 14px at both sizes | label/medium at large and medium alike. Size moves the box and the mark and never the text, so the label stays at full legibility in the denser option. |

## Accessibility

- The label is the control's name. Turning hasLabel off removes it from view, so the name has to come from the surrounding structure before the control is usable without sight.
- indeterminate is a third value, not a styling of checked. It has to be exposed as one, or a mixed parent is announced as simply on or off.
- The 40 square target is larger than the box at both sizes. Keep the whole square pressable rather than only the box, and let the label extend it further.
- disabled keeps the mark visible so the value stays readable. Both the border and the fill move to their disabled tokens while the glyph does not, so check the mark still holds contrast against the dimmed fill.
- Focus is a ring at the box's own size rather than an outset halo. Check it reads against the state border directly beneath it, particularly on a busy surface.
- A checkbox rarely stands alone. Where several belong together, the grouping and its name have to be expressed in the structure around them, because nothing in the control carries it.

---
*Generated from `specs/checkbox` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
