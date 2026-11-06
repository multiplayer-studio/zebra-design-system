---
name: Switch
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # sizing
  switch-track-width: '{spacing.spacing-9xl}'
  switch-track-height: '{spacing.spacing-4xl}'
  switch-track-radius: '{spacing.spacing-large}'
  switch-thumb-size: '{spacing.spacing-2xl}'
  switch-thumb-inset: '{spacing.spacing-minimum}'
  switch-thumb-travel: '{spacing.spacing-4xl}'
  switch-label-gap: '{spacing.spacing-medium}'
  switch-label-font: '{typography.body-medium}'
  switch-touch-target-size-minimum: '{layout.touch-target-ios}'
  # states
  switch-track-background-off: '{colors.main-disabled}'
  switch-track-background-on: '{colors.main-primary}'
  switch-track-background-disabled: '{colors.surface-disabled}'
  switch-thumb-background: '{colors.main-inverse}'
  switch-thumb-background-disabled: '{colors.main-disabled}'
  switch-focus-ring-width: '{border.border-size-medium}'
  switch-focus-ring-color: '{colors.border-primary}'
  # motion
  switch-thumb-duration: '{motion.motion-fast}'
  switch-thumb-easing: '{motion.easing-out}'
---

# Switch

> Switches toggle the state of a single item ON or OFF.

## Anatomy
1. Track — pill-shaped, focusable, clickable.
2. Thumb — circle that slides from left (off) to right (on).
3. Active / inactive icons (optional) — [Icons](../atoms/icon.md) at the default `--icon-size`, inverse colour (`--icon-foreground-inverse`, disabled `--icon-foreground-disabled`), shown inside the track; provide both or neither.
4. Label (optional) — to the right, `--switch-label-gap` gap.

## Variants
| Variant | Description |
|---|---|
| default | plain track + thumb |
| with icons | icon on the empty side of the track (same size as thumb, `--icon-size`) |

Track and thumb are always pill/circle; the rounded option only switches between round and sharp icons.

## States
| State | Track | Thumb | Icon |
|---|---|---|---|
| off | `--switch-track-background-off` | `--switch-thumb-background`, left | `--icon-foreground-inverse` |
| on | `--switch-track-background-on` | `--switch-thumb-background`, moved right by the thumb travel (`--switch-thumb-travel`) | `--icon-foreground-inverse` |
| disabled | `--switch-track-background-disabled` | `--switch-thumb-background-disabled` | `--icon-foreground-disabled` |
| focused | `--switch-focus-ring-width` `--switch-focus-ring-color` focus ring | — | — |

Motion: thumb, track and icons animate over `--switch-thumb-duration` `--switch-thumb-easing`; no motion when the user prefers reduced motion.

## Spacing & Sizing
| Part | Token |
|---|---|
| Track width | `--switch-track-width` |
| Track height | `--switch-track-height` |
| Track radius | `--switch-track-radius` (half the height) |
| Thumb | `--switch-thumb-size` circle |
| Thumb inset | `--switch-thumb-inset` |
| Thumb travel | `--switch-thumb-travel` |
| Icon | `--icon-size` (same as thumb) |
| Label gap | `--switch-label-gap` |

## Properties
| Property | Options | Default |
|---|---|---|
| On | on / off | off |
| Disabled | on / off | off |
| Active icon / Inactive icon | any icon (both or neither) | none |
| Rounded | round / sharp icons | round |
| Label | text | none |

## Usage
- Use for settings that take effect immediately; use a checkbox when the choice is submitted later.
- Label the switch with what is being controlled, not the state ("Wi-Fi", not "On").
- The `--switch-track-height` track is below `--switch-touch-target-size-minimum`: keep the row (label + switch) as the touch target.
- On/off is conveyed by position as well as colour; add icons for extra clarity.

## Stitch Prompt
Draw a Zeta switch: a `--switch-track-width` by `--switch-track-height` fully rounded pill track with a `--switch-thumb-size` light (`--switch-thumb-background`) circular thumb inset `--switch-thumb-inset` from the edge. Off, the track is mid-grey `--switch-track-background-off` with the thumb on the left; on, the track is blue `--switch-track-background-on` with the thumb on the right. An optional variant shows a small light icon (e.g. a check or cross) in the empty half of the track. Disabled uses a pale grey `--switch-track-background-disabled` track with a grey thumb. An optional `--switch-label-font` label sits `--switch-label-gap` to the right.
