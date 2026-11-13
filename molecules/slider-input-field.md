---
name: Slider Input Field
level: molecule
status: draft
composes: [../atoms/slider.md]
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
  slider-input-field-input-border-color: '{colors.color-line-default}'
  slider-input-field-input-border-color-focused: '{colors.color-line-focus}'
  slider-input-field-input-border-color-invalid: '{colors.color-status-error-default}'
  slider-input-field-input-border-color-disabled: '{colors.color-line-subtle}'
---

# Slider Input Field

> A slider paired with a number box, for both quick dragging and precise typed entry of one value.

## Anatomy
1. Label (optional) — above the row, `--slider-input-field-label-font` in `--slider-input-field-label-foreground`, `--slider-input-field-label-gap` above it.
2. Slider column — `--slider-input-field-slider-padding-top` from the top, filling the width the number box leaves:
   1. [Slider](../atoms/slider.md), single value. Its own tokens govern the track, active track, thumb, step dots and states.
   2. Range labels — the minimum at the left and the maximum at the right, `--slider-input-field-slider-gap` below the slider, in `--slider-input-field-range-label-font` `--slider-input-field-range-label-foreground`.
3. Number box — `--slider-input-field-input-width` × `--slider-input-field-input-height`, `--slider-input-field-gap` to the right of the slider column, showing the value in `--slider-input-field-input-font`. It stays in sync with the thumb both ways.

## Variants
Shape and Stepped are the [Slider](../atoms/slider.md)'s and pass straight through. The number box keeps `--slider-input-field-input-radius` on both shapes. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Slider | Number box | Labels |
|---|---|---|---|
| enabled | Slider default | `--slider-input-field-input-background`, `--slider-input-field-input-border-width` `--slider-input-field-input-border-color`, text `--slider-input-field-input-foreground` | label `--slider-input-field-label-foreground`, range labels `--slider-input-field-range-label-foreground` |
| focus (number box) | unchanged | `--slider-input-field-input-border-width-focused` `--slider-input-field-input-border-color-focused` | unchanged |
| dragging / thumb focus | Slider hover and selected | value updates live | unchanged |
| invalid | unchanged | `--slider-input-field-input-border-color-invalid` | a message explains the range |
| disabled | Slider disabled | `--slider-input-field-input-background-disabled`, `--slider-input-field-input-border-color-disabled`, text `--slider-input-field-input-foreground-disabled` | `--slider-input-field-label-foreground-disabled`, `--slider-input-field-range-label-foreground-disabled` |

Dragging updates the box; typing moves the thumb. A typed value outside the range puts the box into invalid and leaves the thumb where it was. No transition is defined.

## Spacing & Sizing
| Part | Token |
|---|---|
| Label → row | `--slider-input-field-label-gap` |
| Slider column ↔ number box | `--slider-input-field-gap` |
| Slider → range labels | `--slider-input-field-slider-gap`, after `--slider-input-field-slider-padding-top` above the slider |
| Number box | `--slider-input-field-input-width` × `--slider-input-field-input-height`, `--slider-input-field-input-padding-x` horizontal padding, value centred |

The field fills its container; only the slider column stretches. Measurements are provisional: the Figma section is thin, and the label gap, the number box width and the focus, invalid and disabled states are carried over from the previous spec.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | none |
| Value | number | 50 |
| Min / max | number | 0 / 100 |
| Stepped / Step | as Slider | as Slider |
| Shape | rounded, sharp | rounded |
| Invalid | on / off | off |
| Disabled | on / off | off |

## Usage
- Use it when people need both quick dragging and an exact typed value.
- Keep the range labels so the scale is clear; turn Stepped on for discrete values.
- Pair an invalid box with a message that says the allowed range; the border alone says nothing.
- For a span of values use a [Slider](../atoms/slider.md) with Range on.

## Accessibility
- Give the slider and the number box the same accessible name (the label), so they read as one value.
- The number box is the keyboard-precise path and its `--slider-input-field-input-height` height gives a usable touch target; the thumb is small.
- The range labels repeat the slider's min and max; hide them from assistive technology so they are not read twice.
- Invalid is announced only through the message: associate it with the box and set its invalid state.
- Disabled dims every part; say why the value is locked in nearby text.

## Stitch Prompt
Draw a horizontal control: an optional small `--slider-input-field-label-font` label above; a Zebra slider with a near-black fill and thumb on a light grey track; under its ends, small grey "0" and "100" labels (`--slider-input-field-range-label-foreground`). `--slider-input-field-gap` to the right sits a `--slider-input-field-input-width` by `--slider-input-field-input-height` white box with a thin light grey border (`--slider-input-field-input-border-color`) and `--slider-input-field-input-radius` corners, showing the value "50" centred in `--slider-input-field-input-font` near-black text.
