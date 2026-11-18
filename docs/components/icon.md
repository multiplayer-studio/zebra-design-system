# Icon

> Wraps a single glyph from the icon library so it can be sized consistently and embedded in other components. Three sizes, plus an optional box that pads the glyph to a 40px touch target. Button, Icon Button, Dropdown, Search, Avatar, Top App Bar, Navigation Bar and Navigation Rail all embed it, and almost every one of them locks Size and Framed, leaving the glyph as the only decision. On its own it is decorative, the meaning has to come from somewhere else.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-icon>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `name` | slot | `verified` |  |  |
| `size` | enum | `small` | `xsmall` `small` `medium` `large` |  |
| `framed` | boolean | `false` |  |  |

## When and how to use

### Do

- Set the glyph deliberately every time. The component arrives holding Verified, which is the right answer for almost nothing.
- Turn Framed on only where the icon is tappable on its own. Inside a button or a menu row the parent already provides the target.

### Don't

- Don't override the glyph's colour on the instance. It inherits from the parent, and overriding it breaks every state the parent renders.
- Don't rely on an icon alone to carry meaning. It has no text of its own, so pair it with a visible label or give it an accessible name in code.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — | Icon has no interaction states of its own. It takes its colour from whatever embeds it, so hover, pressed, focus and disabled are all rendered by the parent. |

## Behaviour

- **Motion** — None modelled in Figma. Icon is a static graphic, and any transition belongs to the component that embeds it.
- **Colour** — Not set here. The glyph inherits the foreground token of its parent, which is why the same Icon reads light on a filled button and accent-coloured on an outline one.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Name | instance swap, icon library | Any glyph from the library the property points at, and the only content this component carries. |
| Glyph colour | inherited, not a property | The glyph follows the parent's foreground token. Recolour the parent rather than overriding the vector here, or the parent's states will stop working. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed per Size | 16px at small, 20px at medium, 28px at large, always square. |
| Framed box | Fixed | 40px square when Framed is true, bound to control/target-min, at every Size. The glyph keeps its own size and is centred inside. |
| Padding | None | Zero on every variant. With Framed off the frame hugs the glyph, with Framed on the space comes from centring inside the fixed box rather than from padding. |
| Fill and radius | None | The framed box has no fill and no corner radius, so Framed adds room and nothing visible. |
| Colour | Inherited | Not bound on this component. The glyph takes the foreground token of whatever embeds it. |

## Accessibility

- Icon carries no text. Anything it communicates has to be repeated in a visible label or an accessible name in code.
- Framed pads the glyph to control/target-min, the minimum tappable size. A bare 16px or 20px icon is not a target on its own.
- The glyph inherits its parent's foreground colour, so contrast is a property of the surface it lands on rather than of this component.
- There are no interaction states here. Focus and disabled treatments come from the embedding component.

---
*Generated from `specs/icon` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
