import { css } from "lit";
/* Spec: specs/checkbox. Overrides base-toggle-form-element.styles.js, which Radio Button still shares, so every rule
   here repeats or outranks a base selector. The box sits centred in a control/target-min target, and that target
   alone separates the box from the label. The --checkbox-* overrides stay for existing Zeta use. */
export default css `
  :host {
    display: inline-block;
    --_box: var(--control-icon-sm);
    --_mark: 12px;
    --_radius: var(--radius-xs);
    --_border: var(--checkbox-border-color, var(--interactive-selection-border-default));
    --_fill: var(--checkbox-background, transparent);
    --_mark-color: var(--checkbox-icon-color, var(--foreground-on-strong));
  }

  /* large: control/xs box, Icon Size=medium mark. medium (and Zeta's small) keep the defaults above; the 12px mark
     is a scaled Icon with no size token (spec issue). */
  :host([size="large"]) {
    --_box: var(--control-xs);
    --_mark: var(--control-icon-md);
    --_radius: var(--radius-element-sm);
  }

  :host label {
    gap: 0;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
    cursor: pointer;
    width: auto !important;
    height: auto;
  }

  :host([reverse]) label {
    flex-direction: row-reverse;
  }

  :host label .container {
    box-sizing: border-box;
    width: var(--_box);
    height: var(--_box);
    min-width: 0;
    min-height: 0;
    margin: calc((var(--control-target-min) - var(--_box)) / 2);
    border: var(--stroke-thick) solid var(--_border);
    border-radius: var(--zebra-radius-none);
    background-color: var(--_fill);
    outline: none;
  }

  :host([rounded]) label .container {
    border-radius: var(--_radius);
  }

  :host label .container [part="icon"] {
    --icon-size: var(--_mark);
    --icon-color: var(--_mark-color);
  }

  /* checked and indeterminate fill the box. */
  :host([checked]) label .container,
  :host([indeterminate]) label .container {
    --_border: var(--interactive-selection-border-pressed);
    --_fill: var(--checkbox-checked-background, var(--interactive-selection-background-pressed));
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) label:hover .container {
      --_border: var(--interactive-selection-border-hover);
    }
    :host([checked]:not([disabled])) label:hover .container,
    :host([indeterminate]:not([disabled])) label:hover .container {
      --_border: var(--interactive-selection-border-hover);
      --_fill: var(--checkbox-hover-background, var(--interactive-selection-background-hover));
    }
  }

  /* Focus: a ring at the box's own size, outside it, over the state border. */
  :host label .container:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
  }

  /* Paint from the variables. The base sets border-color and background-color directly per state, so this list
     repeats each of its state selectors with .interactive-target added, which outranks it in every state. */
  :host label .container.interactive-target,
  :host([checked]) label .container.interactive-target,
  :host([indeterminate]) label .container.interactive-target,
  :host([disabled]) label .container.interactive-target,
  :host(:not([disabled])) label:hover .container.interactive-target,
  :host([checked]:not([disabled])) label:hover .container.interactive-target,
  :host([indeterminate]:not([disabled])) label:hover .container.interactive-target {
    border-color: var(--_border);
    background-color: var(--_fill);
  }

  /* Disabled keeps the mark visible so the value still reads. */
  :host([disabled]) label {
    cursor: not-allowed;
    color: var(--foreground-disabled);
  }
  :host([disabled]) label .container {
    --_border: var(--interactive-selection-border-disabled);
    --_fill: transparent;
    --_mark-color: var(--foreground-disabled);
  }
  :host([disabled][checked]) label .container,
  :host([disabled][indeterminate]) label .container {
    --_fill: var(--interactive-selection-background-disabled);
  }
`;
//# sourceMappingURL=checkbox.styles.js.map