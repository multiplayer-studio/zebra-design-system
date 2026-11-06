---
name: Select Input
level: molecule
status: stable
composes: [./text-input.md, ../atoms/icon.md]
tokens:
  # field sizes
  select-input-field-height-small: '{dimensions.dim-select-input-height-small}'
  select-input-field-height-medium: '{dimensions.dim-select-input-height-medium}'
  select-input-field-height-large: '{dimensions.dim-select-input-height-large}'
  select-input-field-padding-small: '{spacing.spacing-minimum}'
  select-input-field-padding-medium: '{spacing.spacing-small}'
  select-input-field-padding-large: '{spacing.spacing-medium}'
  select-input-value-font-small: '{typography.body-x-small}'
  # option sizes
  select-input-option-margin-small: '{spacing.spacing-0-5}'
  select-input-option-margin-medium: '{spacing.spacing-medium}'
  select-input-option-margin-large: '{spacing.spacing-large}'
  select-input-option-padding-small: '{spacing.spacing-small}'
  select-input-option-padding-medium: '{spacing.spacing-small}'
  select-input-option-padding-large: '{spacing.spacing-medium}'
  select-input-option-font-small: '{typography.body-x-small}'
  select-input-option-font-medium: '{typography.body-medium}'
  select-input-option-font-large: '{typography.body-medium}'
  # shape
  select-input-chevron-radius-rounded: '{rounded.radius-full}'
  select-input-chevron-radius-sharp: '{rounded.radius-none}'
  # field states
  select-input-field-border-color-filled: '{colors.border-hover}'
  select-input-field-outline-width-focused: '{spacing.spacing-minimum}'
  select-input-field-outline-color-focused: '{colors.border-primary}'
  select-input-field-outline-width-open: '{spacing.spacing-0-5}'
  select-input-field-outline-color-open: '{colors.border-primary}'
  select-input-field-outline-width-error: '{spacing.spacing-minimum}'
  select-input-field-outline-color-error: '{colors.border-negative}'
  select-input-chevron-background-hover: '{colors.main-light}'
  # option states
  select-input-option-background-enabled: '{colors.surface-default}'
  select-input-option-foreground-enabled: '{colors.main-subtle}'
  select-input-option-elevation: '{dimensions.dim-select-input-option-shadow}'
  select-input-option-background-hover: '{colors.main-primary}'
  select-input-option-background-opacity-hover: '{opacity.opacity-hover-tint}'
  select-input-option-foreground-selected: '{colors.main-default}'
  select-input-option-border-width-selected: '{border.border-size-small}'
  select-input-option-border-color-selected: '{colors.border-primary}'
  # label, hint, panel
  select-input-label-margin: '{spacing.spacing-small}'
  select-input-label-font: '{typography.body-medium}'
  select-input-hint-icon-size-large: '{icon.icon-size-medium}'
  select-input-panel-background: '{colors.surface-default}'
  select-input-panel-margin: '{spacing.spacing-0-5}'
  select-input-panel-elevation: '{elevation.elevation-3}'
---

# Select Input

> A text input field for selecting from a list of options. No typing or multi-select support.

## Anatomy
1. Label – text above the field, optional red `*` when required.
2. Field – a [Text Input](./text-input.md) field that behaves like a button and takes keyboard focus. Text Input's tokens govern its border, radius, fills, text colours, label colour and hint row. Select Input keeps these context overrides: taller heights and its own padding (room for the chevron pad), a smaller small-size font (`--select-input-value-font-small`), a larger label (`--select-input-label-font`, `--select-input-label-margin` below), a filled-state border (`--select-input-field-border-color-filled`), focus / open / error drawn as an outer outline instead of a thicker border, and a larger hint icon at large (`--select-input-hint-icon-size-large`).
3. Leading icon (optional) – [Icon](../atoms/icon.md), sized as the Text Input icon.
4. Value / placeholder – single line, ellipsis.
5. Chevron – [Icon](../atoms/icon.md) `expand_more`, rotates 180° when open; has its own circular hover pad.
6. Options panel – floating list below the field with a capped height; scrolls when longer.
7. Option – text row, up to 2 lines.
8. Hint / error row – `info` / `error` `--text-input-hint-icon-size`–`--select-input-hint-icon-size-large` icon + text.

## Variants
| Size | Field padding | Font | Icon | Approx. height (incl. `--text-input-container-border-width-enabled` border) |
|---|---|---|---|---|
| small | `--select-input-field-padding-small` | `--select-input-value-font-small` | `--text-input-icon-size-small` | `--select-input-field-height-small` |
| medium (default) | `--select-input-field-padding-medium` | `--text-input-value-font-medium` | `--text-input-icon-size-medium` | `--select-input-field-height-medium` |
| large | `--select-input-field-padding-large` | `--text-input-value-font-large` | `--text-input-icon-size-large` | `--select-input-field-height-large` |

| Option size | Margin | Padding | Font |
|---|---|---|---|
| small | `--select-input-option-margin-small` | `--select-input-option-padding-small` | `--select-input-option-font-small` |
| medium | `--select-input-option-margin-medium` | `--select-input-option-padding-medium` | `--select-input-option-font-medium` |
| large | `--select-input-option-margin-large` | `--select-input-option-padding-large` | `--select-input-option-font-large` |

| Rounded | Field / panel radius | Chevron pad |
|---|---|---|
| on (default) | `--text-input-container-radius-rounded` | `--select-input-chevron-radius-rounded` (circle) |
| off | `--text-input-container-radius-sharp` | `--select-input-chevron-radius-sharp` |

## States
| State | Field background | Field border / outline | Text |
|---|---|---|---|
| enabled (placeholder) | inherits (white) | `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` | `--text-input-placeholder-foreground` |
| hover | – | `--text-input-container-border-width-enabled` `--text-input-container-border-color-hover`; chevron pad bg `--select-input-chevron-background-hover` | – |
| focused | – | border transparent + outline `--select-input-field-outline-width-focused` `--select-input-field-outline-color-focused` | – |
| open | – | border transparent + outline `--select-input-field-outline-width-open` `--select-input-field-outline-color-open`; chevron flipped | – |
| has value | – | `--text-input-container-border-width-enabled` `--select-input-field-border-color-filled` | `--text-input-value-foreground` |
| error | `--text-input-container-background-error` | outline `--select-input-field-outline-width-error` `--select-input-field-outline-color-error` | hint + icon `--text-input-hint-foreground-error` |
| disabled | `--text-input-container-background-disabled` | `--text-input-container-border-width-enabled` `--text-input-container-border-color-disabled` | all text/icons `--text-input-content-foreground-disabled`, not interactive |

| Option state | Style |
|---|---|
| enabled | bg `--select-input-option-background-enabled`, text `--select-input-option-foreground-enabled`, soft shadow `--select-input-option-elevation` |
| hover | bg `--select-input-option-background-hover` at `--select-input-option-background-opacity-hover` |
| selected | text `--select-input-option-foreground-selected`, `--select-input-option-border-width-selected` outline `--select-input-option-border-color-selected` |

## Spacing & Sizing
| Property | Value |
|---|---|
| Label → field | `--select-input-label-margin` |
| Field → hint | `--text-input-field-gap`; hint icon–text gap `--text-input-hint-gap` |
| Icon / value / chevron gap | `--text-input-content-gap` |
| Label font | `--select-input-label-font` `--text-input-label-foreground` |
| Hint font | `--text-input-hint-font` `--text-input-hint-foreground` |
| Panel | `--select-input-panel-background`, `--select-input-panel-margin` below field, full field width, shadow `--select-input-panel-elevation` |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | — |
| Placeholder | text | — |
| Hint text / Error text | text | none |
| Error | on / off | off |
| Leading icon | any icon | none |
| Open | on / off | off |
| Has value | on / off | off |
| Size | small, medium, large | medium |
| Rounded | on / off | on |
| Disabled | on / off | off |
| Required | on / off (shows `*`) | off |

## Usage
- Use for choosing one item from a known list; no typing or multi-select.
- Always give the field a label; use the placeholder for the empty prompt.
- Keyboard: the field is focusable and opens with arrow/Enter keys.
- Inside scrolling or clipped containers such as dialogs and tables, the options panel must float above the container rather than be cut off.
- Error state combines pink fill, red outline, icon and text — not colour alone.

## Stitch Prompt
Draw a dropdown field: a `--select-input-label-font` near-black label (`--text-input-label-foreground`), then `--select-input-label-margin` below a white box with a `--text-input-container-border-width-enabled` light grey (`--text-input-container-border-color-enabled`) border and `--text-input-container-radius-rounded` corners, `--select-input-field-padding-medium` padding, grey placeholder text "Placeholder" and a `--text-input-icon-size-medium` grey down chevron at the far right. Below it, a small grey info icon with `--text-input-hint-font` hint text. Show it opened: the box gets a `--select-input-field-outline-width-open` soft-blue (`--select-input-field-outline-color-open`) outline, the chevron points up, and a white floating panel with soft shadow (`--select-input-panel-elevation`) lists options in grey `--select-input-option-font-medium` text, the hovered row tinted pale blue and the selected option in dark text with a thin blue outline.
