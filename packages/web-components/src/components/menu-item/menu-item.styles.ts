import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. Because
 * custom properties inherit through shadow roots, an `.ext-*` / `.mode-*`
 * class on any ancestor in the light DOM re-themes this component with no
 * JavaScript and no re-render.
 *
 * Spec: specs/dropdown/dropdown.spec.json (Menu Item subcomponent)
 */
export default css`
  :host {
    display: block;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  .row {
    /* --- geometry: fixed per the spec's own layoutTheming --------------- */
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: var(--control-md);
    gap: var(--space-sm);
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-none);
    border: var(--stroke-thin) solid transparent;

    /* --- colour: state axis ---------------------------------------------- */
    background: var(--zds-menu-item-bg);
    cursor: pointer;
    /* Colour-only transitions: the spec records no motion for this row. */
    transition: background-color 120ms ease, border-color 120ms ease;
  }

  .row:focus-visible {
    outline: none;
  }

  .label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    min-width: 0;
    padding-left: var(--space-xs);
    padding-right: var(--space-xl);

    /* type: fixed per every variant */
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: 500;
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--zds-menu-item-fg);

    /* "the text neither wraps nor truncates, so a long label widens the
       entire menu" (spec) */
    white-space: nowrap;
  }

  .leading,
  .trailing {
    flex: none;
    color: var(--zds-menu-item-fg);
  }

  /* ---- rounded --------------------------------------------------------- */
  :host([rounded]) .row {
    border-radius: var(--radius-sm);
  }

  /* ---- state: resting ---------------------------------------------------
     interactive/ghost/background/* is fully transparent at rest and hover
     and selected both land at the same faint tint, per the spec ("selected
     and hover sit at the same visual weight"). */
  :host {
    --zds-menu-item-bg: var(--interactive-ghost-background-default);
    --zds-menu-item-fg: var(--interactive-neutral-foreground-default);
  }

  /* ---- state: hover (real :hover, not a property) ----------------------- */
  :host(:hover:not([disabled])) {
    --zds-menu-item-bg: var(--interactive-ghost-background-hover);
  }

  /* ---- state: selected --------------------------------------------------- */
  :host([selected]) {
    --zds-menu-item-bg: var(--interactive-ghost-background-selected);
  }
  /* Hovering an already-selected row keeps the selected tint rather than
     swapping to the hover one — the spec gives both the same weight, so
     there is nothing for a hover-over-selected state to show. */
  :host([selected]:hover:not([disabled])) {
    --zds-menu-item-bg: var(--interactive-ghost-background-selected);
  }

  /* ---- state: focus (real :focus-visible) --------------------------------
     The only state that adds a border; background is left alone unless the
     row is also selected ("selected focus"). */
  .row:focus-visible {
    --zds-menu-item-bg: var(--interactive-ghost-background-focused);
    border-color: var(--border-focus);
  }
  :host([selected]) .row:focus-visible {
    --zds-menu-item-bg: var(--interactive-ghost-background-selected);
    border-color: var(--border-focus);
  }

  /* ---- state: disabled --------------------------------------------------
     Only the label's colour changes; the background stays transparent. */
  :host([disabled]) {
    --zds-menu-item-bg: var(--interactive-ghost-background-disabled);
  }
  :host([disabled]) .row {
    cursor: not-allowed;
    pointer-events: none;
  }
  :host([disabled]) .label {
    color: var(--interactive-neutral-foreground-disabled);
  }
`;
