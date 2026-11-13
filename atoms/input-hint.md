---
name: Input Hint
level: atom
status: draft
composes: [../atoms/icon.md]
tokens:
  # message
  input-hint-font: '{typography.type-body-xsmall}'
  input-hint-foreground: '{colors.color-ink-medium}'
  input-hint-foreground-error: '{colors.color-status-error-default}'
  input-hint-foreground-disabled: '{colors.color-ink-disabled}'
  # icon
  input-hint-icon-size: '{icon.icon-size-small}'
  input-hint-icon-foreground: '{colors.color-ink-high}'
  input-hint-icon-foreground-error: '{colors.color-status-error-default}'
  input-hint-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # spacing
  input-hint-gap: '{space.space-2xs}'
---

# Input Hint

> The supporting line under a field: guidance at rest, the validation message on error.

## Anatomy
1. Icon (optional) — [Icon](../atoms/icon.md), `--input-hint-icon-size`, ahead of the message. `info` by default. Turned on by Show Icon. Swapping it to `error` on an error message is code-side behaviour; Figma keeps `info` and only recolours it.
2. Message — one line of text in `--input-hint-font`, `--input-hint-gap` after the icon.

## Variants
| Type | Message | Icon |
|---|---|---|
| default | `--input-hint-foreground` | `--input-hint-icon-foreground` |
| error | `--input-hint-foreground-error` | `--input-hint-icon-foreground-error` |
| disabled | `--input-hint-foreground-disabled` | `--input-hint-icon-foreground-disabled` |

## States
Input Hint has no interaction states; Type carries the only visual change, and its parent sets it (error with an invalid field, disabled with a disabled field). There is no transition.

## Spacing & Sizing
| Part | Token |
|---|---|
| Icon | `--input-hint-icon-size` square |
| Icon → message | `--input-hint-gap` |
| Message | `--input-hint-font` (the row is one line of it tall) |

The hint hugs its content and is smaller than the field's own text, so the value stays the loudest thing in the stack. Measurements are provisional: the Figma section is thin, so sizes and property names may change once it has its own specification.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | default, error, disabled | default |
| Show Icon | on / off | on |
| Message | text | — |

## Usage
- Use default for guidance about what to enter, such as a format or a limit.
- Use error for the validation message, together with the field's invalid state. The field carries the signal, the hint carries the reason.
- Keep the icon on for errors; it makes an error read as one before the words are read.
- Keep the hint line in place on any field that can fail validation, so the message has somewhere to land without moving the layout.
- Used by [Input](../molecules/input.md), [Select](../molecules/select.md), [Phone Input](../molecules/phone-input.md) and [Stepper Input](../molecules/stepper-input.md).

## Accessibility
- Associate the hint with its field (for example `aria-describedby`), or it is announced as loose text.
- An error message that appears after validation needs announcing; the colour change alone says nothing to assistive technology.
- Error is never colour alone: the wording carries it too, and in code the `error` glyph.
- The icon is decorative; hide it from assistive technology.

## Claude Prompt
Draw a field hint line: a `--input-hint-icon-size` info icon in near-black (`--input-hint-icon-foreground`) followed `--input-hint-gap` later by small grey `--input-hint-font` text (`--input-hint-foreground`). The error version swaps in an error icon and turns both icon and text red (`--input-hint-foreground-error`); the disabled version turns them grey (`--input-hint-foreground-disabled`).
