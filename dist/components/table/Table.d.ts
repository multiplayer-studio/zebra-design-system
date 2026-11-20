import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./table.css";
export type TableShape = "rounded" | "sharp";
/**
 * The nearest Table's shape, for content slotted into it (controls,
 * pagination, custom cells) — Figma switches every nested component to the
 * table's shape, and the table can't reach into components it didn't render.
 * `null` outside a Table.
 */
export declare function useTableShape(): TableShape | null;
export type TableSortDirection = "ascending" | "descending";
export interface TableSort {
    key: string;
    direction: TableSortDirection;
}
export interface TableColumn {
    key: string;
    header: string;
    /** CSS length; a number is px. Also the column's minimum. */
    width?: number | string;
    /** Header cycles sort: none → ascending → descending → none. */
    sortable?: boolean;
    /** Adds a filter control to the header, shown on hover and focus. Client-side it opens the filter menu. */
    filterable?: boolean;
    /** With `columnConfigure`, false keeps the column showing. */
    hideable?: boolean;
    /** Shows the full text in a tooltip even when it fits. Wins over `tooltipOnEllipsisOnly`. */
    tooltip?: boolean;
    /** Shows the full text in a tooltip when it is cut off (default). False turns the column's tooltips off. */
    tooltipOnEllipsisOnly?: boolean;
    /** With `resizable`, false keeps the column at its width. */
    resizable?: boolean;
    /** Client-side: the values the filter menu offers. Unset, the column's distinct values. */
    filterOptions?: string[];
    /** Client-side: orders two rows for this column, ascending. Unset, cells compare as text, numbers by value. */
    compare?: (a: TableRow, b: TableRow) => number;
}
/** The spec's "Avatar and text" cell: an avatar, a title and an optional subtitle. */
export interface TableAvatarCell {
    title: string;
    subtitle?: string;
    avatar?: {
        src?: string;
        initials?: string;
    };
}
export type TableCellValue = string | TableAvatarCell;
/** One option in a row's actions menu. */
export interface TableAction {
    key: string;
    label: string;
    icon?: IconName;
    disabled?: boolean;
}
export interface TableRow {
    key: string;
    cells: Record<string, TableCellValue>;
    selected?: boolean;
    /** Not selectable, clickable or opened for actions (unless `allowDisabledSelection`); everything in it dims. */
    disabled?: boolean;
    /** This row's actions, in place of `rowActions`; null hides the menu on this row. */
    actions?: TableAction[] | null;
}
export interface TableColumnSettings {
    hiddenColumns: string[];
    frozenColumns: number;
}
export interface TableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children"> {
    columns?: TableColumn[];
    rows?: TableRow[];
    /** Custom content for a cell, in place of its value. Return `undefined` to fall back to the value. */
    renderCell?: (row: TableRow, column: TableColumn) => React.ReactNode;
    /** Shows the controls bar above the content. */
    hasControl?: boolean;
    /** Shows the footer below the content. */
    hasFooter?: boolean;
    /** The search field in the controls bar. */
    showSearch?: boolean;
    /** The search query. Uncontrolled when omitted. */
    searchValue?: string;
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => void;
    /** Actions after the search field, e.g. Icon Buttons. */
    controls?: React.ReactNode;
    /** Footer summary, e.g. "Showing 1-3 of 21". Empty hides it (client-side it is worked out instead). */
    pageDetails?: string;
    /** Client-side: the summary when `pageDetails` is empty. `{from}`, `{to}` and `{total}` are filled in. */
    pageDetailsFormat?: string;
    /** Current page, 1-based. Uncontrolled when omitted. */
    page?: number;
    /** Total pages for the footer's Pagination. Client-side paging works it out. */
    pageCount?: number;
    onPageChange?: (page: number) => void;
    /** Replaces the footer's built-in Pagination with your own content. */
    pagination?: React.ReactNode;
    /** The sort. Uncontrolled when omitted; the table reorders rows by it only when `clientSide`. */
    sort?: TableSort | null;
    onSortChange?: (sort: TableSort | null) => void;
    /** A filterable header's control was activated. */
    onFilter?: (columnKey: string) => void;
    /** The table sorts, searches, filters and pages `rows` itself. */
    clientSide?: boolean;
    /** Rows per page. Client-side, 0 shows every row on one page. Uncontrolled when omitted. */
    pageSize?: number;
    onPageSizeChange?: (pageSize: number) => void;
    /** The sizes the footer's rows-per-page Select offers. Empty hides it. */
    pageSizeOptions?: number[];
    /** The rows-per-page label, and the Select's accessible name. */
    pageSizeLabel?: string;
    /** Client-side: the chosen filter values per column key. Uncontrolled when omitted. */
    filters?: Record<string, string[]>;
    onFiltersChange?: (filters: Record<string, string[]>, columnKey: string) => void;
    /** The filter menu's option that clears the column's filter. */
    clearFilterLabel?: string;
    /** The text of the row shown when there are no rows. */
    emptyLabel?: string;
    /** A row was activated. Disabled rows don't fire unless `allowDisabledSelection`. */
    onRowClick?: (row: TableRow) => void;
    /** Adds the selection column, with select-all in its header. */
    selectable?: boolean;
    /** The selected row keys. Uncontrolled when omitted, starting from each row's `selected`. */
    selectedRows?: string[];
    onSelectionChange?: (selectedRows: string[], change: {
        rows: TableRow[];
        selected: boolean;
    }) => void;
    /** The selected count in the controls bar. `{count}` is filled in. */
    selectedCountFormat?: string;
    selectAllLabel?: string;
    /** Accessible name of each row's checkbox, followed by the row's first cell. */
    selectRowLabel?: string;
    /** Disables these rows, by key, as a row's own `disabled` does. */
    disabledRows?: string[];
    /** Lets disabled rows be selected, clicked and opened for actions; they still look disabled. */
    allowDisabledSelection?: boolean;
    /** Actions offered in every row's menu. Any row with actions adds the actions column. */
    rowActions?: TableAction[];
    onRowAction?: (actionKey: string, row: TableRow, rowIndex: number) => void;
    /** Accessible name of the actions column and of each row's more button. */
    actionsLabel?: string;
    /** Adds the column settings button to the controls bar. */
    columnConfigure?: boolean;
    /** The keys of the columns not showing. Uncontrolled when omitted. */
    hiddenColumns?: string[];
    onColumnSettingsChange?: (settings: TableColumnSettings) => void;
    columnsLabel?: string;
    showColumnsLabel?: string;
    freezeColumnsLabel?: string;
    noFrozenLabel?: string;
    /** The first N columns stay put while the rest scroll horizontally. Uncontrolled from the panel when omitted. */
    frozenColumns?: number;
    /** Caps the content's height (CSS length, or px) so rows scroll under a sticky header. */
    maxHeight?: number | string;
    /** Lets people resize columns from each header's trailing edge. */
    resizable?: boolean;
    /** The narrowest a resized column gets, in px. */
    minColumnWidth?: number;
    onColumnResize?: (columnKey: string, width: number, widths: Record<string, number>) => void;
    /** How long, in ms, cut-off text is hovered before its tooltip shows. */
    tooltipDelay?: number;
    /** Accessible name for the table. */
    caption?: string;
    /**
     * `rounded` rounds the table's outer corners (radius/element-md, clipping
     * its content) and its own parts; `sharp` keeps them square. Slotted
     * content reads it with `useTableShape()` to match.
     */
    shape?: TableShape;
    className?: string;
}
/**
 * A data table with rows of content in columns, framed by an optional
 * controls bar above and a footer below.
 *
 * Semantic, row-major `<table>` — Figma builds it column by column, a
 * Figma-only structure. Base UI has no table primitive: sorting is a native
 * button with `aria-sort`, rows take `aria-selected` / `aria-disabled`, and
 * the menus are Base UI Menus (keyboard, Escape, outside press and focus
 * return come with them).
 *
 * The spec's additions, kept rule for rule in step with `<zds-table>`:
 * - **Client-side** (`clientSide`): the table sorts (text, numbers by value,
 *   or a column's `compare`), searches every cell, filters through a compact
 *   checkbox menu per filterable column, and pages by `pageSize`, working out
 *   the page count and summary. Sorting, searching or filtering returns to
 *   page 1. With nothing left, one row reads `emptyLabel`.
 * - **Selection** (`selectable`): a checkbox column with select-all
 *   (indeterminate while only some rows shown are selected). Selected rows
 *   take the selected fill across every column; an info Badge Label at the
 *   start of the controls bar counts them, in a live region.
 * - **Row actions** (`rowActions`): a trailing more button per row opening a
 *   compact menu; a row's own `actions` replace them, `null` hides them.
 * - **Rows per page** (`pageSizeOptions`): a small compact Select after the
 *   summary, sized from its widest option.
 * - **Column settings** (`columnConfigure`): a settings button opening Show
 *   columns checkboxes and Freeze up to radios.
 * - **Resizing** (`resizable`): a focusable separator on each header's
 *   trailing edge, showing interactive/neutral/border/hover at full height.
 *   A resize never changes the table's width: width trades with the next
 *   resizable columns (the last trades backwards), none below
 *   `minColumnWidth`. Drag, arrow keys (Shift for more), Home, and a
 *   double-click or Escape to reset. The first resize locks every width and
 *   switches to fixed layout, so narrow text ends in an ellipsis.
 * - **Truncation**: cut-off text shows in full in a Tooltip after
 *   `tooltipDelay` ms, hidden from assistive technology (it repeats the cell).
 * - **Disabled rows** (`disabled`, `disabledRows`): plain fill, text in
 *   foreground/disabled, avatars and custom content dimmed (raw 0.5, spec
 *   gap); `allowDisabledSelection` keeps the look but allows selection,
 *   clicks and actions.
 * - **Sticky header** (`maxHeight`): rows scroll under a header that sticks
 *   to the top; frozen columns stay frozen both ways.
 *
 * Frozen columns are `position: sticky`, their offsets measured from the
 * rendered header cells, the selection column freezing with them.
 *
 * @spec specs/table/table.spec.md
 */
export declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLDivElement>>;
