---
name: Priority Pill
level: atom
status: stable
composes: []
tokens:
  # status
  priority-pill-medium-index-background: '{colors.main-primary}'
  priority-pill-medium-container-background: '{colors.surface-primary-subtle}'
  priority-pill-urgent-index-background: '{colors.main-negative}'
  priority-pill-urgent-container-background: '{colors.surface-negative-subtle}'
  priority-pill-high-index-background: '{colors.main-warning}'
  priority-pill-high-container-background: '{colors.surface-warning-subtle}'
  priority-pill-low-index-background: '{colors.main-positive}'
  priority-pill-low-container-background: '{colors.surface-positive-subtle}'
  priority-pill-index-foreground: '{colors.state-default-enabled}'
  priority-pill-label-foreground: '{colors.main-default}'
  # size
  priority-pill-container-height-large: '{spacing.spacing-3xl}'
  priority-pill-container-height-small: '{spacing.spacing-xl}'
  priority-pill-index-size-large: '{spacing.spacing-3xl}'
  priority-pill-index-size-small: '{spacing.spacing-xl}'
  priority-pill-index-font-large: '{typography.body-small}'
  priority-pill-index-font-small: '{dimensions.dim-priority-pill-index-font-small}'
  priority-pill-label-font-large: '{typography.body-small}'
  priority-pill-label-font-small: '{dimensions.dim-priority-pill-text-font-small}'
  # shape and spacing
  priority-pill-container-radius-rounded: '{rounded.radius-full}'
  priority-pill-container-radius-sharp: '{rounded.radius-none}'
  priority-pill-label-padding-y: '{spacing.spacing-minimum}'
  priority-pill-label-padding-y-inset: '{border.border-size-small}'
  priority-pill-label-padding-x: '{spacing.spacing-small}'
---

# Priority Pill

> This badge is used to indicate the order of importance.

## Anatomy
1. Container — inline, tinted subtle background.
2. Index — square/circle holding a single character (usually a digit), solid status colour.
3. Text — priority label; lozenge type only.

## Variants
**Status**
| Status | Index bg | Pill bg |
|---|---|---|
| none / medium (default) | `--priority-pill-medium-index-background` | `--priority-pill-medium-container-background` |
| urgent | `--priority-pill-urgent-index-background` | `--priority-pill-urgent-container-background` |
| high | `--priority-pill-high-index-background` | `--priority-pill-high-container-background` |
| low | `--priority-pill-low-index-background` | `--priority-pill-low-container-background` |

Index text `--priority-pill-index-foreground`; label text `--priority-pill-label-foreground`.

**Type**: lozenge (default) = index + text; badge = index only.

**Size**
| Size | Height / index box | Index font | Text font |
|---|---|---|---|
| large (default) | `--priority-pill-container-height-large` / `--priority-pill-index-size-large` | `--priority-pill-index-font-large` | `--priority-pill-label-font-large` |
| small | `--priority-pill-container-height-small` / `--priority-pill-index-size-small` | `--priority-pill-index-font-small` | `--priority-pill-label-font-small` |

**Shape**: rounded (default) → container and index `--priority-pill-container-radius-rounded` (pill / circle); sharp → `--priority-pill-container-radius-sharp`.

## States
Static, non-interactive.

## Spacing & Sizing
- Text padding: `--priority-pill-label-padding-y` − `--priority-pill-label-padding-y-inset` vertical, `--priority-pill-label-padding-x` horizontal.
- Index is a square of the component height (`--priority-pill-index-size-large` or `--priority-pill-index-size-small`), content centred; index has no gap to the text.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | — |
| Index | one character | — |
| Status | urgent, high, medium, low | medium (primary colours) |
| Size | small, large | large |
| Type | badge, lozenge | lozenge |
| Rounded | on / off | on |

## Usage
- Use to rank items (1 = highest); keep the index to a single character.
- Pair colour with the text label ("Urgent", "High"…) — in badge type give the priority an accessible label.

## Stitch Prompt
Draw a Zebra priority pill: a `--priority-pill-container-height-large`-tall fully rounded lozenge with a pale tinted background, starting with a `--priority-pill-index-size-large` solid-colour circle containing a white digit, followed by the priority word in `--priority-pill-label-font-large` dark text with `--priority-pill-label-padding-x` side padding. Urgent is red `--priority-pill-urgent-index-background` on pale pink `--priority-pill-urgent-container-background`, high is amber `--priority-pill-high-index-background` on `--priority-pill-high-container-background`, medium is blue `--priority-pill-medium-index-background` on `--priority-pill-medium-container-background`, low is green `--priority-pill-low-index-background` on `--priority-pill-low-container-background`. The badge variant shows only the coloured circle with the digit; the small size is `--priority-pill-container-height-small` tall with `--priority-pill-label-font-small` text.
