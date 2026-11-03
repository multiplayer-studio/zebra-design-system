import { css } from "lit";

/* Spec: specs/accordion. No fill; in a card, a border/default border, radius/lg corners and dividers. */
export default css`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

  :host([inCard]) {
    border: var(--stroke-thin) solid var(--zebra-border-default);
  }

  :host([inCard][rounded]) {
    border-radius: var(--radius-lg);
  }

  :host([inCard]) ::slotted(zeta-accordion-item:not(:last-child)) {
    border-bottom: var(--stroke-thin) solid var(--zebra-border-default);
  }
`;
