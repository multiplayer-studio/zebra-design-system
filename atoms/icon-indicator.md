---
name: Icon Indicator
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # colour
  icon-indicator-container-background: '{colors.color-ink-medium}'
  icon-indicator-icon-foreground: '{colors.color-ink-always-white}'
  icon-indicator-container-radius: '{radius.radius-pill}'
  # sizes
  icon-indicator-container-size-small: '{control.control-icon-sm}'
  icon-indicator-container-size-medium: '{control.control-icon-md}'
  icon-indicator-container-size-large: '{control.control-icon-lg}'
  icon-indicator-icon-size-small: '{icon.icon-size-xsmall}'
  icon-indicator-icon-size-medium: '{icon.icon-size-small}'
  icon-indicator-icon-size-large: '{primitives.scale-9}'
---

# Icon Indicator

> A small circular marker carrying a fixed clock glyph, sized to sit beside text or on its own.

## Anatomy
1. Surround — a circle (`--icon-indicator-container-radius`) filled `--icon-indicator-container-background`, sized by Size.
2. Glyph — an [Icon](../atoms/icon.md) fixed to `clock`, drawn in `--icon-indicator-icon-foreground` and perfectly centred. The component sets the glyph; nothing is passed in. This is a context override: the glyph is sized by the indicator (`--icon-indicator-icon-size-small` … `--icon-indicator-icon-size-large`), not by the Icon's own steps.
3. Inset — the ring of space around the glyph. It comes from the difference between the circle and the glyph, not from padding.

## Variants
| Size | Circle | Glyph | When |
|---|---|---|---|
| small (default) | `--icon-indicator-container-size-small` | `--icon-indicator-icon-size-small` | inline, beside running text |
| medium | `--icon-indicator-container-size-medium` | `--icon-indicator-icon-size-medium` | a row with more room around it |
| large | `--icon-indicator-container-size-large` | `--icon-indicator-icon-size-large` | a row of its own; lines up with the other badges at their largest |

Colour and glyph shape hold at every size; only the scale changes.

## States
| State | What changes |
|---|---|
| static | the only state; nothing answers hover, focus or press |

No transition is defined. The glyph never changes, so the component says exactly one thing (pending, time-based); a different meaning needs a different component.

## Spacing & Sizing
Always a circle, no padding. The glyph is centred and the inset is whatever the circle leaves around it. At small the glyph is `--icon-indicator-icon-size-small`, where detail starts to go; check it still reads on the target display.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | small, medium, large | small |

The glyph is not a property.

## Usage
- Match the size to the text it sits beside: small inline, large for a row of its own.
- Pair it with text that says what is pending. The glyph is fixed, so the indicator cannot name what it refers to.
- Don't expect to swap the glyph; it carries one meaning.
- Don't use it where a count matters; use [Notification Indicator](../atoms/notification-indicator.md).

## Accessibility
- There is no text. Name what it refers to in the surrounding structure, and hide the indicator from assistive tech, or give a standalone one `role="img"` with a label such as "Pending".
- One colour at one strength: where it sits on a tinted surface, check the circle still separates from what is behind it.
- Nothing here is focusable and nothing announces a change.

## Stitch Prompt
Beside a line of text, draw a Zebra icon indicator: a small dark grey (`--icon-indicator-container-background`) circle, `--icon-indicator-container-size-small` across, with a tiny white (`--icon-indicator-icon-foreground`) clock glyph centred inside it. Larger rows use the `--icon-indicator-container-size-medium` or `--icon-indicator-container-size-large` circle with the clock scaled to match.
