import { css } from "lit";

/* Spec: specs/table, kept in step with packages/web-components zds-table. No fixed width: the 979 is Figma's sample,
   so the table takes its container's width and scrolls inside it when the columns need more. The bars and cells hug
   their content: the metadata's fixed 60 heights are measurements (spec warn). No transitions: the spec defines no
   motion. border/default, border/subtle and radius/none are names the legacy set also defines, so they are read
   through their --zebra- aliases. Top to bottom: Table Controls, Table Content (_Header Cell, _Label, _Sort, _Data
   Cell, _Avatar and text, frozen columns), Table Footer. */
export default css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-width: 0;
    color: var(--foreground-primary);
  }

  :host([hidden]) {
    display: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* ---- shape: rounded clips the table to radius/element-md; the bars and cells stay square inside it ---- */
  :host([rounded]) {
    border-radius: var(--radius-element-md);
    overflow: clip;
  }

  :host(:not([rounded])) {
    border-radius: var(--zebra-radius-none);
  }

  /* Outranks Contourable's :host > * radius: only the table's outer edge rounds. */
  :host .controls,
  :host .scroller,
  :host .footer {
    border-radius: var(--zebra-radius-none);
  }

  /* ---- Table Controls and Table Footer: the shared bar ---- */
  .controls,
  .footer {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    background: var(--surface-section);
  }

  /* The search field and the controls slot align to the end. */
  .controls {
    justify-content: flex-end;
  }

  /* The selected-rows count holds the bar's start; the search and controls stay at its end. */
  .selected-count {
    display: flex;
    align-items: center;
    margin-inline-end: auto;
  }

  .controls zeta-search {
    flex: 0 1 auto;
  }

  .controls-slot {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* ---- Table Footer: the summary and the pagination push to opposite ends ---- */
  .footer {
    justify-content: space-between;
  }

  .page-details {
    margin: 0;
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  /* The footer's start: the summary, then rows per page, aligned with the content's leading edge. */
  .footer-start {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
    min-width: 0;
  }

  /* Rows per page (Zeta only): a small Select Input, only as wide as its values and chevron need. */
  .page-size {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .page-size-label {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
    white-space: nowrap;
  }

  /* The value can't size the field (it truncates by design), so the field is sized from the widest option: its digits,
     the field's padding, the text's inset, the gap and the chevron. The panel grows to fit its rows. */
  .page-size zeta-select-input {
    --select-input-min-width: calc(var(--_digits) * 1ch + 2 * var(--space-md) + 3 * var(--space-2xs) + var(--control-icon-sm));
    --select-input-options-min-width: max-content;
    inline-size: max-content;
    font-variant-numeric: tabular-nums;
  }

  .pagination-slot {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-left: auto;
  }

  /* ---- Table Content ---- */
  .scroller {
    overflow-x: auto;
    overflow-y: visible;
  }

  /* maxHeight: the rows scroll vertically inside the content, under a header that sticks to its top. The header sits
     above the body, and its frozen cells above both, so a frozen corner stays put whichever way the content scrolls. */
  .scroller[data-capped] {
    overflow-y: auto;
  }

  .scroller[data-capped] thead th {
    position: sticky;
    top: 0;
    z-index: 3;
  }

  .scroller[data-capped] thead th.frozen {
    z-index: 4;
  }

  .scroller[data-capped] thead th.frozen:not(.frozen-last) {
    z-index: 5;
  }

  /* separate, so sticky cells keep their borders; max-content so set widths are never squeezed (the frozen offsets
     depend on them), at least as wide as the container. */
  table {
    border-collapse: separate;
    border-spacing: 0;
    width: max-content;
    min-width: 100%;
  }

  /* Once a column is resized every column holds its own width and the table holds their total, the width it had: a
     resize only moves width between columns, and fixed layout lands each one exactly. */
  table[data-sized] {
    min-width: 0;
    table-layout: fixed;
  }

  /* Fixed layout lets a column go narrower than its content, which then clips; a header label ends in an ellipsis. */
  /* A header clips its contents, not itself, so the resize grip can still reach over the cell's borders. */
  table[data-sized] td,
  table[data-sized] .head {
    overflow: hidden;
  }

  table[data-sized] .head,
  table[data-sized] .sort {
    min-width: 0;
  }

  table[data-sized] .label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Data keeps its row height in a narrow column: text and avatar titles stay on one line and end in an ellipsis. */
  table[data-sized] td {
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  table[data-sized] .titles {
    min-width: 0;
  }

  table[data-sized] .text,
  table[data-sized] .title,
  table[data-sized] .subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  table[data-sized] .text {
    display: block;
  }

  /* Selection: a checkbox column ahead of the columns. The checkbox's own target sets the row height. */
  .select-col,
  th.select,
  td.select {
    width: var(--_select-width, calc(var(--control-target-min) + 2 * var(--space-md)));
  }

  th.select,
  td.select {
    padding-block: 0;
    padding-inline: var(--space-md);
  }

  /* Row actions: a trailing column holding a small subtle more button per row. */
  .actions-col,
  th.actions,
  td.actions {
    width: var(--_actions-width, calc(var(--control-target-min) + 2 * var(--space-md)));
  }

  th.actions,
  td.actions {
    padding-block: 0;
    padding-inline: var(--space-md);
    text-align: end;
  }

  /* The actions menu sits in the top layer as a popover; undo the browser's popover box so the panel keeps its own
     surface and the position zeta-droppable sets. */
  /* The truncation tooltip: in the top layer at the position the table sets, the browser's popover box undone. */
  .cell-tip[popover] {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    color: inherit;
    pointer-events: none;
  }

  /* zeta-tooltip sets its own display, which outranks the browser's hiding of a closed popover. */
  .cell-tip:not(:popover-open) {
    display: none;
  }

  .menu[popover] {
    inset: auto;
    margin: 0;
    border: none;
    color: inherit;
  }

  /* Column settings: two short lists in the compact menu, each under a small secondary heading, split by a divider. */
  .menu-heading {
    padding: var(--space-xs) var(--space-md) var(--space-2xs);
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  .menu [role="group"] {
    display: flex;
    flex-direction: column;
  }

  .menu-divider {
    margin-block: var(--space-xs);
  }

  /* Nothing to show: one cell across the table, in secondary text. */
  tr.empty td {
    text-align: center;
    color: var(--foreground-secondary);
  }

  /* Visually hidden: the caption and the checkboxes' names. */
  caption,
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  th,
  td {
    padding: var(--space-md) var(--space-lg);
    background: var(--_cell-bg);
    text-align: start;
    vertical-align: middle;
  }

  /* ---- _Header Cell: border/default above and below; hover and keyboard focus on the neutral tokens ---- */
  th {
    --_cell-bg: var(--interactive-neutral-background-default);
    border-top: var(--stroke-thin) solid var(--zebra-border-default);
    border-bottom: var(--stroke-thin) solid var(--zebra-border-default);
    font-weight: inherit;
  }

  th:hover {
    --_cell-bg: var(--interactive-neutral-background-hover);
  }

  th:has(:focus-visible) {
    --_cell-bg: var(--interactive-neutral-background-focused);
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  .head {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
  }

  /* ---- _Label ---- */
  .label {
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
    white-space: nowrap;
  }

  button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
  }

  /* The sort control covers the label and the glyph and grows to the cell. */
  .sort {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    min-width: 0;
  }

  .head > .label {
    flex: 1 1 auto;
  }

  /* ---- _Sort: caret_sort unsorted, caret_up or caret_down once sorted (spec note: the two-tone vector can't be one
     glyph). foreground/tertiary, foreground/secondary on hover, foreground/cursor for the active direction (spec warn:
     the text-caret token, kept as specced). ---- */
  .sort-glyph {
    flex: none;
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-tertiary);
  }

  .sort:hover .sort-glyph {
    --icon-color: var(--foreground-secondary);
  }

  th[aria-sort="ascending"] .sort-glyph,
  th[aria-sort="descending"] .sort-glyph {
    --icon-color: var(--foreground-cursor);
  }

  /* ---- the trailing filter glyph, shown on hover and focus; opacity keeps it reachable by Tab ---- */
  .filter {
    flex: none;
    display: inline-flex;
    margin-left: auto;
    opacity: 0;
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }

  th:hover .filter,
  th:focus-within .filter,
  .filter.active,
  .filter[aria-expanded="true"] {
    opacity: 1;
  }

  /* A filtered column marks its filter as the active sort glyph is marked. */
  .filter.active {
    --icon-color: var(--foreground-cursor);
  }

  /* ---- _Data Cell: border/subtle below, body/small; hover and selected on the neutral tokens ---- */
  td {
    --_cell-bg: var(--interactive-neutral-background-default);
    border-bottom: var(--stroke-thin) solid var(--zebra-border-subtle);
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-primary);
  }

  tbody tr:not([aria-disabled="true"], .empty):hover td {
    --_cell-bg: var(--interactive-neutral-background-hover);
  }

  tbody tr[aria-selected="true"] td {
    --_cell-bg: var(--interactive-neutral-background-selected);
  }

  /* Disabled: one state across the whole row. Every cell, frozen ones included, keeps the plain cell fill (Figma draws
     no fill; a disabled fill would hide the row's disabled checkbox), its text turns foreground/disabled, and every
     element in it, avatars and slotted content alike, is dimmed and greyed (spec warn: Figma forgets to dim it). There
     is no opacity token, so the dimming is a raw value (gap). */
  tbody tr[aria-disabled="true"] td {
    --_cell-bg: var(--interactive-neutral-background-default);
    color: var(--foreground-disabled);
  }

  tbody tr[aria-disabled="true"] zeta-avatar,
  tbody tr[aria-disabled="true"] td ::slotted(*) {
    opacity: 0.5;
    filter: grayscale(1);
  }

  /* Slotted controls in a disabled row don't take the pointer, unless disabled rows are open to selection. */
  :host(:not([allow-disabled-selection])) tbody tr[aria-disabled="true"] td ::slotted(*) {
    pointer-events: none;
  }

  :host([data-clickable]) tbody tr:not([aria-disabled="true"], .empty),
  :host([data-clickable][allow-disabled-selection]) tbody tr[aria-disabled="true"] {
    cursor: pointer;
  }

  /* ---- _Avatar and text: avatar xxxs, title body/small, subtitle body/xsmall on foreground/secondary ---- */
  .avatar-text {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .avatar-text zeta-avatar {
    flex: none;
  }

  .titles {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .subtitle {
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
  }

  tr[aria-disabled="true"] .subtitle {
    color: var(--foreground-disabled);
  }

  /* ---- Resizable columns: a grip on each header's trailing edge. Hovering it shows the neutral hover border down the
     full cell height; it stays while dragging, and keyboard focus draws it in border/focus. ---- */
  th.resizable:not(.frozen) {
    position: relative;
  }

  /* Over the cell's own top and bottom borders too, so the grip and its line run the cell's full height. */
  .resizer {
    position: absolute;
    inset-block: calc(-1 * var(--stroke-thin));
    inset-inline-end: 0;
    width: var(--space-sm);
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
    width: var(--stroke-thick);
    background: transparent;
  }

  .resizer:hover::after,
  th.resizing .resizer::after {
    background: var(--interactive-neutral-border-hover);
  }

  .resizer:focus-visible::after {
    background: var(--border-focus);
  }

  /* A drag never selects the header text it passes over. */
  :host(:has(th.resizing)) {
    user-select: none;
    cursor: col-resize;
  }

  /* ---- Table Content, columnPosition=frozen ---- */
  .frozen {
    position: sticky;
    z-index: 1;
  }

  /* Earlier frozen columns sit above the last, so its shadow falls only on the scrolling side. */
  .frozen:not(.frozen-last) {
    z-index: 2;
  }

  .frozen-last {
    border-right: var(--stroke-thin) solid var(--zebra-border-default);
  }

  /* Shadow/medium-horizontal once the columns have scrolled beneath (spec warn: Figma swaps the offsets, which is
     what makes it horizontal). Clipped to the trailing side so the blur doesn't smudge the row above. */
  .scroller[data-scrolled] .frozen-last {
    box-shadow:
      var(--shadow-medium-y) var(--shadow-medium-x) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-y) var(--shadow-small-x) var(--shadow-small-blur) var(--shadow-soft);
    clip-path: inset(0 -100vw 0 0);
  }

  :host(:dir(rtl)) .scroller[data-scrolled] .frozen-last {
    clip-path: inset(0 0 0 -100vw);
  }
`;
