import { css } from "lit";

/**
 * Every value here is a semantic token. Sharp has no radius token bound in
 * Figma, so it uses radius/none (spec issue).
 *
 * Spec: specs/top-app-bar/top-app-bar.spec.json
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
    flex-direction: column;
    gap: var(--space-sm);
    box-sizing: border-box;
    padding: var(--space-md) var(--space-sm);
    background: var(--surface-section);
    border-radius: var(--radius-none);
    color: var(--foreground-primary);
  }

  :host([shape="rounded"]) .bar {
    border-radius: var(--radius-element-sm);
  }

  :host([type="extended"]) .bar {
    gap: var(--space-lg);
  }

  /* ---- content row ------------------------------------------------------- */
  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .main.search {
    justify-content: flex-start;
    gap: var(--space-md);
  }

  .field {
    flex: 1 1 auto;
    min-inline-size: 0;
  }

  .leading {
    flex: 1 1 auto;
    min-inline-size: 0;
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .page-header {
    flex: 1 1 auto;
    min-inline-size: 0;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  :host([type="centered"]) .page-header {
    justify-content: center;
  }

  .trailing {
    flex: none;
    display: flex;
    align-items: center;
    gap: var(--space-none);
  }

  /* ---- text -------------------------------------------------------------- */
  .title {
    margin: 0;
    font-family: var(--label-large-font-family), system-ui, sans-serif;
    font-size: var(--label-large-font-size);
    font-weight: var(--label-large-font-weight);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
  }

  :host([type="centered"]) .title,
  .count {
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  /* ---- second row -------------------------------------------------------- */
  .second-row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding-inline: var(--space-sm);
  }
`;
