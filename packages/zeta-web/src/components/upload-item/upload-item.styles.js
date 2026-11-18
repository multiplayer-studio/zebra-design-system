import { css } from "lit";

/* File Upload Item — the row: file indicator, body (name, meta line, progress, Try again) and the trailing controls.
   border/default, border/subtle and radius/none go through their --zebra- aliases (the legacy set shadows them). */
export default css`
  :host {
    display: block;
    -webkit-tap-highlight-color: transparent;
  }
  .row {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--surface-card);
    border: var(--stroke-thin) solid var(--zebra-border-subtle);
    border-radius: var(--radius-md);
  }
  :host(:not([rounded])) .row {
    border-radius: var(--zebra-radius-none);
  }
  :host([indicator="ring"]) .row {
    align-items: center;
  }
  :host([status="error"]) .row {
    border-color: var(--border-error);
  }
  .body {
    flex: 1 1 auto;
    min-inline-size: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
  /* Bar rows sit their text down space/2xs (spec drift note: ring rows have none). */
  :host([indicator="bar"]) .body {
    padding-block-start: var(--space-2xs);
    padding-inline-end: var(--space-sm);
  }
  /* Bar rows: the dismiss sits a space/sm inset from the top and end edges, out of flow, so the body runs full width
     and the percentage ends at the glyph's edge. The name stops short of it. */
  :host([indicator="bar"]) .row > .dismiss {
    position: absolute;
    inset-block-start: var(--space-sm);
    inset-inline-end: var(--space-sm);
  }
  :host([indicator="bar"]) .name {
    padding-inline-end: calc(var(--control-sm) - var(--space-md));
  }
  .name {
    box-sizing: border-box;
    max-inline-size: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-primary);
  }
  .meta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding-inline-start: var(--space-sm);
    border-inline-start: var(--stroke-thin) solid var(--zebra-border-default);
    --icon-size: var(--control-icon-sm);
    --icon-color: currentColor;
  }
  .status:first-child {
    padding-inline-start: 0;
    border-inline-start: 0;
  }
  :host([status="waiting"]) .status {
    color: var(--foreground-tertiary);
  }
  :host([status="complete"]) .status {
    color: var(--foreground-success);
  }
  :host([status="error"]) .status {
    color: var(--foreground-error);
  }
  .progress {
    align-self: stretch;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding-block-start: var(--space-xs);
  }
  .progress zeta-progress-bar {
    flex: 1 1 auto;
  }
  .percent {
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-primary);
    font-variant-numeric: tabular-nums;
  }
  .retry {
    margin-inline-start: calc(-1 * var(--space-sm));
  }
  .actions {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
  }
  .sr-only {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: no-preference) {
    .row {
      animation: enter var(--animations-smooth) both;
      transition: border-color 200ms ease-out;
    }
  }
  @keyframes enter {
    from {
      opacity: 0;
      translate: 0 calc(-1 * var(--space-xs));
    }
  }
`;
