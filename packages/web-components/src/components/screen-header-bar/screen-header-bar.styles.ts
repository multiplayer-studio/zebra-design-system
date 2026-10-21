import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. The back
 * button and the action are `<zds-icon-button>` / `<zds-button>` and bring
 * their own styles; this file only lays the bar out.
 *
 * Spec: specs/screen-header-bar/screen-header-bar.spec.json
 */
export default css`
  /* ---- root -------------------------------------------------------------- */
  :host {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    /* Spec issue (layout): fills its container; Figma ships a fixed 474 width. */
    width: 100%;
    /* Spec issue (padding & gap): the bound tokens, not the metadata's
       space/sm + space/lg + space/sm gap. Height hugs: 64 around control/md. */
    gap: var(--space-xs);
    padding: var(--space-md) var(--space-md) var(--space-md) var(--space-sm);
    /* Figma binds interactive/ghost/background/default at paint opacity 0, so
       the bar is transparent and sits on whatever surface the screen provides. */
    background: transparent;
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- leading icon ------------------------------------------------------ */
  .leading {
    flex: none;
  }

  /* ---- heading content --------------------------------------------------- */
  .heading {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  .title {
    margin: 0;
    font-family: var(--title-large-font-family), system-ui, sans-serif;
    font-size: var(--title-large-font-size);
    font-weight: var(--title-large-font-weight);
    line-height: var(--title-large-line-height);
    letter-spacing: var(--title-large-letter-spacing);
    color: var(--foreground-primary);
    text-align: start;
    /* No truncation in Figma: a long title wraps rather than overflowing. */
    overflow-wrap: anywhere;
  }

  /* ---- action slot ------------------------------------------------------- */
  .action {
    flex: none;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .action[hidden] {
    display: none;
  }
`;
