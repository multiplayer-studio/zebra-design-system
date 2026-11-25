import { css } from "lit";
/* Spec: specs/breadcrumb (_Breadcrumb Item). The crumb keeps radius/sm at both shapes, because Figma gives it no shape
   axis (spec issue). The icon holds foreground/primary through hover and focus, as drawn. */
export default css `
  :host {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none;
  }

  .crumb {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--foreground-secondary);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
    white-space: nowrap;
  }

  a.crumb {
    cursor: pointer;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    a.crumb:hover {
      color: var(--foreground-link);
    }
  }

  a.crumb:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thick);
  }

  :host([current]) .crumb {
    color: var(--breadcrumb-current-color, var(--foreground-primary));
  }

  ::slotted([slot="icon"]) {
    flex: none;
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }

  :host([current]) ::slotted([slot="icon"]) {
    --icon-color: var(--breadcrumb-current-color, var(--foreground-primary));
  }

  .separator {
    flex: none;
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }
`;
//# sourceMappingURL=breadcrumb-item.styles.js.map