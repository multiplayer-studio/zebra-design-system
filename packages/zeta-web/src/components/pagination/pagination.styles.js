import { css } from "lit";
export default css`
  .pagination {
    display: inline-flex;
    align-items: center;
    border-radius: inherit;
    gap: var(--space-sm);
    -webkit-tap-highlight-color: transparent;
  }

  zeta-icon-button {
    --control-sm: var(--space-2xl);
  }

  button {
    border-radius: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .page {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--space-2xl);
    height: var(--space-2xl);
    font: var(--body-small);
    color: var(--foreground-primary);
    background-color: var(--interactive-neutral-background-default);
    border: var(--stroke-base) solid var(--interactive-neutral-border-default);
    -webkit-tap-highlight-color: transparent;

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-neutral-background-hover);
      }
    }

    &:active {
      background-color: var(--interactive-neutral-background-pressed);
      border-color: var(--interactive-neutral-border-pressed);
    }

    &:focus-visible {
      border-color: transparent;
      outline: none;
      box-shadow: 0 0 0 var(--stroke-thick) var(--border-focus);
    }

    &.selected {
      color: var(--foreground-inverse);
      background-color: var(--interactive-inverse-background-selected);
      border-color: var(--interactive-inverse-border-default);
    }
  }

  :host([outline]) .page {
    border-width: var(--stroke-thin);
  }

  zeta-icon.more {
    --icon-color: var(--foreground-primary);
    --icon-size: 20px;
  }
`;
