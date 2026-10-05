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
    /* Label inset: 4px leading, 24px reserved trailing */
    padding: 0 var(--space-xl) 0 var(--space-xs);
  }

  :host([rounded]) .droppable-item {
    border-radius: var(--radius-sm);
  }

  .droppable-item {
    color: var(--interactive-neutral-foreground-default);
    font-size: var(--label-medium-font-size);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    box-sizing: border-box;
  }

  /* Focus ring is drawn inside the row; selected focus keeps the selected tint */
  .droppable-item:focus-visible {
    outline: none;
    background-color: var(--interactive-ghost-background-focused);
    box-shadow: inset 0 0 0 var(--stroke-thin) var(--border-focus);
  }
  :host([selected]) .droppable-item:focus-visible {
    background-color: var(--interactive-ghost-background-selected);
  }

  /* Size Variants */
  :host([size="small"]) .droppable-item {
    font: var(--label-small);
    padding: var(--space-sm);
    gap: var(--space-xs);
  }
  :host([size="small"]) ::slotted([slot="icon"]) {
    --icon-size: var(--space-lg);
  }

  :host([size="medium"]) .droppable-item {
    font: var(--label-medium);
    -webkit-tap-highlight-color: transparent;
    padding: var(--space-xs) var(--space-md);
    gap: var(--space-sm);
  }
  :host([size="medium"]) ::slotted([slot="icon"]) {
    --icon-size: var(--space-lg);
  }

  :host([size="large"]) .droppable-item {
    font: var(--body-medium);
    padding: var(--space-md) var(--space-lg);
    gap: var(--space-sm);
  }
  :host([size="large"]) ::slotted([slot="icon"]) {
    --icon-size: var(--space-lg);
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
