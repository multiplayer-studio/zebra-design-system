import { css } from "lit";

/**
 * Every value here is a semantic token.
 * Spec: specs/card/card.spec.json
 */
export default css`
  :host {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--space-lg);
    padding: var(--space-lg);
  }

  :host([hidden]) {
    display: none;
  }

  .leading,
  .trailing {
    flex: none;
    display: flex;
    align-items: center;
  }

  .leading[hidden],
  .trailing[hidden] {
    display: none;
  }

  .text {
    flex: 1 1 auto;
    min-width: 0;
  }

  .heading {
    font-family: var(--title-medium-font-family), system-ui, sans-serif;
    font-size: var(--title-medium-font-size);
    font-weight: var(--title-medium-font-weight);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  .subheading {
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }
`;
