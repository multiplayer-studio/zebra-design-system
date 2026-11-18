---
name: Table
level: organism
status: stable
composes: [../molecules/search.md, ../molecules/select.md, ../molecules/pagination.md, ../molecules/dropdown-menu.md, ../atoms/checkbox.md, ../atoms/icon-button.md, ../atoms/button.md, ../atoms/avatar.md, ../atoms/label.md, ../atoms/status-label.md, ../atoms/scrollbar.md, ../atoms/tooltip.md, ../atoms/icon.md, ../atoms/skeleton.md, ../molecules/empty-state.md]
tokens:
  # container
  table-container-radius-rounded: '{radius.radius-element-md}'
  table-container-radius-sharp: '{radius.radius-none}'
  table-container-border-width: '{stroke.stroke-thin}'
  table-content-max-height: '{component-sizes.size-table-content-max-height}'
  # controls bar and footer
  table-bar-background: '{colors.color-fill-default}'
  table-bar-padding-y: '{space.space-md}'
  table-bar-padding-x: '{space.space-lg}'
  table-bar-gap: '{space.space-sm}'
  table-footer-start-gap: '{space.space-xl}'
  table-footer-text-foreground: '{colors.color-ink-medium}'
  table-footer-text-font: '{typography.type-body-small}'
  # header cell
  table-header-cell-background-enabled: '{colors.color-fill-default}'
  table-header-cell-background-hover: '{colors.color-fill-faint}'
  table-header-cell-background-focused: '{colors.color-fill-default}'
  table-header-cell-background-disabled: '{colors.color-fill-disabled}'
  table-header-cell-border-color: '{colors.color-line-default}'
  table-header-cell-padding-y: '{space.space-md}'
  table-header-cell-padding-y-dense: '{space.space-xs}'
  table-header-cell-padding-x: '{space.space-lg}'
  table-header-label-gap: '{space.space-2xs}'
  table-header-label-foreground: '{colors.color-ink-high}'
  table-header-label-foreground-disabled: '{colors.color-ink-disabled}'
  table-header-label-font: '{typography.type-label-medium}'
  table-header-filter-foreground: '{colors.color-ink-high}'
  table-header-filter-foreground-active: '{colors.color-ink-brand}'
  table-header-filter-foreground-disabled: '{colors.color-ink-disabled}'
  table-header-icon-size: '{icon.icon-size-small}'
  # sort
  table-sort-foreground: '{colors.color-ink-low}'
  table-sort-foreground-hover: '{colors.color-ink-medium}'
  table-sort-foreground-active: '{colors.color-ink-high}'
  table-sort-foreground-disabled: '{colors.color-ink-disabled}'
  table-sort-order-font: '{typography.type-indicator-small}'
  # resize grip
  table-resize-grip-width: '{stroke.stroke-thick}'
  table-resize-grip-color-hover: '{colors.color-line-strong}'
  table-resize-grip-color-focused: '{colors.color-line-focus}'
  # data cell
  table-cell-background-enabled: '{colors.color-fill-default}'
  table-cell-background-hover: '{colors.color-fill-faint}'
  table-cell-background-selected: '{colors.color-fill-selection}'
  table-cell-border-color: '{colors.color-line-subtle}'
  table-cell-background-striped: '{colors.color-fill-faint}'
  table-cell-background-hover-striped: '{colors.color-fill-sunken}'
  table-cell-padding-y: '{space.space-md}'
  table-cell-padding-y-dense: '{space.space-xs}'
  table-cell-padding-x: '{space.space-lg}'
  table-cell-gap: '{space.space-sm}'
  table-cell-text-foreground: '{colors.color-ink-high}'
  table-cell-text-foreground-disabled: '{colors.color-ink-disabled}'
  table-cell-text-font: '{typography.type-body-small}'
  table-cell-subtext-foreground: '{colors.color-ink-medium}'
  table-cell-subtext-font: '{typography.type-body-xsmall}'
  # select, expand and actions cells
  table-control-cell-padding-x: '{space.space-md}'
  table-row-actions-gap: '{space.space-3xs}'
  # row error
  table-row-error-indicator-width: '{stroke.stroke-thick}'
  table-row-error-indicator-color: '{colors.color-status-error-default}'
  # totals row
  table-totals-background: '{colors.color-fill-default}'
  table-totals-border-color: '{colors.color-line-default}'
  table-totals-border-width: '{stroke.stroke-thick}'
  table-totals-font: '{typography.type-label-medium}'
  table-totals-foreground: '{colors.color-ink-high}'
  # reflow (label and value) layout
  table-reflow-row-gap: '{space.space-2xs}'
  table-reflow-pair-gap: '{space.space-sm}'
  table-reflow-label-font: '{typography.type-label-small}'
  table-reflow-label-foreground: '{colors.color-ink-medium}'
  # frozen columns and scrolling
  table-frozen-border-color: '{colors.color-line-default}'
  table-scrollbar-padding: '{space.space-2xs}'
  # empty row
  table-empty-padding-y: '{space.space-md}'
  table-empty-padding-x: '{space.space-lg}'
  table-empty-foreground: '{colors.color-ink-medium}'
  table-empty-font: '{typography.type-body-xsmall}'
  # missing value
  table-missing-foreground: '{colors.color-ink-medium}'
  # focus
  table-focus-ring-width: '{stroke.stroke-thick}'
  table-focus-ring-color: '{colors.color-line-focus}'
---

# Table

> A data table of rows in columns, with an optional controls bar above and a footer below, that can select, count, sort, search, filter, page, resize, hide, freeze, expand rows, total and reflow on narrow widths. It's for comparing many items across several attributes ([patterns 10.1](../patterns/10-data-display.md), [10.4](../patterns/10-data-display.md)), never for layout.

## Anatomy
1. Container — stacks the controls bar, content and footer with no gap and no padding of its own, clipped to `--table-container-radius-rounded` corners. It draws no frame border (Figma has none); the rules between rows, under the header and at a frozen edge are `--table-container-border-width`.
2. Controls bar (hasControl) — on `--table-bar-background`, padded `--table-bar-padding-y` / `--table-bar-padding-x`, `--table-bar-gap` between parts:
   - Search field — a [Search](../molecules/search.md), small (control height), at the bar's leading end ([patterns 1.84](../patterns/01-screen-composition.md)).
   - Selected count (optional) — a neutral [Label](../atoms/label.md) after the search, shown only while rows are selected, alongside the actions that apply to all of them ([patterns 1.80](../patterns/01-screen-composition.md)).
   - Updates waiting (live tables) — a small [Button](../atoms/button.md) (text) reading the count of rows waiting ("12 updated"); see Live updates.
   - Controls slot — extra actions (refresh, export, view options), `--table-bar-gap` apart, toward the trailing end.
   - Column settings (optional) — an [Icon Button](../atoms/icon-button.md) at the trailing end that opens the column panel ([patterns 1.94](../patterns/01-screen-composition.md)).
3. Content — the columns, in order: expand control, selection, identifier, then the other columns by importance ([patterns 10.8](../patterns/10-data-display.md)). It takes the height between the bar and the footer, or caps at `--table-content-max-height` with Vertical Scroll and scrolls inside with a [Scrollbar](../atoms/scrollbar.md) inset `--table-scrollbar-padding`. The header row is sticky whenever the table or the page scrolls ([patterns 10.18](../patterns/10-data-display.md)). Frozen columns sit before a `--table-frozen-border-color` edge and stay put while the rest scroll sideways; a column cut off at the trailing edge shows there's more.
   - Header cell — on `--table-header-cell-background-enabled`, padded `--table-header-cell-padding-y` / `--table-header-cell-padding-x`, bottom border `--table-header-cell-border-color`. It holds the column label in `--table-header-label-font` `--table-header-label-foreground`, wrapping to two lines before it truncates (full text on hover and focus, [patterns 10.14](../patterns/10-data-display.md)); on a sortable column a sort mark `--table-header-label-gap` after the label (see Sorting); and an optional trailing filter [Icon](../atoms/icon.md) at `--table-header-icon-size`. A column of times names its time zone in the label ([patterns 10.103](../patterns/10-data-display.md)), and a column of one unit names the unit. A resize grip sits on its trailing edge. A selection or actions header shows only its control but keeps a hidden label.
   - Data cell — on `--table-cell-background-enabled`, padded `--table-cell-padding-y` / `--table-cell-padding-x`, bottom border `--table-cell-border-color`. Text in `--table-cell-text-font` `--table-cell-text-foreground`, wrapping by default ([patterns 10.51](../patterns/10-data-display.md)). The avatar-and-text cell puts an [Avatar](../atoms/avatar.md) `--table-cell-gap` before a title and a subtitle (`--table-cell-subtext-font` `--table-cell-subtext-foreground`). The number cell aligns to the trailing edge and sets tabular figures (`font-variant-numeric: tabular-nums`, no token) with the same decimal places down the column ([patterns 10.11](../patterns/10-data-display.md), [10.12](../patterns/10-data-display.md)). A cell can hold a [Status Label](../atoms/status-label.md) or any content through its slot.
   - Missing value — never a blank cell: a dash in `--table-missing-foreground`, announced as "No data" or "Not applicable", whichever is true. Unknown and not applicable never look the same, and a value the person isn't allowed to see reads "Restricted" ([patterns 10.48](../patterns/10-data-display.md), [10.102](../patterns/10-data-display.md)).
   - Expand column (Expandable rows) — a subtle small Icon Button per row (`chevron_right`, `expand_more` when open), padded `--table-control-cell-padding-x`, first in the row.
   - Selection column (Selectable) — [Checkbox](../atoms/checkbox.md) cells padded `--table-control-cell-padding-x`: select-all in the header, one per row.
   - Actions column (Row Actions) — at the row's trailing end, padded `--table-control-cell-padding-x`. Inline: one or two subtle small Icon Buttons, `--table-row-actions-gap` apart. Menu: a more Icon Button (`more_vertical`) opening a compact [Dropdown Menu](../molecules/dropdown-menu.md) of the row's actions. With three or more actions, the menu holds the rest ([patterns 10.24](../patterns/10-data-display.md)).
   - Expanded detail — a row under an expanded row spanning every column, with the cell padding, holding extra detail for that row only ([patterns 10.23](../patterns/10-data-display.md)).
   - Totals row (Show Totals) — a summary row at the bottom of the content on `--table-totals-background`, a `--table-totals-border-width` `--table-totals-border-color` rule above it, values in `--table-totals-font` `--table-totals-foreground`. Columns without a total stay empty ([patterns 10.27](../patterns/10-data-display.md)).
   - Empty row — one row spanning every column under the kept header, padded `--table-empty-padding-y` / `--table-empty-padding-x`, in `--table-empty-font` `--table-empty-foreground`. It says which kind of empty it is: nothing yet, nothing matches the filters (with a way to clear them), or nothing to see without filters set ([patterns 10.29](../patterns/10-data-display.md)). For a roomier message it holds a compact [Empty State](../molecules/empty-state.md).
   - Loading rows — [Skeleton](../atoms/skeleton.md) text lines in each cell of a few rows under the real header while the table first loads ([patterns 10.28](../patterns/10-data-display.md)).
4. Footer (hasFooter) — on `--table-bar-background` with the bar's padding. The start holds the page summary in `--table-footer-text-font` `--table-footer-text-foreground` and, `--table-footer-start-gap` after it, Rows per page: a label and a small compact [Select](../molecules/select.md). [Pagination](../molecules/pagination.md) sits at the opposite end.
5. Menus — compact Dropdown Menus for row actions, a column's filter (checkbox items) and column settings.
6. Tooltip — a [Tooltip](../atoms/tooltip.md) showing truncated text in full, on hover and on focus.

## Variants
Shape: rounded (default) → `--table-container-radius-rounded`, and every component inside takes its rounded option (search, buttons, checkboxes, status labels, pagination); sharp → `--table-container-radius-sharp` and the sharp option throughout. In the AAA modes the component is always sharp (DESIGN.md §5).

| Option | Adds |
|---|---|
| hasControl (on) | the controls bar |
| hasFooter (on) | the footer |
| Selectable (on) | the selection column |
| Row Actions (menu) | the actions column: inline icon buttons, a more menu, or off |
| Expandable rows (off) | the expand column and expanded detail rows |
| Show Totals (off) | the totals row |
| Vertical Scroll (off) | caps the content at `--table-content-max-height`; the header stays sticky |
| Horizontal Scroll | lets columns scroll sideways under a scrollbar |
| Column Position | frozen (default: the identifier column stays put), default (nothing frozen), or frozen up to a chosen column |
| Selected Count (on) | the count label in the controls bar |
| Column Settings (on) | the settings button and column panel |
| Rows Per Page (on) | the page-size Select in the footer |
| Striped (off) | every second row on `--table-cell-background-striped` |

Density ([patterns 5.45](../patterns/05-sizes-devices.md), [10.95](../patterns/10-data-display.md)): default, or `dense`, which sets header and data cells to `--table-header-cell-padding-y-dense` / `--table-cell-padding-y-dense` top and bottom. Dense is for pointer-driven expert consoles; it's a product-wide choice, and rows still meet the product's target size. Density comes from removing what isn't data, never from smaller text.

Layout (by the width the table is given, not the window, [patterns 5.2](../patterns/05-sizes-devices.md), [5.20](../patterns/05-sizes-devices.md)):

| Layout | Use | Shape |
|---|---|---|
| columns (default) | people compare across rows | the table keeps its columns; on a narrow container it scrolls sideways inside its own area, header and identifier column pinned |
| reflow | people read one record at a time | each row becomes a block: the identifier as its title, then the other columns beneath it in priority order as label and value pairs, label in `--table-reflow-label-font` `--table-reflow-label-foreground`, pairs `--table-reflow-pair-gap` apart and label to value `--table-reflow-row-gap`. Row dividers, selection and actions stay with the block |

Either way the page itself never scrolls sideways, and the controls bar and footer still reflow. A table is never put in a container narrower than its identifier and first priority column ([patterns 5.21](../patterns/05-sizes-devices.md)).

## States
| Part | State | Background | Foreground / border |
|---|---|---|---|
| Data row | enabled | `--table-cell-background-enabled` | `--table-cell-text-foreground` |
| | hover | `--table-cell-background-hover` | unchanged |
| | hover (Striped, even rows) | `--table-cell-background-hover-striped` | unchanged |
| | selected | `--table-cell-background-selected` across every column | checkbox checked |
| | disabled | `--table-cell-background-enabled` | `--table-cell-text-foreground-disabled` on everything in the row; can't be selected, and says why on hover and focus |
| | error | unchanged | a `--table-row-error-indicator-width` `--table-row-error-indicator-color` bar on the row's leading edge, plus an error [Status Label](../atoms/status-label.md) (icon and word) in its status cell and a way to resolve it in the row ([patterns 10.26](../patterns/10-data-display.md)) |
| | expanded | unchanged | the expand Icon Button shows `expand_more`; the detail row follows |
| | loading | — | skeleton lines in place of the cell content |
| Header cell | enabled | `--table-header-cell-background-enabled` | `--table-header-label-foreground` |
| | hover | `--table-header-cell-background-hover` | sortable mark `--table-sort-foreground-hover` |
| | focused | `--table-header-cell-background-focused` | `--table-focus-ring-width` `--table-focus-ring-color` ring |
| | disabled | `--table-header-cell-background-disabled` | `--table-header-label-foreground-disabled`, mark `--table-sort-foreground-disabled` |
| Sort mark | unsorted (sortable) | — | the neutral sortable mark (`unfold_more`) in `--table-sort-foreground`, shown at rest so touch users see which columns sort |
| | ascending / descending | — | a direction arrow (`arrow_up` / `arrow_down`) in `--table-sort-foreground-active`; with several sorted columns, its order ("1", "2") in `--table-sort-order-font` after it |
| Filter icon | filtered | — | `--table-header-filter-foreground-active` (rest `--table-header-filter-foreground`, disabled header `--table-header-filter-foreground-disabled`) |
| Actions cell | open | unchanged | the more Icon Button holds its pressed state while its menu is open |
| Resize grip | hover / focused | `--table-resize-grip-color-hover` / `--table-resize-grip-color-focused`, `--table-resize-grip-width` wide, full cell height | |

Behaviour:
- **Selection**: select-all covers the enabled rows shown and is indeterminate while only some are selected, then offers to extend to everything that matches ([patterns 3.73](../patterns/03-controls-interaction.md), [3.74](../patterns/03-controls-interaction.md)). While any are selected, the count label shows how many.
- **Sorting** ([patterns 10.15](../patterns/10-data-display.md), [10.16](../patterns/10-data-display.md)): the header of a sortable column is the sort control. Choosing it sorts ascending; choosing it again reverses. There is no unsorted step: choosing another column moves the sort there. Shift-choosing another column adds it as the next sort key (multi-sort), each sorted column showing its direction and order. The default sort is by what matters most, not alphabetical. Client-side, the table reorders the rows; otherwise the consumer does. Re-sorting or refiltering shows progress on the table, never a reload of the screen.
- **Search and filter**: search matches every cell's text. A filterable header opens a compact checkbox menu of the column's values; a filtered column keeps its icon in `--table-header-filter-foreground-active`.
- **Paging**: Rows per page sets the page size. Client-side, the summary and page count are worked out, and sorting, searching or filtering returns to page 1.
- **Column resizing**: dragging a header's trailing edge trades width with the next resizable columns, so the table width never changes. Arrow keys step it; double-click resets it.
- **Column settings** ([patterns 10.30](../patterns/10-data-display.md)): show, hide and reorder columns without dragging, and freeze up to a chosen column. The identifier column can't be hidden. The table shows when columns are hidden, and the layout persists between sessions.
- **Row actions**: inline actions and menu items name their row to assistive technology ("Edit Printer 3"). The more button opens a compact menu; Escape closes it and returns focus to the button. After a row is deleted, focus moves to the next row.
- **Rows that open**: by default a row either opens its item or is edited in place, not both ([patterns 10.6](../patterns/10-data-display.md)). Rows that don't open anything show no press response.
- **Wrapping and truncation**: content cells wrap by default. A resizable column in a dense operational table may truncate instead, with the full value in the Tooltip on hover and focus. Identifiers, paths and file names truncate in the middle ([patterns 10.51](../patterns/10-data-display.md), [10.52](../patterns/10-data-display.md)). A cell that can't take focus never truncates.
- **Expandable rows**: the expand button opens a detail row under its row; rows start collapsed. Detail that's cramped there moves to a side panel or page. Hierarchical data uses an expanding outline, not this.
- **Totals**: totals cover what the table holds. Where the table loads more as it scrolls, the total covers all rows, comes from the service and says so.
- **Live updates** ([patterns 10.98](../patterns/10-data-display.md), [10.78](../patterns/10-data-display.md)): a table that updates by itself never moves rows while someone is pointing at, focusing on or selecting them. New and changed rows wait behind the Updates waiting button ("12 updated"), which applies them when chosen. A pause control in the controls slot stops updates; on resume the table jumps to the latest data and says it was paused. The table shows when it was last updated.
- **Export**: exporting includes every row that matches the current filters, not just the loaded ones, in the visible columns and their order, and says what it includes ([patterns 10.109](../patterns/10-data-display.md)).

No transition is defined for the bar or footer appearing.

## Spacing & Sizing
| Part | Value |
|---|---|
| Controls bar / footer | `--table-bar-padding-y` top and bottom, `--table-bar-padding-x` sides; one small control tall plus padding |
| Footer start | `--table-footer-start-gap` between the summary and Rows per page; pagination pushed to the far end |
| Header / data cell | `--table-header-cell-padding-y` / `--table-header-cell-padding-x`; `--table-cell-padding-y` / `--table-cell-padding-x`; dense `--table-header-cell-padding-y-dense` / `--table-cell-padding-y-dense` top and bottom |
| Expand / select / actions cell | `--table-control-cell-padding-x` sides; inline actions `--table-row-actions-gap` apart |
| Row height | a minimum, from the padding and one line; rows grow as their text wraps |
| Vertical Scroll | content at most `--table-content-max-height` |

Width fills its container (Figma draws a fixed frame). Columns take the width their content needs, and spare width goes to the widest text column ([patterns 10.17](../patterns/10-data-display.md)); resized columns trade width, so the table width holds. Everything around the table matches its row height: bar, selection count and footer ([patterns 10.19](../patterns/10-data-display.md)).

## Properties
| Property | Options | Default |
|---|---|---|
| hasControl | on / off | on |
| hasFooter | on / off | on |
| Shape | rounded, sharp | rounded |
| Selectable | on / off | on |
| Row Actions | off, inline, menu | menu |
| Expandable rows | on / off | off |
| Show Totals | on / off | off |
| Striped | on / off | off |
| Density | default, dense | default |
| Layout | columns, reflow | columns |
| Vertical Scroll | on / off | off |
| Horizontal Scroll | on / off | off |
| Column Position | frozen (identifier), default, frozen to a chosen column | frozen (identifier) |
| Selected Count | on / off | on |
| Column Settings | on / off | on |
| Rows Per Page | on / off | on |
| Column | sortable, filterable, resizable (each on / off); cell type text, number, avatar and text, slot; priority (for reflow) | — |
| Allow disabled selection | on / off (code only) | off |
| Live updates | off, hold (code only) | off |

## Usage
- Align and order columns by the data rules ([patterns 10.8](../patterns/10-data-display.md)–[10.13](../patterns/10-data-display.md)); keep headers to short noun phrases.
- Turn hasFooter off only for a table short enough that pagination has nothing to do; paginate or virtualise long data.
- Use the controls bar for table-wide actions; per-row actions go in the actions column, one or two inline, more in the menu.
- Keep the identifier column frozen when the table scrolls sideways ([patterns 10.18](../patterns/10-data-display.md)).
- Turn Striped on only for wide tables or tables that scroll sideways ([patterns 10.20](../patterns/10-data-display.md)); rows keep their dividers either way.
- Use reflow where people read one record at a time on a narrow container, columns where they compare across rows.
- Never blank a missing value or fill it with zero; use the dash and say which kind of missing it is.
- Composed parts (checkboxes, icon buttons, search, pagination) bring their own states, sizes and focus rings.

## Accessibility
- Use a real `table` with header cells scoped to their columns, so every cell is announced with its headers ([patterns 6.99](../patterns/06-accessibility.md)). Only a sorted header carries `aria-sort`; sortable headers are buttons named with the column and its sort.
- **Keyboard model** ([patterns 10.7](../patterns/10-data-display.md), [6.35](../patterns/06-accessibility.md)): a table only for reading keeps normal focus order. A table whose cells are acted on (selection, inline actions, expand, inline editing) is a grid (`role="grid"`): one tab stop, arrow keys move between cells, Home and End go to the row's ends, Enter or F2 enters a cell's control and Escape returns to the cell, and coming back lands on the last cell used.
- Select-all reports mixed (`aria-checked="mixed"` or the indeterminate property) while only some rows are selected; every row checkbox is named after its row.
- The selected count, result counts and "12 updated" are announced without moving focus ([patterns 6.53](../patterns/06-accessibility.md)).
- The resize grip is focusable, operated with the arrow keys, and named for its column.
- Selected rows are shown by fill and the checked checkbox, never fill alone ([patterns 10.22](../patterns/10-data-display.md)).
- The truncation tooltip is hidden from assistive technology; the cell itself carries the full text.
- A disabled row stays reachable and gives its reason on hover and focus (locked, no permission, not applicable to the action).
- The expand button reports `aria-expanded`; a row error is announced with the row's name.

## Claude Prompt
Draw a white data table with no outer frame and `--table-container-radius-rounded` corners. At the top, a controls bar with `--table-bar-padding-x` side padding: a small search field on the left followed by a blue "2 selected" label, and a settings icon button on the right. Below, a header row with a checkbox column, column titles in `--table-header-label-font` near-black, a small grey up-down mark on sortable columns and a dark down arrow on the sorted one, and a filter icon on one column, over a grey bottom line (`--table-header-cell-border-color`). Rows are `--table-cell-padding-y` top and bottom, separated by light hairlines (`--table-cell-border-color`), text in `--table-cell-text-font`; one column shows a small avatar with a name and a grey subtitle, one shows coloured status labels, and the last column has a vertical-dots icon button. Two selected rows are tinted pale blue (`--table-cell-background-selected`). The footer shows "Showing 1–8 of 126" in grey (`--table-footer-text-foreground`), a rows-per-page select, and pagination at the right.
