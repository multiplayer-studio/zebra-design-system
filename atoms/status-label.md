---
name: Status Label
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  status-label-container-border-width: '{border.border-size-small}'
  status-label-container-padding-y: '{border.border-size-small}'
  status-label-container-padding-x: '{spacing.spacing-small}'
  status-label-container-gap: '{spacing.spacing-small}'
  status-label-container-height: '{dimensions.dim-status-label-height}'
  status-label-container-radius-rounded: '{rounded.radius-full}'
  status-label-container-radius-sharp: '{rounded.radius-none}'
  status-label-icon-size: '{icon.icon-size-medium}'
  status-label-dot-size: '{dimensions.dim-status-label-dot-size}'
  status-label-label-font: '{typography.body-medium}'
  status-label-label-height: '{spacing.spacing-2xl}'
  # neutral
  status-label-neutral-container-border-color: '{colors.border-default}'
  status-label-neutral-container-background: '{colors.main-light}'
  status-label-neutral-icon-foreground: '{colors.main-subtle}'
  status-label-neutral-label-foreground: '{colors.main-default}'
  # info
  status-label-info-container-border-color: '{colors.border-info}'
  status-label-info-container-background: '{colors.surface-info-subtle}'
  status-label-info-icon-foreground: '{colors.main-info}'
  status-label-info-label-foreground: '{colors.main-default}'
  # positive
  status-label-positive-container-border-color: '{colors.border-positive}'
  status-label-positive-container-background: '{colors.surface-positive-subtle}'
  status-label-positive-icon-foreground: '{colors.main-positive}'
  status-label-positive-label-foreground: '{colors.main-default}'
  # warning
  status-label-warning-container-border-color: '{colors.border-warning}'
  status-label-warning-container-background: '{colors.surface-warning-subtle}'
  status-label-warning-icon-foreground: '{colors.main-warning}'
  status-label-warning-label-foreground: '{colors.main-default}'
  # negative
  status-label-negative-container-border-color: '{colors.border-negative}'
  status-label-negative-container-background: '{colors.surface-negative-subtle}'
  status-label-negative-icon-foreground: '{colors.main-negative}'
  status-label-negative-label-foreground: '{colors.main-default}'
---

# Status Label

> To help some information, labels, or errors stand out, we present them with badges. They can look like buttons, but users can't select them. They just guide users to things they should pay attention to.

## Anatomy
1. Container — inline row, `--status-label-container-border-width` border, tinted fill.
2. Leading icon (optional) — an [Icon](../atoms/icon.md), or a `--status-label-dot-size` filled circle when no icon is given. Context overrides: the icon is sized `--status-label-icon-size` (smaller than the Icon default, to fit the label height) and drawn in the status colour (`--status-label-neutral-icon-foreground` etc.) instead of the Icon default colour, so it carries the status.
3. Text — the label.

## Variants
| Status | Border | Background | Icon / dot | Text |
|---|---|---|---|---|
| neutral (default) | `--status-label-neutral-container-border-color` | `--status-label-neutral-container-background` | `--status-label-neutral-icon-foreground` | `--status-label-neutral-label-foreground` |
| info | `--status-label-info-container-border-color` | `--status-label-info-container-background` | `--status-label-info-icon-foreground` | `--status-label-info-label-foreground` |
| positive | `--status-label-positive-container-border-color` | `--status-label-positive-container-background` | `--status-label-positive-icon-foreground` | `--status-label-positive-label-foreground` |
| warning | `--status-label-warning-container-border-color` | `--status-label-warning-container-background` | `--status-label-warning-icon-foreground` | `--status-label-warning-label-foreground` |
| negative | `--status-label-negative-container-border-color` | `--status-label-negative-container-background` | `--status-label-negative-icon-foreground` | `--status-label-negative-label-foreground` |

| Shape | Radius |
|---|---|
| rounded (default) | `--status-label-container-radius-rounded` (pill) |
| sharp | `--status-label-container-radius-sharp` |

## States
Static, non-interactive.

## Spacing & Sizing
| Property | Token |
|---|---|
| Border | `--status-label-container-border-width` |
| Padding (v / h) | `--status-label-container-padding-y` / `--status-label-container-padding-x` minus `--status-label-container-border-width` |
| Gap icon–text | `--status-label-container-gap` |
| Icon box | `--status-label-icon-size` (dot `--status-label-dot-size`) |
| Text | `--status-label-label-font`, height `--status-label-label-height` |
| Total height | `--status-label-label-height` + twice `--status-label-container-padding-y` padding + twice `--status-label-container-border-width` border = `--status-label-container-height` |

## Properties
| Property | Options | Default |
|---|---|---|
| Status | neutral, info, positive, warning, negative | neutral |
| Label | text | none |
| Icon | icon | none (dot) |
| Show icon | on / off | on |
| Rounded | on / off | on |

## Usage
- Use to call out an item's state (Active, Pending, Failed); it must not look or behave like a button.
- Text is always dark — the meaning is carried by the word plus the icon/dot, not colour alone.
- Pick an icon that reinforces the status (e.g. `check_circle`, `warning`, `error`) or use the default dot.

## Stitch Prompt
Draw a status label: a `--status-label-container-height`-tall pill (`--status-label-container-radius-rounded`) with a `--status-label-container-border-width` coloured outline and a very pale tinted fill, `--status-label-container-padding-x` minus `--status-label-container-border-width` side padding, a `--status-label-icon-size` leading status icon (or a small `--status-label-dot-size` dot) in the status colour, `--status-label-container-gap` gap, then `--status-label-neutral-label-foreground` `--status-label-label-font` text. Positive uses a `--status-label-positive-container-border-color` outline on `--status-label-positive-container-background` with a `--status-label-positive-icon-foreground` icon; warning `--status-label-warning-container-border-color` on `--status-label-warning-container-background`; negative `--status-label-negative-container-border-color` on `--status-label-negative-container-background`; info `--status-label-info-container-border-color` on `--status-label-info-container-background`; neutral `--status-label-neutral-container-border-color` outline on `--status-label-neutral-container-background`. A sharp version has square corners (`--status-label-container-radius-sharp`).
