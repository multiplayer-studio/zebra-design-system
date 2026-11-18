---
name: File Upload
level: organism
status: draft
composes: [../molecules/upload-item.md, ../atoms/button.md]
tokens:
  # container
  file-upload-container-background-enabled: '{colors.color-fill-transparent}'
  file-upload-container-background-active: '{colors.color-fill-selection}'
  file-upload-container-border-width: '{stroke.stroke-thick}'
  file-upload-container-border-color-enabled: '{colors.color-line-default}'
  file-upload-container-border-color-active: '{colors.color-line-selection}'
  file-upload-container-border-color-error: '{colors.color-line-default}'
  # shape
  file-upload-container-radius-rounded: '{radius.radius-element-md}'
  file-upload-container-radius-sharp: '{radius.radius-none}'
  # text
  file-upload-headline-font: '{typography.type-title-medium}'
  file-upload-headline-foreground: '{colors.color-ink-high}'
  file-upload-caption-font: '{typography.type-body-small}'
  file-upload-caption-foreground: '{colors.color-ink-medium}'
  file-upload-caption-foreground-error: '{colors.color-status-error-default}'
  # spacing
  file-upload-container-padding: '{space.space-2xl}'
  file-upload-container-gap: '{space.space-lg}'
  file-upload-text-gap: '{space.space-sm}'
  file-upload-caption-padding-x: '{space.space-lg}'
  file-upload-files-gap: '{space.space-lg}'
---

# File Upload

> A drop zone that lets users upload files by dragging them in or choosing them from a file picker.

## Anatomy
1. Drop zone — dashed-border container accepting drag and drop and click-to-browse.
2. Headline — primary instruction text.
3. "or" — small subtle separator text.
4. "Select files" — [Button](../atoms/button.md), flavour primary, size medium, shape follows the drop zone (rounded → rounded, sharp → sharp); opens the file picker. The button governs its own colours, states, radius and focus ring.
5. Caption — supported formats and size limits; on error, replaced by the error message with an error [Icon](../atoms/icon.md) and recoloured.
6. Uploaded files — a list of [Upload Items](../molecules/upload-item.md) below the zone, one per file, `--file-upload-files-gap` apart.

## Variants
| Shape | Radius |
|---|---|
| rounded (default) | `--file-upload-container-radius-rounded` |
| sharp | `--file-upload-container-radius-sharp` |

In the AAA modes the component is always sharp (DESIGN.md §5).

Multiple files (default on) allows several files, including via drag and drop.

## States
| State | Border | Background | Caption |
|---|---|---|---|
| enabled | `--file-upload-container-border-width` dashed `--file-upload-container-border-color-enabled` | `--file-upload-container-background-enabled` | `--file-upload-caption-foreground` |
| active (drag-over) | `--file-upload-container-border-width` dashed `--file-upload-container-border-color-active` | `--file-upload-container-background-active` | `--file-upload-caption-foreground` |
| error | `--file-upload-container-border-width` dashed `--file-upload-container-border-color-error` | `--file-upload-container-background-enabled` | `--file-upload-caption-foreground-error`, an error icon and the reason in words |

The zone turns active while a file is dragged over it and returns to enabled when the file leaves or is dropped. The error border stays neutral: the caption carries the error in icon and words ([patterns 6.11](../patterns/06-accessibility.md)).

## Spacing & Sizing
Measurements are provisional: this component has no Figma source yet.

| Part | Value |
|---|---|
| Container padding | `--file-upload-container-padding` |
| Container gap | `--file-upload-container-gap`, column, centred |
| Text block gap | `--file-upload-text-gap` |
| Headline | `--file-upload-headline-font`, `--file-upload-headline-foreground` |
| "or" + caption | `--file-upload-caption-font`, `--file-upload-caption-foreground`, horizontal padding `--file-upload-caption-padding-x` |
| Border | `--file-upload-container-border-width` dashed |
| Uploaded files list | `--file-upload-files-gap` below the zone |

The zone fills the width of its parent; its height hugs the content.

## Properties
| Property | Options | Default |
|---|---|---|
| Headline | text | none |
| Caption | text | none |
| Accepted formats | list of file types | any |
| Multiple files | on / off | on |
| Active | on / off | off |
| Error | on / off | off |
| Shape | rounded, sharp | rounded |

## Usage
- State accepted formats and maximum size in the caption, e.g. "JPG, JPEG 2000 or PNG, 100 MB or less".
- On error, the caption says what happened and what to do ("Photo.heic isn't a supported format. Select a JPG, JPEG 2000 or PNG file", [patterns 7.33](../patterns/07-content-copy.md)).
- Show each chosen file as an [Upload Item](../molecules/upload-item.md) with its own progress, success and error states.
- Keep the Select files button's shape in step with the drop zone.

## Accessibility
- Drag and drop is an enhancement only. The Select files button must always work from the keyboard; it brings its own focus ring (`--button-focus-ring-width` `--button-focus-ring-color`) and touch target (`--button-touch-target-size-minimum`).
- Announce caption changes (errors, rejected files) politely to assistive technology, for example with a live region on the caption.
- Give the hidden file input an accessible name through the Select files button that opens it.

## Claude Prompt
Draw a wide upload area with a `--file-upload-container-border-width` dashed `--file-upload-container-border-color-enabled` border and `--file-upload-container-radius-rounded` corners, `--file-upload-container-padding` padding, contents centred in a column with `--file-upload-container-gap` gaps. Show a `--file-upload-headline-font` headline like "Drop files here", a small `--file-upload-caption-foreground` "or", a solid primary (`--button-primary-container-background-enabled`) "Select files" button with `--button-container-radius-rounded` corners, and below it a `--file-upload-caption-font` `--file-upload-caption-foreground` caption "JPG, JPEG 2000 or PNG, 100 MB or less". In the drag-over state, the border turns `--file-upload-container-border-color-active` and the fill becomes `--file-upload-container-background-active`. Uploaded files appear as rows below the area.
