import { css } from "lit";

/* Spec: specs/system-banner-desktop and specs/system-banner-mobile. The host is locked to Dark (data-theme, set in
   code), so foreground/primary reads white on the strong feedback fills and every control inside resolves dark. It
   spans its container and stays square; only the controls inside take the shape. Desktop: a space/lg row, space/sm
   gaps, a control/sm glyph square, title label/medium and description body/small on one line each (spec warn).
   Mobile: a space/sm row, space/2xs gaps, the framed glyph in a control/target-min square, title label/large and a
   two-line description. */
export default css`
  :host {
    display: block;
    width: 100%;
    contain: inline-size;
    box-sizing: border-box;
    border-radius: var(--zebra-radius-none);
    background-color: var(--_bg);
    color: var(--foreground-primary);
    --_bg: var(--feedback-success-background-strong);
    --icon-color: currentColor;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  :host([status="negative"]) {
    --_bg: var(--feedback-error-background-strong);
  }
  :host([status="warning"]) {
    --_bg: var(--feedback-warning-background-strong);
  }
  :host([status="info"]) {
    --_bg: var(--feedback-info-background-strong);
  }

  /* Square in both shapes; outranks Contourable's :host > * radius. */
  :host .system-banner {
    border-radius: var(--zebra-radius-none);
  }

  .system-banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    padding: var(--space-lg);
  }

  :host([layout="mobile"]) .system-banner {
    gap: var(--space-2xs);
    padding: var(--space-sm);
  }

  .glyph {
    flex: none;
    display: grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    --icon-size: var(--control-icon-md);
  }

  :host([layout="mobile"]) .glyph {
    width: var(--control-target-min);
    height: var(--control-target-min);
  }

  .trailing,
  .dismiss {
    flex: none;
  }

  .content {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    gap: var(--space-lg);
  }

  /* Legacy align="center" centres the message in the row. */
  :host([align="center"]) .content {
    justify-content: center;
  }

  .text {
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
  }

  ::slotted([slot="actions"]) {
    flex: none;
  }

  .title {
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  .description {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  /* ---- desktop: one row on single line; the actions drop beneath on multiline ---- */
  :host(:not([layout="mobile"])) .content {
    align-items: center;
  }
  :host(:not([layout="mobile"])) .text {
    flex: 1 1 auto;
    padding: var(--space-sm) 0;
  }
  :host(:not([layout="mobile"])) .title,
  :host(:not([layout="mobile"])) .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :host(:not([layout="mobile"])) .system-banner[data-content="multiline"] .content {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-2xs) 0;
  }
  :host(:not([layout="mobile"])) .system-banner[data-content="multiline"] .text {
    align-self: stretch;
    gap: var(--space-2xs);
    padding: var(--space-2xs) 0;
  }

  /* ---- mobile: a column; the title wraps and the description clamps at two lines ---- */
  :host([layout="mobile"]) .content {
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-sm) 0;
  }
  :host([layout="mobile"]) .title {
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
  }
  :host([layout="mobile"]) .description {
    display: -webkit-box;
    overflow: hidden;
    padding: var(--space-sm) 0;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  :host([layout="mobile"]) .actions {
    padding: var(--space-2xs) 0;
  }
`;
