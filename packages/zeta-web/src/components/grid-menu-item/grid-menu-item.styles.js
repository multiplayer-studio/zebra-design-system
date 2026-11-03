import { css } from "lit";

/* Spec: specs/navigation-item. A fixed 72px column (raw in Figma, spec issue), space/sm by space/lg padding, space/sm
   between icon and label. The icon follows the label colour; Figma draws it a different token when active and
   disabled, which the metadata calls a mismatch (spec issue). */
export default css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    height: 72px;
    padding: var(--space-sm) var(--space-lg);
    cursor: pointer;
    color: var(--foreground-primary);
    -webkit-tap-highlight-color: transparent;
  }

  :host([active]) {
    color: var(--interactive-subtle-foreground-default);
  }

  :host([disabled]:not([active])) {
    cursor: not-allowed;
    color: var(--interactive-subtle-foreground-disabled);
  }

  .label {
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    white-space: nowrap;
    user-select: none;
  }

  .icon-container {
    position: relative;
    display: flex;
  }

  ::slotted(zeta-icon) {
    --icon-size: var(--control-icon-md);
    --icon-color: currentColor;
  }

  /* The badge sits outside the layout, pinned to the icon's top-right corner. */
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
  }

  /* ---- Tile (spec: specs/bottom-sheet, Grid Menu Item) -----------------------------------------------------------
     Active and disabled are drawn at the default state only, so neither takes pointer feedback. */
  :host([tile]) {
    flex: none;
    height: auto;
    min-width: 92px;
    padding: var(--space-lg);
    border-radius: var(--zebra-radius-none);
    background: var(--interactive-ghost-background-default);
  }

  :host([tile][rounded]) {
    border-radius: var(--radius-element-sm);
  }

  :host([tile]:not([active]):not([disabled]):hover) {
    background: var(--interactive-ghost-background-hover);
  }

  :host([tile]:not([active]):not([disabled]):active) {
    background: var(--interactive-ghost-background-pressed);
  }

  :host([tile]:focus-visible) {
    outline: var(--stroke-thin) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thin) * -1);
  }

  :host([tile]) .label {
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    white-space: normal;
    text-align: center;
  }

  :host([tile]) ::slotted(zeta-icon) {
    --icon-size: var(--control-icon-lg);
  }

  :host([tile]) .badge {
    translate: none;
  }
`;
