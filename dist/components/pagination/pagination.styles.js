import { css } from "lit";
/* Spec: specs/pagination. control/sm squares space/sm apart, on the neutral interactive tokens. The border is drawn
   inset through --_border and --_border-width, stroke/base until outline gives it stroke/thin, so a state change never
   moves the layout. The selected page takes the inverse selected fill and drops its border. */
export default css `
  :host {
    display: inline-flex;
    --_radius: var(--zebra-radius-none);
    --_border-width: var(--stroke-base);
  }

  :host([rounded]) {
    --_radius: var(--radius-sm);
  }

  :host([outline]) {
    --_border-width: var(--stroke-thin);
  }

  .pagination {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    -webkit-tap-highlight-color: transparent;
  }

  .control,
  .page {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: var(--control-sm);
    height: var(--control-sm);
    border-radius: var(--_radius);
    cursor: pointer;
    background-color: var(--_bg);
    box-shadow: inset 0 0 0 var(--_border-width) var(--_border);
    color: var(--foreground-primary);
    --_bg: var(--interactive-neutral-background-default);
    --_border: var(--interactive-neutral-border-default);
    --icon-color: currentColor;
    --icon-size: var(--control-icon-md);
  }

  .page {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  .more {
    cursor: default;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    button:not(:disabled):hover {
      --_bg: var(--interactive-neutral-background-hover);
    }

    :host([outline]) button:not(:disabled):hover {
      --_border: var(--interactive-neutral-border-hover);
    }
  }

  button:not(:disabled):active {
    --_bg: var(--interactive-neutral-background-pressed);
    --_border: var(--interactive-neutral-border-pressed);
  }

  button:focus-visible {
    --_bg: var(--interactive-neutral-background-default);
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thick) * -1);
  }

  .page.selected,
  .page.selected:hover,
  .page.selected:active {
    --_bg: var(--interactive-inverse-background-selected);
    --_border: transparent;
    color: var(--foreground-inverse);
  }

  button:disabled {
    cursor: not-allowed;
    --_bg: var(--interactive-neutral-background-disabled);
    --_border: var(--interactive-neutral-border-disabled);
    color: var(--foreground-disabled);
  }
`;
//# sourceMappingURL=pagination.styles.js.map