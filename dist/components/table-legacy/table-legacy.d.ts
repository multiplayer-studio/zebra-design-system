import{ZetaTableLegacyProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import type{PropertyValues}from"lit";import"../icon/icon.js";import"../search/search.js";import"../button/button.js";import"../button/icon-button/icon-button.js";import"../checkbox/checkbox.js";import"../pagination/pagination.js";import"../select-input/select-input.js";import"../select-input/option.js";import"../dropdown/menu-item/dropdown-menu-item.js";import"../tooltip/tooltip.js";import"../badges/label/label.js";import type{ZetaTableLegacyColumn,PaginationType,ZetaTableLegacyAction,ZetaTableLegacyRow}from"./table-legacy.types.js";export type{ZetaTableLegacyColumn,SortDirection,SortState,PaginationType,ZetaTableLegacyAction,ZetaTableLegacyRow}from"./table-legacy.types.js";
/**
 * Legacy: superseded by `zeta-table`, which is built from the Table spec. Kept, renamed from `zeta-table`, for apps
 * still on its API (`data`, `paginationType`, callback props).
 *
 * A full-featured, highly configurable data table component.
 *
 * ## Features
 * - **Sorting**: 3-state per-column sort indicator (asc → desc → none). Sorting is delegated to the consumer via `onSortChange`. Configurable per column via `sortable`.
 * - **Column Search**: Optional per-column search inputs. Enabled when `onColumnSearch` callback is provided.
 * - **Column Filter**: Optional per-column filter dropdown with checkboxes (Clear/Apply). Enabled when `onColumnFilter` is provided. Options via `filterOptions` on column or auto-populated from data.
 * - **Global Search**: Optional search bar in header. Enabled when `onTableSearch` callback is provided.
 * - **Selection**: Checkbox column with select-all. Optional `selectOnRowClick` for click-to-select.
 * - **Row Click**: Optional `onRowClick` callback. Rows show pointer cursor and highlight on click.
 * - **Disabled Rows**: Rows can be disabled via `disabledRows` array or `_disabled` property. Use `allowDisabledSelection` to allow selection/actions on disabled rows.
 * - **Frozen Columns**: Columns can be frozen via `frozen` property or the column configure panel.
 * - **Column Resizing**: Drag to resize. Double-click header to auto-fit.
 * - **Column Configure**: Show/hide and freeze/unfreeze columns from a dropdown panel.
 * - **Pagination**: Numbered or infinite scroll. Consumer provides paged data via `onPageChange`/`onLoadMore` callbacks. Use `totalItems` to tell the table the full dataset size for page count calculation.
 * - **Nested Rows**: Expandable child rows via `_nested` property on row data.
 * - **Export**: CSV export of visible data.
 * - **Refresh**: Optional refresh button with consumer-controlled reload.
 * - **Row Actions**: Per-row kebab menu with configurable items per row via `_actions`.
 * - **Tooltips**: Auto-shown on content overflow.
 * - **Localization**: All labels (`refreshLabel`, `columnsLabel`, `actionsLabel`, `searchPlaceholder`) are configurable.
 * - **Custom Styling**: Full theming via CSS custom properties and `::part()` selectors.
 *
 * ## Usage
 * ```html
 * <zeta-table-legacy
 *   .columns=${columns}
 *   .data=${data}
 *   .onTableSearch=${handleSearch}
 *   .onColumnSearch=${handleColumnSearch}
 *   .onColumnFilter=${handleFilter}
 *   .onRefresh=${handleRefresh}
 *   .onRowClick=${handleRowClick}
 *   .onRowAction=${handleAction}
 *   .onSortChange=${handleSort}
 *   .onSelectionChange=${handleSelection}
 *   .onPageChange=${handlePageChange}
 *   .onLoadMore=${handleLoadMore}
 *   .onExport=${handleExport}
 *   .onRowExpand=${handleExpand}
 *   selectable
 *   select-all
 *   exportable
 *   column-configure
 *   show-data-count
 *   table-title="My Table"
 *   pagination-type="numbered"
 *   page-size="10"
 *   style="--table-max-height: 500px; --table-header-bg: #f8fafc;"
 * ></zeta-table-legacy>
 * ```
 *
 * ## Column Definition (ZetaTableLegacyColumn)
 * ```typescript
 * {
 *   field: string;          // Data key
 *   title: string;          // Display header text
 *   width?: number | string; // Initial width — number for px (e.g. 200), string for CSS (e.g. "25%", "12rem")
 *   minWidth?: number;      // Minimum width for resize (default: 60)
 *   sortable?: boolean;     // Enable sorting (default: true)
 *   filterable?: boolean;   // Enable search/filter (default: true)
 *   filterOptions?: string[]; // Predefined filter dropdown options
 *   frozen?: boolean;       // Freeze this column
 *   visible?: boolean;      // Column visibility (default: true)
 *   tooltip?: boolean;      // true = always show tooltip (highest precedence)
 *   tooltipOnEllipsisOnly?: boolean; // true (default) = show on overflow only | false = disable tooltip
 *   resizable?: boolean;    // Allow column resize (default: true)
 *   disabled?: boolean;     // Disable all interaction on column
 * }
 * ```
 *
 * ## Row Data (ZetaTableLegacyRow)
 * ```typescript
 * {
 *   id: string | number;        // Unique row identifier (required)
 *   [key: string]: unknown;     // Data fields matching column `field` names
 *   _disabled?: boolean;        // Disable row (grey out, no interaction)
 *   _checkboxDisabled?: boolean; // Disable only the checkbox (row still interactive)
 *   _nested?: ZetaTableLegacyRow[] | Node; // Nested content: array of child rows (auto-columns) or a DOM Node (custom view)
 *   _actions?: ZetaTableLegacyAction[] | null; // Per-row kebab menu items (null = hide menu)
 * }
 * ```
 *
 * ## Row Action (ZetaTableLegacyAction)
 * ```typescript
 * { key: string; label: string; icon?: string; disabled?: boolean; }
 * ```
 *
 *
 * @fires zeta-table-selection-change - Row selection changes. Detail: { selectedIds: [] }
 * @fires zeta-table-sort-change - Column sort changes. Detail: { field, direction }
 * @fires zeta-table-column-search - Column search input changes. Detail: { field, value, searchValues }
 * @fires zeta-table-column-filter - Column filter applied. Detail: { field, selectedValues }
 * @fires zeta-table-search - Global search input changes. Detail: { value }
 * @fires zeta-table-page-change - Page changes (numbered). Detail: { page, pageSize }
 * @fires zeta-table-load-more - More data needed (infinite scroll)
 * @fires zeta-table-export - Export button clicked. Detail: { csv, columns, data }
 * @fires zeta-table-row-expand - Row expanded/collapsed. Detail: { rowId, expanded }
 * @fires zeta-table-row-click - Row clicked. Detail: { row, rowIndex }
 * @fires zeta-table-refresh - Refresh button clicked
 * @fires zeta-table-action - Row action clicked. Detail: { actionKey, row, rowIndex }
 *
 * @cssproperty --table-width - Table width. Default: 100%
 * @cssproperty --table-max-height - Max height of scroll area. Default: none
 * @cssproperty --table-border-color - Border color. Default: #e0e3e9
 * @cssproperty --table-border-radius - Wrapper border radius. Default: 8px
 * @cssproperty --table-header-bg - Header background. Default: #ffffff
 * @cssproperty --table-header-text - Header text color. Default: #1d1e23
 * @cssproperty --table-header-height - Header row height. Default: 40px
 * @cssproperty --table-header-font-size - Header font size. Default: 12px
 * @cssproperty --table-header-font-weight - Header font weight. Default: 600
 * @cssproperty --table-header-border-bottom - Header bottom border. Default: 2px solid
 * @cssproperty --table-row-height - Data row height (includes cell padding, box-sizing: border-box). Default: 40px
 * @cssproperty --table-row-bg - Row background. Default: #fff
 * @cssproperty --table-row-hover-bg - Row hover background. Default: #f5f7fa
 * @cssproperty --table-row-selected-bg - Selected row background. Default: #e8f2ff
 * @cssproperty --table-row-active-bg - Active/clicked row background. Default: #e8f4fd
 * @cssproperty --table-row-clickable-cursor - Clickable row cursor. Default: pointer
 * @cssproperty --table-cell-padding-y - Cell vertical padding. Default: 10px
 * @cssproperty --table-cell-padding-x - Cell horizontal padding. Default: 12px
 * @cssproperty --table-cell-padding - Cell padding shorthand (computed from padding-y and padding-x). Default: 10px 12px
 * @cssproperty --table-cell-font-size - Cell font size. Default: 14px
 * @cssproperty --table-frozen-shadow - Frozen column shadow. Default: 4px 0 8px -2px rgba(0,0,0,0.08)
 * @cssproperty --table-sort-active-color - Active sort icon color. Default: #0073e6
 * @cssproperty --table-sort-inactive-color - Inactive sort icon color. Default: #c4c9d4
 * @cssproperty --table-resize-handle-color - Resize handle color. Default: #0073e6
 * @cssproperty --table-toolbar-bg - Toolbar background. Default: #fff
 * @cssproperty --table-footer-bg - Footer background. Default: #fff
 * @cssproperty --table-data-count-bg - Data count badge background. Default: #e8f2ff
 * @cssproperty --table-data-count-color - Data count badge text color. Default: #0073e6
 */export declare class ZetaTableLegacy extends LitElement{
/** Renders into Light DOM instead of Shadow DOM so global styles and consumer CSS can style table internals directly. */
createRenderRoot():this;
/** Column definitions */
columns:ZetaTableLegacyColumn[];
/** Row data - each row must have a unique `id` field */
data:ZetaTableLegacyRow[];
/** Enable checkbox selection column */
selectable:boolean;
/** Show select-all checkbox in header */
selectAll:boolean;
/** Initially selected row IDs */
selectedRows:(string|number)[];
/** Row click callback - when provided, rows become clickable (pointer cursor + highlight on click) */
onRowClick:((rowData:ZetaTableLegacyRow,rowIndex:number)=>void)|null;
/** When provided, clicking a row also toggles its checkbox selection. Behaves like onRowClick (pointer cursor + highlight). */
selectOnRowClick:((rowData:ZetaTableLegacyRow,rowIndex:number)=>void)|null;
/** Allow checkbox selection and action menu on disabled rows (useful for operations like bulk delete). Rows still appear visually disabled. */
allowDisabledSelection:boolean;
/** Fallback row action menu items - used for rows that don't have `_actions` defined. Set to show a kebab menu as the last column. */
rowActions:ZetaTableLegacyAction[];
/** Callback when a row action is clicked. Receives the action key, row data, and row index. */
onRowAction:((actionKey:string,rowData:ZetaTableLegacyRow,rowIndex:number)=>void)|null;
/** Tooltip/label for the actions column header (supports localization) */
actionsLabel:string;
/** Show data count as a highlighted badge (e.g. "5 out of 51") */
showDataCount:boolean;
/** Optional title shown next to the data count badge */
tableTitle:string;
/** Pagination type: 'none', 'numbered', or 'infinite' */
paginationType:PaginationType;
/** Number of rows per page */
pageSize:number;
/** Initial current page number (1-based, for numbered pagination) */
currentPage:number;private _currentPage;
/** Total number of items (for server-side pagination) */
totalItems:number;
/** Enable nested/expandable rows */
expandable:boolean;
/** Show export button in toolbar */
exportable:boolean;
/** Column search/filter callback - when provided, shows search inputs on columns and delegates filtering to the consumer. Receives the field name and current search value. When not provided, search inputs are hidden. */
onColumnSearch:((field:string,value:string,allFilters:Record<string,string>)=>void)|null;
/** Column filter callback - when provided, shows a filter icon on each column header with a dropdown menu of filter options. Consumer receives the field, selected values, and column when a filter changes. */
onColumnFilter:((field:string,selectedValues:string[],column:ZetaTableLegacyColumn)=>void)|null;
/** Global search callback - when provided, shows a global search bar above the table. Consumer handles the search and updates data. */
onTableSearch:((searchTerm:string)=>void)|null;
/** Placeholder text for the global search input (supports localization) */
searchPlaceholder:string;
/** Refresh callback - when provided, shows a refresh icon button in the toolbar. Consumer handles the data reload. */
onRefresh:(()=>void)|null;
/** Tooltip/label for the refresh button (supports localization) */
refreshLabel:string;
/** Show column configure button in toolbar */
columnConfigure:boolean;
/** Tooltip/label for the columns button (supports localization) */
columnsLabel:string;
/** Loading state (for infinite scroll) */
loading:boolean;
/** Whether there is more data to load (infinite scroll). Set to false when all data has been fetched. */
hasMoreData:boolean;
/** Callback when infinite scroll needs more data. Receives current data count. */
onLoadMore:((currentCount:number)=>void)|null;
/** Callback when sort state changes. Receives field and direction ('asc' | 'desc' | null). */
onSortChange:((field:string,direction:"asc"|"desc"|null)=>void)|null;
/** Callback when row selection changes. Receives array of selected row IDs. */
onSelectionChange:((selectedIds:(string|number)[])=>void)|null;
/** Callback when page changes (numbered pagination). Receives page number and page size. */
onPageChange:((page:number,pageSize:number)=>void)|null;
/** Callback when export is triggered. Receives the exported data rows. */
onExport:((data:ZetaTableLegacyRow[])=>void)|null;
/** Callback when a row is expanded/collapsed. Receives row ID and expanded state. */
onRowExpand:((rowId:string|number,expanded:boolean)=>void)|null;
/** IDs of rows that should be disabled */
disabledRows:(string|number)[];
/** Custom content to display when the table has no data. Accepts a DOM node or string. */
/** Shows the controls bar above the content (spec: hasControl). It still needs something to hold: a title, the data count, search or a toolbar button. */
hasControl:boolean;
/** Shows the footer below the content (spec: hasFooter), with numbered pagination. */
hasFooter:boolean;
/** Rounds the table's corners to radius/element-md and gives the controls inside it their rounded option (spec: shape). */
rounded:boolean;noDataContent:unknown;
/** Custom loading indicator content for infinite scroll. Accepts a DOM node or string. */
loadingContent:unknown;
/** Set of currently selected row IDs — drives checkbox states and selection count */private _selectedRows;
/** Current sort state: which field, which direction, and click count for the 3-state cycle */private _sortState;
/** Per-column search input values, keyed by field name */private _searchValues;
/** Current value of the global (toolbar) search input */private _globalSearchValue;
/** User-adjusted column widths (from drag resize), keyed by field name */private _columnWidths;
/** Set of field names for columns currently visible (column configure panel toggles these) */private _visibleColumns;
/** Set of field names for columns currently frozen (pinned to the left during horizontal scroll) */private _frozenColumns;
/** Set of row IDs whose nested sub-rows are currently expanded */private _expandedRows;
/** Whether the column configure dropdown panel is currently visible */private _columnConfigureVisible;
/** Field name of the column whose filter dropdown panel is currently open (null = closed) */private _filterPanelField;
/** Viewport-relative position for the filter dropdown panel */private _filterPanelPos;
/** Currently applied filters per column — keyed by field, value is the set of selected filter options */private _activeFilters;
/** Temporary filter selections in the open filter panel (committed to _activeFilters on "Apply") */private _pendingFilterSelections;
/** Tooltip content and position state */private _tooltipText;private _tooltipX;private _tooltipY;private _tooltipVisible;
/** Set of disabled row IDs (synced from the `disabledRows` public property for O(1) lookup) */private _disabledRows;
/** ID of the row that was last clicked (drives the active/highlight style) */private _activeRow;
/** ID of the row whose action (kebab) menu is currently open (null = no menu open) */private _actionMenuRowId;
/** Viewport-relative position for the action menu dropdown */private _actionMenuPos;
/** Whether to render the actions column (true if any row has actions defined) */private _showActionsColumn;
/** Getter for the scrollable container element (used for scroll listeners and IntersectionObserver root) */private get _scrollContainer();
/** Field name of the column currently being resized (null when not resizing) */private _resizingColumn;
/** Mouse X position when resize drag started */private _resizeStartX;
/** Column width in px when resize drag started */private _resizeStartWidth;
/** Set of field names that the user has manually drag-resized */private _manuallyResizedColumns;
/** IntersectionObserver instance for infinite scroll sentinel detection */private _intersectionObserver;
/** Debounce timer for tooltip show delay (400ms) */private _tooltipTimer;
/**
 * Saved scroll position before data updates (infinite scroll).
 * Captured in willUpdate, restored in updated to prevent scroll jumping
 * when new rows are appended to the DOM.
 */private _savedScrollTop?;
/**
 * Number of data rows at the time loading started.
 * Used to keep the loading row visible during the gap between `loading=false`
 * and new data arriving (prevents a flash of empty space). Reset to -1 when idle.
 */private _dataLengthWhenLoadingStarted;
/**
 * Lit lifecycle: called when the element is added to the DOM.
 *
 * - Injects the component's CSS into <head> as a global <style> tag (Light DOM
 *   requires global styles since there's no shadow root to scope them).
 *   Uses a `data-zeta-table-legacy` attribute guard to prevent duplicate injection
 *   when multiple <zeta-table-legacy> instances exist on the same page.
 * - Syncs public array props (selectedRows, disabledRows) into internal Sets for O(1) lookup.
 * - Registers a document-level click listener to close dropdowns (column panel, action menu,
 *   filter panel) when clicking outside.
 */
connectedCallback():void;
/**
 * Lit lifecycle: called when the element is removed from the DOM.
 * Cleans up all external listeners and observers to prevent memory leaks.
 */
disconnectedCallback():void;
/**
 * Lit lifecycle: called before each render when reactive properties change.
 * Handles scroll position preservation and state synchronization.
 *
 * Scroll preservation for infinite scroll:
 * 1. When `data` changes → save current scroll position (before DOM updates)
 * 2. When `loading` becomes true → record how many rows existed (to keep loading row visible)
 * 3. When `loading` becomes false but data hasn't arrived yet → wait 150ms before hiding
 *    the loading row (prevents flash of empty space during async data propagation)
 * 4. When new data arrives (length > saved length) → clear the loading guard
 * 5. When `hasMoreData` becomes false → clear loading guard (all data loaded)
 */
willUpdate(changed:PropertyValues):void;
/**
 * Lit lifecycle: called once after the first render.
 * Sets up the IntersectionObserver for infinite scroll and attaches the
 * scroll listener to close dropdowns on scroll.
 */
firstUpdated():void;
/**
 * Lit lifecycle: called after every render (including first).
 *
 * - Manages IntersectionObserver lifecycle when paginationType changes at runtime.
 * - Restores saved scroll position after data-driven DOM updates to prevent
 *   the viewport from jumping when new rows are appended.
 */
updated(changed:PropertyValues):void;
/** Converts the public `selectedRows` array to an internal Set */private _syncSelectedRows;
/** Converts the public `disabledRows` array to an internal Set */private _syncDisabledRows;
/** Rebuilds visible and frozen column Sets from column definitions */private _syncVisibleColumns;
/**
 * Reads initial numeric column widths from column definitions into the width tracking map.
 * String widths (e.g. "25%", "12rem") are not stored here — they flow directly from
 * `col.width` in the colgroup template until the user drag-resizes (which converts to px).
 */private _syncColumnWidths;
/**
 * Document-level click handler (arrow function to preserve `this`).
 * Closes open dropdown panels (column configure, action menu, filter panel)
 * when the user clicks outside of them.
 */private _closeOverlaysOnOutsideClick;
/**
 * Scroll handler: closes any open dropdown overlays (action menu, filter panel)
 * when the table scrolls, since their fixed positions would become stale.
 */private _handleScrollClose;
/** Checks if a row is disabled — either via row._disabled flag or the disabledRows property */private _isRowDisabled;
/** Returns true if any row click handler is configured (onRowClick or selectOnRowClick) */private _isClickable;
/**
 * Handles a click on a table row.
 * - Ignores clicks on disabled rows (unless allowDisabledSelection is set)
 * - Ignores clicks on <input> elements (checkboxes handle themselves)
 * - Ignores clicks on <button> elements (action buttons handle themselves)
 * - Sets the active row for visual highlighting
 * - If selectOnRowClick is configured, toggles the row's checkbox selection
 * - Dispatches both the callback and CustomEvent for framework-agnostic consumers
 */private _handleRowClick;
/**
 * Handles column header sort click.
 * Implements a 3-state UI cycle: unsorted → ascending → descending → unsorted.
 * Tracks click count per field to determine the current state in the cycle.
 * Notifies the consumer via callback and CustomEvent — the consumer is responsible
 * for sorting the data and updating the `data` property.
 */private _handleSort;
/**
 * Handles clicking an individual sort arrow icon.
 * Sets the column to the specified direction, or clears sorting if already active.
 */private _handleSortArrowClick;private _emitSortChange;
/**
 * Toggles the filter dropdown panel for a column.
 * Positions the panel below the filter icon button using getBoundingClientRect.
 * Initializes pending selections from the currently active filter state.
 */private _handleColumnFilter;
/** Toggles a single filter option in the pending selections (before "Apply" is clicked) */private _handleFilterOptionToggle;
/** Clears all pending filter selections in the open filter panel (the "Clear" button) */private _clearColumnFilter;
/**
 * Commits the pending filter selections as the active filter for the column.
 * Closes the filter panel and notifies the consumer via callback and CustomEvent.
 * The consumer is responsible for actually filtering the data and updating the `data` property.
 */private _applyColumnFilter;
/**
 * Restores the original column width on resize-handle double-click.
 * Only acts if the user has previously drag-resized this column —
 * resets to the width from the column definition (or removes the override).
 * If the column hasn't been manually resized, does nothing.
 */private _handleResizeDoubleClick;
/**
 * Handles per-column search input changes.
 * Updates internal search values, resets pagination to page 1,
 * and delegates the actual filtering to the consumer via callback and CustomEvent.
 */private _handleColumnSearch;
/**
 * Handles global (toolbar) search input changes.
 * Resets pagination to page 1 and delegates filtering to the consumer.
 */private _handleGlobalSearch;
/** Toggles selection for a single row. Respects _checkboxDisabled and disabled row guards. */private _handleRowSelect;
/**
 * Toggles selection for all displayed rows.
 * If all eligible rows are selected → deselects all. Otherwise → selects all.
 * Rows with _checkboxDisabled or disabled state (without allowDisabledSelection) are excluded.
 */private _handleSelectAll;
/** Notifies the consumer of selection changes via both the callback and CustomEvent */private _dispatchSelectionChange;
/** Toggles visibility of a column. Prevents hiding the last visible column. */private _toggleColumnVisibility;
/** Toggles the frozen (pinned) state of a column */private _toggleColumnFreeze;
/** Returns whether the given column is currently frozen */private _isColumnFrozen;
/**
 * Phase 1 of 3: Initiates column drag-to-resize.
 *
 * Triggered on `mousedown` of the thin resize handle (<div>) rendered at the
 * right edge of each resizable column header.
 *
 * Captures a snapshot of the starting state (mouse X, current column width)
 * and attaches document-level listeners for the drag (Phase 2) and release (Phase 3).
 * Document-level listeners are used because the mouse can move outside the handle
 * (or even outside the table/browser) during a fast drag.
 *
 * This is a regular method (not arrow function) because it's called from the
 * template with an inline wrapper: `@mousedown=${(e) => this._handleResizeStart(e, col.field)}`.
 */private _handleResizeStart;
/**
 * Phase 2 of 3: Tracks mouse movement during column resize drag.
 *
 * On each mousemove, calculates the pixel difference from the start position,
 * adds it to the starting width, clamps the result to the column's minimum width
 * (col.minWidth or 60px default), and updates `_columnWidths` which triggers
 * a Lit re-render to reflect the new width in the <colgroup> and header cell.
 *
 * Arrow function to preserve `this` context and to provide a stable reference
 * for addEventListener/removeEventListener (same function object for both calls).
 */private _handleResizeMove;
/**
 * Phase 3 of 3: Ends the column resize drag on mouseup.
 *
 * Clears the resizing state and removes the document-level listeners
 * to stop tracking mouse movement. The final column width persists in
 * `_columnWidths` until the user resizes again or the component is destroyed.
 *
 * Arrow function for the same reasons as _handleResizeMove (stable reference + `this`).
 */private _handleResizeEnd;
/** Toggles expansion of a row's nested sub-rows. Notifies the consumer via callback and CustomEvent. */private _toggleExpand;
/**
 * Creates an IntersectionObserver watching a sentinel <div> at the bottom of the table body.
 * When the sentinel enters the viewport (user has scrolled to the bottom),
 * fires the `onLoadMore` callback and dispatches the `zeta-table-load-more` event
 * (only if not currently loading and hasMoreData is true).
 *
 * The observer uses the scroll container as its root (not the viewport) so it only
 * triggers based on table scroll position, not page scroll.
 */private _setupInfiniteScrollObserver;
/** Disconnects and cleans up the IntersectionObserver */private _destroyInfiniteScrollObserver;
/**
 * Navigates to a specific page number.
 * Validates bounds, updates internal UI state, and notifies the consumer.
 * The consumer is responsible for fetching/slicing the data for the requested page
 * and updating the `data` property.
 */private _navigateToPage;
/**
 * Calculates total page count.
 * Uses `totalItems` if provided (recommended), otherwise falls back to `data.length`.
 * Since pagination is consumer-driven, `totalItems` should be set so the pagination
 * UI can render the correct number of pages even when `data` contains only the current page.
 */private _getTotalPages;
/**
 * Shows a tooltip near the mouse cursor after a 400ms delay.
 * If ellipsisOnly is true (default), only shows when the content overflows
 * (scrollWidth > clientWidth indicates text is being truncated by CSS ellipsis).
 */private _showTooltip;
/** Hides the tooltip and cancels any pending show timer */private _hideTooltip;
/**
 * Handles the export button click.
 * Generates a CSV from visible columns and filtered/sorted data,
 * notifies the consumer, and triggers a browser download.
 */private _handleExport;
/** Handles the refresh button click. Delegates data reload entirely to the consumer. */private _handleRefresh;
/** Converts an unknown cell value to a display string. Uses JSON for objects, String() for primitives. */private _fieldToString;
/** Generates a CSV string with proper escaping (double-quotes for values containing quotes) */private _generateCSV;
/** Triggers a browser file download for the given CSV content using a temporary <a> element */private _downloadCSV;
/** Returns only the columns that are currently toggled visible in the column configure panel */private _getVisibleColumns;
/**
 * Returns a shallow copy of the raw data array.
 * All data operations (sorting, filtering, searching, pagination) are delegated
 * to the consumer — the table renders exactly what it receives.
 */private _getData;
/**
 * Returns the data as provided by the consumer.
 * Sorting is fully delegated to the consumer via `onSortChange` callback / `zeta-table-sort-change` event.
 * The consumer is responsible for sorting the data and updating the `data` property.
 */private _getFilteredSortedData;
/**
 * Returns the data to render on screen.
 * Pagination is fully delegated to the consumer via `onPageChange` callback / `zeta-table-page-change` event.
 * The consumer is responsible for providing the correct page of data via the `data` property.
 */private _getDisplayedData;
/**
 * Calculates the CSS `left` offset for a frozen column.
 * Sums the widths of all frozen columns before this one, plus the
 * fixed-width checkbox (44px) and expand (40px) columns if present.
 */private _getFrozenLeftOffset;
/**
 * Returns true if this is the rightmost frozen column.
 * Used to apply a shadow on the right edge to visually separate
 * frozen columns from the scrollable area.
 */private _isLastFrozen;
/**
 * Main render method — assembles the complete table DOM structure.
 *
 * Layout hierarchy:
 *   .zeta-table-wrapper
 *     ├── Header bar (title, data count, search, toolbar buttons)
 *     ├── .zeta-table-scroll (scrollable container)
 *     │     ├── <table>
 *     │     │     ├── <colgroup> (column widths)
 *     │     │     ├── <thead> (header row + optional search row)
 *     │     │     └── <tbody> (data rows or no-data message + optional loading row)
 *     │     └── Infinite scroll sentinel (hidden <div> observed by IntersectionObserver)
 *     ├── Pagination footer (numbered mode only)
 *     ├── Tooltip overlay
 *     ├── Action menu overlay
 *     └── Filter panel overlay
 */protected render():import("lit").TemplateResult<1>;
/**
 * Renders the toolbar bar above the table.
 * Left side: table title, data count badge ("5 out of 51"), selection info.
 * Right side: global search input, refresh button, export button, column configure button.
 * Only renders if at least one left or right element is configured.
 */private _renderHeaderBar;
/**
 * Renders the column configure dropdown panel.
 * Contains two sections:
 *   1. Show/Hide: checkboxes to toggle column visibility (at least one must remain)
 *   2. Freeze: checkboxes to pin columns to the left during horizontal scroll
 */private _renderColumnConfigure;
/** Renders <colgroup> to set initial column widths. Includes fixed-width cols for checkbox and expand columns. */private _renderColgroup;
/**
 * Renders the primary header row (<tr>) containing:
 * - Select-all checkbox (if selectable)
 * - Expand column placeholder (if expandable)
 * - One <th> per visible column (with sort icons, filter icons, resize handles)
 * - Actions column header (if any row has actions)
 */private _renderHeaderRow;
/**
 * Renders a single column header cell (<th>).
 * Includes: title text, sort icons (if sortable), filter button (if filterable),
 * and a resize handle (if resizable). Applies frozen positioning styles if the column is frozen.
 */private _renderHeaderCell;
/** Renders the up/down sort arrow pair. The active direction's arrow gets a highlighted CSS class. */private _renderSortIcons;
/**
 * Renders the per-column search input row (second header row).
 * Only shown when `onColumnSearch` callback is provided.
 * Each column gets a text input unless disabled or filterable=false.
 */private _renderSearchRow;
/**
 * Renders a single data row (<tr>) with conditional CSS classes for:
 * clickable, selected, active (last-clicked), and disabled states.
 * Includes checkbox cell, expand button cell, data cells, and actions cell.
 * If the row is expanded and has nested data, renders nested sub-rows below it.
 */private _renderDataRow;
/**
 * Resolves the action menu items for a specific row.
 * Priority: row._actions (explicit null hides menu) → row._actions array → global rowActions fallback.
 */private _getActionsForRow;
/** Renders the actions (kebab menu) cell for a row. Shows a three-dot button if the row has actions. */private _renderActionsCell;
/**
 * Renders the column filter dropdown panel (positioned absolutely near the filter icon).
 * Shows a list of checkboxes for each filter option, plus Clear and Apply buttons.
 * Options come from column.filterOptions or are auto-populated from the data.
 */private _renderFilterPanel;
/**
 * Renders the action menu dropdown overlay (positioned absolutely near the kebab button).
 * Contains a list of action buttons for the active row.
 */private _renderActionMenuOverlay;
/**
 * Toggles the action menu for a row.
 * Calculates viewport-aware positioning: prefers below the button, falls back
 * to above if there isn't enough space below, or uses a safe fallback position.
 */private _toggleActionMenu;
/** Handles click on a specific action menu item. Closes the menu and notifies the consumer. */private _handleActionClick;
/**
 * Renders a single data cell (<td>).
 *
 * Two rendering paths:
 * 1. DOM Node values (e.g. React portal containers): rendered directly inside
 *    a `.zeta-table-cell-inner` wrapper without text truncation.
 * 2. Text values: wrapped in `.zeta-table-cell-inner` > `.zeta-table-cell-content`
 *    with CSS ellipsis truncation and optional tooltip on hover.
 *
 * Applies frozen column positioning if the column is pinned.
 */private _renderDataCell;
/**
 * Renders nested/expandable content inside a full-width <td> below the parent row.
 *
 * Two rendering modes:
 * 1. **DOM Node**: If `_nested` is a Node (e.g. a React portal container, an <img>,
 *    or any custom element), it is rendered directly as-is. This gives consumers
 *    full control over the nested view.
 * 2. **Array of ZetaTableLegacyRow**: Columns are derived from the keys of the first item
 *    in the array (excluding underscore-prefixed internal keys like _nested, _disabled).
 *    This means nested rows can have entirely different columns from the parent table.
 */private _renderNestedRows;
/**
 * Renders the pagination footer for numbered pagination mode.
 * Includes: page info text, rows-per-page selector, and page navigation buttons
 * (first, prev, page numbers with ellipsis, next, last).
 */private _renderPagination;
/** Renders the floating tooltip element. Visibility and position are controlled by state. */private _renderTooltip;
/** Calculates the total colspan needed for full-width rows (no-data, loading). Accounts for checkbox, expand, and actions columns. */private _getTotalColspan;}
/**
 * TypeScript global augmentation: registers "zeta-table-legacy" in the HTMLElementTagNameMap
 * so that document.createElement("zeta-table-legacy") and querySelector("zeta-table-legacy")
 * return the correct ZetaTableLegacy type.
 */declare global{interface HTMLElementTagNameMap{"zeta-table-legacy":ZetaTableLegacy;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Legacy: superseded by `zeta-table`, which is built from the Table spec. Kept, renamed from `zeta-table`, for apps
 * still on its API (`data`, `paginationType`, callback props).
 *
 * A full-featured, highly configurable data table component.
 *
 * ## Features
 * - **Sorting**: 3-state per-column sort indicator (asc → desc → none). Sorting is delegated to the consumer via `onSortChange`. Configurable per column via `sortable`.
 * - **Column Search**: Optional per-column search inputs. Enabled when `onColumnSearch` callback is provided.
 * - **Column Filter**: Optional per-column filter dropdown with checkboxes (Clear/Apply). Enabled when `onColumnFilter` is provided. Options via `filterOptions` on column or auto-populated from data.
 * - **Global Search**: Optional search bar in header. Enabled when `onTableSearch` callback is provided.
 * - **Selection**: Checkbox column with select-all. Optional `selectOnRowClick` for click-to-select.
 * - **Row Click**: Optional `onRowClick` callback. Rows show pointer cursor and highlight on click.
 * - **Disabled Rows**: Rows can be disabled via `disabledRows` array or `_disabled` property. Use `allowDisabledSelection` to allow selection/actions on disabled rows.
 * - **Frozen Columns**: Columns can be frozen via `frozen` property or the column configure panel.
 * - **Column Resizing**: Drag to resize. Double-click header to auto-fit.
 * - **Column Configure**: Show/hide and freeze/unfreeze columns from a dropdown panel.
 * - **Pagination**: Numbered or infinite scroll. Consumer provides paged data via `onPageChange`/`onLoadMore` callbacks. Use `totalItems` to tell the table the full dataset size for page count calculation.
 * - **Nested Rows**: Expandable child rows via `_nested` property on row data.
 * - **Export**: CSV export of visible data.
 * - **Refresh**: Optional refresh button with consumer-controlled reload.
 * - **Row Actions**: Per-row kebab menu with configurable items per row via `_actions`.
 * - **Tooltips**: Auto-shown on content overflow.
 * - **Localization**: All labels (`refreshLabel`, `columnsLabel`, `actionsLabel`, `searchPlaceholder`) are configurable.
 * - **Custom Styling**: Full theming via CSS custom properties and `::part()` selectors.
 *
 * ## Usage
 * ```html
 * <zeta-table-legacy
 *   .columns=${columns}
 *   .data=${data}
 *   .onTableSearch=${handleSearch}
 *   .onColumnSearch=${handleColumnSearch}
 *   .onColumnFilter=${handleFilter}
 *   .onRefresh=${handleRefresh}
 *   .onRowClick=${handleRowClick}
 *   .onRowAction=${handleAction}
 *   .onSortChange=${handleSort}
 *   .onSelectionChange=${handleSelection}
 *   .onPageChange=${handlePageChange}
 *   .onLoadMore=${handleLoadMore}
 *   .onExport=${handleExport}
 *   .onRowExpand=${handleExpand}
 *   selectable
 *   select-all
 *   exportable
 *   column-configure
 *   show-data-count
 *   table-title="My Table"
 *   pagination-type="numbered"
 *   page-size="10"
 *   style="--table-max-height: 500px; --table-header-bg: #f8fafc;"
 * ></zeta-table-legacy>
 * ```
 *
 * ## Column Definition (ZetaTableLegacyColumn)
 * ```typescript
 * {
 *   field: string;          // Data key
 *   title: string;          // Display header text
 *   width?: number | string; // Initial width — number for px (e.g. 200), string for CSS (e.g. "25%", "12rem")
 *   minWidth?: number;      // Minimum width for resize (default: 60)
 *   sortable?: boolean;     // Enable sorting (default: true)
 *   filterable?: boolean;   // Enable search/filter (default: true)
 *   filterOptions?: string[]; // Predefined filter dropdown options
 *   frozen?: boolean;       // Freeze this column
 *   visible?: boolean;      // Column visibility (default: true)
 *   tooltip?: boolean;      // true = always show tooltip (highest precedence)
 *   tooltipOnEllipsisOnly?: boolean; // true (default) = show on overflow only | false = disable tooltip
 *   resizable?: boolean;    // Allow column resize (default: true)
 *   disabled?: boolean;     // Disable all interaction on column
 * }
 * ```
 *
 * ## Row Data (ZetaTableLegacyRow)
 * ```typescript
 * {
 *   id: string | number;        // Unique row identifier (required)
 *   [key: string]: unknown;     // Data fields matching column `field` names
 *   _disabled?: boolean;        // Disable row (grey out, no interaction)
 *   _checkboxDisabled?: boolean; // Disable only the checkbox (row still interactive)
 *   _nested?: ZetaTableLegacyRow[] | Node; // Nested content: array of child rows (auto-columns) or a DOM Node (custom view)
 *   _actions?: ZetaTableLegacyAction[] | null; // Per-row kebab menu items (null = hide menu)
 * }
 * ```
 *
 * ## Row Action (ZetaTableLegacyAction)
 * ```typescript
 * { key: string; label: string; icon?: string; disabled?: boolean; }
 * ```
 * ---
 *
 *
 * ### **Events:**
 *  - **zeta-table-row-click** - Row clicked. Detail: { row, rowIndex }
 * - **zeta-table-sort-change** - Column sort changes. Detail: { field, direction }
 * - **zeta-table-column-filter** - Column filter applied. Detail: { field, selectedValues }
 * - **zeta-table-column-search** - Column search input changes. Detail: { field, value, searchValues }
 * - **zeta-table-selection-change** - Row selection changes. Detail: { selectedIds: [] }
 * - **zeta-table-row-expand** - Row expanded/collapsed. Detail: { rowId, expanded }
 * - **zeta-table-load-more** - More data needed (infinite scroll)
 * - **zeta-table-page-change** - Page changes (numbered). Detail: { page, pageSize }
 * - **zeta-table-action** - Row action clicked. Detail: { actionKey, row, rowIndex }
 * - **zeta-table-search** - Global search input changes. Detail: { value }
 * - **zeta-table-export** - Export button clicked. Detail: { csv, columns, data }
 * - **zeta-table-refresh** - Refresh button clicked
 *
 * ### **CSS Properties:**
 *  - **--table-width** - Table width. Default: 100% _(default: undefined)_
 * - **--table-max-height** - Max height of scroll area. Default: none _(default: undefined)_
 * - **--table-border-color** - Border color. Default: #e0e3e9 _(default: undefined)_
 * - **--table-border-radius** - Wrapper border radius. Default: 8px _(default: undefined)_
 * - **--table-header-bg** - Header background. Default: #ffffff _(default: undefined)_
 * - **--table-header-text** - Header text color. Default: #1d1e23 _(default: undefined)_
 * - **--table-header-height** - Header row height. Default: 40px _(default: undefined)_
 * - **--table-header-font-size** - Header font size. Default: 12px _(default: undefined)_
 * - **--table-header-font-weight** - Header font weight. Default: 600 _(default: undefined)_
 * - **--table-header-border-bottom** - Header bottom border. Default: 2px solid _(default: undefined)_
 * - **--table-row-height** - Data row height (includes cell padding, box-sizing: border-box). Default: 40px _(default: undefined)_
 * - **--table-row-bg** - Row background. Default: #fff _(default: undefined)_
 * - **--table-row-hover-bg** - Row hover background. Default: #f5f7fa _(default: undefined)_
 * - **--table-row-selected-bg** - Selected row background. Default: #e8f2ff _(default: undefined)_
 * - **--table-row-active-bg** - Active/clicked row background. Default: #e8f4fd _(default: undefined)_
 * - **--table-row-clickable-cursor** - Clickable row cursor. Default: pointer _(default: undefined)_
 * - **--table-cell-padding-y** - Cell vertical padding. Default: 10px _(default: undefined)_
 * - **--table-cell-padding-x** - Cell horizontal padding. Default: 12px _(default: undefined)_
 * - **--table-cell-padding** - Cell padding shorthand (computed from padding-y and padding-x). Default: 10px 12px _(default: undefined)_
 * - **--table-cell-font-size** - Cell font size. Default: 14px _(default: undefined)_
 * - **--table-frozen-shadow** - Frozen column shadow. Default: 4px 0 8px -2px rgba(0,0,0,0.08) _(default: undefined)_
 * - **--table-sort-active-color** - Active sort icon color. Default: #0073e6 _(default: undefined)_
 * - **--table-sort-inactive-color** - Inactive sort icon color. Default: #c4c9d4 _(default: undefined)_
 * - **--table-resize-handle-color** - Resize handle color. Default: #0073e6 _(default: undefined)_
 * - **--table-toolbar-bg** - Toolbar background. Default: #fff _(default: undefined)_
 * - **--table-footer-bg** - Footer background. Default: #fff _(default: undefined)_
 * - **--table-data-count-bg** - Data count badge background. Default: #e8f2ff _(default: undefined)_
 * - **--table-data-count-color** - Data count badge text color. Default: #0073e6 _(default: undefined)_
 */"zeta-table-legacy":Partial<ZetaTableLegacyProps&BaseProps&BaseEvents>}}}