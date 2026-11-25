import { css } from "lit";
/**
 * Composed after Input's own stylesheet, which brings the label, the hint and
 * the start width. Every value is a semantic token; only the join and the
 * country control are drawn here.
 *
 * Spec: specs/phone-input/phone-input.spec.json
 */
export default css `
  :host {
    --zds-phone-height: var(--control-md);
    --zds-phone-radius: var(--radius-sm);
  }

  /* ---- size and shape ----------------------------------------------------- */
  :host([size="small"]) { --zds-phone-height: var(--control-sm); }
  :host([size="large"]) { --zds-phone-height: var(--control-lg); }
  :host([shape="sharp"]) { --zds-phone-radius: var(--radius-none); }
  :host([shape="full"]) { --zds-phone-radius: var(--radius-pill); }

  .control {
    display: flex;
    min-inline-size: 0;
  }

  /* ---- country ------------------------------------------------------------ */
  zds-dropdown {
    flex: none;
  }

  .country {
    appearance: none;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    block-size: var(--zds-phone-height);
    margin: 0;
    padding: 0 var(--space-sm);
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    border-inline-end: none;
    border-start-start-radius: var(--zds-phone-radius);
    border-end-start-radius: var(--zds-phone-radius);
    background: var(--interactive-neutral-background-default);
    color: var(--foreground-primary);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .country:hover:not(:disabled) {
    background: var(--interactive-neutral-background-hover);
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
    inline-size: var(--control-icon-md);
    block-size: auto;
  }

  /* ---- flavour ------------------------------------------------------------ */
  /* gradient: the number's border starts on this colour, so the two read as
     one line. An invalid number takes the neutral control, as default does. */
  :host([flavour="gradient"][state="default"]) .country {
    border-color: var(--foreground-gradient-start);
  }

  /* ghost: no surface and stroke/base, like the number. */
  :host([flavour="ghost"]) .country {
    border-width: var(--stroke-base);
    border-color: var(--interactive-ghost-border-default);
    background: transparent;
  }

  :host([flavour="ghost"]) .country:hover:not(:disabled) {
    background: var(--interactive-ghost-background-hover);
  }

  :host([flavour="ghost"]) .country[aria-expanded="true"] {
    background: var(--interactive-ghost-background-selected);
  }

  :host([flavour="ghost"]) .country:active:not(:disabled) {
    background: var(--interactive-ghost-background-pressed);
  }

  /* ---- number ------------------------------------------------------------- */
  .number {
    flex: 1 1 auto;
    min-inline-size: 0;
  }

  .number::part(field) {
    padding-inline-start: var(--space-sm);
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* The dial code reads as the start of the number, so it sits one gap from the digits. */
  .number::part(input) {
    padding-inline-start: 0;
  }

  /* The error stays on the number while it is being corrected (spec issue). */
  :host([state="invalid"]) .number::part(field) {
    border: var(--stroke-thick) solid var(--border-error);
    background: var(--feedback-error-background-subtle);
    outline: none;
  }

  /* ---- menu --------------------------------------------------------------- */
  zds-dropdown::part(panel) {
    overflow-y: auto;
    max-block-size: calc(8 * var(--control-md));
  }

  .dial {
    color: var(--foreground-secondary);
  }
`;
