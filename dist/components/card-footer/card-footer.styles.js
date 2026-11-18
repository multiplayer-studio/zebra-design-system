import { css } from "lit";
/**
 * Every value here is a semantic token.
 * Spec: specs/card/card.spec.json
 */
export default css `
  :host {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--space-sm);
    /* Overridable per side: Card's own shell has zero padding of its own
       (spec), so this is the sole source of inset there. zds-collapsible-card's
       body wrapper already carries its own spec-stated left/right/bottom
       inset (custom properties cross the shadow boundary), so it zeroes
       --zds-card-footer-padding-inline and --zds-card-footer-padding-block-end
       on itself — the top padding here still applies, since the wrapper's
       own top inset is none. */
    padding: var(--zds-card-footer-padding-block-start, var(--space-lg)) var(--zds-card-footer-padding-inline, var(--space-lg)) var(--zds-card-footer-padding-block-end, var(--space-lg));
  }

  :host([hidden]) {
    display: none;
  }

  ::slotted(*) {
    flex: 1 1 0;
  }
`;
