import { css } from "lit";
/* Spec: specs/select. Label, field and hint stack space/2xs apart. The field is Input / Select: Input's field with a
   chevron that turns at open, so it reads the same tokens (see text-input.styles.js). The border is drawn inset through
   --_border and --_border-width; keyboard focus trades it for a stroke/thick border/focus ring outside, and open keeps
   a stroke/thin border/focus one. The options open space/2xs below the field on surface/overlay, Shadow/medium, space/card
   padding, radius/element-md when rounded. */
export default css `
  :host {
    display: block;
    --_fill: var(--interactive-neutral-background-default);
    --_border: var(--interactive-neutral-border-default);
    --_border-width: var(--stroke-thin);
    --_radius: var(--zebra-radius-none);
    --_height: var(--control-md);
    --icon-size: var(--control-icon-md);
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

  :host([size="small"]) {
    --_height: var(--control-sm);
    --icon-size: var(--control-icon-sm);
  }
  :host([size="large"]) {
    --_height: var(--control-lg);
  }

  .hidden-select,
  .slot {
    display: none;
  }

  /* Label, field and hint space/xs apart, as Input. */
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  /* ---- label ---- */
  .label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    cursor: default;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  .label label {
    font: inherit;
    color: inherit;
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
  zeta-icon {
    flex-shrink: 0;
  }

  .input {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    height: var(--_height);
    /* Input Field's minimum width, as on the zds- field. The field takes the width it is given and never sizes to its
       value. --select-input-min-width lowers it where a short value needs little room, such as rows per page. */
    min-inline-size: var(--select-input-min-width, calc(6 * var(--control-sm)));
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--_radius);
    background-color: var(--_fill);
    box-shadow: inset 0 0 0 var(--_border-width) var(--_border);
    color: var(--foreground-disabled);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
    cursor: pointer;
    outline: none;
    --icon-color: var(--foreground-primary);
  }

  /* Outranks the Contourable mixin's :host .contourable-target radius. */
  :host .input.contourable-target {
    border-radius: var(--_radius);
  }

  :host([size="small"]) .input {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  .input.has-value {
    color: var(--foreground-primary);
  }

  /* Zero intrinsic width, so a long value truncates instead of widening the field. */
  [part="input-text"] {
    flex: 1;
    width: 0;
    min-width: 0;
    padding: 0 var(--space-2xs);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .expand-more {
    transition: transform var(--animations-smooth);
  }

  :host([open]) .expand-more {
    transform: rotate(180deg);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):not([error])) .input:hover {
      --_border: var(--interactive-neutral-border-hover);
    }
  }

  :host([open]) .input {
    --_border: var(--border-focus);
  }

  .input:focus-visible {
    box-shadow: none;
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  :host([readOnly]) .input {
    cursor: default;
    --_border: var(--border-subtle);
  }

  :host([error]:not([disabled])) .input {
    --_border: var(--border-error);
    --_border-width: var(--stroke-thin);
  }

  :host([disabled]) .input {
    cursor: not-allowed;
    --_fill: var(--interactive-neutral-background-disabled);
    --_border: var(--interactive-neutral-border-disabled);
    --icon-color: var(--foreground-disabled);
    color: var(--foreground-disabled);
  }

  :host([disabled]) .label,
  :host([disabled]) .required,
  :host([disabled]) .information {
    color: var(--foreground-disabled);
    --icon-color: var(--foreground-disabled);
  }

  /* ---- flavour ---- */
  :host([flavor="gradient"]:not([disabled]):not([error])) .input {
    box-shadow: none;
    border: var(--stroke-thin) solid transparent;
    background:
      linear-gradient(var(--_fill), var(--_fill)) padding-box,
      linear-gradient(90deg, var(--foreground-gradient-start), var(--foreground-gradient-end)) border-box;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="gradient"]:not([disabled]):not([error])) .input:hover {
      background: var(--_fill);
      border-color: var(--border-gradient-end);
    }
  }

  :host([flavor="gradient"][open]:not([disabled]):not([error])) .input {
    background: var(--_fill);
    border-color: var(--border-gradient-start);
  }

  :host([flavor="ghost"]) .input {
    --_fill: transparent;
    --_border: var(--interactive-ghost-border-default);
    --_border-width: var(--stroke-base);
  }

  :host([flavor="ghost"][disabled]) .input {
    --_border: var(--interactive-ghost-border-disabled);
  }

  /* ---- hint ---- */
  .hint {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    cursor: default;
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }

  .hint-text {
    color: inherit;
  }

  :host([error]:not([disabled])) .hint {
    color: var(--foreground-error);
    --icon-color: var(--foreground-error);
  }

  :host([disabled]) .hint {
    color: var(--foreground-disabled);
    --icon-color: var(--foreground-disabled);
  }

  /* ---- options ---- */
  .input-options {
    position: relative;
  }

  .options {
    box-sizing: border-box;
    display: none;
    position: absolute;
    z-index: 1;
    width: 100%;
    min-inline-size: var(--select-input-options-min-width, auto);
    margin-top: var(--space-2xs);
    padding: var(--space-card);
    overflow-y: auto;
    border-radius: var(--zebra-radius-none);
    background-color: var(--surface-overlay);
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }

  :host([rounded]) .options {
    border-radius: var(--radius-element-md);
  }

  :host([open]) .options {
    display: block;
  }

  /* Dropdown Menu's compact: space/xs inset. */
  :host([compact]) .options {
    padding: var(--space-xs);
  }

  @media (prefers-reduced-motion: reduce) {
    .expand-more {
      transition: none;
    }
  }
`;
//# sourceMappingURL=select-input.styles.js.map