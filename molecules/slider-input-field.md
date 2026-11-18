---
name: Slider Input Field
level: molecule
status: draft
composes: [../atoms/slider.md, ../atoms/input-hint.md]
tokens:
  # label
  slider-input-field-label-font: '{typography.type-label-medium}'
  slider-input-field-label-foreground: '{colors.color-ink-high}'
  slider-input-field-label-foreground-disabled: '{colors.color-ink-disabled}'
  slider-input-field-label-gap: '{space.space-2xs}'
  # range labels (min / max)
  slider-input-field-range-label-font: '{typography.type-indicator-medium}'
  slider-input-field-range-label-foreground: '{colors.color-ink-medium}'
  slider-input-field-range-label-foreground-disabled: '{colors.color-ink-disabled}'
  # layout
  slider-input-field-gap: '{space.space-gutter}'
  slider-input-field-slider-gap: '{space.space-lg}'
  slider-input-field-slider-padding-top: '{space.space-sm}'
  # number box
  slider-input-field-input-width: '{primitives.scale-16}'
  slider-input-field-input-height: '{control.control-md}'
  slider-input-field-input-padding-x: '{space.space-md}'
  slider-input-field-input-radius: '{radius.radius-sm}'
  slider-input-field-input-font: '{typography.type-body-medium}'
  slider-input-field-input-foreground: '{colors.color-ink-high}'
  slider-input-field-input-foreground-disabled: '{colors.color-ink-disabled}'
  slider-input-field-input-background: '{colors.color-fill-default}'
  slider-input-field-input-background-disabled: '{colors.color-fill-disabled}'
  slider-input-field-input-border-width: '{stroke.stroke-thin}'
  slider-input-field-input-border-width-focused: '{stroke.stroke-thick}'
  slider-input-field-input-border-color: '{colors.color-line-strong}'
  slider-input-field-input-border-color-focused: '{colors.color-line-focus}'
  slider-input-field-input-border-color-invalid: '{colors.color-status-error-default}'
  slider-input-field-input-border-color-disabled: '{colors.color-line-subtle}'
---

# Slider Input Field

> A slider paired with a number box, for both quick dragging and precise typed entry of one value.

## Anatomy
The field reads label, hint, error, control row, as [Input](./input.md) does ([patterns 1.124](../patterns/01-screen-composition.md)):

1. Label (optional) — above everything else, `--slider-input-field-label-font` in `--slider-input-field-label-foreground`, `--slider-input-field-label-gap` above what follows. It names the value and its unit.
2. Hint (optional) — an [Input Hint](../atoms/input-hint.md), Type default, under the label. It stays when an error shows.
3. Error (invalid only) — a second [Input Hint](../atoms/input-hint.md), Type error, between the hint and the control row, saying the allowed range ([patterns 1.64](../patterns/01-screen-composition.md)).
4. Control row:
   1. Slider column — filling the width the number box leaves:
      1. Range labels — the minimum at the leading end and the maximum at the trailing end, above the track where a finger doesn't hide them ([patterns 3.60](../patterns/03-controls-interaction.md)), in `--slider-input-field-range-label-font` `--slider-input-field-range-label-foreground`, `--slider-input-field-slider-gap` above the slider.
      2. [Slider](../atoms/slider.md), single value, `--slider-input-field-slider-padding-top` below the range labels. Its own tokens govern the track, active track, thumb, step dots and states.
   2. Number box — at least `--slider-input-field-input-width` × `--slider-input-field-input-height`, `--slider-input-field-gap` after the slider column, showing the value in `--slider-input-field-input-font`. It stays in sync with the thumb both ways, and comes straight after the slider in focus order ([patterns 3.59](../patterns/03-controls-interaction.md)).

## Variants
Shape and Stepped are the [Slider](../atoms/slider.md)'s and pass straight through. The number box keeps `--slider-input-field-input-radius` on both shapes. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Slider | Number box | Labels |
|---|---|---|---|
| enabled | Slider default | `--slider-input-field-input-background`, `--slider-input-field-input-border-width` `--slider-input-field-input-border-color`, text `--slider-input-field-input-foreground` | label `--slider-input-field-label-foreground`, range labels `--slider-input-field-range-label-foreground` |
| focus (number box) | unchanged | `--slider-input-field-input-border-width-focused` `--slider-input-field-input-border-color-focused` | unchanged |
| dragging / thumb focus | Slider hover and selected | value updates live | unchanged |
| invalid | unchanged | `--slider-input-field-input-border-color-invalid` | the error line shows; the hint stays |
| disabled | Slider disabled | `--slider-input-field-input-background-disabled`, `--slider-input-field-input-border-color-disabled`, text `--slider-input-field-input-foreground-disabled` | `--slider-input-field-label-foreground-disabled`, `--slider-input-field-range-label-foreground-disabled`; the hint at Type disabled says why |

Dragging updates the box; typing moves the thumb. A typed value outside the range puts the box into invalid, keeps what was typed and leaves the thumb where it was. No transition is defined.

## Spacing & Sizing
| Part | Token |
|---|---|
| Label, hint, error → row | `--slider-input-field-label-gap` |
| Slider column ↔ number box | `--slider-input-field-gap` |
| Range labels → slider | `--slider-input-field-slider-gap`, then `--slider-input-field-slider-padding-top` above the slider |
| Number box | at least `--slider-input-field-input-width` × `--slider-input-field-input-height`, `--slider-input-field-input-padding-x` horizontal padding, value centred |

The field fills its container; only the slider column stretches. The number box height is a minimum and grows with the text size. Measurements are provisional: the Figma section is thin, and the label gap, the number box width and the focus, invalid and disabled states are carried over from the previous spec.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | none |
| Hint | text | none |
| Error text | text (shown while invalid) | — |
| Value | number | 50 |
| Min / max | number | 0 / 100 |
| Stepped / Step | as Slider | as Slider |
| Shape | rounded, sharp | rounded |
| Invalid | on / off | off |
| Disabled | on / off | off |

## Usage
- Use it when the value's effect matters and people also need an exact typed value ([patterns 3.59](../patterns/03-controls-interaction.md)). Where people work on the move or one-handed, use an [Input](./input.md) or [Stepper Input](./stepper-input.md) instead ([patterns 3.61](../patterns/03-controls-interaction.md)).
- Keep the range labels so the scale is clear; turn Stepped on for discrete values.
- Never set invalid without an error line that says the allowed range; the border alone says nothing.
- For a span of values use a [Slider](../atoms/slider.md) with Range on.

## Accessibility
- Give the slider and the number box the same accessible name (the label), so they read as one value.
- The number box is the keyboard-precise path and its `--slider-input-field-input-height` height gives a usable target; the thumb is small.
- The range labels repeat the slider's min and max; hide them from assistive technology so they are not read twice.
- Tie the hint and the error line to the box with `aria-describedby`, and set `aria-invalid` while invalid.
- Disabled dims every part; the hint says why the value is locked.

## Claude Prompt
Draw a horizontal control: a small `--slider-input-field-label-font` label above, a small grey hint line under it, then small grey "0" and "100" range labels (`--slider-input-field-range-label-foreground`) above the two ends of a Zebra slider with a near-black fill and thumb on a light grey track. `--slider-input-field-gap` to the right sits a `--slider-input-field-input-width` by `--slider-input-field-input-height` white box with a thin mid grey border (`--slider-input-field-input-border-color`) and `--slider-input-field-input-radius` corners, showing the value "50" centred in `--slider-input-field-input-font` near-black text.
