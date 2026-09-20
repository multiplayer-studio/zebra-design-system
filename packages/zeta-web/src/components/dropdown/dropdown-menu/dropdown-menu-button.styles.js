import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
    -webkit-tap-highlight-color: transparent;
  }

  .droppable-item {
    height: var(--control-md);
    padding: 0 var(--space-md);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .droppable-item:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  .droppable-item:active {
    background-color: var(--interactive-ghost-background-selected);
  }

  :host([rounded]) .droppable-item {
    border-radius: var(--radius-sm);
  }
`;
