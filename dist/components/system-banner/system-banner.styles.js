import { css } from "lit";
/* System Banner — every value is a semantic token. The host always carries
   .mode-dark (spec: modeLock), so every token below, and every token inside
   the dismiss icon button and the slotted actions, resolves in Dark. Keyed
   off the layout and status attributes and the row's data-content. Ported
   rule for rule from packages/react-baseui system-banner.css.

   Spec: specs/system-banner-mobile/system-banner-mobile.spec.json
         specs/system-banner-desktop/system-banner-desktop.spec.json */
export default css `
  :host {
    /* It spans its container (the 412 / 983 Figma widths are the preview frame's). */
    display: block;
    inline-size: 100%;
    /* Its width comes from the container, never from the one-line desktop
       text, so it can shrink to the ellipsis inside a grid or flex track. */
    contain: inline-size;
    box-sizing: border-box;
    border-radius: var(--radius-none);
    background: var(--zds-system-banner-bg);
    color: var(--foreground-primary);
  }
  /* Hidden after the reverse has played; the host's own display would otherwise win. */
  :host([hidden]) { display: none; }
  [hidden] { display: none !important; }

  /* ---- shape: the banner stays square (radius/none) in both; only the
     controls inside take the shape attribute, which the element passes down. ---- */

  /* ---- status --------------------------------------------------------- */
  :host,
  :host([status="default"]) { --zds-system-banner-bg: var(--feedback-success-background-strong); }
  :host([status="negative"]) { --zds-system-banner-bg: var(--feedback-error-background-strong); }
  :host([status="warning"]) { --zds-system-banner-bg: var(--feedback-warning-background-strong); }
  :host([status="info"]) { --zds-system-banner-bg: var(--feedback-info-background-strong); }

  /* ---- message row: glyph, content, dismiss, held to the top ---------- */
  .row {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    padding: var(--space-lg);
  }
  :host([layout="mobile"]) .row {
    gap: var(--space-2xs);
    padding: var(--space-sm);
  }

  /* The glyph takes currentColor, foreground/primary like the text. Desktop
     centres a medium glyph in a control/sm square; mobile uses the framed
     icon, control/target-min square. */
  .glyph {
    display: grid;
    flex: none;
    place-items: center;
    inline-size: var(--control-sm);
    block-size: var(--control-sm);
  }
  :host([layout="mobile"]) .glyph {
    inline-size: var(--control-target-min);
    block-size: var(--control-target-min);
  }

  .dismiss { flex: none; }

  /* ---- content -------------------------------------------------------- */
  .content {
    display: flex;
    flex: 1 1 auto;
    min-inline-size: 0;
    gap: var(--space-lg);
  }
  .text {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
  }
  ::slotted(*) { flex: none; }

  .title {
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }
  .description {
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }

  /* desktop, single line: title and actions on one row; the title ends in an
     ellipsis rather than wrapping. */
  :host(:not([layout="mobile"])) .content { align-items: center; }
  :host(:not([layout="mobile"])) .text {
    flex: 1 1 auto;
    padding-block: var(--space-sm);
  }
  :host(:not([layout="mobile"])) :is(.title, .description) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* desktop, multiline: the actions drop beneath the text. The description is
     capped at one line as Figma draws it (spec warn: Reflow says it grows). */
  :host(:not([layout="mobile"])) .row[data-content="multiline"] .content {
    flex-direction: column;
    align-items: flex-start;
    padding-block: var(--space-2xs);
  }
  :host(:not([layout="mobile"])) .row[data-content="multiline"] .text {
    align-self: stretch;
    gap: var(--space-2xs);
    padding-block: var(--space-2xs);
  }

  /* mobile: a column of title, description and the action row beneath. The
     title wraps; the description is clamped at two lines. */
  :host([layout="mobile"]) .content {
    flex-direction: column;
    gap: var(--space-sm);
    padding-block: var(--space-sm);
  }
  :host([layout="mobile"]) .title {
    font-family: var(--label-large-font-family), system-ui, sans-serif;
    font-size: var(--label-large-font-size);
    font-weight: var(--label-large-font-weight);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
  }
  :host([layout="mobile"]) .description {
    display: -webkit-box;
    overflow: hidden;
    padding-block: var(--space-sm);
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  :host([layout="mobile"]) .actions { padding-block: var(--space-2xs); }
`;
