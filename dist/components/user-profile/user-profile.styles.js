import { css } from "lit";
/**
 * Every value here is a semantic token.
 * Spec: specs/global-header/global-header.spec.json (_User Profile)
 */
export default css `
  :host {
    display: inline-flex;
  }

  :host([hidden]) {
    display: none;
  }

  .control {
    appearance: none;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    block-size: var(--control-md);
    margin: 0;
    padding: var(--space-2xs) var(--space-sm);
    border: var(--stroke-base) solid var(--interactive-neutral-border-default);
    border-radius: var(--radius-none);
    background: var(--interactive-neutral-background-default);
    color: var(--foreground-primary);
    font: inherit;
    cursor: pointer;
  }

  :host([rounded]) .control {
    border-radius: var(--radius-sm);
  }

  .control:hover:not(:disabled) {
    background: var(--interactive-neutral-background-hover);
  }

  .control:active:not(:disabled) {
    background: var(--interactive-neutral-background-pressed);
  }

  .control:focus-visible {
    background: var(--interactive-neutral-background-focused);
    border: var(--stroke-thin) solid var(--border-focus);
    outline: none;
  }

  .control:disabled {
    background: var(--interactive-neutral-background-disabled);
    border-color: var(--interactive-neutral-border-disabled);
    color: var(--interactive-ghost-foreground-disabled);
    cursor: not-allowed;
  }

  .username {
    font-family: var(--label-small-font-family), system-ui, sans-serif;
    font-size: var(--label-small-font-size);
    font-weight: var(--label-small-font-weight);
    line-height: var(--label-small-line-height);
    letter-spacing: var(--label-small-letter-spacing);
    white-space: nowrap;
  }
`;
