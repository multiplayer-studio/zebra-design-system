import { css } from "lit";

/* Spec: specs/table. The table renders in the light DOM, so these rules are injected once into the document.

   Top to bottom: the controls bar, the content and the footer, with no gap. The bars sit on surface/section with
   space/md by space/lg padding. Header cells are label/medium on interactive/neutral/background/default with a
   stroke/thin border/default line above and below, the two sort carets right after the label (foreground/tertiary,
   foreground/cursor for the active direction) and the filter glyph at the end, shown on hover, focus or while a
   filter is applied. Data cells are 60 tall (control/sm plus space/md above and below; the spec measures 60 with no
   token), space/lg by space/md, body/small, with a border/subtle line below, hover and selected on the neutral tokens.
   Rounded clips the table to radius/element-md and gives every control inside its rounded option; sharp squares
   both. The table carries no border or shadow of its own.

   Search, the toolbar buttons, the checkboxes, the row buttons and the pagination are the Zeta components themselves.
   The rest (column search row, column and filter panels, resize handles, frozen columns, nested rows, row actions
   menu, tooltip) are Zeta's own features, drawn on the same tokens. */
export default css`
  zeta-table-legacy {
    display: block;
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--table-font-size, var(--body-small-font-size));
    color: var(--foreground-primary);

    /* Layout */
    --table-width: 100%;
    --table-max-height: none;
    --table-border-color: var(--zebra-border-default);
    --table-border-radius: var(--radius-element-md);
    --table-control-radius: var(--radius-sm);

    /* Header */
    --table-header-bg: var(--interactive-neutral-background-default);
    --table-header-text: var(--foreground-primary);
    --table-header-font-size: var(--label-medium-font-size);
    --table-header-font-weight: var(--label-medium-font-weight);
    --table-header-height: auto;
    --table-header-border-bottom: var(--stroke-thin) solid var(--table-border-color);

    /* Rows */
    --table-row-height: calc(var(--control-sm) + 2 * var(--space-md));
    --table-row-bg: var(--interactive-neutral-background-default);
    --table-row-hover-bg: var(--interactive-neutral-background-hover);
    --table-row-selected-bg: var(--interactive-neutral-background-selected);
    --table-row-active-bg: var(--interactive-neutral-background-selected);
    --table-row-clickable-cursor: pointer;

    /* Cells */
    --table-cell-padding-y: var(--space-md);
    --table-cell-padding-x: var(--space-lg);
    --table-cell-padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
    --table-cell-font-size: var(--body-small-font-size);

    /* Frozen columns: a horizontal Shadow/medium (spec warn: the Figma style swaps its offsets) */
    --table-frozen-shadow: var(--shadow-medium-y) 0 var(--shadow-medium-blur) var(--shadow-soft);

    /* Sort carets */
    --table-sort-active-color: var(--foreground-cursor);
    --table-sort-inactive-color: var(--foreground-tertiary);

    /* Resize */
    --table-resize-handle-color: var(--border-focus);

    /* Bars */
    --table-toolbar-bg: var(--surface-section);
    --table-footer-bg: var(--surface-section);

    /* Data count badge (Zeta only) */
    --table-data-count-bg: var(--interactive-neutral-background-selected);
    --table-data-count-color: var(--foreground-primary);
  }

  zeta-table-legacy:not([rounded]) {
    --table-border-radius: var(--zebra-radius-none);
    --table-control-radius: var(--zebra-radius-none);
  }

  .zeta-table-wrapper {
    display: flex;
    flex-direction: column;
    width: var(--table-width);
    border-radius: var(--table-border-radius);
    overflow: hidden;
    background: var(--table-row-bg);
  }

  /* ---- controls bar --------------------------------------------------------------------------------------- */
  .zeta-table-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    background: var(--table-toolbar-bg);
  }

  /* Zeta's title, data count and selection summary sit on the open left side of the bar. */
  .zeta-table-header-bar-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
    min-width: 0;
  }

  .zeta-table-header-meta {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .zeta-table-title {
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
    color: var(--table-header-text);
  }

  .zeta-table-selection-info {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  /* The search field and the controls slot align to the end, space/sm apart. */
  .zeta-table-header-bar-right {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-left: auto;
  }

  .zeta-table-global-search {
    width: 280px;
    max-width: 100%;
  }

  /* ---- column configure panel (Zeta only) -------------------------------------------------------------------- */
  .zeta-table-column-panel-wrapper {
    position: relative;
  }

  .zeta-table-column-panel {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
    min-width: 240px;
    max-height: 400px;
    overflow-y: auto;
    margin-top: var(--space-2xs);
    padding: var(--space-2xs) 0;
    border-radius: var(--table-control-radius);
    background: var(--surface-overlay);
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }

  .zeta-table-column-panel-section {
    padding: var(--space-2xs) 0;
  }

  .zeta-table-column-panel-section + .zeta-table-column-panel-section {
    border-top: var(--stroke-thin) solid var(--table-border-color);
  }

  .zeta-table-column-panel-heading {
    padding: var(--space-xs) var(--space-md);
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  /* Rows are Zeta Checkboxes carrying their own label. */
  .zeta-table-column-panel-item,
  .zeta-table-filter-panel-item {
    display: flex;
    padding: 0 var(--space-xs);
  }

  /* ---- content ------------------------------------------------------------------------------------------------ */
  .zeta-table-scroll {
    position: relative;
    max-height: var(--table-max-height);
    overflow: auto;
    overflow-anchor: auto;
  }

  .zeta-table-legacy {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
  }

  .zeta-table-thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .zeta-table-th,
  .zeta-table-td {
    position: relative;
    box-sizing: border-box;
    padding: var(--table-cell-padding);
    border-bottom: var(--stroke-thin) solid var(--zebra-border-subtle);
    text-align: left;
    vertical-align: middle;
  }

  /* Header cell: label/medium with border/default above and below. */
  .zeta-table-th {
    height: var(--table-header-height);
    border-top: var(--stroke-thin) solid var(--table-border-color);
    border-bottom: var(--table-header-border-bottom);
    background: var(--table-header-bg);
    color: var(--table-header-text);
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--table-header-font-size);
    font-weight: var(--table-header-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    white-space: nowrap;
    user-select: none;
  }

  .zeta-table-header-content {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    width: 100%;
  }

  .zeta-table-header-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button.zeta-table-header-title--sortable {
    all: unset;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  button.zeta-table-header-title--sortable:focus-visible,
  .zeta-table-sort-btn:focus-visible,
  .zeta-table-header-icon-btn:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thin);
  }

  /* Two carets, each its own colour (spec: _Sort). */
  .zeta-table-sort-btn {
    all: unset;
    display: inline-flex;
    flex: none;
    cursor: pointer;
  }

  .zeta-table-sort-icons {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--stroke-thick);
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    align-items: center;
  }

  .zeta-table-sort-arrow {
    display: block;
    width: var(--space-sm);
    height: var(--space-xs);
    cursor: pointer;
  }

  .zeta-table-sort-arrow polygon {
    fill: var(--table-sort-inactive-color);
  }

  .zeta-table-sort-btn:hover .zeta-table-sort-arrow polygon {
    fill: var(--foreground-secondary);
  }

  .zeta-table-sort-btn .zeta-table-sort-arrow--active polygon {
    fill: var(--table-sort-active-color);
  }

  /* The filter glyph sits at the end and shows on hover, focus or while a filter is applied (spec: _Header Cell). */
  .zeta-table-header-icon-btn {
    all: unset;
    position: absolute;
    top: 50%;
    right: var(--space-lg);
    display: inline-flex;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
    --icon-size: var(--control-icon-sm);
    --icon-color: currentColor;
  }

  .zeta-table-th:hover .zeta-table-header-icon-btn,
  .zeta-table-th:focus-within .zeta-table-header-icon-btn,
  .zeta-table-header-icon-btn--active {
    visibility: visible;
  }

  .zeta-table-header-icon-btn--active {
    color: var(--foreground-link);
  }

  /* Header cell hover is the neutral hover fill. */
  .zeta-table-header-row .zeta-table-th:hover {
    background: var(--interactive-neutral-background-hover);
  }

  /* Data cell */
  .zeta-table-td {
    background: var(--table-row-bg);
    font-size: var(--table-cell-font-size);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }

  .zeta-table-td--data {
    padding: 0;
  }

  .zeta-table-cell-inner {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    height: var(--table-row-height);
    padding: var(--table-cell-padding);
    overflow: hidden;
  }

  .zeta-table-cell-content {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: inherit;
  }

  /* ---- row states --------------------------------------------------------------------------------------------- */
  .zeta-table-row:hover .zeta-table-td {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-row--clickable,
  .zeta-table-row--clickable .zeta-table-td {
    cursor: var(--table-row-clickable-cursor);
  }

  .zeta-table-row--selected .zeta-table-td,
  .zeta-table-row--clickable:active .zeta-table-td {
    background: var(--table-row-selected-bg);
  }

  /* The last-clicked row: the selected fill with a stroke/thick border/focus outline (Zeta only). */
  .zeta-table-row--active .zeta-table-td {
    background: var(--table-row-active-bg);
    box-shadow:
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  .zeta-table-row--active .zeta-table-td:first-child {
    box-shadow:
      inset var(--stroke-thick) 0 0 0 var(--border-focus),
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  .zeta-table-row--active .zeta-table-td:last-child {
    box-shadow:
      inset calc(-1 * var(--stroke-thick)) 0 0 0 var(--border-focus),
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  .zeta-table-row--active .zeta-table-cell--frozen-last {
    box-shadow:
      var(--table-frozen-shadow),
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  /* Disabled rows dim their content to foreground/disabled (spec warn: Figma leaves it enabled). */
  .zeta-table-row--disabled .zeta-table-td,
  .zeta-table-row--disabled .zeta-table-cell-content {
    color: var(--foreground-disabled);
  }

  /* ---- frozen columns ----------------------------------------------------------------------------------------- */
  .zeta-table-cell--frozen {
    position: sticky;
    z-index: 8;
    background: var(--table-row-bg);
  }

  .zeta-table-row:hover .zeta-table-cell--frozen {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-row--selected .zeta-table-cell--frozen {
    background: var(--table-row-selected-bg);
  }

  .zeta-table-row--active .zeta-table-cell--frozen {
    background: var(--table-row-active-bg);
  }

  .zeta-table-thead .zeta-table-cell--frozen {
    z-index: 16;
    background: var(--table-header-bg);
  }

  /* The frozen edge: a stroke/thin border/default line and the horizontal shadow. */
  .zeta-table-cell--frozen-last {
    border-right: var(--stroke-thin) solid var(--table-border-color);
    box-shadow: var(--table-frozen-shadow);
    clip-path: inset(0 -10px 0 0);
  }

  .zeta-table-cell--frozen-start {
    left: 0;
  }

  .zeta-table-cell--frozen-after-checkbox {
    left: calc(var(--control-target-min) + 2 * var(--space-lg));
  }

  .zeta-table-col-checkbox.zeta-table-cell--frozen-start {
    z-index: 16;
  }

  /* ---- checkbox and expand columns ---------------------------------------------------------------------------- */
  .zeta-table-col-checkbox-width {
    width: calc(var(--control-target-min) + 2 * var(--space-lg));
  }

  .zeta-table-col-expand-width {
    width: calc(var(--control-sm) + 2 * var(--space-2xs));
  }

  .zeta-table-col-checkbox {
    padding: 0 var(--space-lg);
    text-align: left;
  }

  .zeta-table-checkbox {
    vertical-align: middle;
  }

  .zeta-table-col-expand {
    padding: 0 var(--space-2xs);
    text-align: center;
  }

  .zeta-table-expand-btn zeta-icon {
    transition: transform var(--animations-smooth, 0.2s);
  }

  .zeta-table-expand-btn--expanded {
    transform: rotate(90deg);
  }

  /* ---- nested rows (Zeta only) -------------------------------------------------------------------------------- */
  .zeta-table-nested-row .zeta-table-td {
    padding: 0;
  }

  .zeta-table-nested-content {
    padding: var(--space-md) var(--space-lg) var(--space-md) calc(2 * var(--space-2xl));
    background: var(--table-row-bg);
  }

  .zeta-table-nested-table {
    width: 100%;
    border-collapse: collapse;
  }

  .zeta-table-nested-th {
    padding: var(--space-xs) var(--space-md);
    border-bottom: var(--stroke-thin) solid var(--table-border-color);
    text-align: left;
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
  }

  .zeta-table-nested-td {
    padding: var(--space-xs) var(--space-md);
    border-bottom: var(--stroke-thin) solid var(--zebra-border-subtle);
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  /* ---- column search row (Zeta only): small Zeta Search fields ----------------------------------------------------- */
  .zeta-table-search-row .zeta-table-th {
    height: auto;
    padding: var(--space-2xs) var(--space-lg) var(--space-sm);
    border-top: none;
  }

  .zeta-table-search-row .zeta-table-th {
    overflow: hidden;
  }

  .zeta-table-search-input {
    display: flex;
    width: 100%;
    min-width: 0;
  }

  /* ---- resize handle (Zeta only) ------------------------------------------------------------------------------ */
  .zeta-table-resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
    width: var(--space-sm);
    height: 100%;
    cursor: col-resize;
  }

  .zeta-table-resize-handle::after {
    content: "";
    position: absolute;
    top: 25%;
    right: var(--space-3xs);
    width: var(--stroke-thick);
    height: 50%;
    border-radius: var(--radius-pill);
    background: transparent;
    transition:
      background 0.15s,
      height 0.15s,
      top 0.15s;
  }

  .zeta-table-th:hover .zeta-table-resize-handle::after {
    background: var(--table-border-color);
  }

  .zeta-table-resize-handle:hover::after,
  .zeta-table-resize-handle--active::after {
    top: 10%;
    height: 80%;
    background: var(--table-resize-handle-color);
  }

  /* ---- footer: the page summary and the Pagination --------------------------------------------------------- */
  .zeta-table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    background: var(--table-footer-bg);
    color: var(--foreground-secondary);
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  .zeta-table-page-info {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  /* Rows per page (Zeta only): a small Zeta Select. */
  .zeta-table-page-size {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .zeta-table-pagination {
    flex: none;
  }

  /* ---- infinite scroll, empty state ------------------------------------------------------------------------- */
  .zeta-table-infinite-sentinel {
    width: 100%;
    height: 1px;
    overflow-anchor: none;
  }

  .zeta-table-loading-row {
    overflow-anchor: none;
  }

  .zeta-table-loading-row .zeta-table-td,
  .zeta-table-no-data {
    padding: var(--space-xl) var(--space-lg);
    text-align: center;
    color: var(--foreground-secondary);
    font: var(--text-body-small);
  }

  /* ---- cell tooltip (Zeta only): a Zeta Tooltip, placed at the pointer ----------------------------------- */
  .zeta-table-tooltip {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }

  .zeta-table-tooltip--visible {
    opacity: 1;
  }

  /* ---- row actions (Zeta only) -------------------------------------------------------------------------------- */
  .zeta-table-col-actions {
    position: sticky;
    right: 0;
    width: calc(var(--control-sm) + 2 * var(--space-lg));
    padding: 0 var(--space-lg);
    text-align: center;
  }

  .zeta-table-thead .zeta-table-col-actions {
    z-index: 16;
    background: var(--table-header-bg);
  }

  .zeta-table-action-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* The actions menu and the filter panel float on surface/overlay with Shadow/medium, as Dropdown Menu does. */
  .zeta-table-action-menu,
  .zeta-table-filter-panel {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    border-radius: var(--table-control-radius);
    background: var(--surface-overlay);
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }

  /* Rows are Zeta Dropdown Menu Items, space/2xs apart as in Dropdown Menu. */
  .zeta-table-action-menu {
    min-width: 160px;
    max-height: 200px;
    overflow-y: auto;
    gap: var(--space-2xs);
    padding: var(--space-2xs);
  }

  .zeta-table-filter-panel {
    min-width: 200px;
    max-width: 280px;
    max-height: 320px;
    overflow: hidden;
  }

  .zeta-table-filter-panel-header {
    padding: var(--space-sm) var(--space-md);
    border-bottom: var(--stroke-thin) solid var(--table-border-color);
    color: var(--foreground-primary);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  .zeta-table-filter-panel-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-2xs) 0;
  }

  .zeta-table-filter-panel-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    border-top: var(--stroke-thin) solid var(--table-border-color);
  }
`;
