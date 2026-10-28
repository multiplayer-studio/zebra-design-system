import { css } from "lit";

/**
 * Spec: specs/snackbar/snackbar.spec.json. Contextual takes its ideas from the owner's
 * reference (2026-10-18) — a pill, control/lg tall, with a soft shadow; a
 * leading glyph per flavour; an attention bar with a plain View; a dark bar
 * with an outlined action — and draws every value from semantic tokens:
 *  - info / positive / warning / error / deletion: feedback/<flavour>/
 *    background/subtle with foreground/primary text and icons.
 *  - view (attention): feedback/neutral/background/subtle, so it reads
 *    apart from info.
 *  - default / action, and every standard bar: the dark bars. They carry
 *    their own colour mode (the host takes .mode-dark, or .mode-light on a
 *    dark page; see snackbar.ts), so surface/popover and foreground/primary
 *    here, and every token in the buttons, resolve in that mode.
 * The controls are <zds-button> and <zds-icon-button>, styled by themselves.
 */
export default css`
  /* min-inline-size 0: as a grid or flex item the bar's automatic minimum
     would be its whole one-line message, so it could never shrink to the
     ellipsis (spec: Width). */
  :host {
    display: block;
    max-inline-size: 100%;
    min-inline-size: 0;
  }

  :host(:not([data-shown])) {
    display: none;
  }

  /* Floating (the default): a manual popover, so it is in the top layer,
     above every z-index on the page. Reset the UA popover box and sit
     centred, space/xl above the bottom of the viewport. */
  :host([popover]) {
    position: fixed;
    inset: auto 0 var(--space-xl) 0;
    margin: 0 auto;
    inline-size: fit-content;
    max-inline-size: calc(100vw - 2 * var(--space-lg));
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    overflow: visible;
  }

  /* Spacing. space/lg at the leading end (the round end needs more than the
     sides), and space/xs on the bar plus space/sm on the message, 12, top
     and bottom, so one line is exactly control/lg. */
  .surface {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    min-block-size: var(--control-lg);
    padding-block: var(--space-xxs);
    padding-inline: var(--space-lg);
    border-radius: var(--zds-snackbar-radius);
    background: var(--zds-snackbar-bg);
    color: var(--zds-snackbar-fg);
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  /* Controls at the end (Button and Icon Button, both control/md): the end
     gap equals the top gap, space/xs, so the last control sits concentric
     in the bar's end. */
  .surface[data-end] {
    padding-inline-end: var(--space-xxs);
  }

  .lead {
    flex: none;
    color: var(--zds-snackbar-icon);
  }
  span.lead {
    display: inline-flex;
  }
  span.lead[hidden] {
    display: none;
  }
  /* A slotted icon is sized like the built-in glyphs. <zds-icon> reflects
     its default size, so a size set by the caller cannot be told apart from
     it; the slot sizes every icon. */
  ::slotted(zds-icon) {
    --zds-icon-box: var(--control-icon-md);
  }

  /* One line, never wrapping (spec: Width); an ellipsis where it runs out. */
  .message {
    flex: 1 1 auto;
    min-inline-size: 0;
    padding-block: var(--space-sm);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Message to controls reads space/lg: space/md of gap plus this margin;
     action to close space/xs. */
  .controls {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xxs);
    margin-inline-start: var(--space-xxs);
  }

  /* The close's glyph takes the bar's text colour like every icon here,
     foreground/primary as in Figma; the subtle Icon Button keeps its own
     hover and pressed scrim, which change the background only. */
  .close {
    --zds-button-fg: var(--zds-snackbar-fg);
  }

  /* ---- shape --------------------------------------------------------- */
  :host {
    /* contextual: radius/pill (spec: Radius). The message never wraps, so
       the bar stays one line tall. */
    --zds-snackbar-radius: var(--radius-pill);
    --zds-snackbar-icon: currentColor;
  }
  :host([variant="standard"]) {
    --zds-snackbar-radius: var(--radius-md);
  }
  :host([shape="sharp"]) {
    --zds-snackbar-radius: var(--radius-none);
  }

  /* ---- fill per flavour; the dark bars by default ------------------- */
  :host {
    --zds-snackbar-bg: var(--surface-popover);
    --zds-snackbar-fg: var(--foreground-primary);
  }
  :host([flavour="info"]:not([variant="standard"])) {
    --zds-snackbar-bg: var(--feedback-info-background-subtle);
  }
  :host([flavour="positive"]:not([variant="standard"])) {
    --zds-snackbar-bg: var(--feedback-success-background-subtle);
  }
  :host([flavour="warning"]:not([variant="standard"])) {
    --zds-snackbar-bg: var(--feedback-warning-background-subtle);
  }
  :host([flavour="error"]:not([variant="standard"])),
  :host([flavour="deletion"]:not([variant="standard"])) {
    --zds-snackbar-bg: var(--feedback-error-background-subtle);
  }
  :host([flavour="view"]:not([variant="standard"])) {
    --zds-snackbar-bg: var(--feedback-neutral-background-subtle);
  }
`;
