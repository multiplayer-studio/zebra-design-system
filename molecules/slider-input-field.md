---
name: Slider Input Field
level: molecule
status: stable
composes: [../atoms/slider.md]
tokens:
  # label
  slider-input-field-label-padding-left: '{spacing.spacing-small}'
  slider-input-field-label-gap: '{spacing.spacing-minimum}'
  slider-input-field-label-foreground-disabled: '{colors.main-disabled}'
  # range labels
  slider-input-field-range-label-padding-right: '{spacing.spacing-minimum}'
  slider-input-field-range-label-padding-bottom: '{spacing.spacing-minimum}'
  slider-input-field-range-label-padding-left: '{spacing.spacing-small}'
  slider-input-field-range-label-line-height: '{spacing.spacing-2xl}'
  slider-input-field-range-label-margin-y: '{spacing.spacing-small}'
  # number input
  slider-input-field-gap: '{spacing.spacing-large}'
  slider-input-field-input-width: '{dimensions.dim-slider-input-field-input-width}'
  slider-input-field-input-height: '{spacing.spacing-8xl}'
  slider-input-field-input-font: '{typography.body-medium}'
  slider-input-field-input-background: '{colors.surface-default}'
  slider-input-field-input-foreground: '{colors.main-subtle}'
  slider-input-field-input-border-width: '{border.border-size-small}'
  slider-input-field-input-border-color: '{colors.border-default}'
  slider-input-field-input-background-error: '{colors.surface-negative-subtle}'
  slider-input-field-input-border-color-error: '{colors.border-negative}'
  slider-input-field-input-background-disabled: '{colors.surface-disabled}'
  slider-input-field-input-border-color-disabled: '{colors.border-disabled}'
  slider-input-field-input-foreground-disabled: '{colors.main-disabled}'
---

# Slider Input Field

> A text input and slider field for entering numerical values.

## Anatomy
1. Label (optional) – above the row, indented `--slider-input-field-label-padding-left`.
2. [Slider](../atoms/slider.md), default type – single handle, filling the remaining width. Its own tokens govern the track, filled part, handle, hover scale and step dots; the Rounded property is passed to its shape.
3. Range labels – minimum value at left, maximum value at right, under the track.
4. Number input – `--slider-input-field-input-width` × `--slider-input-field-input-height` box to the right of the slider, synced with the handle.

## Variants
| Rounded | Handle | Number box |
|---|---|---|
| on (default) | circle (`--slider-handle-radius-rounded`) | square |
| off | square | square |

A step increment adds snap points shown as `--slider-step-dot-size` white (`--slider-step-dot-background`) dots on the track.

## States
| State | Track / handle | Number box |
|---|---|---|
| enabled | track `--slider-track-background-enabled`; filled part `--slider-selected-background-enabled` + handle `--slider-handle-background-enabled` | bg `--slider-input-field-input-background`, `--slider-input-field-input-border-width` `--slider-input-field-input-border-color`, text `--slider-input-field-input-foreground` |
| handle hover | handle scales by `--slider-handle-scale-hover` | – |
| error | – | bg `--slider-input-field-input-background-error`, `--slider-input-field-input-border-width` `--slider-input-field-input-border-color-error` |
| disabled | handle `--slider-handle-background-disabled`, filled part hidden | bg `--slider-input-field-input-background-disabled`, border `--slider-input-field-input-border-color-disabled`, text `--slider-input-field-input-foreground-disabled`; label `--slider-input-field-label-foreground-disabled` |

## Spacing & Sizing
| Property | Value |
|---|---|
| Label ↔ row gap | `--slider-input-field-label-gap` |
| Slider ↔ number box gap | `--slider-input-field-gap` |
| Handle | `--slider-handle-size` square/circle |
| Track height | `--slider-track-height` |
| Step dots | `--slider-step-dot-size`, `--slider-step-dot-background` |
| Range labels | padding 0 `--slider-input-field-range-label-padding-right` `--slider-input-field-range-label-padding-bottom` `--slider-input-field-range-label-padding-left`; line-height `--slider-input-field-range-label-line-height`, `--slider-input-field-range-label-margin-y` vertical margin |
| Number box | `--slider-input-field-input-width` × `--slider-input-field-input-height`, centred `--slider-input-field-input-font` |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | none |
| Value | number | 50 |
| Minimum / maximum | numbers | 0 / 100 |
| Step increment | number (snap points + step dots) | none |
| Error | on / off | off |
| Disabled | on / off | off |
| Rounded | on / off | on |

## Usage
- Use when users need both quick dragging and precise typed entry of a single value.
- Show min/max so the scale is clear; use a step increment for discrete values.
- The `--slider-input-field-input-height` number box gives a compliant touch target; the `--slider-handle-size` handle should be paired with keyboard support on the slider.
- Error is indicated by the input's pink fill and coral border — pair with explanatory text nearby.

## Stitch Prompt
Draw a horizontal control: an optional small label above; a thin `--slider-track-height` light grey (`--slider-track-background-enabled`) track whose left portion up to the value is filled near-black (`--slider-selected-background-enabled`), with a `--slider-handle-size` near-black circular handle; under the track's ends, the min ("0") and max ("100") numbers in grey. `--slider-input-field-gap` to the right sits a `--slider-input-field-input-width` by `--slider-input-field-input-height` white box with a `--slider-input-field-input-border-width` light grey (`--slider-input-field-input-border-color`) border showing the current value "50" centred in `--slider-input-field-input-font` grey (`--slider-input-field-input-foreground`) text.
