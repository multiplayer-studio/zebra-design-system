---
name: Site Switcher
level: molecule
status: draft
composes: [../atoms/icon.md, ./dropdown-menu.md, ./menu-item.md, ./combobox.md]
tokens:
  # trigger
  site-switcher-trigger-background-enabled: '{colors.color-status-ghost-default}'
  site-switcher-trigger-background-hover: '{colors.color-status-ghost-faint}'
  site-switcher-trigger-background-pressed: '{colors.color-status-ghost-deep}'
  site-switcher-trigger-background-open: '{colors.color-status-ghost-tint}'
  site-switcher-trigger-transition: '{motion.motion-feedback}'
  site-switcher-trigger-border-color: '{colors.color-fill-transparent}'
  site-switcher-trigger-border-width: '{stroke.stroke-thin}'
  site-switcher-focus-ring-width: '{stroke.stroke-thick}'
  site-switcher-focus-ring-color: '{colors.color-line-focus}'
  site-switcher-trigger-radius-sharp: '{radius.radius-none}'
  site-switcher-trigger-radius-rounded: '{radius.radius-element-sm}'
  # text and icons
  site-switcher-name-font: '{typography.type-label-large}'
  site-switcher-name-foreground: '{colors.color-ink-high}'
  site-switcher-context-font: '{typography.type-body-xsmall}'
  site-switcher-context-foreground: '{colors.color-ink-medium}'
  site-switcher-icon-size: '{icon.icon-size-medium}'
  site-switcher-icon-foreground: '{colors.color-ink-high}'
  site-switcher-caret-size: '{icon.icon-size-small}'
  # sizes
  site-switcher-trigger-min-height: '{control.control-target-min}'
  site-switcher-trigger-max-width: '{primitives.scale-container-0}'
  site-switcher-trigger-padding-x: '{space.space-sm}'
  site-switcher-trigger-gap: '{space.space-xs}'
  site-switcher-text-gap: '{space.space-none}'
  site-switcher-panel-offset: '{dropdown-menu.dropdown-menu-panel-offset}'
---

# Site Switcher

> The control in the header that shows which tenant or site the person is working in, and switches it from the same spot.

## Anatomy
1. Trigger — a button at least `--site-switcher-trigger-min-height` tall and at most `--site-switcher-trigger-max-width` wide, padded `--site-switcher-trigger-padding-x` each side, parts `--site-switcher-trigger-gap` apart, on `--site-switcher-trigger-background-enabled` with a `--site-switcher-trigger-border-width` `--site-switcher-trigger-border-color` edge for forced colours:
   1. Icon — an [Icon](../atoms/icon.md) at `--site-switcher-icon-size` in `--site-switcher-icon-foreground`: `store` for a site, `building` for an organisation or tenant.
   2. Text — the current name in `--site-switcher-name-font` `--site-switcher-name-foreground`; with Show Context on, the level above it (the tenant over a site) on its own line above the name, in `--site-switcher-context-font` `--site-switcher-context-foreground`, `--site-switcher-text-gap` apart. A long name truncates in the middle, keeping its start and end, with the full name on hover and focus ([patterns 5.81](../patterns/05-sizes-devices.md), [patterns 5.30](../patterns/05-sizes-devices.md)).
   3. Caret — `expand_more` at `--site-switcher-caret-size`, `expand_less` while open.
2. Panel (open only) — `--site-switcher-panel-offset` below the trigger:
   - **menu**: a [Dropdown Menu](./dropdown-menu.md) of [Menu Items](./menu-item.md), one per place, the current one in its selected state with a trailing `check_mark`. Used while every place fits, up to fifteen.
   - **search**: a panel holding a [Combobox](./combobox.md) (strict, single, `search` leading icon, label "Find a site") whose list shows recent places first. Used past fifteen places, or sooner if they don't all fit ([patterns 3.16](../patterns/03-controls-interaction.md)), since menus never scroll.

## Variants
| Variant | Panel | Use |
|---|---|---|
| menu (default) | Dropdown Menu | up to fifteen places, while every place fits ([patterns 3.16](../patterns/03-controls-interaction.md)) |
| search | Combobox in a panel | past fifteen places, or fewer that don't fit without scrolling |
| read-only | none; no caret | the person belongs to one place: show it, don't offer a switch |

**Shape**: rounded (default) → `--site-switcher-trigger-radius-rounded`; sharp → `--site-switcher-trigger-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

The switcher follows its header's mode: inside the [Global Header](../organisms/global-header.md), which is locked to dark, it renders on the dark tokens automatically.

## States
| State | Background | Notes |
|---|---|---|
| enabled | `--site-switcher-trigger-background-enabled` | transparent |
| hover | `--site-switcher-trigger-background-hover` | pointer devices only |
| pressed | `--site-switcher-trigger-background-pressed` | over `--site-switcher-trigger-transition` |
| open | `--site-switcher-trigger-background-open` | the caret flips; the panel shows |
| focus | unchanged | `--site-switcher-focus-ring-width` `--site-switcher-focus-ring-color` ring outside the trigger |
| switching | unchanged | after a choice, the content rescopes in place; a busy indicator shows in the content, not the trigger |

Tints change over `--site-switcher-trigger-transition`; open and focus are instant.

## Spacing & Sizing
| Property | Value |
|---|---|
| Min height | `--site-switcher-trigger-min-height` |
| Max width | `--site-switcher-trigger-max-width`, then the name truncates in the middle |
| Padding (H) | `--site-switcher-trigger-padding-x` |
| Gap | `--site-switcher-trigger-gap` |
| Icon / caret | `--site-switcher-icon-size` / `--site-switcher-caret-size` |
| Panel offset | `--site-switcher-panel-offset` |

The trigger hugs its content up to its maximum width, so global controls are never pushed out ([patterns 5.81](../patterns/05-sizes-devices.md)). `--site-switcher-trigger-max-width` is a draft placeholder, to be confirmed in Figma. On compact screens the name stays visible (truncated); the switcher never collapses to its icon alone.

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | menu, search, read-only | menu |
| Level | site, tenant | site |
| Show Context | on / off | off |
| Shape | rounded, sharp | rounded |
| Current name, context, places | text | — |

## Usage
- Show the current tenant or site in the header whenever a person can belong to more than one, and switch from that same spot ([patterns 1.54](../patterns/01-screen-composition.md)).
- Switching keeps the person on the same screen, rescoped, unless that screen doesn't exist in the new place ([patterns 1.54](../patterns/01-screen-composition.md)).
- History doesn't cross a switch: after switching, Back stays in the new place. A link into another place switches to it and says so ([patterns 2.81](../patterns/02-navigation-flow.md)).
- Acting on a notification from another place switches to it first ([patterns 4.97](../patterns/04-states-feedback.md)).
- Use the search variant past fifteen places, or as soon as the list would scroll in a menu; list recent places first.
- Name places the way people say them; add the context line only where the same site name exists under several tenants.
- Commits that act across sites state their scope in the [Commit Bar](./commit-bar.md) ([patterns 1.140](../patterns/01-screen-composition.md)).

## Accessibility
- The trigger is a `button` with `aria-haspopup` (`menu` for the menu variant, `dialog` for search) and `aria-expanded`. Its name includes its job and the current place: "Site: Dock 3, change site".
- The current place is marked with `aria-current` or `aria-checked` in the panel, and by the check icon, not by tint alone.
- The full name is always the accessible name, and shows on hover and on focus when truncated.
- After a switch, announce it ("Now viewing Dock 3") through a polite live region, and keep focus on the trigger.
- Escape closes the panel and returns focus to the trigger.
- The read-only variant isn't a button; it's text with its icon, still announced as the current site.

## Claude Prompt
Draw a header control on a dark Global Header: a `store` icon, the near-white `--site-switcher-name-font` name "Dock 3 north" with a small grey "Contoso Retail" context line above it, and a small chevron-down, all inside a borderless trigger at least `--site-switcher-trigger-min-height` tall with `--site-switcher-trigger-radius-rounded` corners and a faint wash on hover. Open, it shows a floating menu below listing "Dock 1", "Dock 2", "Dock 3 north" (with a trailing check and a pale selected tint) and "Warehouse 7". Show a second copy where a long list opens a panel with a "Find a site" search field and recent sites first.
