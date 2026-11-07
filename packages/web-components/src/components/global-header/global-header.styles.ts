import { css } from "lit";

/**
 * Every value here is a semantic token, except search's maximum, which Figma
 * sets as a raw 280 (spec issue). Controls bring their own styles.
 *
 * Spec: specs/global-header/global-header.spec.json
 */
export default css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- bar --------------------------------------------------------------- */
  .bar {
    display: flex;
    align-items: stretch;
    gap: var(--space-gutter);
    box-sizing: border-box;
    padding: var(--space-sm);
    background: var(--surface-section);
    border: var(--stroke-base) solid var(--border-default);
    border-radius: var(--radius-none);
    color: var(--foreground-primary);
  }

  :host([rounded]) .bar {
    border-radius: var(--radius-element-sm);
  }

  /* The bar's height is auto, so the divider's own 100% has nothing to resolve
     against. The bar stretches it instead. */
  zds-divider {
    height: auto;
  }

  /* ---- regions ----------------------------------------------------------- */
  .leading,
  .account-group {
    flex: none;
    display: flex;
    align-items: center;
    gap: var(--space-gutter);
  }

  .middle {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-sm);
  }

  /* Keeps its content: search gives way first, so the two never overlap. */
  .navigation {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    gap: var(--space-3xs);
  }

  .actions {
    flex: none;
    display: flex;
    align-items: center;
    gap: var(--space-3xs);
  }

  /* Fills what's spare up to 280 (raw in Figma, spec gap), down to the width
     that still shows its icon. */
  .search {
    /* The input's intrinsic width would otherwise hold the band open. */
    contain: inline-size;
    flex: 1 1 280px;
    max-inline-size: 280px;
    min-inline-size: calc(2 * var(--control-md));
  }

  /* ---- identity ---------------------------------------------------------- */
  .logo {
    display: inline-flex;
    align-items: center;
    color: var(--foreground-primary);
  }

  .logo svg {
    display: block;
    inline-size: 80px;
    block-size: 32px;
    fill: currentColor;
  }

  .platform-name {
    font-family: var(--title-medium-font-family), system-ui, sans-serif;
    font-size: var(--title-medium-font-size);
    font-weight: var(--title-medium-font-weight);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
    white-space: nowrap;
  }
`;
