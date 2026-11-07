import { css } from "lit";

/**
 * Every value is a semantic token from the generated CSS layer, so an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes the field.
 *
 * Sections follow the spec's Input Field tables: size, shape, then
 * state x flavour.
 *
 * Spec: specs/input/input.spec.json (subcomponents.inputField)
 */
export default css`
  :host {
    /* 280 is a start width, not a fixed one (spec decision): the field never
       outgrows its container, and block fills it. */
    display: block;
    inline-size: 280px;
    max-inline-size: 100%;
    min-inline-size: min(calc(6 * var(--control-sm)), 100%);
  }
  :host([block]) {
    inline-size: 100%;
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- root ---------------------------------------------------------- */
  .field {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--space-2xs);
    padding: var(--space-sm) var(--space-md);
    block-size: var(--zds-input-height);
    border-radius: var(--zds-input-radius);
    background: var(--zds-input-bg);
    border: var(--zds-input-border-width) solid var(--zds-input-border);
    /* Focus is the one stroke drawn outside the edge (spec: stroke/thick,
       outside): an outline at offset 0, so nothing inside shifts. */
    outline: var(--zds-input-outline, none);
    outline-offset: 0;
    color: var(--zds-input-fg);
    cursor: text;
  }

  .icon {
    flex: none;
  }

  /* ---- text (padding 0 space/xs) --------------------------------------- */
  input {
    flex: 1 1 auto;
    min-inline-size: 0;
    margin: 0;
    padding: 0 var(--space-2xs);
    box-sizing: border-box;
    border: 0;
    outline: none;
    background: transparent;
    color: var(--zds-input-fg);
    caret-color: var(--foreground-cursor);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
    -webkit-appearance: none;
    appearance: none;
    -moz-appearance: textfield;
  }
  input::placeholder {
    color: var(--foreground-disabled);
    opacity: 1;
  }
  /* The field draws its own controls in place of the platform's. */
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button,
  input::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
  input::-ms-reveal {
    display: none;
  }
  /* An empty date / time shows the platform's format (mm/dd/yyyy, --:-- --):
     that is the spec's placeholder, so it takes the placeholder colour. */
  :host([type="date"]) .enabled input,
  :host([type="date"]) .hover input,
  :host([type="date"]) .focus input,
  :host([type="date"]) .selected input,
  :host([type="time"]) .enabled input,
  :host([type="time"]) .hover input,
  :host([type="time"]) .focus input,
  :host([type="time"]) .selected input {
    color: var(--foreground-disabled);
  }
  input::-webkit-datetime-edit-fields-wrapper,
  input::-webkit-datetime-edit-text,
  input::-webkit-datetime-edit-month-field,
  input::-webkit-datetime-edit-day-field,
  input::-webkit-datetime-edit-year-field,
  input::-webkit-datetime-edit-hour-field,
  input::-webkit-datetime-edit-minute-field,
  input::-webkit-datetime-edit-ampm-field {
    padding-block: 0;
  }

  /* ---- leading text: reads with the value -------------------------------- */
  .leading-text {
    flex: none;
    padding-inline-start: var(--space-2xs);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }
  :host([size="small"]) .leading-text {
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }

  /* ---- trailing: type control, clear, divider --------------------------- */
  .trailing {
    flex: none;
    display: inline-flex;
    align-items: center;
    /* Spec typing group: clear · divider · control, gap space/sm. */
    gap: var(--space-sm);
    block-size: var(--control-icon-md);
  }
  .divider {
    align-self: stretch;
  }
  .control {
    position: relative;
    display: inline-flex;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    border-radius: var(--radius-pill);
  }
  /* A target past the glyph (the spec asks for a large enough target). */
  .control::before {
    content: "";
    position: absolute;
    inset: calc(-1 * var(--space-sm));
    border-radius: inherit;
  }
  .control:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--space-3xs);
  }
  .control:disabled {
    cursor: not-allowed;
  }

  /* ---- size ---------------------------------------------------------- */
  :host {
    --zds-input-height: var(--control-md);
  }
  :host([size="large"]) {
    --zds-input-height: var(--control-lg);
  }
  :host([size="small"]) {
    --zds-input-height: var(--control-sm);
  }
  :host([size="small"]) input {
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }

  /* ---- shape --------------------------------------------------------- */
  :host {
    --zds-input-radius: var(--radius-none);
  }
  :host([shape="rounded"]) {
    --zds-input-radius: var(--radius-sm);
  }
  :host([shape="full"]) {
    --zds-input-radius: var(--radius-pill);
  }

  /* ---- state x flavour: default ---------------------------------------- */
  :host {
    --zds-input-bg: var(--interactive-neutral-background-default);
    --zds-input-border: var(--interactive-neutral-border-default);
    --zds-input-border-width: var(--stroke-thin);
    /* Value, icons and controls share one colour (spec). */
    --zds-input-fg: var(--foreground-primary);
  }
  .enabled:hover,
  .filled:hover {
    --zds-input-border: var(--interactive-neutral-border-hover);
  }
  .focus {
    --zds-input-border: transparent;
    --zds-input-outline: var(--stroke-thick) solid var(--border-focus);
  }
  .selected,
  .typing {
    --zds-input-border: var(--border-focus);
  }
  .invalid {
    --zds-input-border: var(--border-error);
  }
  .read-only {
    --zds-input-border: var(--border-subtle);
    cursor: default;
  }
  .disabled {
    --zds-input-bg: var(--interactive-neutral-background-disabled);
    --zds-input-border: var(--interactive-neutral-border-disabled);
    --zds-input-fg: var(--foreground-disabled);
    cursor: not-allowed;
  }
  .disabled input {
    cursor: not-allowed;
  }

  /* ---- flavour: gradient ----------------------------------------------- */
  /* Enabled and filled draw a foreground/gradient/start → end border (a
     second background clipped to the border box); hover border/gradient/end;
     selected and typing border/gradient/start. Focus, invalid, read-only and
     disabled use default's tokens (spec, metadata corrected 2026-10-15). */
  :host([flavour="gradient"]) .enabled,
  :host([flavour="gradient"]) .filled {
    --zds-input-border: transparent;
    background:
      linear-gradient(var(--zds-input-bg), var(--zds-input-bg)) padding-box,
      linear-gradient(to right, var(--foreground-gradient-start), var(--foreground-gradient-end)) border-box;
  }
  :host([flavour="gradient"]) .enabled:hover,
  :host([flavour="gradient"]) .filled:hover {
    --zds-input-border: var(--border-gradient-end);
    background: var(--zds-input-bg);
  }
  :host([flavour="gradient"]) .selected,
  :host([flavour="gradient"]) .typing {
    --zds-input-border: var(--border-gradient-start);
  }

  /* ---- flavour: ghost -------------------------------------------------- */
  /* No surface; border weight stroke/base in every state but focus
     (stroke/thick) and invalid (stroke/thin). stroke/base is zero, so hover,
     selected and typing draw no border: the spec's open warning, built as
     designed. */
  :host([flavour="ghost"]) {
    --zds-input-bg: transparent;
    --zds-input-border-width: var(--stroke-base);
  }
  :host([flavour="ghost"]) .enabled,
  :host([flavour="ghost"]) .filled {
    --zds-input-border: var(--interactive-ghost-border-default);
  }
  :host([flavour="ghost"]) .invalid {
    --zds-input-border-width: var(--stroke-thin);
  }
  :host([flavour="ghost"]) .disabled {
    --zds-input-bg: transparent;
    --zds-input-border: var(--interactive-ghost-border-disabled);
  }

  /* No transitions: the spec defines no motion. */
`;
