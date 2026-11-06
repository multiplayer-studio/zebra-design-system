---
name: Button
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # primary
  button-primary-container-background-enabled: '{colors.state-primary-enabled}'
  button-primary-container-background-hover: '{colors.state-primary-hover}'
  button-primary-container-background-pressed: '{colors.state-primary-selected}'
  button-primary-label-foreground: '{colors.state-default-enabled}'
  # positive
  button-positive-container-background-enabled: '{colors.state-positive-enabled}'
  button-positive-container-background-hover: '{colors.state-positive-hover}'
  button-positive-container-background-pressed: '{colors.state-positive-selected}'
  button-positive-label-foreground: '{colors.state-default-enabled}'
  # negative
  button-negative-container-background-enabled: '{colors.state-negative-enabled}'
  button-negative-container-background-hover: '{colors.state-negative-hover}'
  button-negative-container-background-pressed: '{colors.state-negative-selected}'
  button-negative-label-foreground: '{colors.state-default-enabled}'
  # outline
  button-outline-container-background-enabled: '{colors.surface-default}'
  button-outline-container-background-hover: '{colors.surface-hover}'
  button-outline-container-background-pressed: '{colors.surface-selected}'
  button-outline-label-foreground: '{colors.main-primary}'
  button-outline-container-border-width: '{border.border-size-small}'
  button-outline-container-border-color: '{colors.border-primary-main}'
  # outline-subtle
  button-outline-subtle-container-background-enabled: '{colors.surface-default}'
  button-outline-subtle-container-background-hover: '{colors.surface-hover}'
  button-outline-subtle-container-background-pressed: '{colors.surface-selected}'
  button-outline-subtle-label-foreground: '{colors.main-default}'
  button-outline-subtle-container-border-width: '{border.border-size-small}'
  button-outline-subtle-container-border-color: '{colors.border-default}'
  # text
  button-text-container-background-enabled: '{colors.surface-default}'
  button-text-container-background-hover: '{colors.surface-hover}'
  button-text-container-background-pressed: '{colors.surface-selected}'
  button-text-label-foreground: '{colors.main-primary}'
  # subtle
  button-subtle-container-background-enabled: '{colors.surface-default}'
  button-subtle-container-background-hover: '{colors.surface-hover}'
  button-subtle-container-background-pressed: '{colors.surface-selected}'
  button-subtle-label-foreground: '{colors.main-subtle}'
  # shape
  button-container-radius-sharp: '{rounded.radius-none}'
  button-container-radius-rounded: '{rounded.radius-minimal}'
  button-container-radius-full: '{rounded.radius-full}'
  # states
  button-container-background-disabled: '{colors.surface-disabled}'
  button-label-foreground-disabled: '{colors.main-disabled}'
  button-focus-ring-width: '{border.border-size-medium}'
  button-focus-ring-color: '{colors.border-primary}'
  # sizes
  button-container-height-small: '{dimensions.dim-button-height-small}'
  button-container-height-medium: '{dimensions.dim-button-height-medium}'
  button-container-height-large: '{dimensions.dim-button-height-large}'
  button-container-padding-y-small: '{spacing.spacing-small}'
  button-container-padding-y-medium: '{spacing.spacing-small}'
  button-container-padding-y-large: '{spacing.spacing-medium}'
  button-container-padding-x-small: '{spacing.spacing-small}'
  button-container-padding-x-medium: '{spacing.spacing-medium}'
  button-container-padding-x-large: '{spacing.spacing-large}'
  button-container-gap-small: '{spacing.spacing-minimum}'
  button-container-gap-medium: '{spacing.spacing-small}'
  button-container-gap-large: '{spacing.spacing-small}'
  button-label-font-small: '{typography.label-small}'
  button-label-font-medium: '{typography.label-large}'
  button-label-font-large: '{typography.label-large}'
  button-icon-size-small: '{icon.icon-size-small}'
  button-icon-size-medium: '{icon.icon-size-medium}'
  button-icon-size-large: '{icon.icon-size-medium}'
  button-touch-target-size-minimum: '{layout.touch-target-ios}'
  button-touch-target-size-recommended: '{layout.touch-target-recommended}'
---

# Button

> Buttons are used to trigger actions.

## Anatomy
1. Container — horizontal row, content centred.
2. Leading icon (optional) — [Icon](../atoms/icon.md), coloured with the label foreground; style follows the button shape.
3. Label — button text, `--button-label-font-medium`.
4. Trailing icon (optional) — [Icon](../atoms/icon.md), as the leading icon.

## Variants
Flavor (light mode). Text/icon colour is the same in every interactive state.

| Flavor | Enabled bg | Hover bg | Pressed bg | Text / icon | Border |
|---|---|---|---|---|---|
| primary (default) | `--button-primary-container-background-enabled` | `--button-primary-container-background-hover` | `--button-primary-container-background-pressed` | `--button-primary-label-foreground` | none |
| positive | `--button-positive-container-background-enabled` | `--button-positive-container-background-hover` | `--button-positive-container-background-pressed` | `--button-positive-label-foreground` | none |
| negative | `--button-negative-container-background-enabled` | `--button-negative-container-background-hover` | `--button-negative-container-background-pressed` | `--button-negative-label-foreground` | none |
| outline | `--button-outline-container-background-enabled` | `--button-outline-container-background-hover` | `--button-outline-container-background-pressed` | `--button-outline-label-foreground` | `--button-outline-container-border-width` inset ring `--button-outline-container-border-color` |
| outline-subtle | `--button-outline-subtle-container-background-enabled` | `--button-outline-subtle-container-background-hover` | `--button-outline-subtle-container-background-pressed` | `--button-outline-subtle-label-foreground` | `--button-outline-subtle-container-border-width` ring `--button-outline-subtle-container-border-color` |
| text | `--button-text-container-background-enabled` | `--button-text-container-background-hover` | `--button-text-container-background-pressed` | `--button-text-label-foreground` | none |
| subtle | `--button-subtle-container-background-enabled` | `--button-subtle-container-background-hover` | `--button-subtle-container-background-pressed` | `--button-subtle-label-foreground` | none |

The outline ring sits inside the container, so it adds no size.

Shape: sharp → `--button-container-radius-sharp` with zeta-icons-sharp; rounded (default) → `--button-container-radius-rounded` with zeta-icons-round; full → `--button-container-radius-full` (pill) with zeta-icons-round.

## States
| State | Background | Foreground | Notes |
|---|---|---|---|
| enabled | per flavor | per flavor | |
| hover | per flavor (hover column) | unchanged | pointer devices only |
| pressed | per flavor (pressed column) | unchanged | |
| focused | unchanged | unchanged | `--button-focus-ring-width` `--button-focus-ring-color` focus ring |
| disabled | `--button-container-background-disabled` | `--button-label-foreground-disabled` text + icon | not interactive |

## Spacing & Sizing
| Size | Padding (V / H) | Font | Icon | Gap | Resulting height |
|---|---|---|---|---|---|
| small | `--button-container-padding-y-small` / `--button-container-padding-x-small` | `--button-label-font-small` | `--button-icon-size-small` | `--button-container-gap-small` | `--button-container-height-small` |
| medium (default) | `--button-container-padding-y-medium` / `--button-container-padding-x-medium` | `--button-label-font-medium` | `--button-icon-size-medium` | `--button-container-gap-medium` | `--button-container-height-medium` |
| large | `--button-container-padding-y-large` / `--button-container-padding-x-large` | `--button-label-font-large` | `--button-icon-size-large` | `--button-container-gap-large` | `--button-container-height-large` |

Width hugs the content; long labels truncate with an ellipsis.

Icon size is a context override: buttons use the icon atom's smaller sizes (`--icon-size-small` / `--icon-size-medium`) instead of its default `--icon-size`, to sit in line with the label.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavor | primary, positive, negative, outline, outline-subtle, text, subtle | primary |
| Shape | sharp, rounded, full | rounded |
| Size | small, medium, large | medium |
| Leading icon / Trailing icon | any icon | none |
| Label | text | — |
| Disabled | on / off | off |

## Usage
- Use for triggering actions; use one primary button per area, and outline / text / subtle for lower-emphasis actions.
- Use positive / negative only for confirm / destructive actions; pair colour with a clear label (don't rely on colour alone).
- Keep the shape consistent with the surrounding UI (sharp UIs use sharp icons).
- Touch target: small (`--button-container-height-small`) is below the `--button-touch-target-size-minimum`–`--button-touch-target-size-recommended` minimum — add surrounding hit area on touch UIs.
- Focus ring: `--button-focus-ring-width` `--button-focus-ring-color`.

## Stitch Prompt
Draw a Zebra button: a compact rectangle `--button-container-height-medium` tall with `--button-container-radius-rounded` corners, `--button-container-padding-x-medium` horizontal padding, and a centred label in `--button-label-font-medium`. The primary version is solid Zebra blue (`--button-primary-container-background-enabled`) with white text (`--button-primary-label-foreground`), lightening to `--button-primary-container-background-hover` on hover and darkening to `--button-primary-container-background-pressed` when pressed. Optional `--button-icon-size-medium` rounded icons sit `--button-container-gap-medium` from the label on either side. Secondary styles are white with blue text and a thin `--button-outline-container-border-width` blue outline (outline), white with dark text and a light grey outline (outline-subtle), or plain blue text (text). Disabled buttons are flat light grey (`--button-container-background-disabled`) with grey text (`--button-label-foreground-disabled`). Small buttons are `--button-container-height-small` tall with `--button-label-font-small` text and `--button-icon-size-small` icons; large buttons are `--button-container-height-large` tall.
