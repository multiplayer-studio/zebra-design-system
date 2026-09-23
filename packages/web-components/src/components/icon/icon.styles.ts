import { css } from "lit";

/**
 * The root is the frame from the spec's anatomy: unframed it hugs the glyph
 * exactly (width and height both bound to the same size token, per spec
 * issue 4, so it is square by construction rather than by coincidence),
 * framed it becomes a fixed control-target-min box with the glyph centred.
 * Colour is inherited, never a token — Icon has none of its own.
 *
 * Spec: specs/icon/icon.spec.json
 */
export default css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    /* An icon is decoration unless it is given a label. */
    -webkit-user-select: none;
    user-select: none;

    /* ---- size: glyph's own box ------------------------------------- */
    --zds-icon-box: var(--control-icon-sm);
    width: var(--zds-icon-box);
    height: var(--zds-icon-box);
  }
  :host([size="medium"]) {
    --zds-icon-box: var(--control-icon-md);
  }
  :host([size="large"]) {
    --zds-icon-box: var(--control-icon-lg);
  }

  /* ---- framed: fixed 40px touch target, glyph keeps its own size ---- */
  :host([framed]) {
    width: var(--control-target-min);
    height: var(--control-target-min);
  }

  .glyph {
    font-family: var(--zds-icon-family), sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: var(--zds-icon-box);
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`;
