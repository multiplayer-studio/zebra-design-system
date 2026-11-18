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
  # thumb check (default)
  switch-thumb-icon-foreground: '{colors.color-brand-primary-default}'
  switch-thumb-icon-foreground-disabled: '{colors.color-fill-disabled}'
  switch-thumb-icon-size: '{icon.icon-size-small}'
  # track icons
  switch-icon-foreground: '{colors.color-ink-inverse}'
  switch-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # pending
  switch-pending-indicator-stroke-width: '{stroke.stroke-thick}'
  switch-pending-indicator-duration: '{motion.motion-spin}'
  # focus, motion
  switch-focus-ring-width: '{stroke.stroke-thick}'
  switch-focus-ring-color: '{colors.color-line-focus}'
  switch-transition: '{motion.motion-spring}'
  switch-feedback-transition: '{motion.motion-feedback}'
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

> A single on/off toggle that acts at once: a thumb that slides between the two ends of a pill track, with a check in the thumb when on.

## Anatomy
1. Track — a pill (`--switch-track-radius`) behind everything else, `--switch-track-padding` inside on every side. Its colour depends on both State and Switch.
2. Left icon (track icons only) — an [Icon](../atoms/icon.md) at the start of the track, the glyph for "on". Covered by the thumb when the switch is off.
3. Right icon (track icons only) — an [Icon](../atoms/icon.md) at the end of the track, the glyph for "off". Covered by the thumb when the switch is on.
4. Thumb — a `--switch-thumb-size` circle that slides `--switch-thumb-travel` between the two ends. Its colour changes only between enabled and disabled, never between on and off.
5. Thumb check (default) — a check [Icon](../atoms/icon.md) centred in the thumb when on, `--switch-thumb-icon-size`, in `--switch-thumb-icon-foreground`. Nothing shows in the thumb when off.
6. Pending indicator (pending state only) — a spinning arc centred in the thumb in place of the check, `--switch-thumb-icon-size` square, `--switch-pending-indicator-stroke-width` wide, in `--switch-thumb-icon-foreground`, one turn per `--switch-pending-indicator-duration`.

Track icons are shown or removed as a pair. Either glyph can be swapped; keep them a state-communicating pair (for example microphone / microphone off) rather than unrelated glyphs. Track icons replace the thumb check; the two never show together.

The switch has no label of its own. When a visible label sits beside it (as it nearly always should), it is set in `--switch-label-font`, `--switch-label-foreground`, `--switch-label-gap` from the track.

## Variants
| Variant | Description |
|---|---|
| thumb check (default) | a check in the thumb when on, so the state shows by a mark as well as position ([patterns 3.22](../patterns/03-controls-interaction.md)) |
| track icons | both track icon slots shown, `--switch-icon-size`, in `--switch-icon-foreground`; the one nearest the thumb is covered |
| plain | track and thumb only; the thumb's position alone shows the state, so use it only where the label already says on or off |

Track and thumb are always pill and circle; there is no sharp variant.

## States
| State | Track | Thumb | Icons | Notes |
|---|---|---|---|---|
| off | `--switch-track-background-off` | `--switch-thumb-background`, at the start, empty | `--switch-icon-foreground` | track icons: right icon visible |
| on | `--switch-track-background-on` | `--switch-thumb-background`, moved `--switch-thumb-travel` to the end, check in `--switch-thumb-icon-foreground` | `--switch-icon-foreground` | track icons: left icon visible |
| pending | the new position's colour | at the new position, pending indicator in place of the check | unchanged | the setting is on its way to a device or service; further toggles are ignored until the result comes back, and it's announced as busy |
| focused | unchanged | unchanged | unchanged | `--switch-focus-ring-width` `--switch-focus-ring-color` border drawn inside the track's own bounds, so the size doesn't change |
| disabled (on or off) | `--switch-track-background-disabled` | `--switch-thumb-background-disabled`, check in `--switch-thumb-icon-foreground-disabled` when on | `--switch-icon-foreground-disabled` | thumb keeps its position; label `--switch-label-foreground-disabled`; doesn't toggle |

Toggling slides the thumb to the other end over `--switch-transition` (a spring, exempt from the short feedback timing). The track colour and the thumb check change over `--switch-feedback-transition`, the press and toggle feedback timing. The thumb stretches to about 1.3× its width mid-slide before settling back. Toggling again mid-animation reverses the thumb from where it is, without jumping or restarting. Under reduced motion the thumb moves without travel or bounce, and the colour and check changes stay ([patterns 6.66](../patterns/06-accessibility.md)).

Use pending only where the setting must reach a device or service ([patterns 3.21](../patterns/03-controls-interaction.md)). If it fails, the switch returns to its earlier position and the reason shows beside it.

## Spacing & Sizing
| Part | Token |
|---|---|
| Track width × height | `--switch-track-width` × `--switch-track-height`, fixed |
| Track radius | `--switch-track-radius` |
| Track padding | `--switch-track-padding` on every side (thumb and icons both sit inside it) |
| Thumb | `--switch-thumb-size` circle |
| Thumb travel | `--switch-thumb-travel` |
| Thumb check, pending indicator | `--switch-thumb-icon-size`, centred in the thumb |
| Track icon | `--switch-icon-size` square at each end |
| Label gap (when labelled) | `--switch-label-gap` |

The control is fixed in both axes and never hugs its content. The track (`--switch-track-height`) is below `--switch-touch-target-size-minimum`, so make the whole row (label and switch) the touch target ([patterns 3.29](../patterns/03-controls-interaction.md)).

Icon size is a context override: track icons use the icon atom's `--icon-size-medium` step, the thumb check `--icon-size-small`.

## Properties
| Property | Options | Default |
|---|---|---|
| Switch | off, on | off |
| Icons | thumb check, track icons, none | thumb check |
| Left icon | any icon (track icons only) | — (the "on" glyph) |
| Right icon | any icon (track icons only) | — (the "off" glyph) |
| Pending | on / off | off |
| Disabled | on / off | off |

Focus is driven by interaction, never set on a static layout.

## Usage
- Use for a setting that takes effect immediately ([patterns 3.20](../patterns/03-controls-interaction.md)); use a [Checkbox](../atoms/checkbox.md) when the choice is submitted later, and a button that confirms for anything hard to reverse ([patterns 3.68](../patterns/03-controls-interaction.md)). A switch never sits in a form with Save ([patterns 3.62](../patterns/03-controls-interaction.md)).
- Label the switch with what it does when on ([patterns 7.30](../patterns/07-content-copy.md)).
- State is shown by the thumb's position, the thumb check and the track colour together; the thumb itself never changes colour between on and off.
- Keep the thumb check unless a track icon pair says more (microphone / microphone off).
- The focus border is drawn inside the track, so it never extends past the footprint.

## Accessibility
- Expose it as a switch (`role="switch"` on a checkbox input, or the platform's switch) so screen readers announce "[label], switch, on" or "off". The label is its name: use a `<label>` or `aria-labelledby`.
- Space toggles the switch (Enter may too); Tab moves focus to and from it.
- The focus border (`--switch-focus-ring-width` `--switch-focus-ring-color`) must stay visible against both the on and off track colours.
- State doesn't rely on colour alone: the thumb's position and the check show it too ([patterns 6.11](../patterns/06-accessibility.md)). The icons are decorative (hidden from assistive tech); the role and state carry the meaning.
- Pending is announced (`aria-busy="true"`), and the result or failure is announced without moving focus.
- A disabled switch can't be toggled but stays readable; say why it's disabled beside it ([patterns 6.6](../patterns/06-accessibility.md)).
- Reduced motion: see States ([patterns 6.66](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a Zebra switch: a `--switch-track-width` by `--switch-track-height` fully rounded pill track with `--switch-track-padding` padding and a white (`--switch-thumb-background`) `--switch-thumb-size` circular thumb. Off, the track is mid-grey `--switch-track-background-off` with an empty thumb on the left; on, the track is Zebra blue `--switch-track-background-on` with the thumb on the right holding a small blue `--switch-thumb-icon-size` check (`--switch-thumb-icon-foreground`). A track-icons version shows a small white `--switch-icon-size` icon at each end of the track (for example microphone off at the right, microphone at the left), the one under the thumb covered, and no check. A plain version has neither. Disabled uses a pale grey `--switch-track-background-disabled` track with a grey thumb. Focus adds a `--switch-focus-ring-width` blue border inside the track. A `--switch-label-font` label sits `--switch-label-gap` beside it.
