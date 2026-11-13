---
name: Slider
level: atom
status: stable
composes: []
tokens:
  # track (base)
  slider-track-background: '{colors.color-fill-sunken}'
  slider-track-height: '{primitives.scale-3}'
  slider-track-radius-rounded: '{radius.radius-xs}'
  slider-track-radius-sharp: '{radius.radius-none}'
  # active track (the value)
  slider-active-track-background-default: '{colors.color-ink-high}'
  slider-active-track-background-selected: '{colors.color-ink-brand}'
  slider-active-track-background-disabled: '{colors.color-ink-disabled}'
  # thumb
  slider-thumb-background-default: '{colors.color-ink-high}'
  slider-thumb-background-selected: '{colors.color-ink-brand}'
  slider-thumb-background-disabled: '{colors.color-ink-disabled}'
  slider-thumb-size: '{control.control-icon-sm}'
  slider-thumb-size-active: '{control.control-icon-md}'
  slider-thumb-radius-rounded: '{radius.radius-pill}'
  slider-thumb-radius-sharp: '{radius.radius-none}'
  slider-thumb-touch-target-size: '{control.control-target-min}'
  # focus
  slider-focus-ring-width: '{stroke.stroke-thick}'
  slider-focus-ring-color: '{colors.color-line-focus}'
  # step indicators
  slider-step-dot-size: '{primitives.scale-2}'
  slider-step-dot-background: '{colors.color-ink-inverse}'
  slider-step-inset: '{space.space-3xs}'
---

# Slider

> Chooses a value, or a span of values, along a range by dragging a thumb.

## Anatomy
1. Track — the base, full width, `--slider-track-height` tall in `--slider-track-background`. It is the only part that does not change with state.
2. Active track — runs from the minimum to the value (or between the two thumbs in range mode). Its width is the value. Square-ended on both shapes.
3. Step indicators (Stepped only) — `--slider-step-dot-size` dots in `--slider-step-dot-background`, one per valid stop, spaced evenly across the full track with `--slider-step-inset` held at each end. They sit above both track layers and below the thumb, so they cross the active track and the base alike.
4. Thumb — pinned to the trailing edge of the active track, centred on the track and overhanging it above and below. In range mode a second thumb marks the start of the span.

Stacking, back to front: track, active track, step indicators, thumb.

## Variants
| Range | Thumbs | Active track |
|---|---|---|
| false (default) | one, at the value | minimum → value |
| true | two, start and end of the span | between the thumbs |

| Stepped | Behaviour |
|---|---|
| true (default) | dots mark each valid stop; the thumb snaps to them |
| false | continuous, smooth movement and finer adjustment |

| Shape | Track ends | Thumb |
|---|---|---|
| rounded (default) | `--slider-track-radius-rounded` | `--slider-thumb-radius-rounded` (circle) |
| sharp | `--slider-track-radius-sharp` | `--slider-thumb-radius-sharp` (square) |

Shape reaches the track ends and the thumb together, so the two never disagree. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Active track | Thumb | Thumb size |
|---|---|---|---|
| default | `--slider-active-track-background-default` | `--slider-thumb-background-default` | `--slider-thumb-size` |
| hover | unchanged | unchanged | the hovered thumb only: `--slider-thumb-size-active` |
| selected | `--slider-active-track-background-selected` | both thumbs `--slider-thumb-background-selected`, the active one with a `--slider-focus-ring-width` `--slider-focus-ring-color` ring | the thumb under the pointer or being dragged: `--slider-thumb-size-active`; the other keeps `--slider-thumb-size` |
| disabled | `--slider-active-track-background-disabled` | `--slider-thumb-background-disabled` | `--slider-thumb-size` |

State belongs to the slider; the track, thumbs and dots follow it and are never set on their own. Selected covers a pressed thumb, a drag in progress and keyboard focus. No transition is defined: moving the thumb is a width change on the active track, and position and fill move together.

## Spacing & Sizing
| Part | Token |
|---|---|
| Track height | `--slider-track-height` |
| Thumb | `--slider-thumb-size` square at rest, `--slider-thumb-size-active` under the pointer |
| Thumb hit area | `--slider-thumb-touch-target-size` square, centred on the thumb |
| Step dot | `--slider-step-dot-size` square; `--slider-step-inset` at each end |

The slider fills its container's width (Figma draws it 400 wide); the height is the track, with the thumb overhanging it.

## Properties
| Property | Options | Default |
|---|---|---|
| Shape | rounded, sharp | rounded |
| State | default, hover, selected, disabled | default |
| Stepped | true, false | true |
| Range | true, false | false |
| Value | number (two numbers when Range is true) | — |
| Min / max | number | 0 / 100 |
| Step | number (when Stepped) | — |

Hover and selected are driven by interaction, never set on a static layout. The number of dots comes from the step, not from a property.

## Usage
- Use it where the range matters more than the exact figure; a precise value is quicker to type. Pair it with a number box in [Slider Input Field](../molecules/slider-input-field.md) when exact entry is needed.
- Keep Stepped on whenever only certain values are valid, so the dots show where the thumb can land.
- Use Range to filter by a span (a price or weight band); each thumb is a value of its own.
- Don't set state on the track or the thumb separately.
- Don't use Shape to carry meaning; it matches the controls around the slider.
- Expose the current value in text nearby; don't rely on thumb position alone.

## Accessibility
- The value is carried by position and fill alone. Expose it as a number with its minimum and maximum (a `slider` role with value, min and max), and update it as it changes.
- Each thumb is focusable and moves with the arrow keys (Page Up / Down for bigger steps, Home / End for the ends). The focused thumb takes the `--slider-focus-ring-width` `--slider-focus-ring-color` ring, so in range mode it is clear which end the keys move.
- Hover is answered by the thumb growing; keyboard users get the focus ring instead.
- In range mode each thumb needs its own name ("Lower value", "Upper value") and value, or the pair reads as one control.
- The step dots use `--slider-step-dot-background` across the whole track, so their contrast differs either side of the value; they are decorative.
- The thumb is small: give it a `--slider-thumb-touch-target-size` hit area on touch UIs.
- Disabled is carried by colour alone; say why the value can't be changed in nearby text.

## Stitch Prompt
Draw a Zebra slider: a thin `--slider-track-height` light grey track (`--slider-track-background`) with slightly rounded ends (`--slider-track-radius-rounded`), filled near-black (`--slider-active-track-background-default`) from the left up to a `--slider-thumb-size` near-black circular thumb (`--slider-thumb-background-default`). Tiny white `--slider-step-dot-size` dots mark the steps along the track. While dragged, the fill and thumb turn blue (`--slider-active-track-background-selected`) and the thumb grows to `--slider-thumb-size-active` with a blue focus ring. A range slider has two thumbs with the fill between them. A sharp slider has a square thumb and square track ends. Disabled sliders turn the fill and thumb grey (`--slider-active-track-background-disabled`).
