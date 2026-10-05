import { css } from "lit";
export default css`
  :host {
    border-top: var(--stroke-thin) solid var(--border-default);
    display: flex;
    /* justify-content: space-around; */
    align-items: stretch;
  }

  ::slotted(.divider)::before {
    content: "";
    width: var(--stroke-thin);
    background-color: var(--border-default);
    display: block;
    height: 100%;
    position: absolute;
    left: 50%;
  }

  ::slotted(.divider) {
    display: flex;
    flex: 2;
    position: relative;
    margin: var(--space-sm) 0;
  }

  ::slotted(.spacer) {
    display: flex;
    flex: 1;
  }

  :host([shrinkItems]) ::slotted(zeta-grid-menu-item) {
    width: 62px;
    flex: 0;
  }

  :host([shrinkItems]) ::slotted(zeta-button) {
    flex: 0;
  }

  :host([shrinkItems]) ::slotted(.divider) {
    flex: 0;
    width: 62px;
    margin: 0 calc(var(--space-2xl) + var(--space-sm));
  }

  ::slotted(zeta-button) {
    margin: var(--space-lg) var(--space-2xl) var(--space-lg) var(--space-lg);
    flex: 1;
  }
`;
