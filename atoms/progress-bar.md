---
name: Progress Bar
level: atom
status: stable
composes: []
tokens:
  # label row
  progress-bar-label-font: '{typography.type-label-medium}'
  progress-bar-label-foreground: '{colors.color-ink-medium}'
  progress-bar-details-gap: '{component-sizes.size-progress-bar-details-gap}'
  progress-bar-gap: '{space.space-lg}'
  # indicator group
  progress-bar-indicator-background: '{colors.color-ink-link}'
  progress-bar-track-background: '{colors.color-fill-sunken}'
  progress-bar-buffer-background: '{colors.color-fill-transparent-elevate}'
  progress-bar-track-height-small: '{primitives.scale-5}'
  progress-bar-track-height-large: '{primitives.scale-7}'
  progress-bar-track-radius-small: '{radius.radius-sm}'
  progress-bar-track-radius-large: '{radius.radius-md}'
  progress-bar-track-radius-sharp: '{radius.radius-none}'
  # motion (implementation)
  progress-bar-indicator-transition: '{motion.motion-smooth}'
  progress-bar-indicator-width-indeterminate: '{component-sizes.size-progress-bar-indeterminate-width}'
  progress-bar-indicator-duration-indeterminate: '{motion.motion-spin}'
---

# Progress Bar

> A horizontal track that fills to show how far a process has got, or moves to show work of unknown length.

## Anatomy
1. Bar — the outer frame, fixed width, stacking the label row above the indicator group `--progress-bar-gap` apart.
2. Label row (optional) — the label reporting the state in `--progress-bar-label-font` `--progress-bar-label-foreground`, and, when Show More Details is on, a trailing slot for supporting detail, `--progress-bar-details-gap` apart. Turned on by Show Label.
3. Indicator group — the track (`--progress-bar-track-background`, turned on by Show Track), the indicator that fills it (`--progress-bar-indicator-background`), and on Buffering a band (`--progress-bar-buffer-background`) from the start of the track to the buffered point.

## Variants
| Progress | Indicator |
|---|---|
| 0% to 100% (default 0%) | width = the value as a share of the track |
| Indeterminate | a `--progress-bar-indicator-width-indeterminate` segment that slides along the track, looping every `--progress-bar-indicator-duration-indeterminate` |
| Buffering | the determinate indicator plus the buffered band; the indicator never runs past the band (code only) |

| Size | Track height | Radius (rounded) |
|---|---|---|
| small (default) | `--progress-bar-track-height-small` | `--progress-bar-track-radius-small` |
| large | `--progress-bar-track-height-large` | `--progress-bar-track-radius-large` |

Shape: rounded (default) uses the radius above on the track, indicator and band, so the ends stay fully round as the thickness grows; sharp uses `--progress-bar-track-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | What changes |
|---|---|
| static | the bar has no hover, pressed, focus or disabled states; only the Progress value changes it |
| determinate | the indicator grows over `--progress-bar-indicator-transition` as the value rises |
| indeterminate | the segment travels along the track continuously |
| buffering | the band grows ahead of the indicator; no band on an indeterminate bar |

Figma draws every value as a still. The fill growing and the indeterminate segment travelling belong to the implementation, and both must move in a shipped screen. Under reduced motion the indeterminate segment holds still and the label keeps saying work is in progress ([patterns 6.66](../patterns/06-accessibility.md)). Show the bar only for work longer than about a second, and hold it at least half a second once shown ([patterns 4.13–4.14](../patterns/04-states-feedback.md)).

## Spacing & Sizing
| Part | Token |
|---|---|
| Label row → indicator group | `--progress-bar-gap` |
| Label ↔ details slot | `--progress-bar-details-gap` |
| Track height | `--progress-bar-track-height-small` / `--progress-bar-track-height-large` |

Width is set by whoever places the bar (Figma draws it 408 wide); it never grows with its content. A long label wraps inside the row.

## Properties
| Property | Options | Default |
|---|---|---|
| Progress | 0% to 100%, Indeterminate, Buffering | 0% |
| Shape | rounded, sharp | rounded |
| Size | small, large | small |
| Show Label | on / off | on |
| Show Track | on / off | on |
| Show More Details | on / off | off |
| Label | text | — |
| Details | slot | empty |

Figma offers Progress as fixed samples because a variant can't hold a number; the implementation drives the real value.

## Usage
- Use determinate when progress is measurable, and Indeterminate or Buffering only when the length genuinely isn't known ([patterns 4.13](../patterns/04-states-feedback.md)).
- Keep the label on unless nearby copy already names the task; a bar reports a proportion, not a subject.
- Replace the shipped label copy (Uploading…) with words that name the actual task.
- Keep Show Track on; without it the fill has nothing to be measured against.
- Use large when progress is the main thing on the surface, small beside other content.
- Use a [Progress Circle](../molecules/progress-circle.md) where a bar won't fit.
- For a used amount against a fixed total (battery, storage, capacity), use a [Meter](./meter.md), not a progress bar.

## Accessibility
- Expose the bar as a progress indicator with its current value, range and a name for the task (`progressbar` with value, min and max); indeterminate bars omit the value.
- The label wording must name the task; the placeholder strings don't.
- Indeterminate and Buffering convey that work continues through movement; pair them with text for anyone who can't perceive the animation ([patterns 3.126](../patterns/03-controls-interaction.md)).
- Progress changes are announced without moving focus, at sensible intervals rather than every step ([patterns 6.53](../patterns/06-accessibility.md)).
- The fill and track are separated by colour alone, so `--progress-bar-indicator-background` keeps 3:1 against `--progress-bar-track-background` ([patterns 6.2](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a Zebra progress bar: a `--progress-bar-label-font` grey label (`--progress-bar-label-foreground`) above, then `--progress-bar-gap` below it a full-width `--progress-bar-track-height-small` light grey track (`--progress-bar-track-background`) with rounded ends, filled from the left in Zebra blue (`--progress-bar-indicator-background`) to the current value. The large size is `--progress-bar-track-height-large` tall. A sharp bar has square ends. Indeterminate progress is a short blue segment sweeping across; a buffering bar adds a faint darker band ahead of the blue fill.
