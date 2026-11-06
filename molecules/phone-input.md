---
name: Phone Input
level: molecule
status: stable
composes: [./text-input.md]
tokens:
  # field (aligned with Text Input)
  phone-input-container-height-small: '{text-input.text-input-container-height-small}'
  phone-input-container-height-medium: '{text-input.text-input-container-height-medium}'
  phone-input-container-height-large: '{text-input.text-input-container-height-large}'
---

# Phone Input

> A text input field for entering phone numbers.

This is a [Text Input](./text-input.md) of type phone: everything (sizes, states, spacing, properties) is Text Input's, and its tokens govern it.

## Anatomy
1. Label, field, hint/error – as Text Input.
2. Value – phone number; brings up the phone keypad on mobile.

There is no country-code selector, input mask, leading icon, prefix, suffix or trailing icon.

## Variants
Sizes small / medium / large (`--phone-input-container-height-small` / `--phone-input-container-height-medium` / `--phone-input-container-height-large`) and rounded as Text Input.

## States
As Text Input.

## Usage
- Label the field and show the expected format in the hint text.
- Use the error state with error text for invalid numbers.

## Stitch Prompt
Draw a standard Zebra text field (white `--text-input-container-background-enabled`, `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` border, `--text-input-container-radius-rounded` corners, `--phone-input-container-height-medium` tall) labelled "Phone number", containing a phone number in `--text-input-value-font-medium` near-black (`--text-input-value-foreground`) text, with a small grey hint line and info icon beneath.
