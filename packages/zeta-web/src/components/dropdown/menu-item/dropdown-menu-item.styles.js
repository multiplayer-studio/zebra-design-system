import { css } from "lit";
export default css`
  .droppable-item {
    background-color: var(--interactive-ghost-background-default);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    user-select: none;
    min-height: var(--control-md);
    padding: var(--space-xs) var(--space-md);
    gap: var(--space-sm);
    font: var(--label-medium);
  }

  .droppable-item slot:not([name]) {
    flex: 1;
  }

  /* Size Variants */
  :host([size="small"]) .droppable-item {
    font: var(--label-small);
    padding: var(--spacing-small);
    gap: var(--spacing-minimum);
  }
  :host([size="small"]) ::slotted([slot="icon"]) {
    --icon-size: var(--spacing-large);
  }

  :host([size="medium"]) .droppable-item {
    font: var(--label-medium);
    -webkit-tap-highlight-color: transparent;
    padding: var(--space-xs) var(--space-md);
    gap: var(--space-sm);
  }
  :host([size="medium"]) ::slotted([slot="icon"]) {
    --icon-size: var(--spacing-xl);
  }

  :host([size="large"]) .droppable-item {
    font: var(--body-medium);
    padding: var(--spacing-medium) var(--spacing-large);
    gap: var(--spacing-small);
  }
  :host([size="large"]) ::slotted([slot="icon"]) {
    --icon-size: var(--spacing-xl);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .droppable-item:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  .droppable-item:active,
  :host([selected]) .droppable-item {
    background-color: var(--interactive-ghost-background-selected);
  }

  :host([disabled]) .droppable-item {
    background-color: var(--interactive-ghost-background-disabled);
    color: var(--interactive-neutral-foreground-disabled);
  }

  :host ::slotted(zeta-icon) {
    --icon-color: var(--interactive-neutral-foreground-default);
  }
  :host([disabled]) ::slotted(zeta-icon) {
    --icon-color: var(--interactive-neutral-foreground-disabled);
  }

  ::slotted(zeta-icon) {
    --icon-size: 20px;
  }
`;
