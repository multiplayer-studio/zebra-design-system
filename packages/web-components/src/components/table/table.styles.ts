import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. No fixed
 * width: the spec's 979px is a Figma sample, so the table takes its
 * container's width and scrolls horizontally inside it when the columns need
 * more. Controls bar and footer hug their content (spec warn: the "fixed 60px"
 * in the metadata is a measurement, both hug in the file); data cells have no
 * fixed height for the same reason (the 60px there is untokened).
 *
 * The file follows the spec's subcomponents top to bottom: Table Controls,
 * Table Content (_Header Cell, _Label, _Sort, _Data Cell, _Avatar and text,
 * _Select Cell, _Actions Cell, _Empty Row, frozen columns, resizing, vertical
 * scroll), Table Footer, then the parts that float: _Table Menu and the
 * truncation tooltip.
 *
 * No transitions: the spec defines no motion.
 *
 * Spec: specs/table/table.spec.json
 */
export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--space-none);
    min-inline-size: 0;
    box-sizing: border-box;
    color: var(--foreground-primary);
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- shape ------------------------------------------------------------
     rounded: the table's outer corners take radius/element-md and clip its
     content, so the bars and cells follow the curve; they keep square
     corners of their own. sharp: square (spec gap: Figma leaves it a raw 0,
     radius/none is the token for it). */
  :host([shape="rounded"]) {
    border-radius: var(--radius-element-md);
    overflow: clip;
  }
  :host([shape="sharp"]) {
    border-radius: var(--radius-none);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* ---- Table Controls / Table Footer: shared bar ---------------------- */
  .controls,
  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    background: var(--surface-section);
  }

  /* ---- Table Controls ------------------------------------------------- */
  .controls {
    justify-content: flex-end;
  }

  /* The selected count (Badge Label, info) holds the bar's start; the search
     and controls stay at its end. */
  .selected-count {
    display: flex;
    align-items: center;
    margin-inline-end: auto;
  }

  /* The search keeps its start width and gives way when the bar is tight. */
  .controls zds-search {
    flex: 0 1 auto;
  }

  .controls-slot {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* ---- Table Footer --------------------------------------------------- */
  .footer {
    justify-content: space-between;
  }

  /* The footer's start: the summary, then rows per page. */
  .footer-start {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
    min-inline-size: 0;
  }

  .page-size {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .page-size-label {
    font-family: var(--body-small-font-family);
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
    white-space: nowrap;
  }

  /* The value can't size the field (it truncates), so the field is sized from
     the widest option: its digits, the field's padding, the gap and the
     chevron. The list grows to fit its rows. */
  .page-size zds-select {
    --zds-select-field-min-inline-size: calc(var(--digits) * 1ch + 2 * var(--space-md) + var(--space-2xs) + var(--control-icon-sm));
    --zds-select-list-min-inline-size: max-content;
    inline-size: max-content;
    font-variant-numeric: tabular-nums;
  }

  .page-details {
    margin: 0;
    font-family: var(--body-small-font-family);
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  .pagination-slot {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    /* Stays at the inline end when there is no page summary. */
    margin-inline-start: auto;
  }

  /* ---- Table Content -------------------------------------------------- */
  .scroller {
    overflow-x: auto;
    overflow-y: visible;
  }

  /* verticalScroll (max-height): rows scroll inside the content under a header
     that sticks to its top. The header sits above the body, its frozen cells
     above both, so a frozen corner stays put whichever way it scrolls. */
  .scroller[data-capped] {
    overflow-y: auto;
  }
  .scroller[data-capped] thead th {
    position: sticky;
    inset-block-start: 0;
    z-index: 3;
  }
  .scroller[data-capped] thead th.frozen {
    z-index: 4;
  }
  .scroller[data-capped] thead th.frozen:not(.frozen-last) {
    z-index: 5;
  }

  table {
    /* separate, not collapse: sticky cells keep their own borders only in
       the separate model. */
    border-collapse: separate;
    border-spacing: 0;
    /* max-content, not 100%: a 100%-wide table squeezes the set column
       widths, which throws the frozen sticky offsets out. It grows past the
       container instead and the scroller scrolls; min 100% fills it when the
       columns are narrower. */
    inline-size: max-content;
    min-inline-size: 100%;
  }

  /* Once a column is resized every column holds its own width and the table
     their total: a resize only moves width between columns, and fixed layout
     lands each one exactly. Narrow content clips and ends in an ellipsis; a
     header clips its contents, not itself, so the resize grip still reaches
     over the cell's borders. */
  table[data-sized] {
    min-inline-size: 0;
    table-layout: fixed;
  }
  table[data-sized] td,
  table[data-sized] .head {
    overflow: hidden;
  }
  table[data-sized] td {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  table[data-sized] .head,
  table[data-sized] .sort,
  table[data-sized] .titles {
    min-inline-size: 0;
  }
  table[data-sized] .text {
    display: block;
  }
  table[data-sized] .label,
  table[data-sized] .text,
  table[data-sized] .title,
  table[data-sized] .subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Visually hidden: the caption and the actions header's name. */
  .sr,
  caption {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  th,
  td {
    /* A set column width includes the padding. */
    box-sizing: border-box;
    padding: var(--space-md) var(--space-lg);
    background: var(--zds-table-cell-bg);
    text-align: start;
    vertical-align: middle;
  }

  /* ---- _Header Cell --------------------------------------------------- */
  th {
    --zds-table-cell-bg: var(--interactive-neutral-background-default);
    border-block: var(--stroke-thin) solid var(--border-default);
    font-weight: inherit;
  }

  th:hover {
    --zds-table-cell-bg: var(--interactive-neutral-background-hover);
  }

  /* Keyboard focus on the sort or filter button marks the whole cell. */
  th:has(:focus-visible) {
    --zds-table-cell-bg: var(--interactive-neutral-background-focused);
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  .head {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
  }

  /* ---- _Label --------------------------------------------------------- */
  .label {
    font-family: var(--label-medium-font-family);
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
  }

  /* The sort control covers the label and glyph and grows to the cell. */
  .sort {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    min-inline-size: 0;
  }

  .head > .label {
    flex: 1 1 auto;
  }

  /* ---- _Sort ---------------------------------------------------------- */
  /* Figma's _Sort is a two-tone vector (each caret its own colour). The code
     version draws one glyph per state: caret-sort unsorted, caret-up /
     caret-down once sorted (spec note: caret-sort can't colour its carets
     separately). */
  .sort-glyph {
    flex: none;
    color: var(--foreground-tertiary);
  }

  .sort:hover .sort-glyph {
    color: var(--foreground-secondary);
  }

  /* Spec warn: the active direction is bound to foreground/cursor, the
     text-caret token, not an interactive or brand token. Kept as specced. */
  th[aria-sort="ascending"] .sort-glyph,
  th[aria-sort="descending"] .sort-glyph {
    color: var(--foreground-cursor);
  }

  /* ---- trailing filter glyph ------------------------------------------ */
  /* Shown only on hover and focus (spec: _Header Cell shows the filter glyph
     on hover/focus). Opacity, not display, so it stays in the a11y tree and
     reachable by Tab — focusing it reveals it through :focus-within. */
  .filter {
    flex: none;
    display: inline-flex;
    margin-inline-start: auto;
    color: var(--foreground-primary);
    opacity: 0;
  }

  th:hover .filter,
  th:focus-within .filter,
  .filter.active,
  .filter[aria-expanded="true"] {
    opacity: 1;
  }

  /* _Label Filtered: a filtered column keeps its glyph showing, coloured as
     the active sort glyph is. */
  .filter.active {
    color: var(--foreground-cursor);
  }

  /* ---- _Header Cell Resize ---------------------------------------------- */
  /* A grip on the trailing edge, over the cell's own borders so it runs the
     full height. Hover shows interactive/neutral/border/hover; it stays while
     dragging; keyboard focus draws border/focus. */
  th.resizable:not(.frozen) {
    position: relative;
  }
  .resizer {
    position: absolute;
    inset-block: calc(-1 * var(--stroke-thin));
    inset-inline-end: 0;
    inline-size: var(--space-sm);
    cursor: col-resize;
    touch-action: none;
    outline: none;
    z-index: 1;
  }
  .resizer::after {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    inline-size: var(--stroke-thick);
  }
  .resizer:hover::after,
  th.resizing .resizer::after {
    background: var(--interactive-neutral-border-hover);
  }
  .resizer:focus-visible::after {
    background: var(--border-focus);
  }
  :host(:has(th.resizing)) {
    user-select: none;
    cursor: col-resize;
  }

  /* ---- _Data Cell ----------------------------------------------------- */
  td {
    --zds-table-cell-bg: var(--interactive-neutral-background-default);
    border-block-end: var(--stroke-thin) solid var(--border-subtle);
    font-family: var(--body-small-font-family);
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-primary);
  }

  tbody tr:not([aria-disabled="true"], .empty):hover td {
    --zds-table-cell-bg: var(--interactive-neutral-background-hover);
  }

  tbody tr[aria-selected="true"] td {
    --zds-table-cell-bg: var(--interactive-neutral-background-selected);
  }

  /* Disabled: one state across the row (spec _Data Cell). Every cell, frozen
     ones included, keeps the plain fill (a disabled fill would hide the row's
     disabled checkbox), text turns foreground/disabled, and avatars and
     slotted content dim. No opacity token exists, so 0.5 is raw (spec gap). */
  tbody tr[aria-disabled="true"] td {
    --zds-table-cell-bg: var(--interactive-neutral-background-default);
    color: var(--foreground-disabled);
  }
  tbody tr[aria-disabled="true"] zds-avatar,
  tbody tr[aria-disabled="true"] td ::slotted(*) {
    opacity: 0.5;
    filter: grayscale(1);
  }
  /* Slotted controls in a disabled row don't take the pointer, unless
     disabled rows are open to selection. */
  :host(:not([allow-disabled-selection])) tbody tr[aria-disabled="true"] td ::slotted(*) {
    pointer-events: none;
  }

  :host([data-clickable]) tbody tr:not([aria-disabled="true"], .empty),
  :host([data-clickable][allow-disabled-selection]) tbody tr[aria-disabled="true"] {
    cursor: pointer;
  }

  /* ---- _Select Cell / _Actions Cell ---------------------------------------- */
  /* Fixed edge columns; the checkbox's or button's own target sets the row
     height. After a resize they keep the width they were locked at. */
  .select-col,
  th.select,
  td.select {
    inline-size: var(--select-width, calc(var(--control-target-min) + 2 * var(--space-md)));
  }
  .actions-col,
  th.actions,
  td.actions {
    inline-size: var(--actions-width, calc(var(--control-target-min) + 2 * var(--space-md)));
  }
  th.select,
  td.select,
  th.actions,
  td.actions {
    padding-block: 0;
    padding-inline: var(--space-md);
  }
  th.actions,
  td.actions {
    text-align: end;
  }

  /* ---- _Empty Row -------------------------------------------------------- */
  tr.empty td {
    text-align: center;
    color: var(--foreground-secondary);
  }

  /* ---- _Avatar and text ----------------------------------------------- */
  .avatar-text {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .avatar-text zds-avatar {
    flex: none;
  }

  .titles {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
  }

  .title {
    color: var(--foreground-primary);
  }

  .subtitle {
    font-family: var(--body-xsmall-font-family);
    font-size: var(--body-xsmall-font-size);
    font-weight: var(--body-xsmall-font-weight);
    line-height: var(--body-xsmall-line-height);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
  }

  tr[aria-disabled="true"] .title,
  tr[aria-disabled="true"] .subtitle {
    color: var(--foreground-disabled);
  }

  /* ---- Table Content: columnPosition=frozen --------------------------- */
  .frozen {
    position: sticky;
    /* inset-inline-start is set per cell from the preceding column widths. */
    z-index: 1;
  }

  /* Earlier frozen columns sit above the last one, so its shadow blur falls
     only on the scrolling side. */
  .frozen:not(.frozen-last) {
    z-index: 2;
  }

  .frozen-last {
    border-inline-end: var(--stroke-thin) solid var(--border-default);
  }

  /* Shadow/medium-horizontal, cast once the columns have scrolled under the
     frozen ones. Spec warn: Figma binds offsetX to shadow/medium/y and
     offsetY to shadow/medium/x (same for small) — that swap is what makes it
     horizontal, and no horizontal-offset tokens exist, so it is kept. */
  .scroller[data-scrolled] .frozen-last {
    box-shadow:
      var(--shadow-medium-y) var(--shadow-medium-x) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-y) var(--shadow-small-x) var(--shadow-small-blur) var(--shadow-soft);
    /* Each row's cell casts its own shadow, and its blur bleeds up onto the
       row above (painted earlier at the same z-index), leaving a smudge at
       every row boundary. Clip to the inline-end side only; the large extent
       is just "unclipped", not a design value. */
    clip-path: inset(0 -100vw 0 0);
  }

  /* inline-end is the left in RTL. */
  :host(:dir(rtl)) .scroller[data-scrolled] .frozen-last {
    clip-path: inset(0 0 0 -100vw);
  }

  /* ---- _Table Menu --------------------------------------------------------- */
  /* A manual popover in the top layer at the position the table sets, holding
     a compact zds-dropdown-menu; the UA popover box is undone. */
  .menu[popover] {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    overflow: visible;
    color: inherit;
  }
  .menu [role="group"] {
    display: flex;
    flex-direction: column;
  }
  .menu-heading {
    padding: var(--space-xs) var(--space-md) var(--space-2xs);
    font-family: var(--label-small-font-family);
    font-size: var(--label-small-font-size);
    font-weight: var(--label-small-font-weight);
    line-height: var(--label-small-line-height);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-secondary);
  }
  .menu-divider {
    margin-block: var(--space-xs);
  }
`;
