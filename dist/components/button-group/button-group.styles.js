import { css } from "lit";
/* Spec: specs/button-group. The group carries the surface/section fill and a border/default outline drawn outside
   its bounds (the 1px width is raw in Figma); items butt together and the group draws a stroke/thin rule after
   every item but the last. Rounded outer corners use radius/sm, on the group and on the end items. */
export default css `
  :host {
    display: inline-flex;
    height: fit-content;
    width: fit-content;
    background: var(--surface-section);
    outline: 1px solid var(--zebra-border-default);
    border-radius: var(--zebra-radius-none);
    --group-item-left-radius: var(--zebra-radius-none);
    --group-item-right-radius: var(--zebra-radius-none);
  }

  /* Only display group items */
  ::slotted(*:not(zeta-button-group-item)) {
    display: none;
  }

  ::slotted(zeta-button-group-item:not(:last-child)) {
    --group-item-divider: var(--stroke-thin) solid var(--zebra-border-default);
  }

  :host([rounded]) {
    border-radius: var(--radius-sm);
  }

  :host([rounded]) ::slotted(zeta-button-group-item:first-child) {
    --group-item-left-radius: var(--radius-sm);
  }

  :host([rounded]) ::slotted(zeta-button-group-item:last-child) {
    --group-item-right-radius: var(--radius-sm);
  }
`;
//# sourceMappingURL=button-group.styles.js.map