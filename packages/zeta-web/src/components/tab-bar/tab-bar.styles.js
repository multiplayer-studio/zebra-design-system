import { css } from "lit";

/* Spec: specs/tab-bar. A row on surface/section with no gap, padding or radius. Full width divides the row evenly
   between the tabs; condensed hugs them. The --tab-bar-background override still wins. */
export default css`
  :host {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--tab-bar-background, var(--surface-section));
  }

  :host([flavor="condensed"]) {
    display: inline-flex;
    width: auto;
  }

  :host(:not([flavor="condensed"])) ::slotted(zeta-tab-item) {
    flex: 1 1 0;
    min-width: 0;
  }
`;
