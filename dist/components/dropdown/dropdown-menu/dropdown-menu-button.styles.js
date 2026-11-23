import { css } from "lit";
/* Spec: specs/dropdown (Dropdown Template). Only the trigger's space is reserved; the menu (zeta-droppable) is
   positioned absolutely, and the rows style themselves. */
export default css `
  :host {
    display: block;
    width: fit-content;
    -webkit-tap-highlight-color: transparent;
  }

  /* The inner button paints every flavour. The Flavored mixin's legacy fill would otherwise show behind a subtle one. */
  #anchor {
    background: transparent;
  }
`;
//# sourceMappingURL=dropdown-menu-button.styles.js.map