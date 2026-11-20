# Bottom Sheet

> A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions without moving a person off the view behind it. Content Type picks between a run of list rows, a grid of tiles, and a slot that takes whatever the product supplies. All three carry the same drag handle, header and two action footer, so the only thing that changes between them is what sits in the middle.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-bottom-sheet>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `modal` | boolean | `false` |  |  |
| `open` | boolean | `false` |  |  |
| `dismissible` | boolean | `true` |  |  |
| `contentType` | enum | `list` | `list` `grid` `generic` |  |
| `contentSlot` | slot |  |  |  |

## When and how to use

### Do

- Pick Content Type for how a person reads the options. list is for reading down a set of labels, grid for recognising them by icon.
- Use generic when the content is not a set of options at all. It is the only arrangement that takes a slot.

### Don't

- Don't try to set the title through the sheet. The header owns that text, so it is set on the header rather than passed in.
- Don't rely on the sheet to cap its own height. It hugs whatever it holds, so a long run of items has to be limited by the screen presenting it.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Content Type | The Content Type value |  |
| Row and tile states | The nested item’s own state |  |
| Footer actions | The nested Button states |  |

## Behaviour

- **Motion** — No transition is defined. Nothing in the component describes how the sheet arrives at the bottom edge or leaves it.
- **Anchoring** — Only the top two corners are rounded, which is what fixes the sheet to the bottom edge. The bottom two stay square because they sit past the edge of the screen.
- **Elevation** — No shadow and no scrim are defined on the sheet. Whatever separates it from the content behind comes from the screen that presents it.
- **Height** — The sheet hugs its content, so it stands as tall as the handle, header, content and footer make it. Nothing in the component caps that height.
- **Content ownership** — Only generic takes a slot. list and grid lay out their own items, so moving between the three replaces the content region rather than refilling it.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Content | Content Slot, consumer owned | Live on generic only. It takes whatever the product supplies, with the sheet providing the padding around it and the spacing between items. |
| List items | Menu Item, parent owned | list lays out a run of menu rows, each set to its default state with an icon type and square corners. Menu Item is documented on the Dropdown page. |
| Grid tiles | Grid Menu Item, parent owned | grid lays out tiles three to a row, all set to rounded. They are documented in their own frame. |
| Item count | Figma only, six items drawn | The list and grid regions hold six items so the arrangement can be read at a glance without a designer building one. Both take a run of items, and how many is the product’s decision. |
| Header | _Sheet Header, parent owned | Carries the sheet title and an optional leading Icon Button. Bottom Sheet always sets it to start, where the button leads and the title reads from the left. Its own center value centres the title and pins the button to the leading edge. |
| Header text | Not exposed | The title belongs to the header rather than to the sheet, so it is set on that part rather than passed in from here. |
| Handle | Sheet Handle, parent owned | The drag affordance along the top edge. It declares nothing, so it is identical on all three arrangements. |
| Footer | _Card Footer, parent owned | Set to its two action arrangement, an outline button beside a primary one, both set to small. It is Card’s footer reused here. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed width, hug height | 360 wide. Height follows the content, standing at 452 on list, 380 on grid and 388 on generic at the item counts drawn. |
| Direction | Column | Handle, header, content region and footer stacked with no gap between them, since each part carries its own padding. |
| Surface | Tokenised | surface/overlay across all three arrangements. |
| Radius | Top corners only | radius/container on the top two corners, with the bottom two left square. |
| Padding | Tokenised | space/card below the footer on all three arrangements. |
| Handle | Fill width | Padded space/lg above and below and space/section at the sides. The bar itself is control/target-min wide at radius/pill, drawn in border/default. |
| Header | Fixed width | Padded space/sm above and below and space/lg at the sides at start, with space/2xs between the Icon Button and the title. At center it is padded space/gutter above and below and space/lg at the sides. The title is title/medium in foreground/primary. |
| Content region | Fill | Padded space/md above and below, with space/lg at the sides on list and space/gutter on grid and generic. Items sit space/2xs apart on list, and space/md apart on grid and generic. |
| Grid rows | Fill | Three tiles to a row, space/md apart, each taking an equal share of the row width. |
| Footer | Set to two actions | Its two buttons each fill an equal share of the row. The padding and spacing around them belong to _Card Footer. |
| Elevation | None defined | No shadow and no scrim sit on the sheet. |

## Accessibility

- A bottom sheet arrives over the content a person was reading, so the screen presenting it has to say what it is and move focus into it.
- Nothing in the component does that on its own.
- The drag handle is a visual affordance with no label and no focusable control behind it, so dismissing the sheet has to be reachable another way, through the footer or through a gesture the screen supplies.
- The title in the header is the sheet’s accessible name, so it should read as a short noun phrase a person would recognise out of context.
- The footer’s two actions are the only controls present on every arrangement, which makes them the dependable way out.

---
*Generated from `specs/bottom-sheet` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
