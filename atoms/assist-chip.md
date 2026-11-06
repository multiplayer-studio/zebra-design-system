---
name: Assist Chip
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # sizing
  assist-chip-container-height: '{spacing.spacing-5xl}'
  assist-chip-container-padding-y: '{spacing.spacing-small}'
  assist-chip-container-padding-x: '{spacing.spacing-medium}'
  assist-chip-container-gap: '{spacing.spacing-small}'
  assist-chip-icon-size: '{icon.icon-size-medium}'
  assist-chip-touch-target-size-minimum: '{layout.touch-target-ios}'
  # shape
  assist-chip-container-radius-rounded: '{rounded.radius-full}'
  assist-chip-container-radius-sharp: '{rounded.radius-none}'
  # states
  assist-chip-container-background-enabled: '{colors.surface-default}'
  assist-chip-container-background-hover: '{colors.surface-hover}'
  assist-chip-container-background-pressed: '{colors.surface-selected}'
  assist-chip-container-background-disabled: '{colors.surface-disabled}'
  assist-chip-label-foreground: '{colors.main-default}'
  assist-chip-label-foreground-disabled: '{colors.main-disabled}'
  assist-chip-container-border-width: '{border.border-size-small}'
  assist-chip-container-border-color: '{colors.border-default}'
  assist-chip-container-border-color-disabled: '{colors.border-disabled}'
  assist-chip-focus-ring-width: '{border.border-size-medium}'
  assist-chip-focus-ring-color: '{colors.border-primary}'
  assist-chip-container-duration: '{motion.motion-fast}'
  assist-chip-container-easing: '{motion.easing-out}'
---

# Assist Chip

> Chips that are clickable, selectable and draggable.

## Anatomy
1. Container — outlined, `--assist-chip-container-height` tall.
2. Leading icon (optional) — [Icon](../atoms/icon.md), `--assist-chip-icon-size` (override: the icon's medium size rather than its default `--icon-size`, to fit the chip height).
3. Label — chip text.

## Variants
| Shape | Radius |
|---|---|
| rounded (default) | `--assist-chip-container-radius-rounded` (pill) |
| sharp | `--assist-chip-container-radius-sharp` |

With or without leading icon.

## States
| State | Background | Text | Outline |
|---|---|---|---|
| enabled | `--assist-chip-container-background-enabled` | `--assist-chip-label-foreground` | `--assist-chip-container-border-width` `--assist-chip-container-border-color` |
| hover | `--assist-chip-container-background-hover` | `--assist-chip-label-foreground` | `--assist-chip-container-border-color` |
| pressed | `--assist-chip-container-background-pressed` | `--assist-chip-label-foreground` | `--assist-chip-container-border-color` |
| focused | — | — | `--assist-chip-focus-ring-width` `--assist-chip-focus-ring-color` focus ring |
| disabled | `--assist-chip-container-background-disabled` | `--assist-chip-label-foreground-disabled` | `--assist-chip-container-border-color-disabled` |

Background transitions `--assist-chip-container-duration` `--assist-chip-container-easing`.

## Spacing & Sizing
| Property | Token |
|---|---|
| Height | `--assist-chip-container-height` |
| Padding | `--assist-chip-container-padding-y` / `--assist-chip-container-padding-x` |
| Gap | `--assist-chip-container-gap` |
| Icon | `--assist-chip-icon-size` (icon size) |
| Outline | `--assist-chip-container-border-width` |
| Font | inherited from context |

## Properties
| Property | Options | Default |
|---|---|---|
| Leading icon | any icon | none |
| Label | text | — |
| Rounded | on (pill) / off (sharp) | on |
| Disabled | on / off | off |

## Usage
- Use for smart/suggested actions related to the current content (e.g. "Add to calendar").
- Keep labels short; an icon helps recognition but don't use icon-only assist chips.
- `--assist-chip-container-height` height: extend the hit area to `--assist-chip-touch-target-size-minimum`+ on touch UIs.

## Stitch Prompt
Draw a Zebra assist chip: a `--assist-chip-container-height`-tall white pill with a thin `--assist-chip-container-border-width` light-grey (`--assist-chip-container-border-color`) outline, `--assist-chip-container-padding-x` side padding, an optional `--assist-chip-icon-size` dark rounded icon, `--assist-chip-container-gap` gap, then a short dark (`--assist-chip-label-foreground`) label. Hover fills it very light grey `--assist-chip-container-background-hover`, pressed tints it pale blue `--assist-chip-container-background-pressed`. Disabled is flat light grey `--assist-chip-container-background-disabled` with grey text (`--assist-chip-label-foreground-disabled`). A sharp variant has square corners.
