import { css } from "lit";
/**
 * Every value is a semantic token. The overflow control and its menu bring
 * their own styles.
 *
 * Spec: specs/breadcrumb/breadcrumb.spec.json
 */
export default css `
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- flavour ------------------------------------------------------------ */
  :host([flavour="accent"]) {
    --zds-breadcrumb-current: var(--foreground-link);
  }

  /* ---- trail -------------------------------------------------------------- */
  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2xs) var(--space-md);
  }

  /* ---- overflow ----------------------------------------------------------- */
  .overflow {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .separator {
    flex: none;
    color: var(--foreground-primary);
  }
`;
