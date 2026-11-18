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
  # marker: "(optional)" or "(required)"
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

> Names a form field, with an optional "(required)" or "(optional)" marker, an information icon and a sub label.

## Anatomy
1. Label row — a horizontal row hugging its content, its parts `--input-label-row-gap` apart. A name too long for the width wraps; it never truncates.
2. Field name — the name of the field, in `--input-label-name-font`: one to three words saying what goes in the field, with no colon ([patterns 7.28](../patterns/07-content-copy.md), [7.11](../patterns/07-content-copy.md)).
3. Information icon (optional) — [Icon](../atoms/icon.md) `info`, `--input-label-icon-size`, after the name. Turned on by Show Information.
4. Marker (optional) — the word "(required)" after the name when Type is required, or "(optional)" when Type is optional. Both use the same marker tokens; there is no asterisk ([patterns 7.31](../patterns/07-content-copy.md)).
5. Sub label (optional) — a description line `--input-label-gap` below the row. Turned on by Show Sub Label.

## Variants
| Type | Marker | Marker font | Marker colour |
|---|---|---|---|
| default | none | — | — |
| required | (required) | `--input-label-optional-font` | `--input-label-optional-foreground` |
| optional | (optional) | `--input-label-optional-font` | `--input-label-optional-foreground` |

Mark whichever of required or optional is the minority in a form, never both ([patterns 7.31](../patterns/07-content-copy.md)).

## States
| State | Field name | Information icon | Marker |
|---|---|---|---|
| enabled | `--input-label-name-foreground` | `--input-label-icon-foreground` | `--input-label-optional-foreground` |
| disabled | `--input-label-name-foreground-disabled` | `--input-label-icon-foreground-disabled` | `--input-label-optional-foreground` (held) |

The label is static text with no interaction states. Disabled only dims it; it disables nothing, so set it together with the field's own state. There is no transition.

## Spacing & Sizing
| Part | Token |
|---|---|
| Gap between name, icon and marker | `--input-label-row-gap` |
| Row → sub label | `--input-label-gap` |
| Name | `--input-label-name-font` (the row is at least one line of it tall) |
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
- Keep the label visible, above the input; the field reads label, hint, error, input ([patterns 1.124](../patterns/01-screen-composition.md)). A placeholder is never the label ([patterns 6.47](../patterns/06-accessibility.md)).
- Mark "(required)" where required fields are the minority and "(optional)" where most of the form is required ([patterns 7.31](../patterns/07-content-copy.md)).
- Help most people need goes in the [Input Hint](../atoms/input-hint.md), always visible. Use the information icon only for an explanation the label has no room for, not to repeat the label; essential information is never only behind it ([patterns 1.71](../patterns/01-screen-composition.md)).
- Set Disabled together with the field's state; a full-strength label over a disabled field reads as a mistake.
- Used by [Input](../molecules/input.md), [Select](../molecules/select.md) and [Phone Input](../molecules/phone-input.md).

## Accessibility
- The label is the field's accessible name; associate it with the field, not just place it above it.
- "(required)" and "(optional)" are words, so they read without colour ([patterns 6.12](../patterns/06-accessibility.md)). Carry the requirement in the field's semantics as well (`required` / `aria-required`).
- The information icon has no text. Where it opens an explanation it is a control and needs its own name and a target of at least `--control-target-min` ([patterns 6.16](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a form field label: a field name in `--input-label-name-font` near-black (`--input-label-name-foreground`), optionally followed `--input-label-row-gap` later by a `--input-label-icon-size` info icon and the word "(required)" or "(optional)" in smaller grey `--input-label-optional-font` text (`--input-label-optional-foreground`). An optional grey description line sits `--input-label-gap` below. Disabled labels turn grey (`--input-label-name-foreground-disabled`).
