---
name: Divider
level: atom
status: stable
composes: []
tokens:
  # line
  divider-line-color: '{colors.color-line-default}'
  divider-line-thickness: '{stroke.stroke-thin}'
  divider-line-radius: '{radius.radius-none}'
---

# Divider

> A thin, static line that separates stacked or side-by-side content into groups.

## Anatomy
1. Line — the only visible part: a `--divider-line-thickness` stroke in `--divider-line-color`, with `--divider-line-radius` (hard) ends. It runs horizontally or vertically depending on Orientation.
2. Length — not fixed. The line stretches to fill the width (horizontal) or height (vertical) of its container; the drawn 320 × 1 or 1 × 40 is only a starting size.

Divider has no content and no slots: no text, icon or nested element.

## Variants
| Orientation | Line | Fills | Separates |
|---|---|---|---|
| horizontal (default) | `--divider-line-thickness` tall | the container's width | stacked content: list rows, sections on a page |
| vertical | `--divider-line-thickness` wide | the container's height | side-by-side content: items in a row, toolbar groups |

Both orientations use the same colour, thickness and radius; only the axis changes.

## States
| State | Line | Notes |
|---|---|---|
| static | `--divider-line-color` | the only state; orientation is fixed at placement and never changes at runtime |

Divider has no motion. It does not animate, and it never transitions between orientations.

## Spacing & Sizing
| Property | Token | Notes |
|---|---|---|
| Thickness | `--divider-line-thickness` | same for both orientations |
| Length | — | fills the container along its axis |
| Radius | `--divider-line-radius` | hard edges on both orientations |
| Colour | `--divider-line-color` | resolves per mode, so it stays visible in light, dark and AAA |

The line has no padding or margin of its own. The space either side of it comes from the layout gap of its container.

## Properties
| Property | Options | Default |
|---|---|---|
| Orientation | horizontal, vertical | horizontal |

## Usage
- Choose the orientation from the layout direction: horizontal between stacked content, vertical between side-by-side content.
- Let the line fill its container instead of leaving it at the default drawn size.
- Don't use Divider for spacing. It is a line with no padding; use the layout gap to space elements.
- Don't recolour a divider on an instance; `--divider-line-color` already follows the theme.

## Accessibility
- Divider is non-interactive and never focusable.
- In code, expose it with the separator role (`<hr>`, or `role="separator"`), and add `aria-orientation="vertical"` to the vertical variant so assistive tech announces it correctly. A purely decorative line inside a component that already groups its content can be hidden from assistive tech instead.
- `--divider-line-color` is a low-contrast neutral by design. Never rely on a divider alone to show that two things are separate; spacing and headings carry the grouping.

## Claude Prompt
Separate content with a Zebra divider: a hairline `--divider-line-thickness` light grey line (`--divider-line-color`) with square ends (`--divider-line-radius`). A horizontal divider runs the full width of its container between stacked rows or sections; a vertical divider runs the full height of a row between side-by-side items or toolbar groups. It has no padding of its own; the surrounding layout gap spaces it.
