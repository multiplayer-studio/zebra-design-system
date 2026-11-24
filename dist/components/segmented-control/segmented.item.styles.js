import { css } from "lit";
/* Spec: specs/segmented-control (_Segmented item). At least control/sm tall, space/2xs block padding; space/md to
   space/lg inline with a space/2xs gap for icon and label, space/lg both sides for one of them. label/medium on
   foreground/secondary, foreground/primary on hover and when active. The active fill is the control's indicator. */
export default css `
  :host {
    display: flex;
    border-radius: var(--zebra-radius-none);
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  :host([rounded]) {
    border-radius: var(--radius-sm);
  }

  .segment {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2xs);
    min-height: var(--control-sm);
    padding: var(--space-2xs) var(--space-lg) var(--space-2xs) var(--space-md);
    border-radius: inherit;
    cursor: pointer;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-secondary);
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  :host([flavor="text-only"]) .segment,
  :host([flavor="icon-only"]) .segment {
    padding-inline: var(--space-lg);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .segment:hover {
      color: var(--foreground-primary);
    }
  }

  :host([active]) .segment {
    color: var(--foreground-primary);
  }

  :host(:focus-visible) .segment {
    outline: var(--stroke-thick) solid var(--border-focus);
  }
`;
//# sourceMappingURL=segmented.item.styles.js.map