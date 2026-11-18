import { css } from "lit";
/* Spec: specs/breadcrumb. Crumbs sit space/md apart and wrapped lines space/2xs apart. The overflow control is Icon
   Button at small, and its menu is the compact zeta-droppable, which keeps its own raw 8 offset (spec issue). */
export default css `
  :host {
    display: block;
  }

  :host([flavor="accent"]) {
    --breadcrumb-current-color: var(--foreground-link);
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2xs) var(--space-md);
  }

  .overflow {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .separator {
    flex: none;
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
  }
`;
//# sourceMappingURL=breadcrumb.styles.js.map