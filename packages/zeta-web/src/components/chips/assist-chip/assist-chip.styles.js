import { css } from "lit";

/* Spec: specs/assist-chip. space/xs by space/sm padding with no gap: the label's own space/xxs padding separates
   the icon, label and remove. Color recolours the border and the text; the fill follows state. Selected and dragged
   are Figma states with no code trigger here (spec issue). */
export default css`
  :host {
    --_bg: var(--assist-chip-background, var(--interactive-neutral-background-default));
    --_border: var(--assist-chip-border, var(--_tone-border, var(--interactive-neutral-border-default)));
    --_fg: var(--assist-chip-foreground, var(--_tone-fg, var(--interactive-neutral-foreground-default)));
  }

  :host([color="green"]) {
    --_tone-border: var(--border-success);
    --_tone-fg: var(--feedback-success-foreground);
  }
  :host([color="orange"]) {
    --_tone-border: var(--zebra-border-warning);
    --_tone-fg: var(--feedback-warning-foreground);
  }
  :host([color="blue"]) {
    --_tone-border: var(--zebra-border-info);
    --_tone-fg: var(--feedback-info-foreground);
  }
  :host([color="red"]) {
    --_tone-border: var(--border-error);
    --_tone-fg: var(--feedback-error-foreground);
  }

  .chip {
    padding: var(--space-xs) var(--space-sm);
    font: var(--text-indicator-medium);
    letter-spacing: var(--indicator-medium-letter-spacing);
  }

  .label {
    padding: 0 var(--space-xxs);
  }

  .icon {
    --icon-size: var(--control-icon-xs);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .chip:hover {
      --_bg: var(--assist-chip-background, var(--interactive-neutral-background-hover));
    }
  }

  :host(:not([disabled])) .chip:active {
    --_bg: var(--assist-chip-background, var(--interactive-neutral-background-pressed));
  }

  .chip:has(:focus-visible) {
    --_bg: var(--assist-chip-background, var(--interactive-neutral-background-focused));
  }
`;
