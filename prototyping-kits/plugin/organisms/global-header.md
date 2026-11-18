---
name: Global Header
level: organism
status: stable
composes: [../atoms/icon-button.md, ../atoms/button.md, ../atoms/divider.md, ../molecules/search.md, ../atoms/avatar.md, ../molecules/dropdown-menu.md, ../atoms/icon.md, ../molecules/site-switcher.md, ../molecules/connection-status.md]
tokens:
  # container (locked to Dark mode)
  global-header-container-background: '{colors.color-fill-default}'
  global-header-container-border-color: '{colors.color-line-contrast}'
  global-header-container-border-width: '{stroke.stroke-thin}'
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
  global-header-profile-focus-ring-width: '{stroke.stroke-thick}'
  global-header-profile-focus-ring-color: '{colors.color-line-focus}'
  global-header-profile-label-foreground: '{colors.color-ink-high}'
  global-header-profile-label-foreground-disabled: '{colors.color-ink-disabled}'
  global-header-profile-label-font: '{typography.type-label-small}'
  global-header-profile-icon-size: '{icon.icon-size-small}'
---

# Global Header

> The bar across the top of an application: the product's identity at the leading edge, navigation and search in the middle, and the person's account at the trailing edge.

## Anatomy
1. Bar — one row on `--global-header-container-background`, sharp when it spans the screen edge to edge and rounded only when it floats inset (see Rounded below), padded `--global-header-container-padding` on every side, its three regions `--global-header-container-gap` apart. A `--global-header-container-border-width` border in `--global-header-container-border-color` (`--color-line-contrast`) sits on it: transparent in every mode except AAA, where it is a visible line (DESIGN.md §3 Theme modes).
2. Leading group (hugs) — `--global-header-leading-gap` apart:
   - Menu button — an [Icon Button](../atoms/icon-button.md), subtle, medium, hamburger glyph. Always present.
   - Brand mark — the Logo slot; the Zebra horizontal logo by default. Always drawn.
   - Platform name (optional) — the product's name in `--global-header-platform-name-font` `--global-header-platform-name-foreground`.
   - Site slot (optional) — a [Site Switcher](../molecules/site-switcher.md) showing the current organisation, site or tenant, and switching it from the same spot. Shown whenever the person can belong to more than one ([patterns 1.54](../patterns/01-screen-composition.md)).
3. Middle band (fills, packed to its trailing edge, `--global-header-middle-gap` apart):
   - Navigation region (MenuItems) — the Menu Items slot, `--global-header-menu-gap` between controls; ships with a subtle medium Icon Button and a subtle medium [Button](../atoms/button.md). It takes the spare width, so it's what absorbs a wider viewport.
   - Search (SearchBar) — a [Search](../molecules/search.md) at medium, its shape following Rounded, never wider than `--global-header-search-max-width`.
   - Action region (ActionMenu) — the Menu Actions slot, hugging its controls `--global-header-actions-gap` apart; ships with two subtle medium Icon Buttons. One or two actions at most ([patterns 1.43](../patterns/01-screen-composition.md)).
   - Connection slot (optional) — a [Connection Status](../molecules/connection-status.md) showing connected, offline, syncing, waiting to send or sync problem, with the last-synced time, for products that work offline or depend on a live link.
4. Account group (hugs, `--global-header-account-gap` apart):
   - Account control — a username in `--global-header-profile-label-font`, an [Avatar](../atoms/avatar.md) at xxsmall and an `expand_more` [Icon](../atoms/icon.md) at `--global-header-profile-icon-size`, `--global-header-profile-gap` apart, `--global-header-profile-height` tall, padded `--global-header-profile-padding-y` / `--global-header-profile-padding-x`. It's the trigger of a [Dropdown Menu](../molecules/dropdown-menu.md).
   - App switcher (optional) — an Icon Button, subtle, medium, fixed `apps` glyph.
5. Dividers (optional) — two vertical [Divider](../atoms/divider.md)s, one before the middle band and one after, stretching to the row height. One toggle shows both.

## Variants
Theme: the header is locked to Dark mode whatever the page's mode, and everything inside follows it. A project can override the mode on the header itself (for example Light on a dark product). In code, set `data-theme="dark"` on the header (override: `data-theme="light"`); its tokens then resolve in that mode, and AAA still applies when the page asks for it.

Rounded: on (default) → `--global-header-container-radius-rounded` on the bar, every nested control rounded, and `--global-header-profile-radius-rounded` on the account control; off → `--global-header-container-radius-sharp` on the bar, every nested control sharp, and `--global-header-profile-radius-sharp` on the account control. Set once on the bar; it carries into every control. Figma defaults to sharp; the system default is rounded. A header that spans the full width of the screen, edge to edge with no margin around it, is sharp (Rounded off); Rounded is only for a header that floats inset with a margin around it (DESIGN.md §5). In the AAA modes the component is always sharp (DESIGN.md §5).

## States
The header is static; hover, focus and press belong to the controls inside. Each region toggle takes the region out of the layout, so the rest close up. No transition is defined.

At narrow widths the header reduces in this order ([patterns 1.78](../patterns/01-screen-composition.md), [5.24](../patterns/05-sizes-devices.md)): the least-used actions move into an overflow menu, a subtle medium Icon Button (`more_vertical`) at the trailing end that opens a [Dropdown Menu](../molecules/dropdown-menu.md) where icon-only actions gain their labels; then Search becomes an Icon Button that opens search full screen ([patterns 1.56](../patterns/01-screen-composition.md)) and the platform name drops before the site slot does. The site slot, connection slot and account control never move into overflow. Below `--breakpoint-medium-min` (compact) the [Top App Bar](top-app-bar.md) replaces the Global Header (DESIGN.md §6).

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
| Search | medium, at most `--global-header-search-max-width` |
| Account control | `--global-header-profile-height` tall, hugs its width |

The end groups hug their content, so a longer product name or an extra action takes width from navigation. With navigation off, search sits next to the account group rather than in the centre.

## Properties
| Property | Options | Default |
|---|---|---|
| Rounded | on / off (off when the header spans the full width) | on |
| AppSwitcher | on / off | on |
| SearchBar | on / off | on |
| MenuItems (+ Menu Items slot) | on / off | off |
| ActionMenu (+ Menu Actions slot) | on / off | off |
| Dividers | on / off | off |
| Show Site Switcher | on / off | off |
| Show Connection Status | on / off | off |
| PlatformName | text | Platform Name |
| Show Platform Name | on / off | on |
| Logo slot | the product's mark | Zebra horizontal logo |
| Username | text | — |
| Avatar | any Avatar property, at xxsmall | — |
| Theme | dark, light (override on the header) | dark |

Show Logo exists in Figma but nothing is bound to it; the Logo slot is what varies the mark.

## Usage
- Keep it identical across every view ([patterns 1.41](../patterns/01-screen-composition.md)).
- Full width, edge to edge, means sharp: turn Rounded off. Use Rounded only when the header floats inset with a margin around it ([DESIGN.md §5](../DESIGN.md)).
- Set Rounded once on the header and let it carry; setting a nested control's shape separately is how a header ends up inconsistent.
- Keep PlatformName to the product's name; it doesn't change as people navigate.
- A slot only shows while its toggle is on: fill Menu Items with MenuItems on and Menu Actions with ActionMenu on.
- Don't lean on search to absorb a wider viewport; it holds its width, and navigation grows instead.
- Use Dividers where the regions hold enough to blur together.
- Drop the app switcher in a single-product app; there's nothing to switch to.

## Accessibility
- The header is a `header` landmark (banner) and the navigation region inside it needs its own named `nav` ([patterns 6.52](../patterns/06-accessibility.md)).
- The overflow Icon Button is named ("More actions") and reports `aria-haspopup="menu"` and `aria-expanded`.
- Every Icon Button is glyph-only, so the menu button, app switcher and trailing actions each need an accessible name.
- The account control is a menu trigger: name it with the person it represents, and expose `aria-haspopup="menu"` and `aria-expanded`.
- Focus is the only state that draws a border on the account control (`--global-header-profile-focus-ring-color`), so never suppress it.
- Locked to Dark, the header keeps its contrast whatever the page does; check custom logos against `--global-header-container-background` in Dark and AAA Dark.

## Claude Prompt
Draw a full-width near-black application header (`--global-header-container-background` in Dark mode) with `--global-header-container-padding` padding and square corners (`--global-header-container-radius-sharp`), since it runs edge to edge, with every control inside sharp too. On the left: a white hamburger icon button, a small white Zebra logo, and the product name "Fulfilment Hub" in `--global-header-platform-name-font` white (`--global-header-platform-name-foreground`). In the middle, right-aligned: a dark search field with a thin grey outline, at most `--global-header-search-max-width` wide, and two small white icon buttons (alerts, help). On the right: an account control with the user's name in `--global-header-profile-label-font`, a tiny round avatar and a down chevron, then a grid app-switcher icon. Where the person works across sites, a site switcher showing "Memphis DC" with a chevron sits after the product name, and a small connection status (a cloud icon while connected, "Offline" when not) sits before the account control. Everything is vertically centred in one row a medium control tall.
