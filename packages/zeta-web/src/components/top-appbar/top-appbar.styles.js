import { css } from "lit";

export default css`
  :host([centered]) .title {
    justify-content: center;
  }

  .title {
    flex: 1;
    display: flex;
    font: var(--label-large);
    font-size: var(--label-large-font-size);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
  }

  :host([centered]) .title {
    font: var(--label-medium);
    font-size: var(--label-medium-font-size);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  :host([extended]) .title {
    padding: 0 var(--space-sm);
    font: var(--label-large);
    font-size: var(--label-large-font-size);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
  }

  header {
    display: flex;
    height: fit-content;
    flex-direction: column;
    gap: var(--space-sm);
    background-color: var(--surface-section);
    padding: var(--space-md) var(--space-sm);
    font: var(--body-large);
  }

  :host([extended]) header {
    gap: var(--space-lg);
  }

  .body {
    gap: var(--space-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ::slotted(zeta-search) {
    --search-icon-display: none;
    --search-border-color: transparent;
    width: 100%;
  }
`;
