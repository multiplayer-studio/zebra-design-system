import { css } from "lit";
/* Inline Banner — every value is a semantic token. Keyed off the status,
   appearance and shape attributes. Ported rule for rule from
   packages/react-baseui inline-banner.css.

   solid:  strong feedback fill, foreground/on-strong text and glyph.
   subtle: faint feedback tint, status border, status colour on the glyph,
           foreground/primary title and description.

   Spec: specs/inline-banner/inline-banner.spec.json */
export default css `
  :host {
    /* It spans its container (the 640 Figma width is the preview frame's). */
    display: block;
    inline-size: 100%;
    box-sizing: border-box;
  }
  [hidden] { display: none !important; }

  .banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    box-sizing: border-box;
    padding: var(--space-md) var(--space-lg);
    border: var(--stroke-thin) solid var(--zds-inline-banner-border);
    border-radius: var(--radius-sm);
    background: var(--zds-inline-banner-bg);
    color: var(--zds-inline-banner-fg);
  }

  /* ---- shape ---------------------------------------------------------- */
  :host([shape="sharp"]) .banner { border-radius: var(--radius-none); }

  /* ---- status x appearance: subtle ------------------------------------ */
  :host,
  :host([appearance="subtle"]) {
    --zds-inline-banner-fg: var(--foreground-primary);
    --zds-inline-banner-muted: var(--foreground-primary);
  }
  :host([status="neutral"]) {
    --zds-inline-banner-bg: var(--feedback-neutral-background-subtle);
    --zds-inline-banner-border: var(--border-default);
    --zds-inline-banner-glyph: var(--feedback-neutral-foreground);
  }
  :host,
  :host([status="info"]) {
    --zds-inline-banner-bg: var(--feedback-info-background-subtle);
    --zds-inline-banner-border: var(--border-info);
    --zds-inline-banner-glyph: var(--feedback-info-foreground);
  }
  :host([status="positive"]) {
    --zds-inline-banner-bg: var(--feedback-success-background-subtle);
    --zds-inline-banner-border: var(--border-success);
    --zds-inline-banner-glyph: var(--feedback-success-foreground);
  }
  :host([status="warning"]) {
    --zds-inline-banner-bg: var(--feedback-warning-background-subtle);
    --zds-inline-banner-border: var(--border-warning);
    --zds-inline-banner-glyph: var(--feedback-warning-foreground);
  }
  :host([status="negative"]) {
    --zds-inline-banner-bg: var(--feedback-error-background-subtle);
    --zds-inline-banner-border: var(--border-error);
    --zds-inline-banner-glyph: var(--feedback-error-foreground);
  }

  /* ---- solid: the border takes the fill so both appearances share a size -- */
  :host([appearance="solid"]) {
    --zds-inline-banner-fg: var(--foreground-on-strong);
    --zds-inline-banner-muted: var(--foreground-on-strong);
    --zds-inline-banner-glyph: var(--foreground-on-strong);
    --zds-inline-banner-border: var(--zds-inline-banner-bg);
  }
  :host([appearance="solid"][status="neutral"]) { --zds-inline-banner-bg: var(--feedback-neutral-background-strong); }
  :host([appearance="solid"]:not([status])),
  :host([appearance="solid"][status="info"]) { --zds-inline-banner-bg: var(--feedback-info-background-strong); }
  :host([appearance="solid"][status="positive"]) { --zds-inline-banner-bg: var(--feedback-success-background-strong); }
  :host([appearance="solid"][status="warning"]) { --zds-inline-banner-bg: var(--feedback-warning-background-strong); }
  :host([appearance="solid"][status="negative"]) { --zds-inline-banner-bg: var(--feedback-error-background-strong); }

  /* AAA modes turn the strong fills pale, and solid text is always white, so
     solid keeps the deep fills. Only solid reads the strong fills, so the
     overrides need no appearance condition. :host-context is Chromium-only;
     elsewhere AAA solid falls back to the pale fills (the known web-components
     AAA gap). */
  :host-context(.mode-aaa-light),
  :host-context(.mode-aaa-dark),
  :host-context([data-theme-mode^="aaa-"]) {
    --feedback-success-background-strong: var(--primitives-color-system-positive-80);
    --feedback-error-background-strong: var(--primitives-color-system-negative-80);
    --feedback-warning-background-strong: var(--primitives-color-system-warning-80);
    --feedback-info-background-strong: var(--primitives-color-system-info-80);
  }

  /* ---- glyph: centred on the title's first line ----------------------- */
  .glyph {
    display: grid;
    flex: none;
    place-items: center;
    block-size: var(--label-large-line-height);
    color: var(--zds-inline-banner-glyph);
  }

  /* ---- content: text, then actions; actions wrap below when narrow ---- */
  .content {
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm) var(--space-lg);
    min-inline-size: 0;
  }
  .text {
    display: flex;
    /* 16rem minimum before the actions wrap (spec gap: no size token). */
    flex: 1 1 16rem;
    flex-direction: column;
    gap: var(--space-2xs);
    min-inline-size: 0;
  }
  .title {
    font-family: var(--label-large-font-family), system-ui, sans-serif;
    font-size: var(--label-large-font-size);
    font-weight: var(--label-large-font-weight);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
  }
  .description {
    color: var(--zds-inline-banner-muted);
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }
  .actions {
    display: flex;
    flex: none;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
  }
  ::slotted(*) { flex: none; }

  /* Sits in the corner with the same space-sm gap above it and to its right:
     the negative margins eat the banner's own padding down to that gap. */
  .dismiss {
    flex: none;
    margin-block: calc(var(--space-2xs) * -1);
    margin-inline-end: calc(var(--space-sm) * -1);
  }
  /* Figma pins palette=Dark on the solid dismiss. The document's mode classes
     can't reach into this shadow root, so the subtle icon button's foreground
     is mapped to foreground/on-strong instead (it draws light on any fill). */
  :host([appearance="solid"]) .dismiss {
    --interactive-neutral-foreground-default: var(--foreground-on-strong);
  }
`;
