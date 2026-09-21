import { css } from "lit";
export default css`
  :host {
    width: min-content;
    display: flex;
    gap: var(--space-sm);
    white-space: nowrap;
    background-color: var(--interactive-ghost-background-default);
    color: var(--foreground-secondary);
    --icon-color: var(--foreground-secondary);
    padding: var(--space-md) var(--space-lg);
    font: var(--title-medium);
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):hover) {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  :host([disabled]) {
    color: var(--interactive-neutral-foreground-disabled);
    --icon-color: var(--interactive-neutral-foreground-disabled);
  }

  :host([active]) {
    border-bottom: var(--stroke-thick) solid var(--interactive-primary-border-default);
    color: var(--interactive-neutral-foreground-default);
    --icon-color: var(--interactive-neutral-foreground-default);
  }
`;
