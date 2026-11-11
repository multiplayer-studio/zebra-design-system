import { css } from "lit";

/* Spec: specs/snackbar. A bar control/lg tall (minimum): space/2xs top and bottom, space/lg at the leading end and
   space/2xs at the trailing end when a control sits there, space/md from the glyph to the message and space/lg from
   the message to the controls. Contextual tints by flavour (feedback/<kind>/background/subtle); action, default and
   every standard bar are the dark bars on surface/overlay, carrying their own colour mode (data-theme, set in code).
   Contextual is radius/pill, standard radius/md, both radius/none when sharp. Shadow/medium lifts it. */
export default css`
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
    --_radius: var(--radius-pill);
    --_bg: var(--surface-overlay);
    --_fg: var(--foreground-primary);
  }

  :host(:not([data-shown])) {
    display: none;
  }

  /* Floating: a manual popover in the top layer, centred space/xl above the bottom of the viewport. */
  :host([popover]) {
    position: fixed;
    inset: auto 0 var(--space-xl) 0;
    width: fit-content;
    max-width: calc(100vw - 2 * var(--space-lg));
    margin: 0 auto;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    overflow: visible;
  }

  .snackbar-root {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    min-height: var(--control-lg);
    padding: var(--space-2xs) var(--space-lg);
    border-radius: var(--_radius);
    background-color: var(--_bg);
    color: var(--_fg);
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
    --icon-size: var(--control-icon-md);
    --icon-color: currentColor;
  }

  /* A control at the end sits concentric in the bar's end: its end gap matches its top gap. */
  .snackbar-root[data-end] {
    padding-inline-end: var(--space-2xs);
  }

  .lead {
    flex: none;
    display: inline-flex;
  }

  .lead[hidden] {
    display: none;
  }

  ::slotted(zeta-icon) {
    --icon-size: var(--control-icon-md);
    --icon-color: currentColor;
  }

  /* One line, never wrapping; an ellipsis where the space runs out (spec: Width). */
  .message {
    flex: 1 1 auto;
    min-width: 0;
    padding: var(--space-sm) 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Message to controls reads space/lg: space/md of gap plus this margin. */
  .controls {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    margin-inline-start: var(--space-2xs);
  }

  /* ---- shape ---- */
  :host([variant="standard"]) {
    --_radius: var(--radius-md);
  }
  :host([shape="sharp"]) {
    --_radius: var(--zebra-radius-none);
  }

  /* ---- fill per status (contextual only) ---- */
  :host([status="info"]:not([variant="standard"])) {
    --_bg: var(--feedback-info-background-subtle);
  }
  :host([status="positive"]:not([variant="standard"])) {
    --_bg: var(--feedback-success-background-subtle);
  }
  :host([status="warning"]:not([variant="standard"])) {
    --_bg: var(--feedback-warning-background-subtle);
  }
  :host([status="negative"]:not([variant="standard"])),
  :host([status="deletion"]:not([variant="standard"])) {
    --_bg: var(--feedback-error-background-subtle);
  }
  :host([status="view"]:not([variant="standard"])) {
    --_bg: var(--feedback-neutral-background-subtle);
  }
`;
