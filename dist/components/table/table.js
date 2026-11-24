var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ZetaTable_1;
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./table.styles.js";
import "../search/search.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import "../pagination/pagination.js";
import "../checkbox/checkbox.js";
import "../select-input/select-input.js";
import "../button/icon-button/icon-button.js";
import "../dropdown/droppable.js";
import "../divider/divider.js";
import "../tooltip/tooltip.js";
import "../badges/label/label.js";
/** A max-height attribute: a bare number is px, anything else a CSS length. */
const lengthOrPx = (v) => (v !== null && /^\d+(\.\d+)?$/.test(v) ? Number(v) : v);
const toLength = (w) => (typeof w === "number" ? `${w}px` : w);
/** A cell's text: the value itself, or an avatar cell's title. */
const cellText = (v) => (v === undefined || v === null ? "" : typeof v === "string" ? v : v.title);
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
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
 * @storybook ?path=/story/components-table--table
 */
let ZetaTable = class ZetaTable extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The columns, in order. */
        this.columns = [];
        /** The rows, in order. */
        this.rows = [];
        /** Shows the controls bar above the content (search and the `controls` slot). */
        this.hasControl = true;
        /** Shows the footer below the content (the page summary and the pagination). */
        this.hasFooter = true;
        /** Shows the search field in the controls bar (Table Controls' search). */
        this.showSearch = true;
        /** The search query. */
        this.searchValue = "";
        /** Placeholder, and accessible name, of the search field. */
        this.searchPlaceholder = "Search";
        /** The footer summary, such as "Showing 1-3 of 21". Empty hides it. */
        this.pageDetails = "";
        /** The pagination's current page, 1-based. */
        this.page = 1;
        /** The pagination's page count. At 1 or less the pagination renders nothing. Client-side paging works it out. */
        this.pageCount = 1;
        /** The current sort, or null. The table reorders rows by it only when `clientSide`. */
        this.sort = null;
        /** The table sorts, searches, filters and pages `rows` itself. */
        this.clientSide = false;
        /** Client-side: rows per page. 0 shows every row on one page. */
        this.pageSize = 0;
        /** The sizes the footer's rows-per-page select offers. Empty hides it. */
        this.pageSizeOptions = [];
        /** The rows-per-page select's label, and its accessible name. */
        this.pageSizeLabel = "Rows per page";
        /** Client-side: the chosen filter values per column key. A row shows when its cell is among each column's values. */
        this.filters = {};
        /** Client-side: the footer summary when `pageDetails` is empty. `{from}`, `{to}` and `{total}` are filled in. */
        this.pageDetailsFormat = "Showing {from}-{to} of {total}";
        /** The text shown in the body when there are no rows to show. */
        this.emptyLabel = "No results";
        /** Client-side: the filter menu's option that clears the column's filter. */
        this.clearFilterLabel = "Clear filter";
        /** Caps the content's height, a CSS length or px, so rows scroll vertically under a sticky header. Unset, the table
         * grows with its rows. */
        this.maxHeight = null;
        /** Pins the first N columns while the rest scroll horizontally. */
        this.frozenColumns = 0;
        /** Adds a settings button to the controls bar to show, hide and freeze columns. */
        this.columnConfigure = false;
        /** The keys of the columns not showing. */
        this.hiddenColumns = [];
        /** The settings button's accessible name. */
        this.columnsLabel = "Columns";
        /** The settings panel's heading over the show and hide checkboxes. */
        this.showColumnsLabel = "Show columns";
        /** The settings panel's heading over the freeze choices. */
        this.freezeColumnsLabel = "Freeze up to";
        /** The settings panel's choice that freezes no columns. */
        this.noFrozenLabel = "None";
        /** Lets people resize columns from each header's trailing edge. A column opts out with `resizable: false`. */
        this.resizable = false;
        /** The narrowest a resized column can get, in px. */
        this.minColumnWidth = 80;
        /** How long, in ms, cut-off text is hovered before its tooltip shows. */
        this.tooltipDelay = 500;
        /** Disables these rows, by key, as each row's own `disabled` does. */
        this.disabledRows = [];
        /** Lets disabled rows be selected, clicked and opened for actions; they still look disabled. */
        this.allowDisabledSelection = false;
        /** Adds a checkbox column with select-all in its header. */
        this.selectable = false;
        /** The selected row keys. Until it is set, it follows each row's `selected`. */
        this.selectedRows = [];
        /** The selected-rows count in the controls bar. `{count}` is filled in. */
        this.selectedCountFormat = "{count} selected";
        /** Accessible name of the select-all checkbox. */
        this.selectAllLabel = "Select all rows";
        /** Accessible name of each row's checkbox, followed by the row's first cell. */
        this.selectRowLabel = "Select row";
        /** Actions offered in every row's menu. Any row with actions adds the actions column. */
        this.rowActions = [];
        /** Called when an action is chosen, with its key, the row and the row's index. */
        this.onRowAction = null;
        /** Accessible name of the actions column and of each row's more button. */
        this.actionsLabel = "Actions";
        /** Accessible name of the table, as a visually hidden caption. */
        this.caption = null;
        this.scrolled = false;
        /** Widths people resized columns to, in px, by column key. */
        this.widths = {};
        /** The key of the column being dragged. */
        this.resizing = null;
        /** Set on the first resize, when every column's width is locked to its rendered width. */
        this.sized = false;
        this.edgeWidths = {};
        /** Each column's width when the widths were locked, for a column with no declared width to return to. */
        this.lockedWidths = {};
        this.frozenOffsets = [];
        /** The open menu: a row's actions or a column's filter. */
        this.menuFor = null;
        /** The full text the tooltip shows, while it shows. */
        this.tipText = "";
        this.tipTimer = null;
        this.tipTarget = null;
        /** The rows on screen, and how many rows pass search and filters, before paging. */
        this.view = [];
        this.total = 0;
        this.menuTrigger = null;
        this.rowClickListeners = 0;
        this.selectionSet = false;
        this.frozenObserver = null;
        this.onPointerOver = (e) => {
            const target = e.composedPath().find(n => n instanceof HTMLElement && n.matches(ZetaTable_1.TRUNCATING));
            if (target === this.tipTarget)
                return;
            this.hideTip();
            if (!target)
                return;
            const key = target.closest("td, th")?.dataset.key;
            const col = this.columns.find(c => c.key === key);
            if (!col || col.tooltip === false || (col.tooltip !== true && col.tooltipOnEllipsisOnly === false))
                return;
            if (col.tooltip !== true && target.scrollWidth <= target.clientWidth)
                return;
            this.tipTarget = target;
            this.tipTimer = setTimeout(() => void this.showTip(target), this.tooltipDelay);
        };
        this.hideTip = () => {
            if (this.tipTimer)
                clearTimeout(this.tipTimer);
            this.tipTimer = null;
            this.tipTarget = null;
            if (this.tip?.matches(":popover-open"))
                this.tip.hidePopover();
        };
        this.onScroll = (e) => {
            this.hideTip();
            if (this.menuFor)
                this.closeMenu(false);
            const scrolled = Math.abs(e.currentTarget.scrollLeft) > 0;
            if (scrolled !== this.scrolled)
                this.scrolled = scrolled;
        };
        this.onSearchInput = (e) => {
            const value = e.currentTarget.value ?? "";
            if (value === this.searchValue)
                return;
            this.searchValue = value;
            this.restart();
            this.emit("search-change", { value });
        };
        this.onPageSizeChange = (e) => {
            const size = Number(e.currentTarget.value);
            if (!size || size === this.pageSize)
                return;
            this.pageSize = size;
            this.page = 1;
            this.emit("page-size-change", { pageSize: size });
        };
        this.onPageChange = (e) => {
            this.page = e.detail.page;
            this.emit("page-change", { page: this.page });
        };
        /** Selects every enabled row shown, or clears them when they all are. */
        this.toggleAll = () => {
            const enabled = this.view.filter(r => this.isActionable(r));
            const all = enabled.length > 0 && enabled.every(r => this.isSelected(r));
            this.setSelection(all ? enabled : enabled.filter(r => !this.isSelected(r)), !all);
        };
        this.onOutsideClick = (e) => {
            const path = e.composedPath();
            if (!path.includes(this.menu) && !(this.menuTrigger && path.includes(this.menuTrigger)))
                this.closeMenu(false);
        };
        this.onMenuKeydown = (e) => {
            const items = this.menuItems();
            const at = items.findIndex(i => e.composedPath().includes(i));
            if (e.key === "Escape")
                this.closeMenu();
            else if (e.key === "Tab")
                this.closeMenu(false);
            else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const step = e.key === "ArrowDown" ? 1 : -1;
                this.focusItem(items[(at + step + items.length) % items.length]);
            }
            else if (e.key === "Home" || e.key === "End") {
                e.preventDefault();
                this.focusItem(items[e.key === "Home" ? 0 : items.length - 1]);
            }
            else if (e.key === "Enter" && at >= 0) {
                e.preventDefault();
                items[at].click();
            }
        };
    }
    static { ZetaTable_1 = this; }
    // There is no onRowClick property to detect, so count row-click listeners to know whether rows are clickable.
    addEventListener(type, listener, options) {
        super.addEventListener(type, listener, options);
        if (type === "row-click")
            this.setRowClickListeners(this.rowClickListeners + 1);
    }
    removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (type === "row-click")
            this.setRowClickListeners(Math.max(0, this.rowClickListeners - 1));
    }
    setRowClickListeners(n) {
        this.rowClickListeners = n;
        this.toggleAttribute("data-clickable", n > 0);
    }
    willUpdate(changed) {
        if (changed.has("selectedRows") && changed.get("selectedRows") !== undefined)
            this.selectionSet = true;
        // Until selectedRows is set, it follows each row's own selected flag.
        if (changed.has("rows") && !this.selectionSet) {
            const seeded = this.rows.filter(r => r.selected).map(r => r.key);
            if (seeded.join() !== this.selectedRows.join())
                this.selectedRows = seeded;
        }
        this.computeView();
    }
    /** Client-side, the rows shown are the rows searched, filtered, sorted and paged; otherwise `rows` as given. */
    computeView() {
        if (!this.clientSide) {
            this.view = this.rows;
            this.total = this.rows.length;
            return;
        }
        const query = this.searchValue.trim().toLowerCase();
        const active = Object.entries(this.filters).filter(([, values]) => values.length);
        let out = this.rows.filter(row => {
            if (active.some(([key, values]) => !values.includes(cellText(row.cells[key]))))
                return false;
            if (!query)
                return true;
            return this.shown.some(c => {
                const v = row.cells[c.key];
                const text = typeof v === "object" && v ? `${v.title} ${v.subtitle ?? ""}` : cellText(v);
                return text.toLowerCase().includes(query);
            });
        });
        const sort = this.sort;
        const col = sort && this.columns.find(c => c.key === sort.key);
        if (sort && col) {
            const cmp = col.compare ?? ((a, b) => collator.compare(cellText(a.cells[sort.key]), cellText(b.cells[sort.key])));
            const dir = sort.direction === "descending" ? -1 : 1;
            out = [...out].sort((a, b) => dir * cmp(a, b));
        }
        this.total = out.length;
        if (this.pageSize > 0) {
            const pages = Math.max(1, Math.ceil(out.length / this.pageSize));
            if (this.page > pages)
                this.page = pages;
            if (this.page < 1)
                this.page = 1;
            out = out.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        }
        this.view = out;
    }
    /** The page count the pagination shows. */
    get pages() {
        return this.clientSide && this.pageSize > 0 ? Math.max(1, Math.ceil(this.total / this.pageSize)) : this.pageCount;
    }
    get summary() {
        if (this.pageDetails || !this.clientSide)
            return this.pageDetails;
        const size = this.pageSize > 0 ? this.pageSize : this.total;
        const from = this.total ? (this.page - 1) * size + 1 : 0;
        const to = this.total ? Math.min(this.total, from + size - 1) : 0;
        return this.pageDetailsFormat.replace("{from}", String(from)).replace("{to}", String(to)).replace("{total}", String(this.total));
    }
    /** Client-side, a new sort, search or filter starts again from page 1. */
    restart() {
        if (this.clientSide)
            this.page = 1;
    }
    updated(changed) {
        // A separator's value is its column's rendered width, read once the layout has settled.
        for (const grip of this.renderRoot.querySelectorAll(".resizer")) {
            grip.setAttribute("aria-valuenow", String(Math.round(this.measured(grip))));
        }
        if (changed.has("frozenColumns") || changed.has("columns") || changed.has("selectable"))
            this.observeFrozen();
    }
    disconnectedCallback() {
        super.disconnectedCallback?.();
        this.closeMenu(false);
        this.hideTip();
        this.frozenObserver?.disconnect();
        this.frozenObserver = null;
    }
    /* Sticky offsets are measured from the rendered header cells, not derived from declared widths: content and padding
       can widen a column, and a derived offset would then stick the next frozen column in the wrong place. */
    observeFrozen() {
        this.frozenObserver?.disconnect();
        this.frozenObserver = null;
        const n = Math.min(this.frozenColumns, this.shown.length);
        if (n <= 0) {
            if (this.frozenOffsets.length)
                this.frozenOffsets = [];
            return;
        }
        // The checkbox column freezes with the frozen columns, ahead of them.
        const cells = Array.from(this.renderRoot.querySelectorAll("thead th")).slice(0, n + this.lead);
        this.frozenObserver = new ResizeObserver(() => this.measureFrozen(cells));
        cells.forEach(c => this.frozenObserver.observe(c));
        this.measureFrozen(cells);
    }
    measureFrozen(cells) {
        let sum = 0;
        const offsets = cells.map(c => {
            const at = sum;
            sum += c.getBoundingClientRect().width;
            return at;
        });
        const same = offsets.length === this.frozenOffsets.length && offsets.every((o, i) => o === this.frozenOffsets[i]);
        if (!same)
            this.frozenOffsets = offsets;
    }
    emit(name, detail) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    }
    /** Text that can be cut off with an ellipsis: a cell's text, an avatar cell's title or subtitle, a header label. */
    static { this.TRUNCATING = ".text, .title, .subtitle, .label"; }
    async showTip(target) {
        this.tipText = target.textContent?.trim() ?? "";
        await this.updateComplete;
        const tip = this.tip;
        if (!tip.matches(":popover-open"))
            tip.showPopover();
        const r = target.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(this).getPropertyValue("--space-xs")) || 0;
        // Above the text, its arrow pointing down at it; below when there is no room above.
        tip.point = "bottom";
        await tip.updateComplete;
        let t = tip.getBoundingClientRect();
        let top = r.top - t.height - gap;
        if (top < 0) {
            tip.point = "top";
            await tip.updateComplete;
            t = tip.getBoundingClientRect();
            top = r.bottom + gap;
        }
        const left = Math.min(Math.max(0, r.left + r.width / 2 - t.width / 2), window.innerWidth - t.width);
        tip.style.left = `${left}px`;
        tip.style.top = `${top}px`;
    }
    renderTip() {
        return html `<zeta-tooltip class="cell-tip" .popover=${"manual"} aria-hidden="true" .rounded=${this.rounded}>${this.tipText}</zeta-tooltip>`;
    }
    cycleSort(col) {
        const current = this.sort?.key === col.key ? this.sort.direction : null;
        const next = current === null ? { key: col.key, direction: "ascending" } : current === "ascending" ? { key: col.key, direction: "descending" } : null;
        this.sort = next;
        this.restart();
        this.emit("sort-change", { sort: next });
    }
    renderPageSize() {
        if (!this.pageSizeOptions.length)
            return nothing;
        return html `<div class="page-size">
      <span class="page-size-label" aria-hidden="true">${this.pageSizeLabel}</span>
      <zeta-select-input
        size="small"
        compact
        fixedDropdown
        style=${styleMap({ "--_digits": String(Math.max(...this.pageSizeOptions.map(n => String(n).length))) })}
        shape=${this.rounded ? "rounded" : "sharp"}
        .placeholder=${this.pageSizeLabel}
        .value=${String(this.pageSize)}
        @change=${this.onPageSizeChange}
      >
        ${this.pageSizeOptions.map(n => html `<zeta-option value=${String(n)} ?selected=${n === this.pageSize}>${n}</zeta-option>`)}
      </zeta-select-input>
    </div>`;
    }
    /** The columns showing, in order. */
    get shown() {
        return this.columns.filter(c => !this.hiddenColumns.includes(c.key));
    }
    emitColumnSettings() {
        this.emit("column-settings-change", { hiddenColumns: this.hiddenColumns, frozenColumns: this.frozenColumns });
    }
    setColumnShown(col, show) {
        const hidden = this.hiddenColumns.filter(k => k !== col.key);
        this.hiddenColumns = show ? hidden : [...hidden, col.key];
        // Freezing never reaches past the columns still showing.
        this.frozenColumns = Math.min(this.frozenColumns, this.shown.length);
        this.emitColumnSettings();
    }
    setFrozen(count) {
        if (count === this.frozenColumns)
            return;
        this.frozenColumns = count;
        this.emitColumnSettings();
    }
    renderColumnSettings() {
        const shown = this.shown;
        return html `<div role="group" aria-labelledby="show-columns">
        <div class="menu-heading" id="show-columns">${this.showColumnsLabel}</div>
        ${this.columns.map(col => {
            const showing = !this.hiddenColumns.includes(col.key);
            // The last column showing, and a column that opts out, stay put.
            const locked = col.hideable === false || (showing && shown.length === 1);
            return html `<zeta-dropdown-menu-item
            type="checkbox"
            .selected=${showing}
            .disabled=${locked}
            @change=${(e) => this.setColumnShown(col, e.currentTarget.selected)}
            >${col.header}</zeta-dropdown-menu-item
          >`;
        })}
      </div>
      <zeta-divider class="menu-divider" aria-hidden="true"></zeta-divider>
      <div role="group" aria-labelledby="freeze-columns">
        <div class="menu-heading" id="freeze-columns">${this.freezeColumnsLabel}</div>
        ${[{ label: this.noFrozenLabel, count: 0 }, ...shown.map((c, i) => ({ label: c.header, count: i + 1 }))].map(o => html `<zeta-dropdown-menu-item
              type="radio"
              .selected=${Math.min(this.frozenColumns, shown.length) === o.count}
              @change=${() => this.setFrozen(o.count)}
              >${o.label}</zeta-dropdown-menu-item
            >`)}
      </div>`;
    }
    renderSettingsButton() {
        if (!this.columnConfigure)
            return nothing;
        return html `<zeta-icon-button
      class="column-settings"
      size="small"
      flavor="outline-subtle"
      shape=${this.rounded ? "rounded" : "sharp"}
      aria-label=${this.columnsLabel}
      .ariaExpanded=${this.isOpen("columns", "") ? "true" : "false"}
      @click=${(e) => this.toggleMenu("columns", "", e)}
      >settings</zeta-icon-button
    >`;
    }
    /** 1 when the checkbox column leads the columns. */
    get lead() {
        return this.selectable ? 1 : 0;
    }
    isDisabled(row) {
        return !!row.disabled || this.disabledRows.includes(row.key);
    }
    /** Whether a row takes selection, clicks and its actions: enabled, or disabled with allowDisabledSelection. */
    isActionable(row) {
        return !this.isDisabled(row) || this.allowDisabledSelection;
    }
    isSelected(row) {
        return this.selectedRows.includes(row.key);
    }
    setSelection(changed, selected) {
        if (!changed.length)
            return;
        const keys = new Set(this.selectedRows);
        changed.forEach(r => (selected ? keys.add(r.key) : keys.delete(r.key)));
        this.selectionSet = true;
        this.selectedRows = Array.from(keys);
        this.emit("selection-change", { selectedRows: this.selectedRows, rows: changed, selected });
    }
    toggleRow(row) {
        if (this.isActionable(row))
            this.setSelection([row], !this.isSelected(row));
    }
    onRowClick(row) {
        if (this.isActionable(row))
            this.emit("row-click", { row });
    }
    /** Sticky geometry for column i, or null when it isn't frozen. */
    frozenFor(i) {
        if (i >= this.frozenColumns)
            return null;
        return {
            classes: { frozen: true, "frozen-last": i === Math.min(this.frozenColumns, this.shown.length) - 1 },
            left: `${this.frozenOffsets[i + this.lead] ?? 0}px`
        };
    }
    /** The checkbox column's cell attributes: frozen at the start when any column is. */
    selectCell() {
        return { classes: { select: true, frozen: this.frozenColumns > 0 }, style: this.frozenColumns > 0 ? styleMap({ insetInlineStart: "0px" }) : nothing };
    }
    /* A polite live region always in the bar, so a count appearing or changing is announced; the Label shows only while
       something is selected. */
    renderSelectedCount() {
        if (!this.selectable)
            return nothing;
        const count = this.selectedRows.length;
        return html `<div class="selected-count" role="status">
      ${count ? html `<zeta-label status="info" .rounded=${this.rounded}>${this.selectedCountFormat.replace("{count}", String(count))}</zeta-label>` : nothing}
    </div>`;
    }
    renderSelectAll() {
        if (!this.selectable)
            return nothing;
        const enabled = this.view.filter(r => this.isActionable(r));
        const count = enabled.filter(r => this.isSelected(r)).length;
        const cell = this.selectCell();
        return html `<th scope="col" class=${classMap(cell.classes)} style=${cell.style}>
      <zeta-checkbox
        .checked=${enabled.length > 0 && count === enabled.length}
        .indeterminate=${count > 0 && count < enabled.length}
        .disabled=${enabled.length === 0}
        .rounded=${this.rounded}
        @change=${this.toggleAll}
        ><span class="sr">${this.selectAllLabel}</span></zeta-checkbox
      >
    </th>`;
    }
    renderSelectCell(row) {
        if (!this.selectable)
            return nothing;
        const name = this.rowName(row);
        const cell = this.selectCell();
        // The checkbox handles its own click, so the row doesn't also fire row-click.
        return html `<td class=${classMap(cell.classes)} style=${cell.style} @click=${(e) => e.stopPropagation()}>
      <zeta-checkbox .checked=${this.isSelected(row)} .disabled=${!this.isActionable(row)} .rounded=${this.rounded} @change=${() => this.toggleRow(row)}
        ><span class="sr">${`${this.selectRowLabel}: ${name}`}</span></zeta-checkbox
      >
    </td>`;
    }
    /** A row's name for its controls: its first cell's text, or its key. */
    rowName(row) {
        const first = row.cells[this.shown[0]?.key];
        return typeof first === "string" ? first : (first?.title ?? row.key);
    }
    /** A row's own actions win over rowActions; null hides the menu on that row. */
    actionsFor(row) {
        if (row.actions === null)
            return [];
        return row.actions?.length ? row.actions : this.rowActions;
    }
    get hasActions() {
        return this.rowActions.length > 0 || this.rows.some(r => !!r.actions?.length);
    }
    menuItems() {
        return Array.from(this.menu?.querySelectorAll("zeta-dropdown-menu-item:not([disabled])") ?? []);
    }
    /** Menu rows are focusable inside their own shadow root. */
    focusItem(item) {
        item?.shadowRoot?.querySelector(".droppable-item")?.focus();
    }
    isOpen(kind, key) {
        return this.menuFor?.kind === kind && this.menuFor.key === key;
    }
    async toggleMenu(kind, key, e) {
        const trigger = e.currentTarget;
        if (this.isOpen(kind, key))
            return this.closeMenu();
        this.closeMenu(false);
        this.menuTrigger = trigger;
        this.menuFor = { kind, key };
        await this.updateComplete;
        const menu = this.menu;
        menu.anchor = trigger;
        if (!menu.matches(":popover-open"))
            menu.showPopover();
        // Measured again now the panel is in the top layer and has a size.
        menu.requestUpdate();
        await menu.updateComplete;
        document.addEventListener("click", this.onOutsideClick, true);
        this.focusItem(this.menuItems()[0]);
    }
    closeMenu(refocus = true) {
        if (!this.menuFor)
            return;
        document.removeEventListener("click", this.onOutsideClick, true);
        if (this.menu?.matches(":popover-open"))
            this.menu.hidePopover();
        this.menuFor = null;
        if (refocus)
            this.menuTrigger?.focus();
        this.menuTrigger = null;
    }
    runAction(action, row) {
        if (action.disabled)
            return;
        this.closeMenu();
        const rowIndex = this.rows.indexOf(row);
        this.onRowAction?.(action.key, row, rowIndex);
        this.emit("row-action", { action: action.key, row, rowIndex });
    }
    renderActionsHeader() {
        return this.hasActions ? html `<th scope="col" class="actions"><span class="sr">${this.actionsLabel}</span></th>` : nothing;
    }
    renderActionsCell(row) {
        if (!this.hasActions)
            return nothing;
        const actions = this.actionsFor(row);
        // The button handles its own click, so the row doesn't also fire row-click.
        return html `<td class="actions" @click=${(e) => e.stopPropagation()}>
      ${actions.length
            ? html `<zeta-icon-button
              size="small"
              flavor="subtle"
              shape=${this.rounded ? "rounded" : "sharp"}
              aria-label=${`${this.actionsLabel}: ${this.rowName(row)}`}
              .ariaExpanded=${this.isOpen("row", row.key) ? "true" : "false"}
              .disabled=${!this.isActionable(row)}
              @click=${(e) => this.toggleMenu("row", row.key, e)}
              >more_vertical</zeta-icon-button
            >`
            : nothing}
    </td>`;
    }
    /** A column's filter options: its filterOptions, or its distinct cell values in order. */
    filterOptionsFor(col) {
        if (col.filterOptions)
            return col.filterOptions;
        const values = new Set(this.rows.map(r => cellText(r.cells[col.key])).filter(Boolean));
        return Array.from(values).sort((a, b) => collator.compare(a, b));
    }
    setFilter(key, values) {
        const filters = { ...this.filters };
        if (values.length)
            filters[key] = values;
        else
            delete filters[key];
        this.filters = filters;
        this.restart();
        this.emit("filter-change", { filters, key });
    }
    toggleFilter(key, value, on) {
        const current = this.filters[key] ?? [];
        this.setFilter(key, on ? [...current.filter(v => v !== value), value] : current.filter(v => v !== value));
    }
    onFilterClick(col, e) {
        this.emit("filter", { key: col.key });
        if (this.clientSide)
            void this.toggleMenu("filter", col.key, e);
    }
    renderMenuItems() {
        const open = this.menuFor;
        if (open?.kind === "columns")
            return this.renderColumnSettings();
        if (open?.kind === "row") {
            const row = this.rows.find(r => r.key === open.key);
            return (row ? this.actionsFor(row) : []).map(a => html `<zeta-dropdown-menu-item .disabled=${!!a.disabled} @click=${() => row && this.runAction(a, row)}>
            ${a.icon ? html `<zeta-icon slot="icon" .rounded=${this.rounded}>${a.icon}</zeta-icon>` : nothing}${a.label}
          </zeta-dropdown-menu-item>`);
        }
        const col = open?.kind === "filter" ? this.columns.find(c => c.key === open.key) : undefined;
        if (!col)
            return nothing;
        const chosen = this.filters[col.key] ?? [];
        return html `${this.filterOptionsFor(col).map(value => html `<zeta-dropdown-menu-item
          type="checkbox"
          .selected=${chosen.includes(value)}
          @change=${(e) => this.toggleFilter(col.key, value, e.currentTarget.selected)}
          >${value}</zeta-dropdown-menu-item
        >`)}${chosen.length
            ? html `<zeta-dropdown-menu-item
            @click=${() => {
                this.setFilter(col.key, []);
                this.closeMenu();
            }}
            ><zeta-icon slot="icon" .rounded=${this.rounded}>close</zeta-icon>${this.clearFilterLabel}</zeta-dropdown-menu-item
          >`
            : nothing}`;
    }
    /* Checkbox and radio rows are menu items, so their panel is a menu. The row actions' rows are plain, and stay so. */
    get menuRole() {
        return this.menuFor && this.menuFor.kind !== "row" ? "menu" : undefined;
    }
    get menuName() {
        const open = this.menuFor;
        if (open?.kind === "columns")
            return this.columnsLabel;
        if (open?.kind === "filter")
            return `Filter ${this.columns.find(c => c.key === open.key)?.header ?? ""}`;
        return undefined;
    }
    renderMenu() {
        return html `<zeta-droppable
      .popover=${"manual"}
      compact
      alignment=${this.menuFor?.kind === "filter" ? "start" : "end"}
      class=${classMap({ menu: true, settings: this.menuFor?.kind === "columns" })}
      role=${ifDefined(this.menuRole)}
      aria-label=${ifDefined(this.menuName)}
      .direction=${undefined}
      .rounded=${this.rounded}
      .open=${!!this.menuFor}
      @keydown=${this.onMenuKeydown}
    >
      ${this.renderMenuItems()}
    </zeta-droppable>`;
    }
    isResizable(col) {
        return this.resizable && col.resizable !== false;
    }
    /** A column's width: the one it was resized to, or its declared width. */
    widthOf(col) {
        const resized = this.widths[col.key];
        return resized !== undefined ? `${resized}px` : toLength(col.width);
    }
    /* Locks every column, the checkbox and actions columns included, to the width it renders at, so the table keeps its
       width and a resize only moves width between columns. */
    lockWidths() {
        if (this.sized)
            return;
        const widths = { ...this.widths };
        for (const th of this.renderRoot.querySelectorAll("thead th")) {
            const w = th.getBoundingClientRect().width;
            if (th.classList.contains("select"))
                this.edgeWidths.select = w;
            else if (th.classList.contains("actions"))
                this.edgeWidths.actions = w;
            else if (th.dataset.key) {
                this.lockedWidths[th.dataset.key] = w;
                if (widths[th.dataset.key] === undefined)
                    widths[th.dataset.key] = w;
            }
        }
        this.widths = widths;
        this.sized = true;
    }
    /** The locked table's width: every column's width added up, so fixed layout lands each one exactly. */
    lockedTotal() {
        const parts = this.shown.map(c => this.widthOf(c) ?? "0px");
        if (this.selectable && this.edgeWidths.select)
            parts.push(`${this.edgeWidths.select}px`);
        if (this.hasActions && this.edgeWidths.actions)
            parts.push(`${this.edgeWidths.actions}px`);
        return `calc(${parts.join(" + ")})`;
    }
    /** The resizable columns a column trades width with: those after it, nearest first, or before it for the last. */
    neighbours(col) {
        const shown = this.shown;
        const i = shown.indexOf(col);
        const after = shown.slice(i + 1).filter(c => this.isResizable(c));
        return after.length
            ? after
            : shown
                .slice(0, i)
                .reverse()
                .filter(c => this.isResizable(c));
    }
    /** The width a column returns to: its declared px width, or the width it had when the widths were locked. */
    declaredWidth(col) {
        const w = col.width;
        if (typeof w === "number")
            return w;
        if (typeof w === "string" && /^\d+(\.\d+)?px$/.test(w))
            return parseFloat(w);
        return this.lockedWidths[col.key];
    }
    /* Sets a column's width without changing the table's: growing takes width from its neighbours, nearest first and
       none below minColumnWidth, and shrinking gives it to the nearest. A drag works from the widths it started with, so
       dragging back returns every column exactly. */
    setWidth(col, width, base) {
        this.lockWidths();
        const from = base ?? this.widths;
        const widths = { ...from };
        const current = from[col.key];
        const others = this.neighbours(col);
        const target = Math.max(this.minColumnWidth, Math.round(width ?? this.declaredWidth(col)));
        let delta = target - current;
        if (delta > 0) {
            let owed = delta;
            for (const o of others) {
                const take = Math.min(owed, Math.max(0, widths[o.key] - this.minColumnWidth));
                widths[o.key] -= take;
                owed -= take;
                if (!owed)
                    break;
            }
            delta -= owed;
        }
        else if (delta < 0 && others.length)
            widths[others[0].key] -= delta;
        else
            delta = 0;
        widths[col.key] = current + delta;
        if (this.shown.every(c => widths[c.key] === this.widths[c.key]))
            return;
        this.widths = widths;
        this.emit("column-resize", { key: col.key, width: widths[col.key], widths });
    }
    /** The header cell's rendered width, the separator's value. */
    measured(handle) {
        return handle.closest("th").getBoundingClientRect().width;
    }
    startResize(col, e) {
        if (e.button !== 0)
            return;
        e.preventDefault();
        const handle = e.currentTarget;
        const startX = e.clientX;
        this.lockWidths();
        const base = { ...this.widths };
        const start = base[col.key];
        // In right-to-left the trailing edge is on the left, so dragging left widens the column.
        const dir = getComputedStyle(this).direction === "rtl" ? -1 : 1;
        // Keeps the drag on the grip when the pointer outruns it; a synthetic pointer has nothing to capture.
        try {
            handle.setPointerCapture(e.pointerId);
        }
        catch {
            /* no active pointer */
        }
        this.resizing = col.key;
        const move = (ev) => this.setWidth(col, start + dir * (ev.clientX - startX), base);
        const end = () => {
            handle.removeEventListener("pointermove", move);
            handle.removeEventListener("pointerup", end);
            handle.removeEventListener("pointercancel", end);
            this.resizing = null;
        };
        handle.addEventListener("pointermove", move);
        handle.addEventListener("pointerup", end);
        handle.addEventListener("pointercancel", end);
    }
    onResizeKey(col, e) {
        const step = e.shiftKey ? 64 : 16;
        const grow = getComputedStyle(this).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
        const shrink = grow === "ArrowRight" ? "ArrowLeft" : "ArrowRight";
        // From the stored width, so presses quicker than a render still add up.
        this.lockWidths();
        const now = this.widths[col.key];
        if (e.key === grow)
            this.setWidth(col, now + step);
        else if (e.key === shrink)
            this.setWidth(col, now - step);
        else if (e.key === "Home")
            this.setWidth(col, this.minColumnWidth);
        else if (e.key === "Escape" || e.key === "Delete")
            this.setWidth(col, null);
        else
            return;
        e.preventDefault();
    }
    renderResizer(col) {
        // A column with nothing to trade width with can't be resized without changing the table's width.
        if (!this.isResizable(col) || !this.neighbours(col).length)
            return nothing;
        return html `<div
      class="resizer"
      role="separator"
      aria-orientation="vertical"
      aria-label=${`Resize ${col.header}`}
      aria-valuemin=${this.minColumnWidth}
      tabindex="0"
      @pointerdown=${(e) => this.startResize(col, e)}
      @dblclick=${() => this.setWidth(col, null)}
      @keydown=${(e) => this.onResizeKey(col, e)}
      @click=${(e) => e.stopPropagation()}
    ></div>`;
    }
    renderColgroup() {
        // prettier-ignore
        return html `<colgroup>${this.selectable ? html `<col class="select-col">` : nothing}${this.shown.map(c => html `<col style=${this.widthOf(c) ? styleMap({ width: this.widthOf(c) }) : nothing}>`)}${this.hasActions ? html `<col class="actions-col">` : nothing}</colgroup>`;
    }
    renderHeader(col, i) {
        const frozen = this.frozenFor(i);
        const w = this.widthOf(col);
        // Pinning the header cell keeps the column at its width, so the frozen offsets stay exact.
        const thStyle = { ...(w ? { width: w, minWidth: w } : {}), ...(frozen ? { insetInlineStart: frozen.left } : {}) };
        const dir = this.sort?.key === col.key ? this.sort.direction : null;
        const glyph = dir === "ascending" ? "caret_up" : dir === "descending" ? "caret_down" : "caret_sort";
        const label = html `<span class="label">${col.header}</span>`;
        return html `<th
      scope="col"
      data-key=${col.key}
      class=${classMap({ ...frozen?.classes, resizable: this.isResizable(col), resizing: this.resizing === col.key })}
      style=${styleMap(thStyle)}
      aria-sort=${ifDefined(col.sortable ? (dir ?? "none") : undefined)}
    >
      <div class="head">
        ${col.sortable
            ? html `<button class="sort" type="button" @click=${() => this.cycleSort(col)}>
                ${label}<zeta-icon class="sort-glyph" aria-hidden="true" .rounded=${this.rounded}>${glyph}</zeta-icon>
              </button>`
            : label}
        ${col.filterable
            ? html `<button
                class=${classMap({ filter: true, active: !!this.filters[col.key]?.length })}
                type="button"
                aria-label=${`Filter ${col.header}`}
                aria-expanded=${ifDefined(this.clientSide ? (this.isOpen("filter", col.key) ? "true" : "false") : undefined)}
                @click=${(e) => this.onFilterClick(col, e)}
              >
                <zeta-icon aria-hidden="true" .rounded=${this.rounded}>filter</zeta-icon>
              </button>`
            : nothing}
      </div>
      ${this.renderResizer(col)}
    </th>`;
    }
    renderValue(value) {
        if (value === undefined || value === null)
            return "";
        if (typeof value === "string")
            return html `<span class="text">${value}</span>`;
        const a = value.avatar;
        return html `<div class="avatar-text">
      ${a ? html `<zeta-avatar size="xxxs" aria-label=${value.title}>${a.src ? html `<img src=${a.src} alt="" />` : (a.initials ?? "")}</zeta-avatar>` : nothing}
      <div class="titles">
        <span class="title">${value.title}</span>
        ${value.subtitle ? html `<span class="subtitle">${value.subtitle}</span>` : nothing}
      </div>
    </div>`;
    }
    renderRow(row) {
        const selected = this.selectable ? this.isSelected(row) : !!row.selected;
        return html `<tr
      aria-selected=${ifDefined(selected ? "true" : undefined)}
      aria-disabled=${ifDefined(this.isDisabled(row) ? "true" : undefined)}
      @click=${() => this.onRowClick(row)}
    >
      ${this.renderSelectCell(row)}
      ${this.shown.map((col, i) => {
            const frozen = this.frozenFor(i);
            return html `<td data-key=${col.key} class=${classMap(frozen?.classes ?? {})} style=${frozen ? styleMap({ insetInlineStart: frozen.left }) : nothing}>
          <slot name=${`cell-${row.key}-${col.key}`}>${this.renderValue(row.cells[col.key])}</slot>
        </td>`;
        })}
      ${this.renderActionsCell(row)}
    </tr>`;
    }
    render() {
        return html `
      ${this.hasControl
            ? html `<div part="controls" class="controls">
              ${this.renderSelectedCount()}
              ${this.showSearch
                ? html `<zeta-search
                      size="small"
                      shape=${this.rounded ? "rounded" : "sharp"}
                      .value=${this.searchValue}
                      placeholder=${this.searchPlaceholder}
                      aria-label=${this.searchPlaceholder}
                      @input=${this.onSearchInput}
                    ></zeta-search>`
                : nothing}
              <div class="controls-slot"><slot name="controls"></slot>${this.renderSettingsButton()}</div>
            </div>`
            : nothing}
      <div
        part="scroller"
        class="scroller"
        ?data-scrolled=${this.scrolled}
        ?data-capped=${this.maxHeight !== null && this.maxHeight !== ""}
        style=${this.maxHeight !== null && this.maxHeight !== "" ? styleMap({ maxHeight: toLength(this.maxHeight) }) : nothing}
        @scroll=${this.onScroll}
      >
        <table
          part="table"
          @pointerover=${this.onPointerOver}
          @pointerleave=${this.hideTip}
          ?data-sized=${this.sized}
          style=${this.sized
            ? styleMap({
                width: this.lockedTotal(),
                "--_select-width": this.edgeWidths.select ? `${this.edgeWidths.select}px` : undefined,
                "--_actions-width": this.edgeWidths.actions ? `${this.edgeWidths.actions}px` : undefined
            })
            : nothing}
        >
          ${this.caption
            ? html `<caption>
                  ${this.caption}
                </caption>`
            : nothing}
          ${this.renderColgroup()}
          <thead>
            <tr>
              ${this.renderSelectAll()} ${this.shown.map((c, i) => this.renderHeader(c, i))} ${this.renderActionsHeader()}
            </tr>
          </thead>
          <tbody>
            ${this.view.length
            ? this.view.map(r => this.renderRow(r))
            : html `<tr class="empty">
                    <td colspan=${this.shown.length + this.lead + (this.hasActions ? 1 : 0)}>${this.emptyLabel}</td>
                  </tr>`}
          </tbody>
        </table>
      </div>
      ${this.hasFooter
            ? html `<div part="footer" class="footer">
              <div class="footer-start">
                ${this.summary ? html `<p class="page-details" aria-live="polite">${this.summary}</p>` : nothing} ${this.renderPageSize()}
              </div>
              <div class="pagination-slot">
                <slot name="pagination"
                  >${this.pages > 1
                ? html `<zeta-pagination
                          outline
                          show-controls
                          .showMore=${false}
                          .rounded=${this.rounded}
                          .totalPages=${this.pages}
                          .currentPage=${this.page}
                          @pageChange=${this.onPageChange}
                        ></zeta-pagination>`
                : nothing}</slot
                >
              </div>
            </div>`
            : nothing}
      ${this.renderMenu()} ${this.renderTip()}
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "columns", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "rows", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "has-control" })
], ZetaTable.prototype, "hasControl", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "has-footer" })
], ZetaTable.prototype, "hasFooter", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-search" })
], ZetaTable.prototype, "showSearch", void 0);
__decorate([
    property({ type: String, attribute: "search-value" })
], ZetaTable.prototype, "searchValue", void 0);
__decorate([
    property({ type: String, attribute: "search-placeholder" })
], ZetaTable.prototype, "searchPlaceholder", void 0);
__decorate([
    property({ type: String, attribute: "page-details" })
], ZetaTable.prototype, "pageDetails", void 0);
__decorate([
    property({ type: Number })
], ZetaTable.prototype, "page", void 0);
__decorate([
    property({ type: Number, attribute: "page-count" })
], ZetaTable.prototype, "pageCount", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "sort", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "client-side" })
], ZetaTable.prototype, "clientSide", void 0);
__decorate([
    property({ type: Number, attribute: "page-size" })
], ZetaTable.prototype, "pageSize", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "pageSizeOptions", void 0);
__decorate([
    property({ type: String, attribute: "page-size-label" })
], ZetaTable.prototype, "pageSizeLabel", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "filters", void 0);
__decorate([
    property({ type: String, attribute: "page-details-format" })
], ZetaTable.prototype, "pageDetailsFormat", void 0);
__decorate([
    property({ type: String, attribute: "empty-label" })
], ZetaTable.prototype, "emptyLabel", void 0);
__decorate([
    property({ type: String, attribute: "clear-filter-label" })
], ZetaTable.prototype, "clearFilterLabel", void 0);
__decorate([
    property({ attribute: "max-height", converter: lengthOrPx })
], ZetaTable.prototype, "maxHeight", void 0);
__decorate([
    property({ type: Number, attribute: "frozen-columns" })
], ZetaTable.prototype, "frozenColumns", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "column-configure" })
], ZetaTable.prototype, "columnConfigure", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "hiddenColumns", void 0);
__decorate([
    property({ type: String, attribute: "columns-label" })
], ZetaTable.prototype, "columnsLabel", void 0);
__decorate([
    property({ type: String, attribute: "show-columns-label" })
], ZetaTable.prototype, "showColumnsLabel", void 0);
__decorate([
    property({ type: String, attribute: "freeze-columns-label" })
], ZetaTable.prototype, "freezeColumnsLabel", void 0);
__decorate([
    property({ type: String, attribute: "no-frozen-label" })
], ZetaTable.prototype, "noFrozenLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTable.prototype, "resizable", void 0);
__decorate([
    property({ type: Number, attribute: "min-column-width" })
], ZetaTable.prototype, "minColumnWidth", void 0);
__decorate([
    property({ type: Number, attribute: "tooltip-delay" })
], ZetaTable.prototype, "tooltipDelay", void 0);
__decorate([
    property({ type: Array, attribute: "disabled-rows" })
], ZetaTable.prototype, "disabledRows", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "allow-disabled-selection" })
], ZetaTable.prototype, "allowDisabledSelection", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTable.prototype, "selectable", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "selectedRows", void 0);
__decorate([
    property({ type: String, attribute: "selected-count-format" })
], ZetaTable.prototype, "selectedCountFormat", void 0);
__decorate([
    property({ type: String, attribute: "select-all-label" })
], ZetaTable.prototype, "selectAllLabel", void 0);
__decorate([
    property({ type: String, attribute: "select-row-label" })
], ZetaTable.prototype, "selectRowLabel", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "rowActions", void 0);
__decorate([
    property({ attribute: false })
], ZetaTable.prototype, "onRowAction", void 0);
__decorate([
    property({ type: String, attribute: "actions-label" })
], ZetaTable.prototype, "actionsLabel", void 0);
__decorate([
    property({ type: String })
], ZetaTable.prototype, "caption", void 0);
__decorate([
    state()
], ZetaTable.prototype, "scrolled", void 0);
__decorate([
    state()
], ZetaTable.prototype, "widths", void 0);
__decorate([
    state()
], ZetaTable.prototype, "resizing", void 0);
__decorate([
    state()
], ZetaTable.prototype, "sized", void 0);
__decorate([
    state()
], ZetaTable.prototype, "frozenOffsets", void 0);
__decorate([
    state()
], ZetaTable.prototype, "menuFor", void 0);
__decorate([
    query(".menu")
], ZetaTable.prototype, "menu", void 0);
__decorate([
    query(".cell-tip")
], ZetaTable.prototype, "tip", void 0);
__decorate([
    state()
], ZetaTable.prototype, "tipText", void 0);
ZetaTable = ZetaTable_1 = __decorate([
    customElement("zeta-table")
], ZetaTable);
export { ZetaTable };
//# sourceMappingURL=table.js.map