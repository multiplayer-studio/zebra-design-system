---
name: Progress Circle
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  progress-circle-arc-color: '{colors.main-primary}'
  progress-circle-arc-width: '{dimensions.dim-progress-circle-stroke-width}'
  progress-circle-indeterminate-duration: '{motion.motion-spin}'
  progress-circle-upload-track-color: '{colors.main-light}'
  progress-circle-percentage-font: '{typography.label-small}'
  progress-circle-percentage-foreground: '{colors.main-default}'
  progress-circle-cancel-background-hover: '{colors.surface-hover}'
  progress-circle-cancel-icon-size: '{icon.icon-size-medium}'
---

# Progress Circle

> Progress indicators express an unspecified wait time or display the length of a process.

## Anatomy
1. Track circle — transparent for default, light grey for upload.
2. Progress arc — starts at 12 o'clock and runs clockwise.
3. Percentage (upload, sizes above 24) — centred text.
4. Cancel button (upload, on hover) — replaces the percentage with a circular button holding a `close` [Icon](../atoms/icon.md) in the icon's default colour. The icon size `--progress-circle-cancel-icon-size` is an override (the icon's medium size rather than its default) to fit inside the ring.

## Variants
| Type | Track | Centre |
|---|---|---|
| default | transparent | empty |
| upload | `--progress-circle-upload-track-color` | percentage, cancel on hover |

| Size | Diameter | Stroke |
|---|---|---|
| 20 / 24 / 36 / 40 / 48 / 64 (default) | equals the size name | `--progress-circle-arc-width` at every size |

| Shape | Stroke cap |
|---|---|
| rounded (default) | round |
| sharp | square |

## States
| State | Visual |
|---|---|
| determinate | arc length = progress (0–100) |
| indeterminate | fixed short arc rotating continuously, `--progress-circle-indeterminate-duration` linear |
| upload hover | percentage hidden; cancel shown: `--progress-circle-cancel-background-hover` circle, close icon `--progress-circle-cancel-icon-size` `--icon-foreground` |

## Spacing & Sizing
| Part | Token |
|---|---|
| Arc colour | `--progress-circle-arc-color` |
| Stroke width | `--progress-circle-arc-width` |
| Percentage | `--progress-circle-percentage-font`, `--progress-circle-percentage-foreground` |
| Cancel icon | `--progress-circle-cancel-icon-size` |

## Properties
| Property | Options | Default |
|---|---|---|
| Size | 20, 24, 36, 40, 48, 64 | 64 |
| Progress | 0–100 | none |
| Indeterminate | on / off | off |
| Type | default, upload | default |
| Rounded | on / off | on |

## Usage
- Use for compact or inline loading (buttons, cards, uploads); use the [progress bar](../atoms/progress-bar.md) for page-level progress.
- Announce it as a progress indicator with its current value; the upload cancel action needs a label.
- Avoid sizes 20 and 24 when the percentage must be read — they hide it.

## Stitch Prompt
Draw a progress circle: a size-64 ring drawn with a `--progress-circle-arc-width` `--progress-circle-arc-color` stroke with round caps, starting at the top and sweeping clockwise to show the percentage, on a transparent background. The upload variant adds a `--progress-circle-upload-track-color` full track ring and a small `--progress-circle-percentage-font` percentage label in the centre; on hover the label is replaced by a `--progress-circle-cancel-background-hover` circular cancel button with a `--icon-foreground` close icon. Smaller sizes go down to size 20.
