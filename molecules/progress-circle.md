---
name: Progress Circle
level: molecule
status: stable
composes: [../atoms/icon-button.md, ../atoms/icon.md]
tokens:
  # ring
  progress-circle-arc-color: '{colors.color-status-info-default}'
  progress-circle-track-color: '{colors.color-line-subtle}'
  progress-circle-stroke-width: '{stroke.stroke-heavy}'
  progress-circle-indeterminate-duration: '{motion.motion-spin}'
  # sizes
  progress-circle-size-xxsmall: '{control.control-xs}'
  progress-circle-size-xsmall: '{control.control-sm}'
  progress-circle-size-small: '{control.control-md}'
  progress-circle-size-medium: '{control.control-lg}'
  progress-circle-size-large: '{primitives.scale-17}'
  # upload control
  progress-circle-upload-size: '{control.control-sm}'
  progress-circle-percentage-font: '{typography.type-indicator-medium}'
  progress-circle-percentage-foreground: '{colors.color-ink-high}'
  progress-circle-cancel-background: '{colors.color-status-ghost-faint}'
  progress-circle-cancel-radius: '{radius.radius-pill}'
  progress-circle-cancel-padding: '{space.space-2xs}'
  progress-circle-cancel-icon-foreground: '{colors.color-ink-high}'
  progress-circle-cancel-icon-size: '{icon.icon-size-medium}'
  progress-circle-cancel-focus-ring-width: '{stroke.stroke-thick}'
  progress-circle-cancel-focus-ring-color: '{colors.color-line-focus}'
---

# Progress Circle

> A ring that reports an ongoing process where a bar won't fit, optionally with an upload control that shows the percentage and offers cancel.

## Anatomy
1. Ring — a square frame at the chosen size, holding the track and the arc concentrically.
2. Track (optional) — the full circle, a `--progress-circle-stroke-width` stroke in `--progress-circle-track-color`. Turned on by Show Track.
3. Arc — the completed portion, a `--progress-circle-stroke-width` stroke in `--progress-circle-arc-color`, starting at twelve o'clock and running clockwise.
4. Upload control (small, medium and large only) — centred in the ring, `--progress-circle-upload-size` square whatever the ring size. Turned on by Upload. It shows the percentage in `--progress-circle-percentage-font` `--progress-circle-percentage-foreground`; with Stop on it becomes a cancel [Icon Button](../atoms/icon-button.md): a `--progress-circle-cancel-radius` circle filled `--progress-circle-cancel-background`, `--progress-circle-cancel-padding` padding, holding a `close` [Icon](../atoms/icon.md) at `--progress-circle-cancel-icon-size` in `--progress-circle-cancel-icon-foreground`.

## Variants
| Size | Diameter | Upload control |
|---|---|---|
| xxsmall (default) | `--progress-circle-size-xxsmall` | not built |
| xsmall | `--progress-circle-size-xsmall` | not built |
| small | `--progress-circle-size-small` | fits, nearly filling the ring |
| medium | `--progress-circle-size-medium` | fits comfortably |
| large | `--progress-circle-size-large` | fits comfortably |

The stroke is `--progress-circle-stroke-width` at every size, so the ring is proportionally heavier at the small sizes.

| Rounded | Arc ends |
|---|---|
| true (default) | round line caps |
| false | square line caps, beside sharp controls |

Rounded is a line cap, not a corner radius; it only shows where the arc starts and stops. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Visual |
|---|---|
| determinate (implementation behaviour) | arc length = progress, 0 to 100 |
| indeterminate (implementation behaviour) | a short fixed arc rotating continuously, one turn every `--progress-circle-indeterminate-duration` |
| upload | percentage at the centre |
| upload, Stop | the percentage swaps for the cancel button |
| upload, hover or focus (implementation behaviour) | code also reveals the cancel button on hover and keyboard focus |

The ring has no hover, pressed, focus or disabled states. Determinate, indeterminate and cancel-on-hover are implementation behaviour, not Figma properties: Figma draws the arc fixed at about three quarters in every variant as a placeholder; the sweep and the spin belong to the implementation. Showing or hiding the upload control doesn't resize the ring. Respect reduced motion: stop the spin and keep nearby text saying work is in progress.

## Spacing & Sizing
| Part | Token |
|---|---|
| Diameter | `--progress-circle-size-xxsmall` … `--progress-circle-size-large` |
| Stroke | `--progress-circle-stroke-width` |
| Upload control | `--progress-circle-upload-size` square, centred |
| Cancel button | `--progress-circle-upload-size` circle, `--progress-circle-cancel-padding` padding, `--progress-circle-cancel-icon-size` icon |

Always square; never hugs its content.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | xxsmall, xsmall, small, medium, large | xxsmall |
| Rounded | true, false | true |
| Upload | true, false (small, medium, large only) | false |
| Stop | true, false (upload control) | false |
| Show Track | true, false | true |
| Progress | 0–100, or indeterminate (code) | — |

## Usage
- Use it for compact or inline progress (beside an icon, in a dense row, in an upload); use a [Progress Bar](../atoms/progress-bar.md) for page-level progress.
- Use medium or large whenever Upload is on; the control is a fixed size, so smaller rings leave it almost no margin. Upload does nothing at xsmall and xxsmall.
- Pair the ring with nearby text; on its own it says something is happening but never what.
- Keep Show Track on; without it the arc has nothing to be measured against.
- Don't read the Figma arc as a value; drive it from the real number.

## Accessibility
- Expose the ring as a progress indicator with its value, range and a name for the task (`progressbar`); indeterminate rings omit the value.
- The cancel action is a real control: give it a name ("Cancel upload") and a keyboard path, and show a `--progress-circle-cancel-focus-ring-width` `--progress-circle-cancel-focus-ring-color` ring on focus. Reveal it on keyboard focus as well as hover.
- The arc and track are separated by colour alone; check `--progress-circle-arc-color` against `--progress-circle-track-color` on the surface behind them.
- At xxsmall the fixed stroke is heavy for the diameter; check it still reads as a ring.

## Stitch Prompt
Draw a Zebra progress circle: a `--progress-circle-size-medium` ring with a `--progress-circle-stroke-width` light grey track (`--progress-circle-track-color`) and a blue arc (`--progress-circle-arc-color`) with round caps, starting at the top and sweeping clockwise about three quarters of the way. An upload version shows a small "75%" in `--progress-circle-percentage-font` near-black text at the centre; with Stop on, the percentage is replaced by a round, faintly tinted cancel button holding a close icon. Smaller rings go down to `--progress-circle-size-xxsmall`.
