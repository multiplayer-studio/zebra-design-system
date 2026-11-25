import { css } from "lit";
/* Shared by the refined chips (specs/assist-chip, filter-chip, input-chip). Each renders its root with class "chip",
   so the legacy .container rules in base-chip.styles.js (still used by zeta-status-chip) do not reach it. Colour runs
   through --_bg, --_border and --_fg; a focused chip trades its border for a focus/outline ring outside it. */
export default css `
  :host {
    display: inline-flex;
    -webkit-tap-highlight-color: transparent;
  }

  .chip {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    white-space: nowrap;
    background-color: var(--_bg);
    color: var(--_fg);
    border: var(--stroke-thin) solid var(--_border);
    border-radius: var(--zebra-radius-none);
    --icon-color: currentColor;
    transition: background-color 120ms ease;
  }

  :host([rounded]) .chip {
    border-radius: var(--radius-pill);
  }

  /* Focus on the chip itself, or on a button inside it (assist and input chips hold two targets). */
  .chip:focus-visible,
  .chip:has(:focus-visible) {
    border-color: transparent;
    outline: var(--stroke-thick) solid var(--focus-outline);
    outline-offset: 0;
  }

  :host([disabled]) .chip {
    cursor: not-allowed;
    --_bg: var(--interactive-neutral-background-disabled);
    --_fg: var(--interactive-neutral-foreground-disabled);
    /* Set directly: the Interactive mixin colours disabled children at the same specificity. */
    color: var(--_fg);
    --icon-color: var(--_fg);
    border-color: transparent;
  }

  /* The action inside a chip that also holds a remove control. */
  .action {
    all: unset;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  :host([disabled]) .action {
    cursor: not-allowed;
  }

  /* A remove control: a real button around the 16px close glyph, with a hit area past it. */
  .remove {
    all: unset;
    position: relative;
    display: inline-flex;
    flex: none;
    cursor: pointer;
    border-radius: var(--radius-pill);
    --icon-size: var(--control-icon-sm);
  }

  .remove::before {
    content: "";
    position: absolute;
    inset: calc(var(--space-2xs) * -1);
  }

  :host([disabled]) .remove {
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    .chip {
      transition: none;
    }
  }
`;
//# sourceMappingURL=chip.styles.js.map