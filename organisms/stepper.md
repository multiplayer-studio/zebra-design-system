---
name: Stepper
level: organism
status: stable
composes: [../atoms/progress-bar.md, ../atoms/icon.md, ../atoms/button.md]
tokens:
  stepper-container-height: '{dimensions.dim-stepper-container-height}'
  # connector
  stepper-connector-width: '{dimensions.dim-stepper-bar-width}'
  stepper-connector-height: '{dimensions.dim-stepper-bar-height}'
  stepper-connector-background: '{colors.border-subtle}'
  stepper-connector-margin-top: '{spacing.spacing-large}'
  stepper-vertical-connector-width: '{dimensions.dim-stepper-bar-vertical-width}'
  stepper-vertical-connector-height: '{spacing.spacing-4xl}'
  stepper-vertical-connector-margin-y: '{spacing.spacing-small}'
  stepper-vertical-connector-margin-left: '{spacing.spacing-4-5}'
  # marker
  stepper-marker-size: '{spacing.spacing-6xl}'
  stepper-marker-font: '{typography.headline-small}'
  stepper-marker-background: '{colors.surface-default}'
  stepper-marker-border-width: '{border.border-size-small}'
  stepper-marker-border-color: '{colors.main-light}'
  stepper-marker-foreground: '{colors.main-default}'
  stepper-active-marker-background: '{colors.surface-primary}'
  stepper-active-marker-foreground: '{colors.state-default-focus}'
  stepper-partial-marker-background: '{colors.surface-positive-subtle}'
  stepper-partial-marker-border-width: '{dimensions.dim-stepper-partial-border-width}'
  stepper-partial-marker-border-color: '{colors.main-positive}'
  stepper-success-marker-background: '{colors.surface-positive}'
  stepper-success-marker-foreground: '{colors.state-default-focus}'
  stepper-edit-icon-foreground: '{colors.main-subtle}'
  stepper-edit-icon-ring-width: '{dimensions.dim-stepper-edit-icon-ring-width}'
  # step column and title
  stepper-step-width: '{spacing.spacing-8xl}'
  stepper-step-gap: '{spacing.spacing-xl}'
  stepper-step-padding-x: '{spacing.spacing-minimum}'
  stepper-title-font: '{typography.title-large}'
  stepper-title-width: '{dimensions.dim-stepper-title-width}'
  stepper-vertical-step-gap: '{spacing.spacing-large}'
  # progress bar (context overrides: Progress Bar's track has no fill and uses its own radius)
  stepper-progress-track-background: '{colors.border-subtle}'
  stepper-progress-track-radius: '{rounded.radius-minimal}'
  stepper-progress-track-margin-top: '{spacing.spacing-large}'
  # overflow button (layout; border is a context override of Button outline-subtle)
  stepper-overflow-button-width: '{dimensions.dim-stepper-overflow-button-width}'
  stepper-overflow-button-margin-left: '{dimensions.dim-stepper-overflow-button-margin}'
  stepper-overflow-button-border-width: '{border.border-size-medium}'
  stepper-overflow-button-border-color: '{colors.border-subtle}'
---

# Stepper

> Steppers convey progress through numbered steps.

## Anatomy
1. Container — row (horizontal) or column (vertical) of steps.
2. Step item — circular step marker (number, or check_mark [icon](../atoms/icon.md) when complete; optional edit icon) + title.
3. Connector bar — line between consecutive steps.
4. Progress bar (optional, horizontal only) — [Progress Bar](../atoms/progress-bar.md), size thin, determinate, under the steps. Its own tokens govern the bar; the stepper overrides only the track fill and radius.
5. Overflow button (optional, horizontal only) — [Button](../atoms/button.md), flavor outline-subtle, to reveal more steps. The button governs its colours, states and focus ring; the stepper sets its width, placement and border (override).

## Variants
| Variant | Layout | Connector |
|---|---|---|
| horizontal (default) | steps in a row, number above title, centred | `--stepper-connector-width` long × `--stepper-connector-height` thick, `--stepper-connector-background`, `--stepper-connector-margin-top` below top |
| vertical | steps in a column, number left of title (1 line) | `--stepper-vertical-connector-width` wide × `--stepper-vertical-connector-height` tall, margin `--stepper-vertical-connector-margin-y` 0 `--stepper-vertical-connector-margin-y` `--stepper-vertical-connector-margin-left` |

## States (step flavor)
| Flavor | Marker background | Marker border | Marker content |
|---|---|---|---|
| default | `--stepper-marker-background` | `--stepper-marker-border-width` `--stepper-marker-border-color` | number `--stepper-marker-foreground` |
| active | `--stepper-active-marker-background` | none | number `--stepper-active-marker-foreground` |
| partial | `--stepper-partial-marker-background` | `--stepper-partial-marker-border-width` dashed `--stepper-partial-marker-border-color` | number |
| success | `--stepper-success-marker-background` | none | check_mark icon `--stepper-success-marker-foreground` |
| + editing | adds edit icon (`--stepper-edit-icon-foreground`) offset over the marker with `--stepper-edit-icon-ring-width` ring | | |

## Spacing & Sizing
| Part | Value |
|---|---|
| Container height (horizontal) | `--stepper-container-height` |
| Marker | `--stepper-marker-size` square, circle, `--stepper-marker-font` |
| Step column | width `--stepper-step-width`, gap `--stepper-step-gap`, padding 0 `--stepper-step-padding-x` |
| Title | `--stepper-title-font`, width `--stepper-title-width`; vertical: 1 line, gap `--stepper-vertical-step-gap` |
| Progress bar | Progress Bar size thin (`--progress-bar-track-height-thin` tall), full width, `--stepper-progress-track-margin-top` top margin. Overrides: track filled `--stepper-progress-track-background` (Progress Bar's track has no fill) and `--stepper-progress-track-radius` corners (squarer than the Progress Bar's rounded shape, to match the markers' grid) |
| Overflow button | Button outline-subtle, `--stepper-overflow-button-width` wide, full height, `--stepper-overflow-button-margin-left` left margin. Override: `--stepper-overflow-button-border-width` `--stepper-overflow-button-border-color` outline (heavier, quieter border than the Button default so it reads as part of the step row) |

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | horizontal, vertical | horizontal |
| Progress | none to complete | none |
| Progress bar | shown / hidden | hidden |
| Overflow button | shown / hidden | hidden |
| Step flavor | default, active, partial, success | default |
| Step editing | on / off | off |
| Step title | text | — |

Step numbers are assigned automatically in order.

## Usage
- Use for linear multi-step processes; one active step at a time.
- Show the overflow button when not all steps fit.
- Completion is shown by icon (check) as well as colour; announce the current step (e.g. "Step 3 of 5").
- Prefer vertical on narrow screens.

## Stitch Prompt
Draw a horizontal progress stepper: `--stepper-marker-size` circular step markers with `--stepper-marker-font` numbers, joined by thin `--stepper-connector-height` light grey (`--stepper-connector-background`) lines `--stepper-connector-width` long. Completed steps are solid green (`--stepper-success-marker-background`) circles with a white check; a partially done step is a pale green (`--stepper-partial-marker-background`) circle with a `--stepper-partial-marker-border-width` dashed green border; the current step is solid blue (`--stepper-active-marker-background`) with a white number; future steps are white with a thin light grey border. Each marker has a `--stepper-title-font` title centred beneath it. Optionally, a `--progress-bar-track-height-thin` thin progress bar on a rounded grey progress track runs under the whole row.
