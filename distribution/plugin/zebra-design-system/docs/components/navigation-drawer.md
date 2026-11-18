# Navigation Drawer

> The app's destinations in a tall panel at the edge of the screen, opened from a menu button. Modal slides over the page on a Scrim and closes on Escape, a scrim click, the header's close button or a chosen destination. Standard sits in the layout beside the content and pushes it. Built from the Navigation Rail family with no new parts.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-navigation-drawer>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `modal` | enum | `true` | `true` `false` |  |
| `showAction` | boolean | `true` |  |  |
| `menuSlot` | slot |  |  |  |
| `footerSlot` | slot |  |  |  |
| `side` | enum | `start` | `start` `end` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `dismissible` | boolean | `true` |  |  |
| `closeOnNavigate` | boolean | `true` |  |  |
| `width` | length | `320Px (literal, no token)` |  |  |

## When and how to use

### Do

- Use Sub Menu Item for every top-level destination and Collapsible Menu Item for groups, so every row lines up.
- Use modal on small screens or when navigation is occasional. Use standard beside the content on wide layouts.

### Don't

- Don't use Navigation Rail Item in the drawer. The drawer has no collapsed form, so the rail's square targets don't line up.
- Don't pin the footer or give the menu its own scroll. Only the header stays put.

## States

| State | Trigger | What changes |
|---|---|---|
| Open (modal) | Menu button, or open set from outside |  |
| Close (modal) | Escape, scrim click, close button or a chosen destination |  |
| Open / close (standard) | open set from outside, usually a menu button beside the content |  |
| Group open / close | Collapsible Menu Item header |  |
| Reduced motion | prefers-reduced-motion |  |

## Behaviour

- **Motion** — Modal slides from its edge and the Scrim fades; standard widens. All use animations/smooth, and none run under reduced motion.
- **Dismissal** — Escape, a scrim click, the close button or a chosen destination close a modal drawer. Dismissible=false ignores Escape and the scrim.
- **Focus** — Modal traps focus, starts on the first control and returns to the menu button on close. The page behind is inert and does not scroll.
- **Scrolling** — Only the header is frozen; it sticks to the top. The menu never scrolls on its own and the footer is never pinned. Standard scrolls with the page; modal scrolls as one surface with no scrollbar.
- **Vertical fill** — When content is short the menu takes the free height, so the footer sits at the bottom. Figma draws a fixed 800px.
- **Colour mode** — Follows the page's mode. Unlike Navigation Rail, it is not locked to dark.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Menu Slot | slot, preferred only: Sub Menu Item, Collapsible Menu Item, Divider | The destinations. Top-level rows are Sub Menu Items so glyphs and labels line up; groups are Collapsible Menu Items; a Divider separates sections. |
| Footer Slot | slot, preferred only: Sub Menu Item, Collapsible Menu Item, Divider | Destinations after the menu, such as Settings and Help. It scrolls with the menu; it is not pinned. |
| Navigation Header | exposed nested instance | The top of the drawer: logo or avatar and title. Its icon button is the close button; where there is no separate close control. |
| Action | nested Button, Show Action | Primary, large, full width. A create or compose entry point, not a destination; pressing it does not close the drawer. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Fixed | 320px, a literal: no width token exists. Never wider than the viewport less control/lg. |
| Height | Fill | Fills the viewport (modal) or at least its row (standard) and grows with its content. Figma draws 800px. |
| Padding | Fixed | space/card top and bottom, space/md left and right. |
| Item spacing | Fixed | space/md between header, action, menu and footer; space/2xs between rows. |
| Corners | None | No radius on the drawer in either shape. Shape only rounds what is inside. |
| Elevation | Theming | Modal: Shadow/large over the Scrim (overlay/scrim). Standard: none. |
| Fill | Theming | surface/overlay when modal, surface/section when standard. |
| Colour | Theming | The drawer binds only its surface. Rows, header and button bring their own tokens and follow any mode or brand extension. |

## Accessibility

- The drawer is a nav landmark named by navLabel; modal is also a dialog with that name. Modal traps focus, returns it to the menu button and makes the page behind inert. Escape is the keyboard match for a scrim click. The selected row carries aria-current=page and group headers report aria-expanded. Every icon-only control, the close button included, needs an accessible name.

---
*Generated from `specs/navigation-drawer` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
