import { css } from "lit";

/* Spec: specs/scrim. One fill over the nearest positioned ancestor: overlay/scrim, or overlay/modal for the opaque
   tone. No radius, stroke or shadow. Figma adds a 0.6 paint opacity over overlay/scrim (spec warn); the token already
   carries its alpha, so it is used alone. */
export default css`
  :host {
    position: absolute;
    inset: 0;
    display: block;
    border-radius: var(--zebra-radius-none);
    background-color: var(--overlay-scrim);
  }

  :host([hidden]) {
    display: none;
  }

  /* As a popover the scrim joins the top layer and covers the viewport. The owner shows it just before its own modal,
     so it sits directly beneath. These undo the browser's popover box. */
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

  :host([tone="modal"]) {
    background-color: var(--overlay-modal);
  }
`;
