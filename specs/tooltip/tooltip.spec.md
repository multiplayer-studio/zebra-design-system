# Tooltip

A short floating message that names what an adjacent control does. Point decides which edge the arrow sits on, which is how the bubble anchors to its trigger from any of four sides. It holds one run of text and nothing else, so for status that stays on screen and sits inline, reach for Status Label instead.

Source: [Tooltip page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5470-1664) · extracted 2026-10-20

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `label` | string | — | `"Label"` | label text |
| `point` | enum | bottom, top, left, right | `bottom` | variant (pointer edge) |
| `shape` | enum | rounded, sharp | `rounded` | variant (radius + pointer tip) |

**label** — "The whole message. Name the control's action in a few words. A tooltip that needs a full sentence is usually carrying information that belongs in the interface itself rather than in a transient hint."

**point** names the edge of the bubble the pointer sits on (the edge facing the trigger), not the side the bubble appears on.
- bottom: "Picks the edge the arrow sits on, which is the edge facing the trigger, so bottom puts the bubble above the thing it describes. The right choice wherever there is clear space above the trigger."
- top: "Puts the bubble below its trigger. Use where the trigger sits near the top of its container and a bubble above it would be cut off."
- left: "Puts the bubble to the right of its trigger. Use in a vertical list or rail, where going above or below would cover the neighbouring rows."
- right: "Puts the bubble to the left of its trigger. The mirror of left, for a control sitting against the right edge of its container."

**shape** — rounded: "Follow the contour the surrounding controls already use rather than deciding per tooltip. Mixing both contours on one screen reads as a mistake rather than a distinction." · sharp: "The square-cornered pairing, for surfaces built from sharp controls. It changes the arrow tip as well as the corners, so the bubble stays internally consistent either way."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Anatomy

1. **Bubble** (the component frame) — horizontal, no gap, padding `space/2xs` block / `space/sm` inline, centred; hugs both axes (46×24Px measured at the default label); fill `surface/inverse`; radius `radius/sm` (rounded) or `radius/none` (sharp) on all four corners; elevation `Shadow/medium`; does not clip. "The component frame itself. A horizontal auto-layout that hugs the label and carries the fill, the corner radius and the shadow."
2. **Label** — text style `label/small`, colour `foreground/inverse`, single line, auto width; bound to `label`. "The one text property, centred on both axes inside the padding. A single run of text with nothing else allowed beside it."
3. **Pointer** — vector, fill `surface/inverse`, absolutely positioned outside the bubble, centred on the edge named by `point`. Sharp: a triangle with its base on the bubble edge. Rounded: the same triangle with the apex rounded off. Measured 8×top/bottom or 4×left/right; rounded tips 3.59Px on the pointing axis. No size token. "A vector drawn outside the frame's bounds rather than inside them. Which edge it sits on and which tip it takes both come from the variant."

**Elevation `Shadow/medium`** — two drop-shadow layers, both coloured `shadow/soft`: (`shadow/medium/x`, `shadow/medium/y`, blur `shadow/medium/blur`) and (`shadow/small/x`, `shadow/small/y`, blur `shadow/small/blur`).

## Variants

| point | pointer anchor | pointer apex | bubble sits |
|---|---|---|---|
| bottom | bottom-centre | down | above trigger |
| top | top-centre | up | below trigger |
| left | left-middle | left | right of trigger |
| right | right-middle | right | left of trigger |

| shape | radius | pointer tip |
|---|---|---|
| rounded | `radius/sm` | rounded |
| sharp | `radius/none` | pointed |

Fill, padding, type and elevation are identical across all eight variants.

## Subcomponents

None. The set contains no nested instances.

## Tokens & theming

- **Colour:** `surface/inverse`, `foreground/inverse`, `shadow/soft`.
- **Dimension:** `space/{xxs, sm}`, `radius/{sm, none}`, `shadow/medium/{x, y, blur}`, `shadow/small/{x, y, blur}`.
- **Typography:** `label/small` (style; its five `label/small/*` variables are bound too). **Effect:** `Shadow/medium`. **Glyphs:** none.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).
- **Extensions:** `condensed` overrides `space/2xs`, `space/sm`, `radius/sm`, `label/small/font size` and `label/small/line height`, so the bubble shrinks; the pointer does not.

All 18 variable names resolve in `tokens/`.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | "The set carries no hover, focus, pressed or disabled axis. All eight variants render the same way, and the only differences between them are which edge the arrow sits on and which contour the corners take." |
| Shown or hidden | Owned by the trigger | — | "Nothing in the set models appearing or disappearing. A tooltip is either placed or it is not, so whatever reveals and dismisses it lives outside this component." |

- **Motion** — "Code only: fades in while sliding toward its trigger (from the side away from the tip), and fades out, on animations/smooth. No motion under reduced motion."
- **Placement** — "Point names the edge the arrow sits on, but nothing in the set positions the bubble against a real trigger. Choosing a variant states the intended side, and the actual anchoring has to be done wherever the tooltip is placed."

## Content & slots

- **Label** (text property) — "The only content the set exposes, and plain text at that. There is no instance-swap slot anywhere in the component, so an icon cannot be placed beside the text or in place of it without detaching the instance."
- **Pointer** (fixed part) — "Not a slot. Which edge it sits on and which tip it takes both follow the variant, and there is no property to hide it or move it from an instance."

## Usage

**Do**
- Write the label as a short action phrase. A tooltip earns its place by naming the control, not by describing it.
- Pick Point from where the trigger actually sits. The arrow is the only thing tying the bubble to its control, so the wrong edge breaks the connection.

**Don't**
- Don't mix rounded and sharp across one screen. The contour belongs to the surface the tooltip opens over, not to the individual hint.
- Don't rely on it as the only description of a control. It carries no focus state, so anyone who never hovers never gets the message.

## Accessibility

- The set models no focus state, so the keyboard path to whatever reveals the tooltip has to be built in code.
- A tooltip that is the only description of a control is unreachable for anyone who never hovers. Give the control its own accessible name as well.
- The bubble is surface/inverse carrying foreground/inverse text. Check that pairing still clears contrast against whatever surface it floats above.
- Content is one run of text with no wrapping authored, so a long label becomes a layout problem before it becomes a reading problem.
- Nothing here times out or dismisses itself. Persistence and dismissal both belong to the implementation.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug both axes | "The bubble hugs its label on both axes, so the width follows the text. At the default Label it measures 46 by 24, and the height holds at 24 because one 16px line sits inside 4px of vertical padding." |
| Padding | Fixed | "space/2xs top and bottom, space/sm left and right. Identical across all eight variants." |
| Radius | Per Shape | "radius/sm on rounded and radius/none on sharp, bound on all four corners. Both are tokens, so the value follows the theme and only the choice between them is made per instance." |
| Pointer | Fixed, absolute | "Absolutely positioned, centred on its edge and drawn outside the bubble, which is why the component does not clip its contents. 8 by 4 on top and bottom, 4 by 8 on left and right. The rounded tips measure 3.586 on the pointing axis rather than 4, because the curve stops short of the point the sharp triangle reaches." |
| Fill | Theming | "surface/inverse on the bubble and on the pointer, so the two read as one shape. The label is foreground/inverse." |
| Type | Theming | "label/small. Bound to the label/small typography variables as well as the text style, so it follows the responsive modes." |
| Elevation | Fixed | "Shadow/medium on every variant, a two-layer drop shadow whose colour, blur and offsets are all bound to tokens." |

## Visual reference

[Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-57) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5530-33) · rounded: [bottom](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-33), [top](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-36), [left](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-39), [right](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-42) · sharp: [bottom](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-45), [top](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-48), [left](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-51), [right](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5508-54)

## Issues

**Warn**
- **Pointer isn't token sized.** It stays 8×4 / 4×8 under the condensed extension while the bubble's padding, radius and type shrink. Metadata says "Fixed, absolute"; decide in code whether it scales.
- **No max width or wrapping.** The label is single-line auto width; pick a max width and wrap rule in code.
- **Point is the pointer edge, not the placement.** `point=bottom` puts the bubble above the trigger; a positioning library's `top` maps to `point=bottom`.

**Note**
- The set description quotes "4px corner radius" (condensed overrides `radius/sm`) and names `<zeta-tooltip>` with a boolean `rounded`; the set exposes a `shape` enum, which this spec follows.
- Reveal, dismissal, delay, motion and keyboard access are intentionally unmodelled; the component is the static bubble.
- Contrast of `foreground/inverse` on `surface/inverse` is flagged by the metadata for checking; not verified here.
- Metadata and Figma agree on every property, default, token and measurement. No token gaps, no binding drift.
- No subcomponents, icons or slots; every metadata section is present.
