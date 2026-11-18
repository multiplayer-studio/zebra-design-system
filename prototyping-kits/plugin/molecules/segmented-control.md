---
name: Segmented Control
level: molecule
status: stable
composes: [../atoms/icon.md]
tokens:
  # track
  segmented-control-track-background: '{colors.color-fill-sunken}'
  segmented-control-track-padding: '{space.space-2xs}'
  segmented-control-track-gap: '{space.space-2xs}'
  segmented-control-track-radius-rounded: '{radius.radius-sm}'
  segmented-control-track-radius-sharp: '{radius.radius-none}'
  # indicator (the active segment's fill)
  segmented-control-indicator-background: '{colors.color-fill-default}'
  segmented-control-indicator-radius-rounded: '{radius.radius-sm}'
  segmented-control-indicator-radius-sharp: '{radius.radius-none}'
  segmented-control-indicator-border-width: '{stroke.stroke-thick}'
  segmented-control-indicator-border-color: '{colors.color-line-selection}'
  segmented-control-indicator-transition: '{motion.motion-smooth}'
  # segment
  segmented-control-segment-height: '{control.control-sm}'
  segmented-control-segment-padding-y: '{space.space-2xs}'
  segmented-control-segment-padding-start: '{space.space-md}'
  segmented-control-segment-padding-end: '{space.space-lg}'
  segmented-control-text-only-segment-padding-x: '{space.space-lg}'
  segmented-control-icon-only-segment-padding-x: '{space.space-lg}'
  segmented-control-segment-gap: '{space.space-2xs}'
  segmented-control-label-font: '{typography.type-label-medium}'
  segmented-control-label-foreground: '{colors.color-ink-medium}'
  segmented-control-label-foreground-hover: '{colors.color-ink-high}'
  segmented-control-label-foreground-selected: '{colors.color-ink-high}'
  segmented-control-icon-size: '{icon.icon-size-small}'
  # focus
  segmented-control-focus-ring-width: '{stroke.stroke-thick}'
  segmented-control-focus-ring-color: '{colors.color-line-focus}'
---

# Segmented Control

> A row of two to five mutually exclusive options of equal width on one track, where exactly one is active; it switches a mode or view of the same content.

## Anatomy
1. Track — horizontal row holding its segments, with the `--segmented-control-track-background` fill, `--segmented-control-track-padding` on all sides and `--segmented-control-track-gap` between segments. No border, no shadow.
2. Indicator — the active segment's `--segmented-control-indicator-background` fill inside a `--segmented-control-indicator-border-width` `--segmented-control-indicator-border-color` border, so the choice shows by shape as well as fill ([patterns 6.11](../patterns/06-accessibility.md)). It belongs to the track, not the segment, so it slides from one segment to the next.
3. Segment — one option: an [Icon](../atoms/icon.md), a label, or both. Every segment is the same width, set by the widest one ([patterns 3.30](../patterns/03-controls-interaction.md)).
4. Icon (optional) — leading glyph at `--segmented-control-icon-size`, coloured like the label.
5. Label (optional) — the option's name in `--segmented-control-label-font`.

## Variants
| Flavour | Content | Padding (H) | Gap |
|---|---|---|---|
| default | icon + label | `--segmented-control-segment-padding-start` / `--segmented-control-segment-padding-end` | `--segmented-control-segment-gap` |
| text only | label | `--segmented-control-text-only-segment-padding-x` both sides | — |
| icon only | icon | `--segmented-control-icon-only-segment-padding-x` both sides | — |

The padding is the minimum around the widest segment's content; narrower segments centre their content in the shared width. Pick one flavour and hold it across every segment of a control, so every segment has the same kind of content.

Rounded: on (default) → track `--segmented-control-track-radius-rounded`, indicator and segments `--segmented-control-indicator-radius-rounded`; off → `--segmented-control-track-radius-sharp` and `--segmented-control-indicator-radius-sharp`. The control sets it for every segment at once. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Segment background | Label / icon | Notes |
|---|---|---|---|
| default | none (track shows through) | `--segmented-control-label-foreground` | an unchosen segment |
| hover | none | `--segmented-control-label-foreground-hover` | unchosen segment only; pointer devices only |
| active | indicator `--segmented-control-indicator-background`, `--segmented-control-indicator-border-width` `--segmented-control-indicator-border-color` | `--segmented-control-label-foreground-selected` | exactly one per control |
| focused | unchanged | unchanged | `--segmented-control-focus-ring-width` `--segmented-control-focus-ring-color` ring around the segment |

The indicator slides to the newly chosen segment over `--segmented-control-indicator-transition`. It stays inside the control as it moves, so it uses the standard curve, not an entering ease-in ([patterns 3.122](../patterns/03-controls-interaction.md)). Figma's 150ms ease-in is not followed. Hover changes only the label colour; the active segment differs by fill and border. Under reduced motion the indicator fades to its new place instead of sliding ([patterns 6.66](../patterns/06-accessibility.md)).

## Spacing & Sizing
| Property | Value |
|---|---|
| Minimum segment height | `--segmented-control-segment-height` |
| Segment padding (V) | `--segmented-control-segment-padding-y` |
| Track padding | `--segmented-control-track-padding` |
| Gap between segments | `--segmented-control-track-gap` |
| Icon | `--segmented-control-icon-size` |
| Font | `--segmented-control-label-font` |

There is one size. The track's height is the segment height plus its padding, and grows with the text size ([patterns 5.37](../patterns/05-sizes-devices.md)). Its width is the number of segments times the widest segment, or it fills its container with the segments sharing the width equally. The control never wraps. When the labels don't fit on one line, as in a longer language or a larger text size, it becomes a list of choices (radios, or a [Select](./select.md)) holding the same options ([patterns 3.30](../patterns/03-controls-interaction.md)).

## Properties
| Property | Options | Default |
|---|---|---|
| Rounded | on / off | on |
| Flavour | default (icon + label), text only, icon only | default |
| Segments | two to five | three |
| Segment label | text, one or two words | Item |
| Segment icon | any icon | — |
| Active segment | exactly one | first |

Hover and focus are driven by interaction.

## Usage
- Use it to switch a mode or view of the same content, or to pick one of two to five closely related short options ([patterns 3.15](../patterns/03-controls-interaction.md)). To move between screens or sections, use [Tab Bar](./tab-bar.md).
- Always have exactly one segment active; the current value shows from the start ([patterns 3.27](../patterns/03-controls-interaction.md)).
- Never put an action in a segment.
- Keep labels short and parallel. Six or more options are a list, not a segmented control.
- Use icon only only when every glyph is unambiguous, and name the options another way.

## Accessibility
- Give the track `role="radiogroup"` (or `tablist` when it controls panels) and an accessible name; each segment is a `radio` with `aria-checked`.
- Arrow keys move the selection between segments; only the active segment is in the tab order. The focus ring (`--segmented-control-focus-ring-width` `--segmented-control-focus-ring-color`) must come from code.
- The active segment shows by its border as well as its fill, so it never relies on `--segmented-control-indicator-background` against `--segmented-control-track-background` alone ([patterns 6.3](../patterns/06-accessibility.md)).
- Icon-only segments carry no text; give each an `aria-label`. Icons beside a label are decorative.
- The label (`--segmented-control-label-font`) is the option's only name in two of the three flavours.

## Claude Prompt
Draw a compact horizontal toggle: a light grey track (`--segmented-control-track-background`) with `--segmented-control-track-radius-rounded` corners and `--segmented-control-track-padding` padding holding three equal-width segments `--segmented-control-segment-height` tall, `--segmented-control-track-gap` apart. Each segment has a `--segmented-control-icon-size` icon and a short label in `--segmented-control-label-font`, centred. The active segment sits on a white fill (`--segmented-control-indicator-background`) with a `--segmented-control-indicator-border-width` blue border (`--segmented-control-indicator-border-color`), `--segmented-control-indicator-radius-rounded` corners and near-black text (`--segmented-control-label-foreground-selected`); the others are dark grey (`--segmented-control-label-foreground`) directly on the track.
