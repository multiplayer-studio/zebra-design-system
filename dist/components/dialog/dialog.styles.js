import { css } from "lit";
/* Spec: specs/dialog (Dialog, _Dialog Header, _Dialog Footer). A space/md frame around three flush sections; the
   dialog follows the page width up to a max width; 480px is the tentative default and a project can set its own. Flavour changes only the header glyph, so every glyph stays
   foreground/primary. There is no elevation and no backdrop token yet (spec issues). */
export default css `
  :host {
    --_dialog-max-width: var(--dialog-max-width, var(--dialog-width, 480px));
    --_dialog-max-height: var(--dialog-max-height, 80vh);
    --_dialog-title-font-size: var(--dialog-title-font-size, var(--title-large-font-size));
    --_dialog-title-line-height: var(--dialog-title-line-height, var(--title-large-line-height));
  }

  dialog {
    box-sizing: border-box;
    flex-direction: column;
    width: min(var(--_dialog-max-width), calc(100vw - 2 * var(--space-page)));
    min-width: 0;
    max-width: none;
    max-height: var(--_dialog-max-height);
    overflow: auto;
    padding: var(--space-md);
    background-color: var(--surface-overlay);
    color: var(--foreground-primary);
    border: var(--stroke-thin) solid var(--zebra-border-default);
    border-radius: var(--zebra-radius-none);
  }

  :host([rounded]) dialog {
    border-radius: var(--radius-element-md);
  }

  dialog[open] {
    display: flex;
  }

  /* Header: control/lg tall, space/md padding, space/sm between glyph, title and close. */
  header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: var(--space-sm);
    min-height: var(--control-lg);
    padding: var(--space-md);
    --icon-color: var(--foreground-primary);
  }

  /* The leading glyph is a raw 24px glyph in Figma, with no size token (spec issue). */
  [part="header-icon"] {
    flex: none;
    --icon-size: 24px;
  }

  h1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1 0 0;
    margin: 0;
    padding: 0;
    font-family: var(--title-large-font-family);
    font-weight: var(--title-large-font-weight);
    letter-spacing: var(--title-large-letter-spacing);
    font-size: var(--_dialog-title-font-size);
    line-height: var(--_dialog-title-line-height);
  }

  /* Close: a real, labelled button around the Icon, which Figma draws bare (spec issue). */
  .close {
    all: unset;
    display: flex;
    flex: none;
    cursor: pointer;
    border-radius: var(--radius-element-sm);
    --icon-size: var(--control-icon-md);
  }

  .close:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thin);
  }

  div[part="body"] {
    display: flex;
    flex: 1;
    overflow: auto;
    padding: var(--space-md) var(--space-md) var(--space-section);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  footer {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-sm);
    padding: var(--space-md);
  }

  /* No actions: the footer is removed and the dialog hugs its header and body (spec: showFooter=false). */
  footer[data-element-count="0"] {
    display: none;
  }

  /* Three actions: the text action on the left, the other two on the right. */
  footer[data-element-count="3"] {
    justify-content: space-between;
  }

  footer ::slotted(:not(zeta-button)) {
    display: none;
  }

  .actions {
    display: flex;
    gap: var(--space-sm);
  }
`;
//# sourceMappingURL=dialog.styles.js.map