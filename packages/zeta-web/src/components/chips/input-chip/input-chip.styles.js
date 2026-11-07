import { css } from "lit";

/* Spec: specs/input-chip. control/target-min tall, space/2xs by space/sm padding, space/sm between avatar, label and
   remove, on the ghost fills. Always one row: the chip keeps its content width in any parent, and whatever lands in
   the label (an avatar left in the default slot, say) lines up beside the text, never above it. */
export default css`
  :host {
    flex: none;
    width: max-content;
    max-width: none;
    --_bg: var(--interactive-ghost-background-default);
    --_border: var(--interactive-neutral-border-default);
    --_fg: var(--interactive-neutral-foreground-default);
  }

  .chip {
    height: var(--control-target-min);
    gap: var(--space-sm);
    padding: var(--space-2xs) var(--space-sm);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .chip:hover {
      --_bg: var(--interactive-ghost-background-hover);
    }
  }

  .chip:has(:focus-visible) {
    --_bg: var(--interactive-ghost-background-focused);
  }

  .chip > *,
  ::slotted(*) {
    flex: none;
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    white-space: nowrap;
  }
`;
