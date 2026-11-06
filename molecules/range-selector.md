---
name: Range Selector
level: molecule
status: stable
composes: [../atoms/slider.md]
tokens:
  range-selector-container-gap: '{spacing.spacing-large}'
  range-selector-container-row-gap: '{spacing.spacing-minimum}'
  range-selector-label-margin-bottom: '{spacing.spacing-minimum}'
  # number inputs
  range-selector-input-width: '{dimensions.dim-slider-input-field-input-width}'
  range-selector-input-height: '{dimensions.dim-slider-input-field-input-height}'
  range-selector-input-radius-rounded: '{rounded.radius-minimal}'
  range-selector-input-radius-sharp: '{rounded.radius-none}'
  range-selector-input-font: '{typography.body-medium}'
  range-selector-input-border-width: '{border.border-size-small}'
  range-selector-input-background-enabled: '{colors.surface-default}'
  range-selector-input-background-error: '{colors.surface-negative-subtle}'
  range-selector-input-background-disabled: '{colors.surface-disabled}'
  range-selector-input-border-color-enabled: '{colors.border-default}'
  range-selector-input-border-color-error: '{colors.border-negative}'
  range-selector-input-border-color-disabled: '{colors.border-disabled}'
  range-selector-input-foreground-enabled: '{colors.main-subtle}'
  range-selector-input-foreground-disabled: '{colors.main-disabled}'
---

# Range Selector

> Used for selecting values in a numerical range. A ranged input field built on the Slider.

Its number boxes match the one in [Slider Input Field](./slider-input-field.md); the slider is the [Slider](../atoms/slider.md) atom.

## Anatomy
1. Label (optional) – above the row, flush left, `--range-selector-label-margin-bottom` bottom margin.
2. Lower number input – `--range-selector-input-width` × `--range-selector-input-height` box at the far left.
3. [Slider](../atoms/slider.md), range type – two handles; the segment between them is filled. The slider's own tokens govern track, fill, handles, hover and step dots; the Rounded property is passed to its shape.
4. Upper number input – `--range-selector-input-width` × `--range-selector-input-height` box at the far right.

Row is vertically centred. Unlike Slider Input Field, no min/max labels under the track.

## Variants
| Shape | Handles | Number boxes |
|---|---|---|
| rounded (default) | circles (`--slider-handle-radius-rounded`) | `--range-selector-input-radius-rounded` |
| sharp | squares | `--range-selector-input-radius-sharp` |

Setting a step adds snap points as `--slider-step-dot-size` `--slider-step-dot-background` dots on the track.

## States
| State | Track / handles | Number boxes |
|---|---|---|
| enabled | track `--slider-track-background-enabled`; selected range `--slider-selected-background-enabled` + handles `--slider-handle-background-enabled` | `--range-selector-input-background-enabled`, `--range-selector-input-border-width` `--range-selector-input-border-color-enabled`, text `--range-selector-input-foreground-enabled` |
| handle hover | scale `--slider-handle-scale-hover` (to `--slider-handle-size-hover`), `--slider-handle-duration` linear | – |
| error | – | bg `--range-selector-input-background-error`, `--range-selector-input-border-width` `--range-selector-input-border-color-error` |
| disabled | handles `--slider-handle-background-disabled`, range fill hidden | bg `--range-selector-input-background-disabled`, border `--range-selector-input-border-color-disabled`, text `--range-selector-input-foreground-disabled` |

## Spacing & Sizing
| Property | Value |
|---|---|
| Gap between input / slider / input | `--range-selector-container-gap` |
| Handle | `--slider-handle-size`; track `--slider-track-height` |
| Number boxes | `--range-selector-input-width` × `--range-selector-input-height`, `--range-selector-input-font`, centred |
| Label → row | `--range-selector-label-margin-bottom` (+ `--range-selector-container-row-gap` component gap) |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | none |
| Initial range | lower and upper value | 10 to 90 |
| Min / max | number | 0 / 100 |
| Step | number | none |
| Error | on / off | off |
| Disabled | on / off | off |
| Rounded | on / off | on |

## Usage
- Use for filtering by a numeric span (price, date range in days, etc.).
- Typed inputs give precise, keyboard-accessible entry alongside the handles.

## Stitch Prompt
Draw a range control on one line: a `--range-selector-input-width` by `--range-selector-input-height` `--range-selector-input-background-enabled` box with `--range-selector-input-border-width` `--range-selector-input-border-color-enabled` border and `--range-selector-input-radius-rounded` corners showing "10" in `--range-selector-input-font` `--range-selector-input-foreground-enabled` text, then `--range-selector-container-gap` gap, a thin `--slider-track-height` `--slider-track-background-enabled` track with the segment between two `--slider-handle-size` `--slider-handle-background-enabled` circular handles filled `--slider-selected-background-enabled`, then `--range-selector-container-gap` gap and a matching box showing "90". An optional small label sits above the left box.
