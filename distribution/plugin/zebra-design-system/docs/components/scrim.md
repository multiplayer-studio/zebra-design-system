# Scrim

> The translucent barrier between a raised surface and the page behind it. Dialog, Lightbox and Bottom Sheet draw it under their panels: it dims everything behind, keeps the page from being read as interactive, and catches the click that dismisses. It is one fill stretched edge to edge — overlay/scrim — with an opaque modal tone (overlay/modal) for a full takeover. It has no content, no shape and no motion of its own; the owning component carries all three.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-scrim>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `tone` | enum | `scrim` | `scrim` `modal` |  |

## When and how to use

### Do

- Let the owning component draw the scrim — Dialog, Lightbox and Bottom Sheet already do — so there is exactly one per open surface and it leaves when the surface does.
- Dim with the scrim tone. Reserve modal for a takeover where the page behind must not read at all — a first-run flow, not an everyday dialog.

### Don't

- Don’t stack scrims or darken one with an opacity override. One overlay/scrim is the system’s entire dimming scale, in every mode and extension.
- Don’t put text or controls on the scrim. It makes no contrast promise against what is behind it, so nothing on it is reliably readable.

## Accessibility

- The scrim is decorative: never focusable, never named — the owning dialog traps focus and makes the page behind inert.
- Dismissing by clicking the scrim always has keyboard parity: Escape on the owner.
- The scrim makes no contrast promise for the content behind it; nothing that must stay readable may rely on showing through.
- overlay/scrim and overlay/modal are semantic tokens, so the barrier holds its role in light, dark and every brand extension.

---
*Generated from `specs/scrim` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
