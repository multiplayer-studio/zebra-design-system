# Button

> Triggers an action from a text label, with optional icons on either side. Eleven flavours set how much weight the action carries, three sizes and three shapes fit it to the surface it sits on. The label is the only content a consumer writes, everything else is a variant choice. When an action has no text label, use Icon Button rather than hiding this one's label.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-button>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `flavour` | enum | `primary` | `primary` `positive` `negative` `subtle` `text` `outline-subtle` `outline` `gradient` `text-gradient` `contrast` `outline-contrast` |  |
| `size` | enum | `medium` | `small` `medium` `large` | Adopted in code 2026-11-07; the metadata still calls small the default — see issues. |
| `shape` | enum | `rounded` | `sharp` `rounded` `full` | Adopted in code 2026-11-07. |
| `state` | enum | `default` | `default` `hover` `pressed` `focus` | Documentation-only in Figma. In code these are interaction states the implementation drives, not a prop a consumer sets. |
| `disabled` | enum | `false` | `false` `true` | Modelled as a VARIANT axis in Figma, but boolean in nature; implement as a boolean prop. Only the combination State=default + Disabled=true exists, so there is no hover/pressed/focus treatment for a disabled button by design. |
| `label` | string | `Button` |  |  |
| `leadingIcon` | boolean | `false` |  |  |
| `trailingIcon` | boolean | `false` |  |  |

## When and how to use

### Do

- Use one primary per view or per group. Everything else steps down to outline, subtle or text so the single most important action stays findable.
- Write the label as the verb the user is about to perform, Save rather than OK, so the action still reads clearly on its own.

### Don't

- Don't build an icon-only button by hiding this one's label. Icon Button is a separate square component made for that, and it keeps the touch target correct.
- Don't mix Shape values inside one button group. A pill beside a rounded button reads as a mistake rather than a deliberate distinction.

## States

| State | Trigger | What changes |
|---|---|---|
| default | Resting | Background, border and label sit on the default tokens of the chosen flavour. |
| hover | Pointer over the control | Filled flavours move their own background token one step. Outline flavours hold their border and shift a neutral background underneath instead. Text flavours raise a ghost scrim from fully transparent. The gradient flavours keep their gradient and slide it toward the end colour rather than swapping it (see Gradient transition). outline-contrast steps its border and raises the ghost scrim. Apart from text-gradient, the label colour does not change on any flavour. |
| pressed | Pointer held down | The same mechanism as hover carried one step further. The gradient flavours slide the other way, toward the start colour, rather than collapsing to a flat token (see Gradient transition). |
| focus | Keyboard focus | A focus ring is drawn outside the bounds, replacing the resting border rather than adding to it. Identical on all eleven flavours, and the only state that changes the control's outer footprint. |
| disabled | Disabled set to true | Background and label swap to the disabled tokens of their family, and the icon follows the label. No flavour keeps its accent colour, so disabled buttons of different flavours look alike. |

## Behaviour

- **Motion** — Figma stores no timing. Every state change is colour-only, with no scale, shadow or elevation shift on any flavour, so a transition should read as a tint change rather than movement. The gradient flavours are the one exception to a plain tint: their gradient moves (see Gradient transition).
- **Gradient transition** — gradient and text-gradient keep their gradient through every state and move it rather than replace it. On hover the gradient slides until its end colour covers 100% of the fill (the label's own text on text-gradient); on press it slides the other way until its start colour covers 100%. Leaving or releasing slides it back to the resting two-stop gradient. It must never jump from the gradient to a flat colour: a browser cannot interpolate between a gradient and a solid fill, so that swap shows as a flicker. The hover and pressed variants show where each slide ends, not a separate flat fill.
- **Focus ring** — The only change that alters the control's outer footprint, because the ring is drawn outside the bounds. Leave room around a button in a tight row so the ring is not clipped.
- **Resize** — The control re-hugs its label whenever the text changes, so a label swapped at runtime shifts the position of everything beside it in a row.
- **Outline contrast** — outline-contrast takes its border from interactive/inverse/border/* and its label from foreground/primary, so it follows the mode. Its states sit on interactive/ghost/background/*.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | A verb phrase naming the action. The button hugs whatever length it is given, there is no truncation and no wrapping. |
| Leading Icon | boolean, toggles a nested Icon | Toggles visibility only. Button does not re-declare Icon's other properties, but the instance stays exposed, so Icon's glyph, Size and Framed are still reachable in the properties panel. See the Icon Metadata frame for what Icon itself offers, and leave its Size alone, Button pairs it to the label. |
| Trailing Icon | boolean, toggles a nested Icon | The same slot mechanics as Leading Icon, placed after the label instead. |
| Icon glyph | instance swap on the nested Icon | Any glyph from the icon library. Both slots arrive holding Verified, which suits almost no real action, so set it deliberately whenever a slot is turned on. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Hug | Always hugs the label and any visible icons, never fixed. Small grows by 16px for each icon shown, medium and large by 20px. |
| Height | Fixed per Size | control/sm at small, control/md at medium, control/lg at large. Not resizable independently of Size. |
| Horizontal padding | Fixed per Size | space/md at small and medium, space/lg at large. |
| Vertical padding | Fixed | space/2xs at every size. The fixed height does the real work. |
| Gap | None on the row | Item spacing is space/none. The visible separation between an icon and the label comes from the Label wrapper's own horizontal padding, space/2xs at small and space/sm at medium and large. |
| Radius | Fixed per Shape | radius/none for sharp, radius/element-sm for rounded, radius/pill for full. All three are token-bound, so match the container rather than overriding on the instance. |
| Border | Fixed per Flavour | 1px drawn inside on outline, outline-subtle and outline-contrast, none on the other eight at rest. Focus replaces it with a 2px ring drawn outside the bounds. |
| Icon size | Fixed per Size | 16px at small, 20px at medium and large. Large reuses Icon's medium step, so Icon's own large (28px) never appears inside a Button. |
| Label type | Fixed per Size | label/medium at small, label/large at medium and large. |
| Colour | Theming | Every fill, border and label colour is bound to an interactive/* token for the flavour. Gradient draws from surface/gradient/*, text-gradient from foreground/gradient/*, contrast from interactive/inverse/*, outline-contrast from interactive/inverse/border/* and foreground/primary, and focus from border/focus. No variant hardcodes a colour. |

## Accessibility

- Focus is drawn as a ring outside the control and is identical on every flavour, so it stays visible whatever the button sits on.
- Disabled is a visual state only. Figma cannot carry the reason an action is unavailable, so put that in nearby text in the implementation.
- The icon repeats the label rather than adding to it. An action with no visible label belongs in Icon Button, which still needs an accessible name in code.
- Every state change is colour-only, so anything signalled by hover or pressed alone will not reach a keyboard or screen reader user.
- Write labels as the verb the user is about to carry out, Save rather than OK, so the action is understandable when read out of context.

---
*Generated from `specs/button` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
