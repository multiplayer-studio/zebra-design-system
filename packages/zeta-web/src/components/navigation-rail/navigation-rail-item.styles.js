import { css } from "lit";

export default css`
  :host {
    display: flex;
    max-width: 64px;
  }
  slot {
    font: var(--indicator-small);
    font-size: var(--indicator-small-font-size);
    line-height: var(--indicator-small-line-height);
    letter-spacing: var(--indicator-small-letter-spacing);
  }

  :host(:not([disabled])[selected]) > * {
    --icon-color: var(--interactive-subtle-foreground-default);
    color: var(--interactive-subtle-foreground-default);
    background-color: var(--interactive-ghost-background-default);
  }

  :host([disabled]) > * {
    --icon-color: var(--interactive-subtle-foreground-disabled);
    color: var(--interactive-subtle-foreground-disabled);
  }

  :host > * {
    display: flex;
    box-sizing: border-box;
    min-width: var(--control-lg);
    min-height: var(--control-lg);
    overflow-x: hidden;
    text-overflow: ellipsis;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-sm) var(--space-xs);
    border-radius: var(--radius-sm);
    color: var(--interactive-neutral-foreground-default);
    font-weight: 500;
    --icon-color: var(--interactive-neutral-foreground-default);
    background-color: var(--interactive-ghost-background-default);
    -webkit-tap-highlight-color: transparent;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])[selected]) > *:hover {
      background-color: var(--interactive-ghost-background-default);
    }
    :host(:not([disabled]):not([selected])) > *:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  :host(:not([disabled]):not([selected])) > *:active {
    background-color: var(--interactive-ghost-background-pressed);
  }
`;
