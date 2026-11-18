import { css } from "lit";
/**
 * Every colour and dimension is a semantic token; sections follow the spec's
 * size, then checked x state tables.
 *
 * Spec: specs/checkbox/checkbox.spec.json
 */
export default css `
  :host {
    /* --- geometry: size axis (large default) --------------------------- */
    /* Same box sizes as the radio ring. The mark fills what is left inside
       the stroke. */
    --zds-checkbox-box: var(--control-xs);
    --zds-checkbox-radius: var(--radius-element-sm);
    --zds-checkbox-mark: calc(var(--zds-checkbox-box) - 2 * var(--stroke-thick));

    /* --- colour: checked x state --------------------------------------- */
    --zds-checkbox-stroke: var(--interactive-selection-border-default);
    --zds-checkbox-fill: transparent;
    /* foreground/on-strong (white in every mode), as Figma binds it. Spec
       warn: on checked hover in dark mode the fill turns light and the mark
       measures 1.51:1; fixing it belongs in the tokens, not here. */
    --zds-checkbox-mark-color: var(--foreground-on-strong);
    --zds-checkbox-mark-display: none;

    display: inline-flex;
    align-items: center;
    gap: var(--space-none);
    cursor: pointer;
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* The 40 by 40 touch target the box sits centred in. */
  .target {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    inline-size: var(--control-target-min);
    block-size: var(--control-target-min);
  }

  /* 1. Box. */
  .box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--zds-checkbox-box);
    block-size: var(--zds-checkbox-box);
    border: var(--stroke-thick) solid var(--zds-checkbox-stroke);
    border-radius: var(--zds-checkbox-radius);
    background: var(--zds-checkbox-fill);
    color: var(--zds-checkbox-mark-color);
  }

  /* 2. Mark — a glyph, so it takes currentColor. The outer scope's
     --zds-icon-box wins over the icon's own :host default. */
  .mark {
    display: var(--zds-checkbox-mark-display);
    --zds-icon-box: var(--zds-checkbox-mark);
  }

  /* 3. Label. */
  .label {
    color: var(--foreground-primary);
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  /* ---- size --------------------------------------------------------- */
  :host([size="medium"]) {
    --zds-checkbox-box: var(--control-icon-sm);
    --zds-checkbox-radius: var(--radius-xs);
  }

  /* ---- checked / indeterminate: a filled box with a mark ------------- */
  :host([checked]),
  :host([indeterminate]) {
    --zds-checkbox-stroke: var(--interactive-selection-border-pressed);
    --zds-checkbox-fill: var(--interactive-selection-background-pressed);
    --zds-checkbox-mark-display: inline-flex;
  }

  /* ---- state: hover (pointer over the control, label included) ------ */
  :host(:hover:not([disabled])) {
    --zds-checkbox-stroke: var(--interactive-selection-border-hover);
  }
  :host(:hover:not([disabled])[checked]),
  :host(:hover:not([disabled])[indeterminate]) {
    --zds-checkbox-fill: var(--interactive-selection-background-hover);
  }

  /* ---- state: focus ------------------------------------------------- */
  /* One border/focus ring at stroke/thick directly outside the box (offset 0). */
  :host(:focus-visible) .box {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
  }

  /* ---- state: disabled ---------------------------------------------- */
  /* The mark stays visible, so a disabled checkbox still reports its value. */
  :host([disabled]) {
    --zds-checkbox-stroke: var(--interactive-selection-border-disabled);
    --zds-checkbox-mark-color: var(--foreground-disabled);
    cursor: not-allowed;
  }
  :host([disabled][checked]),
  :host([disabled][indeterminate]) {
    --zds-checkbox-fill: var(--interactive-selection-background-disabled);
  }
  :host([disabled]) .label {
    color: var(--foreground-disabled);
  }

  /* No transitions: the spec defines no motion. */
`;
