---
name: Dropdown Menu
level: molecule
status: stable
composes: [./menu-item.md, ../atoms/button.md, ../atoms/icon-button.md]
tokens:
  # panel
  dropdown-menu-panel-background: '{colors.color-fill-overlay}'
  dropdown-menu-panel-shadow: '{shadow.shadow-medium}'
  # shape
  dropdown-menu-panel-radius-sharp: '{radius.radius-none}'
  dropdown-menu-panel-radius-rounded: '{radius.radius-element-md}'
  # sizes
  dropdown-menu-panel-padding: '{space.space-md}'
  dropdown-menu-panel-padding-compact: '{space.space-xs}'
  dropdown-menu-content-gap: '{space.space-2xs}'
  # placement (dropdown template)
  dropdown-menu-panel-offset: '{space.space-sm}'
---

# Dropdown Menu

> A floating panel of Menu Item rows that opens from a trigger, for a short list of actions or options.

## Anatomy
1. Panel — the outer frame. Hugs its content on both axes and carries the `--dropdown-menu-panel-background` surface, the radius and the `--dropdown-menu-panel-shadow` elevation. It needs nothing behind it.
2. Content — the vertical stack inside the padding, rows `--dropdown-menu-content-gap` apart.
3. Rows — [Menu Item](./menu-item.md) instances: icon, checkbox, radio or custom rows. The menu passes its Rounded value to every row, so the rows round (`--menu-item-container-radius-rounded`) or square off (`--menu-item-container-radius-sharp`) with the panel.
4. Trigger (in the dropdown template) — the control the menu opens from: a [Button](../atoms/button.md) by default, or an [Icon Button](../atoms/icon-button.md). Its own flavour, size and label stay editable.

The menu is placed relative to its trigger through the dropdown template, not nudged by hand. The template reserves only the trigger's space: the open panel is positioned absolutely, `--dropdown-menu-panel-offset` from the trigger on the side Position picks, and overlaps whatever is below.

## Variants
| Rounded | Panel radius | Row radius |
|---|---|---|
| on (default) | `--dropdown-menu-panel-radius-rounded` | `--menu-item-container-radius-rounded` |
| off | `--dropdown-menu-panel-radius-sharp` | `--menu-item-container-radius-sharp` |

Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

| Compact | Panel padding | Use |
|---|---|---|
| off (default) | `--dropdown-menu-panel-padding` | everywhere with room to spare |
| on | `--dropdown-menu-panel-padding-compact` | a cramped spot: a rail, a table footer, a breadcrumb overflow |

Placement (dropdown template):

| Position | Align options | Lines up |
|---|---|---|
| bottom (default) | left (default), right | the leading or trailing edges of menu and trigger |
| top | left, right | as bottom |
| right | top, bottom | the top or bottom edges |
| left | top, bottom | as right |

Align top and bottom do nothing while Position is bottom or top, and left and right do nothing while Position is left or right.

## States
The panel has no interaction states of its own. Hover, selection, focus and disabled all live on the [Menu Item](./menu-item.md) rows, so the panel never changes appearance by itself.

| Template state | Shows | Notes |
|---|---|---|
| closed (default) | trigger only | the menu is present but hidden, so its rows are kept |
| open | trigger + panel | the panel appears `--dropdown-menu-panel-offset` from the trigger |

No transition is defined: opening and closing is a switch, not an animation. `--dropdown-menu-panel-shadow` is the only thing separating the panel from the surface beneath, and no property changes it.

## Spacing & Sizing
| Property | Value |
|---|---|
| Panel padding | `--dropdown-menu-panel-padding` on all sides; Compact `--dropdown-menu-panel-padding-compact` |
| Row gap | `--dropdown-menu-content-gap` |
| Row height | `--menu-item-container-height` |
| Radius | `--dropdown-menu-panel-radius-sharp` / `--dropdown-menu-panel-radius-rounded` |
| Elevation | `--dropdown-menu-panel-shadow` |
| Offset from trigger | `--dropdown-menu-panel-offset` |
| Width | hugs the widest row; a long label widens the whole menu instead of wrapping |

Height grows with the number of rows. The panel neither scrolls nor caps its height, so a menu long enough to run past the viewport is a design decision the component doesn't prevent; in code, cap it and scroll the content (as [Phone Input](./phone-input.md) does past eight rows).

## Properties
| Property | Options | Default |
|---|---|---|
| Rounded | on / off | on |
| Compact | on / off | off |
| More Items | on / off (shows the slot below the two built-in rows) | on |
| Rows | Menu Items in the slot | two |
| Open (template) | on / off | off |
| Position (template) | bottom, top, right, left | bottom |
| Align (template) | left, right, top, bottom | left |
| Trigger (template) | Button, Icon Button | Button |

Figma only: the panel has two built-in rows above a slot, and each Rounded and Compact variant stores its slot content separately, so content placed in the slot doesn't carry when either changes. The template's menu is pinned to Rounded on. In code the rows are simply the menu's children.

## Usage
- Use a dropdown menu for a short list of actions or options behind a trigger; for a form field use [Select](./select.md).
- Place it through the dropdown template so position comes from Position and Align, not manual nudging. Use top near the bottom of the view, right in a narrow column or side rail, left near the trailing edge.
- Keep Rounded consistent with the surfaces around the menu; the rows follow it.
- Use Compact only where room is short; a long list then reads as one dense block.
- Use checkbox rows for multi-select and radio rows for a single choice with visible state.
- Don't add a background or shadow behind the menu; it already carries both, and a second reads as two stacked panels.
- Turning More Items off hides the slot and everything someone placed in it.
- Disable rather than hide an unavailable option, so the menu keeps its shape.

## Accessibility
- The panel is a container and announces nothing itself; each row needs a clear label.
- The trigger needs an accessible name and `aria-haspopup` and `aria-expanded`; neither is modelled in the design.
- Showing and hiding the menu, moving focus into it, arrow-key movement between rows, closing on Escape and returning focus to the trigger all belong to the implementation.
- The panel neither traps focus nor caps its height, and nothing stops it opening off-screen: flip Position near a viewport edge in code.
- There is no border, so `--dropdown-menu-panel-shadow` alone separates the menu from what is behind it; check it reads on the surfaces you open it over.

## Claude Prompt
Draw a primary Zebra button labelled "Assign to" and, `--dropdown-menu-panel-offset` below it with its left edge aligned, an open white floating panel (`--dropdown-menu-panel-background`) with `--dropdown-menu-panel-radius-rounded` corners, `--dropdown-menu-panel-padding` padding and a soft two-layer drop shadow (`--dropdown-menu-panel-shadow`), no border. Inside, stack four `--menu-item-container-height` rows `--dropdown-menu-content-gap` apart, each with a small near-black icon and a `--menu-item-label-font` label ("Dock 1", "Dock 2", "Dock 3", "Dock 4"); one row is hovered with a faint grey wash (`--menu-item-container-background-hover`), one is selected with a pale blue tint (`--menu-item-container-background-selected`) and one is disabled with grey text. The panel hugs its widest row.
