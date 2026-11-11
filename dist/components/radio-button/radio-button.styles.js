import { css } from "lit";
/* Spec: specs/radio-button. Overrides base-toggle-form-element.styles.js like Checkbox does, so every state selector
   that paints repeats a base one with .interactive-target added. The ring (stroke/thick, drawn inside) sits centred in
   a control/target-min target: control/icon-sm with an 8px dot at medium (and Zeta's small), control/xs with a 12px
   dot at large. The dots have no token (spec warn). Checked uses the selection pressed tokens. Disabled hides the dot
   unless checked (spec blocker: Figma shows it on the unchecked disabled variant). */
export default css `
  :host {
    display: inline-block;
    background-color: transparent;
    --_ring: var(--control-icon-sm);
    --_dot: 8px;
    --_border: var(--interactive-selection-border-default);
    --_dot-color: transparent;
  }

  :host([size="large"]) {
    --_ring: var(--control-xs);
    --_dot: 12px;
  }

  :host label {
    gap: 0;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
    cursor: pointer;
    width: auto !important;
    height: auto !important;
  }

  :host label .container {
    box-sizing: border-box;
    width: var(--_ring);
    height: var(--_ring);
    margin: calc((var(--control-target-min) - var(--_ring)) / 2);
    border: var(--stroke-thick) solid var(--_border);
    border-radius: var(--radius-pill) !important;
    outline: none;
  }

  :host label .container *[part="icon"] {
    display: block;
    position: absolute;
    width: var(--_dot);
    height: var(--_dot);
    border-radius: var(--radius-pill);
    background-color: var(--_dot-color);
  }

  :host([checked]) label .container {
    --_border: var(--interactive-selection-border-pressed);
    --_dot-color: var(--interactive-selection-background-pressed);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) label:hover .container {
      --_border: var(--interactive-selection-border-hover);
    }
    :host([checked]:not([disabled])) label:hover .container {
      --_dot-color: var(--interactive-selection-background-hover);
    }
  }

  :host label .container:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
  }

  :host([disabled]) label {
    cursor: not-allowed;
    color: var(--foreground-disabled);
  }

  :host([disabled]) label .container {
    --_border: var(--interactive-selection-border-disabled);
    --_dot-color: transparent;
  }

  :host([disabled][checked]) label .container {
    --_dot-color: var(--interactive-selection-background-disabled);
  }

  /* Paint from the variables, outranking the base's direct border and background rules in every state. */
  :host label .container.interactive-target,
  :host([checked]) label .container.interactive-target,
  :host([checked]:not([disabled])) label .container.interactive-target,
  :host([disabled]) label .container.interactive-target,
  :host(:not([disabled])) label:hover .container.interactive-target,
  :host([checked]:not([disabled])) label:hover .container.interactive-target {
    border-color: var(--_border);
    background-color: transparent;
  }

  :host label .container.interactive-target *[part="icon"] {
    background-color: var(--_dot-color);
  }
`;
//# sourceMappingURL=radio-button.styles.js.map