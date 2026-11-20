# Global Header

> The bar across the top of an application, carrying the product’s identity at the leading edge, navigation and search in the middle, and the person’s account at the trailing edge. Most of what it holds is optional: the app switcher, the search bar, the two menu regions and the dividers each turn on independently, so one component covers a bare branded bar and a fully loaded one. Rounded is set once and carries into every control nested inside it.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-global-header>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `rounded` | boolean | `false` |  |  |
| `appSwitcher` | boolean | `true` |  |  |
| `searchBar` | boolean | `true` |  |  |
| `menuItems` | boolean | `false` |  |  |
| `menuItemsSlot` | slot |  |  |  |
| `actionMenu` | boolean | `false` |  |  |
| `actionMenuSlot` | slot |  |  |  |
| `dividers` | boolean | `false` |  |  |
| `platformName` | string | `Platform Name` |  |  |
| `showPlatformName` | boolean | `true` |  |  |
| `showLogo` | boolean | `true` |  |  |
| `logoSlot` | slot |  |  |  |
| `mode` | enum | `dark` |  |  |

## When and how to use

### Do

- Set Rounded once on the header and let it carry. Every control inside follows it, so the bar stays consistent without touching each one.
- Keep PlatformName to the product's name. It sits beside the mark as identity and should not change as a person moves around the product.

### Don't

- Don't fill a menu slot and leave its toggle off. Slot-Menu-Items and Slot-Menu-Actions only appear when MenuItems and ActionMenu are on.
- Don't lean on search to absorb a wider viewport. It stops at a maximum 280, so the navigation region is the part that grows.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Rounded | The Rounded value |  |
| Account control | _User Profile State |  |
| Menu open | The dropdown Open value |  |
| Region visibility | AppSwitcher, SearchBar, MenuItems, ActionMenu, Dividers |  |

## Behaviour

- **Motion** — No transition is defined. Regions appear and disappear with their toggles, and nothing animates the change.
- **Width** — The bar holds a fixed width, with the middle band filling whatever the two end groups leave. Those groups hug their content, so a longer product name or an extra action takes width away from navigation.
- **Middle alignment** — The middle band packs its content to its trailing edge. With navigation off, search sits next to the account group rather than in the centre of the bar.
- **Shape propagation** — Rounded is set once on the bar and carried into every nested control. Setting a nested control’s own shape separately is the one place a consumer can leave the header inconsistent with itself.
- **Border theming** — A stroke bound to border/default sits on the bar at zero weight, and the nested controls carry the same arrangement. The weight is a theming hook, so a high contrast variable set can give the bar and everything in it a hard outline.
- **Mode** — Frozen in dark whatever the page mode. An override set on the header itself is the only exception.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Brand mark | Slot Logo, consumer owned | Takes the product’s mark at the leading edge. The content sitting in it by default is _Brand Logo Horizontal, which filling the slot replaces. |
| Product name | PlatformName, text | Consumer owned, and the only text the header itself takes in. |
| Navigation | Slot-Menu-Items, consumer owned | Takes the navigation controls. The content in it by default is one Icon Button and one Button, both subtle and medium, which is the pairing the region is spaced for. |
| Trailing actions | Slot-Menu-Actions, consumer owned | Takes icon actions after search. The content in it by default is two Icon Buttons at the same size and flavour. |
| Search | Search, parent owned | Held at medium with its shape following Rounded. It comes from a separate library rather than this file, so it has no frame here. |
| App switcher | Icon Button, parent owned | An Apps glyph on a subtle medium Icon Button. The glyph is fixed, so this is a product switcher rather than a general purpose action. |
| Menu button | Icon Button, parent owned | A Hamburger glyph at the leading edge. It carries no visibility toggle, so it is always present. |
| Account control | _User Profile, parent owned | A username, an avatar and a chevron, wired as the trigger of Template/Dropdown. Neither the username nor the avatar is exposed as an input. |
| Dividers | Divider, parent owned | Two vertical hairlines shown together by one toggle. They stretch to the height of the content row. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Filled width, hug height | 100% wide and 56 tall on both variants, with the content row inside standing at control/md. |
| Direction | Row | Leading group, middle band and account group on one line, space/gutter apart, with space/sm padding on every side of the bar. |
| Leading group | Hug | space/gutter between the menu button, the brand mark and the product name. |
| Middle band | Fill | Takes the width the two end groups leave, spaces its children space/sm apart, and packs them to its trailing edge. |
| Navigation region | Fill | Takes the width spare inside the middle band, with space/3xs between its controls. |
| Action region | Hug | Hugs its controls with space/3xs between them, which is why it never takes width from search. |
| Search | Set to medium | Its shape follows Rounded and its size is held at medium. The header gives it a maximum 280 and no fixed width. Below that it fills the spare width, so it gives way before it can overlap a neighbour. |
| Account group | Hug | space/gutter between the account control and the app switcher. |
| Controls | Set per variant | The icon buttons are set to medium and subtle. The account control is control/md tall and hugs its width, padded space/2xs and space/sm with space/2xs between its parts. |
| Radius | Per Rounded | radius/none throughout when false. When true the bar takes radius/element-sm and every nested control is set to its rounded shape, while the account control takes radius/sm. |
| Surface | Tokenised | surface/section on the bar. The icon buttons are set to the subtle flavour, and the account control carries the neutral interactive backgrounds. |
| Text | Tokenised | The product name is title/medium in foreground/primary. The username is label/small, dropping to interactive/ghost/foreground/disabled when the account control is disabled. |
| Account states | Per State | interactive/neutral/background at default, hover, pressed, focused and disabled. focus adds a border/focus stroke at 1 wide, and every other state carries interactive/neutral/border/default at zero weight. |
| Dividers | Fill height | Set to vertical and stretching to the height of the content row. The two of them appear together. |
| Theme/Mode | Frozen in Dark Mode | The global header is frozen in dark mode irrespective of the page mode, except a mode override is set on the global header itself. |

## Accessibility

- The header is a landmark rather than a control, so it takes its role and its name from the page around it, and the navigation region inside it needs one of its own.
- Every control in the bar carries a glyph and no visible label, so the menu button, the app switcher and the trailing actions each need an accessible name supplied where they are placed.
- The account control is a dropdown trigger, so it has to announce both the person it represents and the fact that it opens a menu.
- Focus is the only state on that control that draws a visible border, which makes the border/focus outline the one thing a keyboard user has to locate it by.

---
*Generated from `specs/global-header` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
