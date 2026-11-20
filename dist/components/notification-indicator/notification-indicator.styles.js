import { css } from "lit";
/**
 * Colour, radius and the dimensions Figma binds (control/icon-lg, space/2xs)
 * are semantic tokens. The root sizes have no token, a gap the spec records,
 * so they stay as the literal px it measured.
 *
 * Spec: specs/notification-indicator/notification-indicator.spec.json
 */
export default css `
  :host {
    display: inline-flex;
  }

  :host([hidden]) {
    display: none;
  }

  /* The root carries the actual painted box (fill, border, size) — :host
     stays an unsized wrapper, matching Button's :host/[part="button"] split,
     so the host's own box always matches what's on screen 1:1. */
  .root {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: var(--interactive-destructive-background-default);
    border: var(--stroke-base) solid var(--border-inverse);
  }

  .label {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
    font-family: var(--indicator-medium-font-family), system-ui, sans-serif;
    font-size: var(--indicator-medium-font-size);
    font-weight: var(--indicator-medium-font-weight);
    line-height: var(--indicator-medium-line-height);
    letter-spacing: var(--indicator-medium-letter-spacing);
    color: var(--foreground-on-strong);
  }

  /* ---- size --------------------------------------------------------------- */
  :host([size="small"]) .root {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-pill);
  }

  :host([size="medium"]) .root {
    width: 16px;
    height: 16px;
    border-radius: var(--radius-pill);
  }
  :host([size="medium"]) .label {
    -webkit-line-clamp: 1;
  }

  :host([size="large"]) .root {
    min-width: var(--control-icon-lg);
    height: 20px; /* no token — spec gap */
    padding: 0 var(--space-2xs);
    border-radius: var(--radius-pill);
  }
  :host([size="large"]) .label {
    -webkit-line-clamp: 3;
  }
`;
