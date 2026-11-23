import { css } from "lit";
/* Horizontal Stepper and Vertical Stepper from the Stepper spec. The stepper paints nothing itself: every colour
 * arrives with the zeta-stepper-items it holds. This lays them out. */
export default css `
  :host {
    display: block;
    color: var(--foreground-primary);
  }
  :host([hidden]) {
    display: none;
  }
  nav {
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
  }
  p {
    margin: 0;
  }
  .steps {
    display: flex;
    flex: 1 1 auto;
    align-items: flex-start;
    min-inline-size: 0;
  }

  /* Horizontal, size default: steps share the width; the last, with no line, takes only its head. */
  :host([variant="horizontal"]:not([size="compact"])) nav {
    padding-inline: var(--space-md);
  }

  /* Horizontal, size compact: the count and current step above a bar of segments. */
  :host([variant="horizontal"][size="compact"]) nav {
    flex-direction: column;
    align-items: stretch;
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

  /* Vertical: a rail, or a column of cards. */
  :host([variant="vertical"]) .steps {
    flex-direction: column;
    align-items: stretch;
  }
  :host([variant="vertical"][card]) .steps {
    gap: var(--space-sm);
  }

  /* Legacy overflow button, kept from the old stepper. */
  .stepper-item-overflow-button {
    flex: none;
    margin-inline-start: var(--space-md);
  }
`;
//# sourceMappingURL=stepper.styles.js.map