import { css } from "lit";
/* Spec: specs/search. control/sm, control/md and control/lg tall, space/sm by space/md padding, space/2xs between
   parts. The border is drawn inset through --_border and --_border-width, so a state change never moves the layout;
   focus on an empty field trades it for a stroke/thick border/focus ring outside, and typing keeps a stroke/thin
   border/focus one inside. Icons follow the field-family rule: foreground/primary, foreground/disabled when disabled
   (spec warn "Icon colour is half-migrated"). The --search-border-color override stays for existing Zeta use. */
export default css `
  :host {
    display: flex;
    align-items: center;
    /* Its default width, but never wider than its container: in a narrower one the input gives way. */
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    height: fit-content;
    --icon-size: var(--control-icon-md);
    --icon-color: var(--foreground-primary);
    --_fill: var(--interactive-neutral-background-default);
    --_border: var(--search-border-color, var(--interactive-neutral-border-default));
    --_border-width: var(--stroke-thin);
    --_height: var(--control-lg);
  }

  :host([block]) {
    width: 100%;
  }

  :host([size="medium"]) {
    --_height: var(--control-md);
  }

  :host([size="small"]) {
    --_height: var(--control-sm);
    --icon-size: var(--control-icon-sm);
  }

  #search-icon {
    display: var(--search-icon-display, block);
    flex: none;
  }

  form {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    min-width: 0;
    align-items: center;
    gap: var(--space-2xs);
    height: var(--_height);
    padding: var(--space-sm) var(--space-md);
    border-radius: inherit;
    background-color: var(--_fill);
    box-shadow: inset 0 0 0 var(--_border-width) var(--_border);
    -webkit-tap-highlight-color: transparent;
  }

  :host([shape="full"]) .contourable-target {
    border-radius: var(--radius-pill);
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  input {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 0 var(--space-2xs);
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--foreground-primary);
    caret-color: var(--foreground-cursor);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  :host([size="small"]) input {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  input::placeholder {
    color: var(--foreground-disabled);
  }

  /* The clear and voice controls: pressable glyphs whose target reaches past them. */
  .control {
    all: unset;
    position: relative;
    display: inline-flex;
    flex: none;
    cursor: pointer;
    border-radius: var(--radius-pill);
  }

  .control::before {
    content: "";
    position: absolute;
    inset: calc(var(--space-xs) * -1);
  }

  .control:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  .divider {
    flex: none;
    align-self: stretch;
    width: var(--stroke-thin);
    margin: 0 var(--space-2xs);
    background-color: var(--zebra-border-default);
  }

  /* ---- states ---- */
  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) form:hover {
      --_border: var(--interactive-neutral-border-hover);
    }
  }

  form:focus-within {
    box-shadow: none;
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  form.has-value:focus-within {
    --_border: var(--border-focus);
    box-shadow: inset 0 0 0 var(--_border-width) var(--_border);
    outline: none;
  }

  :host([disabled]) {
    --icon-color: var(--foreground-disabled);
  }

  :host([disabled]) form {
    pointer-events: none;
    --_fill: var(--interactive-neutral-background-disabled);
    --_border: var(--interactive-neutral-border-disabled);
  }

  :host([disabled]) input,
  :host([disabled]) input::placeholder {
    color: var(--foreground-disabled);
  }

  /* ---- flavour ---- */
  :host([flavor="gradient"]:not([disabled])) form {
    box-shadow: none;
    border: var(--stroke-thin) solid transparent;
    background:
      linear-gradient(var(--_fill), var(--_fill)) padding-box,
      linear-gradient(90deg, var(--foreground-gradient-start), var(--foreground-gradient-end)) border-box;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="gradient"]:not([disabled])) form:hover {
      background: var(--_fill);
      border-color: var(--border-gradient-end);
    }
  }

  :host([flavor="gradient"]:not([disabled])) form.has-value:focus-within {
    background: var(--_fill);
    border-color: var(--border-gradient-start);
    box-shadow: none;
  }

  :host([flavor="ghost"]) form {
    --_fill: transparent;
    --_border: var(--interactive-ghost-border-default);
    --_border-width: var(--stroke-base);
  }

  :host([flavor="ghost"][disabled]) form {
    --_border: var(--interactive-ghost-border-disabled);
  }
`;
//# sourceMappingURL=search.styles.js.map