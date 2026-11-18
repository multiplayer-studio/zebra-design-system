import { css } from "lit";
/**
 * Every value here is a semantic token from the generated CSS layer. Keyed
 * off the reflected `selected` / `disabled` attributes. Nothing here knows
 * about themes: an .ext-* / .mode-* class on any ancestor changes what these
 * tokens resolve to.
 *
 * Spec: specs/tab-bar/tab-bar.spec.json
 */
export default css `
  :host {
    /* --- geometry ----------------------------------------------------- */
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-gutter);
    min-height: var(--control-lg);
    border-radius: var(--radius-none);
    /* The underline is always there, transparent until selected, so
       selecting shifts nothing (spec). */
    border-bottom: var(--stroke-thick) solid var(--zds-tab-item-underline);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    outline: none;

    /* --- colour: state axis ------------------------------------------- */
    background: var(--zds-tab-item-bg);
    color: var(--zds-tab-item-fg);
    --zds-tab-item-bg: var(--interactive-ghost-background-default);
    --zds-tab-item-fg: var(--foreground-secondary);
    --zds-tab-item-underline: var(--border-transparent);
  }

  :host([hidden]) {
    display: none;
  }

  .icon,
  .badge {
    flex: none;
  }

  /* ---- label ------------------------------------------------------------ */
  .label {
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    white-space: nowrap;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /* ---- selected --------------------------------------------------------- */
  :host([selected]) {
    /* Figma's selected fill is the ghost focused token at opacity 0 (spec
       note), so the surface stays at rest; only the underline and label move. */
    --zds-tab-item-underline: var(--interactive-primary-border-default);
    --zds-tab-item-fg: var(--interactive-neutral-foreground-default);
  }

  /* ---- disabled --------------------------------------------------------- */
  :host([disabled]) {
    /* The surface does not move; the label carries it alone (spec). */
    --zds-tab-item-fg: var(--interactive-neutral-foreground-disabled);
    cursor: default;
  }

  /* ---- interaction states ----------------------------------------------- */
  :host(:hover:not([disabled])) {
    --zds-tab-item-bg: var(--interactive-ghost-background-hover);
  }
  /* Pressed and focus are not drawn in Figma (spec issue: no focus state);
     taken from the same ghost family, like Navigation Item. */
  :host(:active:not([disabled])) {
    --zds-tab-item-bg: var(--interactive-ghost-background-pressed);
  }
  :host(:focus-visible) {
    /* Inset, so a neighbouring tab never paints over the ring. */
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }
`;
