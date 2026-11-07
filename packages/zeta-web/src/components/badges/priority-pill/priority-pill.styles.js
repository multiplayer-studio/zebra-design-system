import { css } from "lit";

/* Spec: specs/badges/priority-pill. The pill takes the level's strong fill; the circle and label take the knockout
   colour, and the glyph or rank inside the circle takes the pill's fill. The medium and high knockouts are 4.40:1 and
   4.34:1 in light mode, below 4.5 (spec issue, acknowledged by the owner). */
export default css`
  :host {
    --_fill: var(--foreground-secondary);
    --_knockout: var(--foreground-inverse);
    width: fit-content;
    display: inline-block;
  }

  :host([status="medium"]) {
    --_fill: var(--feedback-info-background-strong);
    --_knockout: var(--interactive-primary-foreground-default);
  }
  :host([status="high"]) {
    --_fill: var(--feedback-warning-background-strong);
    --_knockout: var(--foreground-inverse);
  }
  :host([status="urgent"]) {
    --_fill: var(--feedback-error-background-strong);
    --_knockout: var(--interactive-destructive-foreground-default);
  }

  /* flex, not inline-flex: an inline container sits on the host's baseline and gains descender height. */
  .container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    padding: var(--space-2xs) var(--space-sm) var(--space-2xs) var(--space-2xs);
    white-space: nowrap;
    border-radius: var(--zebra-radius-none);
    background: var(--priority-pill-background-color, var(--_fill));
    color: var(--priority-pill-text-color, var(--_knockout));
  }

  .number {
    box-sizing: border-box;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--control-icon-md);
    height: var(--control-icon-md);
    padding: 0;
    border-radius: var(--zebra-radius-none);
    background: var(--priority-pill-index-background-color, var(--_knockout));
    color: var(--priority-pill-index-text-color, var(--_fill));
    --icon-color: var(--priority-pill-index-text-color, var(--_fill));
    --icon-size: var(--control-icon-sm);
    font-family: var(--indicator-medium-font-family);
    font-size: var(--indicator-medium-font-size);
    font-weight: var(--indicator-medium-font-weight);
    line-height: var(--indicator-medium-line-height);
    letter-spacing: var(--indicator-medium-letter-spacing);
  }

  .text {
    padding-inline-end: var(--space-2xs);
    font-family: var(--body-small-font-family);
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }

  :host([rounded]) .container,
  :host([rounded]) .number {
    border-radius: var(--radius-pill);
  }

  /* Small reduces the text as well as the box. The 12px glyph has no size token (spec issue). */
  :host([size="small"]) .container {
    padding: var(--space-3xs) var(--space-sm) var(--space-3xs) var(--space-3xs);
  }
  :host([size="small"]) .number {
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    --icon-size: 12px;
    font-family: var(--indicator-small-font-family);
    font-size: var(--indicator-small-font-size);
    font-weight: var(--indicator-small-font-weight);
    line-height: var(--indicator-small-line-height);
    letter-spacing: var(--indicator-small-letter-spacing);
  }
  :host([size="small"]) .text {
    padding-inline-end: var(--space-3xs);
    font-family: var(--indicator-small-font-family);
    font-size: var(--indicator-small-font-size);
    font-weight: var(--indicator-small-font-weight);
    line-height: var(--indicator-small-line-height);
    letter-spacing: var(--indicator-small-letter-spacing);
  }

  /* Badge: the circle alone, with even padding, so the pill becomes a fixed square. */
  :host([type="badge"]) .container {
    padding: var(--space-2xs);
  }
  :host([type="badge"][size="small"]) .container {
    padding: var(--space-3xs);
  }
`;
