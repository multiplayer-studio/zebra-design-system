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

> The supporting lines between a field's label and its input: the hint, always visible, and the error line beneath it when the value fails validation.

## Anatomy
1. Icon (optional) — [Icon](../atoms/icon.md), `--input-hint-icon-size`, ahead of the message: `info` on a hint, `error` on an error line (the system's one error glyph). Turned on by Show Icon; always on for an error.
2. Message — text in `--input-hint-font`, `--input-hint-gap` after the icon. It wraps onto more lines rather than truncating.

**Placement.** A field reads label, hint, error, input ([patterns 1.124](../patterns/01-screen-composition.md), [1.64](../patterns/01-screen-composition.md)). The hint (Type default) sits under the [Input Label](../atoms/input-label.md) and above the input. When validation fails, a second Input Hint of Type error appears as its own line between the hint and the input; the hint stays visible above it. A field with no hint shows only the error line there. The gaps between label, hint, error and input belong to the field that composes them.

## Variants
| Type | Message | Icon |
|---|---|---|
| default (the hint) | `--input-hint-foreground` | `info`, `--input-hint-icon-foreground` |
| error (the error line) | `--input-hint-foreground-error` | `error`, `--input-hint-icon-foreground-error` |
| disabled (the hint of a disabled field) | `--input-hint-foreground-disabled` | `info`, `--input-hint-icon-foreground-disabled` |

## States
Input Hint has no interaction states; Type carries the only visual change, and its parent sets it (the error line with an invalid field, disabled with a disabled field). There is no transition. The error line comes and goes; the hint never changes Type to show an error.

## Spacing & Sizing
| Part | Token |
|---|---|
| Icon | `--input-hint-icon-size` square |
| Icon → message | `--input-hint-gap` |
| Message | `--input-hint-font` (the row is at least one line of it tall) |

The hint hugs its content up to the field's width and is smaller than the field's own text, so the value stays the loudest thing in the stack. Measurements are provisional: the Figma section is thin, so sizes and property names may change once it has its own specification.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | default, error, disabled | default |
| Show Icon | on / off | on |
| Message | text | — |

## Usage
- Use the hint for help most people need, such as a format example: one short sentence with no full stop and no link ([patterns 7.29](../patterns/07-content-copy.md)). Format examples go in the hint, never only in placeholder text.
- Use the error line for the validation message, together with the field's invalid state: what happened, then how to fix it ([patterns 7.33](../patterns/07-content-copy.md), [6.76](../patterns/06-accessibility.md)). The field carries the signal, the error line carries the reason. It moves the input down while it shows.
- Keep the icon on for errors; it makes an error read as one before the words are read.
- Used by [Input](../molecules/input.md), [Select](../molecules/select.md), [Phone Input](../molecules/phone-input.md) and [Stepper Input](../molecules/stepper-input.md).

## Accessibility
- Associate the hint and the error line with their field (for example `aria-describedby` listing both), so they're read after its name ([patterns 6.47](../patterns/06-accessibility.md)).
- An error line that appears after validation is announced without moving focus ([patterns 6.53](../patterns/06-accessibility.md)); the colour change alone says nothing to assistive technology.
- Error is never colour alone: the `error` glyph and the wording carry it too ([patterns 6.12](../patterns/06-accessibility.md)).
- The icon is decorative; hide it from assistive technology.

## Claude Prompt
Draw a field hint line, placed under the field's label and above its input: a `--input-hint-icon-size` info icon in near-black (`--input-hint-icon-foreground`) followed `--input-hint-gap` later by small grey `--input-hint-font` text (`--input-hint-foreground`). When the field is invalid, a separate error line sits between the hint and the input: an error icon and red text (`--input-hint-foreground-error`), while the hint above stays. The disabled hint turns grey (`--input-hint-foreground-disabled`).
