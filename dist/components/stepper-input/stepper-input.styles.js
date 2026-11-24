import { css } from "lit";
/* Spec: specs/stepper-input. Two outline-subtle Icon Buttons either side of the value, space/sm apart, with the hint
   space/sm below. The value is Input's field (see text-input.styles.js): control/md or control/lg tall, 72 wide (raw
   in Figma), space/sm by space/md padding, body/medium centred, an inset stroke/thin interactive/neutral border, and
   Input's stroke/thick border/focus ring while it has focus. It rounds to radius/sm with the buttons, as the file
   draws it (spec warn: the metadata says only the buttons round). Disabled moves the field to the neutral disabled
   tokens and the buttons to the primary flavour, and removes the hint. */
export default css `
  :host {
    display: inline-block;
    --_height: var(--control-md);
    --_radius: var(--zebra-radius-none);
  }

  :host([size="large"]) {
    --_height: var(--control-lg);
  }

  :host([rounded]) {
    --_radius: var(--radius-sm);
  }

  .stepper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }

  .container {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Outranks the Contourable mixin's :host .contourable-target radius. */
  :host .input-container.contourable-target {
    border-radius: var(--_radius);
  }

  .input-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: var(--_height);
    padding: var(--space-sm) var(--space-md);
    background-color: var(--interactive-neutral-background-default);
    box-shadow: inset 0 0 0 var(--stroke-thin) var(--interactive-neutral-border-default);
  }

  .input-container:has(input:focus-visible) {
    box-shadow: none;
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  input {
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    text-align: center;
    color: var(--foreground-primary);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  :host([disabled]) .input-container {
    background-color: var(--interactive-neutral-background-disabled);
    box-shadow: inset 0 0 0 var(--stroke-thin) var(--interactive-neutral-border-disabled);
  }

  input:disabled {
    color: var(--foreground-disabled);
  }

  /* The hint: Input Hint's part, body/xsmall on foreground/secondary with a control/icon-sm info glyph. */
  .hint-text {
    display: flex;
    align-items: center;
    column-gap: var(--space-2xs);
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }

  :host([error]:not([disabled])) .hint-text {
    color: var(--foreground-error);
    --icon-color: var(--foreground-error);
  }
`;
//# sourceMappingURL=stepper-input.styles.js.map