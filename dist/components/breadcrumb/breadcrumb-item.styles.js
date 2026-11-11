import { css } from "lit";
/**
 * Every value is a semantic token. The crumb keeps radius/sm at both shapes,
 * because Figma gives it no shape axis (spec issue). `--zds-breadcrumb-current`
 * comes from the breadcrumb's flavour.
 *
 * Spec: specs/breadcrumb/breadcrumb.spec.json (subcomponents._Breadcrumb Item)
 */
export default css `
  :host {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    min-inline-size: 0;
  }

  :host([hidden]) {
    display: none;
  }

  .crumb {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    margin: 0;
    padding: 0;
    border: none;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--foreground-secondary);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  /* ---- state: CSS only ---------------------------------------------------- */
  .crumb:hover {
    color: var(--foreground-link);
  }

  .crumb:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thick);
  }

  /* ---- current ------------------------------------------------------------ */
  :host([current]) .crumb {
    color: var(--zds-breadcrumb-current, var(--foreground-primary));
    cursor: default;
  }

  /* The glyph holds its colour through hover and focus, as drawn. */
  .icon,
  .separator {
    flex: none;
    color: var(--foreground-primary);
  }

  :host([current]) .icon {
    color: var(--zds-breadcrumb-current, var(--foreground-primary));
  }
`;
