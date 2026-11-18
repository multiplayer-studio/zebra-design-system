---
name: Dropdown Menu
level: molecule
status: stable
composes: [./menu-item.md, ../atoms/button.md, ../atoms/icon-button.md]
tokens:
  # panel
  dropdown-menu-panel-background: '{colors.color-fill-overlay}'
  dropdown-menu-panel-shadow: '{shadow.shadow-medium}'
  dropdown-menu-panel-border-width: '{stroke.stroke-thin}'
  dropdown-menu-panel-border-color: '{colors.color-fill-transparent}'
  # shape
  dropdown-menu-panel-radius-sharp: '{radius.radius-none}'
  dropdown-menu-panel-radius-rounded: '{radius.radius-element-md}'
  # sizes
  dropdown-menu-panel-padding: '{space.space-md}'
  dropdown-menu-panel-padding-compact: '{space.space-xs}'
  dropdown-menu-content-gap: '{space.space-2xs}'
  # group divider
  dropdown-menu-group-divider-width: '{menu-item.menu-item-divider-border-width}'
  dropdown-menu-group-divider-color: '{menu-item.menu-item-divider-border-color}'
  dropdown-menu-group-gap: '{space.space-2xs}'
  # placement (dropdown template)
  dropdown-menu-panel-offset: '{space.space-sm}'
---

# Dropdown Menu

> A floating panel of Menu Item rows that opens from a trigger, for a short list of actions or options.

## Anatomy
1. Panel — the outer frame. Hugs its content on both axes and carries the `--dropdown-menu-panel-background` surface, the radius, the `--dropdown-menu-panel-shadow` elevation and a `--dropdown-menu-panel-border-width` `--dropdown-menu-panel-border-color` border. The border is transparent, so it only draws in forced-colour mode, where the shadow vanishes ([patterns 6.10](../patterns/06-accessibility.md)). It needs nothing behind it.
2. Content — the vertical stack inside the padding, rows `--dropdown-menu-content-gap` apart.
3. Rows — [Menu Item](./menu-item.md) instances: icon, check or custom rows. The menu passes its Rounded value to every row, so the rows round (`--menu-item-container-radius-rounded`) or square off (`--menu-item-container-radius-sharp`) with the panel. Radio and checkbox rows belong in lists and [Select](./select.md), not in menus: menu items never contain other controls ([patterns 3.84](../patterns/03-controls-interaction.md)).
4. Group divider (optional) — a `--dropdown-menu-group-divider-width` `--dropdown-menu-group-divider-color` line between groups of rows, with `--dropdown-menu-group-gap` above and below it.
5. Trigger (in the dropdown template) — the control the menu opens from: a [Button](../atoms/button.md) by default, or an [Icon Button](../atoms/icon-button.md). Its own flavour, size and label stay editable. The trigger for an item's menu is a "more" icon or a down-arrow, never a gear or a menu icon ([patterns 3.83](../patterns/03-controls-interaction.md)).

The menu is placed relative to its trigger through the dropdown template, not nudged by hand. The template reserves only the trigger's space: the open panel is positioned absolutely, `--dropdown-menu-panel-offset` from the trigger on the side Position picks, and overlaps whatever is below.

## Variants
| Rounded | Panel radius | Row radius |
|---|---|---|
| on (default) | `--dropdown-menu-panel-radius-rounded` | `--menu-item-container-radius-rounded` |
| off | `--dropdown-menu-panel-radius-sharp` | `--menu-item-container-radius-sharp` |

Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

| Compact | Panel padding | Use |
|---|---|---|
| off (default) | `--dropdown-menu-panel-padding` | everywhere |
| on | `--dropdown-menu-panel-padding-compact` | a cramped placement only: a rail, a table footer, a breadcrumb overflow |

Compact is a placement exception, not a density: menus never get denser with the product's density ([patterns 5.48](../patterns/05-sizes-devices.md)). It tightens only the panel's inset; the rows keep their size.

Placement (dropdown template):

| Position | Align options | Lines up |
|---|---|---|
| bottom (default) | left (default), right | the leading or trailing edges of menu and trigger |
| top | left, right | as bottom |
| right | top, bottom | the top or bottom edges |
| left | top, bottom | as right |

Align top and bottom do nothing while Position is bottom or top, and left and right do nothing while Position is left or right. In code, the menu opens toward the side with room and moves rather than being cut off ([patterns 3.77](../patterns/03-controls-interaction.md)). On compact screens, a menu too long for the space opens as a [Bottom Sheet](../organisms/bottom-sheet.md) holding the same rows.

## States
The panel has no interaction states of its own. Hover, selection, focus and disabled all live on the [Menu Item](./menu-item.md) rows, so the panel never changes appearance by itself.

| Template state | Shows | Notes |
|---|---|---|
| closed (default) | trigger only | the menu is present but hidden, so its rows are kept |
| open | trigger + panel | the panel appears `--dropdown-menu-panel-offset` from the trigger |

No transition is defined: opening and closing is a switch, not an animation.

## Spacing & Sizing
| Property | Value |
|---|---|
| Panel padding | `--dropdown-menu-panel-padding` on all sides; Compact `--dropdown-menu-panel-padding-compact` |
| Row gap | `--dropdown-menu-content-gap` |
| Group divider | `--dropdown-menu-group-divider-width`, `--dropdown-menu-group-gap` above and below |
| Row height | at least `--menu-item-container-height` |
| Radius | `--dropdown-menu-panel-radius-sharp` / `--dropdown-menu-panel-radius-rounded` |
| Elevation | `--dropdown-menu-panel-shadow`, with the transparent `--dropdown-menu-panel-border-width` border |
| Offset from trigger | `--dropdown-menu-panel-offset` |
| Width | hugs the widest row up to the space available; past that, labels wrap rather than truncate |

Height grows with the number of rows, and the panel never scrolls. A menu holds fewer than about ten items in a few groups at most, and a menu button fewer than about five ([patterns 3.78](../patterns/03-controls-interaction.md)). A longer list of options is a [Combobox](./combobox.md), which people filter by typing.

## Properties
| Property | Options | Default |
|---|---|---|
| Rounded | on / off | on |
| Compact | on / off | off |
| More Items | on / off (shows the slot below the two built-in rows) | on |
| Rows | Menu Items in the slot, in groups | two |
| Open (template) | on / off | off |
| Position (template) | bottom, top, right, left | bottom |
| Align (template) | left, right, top, bottom | left |
| Trigger (template) | Button, Icon Button | Button |

Figma only: the panel has two built-in rows above a slot, and each Rounded and Compact variant stores its slot content separately, so content placed in the slot doesn't carry when either changes. The template's menu is pinned to Rounded on. In code the rows are simply the menu's children.

## Usage
- Use a dropdown menu for a short list of actions or options behind a trigger; for a form field use [Select](./select.md), and for a long list a [Combobox](./combobox.md).
- Place it through the dropdown template so position comes from Position and Align, not manual nudging. Use top near the bottom of the view, right in a narrow column or side rail, left near the trailing edge.
- Keep Rounded consistent with the surfaces around the menu; the rows follow it.
- List the most-used actions first, nearest where the menu opens. Destructive actions come last, after a group divider, as destructive items ([patterns 3.79](../patterns/03-controls-interaction.md)).
- An item's menu holds only actions on that item ([patterns 3.80](../patterns/03-controls-interaction.md)).
- Use check rows for a choice. Choosing a multi-select item keeps the menu open; choosing a single-choice item closes it ([patterns 3.84](../patterns/03-controls-interaction.md)).
- Don't add a background or shadow behind the menu; it already carries both, and a second reads as two stacked panels.
- Turning More Items off hides the slot and everything someone placed in it.
- Keep an unavailable item in place, unavailable, and say why when it's focused or pressed ([patterns 3.82](../patterns/03-controls-interaction.md)).

## Accessibility
- The panel is a container and announces nothing itself; each row needs a clear label.
- The trigger needs an accessible name and `aria-haspopup` and `aria-expanded`; neither is modelled in the design.
- Keyboard follows [patterns 3.85](../patterns/03-controls-interaction.md): opening by keyboard moves focus to the first item, arrow keys move through it, Enter acts and closes, and Escape closes and returns focus to the trigger ([patterns 6.29](../patterns/06-accessibility.md)). Typing a letter jumps to the next item that starts with it ([patterns 3.37](../patterns/03-controls-interaction.md)).
- Unavailable items stay focusable (`aria-disabled`), so their reason can be reached.
- Nothing stops the panel opening off-screen: flip Position near a viewport edge in code.
- In normal modes `--dropdown-menu-panel-shadow` separates the menu from what is behind it; check it reads on the surfaces you open it over. In forced colours the transparent border draws instead.

## Claude Prompt
Draw a primary Zebra button labelled "Assign to" and, `--dropdown-menu-panel-offset` below it with its left edge aligned, an open white floating panel (`--dropdown-menu-panel-background`) with `--dropdown-menu-panel-radius-rounded` corners, `--dropdown-menu-panel-padding` padding and a soft two-layer drop shadow (`--dropdown-menu-panel-shadow`), no visible border. Inside, stack four `--menu-item-container-height` rows `--dropdown-menu-content-gap` apart, each with a small near-black icon and a `--menu-item-label-font` label ("Dock 1", "Dock 2", "Dock 3", "Dock 4"); one row is hovered with a faint grey wash (`--menu-item-container-background-hover`), one is selected with a pale blue tint (`--menu-item-container-background-selected`) and a check mark, and one is disabled with grey text. Below a thin divider, a last row "Remove" in red with a delete icon. The panel hugs its widest row.
