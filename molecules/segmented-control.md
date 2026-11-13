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

> A row of mutually exclusive options on one track, where exactly one is active; it switches a mode within a view.

## Anatomy
1. Track — horizontal row hugging its segments, with the `--segmented-control-track-background` fill, `--segmented-control-track-padding` on all sides and `--segmented-control-track-gap` between segments. No border, no shadow.
2. Indicator — the active segment's `--segmented-control-indicator-background` fill. It belongs to the track, not the segment, so it slides from one segment to the next.
3. Segment — one option, hugging its content: an [Icon](../atoms/icon.md), a label, or both. Segments aren't equal widths; each is as wide as its content.
4. Icon (optional) — leading glyph at `--segmented-control-icon-size`, coloured like the label.
5. Label (optional) — the option's name in `--segmented-control-label-font`.

## Variants
| Flavour | Content | Padding (H) | Gap |
|---|---|---|---|
| default | icon + label | `--segmented-control-segment-padding-start` / `--segmented-control-segment-padding-end` | `--segmented-control-segment-gap` |
| text only | label | `--segmented-control-text-only-segment-padding-x` both sides | — |
| icon only | icon | `--segmented-control-icon-only-segment-padding-x` both sides | — |

Dropping a part widens the padding rather than narrowing the segment. Pick one flavour and hold it across every segment of a control.

Rounded: on (default) → track `--segmented-control-track-radius-rounded`, indicator and segments `--segmented-control-indicator-radius-rounded`; off → `--segmented-control-track-radius-sharp` and `--segmented-control-indicator-radius-sharp`. The control sets it for every segment at once. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Segment background | Label / icon | Notes |
|---|---|---|---|
| default | none (track shows through) | `--segmented-control-label-foreground` | an unchosen segment |
| hover | none | `--segmented-control-label-foreground-hover` | unchosen segment only; pointer devices only |
| active | indicator `--segmented-control-indicator-background` | `--segmented-control-label-foreground-selected` | exactly one per control |
| focused | unchanged | unchanged | `--segmented-control-focus-ring-width` `--segmented-control-focus-ring-color` ring around the segment |

The indicator slides to the newly chosen segment over `--segmented-control-indicator-transition`, resizing to its width; the label colours change with it. Figma specifies 150ms ease-in, which has no motion token yet, so the indicator uses the smooth motion meanwhile. Hover changes only the label colour, so hover and active differ only by the fill. Under reduced motion the indicator jumps.

## Spacing & Sizing
| Property | Value |
|---|---|
| Segment height | `--segmented-control-segment-height` |
| Segment padding (V) | `--segmented-control-segment-padding-y` |
| Track padding | `--segmented-control-track-padding` |
| Gap between segments | `--segmented-control-track-gap` |
| Icon | `--segmented-control-icon-size` |
| Font | `--segmented-control-label-font` |

There is one size. The track's height is the segment height plus its padding; its width is the sum of the segments, so it grows with their labels.

## Properties
| Property | Options | Default |
|---|---|---|
| Rounded | on / off | on |
| Flavour | default (icon + label), text only, icon only | default |
| Segments | two or more | three |
| Segment label | text, one or two words | Item |
| Segment icon | any icon | — |
| Active segment | exactly one | first |

Hover and focus are driven by interaction.

## Usage
- Use it to switch a mode or view of the same content. To move between screens or sections, use [Tab Bar](./tab-bar.md).
- Always have exactly one segment active; one is chosen from the start.
- Keep labels short and parallel. Segments hug their labels, so one long option makes the row look uneven.
- Keep it to a handful of segments; a long list pushes the track wider than its container.
- Use icon only only when every glyph is unambiguous, and name the options another way.
- Don't rely on hover to show what is chosen; only the fill separates hover from active.

## Accessibility
- Give the track `role="radiogroup"` (or `tablist` when it controls panels) and an accessible name; each segment is a `radio` with `aria-checked`. Expose the selection in markup, not only by the `--segmented-control-indicator-background` fill.
- Arrow keys move the selection between segments; only the active segment is in the tab order. The focus ring (`--segmented-control-focus-ring-width` `--segmented-control-focus-ring-color`) must come from code.
- Hover and active share `--segmented-control-label-foreground-selected`. Check `--segmented-control-indicator-background` against `--segmented-control-track-background`: that difference is the whole signal.
- Icon-only segments carry no text; give each an `aria-label`. Icons beside a label are decorative.
- The label (`--segmented-control-label-font`) is the option's only name in two of the three flavours.

## Claude Prompt
Draw a compact horizontal toggle: a light grey track (`--segmented-control-track-background`) with `--segmented-control-track-radius-rounded` corners and `--segmented-control-track-padding` padding holding three segments `--segmented-control-segment-height` tall, `--segmented-control-track-gap` apart. Each segment has a `--segmented-control-icon-size` icon and a short label in `--segmented-control-label-font`, `--segmented-control-segment-padding-start` padding on the left and `--segmented-control-segment-padding-end` on the right. The active segment sits on a white fill (`--segmented-control-indicator-background`) with `--segmented-control-indicator-radius-rounded` corners and near-black text (`--segmented-control-label-foreground-selected`); the others are dark grey (`--segmented-control-label-foreground`) directly on the track. Segments hug their content, so widths differ.
