import { css } from "lit";

/**
 * Every value is a semantic token from the generated CSS layer, keyed off the
 * reflected `read` / `group` attributes. Kept rule for rule in step with
 * packages/react-baseui notification-item.css.
 *
 * Spec: specs/notification-item/notification-item.spec.json
 */
export default css`
  :host {
    display: block;
  }
  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  /* ---- root (anatomy) ------------------------------------------------- */
  .card {
    position: relative; /* anchors the group bar */
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    /* Fills its list; Figma's 360 is a fixed frame width with no token. */
    width: 100%;
    padding: var(--space-gutter) var(--space-card);
    border-radius: var(--radius-md);
    /* stroke/base is zero by default: a theming hook for high-contrast sets. */
    border: var(--stroke-base) solid var(--border-default);
    background: var(--surface-card);
    color: var(--foreground-primary);
  }

  /* ---- read ------------------------------------------------------------- */
  :host([read]) .card {
    background: transparent;
  }

  /* ---- content column --------------------------------------------------- */
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    flex: 1 1 auto;
    min-width: 0;
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* Fixed-width wrapper with space/sm top/bottom padding around the dot. */
  .dot-wrap {
    display: inline-flex;
    flex: none;
    padding: var(--space-sm) 0;
  }

  /* Spec issue "Dependency overrides": the unread dot is primary, not
     zds-notification-indicator's destructive. Recoloured through its public
     root part; a \`fill\` property on it would be the cleaner hook. */
  .dot::part(root) {
    background: var(--interactive-primary-background-default);
  }

  .title {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere;
    font-family: var(--label-large-font-family), system-ui, sans-serif;
    font-size: var(--label-large-font-size);
    font-weight: var(--label-large-font-weight);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
    color: var(--foreground-primary);
  }
  /* Read follows Figma: label/large -> body/medium (spec issue
     "Metadata vs extracted"). */
  :host([read]) .title {
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  .meta {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-2xs) 0;
  }

  .timestamp {
    white-space: nowrap;
    font-family: var(--label-small-font-family), system-ui, sans-serif;
    font-size: var(--label-small-font-size);
    font-weight: var(--label-small-font-weight);
    line-height: var(--label-small-line-height);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-tertiary);
  }

  /* Body: max two lines, truncated at the end. The full text stays in the DOM. */
  .body {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-primary);
  }

  /* The glyph is currentColor; the row carries foreground/link so the
     paperclip and the filename read as one. */
  .attachment {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-width: 0;
    color: var(--foreground-link);
  }

  .filename {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--label-small-font-family), system-ui, sans-serif;
    font-size: var(--label-small-font-size);
    font-weight: var(--label-small-font-weight);
    line-height: var(--label-small-line-height);
    letter-spacing: var(--label-small-letter-spacing);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-xs);
    padding: var(--space-none) 0;
  }
  /* The slot itself is transparent to layout, so slotted buttons are the
     flex items and take the gap. */
  .actions slot {
    display: contents;
  }

  /* ---- group ------------------------------------------------------------
     Absolute, hanging from the card's bottom edge; width less space/md each
     side (Figma's "width less 24" at any width, not a fixed 336); height
     space/xs (4, no dedicated token); only the bottom corners rounded. */
  .group {
    position: absolute;
    top: 100%;
    left: var(--space-md);
    right: var(--space-md);
    height: var(--space-xs);
    background: var(--border-focus);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }
`;
