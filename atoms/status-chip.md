---
name: Status Chip
level: atom
status: stable
composes: []
tokens:
  status-chip-container-radius-rounded: '{rounded.radius-minimal}'
  status-chip-container-radius-sharp: '{rounded.radius-none}'
  status-chip-container-background: '{colors.surface-warm}'
  status-chip-container-padding-y: '{spacing.spacing-minimum}'
  status-chip-container-padding-x: '{spacing.spacing-small}'
  status-chip-container-height: '{spacing.spacing-2xl}'
  status-chip-label-font: '{typography.body-x-small}'
---

# Status Chip

> A chip that looks like a label.

## Anatomy
1. Container — a block with a warm-grey fill, no outline.
2. Text — one or two words.

## Variants
| Shape | Radius |
|---|---|
| rounded (default) | `--status-chip-container-radius-rounded` |
| sharp | `--status-chip-container-radius-sharp` |

## States
Static, non-interactive.

## Spacing & Sizing
| Property | Token |
|---|---|
| Background | `--status-chip-container-background` |
| Padding | `--status-chip-container-padding-y` / `--status-chip-container-padding-x` |
| Font | `--status-chip-label-font` |
| Height | `--status-chip-label-font` line-height + 2 × `--status-chip-container-padding-y` = `--status-chip-container-height` |
| Text colour | inherits from the surrounding text |

## Properties
| Property | Options | Default |
|---|---|---|
| Text | short text | — |
| Rounded | on / off | on |

## Usage
- Use to display a read-only status or category in chip form; it is not clickable.
- For coloured semantic states use [Label](../atoms/label.md) or [Status Label](../atoms/status-label.md).

## Stitch Prompt
Draw a Zeta status chip: a small `--status-chip-container-height`-tall, very light warm-grey (`--status-chip-container-background`) rectangle with `--status-chip-container-radius-rounded` corners and `--status-chip-container-padding-x` side padding, holding one or two words in `--status-chip-label-font` dark text, with no border.
