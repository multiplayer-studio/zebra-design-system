import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer, keyed
 * off the host's `shape` / `inline` attributes and data-layout on the footer.
 * Nothing here knows about themes. Mirrors
 * packages/react-baseui/src/components/dialog/dialog.css.
 *
 * Spec: specs/dialog/dialog.spec.json
 */
export default css`
  :host {
    display: inline-block;
    vertical-align: top;
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- backdrop ---------------------------------------------------------- */
  /* The backdrop is the <zds-scrim> before the dialog (tone scrim, see
     specs/scrim). The native ::backdrop stays only to catch the click. */
  dialog::backdrop {
    background: transparent;
  }

  /* ---- anatomy: root (the panel) ------------------------------------------ */
  .panel {
    /* Width. spec issue "Body and footer carry a raw 480Px minimum width with
       no token": 480px is the spec's measured content width, kept as a
       literal; the panel adds its own padding and border. Never wider than
       the viewport less --space-page each side. Override --zds-dialog-width
       for a wider or narrower dialog. */
    --zds-dialog-width: calc(480px + 2 * var(--space-md) + 2 * var(--stroke-thin));

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-none);
    inline-size: min(var(--zds-dialog-width), 100vw - 2 * var(--space-page));
    max-inline-size: none;
    /* Size & placement are unmodelled in the spec: the panel stops short of
       the viewport and the body scrolls (below) rather than clipping. */
    max-block-size: calc(100dvh - 2 * var(--space-page));
    padding: var(--space-md);
    border: var(--stroke-thin) solid var(--border-default);
    border-radius: var(--radius-element-md);
    background: var(--surface-overlay);
    color: var(--foreground-primary);
    /* spec note "There is no elevation": shadow/large on shadow/soft is used
       so the panel reads as raised above the scrim, as the dropdown menu and
       snackbar are raised with shadow/medium. */
    box-shadow: var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft);
    outline: none;
    /* Motion: none — the spec defines no transition for the dialog. */
  }

  /* Modal: the native dialog sits in the top layer (no z-index needed),
     fixed and centred in the viewport. */
  dialog.panel {
    position: fixed;
    inset: 0;
    margin: auto;
    block-size: fit-content;
  }
  dialog.panel:not([open]) {
    display: none;
  }

  /* Inline: the spec's static drawing, in normal flow. */
  .panel.inline {
    position: relative;
  }

  /* ---- shape ------------------------------------------------------------- */
  :host([shape="sharp"]) .panel {
    border-radius: var(--radius-none);
  }

  /* ---- anatomy: header ----------------------------------------------------- */
  .header {
    box-sizing: border-box;
    flex: none;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-block-size: var(--control-lg);
    padding: var(--space-md);
  }

  .title-group {
    flex: 1 1 auto;
    min-inline-size: 0;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .icon {
    flex: none;
    color: var(--foreground-primary);
  }

  .title {
    margin: 0;
    min-inline-size: 0;
    font-family: var(--title-large-font-family), system-ui, sans-serif;
    font-size: var(--title-large-font-size);
    font-weight: var(--title-large-font-weight);
    line-height: var(--title-large-line-height);
    letter-spacing: var(--title-large-letter-spacing);
    color: var(--foreground-primary);
    /* Long titles wrap (unmodelled in the spec) rather than pushing the
       close button out. */
    overflow-wrap: anywhere;
  }

  /* The close button's hit area (control/md) spills into the header's own
     padding, so the header lays out as if the bare control/icon-md glyph the
     spec draws sat there: same height, and the glyph's edge on the content
     edge. */
  .close {
    flex: none;
    display: flex;
    margin-block: calc((var(--control-icon-md) - var(--control-md)) / 2);
    margin-inline-end: calc((var(--control-icon-md) - var(--control-md)) / 2);
  }

  /* ---- anatomy: body ------------------------------------------------------- */
  .body {
    box-sizing: border-box;
    flex: 1 1 auto;
    min-block-size: 0;
    margin: 0;
    /* spec note "Long-content scrolling isn't modelled": the body scrolls. */
    overflow: auto;
    padding: var(--space-md) var(--space-md) var(--space-section);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  /* ---- anatomy: footer ----------------------------------------------------- */
  /* spec issue "The footer has a fixed width": it fills the panel like the
     header and body instead of holding 480px. */
  .footer {
    box-sizing: border-box;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: var(--space-sm);
    padding: var(--space-md);
  }
  .footer[data-layout="split"] {
    justify-content: space-between;
  }

  .footer-start,
  .footer-end {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
`;
