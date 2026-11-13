---
name: Tag
level: atom
status: draft
composes: []
tokens:
  # colour
  tag-container-background: '{colors.color-fill-sunken}'
  tag-label-foreground: '{colors.color-ink-high}'
  # shape
  tag-container-radius-rounded: '{radius.radius-sm}'
  tag-container-radius-sharp: '{radius.radius-none}'
  # sizes
  tag-container-height: '{primitives.scale-11}'
  tag-point-width: '{primitives.scale-6}'
  tag-label-padding-y: '{space.space-2xs}'
  tag-label-padding-x: '{space.space-sm}'
  tag-label-font: '{typography.type-body-medium}'
---

# Tag

> Tags draw attention to a specific area or piece of information. The arrow shape directs the user's attention to the place it points at.

## Anatomy
1. Text block — a filled rectangle (`--tag-container-background`) holding the label in `--tag-label-font` `--tag-label-foreground`.
2. Point — a `--tag-point-width` × `--tag-container-height` arrowhead in the same fill, attached to one end.

## Variants
| Direction | Layout |
|---|---|
| right (default) | text then point → arrow points right |
| left | point then text → arrow points left |

| Shape | Text block corners | Arrow tip |
|---|---|---|
| rounded (default) | `--tag-container-radius-rounded` on the two corners away from the point | softly rounded tip |
| sharp | `--tag-container-radius-sharp` | sharp tip |

In the AAA modes the component is always sharp (DESIGN.md §5).

## States
Static and non-interactive: no hover, pressed, focus or disabled state, and no motion.

## Spacing & Sizing
| Property | Token |
|---|---|
| Fill (text + point) | `--tag-container-background` |
| Text padding (V / H) | `--tag-label-padding-y` / `--tag-label-padding-x` |
| Total height | the line box of `--tag-label-font` plus twice `--tag-label-padding-y` = `--tag-container-height` |
| Point | `--tag-point-width` × `--tag-container-height` |
| Label | `--tag-label-font`, `--tag-label-foreground` |

Width hugs the label. Measurements are provisional: there is no Figma source yet.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | none |
| Direction | left, right | right |
| Rounded | on / off | on |

## Usage
- Use to point at, or call out, an adjacent area or piece of information; keep the text short.
- Point the arrow at the thing it describes, and keep the tag next to it.
- Not interactive; don't use it as a filter (use a [Filter Chip](../atoms/filter-chip.md)) or as a status (use a [Label](../atoms/label.md)).

## Accessibility
- Always give the tag a text label; it is announced to assistive technology as a note (`role="note"`), so the text must make sense on its own.
- The arrow direction is visual only. If the relationship matters, say what the tag refers to in the text or link it with `aria-describedby`.
- `--tag-label-foreground` on `--tag-container-background` is a high-contrast pair in every mode.
- The tag takes no focus and has no interactive states.

## Stitch Prompt
Draw a tag: a `--tag-container-height`-tall light grey (`--tag-container-background`) label shaped like a luggage tag or arrow — a rectangle with `--tag-label-padding-x` side padding and `--tag-label-font` near-black `--tag-label-foreground` text, ending in a `--tag-point-width`-deep triangular point on the right (or left). With the rounded style the far corners have a `--tag-container-radius-rounded` radius and the arrow tip is gently rounded; the sharp style has square corners and a pointed tip.
