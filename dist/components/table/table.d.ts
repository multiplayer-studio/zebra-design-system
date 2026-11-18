import{ZetaTableProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues,type TemplateResult}from"lit";import"../search/search.js";import"../avatar/avatar.js";import"../icon/icon.js";import"../pagination/pagination.js";import"../checkbox/checkbox.js";import"../select-input/select-input.js";import"../button/icon-button/icon-button.js";import"../dropdown/droppable.js";import"../divider/divider.js";import"../tooltip/tooltip.js";import"../badges/label/label.js";
/** One column. `width` is a CSS length; a number means px. */export interface ZetaTableColumn{key:string;header:string;width?:string|number;sortable?:boolean;filterable?:boolean;
/** With `columnConfigure` on, false keeps this column showing: it can't be hidden from the panel. */
hideable?:boolean;
/** Shows the full text in a tooltip on hover even when it fits. Takes precedence over `tooltipOnEllipsisOnly`. */
tooltip?:boolean;
/** Shows the full text in a tooltip on hover when it is cut off (default). False turns this column's tooltips off. */
tooltipOnEllipsisOnly?:boolean;
/** With the table's `resizable` on, false keeps this column at its width. */
resizable?:boolean;
/** Client-side: the values the filter menu offers. Unset, they are the column's distinct values. */
filterOptions?:string[];
/** Client-side: orders two rows for this column, ascending. Unset, cells compare as text, numbers by value. */
compare?:(a:ZetaTableRow,b:ZetaTableRow)=>number;}
/** The spec's `_Avatar and text` cell. */export interface ZetaTableAvatarCell{title:string;subtitle?:string;avatar?:{src?:string;initials?:string;};}
/** A string renders as text; an object as the avatar-and-text cell. */export type ZetaTableCellValue=string|ZetaTableAvatarCell;
/** One option in a row's actions menu. `icon` is a zeta-icon glyph name. */export interface ZetaTableAction{key:string;label:string;icon?:string;disabled?:boolean;}export interface ZetaTableRow{key:string;cells:Record<string,ZetaTableCellValue>;selected?:boolean;disabled?:boolean;
/** This row's menu, in place of `rowActions`; null hides the menu on this row. */
actions?:ZetaTableAction[]|null;}export type ZetaTableSortDirection="ascending"|"descending";export interface ZetaTableSort{key:string;direction:ZetaTableSortDirection;}declare const ZetaTable_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A data table built strictly from the Table spec: rows of content in columns, framed by an optional controls bar
 * above and a pagination footer below. It is a real table (header cells `scope="col"`, `aria-sort` on sortable
 * columns) in a horizontally scrolling wrapper, and takes its container's width.
 *
 * Data comes in as `columns` and `rows`. A cell value is text, or `{ title, subtitle?, avatar? }` for the spec's
 * avatar-and-text cell. Any cell can hold other content (a Checkbox, Status Label, Button, Icon Button) through the
 * named slot `cell-<rowKey>-<colKey>`, whose fallback is the data.
 *
 * Activating a sortable header cycles none, ascending, descending, sets `sort` and fires `sort-change`. By default the
 * table is controlled: the listener reorders, filters and pages `rows`. `client-side` makes the table do it itself
 * from the full `rows`: it sorts by `sort` (text, numbers by value, or the column's `compare`), keeps rows whose text
 * matches `searchValue`, keeps rows whose cell is among the chosen `filters`, and shows `pageSize` rows of page `page`
 * with the page count and footer summary worked out. Sorting, searching or filtering returns to page 1. A filterable
 * column's filter button then opens a compact menu of checkbox options (its `filterOptions`, or its distinct values)
 * and fires `filter-change`; a filtered column keeps its filter button showing. With nothing to show, the body shows
 * `emptyLabel`. `frozenColumns` pins the first columns, measured from the rendered
 * header cells, and the last frozen one casts a horizontal shadow once the rest scroll beneath it. The footer holds an
 * outline zeta-pagination driven by `page` and `pageCount`, or whatever is slotted into `pagination`.
 *
 * `selectable` adds a checkbox column before the columns, with select-all in its header. `selectedRows` holds the
 * selected row keys (seeded from each row's `selected` until it is set) and every toggle fires `selection-change`.
 * Select-all covers the enabled rows shown, so a selection on another page survives; disabled rows can't be toggled.
 * While any row is selected, an info Label at the start of the controls bar counts them (`selectedCountFormat`), and
 * the count is announced as it changes.
 * Selected rows take the selected fill and `aria-selected`.
 *
 * `pageSizeOptions` adds a rows-per-page Select Input to the start of the footer, after the summary, as narrow as its
 * values allow, opening on the compact menu like the table's other menus. Choosing a size sets `pageSize`, returns to page 1 and fires `page-size-change`; client-side, the table pages
 * by it, and otherwise the listener does.
 *
 * `rowActions` adds a trailing column with a more button per row that opens a compact menu of those actions; a row's
 * own `actions` replace them, and `null` hides the menu on that row. Choosing an enabled action closes the menu, calls
 * `onRowAction` and fires `row-action`. The menu opens in the top layer, so the table's clipping never cuts it off;
 * it moves with the arrow keys and closes on Escape, Tab or a click outside, handing focus back to its button.
 *
 * `resizable` lets people resize columns from each header's trailing edge; a column opts out with `resizable: false`.
 * Hovering the edge shows the neutral hover border down the full header cell. Resizing never changes the table's
 * width: a column grows by taking width from the resizable columns after it, the next first and none below
 * `minColumnWidth`, and shrinks by giving it to the next one (the last column trades with those before it). Dragging
 * sets the width, the arrow keys step it, and a double-click returns the column to its declared width. Each change
 * fires `column-resize`.
 *
 * `columnConfigure` adds a settings button to the controls bar that opens a compact panel: a checkbox per column to
 * show or hide it (`hiddenColumns`; the last column showing can't be hidden, nor a column with `hideable: false`), and
 * a choice of how many leading columns to freeze (`frozenColumns`). Every change fires `column-settings-change`.
 * Hidden columns leave every part of the table, search included.
 *
 * Text cut off with an ellipsis (a cell's text, an avatar cell's title or subtitle, a header label) shows in full in a
 * Tooltip above it after `tooltipDelay` ms of hover. A column's `tooltip` shows it even when the text fits, and
 * `tooltipOnEllipsisOnly: false` turns it off. The tooltip opens in the top layer and repeats text already on the page,
 * so it is hidden from assistive technology.
 *
 * A row is disabled by its own `disabled` or by its key in `disabledRows`. Disabled rows look disabled, can't be
 * selected, clicked or opened for actions, and select-all passes them by; `allowDisabledSelection` lets them be
 * selected, clicked and opened for actions while they still look disabled, as for a bulk delete.
 *
 * `maxHeight` caps the content's height: rows beyond it scroll vertically inside the table, under a header that
 * sticks to the top, while the controls bar and footer stay put. Frozen columns stay frozen in both directions.
 *
 * `rounded` rounds the table's corners and its own Search, Pagination, checkboxes and actions menu. The table can't reach slotted content, so
 * slotted controls read `rounded` from the table to match. Rows show a pointer only while something listens for
 * `row-click`; disabled rows never fire it.
 *
 * Kept in step with packages/web-components zds-table.
 *
 * @slot controls - Actions after the search field in the controls bar, such as outline-subtle zeta-icon-buttons.
 * @slot pagination - Replaces the built-in zeta-pagination at the end of the footer.
 * @slot cell-<rowKey>-<colKey> - Replaces one data cell's content.
 * @part controls - The controls bar.
 * @part scroller - The horizontally scrolling wrapper.
 * @part table - The table element.
 * @part footer - The footer.
 * @event sort-change - A sortable header was activated. `detail.sort` is the new sort, or null.
 * @event search-change - The search query changed. `detail.value`.
 * @event filter - A header's filter control was activated. `detail.key` is the column key.
 * @event filter-change - Client-side: a filter option was toggled or cleared. `detail.filters` is the new filters,
 *   `detail.key` the column.
 * @event row-click - An enabled row was clicked. `detail.row`.
 * @event page-change - The built-in pagination moved. `detail.page`, 1-based.
 * @event page-size-change - A rows-per-page size was chosen. `detail.pageSize`.
 * @event row-action - An action was chosen from a row's menu. `detail.action` is its key, `detail.row` the row and
 *   `detail.rowIndex` its index in `rows`.
 * @event column-resize - A column was resized. `detail.key` is the column, `detail.width` its width in px and
 *   `detail.widths` every column's width in px, the neighbours that gave or took width included.
 * @event column-settings-change - A column was shown or hidden, or the freeze changed, from the settings panel.
 *   `detail.hiddenColumns` and `detail.frozenColumns`.
 * @event selection-change - A row or select-all was toggled. `detail.selectedRows` is the new set of keys,
 *   `detail.rows` the rows that changed and `detail.selected` whether they were selected or cleared.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4364-1629
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-table--docs
 */export declare class ZetaTable extends ZetaTable_base{
/** The columns, in order. */
columns:ZetaTableColumn[];
/** The rows, in order. */
rows:ZetaTableRow[];
/** Shows the controls bar above the content (search and the `controls` slot). */
hasControl:boolean;
/** Shows the footer below the content (the page summary and the pagination). */
hasFooter:boolean;
/** Shows the search field in the controls bar (Table Controls' search). */
showSearch:boolean;
/** The search query. */
searchValue:string;
/** Placeholder, and accessible name, of the search field. */
searchPlaceholder:string;
/** The footer summary, such as "Showing 1-3 of 21". Empty hides it. */
pageDetails:string;
/** The pagination's current page, 1-based. */
page:number;
/** The pagination's page count. At 1 or less the pagination renders nothing. Client-side paging works it out. */
pageCount:number;
/** The current sort, or null. The table reorders rows by it only when `clientSide`. */
sort:ZetaTableSort|null;
/** The table sorts, searches, filters and pages `rows` itself. */
clientSide:boolean;
/** Client-side: rows per page. 0 shows every row on one page. */
pageSize:number;
/** The sizes the footer's rows-per-page select offers. Empty hides it. */
pageSizeOptions:number[];
/** The rows-per-page select's label, and its accessible name. */
pageSizeLabel:string;
/** Client-side: the chosen filter values per column key. A row shows when its cell is among each column's values. */
filters:Record<string,string[]>;
/** Client-side: the footer summary when `pageDetails` is empty. `{from}`, `{to}` and `{total}` are filled in. */
pageDetailsFormat:string;
/** The text shown in the body when there are no rows to show. */
emptyLabel:string;
/** Client-side: the filter menu's option that clears the column's filter. */
clearFilterLabel:string;
/** Caps the content's height, a CSS length or px, so rows scroll vertically under a sticky header. Unset, the table
 * grows with its rows. */
maxHeight:string|number|null;
/** Pins the first N columns while the rest scroll horizontally. */
frozenColumns:number;
/** Adds a settings button to the controls bar to show, hide and freeze columns. */
columnConfigure:boolean;
/** The keys of the columns not showing. */
hiddenColumns:string[];
/** The settings button's accessible name. */
columnsLabel:string;
/** The settings panel's heading over the show and hide checkboxes. */
showColumnsLabel:string;
/** The settings panel's heading over the freeze choices. */
freezeColumnsLabel:string;
/** The settings panel's choice that freezes no columns. */
noFrozenLabel:string;
/** Lets people resize columns from each header's trailing edge. A column opts out with `resizable: false`. */
resizable:boolean;
/** The narrowest a resized column can get, in px. */
minColumnWidth:number;
/** How long, in ms, cut-off text is hovered before its tooltip shows. */
tooltipDelay:number;
/** Disables these rows, by key, as each row's own `disabled` does. */
disabledRows:string[];
/** Lets disabled rows be selected, clicked and opened for actions; they still look disabled. */
allowDisabledSelection:boolean;
/** Adds a checkbox column with select-all in its header. */
selectable:boolean;
/** The selected row keys. Until it is set, it follows each row's `selected`. */
selectedRows:string[];
/** The selected-rows count in the controls bar. `{count}` is filled in. */
selectedCountFormat:string;
/** Accessible name of the select-all checkbox. */
selectAllLabel:string;
/** Accessible name of each row's checkbox, followed by the row's first cell. */
selectRowLabel:string;
/** Actions offered in every row's menu. Any row with actions adds the actions column. */
rowActions:ZetaTableAction[];
/** Called when an action is chosen, with its key, the row and the row's index. */
onRowAction:((actionKey:string,row:ZetaTableRow,rowIndex:number)=>void)|null;
/** Accessible name of the actions column and of each row's more button. */
actionsLabel:string;
/** Accessible name of the table, as a visually hidden caption. */
caption:string|null;private scrolled;
/** Widths people resized columns to, in px, by column key. */private widths;
/** The key of the column being dragged. */private resizing;
/** Set on the first resize, when every column's width is locked to its rendered width. */private sized;private edgeWidths;
/** Each column's width when the widths were locked, for a column with no declared width to return to. */private lockedWidths;private frozenOffsets;
/** The open menu: a row's actions or a column's filter. */private menuFor;private menu;private tip;
/** The full text the tooltip shows, while it shows. */private tipText;private tipTimer;private tipTarget;
/** The rows on screen, and how many rows pass search and filters, before paging. */private view;private total;private menuTrigger;private rowClickListeners;private selectionSet;private frozenObserver;addEventListener(type:string,listener:EventListenerOrEventListenerObject,options?:boolean|AddEventListenerOptions):void;removeEventListener(type:string,listener:EventListenerOrEventListenerObject,options?:boolean|EventListenerOptions):void;private setRowClickListeners;protected willUpdate(changed:PropertyValues<this>):void;
/** Client-side, the rows shown are the rows searched, filtered, sorted and paged; otherwise `rows` as given. */private computeView;
/** The page count the pagination shows. */private get pages();private get summary();
/** Client-side, a new sort, search or filter starts again from page 1. */private restart;protected updated(changed:PropertyValues<this>):void;disconnectedCallback():void;private observeFrozen;private measureFrozen;private emit;
/** Text that can be cut off with an ellipsis: a cell's text, an avatar cell's title or subtitle, a header label. */private static readonly TRUNCATING;private onPointerOver;private showTip;private hideTip;private renderTip;private onScroll;private onSearchInput;private cycleSort;private onPageSizeChange;private renderPageSize;private onPageChange;
/** The columns showing, in order. */private get shown();private emitColumnSettings;private setColumnShown;private setFrozen;private renderColumnSettings;private renderSettingsButton;
/** 1 when the checkbox column leads the columns. */private get lead();private isDisabled;
/** Whether a row takes selection, clicks and its actions: enabled, or disabled with allowDisabledSelection. */private isActionable;private isSelected;private setSelection;private toggleRow;
/** Selects every enabled row shown, or clears them when they all are. */private toggleAll;private onRowClick;
/** Sticky geometry for column i, or null when it isn't frozen. */private frozenFor;
/** The checkbox column's cell attributes: frozen at the start when any column is. */private selectCell;private renderSelectedCount;private renderSelectAll;private renderSelectCell;
/** A row's name for its controls: its first cell's text, or its key. */private rowName;
/** A row's own actions win over rowActions; null hides the menu on that row. */private actionsFor;private get hasActions();private menuItems;
/** Menu rows are focusable inside their own shadow root. */private focusItem;private isOpen;private toggleMenu;private closeMenu;private onOutsideClick;private onMenuKeydown;private runAction;private renderActionsHeader;private renderActionsCell;
/** A column's filter options: its filterOptions, or its distinct cell values in order. */private filterOptionsFor;private setFilter;private toggleFilter;private onFilterClick;private renderMenuItems;private get menuRole();private get menuName();private renderMenu;private isResizable;
/** A column's width: the one it was resized to, or its declared width. */private widthOf;private lockWidths;
/** The locked table's width: every column's width added up, so fixed layout lands each one exactly. */private lockedTotal;
/** The resizable columns a column trades width with: those after it, nearest first, or before it for the last. */private neighbours;
/** The width a column returns to: its declared px width, or the width it had when the widths were locked. */private declaredWidth;private setWidth;
/** The header cell's rendered width, the separator's value. */private measured;private startResize;private onResizeKey;private renderResizer;private renderColgroup;private renderHeader;private renderValue;private renderRow;protected render():TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-table":ZetaTable;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A data table built strictly from the Table spec: rows of content in columns, framed by an optional controls bar
 * above and a pagination footer below. It is a real table (header cells `scope="col"`, `aria-sort` on sortable
 * columns) in a horizontally scrolling wrapper, and takes its container's width.
 *
 * Data comes in as `columns` and `rows`. A cell value is text, or `{ title, subtitle?, avatar? }` for the spec's
 * avatar-and-text cell. Any cell can hold other content (a Checkbox, Status Label, Button, Icon Button) through the
 * named slot `cell-<rowKey>-<colKey>`, whose fallback is the data.
 *
 * Activating a sortable header cycles none, ascending, descending, sets `sort` and fires `sort-change`. By default the
 * table is controlled: the listener reorders, filters and pages `rows`. `client-side` makes the table do it itself
 * from the full `rows`: it sorts by `sort` (text, numbers by value, or the column's `compare`), keeps rows whose text
 * matches `searchValue`, keeps rows whose cell is among the chosen `filters`, and shows `pageSize` rows of page `page`
 * with the page count and footer summary worked out. Sorting, searching or filtering returns to page 1. A filterable
 * column's filter button then opens a compact menu of checkbox options (its `filterOptions`, or its distinct values)
 * and fires `filter-change`; a filtered column keeps its filter button showing. With nothing to show, the body shows
 * `emptyLabel`. `frozenColumns` pins the first columns, measured from the rendered
 * header cells, and the last frozen one casts a horizontal shadow once the rest scroll beneath it. The footer holds an
 * outline zeta-pagination driven by `page` and `pageCount`, or whatever is slotted into `pagination`.
 *
 * `selectable` adds a checkbox column before the columns, with select-all in its header. `selectedRows` holds the
 * selected row keys (seeded from each row's `selected` until it is set) and every toggle fires `selection-change`.
 * Select-all covers the enabled rows shown, so a selection on another page survives; disabled rows can't be toggled.
 * While any row is selected, an info Label at the start of the controls bar counts them (`selectedCountFormat`), and
 * the count is announced as it changes.
 * Selected rows take the selected fill and `aria-selected`.
 *
 * `pageSizeOptions` adds a rows-per-page Select Input to the start of the footer, after the summary, as narrow as its
 * values allow, opening on the compact menu like the table's other menus. Choosing a size sets `pageSize`, returns to page 1 and fires `page-size-change`; client-side, the table pages
 * by it, and otherwise the listener does.
 *
 * `rowActions` adds a trailing column with a more button per row that opens a compact menu of those actions; a row's
 * own `actions` replace them, and `null` hides the menu on that row. Choosing an enabled action closes the menu, calls
 * `onRowAction` and fires `row-action`. The menu opens in the top layer, so the table's clipping never cuts it off;
 * it moves with the arrow keys and closes on Escape, Tab or a click outside, handing focus back to its button.
 *
 * `resizable` lets people resize columns from each header's trailing edge; a column opts out with `resizable: false`.
 * Hovering the edge shows the neutral hover border down the full header cell. Resizing never changes the table's
 * width: a column grows by taking width from the resizable columns after it, the next first and none below
 * `minColumnWidth`, and shrinks by giving it to the next one (the last column trades with those before it). Dragging
 * sets the width, the arrow keys step it, and a double-click returns the column to its declared width. Each change
 * fires `column-resize`.
 *
 * `columnConfigure` adds a settings button to the controls bar that opens a compact panel: a checkbox per column to
 * show or hide it (`hiddenColumns`; the last column showing can't be hidden, nor a column with `hideable: false`), and
 * a choice of how many leading columns to freeze (`frozenColumns`). Every change fires `column-settings-change`.
 * Hidden columns leave every part of the table, search included.
 *
 * Text cut off with an ellipsis (a cell's text, an avatar cell's title or subtitle, a header label) shows in full in a
 * Tooltip above it after `tooltipDelay` ms of hover. A column's `tooltip` shows it even when the text fits, and
 * `tooltipOnEllipsisOnly: false` turns it off. The tooltip opens in the top layer and repeats text already on the page,
 * so it is hidden from assistive technology.
 *
 * A row is disabled by its own `disabled` or by its key in `disabledRows`. Disabled rows look disabled, can't be
 * selected, clicked or opened for actions, and select-all passes them by; `allowDisabledSelection` lets them be
 * selected, clicked and opened for actions while they still look disabled, as for a bulk delete.
 *
 * `maxHeight` caps the content's height: rows beyond it scroll vertically inside the table, under a header that
 * sticks to the top, while the controls bar and footer stay put. Frozen columns stay frozen in both directions.
 *
 * `rounded` rounds the table's corners and its own Search, Pagination, checkboxes and actions menu. The table can't reach slotted content, so
 * slotted controls read `rounded` from the table to match. Rows show a pointer only while something listens for
 * `row-click`; disabled rows never fire it.
 *
 * Kept in step with packages/web-components zds-table.
 * ---
 *
 *
 * ### **Events:**
 *  - **name**
 * - **sort-change** - A sortable header was activated. `detail.sort` is the new sort, or null.
 * - **search-change** - The search query changed. `detail.value`.
 * - **filter** - A header's filter control was activated. `detail.key` is the column key.
 * - **filter-change** - Client-side: a filter option was toggled or cleared. `detail.filters` is the new filters, `detail.key` the column.
 * - **row-click** - An enabled row was clicked. `detail.row`.
 * - **page-change** - The built-in pagination moved. `detail.page`, 1-based.
 * - **page-size-change** - A rows-per-page size was chosen. `detail.pageSize`.
 * - **row-action** - An action was chosen from a row's menu. `detail.action` is its key, `detail.row` the row and `detail.rowIndex` its index in `rows`.
 * - **column-resize** - A column was resized. `detail.key` is the column, `detail.width` its width in px and `detail.widths` every column's width in px, the neighbours that gave or took width included.
 * - **column-settings-change** - A column was shown or hidden, or the freeze changed, from the settings panel. `detail.hiddenColumns` and `detail.frozenColumns`.
 * - **selection-change** - A row or select-all was toggled. `detail.selectedRows` is the new set of keys, `detail.rows` the rows that changed and `detail.selected` whether they were selected or cleared.
 *
 * ### **Slots:**
 *  - **controls** - Actions after the search field in the controls bar, such as outline-subtle zeta-icon-buttons.
 * - **pagination** - Replaces the built-in zeta-pagination at the end of the footer.
 * - **cell-<rowKey>-<colKey>** - Replaces one data cell's content.
 *
 * ### **CSS Parts:**
 *  - **controls** - The controls bar.
 * - **scroller** - The horizontally scrolling wrapper.
 * - **table** - The table element.
 * - **footer** - The footer.
 */"zeta-table":Partial<ZetaTableProps&BaseProps&BaseEvents>}}}