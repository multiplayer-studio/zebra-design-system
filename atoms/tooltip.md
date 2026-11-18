---
name: Tooltip
level: atom
status: stable
composes: []
tokens:
  # colour
  tooltip-container-background: '{colors.color-fill-inverse}'
  tooltip-pointer-background: '{colors.color-fill-inverse}'
  tooltip-label-foreground: '{colors.color-ink-inverse}'
  # shape and elevation
  tooltip-container-radius-rounded: '{radius.radius-element-md}'
  tooltip-container-radius-sharp: '{radius.radius-none}'
  tooltip-container-shadow: '{shadow.shadow-medium}'
  tooltip-container-border-width: '{stroke.stroke-thin}'
  tooltip-container-border-color: '{colors.color-fill-transparent}'
  # motion (exits are quicker than entrances)
  tooltip-container-enter-duration: '{motion.motion-fast}'
  tooltip-container-enter-easing: '{motion.easing-out}'
  tooltip-container-exit-duration: '{motion.motion-instant}'
  tooltip-container-exit-easing: '{motion.easing-in}'
  # sizes
  tooltip-container-padding-y: '{space.space-2xs}'
  tooltip-container-padding-x: '{space.space-sm}'
  tooltip-label-font: '{typography.type-label-small}'
  tooltip-pointer-width: '{primitives.scale-5}'
  tooltip-pointer-height: '{primitives.scale-3}'
---

# Tooltip

> A short floating message about an adjacent control, anchored to it by a pointer on one edge: either the control's name, or one sentence that adds what its label doesn't.

## Anatomy
1. Bubble — the component frame: a row that hugs the label on both axes, filled `--tooltip-container-background`, with the corner radius, the `--tooltip-container-shadow` shadow and a `--tooltip-container-border-width` `--tooltip-container-border-color` (transparent) border, so its edge survives forced-colour mode where the shadow vanishes ([patterns 6.10](../patterns/06-accessibility.md)).
2. Label — one run of text in `--tooltip-label-font` `--tooltip-label-foreground`, centred inside the padding. It wraps rather than truncating. Nothing else may sit beside it: there is no icon slot.
3. Pointer — a `--tooltip-pointer-width` × `--tooltip-pointer-height` triangle in `--tooltip-pointer-background`, drawn outside the bubble, centred on the edge facing the trigger. On the left and right edges it turns, so it is `--tooltip-pointer-height` wide and `--tooltip-pointer-width` tall.

## Variants
| Kind | Holds | Example |
|---|---|---|
| name (default) | the name of an icon-only control, the label it doesn't show; no full stop | "Delete printer" |
| description | one short sentence that adds something the label doesn't, never repeating it; ends with a full stop | "Prints a test page from the selected printer." |

Both kinds follow [patterns 7.100](../patterns/07-content-copy.md): never anything essential, never the only place a control's meaning lives.

| Point | Pointer on | Bubble sits | When |
|---|---|---|---|
| bottom (default) | the bottom edge, pointing down | above the trigger | wherever there is clear space above |
| top | the top edge, pointing up | below the trigger | the trigger is near the top of its container |
| left | the left edge, pointing left | right of the trigger | a vertical list or rail, where above or below would cover neighbours |
| right | the right edge, pointing right | left of the trigger | a control against the right edge of its container |

| Shape | Corners | Pointer tip |
|---|---|---|
| rounded (default) | `--tooltip-container-radius-rounded` | slightly rounded, stopping just short of the point |
| sharp | `--tooltip-container-radius-sharp` | sharp |

In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | What changes |
|---|---|
| static | all eight variants render the same way; there is no hover, focus, pressed or disabled state |
| shown / hidden | owned by the trigger, not the tooltip |

In code the tooltip fades in while sliding a short way toward its trigger (from the side away from the pointer) over `--tooltip-container-enter-duration` with `--tooltip-container-enter-easing`, and fades out over the shorter `--tooltip-container-exit-duration` with `--tooltip-container-exit-easing`. Under reduced motion the slide goes and the fade stays ([patterns 6.66](../patterns/06-accessibility.md)). Nothing times out: it stays while the trigger is hovered or focused, while the pointer is over the bubble itself, and until Escape dismisses it ([patterns 3.107](../patterns/03-controls-interaction.md)).

## Spacing & Sizing
| Property | Token |
|---|---|
| Padding (V / H) | `--tooltip-container-padding-y` / `--tooltip-container-padding-x`, identical across all variants |
| Font | `--tooltip-label-font` |
| Height | the label's lines of `--tooltip-label-font` plus twice `--tooltip-container-padding-y` |
| Width | hugs the label, up to the space available; a longer label wraps |
| Pointer | `--tooltip-pointer-width` × `--tooltip-pointer-height`, absolutely positioned outside the bubble, so the bubble never clips it |
| Shadow | `--tooltip-container-shadow`, on every variant and mode |

Point names the intended side; actual anchoring against a real trigger is done wherever the tooltip is placed.

## Properties
| Property | Options | Default |
|---|---|---|
| Kind | name, description | name |
| Label | text: the control's name, or one short sentence | — |
| Point | bottom, top, left, right | bottom |
| Shape | rounded, sharp | rounded |

## Usage
- A name tooltip names an icon-only control ([patterns 3.7](../patterns/03-controls-interaction.md)). A description tooltip is one short sentence that adds what the label doesn't; if it needs more, the information belongs in the interface ([patterns 7.100](../patterns/07-content-copy.md)).
- Pick Point from where the trigger actually sits; the pointer is the only thing tying the bubble to its control.
- Show it on hover and on keyboard focus of the trigger. On touch, a long press on an icon-only control shows its name ([patterns 3.101](../patterns/03-controls-interaction.md)).
- The reason an unavailable control can't be used goes beside the control in text, not only in a tooltip ([patterns 3.10](../patterns/03-controls-interaction.md)).
- Don't mix rounded and sharp on one screen; follow the surrounding controls.
- Don't rely on a tooltip as the only description of a control, and never put interactive content in one.
- For a status that stays on screen, use [Status Label](../atoms/status-label.md).

## Accessibility
- The trigger needs its own accessible name; the tooltip supplements it (link it with `aria-describedby`, and give the bubble `role="tooltip"`).
- The keyboard path is built in code: the tooltip appears when the trigger receives focus, Escape dismisses it without moving focus, and the pointer can move onto the bubble without it closing ([patterns 3.107](../patterns/03-controls-interaction.md), [6.98](../patterns/06-accessibility.md)).
- Anyone who never hovers never sees a hover-only tooltip, so essential information can't live only here ([patterns 3.106](../patterns/03-controls-interaction.md)).
- `--tooltip-label-foreground` on `--tooltip-container-background` meets the text floor ([patterns 6.1](../patterns/06-accessibility.md)); the shadow and transparent border separate it from the surface.

## Claude Prompt
Draw a Zebra tooltip: a small near-black (`--tooltip-container-background`) bubble with `--tooltip-container-radius-rounded` corners, `--tooltip-container-padding-x` horizontal and `--tooltip-container-padding-y` vertical padding, holding a short phrase in white `--tooltip-label-font` text (`--tooltip-label-foreground`) and casting a soft `--tooltip-container-shadow` drop shadow. A tiny `--tooltip-pointer-width` × `--tooltip-pointer-height` triangle of the same colour sticks out of the centre of the bottom edge (or top, left or right) pointing at the control it describes. Sharp tooltips have square corners and a sharp tip.
