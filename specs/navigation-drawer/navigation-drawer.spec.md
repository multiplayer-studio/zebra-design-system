# Navigation Drawer

The app's destinations in a tall panel at the edge of the screen, opened from a menu button. Modal slides over the page on a Scrim and closes on Escape, a scrim click, the header's close button or a chosen destination. Standard sits in the layout beside the content and pushes it. Built from the Navigation Rail family with no new parts.

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8255-1584 (page "Navigation Drawer") · extracted 2026-11-11

Values are token names; they resolve in [tokens/](../../tokens/). Literals are measurements (suffixed Px) and the exceptions in Issues.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| modal | enum | true, false | true | variant |
| showAction | boolean | | true | action |
| menuSlot | slot | Sub Menu Item, Collapsible Menu Item, Divider (preferred only) | | menuSlot |
| footerSlot | slot | Sub Menu Item, Collapsible Menu Item, Divider (preferred only) | | footerSlot |
| side | enum, code only | start, end | start | edge it comes from |
| shape | enum, code only | rounded (radius/sm), sharp (radius/none) | rounded | rows, groups and buttons inside |
| dismissible | boolean, code only | | true | Escape and scrim dismissal |
| closeOnNavigate | boolean, code only | | true | closing on a chosen destination |
| width | length, code only | | 320Px | panel width |

- **modal true**: Slides over the page on a Scrim, traps focus and closes on dismissal or a chosen destination.
- **modal false**: Standard: sits in the layout beside the content and pushes it. Closed, it narrows to nothing. The trigger lives on the main page content
- **showAction true**: Shows a full-width primary Button under the header, for a create or compose entry point.
- **showAction false**: Hides it, for a drawer that is purely navigational.
- **side**: start — Code only. Comes from the leading edge (Left). end — Comes from the trailing edge (Right).
- **shape**: rounded — Code only. Rounds the rows, groups and buttons inside (radius/sm). The drawer itself is never rounded. sharp — Square corners (radius/none) on everything inside.
- **dismissible**: true — Code only. Escape and a scrim click close a modal drawer. false — Only the close button or a destination closes it.
- **closeOnNavigate**: true — Code only. Choosing a destination closes a modal drawer. Opening a group never does. false — The drawer stays open after a destination is chosen.
- **width**: 320px — Code only. A literal. length — The project sets its own width. A modal drawer always leaves control/lg of page visible.

## Internal variations & content inputs

**Close button.** The exposed Navigation Header's Show Icon Button, on by default, with its glyph swapped to `close`. true: "Set on the exposed Navigation Header (Show Icon Button). Its icon button shows the close glyph and closes the drawer." false: "No close button. Escape, a scrim click or a destination still closes a modal drawer."

**Header type.** Navigation Header Type=logo (`zebra` glyph); avatar is the other option.

**Sample content.** The header title "Project Name", the action label "New task" (`add-circle-outline`), and the rows: Home (selected), Inbox (badge 2), Schedule, the Documents group, a Divider, the Reports and Team groups, then Settings and Help in the footer. Glyphs: home, inbox, calendar, folder, chart-bar, group, settings, help.

## Anatomy

1. **Header** — The Navigation Header and the optional action. Sticky at the top; the only frozen part. Navigation Header (Type=logo, Expanded=true), fill width, exposed. The action is Button (Size=large, Shape=rounded, Flavour=primary), fill width, shown when `showAction`.
2. **Menu** — The Menu Slot. Takes the free height when content is short and never scrolls on its own. Vertical, gap space/2xs, padding space/none, fills width and height; the slot inside hugs its rows with the same gap.
3. **Footer** — The Footer Slot, straight after the menu. Scrolls with it; not pinned. Vertical, gap space/2xs, padding space/none, hugs.
4. **Surface** — surface/overlay with Shadow/large when modal, surface/section when standard. No corner radius. Root: gap and padding space/none, hugs the panel. Panel: vertical, gap space/md, padding space/card top and bottom, space/md left and right, clips; measured 320Px wide, 800Px tall.

## Variants

| modal | root fill | root effects |
|---|---|---|
| true (base) | surface/overlay | Shadow/large |
| false | surface/section | none |

## Subcomponents

None on the page. Dependencies: Navigation Header and Collapsible Menu Item ([navigation-rail](../navigation-rail/navigation-rail.spec.md)), Sub Menu Item ([sub-menu-item](../sub-menu-item/sub-menu-item.spec.md)), Button ([button](../button/button.spec.md)), Divider ([divider](../divider/divider.spec.md)), and Scrim ([scrim](../scrim/scrim.spec.md)) as the modal backdrop, outside the set.

## Tokens & theming

- **Color:** surface/overlay, surface/section, overlay/scrim
- **Dimension:** space/none, space/2xs, space/md, space/card, control/lg, radius/sm, radius/none
- **Effect:** Shadow/large (shadow/large/x, shadow/large/y, shadow/large/blur, shadow/soft; shadow/small/x, shadow/small/y, shadow/small/blur, shadow/hard)
- **Motion:** animations/smooth
- **Glyphs:** close, zebra, add-circle-outline
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark), size (Desktop, Mobile, Tablet, Desktop Compact) and every brand extension.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Open (modal) | Menu button, or open set from outside | animations/smooth | Slides in from its edge while the Scrim fades in. Focus moves to the first control inside. |
| Close (modal) | Escape, scrim click, close button or a chosen destination | animations/smooth | Slides back out and the Scrim fades. Focus returns to the menu button. |
| Open / close (standard) | open set from outside, usually a menu button beside the content | animations/smooth | Widens from nothing and pushes the content. Closed, it is inert. |
| Group open / close | Collapsible Menu Item header | animations/smooth | The group's rows show or hide and its caret turns. The drawer stays open. |
| Reduced motion | prefers-reduced-motion | — | Opens and closes with no slide, fade or width change. |

- **Motion:** Modal slides from its edge and the Scrim fades; standard widens. All use animations/smooth, and none run under reduced motion.
- **Dismissal:** Escape, a scrim click, the close button or a chosen destination close a modal drawer. Dismissible=false ignores Escape and the scrim.
- **Focus:** Modal traps focus, starts on the first control and returns to the menu button on close. The page behind is inert and does not scroll.
- **Scrolling:** Only the header is frozen; it sticks to the top. The menu never scrolls on its own and the footer is never pinned. Standard scrolls with the page; modal scrolls as one surface with no scrollbar.
- **Vertical fill:** When content is short the menu takes the free height, so the footer sits at the bottom. Figma draws a fixed 800px.
- **Colour mode:** Follows the page's mode. Unlike Navigation Rail, it is not locked to dark.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Menu Slot | slot, preferred only: Sub Menu Item, Collapsible Menu Item, Divider | The destinations. Top-level rows are Sub Menu Items so glyphs and labels line up; groups are Collapsible Menu Items; a Divider separates sections. |
| Footer Slot | slot, preferred only: Sub Menu Item, Collapsible Menu Item, Divider | Destinations after the menu, such as Settings and Help. It scrolls with the menu; it is not pinned. |
| Navigation Header | exposed nested instance | The top of the drawer: logo or avatar and title. Its icon button is the close button; where there is no separate close control. |
| Action | nested Button, Show Action | Primary, large, full width. A create or compose entry point, not a destination; pressing it does not close the drawer. |

## Usage

**Do**
- Use Sub Menu Item for every top-level destination and Collapsible Menu Item for groups, so every row lines up.
- Use modal on small screens or when navigation is occasional. Use standard beside the content on wide layouts.

**Don't**
- Don't use Navigation Rail Item in the drawer. The drawer has no collapsed form, so the rail's square targets don't line up.
- Don't pin the footer or give the menu its own scroll. Only the header stays put.

## Accessibility

- The drawer is a nav landmark named by navLabel; modal is also a dialog with that name. Modal traps focus, returns it to the menu button and makes the page behind inert. Escape is the keyboard match for a scrim click. The selected row carries aria-current=page and group headers report aria-expanded. Every icon-only control, the close button included, needs an accessible name.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fixed | 320px, a literal: no width token exists. Never wider than the viewport less control/lg. |
| Height | Fill | Fills the viewport (modal) or at least its row (standard) and grows with its content. Figma draws 800px. |
| Padding | Fixed | space/card top and bottom, space/md left and right. |
| Item spacing | Fixed | space/md between header, action, menu and footer; space/2xs between rows. |
| Corners | None | No radius on the drawer in either shape. Shape only rounds what is inside. |
| Elevation | Theming | Modal: Shadow/large over the Scrim (overlay/scrim). Standard: none. |
| Fill | Theming | surface/overlay when modal, surface/section when standard. |
| Colour | Theming | The drawer binds only its surface. Rows, header and button bring their own tokens and follow any mode or brand extension. |

## Issues

- **warn:** The panel's width is a raw 320Px with no token. The metadata says so; implement it as one named literal.
- **note:** Show Close is not a set property. It is the exposed Navigation Header's Show Icon Button, with its glyph swapped to close. Code exposes it as one drawer prop.
- **note:** Side, Shape, Dismissible, Close On Navigate and Width are code only; Figma draws start, rounded and 320Px.
- **note:** Menu Slot and Footer Slot are listed under Content & Slot, not the Property Breakdown.
- **note:** Motion, the sticky header and the Scrim backdrop are not drawn in the set; States, Behavior and Layout & Theming describe them.
