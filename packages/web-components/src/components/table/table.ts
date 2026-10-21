import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./table.styles.js";
import "../search/search.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import "../pagination/pagination.js";

/** One column. `width` is a CSS length; a number means px. */
export interface TableColumn {
  key: string;
  header: string;
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
}

/** The spec's `_Avatar and text` cell. */
export interface TableAvatarCell {
  title: string;
  subtitle?: string;
  avatar?: { src?: string; initials?: string };
}

/** `rounded` rounds the table's corners and its own Search; slotted content reads `shape` to match. */
export type TableShape = "rounded" | "sharp";

/** A string renders as text; an object as the avatar-and-text cell. */
export type TableCellValue = string | TableAvatarCell;

export interface TableRow {
  key: string;
  cells: Record<string, TableCellValue>;
  selected?: boolean;
  disabled?: boolean;
}

export type TableSortDirection = "ascending" | "descending";
export interface TableSort {
  key: string;
  direction: TableSortDirection;
}

const toLength = (w: string | number | undefined) => (typeof w === "number" ? `${w}px` : w);

/**
 * A data table with rows of content arranged in columns, framed by an
 * optional controls bar above and a pagination footer below.
 *
 * A real `<table>` (header cells `scope="col"`, `aria-sort` on sortable
 * columns) inside a horizontally scrolling wrapper. Figma builds the table
 * column by column; that is a Figma-only arrangement, the markup is
 * row-major. Width follows the container, not the spec's 979px sample.
 *
 * Data comes in as two JS properties, `columns` and `rows`. A cell value is
 * text, or `{ title, subtitle?, avatar? }` for the spec's avatar-and-text
 * cell. Any cell can be replaced with markup through a named slot,
 * `cell-<rowKey>-<colKey>`, whose fallback is the data.
 *
 * Sorting is controlled: activating a sortable header cycles none →
 * ascending → descending → none, sets `sort` and fires `zds-sort-change`.
 * The table does not reorder `rows`; the listener does. (Figma's `Sorted`
 * axis is unwired and not reproduced — spec warn "Sorting is unwired".)
 *
 * `frozenColumns` pins the first N columns (Table Content's
 * `columnPosition=frozen`); their sticky offsets are measured from the
 * rendered header cells. Once the rest
 * scroll beneath them, the last frozen column casts a horizontal shadow.
 *
 * The footer holds a `<zds-pagination>` set to outline, rounded when `shape`
 * is rounded (spec: Table Footer's Pagination is Outline; Table's shape sets
 * its Rounded), driven by `page` and `pageCount`. It renders nothing at one
 * page. Its `zds-page-change` bubbles out of the table (composed); the
 * built-in pager updates its own page, and the table's `page` follows it.
 * Anything slotted into `pagination` replaces it. The scroll uses the native
 * scrollbar (no custom scrollbar spec).
 *
 * Rows get a pointer cursor while something listens for `zds-row-click` on
 * the element itself (a WC has no handler prop to detect). Disabled rows
 * never fire it.
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
 * @fires zds-row-click - An enabled row was clicked. `detail.row`.
 * @fires zds-page-change - From the built-in pagination (bubbles, composed). `detail.page`, 1-based.
 * @csspart controls - The controls bar.
 * @csspart scroller - The horizontally scrolling wrapper.
 * @csspart table - The table element.
 * @csspart footer - The footer.
 *
 * @spec specs/table/table.spec.json
 */
@customElement("zds-table")
export class ZdsTable extends LitElement {
  static styles = styles;

  /** The columns, in order. */
  @property({ attribute: false }) columns: TableColumn[] = [];

  /** The rows, in order. */
  @property({ attribute: false }) rows: TableRow[] = [];

  /** Shows the controls bar above the content (search and the `controls` slot). */
  @property({ type: Boolean, attribute: "has-control", reflect: true }) hasControl = true;

  /** Shows the footer below the content (page summary and the `pagination` slot). */
  @property({ type: Boolean, attribute: "has-footer", reflect: true }) hasFooter = true;

  /** Shows the search field in the controls bar (Table Controls' `search`). */
  @property({ type: Boolean, attribute: "show-search", reflect: true }) showSearch = true;

  /** The search query. */
  @property({ type: String, attribute: "search-value" }) searchValue = "";

  /** Placeholder, and accessible name, of the search field. */
  @property({ type: String, attribute: "search-placeholder" }) searchPlaceholder = "Search";

  /** Footer summary, e.g. "Showing 1-3 of 21". Empty hides it. */
  @property({ type: String, attribute: "page-details" }) pageDetails = "";

  /** The footer pagination's current page, 1-based. */
  @property({ type: Number }) page = 1;

  /** The footer pagination's page count. At 1 or less the pagination renders nothing. */
  @property({ type: Number, attribute: "page-count" }) pageCount = 1;

  /** The current sort, or null. Controlled: the table does not reorder rows. */
  @property({ attribute: false }) sort: TableSort | null = null;

  /** Pins the first N columns while the rest scroll horizontally. */
  @property({ type: Number, attribute: "frozen-columns" }) frozenColumns = 0;

  /** Accessible name of the table, rendered as a visually hidden caption. */
  @property({ type: String }) caption: string | null = null;

  /**
   * `rounded` rounds the table's outer corners (radius/element-md, clipping
   * its content) and the table's own Search; `sharp` keeps both square.
   * Figma also switches every nested component to its matching shape: the
   * built-in pagination follows it (rounded ↔ `rounded`). The table can't
   * reach into slotted content, so it reflects `shape`: slotted controls, a
   * slotted pagination and custom cells read it (e.g.
   * `el.closest("zds-table")?.shape`) and set their own.
   */
  @property({ type: String, reflect: true }) shape: TableShape = "rounded";

  @state() private scrolled = false;
  private rowClickListeners = 0;
  @state() private frozenOffsets: number[] = [];
  private frozenObserver: ResizeObserver | null = null;

  // A WC has no onRowClick prop, so count listeners on the element itself to
  // know whether rows are clickable (contract: cursor pointer only then).
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    super.addEventListener(type, listener, options);
    if (type === "zds-row-click" && listener) this.setRowClickListeners(this.rowClickListeners + 1);
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
    super.removeEventListener(type, listener, options);
    if (type === "zds-row-click" && listener) this.setRowClickListeners(Math.max(0, this.rowClickListeners - 1));
  }

  private setRowClickListeners(n: number) {
    this.rowClickListeners = n;
    this.toggleAttribute("data-clickable", n > 0);
  }

  protected updated(changed: PropertyValues<this>) {
    // Re-observe when the set of frozen header cells can have changed.
    if (changed.has("frozenColumns") || changed.has("columns")) this.observeFrozen();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.frozenObserver?.disconnect();
    this.frozenObserver = null;
  }

  /**
   * Sticky offsets are measured, not derived from the declared widths:
   * content and padding can make a column wider than declared, and an offset
   * computed from the declaration would then stick the next frozen column in
   * the wrong place. offset[i] = sum of the rendered widths of the frozen
   * header cells before i, re-measured whenever one of them resizes.
   */
  private observeFrozen() {
    this.frozenObserver?.disconnect();
    this.frozenObserver = null;
    const n = Math.min(this.frozenColumns, this.columns.length);
    if (n <= 0) {
      if (this.frozenOffsets.length) this.frozenOffsets = [];
      return;
    }
    const cells = Array.from(this.renderRoot.querySelectorAll<HTMLTableCellElement>("thead th")).slice(0, n);
    this.frozenObserver = new ResizeObserver(() => this.measureFrozen(cells));
    cells.forEach((c) => this.frozenObserver!.observe(c));
    this.measureFrozen(cells);
  }

  private measureFrozen(cells: HTMLTableCellElement[]) {
    let sum = 0;
    const offsets = cells.map((c) => {
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

  private onScroll(e: Event) {
    const scrolled = Math.abs((e.currentTarget as HTMLElement).scrollLeft) > 0;
    if (scrolled !== this.scrolled) this.scrolled = scrolled;
  }

  private onSearchInput(e: Event) {
    this.searchValue = (e.currentTarget as HTMLInputElement).value;
    this.emit("zds-search-change", { value: this.searchValue });
  }

  private cycleSort(col: TableColumn) {
    const current = this.sort?.key === col.key ? this.sort.direction : null;
    const next: TableSort | null =
      current === null ? { key: col.key, direction: "ascending" }
      : current === "ascending" ? { key: col.key, direction: "descending" }
      : null;
    this.sort = next;
    this.emit("zds-sort-change", { sort: next });
  }

  // Keep `page` in step with the built-in pager; the event itself bubbles
  // out of the table untouched (it is composed), so no re-dispatch.
  private onPageChange(e: CustomEvent<{ page: number }>) {
    this.page = e.detail.page;
  }

  private onRowClick(row: TableRow) {
    if (row.disabled) return;
    this.emit("zds-row-click", { row });
  }

  /** Sticky geometry for column i, or nothing when it isn't frozen. */
  private frozenFor(i: number) {
    if (i >= this.frozenColumns) return null;
    const start = `${this.frozenOffsets[i] ?? 0}px`;
    return {
      classes: { frozen: true, "frozen-last": i === Math.min(this.frozenColumns, this.columns.length) - 1 },
      insetInlineStart: start,
    };
  }

  private renderHeader(col: TableColumn, i: number) {
    const frozen = this.frozenFor(i);
    const w = toLength(col.width);
    // The <col> width alone is squeezable; pinning the header cell keeps the
    // column at its width so the frozen offsets stay exact.
    const thStyle = { ...(w ? { inlineSize: w, minInlineSize: w } : {}), ...(frozen ? { insetInlineStart: frozen.insetInlineStart } : {}) };
    const dir = this.sort?.key === col.key ? this.sort.direction : null;
    const glyph = dir === "ascending" ? "caret-up" : dir === "descending" ? "caret-down" : "caret-sort";
    const label = html`<span class="label">${col.header}</span>`;
    return html`<th
      scope="col"
      class=${classMap(frozen?.classes ?? {})}
      style=${styleMap(thStyle)}
      aria-sort=${col.sortable ? (dir ?? "none") : nothing}
    >
      <div class="head">
        ${col.sortable
          ? html`<button class="sort" type="button" @click=${() => this.cycleSort(col)}>
              ${label}<zds-icon class="sort-glyph" name=${glyph} size="small" .iconStyle=${"rounded"}></zds-icon>
            </button>`
          : label}
        ${col.filterable
          ? html`<button class="filter" type="button" aria-label=${`Filter ${col.header}`} @click=${() => this.emit("zds-filter", { key: col.key })}>
              <zds-icon name="filter" size="small" .iconStyle=${"rounded"}></zds-icon>
            </button>`
          : nothing}
      </div>
    </th>`;
  }

  private renderValue(value: TableCellValue | undefined): TemplateResult | string {
    if (value === undefined || value === null) return "";
    if (typeof value === "string") return value;
    const a = value.avatar;
    return html`<div class="avatar-text">
      ${a
        ? html`<zds-avatar
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
        ${value.subtitle ? html`<span class="subtitle">${value.subtitle}</span>` : nothing}
      </div>
    </div>`;
  }

  private renderRow(row: TableRow) {
    return html`<tr
      aria-selected=${row.selected ? "true" : nothing}
      aria-disabled=${row.disabled ? "true" : nothing}
      @click=${() => this.onRowClick(row)}
    >
      ${this.columns.map((col, i) => {
        const frozen = this.frozenFor(i);
        return html`<td class=${classMap(frozen?.classes ?? {})} style=${frozen ? styleMap({ insetInlineStart: frozen.insetInlineStart }) : nothing}>
          <slot name=${`cell-${row.key}-${col.key}`}>${this.renderValue(row.cells[col.key])}</slot>
        </td>`;
      })}
    </tr>`;
  }

  protected render() {
    return html`
      ${this.hasControl
        ? html`<div part="controls" class="controls">
            ${this.showSearch
              ? html`<zds-search
                  shape=${this.shape}
                  size="small"
                  flavour="default"
                  .value=${this.searchValue}
                  placeholder=${this.searchPlaceholder}
                  label=${this.searchPlaceholder}
                  @input=${this.onSearchInput}
                ></zds-search>`
              : nothing}
            <div class="controls-slot"><slot name="controls"></slot></div>
          </div>`
        : nothing}
      <div part="scroller" class="scroller" ?data-scrolled=${this.scrolled} @scroll=${this.onScroll}>
        <table part="table">
          ${this.caption ? html`<caption>${this.caption}</caption>` : nothing}
          <colgroup>
            ${this.columns.map((c) => html`<col style=${c.width !== undefined ? styleMap({ width: toLength(c.width) }) : nothing} />`)}
          </colgroup>
          <thead>
            <tr>${this.columns.map((c, i) => this.renderHeader(c, i))}</tr>
          </thead>
          <tbody>
            ${this.rows.map((r) => this.renderRow(r))}
          </tbody>
        </table>
      </div>
      ${this.hasFooter
        ? html`<div part="footer" class="footer">
            ${this.pageDetails ? html`<p class="page-details">${this.pageDetails}</p>` : nothing}
            <div class="pagination-slot">
              <slot name="pagination"
                ><zds-pagination
                  outline
                  ?rounded=${this.shape === "rounded"}
                  .page=${this.page}
                  .pageCount=${this.pageCount}
                  @zds-page-change=${this.onPageChange}
                ></zds-pagination
              ></slot>
            </div>
          </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-table": ZdsTable;
  }
}
