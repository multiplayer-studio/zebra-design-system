import { css } from "lit";
/**
 * Every value here is a semantic token from the generated CSS layer. Keyed
 * off the reflected `flavour` attribute. Nothing here knows about themes: an
 * .ext-* / .mode-* class on any ancestor changes what these tokens resolve to.
 *
 * Spec: specs/tab-bar/tab-bar.spec.json
 */
export default css `
  :host {
    /* No padding, gap or radius of its own (spec). */
    display: flex;
    align-items: center;
    background: var(--surface-section);
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- flavour ---------------------------------------------------------- */
  /* full width: the tabs divide the row evenly. */
  :host([flavour="full-width"]) ::slotted(zds-tab-item) {
    flex: 1 1 0;
  }

  /* condensed: the bar and every tab hug their content. */
  :host([flavour="condensed"]) {
    display: inline-flex;
  }
`;
