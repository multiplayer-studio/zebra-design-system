import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Icon, type IconName } from "../icon/Icon.js";
import { Avatar } from "../avatar/Avatar.js";
import { Search } from "../search/Search.js";
import { Pagination } from "../pagination/Pagination.js";
import { Checkbox } from "../checkbox/Checkbox.js";
import { IconButton } from "../icon-button/IconButton.js";
import { DropdownMenu } from "../dropdown-menu/DropdownMenu.js";
import { MenuItem } from "../menu-item/MenuItem.js";
import { Divider } from "../divider/Divider.js";
import { Select } from "../select/Select.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import { BadgeLabel } from "../badge-label/BadgeLabel.js";
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
  avatar?: { src?: string; initials?: string };
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
  onSelectionChange?: (selectedRows: string[], change: { rows: TableRow[]; selected: boolean }) => void;
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

const NO_COLUMNS: TableColumn[] = [];
const NO_ROWS: TableRow[] = [];
const NO_KEYS: string[] = [];
const NO_ACTIONS: TableAction[] = [];
const NO_SIZES: number[] = [];
const NO_FILTERS: Record<string, string[]> = {};
const len = (w: number | string | undefined) => (typeof w === "number" ? `${w}px` : w);
const nextSort = (sort: TableSort | null | undefined, key: string): TableSort | null =>
  sort?.key !== key ? { key, direction: "ascending" } : sort.direction === "ascending" ? { key, direction: "descending" } : null;
const cellText = (v: TableCellValue | undefined) => (v === undefined ? "" : typeof v === "string" ? v : v.title);
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
const TRUNCATING = ".zds-table__text, .zds-table__title, .zds-table__subtitle, .zds-table__label";

/** A value that is controlled when its prop is given and the table's own state otherwise. */
function useControllable<T>(prop: T | undefined, initial: T, onChange?: (v: T) => void): [T, (v: T) => void] {
  const [own, setOwn] = React.useState(initial);
  const value = prop !== undefined ? prop : own;
  const set = React.useCallback(
    (v: T) => {
      if (prop === undefined) setOwn(v);
      onChange?.(v);
    },
    [prop, onChange],
  );
  return [value, set];
}

/** Reads a token's resolved px from the cascade at open time, so a token change moves the menus. */
const readPx = (el: Element | null, token: string) => {
  const v = el ? parseFloat(getComputedStyle(el).getPropertyValue(token)) : NaN;
  return Number.isFinite(v) ? v : 0;
};

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

/** One of the table's compact menus: Base UI Menu, positioned fixed so the table's clipping never cuts it off. */
function TableMenu({ trigger, align, label, shape, container, children }: {
  trigger: React.ReactElement; align: "start" | "end"; label: string; shape: TableShape;
  container: React.RefObject<HTMLDivElement | null>; children: React.ReactNode;
}) {
  return (
    <Menu.Root>
      <Menu.Trigger render={trigger} />
      <Menu.Portal container={container}>
        <Menu.Positioner className="zds-table__menu" side="bottom" align={align} positionMethod="fixed"
          sideOffset={() => readPx(container.current, "--space-2xs")}>
          <DropdownMenu compact rounded={shape === "rounded"} aria-label={label}>{children}</DropdownMenu>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
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
export const Table = React.forwardRef<HTMLDivElement, TableProps>(function Table(
  {
    columns = NO_COLUMNS, rows = NO_ROWS, renderCell, hasControl = true, hasFooter = true, showSearch = true,
    searchValue: searchProp, searchPlaceholder = "Search", onSearchChange, controls, pageDetails = "",
    pageDetailsFormat = "Showing {from}-{to} of {total}", pagination, page: pageProp, pageCount = 1, onPageChange,
    sort: sortProp, onSortChange, onFilter, clientSide = false, pageSize: pageSizeProp, onPageSizeChange,
    pageSizeOptions = NO_SIZES, pageSizeLabel = "Rows per page", filters: filtersProp, onFiltersChange,
    clearFilterLabel = "Clear filter", emptyLabel = "No results", onRowClick, selectable = false,
    selectedRows: selectedProp, onSelectionChange, selectedCountFormat = "{count} selected",
    selectAllLabel = "Select all rows", selectRowLabel = "Select row", disabledRows = NO_KEYS,
    allowDisabledSelection = false, rowActions = NO_ACTIONS, onRowAction, actionsLabel = "Actions",
    columnConfigure = false, hiddenColumns: hiddenProp, onColumnSettingsChange, columnsLabel = "Columns",
    showColumnsLabel = "Show columns", freezeColumnsLabel = "Freeze up to", noFrozenLabel = "None",
    frozenColumns: frozenProp, maxHeight, resizable = false, minColumnWidth = 80, onColumnResize,
    tooltipDelay = 500, caption, shape = "rounded", className, ...rest
  },
  ref,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const setRoot = React.useCallback((el: HTMLDivElement | null) => {
    rootRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  }, [ref]);

  // ---- state: each value is the prop when given, the table's own otherwise --
  const [search, setSearch] = useControllable(searchProp, "", onSearchChange);
  const [page, setPage] = useControllable(pageProp, 1, onPageChange);
  const [sort, setSort] = useControllable<TableSort | null>(sortProp, null, onSortChange);
  const [pageSize, setPageSize] = useControllable(pageSizeProp, 0, onPageSizeChange);
  const [filters, setFiltersState] = React.useState(NO_FILTERS);
  const activeFilters = filtersProp ?? filters;
  const seeded = React.useMemo(() => rows.filter((r) => r.selected).map((r) => r.key), [rows]);
  const [ownSelected, setOwnSelected] = React.useState<string[] | null>(null);
  const selected = selectedProp ?? ownSelected ?? seeded;
  const [ownHidden, setOwnHidden] = React.useState(NO_KEYS);
  const hidden = hiddenProp ?? ownHidden;
  const [ownFrozen, setOwnFrozen] = React.useState(0);
  const frozenCount = frozenProp ?? ownFrozen;

  const shown = React.useMemo(() => columns.filter((c) => !hidden.includes(c.key)), [columns, hidden]);
  const isDisabled = (r: TableRow) => !!r.disabled || disabledRows.includes(r.key);
  const isActionable = (r: TableRow) => !isDisabled(r) || allowDisabledSelection;
  const isSelected = (r: TableRow) => selected.includes(r.key);
  const rowName = (r: TableRow) => cellText(r.cells[shown[0]?.key]) || r.key;
  const actionsFor = (r: TableRow) => (r.actions === null ? [] : r.actions?.length ? r.actions : rowActions);
  const hasActions = rowActions.length > 0 || rows.some((r) => !!r.actions?.length);
  const lead = selectable ? 1 : 0;

  // ---- client-side view --------------------------------------------------
  const { view, total } = React.useMemo(() => {
    if (!clientSide) return { view: rows, total: rows.length };
    const query = search.trim().toLowerCase();
    const active = Object.entries(activeFilters).filter(([, v]) => v.length);
    let out = rows.filter((row) => {
      if (active.some(([key, values]) => !values.includes(cellText(row.cells[key])))) return false;
      if (!query) return true;
      return shown.some((c) => {
        const v = row.cells[c.key];
        const text = typeof v === "object" ? `${v.title} ${v.subtitle ?? ""}` : cellText(v);
        return text.toLowerCase().includes(query);
      });
    });
    const col = sort && columns.find((c) => c.key === sort.key);
    if (sort && col) {
      const cmp = col.compare ?? ((a: TableRow, b: TableRow) => collator.compare(cellText(a.cells[sort.key]), cellText(b.cells[sort.key])));
      const dir = sort.direction === "descending" ? -1 : 1;
      out = [...out].sort((a, b) => dir * cmp(a, b));
    }
    const count = out.length;
    if (pageSize > 0) {
      const last = Math.max(1, Math.ceil(count / pageSize));
      const p = Math.min(Math.max(1, page), last);
      out = out.slice((p - 1) * pageSize, p * pageSize);
    }
    return { view: out, total: count };
  }, [clientSide, rows, search, activeFilters, shown, sort, columns, pageSize, page]);
  const pages = clientSide && pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : pageCount;
  const shownPage = Math.min(Math.max(1, page), pages || 1);
  const summary = (() => {
    if (pageDetails || !clientSide) return pageDetails;
    const size = pageSize > 0 ? pageSize : total;
    const from = total ? (shownPage - 1) * size + 1 : 0;
    const to = total ? Math.min(total, from + size - 1) : 0;
    return pageDetailsFormat.replace("{from}", String(from)).replace("{to}", String(to)).replace("{total}", String(total));
  })();
  const restart = () => { if (clientSide) setPage(1); };

  // ---- selection, filters, columns ----------------------------------------
  const setSelection = (changed: TableRow[], on: boolean) => {
    if (!changed.length) return;
    const keys = new Set(selected);
    changed.forEach((r) => (on ? keys.add(r.key) : keys.delete(r.key)));
    const next = Array.from(keys);
    if (selectedProp === undefined) setOwnSelected(next);
    onSelectionChange?.(next, { rows: changed, selected: on });
  };
  const enabledShown = view.filter(isActionable);
  const selectedShown = enabledShown.filter(isSelected).length;
  const toggleAll = () => {
    const all = enabledShown.length > 0 && selectedShown === enabledShown.length;
    setSelection(all ? enabledShown : enabledShown.filter((r) => !isSelected(r)), !all);
  };
  const setFilter = (key: string, values: string[]) => {
    const next = { ...activeFilters };
    if (values.length) next[key] = values;
    else delete next[key];
    if (filtersProp === undefined) setFiltersState(next);
    onFiltersChange?.(next, key);
    restart();
  };
  const filterOptionsFor = (col: TableColumn) =>
    col.filterOptions ?? Array.from(new Set(rows.map((r) => cellText(r.cells[col.key])).filter(Boolean))).sort((a, b) => collator.compare(a, b));
  const setColumnSettings = (next: TableColumnSettings) => {
    if (hiddenProp === undefined) setOwnHidden(next.hiddenColumns);
    if (frozenProp === undefined) setOwnFrozen(next.frozenColumns);
    onColumnSettingsChange?.(next);
  };
  const setColumnShown = (col: TableColumn, show: boolean) => {
    const rest = hidden.filter((k) => k !== col.key);
    const nextHidden = show ? rest : [...rest, col.key];
    // Freezing never reaches past the columns still showing.
    const showing = columns.filter((c) => !nextHidden.includes(c.key)).length;
    setColumnSettings({ hiddenColumns: nextHidden, frozenColumns: Math.min(frozenCount, showing) });
  };

  // ---- frozen offsets ------------------------------------------------------
  // Each frozen column starts where the previous ones end — measured from the
  // rendered header cells, since content and padding can widen a column. The
  // selection column freezes with them, ahead of them.
  const frozen = Math.min(frozenCount, shown.length);
  const headRow = React.useRef<HTMLTableRowElement | null>(null);
  const [offsets, setOffsets] = React.useState<string[]>([]);
  React.useLayoutEffect(() => {
    const row = headRow.current;
    if (!row || !frozen) { setOffsets((prev) => (prev.length ? [] : prev)); return; }
    const cells = Array.from(row.cells).slice(0, frozen + lead);
    const measure = () => {
      let acc = 0;
      const next = cells.map((c) => { const o = `${acc}px`; acc += c.getBoundingClientRect().width; return o; });
      setOffsets((prev) => (prev.join() === next.join() ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    cells.forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  }, [frozen, shown, lead]);

  const [scrolled, setScrolled] = React.useState(false);
  const frozenStyle = (i: number): React.CSSProperties | undefined =>
    i < frozen ? ({ "--zds-table-sticky-start": offsets[i + lead] } as React.CSSProperties) : undefined;
  const frozenAttrs = (i: number) => ({
    "data-frozen": i < frozen ? "" : undefined,
    "data-frozen-last": i === frozen - 1 ? "" : undefined,
  });
  const edgeFrozen = selectable && frozen > 0;

  // ---- resizing --------------------------------------------------------------
  const [widths, setWidths] = React.useState<Record<string, number>>({});
  const widthsRef = React.useRef(widths);
  widthsRef.current = widths;
  const [sized, setSized] = React.useState(false);
  const locked = React.useRef<{ edges: { select?: number; actions?: number }; widths: Record<string, number> }>({ edges: {}, widths: {} });
  const [resizing, setResizing] = React.useState<string | null>(null);
  const isResizable = (c: TableColumn) => resizable && c.resizable !== false;
  const widthOf = (c: TableColumn) => (widths[c.key] !== undefined ? `${widths[c.key]}px` : len(c.width));
  const neighbours = (col: TableColumn) => {
    const i = shown.indexOf(col);
    const after = shown.slice(i + 1).filter(isResizable);
    return after.length ? after : shown.slice(0, i).reverse().filter(isResizable);
  };
  /** Locks every column at its rendered width, so a resize only moves width between columns. */
  const lockWidths = (): Record<string, number> => {
    if (sized) return widthsRef.current;
    const next = { ...widthsRef.current };
    for (const th of Array.from(headRow.current?.cells ?? [])) {
      const w = th.getBoundingClientRect().width;
      const key = th.getAttribute("data-key");
      if (th.hasAttribute("data-select")) locked.current.edges.select = w;
      else if (th.hasAttribute("data-actions")) locked.current.edges.actions = w;
      else if (key) {
        locked.current.widths[key] = w;
        if (next[key] === undefined) next[key] = w;
      }
    }
    widthsRef.current = next;
    setWidths(next);
    setSized(true);
    return next;
  };
  const declaredWidth = (c: TableColumn) =>
    typeof c.width === "number" ? c.width : typeof c.width === "string" && /^\d+(\.\d+)?px$/.test(c.width) ? parseFloat(c.width) : locked.current.widths[c.key];
  /** Sets a column's width without changing the table's (see the docblock). A drag works from the widths it started with. */
  const setWidth = (col: TableColumn, width: number | null, base?: Record<string, number>) => {
    const from = base ?? lockWidths();
    const next = { ...from };
    const current = from[col.key];
    const others = neighbours(col);
    let delta = Math.max(minColumnWidth, Math.round(width ?? declaredWidth(col))) - current;
    if (delta > 0) {
      let owed = delta;
      for (const o of others) {
        const take = Math.min(owed, Math.max(0, next[o.key] - minColumnWidth));
        next[o.key] -= take;
        owed -= take;
        if (!owed) break;
      }
      delta -= owed;
    } else if (delta < 0 && others.length) next[others[0].key] -= delta;
    else delta = 0;
    next[col.key] = current + delta;
    if (shown.every((c) => next[c.key] === widthsRef.current[c.key])) return;
    widthsRef.current = next;
    setWidths(next);
    onColumnResize?.(col.key, next[col.key], next);
  };
  const startResize = (col: TableColumn, e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const handle = e.currentTarget;
    const startX = e.clientX;
    const base = { ...lockWidths() };
    const start = base[col.key];
    const dir = getComputedStyle(handle).direction === "rtl" ? -1 : 1;
    try { handle.setPointerCapture(e.pointerId); } catch { /* a synthetic pointer has nothing to capture */ }
    setResizing(col.key);
    const move = (ev: PointerEvent) => setWidth(col, start + dir * (ev.clientX - startX), base);
    const end = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", end);
      handle.removeEventListener("pointercancel", end);
      setResizing(null);
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  };
  const onResizeKey = (col: TableColumn, e: React.KeyboardEvent<HTMLDivElement>) => {
    const grow = getComputedStyle(e.currentTarget).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
    const shrink = grow === "ArrowRight" ? "ArrowLeft" : "ArrowRight";
    const step = e.shiftKey ? 64 : 16;
    // From the stored width, so presses quicker than a render still add up.
    const now = lockWidths()[col.key];
    if (e.key === grow) setWidth(col, now + step);
    else if (e.key === shrink) setWidth(col, now - step);
    else if (e.key === "Home") setWidth(col, minColumnWidth);
    else if (e.key === "Escape" || e.key === "Delete") setWidth(col, null);
    else return;
    e.preventDefault();
  };
  const lockedTotal = () => {
    const parts = shown.map((c) => widthOf(c) ?? "0px");
    if (selectable && locked.current.edges.select) parts.push(`${locked.current.edges.select}px`);
    if (hasActions && locked.current.edges.actions) parts.push(`${locked.current.edges.actions}px`);
    return `calc(${parts.join(" + ")})`;
  };

  // ---- truncation tooltip --------------------------------------------------------
  const [tip, setTip] = React.useState<{ text: string; el: HTMLElement } | null>(null);
  const tipTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const tipEl = React.useRef<HTMLDivElement | null>(null);
  const [tipPlace, setTipPlace] = React.useState<{ left: number; top: number; point: "bottom" | "top" } | null>(null);
  const hideTip = () => {
    if (tipTimer.current) clearTimeout(tipTimer.current);
    tipTimer.current = null;
    setTip(null);
    setTipPlace(null);
  };
  const onPointerOver = (e: React.PointerEvent<HTMLTableElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(TRUNCATING);
    if (target && target === tip?.el) return;
    hideTip();
    if (!target) return;
    const col = columns.find((c) => c.key === target.closest("td, th")?.getAttribute("data-key"));
    if (!col || (col.tooltip !== true && col.tooltipOnEllipsisOnly === false)) return;
    if (col.tooltip !== true && target.scrollWidth <= target.clientWidth) return;
    tipTimer.current = setTimeout(() => setTip({ text: target.textContent?.trim() ?? "", el: target }), tooltipDelay);
  };
  // Above the text, its pointer aimed at it; below when there is no room above.
  React.useLayoutEffect(() => {
    if (!tip || !tipEl.current) return;
    const r = tip.el.getBoundingClientRect();
    const t = tipEl.current.getBoundingClientRect();
    const gap = readPx(rootRef.current, "--space-xs");
    const above = r.top - t.height - gap;
    const left = Math.min(Math.max(0, r.left + r.width / 2 - t.width / 2), window.innerWidth - t.width);
    setTipPlace(above >= 0 ? { left, top: above, point: "bottom" } : { left, top: r.bottom + gap, point: "top" });
  }, [tip]);
  React.useEffect(() => () => { if (tipTimer.current) clearTimeout(tipTimer.current); }, []);

  // ---- render parts --------------------------------------------------------------
  const capped = maxHeight !== undefined && maxHeight !== "";
  const colCount = shown.length + lead + (hasActions ? 1 : 0);
  const edgeStyle = edgeFrozen ? ({ "--zds-table-sticky-start": "0px" } as React.CSSProperties) : undefined;

  const filterMenu = (col: TableColumn) => {
    const chosen = activeFilters[col.key] ?? [];
    return (
      <TableMenu container={rootRef} align="start" shape={shape} label={`Filter ${col.header}`}
        trigger={
          <button type="button" className="zds-table__filter" data-active={chosen.length ? "" : undefined} aria-label={`Filter ${col.header}`}
            onClick={() => onFilter?.(col.key)}>
            <Icon name="filter" size="small" iconStyle="rounded" />
          </button>
        }>
        {filterOptionsFor(col).map((value) => (
          <MenuItem key={value} type="checkbox" selected={chosen.includes(value)}
            onSelectedChange={(on) => setFilter(col.key, on ? [...chosen.filter((v) => v !== value), value] : chosen.filter((v) => v !== value))}>
            {value}
          </MenuItem>
        ))}
        {chosen.length ? <MenuItem leadingIcon="close" onClick={() => setFilter(col.key, [])}>{clearFilterLabel}</MenuItem> : null}
      </TableMenu>
    );
  };

  const settingsMenu = columnConfigure ? (
    <TableMenu container={rootRef} align="end" shape={shape} label={columnsLabel}
      trigger={<IconButton className="zds-table__settings" flavour="outline-subtle" size="small" shape={shape} icon="settings" label={columnsLabel} />}>
      <Menu.Group className="zds-table__menu-group">
        <Menu.GroupLabel className="zds-table__menu-heading">{showColumnsLabel}</Menu.GroupLabel>
        {columns.map((col) => {
          const showing = !hidden.includes(col.key);
          return (
            <MenuItem key={col.key} type="checkbox" selected={showing} disabled={col.hideable === false || (showing && shown.length === 1)}
              onSelectedChange={(on) => setColumnShown(col, on)}>
              {col.header}
            </MenuItem>
          );
        })}
      </Menu.Group>
      <Divider className="zds-table__menu-divider" />
      <Menu.Group className="zds-table__menu-group">
        <Menu.GroupLabel className="zds-table__menu-heading">{freezeColumnsLabel}</Menu.GroupLabel>
        {[{ label: noFrozenLabel, count: 0 }, ...shown.map((c, i) => ({ label: c.header, count: i + 1 }))].map((o) => (
          <MenuItem key={o.count} type="radio" selected={frozen === o.count}
            onSelectedChange={() => setColumnSettings({ hiddenColumns: hidden, frozenColumns: o.count })}>
            {o.label}
          </MenuItem>
        ))}
      </Menu.Group>
    </TableMenu>
  ) : null;

  const digits = pageSizeOptions.length ? Math.max(...pageSizeOptions.map((n) => String(n).length)) : 0;

  return (
    <TableShapeContext.Provider value={shape}>
    <div ref={setRoot} {...rest} className={["zds-table", className].filter(Boolean).join(" ")} data-shape={shape}
      data-allow-disabled={allowDisabledSelection || undefined}>
      {hasControl ? (
        <div className="zds-table__controls">
          {selectable ? (
            // The live region is always there, so a count appearing is announced.
            <div className="zds-table__selected-count" role="status">
              {selected.length ? <BadgeLabel variant="info" shape={shape}>{selectedCountFormat.replace("{count}", String(selected.length))}</BadgeLabel> : null}
            </div>
          ) : null}
          {showSearch ? (
            <Search className="zds-table__search" shape={shape} size="small" flavour="default" aria-label={searchPlaceholder}
              placeholder={searchPlaceholder} value={search} onValueChange={(v) => { setSearch(v); restart(); }} />
          ) : null}
          {controls || settingsMenu ? <div className="zds-table__actions">{controls}{settingsMenu}</div> : null}
        </div>
      ) : null}

      <div className="zds-table__scroller" data-scrolled={scrolled || undefined} data-capped={capped || undefined}
        style={capped ? { maxBlockSize: len(maxHeight) } : undefined}
        onScroll={(e) => { hideTip(); setScrolled(e.currentTarget.scrollLeft > 0); }}>
        <table className="zds-table__table" data-sized={sized || undefined}
          style={sized ? ({
            inlineSize: lockedTotal(),
            "--zds-table-select-width": locked.current.edges.select ? `${locked.current.edges.select}px` : undefined,
            "--zds-table-actions-width": locked.current.edges.actions ? `${locked.current.edges.actions}px` : undefined,
          } as React.CSSProperties) : undefined}
          onPointerOver={onPointerOver} onPointerLeave={hideTip}>
          {caption ? <caption className="zds-table__caption">{caption}</caption> : null}
          <colgroup>
            {selectable ? <col className="zds-table__select-col" /> : null}
            {shown.map((c) => <col key={c.key} style={widthOf(c) ? { width: widthOf(c) } : undefined} />)}
            {hasActions ? <col className="zds-table__actions-col" /> : null}
          </colgroup>
          <thead>
            <tr ref={headRow}>
              {selectable ? (
                <th scope="col" className="zds-table__th zds-table__select" data-select="" data-frozen={edgeFrozen ? "" : undefined} style={edgeStyle}>
                  <Checkbox size="medium" aria-label={selectAllLabel}
                    checked={enabledShown.length > 0 && selectedShown === enabledShown.length}
                    indeterminate={selectedShown > 0 && selectedShown < enabledShown.length}
                    disabled={enabledShown.length === 0} onCheckedChange={toggleAll} />
                </th>
              ) : null}
              {shown.map((c, i) => {
                const dir = sort?.key === c.key ? sort.direction : null;
                // Spec _Sort is a two-tone drawn vector; in code one glyph per state.
                const sortGlyph = dir === "ascending" ? "caret-up" : dir === "descending" ? "caret-down" : "caret-sort";
                const label = <span className="zds-table__label">{c.header}</span>;
                const w = widthOf(c);
                return (
                  <th key={c.key} scope="col" data-key={c.key} className="zds-table__th" aria-sort={c.sortable ? dir ?? "none" : undefined}
                    data-sorted={dir ?? undefined} data-resizable={isResizable(c) || undefined} data-resizing={resizing === c.key || undefined}
                    style={{ ...frozenStyle(i), ...(w ? { inlineSize: w, minInlineSize: w } : null) }} {...frozenAttrs(i)}>
                    <span className="zds-table__header">
                      {c.sortable ? (
                        <button type="button" className="zds-table__sort" onClick={() => { setSort(nextSort(sort, c.key)); restart(); }}>
                          {label}
                          <Icon className="zds-table__sort-icon" name={sortGlyph} size="small" iconStyle="rounded" />
                        </button>
                      ) : label}
                      {c.filterable ? (
                        clientSide ? filterMenu(c) : (
                          <button type="button" className="zds-table__filter" aria-label={`Filter ${c.header}`} onClick={() => onFilter?.(c.key)}>
                            <Icon name="filter" size="small" iconStyle="rounded" />
                          </button>
                        )
                      ) : null}
                    </span>
                    {isResizable(c) && neighbours(c).length ? (
                      <div className="zds-table__resizer" role="separator" aria-orientation="vertical" aria-label={`Resize ${c.header}`}
                        aria-valuemin={minColumnWidth} aria-valuenow={widths[c.key] !== undefined ? Math.round(widths[c.key]) : undefined} tabIndex={0}
                        onPointerDown={(e) => startResize(c, e)} onDoubleClick={() => setWidth(c, null)} onKeyDown={(e) => onResizeKey(c, e)}
                        onClick={(e) => e.stopPropagation()} />
                    ) : null}
                  </th>
                );
              })}
              {hasActions ? (
                <th scope="col" className="zds-table__th zds-table__actions-cell" data-actions="">
                  <span className="zds-table__caption">{actionsLabel}</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {view.length ? view.map((r) => {
              const actionable = isActionable(r);
              const clickable = !!onRowClick && actionable;
              const rowSelected = selectable ? isSelected(r) : !!r.selected;
              const actions = actionsFor(r);
              return (
                <tr key={r.key} className="zds-table__tr" aria-selected={rowSelected || undefined} aria-disabled={isDisabled(r) || undefined}
                  data-clickable={clickable || undefined} onClick={clickable ? () => onRowClick!(r) : undefined}>
                  {selectable ? (
                    <td className="zds-table__td zds-table__select" data-frozen={edgeFrozen ? "" : undefined} style={edgeStyle} onClick={(e) => e.stopPropagation()}>
                      <Checkbox size="medium" aria-label={`${selectRowLabel}: ${rowName(r)}`} checked={isSelected(r)} disabled={!actionable}
                        onCheckedChange={() => actionable && setSelection([r], !isSelected(r))} />
                    </td>
                  ) : null}
                  {shown.map((c, i) => {
                    const custom = renderCell?.(r, c);
                    return (
                      <td key={c.key} data-key={c.key} className="zds-table__td" style={frozenStyle(i)} {...frozenAttrs(i)}>
                        {custom !== undefined ? <span className="zds-table__custom">{custom}</span> : <Cell value={r.cells[c.key]} />}
                      </td>
                    );
                  })}
                  {hasActions ? (
                    <td className="zds-table__td zds-table__actions-cell" onClick={(e) => e.stopPropagation()}>
                      {actions.length ? (
                        <TableMenu container={rootRef} align="end" shape={shape} label={actionsLabel}
                          trigger={<IconButton flavour="subtle" size="small" shape={shape} icon="more-vertical" label={`${actionsLabel}: ${rowName(r)}`} disabled={!actionable} />}>
                          {actions.map((a) => (
                            <MenuItem key={a.key} leadingIcon={a.icon} disabled={a.disabled}
                              onClick={() => { if (!a.disabled) onRowAction?.(a.key, r, rows.indexOf(r)); }}>
                              {a.label}
                            </MenuItem>
                          ))}
                        </TableMenu>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              );
            }) : (
              <tr className="zds-table__tr zds-table__empty">
                <td className="zds-table__td" colSpan={colCount}>{emptyLabel}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasFooter ? (
        <div className="zds-table__footer">
          <div className="zds-table__footer-start">
            {summary ? <span className="zds-table__page-details" aria-live="polite">{summary}</span> : null}
            {pageSizeOptions.length ? (
              <span className="zds-table__page-size">
                <span className="zds-table__page-size-label" aria-hidden="true">{pageSizeLabel}</span>
                <span className="zds-table__page-size-select" style={{ "--zds-table-digits": digits } as React.CSSProperties}>
                  <Select size="small" compact shape={shape} aria-label={pageSizeLabel} portalContainer={rootRef}
                    options={pageSizeOptions.map((n) => ({ value: String(n) }))} value={String(pageSize)}
                    onValueChange={(v) => { const n = Number(v); if (n && n !== pageSize) { setPageSize(n); setPage(1); } }} />
                </span>
              </span>
            ) : null}
          </div>
          {/* Table Footer holds a Pagination set to Outline; the table's shape
              sets its Rounded (spec: Shape reaches every nested component). */}
          {pagination ? <div className="zds-table__pagination">{pagination}</div>
            : <Pagination className="zds-table__pagination" outline rounded={shape === "rounded"}
                page={shownPage} pageCount={pages} onPageChange={setPage} />}
        </div>
      ) : null}

      {tip ? (
        <div ref={tipEl} className="zds-table__tip" aria-hidden="true"
          style={{ left: tipPlace?.left ?? 0, top: tipPlace?.top ?? 0, visibility: tipPlace ? undefined : "hidden" }}>
          <Tooltip point={tipPlace?.point ?? "bottom"} shape={shape}>{tip.text}</Tooltip>
        </div>
      ) : null}
    </div>
    </TableShapeContext.Provider>
  );
});
