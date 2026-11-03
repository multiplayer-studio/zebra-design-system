import { css } from "lit";

/* Spec: specs/badges/status-label. The surround carries the status in its fill and border; the label stays
   foreground/primary. */
export default css`
  :host {
    --_fill: var(--feedback-neutral-background-subtle);
    --_border: var(--zebra-border-default);
    --_accent: var(--foreground-primary);
    display: inline-block;
    width: fit-content;
    height: fit-content;
  }

  :host([status="info"]) {
    --_fill: var(--feedback-info-background-subtle);
    --_border: var(--zebra-border-info);
    --_accent: var(--foreground-info);
  }
  :host([status="positive"]) {
    --_fill: var(--feedback-success-background-subtle);
    --_border: var(--border-success);
    --_accent: var(--foreground-success);
  }
  :host([status="warning"]) {
    --_fill: var(--feedback-warning-background-subtle);
    --_border: var(--zebra-border-warning);
    --_accent: var(--foreground-warning);
  }
  :host([status="negative"]) {
    --_fill: var(--feedback-error-background-subtle);
    --_border: var(--border-error);
    --_accent: var(--foreground-error);
  }

  [part="container"] {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 0;
    padding: var(--space-2xs) var(--space-xxs);
    border: var(--stroke-thin) solid var(--_border);
    border-radius: var(--zebra-radius-none);
    background: var(--_fill);
    color: var(--foreground-primary);
    --icon-size: var(--control-icon-sm);
  }

  :host([rounded]) [part="container"] {
    border-radius: var(--radius-pill);
  }

  [part="icon-container"] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    --icon-color: var(--_accent);
  }

  .dot {
    width: var(--control-icon-xxs);
    height: var(--control-icon-xxs);
    border-radius: var(--radius-pill);
    background: var(--_accent);
  }

  [part="text"] {
    padding: 0 var(--space-xxs);
    white-space: nowrap;
    font-family: var(--body-small-font-family);
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }

  /* The dismiss glyph is 16 square; the button's hit area reaches past it, and it takes a focus ring. Neither is
     designed in Figma yet (spec issue). */
  [part="discard"] {
    all: unset;
    position: relative;
    display: flex;
    cursor: pointer;
    border-radius: var(--radius-pill);
    --icon-color: currentColor;
  }

  [part="discard"]::before {
    content: "";
    position: absolute;
    inset: calc(var(--space-xxs) * -1);
  }

  [part="discard"]:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thin);
  }
`;
