import { css } from "lit";
/**
 * Stepper Input — layout only. Composed after `<zds-input-field>`'s own
 * stylesheet (the value box: `.field`, `input`, its State classes and
 * :host([size]) heights) and Input Hint's, so their tokens and states are
 * theirs. Every value here is a semantic token. Mirrors packages/react-baseui
 * stepper-input.css.
 *
 * Spec: specs/stepper-input/stepper-input.spec.json
 */
export default css `
  /* ---- root: column, gap space/sm, start-aligned ------------------------ */
  /* Overrides input-field's :host (block, its start width and minimum). */
  :host {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
    vertical-align: middle;
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- control row: decrement · value · increment, gap space/sm ---------- */
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* ---- value ------------------------------------------------------------- */
  /* Corners: the spec metadata says the value stays square while the buttons
     round; Figma rounds the value too (spec issue "The value rounds too"). We
     follow the metadata intent: the value is always radius/none, overriding
     input-field's :host([shape="rounded"]). Same in the React package. */
  .value {
    --zds-input-radius: var(--radius-none);
    flex: none;
    /* Figma's fixed 72px has no token (spec warn): the box fits the widest
       bound (--zds-stepper-input-chars, in ch of the value's own font, plus the
       field's padding and border), never narrower than 2 × control/sm (72px at
       desktop). Height follows size through input-field's :host([size]); the
       text stays body/medium at both sizes (spec). */
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    inline-size: max(
      calc(2 * var(--control-sm)),
      calc(var(--zds-stepper-input-chars, 3) * 1ch + 2 * var(--space-md) + 2 * var(--space-2xs) + 2 * var(--stroke-thin))
    );
  }
  .value input {
    inline-size: 100%;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  /* No transitions: the spec defines no motion. */
`;
