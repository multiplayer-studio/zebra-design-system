---
name: Navigation Drawer
level: organism
status: stable
composes: [../molecules/navigation-header.md, ../molecules/sub-menu-item.md, ../atoms/divider.md, ../atoms/button.md, ../atoms/scrim.md]
tokens:
  # container
  navigation-drawer-container-background-modal: '{colors.color-fill-overlay}'
  navigation-drawer-container-background-standard: '{colors.color-fill-default}'
  navigation-drawer-container-shadow-modal: '{shadow.shadow-large}'
  navigation-drawer-container-border-width: '{stroke.stroke-thin}'
  navigation-drawer-container-border-color: '{colors.color-fill-transparent}'
  navigation-drawer-container-width: '{component-sizes.size-navigation-drawer-width}'
  navigation-drawer-container-inset-min: '{control.control-lg}'
  navigation-drawer-container-padding-x: '{space.space-md}'
  navigation-drawer-container-padding-y: '{space.space-md}'
  navigation-drawer-container-gap: '{space.space-md}'
  navigation-drawer-list-gap: '{space.space-2xs}'
  navigation-drawer-container-transition: '{motion.motion-smooth}'
  navigation-drawer-container-exit-duration: '{motion.motion-instant}'
  navigation-drawer-container-exit-easing: '{motion.easing-in}'
---

# Navigation Drawer

> The app's destinations in a tall panel at the edge of the screen, opened from a menu button: modal over a scrim, or standard beside the content.

## Anatomy
1. Surface — the panel, `--navigation-drawer-container-width` wide, padded `--navigation-drawer-container-padding-y` top and bottom and `--navigation-drawer-container-padding-x` left and right, with `--navigation-drawer-container-gap` between header, action, menu and footer. No corner radius in either shape: it reaches the screen edge, so it has none on that side (DESIGN.md §5). Its inner edge has a `--navigation-drawer-container-border-width` border in `--navigation-drawer-container-border-color` (transparent, so the edge shows in forced colours, [patterns 6.10](../patterns/06-accessibility.md)).
2. Header — a [Navigation Header](../molecules/navigation-header.md) (logo or avatar and title). Its icon button shows the close glyph and closes the drawer. Sticky at the top: the only frozen part.
3. Action (optional) — a primary, large, full-width [Button](../atoms/button.md) under the header: the product's one main create or compose action, not a destination ([patterns 2.14](../patterns/02-navigation-flow.md)). Pressing it doesn't close the drawer.
4. Menu — the Menu Slot: top-level [Sub Menu Item](../molecules/sub-menu-item.md) rows, Collapsible Menu Item groups, and a [Divider](../atoms/divider.md) between sections, `--navigation-drawer-list-gap` apart. It takes the free height when content is short, so the footer sits at the bottom; it never scrolls on its own.
5. Footer — the Footer Slot (Settings, Help and the like), same content rules as the menu, straight after it. Not pinned; it scrolls with the menu.
6. Scrim (modal only) — a [Scrim](../atoms/scrim.md) behind the drawer, covering the page; it fades in and out with the drawer.

## Variants
| Modal | Surface | Elevation | Behaviour |
|---|---|---|---|
| true (default) | `--navigation-drawer-container-background-modal` | `--navigation-drawer-container-shadow-modal`, over the scrim | slides over the page, traps focus, closes on dismissal or a chosen destination |
| false (standard) | `--navigation-drawer-container-background-standard` | none | sits in the layout beside the content and pushes it; closed, it narrows to nothing |

Side: start (default, leading edge) or end (trailing edge). The drawer follows the page's colour mode; unlike the Navigation Rail it isn't locked to Dark.

Shape: rounded (default) gives the rounded shape to the rows, groups and buttons inside; sharp gives them the sharp shape. The drawer itself never rounds. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Trigger | What changes |
|---|---|---|
| open (modal) | menu button, or open set from outside | slides in from its edge while the scrim fades in; focus moves to the first control inside |
| closed (modal) | Escape, the system Back, scrim click, close button or a chosen destination | slides back out and the scrim fades; focus returns to the menu button |
| open / closed (standard) | open set from outside, usually a menu button beside the content | widens from nothing and pushes the content; closed, it's inert |
| group open / closed | a Collapsible Menu Item header | the group's rows show or hide and its caret turns; the drawer stays open |

Opening runs on `--navigation-drawer-container-transition`. Closing is shorter and accelerates away: `--navigation-drawer-container-exit-duration` with `--navigation-drawer-container-exit-easing`. Under reduced motion the slide and the width change become a fade of the drawer's opacity on the same timings, and the scrim still fades ([patterns 6.66](../patterns/06-accessibility.md)). Rows carry their own hover, pressed, selected, focus and disabled states.

## Spacing & Sizing
| Part | Value |
|---|---|
| Width | `--navigation-drawer-container-width`; a modal drawer always leaves at least `--navigation-drawer-container-inset-min` of page visible |
| Padding | `--navigation-drawer-container-padding-y` top and bottom, `--navigation-drawer-container-padding-x` left and right |
| Gaps | `--navigation-drawer-container-gap` between blocks; `--navigation-drawer-list-gap` between rows |
| Height | fills the viewport (modal) or at least its row (standard), growing with its content |

Only the header is frozen. A standard drawer scrolls with the page; a modal drawer scrolls as one surface with no visible scrollbar. The drawer binds only its surface; rows, header and button bring their own tokens and follow any mode or brand extension.

## Properties
| Property | Options | Default |
|---|---|---|
| Modal | true, false | true |
| Show Action | on / off | on |
| Show Close (the header's icon button) | on / off | on |
| Side | start, end (code only) | start |
| Shape | rounded, sharp (code only) | rounded |
| Dismissible (Escape and scrim close it) | on / off (code only) | on |
| Close On Navigate | on / off (code only) | on |
| Width | `--navigation-drawer-container-width`, a length (code only) | `--navigation-drawer-container-width` |
| Nav label | text, the landmark name | — |

## Usage
- Use Sub Menu Item for every top-level destination and Collapsible Menu Item for groups, so every row lines up.
- Use modal below `--breakpoint-expanded-min` or when navigation is occasional; use standard beside the content on expanded widths ([patterns 5.15](../patterns/05-sizes-devices.md)).
- Show at most two levels: top-level rows and one level of groups. A third level moves into the content ([patterns 2.3](../patterns/02-navigation-flow.md)).
- Leave out destinations the person's role can't use ([patterns 2.80](../patterns/02-navigation-flow.md)). A row is disabled only while it's temporarily unavailable, and says why.
- Don't use Navigation Rail items in the drawer. It has no collapsed form, so the rail's square targets don't line up.
- Don't pin the footer or give the menu its own scroll; only the header stays put.
- With Show Close off, Escape, a scrim click or a destination still close a modal drawer; with Dismissible off as well, only a destination does, so keep one of them.

## Accessibility
- The drawer is a `nav` landmark named by its nav label ([patterns 6.52](../patterns/06-accessibility.md)); modal is also a dialog with that name.
- Modal follows the overlay focus rules ([patterns 6.28](../patterns/06-accessibility.md), [6.29](../patterns/06-accessibility.md)) and makes the page behind inert and unscrollable. Escape and the system Back are the matches for a scrim click (unless Dismissible is off).
- The selected row carries `aria-current="page"`; group headers report `aria-expanded`.
- Every icon-only control, the close button included, needs an accessible name. The menu button reports `aria-expanded` and `aria-controls`.

## Claude Prompt
Draw a tall white navigation drawer (`--navigation-drawer-container-background-modal`) `--navigation-drawer-container-width` wide on the left edge of a phone or tablet screen, over a dark translucent scrim that dims the page, with a large soft shadow (`--navigation-drawer-container-shadow-modal`) and square corners. Inside, `--navigation-drawer-container-padding-x` side padding: at the top a small product logo with the product name and a close icon at the far right; below it a full-width blue primary button "New task"; then a list of navigation rows, each a small icon and a label, `--navigation-drawer-list-gap` apart, one row selected with a pale blue tint and blue text; a thin divider; then Settings and Help rows at the bottom.
