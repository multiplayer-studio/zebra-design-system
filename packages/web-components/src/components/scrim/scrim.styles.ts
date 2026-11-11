import { css } from "lit";

/**
 * One fill, stretched over the nearest positioned ancestor.
 *
 * Spec: specs/scrim/scrim.spec.json
 */
export default css`
  :host {
    position: absolute;
    inset: 0;
    display: block;
    box-sizing: border-box;
    border-radius: var(--radius-none);
    background: var(--overlay-scrim);
  }

  :host([hidden]) {
    display: none;
  }

  /* As a popover, the scrim joins the top layer and covers the viewport. The
     owner shows it just before its own modal, so it sits directly beneath.
     These undo the browser's popover box (border, padding, fit-content). */
  :host([popover]) {
    position: fixed;
    inset: 0;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    overflow: visible;
  }
  :host([popover]:not(:popover-open)) {
    display: none;
  }

  /* ---- tone -------------------------------------------------------------- */
  /* Spec issue: Figma adds a 0.6 paint opacity over overlay/scrim. The token
     already carries its alpha, so the token is used alone. */
  :host([tone="scrim"]) {
    background: var(--overlay-scrim);
  }

  :host([tone="modal"]) {
    background: var(--overlay-modal);
  }
`;
