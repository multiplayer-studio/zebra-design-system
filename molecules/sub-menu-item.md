---
name: Sub Menu Item
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/notification-indicator.md, ../atoms/caret-indicator.md]
tokens:
  # container
  sub-menu-item-container-background-enabled: '{colors.color-status-ghost-default}'
  sub-menu-item-container-background-hover: '{colors.color-status-ghost-faint}'
  sub-menu-item-container-background-pressed: '{colors.color-status-ghost-deep}'
  sub-menu-item-container-background-selected: '{colors.color-status-ghost-tint}'
  sub-menu-item-container-background-disabled: '{colors.color-status-ghost-default}'
  sub-menu-item-container-radius-rounded: '{radius.radius-sm}'
  sub-menu-item-container-radius-sharp: '{radius.radius-none}'
  sub-menu-item-container-min-height: '{control.control-lg}'
  sub-menu-item-container-padding-y: '{space.space-2xs}'
  sub-menu-item-container-padding-x: '{space.space-md}'
  sub-menu-item-nested-container-padding-start: '{space.space-xl}'
  sub-menu-item-container-gap: '{space.space-sm}'
  sub-menu-item-content-gap: '{space.space-md}'
  # label and glyph
  sub-menu-item-label-foreground: '{colors.color-ink-high}'
  sub-menu-item-label-foreground-pressed: '{colors.color-ink-high}'
  sub-menu-item-label-foreground-selected: '{colors.color-ink-brand}'
  sub-menu-item-label-foreground-disabled: '{colors.color-ink-disabled}'
  sub-menu-item-nested-label-foreground: '{colors.color-ink-medium}'
  sub-menu-item-label-font: '{typography.type-label-medium}'
  sub-menu-item-nested-label-font: '{typography.type-indicator-medium}'
  sub-menu-item-icon-size: '{icon.icon-size-small}'
  # collapsible group
  sub-menu-item-group-background: '{colors.color-fill-faint}'
  sub-menu-item-group-header-background-open: '{colors.color-status-ghost-deep}'
  sub-menu-item-group-padding: '{space.space-sm}'
  sub-menu-item-group-gap: '{space.space-2xs}'
  sub-menu-item-group-radius-rounded: '{radius.radius-sm}'
  sub-menu-item-group-radius-sharp: '{radius.radius-none}'
  sub-menu-item-group-transition: '{motion.motion-smooth}'
  # focus
  sub-menu-item-focus-ring-width: '{stroke.stroke-thick}'
  sub-menu-item-focus-ring-color: '{colors.color-line-focus}'
---

# Sub Menu Item

> A navigation row with a leading glyph, a label, an optional count and an optional caret, used in the Navigation Rail's sub menu and the Navigation Drawer; a Collapsible Menu Item groups several under one of them.

## Anatomy
1. Row — the outer frame. Fills the width of the slot it sits in, never narrower than `--sub-menu-item-container-min-height` tall, with `--sub-menu-item-container-gap` between the content, the badge and the caret.
2. Icon and title — the leading [Icon](../atoms/icon.md) at `--sub-menu-item-icon-size` and the label, `--sub-menu-item-content-gap` apart, so the label starts at the same place on every row that has an icon. The glyph takes the label's colour in every state. It ships holding Verified, a placeholder to swap.
3. Badge (optional) — a [Notification Indicator](../atoms/notification-indicator.md) at its medium (counter) size, sitting in the layout between the label and the caret, so it takes width from the label rather than overhanging.
4. Trailing caret (optional) — a [Caret Indicator](../atoms/caret-indicator.md), horizontal and closed, marking a row that opens a further level.

**Collapsible Menu Item** is a Sub Menu Item used as a group header plus a slot of nested rows beneath it:
1. Header — a Sub Menu Item with its caret on. Open, it takes `--sub-menu-item-group-header-background-open`.
2. Group — the nested rows, shown only while open, on `--sub-menu-item-group-background` with `--sub-menu-item-group-padding` inset and `--sub-menu-item-group-gap` between rows. Rows inside set Nested on.

## Variants
| Variant | Left padding | Label colour (rest) | Label font |
|---|---|---|---|
| top level (default) | `--sub-menu-item-container-padding-x` | `--sub-menu-item-label-foreground` | `--sub-menu-item-label-font` |
| nested | `--sub-menu-item-nested-container-padding-start` | `--sub-menu-item-nested-label-foreground` | `--sub-menu-item-nested-label-font` |

Nesting is shown by indent, a quieter colour and a smaller type style, with no connector line. Only one level is built.

Shape: rounded (default) → `--sub-menu-item-container-radius-rounded` on the row and `--sub-menu-item-group-radius-rounded` on an open group; sharp → `--sub-menu-item-container-radius-sharp` and `--sub-menu-item-group-radius-sharp`. Shape comes from the parent rail or drawer.

## States
| State | Background | Label and glyph | Notes |
|---|---|---|---|
| enabled | `--sub-menu-item-container-background-enabled` | `--sub-menu-item-label-foreground` (nested: `--sub-menu-item-nested-label-foreground`) | no fill at rest |
| hover | `--sub-menu-item-container-background-hover` | unchanged | pointer devices only |
| pressed | `--sub-menu-item-container-background-pressed` | `--sub-menu-item-label-foreground-pressed` | nested and top-level rows converge here |
| selected | `--sub-menu-item-container-background-selected` | `--sub-menu-item-label-foreground-selected` | the only state with a fill of its own; exactly one row across the navigation |
| focused | per state | per state | `--sub-menu-item-focus-ring-width` `--sub-menu-item-focus-ring-color` ring inside the row; Figma models no focus, so code draws it |
| disabled | `--sub-menu-item-container-background-disabled` | `--sub-menu-item-label-foreground-disabled` | resting rows only, so a row is never selected and disabled at once; not interactive |

Every state change is colour only, with no movement, scale or elevation, and Figma stores no timing for them. A Collapsible Menu Item opens and closes over `--sub-menu-item-group-transition`: the group reveals or hides and its caret turns (one glyph rotating, not two swapped). The row never drives its own caret; whatever expands it turns the caret with it. Turn the motion off under reduced motion.

## Spacing & Sizing
| Part | Value |
|---|---|
| Row height | at least `--sub-menu-item-container-min-height` |
| Row padding | `--sub-menu-item-container-padding-y` vertical, `--sub-menu-item-container-padding-x` horizontal (nested left: `--sub-menu-item-nested-container-padding-start`) |
| Gaps | `--sub-menu-item-content-gap` icon to label; `--sub-menu-item-container-gap` between content, badge and caret |
| Icon and caret | `--sub-menu-item-icon-size` |
| Group | `--sub-menu-item-group-padding` inset, `--sub-menu-item-group-gap` between rows |

Width fills the slot, so every row in a list is the same width and the label doesn't hug. In the Navigation Rail the panel sizes to its widest top-level row; a group never widens it. Labels that don't fit end in an ellipsis; hovering a cut-off label for 3 seconds shows it in full in a tooltip (supplied by the rail or drawer), and keyboard focus shows it at once.

## Properties
| Property | Options | Default |
|---|---|---|
| State | default, hover, active, selected | default |
| Disabled | on / off | off |
| Nested | on / off | off |
| Label | text | Label |
| Show Leading Icon | on / off, any icon | on |
| Sub Menu (caret) | on / off | on |
| Show Badge | on / off (counter value) | off |
| Open (Collapsible Menu Item) | on / off | off |

Hover, active and focus are driven by interaction, never set on a static layout.

## Usage
- Turn the caret off for rows that go straight to a destination. The caret promises another level.
- Keep the leading icon on for every row in a list, or off for all; mixing them breaks the label alignment.
- Use a Collapsible Menu Item for a group of destinations; opening a group is not navigation, so it never closes a drawer.
- Don't nest more than one level. Only one indent step exists.
- This badge is the counter size and sits in the layout; the Navigation Rail item's badge is a dot that floats over the glyph. They're not interchangeable.
- Swap the placeholder glyph on every row.

## Accessibility
- Selection is the only state with a fill of its own; also mark the current row with `aria-current="page"`.
- Hover and press are a translucent scrim only and never reach keyboard or screen reader users.
- Figma has no focus variant; code draws the `--sub-menu-item-focus-ring-width` `--sub-menu-item-focus-ring-color` ring.
- Disabled is visual only and nothing on the row says why; explain nearby.
- Express nesting in code (a nested list, or `aria-level`); a group header is a button with `aria-expanded`.
- The caret says a level exists but not what's in it, so the label must carry that.
- Nested rows use a 12px type style (`--sub-menu-item-nested-label-font`); check it against your minimum readable size.
- A count badge needs a text equivalent in the row's accessible name.

## Stitch Prompt
Draw a navigation row `--sub-menu-item-container-min-height` tall that fills its column, with `--sub-menu-item-container-radius-rounded` corners and `--sub-menu-item-container-padding-x` horizontal padding. On the left a `--sub-menu-item-icon-size` rounded icon in near-black (`--sub-menu-item-label-foreground`), then the label in `--sub-menu-item-label-font`; on the right an optional small red count badge and a small chevron caret. Hovering adds a faint grey wash (`--sub-menu-item-container-background-hover`); the selected row has a pale blue tint (`--sub-menu-item-container-background-selected`) with blue text and icon (`--sub-menu-item-label-foreground-selected`). A nested row is indented to `--sub-menu-item-nested-container-padding-start` with smaller grey text (`--sub-menu-item-nested-label-font`, `--sub-menu-item-nested-label-foreground`). An open group shows its header with a slightly darker wash and the nested rows on a light grey panel (`--sub-menu-item-group-background`) below.
