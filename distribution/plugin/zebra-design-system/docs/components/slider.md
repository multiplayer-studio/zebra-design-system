# Slider

> A control for choosing a value along a range by dragging a thumb. State, Stepped and Range are the slider's own properties, and the track, the step indicators and the thumb all take their appearance from them rather than being set individually. Stepped marks the valid stops, and Range adds a second thumb so a span can be chosen instead of a single value.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-slider>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `state` | enum | `default` | `default` `hover` `selected` `disabled` |  |
| `stepped` | boolean | `true` |  |  |
| `range` | boolean | `false` |  |  |

## When and how to use

### Do

- Reach for it where the range matters more than the exact figure. A value that has to be precise is quicker to type than to drag.
- Turn steps on whenever only certain values are valid, so the dots say where the thumb can land.

### Don't

- Don't set state on the track or the thumb separately. State is the slider's, and the parts follow it.
- Don't use Shape to carry meaning. It matches the controls around the slider and says nothing about the value.

## States

| State | Trigger | What changes |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Behaviour

- [object Object]
- [object Object]

## Content

| Part | Kind | Guidance |
|---|---|---|
|  |  |  |
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
|  |  |  |

## Accessibility

- The value is carried by position and fill alone. It has to be exposed as a number together with its minimum and maximum.
- Keyboard focus shows the selected colour on the fill and both thumbs, and the focused thumb also takes a ring, so in range mode it is clear which end the keys will move.
- Hover is answered by the hovered thumb growing while the track holds. Anyone not using a pointer gets no size change; the focus ring stands in for it.
- The step dots use foreground/inverse across the whole track, so their contrast differs either side of the value.
- In range mode two thumbs share one track. Each needs its own name and its own value, or the pair reads as a single control.
- Disabled is carried by colour on both the track and the thumb, with no change of size or shape to back it up.

---
*Generated from `specs/slider` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
