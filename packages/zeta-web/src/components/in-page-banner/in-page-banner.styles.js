import { css } from "lit";

/* Spec: specs/inline-banner. A space/md × space/lg surface with a stroke/thin border, radius/sm when rounded and
   radius/none when sharp. Subtle: the faint feedback tint, a status border, the status colour on the glyph and
   foreground/primary text. Solid: the strong feedback fill, its own colour as the border, and foreground/on-strong
   for text and glyph. border/default, border/info, border/warning and radius/none bind their --zebra- aliases
   (the legacy set shares those names). The text keeps a 16rem minimum before the actions wrap (spec gap: no size
   token). */
export default css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    --_fg: var(--foreground-primary);
    --_muted: var(--foreground-primary);
    --_bg: var(--feedback-info-background-subtle);
    --_border: var(--zebra-border-info);
    --_glyph: var(--feedback-info-foreground);
  }

  [hidden] {
    display: none !important;
  }

  /* Outranks Contourable's :host > * radius. */
  :host .banner {
    border-radius: var(--radius-sm);
  }
  :host([rounded="false"]) .banner,
  :host(:not([rounded])) .banner {
    border-radius: var(--zebra-radius-none);
  }

  .banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    box-sizing: border-box;
    padding: var(--space-md) var(--space-lg);
    border: var(--stroke-thin) solid var(--_border);
    background-color: var(--_bg);
    color: var(--_fg);
  }

  /* ---- status: subtle ---- */
  :host([status="neutral"]),
  :host([status="default"]) {
    --_bg: var(--feedback-neutral-background-subtle);
    --_border: var(--zebra-border-default);
    --_glyph: var(--feedback-neutral-foreground);
  }
  :host([status="positive"]) {
    --_bg: var(--feedback-success-background-subtle);
    --_border: var(--border-success);
    --_glyph: var(--feedback-success-foreground);
  }
  :host([status="warning"]) {
    --_bg: var(--feedback-warning-background-subtle);
    --_border: var(--zebra-border-warning);
    --_glyph: var(--feedback-warning-foreground);
  }
  :host([status="negative"]) {
    --_bg: var(--feedback-error-background-subtle);
    --_border: var(--border-error);
    --_glyph: var(--feedback-error-foreground);
  }

  /* ---- appearance: solid; the border takes the fill so both appearances share a size ---- */
  :host([appearance="solid"]) {
    --_fg: var(--foreground-on-strong);
    --_muted: var(--foreground-on-strong);
    --_glyph: var(--foreground-on-strong);
    --_bg: var(--feedback-info-background-strong);
    --_border: var(--_bg);
  }
  :host([appearance="solid"][status="neutral"]),
  :host([appearance="solid"][status="default"]) {
    --_bg: var(--feedback-neutral-background-strong);
  }
  :host([appearance="solid"][status="positive"]) {
    --_bg: var(--feedback-success-background-strong);
  }
  :host([appearance="solid"][status="warning"]) {
    --_bg: var(--feedback-warning-background-strong);
  }
  :host([appearance="solid"][status="negative"]) {
    --_bg: var(--feedback-error-background-strong);
  }

  /* ---- glyph: centred on the title's first line ---- */
  .glyph {
    flex: none;
    display: grid;
    place-items: center;
    height: var(--label-large-line-height);
    --icon-size: var(--control-icon-md);
    --icon-color: var(--_glyph);
  }

  /* ---- content: text, then actions; the actions wrap beneath when narrow ---- */
  .content {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm) var(--space-lg);
  }

  .text {
    flex: 1 1 16rem;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  .title {
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
  }

  .description {
    color: var(--_muted);
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }
  .description:empty {
    display: none;
  }

  .actions {
    flex: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
  }

  ::slotted([slot="actions"]),
  ::slotted([slot="action"]) {
    flex: none;
  }

  /* Sits in the corner with a space/sm gap above and to its right. */
  .dismiss {
    flex: none;
    margin: calc(var(--space-2xs) * -1) calc(var(--space-sm) * -1) calc(var(--space-2xs) * -1) 0;
  }
  /* Figma pins palette Dark on the solid dismiss; inside the shadow root its foreground maps to
     foreground/on-strong instead. */
  :host([appearance="solid"]) .dismiss {
    --interactive-neutral-foreground-default: var(--foreground-on-strong);
  }
`;
