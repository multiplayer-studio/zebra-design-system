# Stepper Input

> A numeric value with a button on either side to decrease or increase it. The value itself is fixed text rather than a property, the two buttons are locked step controls with no properties of their own reachable from here, and an optional line of hint text can sit below the whole control.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-stepper-input>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `size` | enum | `medium` | `medium` `large` |  |
| `rounded` | enum | `false` | `false` `true` |  |
| `disabled` | enum | `false` | `false` `true` |  |
| `showHint` | boolean | `false` |  |  |

## When and how to use

### Do

- Reach for Large on a touch surface where the buttons need to be easy to hit without precision.
- Turn Hint on to explain a constraint on the value, such as a minimum or a maximum.

### Don't

- Don't expect Hint to show anything while Disabled is on, there is no hint text node to toggle on a disabled instance.
- Don't expect the error version of the hint text from this component, every instance uses the hint message, the error one is never placed.

## Behaviour

- **Motion** — No transition is defined for the hint text appearing or disappearing, or for Disabled or Rounded changing.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Value | Static text, not a property | A plain number on the layer itself, not exposed as a text property. Changing it means editing the layer directly rather than through this component’s properties panel. |
| Remove button | Fixed Icon Button, Remove glyph | Locked to outline-subtle at rest, switching to primary when Disabled is on. None of Icon Button’s own properties are reachable from here. |
| Add button | Fixed Icon Button, Add glyph | The same fixed treatment as Remove, on the opposite side of the value. |
| Hint text | Fixed instance, hint message only | Shown or hidden as a whole by Hint, and only present at all when Disabled is off. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Fixed per Size | 168px at medium, 184px at large. Grows by exactly the amount the two buttons grow, the value area stays the same width. |
| Height | Fixed per Size, hug for Hint | 40px at medium, 48px at large, plus 24px and an 8px gap when Hint is on. |
| Gap | Fixed | 8px between the step control and the hint text when both are present. |
| Value width | Fixed | 72px at both sizes, with 12px padding on the left and the top only. |
| Value type | Fixed | 16px IBM Plex Sans Regular, 24px line height. Unchanged between medium and large. |
| Button radius | Fixed per Rounded | 0 square for false, 4px for true. Set on the two step buttons only, not on the control’s outer edge. |

## Accessibility

- Nothing in this file marks the value as a live region or states how it is announced when it changes. Whether screen readers hear the new value, and how the two buttons are labelled, needs confirming outside Figma.

---
*Generated from `specs/stepper-input` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
