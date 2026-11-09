import { css } from "lit";
/* Spec: specs/card (_Card Heading). Padding and gap from zds-card-heading; the spec records the text styles only. */
export default css `
  .card-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
    padding: var(--space-lg);
  }

  .leading {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    gap: inherit;
    align-items: center;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  h1 {
    margin: 0;
    font: var(--text-title-medium);
    letter-spacing: var(--title-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  h2 {
    margin: 0;
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  h2:empty {
    display: none;
  }

  .trailing {
    display: flex;
    flex: none;
    align-items: center;
  }
`;
//# sourceMappingURL=card-header.styles.js.map