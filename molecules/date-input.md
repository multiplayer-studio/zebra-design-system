---
name: Date Input
level: molecule
status: stable
composes: [./text-input.md, ../atoms/icon.md]
tokens:
  # field (aligned with Text Input)
  date-input-container-height-small: '{text-input.text-input-container-height-small}'
  date-input-container-height-medium: '{text-input.text-input-container-height-medium}'
  date-input-container-height-large: '{text-input.text-input-container-height-large}'
  # calendar icon (type-specific; aligned with the Text Input trailing icon)
  date-input-icon-size: '{text-input.text-input-icon-size-medium}'
  date-input-icon-size-small: '{text-input.text-input-icon-size-small}'
  date-input-icon-margin-left: '{text-input.text-input-content-gap}'
  date-input-icon-foreground-enabled: '{text-input.text-input-icon-foreground}'
  date-input-icon-foreground-disabled: '{text-input.text-input-content-foreground-disabled}'
---

# Date Input

> A text input field for entering dates.

This is a [Text Input](./text-input.md) of type date: the field, label, hint, states and shapes are Text Input's and its tokens govern them. Only the calendar icon is specific to this type.

## Anatomy
1. Label, field, hint/error – as Text Input.
2. Input – the date, shown in the user's locale date format.
3. Trailing calendar icon – [Icon](../atoms/icon.md) `calendar_3_day`; opens the date picker.

## Variants
Sizes small / medium / large (`--date-input-container-height-small` / `--date-input-container-height-medium` / `--date-input-container-height-large`) and rounded / sharp as Text Input.

## States
Calendar icon `--date-input-icon-foreground-enabled` (the Text Input icon colour); disabled `--date-input-icon-foreground-disabled`. Field states as Text Input.

## Spacing & Sizing
Calendar icon `--date-input-icon-size` (`--date-input-icon-size-small` at small), `--date-input-icon-margin-left` left margin. Leading icon, prefix, suffix and custom trailing icon are not shown for this type.

## Properties
Text Input properties, plus:
| Property | Options | Default |
|---|---|---|
| Earliest / latest date | date | none |

## Usage
- Label the field and show the expected format in the hint text.
- Constrain with an earliest / latest date instead of validating after entry.

## Stitch Prompt
Draw a standard Zeta text field (`--text-input-container-background-enabled`, `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` border, `--text-input-container-radius-rounded` corners, `--date-input-container-height-medium` tall) labelled "Date", containing a date such as 03-15-2023 in `--text-input-value-font-medium` `--text-input-value-foreground` text, with a `--date-input-icon-size` `--date-input-icon-foreground-enabled` calendar icon on the right edge. Below, a small `--text-input-hint-foreground` hint line with an info icon.
