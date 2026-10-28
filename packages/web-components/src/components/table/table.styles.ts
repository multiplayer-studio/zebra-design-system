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
 * frozen columns), Table Footer.
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

  /* The Figma 280px min width is a sample measurement; the search takes its
     natural width. */
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
    gap: var(--space-xxs);
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
    gap: var(--space-xxs);
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
  th:focus-within .filter {
    opacity: 1;
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

  tbody tr:not([aria-disabled="true"]):hover td {
    --zds-table-cell-bg: var(--interactive-neutral-background-hover);
  }

  tbody tr[aria-selected="true"] td {
    --zds-table-cell-bg: var(--interactive-neutral-background-selected);
  }

  /* Disabled: no fill, as Figma draws it, and the content dimmed (spec warn:
     Figma's disabled data cell forgets to dim its content). */
  tbody tr[aria-disabled="true"] td {
    --zds-table-cell-bg: transparent;
    color: var(--foreground-disabled);
  }

  :host([data-clickable]) tbody tr:not([aria-disabled="true"]) {
    cursor: pointer;
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

  /* A sticky cell needs an opaque fill or the scrolled columns show through.
     A disabled row has none (above), so its frozen cells take the page
     surface, which is what "no fill" shows on a page. */
  tbody tr[aria-disabled="true"] td.frozen {
    --zds-table-cell-bg: var(--surface-page);
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
`;
