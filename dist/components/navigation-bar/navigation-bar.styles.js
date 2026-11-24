import { css } from "lit";
/* Spec: specs/navigation-bar. No fill, a top border only (1px raw in Figma, bound here to stroke/thin, spec issue).
   The rule between groups is a Divider: stroke/thin in border/default, inset space/sm top and bottom. The action
   slot sits space/lg from the items. Legacy slotted .divider and .spacer elements still work in the main group. */
export default css `
  :host {
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    border-top: var(--stroke-thin) solid var(--zebra-border-default);
  }

  [hidden] {
    display: none !important;
  }

  .group {
    display: flex;
    align-items: center;
  }

  /* Off: the main group fills the bar and its items share the width. */
  .main {
    flex: 1;
  }

  ::slotted(zeta-grid-menu-item) {
    flex: 1;
  }

  /* On: items keep their natural width and the groups sit against the ends. */
  :host([shrinkItems]) {
    justify-content: space-between;
  }

  :host([shrinkItems]) .main {
    flex: none;
  }

  :host([shrinkItems]) ::slotted(zeta-grid-menu-item) {
    flex: none;
  }

  .divider {
    align-self: stretch;
    width: var(--stroke-thin);
    margin: var(--space-sm) 0;
    background: var(--zebra-border-default);
  }

  .action {
    display: flex;
    align-items: center;
    padding-inline-start: var(--space-lg);
  }

  /* ---- legacy slotted helpers ---- */
  ::slotted(.divider) {
    position: relative;
    display: flex;
    flex: 2;
    margin: var(--space-sm) 0;
  }

  ::slotted(.divider)::before {
    content: "";
    position: absolute;
    left: 50%;
    display: block;
    width: var(--stroke-thin);
    height: 100%;
    background-color: var(--zebra-border-default);
  }

  ::slotted(.spacer) {
    display: flex;
    flex: 1;
  }

  ::slotted(zeta-button) {
    flex: 1;
    margin: var(--space-lg) var(--space-xl);
  }

  :host([shrinkItems]) ::slotted(zeta-button),
  :host([shrinkItems]) ::slotted(.divider) {
    flex: 0;
  }
`;
//# sourceMappingURL=navigation-bar.styles.js.map