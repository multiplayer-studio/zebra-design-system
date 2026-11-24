import { css } from "lit";
/**
 * Every value here is a semantic token from the generated CSS layer. Because
 * custom properties inherit through shadow roots, an `.ext-*` / `.mode-*`
 * class on any ancestor in the light DOM re-themes this component with no
 * JavaScript and no re-render.
 *
 * Spec: specs/dropdown/dropdown.spec.json (Menu Item subcomponent)
 */
export default css `
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
    padding: var(--space-2xs) var(--space-md);
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
    padding-left: var(--space-2xs);
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

  /* ---- type: checkbox / radio -------------------------------------------
     The real control's own 40px target spaces the label, so the row's gap
     and leading padding drop to none, which lines the control's box up with an
     Icon row's glyph. The target overflows the row's 4px padding and stays
     centred (spec note). */
  :host([type="checkbox"]) .row,
  :host([type="radio"]) .row {
    gap: var(--space-none);
    padding-left: var(--space-none);
  }
  .control {
    color: inherit;
  }

  /* ---- rounded --------------------------------------------------------- */
  :host([rounded]) .row {
    border-radius: var(--radius-sm);
  }

  /* ---- state: resting ---------------------------------------------------
     interactive/ghost/background/* is fully transparent at rest. Hover is a
     5% neutral tint; selected is a 10% brand tint, so it reads stronger. */
  :host {
    --zds-menu-item-bg: var(--interactive-ghost-background-default);
    --zds-menu-item-fg: var(--interactive-neutral-foreground-default);
  }

  /* ---- state: hover (real :hover, not a property) ----------------------- */
  :host(:hover:not([disabled])) {
    --zds-menu-item-bg: var(--interactive-ghost-background-hover);
  }

  /* ---- state: selected --------------------------------------------------- */
  /* The label moves to foreground/primary, the same colour as the resting
     label. Selected focus keeps it too (spec note: Figma binds neutral there,
     same value). */
  :host([selected]) {
    --zds-menu-item-bg: var(--interactive-ghost-background-selected);
    --zds-menu-item-fg: var(--foreground-primary);
  }
  /* Hovering an already-selected row keeps the selected tint rather than
     dropping to the weaker hover one. */
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
     The label and its icons mute together; the background stays transparent. */
  :host([disabled]) {
    --zds-menu-item-bg: var(--interactive-ghost-background-disabled);
  }
  :host([disabled]) .row {
    cursor: not-allowed;
    pointer-events: none;
  }
  :host([disabled]) .label,
  :host([disabled]) .leading,
  :host([disabled]) .trailing {
    color: var(--interactive-neutral-foreground-disabled);
  }
`;
