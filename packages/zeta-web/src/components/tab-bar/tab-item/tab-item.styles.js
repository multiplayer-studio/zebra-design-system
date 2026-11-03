import { css } from "lit";

/* Spec: specs/tab-bar (Tab Item). control/lg tall (minimum): space/md top and bottom, space/gutter each side, space/sm
   between the icon, the label and the badge. A stroke/thick underline is always held, border/transparent until
   selected and interactive/primary/border/default after, so selecting shifts nothing. The label is label/medium on
   foreground/secondary, interactive/neutral/foreground/default when selected and …/disabled when off. Hover is the
   ghost hover fill. Selected binds ghost/focused at zero paint opacity in Figma (spec note), so it keeps the ghost
   default fill. */
export default css`
  :host {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    min-height: var(--control-lg);
    padding: var(--space-md) var(--space-gutter);
    border-bottom: var(--stroke-thick) solid var(--border-transparent);
    border-radius: var(--zebra-radius-none);
    background-color: var(--interactive-ghost-background-default);
    color: var(--foreground-secondary);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    --icon-size: var(--control-icon-md);
    --icon-color: currentColor;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):hover) {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  :host([selected]),
  :host([active]) {
    border-bottom-color: var(--interactive-primary-border-default);
    color: var(--interactive-neutral-foreground-default);
  }

  :host([disabled]) {
    cursor: not-allowed;
    color: var(--interactive-neutral-foreground-disabled);
  }

  /* No focus variant in Figma; the ring is the implementation's, inside the tab. */
  :host(:focus-visible) {
    box-shadow: inset 0 0 0 var(--stroke-thick) var(--border-focus);
  }

  .icon[hidden] {
    display: none;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
