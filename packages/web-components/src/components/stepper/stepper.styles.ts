import { css } from "lit";

/**
 * Stepper — Horizontal Stepper and Vertical Stepper. They paint nothing
 * themselves: every colour arrives with the steps they hold (step.styles.ts).
 * This file lays the steps out.
 *
 * Spec: specs/stepper/stepper.spec.json
 */
const shared = css`
  :host { display: block; color: var(--foreground-primary); }
  :host([hidden]) { display: none; }
  nav { display: flex; box-sizing: border-box; }
  p { margin: 0; }
  .steps { display: flex; flex: 1 1 auto; min-inline-size: 0; }
`;

export const horizontalStyles = [shared, css`
  /* ---- size: default --------------------------------------------------- */
  /* Steps share the width. The last one, with no line, takes only its head. */
  :host(:not([size="compact"])) nav { padding-inline: var(--space-md); }
  .steps { align-items: flex-start; }

  /* ---- size: compact --------------------------------------------------- */
  :host([size="compact"]) nav {
    flex-direction: column;
    gap: var(--space-md);
  }
  .summary,
  .heading {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    min-inline-size: 0;
  }
  .step-info {
    display: flex;
    gap: var(--space-2xs);
    color: var(--foreground-tertiary);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    white-space: nowrap;
  }
  .title {
    color: var(--foreground-primary);
    font: var(--text-title-medium);
    letter-spacing: var(--title-medium-letter-spacing);
  }
  .subtitle {
    color: var(--foreground-secondary);
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }
  .segments {
    display: flex;
    gap: var(--space-xs);
  }
`];

export const verticalStyles = [shared, css`
  /* ---- a rail, or a column of cards ------------------------------------ */
  .steps { flex-direction: column; }
  :host([card]) .steps { gap: var(--space-sm); }
`];
