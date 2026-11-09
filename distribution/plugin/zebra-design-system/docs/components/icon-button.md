# Icon Button

> Triggers an action from a single glyph, with no text label. Square at every size, and it carries the same eleven flavours, three shapes and four states as Button so the two sit together consistently. Nothing on it is readable, so every instance needs an accessible name in code. When the action can carry a word, use Button instead.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-icon-button>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `flavour` | enum | `primary` | `primary` `positive` `negative` `subtle` `text` `outline-subtle` `outline` `gradient` `text-gradient` `contrast` `outline-contrast` |  |
| `size` | enum | `medium` | `small` `medium` `large` | Adopted in code 2026-11-07; the metadata still calls small the default — see issues. |
| `shape` | enum | `rounded` | `sharp` `rounded` `full` | Adopted in code 2026-11-07. |
| `state` | enum | `default` | `default` `hover` `pressed` `focus` | Documentation-only in Figma. In code these are interaction states the implementation drives, not a prop a consumer sets. |
| `disabled` | enum | `false` | `false` `true` | Modelled as a VARIANT axis in Figma, but boolean in nature; implement as a boolean prop. Disabled=true exists only with State=default — except outline-subtle, whose disabled variants are misnamed State=focus (see issues). |
| `label` | string | `null` |  |  |

## When and how to use

### Do

- Give every icon button an accessible name in code. Nothing on the control is readable, so without one it is announced only as a button.
- Use medium or large wherever the control will be tapped. Small is 36px, under the 40px minimum target the system sets for itself.

### Don't

- Don't leave the default More Horizontal glyph in place. It reads as an overflow menu and will be understood as one.
- Don't use an icon button where the action needs explaining. If it takes a word to be clear, Button carries one and this component cannot.

## States

| State | Trigger | What changes |
|---|---|---|
| default | Resting | Background, border and glyph sit on the default tokens of the chosen flavour. |
| hover | Pointer over the control | Filled flavours move their own background token one step. Outline flavours hold their border and shift a neutral background underneath instead. Text flavours raise a ghost scrim from fully transparent. The gradient flavours keep their gradient and slide it toward the end colour rather than swapping it (see Gradient transition). outline-contrast steps its border and raises the ghost scrim. Apart from text-gradient, the glyph colour does not change on any flavour. |
| pressed | Pointer held down | The same mechanism as hover carried one step further. The gradient flavours slide the other way, toward the start colour, rather than collapsing to a flat token (see Gradient transition). |
| focus | Keyboard focus | A focus ring is drawn outside the bounds, replacing the resting border rather than adding to it. Identical on all eleven flavours, and the only state that changes the control's outer footprint. |
| disabled | Disabled set to true | Background and glyph swap to the disabled tokens of their family. No flavour keeps its accent colour, so a disabled destructive button is indistinguishable from any other disabled one. |

## Behaviour

- **Motion** — Figma stores no timing. Every state change is colour-only, with no scale, shadow or elevation shift on any flavour, so a transition should read as a tint change rather than movement. The gradient flavours are the one exception to a plain tint: their gradient moves (see Gradient transition).
- **Gradient transition** — gradient and text-gradient keep their gradient through every state and move it rather than replace it. On hover the gradient slides until its end colour covers 100% of the fill (the glyph on text-gradient); on press it slides the other way until its start colour covers 100%. Leaving or releasing slides it back to the resting two-stop gradient. It must never jump from the gradient to a flat colour: a browser cannot interpolate between a gradient and a solid fill, so that swap shows as a flicker. The hover and pressed variants show where each slide ends, not a separate flat fill.
- **Focus ring** — The only change that alters the control's outer footprint, because the ring is drawn outside the bounds. Leave room around a button in a tight toolbar so the ring is not clipped.
- **Resize** — The control never resizes with its content. Both axes are fixed per Size, so swapping the glyph changes nothing about the footprint.
- **Outline contrast** — outline-contrast takes its border from interactive/inverse/border/* and its glyph from foreground/primary, so it follows the mode. Its states sit on interactive/ghost/background/*.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Icon glyph | instance swap on the nested Icon | The only content this component has. It arrives holding More Horizontal, which reads as an overflow menu, so leaving it unchanged will actively mislead. |
| Icon Size and Framed | exposed on the nested instance | Icon Button does not re-declare them, but the nested Icon stays exposed so both remain reachable in the properties panel. The button already pairs the glyph size to its own Size, and Framed would nest a 40px box inside an already-sized control. See the Icon Metadata frame for what Icon offers on its own terms. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed square per Size | control/sm at small, control/md at medium, control/lg at large. Both axes bind to the same token, so it is always square and never hugs its content. |
| Padding | Fixed | space/2xs on all four sides at every size. |
| Radius | Fixed per Shape | radius/none for sharp, radius/element-sm for rounded, radius/pill for full, which gives a circle. All three are token-bound, so match the container rather than overriding on the instance. |
| Border | Fixed per Flavour | 1px drawn inside on outline, outline-subtle and outline-contrast, none on the other eight at rest. Focus replaces it with a 2px ring drawn outside the bounds. |
| Glyph size | Fixed per Size | 16px at small, 20px at medium and large. Large reuses Icon's medium step, so the glyph does not grow between medium and large even though the button does. |
| Touch target | Fixed per Size | Small is 36px, under the 40px control/target-min the system defines. Medium meets it exactly and large exceeds it. |
| Colour | Theming | Every fill, border and glyph colour is bound to an interactive/* token for the flavour. Gradient draws from surface/gradient/*, text-gradient from foreground/gradient/*, contrast from interactive/inverse/*, outline-contrast from interactive/inverse/border/* and foreground/primary, and focus from border/focus. No variant hardcodes a colour. |

## Accessibility

- Nothing in this component is readable, so every instance needs an accessible name in code. The glyph is decorative on its own.
- Small is 36px square, below the 40px minimum target the system defines as control/target-min. Prefer medium or large wherever the control is tapped.
- Focus is drawn as a ring outside the control and is identical on every flavour, so it stays visible whatever the button sits on.
- Disabled is visual only, and with no label there is nothing on the control to explain why. Put the reason in a tooltip or adjacent text.
- Colour is the only thing separating a destructive icon button from a neutral one, so back a destructive action with a confirmation step.

---
*Generated from `specs/icon-button` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
