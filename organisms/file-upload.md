---
name: File Upload
level: organism
status: stable
composes: [../molecules/upload-item.md, ../atoms/button.md]
tokens:
  file-upload-container-radius-rounded: '{rounded.radius-minimal}'
  file-upload-container-radius-sharp: '{rounded.radius-none}'
  file-upload-container-border-width: '{border.border-size-medium}'
  file-upload-container-border-color-enabled: '{colors.border-default}'
  file-upload-container-border-color-selected: '{colors.border-primary}'
  file-upload-container-border-color-error: '{colors.border-default}'
  file-upload-container-background-selected: '{colors.surface-selected}'
  file-upload-container-padding: '{spacing.spacing-4xl}'
  file-upload-container-gap: '{spacing.spacing-large}'
  file-upload-text-gap: '{spacing.spacing-small}'
  file-upload-headline-font: '{typography.title-medium}'
  file-upload-caption-font: '{typography.body-small}'
  file-upload-caption-foreground: '{colors.main-subtle}'
  file-upload-caption-foreground-error: '{colors.main-negative}'
  file-upload-caption-padding-x: '{spacing.spacing-large}'
---

# File Upload

> A dialog that allows users to upload files.

## Anatomy
1. Drop zone — dashed-border container accepting drag and drop and click-to-browse.
2. Headline — primary instruction text.
3. "or" — small subtle separator text.
4. "Select Files" — [Button](../atoms/button.md), flavor primary, size medium, shape follows the drop zone (rounded → rounded, sharp → sharp); opens the file picker. The button governs its own colours, states, radius and focus ring.
5. Caption — supported formats / size limits; replaced by the error message and turned red on error.
6. Uploaded files — shown as [upload items](../molecules/upload-item.md) (separate component).

## Variants
| Shape | Radius |
|---|---|
| rounded (default) | `--file-upload-container-radius-rounded` |
| sharp | `--file-upload-container-radius-sharp` |

Multiple files (default on) allows several files, including via drag and drop.

## States
| State | Border | Background | Caption |
|---|---|---|---|
| default | `--file-upload-container-border-width` dashed `--file-upload-container-border-color-enabled` | transparent | `--file-upload-caption-foreground` |
| active (drag-over) | `--file-upload-container-border-width` dashed `--file-upload-container-border-color-selected` | `--file-upload-container-background-selected` | `--file-upload-caption-foreground` |
| error | `--file-upload-container-border-width` dashed `--file-upload-container-border-color-error` | transparent | `--file-upload-caption-foreground-error` |

## Spacing & Sizing
| Part | Value |
|---|---|
| Container padding | `--file-upload-container-padding` |
| Container gap | `--file-upload-container-gap`, column, centred |
| Text block gap | `--file-upload-text-gap` |
| Headline | `--file-upload-headline-font` |
| "or" + caption | `--file-upload-caption-font`, `--file-upload-caption-foreground`, horizontal padding `--file-upload-caption-padding-x` |
| Border | `--file-upload-container-border-width` dashed |

## Properties
| Property | Options | Default |
|---|---|---|
| Headline | text | none |
| Caption | text | none |
| Accepted formats | list of file types | any |
| Multiple files | on / off | on |
| Active | on / off | off |
| Error | on / off | off |
| Rounded | on / off | on |

## Usage
- State accepted formats and maximum size in the caption, e.g. "Supports: JPG, JPEG2000, PNG. Max file size 100mb".
- On error, put the reason in the caption (red) — don't rely on colour alone.
- The "Select Files" button must be keyboard reachable (≥ `--button-touch-target-size-minimum` to `--button-touch-target-size-recommended` target, Button focus ring `--button-focus-ring-width` `--button-focus-ring-color`); drag and drop is an enhancement only.

## Stitch Prompt
Draw a wide upload area with a `--file-upload-container-border-width` dashed `--file-upload-container-border-color-enabled` border and `--file-upload-container-radius-rounded` corners, `--file-upload-container-padding` padding, contents centred in a column with `--file-upload-container-gap` gaps. Show a `--file-upload-headline-font` headline like "Drop files here", a small `--file-upload-caption-foreground` "or", a solid primary (`--button-primary-container-background-enabled`) "Select Files" button with `--button-container-radius-rounded` corners, and below it a `--file-upload-caption-font` `--file-upload-caption-foreground` caption "Supports: JPG, JPEG2000, PNG. Max file size 100mb". In the drag-over state, the border turns `--file-upload-container-border-color-selected` and the fill becomes `--file-upload-container-background-selected`. Uploaded files appear as rows below the area.
