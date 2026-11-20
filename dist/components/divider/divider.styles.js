import { css } from "lit";
/* Spec: specs/divider. A stroke/thin line on border/default with square ends (radius/none). It fills its container
   along the main axis; the cross axis is the line's own thickness. border/default is one of the names the legacy set
   also defines, so it is read through its --zebra- alias. */
export default css `
  :host {
    display: block;
    flex: none;
    align-self: stretch;
    width: 100%;
    height: var(--stroke-thin);
    border-radius: var(--zebra-radius-none);
    background-color: var(--zebra-border-default);
  }

  :host([orientation="vertical"]) {
    display: inline-block;
    width: var(--stroke-thin);
    height: auto;
    min-height: 1em;
  }
`;
//# sourceMappingURL=divider.styles.js.map