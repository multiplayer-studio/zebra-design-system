# Scrim

The translucent barrier between a raised surface and the page behind it. Dialog, Lightbox and Bottom Sheet draw it under their panels: it dims everything behind, keeps the page from being read as interactive, and catches the click that dismisses. It is one fill stretched edge to edge — overlay/scrim — with an opaque modal tone (overlay/modal) for a full takeover. It has no content, no shape and no motion of its own; the owning component carries all three.

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8221-400 (page "Scrim") · extracted 2026-11-10

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| tone | enum | scrim, modal | scrim | variant |

- **scrim**: The translucent barrier — overlay/scrim, the fill every backdrop in the system uses. Content behind stays visible but reads as unavailable.
- **modal**: The opaque takeover — overlay/modal, for the rare surface where the page behind must not show at all. It cannot serve as a see-through backdrop.

## Internal variations & content inputs

None.

## Anatomy

1. **barrier**: the whole component. One rectangle, fill bound to `overlay/scrim` (or `overlay/modal`), stretched over the owning surface's viewport. No children, no stroke, no radius, no shadow. Figma draws it at 640×400 (measured drawing surface only); in use it fills its parent.

## Variants

| tone | barrier.fill |
|---|---|
| scrim (base) | overlay/scrim |
| modal | overlay/modal |

## Subcomponents

None.

## Tokens & theming

- **Color:** `overlay/scrim`, `overlay/modal`
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark) and every brand extension.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| shown | An overlay component opens | Appears with its owner — the scrim defines no timing of its own; the owner’s entry carries it. |
| pressed | Click or tap on the scrim | Dismisses the owner when the owner is dismissible. The scrim only forwards the event; it decides nothing itself. |
| hidden | The owner closes | Leaves with the owner; nothing lingers. |

- **Ownership:** The scrim belongs to the component it sits under. Dialog, Lightbox and Bottom Sheet draw it as their native backdrop bound to overlay/scrim — it is never placed by hand over a page, and a product never opens a bare scrim.
- **Stacking:** One scrim per open surface, ordered by the native top layer. Never draw a second scrim to darken further: one overlay/scrim is the system’s entire dimming scale.
- **Dismissal:** A click on the scrim closes the owner only when the owner allows it (dismissible); Escape is the keyboard parity, handled by the owner. The scrim never closes anything on its own.
- **Motion:** None of its own. No motion token exists for a fade, and the owner’s entry carries the scrim with it — in code the backdrop simply appears with the dialog.

## Content & slots

A scrim carries nothing. Anything readable or interactive sits on the raised surface above it, never on the barrier itself.

## Usage

**Do**
- Let the owning component draw the scrim — Dialog, Lightbox and Bottom Sheet already do — so there is exactly one per open surface and it leaves when the surface does.
- Dim with the scrim tone. Reserve modal for a takeover where the page behind must not read at all — a first-run flow, not an everyday dialog.

**Don't**
- Don’t stack scrims or darken one with an opacity override. One overlay/scrim is the system’s entire dimming scale, in every mode and extension.
- Don’t put text or controls on the scrim. It makes no contrast promise against what is behind it, so nothing on it is reliably readable.

## Accessibility

- The scrim is decorative: never focusable, never named — the owning dialog traps focus and makes the page behind inert.
- Dismissing by clicking the scrim always has keyboard parity: Escape on the owner.
- The scrim makes no contrast promise for the content behind it; nothing that must stay readable may rely on showing through.
- overlay/scrim and overlay/modal are semantic tokens, so the barrier holds its role in light, dark and every brand extension.

## Layout & theming

| Property | Type | Description |
|---|---|---|
| Size | Fills parent | Edge to edge over the owning surface’s viewport — the native backdrop in code, stretch constraints in a layout. Never a fixed size; the 640×400 variants are drawing surfaces. |
| Fill | Theming | overlay/scrim for the translucent tone, overlay/modal for the opaque takeover. Both semantic; nothing hardcodes a colour. |
| Radius | None | radius/none — the scrim has no shape of its own. |
| Elevation | None | No shadow. The raised surface above carries the elevation; the scrim is what it is raised above. |

## Issues

- **warn:** Tone=scrim adds a paint opacity of 0.6 on top of `overlay/scrim`, which already has its own alpha. Figma draws a lighter dim than the token. Implement the token alone.
- **note:** `palette/fill/scrim`'s description says the alias is opaque, but it points to a translucent primitive. That stale text likely caused the extra opacity.
- **note:** The set description says Scrim has no code element. In code, Dialog, Lightbox and a modal Bottom Sheet render the Scrim component as their backdrop.
- **note:** The Default column marks scrim as the default, matching Figma.
- **note:** Motion is none by intent. The 640×400 size is a Figma drawing surface only.
