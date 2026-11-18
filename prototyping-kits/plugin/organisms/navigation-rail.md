---
name: Navigation Rail
level: organism
status: stable
composes: [../molecules/navigation-header.md, ../molecules/sub-menu-item.md, ../atoms/icon-button.md, ../atoms/button.md, ../atoms/divider.md, ../atoms/notification-indicator.md, ../atoms/icon.md]
tokens:
  # container (locked to Dark mode)
  navigation-rail-container-background: '{colors.color-fill-default}'
  navigation-rail-container-padding-x: '{space.space-md}'
  navigation-rail-container-padding-y: '{space.space-md}'
  navigation-rail-container-gap: '{space.space-md}'
  navigation-rail-container-width-expanded: '{component-sizes.size-navigation-rail-width-expanded}'
  navigation-rail-container-transition: '{motion.motion-smooth}'
  navigation-rail-list-gap: '{space.space-2xs}'
  navigation-rail-slot-padding-x: '{space.space-2xs}'
  # sub menu panel
  navigation-rail-submenu-border-width: '{stroke.stroke-thin}'
  navigation-rail-submenu-border-color: '{colors.color-line-default}'
  navigation-rail-submenu-min-width: '{primitives.scale-container-0}'
  navigation-rail-submenu-padding: '{space.space-sm}'
  navigation-rail-submenu-gap: '{space.space-2xs}'
  # sub menu header
  navigation-rail-submenu-header-min-height: '{control.control-lg}'
  navigation-rail-submenu-header-padding-x: '{space.space-lg}'
  navigation-rail-submenu-header-gap: '{space.space-md}'
  navigation-rail-submenu-header-gap-sub-page: '{space.space-sm}'
  navigation-rail-submenu-header-actions-gap: '{space.space-2xs}'
  navigation-rail-submenu-header-title-foreground: '{colors.color-ink-high}'
  navigation-rail-submenu-header-title-font: '{typography.type-label-medium}'
  navigation-rail-submenu-header-icon-size: '{icon.icon-size-medium}'
  # rail item
  navigation-rail-item-background-enabled: '{colors.color-status-ghost-default}'
  navigation-rail-item-background-hover: '{colors.color-status-ghost-faint}'
  navigation-rail-item-background-pressed: '{colors.color-status-ghost-deep}'
  navigation-rail-item-background-selected: '{colors.color-status-ghost-default}'
  navigation-rail-item-background-disabled: '{colors.color-status-ghost-default}'
  navigation-rail-item-foreground: '{colors.color-ink-high}'
  navigation-rail-item-foreground-selected: '{colors.color-ink-brand}'
  navigation-rail-item-foreground-disabled: '{colors.color-ink-disabled}'
  navigation-rail-item-radius-rounded: '{radius.radius-sm}'
  navigation-rail-item-radius-sharp: '{radius.radius-none}'
  navigation-rail-item-min-size: '{control.control-lg}'
  navigation-rail-item-padding-y: '{space.space-sm}'
  navigation-rail-item-padding-x: '{space.space-2xs}'
  navigation-rail-item-padding-x-expanded: '{space.space-lg}'
  navigation-rail-item-gap-expanded: '{space.space-lg}'
  navigation-rail-item-label-font: '{typography.type-indicator-small}'
  navigation-rail-item-label-font-expanded: '{typography.type-label-medium}'
  navigation-rail-item-icon-size: '{icon.icon-size-small}'
  navigation-rail-item-badge-offset-x: '{space.space-md}'
  navigation-rail-item-badge-offset-y: '{space.space-neg-md}'
  navigation-rail-item-selection-width: '{stroke.stroke-thick}'
  navigation-rail-item-selection-color: '{colors.color-line-selection}'
  # focus
  navigation-rail-focus-ring-width: '{stroke.stroke-thick}'
  navigation-rail-focus-ring-color: '{colors.color-line-focus}'
---

# Navigation Rail

> A vertical navigation column for the leading edge from medium widths up: a narrow or wide icon rail, plus an optional sub menu panel for second-level destinations. Two levels at most.

## Anatomy
1. Main rail — the icon column on `--navigation-rail-container-background`, padded `--navigation-rail-container-padding-y` top and bottom and `--navigation-rail-container-padding-x` left and right, with `--navigation-rail-container-gap` between its four blocks:
   - Header — a [Navigation Header](../molecules/navigation-header.md) (Type avatar; its icon button shows Settings by default). Fixed nested instance, not a slot.
   - Header action (optional) — the product's one main create or compose action, not a destination ([patterns 2.14](../patterns/02-navigation-flow.md)): a primary large [Icon Button](../atoms/icon-button.md) in the narrow rail, a primary large [Button](../atoms/button.md) in the wide one. It's one Button whose label shrinks away, so its glyph stays centred when narrow.
   - Menu list — three built-in rail items, then the Menu Slot (more rail items, usually opening with a [Divider](../atoms/divider.md)). It takes whatever height is left, so the footer stays pinned to the bottom.
   - Footer — the Footer Slot, then two fixed items. The last is the toggle (`left_panel_open` / `left_panel_close`) that switches between narrow and wide.
2. Rail item — one destination: an [Icon](../atoms/icon.md) at `--navigation-rail-item-icon-size` in a box that doesn't clip, a label, an optional badge, and a selection mark when selected: a `--navigation-rail-item-selection-width` bar in `--navigation-rail-item-selection-color` along the item's leading edge, inside its bounds, so selection shows by shape as well as colour ([patterns 6.11](../patterns/06-accessibility.md)). The badge is a [Notification Indicator](../atoms/notification-indicator.md) at its small (dot) size, placed `--navigation-rail-item-badge-offset-x` / `--navigation-rail-item-badge-offset-y` against the glyph box so it overhangs the top-right corner, outside the layout.
3. Sub menu (optional) — the panel beside the rail, the only stroked edge: a `--navigation-rail-submenu-border-width` `--navigation-rail-submenu-border-color` border on its leading side. It holds:
   - Sub Menu Header — a title bar with a bottom border of the same width and colour, `--navigation-rail-submenu-header-padding-x` side padding, at least `--navigation-rail-submenu-header-min-height` tall. An optional leading glyph (`--navigation-rail-submenu-header-icon-size`) and the title in `--navigation-rail-submenu-header-title-font` `--navigation-rail-submenu-header-title-foreground`, `--navigation-rail-submenu-header-gap` apart; the sub page type replaces the glyph with a back Icon Button (subtle, small, `arrow_back`) at `--navigation-rail-submenu-header-gap-sub-page`. A trailing actions slot holds a Button (text, small), `--navigation-rail-submenu-header-actions-gap` between controls.
   - Sub Menu Slot — [Sub Menu Item](../molecules/sub-menu-item.md) rows and Collapsible Menu Items, inset `--navigation-rail-submenu-padding` with `--navigation-rail-submenu-gap` between them.

The rail is the first level and the sub menu the second. Collapsible Menu Items only group second-level rows; there is never a third level of destinations in the panel. A third level moves into the content, as a list column or tabs ([patterns 2.3](../patterns/02-navigation-flow.md)). The sub page header type is not a way to add one.

## Variants
| Expanded | Width | Rail item | Label | Header action |
|---|---|---|---|---|
| false (default) | hugs one item plus padding | glyph in a square target, `--navigation-rail-item-padding-x` sides, no gap | hidden unless Label on: under the glyph in `--navigation-rail-item-label-font` | Icon Button |
| true | `--navigation-rail-container-width-expanded` (Rail Width) | glyph and label in a row, `--navigation-rail-item-padding-x-expanded` sides, `--navigation-rail-item-gap-expanded` gap, fills the rail | always shown, `--navigation-rail-item-label-font-expanded` | Button |

Label (narrow rail only) adds a caption under each glyph; the column stays narrow, so captions wrap to two lines and the item grows taller.

Theme: the rail is locked to Dark mode whatever the page's mode, and everything inside follows it (brand extensions still apply). Inverse shows it in Light mode instead, still regardless of the page. In code, set `data-theme="dark"` on the rail (Inverse: `data-theme="light"`); the rail's tokens then resolve in that mode.

Shape: rounded (default) → `--navigation-rail-item-radius-rounded` on every rail item, and the rounded shape on sub menu rows, groups, the header action and the header buttons; sharp → `--navigation-rail-item-radius-sharp` and the sharp shape on all of those. The rail's own edges never round. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
Rail item:

| State | Background | Glyph and label | Notes |
|---|---|---|---|
| enabled | `--navigation-rail-item-background-enabled` | `--navigation-rail-item-foreground` | no fill at rest |
| hover | `--navigation-rail-item-background-hover` | unchanged | the scrim alone carries the feedback |
| pressed (Figma: active) | `--navigation-rail-item-background-pressed` | unchanged | |
| selected | `--navigation-rail-item-background-selected`, plus the selection mark | `--navigation-rail-item-foreground-selected` | no scrim; the mark and colour separate it from hover and press. Exactly one across the rail and the panel |
| focused | per state | per state | `--navigation-rail-focus-ring-width` `--navigation-rail-focus-ring-color` ring; Figma models no focus, so code draws it |
| disabled | `--navigation-rail-item-background-disabled` | `--navigation-rail-item-foreground-disabled` | resting items only; temporarily unavailable, stays focusable and says why |

The rail container has no states of its own. Rail item state changes are colour only, with no timing. Every opening and closing inside the rail runs on `--navigation-rail-container-transition`: the rail widening or narrowing (glyphs stay put while the edge moves and clips the labels; on collapse keep the wide layout until the width has finished narrowing), the sub menu panel opening or closing, and Collapsible Menu Items opening with their caret turning. Figma draws only the end states. Under reduced motion the width changes at once and the panel and groups fade in and out instead of sliding ([patterns 6.66](../patterns/06-accessibility.md)). Expanded and Show Sub menu both change the component's width, so whatever sits beside the rail moves with it.

## Spacing & Sizing
| Part | Value |
|---|---|
| Rail padding | `--navigation-rail-container-padding-y` top and bottom, `--navigation-rail-container-padding-x` left and right |
| Block gap | `--navigation-rail-container-gap` between header, action, menu list and footer |
| Item gap | `--navigation-rail-list-gap` in the menu list and footer; the Menu Slot adds `--navigation-rail-slot-padding-x` side padding |
| Rail item | at least `--navigation-rail-item-min-size` on both axes; `--navigation-rail-item-padding-y` top and bottom |
| Wide rail | `--navigation-rail-container-width-expanded`, or fill the container; Rail Max Width can cap it, and labels that no longer fit wrap to two lines |
| Sub menu | sizes to its widest top-level row or its header, never narrower than `--navigation-rail-submenu-min-width` (a cap below it lowers the minimum); all rows share that width; a Collapsible Menu Item never widens it. Sub Menu Max Width caps it |
| Height | fills its parent; the rail and the panel both fill it |

The narrow rail is one item wide plus padding (`--navigation-rail-item-min-size` + 2 × `--navigation-rail-container-padding-x`). Figma draws the sub menu at a fixed width; build it to size to its content. Rail item labels and sub menu labels never truncate: they wrap to two lines and the item grows ([patterns 5.29](../patterns/05-sizes-devices.md)). Keep labels short enough that two lines hold them.

## Properties
| Property | Options | Default |
|---|---|---|
| Expanded | true, false | false |
| Label (narrow captions) | on / off | off |
| Show Header Action | on / off | on |
| Show Toggle Item | on / off | on |
| Show Sub menu | on / off | on |
| More Rail Items (Menu Slot) | on / off | on |
| More Footer Items (Footer Slot) | on / off | on |
| Shape | rounded, sharp (code only) | rounded |
| Inverse | off (Dark), on (Light) (code only) | off |
| Rail Width | `--navigation-rail-container-width-expanded`, a length, fill (code only) | `--navigation-rail-container-width-expanded` |
| Rail Max Width | none, a length (code only) | none |
| Sub Menu Max Width | none, a length (code only) | none |
| Sub Menu Header type | default, sub page | default |
| Sub Menu Header title | text | — |

Rail item: State (default, hover, pressed, selected), Disabled (on / off), Label (text), Show Label (narrow only), Show Icon, Show Badge. Hover, pressed and focus are driven by interaction. Menu Slot content is stored separately per Label setting in Figma, so switching Label leaves it behind; the Footer and Sub Menu slots are shared by every variant.

## Usage
- Fill the Menu and Footer slots with rail items, and the Sub Menu Slot with [Sub Menu Item](../molecules/sub-menu-item.md) rows and groups; let the rail handle spacing.
- Keep the toggle item unless something outside the rail controls Expanded; it's the user's only way to change the width.
- Use Expanded, not Label, when destinations can't be told apart by glyph. Label fits only the shortest words.
- The rail is the global navigation from medium widths up; the wide rail with labels suits the widest windows, and compact uses the [Navigation Bar](navigation-bar.md) ([patterns 5.15](../patterns/05-sizes-devices.md)). Plan the page for every width you ship: narrow, wide, with and without the sub menu.
- Leave out destinations the person's role can't use ([patterns 2.80](../patterns/02-navigation-flow.md)). Use Disabled only for a destination that's temporarily unavailable, and say why.
- Swap the placeholder Star glyph on every item, and don't turn Show Icon off in the narrow form (it leaves an empty target).
- Don't put Navigation Rail items in the Navigation Drawer; use Sub Menu Items there.

## Accessibility
- The rail is a container that announces nothing itself; wrap it in a named `nav` landmark ([patterns 6.52](../patterns/06-accessibility.md)).
- Glyph-only items need an accessible name from code; an icon isn't a name.
- Mark exactly one destination across the rail and the panel with `aria-current="page"`; nothing in the component enforces it.
- Hover and press are a translucent scrim only and never reach keyboard or screen reader users. Code draws focus with `--navigation-rail-focus-ring-width` `--navigation-rail-focus-ring-color`.
- A disabled item keeps focus with `aria-disabled="true"` and gives its reason on focus and hover, in its description ([patterns 6.34](../patterns/06-accessibility.md)).
- The badge is a dot with no number, so whatever it signals needs a text equivalent.
- The `--navigation-rail-submenu-border-color` border is the only thing separating panel from rail; check it reads against `--navigation-rail-container-background` in Dark and AAA Dark.
- The toggle needs a name and `aria-expanded`; hiding it without another control strands anyone who needs the labels.

## Claude Prompt
Draw a dark vertical navigation rail (`--navigation-rail-container-background` in Dark mode) on the left edge of a desktop screen, `--navigation-rail-container-padding-x` side padding. At the top a small round avatar, below it a square blue primary icon button with an outlined plus-in-a-circle. Then a column of `--navigation-rail-item-min-size` square targets, `--navigation-rail-list-gap` apart, each holding a white `--navigation-rail-item-icon-size` rounded icon (`--navigation-rail-item-foreground`); the selected one is blue (`--navigation-rail-item-foreground-selected`) with no background and a thick `--navigation-rail-item-selection-color` bar on its leading edge, and a hovered one has a faint light wash. One icon has a small red dot badge on its top-right corner. At the bottom, settings and a panel-toggle icon. Beside the rail, a dark sub menu panel at least `--navigation-rail-submenu-min-width` wide, separated by a thin grey line (`--navigation-rail-submenu-border-color`), with a title bar (a `--navigation-rail-submenu-header-icon-size` glyph, "Reports" in `--navigation-rail-submenu-header-title-font`, and a blue text button on the right) over a bottom border and a list of rows with icons and labels; one row is selected with a pale blue tint. In the wide version the rail is `--navigation-rail-container-width-expanded` wide and every item shows its label beside the icon in `--navigation-rail-item-label-font-expanded`.
