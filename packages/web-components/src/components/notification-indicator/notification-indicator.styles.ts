import { css } from "lit";

/**
 * Colour and the two dimensions Figma actually binds (control/icon-lg,
 * space/xs) are semantic tokens. Every other dimension below (root
 * width/height at every size, large's radius and top/bottom padding) has no
 * token in Figma itself — that's a spec issue, not something to invent a
 * token for here, so it's carried over as the literal px the spec measured.
 *
 * Spec: specs/notification-indicator/notification-indicator.spec.json
 */
export default css`
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
    color: var(--interactive-destructive-foreground-default);
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
    height: 20px; /* no token in Figma for this dimension — spec issue */
    padding: 3px var(--space-xxs); /* top/bottom 3px has no token in Figma — spec issue */
    border-radius: 10px; /* no token in Figma for this radius — spec issue */
  }
  :host([size="large"]) .label {
    -webkit-line-clamp: 3;
  }
`;
