import { css } from "lit";

/**
 * Every value here is a semantic token, except the handle bar's height, which
 * has none (spec issue). Rows, tiles and buttons bring their own styles.
 *
 * Spec: specs/bottom-sheet/bottom-sheet.spec.json
 */
export default css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- surface ----------------------------------------------------------- */
  .surface {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-block-end: var(--space-card);
    background: var(--surface-overlay);
    border-start-start-radius: var(--radius-container);
    border-start-end-radius: var(--radius-container);
  }

  /* ---- handle ------------------------------------------------------------ */
  .handle {
    display: flex;
    justify-content: center;
    padding: var(--space-lg) var(--space-section);
  }

  .bar {
    inline-size: var(--control-target-min);
    block-size: 4px; /* no token — spec gap */
    border-radius: var(--radius-pill);
    background: var(--border-default);
  }

  /* ---- header ------------------------------------------------------------ */
  .header {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    padding: var(--space-sm) var(--space-lg);
    color: var(--foreground-primary);
  }

  .icon {
    flex: none;
  }

  .title {
    flex: 1 1 auto;
    min-inline-size: 0;
    margin: 0;
    font-family: var(--title-medium-font-family), system-ui, sans-serif;
    font-size: var(--title-medium-font-size);
    font-weight: var(--title-medium-font-weight);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
  }

  :host([header-alignment="center"]) .header {
    gap: var(--space-gutter);
    padding: var(--space-gutter) var(--space-lg);
  }

  :host([header-alignment="center"]) .title {
    text-align: center;
  }

  :host([header-alignment="center"]) .icon {
    position: absolute;
    inset-inline-start: var(--space-lg);
  }

  /* ---- content ----------------------------------------------------------- */
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-gutter);
  }

  :host([content-type="list"]) .content {
    gap: var(--space-2xs);
    padding-inline: var(--space-lg);
  }

  :host([content-type="grid"]) .content {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  /* ---- footer ------------------------------------------------------------ */
  /* zds-card-footer's own rule stops at this slot, so the share is set here. */
  ::slotted([slot="actions"]) {
    flex: 1 1 0;
  }
`;
