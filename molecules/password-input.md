---
name: Password Input
level: molecule
status: stable
composes: [./text-input.md, ../atoms/icon.md]
tokens:
  # field (aligned with Text Input)
  password-input-container-height-small: '{text-input.text-input-container-height-small}'
  password-input-container-height-medium: '{text-input.text-input-container-height-medium}'
  password-input-container-height-large: '{text-input.text-input-container-height-large}'
  # visibility toggle (type-specific; aligned with the Text Input trailing icon)
  password-input-toggle-icon-foreground-masked: '{text-input.text-input-icon-foreground}'
  password-input-toggle-icon-foreground-revealed: '{text-input.text-input-icon-foreground}'
  password-input-toggle-icon-foreground-disabled: '{text-input.text-input-content-foreground-disabled}'
  password-input-toggle-icon-size: '{text-input.text-input-icon-size-medium}'
  password-input-toggle-icon-size-small: '{text-input.text-input-icon-size-small}'
  password-input-toggle-icon-margin-left: '{text-input.text-input-content-gap}'
---

# Password Input

> A text input field for entering passwords.

All anatomy, sizes, states, spacing and properties are those of [Text Input](./text-input.md). Only the differences are listed here.

## Anatomy
1. Label, field, hint/error – as [Text Input](./text-input.md).
2. Input – masked characters.
3. Trailing visibility toggle – [Icon](../atoms/icon.md) `visibility_off` while masked, `visibility` while revealed; clicking toggles between masked and revealed text.

## Variants
Sizes small / medium / large and rounded exactly as Text Input (`--password-input-container-height-small` / `--password-input-container-height-medium` / `--password-input-container-height-large` tall, `--text-input-container-radius-rounded` or `--text-input-container-radius-sharp` radius).

## States
| State | Toggle icon |
|---|---|
| masked (default) | `visibility_off`, `--password-input-toggle-icon-foreground-masked` |
| revealed | `visibility`, `--password-input-toggle-icon-foreground-revealed` |
| disabled | `--password-input-toggle-icon-foreground-disabled` |

Field states are Text Input's (hover `--text-input-container-border-color-hover` border, focus `--text-input-container-border-width-focused` `--text-input-container-border-color-focused`, error `--text-input-container-background-error` / `--text-input-container-border-color-error`, disabled `--text-input-container-background-disabled`); its tokens govern them.

## Spacing & Sizing
Toggle icon: `--password-input-toggle-icon-size` (`--password-input-toggle-icon-size-small` at small), `--password-input-toggle-icon-margin-left` left margin. Leading icon, prefix, suffix and trailing icon are not shown (the toggle takes the trailing position). The clear button, if enabled, sits to the right of the toggle.

## Properties
Same as [Text Input](./text-input.md): label, hint, error and error text, size, rounded, disabled and clear button. The masked / revealed toggle is always present.

## Usage
- Always label the field ("Password"); give requirements in the hint.
- The toggle lets users verify input; it is an icon only, so give the field a clear label.
- Use the error state with error text for validation failures.

## Stitch Prompt
Draw a standard Zeta text field (white, `--text-input-container-border-width-enabled` `--text-input-container-border-color-enabled` border, `--text-input-container-radius-rounded` corners, `--password-input-container-height-medium` tall) labelled "Password", showing a row of masked dots in near-black and, on the right, a `--password-input-toggle-icon-size` grey eye-with-slash icon that toggles to an open eye when the password is revealed. Below, a small grey hint line with an info icon.
