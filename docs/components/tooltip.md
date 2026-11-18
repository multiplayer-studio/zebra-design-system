# Tooltip

> A short floating message that names what an adjacent control does. Point decides which edge the arrow sits on, which is how the bubble anchors to its trigger from any of four sides. It holds one run of text and nothing else, so for status that stays on screen and sits inline, reach for Status Label instead.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-tooltip>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `label` | string | `Label` |  |  |
| `point` | enum | `bottom` | `bottom` `top` `left` `right` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |

## When and how to use

### Do

- Write the label as a short action phrase. A tooltip earns its place by naming the control, not by describing it.
- Pick Point from where the trigger actually sits. The arrow is the only thing tying the bubble to its control, so the wrong edge breaks the connection.

### Don't

- Don't mix rounded and sharp across one screen. The contour belongs to the surface the tooltip opens over, not to the individual hint.
- Don't rely on it as the only description of a control. It carries no focus state, so anyone who never hovers never gets the message.

## Behaviour

- **Motion** — Code only: fades in while sliding toward its trigger (from the side away from the tip), and fades out, on animations/smooth. No motion under reduced motion.
- **Placement** — Point names the edge the arrow sits on, but nothing in the set positions the bubble against a real trigger. Choosing a variant states the intended side, and the actual anchoring has to be done wherever the tooltip is placed.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | The only content the set exposes, and plain text at that. There is no instance-swap slot anywhere in the component, so an icon cannot be placed beside the text or in place of it without detaching the instance. |
| Pointer | fixed part | Not a slot. Which edge it sits on and which tip it takes both follow the variant, and there is no property to hide it or move it from an instance. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Hug both axes | The bubble hugs its label on both axes, so the width follows the text. At the default Label it measures 46 by 24, and the height holds at 24 because one 16px line sits inside 4px of vertical padding. |
| Padding | Fixed | space/xxs top and bottom, space/sm left and right. Identical across all eight variants. |
| Radius | Per Shape | radius/sm on rounded and radius/none on sharp, bound on all four corners. Both are tokens, so the value follows the theme and only the choice between them is made per instance. |
| Pointer | Fixed, absolute | Absolutely positioned, centred on its edge and drawn outside the bubble, which is why the component does not clip its contents. 8 by 4 on top and bottom, 4 by 8 on left and right. The rounded tips measure 3.586 on the pointing axis rather than 4, because the curve stops short of the point the sharp triangle reaches. |
| Fill | Theming | surface/inverse on the bubble and on the pointer, so the two read as one shape. The label is foreground/inverse. |
| Type | Theming | label/small, which is IBM Plex Sans Medium at 12 over a 16px line. Bound to the label/small typography variables as well as the text style, so it follows the responsive modes. |
| Elevation | Fixed | Shadow/medium on every variant, a two-layer drop shadow whose colour, blur and offsets are all bound to tokens. |

## Accessibility

- The set models no focus state, so the keyboard path to whatever reveals the tooltip has to be built in code.
- A tooltip that is the only description of a control is unreachable for anyone who never hovers. Give the control its own accessible name as well.
- The bubble is surface/inverse carrying foreground/inverse text. Check that pairing still clears contrast against whatever surface it floats above.
- Content is one run of text with no wrapping authored, so a long label becomes a layout problem before it becomes a reading problem.
- Nothing here times out or dismisses itself. Persistence and dismissal both belong to the implementation.

---
*Generated from `specs/tooltip` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
