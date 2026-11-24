import { css } from "lit";
/* Spec: specs/sub-menu-item. A control/lg-tall row, space/2xs by space/md padding (space/xl leading when nested), the
   glyph and label grouped at space/md, then badge and caret at space/sm (spec warn "Gap"). Hover, pressed and selected
   fills are the ghost tokens alone (spec warn "Double alpha"). One line, end-truncated. */
export default css `
  :host {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .wrapper {
    display: flex;
    flex: 1;
    min-width: 0;
  }

  .row {
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
    min-height: var(--control-lg);
    padding: var(--space-2xs) var(--space-md);
    border-radius: var(--zebra-radius-none);
    cursor: pointer;
    background-color: var(--_bg);
    color: var(--_fg);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    --_bg: transparent;
    --_fg: var(--foreground-primary);
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  :host([rounded]) .row {
    border-radius: var(--radius-sm);
  }

  :host([nested]) .row {
    padding-inline-start: var(--space-xl);
    font: var(--text-indicator-medium);
    letter-spacing: var(--indicator-medium-letter-spacing);
    --_fg: var(--foreground-secondary);
  }

  .lead {
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--space-md);
    min-width: 0;
  }

  .icon {
    display: inline-flex;
    flex: none;
    line-height: 0;
  }

  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .badge,
  .caret {
    flex: none;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .row:hover {
      --_bg: var(--interactive-ghost-background-hover);
    }
  }

  :host(:not([disabled])) .row:active {
    --_bg: var(--interactive-ghost-background-pressed);
    --_fg: var(--interactive-neutral-foreground-default);
  }

  :host([selected]:not([disabled])) .row {
    --_bg: var(--interactive-ghost-background-selected);
    --_fg: var(--interactive-ghost-foreground-default);
  }

  :host([disabled]) .row {
    cursor: not-allowed;
    --_bg: transparent;
    --_fg: var(--foreground-disabled);
    color: var(--_fg);
    --icon-color: var(--_fg);
  }

  .row:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thick) * -1);
  }

  /* The full label of a truncated row, beside it. It stays in this shadow tree, so it follows the rail's mode. */
  .tip {
    position: absolute;
    inset-inline-start: calc(100% + var(--space-2xs));
    top: 50%;
    translate: 0 -50%;
    z-index: 1;
    white-space: nowrap;
    pointer-events: none;
  }
`;
//# sourceMappingURL=sub-menu-item.styles.js.map