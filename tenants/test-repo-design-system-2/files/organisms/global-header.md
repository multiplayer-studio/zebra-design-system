---
name: Global Header
level: organism
status: stable
composes: [../atoms/icon-button.md, ../atoms/button.md, ../atoms/divider.md, ../molecules/search.md, ../atoms/avatar.md, ../molecules/dropdown-menu.md, ../atoms/icon.md]
tokens:
  # container (locked to Dark mode)
  global-header-container-background: '{colors.color-fill-default}'
  global-header-container-border-color: '{colors.color-line-default}'
  global-header-container-border-width: '{stroke.stroke-base}'
  global-header-container-padding: '{space.space-sm}'
  global-header-container-gap: '{space.space-gutter}'
  global-header-container-radius-sharp: '{radius.radius-none}'
  global-header-container-radius-rounded: '{radius.radius-element-sm}'
  # regions
  global-header-leading-gap: '{space.space-gutter}'
  global-header-middle-gap: '{space.space-sm}'
  global-header-menu-gap: '{space.space-3xs}'
  global-header-actions-gap: '{space.space-3xs}'
  global-header-account-gap: '{space.space-gutter}'
  global-header-search-max-width: '{component-sizes.size-global-header-search-max-width}'
  # platform name
  global-header-platform-name-foreground: '{colors.color-ink-high}'
  global-header-platform-name-font: '{typography.type-title-medium}'
  # account control
  global-header-profile-height: '{control.control-md}'
  global-header-profile-padding-y: '{space.space-2xs}'
  global-header-profile-padding-x: '{space.space-sm}'
  global-header-profile-gap: '{space.space-2xs}'
  global-header-profile-radius-sharp: '{radius.radius-none}'
  global-header-profile-radius-rounded: '{radius.radius-sm}'
  global-header-profile-background-enabled: '{colors.color-fill-default}'
  global-header-profile-background-hover: '{colors.color-fill-faint}'
  global-header-profile-background-pressed: '{colors.color-fill-sunken}'
  global-header-profile-background-focused: '{colors.color-fill-default}'
  global-header-profile-background-disabled: '{colors.color-fill-disabled}'
  global-header-profile-border-color: '{colors.color-line-default}'
  global-header-profile-border-color-disabled: '{colors.color-line-subtle}'
  global-header-profile-border-width: '{stroke.stroke-base}'
  global-header-profile-focus-ring-width: '{stroke.stroke-thin}'
  global-header-profile-focus-ring-color: '{colors.color-line-focus}'
  global-header-profile-label-foreground: '{colors.color-ink-high}'
  global-header-profile-label-foreground-disabled: '{colors.color-ink-disabled}'
  global-header-profile-label-font: '{typography.type-label-small}'
  global-header-profile-icon-size: '{icon.icon-size-small}'
---

# Global Header

> The bar across the top of an application: the product's identity at the leading edge, navigation and search in the middle, and the person's account at the trailing edge.

## Anatomy
1. Bar — one row on `--global-header-container-background`, padded `--global-header-container-padding` on every side, its three regions `--global-header-container-gap` apart. A `--global-header-container-border-color` stroke sits on it at `--global-header-container-border-width` (zero): a theming hook a high-contrast theme can thicken.
2. Leading group (hugs) — `--global-header-leading-gap` apart:
   - Menu button — an [Icon Button](../atoms/icon-button.md), subtle, medium, hamburger glyph. Always present.
   - Brand mark — the Logo slot; the Zebra horizontal logo by default. Always drawn.
   - Platform name (optional) — the product's name in `--global-header-platform-name-font` `--global-header-platform-name-foreground`.
3. Middle band (fills, packed to its trailing edge, `--global-header-middle-gap` apart):
   - Navigation region (MenuItems) — the navigation items, `--global-header-menu-gap` between controls. Each item is a subtle medium [Button](../atoms/button.md) (a subtle medium Icon Button when the item is icon-only). It takes the spare width, so it's what absorbs a wider viewport. When items don't fit, a subtle medium `more_horizontal` Icon Button at the end of the region opens a [Dropdown Menu](../molecules/dropdown-menu.md) holding the overflowed items as Menu Items (see Responsiveness).
   - Search (SearchBar) — a [Search](../molecules/search.md) at medium, its shape following Rounded, at `--global-header-search-max-width`. Collapsed, it is a subtle medium `search` Icon Button that opens the search row (6).
   - Action region (ActionMenu) — the Menu Actions slot, hugging its controls `--global-header-actions-gap` apart; ships with two subtle medium Icon Buttons.
4. Account group (hugs, `--global-header-account-gap` apart):
   - Account control — a username in `--global-header-profile-label-font`, an [Avatar](../atoms/avatar.md) at xxsmall and an `expand_more` [Icon](../atoms/icon.md) at `--global-header-profile-icon-size`, `--global-header-profile-gap` apart, `--global-header-profile-height` tall, padded `--global-header-profile-padding-y` / `--global-header-profile-padding-x`. It's the trigger of a [Dropdown Menu](../molecules/dropdown-menu.md).
   - App switcher (optional) — an Icon Button, subtle, medium, fixed `apps` glyph.
5. Dividers (optional) — two vertical [Divider](../atoms/divider.md)s, one before the middle band and one after, stretching to the row height. One toggle shows both.
6. Search row (collapsed search only) — a full-width row under the bar, inside the header and on the same background, padded `--global-header-container-padding` on the sides and bottom. It holds a medium Search filling the row and a subtle medium `close` Icon Button, `--global-header-middle-gap` apart.

## Variants
Theme: the header is locked to Dark mode whatever the page's mode, and everything inside follows it. A project can override the mode on the header itself (for example Light on a dark product). In code, set `data-theme="dark"` on the header (override: `data-theme="light"`); its tokens then resolve in that mode, and AAA still applies when the page asks for it.

Rounded: on (default) → `--global-header-container-radius-rounded` on the bar, every nested control rounded, and `--global-header-profile-radius-rounded` on the account control; off → `--global-header-container-radius-sharp` on the bar, every nested control sharp, and `--global-header-profile-radius-sharp` on the account control. Set once on the bar; it carries into every control. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
The header is static; hover, focus and press belong to the controls inside. Each region toggle takes the region out of the layout, so the rest close up. No transition is defined.

Account control:

| State | Background | Label and chevron | Border |
|---|---|---|---|
| enabled | `--global-header-profile-background-enabled` | `--global-header-profile-label-foreground` | `--global-header-profile-border-color` at `--global-header-profile-border-width` |
| hover | `--global-header-profile-background-hover` | unchanged | as enabled |
| pressed | `--global-header-profile-background-pressed` | unchanged | as enabled |
| focused | `--global-header-profile-background-focused` | unchanged | `--global-header-profile-focus-ring-width` `--global-header-profile-focus-ring-color`: the only visible border |
| disabled | `--global-header-profile-background-disabled` | `--global-header-profile-label-foreground-disabled` | `--global-header-profile-border-color-disabled`; not interactive |

Open, the account control shows its Dropdown Menu; the menu's behaviour is its own.

## Spacing & Sizing
| Part | Value |
|---|---|
| Bar | fills the width; `--global-header-container-padding` on every side; the content row is one medium control tall |
| Region gap | `--global-header-container-gap` |
| Leading / account gaps | `--global-header-leading-gap` / `--global-header-account-gap` |
| Middle band | `--global-header-middle-gap`; navigation `--global-header-menu-gap`; actions `--global-header-actions-gap` |
| Search | medium, `--global-header-search-max-width` wide; collapsed, a medium Icon Button (see Responsiveness) |
| Account control | `--global-header-profile-height` tall, hugs its width |

The end groups hug their content, so a longer product name or an extra action takes width from navigation. With navigation off, search sits next to the account group rather than in the centre.

## Responsiveness
The header adapts to its **own width**, not the viewport, from wide desktop down to phone, and is used on every screen size in this project. It is content-driven: there are no breakpoints. When the bar's content no longer fits its width, the header steps down one collapse level; when the width grows back to what the previous level needed, it steps back up. Levels collapse in this order and restore in reverse:

| Level | What changes | Still shown |
|---|---|---|
| 0 | everything fits | all enabled regions |
| 1 | navigation items move, last first, one at a time, into the `more` Dropdown Menu; the `more` Icon Button appears with the first overflowed item | remaining navigation items, `more` |
| 2 | search collapses to the `search` Icon Button | — |
| 3 | platform name hides | — |
| 4 | username hides (the account control shows avatar and chevron only); the app switcher and both dividers hide | menu button, logo, `more` (if there are navigation items), `search` toggle, Menu Actions, account control |

- Each level is only taken once the previous one is exhausted: level 2 starts after every navigation item has overflowed.
- A level comes back only when the header is at least as wide as the content needed at that level when it was collapsed, so it never flickers at the threshold.
- Menu Actions never collapse. Logo, menu button and account control are always shown.
- The search row opens from the `search` toggle (`aria-expanded` on the toggle) with focus in its field. Escape or the close button closes it and returns focus to the toggle. If the header widens back past level 2 while the row is open, the row closes and the inline Search returns with the same query, keeping focus if the row had it.
- Regions toggled off by their property take no part: a header with no navigation items starts collapsing at level 2.
- No transition: levels switch instantly.

## Properties
| Property | Options | Default |
|---|---|---|
| Rounded | on / off | on |
| AppSwitcher | on / off | on |
| SearchBar | on / off | on |
| MenuItems | list of navigation items: label, optional icon, icon-only, current, action | none (region off) |
| ActionMenu (+ Menu Actions slot) | on / off | off |
| Dividers | on / off | off |
| PlatformName | text | Platform Name |
| Show Platform Name | on / off | on |
| Logo slot | the product's mark | Zebra horizontal logo |
| Username | text | — |
| Avatar | any Avatar property, at xxsmall | — |
| Theme | dark, light (override on the header) | dark |

Show Logo exists in Figma but nothing is bound to it; the Logo slot is what varies the mark.

## Usage
- Keep it identical across every view; it anchors people in the application.
- Set Rounded once on the header and let it carry; setting a nested control's shape separately is how a header ends up inconsistent.
- Keep PlatformName to the product's name; it doesn't change as people navigate.
- The Menu Actions slot only shows while ActionMenu is on. The navigation region only shows when it has items.
- Order navigation items by importance: the last item overflows first.
- Keep Menu Actions to the few that matter on a phone; they never collapse.
- Don't lean on search to absorb a wider viewport; it holds its width, and navigation grows instead.
- Use Dividers where the regions hold enough to blur together.
- Drop the app switcher in a single-product app; there's nothing to switch to.

## Accessibility
- The header is a `header` landmark (banner) and the navigation region inside it needs its own `nav` with a name.
- Every Icon Button is glyph-only, so the menu button, app switcher, `more` button, `search` toggle, search-row close and trailing actions each need an accessible name. Icon-only navigation items use their label as the accessible name.
- The current navigation item carries `aria-current="page"` in the bar, and is the selected Menu Item (with `aria-current`) in the `more` menu.
- Collapsing never removes a function: overflowed items stay reachable in `more`, search in the search row, and the username in the account control's accessible name.
- The account control is a menu trigger: name it with the person it represents, and expose `aria-haspopup="menu"` and `aria-expanded`.
- Focus is the only state that draws a border on the account control (`--global-header-profile-focus-ring-color`), so never suppress it.
- Locked to Dark, the header keeps its contrast whatever the page does; check custom logos against `--global-header-container-background` in Dark and AAA Dark.

## Claude Prompt
Draw a full-width near-black application header (`--global-header-container-background` in Dark mode) with `--global-header-container-padding` padding and softly rounded corners (`--global-header-container-radius-rounded`), with every control inside rounded too. On the left: a white hamburger icon button, a small white Zebra logo, and the product name "Fulfilment Hub" in `--global-header-platform-name-font` white (`--global-header-platform-name-foreground`). In the middle, right-aligned: a dark search field with a thin grey outline, at most `--global-header-search-max-width` wide, and two small white icon buttons (alerts, help). On the right: an account control with the user's name in `--global-header-profile-label-font`, a tiny round avatar and a down chevron, then a grid app-switcher icon. Everything is vertically centred in one row a medium control tall.
