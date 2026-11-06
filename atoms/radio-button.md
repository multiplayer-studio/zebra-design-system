---
name: Radio Button
level: atom
status: stable
composes: []
tokens:
  radio-button-ring-radius: '{rounded.radius-full}'
  radio-button-ring-border-width: '{border.border-size-medium}'
  radio-button-ring-size-small: '{spacing.spacing-medium}'
  radio-button-ring-size-medium: '{spacing.spacing-large}'
  radio-button-ring-size-large: '{spacing.spacing-xl}'
  radio-button-dot-size-small: '{dimensions.dim-radio-button-dot-size-small}'
  radio-button-dot-size-medium: '{dimensions.dim-radio-button-dot-size-medium}'
  radio-button-dot-size-large: '{dimensions.dim-radio-button-dot-size-large}'
  radio-button-label-font-small: '{typography.body-small}'
  radio-button-label-font-medium: '{typography.body-medium}'
  radio-button-label-font-large: '{typography.body-medium}'
  radio-button-container-gap-small: '{spacing.spacing-small}'
  radio-button-container-gap-medium: '{spacing.spacing-medium}'
  radio-button-container-gap-large: '{spacing.spacing-medium}'
  radio-button-container-touch-target: '{layout.touch-target-ios}'
  # states
  radio-button-ring-background-enabled: '{colors.surface-default}'
  radio-button-ring-background-hover: '{colors.surface-default}'
  radio-button-ring-background-selected: '{colors.surface-default}'
  radio-button-ring-background-selected-hover: '{colors.surface-default}'
  radio-button-ring-background-disabled: '{colors.surface-disabled}'
  radio-button-ring-border-color-enabled: '{colors.main-subtle}'
  radio-button-ring-border-color-hover: '{colors.border-hover}'
  radio-button-ring-border-color-selected: '{colors.surface-primary}'
  radio-button-ring-border-color-selected-hover: '{colors.border-hover}'
  radio-button-ring-border-color-disabled: '{colors.surface-disabled}'
  radio-button-dot-background-selected: '{colors.main-primary}'
  radio-button-dot-background-selected-hover: '{colors.border-hover}'
  radio-button-dot-background-disabled: '{colors.surface-disabled}'
  radio-button-label-foreground-disabled: '{colors.main-disabled}'
  radio-button-focus-ring-width: '{border.border-size-medium}'
  radio-button-focus-ring-color: '{colors.border-primary}'
---

# Radio Button

> Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected.

## Anatomy
1. Row — ring + label; the whole row is clickable.
2. Ring — circle (`--radio-button-ring-radius`), `--radio-button-ring-border-width` border.
3. Dot — filled circle centred in the ring, shown only when selected.
4. Label text.

## Variants
| Size | Ring | Dot | Label font | Gap |
|---|---|---|---|---|
| small | `--radio-button-ring-size-small` | `--radio-button-dot-size-small` | `--radio-button-label-font-small` | `--radio-button-container-gap-small` |
| medium (default) | `--radio-button-ring-size-medium` | `--radio-button-dot-size-medium` | `--radio-button-label-font-medium` | `--radio-button-container-gap-medium` |
| large | `--radio-button-ring-size-large` | `--radio-button-dot-size-large` | `--radio-button-label-font-large` | `--radio-button-container-gap-large` |

Always circular (`--radio-button-ring-radius`); the radio button has no sharp variant.

## States
| State | Ring background | Ring border | Dot |
|---|---|---|---|
| unselected | `--radio-button-ring-background-enabled` | `--radio-button-ring-border-width` `--radio-button-ring-border-color-enabled` | hidden |
| unselected hover | `--radio-button-ring-background-hover` | `--radio-button-ring-border-color-hover` | hidden |
| selected | `--radio-button-ring-background-selected` | `--radio-button-ring-border-color-selected` | `--radio-button-dot-background-selected` |
| selected hover | `--radio-button-ring-background-selected-hover` | `--radio-button-ring-border-color-selected-hover` | `--radio-button-dot-background-selected-hover` |
| disabled | `--radio-button-ring-background-disabled` | `--radio-button-ring-border-color-disabled` | `--radio-button-dot-background-disabled`; label `--radio-button-label-foreground-disabled` |
| focus | — | `--radio-button-focus-ring-width` `--radio-button-focus-ring-color` outline | — |

## Spacing & Sizing
- Border `--radio-button-ring-border-width`; ring `--radio-button-ring-size-small` / `--radio-button-ring-size-medium` / `--radio-button-ring-size-large`; dot `--radio-button-dot-size-small` / `--radio-button-dot-size-medium` / `--radio-button-dot-size-large`.
- Label gap `--radio-button-container-gap-small` / `--radio-button-container-gap-medium` / `--radio-button-container-gap-large`.

## Properties
| Property | Options | Default |
|---|---|---|
| Selected | on / off | off |
| Disabled | on / off | off |
| Size | small, medium, large | medium |
| Label | text | none |

## Usage
- Use for a single choice from 2–7 visible options, presented as one group.
- Pre-select a sensible default when possible; never use a lone radio button (use a checkbox or switch).
- Keep the label clickable and the row ≥ `--radio-button-container-touch-target` on touch UIs; selection is shown by the dot, not colour alone.

## Stitch Prompt
Draw a radio button: a `--radio-button-ring-size-medium` circle with a `--radio-button-ring-border-width` `--radio-button-ring-border-color-enabled` border on `--radio-button-ring-background-enabled`, followed `--radio-button-container-gap-medium` later by a `--radio-button-label-font-medium` label. When selected the ring turns `--radio-button-ring-border-color-selected` and a `--radio-button-dot-size-medium` solid `--radio-button-dot-background-selected` dot sits in its centre. Hover darkens ring and dot to `--radio-button-ring-border-color-selected-hover` and `--radio-button-dot-background-selected-hover`. Disabled radios are flat `--radio-button-ring-background-disabled` circles with `--radio-button-label-foreground-disabled` text. Stack options vertically with a shared group label.
