import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
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
import type { ZetaTooltip } from "../tooltip/tooltip.js";
import type { ZetaDroppable } from "../dropdown/droppable.js";
import type { ZetaDropdownMenuItem } from "../dropdown/menu-item/dropdown-menu-item.js";

/** One column. `width` is a CSS length; a number means px. */
export interface ZetaTableColumn {
  key: string;
  header: string;
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  /** With `columnConfigure` on, false keeps this column showing: it can't be hidden from the panel. */
  hideable?: boolean;
  /** Shows the full text in a tooltip on hover even when it fits. Takes precedence over `tooltipOnEllipsisOnly`. */
  tooltip?: boolean;
  /** Shows the full text in a tooltip on hover when it is cut off (default). False turns this column's tooltips off. */
  tooltipOnEllipsisOnly?: boolean;
  /** With the table's `resizable` on, false keeps this column at its width. */
  resizable?: boolean;
  /** Client-side: the values the filter menu offers. Unset, they are the column's distinct values. */
  filterOptions?: string[];
  /** Client-side: orders two rows for this column, ascending. Unset, cells compare as text, numbers by value. */
  compare?: (a: ZetaTableRow, b: ZetaTableRow) => number;
}

/** The spec's `_Avatar and text` cell. */
export interface ZetaTableAvatarCell {
  title: string;
  subtitle?: string;
  avatar?: { src?: string; initials?: string };
}

/** A string renders as text; an object as the avatar-and-text cell. */
export type ZetaTableCellValue = string | ZetaTableAvatarCell;

/** One option in a row's actions menu. `icon` is a zeta-icon glyph name. */
export interface ZetaTableAction {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface ZetaTableRow {
  key: string;
  cells: Record<string, ZetaTableCellValue>;
  selected?: boolean;
  disabled?: boolean;
  /** This row's menu, in place of `rowActions`; null hides the menu on this row. */
  actions?: ZetaTableAction[] | null;
}

export type ZetaTableSortDirection = "ascending" | "descending";

export interface ZetaTableSort {
  key: string;
  direction: ZetaTableSortDirection;
}

/** A max-height attribute: a bare number is px, anything else a CSS length. */
const lengthOrPx = (v: string | null) => (v !== null && /^\d+(\.\d+)?$/.test(v) ? Number(v) : v);

const toLength = (w: string | number | undefined) => (typeof w === "number" ? `${w}px` : w);

/** A cell's text: the value itself, or an avatar cell's title. */
const cellText = (v: ZetaTableCellValue | undefined) => (v === undefined || v === null ? "" : typeof v === "string" ? v : v.title);

type MenuKind = "row" | "filter" | "columns";

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
@customElement("zeta-table")
export class ZetaTable extends Contourable(LitElement) {
  /** The columns, in order. */
  @property({ attribute: false }) columns: ZetaTableColumn[] = [];

  /** The rows, in order. */
  @property({ attribute: false }) rows: ZetaTableRow[] = [];

  /** Shows the controls bar above the content (search and the `controls` slot). */
  @property({ type: Boolean, reflect: true, attribute: "has-control" }) hasControl = true;

  /** Shows the footer below the content (the page summary and the pagination). */
  @property({ type: Boolean, reflect: true, attribute: "has-footer" }) hasFooter = true;

  /** Shows the search field in the controls bar (Table Controls' search). */
  @property({ type: Boolean, reflect: true, attribute: "show-search" }) showSearch = true;

  /** The search query. */
  @property({ type: String, attribute: "search-value" }) searchValue = "";

  /** Placeholder, and accessible name, of the search field. */
  @property({ type: String, attribute: "search-placeholder" }) searchPlaceholder = "Search";

  /** The footer summary, such as "Showing 1-3 of 21". Empty hides it. */
  @property({ type: String, attribute: "page-details" }) pageDetails = "";

  /** The pagination's current page, 1-based. */
  @property({ type: Number }) page = 1;

  /** The pagination's page count. At 1 or less the pagination renders nothing. Client-side paging works it out. */
  @property({ type: Number, attribute: "page-count" }) pageCount = 1;

  /** The current sort, or null. The table reorders rows by it only when `clientSide`. */
  @property({ attribute: false }) sort: ZetaTableSort | null = null;

  /** The table sorts, searches, filters and pages `rows` itself. */
  @property({ type: Boolean, reflect: true, attribute: "client-side" }) clientSide = false;

  /** Client-side: rows per page. 0 shows every row on one page. */
  @property({ type: Number, attribute: "page-size" }) pageSize = 0;

  /** The sizes the footer's rows-per-page select offers. Empty hides it. */
  @property({ attribute: false }) pageSizeOptions: number[] = [];

  /** The rows-per-page select's label, and its accessible name. */
  @property({ type: String, attribute: "page-size-label" }) pageSizeLabel = "Rows per page";

  /** Client-side: the chosen filter values per column key. A row shows when its cell is among each column's values. */
  @property({ attribute: false }) filters: Record<string, string[]> = {};

  /** Client-side: the footer summary when `pageDetails` is empty. `{from}`, `{to}` and `{total}` are filled in. */
  @property({ type: String, attribute: "page-details-format" }) pageDetailsFormat = "Showing {from}-{to} of {total}";

  /** The text shown in the body when there are no rows to show. */
  @property({ type: String, attribute: "empty-label" }) emptyLabel = "No results";

  /** Client-side: the filter menu's option that clears the column's filter. */
  @property({ type: String, attribute: "clear-filter-label" }) clearFilterLabel = "Clear filter";

  /** Caps the content's height, a CSS length or px, so rows scroll vertically under a sticky header. Unset, the table
   * grows with its rows. */
  @property({ attribute: "max-height", converter: lengthOrPx })
  maxHeight: string | number | null = null;

  /** Pins the first N columns while the rest scroll horizontally. */
  @property({ type: Number, attribute: "frozen-columns" }) frozenColumns = 0;

  /** Adds a settings button to the controls bar to show, hide and freeze columns. */
  @property({ type: Boolean, reflect: true, attribute: "column-configure" }) columnConfigure = false;

  /** The keys of the columns not showing. */
  @property({ attribute: false }) hiddenColumns: string[] = [];

  /** The settings button's accessible name. */
  @property({ type: String, attribute: "columns-label" }) columnsLabel = "Columns";

  /** The settings panel's heading over the show and hide checkboxes. */
  @property({ type: String, attribute: "show-columns-label" }) showColumnsLabel = "Show columns";

  /** The settings panel's heading over the freeze choices. */
  @property({ type: String, attribute: "freeze-columns-label" }) freezeColumnsLabel = "Freeze up to";

  /** The settings panel's choice that freezes no columns. */
  @property({ type: String, attribute: "no-frozen-label" }) noFrozenLabel = "None";

  /** Lets people resize columns from each header's trailing edge. A column opts out with `resizable: false`. */
  @property({ type: Boolean, reflect: true }) resizable = false;

  /** The narrowest a resized column can get, in px. */
  @property({ type: Number, attribute: "min-column-width" }) minColumnWidth = 80;

  /** How long, in ms, cut-off text is hovered before its tooltip shows. */
  @property({ type: Number, attribute: "tooltip-delay" }) tooltipDelay = 500;

  /** Disables these rows, by key, as each row's own `disabled` does. */
  @property({ type: Array, attribute: "disabled-rows" }) disabledRows: string[] = [];

  /** Lets disabled rows be selected, clicked and opened for actions; they still look disabled. */
  @property({ type: Boolean, reflect: true, attribute: "allow-disabled-selection" }) allowDisabledSelection = false;

  /** Adds a checkbox column with select-all in its header. */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /** The selected row keys. Until it is set, it follows each row's `selected`. */
  @property({ attribute: false }) selectedRows: string[] = [];

  /** The selected-rows count in the controls bar. `{count}` is filled in. */
  @property({ type: String, attribute: "selected-count-format" }) selectedCountFormat = "{count} selected";

  /** Accessible name of the select-all checkbox. */
  @property({ type: String, attribute: "select-all-label" }) selectAllLabel = "Select all rows";

  /** Accessible name of each row's checkbox, followed by the row's first cell. */
  @property({ type: String, attribute: "select-row-label" }) selectRowLabel = "Select row";

  /** Actions offered in every row's menu. Any row with actions adds the actions column. */
  @property({ attribute: false }) rowActions: ZetaTableAction[] = [];

  /** Called when an action is chosen, with its key, the row and the row's index. */
  @property({ attribute: false }) onRowAction: ((actionKey: string, row: ZetaTableRow, rowIndex: number) => void) | null = null;

  /** Accessible name of the actions column and of each row's more button. */
  @property({ type: String, attribute: "actions-label" }) actionsLabel = "Actions";

  /** Accessible name of the table, as a visually hidden caption. */
  @property({ type: String }) caption: string | null = null;

  @state() private scrolled = false;
  /** Widths people resized columns to, in px, by column key. */
  @state() private widths: Record<string, number> = {};
  /** The key of the column being dragged. */
  @state() private resizing: string | null = null;
  /** Set on the first resize, when every column's width is locked to its rendered width. */
  @state() private sized = false;
  private edgeWidths: { select?: number; actions?: number } = {};
  /** Each column's width when the widths were locked, for a column with no declared width to return to. */
  private lockedWidths: Record<string, number> = {};
  @state() private frozenOffsets: number[] = [];
  /** The open menu: a row's actions or a column's filter. */
  @state() private menuFor: { kind: MenuKind; key: string } | null = null;

  @query(".menu") private menu!: ZetaDroppable;
  @query(".cell-tip") private tip!: ZetaTooltip;
  /** The full text the tooltip shows, while it shows. */
  @state() private tipText = "";
  private tipTimer: ReturnType<typeof setTimeout> | null = null;
  private tipTarget: HTMLElement | null = null;
  /** The rows on screen, and how many rows pass search and filters, before paging. */
  private view: ZetaTableRow[] = [];
  private total = 0;
  private menuTrigger: HTMLElement | null = null;
  private rowClickListeners = 0;
  private selectionSet = false;
  private frozenObserver: ResizeObserver | null = null;

  // There is no onRowClick property to detect, so count row-click listeners to know whether rows are clickable.
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    super.addEventListener(type, listener, options);
    if (type === "row-click") this.setRowClickListeners(this.rowClickListeners + 1);
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
    super.removeEventListener(type, listener, options);
    if (type === "row-click") this.setRowClickListeners(Math.max(0, this.rowClickListeners - 1));
  }

  private setRowClickListeners(n: number) {
    this.rowClickListeners = n;
    this.toggleAttribute("data-clickable", n > 0);
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("selectedRows") && changed.get("selectedRows") !== undefined) this.selectionSet = true;
    // Until selectedRows is set, it follows each row's own selected flag.
    if (changed.has("rows") && !this.selectionSet) {
      const seeded = this.rows.filter(r => r.selected).map(r => r.key);
      if (seeded.join() !== this.selectedRows.join()) this.selectedRows = seeded;
    }
    this.computeView();
  }

  /** Client-side, the rows shown are the rows searched, filtered, sorted and paged; otherwise `rows` as given. */
  private computeView() {
    if (!this.clientSide) {
      this.view = this.rows;
      this.total = this.rows.length;
      return;
    }
    const query = this.searchValue.trim().toLowerCase();
    const active = Object.entries(this.filters).filter(([, values]) => values.length);
    let out = this.rows.filter(row => {
      if (active.some(([key, values]) => !values.includes(cellText(row.cells[key])))) return false;
      if (!query) return true;
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
      if (this.page > pages) this.page = pages;
      if (this.page < 1) this.page = 1;
      out = out.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    }
    this.view = out;
  }

  /** The page count the pagination shows. */
  private get pages() {
    return this.clientSide && this.pageSize > 0 ? Math.max(1, Math.ceil(this.total / this.pageSize)) : this.pageCount;
  }

  private get summary() {
    if (this.pageDetails || !this.clientSide) return this.pageDetails;
    const size = this.pageSize > 0 ? this.pageSize : this.total;
    const from = this.total ? (this.page - 1) * size + 1 : 0;
    const to = this.total ? Math.min(this.total, from + size - 1) : 0;
    return this.pageDetailsFormat.replace("{from}", String(from)).replace("{to}", String(to)).replace("{total}", String(this.total));
  }

  /** Client-side, a new sort, search or filter starts again from page 1. */
  private restart() {
    if (this.clientSide) this.page = 1;
  }

  protected updated(changed: PropertyValues<this>) {
    // A separator's value is its column's rendered width, read once the layout has settled.
    for (const grip of this.renderRoot.querySelectorAll<HTMLElement>(".resizer")) {
      grip.setAttribute("aria-valuenow", String(Math.round(this.measured(grip))));
    }
    if (changed.has("frozenColumns") || changed.has("columns") || changed.has("selectable")) this.observeFrozen();
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
  private observeFrozen() {
    this.frozenObserver?.disconnect();
    this.frozenObserver = null;
    const n = Math.min(this.frozenColumns, this.shown.length);
    if (n <= 0) {
      if (this.frozenOffsets.length) this.frozenOffsets = [];
      return;
    }
    // The checkbox column freezes with the frozen columns, ahead of them.
    const cells = Array.from(this.renderRoot.querySelectorAll<HTMLTableCellElement>("thead th")).slice(0, n + this.lead);
    this.frozenObserver = new ResizeObserver(() => this.measureFrozen(cells));
    cells.forEach(c => this.frozenObserver!.observe(c));
    this.measureFrozen(cells);
  }

  private measureFrozen(cells: HTMLTableCellElement[]) {
    let sum = 0;
    const offsets = cells.map(c => {
      const at = sum;
      sum += c.getBoundingClientRect().width;
      return at;
    });
    const same = offsets.length === this.frozenOffsets.length && offsets.every((o, i) => o === this.frozenOffsets[i]);
    if (!same) this.frozenOffsets = offsets;
  }

  private emit(name: string, detail: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  /** Text that can be cut off with an ellipsis: a cell's text, an avatar cell's title or subtitle, a header label. */
  private static readonly TRUNCATING = ".text, .title, .subtitle, .label";

  private onPointerOver = (e: PointerEvent) => {
    const target = e.composedPath().find(n => n instanceof HTMLElement && n.matches(ZetaTable.TRUNCATING)) as HTMLElement | undefined;
    if (target === this.tipTarget) return;
    this.hideTip();
    if (!target) return;
    const key = target.closest<HTMLElement>("td, th")?.dataset.key;
    const col = this.columns.find(c => c.key === key);
    if (!col || col.tooltip === false || (col.tooltip !== true && col.tooltipOnEllipsisOnly === false)) return;
    if (col.tooltip !== true && target.scrollWidth <= target.clientWidth) return;
    this.tipTarget = target;
    this.tipTimer = setTimeout(() => void this.showTip(target), this.tooltipDelay);
  };

  private async showTip(target: HTMLElement) {
    this.tipText = target.textContent?.trim() ?? "";
    await this.updateComplete;
    const tip = this.tip;
    if (!tip.matches(":popover-open")) tip.showPopover();
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

  private hideTip = () => {
    if (this.tipTimer) clearTimeout(this.tipTimer);
    this.tipTimer = null;
    this.tipTarget = null;
    if (this.tip?.matches(":popover-open")) this.tip.hidePopover();
  };

  private renderTip() {
    return html`<zeta-tooltip class="cell-tip" .popover=${"manual"} aria-hidden="true" .rounded=${this.rounded}>${this.tipText}</zeta-tooltip>`;
  }

  private onScroll = (e: Event) => {
    this.hideTip();
    if (this.menuFor) this.closeMenu(false);
    const scrolled = Math.abs((e.currentTarget as HTMLElement).scrollLeft) > 0;
    if (scrolled !== this.scrolled) this.scrolled = scrolled;
  };

  private onSearchInput = (e: Event) => {
    const value = (e.currentTarget as HTMLInputElement).value ?? "";
    if (value === this.searchValue) return;
    this.searchValue = value;
    this.restart();
    this.emit("search-change", { value });
  };

  private cycleSort(col: ZetaTableColumn) {
    const current = this.sort?.key === col.key ? this.sort.direction : null;
    const next: ZetaTableSort | null =
      current === null ? { key: col.key, direction: "ascending" } : current === "ascending" ? { key: col.key, direction: "descending" } : null;
    this.sort = next;
    this.restart();
    this.emit("sort-change", { sort: next });
  }

  private onPageSizeChange = (e: Event) => {
    const size = Number((e.currentTarget as HTMLInputElement).value);
    if (!size || size === this.pageSize) return;
    this.pageSize = size;
    this.page = 1;
    this.emit("page-size-change", { pageSize: size });
  };

  private renderPageSize() {
    if (!this.pageSizeOptions.length) return nothing;
    return html`<div class="page-size">
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
        ${this.pageSizeOptions.map(n => html`<zeta-option value=${String(n)} ?selected=${n === this.pageSize}>${n}</zeta-option>`)}
      </zeta-select-input>
    </div>`;
  }

  private onPageChange = (e: CustomEvent<{ page: number }>) => {
    this.page = e.detail.page;
    this.emit("page-change", { page: this.page });
  };

  /** The columns showing, in order. */
  private get shown() {
    return this.columns.filter(c => !this.hiddenColumns.includes(c.key));
  }

  private emitColumnSettings() {
    this.emit("column-settings-change", { hiddenColumns: this.hiddenColumns, frozenColumns: this.frozenColumns });
  }

  private setColumnShown(col: ZetaTableColumn, show: boolean) {
    const hidden = this.hiddenColumns.filter(k => k !== col.key);
    this.hiddenColumns = show ? hidden : [...hidden, col.key];
    // Freezing never reaches past the columns still showing.
    this.frozenColumns = Math.min(this.frozenColumns, this.shown.length);
    this.emitColumnSettings();
  }

  private setFrozen(count: number) {
    if (count === this.frozenColumns) return;
    this.frozenColumns = count;
    this.emitColumnSettings();
  }

  private renderColumnSettings() {
    const shown = this.shown;
    return html`<div role="group" aria-labelledby="show-columns">
        <div class="menu-heading" id="show-columns">${this.showColumnsLabel}</div>
        ${this.columns.map(col => {
          const showing = !this.hiddenColumns.includes(col.key);
          // The last column showing, and a column that opts out, stay put.
          const locked = col.hideable === false || (showing && shown.length === 1);
          return html`<zeta-dropdown-menu-item
            type="checkbox"
            .selected=${showing}
            .disabled=${locked}
            @change=${(e: Event) => this.setColumnShown(col, (e.currentTarget as ZetaDropdownMenuItem).selected)}
            >${col.header}</zeta-dropdown-menu-item
          >`;
        })}
      </div>
      <zeta-divider class="menu-divider" aria-hidden="true"></zeta-divider>
      <div role="group" aria-labelledby="freeze-columns">
        <div class="menu-heading" id="freeze-columns">${this.freezeColumnsLabel}</div>
        ${[{ label: this.noFrozenLabel, count: 0 }, ...shown.map((c, i) => ({ label: c.header, count: i + 1 }))].map(
          o =>
            html`<zeta-dropdown-menu-item
              type="radio"
              .selected=${Math.min(this.frozenColumns, shown.length) === o.count}
              @change=${() => this.setFrozen(o.count)}
              >${o.label}</zeta-dropdown-menu-item
            >`
        )}
      </div>`;
  }

  private renderSettingsButton() {
    if (!this.columnConfigure) return nothing;
    return html`<zeta-icon-button
      class="column-settings"
      size="small"
      flavor="outline-subtle"
      shape=${this.rounded ? "rounded" : "sharp"}
      aria-label=${this.columnsLabel}
      .ariaExpanded=${this.isOpen("columns", "") ? "true" : "false"}
      @click=${(e: Event) => this.toggleMenu("columns", "", e)}
      >settings</zeta-icon-button
    >`;
  }

  /** 1 when the checkbox column leads the columns. */
  private get lead() {
    return this.selectable ? 1 : 0;
  }

  private isDisabled(row: ZetaTableRow) {
    return !!row.disabled || this.disabledRows.includes(row.key);
  }

  /** Whether a row takes selection, clicks and its actions: enabled, or disabled with allowDisabledSelection. */
  private isActionable(row: ZetaTableRow) {
    return !this.isDisabled(row) || this.allowDisabledSelection;
  }

  private isSelected(row: ZetaTableRow) {
    return this.selectedRows.includes(row.key);
  }

  private setSelection(changed: ZetaTableRow[], selected: boolean) {
    if (!changed.length) return;
    const keys = new Set(this.selectedRows);
    changed.forEach(r => (selected ? keys.add(r.key) : keys.delete(r.key)));
    this.selectionSet = true;
    this.selectedRows = Array.from(keys);
    this.emit("selection-change", { selectedRows: this.selectedRows, rows: changed, selected });
  }

  private toggleRow(row: ZetaTableRow) {
    if (this.isActionable(row)) this.setSelection([row], !this.isSelected(row));
  }

  /** Selects every enabled row shown, or clears them when they all are. */
  private toggleAll = () => {
    const enabled = this.view.filter(r => this.isActionable(r));
    const all = enabled.length > 0 && enabled.every(r => this.isSelected(r));
    this.setSelection(all ? enabled : enabled.filter(r => !this.isSelected(r)), !all);
  };

  private onRowClick(row: ZetaTableRow) {
    if (this.isActionable(row)) this.emit("row-click", { row });
  }

  /** Sticky geometry for column i, or null when it isn't frozen. */
  private frozenFor(i: number) {
    if (i >= this.frozenColumns) return null;
    return {
      classes: { frozen: true, "frozen-last": i === Math.min(this.frozenColumns, this.shown.length) - 1 },
      left: `${this.frozenOffsets[i + this.lead] ?? 0}px`
    };
  }

  /** The checkbox column's cell attributes: frozen at the start when any column is. */
  private selectCell() {
    return { classes: { select: true, frozen: this.frozenColumns > 0 }, style: this.frozenColumns > 0 ? styleMap({ insetInlineStart: "0px" }) : nothing };
  }

  /* A polite live region always in the bar, so a count appearing or changing is announced; the Label shows only while
     something is selected. */
  private renderSelectedCount() {
    if (!this.selectable) return nothing;
    const count = this.selectedRows.length;
    return html`<div class="selected-count" role="status">
      ${count ? html`<zeta-label status="info" .rounded=${this.rounded}>${this.selectedCountFormat.replace("{count}", String(count))}</zeta-label>` : nothing}
    </div>`;
  }

  private renderSelectAll() {
    if (!this.selectable) return nothing;
    const enabled = this.view.filter(r => this.isActionable(r));
    const count = enabled.filter(r => this.isSelected(r)).length;
    const cell = this.selectCell();
    return html`<th scope="col" class=${classMap(cell.classes)} style=${cell.style}>
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

  private renderSelectCell(row: ZetaTableRow) {
    if (!this.selectable) return nothing;
    const name = this.rowName(row);
    const cell = this.selectCell();
    // The checkbox handles its own click, so the row doesn't also fire row-click.
    return html`<td class=${classMap(cell.classes)} style=${cell.style} @click=${(e: Event) => e.stopPropagation()}>
      <zeta-checkbox .checked=${this.isSelected(row)} .disabled=${!this.isActionable(row)} .rounded=${this.rounded} @change=${() => this.toggleRow(row)}
        ><span class="sr">${`${this.selectRowLabel}: ${name}`}</span></zeta-checkbox
      >
    </td>`;
  }

  /** A row's name for its controls: its first cell's text, or its key. */
  private rowName(row: ZetaTableRow) {
    const first = row.cells[this.shown[0]?.key];
    return typeof first === "string" ? first : (first?.title ?? row.key);
  }

  /** A row's own actions win over rowActions; null hides the menu on that row. */
  private actionsFor(row: ZetaTableRow) {
    if (row.actions === null) return [];
    return row.actions?.length ? row.actions : this.rowActions;
  }

  private get hasActions() {
    return this.rowActions.length > 0 || this.rows.some(r => !!r.actions?.length);
  }

  private menuItems() {
    return Array.from(this.menu?.querySelectorAll<ZetaDropdownMenuItem>("zeta-dropdown-menu-item:not([disabled])") ?? []);
  }

  /** Menu rows are focusable inside their own shadow root. */
  private focusItem(item?: ZetaDropdownMenuItem) {
    item?.shadowRoot?.querySelector<HTMLElement>(".droppable-item")?.focus();
  }

  private isOpen(kind: MenuKind, key: string) {
    return this.menuFor?.kind === kind && this.menuFor.key === key;
  }

  private async toggleMenu(kind: MenuKind, key: string, e: Event) {
    const trigger = e.currentTarget as HTMLElement;
    if (this.isOpen(kind, key)) return this.closeMenu();
    this.closeMenu(false);
    this.menuTrigger = trigger;
    this.menuFor = { kind, key };
    await this.updateComplete;
    const menu = this.menu;
    menu.anchor = trigger;
    if (!menu.matches(":popover-open")) menu.showPopover();
    // Measured again now the panel is in the top layer and has a size.
    menu.requestUpdate();
    await menu.updateComplete;
    document.addEventListener("click", this.onOutsideClick, true);
    this.focusItem(this.menuItems()[0]);
  }

  private closeMenu(refocus = true) {
    if (!this.menuFor) return;
    document.removeEventListener("click", this.onOutsideClick, true);
    if (this.menu?.matches(":popover-open")) this.menu.hidePopover();
    this.menuFor = null;
    if (refocus) this.menuTrigger?.focus();
    this.menuTrigger = null;
  }

  private onOutsideClick = (e: Event) => {
    const path = e.composedPath();
    if (!path.includes(this.menu) && !(this.menuTrigger && path.includes(this.menuTrigger))) this.closeMenu(false);
  };

  private onMenuKeydown = (e: KeyboardEvent) => {
    const items = this.menuItems();
    const at = items.findIndex(i => e.composedPath().includes(i));
    if (e.key === "Escape") this.closeMenu();
    else if (e.key === "Tab") this.closeMenu(false);
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      this.focusItem(items[(at + step + items.length) % items.length]);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      this.focusItem(items[e.key === "Home" ? 0 : items.length - 1]);
    } else if (e.key === "Enter" && at >= 0) {
      e.preventDefault();
      items[at].click();
    }
  };

  private runAction(action: ZetaTableAction, row: ZetaTableRow) {
    if (action.disabled) return;
    this.closeMenu();
    const rowIndex = this.rows.indexOf(row);
    this.onRowAction?.(action.key, row, rowIndex);
    this.emit("row-action", { action: action.key, row, rowIndex });
  }

  private renderActionsHeader() {
    return this.hasActions ? html`<th scope="col" class="actions"><span class="sr">${this.actionsLabel}</span></th>` : nothing;
  }

  private renderActionsCell(row: ZetaTableRow) {
    if (!this.hasActions) return nothing;
    const actions = this.actionsFor(row);
    // The button handles its own click, so the row doesn't also fire row-click.
    return html`<td class="actions" @click=${(e: Event) => e.stopPropagation()}>
      ${
        actions.length
          ? html`<zeta-icon-button
              size="small"
              flavor="subtle"
              shape=${this.rounded ? "rounded" : "sharp"}
              aria-label=${`${this.actionsLabel}: ${this.rowName(row)}`}
              .ariaExpanded=${this.isOpen("row", row.key) ? "true" : "false"}
              .disabled=${!this.isActionable(row)}
              @click=${(e: Event) => this.toggleMenu("row", row.key, e)}
              >more_vertical</zeta-icon-button
            >`
          : nothing
      }
    </td>`;
  }

  /** A column's filter options: its filterOptions, or its distinct cell values in order. */
  private filterOptionsFor(col: ZetaTableColumn) {
    if (col.filterOptions) return col.filterOptions;
    const values = new Set(this.rows.map(r => cellText(r.cells[col.key])).filter(Boolean));
    return Array.from(values).sort((a, b) => collator.compare(a, b));
  }

  private setFilter(key: string, values: string[]) {
    const filters = { ...this.filters };
    if (values.length) filters[key] = values;
    else delete filters[key];
    this.filters = filters;
    this.restart();
    this.emit("filter-change", { filters, key });
  }

  private toggleFilter(key: string, value: string, on: boolean) {
    const current = this.filters[key] ?? [];
    this.setFilter(key, on ? [...current.filter(v => v !== value), value] : current.filter(v => v !== value));
  }

  private onFilterClick(col: ZetaTableColumn, e: Event) {
    this.emit("filter", { key: col.key });
    if (this.clientSide) void this.toggleMenu("filter", col.key, e);
  }

  private renderMenuItems() {
    const open = this.menuFor;
    if (open?.kind === "columns") return this.renderColumnSettings();
    if (open?.kind === "row") {
      const row = this.rows.find(r => r.key === open.key);
      return (row ? this.actionsFor(row) : []).map(
        a =>
          html`<zeta-dropdown-menu-item .disabled=${!!a.disabled} @click=${() => row && this.runAction(a, row)}>
            ${a.icon ? html`<zeta-icon slot="icon" .rounded=${this.rounded}>${a.icon}</zeta-icon>` : nothing}${a.label}
          </zeta-dropdown-menu-item>`
      );
    }
    const col = open?.kind === "filter" ? this.columns.find(c => c.key === open.key) : undefined;
    if (!col) return nothing;
    const chosen = this.filters[col.key] ?? [];
    return html`${this.filterOptionsFor(col).map(
      value =>
        html`<zeta-dropdown-menu-item
          type="checkbox"
          .selected=${chosen.includes(value)}
          @change=${(e: Event) => this.toggleFilter(col.key, value, (e.currentTarget as ZetaDropdownMenuItem).selected)}
          >${value}</zeta-dropdown-menu-item
        >`
    )}${
      chosen.length
        ? html`<zeta-dropdown-menu-item
            @click=${() => {
              this.setFilter(col.key, []);
              this.closeMenu();
            }}
            ><zeta-icon slot="icon" .rounded=${this.rounded}>close</zeta-icon>${this.clearFilterLabel}</zeta-dropdown-menu-item
          >`
        : nothing
    }`;
  }

  /* Checkbox and radio rows are menu items, so their panel is a menu. The row actions' rows are plain, and stay so. */
  private get menuRole() {
    return this.menuFor && this.menuFor.kind !== "row" ? "menu" : undefined;
  }

  private get menuName() {
    const open = this.menuFor;
    if (open?.kind === "columns") return this.columnsLabel;
    if (open?.kind === "filter") return `Filter ${this.columns.find(c => c.key === open.key)?.header ?? ""}`;
    return undefined;
  }

  private renderMenu() {
    return html`<zeta-droppable
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

  private isResizable(col: ZetaTableColumn) {
    return this.resizable && col.resizable !== false;
  }

  /** A column's width: the one it was resized to, or its declared width. */
  private widthOf(col: ZetaTableColumn) {
    const resized = this.widths[col.key];
    return resized !== undefined ? `${resized}px` : toLength(col.width);
  }

  /* Locks every column, the checkbox and actions columns included, to the width it renders at, so the table keeps its
     width and a resize only moves width between columns. */
  private lockWidths() {
    if (this.sized) return;
    const widths = { ...this.widths };
    for (const th of this.renderRoot.querySelectorAll<HTMLTableCellElement>("thead th")) {
      const w = th.getBoundingClientRect().width;
      if (th.classList.contains("select")) this.edgeWidths.select = w;
      else if (th.classList.contains("actions")) this.edgeWidths.actions = w;
      else if (th.dataset.key) {
        this.lockedWidths[th.dataset.key] = w;
        if (widths[th.dataset.key] === undefined) widths[th.dataset.key] = w;
      }
    }
    this.widths = widths;
    this.sized = true;
  }

  /** The locked table's width: every column's width added up, so fixed layout lands each one exactly. */
  private lockedTotal() {
    const parts = this.shown.map(c => this.widthOf(c) ?? "0px");
    if (this.selectable && this.edgeWidths.select) parts.push(`${this.edgeWidths.select}px`);
    if (this.hasActions && this.edgeWidths.actions) parts.push(`${this.edgeWidths.actions}px`);
    return `calc(${parts.join(" + ")})`;
  }

  /** The resizable columns a column trades width with: those after it, nearest first, or before it for the last. */
  private neighbours(col: ZetaTableColumn) {
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
  private declaredWidth(col: ZetaTableColumn) {
    const w = col.width;
    if (typeof w === "number") return w;
    if (typeof w === "string" && /^\d+(\.\d+)?px$/.test(w)) return parseFloat(w);
    return this.lockedWidths[col.key];
  }

  /* Sets a column's width without changing the table's: growing takes width from its neighbours, nearest first and
     none below minColumnWidth, and shrinking gives it to the nearest. A drag works from the widths it started with, so
     dragging back returns every column exactly. */
  private setWidth(col: ZetaTableColumn, width: number | null, base?: Record<string, number>) {
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
        if (!owed) break;
      }
      delta -= owed;
    } else if (delta < 0 && others.length) widths[others[0].key] -= delta;
    else delta = 0;
    widths[col.key] = current + delta;
    if (this.shown.every(c => widths[c.key] === this.widths[c.key])) return;
    this.widths = widths;
    this.emit("column-resize", { key: col.key, width: widths[col.key], widths });
  }

  /** The header cell's rendered width, the separator's value. */
  private measured(handle: HTMLElement) {
    return handle.closest("th")!.getBoundingClientRect().width;
  }

  private startResize(col: ZetaTableColumn, e: PointerEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    const handle = e.currentTarget as HTMLElement;
    const startX = e.clientX;
    this.lockWidths();
    const base = { ...this.widths };
    const start = base[col.key];
    // In right-to-left the trailing edge is on the left, so dragging left widens the column.
    const dir = getComputedStyle(this).direction === "rtl" ? -1 : 1;
    // Keeps the drag on the grip when the pointer outruns it; a synthetic pointer has nothing to capture.
    try {
      handle.setPointerCapture(e.pointerId);
    } catch {
      /* no active pointer */
    }
    this.resizing = col.key;
    const move = (ev: PointerEvent) => this.setWidth(col, start + dir * (ev.clientX - startX), base);
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

  private onResizeKey(col: ZetaTableColumn, e: KeyboardEvent) {
    const step = e.shiftKey ? 64 : 16;
    const grow = getComputedStyle(this).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
    const shrink = grow === "ArrowRight" ? "ArrowLeft" : "ArrowRight";
    // From the stored width, so presses quicker than a render still add up.
    this.lockWidths();
    const now = this.widths[col.key];
    if (e.key === grow) this.setWidth(col, now + step);
    else if (e.key === shrink) this.setWidth(col, now - step);
    else if (e.key === "Home") this.setWidth(col, this.minColumnWidth);
    else if (e.key === "Escape" || e.key === "Delete") this.setWidth(col, null);
    else return;
    e.preventDefault();
  }

  private renderResizer(col: ZetaTableColumn) {
    // A column with nothing to trade width with can't be resized without changing the table's width.
    if (!this.isResizable(col) || !this.neighbours(col).length) return nothing;
    return html`<div
      class="resizer"
      role="separator"
      aria-orientation="vertical"
      aria-label=${`Resize ${col.header}`}
      aria-valuemin=${this.minColumnWidth}
      tabindex="0"
      @pointerdown=${(e: PointerEvent) => this.startResize(col, e)}
      @dblclick=${() => this.setWidth(col, null)}
      @keydown=${(e: KeyboardEvent) => this.onResizeKey(col, e)}
      @click=${(e: Event) => e.stopPropagation()}
    ></div>`;
  }

  private renderColgroup() {
    // prettier-ignore
    return html`<colgroup>${this.selectable ? html`<col class="select-col">` : nothing}${this.shown.map(c => html`<col style=${this.widthOf(c) ? styleMap({ width: this.widthOf(c) }) : nothing}>`)}${this.hasActions ? html`<col class="actions-col">` : nothing}</colgroup>`;
  }

  private renderHeader(col: ZetaTableColumn, i: number) {
    const frozen = this.frozenFor(i);
    const w = this.widthOf(col);
    // Pinning the header cell keeps the column at its width, so the frozen offsets stay exact.
    const thStyle = { ...(w ? { width: w, minWidth: w } : {}), ...(frozen ? { insetInlineStart: frozen.left } : {}) };
    const dir = this.sort?.key === col.key ? this.sort.direction : null;
    const glyph = dir === "ascending" ? "caret_up" : dir === "descending" ? "caret_down" : "caret_sort";
    const label = html`<span class="label">${col.header}</span>`;
    return html`<th
      scope="col"
      data-key=${col.key}
      class=${classMap({ ...frozen?.classes, resizable: this.isResizable(col), resizing: this.resizing === col.key })}
      style=${styleMap(thStyle)}
      aria-sort=${ifDefined(col.sortable ? (dir ?? "none") : undefined)}
    >
      <div class="head">
        ${
          col.sortable
            ? html`<button class="sort" type="button" @click=${() => this.cycleSort(col)}>
                ${label}<zeta-icon class="sort-glyph" aria-hidden="true" .rounded=${this.rounded}>${glyph}</zeta-icon>
              </button>`
            : label
        }
        ${
          col.filterable
            ? html`<button
                class=${classMap({ filter: true, active: !!this.filters[col.key]?.length })}
                type="button"
                aria-label=${`Filter ${col.header}`}
                aria-expanded=${ifDefined(this.clientSide ? (this.isOpen("filter", col.key) ? "true" : "false") : undefined)}
                @click=${(e: Event) => this.onFilterClick(col, e)}
              >
                <zeta-icon aria-hidden="true" .rounded=${this.rounded}>filter</zeta-icon>
              </button>`
            : nothing
        }
      </div>
      ${this.renderResizer(col)}
    </th>`;
  }

  private renderValue(value: ZetaTableCellValue | undefined): TemplateResult | string {
    if (value === undefined || value === null) return "";
    if (typeof value === "string") return html`<span class="text">${value}</span>`;
    const a = value.avatar;
    return html`<div class="avatar-text">
      ${a ? html`<zeta-avatar size="xxxs" aria-label=${value.title}>${a.src ? html`<img src=${a.src} alt="" />` : (a.initials ?? "")}</zeta-avatar>` : nothing}
      <div class="titles">
        <span class="title">${value.title}</span>
        ${value.subtitle ? html`<span class="subtitle">${value.subtitle}</span>` : nothing}
      </div>
    </div>`;
  }

  private renderRow(row: ZetaTableRow) {
    const selected = this.selectable ? this.isSelected(row) : !!row.selected;
    return html`<tr
      aria-selected=${ifDefined(selected ? "true" : undefined)}
      aria-disabled=${ifDefined(this.isDisabled(row) ? "true" : undefined)}
      @click=${() => this.onRowClick(row)}
    >
      ${this.renderSelectCell(row)}
      ${this.shown.map((col, i) => {
        const frozen = this.frozenFor(i);
        return html`<td data-key=${col.key} class=${classMap(frozen?.classes ?? {})} style=${frozen ? styleMap({ insetInlineStart: frozen.left }) : nothing}>
          <slot name=${`cell-${row.key}-${col.key}`}>${this.renderValue(row.cells[col.key])}</slot>
        </td>`;
      })}
      ${this.renderActionsCell(row)}
    </tr>`;
  }

  protected render() {
    return html`
      ${
        this.hasControl
          ? html`<div part="controls" class="controls">
              ${this.renderSelectedCount()}
              ${
                this.showSearch
                  ? html`<zeta-search
                      size="small"
                      shape=${this.rounded ? "rounded" : "sharp"}
                      .value=${this.searchValue}
                      placeholder=${this.searchPlaceholder}
                      aria-label=${this.searchPlaceholder}
                      @input=${this.onSearchInput}
                    ></zeta-search>`
                  : nothing
              }
              <div class="controls-slot"><slot name="controls"></slot>${this.renderSettingsButton()}</div>
            </div>`
          : nothing
      }
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
          style=${
            this.sized
              ? styleMap({
                  width: this.lockedTotal(),
                  "--_select-width": this.edgeWidths.select ? `${this.edgeWidths.select}px` : undefined,
                  "--_actions-width": this.edgeWidths.actions ? `${this.edgeWidths.actions}px` : undefined
                })
              : nothing
          }
        >
          ${
            this.caption
              ? html`<caption>
                  ${this.caption}
                </caption>`
              : nothing
          }
          ${this.renderColgroup()}
          <thead>
            <tr>
              ${this.renderSelectAll()} ${this.shown.map((c, i) => this.renderHeader(c, i))} ${this.renderActionsHeader()}
            </tr>
          </thead>
          <tbody>
            ${
              this.view.length
                ? this.view.map(r => this.renderRow(r))
                : html`<tr class="empty">
                    <td colspan=${this.shown.length + this.lead + (this.hasActions ? 1 : 0)}>${this.emptyLabel}</td>
                  </tr>`
            }
          </tbody>
        </table>
      </div>
      ${
        this.hasFooter
          ? html`<div part="footer" class="footer">
              <div class="footer-start">
                ${this.summary ? html`<p class="page-details" aria-live="polite">${this.summary}</p>` : nothing} ${this.renderPageSize()}
              </div>
              <div class="pagination-slot">
                <slot name="pagination"
                  >${
                    this.pages > 1
                      ? html`<zeta-pagination
                          outline
                          show-controls
                          .showMore=${false}
                          .rounded=${this.rounded}
                          .totalPages=${this.pages}
                          .currentPage=${this.page}
                          @pageChange=${this.onPageChange}
                        ></zeta-pagination>`
                      : nothing
                  }</slot
                >
              </div>
            </div>`
          : nothing
      }
      ${this.renderMenu()} ${this.renderTip()}
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-table": ZetaTable;
  }
}
