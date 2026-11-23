import { LitElement, type PropertyValues, type TemplateResult } from "lit";
import "../search/search.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import "../pagination/pagination.js";
import "../checkbox/checkbox.js";
import "../icon-button/icon-button.js";
import "../dropdown-menu/dropdown-menu.js";
import "../menu-item/menu-item.js";
import "../divider/divider.js";
import "../select/select.js";
import "../tooltip/tooltip.js";
import "../badge-label/badge-label.js";
import type { IconName } from "@zebra-design-system/icons/names";
/** One column. `width` is a CSS length; a number means px. */
export interface TableColumn {
    key: string;
    header: string;
    width?: string | number;
    sortable?: boolean;
    filterable?: boolean;
    /** With `columnConfigure`, false keeps the column showing: it can't be hidden from the settings panel. */
    hideable?: boolean;
    /** Shows the full text in a tooltip on hover even when it fits. Wins over `tooltipOnEllipsisOnly`. */
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
/** The spec's `_Avatar and text` cell. */
export interface TableAvatarCell {
    title: string;
    subtitle?: string;
    avatar?: {
        src?: string;
        initials?: string;
    };
}
/** `rounded` rounds the table's corners and its own parts; slotted content reads `shape` to match. */
export type TableShape = "rounded" | "sharp";
/** A string renders as text; an object as the avatar-and-text cell. */
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
    disabled?: boolean;
    /** This row's actions, in place of `rowActions`; null hides the menu on this row. */
    actions?: TableAction[] | null;
}
export type TableSortDirection = "ascending" | "descending";
export interface TableSort {
    key: string;
    direction: TableSortDirection;
}
/**
 * A data table with rows of content in columns, framed by an optional
 * controls bar above and a footer below.
 *
 * A real `<table>` (header cells `scope="col"`, `aria-sort` on sortable
 * columns) inside a scrolling wrapper. Figma builds the table column by
 * column; that is a Figma-only arrangement, the markup is row-major. Width
 * follows the container, not the spec's 979px sample.
 *
 * Data comes in as two JS properties, `columns` and `rows`. A cell value is
 * text, or `{ title, subtitle?, avatar? }` for the spec's avatar-and-text
 * cell. Any cell can be replaced with markup through a named slot,
 * `cell-<rowKey>-<colKey>`, whose fallback is the data.
 *
 * **Sorting, search, filters, paging.** A sortable header cycles none →
 * ascending → descending, sets `sort` and fires `zds-sort-change`. By default
 * the table is controlled and the listener reorders, filters and pages
 * `rows`. `client-side` makes the table do it from the full `rows`: it sorts
 * (text, numbers by value, or the column's `compare`), keeps rows whose text
 * matches `searchValue` and whose cells are among the chosen `filters`, and
 * shows `pageSize` rows of `page`, working out the page count and the footer
 * summary. Sorting, searching or filtering returns to page 1. A filterable
 * header then opens a compact checkbox menu of the column's values (spec:
 * `_Table Menu` filter) and fires `zds-filter-change`; a filtered column keeps
 * its glyph in foreground/cursor (`_Label` Filtered). With nothing left, one
 * row spanning every column reads `emptyLabel` (`_Empty Row`).
 *
 * **Selection** (`selectable`, spec `_Select Cell`). A checkbox column leads
 * the columns, with select-all in its header, indeterminate while only some
 * rows shown are selected. `selectedRows` holds the keys (seeded from each
 * row's `selected` until set); every toggle fires `zds-selection-change`.
 * Select-all covers the actionable rows shown, so a selection on another
 * page survives. Selected rows take the selected fill across every column.
 * While rows are selected, an info Badge Label at the start of the controls
 * bar counts them (`selectedCountFormat`), in a live region.
 *
 * **Row actions** (`rowActions`, spec `_Actions Cell`). A trailing small
 * subtle more button per row opens a compact menu of the row's actions; a
 * row's own `actions` replace them and `null` hides the button. Choosing one
 * closes the menu, calls `onRowAction` and fires `zds-row-action`.
 *
 * **Menus** open as manual popovers in the top layer, clear of the table's
 * clipping, holding a compact `zds-dropdown-menu`. Arrow keys, Home and End
 * move, Escape closes and returns focus to the trigger, Tab or a press
 * outside closes.
 *
 * **Column settings** (`columnConfigure`). A settings button at the end of
 * the controls bar opens a panel: Show columns checkboxes (`hiddenColumns`;
 * the last column showing and `hideable: false` columns stay) and Freeze up
 * to radios (`frozenColumns`), firing `zds-column-settings-change`. Hidden
 * columns leave the whole table, search included.
 *
 * **Resizing** (`resizable`, spec `_Header Cell` Resize). Each header's
 * trailing edge is a focusable separator; hovering shows
 * interactive/neutral/border/hover at full cell height. A resize never
 * changes the table's width: a column grows by taking width from the
 * resizable columns after it (nearest first, none below `minColumnWidth`) and
 * shrinks by giving it to the next; the last column trades with those before
 * it. Drag, arrow keys (Shift for bigger steps), Home for the minimum, and a
 * double-click or Escape resets. Each change fires `zds-column-resize`. The
 * first resize locks every column at its rendered width and switches to fixed
 * layout, so widths land exactly and narrow text ends in an ellipsis.
 *
 * **Truncation.** Cut-off text shows in full in a `zds-tooltip` after
 * `tooltipDelay` ms of hover; a column's `tooltip` shows it even when the text
 * fits, `tooltipOnEllipsisOnly: false` turns it off. It repeats text already
 * on the page, so it is not wired up as a description.
 *
 * **Disabled rows.** A row is disabled by its own `disabled` or by its key
 * in `disabledRows`: every cell keeps the plain fill, text turns
 * foreground/disabled and avatars and slotted content dim (raw 0.5 opacity,
 * spec gap). It can't be selected, clicked or opened for actions, unless
 * `allowDisabledSelection`, which keeps the look but allows all three.
 *
 * **Sticky header.** `maxHeight` caps the content so rows scroll under a
 * header that sticks to the top; frozen columns stay frozen both ways.
 *
 * `frozenColumns` pins the first N columns (Table Content
 * `columnPosition=frozen`); their sticky offsets are measured from the
 * rendered header cells, the selection column freezing with them. Once the
 * rest scroll beneath them, the last frozen column casts a horizontal shadow.
 *
 * The footer holds the page summary, an optional rows-per-page `zds-select`
 * (`pageSizeOptions`, compact, firing `zds-page-size-change`) and an outline
 * `zds-pagination` whose `zds-page-change` bubbles out of the table; anything
 * slotted into `pagination` replaces it.
 *
 * Rows get a pointer cursor while something listens for `zds-row-click` on
 * the element itself (a WC has no handler prop to detect).
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*`
 * class on any ancestor re-themes the table with no re-render.
 *
 * @slot controls - Actions after the search field in the controls bar (e.g. outline-subtle icon buttons).
 * @slot pagination - Replaces the built-in `<zds-pagination>` at the footer's inline end.
 * @slot cell-<rowKey>-<colKey> - Replaces one data cell's content.
 * @fires zds-sort-change - A sortable header was activated. `detail.sort` is the new sort, or null.
 * @fires zds-search-change - The search query changed. `detail.value`.
 * @fires zds-filter - A header's filter control was activated. `detail.key` is the column key.
 * @fires zds-filter-change - Client-side: a filter was toggled or cleared. `detail.filters`, `detail.key`.
 * @fires zds-row-click - An actionable row was clicked. `detail.row`.
 * @fires zds-page-change - From the built-in pagination (bubbles, composed). `detail.page`, 1-based.
 * @fires zds-page-size-change - A rows-per-page size was chosen. `detail.pageSize`.
 * @fires zds-selection-change - A row or select-all was toggled. `detail.selectedRows`, `detail.rows`, `detail.selected`.
 * @fires zds-row-action - An action was chosen from a row's menu. `detail.action`, `detail.row`, `detail.rowIndex`.
 * @fires zds-column-resize - A column was resized. `detail.key`, `detail.width` and `detail.widths` (every column, px).
 * @fires zds-column-settings-change - Columns shown, hidden or frozen from the panel. `detail.hiddenColumns`, `detail.frozenColumns`.
 * @csspart controls - The controls bar.
 * @csspart scroller - The scrolling wrapper.
 * @csspart table - The table element.
 * @csspart footer - The footer.
 *
 * @spec specs/table/table.spec.json
 */
export declare class ZdsTable extends LitElement {
    static styles: import("lit").CSSResult;
    /** The columns, in order. */
    columns: TableColumn[];
    /** The rows, in order. */
    rows: TableRow[];
    /** Shows the controls bar above the content. */
    hasControl: boolean;
    /** Shows the footer below the content. */
    hasFooter: boolean;
    /** Shows the search field in the controls bar (Table Controls' `search`). */
    showSearch: boolean;
    /** The search query. */
    searchValue: string;
    /** Placeholder, and accessible name, of the search field. */
    searchPlaceholder: string;
    /** Footer summary, e.g. "Showing 1-3 of 21". Empty hides it (client-side, it is worked out instead). */
    pageDetails: string;
    /** Client-side: the summary when `pageDetails` is empty. `{from}`, `{to}` and `{total}` are filled in. */
    pageDetailsFormat: string;
    /** The footer pagination's current page, 1-based. */
    page: number;
    /** The footer pagination's page count. Client-side paging works it out. */
    pageCount: number;
    /** The current sort, or null. The table reorders rows by it only when `clientSide`. */
    sort: TableSort | null;
    /** The table sorts, searches, filters and pages `rows` itself. */
    clientSide: boolean;
    /** Rows per page. Client-side, 0 shows every row on one page. */
    pageSize: number;
    /** The sizes the footer's rows-per-page select offers (Table Footer `rowsPerPage`). Empty hides it. */
    pageSizeOptions: number[];
    /** The rows-per-page label, and the select's accessible name. */
    pageSizeLabel: string;
    /** Client-side: the chosen filter values per column key. */
    filters: Record<string, string[]>;
    /** The filter menu's option that clears the column's filter. */
    clearFilterLabel: string;
    /** The text of the row shown when there are no rows. */
    emptyLabel: string;
    /** Pins the first N columns while the rest scroll horizontally. */
    frozenColumns: number;
    /**
     * Caps the content's height (a CSS length, or px) so rows scroll under a
     * sticky header (Table Content `verticalScroll`). Unset, the table grows.
     */
    maxHeight: string | number | null;
    /** Adds the selection column, with select-all in its header. */
    selectable: boolean;
    /** The selected row keys. Until set, it follows each row's `selected`. */
    selectedRows: string[];
    /** The selected count in the controls bar. `{count}` is filled in. */
    selectedCountFormat: string;
    /** Accessible name of the select-all checkbox. */
    selectAllLabel: string;
    /** Accessible name of each row's checkbox, followed by the row's first cell. */
    selectRowLabel: string;
    /** Disables these rows, by key, as a row's own `disabled` does. */
    disabledRows: string[];
    /** Lets disabled rows be selected, clicked and opened for actions; they still look disabled. */
    allowDisabledSelection: boolean;
    /** Actions offered in every row's menu. Any row with actions adds the actions column. */
    rowActions: TableAction[];
    /** Called when an action is chosen, with its key, the row and the row's index in `rows`. */
    onRowAction: ((actionKey: string, row: TableRow, rowIndex: number) => void) | null;
    /** Accessible name of the actions column and of each row's more button. */
    actionsLabel: string;
    /** Adds the column settings button to the controls bar (Table Controls `columnSettings`). */
    columnConfigure: boolean;
    /** The keys of the columns not showing. */
    hiddenColumns: string[];
    /** The settings button's accessible name and the panel's. */
    columnsLabel: string;
    /** The panel's heading over the show and hide checkboxes. */
    showColumnsLabel: string;
    /** The panel's heading over the freeze choices. */
    freezeColumnsLabel: string;
    /** The panel's choice that freezes nothing. */
    noFrozenLabel: string;
    /** Lets people resize columns from each header's trailing edge. */
    resizable: boolean;
    /** The narrowest a resized column gets, in px. */
    minColumnWidth: number;
    /** How long, in ms, cut-off text is hovered before its tooltip shows. */
    tooltipDelay: number;
    /** Accessible name of the table, rendered as a visually hidden caption. */
    caption: string | null;
    /**
     * `rounded` rounds the table's outer corners (radius/element-md, clipping
     * its content) and its own Search, Pagination, checkboxes, buttons, Select
     * and menus; `sharp` keeps them square. The table can't reach slotted
     * content, so it reflects `shape` for slotted controls to read.
     */
    shape: TableShape;
    private scrolled;
    private frozenOffsets;
    private menuFor;
    private widths;
    private resizing;
    private sized;
    private tipText;
    private tipAnchor;
    private menuEl;
    private tipEl;
    private view;
    private total;
    private selectionSet;
    private menuTrigger;
    private edgeWidths;
    private lockedWidths;
    private tipTimer;
    private rowClickListeners;
    private frozenObserver;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    private setRowClickListeners;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(changed: PropertyValues<this>): void;
    disconnectedCallback(): void;
    /** The columns showing, in order. */
    private get shown();
    /** Client-side, the rows shown are searched, filtered, sorted and paged; otherwise `rows` as given. */
    private computeView;
    private get pages();
    private get summary();
    /** Client-side, a new sort, search or filter starts again from page 1. */
    private restart;
    private emit;
    private isDisabled;
    /** Enabled, or disabled with allowDisabledSelection: takes selection, clicks and its actions. */
    private isActionable;
    private isSelected;
    /** A row's name for its controls: its first cell's text, or its key. */
    private rowName;
    private setSelection;
    private toggleAll;
    private onRowClick;
    private actionsFor;
    private get hasActions();
    /** 1 when the selection column leads the columns. */
    private get lead();
    /**
     * Sticky offsets are measured, not derived from the declared widths:
     * content and padding can make a column wider than declared, and an offset
     * computed from the declaration would stick the next frozen column in the
     * wrong place. The selection column freezes with them, ahead of them.
     */
    private observeFrozen;
    private measureFrozen;
    private frozenFor;
    private edgeCell;
    private onScroll;
    private onSearchInput;
    private cycleSort;
    private onPageChange;
    private onPageSize;
    private filterOptionsFor;
    private setFilter;
    private onFilterClick;
    private setColumnShown;
    private setFrozen;
    private isOpen;
    private menuItems;
    private focusItem;
    /** Focuses a part's own focusable element; zds-icon-button doesn't delegate focus. */
    private focusTrigger;
    private toggleMenu;
    /** Below the trigger, lined up with its start or end edge; above when there is no room below. */
    private placeMenu;
    private closeMenu;
    private onOutsideClick;
    private onMenuKeydown;
    private runAction;
    private isResizable;
    private widthOf;
    /** Locks every column, edge columns included, at its rendered width, so a resize only moves width between columns. */
    private lockWidths;
    /** The locked table's width: every column added up, so fixed layout lands each one exactly. */
    private lockedTotal;
    /** The resizable columns a column trades width with: after it, nearest first; before it for the last. */
    private neighbours;
    private declaredWidth;
    /**
     * Sets a column's width without changing the table's: growing takes width
     * from the neighbours (nearest first, none below minColumnWidth), shrinking
     * gives it to the nearest. A drag works from the widths it started with, so
     * dragging back returns every column exactly.
     */
    private setWidth;
    private startResize;
    private onResizeKey;
    private onPointerOver;
    private hideTip;
    private renderSelectedCount;
    private renderSettingsButton;
    private renderSelectAll;
    private renderSelectCell;
    private renderActionsCell;
    private renderResizer;
    private renderHeader;
    private renderValue;
    private renderRow;
    private renderMenuItems;
    private renderMenu;
    private renderPageSize;
    protected render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-table": ZdsTable;
    }
}
//# sourceMappingURL=table.d.ts.map