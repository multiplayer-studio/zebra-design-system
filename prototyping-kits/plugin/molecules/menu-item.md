---
name: Menu Item
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/checkbox.md, ../atoms/radio-button.md]
tokens:
  # container
  menu-item-container-background-enabled: '{colors.color-status-ghost-default}'
  menu-item-container-background-hover: '{colors.color-status-ghost-faint}'
  menu-item-container-background-selected: '{colors.color-status-ghost-tint}'
  menu-item-container-background-focused: '{colors.color-status-ghost-default}'
  menu-item-container-background-disabled: '{colors.color-status-ghost-default}'
  # label and icons
  menu-item-label-foreground: '{colors.color-ink-high}'
  menu-item-label-foreground-selected: '{colors.color-ink-high}'
  menu-item-label-foreground-disabled: '{colors.color-ink-disabled}'
  menu-item-icon-foreground: '{colors.color-ink-high}'
  menu-item-icon-foreground-selected: '{colors.color-ink-high}'
  menu-item-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # focus
  menu-item-focus-ring-width: '{stroke.stroke-thin}'
  menu-item-focus-ring-color: '{colors.color-line-focus}'
  # shape
  menu-item-container-radius-sharp: '{radius.radius-none}'
  menu-item-container-radius-rounded: '{radius.radius-sm}'
  # sizes
  menu-item-container-height: '{control.control-md}'
  menu-item-container-padding-y: '{space.space-2xs}'
  menu-item-container-padding-x: '{space.space-md}'
  menu-item-container-gap: '{space.space-sm}'
  menu-item-selection-container-padding-start: '{space.space-none}'
  menu-item-selection-container-gap: '{space.space-none}'
  menu-item-selection-control-size: '{control.control-target-min}'
  menu-item-label-padding-start: '{space.space-2xs}'
  menu-item-label-padding-end: '{space.space-xl}'
  menu-item-label-font: '{typography.type-label-medium}'
  menu-item-icon-size: '{icon.icon-size-small}'
  # list divider
  menu-item-divider-border-width: '{stroke.stroke-thin}'
  menu-item-divider-border-color: '{colors.color-line-default}'
---

# Menu Item

> A single row in a menu or list: a leading element, a label and an optional trailing icon, with hover, selection, focus and disabled treatments.

## Anatomy
1. Row — horizontal frame at a fixed `--menu-item-container-height`. It fills the width of the menu or list that holds it, so its own width is never set; a longer label widens the whole menu rather than the row.
2. Leading element (optional) — one of an [Icon](../atoms/icon.md) at `--menu-item-icon-size` with Framed off (Type icon), a [Checkbox](../atoms/checkbox.md) (Type checkbox) or a [Radio Button](../atoms/radio-button.md) (Type radio) at size medium with no label in a `--menu-item-selection-control-size` touch target, or an empty slot (Type custom) for an avatar, a colour swatch or anything else the icon library can't supply.
3. Label — the option's name in `--menu-item-label-font`, in a wrapper whose own padding (`--menu-item-label-padding-start` leading, `--menu-item-label-padding-end` trailing) sets the text off the leading element and keeps room for a trailing icon even when none is shown. It never wraps or truncates.
4. Trailing icon (optional) — an [Icon](../atoms/icon.md) at `--menu-item-icon-size`, for a submenu arrow or an external-link mark.
5. Divider (list level, optional) — a `--menu-item-divider-border-width` `--menu-item-divider-border-color` line under every row but the last, when rows form a divided list outside a menu panel.

## Variants
Type sets the leading element; everything else is shared.

| Type | Leading element | Leading padding | Gap | Selection |
|---|---|---|---|---|
| icon (default) | Icon, glyph set per row | `--menu-item-container-padding-x` | `--menu-item-container-gap` | single, shown by the selected tint |
| radio | Radio Button, medium, no label | `--menu-item-selection-container-padding-start` | `--menu-item-selection-container-gap` | single; selecting a row clears the others |
| checkbox | Checkbox, medium, no label | `--menu-item-selection-container-padding-start` | `--menu-item-selection-container-gap` | multiple |
| custom | empty slot, filled per row | `--menu-item-container-padding-x` | `--menu-item-container-gap` | as the menu needs |

Checkbox and radio rows drop the leading padding and the gap, so the control's `--menu-item-selection-control-size` target starts at the edge, its box lines up with an icon row's glyph, and the target itself spaces the label.

Shape: rounded (default) → `--menu-item-container-radius-rounded`; sharp → `--menu-item-container-radius-sharp`. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5). Match the panel holding the row; [Dropdown Menu](./dropdown-menu.md) passes its own Rounded value down.

## States
| State | Background | Label | Leading / trailing icon | Notes |
|---|---|---|---|---|
| default | `--menu-item-container-background-enabled` | `--menu-item-label-foreground` | `--menu-item-icon-foreground` | fully transparent |
| hover | `--menu-item-container-background-hover` | unchanged | unchanged | pointer devices only |
| selected | `--menu-item-container-background-selected` | `--menu-item-label-foreground-selected` | `--menu-item-icon-foreground-selected` | a light brand tint; reads stronger than hover |
| focus | `--menu-item-container-background-focused` | unchanged | unchanged | `--menu-item-focus-ring-width` `--menu-item-focus-ring-color` ring on all four edges, inside the row |
| selected focus | `--menu-item-container-background-selected` | `--menu-item-label-foreground-selected` | `--menu-item-icon-foreground-selected` | tint and ring together |
| disabled | `--menu-item-container-background-disabled` | `--menu-item-label-foreground-disabled` | `--menu-item-icon-foreground-disabled` | not interactive; a checkbox or radio follows the row into its own disabled state |

No transition is defined: every change is colour only, with no movement, scale or elevation. The focus ring is drawn inside the row's bounds, so it never overlaps the neighbouring row or the panel padding, and it is the only state that adds a border, which keeps focus tellable apart from selection. The whole row is the click target: anywhere on a checkbox row toggles it, anywhere on a radio row selects it.

## Spacing & Sizing
| Property | Value |
|---|---|
| Height | `--menu-item-container-height`, every type and state |
| Padding (V / H) | `--menu-item-container-padding-y` / `--menu-item-container-padding-x`; checkbox and radio rows `--menu-item-selection-container-padding-start` on the leading side |
| Gap | `--menu-item-container-gap` between leading element, label and trailing icon; checkbox and radio rows `--menu-item-selection-container-gap` |
| Label inset | `--menu-item-label-padding-start` leading, `--menu-item-label-padding-end` trailing |
| Label font | `--menu-item-label-font` |
| Icons | `--menu-item-icon-size`, Framed off |
| Selection control | `--menu-item-selection-control-size` including its touch target |
| Radius | `--menu-item-container-radius-sharp` / `--menu-item-container-radius-rounded` |
| Divider | `--menu-item-divider-border-width` `--menu-item-divider-border-color`, list level |

Width fills the holder and height is fixed, so a long label reflows the menu, never the row.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | icon, radio, checkbox, custom | icon |
| State | default, selected, disabled | default |
| Rounded | on / off | on |
| Label | text | Menu Item |
| Leading element | on / off | on |
| Leading icon | any icon (Type icon) | — |
| Trailing icon | on / off, any icon | off |
| Divided (list) | on / off | off |

Hover, focus and selected focus are driven by interaction, never set on a static layout. Checked on a checkbox or radio row follows the row's selection, and disabled follows the row. Divided is a list-level setting for rows outside a menu panel (it carries List Item's divided list) and has no Figma property.

## Usage
- Set the leading glyph on every icon row; there is no sensible default icon.
- Use the checkbox or radio type for a choice, not an icon type with a check mark: they draw the real control.
- Keep Leading element the same on every row in a menu. A mix loses the alignment that makes a list scannable.
- Match Rounded to the panel that holds the row, never row by row.
- Use custom for a leading avatar or swatch, e.g. a person picker.
- Don't rely on the selected tint alone; it is faint and can fade on a busy or tinted surface.
- A divided list of rows (settings, people, conversations) is built from Menu Items with Divided on. A row whose action is a trailing [Switch](../atoms/switch.md) is a settings row, not a menu item: use the Switch with its own label.

## Accessibility
- Selection is a light tint with no change to the label or the leading element, so it must also be set in code (`aria-selected`, `aria-checked` or `aria-current`).
- The focus ring (`--menu-item-focus-ring-width` `--menu-item-focus-ring-color`) is the only state that adds a border, which keeps focus distinct from selection.
- Checkbox and radio rows draw the real control, but the row's role (`menuitemcheckbox`, `menuitemradio`, `option`) still has to be set in code, and the label must name the control.
- Disabled changes colour only, so available and unavailable differ by contrast alone; say why an option is unavailable where it matters.
- The leading icon decorates or repeats the label and is hidden from assistive tech; the label must stand on its own.
- `--menu-item-container-height` meets the minimum touch target.

## Claude Prompt
Draw a menu row `--menu-item-container-height` tall that fills its panel's width, with `--menu-item-container-padding-x` side padding: a small `--menu-item-icon-size` near-black (`--menu-item-icon-foreground`) icon, then `--menu-item-container-gap` later a `--menu-item-label-font` near-black (`--menu-item-label-foreground`) label such as "Batch scan", and an optional chevron-right at the trailing edge. The row has no background at rest, a faint grey wash (`--menu-item-container-background-hover`) on hover and a pale blue tint (`--menu-item-container-background-selected`) when selected; keyboard focus draws a thin `--menu-item-focus-ring-color` ring inside its edges. Disabled rows have grey text (`--menu-item-label-foreground-disabled`). Checkbox and radio rows replace the icon with a real checkbox or radio control flush to the left edge. Corners are softly rounded (`--menu-item-container-radius-rounded`), or square in a sharp menu.
