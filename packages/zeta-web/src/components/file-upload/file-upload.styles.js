import { css } from "lit";

/* File Upload — the zone and the Files slot. border/default, surface/info and radius/none go through their --zebra-
   aliases (the legacy set shadows them). */
export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    color: var(--foreground-primary);
    -webkit-tap-highlight-color: transparent;
  }
  .zone {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-xl) var(--space-lg);
    text-align: center;
    background: var(--surface-card);
    /* Dashed 4/4 has no token (spec issue); the browser's dashed border stands in. */
    border: var(--stroke-thin) dashed var(--zebra-border-default);
    border-radius: var(--radius-md);
  }
  :host(:not([rounded])) .zone {
    border-radius: var(--zebra-radius-none);
  }
  .headline {
    font: var(--text-title-medium);
    letter-spacing: var(--title-medium-letter-spacing);
    color: var(--foreground-primary);
  }
  .or {
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
  }
  .caption,
  .error {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }
  .error {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--foreground-error);
    --icon-size: var(--control-icon-sm);
    --icon-color: currentColor;
  }
  :host([state="dragging"]) .zone {
    background: var(--zebra-surface-info);
    border-style: solid;
    border-color: var(--border-focus);
  }
  :host([state="error"]) .zone {
    border-color: var(--border-error);
  }
  :host([state="disabled"]) .zone {
    background: var(--surface-subtle);
  }
  :host([state="disabled"]) :is(.headline, .or, .caption) {
    color: var(--foreground-disabled);
  }
  .files {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .files[hidden] {
    display: none;
  }
`;
