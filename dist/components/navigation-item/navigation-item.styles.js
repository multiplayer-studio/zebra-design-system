import { css } from "lit";
/**
 * Every value here is a semantic token from the generated CSS layer. Keyed
 * off the reflected `active` / `disabled` attributes. Nothing here knows
 * about themes: an .ext-* / .mode-* class on any ancestor changes what these
 * tokens resolve to.
 *
 * Spec: specs/navigation-item/navigation-item.spec.json
 */
export default css `
  :host {
    display: inline-flex;
    align-items: stretch;
    vertical-align: bottom;
  }

  :host([hidden]) {
    display: none;
  }

  .item {
    /* reset the <a> / <button> UA styles so both render identically */
    appearance: none;
    margin: 0;
    border: none;
    font: inherit;
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    /* --- geometry ----------------------------------------------------- */
    box-sizing: border-box;
    flex: 1 1 auto;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-lg);
    /* Figma's fixed 72px height is a raw value with no token (spec issue).
       control-lg is the nearest control token; it is a floor, the icon + gap
       + label + padding set the real height, and every item shares it. */
    min-height: var(--control-lg);
    border-radius: var(--radius-none);

    /* --- colour: active x disabled x interaction state ---------------- */
    --zds-navigation-item-bg: var(--interactive-ghost-background-default);
    --zds-navigation-item-fg: var(--foreground-primary);
    background: var(--zds-navigation-item-bg);
    color: var(--zds-navigation-item-fg);
  }

  /* ---- icon box + badge ------------------------------------------------ */
  .icon {
    /* The anchor the badge is positioned against. Does not clip, so the
       badge can overhang its corner. */
    position: relative;
    display: inline-flex;
    line-height: 0;
  }

  .badge {
    /* Overhangs the icon's top-right corner by space/xs on both axes:
       exactly Figma's measured 16,-4 for the 8px dot on the 20px icon (spec
       issue: the offset was untokenised). A count badge grows outward from
       that anchor, away from the glyph, instead of covering it. */
    position: absolute;
    top: calc(-1 * var(--space-2xs));
    inset-inline-start: calc(100% - var(--space-2xs));
  }

  /* ---- label ----------------------------------------------------------- */
  .label {
    /* Figma binds the remote Body/body small style (spec issue); the local
       body/small text style is the same 14/20 Regular. */
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    white-space: nowrap; /* no wrapping, no truncation: the item hugs its label */
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

  /* ---- active ---------------------------------------------------------- */
  :host([active]:not([disabled])) .item {
    /* Colour alone carries selection (spec); aria-current carries it in code. */
    --zds-navigation-item-fg: var(--interactive-subtle-foreground-default);
  }

  /* ---- disabled -------------------------------------------------------- */
  :host([disabled]) .item {
    --zds-navigation-item-fg: var(--interactive-subtle-foreground-disabled);
    cursor: default;
  }

  /* ---- interaction states ---------------------------------------------- */
  /* Not modelled in Figma (spec issue: no hover, pressed or focus). Taken
     from the ghost interactive tokens, the same family the root's
     (transparent) fill is bound to. */
  :host(:not([disabled])) .item:hover {
    --zds-navigation-item-bg: var(--interactive-ghost-background-hover);
  }
  :host(:not([disabled])) .item:active {
    --zds-navigation-item-bg: var(--interactive-ghost-background-pressed);
  }
  .item:focus-visible {
    --zds-navigation-item-bg: var(--interactive-ghost-background-focused);
    /* Inset, so a neighbouring item never paints over the ring. */
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }
`;
