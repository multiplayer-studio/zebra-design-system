---
name: Progress Bar
level: atom
status: stable
composes: []
tokens:
  progress-bar-label-font: '{typography.title-medium}'
  progress-bar-label-gap: '{spacing.spacing-large}'
  progress-bar-track-height-medium: '{spacing.spacing-large}'
  progress-bar-track-height-thin: '{spacing.spacing-small}'
  progress-bar-track-background-buffering: '{colors.surface-disabled}'
  progress-bar-track-radius-rounded: '{rounded.radius-large}'
  progress-bar-track-radius-sharp: '{rounded.radius-none}'
  progress-bar-indicator-background: '{colors.main-primary}'
  progress-bar-indicator-duration: '{motion.motion-slower}'
  progress-bar-indicator-width-indeterminate: '{dimensions.dim-progress-bar-indeterminate-width}'
  progress-bar-indicator-duration-indeterminate: '{dimensions.dim-progress-bar-indeterminate-duration}'
  progress-bar-dot-size-medium: '{spacing.spacing-large}'
  progress-bar-dot-size-thin: '{spacing.spacing-small}'
  progress-bar-dot-background: '{colors.surface-disabled}'
  progress-bar-dot-gap: '{spacing.spacing-large}'
---

# Progress Bar

> Progress indicators express an unspecified wait time or display the length of a process.

## Anatomy
1. Label (optional) — above the bar, `--progress-bar-label-font`.
2. Track — full-width row.
3. Bar — filled portion, width = progress.
4. Buffering dots (optional) — dots after the track, same height as the bar.

## Variants
| Size | Track height | Buffer dot |
|---|---|---|
| medium (default) | `--progress-bar-track-height-medium` | `--progress-bar-dot-size-medium` square |
| thin | `--progress-bar-track-height-thin` | `--progress-bar-dot-size-thin` square |

| Mode | Behaviour |
|---|---|
| determinate | bar width = progress; width transitions over `--progress-bar-indicator-duration` |
| indeterminate | a `--progress-bar-indicator-width-indeterminate`-wide bar slides left→right, looping every `--progress-bar-indicator-duration-indeterminate` |
| buffering | track turns `--progress-bar-track-background-buffering`, dots shown; the indeterminate animation pauses |

| Shape | Radius |
|---|---|
| rounded (default) | `--progress-bar-track-radius-rounded` (bar matches) |
| sharp | `--progress-bar-track-radius-sharp` |

## States
| Part | Token |
|---|---|
| Bar | `--progress-bar-indicator-background` |
| Track | no fill |
| Track when buffering / dots | `--progress-bar-track-background-buffering` / `--progress-bar-dot-background` |

## Spacing & Sizing
- Label-to-bar gap: `--progress-bar-label-gap`; track-to-dots gap `--progress-bar-dot-gap`.
- Full width of the container.

## Properties
| Property | Options | Default |
|---|---|---|
| Value | none to complete (or a value out of a maximum) | none |
| Size | medium, thin | medium |
| Indeterminate | on / off | off |
| Buffering | on / off | off |
| Label | text | none |
| Rounded | on / off | on |

## Usage
- Use determinate when progress is measurable, indeterminate for unknown waits.
- Show a text label (e.g. the percentage value) — the bar alone is not accessible; expose the current value to assistive tech.
- Respect reduced-motion for the indeterminate animation.

## Stitch Prompt
Draw a Zebra progress bar: an optional `--progress-bar-label-font` label above, then `--progress-bar-label-gap` below it a full-width `--progress-bar-track-height-medium`-tall bar with fully rounded ends whose filled portion is Zebra blue `--progress-bar-indicator-background`. The thin variant is `--progress-bar-track-height-thin` tall. A buffering version shows a pale grey `--progress-bar-track-background-buffering` track followed by a row of small grey dots of the same height. Indeterminate progress is a short blue segment sweeping across.
