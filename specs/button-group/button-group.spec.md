# Button Group

A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading. The group owns the fill, the outline and the rules between items, and the items themselves are Figma-only wrappers around the subtle Button. Reach for a single Button when one action is clearly the primary one.

Source: [Button Group page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5763-1251) · extracted 2026-10-20 · 21 variants on the page = 6 public (Size × Shape) + 5 in each of three private wrapper sets.

Builds on [Button](../button/button.spec.md) and [Divider](../divider/divider.spec.md). [Icon Button](../icon-button/icon-button.spec.md) is recorded as a dependency but **is not used** on this page.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `size` | enum | small, medium, large | `medium` | row height, item size (every item inherits it), which Figma slot is live |
| `shape` | enum | sharp, rounded | `sharp` | root radius; outer corners of the first and last item |
| `items` | slot | Buttons (subtle) | 2 in Figma's structure | the actions |

**size** — medium: "Match the density of the controls around the group. Size is the group's call and every button inherits it, so it is never set per item. It also decides which of the three slots is live, which is an authoring arrangement rather than part of the component." · small: "For dense toolbars and compact surfaces where the actions are secondary to the content." · large: "For touch targets and action rows that need to be reached without aiming."

**shape** — sharp: "Match the contour of the surface the group sits on. It reaches the group's own outline and nothing else." · rounded: "The rounded pairing. Only the group's outline rounds. The buttons inside keep square corners in every wrapper variant, which never shows because they carry no fill of their own." (The extraction disagrees: see issues.)

**items** — Figma has three SLOT properties, `Items Slot Small`, `Items Slot Medium`, `Items Slot large`, one per Size. In code they are one slot. Items are Buttons at flavour=subtle; size and shape come from the group, label and icons from the consumer.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Item position** — each item is a `Group item` wrapper with Position `default | start | end` and Shape `sharp | rounded`. `end` drops the trailing divider; `rounded` start/end round the Button's outer corners. In code, position comes from the item's index (first, middle, last) and isn't set by the consumer.

**Per-item content** — label (sample "Button"), leading icon (default glyph `verified`), trailing icon (default glyph `expand-more`), all passed through to Button.

## Anatomy

1. **Group** (`root`) — *"The outer frame. A horizontal auto-layout hugging its items, and the only part carrying the fill and the outline."* Horizontal, gap `space/none`, no padding, centred, hugs both axes. Fill `surface/section`; stroke colour `border/default`, untokened width, drawn outside. Radius: sharp none (literal), rounded `radius/sm`. Does not clip.
2. **Group buttons** (`firstItem`, `lastItem`) — *"The fixed wrappers at each end, each holding a subtle Button and a trailing divider."* First item at Position=start, last at Position=end, Shape matching the group.
3. **Items Slot** (`items`) — *"The middle region for any further actions, matched to the chosen Size."* Horizontal, no padding; sample content two Group items at Position=default, Shape=sharp. Gap and sizing differ per size (see Variants).

## Variants

| size | item height | slot gap | slot sizing | measured (4 items) |
|---|---|---|---|---|
| small | `control/sm` | none (untokened) | fixed width, items fill | 435×36Px |
| medium | `control/md` | `space/neg/xs` (overlap) | hug | 522×40Px |
| large | `control/lg` | none (untokened) | hug | 555×48Px |

| shape | root radius | first item | last item |
|---|---|---|---|
| sharp | none (literal, no token) | start, sharp | end, sharp |
| rounded | `radius/sm` | start, rounded | end, rounded |

As shipped, three of the six variants don't follow this table:

| variant | first item | last item | |
|---|---|---|---|
| small / sharp | start, **rounded** | end, **rounded** | rounded wrappers in a sharp group |
| medium / sharp | **default**, sharp | end, sharp | renders the same as start |
| medium / rounded | **end**, rounded | end, rounded | no divider after item 1; corners on the wrong side |

## Subcomponents

### Group item (`_Group Button Small` / `Medium` / `Large`, private)

*"These are just wrappers for the subtle variant of Button and a divider. They satisfy a Figma-only need. The parent group has the fill, the outline, and owns the divider between elements. Small, Medium and Large differ only in the height they are built at, and each carries a Position axis whose end value drops the trailing divider."*

**They don't duplicate Button.** Each wrapper nests the real Button instance (`2060:15072`) and the real Divider (`2152:8803`). The only things they change are the outer-corner radius on rounded start/end and the icon sizing inside Button. In code an item is a plain Button and the group draws the dividers, so this part needs no component of its own.

Anatomy: a horizontal container (no gap, no padding, no fill, hugs) holding:
- **button**: Button at flavour=subtle, state=default, disabled=false, shape=sharp, size = wrapper size; label "Button", leading and trailing icons on (`verified`, `expand-more`, rounded family, currentColor). Paint is Button's own: fill `interactive/ghost/background/default`, border `interactive/neutral/border/default` at `stroke/base` (draws nothing), label `interactive/neutral/foreground/default`.
- **divider**: Divider, Orientation=vertical, width `stroke/thin`, fills the height; hidden when position = end.

| size | Button size | height | padding inline / block | label | icon | measured width |
|---|---|---|---|---|---|---|
| small | small | `control/sm` | `space/md` / `space/xxs` | `label/medium` | Icon small | 109Px |
| medium | medium | `control/md` | `space/md` / `space/xxs` | `label/large` | Icon medium | 131Px |
| large | large | `control/lg` | `space/lg` / `space/xxs` | `label/large` | Icon medium | 139Px |

(All Button's own values for that size; the wrapper doesn't override them.)

| position | shape | divider | Button corners |
|---|---|---|---|
| default | sharp | yes | `radius/none` |
| start | sharp | yes | `radius/none` (identical to default) |
| end | sharp | no | `radius/none` |
| start | rounded | yes | top-left, bottom-left `radius/sm` |
| end | rounded | no | top-right, bottom-right `radius/sm` |

Small's set has `Position5` and `Position4` instead of start/sharp and end/sharp (see issues).

### Dependencies

| Component | Spec | Use |
|---|---|---|
| Button | `specs/button` | the action in every item; subtle, default state, sharp shape, size from the group |
| Icon Button | `specs/icon-button` | **not used**; an icon-only group isn't modelled |
| Divider | `specs/divider` | vertical rule after every item except the last |
| Icon | `specs/icon` | inside Button only; glyphs `verified`, `expand-more` |

## Tokens & theming

- **Group:** colour `surface/section`, `border/default`; dimension `space/none`, `space/neg/xs`, `radius/sm`.
- **Item:** `radius/sm`, `radius/none` (on Button's corners), `stroke/thin` (Divider width).
- **From Button (subtle, default state), for checking only:** `interactive/ghost/background/default`, `interactive/neutral/border/default`, `interactive/neutral/foreground/default`, `control/{sm,md,lg}`, `space/{xxs,md,lg}`, `stroke/base`, `label/medium`, `label/large`. Hover, pressed, focus and disabled colours are Button's.
- **Glyphs:** `verified`, `expand-more`.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).

All 19 names resolve in `tokens/`; both glyphs are in the font and not retired.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | The group declares no hover, focus, pressed or disabled axis. Interaction belongs to the nested Button, whose own State is left at default in every wrapper. |
| Size | The Size axis | — | Changes the row height and swaps in a different wrapper and a different slot. Nothing else about the group changes. |

| Type | Description |
|---|---|
| Motion | Figma stores no timing and no transition is authored. Nothing in the set changes over time. |
| Item count | The count is structural rather than a property. One wrapper sits before the slot and one after, so a group always holds at least two actions and a third means filling the slot. That arrangement is how the group is assembled in Figma, not a limit the component imposes. |
| Dividers | Each wrapper carries a divider at its trailing edge, and the Position=end variant is the one that drops it. Setting the last item to end is a Figma authoring step, because the parent owns the rules between items. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Items Slot | Figma only, one slot per Size | Small, Medium and large each have their own slot so a designer can drop an item in without resetting that button's Size every time. The split exists for authoring and is not a property of the component. Content placed in one slot does not carry across when Size changes, and the large slot is named in lower case where the other two are capitalised. |
| Group buttons | Figma only, fixed wrappers outside the slot | One wrapper before the slot and one after, placed directly in each variant. They hold a Button and its trailing divider for authoring and are not components to reach for on their own. Only the subtle Button belongs inside, so swapping in another flavour breaks the single surface the group is built on. |
| Button properties | split between the group and the consumer | Size, Shape and Flavour belong to the group and are not set per item, or the row stops reading as one control. The label and the icons are the consumer's. The trailing icon ships as Expand More and the leading as Verified, and either can be swapped where the action calls for something else. |

## Usage

**Do**
- Use it where several actions are peers. If one is clearly the main action, a single Button says so more plainly.
- Set the last item's Position to end. That is what removes the trailing divider and leaves the group a clean edge.

**Don't**
- Don't change Size after filling the slot. Each Size has its own slot, so the content does not travel with it.
- Don't expect Shape to round the buttons. It rounds the group's outline only, and every wrapper holds a square button.

## Accessibility

- The group is a set of related actions. It needs a group role and a name saying what the actions have in common.
- No focus state exists on the group or on the wrappers, so focus order and a visible focus ring both have to come from code.
- Items are told apart by a 1px divider and nothing else. Where the group's fill is close to the surface behind it, the outline is doing all the work of bounding the group.
- The nested Button ships with a Verified leading icon and an Expand More trailing icon. Icons beside a label need to be decorative or separately named, not read out twice.
- Nothing marks an action as current or chosen. A group that needs that is not modelled here.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug both axes | Height is fixed per Size, 36 at small, 40 at medium and 48 at large. Width hugs the items, running from 435 at small to 555 at large as shipped. |
| Padding and gap | Fixed | Zero padding, with the gap bound to space/none so items butt directly against each other. |
| Radius | Per Shape | radius/sm on all four corners when rounded. When sharp the radius is a literal 0 with no token behind it. |
| Fill | Theming | surface/section on the group. The wrappers carry no fill of their own, so the group's surface shows through every item. |
| Border | Fixed | A 1px stroke bound to border/default on every variant, regardless of Shape. |
| Dividers | Per Position | A 1px vertical Divider sits at the trailing edge of each wrapper. Position=end is the only variant that omits it. |
| Nested button | Fixed | A Button at Flavour=subtle with its Size matched to the group. Its own Shape stays sharp in all five wrapper variants, including the rounded ones. |

## Issues

**Warn**
- **Medium / rounded is mis-assembled.** Its first item is Position=end, so it has no divider after it (confirmed visually) and its rounded corners face inward. It should be start.
- **Small / sharp uses rounded wrappers** at both ends, so the Buttons get `radius/sm` outer corners inside a square group. You can't see it at rest, but it would show in Button's focus ring or hover scrim.
- **Metadata says the buttons stay square; the rounded wrappers round them.** Button's Shape prop does stay sharp, but the rounded start/end wrappers override its outer corners to `radius/sm`. The matching Don't is also inaccurate.
- **`_Group Button Small` has unnamed Position options.** It offers `Position5` (acts as end) and `Position4` (acts as default) and has no start/sharp or end/sharp. Medium and Large are correct.
- **The slot differs by size.** Medium's gap is `space/neg/xs`, so items overlap by one stroke. Small and large use an untokened 0. Small's slot is fixed width with its items set to fill, where the others hug. The metadata says `space/none`, with items butting directly.
- **Root border width is untokened** (raw 1) on all six variants; only its colour is bound. It's drawn outside the bounds.
- **Sharp radius is a literal 0.** This is stated and intentional, but code should bind `radius/none`.
- **No focus, selection or disabled model on the group.** Roving focus vs tab-per-button, the role/name, and any toggle mode are code decisions. For a selection group, see Segmented Control.

**Note**
- Items Slot Medium lists a preferred set (key `874222d4…`) that doesn't exist in the file.
- Three per-size SLOT properties collapse to one `items` slot. Figma's Size order is medium, large, small.
- The wrappers don't duplicate Button: they nest the real Button and Divider. Icon Button isn't used.
- Rounded wrappers use `radius/sm` on Button's corners where Button's own rounded shape uses `radius/element-sm`.
- Glyphs `verified` and `expand-more` resolve and aren't retired. Their colour is currentColor, so the icon vectors' fill overrides don't matter.
- No motion, no group states, no native component descriptions. Platforms are "Pending development".

## Visual reference

[Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5833-912) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5928-448) · [medium/rounded (broken first item)](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5923-5302) · [small/sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5833-913) · [_Group Button Small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5915-4775) · [_Group Button Medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5915-4823) · [_Group Button Large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5915-4861)
