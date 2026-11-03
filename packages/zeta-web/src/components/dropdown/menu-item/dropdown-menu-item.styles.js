import { css } from "lit";

/* Spec: specs/dropdown (Menu Item). One size: Zeta's size attribute no longer changes the row. Every state is a
   ghost fill; focus adds a 1px border/focus ring inside the row and leaves the fill alone. */
export default css`
  :host {
    display: block;
    -webkit-tap-highlight-color: transparent;
  }

  .droppable-item {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-sm);
    height: var(--control-md);
    padding: var(--space-xxs) var(--space-md);
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
    border-radius: var(--zebra-radius-none);
    background-color: var(--interactive-ghost-background-default);
    color: var(--interactive-neutral-foreground-default);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    outline: none;
  }

  :host([rounded]) .droppable-item {
    border-radius: var(--radius-sm);
  }

  /* The label's own padding sets it off the leading icon and reserves room on the trailing side. */
  .label {
    flex: 1;
    padding-inline: var(--space-xxs) var(--space-xl);
  }

  /* Checkbox and radio rows drop the gap and the leading padding: the control's own control/target-min target spaces
     the label and lines its box up with an Icon row's glyph. The 40px target overflows the row's padding and stays centred
     (spec note). */
  :host([type="checkbox"]) .droppable-item,
  :host([type="radio"]) .droppable-item {
    gap: var(--space-none);
    padding-inline-start: var(--space-none);
  }

  .control {
    flex: none;
  }

  ::slotted(zeta-icon) {
    flex: none;
    --icon-size: var(--control-icon-sm);
    --icon-color: currentColor;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .droppable-item:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  /* A 10% brand tint, stronger than hover, so hovering a selected row keeps it. The label moves to foreground/primary,
     the resting label's colour; selected focus keeps it too (spec note: Figma binds neutral there, same value). */
  :host([selected]) .droppable-item,
  :host([selected]:not([disabled])) .droppable-item:hover {
    background-color: var(--interactive-ghost-background-selected);
    color: var(--foreground-primary);
  }

  .droppable-item:focus-visible {
    background-color: var(--interactive-ghost-background-focused);
    box-shadow: inset 0 0 0 1px var(--border-focus);
  }

  :host([selected]) .droppable-item:focus-visible {
    background-color: var(--interactive-ghost-background-selected);
  }

  :host([disabled]) .droppable-item {
    cursor: not-allowed;
    background-color: var(--interactive-ghost-background-disabled);
    color: var(--interactive-neutral-foreground-disabled);
  }
`;
