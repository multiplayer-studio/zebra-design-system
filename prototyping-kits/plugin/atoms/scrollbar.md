---
name: Scrollbar
level: atom
status: stable
composes: []
tokens:
  # track
  scrollbar-track-background: '{colors.color-status-ghost-default}'
  scrollbar-track-background-hover: '{colors.color-status-ghost-faint}'
  # handle
  scrollbar-handle-background: '{colors.color-ink-disabled}'
  scrollbar-handle-background-hover: '{colors.color-ink-medium}'
  scrollbar-handle-radius: '{radius.radius-pill}'
  # sizes
  scrollbar-container-thickness: '{primitives.scale-6}'
  scrollbar-container-padding: '{space.space-2xs}'
  scrollbar-handle-thickness: '{primitives.scale-3}'
---

# Scrollbar

> The scroll indicator for a region that clips its content: a padded gutter holding a pill handle whose position and length mirror the scroll offset.

## Anatomy
1. Bar — the component frame: a `--scrollbar-container-thickness` gutter running the full length of the scrolling region's edge, padded `--scrollbar-container-padding` on every side so the handle floats clear of the content edge.
2. Track — fills the bar behind the handle: `--scrollbar-track-background` at rest (invisible), `--scrollbar-track-background-hover` under the pointer. It has no radius of its own.
3. Handle — the `--scrollbar-handle-thickness` pill (`--scrollbar-handle-radius`) that shows the position. Its length is the viewport's share of the content and its offset mirrors the scroll position; neither is a property.

Track and handle are fixed parts, not slots: there is nothing to restyle or hide per instance.

## Variants
| Orientation | Sits | Handle moves |
|---|---|---|
| vertical (default) | against the trailing edge of the content | up and down |
| horizontal | along the bottom edge, for content that pans sideways (e.g. the Table's frozen columns) | left and right |

The two orientations swap axes and nothing else: same padding, colours and radius.

## States
| State | Track | Handle | Notes |
|---|---|---|---|
| default | `--scrollbar-track-background` | `--scrollbar-handle-background` | resting; the bar reads as part of the content's edge, not a control |
| hover | `--scrollbar-track-background-hover` | `--scrollbar-handle-background-hover` | pointer over the gutter; the ghost tint makes the grab target readable |

There is no pressed, dragging or focus state. No transition is defined: the colours swap. Whether the bar fades in with scroll activity and out when it stops belongs to the implementation, as do the handle's length and offset.

## Spacing & Sizing
| Property | Token | Notes |
|---|---|---|
| Gutter thickness | `--scrollbar-container-thickness` | the bar's cross-axis size |
| Padding | `--scrollbar-container-padding` | all four sides; centres the handle in the gutter |
| Handle thickness | `--scrollbar-handle-thickness` | gutter minus twice the padding |
| Handle radius | `--scrollbar-handle-radius` | every variant |
| Length | — | the bar runs the region's full edge; the handle's length is the viewport's share of the content |

## Properties
| Property | Options | Default |
|---|---|---|
| Orientation | vertical, horizontal | vertical |

Hover is driven by the pointer and never set on a static layout. Value (handle length and offset) comes from the scrolling region.

## Usage
- Let the scrolling region own the bar. It reports position; scroll, drag and keyboard wiring belong to the region that clips the content.
- Match Orientation to the overflow axis: vertical beside a scrolling list, horizontal under the Table's frozen columns.
- Don't restyle the handle to look like a control. It has no focus state, so anything that invites clicking promises more than it does.
- Don't rely on hover to reveal the bar. Touch screens never hover, so the resting handle must be visible on its own.

## Accessibility
- Assistive technology reaches scrolling through the region, not the bar: expose the scrolling region (focusable, with a name when it holds meaningful content) and keep the bar presentational.
- Keyboard scrolling and drag behaviour belong entirely to the implementation; the bar models no focus, pressed or dragging state.
- The resting handle is `--scrollbar-handle-background`, a deliberately quiet tone. Check it stays visible against every surface the region scrolls over.
- Hover is the only state change and colour its only signal.

## Claude Prompt
Give a scrolling list a Zebra scrollbar: a slim `--scrollbar-container-thickness` gutter along the right edge with `--scrollbar-container-padding` padding all round and an invisible track, holding a `--scrollbar-handle-thickness` wide pill-shaped (`--scrollbar-handle-radius`) mid-grey handle (`--scrollbar-handle-background`) whose length shows how much of the content is visible. On hover the gutter takes a faint grey tint (`--scrollbar-track-background-hover`) and the handle darkens (`--scrollbar-handle-background-hover`). Horizontal scrollbars lie along the bottom edge the same way.
