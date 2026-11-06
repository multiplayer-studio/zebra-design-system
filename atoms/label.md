---
name: Label
level: atom
status: stable
composes: []
tokens:
  # status
  label-neutral-container-background: '{colors.main-light}'
  label-neutral-text-foreground: '{colors.main-default}'
  label-info-container-background: '{colors.main-info}'
  label-info-text-foreground: '{colors.state-default-enabled}'
  label-positive-container-background: '{colors.main-positive}'
  label-positive-text-foreground: '{colors.state-default-enabled}'
  label-warning-container-background: '{colors.main-warning}'
  label-warning-text-foreground: '{colors.state-default-enabled}'
  label-negative-container-background: '{colors.main-negative}'
  label-negative-text-foreground: '{colors.state-default-enabled}'
  # shape
  label-container-radius-rounded: '{rounded.radius-minimal}'
  label-container-radius-sharp: '{rounded.radius-none}'
  # sizing
  label-container-min-height: '{spacing.spacing-large}'
  label-container-min-width: '{spacing.spacing-small}'
  label-text-padding-y: '{spacing.spacing-none}'
  label-text-padding-x: '{spacing.spacing-minimum}'
  label-text-font: '{typography.label-small}'
---

# Label

> Text badges notify users of line items that need attention.

## Anatomy
1. Container — solid-colour block, centred, never wraps.
2. Text — label text.

## Variants
| Status | Background | Text |
|---|---|---|
| neutral (default) | `--label-neutral-container-background` | `--label-neutral-text-foreground` |
| info | `--label-info-container-background` | `--label-info-text-foreground` |
| positive | `--label-positive-container-background` | `--label-positive-text-foreground` |
| warning | `--label-warning-container-background` | `--label-warning-text-foreground` |
| negative | `--label-negative-container-background` | `--label-negative-text-foreground` |

| Shape | Radius |
|---|---|
| rounded (default) | `--label-container-radius-rounded` |
| sharp | `--label-container-radius-sharp` |

## States
Static, non-interactive.

## Spacing & Sizing
| Property | Token |
|---|---|
| Height (min) | `--label-container-min-height` |
| Width (min) | `--label-container-min-width` |
| Text padding | `--label-text-padding-y` / `--label-text-padding-x` |
| Font | `--label-text-font` |

## Properties
| Property | Options | Default |
|---|---|---|
| Status | neutral, info, positive, warning, negative | neutral |
| Label | text | — |
| Rounded | on / off | on |

## Usage
- Use on list rows / table cells to flag items needing attention; keep text to one or two words.
- Labels look like solid tags and are not interactive — don't use them as buttons.
- Colour must be backed by the word itself (e.g. "Overdue"), never colour alone.
- For a softer, bordered status with an icon use [Status Label](../atoms/status-label.md).

## Stitch Prompt
Draw a Zebra label: a tiny `--label-container-min-height`-tall solid block with `--label-container-radius-rounded` corners and `--label-text-padding-x` side padding, holding one or two words in `--label-text-font`. Neutral is light grey `--label-neutral-container-background` with near-black text (`--label-neutral-text-foreground`); status versions are solid purple `--label-info-container-background` (info), green `--label-positive-container-background` (positive), amber `--label-warning-container-background` (warning) or red `--label-negative-container-background` (negative), each with white text (`--label-info-text-foreground`, `--label-positive-text-foreground`, `--label-warning-text-foreground`, `--label-negative-text-foreground`).
