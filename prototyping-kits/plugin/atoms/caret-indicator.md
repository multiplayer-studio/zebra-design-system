---
name: Caret Indicator
level: atom
status: draft
composes: [../atoms/icon.md]
tokens:
  # icon
  caret-indicator-icon-foreground: '{colors.color-ink-high}'
  caret-indicator-icon-size-small: '{icon.icon-size-small}'
  caret-indicator-icon-size-medium: '{icon.icon-size-medium}'
  # motion
  caret-indicator-icon-transition: '{motion.motion-smooth}'
---

# Caret Indicator

> The shared disclosure caret: a single chevron that shows whether the row or header it trails is open or closed.

## Anatomy
1. Frame — hugs the glyph; no fill, padding, border or radius.
2. Glyph — an [Icon](../atoms/icon.md) holding `expand_more`, drawn in `--caret-indicator-icon-foreground` at `--caret-indicator-icon-size-small` or `--caret-indicator-icon-size-medium`. The component fixes the glyph; only its rotation changes.

Caret Indicator is not a control. The row, header or card that contains it is the target, and that parent drives Open.

## Variants
| Direction | Closed points | Open points | Used by |
|---|---|---|---|
| vertical (default) | down | up | Accordion, Card (collapsible header) |
| horizontal | right | down | Sub Menu Item |

Rotation is the only visual change between the four combinations; the colour and size hold.

## States
| State | Glyph | Notes |
|---|---|---|
| closed (Open off) | `expand_more`, turned to the Direction's closed position | default |
| open (Open on) | turned to the Direction's open position | set by the parent when it expands |

The glyph rotates to its new position over `--caret-indicator-icon-transition` when the parent opens or closes (one glyph that turns, never a swap between two); under `prefers-reduced-motion` it jumps with no rotation. Hover, pressed, focus and disabled belong to the parent; the glyph inherits the parent's foreground colour when the parent recolours it (e.g. disabled).

## Spacing & Sizing
| Size | Glyph | Used by |
|---|---|---|
| small (default) | `--caret-indicator-icon-size-small` | Sub Menu Item |
| medium | `--caret-indicator-icon-size-medium` | Accordion |

Square, no padding; the frame is exactly the glyph size. Measurements are provisional: Figma documents this component only through its parents, so sizes, rotations and the transition may change once it has its own specification.

## Properties
| Property | Options | Default |
|---|---|---|
| Open | on / off | off |
| Direction | vertical, horizontal | vertical |
| Size | small, medium | small |

## Usage
- Use the caret to show that a row or header expands; pair it with a title that says what is inside, because the caret says only that something opens.
- Pick vertical where the content opens below (accordion, collapsible card) and horizontal where the row opens a further level (sub menu).
- Keep Open in step with the parent's real expanded state; a caret that disagrees with the content is worse than none.
- Don't make the caret its own button. Where a separate control is needed (a selectable accordion row), use an [Icon Button](../atoms/icon-button.md) holding the chevron.

## Accessibility
- The caret is decorative: hide it from assistive tech. The parent exposes expanded and collapsed (`aria-expanded`) and owns focus.
- Rotation is the only sign of the open state, so the state must be exposed in markup, never left to the glyph.
- The glyph inherits the parent's foreground; contrast is a property of the surface it sits on.

## Claude Prompt
At the trailing end of an expandable row or header, draw a Zebra caret: a small `--caret-indicator-icon-size-small` near-black (`--caret-indicator-icon-foreground`) rounded chevron with no background. In accordions and collapsible cards it points down when closed and up when open (`--caret-indicator-icon-size-medium` there); in sub-menu rows it points right when closed and down when open. The chevron rotates smoothly between positions (`--caret-indicator-icon-transition`).
