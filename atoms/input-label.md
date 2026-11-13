---
name: Input Label
level: atom
status: draft
composes: [../atoms/icon.md]
tokens:
  # field name
  input-label-name-font: '{typography.type-label-medium}'
  input-label-name-foreground: '{colors.color-ink-high}'
  input-label-name-foreground-disabled: '{colors.color-ink-disabled}'
  # information icon
  input-label-icon-size: '{icon.icon-size-small}'
  input-label-icon-foreground: '{colors.color-ink-high}'
  input-label-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # required marker
  input-label-required-font: '{typography.type-label-medium}'
  input-label-required-foreground: '{colors.color-status-error-default}'
  # optional marker
  input-label-optional-font: '{typography.type-body-small}'
  input-label-optional-foreground: '{colors.color-ink-medium}'
  # sub label
  input-label-sub-label-font: '{typography.type-body-small}'
  input-label-sub-label-foreground: '{colors.color-ink-medium}'
  # spacing
  input-label-row-gap: '{space.space-2xs}'
  input-label-gap: '{space.space-xs}'
---

# Input Label

> Names a form field, with an optional required or optional marker, an information icon and a sub label.

## Anatomy
1. Label row — a horizontal row hugging its content, its parts `--input-label-row-gap` apart.
2. Field name — the name of the field, in `--input-label-name-font`.
3. Information icon (optional) — [Icon](../atoms/icon.md) `info`, `--input-label-icon-size`, after the name. Turned on by Show Information.
4. Marker (optional) — `*` after the name when Type is required, or the word (optional) when Type is optional.
5. Sub label (optional) — a description line `--input-label-gap` below the row. Turned on by Show Sub Label.

## Variants
| Type | Marker | Marker font | Marker colour |
|---|---|---|---|
| default | none | — | — |
| required | `*` | `--input-label-required-font` | `--input-label-required-foreground` |
| optional | (optional) | `--input-label-optional-font` | `--input-label-optional-foreground` |

Mark whichever of required or optional is the exception in a form, never both.

## States
| State | Field name | Information icon | Required marker | Optional marker |
|---|---|---|---|---|
| enabled | `--input-label-name-foreground` | `--input-label-icon-foreground` | `--input-label-required-foreground` | `--input-label-optional-foreground` |
| disabled | `--input-label-name-foreground-disabled` | `--input-label-icon-foreground-disabled` | `--input-label-required-foreground` (held) | `--input-label-optional-foreground` (held) |

The label is static text with no interaction states. Disabled only dims it; it disables nothing, so set it together with the field's own state. There is no transition.

## Spacing & Sizing
| Part | Token |
|---|---|
| Gap between name, icon and marker | `--input-label-row-gap` |
| Row → sub label | `--input-label-gap` |
| Name | `--input-label-name-font` (the row is one line of it tall) |
| Information icon | `--input-label-icon-size` |
| Sub label | `--input-label-sub-label-font` `--input-label-sub-label-foreground` |

Width hugs the text. Measurements are provisional: the Figma section is thin, the icon size and the sub label's text style are not bound there, and the property names may change once it has its own specification.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | default, optional, required | default |
| Disabled | on / off | off |
| Show Information | on / off | off |
| Show Sub Label | on / off | off |
| Field name | text | — |
| Sub label | text | — |

## Usage
- Keep the label visible. A placeholder is not a label; it clears the moment someone types.
- Use required only where submission fails without a value, and optional where most of the form is required.
- Use the information icon for an explanation the label has no room for, not to repeat the label.
- Set Disabled together with the field's state; a full-strength label over a disabled field reads as a mistake.
- Used by [Input](../molecules/input.md), [Select](../molecules/select.md) and [Phone Input](../molecules/phone-input.md).

## Accessibility
- The label is the field's accessible name; associate it with the field, not just place it above it.
- The required marker is an asterisk and a colour, and neither is readable on its own. Carry the requirement in the field's semantics as well.
- (optional) is a word, so it reads where the asterisk does not.
- The information icon has no text. Where it opens an explanation it is a control and needs its own name and a target of at least the Icon's framed size.
- The required marker keeps its colour when disabled; check the whole stack at one state.

## Stitch Prompt
Draw a form field label: a field name in `--input-label-name-font` near-black (`--input-label-name-foreground`), optionally followed `--input-label-row-gap` later by a `--input-label-icon-size` info icon and a red asterisk (`--input-label-required-foreground`) for required fields, or the word "(optional)" in smaller grey `--input-label-optional-font` text. An optional grey description line sits `--input-label-gap` below. Disabled labels turn grey (`--input-label-name-foreground-disabled`).
