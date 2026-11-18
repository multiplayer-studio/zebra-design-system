---
name: Breadcrumb
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/icon-button.md, ./dropdown-menu.md]
tokens:
  # crumb
  breadcrumb-crumb-label-foreground-enabled: '{colors.color-ink-medium}'
  breadcrumb-crumb-label-foreground-hover: '{colors.color-ink-link}'
  breadcrumb-crumb-label-foreground-current: '{colors.color-ink-high}'
  breadcrumb-crumb-icon-foreground: '{colors.color-ink-high}'
  breadcrumb-separator-foreground: '{colors.color-ink-high}'
  # accent
  breadcrumb-accent-crumb-label-foreground-current: '{colors.color-ink-link}'
  breadcrumb-accent-crumb-icon-foreground-current: '{colors.color-ink-link}'
  # focus
  breadcrumb-focus-ring-width: '{stroke.stroke-thick}'
  breadcrumb-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  breadcrumb-container-gap: '{space.space-md}'
  breadcrumb-container-row-gap: '{space.space-2xs}'
  breadcrumb-crumb-gap: '{space.space-sm}'
  breadcrumb-crumb-radius: '{radius.radius-sm}'
  breadcrumb-crumb-label-font: '{typography.type-body-medium}'
  breadcrumb-crumb-icon-size: '{icon.icon-size-small}'
  breadcrumb-separator-size: '{icon.icon-size-small}'
  breadcrumb-menu-offset: '{space.space-sm}'
---

# Breadcrumb

> Shows where a page sits in the hierarchy, as a trail of links ending on the current page; a long trail collapses its middle into an overflow menu.

## Anatomy
1. Crumb — a link back up one level: an optional leading [Icon](../atoms/icon.md) at `--breadcrumb-crumb-icon-size` and a `--breadcrumb-crumb-label-font` label, `--breadcrumb-crumb-gap` apart. The label is the only required part.
2. Separator — a `chevron_right` [Icon](../atoms/icon.md) at `--breadcrumb-separator-size` after every crumb but the last. Decorative.
3. Overflow control (collapsed only) — an [Icon Button](../atoms/icon-button.md), small, outline-subtle, `more_horizontal`, standing in for the hidden middle crumbs. Its shape follows Shape.
4. Overflow menu (open only) — a [Dropdown Menu](./dropdown-menu.md) with Compact on (a placement exception, [patterns 5.48](../patterns/05-sizes-devices.md)) and Rounded following Shape, `--breadcrumb-menu-offset` below the control and left aligned. Each hidden crumb is a [Menu Item](./menu-item.md) row, with its icon if it has one.
5. Current page — the last item. Text, never a link.

## Variants
Flavour:

| Flavour | Current page label | Current page icon |
|---|---|---|
| default | `--breadcrumb-crumb-label-foreground-current` | `--breadcrumb-crumb-icon-foreground` |
| accent | `--breadcrumb-accent-crumb-label-foreground-current` | `--breadcrumb-accent-crumb-icon-foreground-current` |

Use accent only where the trail needs to stand out.

Collapsed: with maxItems set and a longer trail, the first crumb stays, then maxItems − 1 from the end; the rest move to the overflow menu in order. A collapsed trail stands at the Icon Button's small height, so it is taller than a full one.

Shape: rounded (default) or sharp. It reaches only the overflow control and its menu; the crumbs are text and don't change. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Label | Icon | Notes |
|---|---|---|---|
| default | `--breadcrumb-crumb-label-foreground-enabled` | `--breadcrumb-crumb-icon-foreground` | |
| hover | `--breadcrumb-crumb-label-foreground-hover` | unchanged | pointer devices only |
| focus | unchanged | unchanged | `--breadcrumb-focus-ring-width` `--breadcrumb-focus-ring-color` ring around the crumb, `--breadcrumb-crumb-radius` corners |
| current | per flavour | per flavour | derived from being last; no link, no hover |

The separator is `--breadcrumb-separator-foreground` in every state. The overflow control's hover, pressed and focus are the Icon Button's own; activating it opens the menu and it reports itself expanded. No transition is defined: crumbs change colour at once. Choosing a menu row follows that crumb's link and closes the menu.

## Spacing & Sizing
| Property | Value |
|---|---|
| Crumbs and separators | in a row, `--breadcrumb-container-gap` apart |
| Wrapped lines | `--breadcrumb-container-row-gap` apart |
| Icon to label | `--breadcrumb-crumb-gap` |
| Label font | `--breadcrumb-crumb-label-font` |
| Icon / separator | `--breadcrumb-crumb-icon-size` / `--breadcrumb-separator-size` |
| Crumb radius (focus ring) | `--breadcrumb-crumb-radius` |
| Overflow menu offset | `--breadcrumb-menu-offset` |

The trail hugs its content. A long trail wraps; the separator stays at the end of a line, so every line starts on a crumb. Figma draws one line.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | default, accent | default |
| Shape | rounded, sharp | rounded |
| items | the path, root first; each takes label, href, icon, onSelect | — |
| maxItems | number, minimum 2; unset shows every crumb | unset |
| label | accessible name of the trail | Breadcrumb |
| overflowLabel | accessible name of the overflow control | Show hidden pages |
| portalContainer | where the overflow menu mounts, when the theme is scoped below the body | — |

Collapsed and Open are Figma-only: Collapsed derives from maxItems and Open from the menu. Show Icon and Show Separator are also Figma-only; in code a crumb shows its icon when it has one and the separator renders after every crumb but the last. The trail in Figma is sample content.

## Usage
- Use a breadcrumb on pages more than one level deep, with the root first, above the page title on expanded screens. On compact screens it gives way to Back ([patterns 1.51](../patterns/01-screen-composition.md)).
- The trail follows the structure, not the path the person took, and each crumb opens its level as it was left ([patterns 2.78](../patterns/02-navigation-flow.md)).
- Keep labels short; the trail should read as one line. A long crumb label (a name someone created) may truncate at the end, with the full text on hover and focus ([patterns 5.30](../patterns/05-sizes-devices.md)).
- Set maxItems wherever the trail could outgrow its row.
- Don't use it for steps in a flow: [Stepper](../organisms/stepper.md) is for a sequence, a breadcrumb for a place.
- The current page is last and is never a link, even when it has an href ([patterns 2.78](../patterns/02-navigation-flow.md)).
- Use accent sparingly; default suits nearly every page.

## Accessibility
- Render a labelled `nav` holding an ordered list ([patterns 6.52](../patterns/06-accessibility.md)). The last item carries `aria-current="page"`.
- Separators are hidden from assistive tech.
- The overflow control has no visible text, so overflowLabel names it. Opening the menu moves focus to its rows; arrow keys move through them; Escape closes it and returns focus to the control.
- Hover is colour alone, so keyboard users rely on the focus ring (`--breadcrumb-focus-ring-width` `--breadcrumb-focus-ring-color`).
- Label crumbs so they make sense read on their own.

## Claude Prompt
Draw a single-line breadcrumb trail in `--breadcrumb-crumb-label-font`: a small `--breadcrumb-crumb-icon-size` near-black location icon followed by "Sites", then small near-black chevron-right separators (`--breadcrumb-separator-foreground`) `--breadcrumb-container-gap` from each crumb, between mid-grey (`--breadcrumb-crumb-label-foreground-enabled`) labels "North America", "Warehouse 12", "Receiving", ending on the current page "Dock 4" in near-black (`--breadcrumb-crumb-label-foreground-current`). A hovered crumb turns link blue (`--breadcrumb-crumb-label-foreground-hover`). In a collapsed copy, a small square outlined button with a three-dot icon replaces the middle crumbs, and below it a compact white menu with a soft shadow lists the hidden levels.
