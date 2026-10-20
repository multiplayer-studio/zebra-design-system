import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer, keyed
 * off the element's own `[orientation]` attribute.
 *
 * Spec: specs/divider/divider.spec.json
 */
export default css`
  :host {
    display: block;
    flex-shrink: 0;
    /* Stretches to the cross size of a flex row/column ancestor (the common
       case — a toolbar separating icon buttons) without depending on that
       ancestor having an explicit, percentage-resolvable height/width. */
    align-self: stretch;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none;
  }

  .line {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-none);
    background: var(--border-default);
  }

  /* ---- orientation ------------------------------------------------------ */
  :host([orientation="horizontal"]) {
    width: 100%;
    height: var(--stroke-thin);
  }

  /*
   * A vertical divider's length has no token or fixed spec value (see the
   * spec's Layout & Theming Intents: "Not fixed... stretches to fill the
   * available height when the instance is resized") — height:100% here is
   * that "fill the container" behaviour. It requires an ancestor with a
   * definite height (or align-self:stretch inside a flex row) to resolve to
   * anything nonzero; on its own, with no sized container, it has nothing to
   * fill and renders with zero height. That's the same constraint every
   * content-less vertical divider has (Base UI's own Separator ships no
   * default size at all), not a defect in this component.
   */
  :host([orientation="vertical"]) {
    width: var(--stroke-thin);
    height: 100%;
  }
`;
