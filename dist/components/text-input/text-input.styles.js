import { css } from "lit";
/* Spec: specs/input (Input, Input / <Type>, Input Label, Input Hint). The field's border is drawn inset through
   --_border and --_border-width so a state change never moves the layout; focus trades it for a stroke/thick
   border/focus ring outside. The gradient flavour draws its border as a gradient under the fill. Textarea and
   integer are Zeta's own types and keep their layout, on the same tokens. */
export default css `
  :host {
    --_fill: var(--interactive-neutral-background-default);
    --_border: var(--interactive-neutral-border-default);
    --_border-width: var(--stroke-thin);
    --_radius: var(--zebra-radius-none);
  }

  :host([block]) {
    display: block;
    width: 100%;
  }

  :host([rounded]) {
    --_radius: var(--radius-sm);
  }
  :host([shape="sharp"]) {
    --_radius: var(--zebra-radius-none);
  }
  :host([shape="rounded"]) {
    --_radius: var(--radius-sm);
  }
  :host([shape="full"]) {
    --_radius: var(--radius-pill);
  }

  :host * {
    border: none;
    outline: none;
  }

  /* ---- assembly: label, field, hint, space/xs apart (as Select) ---- */
  :host .container,
  .labelled {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    height: fit-content;
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    width: fit-content;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  .required {
    color: var(--foreground-error);
  }

  .optional {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  .information {
    --icon-size: var(--control-icon-md);
    --icon-color: var(--foreground-primary);
  }

  /* Input Label's root: the label row, then the sub label, space/xs apart. */
  .label-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }

  .sub-label {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
  }

  :host([disabled]) .sub-label {
    color: var(--foreground-disabled);
  }

  /* ---- field ---- */
  .input-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    height: var(--control-md);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--_radius);
    background-color: var(--_fill);
    box-shadow: inset 0 0 0 var(--_border-width) var(--_border);
    -webkit-tap-highlight-color: transparent;
  }

  :host([size="small"]) .input-container {
    height: var(--control-sm);
  }

  :host([size="large"]) .input-container {
    height: var(--control-lg);
  }

  .input-container.text-area {
    height: auto;
    align-items: flex-start;
  }

  .input-container input,
  .input-container textarea {
    flex: 1;
    width: 100%;
    margin: 0;
    padding: 0 var(--space-2xs);
    background-color: transparent;
    color: var(--foreground-primary);
    caret-color: var(--foreground-cursor);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  :host([size="small"]) input,
  :host([size="small"]) .affix {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  .input-container textarea::placeholder,
  .input-container input::placeholder {
    color: var(--foreground-disabled);
  }

  zeta-icon.left,
  zeta-icon.right,
  .input-container zeta-icon {
    flex: none;
    --icon-size: var(--control-icon-md);
    --icon-color: var(--foreground-primary);
  }

  :host([size="small"]) .input-container zeta-icon {
    --icon-size: var(--control-icon-sm);
  }

  .affix {
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
    color: var(--foreground-secondary);
  }

  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator {
    display: none !important;
    /* TODO: Firefox default date icon appears. */
  }

  textarea {
    resize: none;
    width: 100%;
  }

  /* ---- states ---- */
  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):not([error])) .input-container:hover {
      --_border: var(--interactive-neutral-border-hover);
    }
  }

  .input-container:has(input:focus),
  .input-container:has(textarea:focus) {
    box-shadow: none;
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  :host([readOnly]) .input-container {
    --_border: var(--border-subtle);
  }

  :host([error]:not([disabled])) .input-container {
    --_border: var(--border-error);
    --_border-width: var(--stroke-thin);
  }

  :host([disabled]) .input-container {
    pointer-events: none;
    --_fill: var(--interactive-neutral-background-disabled);
    --_border: var(--interactive-neutral-border-disabled);
  }

  :host([disabled]) input,
  :host([disabled]) textarea,
  :host([disabled]) .affix,
  :host([disabled]) .label {
    color: var(--foreground-disabled);
  }

  :host([disabled]) .input-container zeta-icon,
  :host([disabled]) .information {
    --icon-color: var(--foreground-disabled);
  }

  :host([disabled]) input::placeholder,
  :host([disabled]) textarea::placeholder {
    color: inherit;
  }

  /* ---- flavour ---- */
  :host([flavor="gradient"]:not([disabled]):not([error])) .input-container {
    box-shadow: none;
    border: var(--stroke-thin) solid transparent;
    background:
      linear-gradient(var(--_fill), var(--_fill)) padding-box,
      linear-gradient(90deg, var(--foreground-gradient-start), var(--foreground-gradient-end)) border-box;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="gradient"]:not([disabled]):not([error])) .input-container:hover {
      background: var(--_fill);
      border-color: var(--border-gradient-end);
    }
  }

  :host([flavor="ghost"]) .input-container {
    --_fill: transparent;
    --_border: var(--interactive-ghost-border-default);
    --_border-width: var(--stroke-base);
  }

  :host([flavor="ghost"][disabled]) .input-container {
    --_border: var(--interactive-ghost-border-disabled);
  }

  /* ---- hint ---- */
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

  :host([disabled]) .hint-text {
    color: var(--foreground-disabled);
    --icon-color: var(--foreground-disabled);
  }

  /* ---- integer mode (Zeta only) ---- */
  :host([type="integer"]) .container:not(:hover) .arrows-container {
    display: none;
  }

  :host([type="integer"]) .input-container .arrows-container {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    width: 16px;
    height: 24px;
    background-color: var(--_fill);
  }

  :host([type="integer"]) .input-container .arrows-container .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
  }

  :host([type="integer"]) .input-container .arrows-container .arrow svg {
    fill: var(--foreground-secondary);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([type="integer"]) .input-container .arrows-container .arrow:hover svg {
      fill: var(--foreground-primary);
    }
  }

  :host([type="integer"]) .input-container .arrows-container .arrow:active {
    transform: scale(0.75);
  }
`;
//# sourceMappingURL=text-input.styles.js.map