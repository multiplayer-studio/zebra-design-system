import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Icon } from "../icon/Icon.js";
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
const TableShapeContext = React.createContext(null);
/**
 * The nearest Table's shape, for content slotted into it (controls,
 * pagination, custom cells) — Figma switches every nested component to the
 * table's shape, and the table can't reach into components it didn't render.
 * `null` outside a Table.
 */
export function useTableShape() {
    return React.useContext(TableShapeContext);
}
const NO_COLUMNS = [];
const NO_ROWS = [];
const NO_KEYS = [];
const NO_ACTIONS = [];
const NO_SIZES = [];
const NO_FILTERS = {};
const len = (w) => (typeof w === "number" ? `${w}px` : w);
const nextSort = (sort, key) => sort?.key !== key ? { key, direction: "ascending" } : sort.direction === "ascending" ? { key, direction: "descending" } : null;
const cellText = (v) => (v === undefined ? "" : typeof v === "string" ? v : v.title);
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
const TRUNCATING = ".zds-table__text, .zds-table__title, .zds-table__subtitle, .zds-table__label";
/** A value that is controlled when its prop is given and the table's own state otherwise. */
function useControllable(prop, initial, onChange) {
    const [own, setOwn] = React.useState(initial);
    const value = prop !== undefined ? prop : own;
    const set = React.useCallback((v) => {
        if (prop === undefined)
            setOwn(v);
        onChange?.(v);
    }, [prop, onChange]);
    return [value, set];
}
/** Reads a token's resolved px from the cascade at open time, so a token change moves the menus. */
const readPx = (el, token) => {
    const v = el ? parseFloat(getComputedStyle(el).getPropertyValue(token)) : NaN;
    return Number.isFinite(v) ? v : 0;
};
function Cell({ value }) {
    if (value === undefined)
        return null;
    if (typeof value === "string")
        return _jsx("span", { className: "zds-table__text", children: value });
    return (_jsxs("span", { className: "zds-table__avatar-cell", children: [value.avatar ? (_jsx(Avatar, { size: "xxxsmall", type: value.avatar.src ? "photo" : "initials", src: value.avatar.src, alt: "", initials: value.avatar.initials ?? value.title.slice(0, 1), showRing: false, showStatus: false, showClose: false })) : null, _jsxs("span", { className: "zds-table__titles", children: [_jsx("span", { className: "zds-table__title", children: value.title }), value.subtitle ? _jsx("span", { className: "zds-table__subtitle", children: value.subtitle }) : null] })] }));
}
/** One of the table's compact menus: Base UI Menu, positioned fixed so the table's clipping never cuts it off. */
function TableMenu({ trigger, align, label, shape, container, children }) {
    return (_jsxs(Menu.Root, { children: [_jsx(Menu.Trigger, { render: trigger }), _jsx(Menu.Portal, { container: container, children: _jsx(Menu.Positioner, { className: "zds-table__menu", side: "bottom", align: align, positionMethod: "fixed", sideOffset: () => readPx(container.current, "--space-2xs"), children: _jsx(DropdownMenu, { compact: true, rounded: shape === "rounded", "aria-label": label, children: children }) }) })] }));
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
export const Table = React.forwardRef(function Table({ columns = NO_COLUMNS, rows = NO_ROWS, renderCell, hasControl = true, hasFooter = true, showSearch = true, searchValue: searchProp, searchPlaceholder = "Search", onSearchChange, controls, pageDetails = "", pageDetailsFormat = "Showing {from}-{to} of {total}", pagination, page: pageProp, pageCount = 1, onPageChange, sort: sortProp, onSortChange, onFilter, clientSide = false, pageSize: pageSizeProp, onPageSizeChange, pageSizeOptions = NO_SIZES, pageSizeLabel = "Rows per page", filters: filtersProp, onFiltersChange, clearFilterLabel = "Clear filter", emptyLabel = "No results", onRowClick, selectable = false, selectedRows: selectedProp, onSelectionChange, selectedCountFormat = "{count} selected", selectAllLabel = "Select all rows", selectRowLabel = "Select row", disabledRows = NO_KEYS, allowDisabledSelection = false, rowActions = NO_ACTIONS, onRowAction, actionsLabel = "Actions", columnConfigure = false, hiddenColumns: hiddenProp, onColumnSettingsChange, columnsLabel = "Columns", showColumnsLabel = "Show columns", freezeColumnsLabel = "Freeze up to", noFrozenLabel = "None", frozenColumns: frozenProp, maxHeight, resizable = false, minColumnWidth = 80, onColumnResize, tooltipDelay = 500, caption, shape = "rounded", className, ...rest }, ref) {
    const rootRef = React.useRef(null);
    const setRoot = React.useCallback((el) => {
        rootRef.current = el;
        if (typeof ref === "function")
            ref(el);
        else if (ref)
            ref.current = el;
    }, [ref]);
    // ---- state: each value is the prop when given, the table's own otherwise --
    const [search, setSearch] = useControllable(searchProp, "", onSearchChange);
    const [page, setPage] = useControllable(pageProp, 1, onPageChange);
    const [sort, setSort] = useControllable(sortProp, null, onSortChange);
    const [pageSize, setPageSize] = useControllable(pageSizeProp, 0, onPageSizeChange);
    const [filters, setFiltersState] = React.useState(NO_FILTERS);
    const activeFilters = filtersProp ?? filters;
    const seeded = React.useMemo(() => rows.filter((r) => r.selected).map((r) => r.key), [rows]);
    const [ownSelected, setOwnSelected] = React.useState(null);
    const selected = selectedProp ?? ownSelected ?? seeded;
    const [ownHidden, setOwnHidden] = React.useState(NO_KEYS);
    const hidden = hiddenProp ?? ownHidden;
    const [ownFrozen, setOwnFrozen] = React.useState(0);
    const frozenCount = frozenProp ?? ownFrozen;
    const shown = React.useMemo(() => columns.filter((c) => !hidden.includes(c.key)), [columns, hidden]);
    const isDisabled = (r) => !!r.disabled || disabledRows.includes(r.key);
    const isActionable = (r) => !isDisabled(r) || allowDisabledSelection;
    const isSelected = (r) => selected.includes(r.key);
    const rowName = (r) => cellText(r.cells[shown[0]?.key]) || r.key;
    const actionsFor = (r) => (r.actions === null ? [] : r.actions?.length ? r.actions : rowActions);
    const hasActions = rowActions.length > 0 || rows.some((r) => !!r.actions?.length);
    const lead = selectable ? 1 : 0;
    // ---- client-side view --------------------------------------------------
    const { view, total } = React.useMemo(() => {
        if (!clientSide)
            return { view: rows, total: rows.length };
        const query = search.trim().toLowerCase();
        const active = Object.entries(activeFilters).filter(([, v]) => v.length);
        let out = rows.filter((row) => {
            if (active.some(([key, values]) => !values.includes(cellText(row.cells[key]))))
                return false;
            if (!query)
                return true;
            return shown.some((c) => {
                const v = row.cells[c.key];
                const text = typeof v === "object" ? `${v.title} ${v.subtitle ?? ""}` : cellText(v);
                return text.toLowerCase().includes(query);
            });
        });
        const col = sort && columns.find((c) => c.key === sort.key);
        if (sort && col) {
            const cmp = col.compare ?? ((a, b) => collator.compare(cellText(a.cells[sort.key]), cellText(b.cells[sort.key])));
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
        if (pageDetails || !clientSide)
            return pageDetails;
        const size = pageSize > 0 ? pageSize : total;
        const from = total ? (shownPage - 1) * size + 1 : 0;
        const to = total ? Math.min(total, from + size - 1) : 0;
        return pageDetailsFormat.replace("{from}", String(from)).replace("{to}", String(to)).replace("{total}", String(total));
    })();
    const restart = () => { if (clientSide)
        setPage(1); };
    // ---- selection, filters, columns ----------------------------------------
    const setSelection = (changed, on) => {
        if (!changed.length)
            return;
        const keys = new Set(selected);
        changed.forEach((r) => (on ? keys.add(r.key) : keys.delete(r.key)));
        const next = Array.from(keys);
        if (selectedProp === undefined)
            setOwnSelected(next);
        onSelectionChange?.(next, { rows: changed, selected: on });
    };
    const enabledShown = view.filter(isActionable);
    const selectedShown = enabledShown.filter(isSelected).length;
    const toggleAll = () => {
        const all = enabledShown.length > 0 && selectedShown === enabledShown.length;
        setSelection(all ? enabledShown : enabledShown.filter((r) => !isSelected(r)), !all);
    };
    const setFilter = (key, values) => {
        const next = { ...activeFilters };
        if (values.length)
            next[key] = values;
        else
            delete next[key];
        if (filtersProp === undefined)
            setFiltersState(next);
        onFiltersChange?.(next, key);
        restart();
    };
    const filterOptionsFor = (col) => col.filterOptions ?? Array.from(new Set(rows.map((r) => cellText(r.cells[col.key])).filter(Boolean))).sort((a, b) => collator.compare(a, b));
    const setColumnSettings = (next) => {
        if (hiddenProp === undefined)
            setOwnHidden(next.hiddenColumns);
        if (frozenProp === undefined)
            setOwnFrozen(next.frozenColumns);
        onColumnSettingsChange?.(next);
    };
    const setColumnShown = (col, show) => {
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
    const headRow = React.useRef(null);
    const [offsets, setOffsets] = React.useState([]);
    React.useLayoutEffect(() => {
        const row = headRow.current;
        if (!row || !frozen) {
            setOffsets((prev) => (prev.length ? [] : prev));
            return;
        }
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
    const frozenStyle = (i) => i < frozen ? { "--zds-table-sticky-start": offsets[i + lead] } : undefined;
    const frozenAttrs = (i) => ({
        "data-frozen": i < frozen ? "" : undefined,
        "data-frozen-last": i === frozen - 1 ? "" : undefined,
    });
    const edgeFrozen = selectable && frozen > 0;
    // ---- resizing --------------------------------------------------------------
    const [widths, setWidths] = React.useState({});
    const widthsRef = React.useRef(widths);
    widthsRef.current = widths;
    const [sized, setSized] = React.useState(false);
    const locked = React.useRef({ edges: {}, widths: {} });
    const [resizing, setResizing] = React.useState(null);
    const isResizable = (c) => resizable && c.resizable !== false;
    const widthOf = (c) => (widths[c.key] !== undefined ? `${widths[c.key]}px` : len(c.width));
    const neighbours = (col) => {
        const i = shown.indexOf(col);
        const after = shown.slice(i + 1).filter(isResizable);
        return after.length ? after : shown.slice(0, i).reverse().filter(isResizable);
    };
    /** Locks every column at its rendered width, so a resize only moves width between columns. */
    const lockWidths = () => {
        if (sized)
            return widthsRef.current;
        const next = { ...widthsRef.current };
        for (const th of Array.from(headRow.current?.cells ?? [])) {
            const w = th.getBoundingClientRect().width;
            const key = th.getAttribute("data-key");
            if (th.hasAttribute("data-select"))
                locked.current.edges.select = w;
            else if (th.hasAttribute("data-actions"))
                locked.current.edges.actions = w;
            else if (key) {
                locked.current.widths[key] = w;
                if (next[key] === undefined)
                    next[key] = w;
            }
        }
        widthsRef.current = next;
        setWidths(next);
        setSized(true);
        return next;
    };
    const declaredWidth = (c) => typeof c.width === "number" ? c.width : typeof c.width === "string" && /^\d+(\.\d+)?px$/.test(c.width) ? parseFloat(c.width) : locked.current.widths[c.key];
    /** Sets a column's width without changing the table's (see the docblock). A drag works from the widths it started with. */
    const setWidth = (col, width, base) => {
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
                if (!owed)
                    break;
            }
            delta -= owed;
        }
        else if (delta < 0 && others.length)
            next[others[0].key] -= delta;
        else
            delta = 0;
        next[col.key] = current + delta;
        if (shown.every((c) => next[c.key] === widthsRef.current[c.key]))
            return;
        widthsRef.current = next;
        setWidths(next);
        onColumnResize?.(col.key, next[col.key], next);
    };
    const startResize = (col, e) => {
        if (e.button !== 0)
            return;
        e.preventDefault();
        const handle = e.currentTarget;
        const startX = e.clientX;
        const base = { ...lockWidths() };
        const start = base[col.key];
        const dir = getComputedStyle(handle).direction === "rtl" ? -1 : 1;
        try {
            handle.setPointerCapture(e.pointerId);
        }
        catch { /* a synthetic pointer has nothing to capture */ }
        setResizing(col.key);
        const move = (ev) => setWidth(col, start + dir * (ev.clientX - startX), base);
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
    const onResizeKey = (col, e) => {
        const grow = getComputedStyle(e.currentTarget).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
        const shrink = grow === "ArrowRight" ? "ArrowLeft" : "ArrowRight";
        const step = e.shiftKey ? 64 : 16;
        // From the stored width, so presses quicker than a render still add up.
        const now = lockWidths()[col.key];
        if (e.key === grow)
            setWidth(col, now + step);
        else if (e.key === shrink)
            setWidth(col, now - step);
        else if (e.key === "Home")
            setWidth(col, minColumnWidth);
        else if (e.key === "Escape" || e.key === "Delete")
            setWidth(col, null);
        else
            return;
        e.preventDefault();
    };
    const lockedTotal = () => {
        const parts = shown.map((c) => widthOf(c) ?? "0px");
        if (selectable && locked.current.edges.select)
            parts.push(`${locked.current.edges.select}px`);
        if (hasActions && locked.current.edges.actions)
            parts.push(`${locked.current.edges.actions}px`);
        return `calc(${parts.join(" + ")})`;
    };
    // ---- truncation tooltip --------------------------------------------------------
    const [tip, setTip] = React.useState(null);
    const tipTimer = React.useRef(null);
    const tipEl = React.useRef(null);
    const [tipPlace, setTipPlace] = React.useState(null);
    const hideTip = () => {
        if (tipTimer.current)
            clearTimeout(tipTimer.current);
        tipTimer.current = null;
        setTip(null);
        setTipPlace(null);
    };
    const onPointerOver = (e) => {
        const target = e.target.closest(TRUNCATING);
        if (target && target === tip?.el)
            return;
        hideTip();
        if (!target)
            return;
        const col = columns.find((c) => c.key === target.closest("td, th")?.getAttribute("data-key"));
        if (!col || (col.tooltip !== true && col.tooltipOnEllipsisOnly === false))
            return;
        if (col.tooltip !== true && target.scrollWidth <= target.clientWidth)
            return;
        tipTimer.current = setTimeout(() => setTip({ text: target.textContent?.trim() ?? "", el: target }), tooltipDelay);
    };
    // Above the text, its pointer aimed at it; below when there is no room above.
    React.useLayoutEffect(() => {
        if (!tip || !tipEl.current)
            return;
        const r = tip.el.getBoundingClientRect();
        const t = tipEl.current.getBoundingClientRect();
        const gap = readPx(rootRef.current, "--space-xs");
        const above = r.top - t.height - gap;
        const left = Math.min(Math.max(0, r.left + r.width / 2 - t.width / 2), window.innerWidth - t.width);
        setTipPlace(above >= 0 ? { left, top: above, point: "bottom" } : { left, top: r.bottom + gap, point: "top" });
    }, [tip]);
    React.useEffect(() => () => { if (tipTimer.current)
        clearTimeout(tipTimer.current); }, []);
    // ---- render parts --------------------------------------------------------------
    const capped = maxHeight !== undefined && maxHeight !== "";
    const colCount = shown.length + lead + (hasActions ? 1 : 0);
    const edgeStyle = edgeFrozen ? { "--zds-table-sticky-start": "0px" } : undefined;
    const filterMenu = (col) => {
        const chosen = activeFilters[col.key] ?? [];
        return (_jsxs(TableMenu, { container: rootRef, align: "start", shape: shape, label: `Filter ${col.header}`, trigger: _jsx("button", { type: "button", className: "zds-table__filter", "data-active": chosen.length ? "" : undefined, "aria-label": `Filter ${col.header}`, onClick: () => onFilter?.(col.key), children: _jsx(Icon, { name: "filter", size: "small", iconStyle: "rounded" }) }), children: [filterOptionsFor(col).map((value) => (_jsx(MenuItem, { type: "checkbox", selected: chosen.includes(value), onSelectedChange: (on) => setFilter(col.key, on ? [...chosen.filter((v) => v !== value), value] : chosen.filter((v) => v !== value)), children: value }, value))), chosen.length ? _jsx(MenuItem, { leadingIcon: "close", onClick: () => setFilter(col.key, []), children: clearFilterLabel }) : null] }));
    };
    const settingsMenu = columnConfigure ? (_jsxs(TableMenu, { container: rootRef, align: "end", shape: shape, label: columnsLabel, trigger: _jsx(IconButton, { className: "zds-table__settings", flavour: "outline-subtle", size: "small", shape: shape, icon: "settings", label: columnsLabel }), children: [_jsxs(Menu.Group, { className: "zds-table__menu-group", children: [_jsx(Menu.GroupLabel, { className: "zds-table__menu-heading", children: showColumnsLabel }), columns.map((col) => {
                        const showing = !hidden.includes(col.key);
                        return (_jsx(MenuItem, { type: "checkbox", selected: showing, disabled: col.hideable === false || (showing && shown.length === 1), onSelectedChange: (on) => setColumnShown(col, on), children: col.header }, col.key));
                    })] }), _jsx(Divider, { className: "zds-table__menu-divider" }), _jsxs(Menu.Group, { className: "zds-table__menu-group", children: [_jsx(Menu.GroupLabel, { className: "zds-table__menu-heading", children: freezeColumnsLabel }), [{ label: noFrozenLabel, count: 0 }, ...shown.map((c, i) => ({ label: c.header, count: i + 1 }))].map((o) => (_jsx(MenuItem, { type: "radio", selected: frozen === o.count, onSelectedChange: () => setColumnSettings({ hiddenColumns: hidden, frozenColumns: o.count }), children: o.label }, o.count)))] })] })) : null;
    const digits = pageSizeOptions.length ? Math.max(...pageSizeOptions.map((n) => String(n).length)) : 0;
    return (_jsx(TableShapeContext.Provider, { value: shape, children: _jsxs("div", { ref: setRoot, ...rest, className: ["zds-table", className].filter(Boolean).join(" "), "data-shape": shape, "data-allow-disabled": allowDisabledSelection || undefined, children: [hasControl ? (_jsxs("div", { className: "zds-table__controls", children: [selectable ? (
                        // The live region is always there, so a count appearing is announced.
                        _jsx("div", { className: "zds-table__selected-count", role: "status", children: selected.length ? _jsx(BadgeLabel, { variant: "info", shape: shape, children: selectedCountFormat.replace("{count}", String(selected.length)) }) : null })) : null, showSearch ? (_jsx(Search, { className: "zds-table__search", shape: shape, size: "small", flavour: "default", "aria-label": searchPlaceholder, placeholder: searchPlaceholder, value: search, onValueChange: (v) => { setSearch(v); restart(); } })) : null, controls || settingsMenu ? _jsxs("div", { className: "zds-table__actions", children: [controls, settingsMenu] }) : null] })) : null, _jsx("div", { className: "zds-table__scroller", "data-scrolled": scrolled || undefined, "data-capped": capped || undefined, style: capped ? { maxBlockSize: len(maxHeight) } : undefined, onScroll: (e) => { hideTip(); setScrolled(e.currentTarget.scrollLeft > 0); }, children: _jsxs("table", { className: "zds-table__table", "data-sized": sized || undefined, style: sized ? {
                            inlineSize: lockedTotal(),
                            "--zds-table-select-width": locked.current.edges.select ? `${locked.current.edges.select}px` : undefined,
                            "--zds-table-actions-width": locked.current.edges.actions ? `${locked.current.edges.actions}px` : undefined,
                        } : undefined, onPointerOver: onPointerOver, onPointerLeave: hideTip, children: [caption ? _jsx("caption", { className: "zds-table__caption", children: caption }) : null, _jsxs("colgroup", { children: [selectable ? _jsx("col", { className: "zds-table__select-col" }) : null, shown.map((c) => _jsx("col", { style: widthOf(c) ? { width: widthOf(c) } : undefined }, c.key)), hasActions ? _jsx("col", { className: "zds-table__actions-col" }) : null] }), _jsx("thead", { children: _jsxs("tr", { ref: headRow, children: [selectable ? (_jsx("th", { scope: "col", className: "zds-table__th zds-table__select", "data-select": "", "data-frozen": edgeFrozen ? "" : undefined, style: edgeStyle, children: _jsx(Checkbox, { size: "medium", "aria-label": selectAllLabel, checked: enabledShown.length > 0 && selectedShown === enabledShown.length, indeterminate: selectedShown > 0 && selectedShown < enabledShown.length, disabled: enabledShown.length === 0, onCheckedChange: toggleAll }) })) : null, shown.map((c, i) => {
                                            const dir = sort?.key === c.key ? sort.direction : null;
                                            // Spec _Sort is a two-tone drawn vector; in code one glyph per state.
                                            const sortGlyph = dir === "ascending" ? "caret-up" : dir === "descending" ? "caret-down" : "caret-sort";
                                            const label = _jsx("span", { className: "zds-table__label", children: c.header });
                                            const w = widthOf(c);
                                            return (_jsxs("th", { scope: "col", "data-key": c.key, className: "zds-table__th", "aria-sort": c.sortable ? dir ?? "none" : undefined, "data-sorted": dir ?? undefined, "data-resizable": isResizable(c) || undefined, "data-resizing": resizing === c.key || undefined, style: { ...frozenStyle(i), ...(w ? { inlineSize: w, minInlineSize: w } : null) }, ...frozenAttrs(i), children: [_jsxs("span", { className: "zds-table__header", children: [c.sortable ? (_jsxs("button", { type: "button", className: "zds-table__sort", onClick: () => { setSort(nextSort(sort, c.key)); restart(); }, children: [label, _jsx(Icon, { className: "zds-table__sort-icon", name: sortGlyph, size: "small", iconStyle: "rounded" })] })) : label, c.filterable ? (clientSide ? filterMenu(c) : (_jsx("button", { type: "button", className: "zds-table__filter", "aria-label": `Filter ${c.header}`, onClick: () => onFilter?.(c.key), children: _jsx(Icon, { name: "filter", size: "small", iconStyle: "rounded" }) }))) : null] }), isResizable(c) && neighbours(c).length ? (_jsx("div", { className: "zds-table__resizer", role: "separator", "aria-orientation": "vertical", "aria-label": `Resize ${c.header}`, "aria-valuemin": minColumnWidth, "aria-valuenow": widths[c.key] !== undefined ? Math.round(widths[c.key]) : undefined, tabIndex: 0, onPointerDown: (e) => startResize(c, e), onDoubleClick: () => setWidth(c, null), onKeyDown: (e) => onResizeKey(c, e), onClick: (e) => e.stopPropagation() })) : null] }, c.key));
                                        }), hasActions ? (_jsx("th", { scope: "col", className: "zds-table__th zds-table__actions-cell", "data-actions": "", children: _jsx("span", { className: "zds-table__caption", children: actionsLabel }) })) : null] }) }), _jsx("tbody", { children: view.length ? view.map((r) => {
                                    const actionable = isActionable(r);
                                    const clickable = !!onRowClick && actionable;
                                    const rowSelected = selectable ? isSelected(r) : !!r.selected;
                                    const actions = actionsFor(r);
                                    return (_jsxs("tr", { className: "zds-table__tr", "aria-selected": rowSelected || undefined, "aria-disabled": isDisabled(r) || undefined, "data-clickable": clickable || undefined, onClick: clickable ? () => onRowClick(r) : undefined, children: [selectable ? (_jsx("td", { className: "zds-table__td zds-table__select", "data-frozen": edgeFrozen ? "" : undefined, style: edgeStyle, onClick: (e) => e.stopPropagation(), children: _jsx(Checkbox, { size: "medium", "aria-label": `${selectRowLabel}: ${rowName(r)}`, checked: isSelected(r), disabled: !actionable, onCheckedChange: () => actionable && setSelection([r], !isSelected(r)) }) })) : null, shown.map((c, i) => {
                                                const custom = renderCell?.(r, c);
                                                return (_jsx("td", { "data-key": c.key, className: "zds-table__td", style: frozenStyle(i), ...frozenAttrs(i), children: custom !== undefined ? _jsx("span", { className: "zds-table__custom", children: custom }) : _jsx(Cell, { value: r.cells[c.key] }) }, c.key));
                                            }), hasActions ? (_jsx("td", { className: "zds-table__td zds-table__actions-cell", onClick: (e) => e.stopPropagation(), children: actions.length ? (_jsx(TableMenu, { container: rootRef, align: "end", shape: shape, label: actionsLabel, trigger: _jsx(IconButton, { flavour: "subtle", size: "small", shape: shape, icon: "more-vertical", label: `${actionsLabel}: ${rowName(r)}`, disabled: !actionable }), children: actions.map((a) => (_jsx(MenuItem, { leadingIcon: a.icon, disabled: a.disabled, onClick: () => { if (!a.disabled)
                                                            onRowAction?.(a.key, r, rows.indexOf(r)); }, children: a.label }, a.key))) })) : null })) : null] }, r.key));
                                }) : (_jsx("tr", { className: "zds-table__tr zds-table__empty", children: _jsx("td", { className: "zds-table__td", colSpan: colCount, children: emptyLabel }) })) })] }) }), hasFooter ? (_jsxs("div", { className: "zds-table__footer", children: [_jsxs("div", { className: "zds-table__footer-start", children: [summary ? _jsx("span", { className: "zds-table__page-details", "aria-live": "polite", children: summary }) : null, pageSizeOptions.length ? (_jsxs("span", { className: "zds-table__page-size", children: [_jsx("span", { className: "zds-table__page-size-label", "aria-hidden": "true", children: pageSizeLabel }), _jsx("span", { className: "zds-table__page-size-select", style: { "--zds-table-digits": digits }, children: _jsx(Select, { size: "small", compact: true, shape: shape, "aria-label": pageSizeLabel, portalContainer: rootRef, options: pageSizeOptions.map((n) => ({ value: String(n) })), value: String(pageSize), onValueChange: (v) => { const n = Number(v); if (n && n !== pageSize) {
                                                    setPageSize(n);
                                                    setPage(1);
                                                } } }) })] })) : null] }), pagination ? _jsx("div", { className: "zds-table__pagination", children: pagination })
                            : _jsx(Pagination, { className: "zds-table__pagination", outline: true, rounded: shape === "rounded", page: shownPage, pageCount: pages, onPageChange: setPage })] })) : null, tip ? (_jsx("div", { ref: tipEl, className: "zds-table__tip", "aria-hidden": "true", style: { left: tipPlace?.left ?? 0, top: tipPlace?.top ?? 0, visibility: tipPlace ? undefined : "hidden" }, children: _jsx(Tooltip, { point: tipPlace?.point ?? "bottom", shape: shape, children: tip.text }) })) : null] }) }));
});
