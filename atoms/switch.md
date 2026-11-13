---
name: Switch
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # track
  switch-track-background-off: '{colors.color-status-neutral-default}'
  switch-track-background-on: '{colors.color-brand-primary-default}'
  switch-track-background-disabled: '{colors.color-fill-disabled}'
  # thumb
  switch-thumb-background: '{colors.color-brand-primary-on}'
  switch-thumb-background-disabled: '{colors.color-ink-disabled}'
  # icons
  switch-icon-foreground: '{colors.color-ink-inverse}'
  switch-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # focus, motion
  switch-focus-ring-width: '{stroke.stroke-thick}'
  switch-focus-ring-color: '{colors.color-line-focus}'
  switch-transition: '{motion.motion-spring}'
  # sizes
  switch-track-width: '{primitives.scale-17}'
  switch-track-height: '{primitives.scale-11}'
  switch-track-radius: '{radius.radius-pill}'
  switch-track-padding: '{space.space-2xs}'
  switch-thumb-size: '{control.control-xs}'
  switch-thumb-travel: '{primitives.scale-11}'
  switch-icon-size: '{icon.icon-size-medium}'
  switch-touch-target-size-minimum: '{control.control-target-min}'
  # adjacent label (not part of the Figma component)
  switch-label-gap: '{space.space-md}'
  switch-label-font: '{typography.type-body-medium}'
  switch-label-foreground: '{colors.color-ink-high}'
  switch-label-foreground-disabled: '{colors.color-ink-disabled}'
---

# Switch

> A single on/off toggle: a thumb that slides between the two ends of a pill track, with an optional icon at each end.

## Anatomy
1. Track — a pill (`--switch-track-radius`) behind everything else, `--switch-track-padding` inside on every side. Its colour depends on both State and Switch.
2. Left icon (optional) — an [Icon](../atoms/icon.md) at the start of the track, the glyph for "on". Covered by the thumb when the switch is off.
3. Right icon (optional) — an [Icon](../atoms/icon.md) at the end of the track, the glyph for "off". Covered by the thumb when the switch is on.
4. Thumb — a `--switch-thumb-size` circle that slides `--switch-thumb-travel` between the two ends. Its colour changes only between enabled and disabled, never between on and off.

The two icons are shown or removed as a pair (Has icons). Either glyph can be swapped; keep them a state-communicating pair (e.g. microphone / microphone off) rather than unrelated glyphs.

The switch has no label of its own. When a visible label sits beside it (as it nearly always should), it is set in `--switch-label-font`, `--switch-label-foreground`, `--switch-label-gap` from the track.

## Variants
| Variant | Description |
|---|---|
| plain | track and thumb only |
| with icons (default) | both icon slots shown, `--switch-icon-size`, in `--switch-icon-foreground`; the one nearest the thumb is covered |

Track and thumb are always pill and circle; there is no sharp variant.

## States
| State | Track | Thumb | Icons | Notes |
|---|---|---|---|---|
| off | `--switch-track-background-off` | `--switch-thumb-background`, at the start | `--switch-icon-foreground` | right icon visible |
| on | `--switch-track-background-on` | `--switch-thumb-background`, moved `--switch-thumb-travel` to the end | `--switch-icon-foreground` | left icon visible |
| focused | unchanged | unchanged | unchanged | `--switch-focus-ring-width` `--switch-focus-ring-color` border drawn inside the track's own bounds, so the size doesn't change |
| disabled (on or off) | `--switch-track-background-disabled` | `--switch-thumb-background-disabled` | `--switch-icon-foreground-disabled` | thumb keeps its position; label `--switch-label-foreground-disabled`; not interactive |

Toggling slides the thumb to the other end over `--switch-transition` (a spring), and the track colour changes in step so it reaches its final colour exactly when the thumb arrives. The thumb stretches to about 1.3× its width mid-slide before settling back. Toggling again mid-animation reverses the thumb from where it is, without jumping or restarting. With reduced motion the change is instant; the colour change remains, because it shows the state.

## Spacing & Sizing
| Part | Token |
|---|---|
| Track width × height | `--switch-track-width` × `--switch-track-height`, fixed |
| Track radius | `--switch-track-radius` |
| Track padding | `--switch-track-padding` on every side (thumb and icons both sit inside it) |
| Thumb | `--switch-thumb-size` circle |
| Thumb travel | `--switch-thumb-travel` |
| Icon | `--switch-icon-size` square at each end |
| Label gap (when labelled) | `--switch-label-gap` |

The control is fixed in both axes and never hugs its content. The track (`--switch-track-height`) is below `--switch-touch-target-size-minimum`, so make the whole row (label and switch) the touch target.

Icon size is a context override: the icons use the icon atom's `--icon-size-medium` step.

## Properties
| Property | Options | Default |
|---|---|---|
| Switch | off, on | off |
| Has icons | on / off | on |
| Left icon | any icon | — (the "on" glyph) |
| Right icon | any icon | — (the "off" glyph) |
| Disabled | on / off | off |

Focus is driven by interaction, never set on a static layout.

## Usage
- Use for a setting that takes effect immediately; use a [Checkbox](../atoms/checkbox.md) when the choice is submitted later.
- Label the switch with what it controls, not its state ("Wi-Fi", not "On").
- State is shown by the thumb's position and the track colour together; the thumb itself never changes colour between on and off.
- Turn Has icons off for a plain switch; when icons are on, keep the pair meaningful.
- The focus border is drawn inside the track, so it never extends past the footprint.

## Accessibility
- Expose it as a switch (`role="switch"` on a checkbox input, or the platform's switch) so screen readers announce "[label], switch, on" or "off". The label is its name: use a `<label>` or `aria-labelledby`.
- Space toggles the switch (Enter may too); Tab moves focus to and from it.
- The focus border (`--switch-focus-ring-width` `--switch-focus-ring-color`) must stay visible against both the on and off track colours.
- State doesn't rely on colour alone: the thumb's position shows it too. The icons are decorative (hidden from assistive tech); the role and state carry the meaning.
- A disabled switch can't be toggled but stays readable; explain nearby why it's disabled when that isn't obvious.
- Respect reduced motion: switch instantly, keep the colour change.

## Claude Prompt
Draw a Zebra switch: a `--switch-track-width` by `--switch-track-height` fully rounded pill track with `--switch-track-padding` padding and a white (`--switch-thumb-background`) `--switch-thumb-size` circular thumb. Off, the track is mid-grey `--switch-track-background-off` with the thumb on the left and a small white `--switch-icon-size` icon (e.g. microphone off) visible at the right end; on, the track is Zebra blue `--switch-track-background-on` with the thumb on the right and the "on" icon (e.g. microphone) visible at the left end. A plain version has no icons. Disabled uses a pale grey `--switch-track-background-disabled` track with a grey thumb. Focus adds a `--switch-focus-ring-width` blue border inside the track. A `--switch-label-font` label sits `--switch-label-gap` beside it.
