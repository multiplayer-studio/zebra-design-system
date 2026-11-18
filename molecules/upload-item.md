---
name: Upload Item
level: molecule
status: draft
composes: [./progress-circle.md, ../atoms/icon.md, ../atoms/icon-button.md]
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
3. Title — the file name, `--upload-item-title-font` `--upload-item-title-foreground`, one line. A long name truncates in the middle, keeping its start and its extension, with the full name on hover and on focus ([patterns 5.30–5.31](../patterns/05-sizes-devices.md)).
4. Subtitle — extra information (e.g. "4.6 MB of 5.7 MB", "Waiting to upload", or the error and its fix), `--upload-item-subtitle-font`, coloured per flavour. It wraps.
5. Trailing status — while uploading, a [Progress Circle](./progress-circle.md) of the upload type, `--upload-item-progress-size` across (its own tokens govern the arc, track, percentage and cancel control); while waiting, a `schedule` [Icon](../atoms/icon.md) in `--upload-item-default-subtitle-foreground`; when completed, a `check_circle` [Icon](../atoms/icon.md) in `--upload-item-completed-icon-foreground`; on error, an `error` [Icon](../atoms/icon.md) in `--upload-item-error-icon-foreground`.
6. Retry (error only, where retrying could work) — an [Icon Button](../atoms/icon-button.md), subtle, `refresh`, `--upload-item-close-size` square, before the close. It is left out when retrying can't work, such as a file that is too large ([patterns 4.36](../patterns/04-states-feedback.md)).
7. Close — a `close` [Icon](../atoms/icon.md) in `--upload-item-close-foreground`, centred in a `--upload-item-close-size` target; shown for waiting, completed and error. On waiting and completed it removes the file; on error it clears the row.

## Variants
| Flavour | Background | Subtitle | Trailing |
|---|---|---|---|
| waiting | `--upload-item-default-container-background` | `--upload-item-default-subtitle-foreground` | `schedule` + close |
| default (uploading) | `--upload-item-default-container-background` | `--upload-item-default-subtitle-foreground` | progress circle |
| completed | `--upload-item-completed-container-background` | `--upload-item-completed-subtitle-foreground` | `check_circle` (`--upload-item-completed-icon-foreground`) + close |
| error | `--upload-item-error-container-background` | `--upload-item-error-subtitle-foreground` | `error` (`--upload-item-error-icon-foreground`) + Retry (when it could work) + close |

## States
| State | Background | Notes |
|---|---|---|
| default — enabled | `--upload-item-default-container-background` | |
| default — hover | `--upload-item-default-container-background-hover` | pointer devices only; hovering the progress circle reveals its cancel control |
| completed / error — hover | unchanged (flavour tint) | |
| close — focused | unchanged | `--upload-item-focus-ring-width` `--upload-item-focus-ring-color` ring around the close target; a truncated title shows its full name |
| retry | — | the Icon Button's own states |

A queued file is waiting until its upload starts. The row moves from default to completed or error when the upload ends; the swap is instant, with no motion of its own. Retry returns the row to default and resumes from where it failed where the service allows ([patterns 4.38](../patterns/04-states-feedback.md)).

## Spacing & Sizing
| Property | Token |
|---|---|
| Min height | `--upload-item-container-min-height` |
| Padding (V / H) | `--upload-item-container-padding-y` / `--upload-item-container-padding-x` |
| Gap (leading ↔ body ↔ trailing) | `--upload-item-container-gap` |
| Thumbnail | `--upload-item-thumbnail-size` square |
| Title ↔ subtitle | `--upload-item-text-gap` |
| Trailing (status icon ↔ retry ↔ close) | `--upload-item-trailing-gap` |
| Progress circle | `--upload-item-progress-size` |
| Close and retry targets | `--upload-item-close-size` square, `--upload-item-close-radius` corners |

The row fills its container's width; the body takes the remaining space. Measurements are provisional: there is no Figma source yet.

In the AAA modes the component is always sharp (DESIGN.md §5).

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | waiting, default, completed, error | default |
| Show Retry (error) | on / off | on |
| Progress | 0–100 | 0 |
| Title | text | none |
| Subtitle | text | none |
| Thumbnail | image | none |
| Rounded | on / off | on (round icons; off uses sharp icons) |

## Usage
- Show one item per file; show waiting until its upload starts, update the progress while uploading, then switch to completed or error.
- Write the error and its fix in the subtitle ("File must be 100 MB or less"), not only the red tint and icon.
- Turn Retry off where retrying can't work; offer another route in the subtitle instead.
- Keep file names intact: they truncate in the middle, never wrap, and the full name is one hover or focus away.

## Accessibility
- The progress circle is a `progressbar` with a value and an accessible name that includes the file name ("Uploading report.pdf").
- The icon and the subtitle text carry completed and error, never the tint alone ([patterns 6.11](../patterns/06-accessibility.md)).
- Give each control an accessible name with the full file name: "Remove report.pdf" on waiting and completed, "Close" with the file name on error ("Close report.pdf"), "Retry report.pdf", and the progress circle's cancel likewise.
- The close and retry targets are `--upload-item-close-size`, which meets `--control-target-min`; its focus ring is `--upload-item-focus-ring-width` `--upload-item-focus-ring-color`.
- Announce completion and failure without moving focus, for example an `aria-live` region on the list ([patterns 6.53](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a `--upload-item-container-min-height`-tall white (`--upload-item-default-container-background`) file row with `--upload-item-container-padding-x` side padding: a small file thumbnail on the left, then a stacked `--upload-item-title-font` near-black file name and a `--upload-item-subtitle-font` grey (`--upload-item-default-subtitle-foreground`) subtitle "4.6 MB of 5.7 MB", and on the right a `--upload-item-progress-size` circular upload progress ring. Show a completed version with a pale green `--upload-item-completed-container-background` background, green subtitle and green check-circle icon plus a close (x) icon, and an error version with a pale red `--upload-item-error-container-background` background, the red subtitle "File must be 100 MB or less" and a red error icon plus a close icon; a failed upload that could work again also shows a round refresh (retry) icon button. A long file name is cut in the middle, "Quarterly-inv…ory-2026.pdf".
