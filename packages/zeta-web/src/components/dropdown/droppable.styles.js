import { css } from "lit";
export default css`
  :host {
    display: none;
    position: absolute;
  }

  :host([open]) {
    display: flex;
    flex-direction: column;
    background-color: var(--surface-menu);
    gap: var(--space-xs);
    padding: var(--space-card);
    width: fit-content;
    box-shadow:
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft),
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
    z-index: 5;
    overflow-x: auto;
  }

  :host([rounded]) {
    border-radius: var(--radius-element-md);
  }
`;
