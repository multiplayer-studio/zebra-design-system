---
name: Tag
level: atom
status: stable
composes: []
tokens:
  tag-container-height: '{dimensions.dim-tag-height}'
  tag-container-background: '{colors.main-light}'
  tag-container-radius-rounded: '{rounded.radius-minimal}'
  tag-point-width: '{dimensions.dim-tag-point-width}'
  tag-label-padding-y: '{spacing.spacing-minimum}'
  tag-label-padding-x: '{spacing.spacing-small}'
  tag-label-line-height: '{spacing.spacing-2xl}'
  tag-label-font: '{typography.body-medium}'
  tag-label-foreground: '{colors.main-default}'
---

# Tag

> Tags are used to draw attention to a specific area or information. The arrow shape helps direct the users attention to the desired place.

## Anatomy
1. Text block — grey rectangle with the label; announced to assistive technology as a note.
2. Point — `--tag-point-width` × `--tag-container-height` arrowhead in the same grey, attached to one end.

## Variants
| Direction | Layout |
|---|---|
| right (default) | text then point → arrow points right |
| left | point then text → arrow points left |

| Shape | Text block corners | Arrow tip |
|---|---|---|
| rounded (default) | `--tag-container-radius-rounded` on the two corners away from the point | softly rounded tip |
| sharp | square | sharp tip |

## States
Static, non-interactive.

## Spacing & Sizing
| Property | Token |
|---|---|
| Fill (text + point) | `--tag-container-background` |
| Text padding (v / h) | `--tag-label-padding-y` / `--tag-label-padding-x` |
| Text line box | `--tag-label-line-height` |
| Total height | `--tag-label-line-height` + twice `--tag-label-padding-y` = `--tag-container-height` |
| Point | `--tag-point-width` × `--tag-container-height` |
| Font | `--tag-label-font`, `--tag-label-foreground` |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | none |
| Direction | left, right | right |
| Rounded | on / off | on |

## Usage
- Use to point at, or call out, an adjacent area or piece of information; keep text short.
- Always give the tag a text label so screen readers get the note text.
- Not interactive; don't use as a filter (use a [filter chip](../atoms/filter-chip.md)).

## Stitch Prompt
Draw a tag: a `--tag-container-height`-tall `--tag-container-background` label shaped like a luggage tag/arrow — a rectangle with `--tag-label-padding-x` side padding and `--tag-label-font` `--tag-label-foreground` text, ending in a `--tag-point-width`-deep triangular point on the right (or left). With the rounded style the far corners have a `--tag-container-radius-rounded` radius and the arrow tip is gently rounded; the sharp style has square corners and a pointed tip.
