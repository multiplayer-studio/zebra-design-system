---
name: Time Input
level: molecule
status: stable
composes: [./text-input.md, ../atoms/icon.md]
tokens:
  # field (aligned with Text Input)
  time-input-container-height-small: '{text-input.text-input-container-height-small}'
  time-input-container-height-medium: '{text-input.text-input-container-height-medium}'
  time-input-container-height-large: '{text-input.text-input-container-height-large}'
  # clock icon (type-specific; aligned with the Text Input trailing icon)
  time-input-icon-foreground: '{text-input.text-input-icon-foreground}'
  time-input-icon-foreground-disabled: '{text-input.text-input-content-foreground-disabled}'
  time-input-icon-size: '{text-input.text-input-icon-size-medium}'
  time-input-icon-size-small: '{text-input.text-input-icon-size-small}'
  time-input-icon-margin: '{text-input.text-input-content-gap}'
---

# Time Input

> A text input field for entering times.

This is a [Text Input](./text-input.md) of type time: the field, label, hint, states and shapes are Text Input's and its tokens govern them. Only the clock icon is specific to this type.

## Anatomy
1. Label, field, hint/error – as Text Input.
2. Value – a time in hours and minutes (e.g. 15:29), shown in the user's locale format.
3. Trailing clock icon – [Icon](../atoms/icon.md) `clock_outline`; selecting it opens a time picker.

## Variants
Sizes small / medium / large (`--time-input-container-height-small` / `--time-input-container-height-medium` / `--time-input-container-height-large`) and rounded as Text Input.

## States
Clock icon `--time-input-icon-foreground`; disabled `--time-input-icon-foreground-disabled`. Field states as Text Input.

## Spacing & Sizing
Clock icon `--time-input-icon-size` (`--time-input-icon-size-small` at small), `--time-input-icon-margin` left margin. No leading icon, prefix, suffix or other trailing icon.

## Properties
As Text Input, plus: earliest / latest allowed time.

## Usage
- Label the field; state 12h/24h expectations in the hint text if relevant.

## Stitch Prompt
Draw a standard Zeta text field (white `--text-input-container-background-enabled`, `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` border, `--text-input-container-radius-rounded` corners, `--time-input-container-height-medium` tall) labelled "Time", containing a time such as 15:29 in `--text-input-value-font-medium` near-black (`--text-input-value-foreground`) text, with a `--time-input-icon-size` grey (`--time-input-icon-foreground`) outlined clock icon on the right edge. Below, a small grey hint line with an info icon.
