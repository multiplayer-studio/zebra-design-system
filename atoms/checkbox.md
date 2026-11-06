---
name: Checkbox
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  checkbox-box-border-width: '{border.border-size-medium}'
  checkbox-box-radius: '{dimensions.dim-checkbox-radius}'
  # sizes
  checkbox-box-size-small: '{dimensions.dim-checkbox-size-small}'
  checkbox-box-size-medium: '{dimensions.dim-checkbox-size-medium}'
  checkbox-box-size-large: '{dimensions.dim-checkbox-size-large}'
  checkbox-icon-size-small: '{icon.icon-size-small}'
  checkbox-icon-size-medium: '{icon.icon-size-medium}'
  checkbox-label-font-small: '{typography.label-small}'
  checkbox-label-font-medium: '{typography.body-medium}'
  checkbox-label-font-large: '{typography.body-medium}'
  checkbox-container-gap-small: '{spacing.spacing-small}'
  checkbox-container-gap-medium: '{spacing.spacing-medium}'
  checkbox-container-gap-large: '{spacing.spacing-medium}'
  # states
  checkbox-box-background-enabled: '{colors.surface-default}'
  checkbox-box-border-color-enabled: '{colors.main-subtle}'
  checkbox-box-background-hover: '{colors.surface-default}'
  checkbox-box-border-color-hover: '{colors.border-hover}'
  checkbox-box-background-selected: '{colors.surface-primary}'
  checkbox-box-border-color-selected: '{colors.surface-primary}'
  checkbox-box-background-selected-hover: '{colors.border-hover}'
  checkbox-box-border-color-selected-hover: '{colors.border-hover}'
  checkbox-box-background-disabled: '{colors.surface-disabled}'
  checkbox-box-border-color-disabled: '{colors.surface-disabled}'
  checkbox-focus-ring-width: '{border.border-size-medium}'
  checkbox-focus-ring-color: '{colors.border-primary}'
  checkbox-container-min-height-touch: '{layout.touch-target-ios}'
---

# Checkbox

> Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off.

## Anatomy
1. Row — box and label side by side with a gap; the whole row is clickable.
2. Box — square, `--checkbox-box-border-width` border.
3. Check / indeterminate mark — [Icon](../atoms/icon.md) in its inverse colour (`--icon-foreground-inverse`, disabled `--icon-foreground-disabled`), hidden until checked or indeterminate. Small and medium checkboxes override the icon size down to `--checkbox-icon-size-small` / `--checkbox-icon-size-medium` to fit the smaller boxes; large uses the icon default. The mark is **perfectly centred** on the box, horizontally and vertically. The box sizes (`--checkbox-box-size-small` / `--checkbox-box-size-medium` / `--checkbox-box-size-large`) include the border (`--checkbox-box-border-width`), so the mark can be as large as, or slightly larger than, the space inside the border. Centre it on the box itself (e.g. absolute position with a centring transform, or the platform's equivalent) and never with flow layout, which would push an oversized mark down and to the right.
4. Label text — optional; the reversed layout puts the text before the box.

## Variants
| Size | Box (min) | Mark icon | Label font | Gap |
|---|---|---|---|---|
| small | `--checkbox-box-size-small` square | `--checkbox-icon-size-small` | `--checkbox-label-font-small` | `--checkbox-container-gap-small` |
| medium (default) | `--checkbox-box-size-medium` square | `--checkbox-icon-size-medium` | `--checkbox-label-font-medium` | `--checkbox-container-gap-medium` |
| large | `--checkbox-box-size-large` square | `--icon-size` | `--checkbox-label-font-large` | `--checkbox-container-gap-large` |

Shape: rounded (default) → `--checkbox-box-radius` corner radius; not rounded → square corners.

## States
| State | Box background | Box border | Mark |
|---|---|---|---|
| unchecked | `--checkbox-box-background-enabled` | `--checkbox-box-border-width` `--checkbox-box-border-color-enabled` | hidden |
| unchecked hover | `--checkbox-box-background-hover` | `--checkbox-box-border-color-hover` | hidden |
| checked / indeterminate | `--checkbox-box-background-selected` | `--checkbox-box-border-color-selected` | `--icon-foreground-inverse` |
| checked hover | `--checkbox-box-background-selected-hover` | `--checkbox-box-border-color-selected-hover` | `--icon-foreground-inverse` |
| disabled (any) | `--checkbox-box-background-disabled` | `--checkbox-box-border-color-disabled` | `--icon-foreground-disabled` |
| focus-visible | — | — | `--checkbox-focus-ring-width` `--checkbox-focus-ring-color` outline |

## Spacing & Sizing
- Border: `--checkbox-box-border-width`.
- Box sizes `--checkbox-box-size-small` / `--checkbox-box-size-medium` / `--checkbox-box-size-large`; mark `--checkbox-icon-size-small` / `--checkbox-icon-size-medium` / `--icon-size`; label gap `--checkbox-container-gap-small` / `--checkbox-container-gap-medium` / `--checkbox-container-gap-large`.
- Row height is the label line-height (`--checkbox-label-font-medium` at medium) or the box, whichever is larger.

## Properties
| Property | Options | Default |
|---|---|---|
| Checked | on / off | off |
| Indeterminate | on / off | off |
| Disabled | on / off | off |
| Size | small, medium, large | medium |
| Rounded | on / off | on |
| Reversed (label first) | on / off | off |
| Label | text | none |

## Usage
- Use for multi-select from a list, or a single on/off option that is submitted with a form (use a Switch for immediate toggles).
- Use indeterminate for a parent whose children are partially selected.
- Always give a visible label; the label is part of the hit area — keep the row ≥ `--checkbox-container-min-height-touch` tall on touch UIs.
- Checked state is shown by fill + mark, not by colour alone.

## Stitch Prompt
Draw a Zebra checkbox: a `--checkbox-box-size-medium` square with a `--checkbox-box-border-width` dark-grey (`--checkbox-box-border-color-enabled`) border and barely rounded `--checkbox-box-radius` corners on white, followed `--checkbox-container-gap-medium` later by a `--checkbox-label-font-medium` IBM Plex Sans label. When checked the square fills solid blue `--checkbox-box-background-selected` with a light check mark; indeterminate shows a light horizontal dash on the same blue. Hovering darkens the border (or the checked fill) to near-black `--checkbox-box-border-color-hover`. Disabled boxes are flat light grey `--checkbox-box-background-disabled` with grey text.
