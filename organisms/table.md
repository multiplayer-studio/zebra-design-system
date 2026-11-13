---
name: Table
level: organism
status: stable
composes: [../molecules/search.md, ../molecules/select.md, ../molecules/pagination.md, ../molecules/dropdown-menu.md, ../atoms/checkbox.md, ../atoms/icon-button.md, ../atoms/avatar.md, ../atoms/label.md, ../atoms/status-label.md, ../atoms/scrollbar.md, ../atoms/tooltip.md, ../atoms/icon.md]
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
  table-sort-foreground-disabled: '{colors.color-ink-disabled}'
  # resize grip
  table-resize-grip-width: '{stroke.stroke-thick}'
  table-resize-grip-color-hover: '{colors.color-line-strong}'
  table-resize-grip-color-focused: '{colors.color-line-focus}'
  # data cell
  table-cell-background-enabled: '{colors.color-fill-default}'
  table-cell-background-hover: '{colors.color-fill-faint}'
  table-cell-background-selected: '{colors.color-fill-selection}'
  table-cell-border-color: '{colors.color-line-subtle}'
  table-cell-padding-y: '{space.space-md}'
  table-cell-padding-x: '{space.space-lg}'
  table-cell-gap: '{space.space-sm}'
  table-cell-text-foreground: '{colors.color-ink-high}'
  table-cell-text-foreground-disabled: '{colors.color-ink-disabled}'
  table-cell-text-font: '{typography.type-body-small}'
  table-cell-subtext-foreground: '{colors.color-ink-medium}'
  table-cell-subtext-font: '{typography.type-body-xsmall}'
  # select and actions cells
  table-control-cell-padding-x: '{space.space-md}'
  # frozen columns and scrolling
  table-frozen-border-color: '{colors.color-line-default}'
  table-scrollbar-padding: '{space.space-2xs}'
  # empty row
  table-empty-padding-y: '{space.space-md}'
  table-empty-padding-x: '{space.space-lg}'
  table-empty-foreground: '{colors.color-ink-medium}'
  table-empty-font: '{typography.type-body-xsmall}'
  # focus
  table-focus-ring-width: '{stroke.stroke-thick}'
  table-focus-ring-color: '{colors.color-line-focus}'
---

# Table

> A data table of rows in columns, with an optional controls bar above and a footer below, that can select, count, sort, search, filter, page, resize, hide and freeze.

## Anatomy
1. Container — stacks the controls bar, content and footer with no gap and no padding of its own, clipped to `--table-container-radius-rounded` corners. It draws no frame border (Figma has none); the rules between rows, under the header and at a frozen edge are `--table-container-border-width`.
2. Controls bar (hasControl) — on `--table-bar-background`, padded `--table-bar-padding-y` / `--table-bar-padding-x`, `--table-bar-gap` between parts:
   - Selected count (optional) — an info [Label](../atoms/label.md) at the start, shown only while rows are selected.
   - Search field — a [Search](../molecules/search.md), small (control height), right-aligned with the slot.
   - Controls slot — extra actions, `--table-bar-gap` apart.
   - Column settings (optional) — an [Icon Button](../atoms/icon-button.md) at the end that opens the column panel.
3. Content — the columns. It takes the height between the bar and the footer, or caps at `--table-content-max-height` with Vertical Scroll and scrolls under a sticky header with a [Scrollbar](../atoms/scrollbar.md) inset `--table-scrollbar-padding`. Frozen columns sit before a `--table-frozen-border-color` edge and stay put while the rest scroll sideways.
   - Header cell — on `--table-header-cell-background-enabled`, padded `--table-header-cell-padding-y` / `--table-header-cell-padding-x`, bottom border `--table-header-cell-border-color`. It holds the column label in `--table-header-label-font` `--table-header-label-foreground`, an optional sort caret (`--table-header-label-gap` after it), and an optional trailing filter [Icon](../atoms/icon.md) at `--table-header-icon-size`. A resize grip sits on its trailing edge.
   - Data cell — on `--table-cell-background-enabled`, padded `--table-cell-padding-y` / `--table-cell-padding-x`, bottom border `--table-cell-border-color`. Text in `--table-cell-text-font` `--table-cell-text-foreground`; the avatar-and-text cell puts an [Avatar](../atoms/avatar.md) `--table-cell-gap` before a title and a subtitle (`--table-cell-subtext-font` `--table-cell-subtext-foreground`). A cell can hold a [Status Label](../atoms/status-label.md) or any content through its slot.
   - Selection column (Selectable) — [Checkbox](../atoms/checkbox.md) cells padded `--table-control-cell-padding-x`: select-all in the header, one per row.
   - Actions column (Row Actions) — a trailing more Icon Button per row (subtle, small) padded `--table-control-cell-padding-x`, opening a compact [Dropdown Menu](../molecules/dropdown-menu.md) of the row's actions.
   - Empty row — one row spanning every column, padded `--table-empty-padding-y` / `--table-empty-padding-x`, reading the empty label in `--table-empty-font` `--table-empty-foreground`.
4. Footer (hasFooter) — on `--table-bar-background` with the bar's padding. The start holds the page summary in `--table-footer-text-font` `--table-footer-text-foreground` and, `--table-footer-start-gap` after it, Rows per page: a label and a small compact [Select](../molecules/select.md). [Pagination](../molecules/pagination.md) sits at the opposite end.
5. Menus — compact Dropdown Menus for row actions, a column's filter (checkbox items) and column settings.
6. Tooltip — a [Tooltip](../atoms/tooltip.md) showing truncated text in full.

## Variants
Shape: rounded (default) → `--table-container-radius-rounded`, and every component inside takes its rounded option (search, buttons, checkboxes, status labels, pagination); sharp → `--table-container-radius-sharp` and the sharp option throughout. In the AAA modes the component is always sharp (DESIGN.md §5).

| Option | Adds |
|---|---|
| hasControl (on) | the controls bar |
| hasFooter (on) | the footer |
| Selectable (on) | the selection column |
| Row Actions (on) | the actions column |
| Vertical Scroll (off) | caps the content at `--table-content-max-height` with a sticky header |
| Horizontal Scroll | lets columns scroll sideways under a scrollbar |
| Column Position | default, frozen (columns before the frozen edge stay put) |
| Selected Count (on) | the count label in the controls bar |
| Column Settings (on) | the settings button and column panel |
| Rows Per Page (on) | the page-size Select in the footer |

## States
| Part | State | Background | Foreground / border |
|---|---|---|---|
| Data row | enabled | `--table-cell-background-enabled` | `--table-cell-text-foreground` |
| | hover | `--table-cell-background-hover` | unchanged |
| | selected | `--table-cell-background-selected` across every column | checkbox checked |
| | disabled | `--table-cell-background-enabled` | `--table-cell-text-foreground-disabled` on everything in the row; not selectable, clickable or openable |
| Header cell | enabled | `--table-header-cell-background-enabled` | `--table-header-label-foreground` |
| | hover | `--table-header-cell-background-hover` | sort caret `--table-sort-foreground-hover` |
| | focused | `--table-header-cell-background-focused` | `--table-focus-ring-width` `--table-focus-ring-color` ring |
| | disabled | `--table-header-cell-background-disabled` | `--table-header-label-foreground-disabled`, caret `--table-sort-foreground-disabled` |
| Sort caret | none / ascending / descending | — | `--table-sort-foreground` at rest |
| Filter icon | filtered | — | `--table-header-filter-foreground-active` (rest `--table-header-filter-foreground`, disabled header `--table-header-filter-foreground-disabled`) |
| Actions cell | open | unchanged | the more Icon Button holds its pressed state while its menu is open |
| Resize grip | hover / focused | `--table-resize-grip-color-hover` / `--table-resize-grip-color-focused`, `--table-resize-grip-width` wide, full cell height | |

Behaviour:
- **Selection**: select-all covers the enabled rows shown and is indeterminate while only some are selected. While any are selected, the count label shows how many.
- **Sorting**: a sortable header cycles none, ascending, descending. Client-side, the table reorders the rows; otherwise the consumer does.
- **Search and filter**: search matches every cell's text. A filterable header opens a compact checkbox menu of the column's values; a filtered column keeps its icon in `--table-header-filter-foreground-active`.
- **Paging**: Rows per page sets the page size. Client-side, the summary and page count are worked out, and sorting, searching or filtering returns to page 1.
- **Column resizing**: dragging a header's trailing edge trades width with the next resizable columns, so the table width never changes. Arrow keys step it; double-click resets it.
- **Column settings**: show or hide columns and freeze up to a chosen column. The last visible column can't be hidden.
- **Row actions**: the more button opens a compact menu; Escape closes it and returns focus to the button.
- **Truncation**: text cut off in a narrow column shows in full in a tooltip after a short hover.

No transition is defined for the bar or footer appearing.

## Spacing & Sizing
| Part | Value |
|---|---|
| Controls bar / footer | `--table-bar-padding-y` top and bottom, `--table-bar-padding-x` sides; one small control tall plus padding |
| Footer start | `--table-footer-start-gap` between the summary and Rows per page; pagination pushed to the far end |
| Header / data cell | `--table-header-cell-padding-y` / `--table-header-cell-padding-x`; `--table-cell-padding-y` / `--table-cell-padding-x` |
| Select / actions cell | `--table-control-cell-padding-x` sides |
| Vertical Scroll | content at most `--table-content-max-height` |

Width fills its container (Figma draws a fixed frame); columns trade width when resized, so the table width holds.

## Properties
| Property | Options | Default |
|---|---|---|
| hasControl | on / off | on |
| hasFooter | on / off | on |
| Shape | rounded, sharp | rounded |
| Selectable | on / off | on |
| Row Actions | on / off | on |
| Vertical Scroll | on / off | off |
| Horizontal Scroll | on / off | off |
| Column Position | default, frozen | default |
| Selected Count | on / off | on |
| Column Settings | on / off | on |
| Rows Per Page | on / off | on |
| Column | sortable, filterable, resizable (each on / off); cell type text, avatar and text, slot | — |
| Allow disabled selection | on / off (code only) | off |

## Usage
- Left-align text and right-align numbers; keep headers short.
- Turn hasFooter off only for a table short enough that pagination has nothing to do; paginate or virtualise long data.
- Use the controls bar for table-wide actions; per-row actions go in the actions column.
- Freeze identifying columns (name, ID) when the table scrolls sideways.
- Don't use the empty row for a full empty state; it's a single row of text.
- Composed parts (checkboxes, icon buttons, search, pagination) bring their own states, sizes and focus rings.

## Accessibility
- Use a real `table` with header cells scoped to their columns. A sorted header carries `aria-sort`; sortable headers are buttons.
- Select-all reports mixed (`aria-checked="mixed"` or the indeterminate property) while only some rows are selected; every row checkbox is named after its row.
- The selected count lives in a polite live region, so screen readers hear it change.
- The resize grip is focusable, operated with the arrow keys, and named for its column.
- Selected rows are shown by fill; the checked checkbox is the non-colour cue.
- The truncation tooltip is hidden from assistive technology; the cell itself carries the full text.
- Disabled rows need a reason nearby; the dimmed text alone doesn't say why.

## Stitch Prompt
Draw a white data table with no outer frame and `--table-container-radius-rounded` corners. At the top, a controls bar with `--table-bar-padding-x` side padding: a blue "2 selected" label on the left and, on the right, a small search field and a settings icon button. Below, a header row with a checkbox column, column titles in `--table-header-label-font` near-black with small grey sort carets, and a filter icon on one column, over a grey bottom line (`--table-header-cell-border-color`). Rows are `--table-cell-padding-y` top and bottom, separated by light hairlines (`--table-cell-border-color`), text in `--table-cell-text-font`; one column shows a small avatar with a name and a grey subtitle, one shows coloured status labels, and the last column has a vertical-dots icon button. Two selected rows are tinted pale blue (`--table-cell-background-selected`). The footer shows "Showing 1–8 of 126" in grey (`--table-footer-text-foreground`), a rows-per-page select, and pagination at the right.
