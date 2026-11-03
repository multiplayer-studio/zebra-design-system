import { css } from "lit";

/* Spec: specs/filter-chip. A fixed 32px height (unbound in Figma, spec issue). Inactive pads space/sm by space/md
   with a space/xxs gap; active pads space/xxs by space/md with a space/sm gap around the check. Active is built only
   at default and focus, so it takes no hover or pressed fill. */
export default css`
  :host {
    --_bg: var(--interactive-neutral-background-default);
    --_border: var(--interactive-neutral-border-default);
    --_fg: var(--interactive-neutral-foreground-default);
  }

  .chip {
    height: 32px;
    gap: var(--space-xxs);
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
    font: var(--text-indicator-medium);
    letter-spacing: var(--indicator-medium-letter-spacing);
  }

  .icon {
    --icon-size: var(--control-icon-sm);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):not([active])) .chip:hover {
      --_bg: var(--interactive-neutral-background-hover);
    }
  }

  :host(:not([disabled]):not([active])) .chip:active {
    --_bg: var(--interactive-neutral-background-pressed);
  }

  :host(:not([active])) .chip:focus-visible {
    --_bg: var(--interactive-neutral-background-focused);
  }

  :host([active]:not([disabled])) .chip {
    gap: var(--space-sm);
    padding-block: var(--space-xxs);
    --_bg: var(--interactive-inverse-background-selected);
    --_border: var(--interactive-inverse-border-pressed);
    --_fg: var(--interactive-inverse-foreground-default);
  }
`;
