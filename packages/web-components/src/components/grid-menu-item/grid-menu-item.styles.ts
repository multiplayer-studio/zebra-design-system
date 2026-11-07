import { css } from "lit";

/**
 * Every value here is a semantic token. The tile holds the whole surface, so
 * hover and press paint it edge to edge.
 *
 * Spec: specs/bottom-sheet/bottom-sheet.spec.json
 */
export default css`
  :host {
    display: block;
    /* Spec: a 92 square alone, an equal share of the row inside a sheet. */
    min-inline-size: 92px;
  }

  :host([hidden]) {
    display: none;
  }

  .tile {
    appearance: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    inline-size: 100%;
    block-size: 100%;
    margin: 0;
    padding: var(--space-lg);
    border: none;
    border-radius: var(--radius-none);
    background: var(--interactive-ghost-background-default);
    color: var(--foreground-primary);
    font: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  :host([rounded]) .tile {
    border-radius: var(--radius-element-sm);
  }

  /* ---- state ------------------------------------------------------------- */
  /* Figma draws active and disabled at the default state only, so hover and
     press never combine with either. */
  :host(:not([active]):not([disabled])) .tile:hover {
    background: var(--interactive-ghost-background-hover);
  }

  :host(:not([active]):not([disabled])) .tile:active {
    background: var(--interactive-ghost-background-pressed);
  }

  .tile:focus-visible {
    outline: var(--stroke-thin) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thin) * -1);
  }

  /* Set on the tile so the glyph and the label take the same token. */
  :host([active]) .tile {
    color: var(--interactive-subtle-foreground-default);
  }

  :host([disabled]) .tile {
    color: var(--interactive-subtle-foreground-disabled);
    cursor: not-allowed;
  }

  /* ---- indicator --------------------------------------------------------- */
  .indicator {
    position: relative;
    display: inline-flex;
  }

  .badge {
    position: absolute;
    top: var(--space-none);
    right: var(--space-none);
  }

  /* ---- label ------------------------------------------------------------- */
  .label {
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    text-align: center;
  }
`;
