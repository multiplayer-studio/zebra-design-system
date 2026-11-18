---
name: Skeleton
level: atom
status: draft
composes: []
tokens:
  # colour
  skeleton-container-background: '{colors.color-fill-sunken}'
  skeleton-container-background-pulse: '{colors.color-fill-faint}'
  # shape
  skeleton-text-container-radius-rounded: '{radius.radius-xs}'
  skeleton-block-container-radius-rounded: '{radius.radius-element-sm}'
  skeleton-container-radius-sharp: '{radius.radius-none}'
  skeleton-circle-container-radius: '{radius.radius-pill}'
  # sizes
  skeleton-text-height: '{primitives.scale-6}'
  skeleton-text-gap: '{space.space-sm}'
  # motion (implementation)
  skeleton-container-duration: '{motion.motion-spin}'
  skeleton-container-easing: '{motion.easing-standard}'
---

# Skeleton

> A placeholder shape that stands in for content while it loads, drawn in the real layout so the screen doesn't jump when the content arrives.

## Anatomy
1. Shape — one filled box in `--skeleton-container-background` with no border, text or icon. Its Type decides its proportions and corners. While loading it pulses between `--skeleton-container-background` and `--skeleton-container-background-pulse`.
2. Group (text only) — several text lines stacked `--skeleton-text-gap` apart to stand in for a paragraph. The last line is shorter, so it reads as text.

A skeleton is always placed inside the real layout: in the card, row or table it stands in for, at that content's size.

## Variants
| Type | Stands in for | Size | Corners |
|---|---|---|---|
| text (default) | a line of text | `--skeleton-text-height` tall; width set by the placer | `--skeleton-text-container-radius-rounded` |
| block | an image, a chart, a card body, a control | set by the placer, to the content's size | `--skeleton-block-container-radius-rounded` |
| circle | an avatar or a round icon | a square set by the placer | `--skeleton-circle-container-radius` (a meaningful circle, round in every mode) |

Shape: rounded (default) uses the corners above; sharp uses `--skeleton-container-radius-sharp` on text and block, and the circle stays round. In the AAA modes text and block are always sharp (DESIGN.md §5).

## States
| State | What changes |
|---|---|
| loading | the fill pulses from `--skeleton-container-background` to `--skeleton-container-background-pulse` and back, every `--skeleton-container-duration`, eased `--skeleton-container-easing` (the period reuses the spin duration; to be confirmed) |
| reduced motion | the pulse stops; the shape holds `--skeleton-container-background` ([patterns 6.66](../patterns/06-accessibility.md)) |

When the content arrives it replaces the skeleton in place, with no transition of its own. The pulse is the only motion; there is no shimmer sweeping across.

## Spacing & Sizing
| Property | Token |
|---|---|
| Text line height | `--skeleton-text-height` |
| Between text lines | `--skeleton-text-gap` |
| Block and circle | the size of the content they stand in for |

Width is always set by whoever places the skeleton, to match the content. The text line height and gap are draft placeholders from the nearest existing steps; confirm them in Figma, including whether each type style needs its own line height.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | text, block, circle | text |
| Lines (text) | 1 to 4 | 1 |
| Shape | rounded, sharp | rounded |

## Usage
- Use a skeleton for a whole screen or a whole region loading for the first time; one action loading uses an indicator in its control ([patterns 4.16](../patterns/04-states-feedback.md)). Never show a skeleton and a spinner for the same scope.
- Show only what will actually appear, in the real layout. If the number of items is unknown, fill the visible area ([patterns 4.17](../patterns/04-states-feedback.md)).
- In a table, put skeleton rows under the real header ([patterns 10.28](../patterns/10-data-display.md)). Keep everything already known (titles, headers, labels) as real text.
- Under about a second, show nothing; a skeleton that flashes is worse than none ([patterns 4.13](../patterns/04-states-feedback.md)).
- If loading fails, replace the skeleton with the error state for that scope; don't leave it pulsing.

## Accessibility
- Skeleton shapes are hidden from assistive technology (`aria-hidden`). The region they fill is marked busy (`aria-busy="true"`) and one polite status message names what is loading ("Loading orders").
- Skeletons are never focusable.
- The pulse stops under reduced motion. It never flashes ([patterns 6.65](../patterns/06-accessibility.md)).

## Claude Prompt
Draw Zebra skeleton placeholders inside the real layout: light grey (`--skeleton-container-background`) rounded bars `--skeleton-text-height` tall for lines of text, stacked `--skeleton-text-gap` apart with the last line shorter; grey rounded rectangles (`--skeleton-block-container-radius-rounded`) where images or cards will be; grey circles where avatars will be. No text, icons or borders. They gently pulse lighter (`--skeleton-container-background-pulse`) and back.
