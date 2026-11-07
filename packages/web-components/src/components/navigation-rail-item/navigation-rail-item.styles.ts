import { css } from "lit";

/**
 * Every value is a semantic token from the generated CSS layer. Keyed off
 * data attributes on the inner item, mirroring packages/react-baseui
 * navigation-rail-item.css rule for rule.
 *
 * Spec: specs/navigation-rail-item/navigation-rail-item.spec.json
 */
export default css`
  :host {
    display: inline-flex;
    vertical-align: top;
    max-width: 100%;
  }
  :host([hidden]) {
    display: none;
  }
  :host([expanded]) {
    display: flex;
    width: 100%;
  }

  .item {
    /* reset the <a> / <button> UA styles so both render identically */
    appearance: none;
    margin: 0;
    border: none;
    font: inherit;
    font-weight: inherit; /* a <button>'s UA weight differs from an <a>'s */
    text-decoration: none;
    text-align: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    /* --- geometry: narrow form (Expanded=false) ----------------------- */
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-none);
    padding: var(--space-sm) var(--space-2xs);
    min-width: var(--control-lg);
    min-height: var(--control-lg);
    max-width: 100%;
    /* Shape=rounded (the default): radius/sm. Placed in the rail Figma
       rebinds it to radius/element-sm (spec warn "Radius rebound"); same
       value today — the item's own binding is kept. Sharp is below. */
    border-radius: var(--radius-sm);

    /* --- colour: state axis ------------------------------------------ */
    background: var(--zds-navigation-rail-item-bg);
    color: var(--zds-navigation-rail-item-fg);
    --zds-navigation-rail-item-bg: var(--interactive-ghost-background-default);
    --zds-navigation-rail-item-fg: var(--interactive-neutral-foreground-default);
  }

  /* ---- shape: the rail's, code-only (owner decision) -------------------- */
  .item[data-shape="sharp"] {
    border-radius: var(--radius-none);
  }

  /* ---- expanded: the wide form ----------------------------------------- */
  .item[data-expanded] {
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--space-lg);
    padding: var(--space-sm) var(--space-lg);
    /* Figma fixes it at 176px and fills it inside the wide rail; no width
       token exists, so it fills whatever the rail gives it. */
    width: 100%;
  }

  /* ---- icon box + badge ------------------------------------------------- */
  .icon {
    position: relative;
    display: inline-flex;
    flex: none;
    line-height: 0;
  }
  .badge {
    /* Figma's 12,-4 against the 16px box: overhang the top-right corner by
       space/xs on both axes. Absolute, so it never reflows the item. */
    position: absolute;
    top: calc(-1 * var(--space-2xs));
    inset-inline-start: calc(100% - var(--space-2xs));
  }

  /* ---- label ------------------------------------------------------------ */
  .label {
    /* One line, end-truncated, as Figma draws it. The metadata says "no
       truncation" (spec warn "Truncation") — the drawing wins. */
    display: block;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    font-family: var(--indicator-small-font-family), system-ui, sans-serif;
    font-size: var(--indicator-small-font-size);
    font-weight: var(--indicator-small-font-weight);
    line-height: var(--indicator-small-line-height);
    letter-spacing: var(--indicator-small-letter-spacing);
  }
  .item[data-expanded] .label {
    width: auto;
    text-align: start;
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
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

  /* ---- state: hover / active (pressed) — CSS, never props --------------- */
  .item:hover:not([data-disabled]) {
    --zds-navigation-rail-item-bg: var(--interactive-ghost-background-hover);
  }
  .item:active:not([data-disabled]) {
    --zds-navigation-rail-item-bg: var(--interactive-ghost-background-pressed);
  }

  /* ---- state: selected -------------------------------------------------- */
  .item[data-selected] {
    --zds-navigation-rail-item-fg: var(--interactive-subtle-foreground-default);
  }

  /* ---- disabled --------------------------------------------------------- */
  .item[data-disabled] {
    --zds-navigation-rail-item-bg: transparent;
    --zds-navigation-rail-item-fg: var(--interactive-subtle-foreground-disabled);
    cursor: default;
  }

  /* ---- focus: not modelled in Figma (spec) ------------------------------ */
  .item:focus-visible {
    --zds-navigation-rail-item-bg: var(--interactive-ghost-background-focused);
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }
`;
