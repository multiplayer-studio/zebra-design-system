# Dropdown

> A pattern rather than a component, pairing a trigger with a Dropdown Menu and placing the menu relative to it. Open shows or hides the menu, Position picks which side it opens on and Align pins which edges line up. The menu is positioned absolutely and sits outside the template's bounds, so a layout only reserves the trigger's space. This is a condensed record, the panel and its rows are documented in their own frames.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-dropdown-menu-button>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `open` | enum | `false` | `false` `true` |  |
| `position` | enum | `bottom` | `bottom` `top` `right` `left` |  |
| `align` | enum | `left` | `left` `right` `bottom` `top` |  |
| `triggerComponent` | slot | `Button (Size=small, Shape=rounded, Flavor=primary, State=default, Disabled=false)` |  |  |
| `triggerSlot` | slot | `null` |  |  |

## States

| State | Trigger | What changes |
|---|---|---|
| Static (Dropdown Template itself has none) | — |  |

## Behaviour

- **Note** — Open is a static variant, not a behaviour. Showing and hiding the menu, returning focus to the trigger and closing on escape all belong to the implementation.
- **Note** — The menu sits outside the template's bounds, so nothing here stops it opening off-screen. Flipping Position near a viewport edge is the implementation's job.
- **Note** — The trigger needs an accessible name and a state saying whether the menu is open. Neither is modelled here.
- **Note** — Rows inside the menu are the interactive targets. Keyboard movement between them is not modelled by this pattern.
- **Rounded propagation** — The template pins `Rounded=true` on its nested Dropdown Menu; that panel in turn propagates its own `rounded` to every nested Menu Item row by default (see the Dropdown Menu subcomponent's behavior). A Dropdown built with `rounded=false` therefore rounds nothing anywhere in the stack without extra wiring, and `rounded=true` (the default) rounds panel and rows together.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Trigger Component | instance swap, prefers Button or Icon Button | The control the menu opens from. Swap it through the property rather than replacing the layer, and the instance stays exposed so the trigger's own properties remain reachable. |
| Dropdown Menu | exposed nested instance | The panel itself, pinned to Rounded=true. Exposed, so its More Items toggle and its slot are reachable from the template. See the Dropdown Menu Metadata frame. |
| Menu content | through the nested menu | Rows go into the menu's slot, not into the template. The template surfaces the Rounded=true slot, so anything placed here belongs to that variant of the menu. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Bounds | Hug the trigger only | 76×36px as drawn, the size of its trigger. The menu is absolutely positioned and sits outside those bounds, so a layout containing this pattern reserves no space for the open menu. |
| Offset | Fixed | The menu clears the trigger by 8px on whichever side Position selects. |
| Alignment | Fixed per Align | Align pins opposite edges together. With Position bottom or top the menu's leading or trailing edge lines up with the trigger's, with Position left or right its top or bottom edge does. |
| Fill and elevation | None on the template | The template paints nothing of its own. The surface and the shadow both belong to the menu. |

## Accessibility

- Open is a static variant, not a behaviour. Showing and hiding the menu, returning focus to the trigger and closing on escape all belong to the implementation.
- The menu sits outside the template's bounds, so nothing here stops it opening off-screen. Flipping Position near a viewport edge is the implementation's job.
- The trigger needs an accessible name and a state saying whether the menu is open. Neither is modelled here.
- Rows inside the menu are the interactive targets. Keyboard movement between them is not modelled by this pattern.

---
*Generated from `specs/dropdown` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
