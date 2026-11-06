---
name: Filter Chip
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  filter-chip-container-height: '{spacing.spacing-5xl}'
  filter-chip-container-padding-y: '{spacing.spacing-small}'
  filter-chip-container-padding-x: '{spacing.spacing-medium}'
  filter-chip-container-gap: '{spacing.spacing-small}'
  filter-chip-group-gap: '{spacing.spacing-small}'
  filter-chip-icon-size: '{icon.icon-size-medium}'
  filter-chip-container-radius-rounded: '{rounded.radius-full}'
  filter-chip-container-radius-sharp: '{rounded.radius-none}'
  filter-chip-container-border-width: '{border.border-size-small}'
  # states
  filter-chip-container-background-enabled: '{colors.surface-default}'
  filter-chip-container-background-hover: '{colors.surface-hover}'
  filter-chip-container-background-pressed: '{colors.surface-selected}'
  filter-chip-container-background-selected: '{colors.surface-default-inverse}'
  filter-chip-container-background-disabled: '{colors.surface-disabled}'
  filter-chip-label-foreground-enabled: '{colors.main-default}'
  filter-chip-label-foreground-hover: '{colors.main-default}'
  filter-chip-label-foreground-pressed: '{colors.main-default}'
  filter-chip-label-foreground-selected: '{colors.main-inverse}'
  filter-chip-label-foreground-disabled: '{colors.main-disabled}'
  filter-chip-container-border-color-enabled: '{colors.border-default}'
  filter-chip-container-border-color-hover: '{colors.border-default}'
  filter-chip-container-border-color-pressed: '{colors.border-default}'
  filter-chip-container-border-color-selected: '{colors.border-default}'
  filter-chip-container-border-color-disabled: '{colors.border-disabled}'
  filter-chip-focus-ring-width: '{border.border-size-medium}'
  filter-chip-focus-ring-color: '{colors.border-primary}'
  filter-chip-container-duration: '{motion.motion-fast}'
  filter-chip-container-easing: '{motion.easing-out}'
---

# Filter Chip

> Chips that are used to filter content, that are clickable, selectable and draggable. They have a default and active state.

## Anatomy
1. Container — outlined, `--filter-chip-container-height` tall; tapping toggles active.
2. Check icon — `check_mark` [icon](../atoms/icon.md), `--filter-chip-icon-size`, shown only when active. Context overrides of the icon defaults: the chip-sized `--filter-chip-icon-size` (`--icon-size-medium`) and the chip's text colour (`--filter-chip-label-foreground-selected` when active) so icon and label match.
3. Label — text.

## Variants
| Shape | Radius |
|---|---|
| rounded (default) | `--filter-chip-container-radius-rounded` (pill) |
| sharp | `--filter-chip-container-radius-sharp` |

## States
| State | Background | Text / icon | Outline |
|---|---|---|---|
| default | `--filter-chip-container-background-enabled` | `--filter-chip-label-foreground-enabled` | `--filter-chip-container-border-width` `--filter-chip-container-border-color-enabled` |
| hover | `--filter-chip-container-background-hover` | `--filter-chip-label-foreground-hover` | `--filter-chip-container-border-color-hover` |
| pressed | `--filter-chip-container-background-pressed` | `--filter-chip-label-foreground-pressed` | `--filter-chip-container-border-color-pressed` |
| active (selected) | `--filter-chip-container-background-selected` | `--filter-chip-label-foreground-selected`, check icon shown | `--filter-chip-container-border-color-selected` |
| focus-visible | — | — | `--filter-chip-focus-ring-width` `--filter-chip-focus-ring-color` outline |
| disabled | `--filter-chip-container-background-disabled` | `--filter-chip-label-foreground-disabled` | `--filter-chip-container-border-color-disabled` |

Background transitions over `--filter-chip-container-duration` `--filter-chip-container-easing`.

## Spacing & Sizing
| Property | Token |
|---|---|
| Height | `--filter-chip-container-height` |
| Padding | `--filter-chip-container-padding-y` / `--filter-chip-container-padding-x` |
| Gap | `--filter-chip-container-gap` |
| Check icon | `--filter-chip-icon-size` |
| Outline | `--filter-chip-container-border-width` |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | — |
| Active | on / off | off |
| Disabled | on / off | off |
| Rounded | on / off | on |

## Usage
- Use in a row to filter a list or result set; multiple chips can be active at once.
- The check icon plus inverted fill marks selection — not colour alone; announce the pressed state to assistive tech.
- Typically grouped in a [filter selection bar](../organisms/filter-selection-bar.md).

## Stitch Prompt
Draw a Zebra filter chip: a `--filter-chip-container-height`-tall white pill with a thin light-grey (`--filter-chip-container-border-color-enabled`) outline, `--filter-chip-container-padding-x` side padding and a short dark label. When active it inverts to a near-black (`--filter-chip-container-background-selected`) pill with light (`--filter-chip-label-foreground-selected`) text and a `--filter-chip-icon-size` check-mark icon before the label. Hover is very light grey `--filter-chip-container-background-hover`; disabled is flat `--filter-chip-container-background-disabled` with grey text. Show several chips in a row with `--filter-chip-group-gap` gaps, one or two active.
