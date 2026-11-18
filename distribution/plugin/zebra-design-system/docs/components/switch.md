# Switch

> A single on or off toggle, a track with a thumb slider that switches between its two ends. Two independent icon slots sit at either end of the track, which can be removed as a pair. Focus adds a border rather than changing the track or thumb colour.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-switch>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `state` | enum | `enabled` | `disabled` `enabled` `focus` |  |
| `switch` | enum | `off` | `on` `off` |  |
| `hasIcons` | boolean | `true` |  |  |

## When and how to use

### Do

- Keep the two icon slots paired to communicate the current state, the way this file's Microphone example does, rather than using unrelated glyphs on each side.
- Turn hasIcons off for a plain track and thumb switch with no icon content at either end.

### Don't

- Don't expect the thumb to change colour between on and off, only the track does. Rely on the track colour and the thumb's position together to show state.
- Don't expect this component's own focus border to extend past its bounds, it is drawn inside the 64x32 footprint rather than around it.

## States

| State | Trigger | What changes |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |

## Behaviour

- [object Object]

## Content

| Part | Kind | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Accessibility

- The switch has the role of switch and tells assistive technology whether it is on or off. Screen readers announce it as “[label], switch, on” or “off”.
- Space toggles the switch. Enter may also toggle it. Tab moves focus to and from the switch.
- The focus ring is clearly visible on keyboard focus against both the on and off track colours.
- The switch’s state is shown by the thumb’s position as well as by colour, so it does not depend on colour alone.
- A disabled switch can’t be toggled, but it stays readable, and the reason it’s disabled is explained nearby when it isn’t obvious.
- With reduced motion turned on, the state changes instantly. The colour change remains, because it shows the switch’s state.

---
*Generated from `specs/switch` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
