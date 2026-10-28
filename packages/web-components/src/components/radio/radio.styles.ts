import { css } from "lit";

/**
 * Every colour and dimension here is a semantic token from the generated CSS
 * layer. Because custom properties inherit through shadow roots, an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes this component with no
 * JavaScript and no re-render.
 *
 * Kept rule-for-rule in step with packages/react-baseui radio.css.
 *
 * Spec: specs/radio-button/radio-button.spec.json
 */
export default css`
  :host {
    /* --- geometry: size axis (large default) --------------------------- */
    /* Figma leaves the ring and dot unbound (spec warn "no size tokens").
       The ring binds the tokens it matches exactly (control/xs,
       control/icon-sm); the dot is what is left inside the ring's padding
       and stroke, which is exactly the drawn 12 / 8 with no new token. */
    --zds-radio-ring: var(--control-xs);
    --zds-radio-pad: var(--space-xxs);
    --zds-radio-dot: calc(var(--zds-radio-ring) - 2 * (var(--zds-radio-pad) + var(--stroke-thick)));

    /* --- colour: checked x state --------------------------------------- */
    --zds-radio-stroke: var(--interactive-selection-border-default);
    --zds-radio-fill: var(--interactive-selection-background-pressed);
    --zds-radio-dot-display: none;

    display: inline-flex;
    align-items: center;
    gap: var(--space-none);
    cursor: pointer;
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* The 40 by 40 touch target the ring sits centred in. */
  .target {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    inline-size: var(--control-target-min);
    block-size: var(--control-target-min);
  }

  /* 1. Ring. Transparent: Figma paints a ghost token at opacity 0 (spec warn
     "the ring's fill is a ghost token at 0% opacity"). */
  .ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--zds-radio-ring);
    block-size: var(--zds-radio-ring);
    border: var(--stroke-thick) solid var(--zds-radio-stroke);
    border-radius: var(--radius-pill);
    background: transparent;
  }

  /* 2. Inner fill. */
  .dot {
    display: var(--zds-radio-dot-display);
    inline-size: var(--zds-radio-dot);
    block-size: var(--zds-radio-dot);
    border-radius: var(--radius-pill);
    background: var(--zds-radio-fill);
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
    --zds-radio-ring: var(--control-icon-sm);
    --zds-radio-pad: var(--space-2xs);
  }

  /* ---- checked ------------------------------------------------------ */
  :host([checked]) {
    --zds-radio-stroke: var(--interactive-selection-border-pressed);
    --zds-radio-fill: var(--interactive-selection-background-pressed);
    --zds-radio-dot-display: block;
  }

  /* ---- state: hover (pointer over the control, label included) ------ */
  :host(:hover:not([disabled])) {
    --zds-radio-stroke: var(--interactive-selection-border-hover);
    --zds-radio-fill: var(--interactive-selection-background-hover);
  }

  /* ---- state: focus ------------------------------------------------- */
  /* One border/focus outline at stroke/thick, directly around the ring
     (offset 0), checked and unchecked alike (spec warn "the focus ring is
     built two ways"); the ring keeps its own colour. */
  :host(:focus-visible) .ring {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
  }

  /* ---- state: disabled ---------------------------------------------- */
  /* Both checked and unchecked are built, and unchecked hides the dot —
     Figma ships only unchecked, with the dot showing, so it reads as chosen
     (spec blocker "a disabled radio can't show whether it's chosen"). */
  :host([disabled]) {
    --zds-radio-stroke: var(--interactive-selection-border-disabled);
    --zds-radio-fill: var(--interactive-selection-background-disabled);
    cursor: not-allowed;
  }
  :host([disabled]) .label {
    color: var(--foreground-disabled);
  }

  /* No transitions: the spec defines no motion. */
`;
