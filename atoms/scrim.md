---
name: Scrim
level: atom
status: stable
composes: []
tokens:
  # barrier
  scrim-barrier-background-scrim: '{colors.color-fill-scrim}'
  scrim-barrier-background-modal: '{colors.color-fill-scrim}'
  scrim-barrier-radius: '{radius.radius-none}'
---

# Scrim

> The translucent barrier between a raised surface and the page behind it, drawn by Dialog, Lightbox, Bottom Sheet and Navigation Drawer.

## Anatomy
1. Barrier — the whole component: one rectangle stretched edge to edge over the owning surface's viewport, filled with `--scrim-barrier-background-scrim` (or `--scrim-barrier-background-modal`). No children, no stroke, no shadow, and `--scrim-barrier-radius` (no corners).

A scrim carries no content. Anything readable or interactive sits on the raised surface above it, never on the barrier.

## Variants
| Tone | Fill | When |
|---|---|---|
| scrim (default) | `--scrim-barrier-background-scrim` | every backdrop: the page behind stays visible but reads as unavailable |
| modal | `--scrim-barrier-background-modal` | reserved for a full takeover such as a first-run flow; today it draws the same wash as scrim |

Modal currently resolves to the same fill as scrim. It keeps its own token so a theme can make the takeover opaque without touching the everyday backdrop.

## States
| State | Trigger | What changes |
|---|---|---|
| shown | the owning component opens | the barrier appears with its owner |
| pressed | click or tap on the barrier | the owner closes, if the owner is dismissible; the scrim only forwards the event |
| hidden | the owner closes | the barrier leaves with its owner; nothing lingers |

The scrim has no motion of its own: it enters and leaves with its owner, and in code it is the owner's native backdrop. There is exactly one scrim per open surface, ordered by the top layer. Never add a second one to darken further; one `--scrim-barrier-background-scrim` is the system's whole dimming scale.

## Spacing & Sizing
| Property | Token | Notes |
|---|---|---|
| Size | — | fills the owner's viewport edge to edge; never a fixed size |
| Fill | `--scrim-barrier-background-scrim` / `--scrim-barrier-background-modal` | per Tone |
| Radius | `--scrim-barrier-radius` | no shape of its own |
| Elevation | — | none; the raised surface above carries the shadow |

## Properties
| Property | Options | Default |
|---|---|---|
| Tone | scrim, modal | scrim |

## Usage
- Let the owning component draw the scrim (Dialog, Lightbox, Bottom Sheet and Navigation Drawer already do), so there is one per open surface and it leaves with it. A product never opens a bare scrim.
- Dim with the scrim tone. Keep modal for a full takeover such as a first-run flow, not an everyday dialog; it draws the same 60% wash as scrim until a theme makes it opaque, so the page still shows through.
- Don't stack scrims or darken one with an opacity override.
- Don't put text or controls on the scrim. It makes no contrast promise against what is behind it, so nothing on it is reliably readable.

## Accessibility
- The scrim is decorative: never focusable and never named. The owning surface traps focus and makes the page behind inert.
- Clicking the scrim to dismiss always has a keyboard equivalent: Escape on the owner, which the owner handles.
- The scrim closes nothing by itself; the owner decides whether it is dismissible.
- Nothing that must stay readable may rely on showing through the barrier.
- `--scrim-barrier-background-scrim` follows the mode, so the barrier keeps its role in light, dark and AAA.

## Stitch Prompt
Behind any modal panel, cover the whole screen with a Zebra scrim: a flat, edge-to-edge near-black wash at about 60% opacity (`--scrim-barrier-background-scrim`) with no corners, border or shadow, so the page underneath is still visible but clearly dimmed and unavailable. The raised panel (dialog, sheet, drawer or lightbox) sits on top of it and carries its own shadow. Never place text or buttons on the scrim itself.
