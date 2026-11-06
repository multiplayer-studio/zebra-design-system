---
name: Upload Item
level: molecule
status: stable
composes: [../atoms/progress-circle.md, ../atoms/icon.md]
tokens:
  upload-item-container-min-height: '{dimensions.dim-upload-item-min-height}'
  upload-item-container-padding-x: '{spacing.spacing-medium}'
  upload-item-title-font-weight: '{font-weight.medium}'
  upload-item-title-font-size: '{dimensions.dim-upload-item-title-font-size}'
  upload-item-title-foreground: '{colors.main-default}'
  upload-item-subtitle-font-weight: '{font-weight.medium}'
  upload-item-subtitle-font-size: '{dimensions.dim-upload-item-subtitle-font-size}'
  # default
  upload-item-default-container-background: '{colors.surface-default}'
  upload-item-default-container-background-hover: '{colors.surface-hover}'
  upload-item-default-subtitle-foreground: '{colors.main-subtle}'
  # completed
  upload-item-completed-container-background: '{colors.surface-positive-subtle}'
  upload-item-completed-subtitle-foreground: '{colors.main-positive}'
  upload-item-completed-icon-foreground: '{colors.main-positive}'
  # error
  upload-item-error-container-background: '{colors.surface-negative-subtle}'
  upload-item-error-subtitle-foreground: '{colors.main-negative}'
  upload-item-error-icon-foreground: '{colors.main-negative}'
---

# Upload Item

> A list tile showing the upload progress of an item.

Used inside [File Upload](../organisms/file-upload.md).

## Anatomy
1. Container – row, min height `--upload-item-container-min-height`.
2. Leading – file thumbnail.
3. Title – file name.
4. Subtitle – extra info (e.g. "4.6MB of 5.7MB").
5. Trailing status – [Progress Circle](../atoms/progress-circle.md), size 48, upload type, while uploading (its own tokens govern arc, track, percentage and cancel); `check_circle` [Icon](../atoms/icon.md) when completed; `error` [Icon](../atoms/icon.md) on error. The completed / error icon colours are context overrides of the icon's default colour, matching the status tint.
6. Close icon – `close` [Icon](../atoms/icon.md), shown only for completed / error; cancels or dismisses the item.

## Variants
| Flavor | Background | Subtitle / trailing icon colour | Trailing |
|---|---|---|---|
| default | `--upload-item-default-container-background` | subtitle `--upload-item-default-subtitle-foreground` | progress circle (48) |
| completed | `--upload-item-completed-container-background` | `--upload-item-completed-subtitle-foreground` / `--upload-item-completed-icon-foreground` | `check_circle` + close |
| error | `--upload-item-error-container-background` | `--upload-item-error-subtitle-foreground` / `--upload-item-error-icon-foreground` | `error` + close |

## States
| State | Background |
|---|---|
| default – hover | `--upload-item-default-container-background-hover` |
| completed / error – hover | unchanged (flavor tint) |

## Spacing & Sizing
| Property | Value |
|---|---|
| Min height | `--upload-item-container-min-height` |
| Side padding | `--upload-item-container-padding-x` |
| Padding, gaps (leading ↔ body ↔ trailing, title ↔ subtitle) | Measurements to be defined. |
| Title | `--upload-item-title-font-weight` weight, `--upload-item-title-font-size`, `--upload-item-title-foreground` |
| Subtitle | `--upload-item-subtitle-font-weight` weight, `--upload-item-subtitle-font-size`, `--upload-item-default-subtitle-foreground` |
| Trailing | extra right margin for completed / error |
| Progress circle | size 48 |

## Properties
| Property | Options | Default |
|---|---|---|
| Flavor | default, completed, error | default |
| Progress | 0–100 | 0 |
| Title | text | none |
| Subtitle | text | none |
| Thumbnail | image | none |
| Rounded | on / off | on |

## Usage
- Show one item per file; update progress while uploading, then switch to completed or error.
- Error state should carry an explanatory subtitle, not only the red tint and icon.
- Close icon removes / dismisses the item — give it an accessible label.

## Stitch Prompt
Draw a `--upload-item-container-min-height`-tall `--upload-item-default-container-background` file row with `--upload-item-container-padding-x` side padding: a small file thumbnail on the left, then a stacked `--upload-item-title-font-weight`-weight `--upload-item-title-font-size` `--upload-item-title-foreground` file name and an `--upload-item-subtitle-font-size` `--upload-item-default-subtitle-foreground` subtitle "4.6MB of 5.7MB", and on the right a size-48 circular upload progress ring. Show a completed version with a `--upload-item-completed-container-background` background, `--upload-item-completed-subtitle-foreground` subtitle and `--upload-item-completed-icon-foreground` check-circle icon plus a close (x) icon, and an error version with a `--upload-item-error-container-background` background, `--upload-item-error-subtitle-foreground` subtitle and `--upload-item-error-icon-foreground` error icon plus close icon.
