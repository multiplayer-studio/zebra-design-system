---
name: Compare View
level: organism
status: draft
composes: [../molecules/segmented-control.md, ../molecules/empty-state.md, ../atoms/switch.md, ../atoms/button.md, ../atoms/icon-button.md, ../atoms/label.md, ../atoms/icon.md]
tokens:
  # container
  compare-view-container-background: '{colors.color-fill-default}'
  compare-view-container-border-color: '{colors.color-line-default}'
  compare-view-container-border-width: '{stroke.stroke-thin}'
  compare-view-container-radius-rounded: '{radius.radius-element-md}'
  compare-view-container-radius-sharp: '{radius.radius-none}'
  # toolbar
  compare-view-toolbar-padding-y: '{space.space-md}'
  compare-view-toolbar-padding-x: '{space.space-lg}'
  compare-view-toolbar-gap: '{space.space-md}'
  compare-view-toolbar-background: '{colors.color-fill-default}'
  # item header (sticky)
  compare-view-header-background: '{colors.color-fill-default}'
  compare-view-header-padding-y: '{space.space-md}'
  compare-view-header-padding-x: '{space.space-lg}'
  compare-view-header-gap: '{space.space-2xs}'
  compare-view-header-title-font: '{typography.type-title-medium}'
  compare-view-header-title-foreground: '{colors.color-ink-high}'
  compare-view-header-subtitle-font: '{typography.type-body-small}'
  compare-view-header-subtitle-foreground: '{colors.color-ink-medium}'
  compare-view-header-border-color: '{colors.color-line-default}'
  # attribute column
  compare-view-attribute-width: '{primitives.scale-21}'
  compare-view-attribute-font: '{typography.type-label-medium}'
  compare-view-attribute-foreground: '{colors.color-ink-medium}'
  # rows and cells
  compare-view-cell-padding-y: '{space.space-md}'
  compare-view-cell-padding-x: '{space.space-lg}'
  compare-view-cell-gap: '{space.space-2xs}'
  compare-view-cell-font: '{typography.type-body-medium}'
  compare-view-cell-foreground: '{colors.color-ink-high}'
  compare-view-row-border-color: '{colors.color-line-subtle}'
  compare-view-row-border-width: '{stroke.stroke-thin}'
  compare-view-section-heading-font: '{typography.type-title-small}'
  compare-view-section-heading-foreground: '{colors.color-ink-high}'
  compare-view-section-heading-background: '{colors.color-fill-faint}'
  compare-view-missing-foreground: '{colors.color-ink-medium}'
  # changes (diff)
  compare-view-change-gap: '{space.space-2xs}'
  compare-view-change-font: '{typography.type-label-small}'
  compare-view-change-foreground: '{colors.color-ink-high}'
  compare-view-change-icon-size: '{icon.icon-size-small}'
  compare-view-change-marker-width: '{stroke.stroke-heavy}'
  compare-view-change-marker-color: '{colors.color-line-stronger}'
  compare-view-old-value-foreground: '{colors.color-ink-medium}'
  compare-view-new-value-foreground: '{colors.color-ink-high}'
  # groups by value (one setting across many devices)
  compare-view-group-count-font: '{typography.type-title-medium}'
  compare-view-group-count-foreground: '{colors.color-ink-high}'
  compare-view-group-background-hover: '{colors.color-fill-faint}'
  # focus
  compare-view-focus-ring-width: '{stroke.stroke-thick}'
  compare-view-focus-ring-color: '{colors.color-line-focus}'
---

# Compare View

> Records or versions side by side: one item per column and one attribute per row, or only what changed between two versions, or how one setting differs across many devices.

## Anatomy
1. Container — a `--compare-view-container-background` frame with a `--compare-view-container-border-width` `--compare-view-container-border-color` border and `--compare-view-container-radius-rounded` corners.
2. Toolbar — on `--compare-view-toolbar-background`, padded `--compare-view-toolbar-padding-y` / `--compare-view-toolbar-padding-x`, parts `--compare-view-toolbar-gap` apart:
   - View switch (optional) — a [Segmented Control](../molecules/segmented-control.md): Side by side | Changes.
   - Hide matching rows — a [Switch](../atoms/switch.md): "Show only differences" ([patterns 10.87](../patterns/10-data-display.md)).
   - Add item (side by side) — a [Button](../atoms/button.md), outline, small, while fewer than the maximum items are shown.
3. Item headers — a sticky row on `--compare-view-header-background` over a `--compare-view-row-border-width` `--compare-view-header-border-color` rule. Each, padded `--compare-view-header-padding-y` / `--compare-view-header-padding-x`, holds the item's name in `--compare-view-header-title-font` `--compare-view-header-title-foreground` and its identifier or version in `--compare-view-header-subtitle-font` `--compare-view-header-subtitle-foreground`, `--compare-view-header-gap` apart, with a remove [Icon Button](../atoms/icon-button.md) (`close`, subtle, small). A baseline or current item carries a [Label](../atoms/label.md): "Baseline" or "Current". Headers stay visible while the rows scroll ([patterns 10.87](../patterns/10-data-display.md)).
4. Attribute column — a sticky leading column `--compare-view-attribute-width` wide (draft placeholder; long names wrap), names in `--compare-view-attribute-font` `--compare-view-attribute-foreground`.
5. Rows — one per attribute, cells padded `--compare-view-cell-padding-y` / `--compare-view-cell-padding-x`, values in `--compare-view-cell-font` `--compare-view-cell-foreground` with numbers in tabular figures, separated by `--compare-view-row-border-width` `--compare-view-row-border-color` rules. A missing value shows a dash in `--compare-view-missing-foreground`, announced as "No data"; a value that doesn't apply reads "Not applicable", so the two never look the same. Never a blank ([patterns 10.48](../patterns/10-data-display.md)).
6. Section heading (optional) — groups of attributes ("Network", "Power") in `--compare-view-section-heading-font` `--compare-view-section-heading-foreground` on `--compare-view-section-heading-background`, spanning every column.
7. Change marker (changes) — at the start of a changed row, an [Icon](../atoms/icon.md) at `--compare-view-change-icon-size` `--compare-view-change-gap` before a word in `--compare-view-change-font` `--compare-view-change-foreground`: `add_circle` Added, `remove_circle` Removed, `edit` Changed; and a `--compare-view-change-marker-width` `--compare-view-change-marker-color` bar along the row's leading edge ([patterns 10.90](../patterns/10-data-display.md)).
8. Value group (by value) — one row per distinct value of a setting: the value, its device count in `--compare-view-group-count-font` `--compare-view-group-count-foreground`, and "Differs from baseline" where it does. Each row opens its devices ([patterns 10.106](../patterns/10-data-display.md)).

## Variants
| Type | Columns | Rows | Use |
|---|---|---|---|
| side by side (default) | attribute, then one column per item: up to five, two at compact | every attribute; matching rows can be hidden | choosing between products, devices, plans or people's records |
| changes | attribute, Before, After | only what changed by default; turning "Show only differences" off brings back the rest | a configuration or record before and after an edit, or two versions |
| by value | value, Devices | one row per distinct value, the baseline first, then by count | one setting across a fleet |

In changes, an old value sits beside its new one: Before in `--compare-view-old-value-foreground`, After in `--compare-view-new-value-foreground`. An added row shows a dash for Before; a removed row a dash for After. Shape: rounded (default) → `--compare-view-container-radius-rounded`; sharp → `--compare-view-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| Part | State | Treatment |
|---|---|---|
| Row | enabled | as Anatomy |
| | changed / added / removed | change marker (icon and word) and the leading bar; never colour alone |
| | hidden (matching) | removed from view while "Show only differences" is on; a note says how many are hidden ("12 matching rows hidden") |
| Value group | hover | `--compare-view-group-background-hover` |
| | focused | `--compare-view-focus-ring-width` `--compare-view-focus-ring-color` ring |
| View | no differences | an [Empty State](../molecules/empty-state.md), compact, All done: "These are the same" |
| | too few items | Empty State, First use: "Add another item to compare", with the Add Button |

No transition is defined: hiding matching rows and switching views redraw at once.

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet. `--compare-view-attribute-width` is a draft placeholder on the closest existing step.

| Part | Value |
|---|---|
| Toolbar | `--compare-view-toolbar-padding-y` / `--compare-view-toolbar-padding-x`, `--compare-view-toolbar-gap` between parts |
| Item header | `--compare-view-header-padding-y` / `--compare-view-header-padding-x`, `--compare-view-header-gap` between name and identifier |
| Attribute column | `--compare-view-attribute-width` |
| Cell | `--compare-view-cell-padding-y` / `--compare-view-cell-padding-x`; `--compare-view-cell-gap` inside a cell |
| Change marker | `--compare-view-change-gap` between icon and word; bar `--compare-view-change-marker-width` wide |

Item columns share the remaining width equally. Past the width, the item columns scroll sideways under the sticky attribute column.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | side by side, changes, by value | side by side |
| Items | 2–5 (2 at compact); name, identifier, values | — |
| Baseline | none, first item | none |
| Show only differences | on / off | off (side by side); on (changes) |
| Sections | on / off | off |
| Shape | rounded, sharp | rounded |

## Usage
- Compare in a table-like view, never in cards ([patterns 10.3](../patterns/10-data-display.md)).
- Keep it to about five items, fewer on narrow screens; past that, use a [Table](table.md) with one row per item ([patterns 10.4](../patterns/10-data-display.md)).
- Keep the same attribute order for every item, and put the attributes people decide on first.
- For before and after, show only the changes by default and keep the rest one step away.
- A change value shows its sign and an arrow (`arrow_up`, `arrow_down`); colour shows good or bad only where the direction has a meaning ([patterns 10.89](../patterns/10-data-display.md)).
- Across a fleet, group devices by value and show how many differ from the baseline; don't list every device in a column.
- Composed parts (Segmented Control, Switch, Button, Icon Button, Label, Empty State) bring their own states, sizes and focus rings.

## Accessibility
- Use a real `table`: item names are column headers, attribute names are row headers, so each value is read with both ("Battery, Device B, 82%").
- Section headings are row headers spanning the table.
- Added, removed and changed are words in the row, not only the icon and bar; Before and After are column headers.
- The count of hidden matching rows is announced when the switch changes.
- Removing an item moves focus to the next item's header, or to Add.
- Value groups are links or buttons named in full ("Wi-Fi band 5 GHz, 214 devices, differs from baseline").

## Claude Prompt
Draw a white comparison table with a thin `--compare-view-container-border-color` border and `--compare-view-container-radius-rounded` corners. A toolbar at the top holds a segmented control (Side by side | Changes) and a switch "Show only differences". Below, a sticky header row: an empty attribute cell, then three columns each with a device name in `--compare-view-header-title-font`, a grey serial number, and a small close icon button; the first column carries a "Baseline" label. Rows follow with grey attribute names in `--compare-view-attribute-font` on the left (Battery, OS version, Wi-Fi band, Scanner profile) and values in each column, separated by light hairlines (`--compare-view-row-border-color`); one missing value is a grey dash. In a second frame, the Changes view lists only changed rows, each starting with a small icon and word ("Changed", "Added") and a thin dark bar on the leading edge (`--compare-view-change-marker-color`), the Before value in grey and the After value in near-black.
