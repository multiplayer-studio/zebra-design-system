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
  tooltip-container-radius-rounded: '{radius.radius-sm}'
  tooltip-container-radius-sharp: '{radius.radius-none}'
  tooltip-container-shadow: '{shadow.shadow-medium}'
  # motion
  tooltip-container-transition: '{motion.motion-smooth}'
  # sizes
  tooltip-container-padding-y: '{space.space-2xs}'
  tooltip-container-padding-x: '{space.space-sm}'
  tooltip-label-font: '{typography.type-label-small}'
  tooltip-pointer-width: '{primitives.scale-5}'
  tooltip-pointer-height: '{primitives.scale-3}'
---

# Tooltip

> A short floating message that names what an adjacent control does, anchored to it by a pointer on one edge.

## Anatomy
1. Bubble — the component frame: a row that hugs the label on both axes, filled `--tooltip-container-background`, with the corner radius and the `--tooltip-container-shadow` shadow.
2. Label — one run of text in `--tooltip-label-font` `--tooltip-label-foreground`, centred inside the padding. Nothing else may sit beside it: there is no icon slot.
3. Pointer — a `--tooltip-pointer-width` × `--tooltip-pointer-height` triangle in `--tooltip-pointer-background`, drawn outside the bubble, centred on the edge facing the trigger. On the left and right edges it turns, so it is `--tooltip-pointer-height` wide and `--tooltip-pointer-width` tall.

## Variants
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

In code the tooltip fades in while sliding a short way toward its trigger (from the side away from the pointer) and fades out, both over `--tooltip-container-transition`. Under reduced motion it appears and disappears with no movement. Nothing times out or dismisses itself; showing, persistence and dismissal belong to the implementation.

## Spacing & Sizing
| Property | Token |
|---|---|
| Padding (V / H) | `--tooltip-container-padding-y` / `--tooltip-container-padding-x`, identical across all variants |
| Font | `--tooltip-label-font` |
| Height | one line of `--tooltip-label-font` plus twice `--tooltip-container-padding-y` |
| Width | hugs the label |
| Pointer | `--tooltip-pointer-width` × `--tooltip-pointer-height`, absolutely positioned outside the bubble, so the bubble never clips it |
| Shadow | `--tooltip-container-shadow`, on every variant and mode |

Point names the intended side; actual anchoring against a real trigger is done wherever the tooltip is placed. No wrapping is authored, so a long label is a layout problem before it is a reading problem.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text, a short action phrase | — |
| Point | bottom, top, left, right | bottom |
| Shape | rounded, sharp | rounded |

## Usage
- Write the label as a short action phrase that names the control. If it needs a sentence, the information belongs in the interface.
- Pick Point from where the trigger actually sits; the pointer is the only thing tying the bubble to its control.
- Show it on hover and on keyboard focus of the trigger, and on long-press for touch.
- Don't mix rounded and sharp on one screen; follow the surrounding controls.
- Don't rely on a tooltip as the only description of a control, and never put interactive content in one.
- For a status that stays on screen, use [Status Label](../atoms/status-label.md).

## Accessibility
- The trigger needs its own accessible name; the tooltip supplements it (link it with `aria-describedby`, and give the bubble `role="tooltip"`).
- The keyboard path is built in code: the tooltip must appear when the trigger receives focus, and Escape must dismiss it.
- Anyone who never hovers never sees a hover-only tooltip, so essential information can't live only here.
- Check `--tooltip-label-foreground` on `--tooltip-container-background` against the surface it floats over; the shadow helps it separate.
- Under reduced motion, show and hide without the slide.

## Claude Prompt
Draw a Zebra tooltip: a small near-black (`--tooltip-container-background`) bubble with `--tooltip-container-radius-rounded` corners, `--tooltip-container-padding-x` horizontal and `--tooltip-container-padding-y` vertical padding, holding a short phrase in white `--tooltip-label-font` text (`--tooltip-label-foreground`) and casting a soft `--tooltip-container-shadow` drop shadow. A tiny `--tooltip-pointer-width` × `--tooltip-pointer-height` triangle of the same colour sticks out of the centre of the bottom edge (or top, left or right) pointing at the control it describes. Sharp tooltips have square corners and a sharp tip.
