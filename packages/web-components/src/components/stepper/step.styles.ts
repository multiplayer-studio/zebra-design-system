import { css } from "lit";

/**
 * Steps — Step / Horizontal, Step / Vertical and Step Card. Every value is a
 * semantic token. Colour runs through one local property per role, set once
 * per status; each kind adds its own layout on top.
 *
 * Spec: specs/stepper/stepper.spec.json
 */
export const base = css`
  :host {
    /* ---- status: one set of roles, read by every kind ------------------- */
    --zds-step-indicator-bg: var(--interactive-neutral-background-default);
    --zds-step-indicator-border: var(--border-default);
    --zds-step-indicator-fg: var(--foreground-primary);
    --zds-step-label: var(--foreground-tertiary);
    --zds-step-subtitle: var(--foreground-tertiary);
    --zds-step-line: var(--border-default);
    --zds-step-card-bg: var(--surface-card);
    --zds-step-card-border: var(--border-default);
    /* Partial draws dashed. No token exists for a dash pattern (spec issue). */
    --zds-step-dash: solid;
    box-sizing: border-box;
    min-inline-size: 0;
  }
  :host([hidden]) { display: none; }
  /* The glyph has no colour in Figma; it draws white on the solid fill, which is the on-primary foreground. */
  :host([status="complete"]) {
    --zds-step-indicator-bg: var(--feedback-success-background-strong);
    --zds-step-indicator-border: var(--feedback-success-background-strong);
    --zds-step-indicator-fg: var(--interactive-primary-foreground-default);
    --zds-step-line: var(--border-success);
    --zds-step-card-bg: var(--feedback-success-background-subtle);
    --zds-step-card-border: var(--border-success);
  }
  :host([status="active"]) {
    --zds-step-indicator-bg: var(--interactive-primary-background-default);
    --zds-step-indicator-border: var(--interactive-primary-background-default);
    --zds-step-indicator-fg: var(--interactive-primary-foreground-default);
    --zds-step-label: var(--foreground-primary);
    --zds-step-card-bg: var(--surface-brand);
    --zds-step-card-border: var(--interactive-primary-border-default);
  }
  :host([status="partial"]) {
    --zds-step-indicator-bg: var(--feedback-success-background-subtle);
    --zds-step-indicator-border: var(--border-success);
    --zds-step-line: var(--border-success);
    --zds-step-dash: dashed;
  }
  :host([status="error"]) {
    --zds-step-indicator-bg: var(--feedback-error-background-strong);
    --zds-step-indicator-border: var(--feedback-error-background-strong);
    --zds-step-indicator-fg: var(--interactive-primary-foreground-default);
    --zds-step-label: var(--foreground-error);
    --zds-step-card-border: var(--border-error);
  }
  :host([status="disabled"]) {
    --zds-step-indicator-bg: var(--border-subtle);
    --zds-step-indicator-border: var(--border-subtle);
    --zds-step-indicator-fg: var(--foreground-disabled);
    --zds-step-label: var(--foreground-disabled);
    --zds-step-subtitle: var(--foreground-disabled);
    --zds-step-card-border: var(--border-subtle);
  }

  /* ---- indicator --------------------------------------------------------- */
  .indicator {
    display: grid;
    flex: none;
    place-items: center;
    box-sizing: border-box;
    inline-size: var(--control-icon-lg);
    block-size: var(--control-icon-lg);
    border: var(--stroke-thick) var(--zds-step-dash) var(--zds-step-indicator-border);
    border-radius: var(--radius-pill);
    background: var(--zds-step-indicator-bg);
    color: var(--zds-step-indicator-fg);
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
  }

  /* ---- text: label, subtitle, and the status in words -------------------- */
  .text {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    padding: var(--space-3xs) 0 0;
    text-align: start;
  }
  .label {
    color: var(--zds-step-label);
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
  }
  .subtitle {
    color: var(--zds-step-subtitle);
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }
  .sr {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  /* With selectable the text is a button. No hover is designed; focus gets the ring. */
  button.text {
    margin: 0;
    border: 0;
    border-radius: var(--radius-xs);
    background: none;
    font: inherit;
    cursor: pointer;
  }
  button.text:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--space-3xs);
  }

  .line { display: block; box-sizing: border-box; }
`;

/* ---- Step / Horizontal: label centred under the indicator ----------------- */
export const horizontal = css`
  :host {
    display: flex;
    flex: 1 1 0;
    padding-block: var(--space-2xs);
  }
  /* A step with no line, the last by default, takes only its head. */
  :host(:not([has-line])) { flex: none; }
  .head {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    inline-size: var(--control-icon-lg);
  }
  /* The text is centred on a head as wide as the indicator, and overflows it on both sides by design. */
  .text {
    align-items: center;
    text-align: center;
    white-space: nowrap;
  }
  .track {
    display: flex;
    flex: 1 1 0;
    align-items: center;
    min-inline-size: 0;
    block-size: var(--control-icon-lg);
  }
  .line {
    inline-size: 100%;
    border-block-start: var(--stroke-thick) var(--zds-step-dash) var(--zds-step-line);
  }
`;

/* ---- Step / Vertical: label beside the indicator, line dropping below ----- */
export const vertical = css`
  :host {
    display: flex;
    gap: var(--space-xl);
  }
  .rail {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
  }
  /* The line carries the height of the step. Its shortest length is space/xl:
     Figma draws it at a raw 22px with no token (spec issue). */
  .line {
    flex: 1 0 auto;
    min-block-size: var(--space-xl);
    border-inline-start: var(--stroke-thick) var(--zds-step-dash) var(--zds-step-line);
  }
  .text { flex: 1 1 0; }
`;

/* ---- Step Card: a bordered surface, indicator and text side by side ------- */
export const card = css`
  /* Cards take a stronger label than the rail steps; active, error and disabled override it in base. */
  :host(:is([status="default"], [status="complete"], [status="partial"])) { --zds-step-label: var(--foreground-secondary); }
  :host {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    border: var(--stroke-thin) solid var(--zds-step-card-border);
    border-radius: var(--radius-none);
    background: var(--zds-step-card-bg);
  }
  :host([shape="rounded"]) { border-radius: var(--radius-sm); }
  .text { flex: 1 1 0; }
`;

/* ---- Step Segment: one division of the compact bar ------------------------ */
/* Figma splits the segment into Start and End halves only to draw partial;
   here the two halves are one background with a hard stop at the middle. */
export const segment = css`
  :host {
    --zds-step-segment-start: var(--border-subtle);
    --zds-step-segment-end: var(--border-subtle);
    display: block;
    flex: 1 1 0;
    min-inline-size: 0;
    block-size: var(--space-2xs);
    border-radius: var(--radius-pill);
    background: linear-gradient(to right, var(--zds-step-segment-start) 50%, var(--zds-step-segment-end) 50%);
  }
  :host([hidden]) { display: none; }
  :host(:dir(rtl)) { background: linear-gradient(to left, var(--zds-step-segment-start) 50%, var(--zds-step-segment-end) 50%); }
  :host(:is([status="complete"], [status="active"])) {
    --zds-step-segment-start: var(--interactive-primary-background-default);
    --zds-step-segment-end: var(--interactive-primary-background-default);
  }
  :host([status="partial"]) { --zds-step-segment-start: var(--interactive-primary-background-default); }
  :host([status="error"]) {
    --zds-step-segment-start: var(--foreground-error);
    --zds-step-segment-end: var(--foreground-error);
  }
`;
