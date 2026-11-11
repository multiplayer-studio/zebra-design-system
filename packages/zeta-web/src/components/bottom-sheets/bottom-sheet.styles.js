import { css } from "lit";

/* Spec: specs/bottom-sheet. The handle bar's 4 height has no token (spec issue). Figma defines no motion or height cap,
   so the slide on isExpanded and --bottom-sheet-max-height stay as Zeta extensions. */
export default css`
  :host {
    display: block;
    position: relative;
    overflow-y: hidden;
  }

  :host > .container {
    transition: transform 250ms ease;
  }

  :host(:not([isExpanded])) > .container {
    transform: translateY(100%);
  }

  :host([isExpanded]) > .container {
    transform: translateY(0);
  }

  .container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: var(--space-card);
    background: var(--surface-overlay);
    border-top-right-radius: var(--radius-container);
    border-top-left-radius: var(--radius-container);
    max-height: var(--bottom-sheet-max-height, 90vh);
  }

  .handle-row {
    display: flex;
    justify-content: center;
    padding: var(--space-lg) var(--space-section);
  }

  .handle {
    background-color: var(--zebra-border-default);
    width: var(--control-target-min);
    height: 4px;
    border-radius: var(--radius-pill);
  }

  :host([headerAlignment="start"]) .header {
    justify-content: flex-start;
  }

  :host([headerAlignment="center"]) .header {
    justify-content: center;
    gap: var(--space-gutter);
    padding: var(--space-gutter) var(--space-lg);
  }

  .header {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    color: var(--foreground-primary);
    padding: var(--space-sm) var(--space-lg);
    font: var(--text-title-medium);
    letter-spacing: var(--title-medium-letter-spacing);
  }

  .title {
    min-width: 0;
    margin: 0;
    font: inherit;
    letter-spacing: inherit;
  }

  :host([headerAlignment="center"]) .header-icon {
    position: absolute;
    left: var(--space-lg);
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    gap: var(--space-2xs);
    padding: var(--space-md) var(--space-lg);
  }

  .isGenericContent {
    display: block;
    padding-inline: var(--space-gutter);
  }

  .isGrid {
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-md);
    padding-inline: var(--space-gutter);
  }

  /* zeta-card-footer's own rule stops at this slot, so the share is set here. */
  ::slotted([slot="actions"]) {
    flex: 1 1 0;
  }

  /* Modal: the sheet is a native dialog pinned to the bottom of the viewport. The backdrop is the zeta-scrim before it
     (tone scrim, specs/scrim); ::backdrop only catches the click. Rising from the bottom edge is a code decision. */
  dialog.sheet {
    position: fixed;
    inset: auto 0 0 0;
    box-sizing: border-box;
    width: 100%;
    max-width: none;
    max-height: var(--bottom-sheet-max-height, 90vh);
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    overflow: hidden;
    outline: none;
  }

  dialog.sheet[open] {
    display: flex;
    flex-direction: column;
  }

  dialog.sheet::backdrop {
    background: transparent;
  }

  dialog.sheet .container {
    min-height: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    dialog.sheet {
      transition: translate var(--animations-smooth);
    }

    @starting-style {
      dialog.sheet[open] {
        translate: 0 100%;
      }
    }
  }
`;
