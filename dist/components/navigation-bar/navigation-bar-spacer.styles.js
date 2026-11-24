import { css } from "lit";
/**
 * Spacer subcomponent of Navigation Bar. The bar overrides its flex and
 * minimum width from outside via ::slotted.
 *
 * Spec: specs/navigation-bar/navigation-bar.spec.json (Spacer)
 */
export default css `
  :host {
    box-sizing: border-box;
    display: flex;
    flex: none;
    justify-content: center;
    align-self: stretch;
    /* Figma's Spacer has a raw 50px minimum width (no token); space-2xl is
       the nearest spacing intent. Inside the bar it drops to none. */
    min-width: var(--space-2xl);
    /* The divider is inset from the top and bottom edges (groupDivider). */
    padding-block: var(--space-sm);
  }
  :host([hidden]) {
    display: none;
  }
`;
