---
name: Upload Item
level: molecule
status: draft
composes: [./progress-circle.md, ../atoms/icon.md]
tokens:
  # default
  upload-item-default-container-background: '{colors.color-fill-default}'
  upload-item-default-container-background-hover: '{colors.color-fill-faint}'
  upload-item-default-subtitle-foreground: '{colors.color-ink-medium}'
  # completed
  upload-item-completed-container-background: '{colors.color-status-success-faint}'
  upload-item-completed-subtitle-foreground: '{colors.color-status-success-default}'
  upload-item-completed-icon-foreground: '{colors.color-status-success-default}'
  # error
  upload-item-error-container-background: '{colors.color-status-error-faint}'
  upload-item-error-subtitle-foreground: '{colors.color-status-error-default}'
  upload-item-error-icon-foreground: '{colors.color-status-error-default}'
  # text
  upload-item-title-font: '{typography.type-label-medium}'
  upload-item-title-foreground: '{colors.color-ink-high}'
  upload-item-subtitle-font: '{typography.type-label-small}'
  # close, focus
  upload-item-close-foreground: '{colors.color-ink-high}'
  upload-item-close-size: '{control.control-lg}'
  upload-item-close-radius: '{radius.radius-element-sm}'
  upload-item-focus-ring-width: '{stroke.stroke-thick}'
  upload-item-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  upload-item-container-min-height: '{primitives.scale-17}'
  upload-item-container-padding-y: '{space.space-sm}'
  upload-item-container-padding-x: '{space.space-md}'
  upload-item-container-gap: '{space.space-md}'
  upload-item-thumbnail-size: '{primitives.scale-13}'
  upload-item-text-gap: '{space.space-2xs}'
  upload-item-trailing-gap: '{space.space-sm}'
  upload-item-progress-size: '{primitives.scale-15}'
---

# Upload Item

> A list tile showing the upload progress of one file.

Used inside [File Upload](../organisms/file-upload.md).

## Anatomy
1. Container — a row, at least `--upload-item-container-min-height` tall, filled per flavour.
2. Leading — the file thumbnail, `--upload-item-thumbnail-size` square.
3. Title — the file name, `--upload-item-title-font` `--upload-item-title-foreground`, one line, truncated with an ellipsis.
4. Subtitle — extra information (e.g. "4.6MB of 5.7MB", or the error reason), `--upload-item-subtitle-font`, coloured per flavour.
5. Trailing status — while uploading, a [Progress Circle](./progress-circle.md) of the upload type, `--upload-item-progress-size` across (its own tokens govern the arc, track, percentage and cancel control); when completed, a `check_circle` [Icon](../atoms/icon.md) in `--upload-item-completed-icon-foreground`; on error, an `error` [Icon](../atoms/icon.md) in `--upload-item-error-icon-foreground`.
6. Close — a `close` [Icon](../atoms/icon.md) in `--upload-item-close-foreground`, centred in a `--upload-item-close-size` target; shown only for completed and error, where it dismisses the item.

## Variants
| Flavour | Background | Subtitle | Trailing |
|---|---|---|---|
| default (uploading) | `--upload-item-default-container-background` | `--upload-item-default-subtitle-foreground` | progress circle |
| completed | `--upload-item-completed-container-background` | `--upload-item-completed-subtitle-foreground` | `check_circle` (`--upload-item-completed-icon-foreground`) + close |
| error | `--upload-item-error-container-background` | `--upload-item-error-subtitle-foreground` | `error` (`--upload-item-error-icon-foreground`) + close |

## States
| State | Background | Notes |
|---|---|---|
| default — enabled | `--upload-item-default-container-background` | |
| default — hover | `--upload-item-default-container-background-hover` | pointer devices only; hovering the progress circle reveals its cancel control |
| completed / error — hover | unchanged (flavour tint) | |
| close — focused | unchanged | `--upload-item-focus-ring-width` `--upload-item-focus-ring-color` ring around the close target |

The row moves from default to completed or error when the upload ends; the swap is instant, with no motion of its own.

## Spacing & Sizing
| Property | Token |
|---|---|
| Min height | `--upload-item-container-min-height` |
| Padding (V / H) | `--upload-item-container-padding-y` / `--upload-item-container-padding-x` |
| Gap (leading ↔ body ↔ trailing) | `--upload-item-container-gap` |
| Thumbnail | `--upload-item-thumbnail-size` square |
| Title ↔ subtitle | `--upload-item-text-gap` |
| Trailing (status icon ↔ close) | `--upload-item-trailing-gap` |
| Progress circle | `--upload-item-progress-size` |
| Close target | `--upload-item-close-size` square, `--upload-item-close-radius` corners |

The row fills its container's width; the body takes the remaining space. Measurements are provisional: there is no Figma source yet.

In the AAA modes the component is always sharp (DESIGN.md §5).

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | default, completed, error | default |
| Progress | 0–100 | 0 |
| Title | text | none |
| Subtitle | text | none |
| Thumbnail | image | none |
| Rounded | on / off | on (round icons; off uses sharp icons) |

## Usage
- Show one item per file; update the progress while uploading, then switch to completed or error.
- Write the error reason in the subtitle ("File exceeds 100MB limit"), not only the red tint and icon.
- Keep file names intact; let the title truncate rather than wrap.

## Accessibility
- The progress circle is a `progressbar` with a value and an accessible name that includes the file name ("Uploading report.pdf").
- Completed and error must not rely on colour alone: the icon and the subtitle text carry the meaning.
- Give the close control an accessible name with the file name ("Dismiss report.pdf"); the cancel control on the progress circle likewise.
- The close target is `--upload-item-close-size`, which meets the recommended touch-target size; its focus ring is `--upload-item-focus-ring-width` `--upload-item-focus-ring-color`.
- Announce completion and failure politely (e.g. an `aria-live` region on the list), so screen-reader users learn the result without moving focus.

## Stitch Prompt
Draw a `--upload-item-container-min-height`-tall white (`--upload-item-default-container-background`) file row with `--upload-item-container-padding-x` side padding: a small file thumbnail on the left, then a stacked `--upload-item-title-font` near-black file name and a `--upload-item-subtitle-font` grey (`--upload-item-default-subtitle-foreground`) subtitle "4.6MB of 5.7MB", and on the right a `--upload-item-progress-size` circular upload progress ring. Show a completed version with a pale green `--upload-item-completed-container-background` background, green subtitle and green check-circle icon plus a close (x) icon, and an error version with a pale red `--upload-item-error-container-background` background, red subtitle and red error icon plus a close icon.
