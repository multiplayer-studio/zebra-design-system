import { css } from "lit";

/* Spec: specs/select (Menu Item rows, tokens in specs/dropdown). A control/md row, space/2xs by space/md padding,
   label/medium; every state is a ghost fill, and focus adds a stroke/thin border/focus ring inside the row. */
export default css`
  :host {
    display: block;
  }

  .option {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: var(--control-md);
    padding: var(--space-2xs) var(--space-md);
    border-radius: var(--zebra-radius-none);
    cursor: pointer;
    outline: none;
    background-color: var(--interactive-ghost-background-default);
    color: var(--interactive-neutral-foreground-default);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    -webkit-tap-highlight-color: transparent;
    --icon-size: var(--control-icon-sm);
    --icon-color: currentColor;
  }

  :host([rounded]) .option {
    border-radius: var(--radius-sm);
  }

  [part="option-text"] {
    flex: 1 1 auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--option-max-lines, 2);
    overflow: hidden;
    min-width: 0;
    padding: 0 var(--space-2xs);
    overflow-wrap: break-word;
    word-break: break-word;
  }

  /* The check mark sits where Menu Item's trailing icon does (spec: Select's selected row is Menu Item State=selected
     plus a check mark). */
  .check {
    flex: none;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .option:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  :host([selected]) .option {
    background-color: var(--interactive-ghost-background-selected);
  }

  .option:focus-visible {
    background-color: var(--interactive-ghost-background-focused);
    box-shadow: inset 0 0 0 var(--stroke-thin) var(--border-focus);
  }

  :host([disabled]) .option {
    cursor: not-allowed;
    background-color: var(--interactive-ghost-background-disabled);
    color: var(--interactive-neutral-foreground-disabled);
  }
`;
