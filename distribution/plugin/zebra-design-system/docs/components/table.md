# Table

> A data table with rows of content in columns, framed by an optional controls bar above and a footer below. It can select and count rows, sort, search, filter and page them, resize, show, hide and freeze columns, and open a compact actions menu per row. The controls bar, content and footer are exposed, so their own properties are set from Table.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-table>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `hasControl` | boolean | `true` |  |  |
| `hasFooter` | boolean | `true` |  |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `selectable` | boolean | `true` |  |  |
| `rowActions` | boolean | `true` |  |  |
| `verticalScroll` | enum | `false` | `false` `true` |  |
| `columnPosition` | enum | `default` | `default` `frozen` |  |
| `horizontalScroll` | enum | `false` | `false` `true` |  |
| `selectedCount` | boolean | `false` |  |  |
| `columnSettings` | boolean | `false` |  |  |
| `search` | boolean | `true` |  |  |
| `controls` | boolean | `true` |  |  |
| `rowsPerPage` | boolean | `false` |  |  |
| `pageDetails` | boolean | `true` |  |  |
| `pagination` | boolean | `true` |  |  |

## When and how to use

### Do

- Turn hasControl off when the table doesn't need its own search or extra actions above it.
- Turn hasFooter off for a table short enough that pagination has nothing to do.
- Turn Selectable on only when selected rows feed an action, such as a bulk delete.

### Don't

- Don't try to hide the last column in the settings panel. The table keeps one showing.
- Don't rely on slotted controls in a disabled row. They ignore the pointer unless disabled selection is allowed.

## Behaviour

- **Motion** — No transition is defined for the controls bar or the footer appearing and disappearing.
- **Selection** — A checkbox per row and select-all in the header. Select-all covers the enabled rows shown and is indeterminate while only some are selected. Selected rows take the selected fill across every column.
- **Selected count** — While rows are selected, an info Label at the start of the controls bar counts them. Screen readers hear the count change.
- **Sorting** — A sortable header cycles none, ascending and descending. Client-side, the table reorders the rows itself; otherwise the consumer does.
- **Search and filter** — Search matches every cell's text. A filterable header opens a compact checkbox menu of the column's values, and a filtered column keeps its glyph in foreground/cursor.
- **Paging** — Rows per page sets the page size. Client-side, the summary and page count are worked out, and sorting, searching or filtering returns to page 1.
- **Column resizing** — Hovering a header's trailing edge shows the neutral hover border at full cell height. Dragging trades width with the next resizable columns, so the table width never changes. Arrow keys step it and a double-click resets it.
- **Column settings** — The settings panel shows or hides columns and freezes up to a chosen column. The last column showing can't be hidden.
- **Row actions** — The more button opens a compact menu of the row's actions. Escape closes it and returns focus to the button.
- **Sticky header** — With Vertical Scroll, rows scroll under a header that sticks to the top. Frozen columns stay frozen both ways.
- **Truncation** — Text cut off in a narrow column shows in full in a Tooltip after a short hover.
- **Disabled rows** — A disabled row keeps the plain fill and dims everything in it. It can't be selected, clicked or opened for actions unless the table allows disabled selection.
- **Empty** — With nothing to show, one row spanning every column reads the empty label.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Controls bar | Table Controls instance | Holds the selected count, a search field, the Controls Slot and the column settings button. Each is a property of the exposed instance. |
| Content | Table Content instance | Holds the selection column, the data columns and the actions column. Column Position, Horizontal Scroll, Vertical Scroll, Selectable and Row Actions are exposed. |
| Footer | Table Footer instance | Holds the page summary, rows per page and Pagination. Each is a property of the exposed instance. |
| Selection column | Table Column/Select | _Select Cell rows: select-all, checked, selected and disabled. |
| Actions column | Table Column/Actions | _Actions Cell rows: the more button, open, selected and disabled. |
| Menus | _Table Menu | Compact row actions, filter and column settings menus. |
| Empty row | _Empty Row | Spans every column when nothing matches. |
| Tooltip | Tooltip instance | Shows cut-off text in full. Hidden from assistive technology. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Fixed | 979px, held fixed rather than hugging its content. |
| Height | Hug | Hugs the controls bar, the content and the footer stacked with no gap between them. |
| Padding | Fixed | 0 on every side of the table itself, each section carries its own padding instead. |
| Controls bar | Fixed height, fixed padding | Fixed at 60px tall, 16px padding on the left and right, 12px on top and bottom. Its search field and controls slot align to the right-hand side, leaving the left side open. |
| Footer | Fixed height, fixed padding | Fixed at 60px tall, the same 16px and 12px padding as the controls bar. The summary text and the pagination control push to opposite ends rather than sitting a fixed distance apart. |
| Content | Fill | Takes the height left between the controls bar and the footer, 351px with both shown. With Vertical Scroll it caps its height and scrolls. |
| Columns | Resizable | Resizing trades width between columns, so the table width holds. |

## Accessibility

- A captioned table with column headers and aria-sort on sortable columns.
- Checkboxes are named, such as Select all rows and Select row: Name.
- Resize grips are focusable separators with a name and a value.
- Menus are named, move with the arrow keys and close on Escape, returning focus to their trigger.
- The selected count is a live region.
- Tooltips repeat visible text and are hidden from assistive technology.

---
*Generated from `specs/table` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
