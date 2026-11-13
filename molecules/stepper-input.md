---
name: Stepper Input
level: molecule
status: stable
composes: [../atoms/icon-button.md, ./input.md, ../atoms/input-hint.md, ../atoms/icon.md]
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

> A number with a button either side to decrease or increase it, and an optional hint below.

## Anatomy
1. Remove button — [Icon Button](../atoms/icon-button.md) with the `remove` glyph, flavour outline-subtle, `--stepper-input-button-size-medium` square. Its own properties are locked.
2. Value — an [Input](./input.md) field holding the number (type text, no label, no hint, no clear control), `--stepper-input-field-width` wide, in `--stepper-input-value-font`. It is directly editable.
3. Add button — the same Icon Button with the `add` glyph, on the other side of the value.
4. Hint (optional) — an [Input Hint](../atoms/input-hint.md), Type default, below the row. Turned on by Hint.

The three controls sit in a row `--stepper-input-container-gap` apart; the hint sits `--stepper-input-hint-gap` below. The Icon Buttons and the Input field draw their own colours, borders and states.

## Variants
| Size | Buttons | Value field | Width |
|---|---|---|---|
| medium (default) | `--stepper-input-button-size-medium` square | `--stepper-input-field-height-medium` tall | two buttons + two gaps + `--stepper-input-field-width` |
| large | `--stepper-input-button-size-large` square | `--stepper-input-field-height-large` tall | the value keeps its width; only the buttons grow |

| Rounded | Buttons | Value field |
|---|---|---|
| true (default) | `--stepper-input-button-radius-rounded` | `--stepper-input-field-radius-rounded` |
| false | `--stepper-input-button-radius-sharp` | `--stepper-input-field-radius-sharp` |

Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Buttons | Value field | Hint |
|---|---|---|---|
| enabled | Icon Button outline-subtle (its hover, pressed and focus states) | Input enabled; focus, typing and filled as Input | shown when Hint is on |
| disabled | both switch to Icon Button primary, disabled | Input disabled | removed, even when Hint is on |

No transition is defined for the hint appearing or for Disabled or Rounded changing.

## Spacing & Sizing
| Part | Token |
|---|---|
| Button ↔ value gap | `--stepper-input-container-gap` |
| Row → hint | `--stepper-input-hint-gap` |
| Value field | `--stepper-input-field-width` wide, value in `--stepper-input-value-font` at both sizes, the Input's padding |
| Buttons | `--stepper-input-button-size-medium` / `--stepper-input-button-size-large` square |

The value type is the same at both sizes; only the buttons grow. The hint adds its own height plus the gap.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | medium, large | medium |
| Rounded | true, false | true |
| Disabled | true, false | false |
| Hint | true, false | false |
| Value | number | — |
| Hint text | text | — |

The hint only ever shows the hint message, never an error; there is no error state.

## Usage
- Use it for small numeric adjustments, such as quantities. For a wide range use a [Slider Input Field](./slider-input-field.md).
- Use the hint to explain a constraint on the value, such as the minimum and maximum.
- Use large on touch surfaces where the buttons need to be easy to hit without precision.
- Don't expect the hint while Disabled is on; it is removed.

## Accessibility
- Group the controls and give the group and the value field a name from the surrounding form (for example "Cartons").
- Name the buttons with what they change ("Decrease cartons", "Increase cartons"); they are glyphs with no text.
- Announce the new value when a button changes it (a live region or the field's own value change).
- The value field accepts typing and the arrow keys.
- Associate the hint with the value field so it is announced.

## Stitch Prompt
Draw a horizontal numeric stepper: a `--stepper-input-button-size-medium` square button with a thin light grey outline and a dark minus icon, then `--stepper-input-container-gap` later a `--stepper-input-field-width` wide white input box with a thin light grey border showing a number in `--stepper-input-value-font`, then a matching plus button. Corners are slightly rounded (`--stepper-input-button-radius-rounded`), or square when sharp. Below, `--stepper-input-hint-gap` down, a small grey hint line with an info icon. A disabled stepper has grey filled buttons and a grey field, and no hint.
