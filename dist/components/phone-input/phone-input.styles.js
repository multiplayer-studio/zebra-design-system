import { css } from "lit";
/* Spec: specs/phone-input (Phone Input, Input / Phone, _Phone Country). The label and hint match zeta-text-input. The
   number is zeta-text-input, joined to the country control through its field part. Its error, fill and border are set
   here, because the inner field's own error state draws a hint row of its own. */
export default css `
  :host {
    --_height: var(--control-md);
    --_radius: var(--zebra-radius-none);
    display: inline-block;
    box-sizing: border-box;
    width: 280px;
    max-width: 100%;
    vertical-align: top;
  }

  :host([block]) {
    display: block;
    width: 100%;
  }

  /* ---- size and shape ---- */
  :host([size="small"]) {
    --_height: var(--control-sm);
  }

  :host([size="large"]) {
    --_height: var(--control-lg);
  }

  :host([rounded]) {
    --_radius: var(--radius-sm);
  }

  :host([shape="sharp"]) {
    --_radius: var(--zebra-radius-none);
  }

  :host([shape="rounded"]) {
    --_radius: var(--radius-sm);
  }

  :host([shape="full"]) {
    --_radius: var(--radius-pill);
  }

  /* ---- assembly: label, field, hint, space/2xs apart ---- */
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    width: fit-content;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  .required {
    color: var(--foreground-error);
  }

  .optional {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  :host([disabled]) .label,
  :host([disabled]) .optional {
    color: var(--foreground-disabled);
  }

  .control {
    display: flex;
    min-width: 0;
  }

  /* ---- country ---- */
  .country {
    appearance: none;
    box-sizing: border-box;
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    height: var(--_height);
    margin: 0;
    padding: 0 var(--space-sm);
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    border-inline-end: none;
    border-start-start-radius: var(--_radius);
    border-end-start-radius: var(--_radius);
    background: var(--interactive-neutral-background-default);
    color: var(--foreground-primary);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .country:hover:not(:disabled) {
      background: var(--interactive-neutral-background-hover);
    }
  }

  .country[aria-expanded="true"] {
    background: var(--interactive-neutral-background-selected);
  }

  .country:active:not(:disabled) {
    background: var(--interactive-neutral-background-pressed);
  }

  .country:focus-visible {
    position: relative;
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
  }

  .country:disabled {
    border-color: var(--interactive-neutral-border-disabled);
    background: var(--interactive-neutral-background-disabled);
    color: var(--foreground-disabled);
    cursor: not-allowed;
    --icon-color: var(--foreground-disabled);
  }

  .flag {
    display: inline-flex;
    font-size: var(--control-icon-md);
    line-height: 1;
  }

  /* Real flag artwork takes the same box and keeps its own ratio. */
  .flag img,
  .flag svg {
    display: block;
    width: var(--control-icon-md);
    height: auto;
  }

  /* ---- flavour ---- */
  /* gradient: the number's border starts on this colour, so the two read as one line. An invalid number takes the
     neutral control, as default does. */
  :host([flavor="gradient"]:not([disabled]):not([error])) .country {
    border-color: var(--foreground-gradient-start);
  }

  :host([flavor="ghost"]) .country {
    border-width: var(--stroke-base);
    border-color: var(--interactive-ghost-border-default);
    background: transparent;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="ghost"]) .country:hover:not(:disabled) {
      background: var(--interactive-ghost-background-hover);
    }
  }

  :host([flavor="ghost"]) .country[aria-expanded="true"] {
    background: var(--interactive-ghost-background-selected);
  }

  :host([flavor="ghost"]) .country:active:not(:disabled) {
    background: var(--interactive-ghost-background-pressed);
  }

  /* ---- number ---- */
  .number {
    flex: 1 1 auto;
    min-width: 0;
  }

  .number::part(field) {
    gap: var(--space-none);
    padding-inline-start: var(--space-sm);
    border-start-start-radius: var(--zebra-radius-none);
    border-end-start-radius: var(--zebra-radius-none);
    border-start-end-radius: var(--_radius);
    border-end-end-radius: var(--_radius);
  }

  /* The dial code reads as the start of the number, so it takes the value's colour. */
  .number::part(prefix) {
    padding-inline-start: var(--space-2xs);
    color: var(--foreground-primary);
  }

  :host([disabled]) .number::part(prefix) {
    color: var(--foreground-disabled);
  }

  /* The error stays on the number while it is being corrected (spec issue). */
  :host([error]:not([disabled])) .number::part(field) {
    --_fill: var(--feedback-error-background-subtle);
    --_border: var(--border-error);
    --_border-width: var(--stroke-thick);
    box-shadow: inset 0 0 0 var(--_border-width) var(--_border);
    outline: none;
  }

  /* ---- hint ---- */
  .hint-text {
    display: flex;
    align-items: center;
    column-gap: var(--space-2xs);
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }

  :host([error]:not([disabled])) .hint-text {
    color: var(--foreground-error);
    --icon-color: var(--foreground-error);
  }

  :host([disabled]) .hint-text {
    color: var(--foreground-disabled);
    --icon-color: var(--foreground-disabled);
  }

  /* ---- menu ---- */
  zeta-droppable {
    overflow-y: auto;
    max-height: calc(8 * var(--control-md));
  }

  .dial {
    color: var(--foreground-secondary);
  }
`;
//# sourceMappingURL=phone-input.styles.js.map