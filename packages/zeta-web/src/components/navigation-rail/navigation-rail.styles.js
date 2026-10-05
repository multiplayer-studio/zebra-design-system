import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-direction: column;
    width: min-content;
    gap: var(--space-xs);
    padding: var(--space-card) var(--space-md);
    background-color: var(--surface-section);
  }

  ::slotted(:not(zeta-navigation-rail-item)) {
    display: none;
  }
`;
