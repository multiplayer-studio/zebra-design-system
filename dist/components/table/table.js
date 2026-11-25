var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./table.styles.js";
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
const toLength = (w) => (typeof w === "number" ? `${w}px` : w ?? undefined);
/** A cell's text: the value itself, or an avatar cell's title. */
const cellText = (v) => (v === undefined || v === null ? "" : typeof v === "string" ? v : v.title);
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
/** Text that can be cut off with an ellipsis: a cell's text, an avatar cell's title or subtitle, a header label. */
const TRUNCATING = ".text, .title, .subtitle, .label";
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
let ZdsTable = class ZdsTable extends LitElement {
    constructor() {
        super(...arguments);
        /** The columns, in order. */
        this.columns = [];
        /** The rows, in order. */
        this.rows = [];
        /** Shows the controls bar above the content. */
        this.hasControl = true;
        /** Shows the footer below the content. */
        this.hasFooter = true;
        /** Shows the search field in the controls bar (Table Controls' `search`). */
        this.showSearch = true;
        /** The search query. */
        this.searchValue = "";
        /** Placeholder, and accessible name, of the search field. */
        this.searchPlaceholder = "Search";
        /** Footer summary, e.g. "Showing 1-3 of 21". Empty hides it (client-side, it is worked out instead). */
        this.pageDetails = "";
        /** Client-side: the summary when `pageDetails` is empty. `{from}`, `{to}` and `{total}` are filled in. */
        this.pageDetailsFormat = "Showing {from}-{to} of {total}";
        /** The footer pagination's current page, 1-based. */
        this.page = 1;
        /** The footer pagination's page count. Client-side paging works it out. */
        this.pageCount = 1;
        /** The current sort, or null. The table reorders rows by it only when `clientSide`. */
        this.sort = null;
        /** The table sorts, searches, filters and pages `rows` itself. */
        this.clientSide = false;
        /** Rows per page. Client-side, 0 shows every row on one page. */
        this.pageSize = 0;
        /** The sizes the footer's rows-per-page select offers (Table Footer `rowsPerPage`). Empty hides it. */
        this.pageSizeOptions = [];
        /** The rows-per-page label, and the select's accessible name. */
        this.pageSizeLabel = "Rows per page";
        /** Client-side: the chosen filter values per column key. */
        this.filters = {};
        /** The filter menu's option that clears the column's filter. */
        this.clearFilterLabel = "Clear filter";
        /** The text of the row shown when there are no rows. */
        this.emptyLabel = "No results";
        /** Pins the first N columns while the rest scroll horizontally. */
        this.frozenColumns = 0;
        /**
         * Caps the content's height (a CSS length, or px) so rows scroll under a
         * sticky header (Table Content `verticalScroll`). Unset, the table grows.
         */
        this.maxHeight = null;
        /** Adds the selection column, with select-all in its header. */
        this.selectable = false;
        /** The selected row keys. Until set, it follows each row's `selected`. */
        this.selectedRows = [];
        /** The selected count in the controls bar. `{count}` is filled in. */
        this.selectedCountFormat = "{count} selected";
        /** Accessible name of the select-all checkbox. */
        this.selectAllLabel = "Select all rows";
        /** Accessible name of each row's checkbox, followed by the row's first cell. */
        this.selectRowLabel = "Select row";
        /** Disables these rows, by key, as a row's own `disabled` does. */
        this.disabledRows = [];
        /** Lets disabled rows be selected, clicked and opened for actions; they still look disabled. */
        this.allowDisabledSelection = false;
        /** Actions offered in every row's menu. Any row with actions adds the actions column. */
        this.rowActions = [];
        /** Called when an action is chosen, with its key, the row and the row's index in `rows`. */
        this.onRowAction = null;
        /** Accessible name of the actions column and of each row's more button. */
        this.actionsLabel = "Actions";
        /** Adds the column settings button to the controls bar (Table Controls `columnSettings`). */
        this.columnConfigure = false;
        /** The keys of the columns not showing. */
        this.hiddenColumns = [];
        /** The settings button's accessible name and the panel's. */
        this.columnsLabel = "Columns";
        /** The panel's heading over the show and hide checkboxes. */
        this.showColumnsLabel = "Show columns";
        /** The panel's heading over the freeze choices. */
        this.freezeColumnsLabel = "Freeze up to";
        /** The panel's choice that freezes nothing. */
        this.noFrozenLabel = "None";
        /** Lets people resize columns from each header's trailing edge. */
        this.resizable = false;
        /** The narrowest a resized column gets, in px. */
        this.minColumnWidth = 80;
        /** How long, in ms, cut-off text is hovered before its tooltip shows. */
        this.tooltipDelay = 500;
        /** Accessible name of the table, rendered as a visually hidden caption. */
        this.caption = null;
        /**
         * `rounded` rounds the table's outer corners (radius/element-md, clipping
         * its content) and its own Search, Pagination, checkboxes, buttons, Select
         * and menus; `sharp` keeps them square. The table can't reach slotted
         * content, so it reflects `shape` for slotted controls to read.
         */
        this.shape = "rounded";
        this.scrolled = false;
        this.frozenOffsets = [];
        this.menuFor = null;
        this.widths = {};
        this.resizing = null;
        this.sized = false;
        this.tipText = "";
        this.tipAnchor = null;
        this.view = [];
        this.total = 0;
        this.selectionSet = false;
        this.menuTrigger = null;
        this.edgeWidths = {};
        this.lockedWidths = {};
        this.tipTimer = null;
        this.rowClickListeners = 0;
        this.frozenObserver = null;
        this.onOutsideClick = (e) => {
            const path = e.composedPath();
            if (!path.includes(this.menuEl) && !(this.menuTrigger && path.includes(this.menuTrigger)))
                this.closeMenu(false);
        };
    }
    // A WC has no onRowClick prop, so count listeners on the element itself to
    // know whether rows are clickable (contract: cursor pointer only then).
    addEventListener(type, listener, options) {
        super.addEventListener(type, listener, options);
        if (type === "zds-row-click" && listener)
            this.setRowClickListeners(this.rowClickListeners + 1);
    }
    removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (type === "zds-row-click" && listener)
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
            const seeded = this.rows.filter((r) => r.selected).map((r) => r.key);
            if (seeded.join() !== this.selectedRows.join())
                this.selectedRows = seeded;
        }
        this.computeView();
    }
    updated(changed) {
        // A separator's value is its column's rendered width, read once laid out.
        for (const grip of this.renderRoot.querySelectorAll(".resizer")) {
            grip.setAttribute("aria-valuenow", String(Math.round(grip.closest("th").getBoundingClientRect().width)));
        }
        if (changed.has("frozenColumns") || changed.has("columns") || changed.has("hiddenColumns") || changed.has("selectable"))
            this.observeFrozen();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.closeMenu(false);
        this.hideTip();
        this.frozenObserver?.disconnect();
        this.frozenObserver = null;
    }
    // ---- data ------------------------------------------------------------
    /** The columns showing, in order. */
    get shown() {
        return this.columns.filter((c) => !this.hiddenColumns.includes(c.key));
    }
    /** Client-side, the rows shown are searched, filtered, sorted and paged; otherwise `rows` as given. */
    computeView() {
        if (!this.clientSide) {
            this.view = this.rows;
            this.total = this.rows.length;
            return;
        }
        const query = this.searchValue.trim().toLowerCase();
        const active = Object.entries(this.filters).filter(([, values]) => values.length);
        let out = this.rows.filter((row) => {
            if (active.some(([key, values]) => !values.includes(cellText(row.cells[key]))))
                return false;
            if (!query)
                return true;
            return this.shown.some((c) => {
                const v = row.cells[c.key];
                const text = typeof v === "object" && v ? `${v.title} ${v.subtitle ?? ""}` : cellText(v);
                return text.toLowerCase().includes(query);
            });
        });
        const sort = this.sort;
        const col = sort && this.columns.find((c) => c.key === sort.key);
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
    emit(name, detail) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    }
    // ---- rows ------------------------------------------------------------
    isDisabled(row) {
        return !!row.disabled || this.disabledRows.includes(row.key);
    }
    /** Enabled, or disabled with allowDisabledSelection: takes selection, clicks and its actions. */
    isActionable(row) {
        return !this.isDisabled(row) || this.allowDisabledSelection;
    }
    isSelected(row) {
        return this.selectedRows.includes(row.key);
    }
    /** A row's name for its controls: its first cell's text, or its key. */
    rowName(row) {
        return cellText(row.cells[this.shown[0]?.key]) || row.key;
    }
    setSelection(changed, selected) {
        if (!changed.length)
            return;
        const keys = new Set(this.selectedRows);
        changed.forEach((r) => (selected ? keys.add(r.key) : keys.delete(r.key)));
        this.selectionSet = true;
        this.selectedRows = Array.from(keys);
        this.emit("zds-selection-change", { selectedRows: this.selectedRows, rows: changed, selected });
    }
    toggleAll() {
        const enabled = this.view.filter((r) => this.isActionable(r));
        const all = enabled.length > 0 && enabled.every((r) => this.isSelected(r));
        this.setSelection(all ? enabled : enabled.filter((r) => !this.isSelected(r)), !all);
    }
    onRowClick(row) {
        if (this.isActionable(row))
            this.emit("zds-row-click", { row });
    }
    actionsFor(row) {
        if (row.actions === null)
            return [];
        return row.actions?.length ? row.actions : this.rowActions;
    }
    get hasActions() {
        return this.rowActions.length > 0 || this.rows.some((r) => !!r.actions?.length);
    }
    /** 1 when the selection column leads the columns. */
    get lead() {
        return this.selectable ? 1 : 0;
    }
    // ---- frozen columns ----------------------------------------------------
    /**
     * Sticky offsets are measured, not derived from the declared widths:
     * content and padding can make a column wider than declared, and an offset
     * computed from the declaration would stick the next frozen column in the
     * wrong place. The selection column freezes with them, ahead of them.
     */
    observeFrozen() {
        this.frozenObserver?.disconnect();
        this.frozenObserver = null;
        const n = Math.min(this.frozenColumns, this.shown.length);
        if (n <= 0) {
            if (this.frozenOffsets.length)
                this.frozenOffsets = [];
            return;
        }
        const cells = Array.from(this.renderRoot.querySelectorAll("thead th")).slice(0, n + this.lead);
        this.frozenObserver = new ResizeObserver(() => this.measureFrozen(cells));
        cells.forEach((c) => this.frozenObserver.observe(c));
        this.measureFrozen(cells);
    }
    measureFrozen(cells) {
        let sum = 0;
        const offsets = cells.map((c) => {
            const at = sum;
            sum += c.getBoundingClientRect().width;
            return at;
        });
        const same = offsets.length === this.frozenOffsets.length && offsets.every((o, i) => o === this.frozenOffsets[i]);
        if (!same)
            this.frozenOffsets = offsets;
    }
    frozenFor(i) {
        if (i >= this.frozenColumns)
            return null;
        return {
            classes: { frozen: true, "frozen-last": i === Math.min(this.frozenColumns, this.shown.length) - 1 },
            insetInlineStart: `${this.frozenOffsets[i + this.lead] ?? 0}px`,
        };
    }
    edgeCell(kind) {
        const frozen = kind === "select" && this.frozenColumns > 0;
        return { classes: { [kind]: true, frozen }, style: frozen ? styleMap({ insetInlineStart: "0px" }) : nothing };
    }
    // ---- events from the parts ---------------------------------------------
    onScroll(e) {
        this.hideTip();
        if (this.menuFor)
            this.closeMenu(false);
        const scrolled = Math.abs(e.currentTarget.scrollLeft) > 0;
        if (scrolled !== this.scrolled)
            this.scrolled = scrolled;
    }
    onSearchInput(e) {
        const value = e.currentTarget.value ?? "";
        if (value === this.searchValue)
            return;
        this.searchValue = value;
        this.restart();
        this.emit("zds-search-change", { value });
    }
    cycleSort(col) {
        const current = this.sort?.key === col.key ? this.sort.direction : null;
        const next = current === null ? { key: col.key, direction: "ascending" }
            : current === "ascending" ? { key: col.key, direction: "descending" }
                : null;
        this.sort = next;
        this.restart();
        this.emit("zds-sort-change", { sort: next });
    }
    // Keep `page` in step with the built-in pager; its event bubbles out of the
    // table untouched (it is composed), so no re-dispatch.
    onPageChange(e) {
        this.page = e.detail.page;
    }
    onPageSize(e) {
        const size = Number(e.detail.value);
        if (!size || size === this.pageSize)
            return;
        this.pageSize = size;
        this.page = 1;
        this.emit("zds-page-size-change", { pageSize: size });
    }
    // ---- filters and column settings ---------------------------------------
    filterOptionsFor(col) {
        if (col.filterOptions)
            return col.filterOptions;
        return Array.from(new Set(this.rows.map((r) => cellText(r.cells[col.key])).filter(Boolean))).sort((a, b) => collator.compare(a, b));
    }
    setFilter(key, values) {
        const filters = { ...this.filters };
        if (values.length)
            filters[key] = values;
        else
            delete filters[key];
        this.filters = filters;
        this.restart();
        this.emit("zds-filter-change", { filters, key });
    }
    onFilterClick(col, e) {
        this.emit("zds-filter", { key: col.key });
        if (this.clientSide)
            void this.toggleMenu("filter", col.key, e.currentTarget);
    }
    setColumnShown(col, show) {
        const hidden = this.hiddenColumns.filter((k) => k !== col.key);
        this.hiddenColumns = show ? hidden : [...hidden, col.key];
        // Freezing never reaches past the columns still showing.
        this.frozenColumns = Math.min(this.frozenColumns, this.shown.length);
        this.emit("zds-column-settings-change", { hiddenColumns: this.hiddenColumns, frozenColumns: this.frozenColumns });
    }
    setFrozen(count) {
        if (count === this.frozenColumns)
            return;
        this.frozenColumns = count;
        this.emit("zds-column-settings-change", { hiddenColumns: this.hiddenColumns, frozenColumns: this.frozenColumns });
    }
    // ---- menus ---------------------------------------------------------------
    isOpen(kind, key) {
        return this.menuFor?.kind === kind && this.menuFor.key === key;
    }
    menuItems() {
        return Array.from(this.menuEl?.querySelectorAll("zds-menu-item:not([disabled])") ?? []);
    }
    focusItem(item) {
        item?.shadowRoot?.querySelector(".row")?.focus();
    }
    /** Focuses a part's own focusable element; zds-icon-button doesn't delegate focus. */
    focusTrigger(el) {
        (el?.shadowRoot?.querySelector("button") ?? el)?.focus();
    }
    async toggleMenu(kind, key, trigger) {
        if (this.isOpen(kind, key))
            return this.closeMenu();
        this.closeMenu(false);
        this.menuTrigger = trigger;
        this.menuFor = { kind, key };
        await this.updateComplete;
        const menu = this.menuEl;
        if (!menu.matches(":popover-open"))
            menu.showPopover();
        this.placeMenu(kind === "filter" ? "start" : "end");
        document.addEventListener("click", this.onOutsideClick, true);
        await Promise.all(this.menuItems().map((i) => i.updateComplete));
        this.focusItem(this.menuItems()[0]);
    }
    /** Below the trigger, lined up with its start or end edge; above when there is no room below. */
    placeMenu(align) {
        const menu = this.menuEl;
        const t = this.menuTrigger.getBoundingClientRect();
        const m = menu.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(this).getPropertyValue("--space-2xs")) || 0;
        const rtl = getComputedStyle(this).direction === "rtl";
        const atStart = (align === "start") !== rtl;
        let left = atStart ? t.left : t.right - m.width;
        left = Math.min(Math.max(0, left), window.innerWidth - m.width);
        const below = t.bottom + gap;
        const top = below + m.height > window.innerHeight && t.top - gap - m.height > 0 ? t.top - gap - m.height : below;
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
    }
    closeMenu(refocus = true) {
        if (!this.menuFor)
            return;
        document.removeEventListener("click", this.onOutsideClick, true);
        if (this.menuEl?.matches(":popover-open"))
            this.menuEl.hidePopover();
        this.menuFor = null;
        if (refocus)
            this.focusTrigger(this.menuTrigger);
        this.menuTrigger = null;
    }
    onMenuKeydown(e) {
        const items = this.menuItems();
        const at = items.findIndex((i) => e.composedPath().includes(i));
        if (e.key === "Escape")
            this.closeMenu();
        else if (e.key === "Tab")
            this.closeMenu(false);
        else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            this.focusItem(items[(at + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]);
        }
        else if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            this.focusItem(items[e.key === "Home" ? 0 : items.length - 1]);
        }
    }
    runAction(action, row) {
        if (action.disabled)
            return;
        this.closeMenu();
        const rowIndex = this.rows.indexOf(row);
        this.onRowAction?.(action.key, row, rowIndex);
        this.emit("zds-row-action", { action: action.key, row, rowIndex });
    }
    // ---- resizing --------------------------------------------------------------
    isResizable(col) {
        return this.resizable && col.resizable !== false;
    }
    widthOf(col) {
        const resized = this.widths[col.key];
        return resized !== undefined ? `${resized}px` : toLength(col.width);
    }
    /** Locks every column, edge columns included, at its rendered width, so a resize only moves width between columns. */
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
    /** The locked table's width: every column added up, so fixed layout lands each one exactly. */
    lockedTotal() {
        const parts = this.shown.map((c) => this.widthOf(c) ?? "0px");
        if (this.selectable && this.edgeWidths.select)
            parts.push(`${this.edgeWidths.select}px`);
        if (this.hasActions && this.edgeWidths.actions)
            parts.push(`${this.edgeWidths.actions}px`);
        return `calc(${parts.join(" + ")})`;
    }
    /** The resizable columns a column trades width with: after it, nearest first; before it for the last. */
    neighbours(col) {
        const shown = this.shown;
        const i = shown.indexOf(col);
        const after = shown.slice(i + 1).filter((c) => this.isResizable(c));
        return after.length ? after : shown.slice(0, i).reverse().filter((c) => this.isResizable(c));
    }
    declaredWidth(col) {
        const w = col.width;
        if (typeof w === "number")
            return w;
        if (typeof w === "string" && /^\d+(\.\d+)?px$/.test(w))
            return parseFloat(w);
        return this.lockedWidths[col.key];
    }
    /**
     * Sets a column's width without changing the table's: growing takes width
     * from the neighbours (nearest first, none below minColumnWidth), shrinking
     * gives it to the nearest. A drag works from the widths it started with, so
     * dragging back returns every column exactly.
     */
    setWidth(col, width, base) {
        this.lockWidths();
        const from = base ?? this.widths;
        const widths = { ...from };
        const current = from[col.key];
        const others = this.neighbours(col);
        let delta = Math.max(this.minColumnWidth, Math.round(width ?? this.declaredWidth(col))) - current;
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
        if (this.shown.every((c) => widths[c.key] === this.widths[c.key]))
            return;
        this.widths = widths;
        this.emit("zds-column-resize", { key: col.key, width: widths[col.key], widths });
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
        // In right-to-left the trailing edge is on the left.
        const dir = getComputedStyle(this).direction === "rtl" ? -1 : 1;
        try {
            handle.setPointerCapture(e.pointerId);
        }
        catch {
            /* a synthetic pointer has nothing to capture */
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
    // ---- truncation tooltip ------------------------------------------------------
    onPointerOver(e) {
        const target = e.composedPath().find((n) => n instanceof HTMLElement && n.matches(TRUNCATING));
        if (target === this.tipAnchor && target)
            return;
        this.hideTip();
        if (!target)
            return;
        const col = this.columns.find((c) => c.key === target.closest("td, th")?.dataset.key);
        if (!col || col.tooltip === false || (col.tooltip !== true && col.tooltipOnEllipsisOnly === false))
            return;
        if (col.tooltip !== true && target.scrollWidth <= target.clientWidth)
            return;
        this.tipTimer = setTimeout(() => {
            this.tipText = target.textContent?.trim() ?? "";
            this.tipAnchor = target;
            void this.updateComplete.then(() => this.tipEl && (this.tipEl.open = true));
        }, this.tooltipDelay);
    }
    // The tooltip is rendered only while it has a cell to point at: without a
    // trigger zds-tooltip draws a static bubble in the page.
    hideTip() {
        if (this.tipTimer)
            clearTimeout(this.tipTimer);
        this.tipTimer = null;
        this.tipAnchor = null;
    }
    // ---- render ------------------------------------------------------------
    renderSelectedCount() {
        if (!this.selectable)
            return nothing;
        const count = this.selectedRows.length;
        // The live region is always there, so a count appearing is announced.
        return html `<div class="selected-count" role="status">
      ${count ? html `<zds-badge-label variant="info" shape=${this.shape}>${this.selectedCountFormat.replace("{count}", String(count))}</zds-badge-label>` : nothing}
    </div>`;
    }
    renderSettingsButton() {
        if (!this.columnConfigure)
            return nothing;
        return html `<zds-icon-button
      class="column-settings"
      flavour="outline-subtle"
      size="small"
      shape=${this.shape}
      icon="settings"
      label=${this.columnsLabel}
      .expanded=${this.isOpen("columns", "")}
      @click=${(e) => this.toggleMenu("columns", "", e.currentTarget)}
    ></zds-icon-button>`;
    }
    renderSelectAll() {
        if (!this.selectable)
            return nothing;
        const enabled = this.view.filter((r) => this.isActionable(r));
        const count = enabled.filter((r) => this.isSelected(r)).length;
        const cell = this.edgeCell("select");
        return html `<th scope="col" class=${classMap(cell.classes)} style=${cell.style}>
      <zds-checkbox
        size="medium"
        aria-label=${this.selectAllLabel}
        .checked=${enabled.length > 0 && count === enabled.length}
        .indeterminate=${count > 0 && count < enabled.length}
        .disabled=${enabled.length === 0}
        @change=${this.toggleAll}
      ></zds-checkbox>
    </th>`;
    }
    renderSelectCell(row) {
        if (!this.selectable)
            return nothing;
        const cell = this.edgeCell("select");
        // The checkbox handles its own click, so the row doesn't also fire zds-row-click.
        return html `<td class=${classMap(cell.classes)} style=${cell.style} @click=${(e) => e.stopPropagation()}>
      <zds-checkbox
        size="medium"
        aria-label=${`${this.selectRowLabel}: ${this.rowName(row)}`}
        .checked=${this.isSelected(row)}
        .disabled=${!this.isActionable(row)}
        @change=${() => this.isActionable(row) && this.setSelection([row], !this.isSelected(row))}
      ></zds-checkbox>
    </td>`;
    }
    renderActionsCell(row) {
        if (!this.hasActions)
            return nothing;
        const actions = this.actionsFor(row);
        return html `<td class="actions" @click=${(e) => e.stopPropagation()}>
      ${actions.length
            ? html `<zds-icon-button
            flavour="subtle"
            size="small"
            shape=${this.shape}
            icon="more-vertical"
            label=${`${this.actionsLabel}: ${this.rowName(row)}`}
            .expanded=${this.isOpen("row", row.key)}
            .disabled=${!this.isActionable(row)}
            @click=${(e) => this.toggleMenu("row", row.key, e.currentTarget)}
          ></zds-icon-button>`
            : nothing}
    </td>`;
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
    renderHeader(col, i) {
        const frozen = this.frozenFor(i);
        const w = this.widthOf(col);
        // The <col> width alone is squeezable; pinning the header cell keeps the
        // column at its width so the frozen offsets stay exact.
        const thStyle = { ...(w ? { inlineSize: w, minInlineSize: w } : {}), ...(frozen ? { insetInlineStart: frozen.insetInlineStart } : {}) };
        const dir = this.sort?.key === col.key ? this.sort.direction : null;
        const glyph = dir === "ascending" ? "caret-up" : dir === "descending" ? "caret-down" : "caret-sort";
        const label = html `<span class="label">${col.header}</span>`;
        return html `<th
      scope="col"
      data-key=${col.key}
      class=${classMap({ ...frozen?.classes, resizable: this.isResizable(col), resizing: this.resizing === col.key })}
      style=${styleMap(thStyle)}
      aria-sort=${col.sortable ? (dir ?? "none") : nothing}
    >
      <div class="head">
        ${col.sortable
            ? html `<button class="sort" type="button" @click=${() => this.cycleSort(col)}>
              ${label}<zds-icon class="sort-glyph" name=${glyph} size="small" .iconStyle=${"rounded"}></zds-icon>
            </button>`
            : label}
        ${col.filterable
            ? html `<button
              class=${classMap({ filter: true, active: !!this.filters[col.key]?.length })}
              type="button"
              aria-label=${`Filter ${col.header}`}
              aria-expanded=${this.clientSide ? String(this.isOpen("filter", col.key)) : nothing}
              @click=${(e) => this.onFilterClick(col, e)}
            >
              <zds-icon name="filter" size="small" .iconStyle=${"rounded"}></zds-icon>
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
      ${a
            ? html `<zds-avatar
            size="xxxsmall"
            type=${a.src ? "photo" : "initials"}
            src=${a.src ?? nothing}
            initials=${a.initials ?? nothing}
            alt=${value.title}
            .showRing=${false}
            .showStatus=${false}
            .showClose=${false}
          ></zds-avatar>`
            : nothing}
      <div class="titles">
        <span class="title">${value.title}</span>
        ${value.subtitle ? html `<span class="subtitle">${value.subtitle}</span>` : nothing}
      </div>
    </div>`;
    }
    renderRow(row) {
        const selected = this.selectable ? this.isSelected(row) : !!row.selected;
        return html `<tr
      aria-selected=${selected ? "true" : nothing}
      aria-disabled=${this.isDisabled(row) ? "true" : nothing}
      @click=${() => this.onRowClick(row)}
    >
      ${this.renderSelectCell(row)}
      ${this.shown.map((col, i) => {
            const frozen = this.frozenFor(i);
            return html `<td data-key=${col.key} class=${classMap(frozen?.classes ?? {})} style=${frozen ? styleMap({ insetInlineStart: frozen.insetInlineStart }) : nothing}>
          <slot name=${`cell-${row.key}-${col.key}`}>${this.renderValue(row.cells[col.key])}</slot>
        </td>`;
        })}
      ${this.renderActionsCell(row)}
    </tr>`;
    }
    renderMenuItems() {
        const open = this.menuFor;
        if (open?.kind === "row") {
            const row = this.rows.find((r) => r.key === open.key);
            return (row ? this.actionsFor(row) : []).map((a) => html `<zds-menu-item leading-icon=${a.icon ?? nothing} .disabled=${!!a.disabled} @click=${() => row && this.runAction(a, row)}>${a.label}</zds-menu-item>`);
        }
        if (open?.kind === "filter") {
            const col = this.columns.find((c) => c.key === open.key);
            if (!col)
                return nothing;
            const chosen = this.filters[col.key] ?? [];
            return html `${this.filterOptionsFor(col).map((value) => html `<zds-menu-item
          type="checkbox"
          .selected=${chosen.includes(value)}
          @change=${(e) => {
                const on = e.currentTarget.selected;
                this.setFilter(col.key, on ? [...chosen.filter((v) => v !== value), value] : chosen.filter((v) => v !== value));
            }}
          >${value}</zds-menu-item
        >`)}${chosen.length
                ? html `<zds-menu-item
            leading-icon="close"
            @click=${() => {
                    this.setFilter(col.key, []);
                    this.closeMenu();
                }}
            >${this.clearFilterLabel}</zds-menu-item
          >`
                : nothing}`;
        }
        if (open?.kind === "columns") {
            const shown = this.shown;
            return html `<div role="group" aria-labelledby="show-columns">
          <div class="menu-heading" id="show-columns">${this.showColumnsLabel}</div>
          ${this.columns.map((col) => {
                const showing = !this.hiddenColumns.includes(col.key);
                return html `<zds-menu-item
              type="checkbox"
              .selected=${showing}
              .disabled=${col.hideable === false || (showing && shown.length === 1)}
              @change=${(e) => this.setColumnShown(col, e.currentTarget.selected)}
              >${col.header}</zds-menu-item
            >`;
            })}
        </div>
        <zds-divider class="menu-divider" aria-hidden="true"></zds-divider>
        <div role="group" aria-labelledby="freeze-columns">
          <div class="menu-heading" id="freeze-columns">${this.freezeColumnsLabel}</div>
          ${[{ label: this.noFrozenLabel, count: 0 }, ...shown.map((c, i) => ({ label: c.header, count: i + 1 }))].map((o) => html `<zds-menu-item type="radio" .selected=${Math.min(this.frozenColumns, shown.length) === o.count} @change=${() => this.setFrozen(o.count)}
              >${o.label}</zds-menu-item
            >`)}
        </div>`;
        }
        return nothing;
    }
    renderMenu() {
        const open = this.menuFor;
        const name = open?.kind === "columns" ? this.columnsLabel : open?.kind === "filter" ? `Filter ${this.columns.find((c) => c.key === open.key)?.header ?? ""}` : this.actionsLabel;
        return html `<div class="menu" popover="manual" role="menu" aria-label=${name} @keydown=${this.onMenuKeydown}>
      ${open ? html `<zds-dropdown-menu compact ?rounded=${this.shape === "rounded"}>${this.renderMenuItems()}</zds-dropdown-menu>` : nothing}
    </div>`;
    }
    renderPageSize() {
        if (!this.pageSizeOptions.length)
            return nothing;
        const digits = Math.max(...this.pageSizeOptions.map((n) => String(n).length));
        return html `<div class="page-size">
      <span class="page-size-label" aria-hidden="true">${this.pageSizeLabel}</span>
      <zds-select
        size="small"
        compact
        shape=${this.shape}
        style=${styleMap({ "--digits": String(digits) })}
        accessible-label=${this.pageSizeLabel}
        .options=${this.pageSizeOptions.map((n) => ({ value: String(n) }))}
        .value=${String(this.pageSize)}
        @zds-value-change=${this.onPageSize}
      ></zds-select>
    </div>`;
    }
    render() {
        const capped = this.maxHeight !== null && this.maxHeight !== "";
        return html `
      ${this.hasControl
            ? html `<div part="controls" class="controls">
            ${this.renderSelectedCount()}
            ${this.showSearch
                ? html `<zds-search
                  shape=${this.shape}
                  size="small"
                  flavour="default"
                  .value=${this.searchValue}
                  placeholder=${this.searchPlaceholder}
                  label=${this.searchPlaceholder}
                  @input=${this.onSearchInput}
                ></zds-search>`
                : nothing}
            <div class="controls-slot"><slot name="controls"></slot>${this.renderSettingsButton()}</div>
          </div>`
            : nothing}
      <div
        part="scroller"
        class="scroller"
        ?data-scrolled=${this.scrolled}
        ?data-capped=${capped}
        style=${capped ? styleMap({ maxBlockSize: toLength(this.maxHeight) }) : nothing}
        @scroll=${this.onScroll}
      >
        <table
          part="table"
          ?data-sized=${this.sized}
          style=${this.sized
            ? styleMap({
                inlineSize: this.lockedTotal(),
                "--select-width": this.edgeWidths.select ? `${this.edgeWidths.select}px` : undefined,
                "--actions-width": this.edgeWidths.actions ? `${this.edgeWidths.actions}px` : undefined,
            })
            : nothing}
          @pointerover=${this.onPointerOver}
          @pointerleave=${this.hideTip}
        >
          ${this.caption ? html `<caption>${this.caption}</caption>` : nothing}
          <colgroup>
            ${this.selectable ? html `<col class="select-col" />` : nothing}
            ${this.shown.map((c) => html `<col style=${this.widthOf(c) ? styleMap({ width: this.widthOf(c) }) : nothing} />`)}
            ${this.hasActions ? html `<col class="actions-col" />` : nothing}
          </colgroup>
          <thead>
            <tr>
              ${this.renderSelectAll()}${this.shown.map((c, i) => this.renderHeader(c, i))}${this.hasActions
            ? html `<th scope="col" class="actions"><span class="sr">${this.actionsLabel}</span></th>`
            : nothing}
            </tr>
          </thead>
          <tbody>
            ${this.view.length
            ? this.view.map((r) => this.renderRow(r))
            : html `<tr class="empty">
                  <td colspan=${this.shown.length + this.lead + (this.hasActions ? 1 : 0)}>${this.emptyLabel}</td>
                </tr>`}
          </tbody>
        </table>
      </div>
      ${this.hasFooter
            ? html `<div part="footer" class="footer">
            <div class="footer-start">
              ${this.summary ? html `<p class="page-details" aria-live="polite">${this.summary}</p>` : nothing}${this.renderPageSize()}
            </div>
            <div class="pagination-slot">
              <slot name="pagination"
                ><zds-pagination
                  outline
                  ?rounded=${this.shape === "rounded"}
                  .page=${this.page}
                  .pageCount=${this.pages}
                  @zds-page-change=${this.onPageChange}
                ></zds-pagination
              ></slot>
            </div>
          </div>`
            : nothing}
      ${this.renderMenu()}
      ${this.tipAnchor
            ? html `<zds-tooltip class="cell-tip" no-describe shape=${this.shape} .anchor=${this.tipAnchor}>${this.tipText}</zds-tooltip>`
            : nothing}
    `;
    }
};
ZdsTable.styles = styles;
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "columns", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "rows", void 0);
__decorate([
    property({ type: Boolean, attribute: "has-control", reflect: true })
], ZdsTable.prototype, "hasControl", void 0);
__decorate([
    property({ type: Boolean, attribute: "has-footer", reflect: true })
], ZdsTable.prototype, "hasFooter", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-search", reflect: true })
], ZdsTable.prototype, "showSearch", void 0);
__decorate([
    property({ type: String, attribute: "search-value" })
], ZdsTable.prototype, "searchValue", void 0);
__decorate([
    property({ type: String, attribute: "search-placeholder" })
], ZdsTable.prototype, "searchPlaceholder", void 0);
__decorate([
    property({ type: String, attribute: "page-details" })
], ZdsTable.prototype, "pageDetails", void 0);
__decorate([
    property({ type: String, attribute: "page-details-format" })
], ZdsTable.prototype, "pageDetailsFormat", void 0);
__decorate([
    property({ type: Number })
], ZdsTable.prototype, "page", void 0);
__decorate([
    property({ type: Number, attribute: "page-count" })
], ZdsTable.prototype, "pageCount", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "sort", void 0);
__decorate([
    property({ type: Boolean, attribute: "client-side", reflect: true })
], ZdsTable.prototype, "clientSide", void 0);
__decorate([
    property({ type: Number, attribute: "page-size" })
], ZdsTable.prototype, "pageSize", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "pageSizeOptions", void 0);
__decorate([
    property({ type: String, attribute: "page-size-label" })
], ZdsTable.prototype, "pageSizeLabel", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "filters", void 0);
__decorate([
    property({ type: String, attribute: "clear-filter-label" })
], ZdsTable.prototype, "clearFilterLabel", void 0);
__decorate([
    property({ type: String, attribute: "empty-label" })
], ZdsTable.prototype, "emptyLabel", void 0);
__decorate([
    property({ type: Number, attribute: "frozen-columns" })
], ZdsTable.prototype, "frozenColumns", void 0);
__decorate([
    property({ attribute: "max-height", converter: (v) => (v !== null && /^\d+(\.\d+)?$/.test(v) ? Number(v) : v) })
], ZdsTable.prototype, "maxHeight", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsTable.prototype, "selectable", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "selectedRows", void 0);
__decorate([
    property({ type: String, attribute: "selected-count-format" })
], ZdsTable.prototype, "selectedCountFormat", void 0);
__decorate([
    property({ type: String, attribute: "select-all-label" })
], ZdsTable.prototype, "selectAllLabel", void 0);
__decorate([
    property({ type: String, attribute: "select-row-label" })
], ZdsTable.prototype, "selectRowLabel", void 0);
__decorate([
    property({ type: Array, attribute: "disabled-rows" })
], ZdsTable.prototype, "disabledRows", void 0);
__decorate([
    property({ type: Boolean, attribute: "allow-disabled-selection", reflect: true })
], ZdsTable.prototype, "allowDisabledSelection", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "rowActions", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "onRowAction", void 0);
__decorate([
    property({ type: String, attribute: "actions-label" })
], ZdsTable.prototype, "actionsLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "column-configure", reflect: true })
], ZdsTable.prototype, "columnConfigure", void 0);
__decorate([
    property({ attribute: false })
], ZdsTable.prototype, "hiddenColumns", void 0);
__decorate([
    property({ type: String, attribute: "columns-label" })
], ZdsTable.prototype, "columnsLabel", void 0);
__decorate([
    property({ type: String, attribute: "show-columns-label" })
], ZdsTable.prototype, "showColumnsLabel", void 0);
__decorate([
    property({ type: String, attribute: "freeze-columns-label" })
], ZdsTable.prototype, "freezeColumnsLabel", void 0);
__decorate([
    property({ type: String, attribute: "no-frozen-label" })
], ZdsTable.prototype, "noFrozenLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsTable.prototype, "resizable", void 0);
__decorate([
    property({ type: Number, attribute: "min-column-width" })
], ZdsTable.prototype, "minColumnWidth", void 0);
__decorate([
    property({ type: Number, attribute: "tooltip-delay" })
], ZdsTable.prototype, "tooltipDelay", void 0);
__decorate([
    property({ type: String })
], ZdsTable.prototype, "caption", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsTable.prototype, "shape", void 0);
__decorate([
    state()
], ZdsTable.prototype, "scrolled", void 0);
__decorate([
    state()
], ZdsTable.prototype, "frozenOffsets", void 0);
__decorate([
    state()
], ZdsTable.prototype, "menuFor", void 0);
__decorate([
    state()
], ZdsTable.prototype, "widths", void 0);
__decorate([
    state()
], ZdsTable.prototype, "resizing", void 0);
__decorate([
    state()
], ZdsTable.prototype, "sized", void 0);
__decorate([
    state()
], ZdsTable.prototype, "tipText", void 0);
__decorate([
    state()
], ZdsTable.prototype, "tipAnchor", void 0);
__decorate([
    query(".menu")
], ZdsTable.prototype, "menuEl", void 0);
__decorate([
    query(".cell-tip")
], ZdsTable.prototype, "tipEl", void 0);
ZdsTable = __decorate([
    customElement("zds-table")
], ZdsTable);
export { ZdsTable };
