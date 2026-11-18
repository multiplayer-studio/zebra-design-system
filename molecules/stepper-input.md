---
name: Stepper Input
level: molecule
status: stable
composes: [../atoms/icon-button.md, ./input.md, ../atoms/input-label.md, ../atoms/input-hint.md, ../atoms/icon.md]
tokens:
  # layout
  stepper-input-container-gap: '{space.space-sm}'
  stepper-input-hint-gap: '{space.space-sm}'
  # step buttons
  stepper-input-button-size-medium: '{control.control-md}'
  stepper-input-button-size-large: '{control.control-lg}'
  stepper-input-button-radius-sharp: '{radius.radius-none}'
  stepper-input-button-radius-rounded: '{radius.radius-element-sm}'
  # value field
  stepper-input-field-width: '{component-sizes.size-stepper-input-field-width}'
  stepper-input-field-height-medium: '{input.input-container-height-medium}'
  stepper-input-field-height-large: '{input.input-container-height-large}'
  stepper-input-field-radius-sharp: '{input.input-container-radius-sharp}'
  stepper-input-field-radius-rounded: '{input.input-container-radius-rounded}'
  stepper-input-value-font: '{input.input-value-font-medium}'
---

# Stepper Input

> A number with a button either side to decrease or increase it, read in the order label, hint, error, row.

## Anatomy
The assembly reads label, hint, error, row, as [Input](./input.md) does ([patterns 1.124](../patterns/01-screen-composition.md)):

1. Label (optional) — an [Input Label](../atoms/input-label.md) naming the value, with its unit ("Cartons", "Copies"). Turned on by Label.
2. Hint (optional) — an [Input Hint](../atoms/input-hint.md), Type default, above the row, stating the limits ("1 to 20"). Turned on by Hint. It stays when an error shows.
3. Error (invalid only) — a second [Input Hint](../atoms/input-hint.md), Type error, on its own line between the hint and the row, saying how to fix the value ([patterns 1.64](../patterns/01-screen-composition.md)).
4. Row:
   1. Remove button — [Icon Button](../atoms/icon-button.md) with the `remove` glyph, flavour outline-subtle, `--stepper-input-button-size-medium` square. Its own properties are locked.
   2. Value — an [Input](./input.md) field holding the number (type text, content whole number, no label, no hint, no clear control), `--stepper-input-field-width` wide, in `--stepper-input-value-font`. It is directly editable.
   3. Add button — the same Icon Button with the `add` glyph, on the other side of the value.

The three controls sit in a row `--stepper-input-container-gap` apart; the label, hint, error and row stack `--stepper-input-hint-gap` apart. The Icon Buttons and the Input field draw their own colours, borders and states.

## Variants
| Size | Buttons | Value field | Width |
|---|---|---|---|
| medium (default) | `--stepper-input-button-size-medium` square | at least `--stepper-input-field-height-medium` tall | two buttons + two gaps + `--stepper-input-field-width` |
| large | `--stepper-input-button-size-large` square | at least `--stepper-input-field-height-large` tall | the value keeps its width; only the buttons grow |

| Rounded | Buttons | Value field |
|---|---|---|
| true (default) | `--stepper-input-button-radius-rounded` | `--stepper-input-field-radius-rounded` |
| false | `--stepper-input-button-radius-sharp` | `--stepper-input-field-radius-sharp` |

Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Buttons | Value field | Hint and error |
|---|---|---|---|
| enabled | Icon Button outline-subtle (its hover, pressed and focus states) | Input enabled; focus, typing and filled as Input | hint shown when Hint is on |
| at minimum | Remove unavailable (Icon Button disabled look, still focusable), Add enabled | unchanged | unchanged |
| at maximum | Add unavailable, Remove enabled | unchanged | unchanged |
| invalid | unchanged | Input invalid | the error line shows; the hint stays |
| disabled | both switch to Icon Button primary, disabled | Input disabled | hint at Type disabled, saying why |

Each button becomes unavailable on its own at its limit, so the other still works ([patterns 3.57](../patterns/03-controls-interaction.md)). Pressing and holding a button repeats the step until release. A typed value outside the limits puts the field into invalid and keeps what was typed. No transition is defined for the hint or error appearing or for Disabled or Rounded changing.

## Spacing & Sizing
| Part | Token |
|---|---|
| Button ↔ value gap | `--stepper-input-container-gap` |
| Label, hint, error and row | `--stepper-input-hint-gap` apart |
| Value field | `--stepper-input-field-width` wide, value in `--stepper-input-value-font` at both sizes, the Input's padding |
| Buttons | `--stepper-input-button-size-medium` / `--stepper-input-button-size-large` square |

The value type is the same at both sizes; only the buttons grow. The field heights are minimums and grow with the text size. The label, hint and error add their own height plus the gap.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | medium, large | medium |
| Rounded | true, false | true |
| Disabled | true, false | false |
| Label | true, false | false |
| Hint | true, false | false |
| Value | number, or empty | — |
| Min / max / step | number | — / — / 1 |
| Label text, hint text, error text | text | — |

## Usage
- Use it for small changes around a common value, such as a quantity or a number of copies ([patterns 3.57](../patterns/03-controls-interaction.md)). Start on the most common value where that's a safe default, and empty otherwise.
- Never use it for a wide or continuous range: price, distance, temperature and time are typed in an [Input](./input.md) ([patterns 3.58](../patterns/03-controls-interaction.md)).
- State the unit in the label and the limits in the hint.
- Use large on touch surfaces where the buttons need to be easy to hit without precision.
- Say why in the hint when the whole stepper is disabled.

## Accessibility
- Group the controls; the label names the group and the value field.
- Name the buttons with what they change ("Decrease cartons", "Increase cartons"); they are glyphs with no text. A button at its limit stays focusable with `aria-disabled` ([patterns 6.34](../patterns/06-accessibility.md)); the hint says the limit.
- Announce the new value when a button changes it, without moving focus ([patterns 6.53](../patterns/06-accessibility.md)).
- The value field accepts typing and the arrow keys, with a number pad on touch ([patterns 3.38](../patterns/03-controls-interaction.md)).
- Tie the hint and the error line to the value field with `aria-describedby`.

## Claude Prompt
Draw a numeric stepper: a small near-black label "Cartons", a small grey hint line "1 to 20" with an info icon under it, then `--stepper-input-hint-gap` below a horizontal row: a `--stepper-input-button-size-medium` square button with a thin light grey outline and a dark minus icon, then `--stepper-input-container-gap` later a `--stepper-input-field-width` wide white input box with a thin mid grey border showing a number in `--stepper-input-value-font`, then a matching plus button. Corners are slightly rounded (`--stepper-input-button-radius-rounded`), or square when sharp. At the minimum the minus button is greyed out. A disabled stepper has grey filled buttons, a grey field and a grey hint saying why.
