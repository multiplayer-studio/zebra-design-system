# Scrollbar

> The scroll indicator for a region that clips its content. A padded gutter holds a pill handle whose position and length mirror the scroll offset; hovering raises a track scrim so the grab target reads. Two orientations draw the same bar on either axis, and the scrolling region, not the bar, owns the behaviour.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-scrollbar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `orientation` | enum | `vertical` | `vertical` `horizontal` |  |
| `state` | enum | `default` | `default` `hover` | Documentation-only in Figma; hover is a CSS state in code. |

## When and how to use

### Do

- Let the scrolling region own it. The bar reports position; wiring scroll, drag and keyboard belongs to the region that clips the content.
- Match Orientation to the overflow axis — vertical beside a scrolling list, horizontal under the Table's frozen columns.

### Don't

- Don't restyle the handle to look like a control. It has no focus state, so anything that invites clicking promises more than the set models.
- Don't rely on hover to reveal the bar. A touch screen never hovers, so the resting handle has to be visible on its own.

## States

| State | Trigger | What changes |
|---|---|---|
| default | Resting | The handle draws in foreground/disabled over an invisible track. Only the colours are modelled; the handle's position and length come from the scrolling region. |
| hover | Pointer over the gutter | The track raises interactive/ghost/background/hover and the handle moves to foreground/secondary. No pressed or dragging treatment exists. |

## Behaviour

- **Motion** — Figma stores no timing and no transition is authored. Whether the bar fades in with scroll activity and out when it stops belongs to the implementation.
- **Value** — The handle's length is the viewport's share of the content and its offset mirrors the scroll position. The set draws one sample; nothing in it encodes a value.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Handle | fixed part | Not a slot. A pill that takes its length from the value and its colour from the state; there is no property to restyle or hide it per instance. |
| Track | fixed part | Not a slot. The full-length gutter behind the handle, invisible at rest and scrimmed on hover. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Thickness | Fixed | The gutter is 12 and the handle 4 as drawn, with neither bound to a token. The length runs the scrolling region's full edge. |
| Padding | Fixed | space/2xs on all four sides, which is what centres the handle in the gutter and keeps it clear of the content edge. |
| Radius | Fixed | radius/pill on the handle in every variant. The track has no radius of its own. |
| Handle length | Value | Drawn at a sample 64. In use the length is the viewport's share of the content and is never a property. |
| Fill | Theming | The handle is foreground/disabled at rest and foreground/secondary on hover. The track is interactive/ghost/background/default, rising to the hover token under the pointer. |
| Orientation | Per Orientation | vertical and horizontal swap the axes and nothing else: the same padding, colours and radius on both. |

## Accessibility

- The set models no focus, pressed or dragging state, so keyboard scrolling and drag behaviour belong entirely to the implementation.
- The resting handle is foreground/disabled on the page surface. Check it stays visible against the surfaces the region scrolls over.
- Assistive technology reaches scrolling through the region, not the bar: expose the region and keep the bar presentational.
- Hover is the only state change and colour its only signal, so nothing here reaches someone who cannot see the bar move.

---
*Generated from `specs/scrollbar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
