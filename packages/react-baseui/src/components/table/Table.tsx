import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { Avatar } from "../avatar/Avatar.js";
import { Search } from "../search/Search.js";
import { Pagination } from "../pagination/Pagination.js";
import "./table.css";

export type TableShape = "rounded" | "sharp";

const TableShapeContext = React.createContext<TableShape | null>(null);
/**
 * The nearest Table's shape, for content slotted into it (controls,
 * pagination, custom cells) — Figma switches every nested component to the
 * table's shape, and the table can't reach into components it didn't render.
 * `null` outside a Table.
 */
export function useTableShape(): TableShape | null {
  return React.useContext(TableShapeContext);
}

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
  /** Adds a filter control to the header, shown on hover and focus. */
  filterable?: boolean;
}

/** The spec's "Avatar and text" cell: an avatar, a title and an optional subtitle. */
export interface TableAvatarCell {
  title: string;
  subtitle?: string;
  avatar?: { src?: string; initials?: string };
}
export type TableCellValue = string | TableAvatarCell;

export interface TableRow {
  key: string;
  cells: Record<string, TableCellValue>;
  selected?: boolean;
  /** Not clickable; content dims. */
  disabled?: boolean;
}

export interface TableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children"> {
  columns?: TableColumn[];
  rows?: TableRow[];
  /** Custom content for a cell, in place of its value. Return `undefined` to fall back to the value. */
  renderCell?: (row: TableRow, column: TableColumn) => React.ReactNode;
  /** Shows the controls bar above the content (search and controls). */
  hasControl?: boolean;
  /** Shows the footer below the content (page details and pagination). */
  hasFooter?: boolean;
  /** The search field in the controls bar. */
  showSearch?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  /** Actions after the search field, e.g. Icon Buttons. */
  controls?: React.ReactNode;
  /** Footer summary, e.g. "Showing 1-3 of 21". Empty hides it. */
  pageDetails?: string;
  /** Current page (1-based) for the footer's Pagination. */
  page?: number;
  /** Total pages for the footer's Pagination; at one page it doesn't render. */
  pageCount?: number;
  onPageChange?: (page: number) => void;
  /** Replaces the footer's built-in Pagination with your own content. */
  pagination?: React.ReactNode;
  /** Controlled sort. */
  sort?: TableSort | null;
  onSortChange?: (sort: TableSort | null) => void;
  onFilter?: (columnKey: string) => void;
  /** A row was activated. Disabled rows don't fire. */
  onRowClick?: (row: TableRow) => void;
  /** The first N columns stay put while the rest scroll horizontally. */
  frozenColumns?: number;
  /** Accessible name for the table. */
  caption?: string;
  /**
   * `rounded` rounds the table's outer corners (radius/element-md, clipping
   * its content) and its own Search; `sharp` keeps both square. Slotted
   * content reads it with `useTableShape()` to match.
   */
  shape?: TableShape;
  className?: string;
}

const NO_COLUMNS: TableColumn[] = [];
const NO_ROWS: TableRow[] = [];
const len = (w: number | string | undefined) => (typeof w === "number" ? `${w}px` : w);
const nextSort = (sort: TableSort | null | undefined, key: string): TableSort | null =>
  sort?.key !== key ? { key, direction: "ascending" } : sort.direction === "ascending" ? { key, direction: "descending" } : null;

function Cell({ value }: { value: TableCellValue | undefined }) {
  if (value === undefined) return null;
  if (typeof value === "string") return <span className="zds-table__text">{value}</span>;
  return (
    <span className="zds-table__avatar-cell">
      {value.avatar ? (
        <Avatar size="xxxsmall" type={value.avatar.src ? "photo" : "initials"} src={value.avatar.src} alt=""
          initials={value.avatar.initials ?? value.title.slice(0, 1)} showRing={false} showStatus={false} showClose={false} />
      ) : null}
      <span className="zds-table__titles">
        <span className="zds-table__title">{value.title}</span>
        {value.subtitle ? <span className="zds-table__subtitle">{value.subtitle}</span> : null}
      </span>
    </span>
  );
}

/**
 * A data table with rows of content arranged in columns, framed by an
 * optional controls bar above and a pagination footer below.
 *
 * Semantic, row-major `<table>` — Figma builds it column by column (a Table
 * Column per column, cells stacked inside), which is a Figma-only structure.
 * Base UI has no table primitive: sorting is a native button in the header
 * with `aria-sort`, rows take `aria-selected` / `aria-disabled`. Frozen
 * columns are `position: sticky`; the drawn Scrollbar is the native one.
 * Everything visual comes from the token layer via `table.css`.
 *
 * Kept in step with packages/web-components `<zds-table>`.
 *
 * @spec specs/table/table.spec.md
 */
export const Table = React.forwardRef<HTMLDivElement, TableProps>(function Table(
  {
    columns = NO_COLUMNS, rows = NO_ROWS, renderCell, hasControl = true, hasFooter = true, showSearch = true,
    searchValue, searchPlaceholder = "Search", onSearchChange, controls, pageDetails = "", pagination, page = 1, pageCount = 1, onPageChange,
    sort, onSortChange, onFilter, onRowClick, frozenColumns = 0, caption, shape = "rounded", className, ...rest
  },
  ref,
) {
  // Sticky offsets: each frozen column starts where the previous ones end —
  // measured from the rendered header cells, since content and padding can
  // make a column wider than its declared width.
  const frozen = Math.min(frozenColumns, columns.length);
  const headRow = React.useRef<HTMLTableRowElement | null>(null);
  const [offsets, setOffsets] = React.useState<string[]>([]);
  React.useLayoutEffect(() => {
    const row = headRow.current;
    if (!row || !frozen) { setOffsets((prev) => (prev.length ? [] : prev)); return; }
    const measure = () => {
      const cells = Array.from(row.cells).slice(0, frozen);
      let acc = 0;
      const next = cells.map((c) => { const o = `${acc}px`; acc += c.getBoundingClientRect().width; return o; });
      setOffsets((prev) => (prev.join() === next.join() ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    Array.from(row.cells).slice(0, frozen).forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  }, [frozen, columns]);

  const [scrolled, setScrolled] = React.useState(false);
  const frozenStyle = (i: number): React.CSSProperties | undefined =>
    i < frozen ? ({ "--zds-table-sticky-start": offsets[i] } as React.CSSProperties) : undefined;
  // A set width is also the column's minimum, so content can't squeeze it.
  const headStyle = (c: TableColumn, i: number): React.CSSProperties | undefined => {
    const w = len(c.width);
    const s = frozenStyle(i);
    return w ? { ...s, inlineSize: w, minInlineSize: w } : s;
  };
  const frozenAttrs = (i: number) => ({
    "data-frozen": i < frozen ? "" : undefined,
    "data-frozen-last": i === frozen - 1 ? "" : undefined,
  });

  return (
    <TableShapeContext.Provider value={shape}>
    <div ref={ref} {...rest} className={["zds-table", className].filter(Boolean).join(" ")} data-shape={shape}>
      {hasControl ? (
        <div className="zds-table__controls">
          {showSearch ? (
            <Search className="zds-table__search" shape={shape} size="small" flavour="default" aria-label={searchPlaceholder}
              placeholder={searchPlaceholder} value={searchValue} onValueChange={onSearchChange} />
          ) : null}
          {controls ? <div className="zds-table__actions">{controls}</div> : null}
        </div>
      ) : null}

      <div className="zds-table__scroller" data-scrolled={scrolled || undefined}
        onScroll={frozen ? (e) => setScrolled(e.currentTarget.scrollLeft > 0) : undefined}>
        <table className="zds-table__table">
          {caption ? <caption className="zds-table__caption">{caption}</caption> : null}
          <colgroup>{columns.map((c) => <col key={c.key} style={c.width !== undefined ? { width: len(c.width) } : undefined} />)}</colgroup>
          <thead>
            <tr ref={headRow}>
              {columns.map((c, i) => {
                const dir = sort?.key === c.key ? sort.direction : null;
                // Spec _Sort is a two-tone drawn vector; in code one glyph per state.
                const sortGlyph = dir === "ascending" ? "caret-up" : dir === "descending" ? "caret-down" : "caret-sort";
                const label = <span className="zds-table__label">{c.header}</span>;
                return (
                  <th key={c.key} scope="col" className="zds-table__th" aria-sort={c.sortable ? dir ?? "none" : undefined}
                    data-sorted={dir ?? undefined} style={headStyle(c, i)} {...frozenAttrs(i)}>
                    <span className="zds-table__header">
                      {c.sortable ? (
                        <button type="button" className="zds-table__sort" onClick={() => onSortChange?.(nextSort(sort, c.key))}>
                          {label}
                          <Icon className="zds-table__sort-icon" name={sortGlyph} size="small" iconStyle="rounded" />
                        </button>
                      ) : label}
                      {c.filterable ? (
                        <button type="button" className="zds-table__filter" aria-label={`Filter ${c.header}`} onClick={() => onFilter?.(c.key)}>
                          <Icon name="filter" size="small" iconStyle="rounded" />
                        </button>
                      ) : null}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const clickable = !!onRowClick && !r.disabled;
              return (
                <tr key={r.key} className="zds-table__tr" aria-selected={r.selected || undefined} aria-disabled={r.disabled || undefined}
                  data-clickable={clickable || undefined} onClick={clickable ? () => onRowClick!(r) : undefined}>
                  {columns.map((c, i) => {
                    const custom = renderCell?.(r, c);
                    return (
                      <td key={c.key} className="zds-table__td" style={frozenStyle(i)} {...frozenAttrs(i)}>
                        {custom !== undefined ? custom : <Cell value={r.cells[c.key]} />}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasFooter ? (
        <div className="zds-table__footer">
          {pageDetails ? <span className="zds-table__page-details">{pageDetails}</span> : <span />}
          {/* Table Footer holds a Pagination set to Outline; the table's shape
              sets its Rounded (spec: Shape reaches every nested component). */}
          {pagination ? <div className="zds-table__pagination">{pagination}</div>
            : <Pagination className="zds-table__pagination" outline rounded={shape === "rounded"}
                page={page} pageCount={pageCount} onPageChange={onPageChange} />}
        </div>
      ) : null}
    </div>
    </TableShapeContext.Provider>
  );
});
