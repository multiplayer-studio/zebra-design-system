import { css } from "lit";

/* Spec: specs/navigation-rail-item. A control/lg square in the narrow form (space/sm by space/xxs padding, caption on
   indicator/small under the glyph), a full-width row in the wide one (space/sm by space/lg, label/medium). Hover and
   press are the ghost scrims alone, with no paint opacity on top (spec warn "Double alpha"). Selection recolours the
   glyph and label; disabled drops the fill. */
export default css`
  :host {
    display: inline-flex;
    vertical-align: top;
    max-width: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  :host([expanded]) {
    display: flex;
    width: 100%;
  }

  .item {
    all: unset;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-none);
    min-width: var(--control-lg);
    min-height: var(--control-lg);
    max-width: 100%;
    padding: var(--space-sm) var(--space-xxs);
    border-radius: var(--zebra-radius-none);
    cursor: pointer;
    background-color: var(--_bg);
    color: var(--_fg);
    --_bg: var(--interactive-ghost-background-default);
    --_fg: var(--interactive-neutral-foreground-default);
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  :host([rounded]) .item {
    border-radius: var(--radius-sm);
  }

  :host([expanded]) .item {
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--space-lg);
    /* The glyph starts where the narrow form centres it, so it does not move as the rail widens or narrows. This is
       space/lg on desktop; other breakpoints follow the glyph rather than space/lg. */
    padding: var(--space-sm) var(--space-lg) var(--space-sm) calc((var(--control-lg) - var(--icon-size)) / 2);
    width: 100%;
  }

  /* The box the badge is anchored to; it does not clip, so the dot overhangs its corner. */
  .icon {
    position: relative;
    display: inline-flex;
    flex: none;
    line-height: 0;
  }

  .badge {
    position: absolute;
    top: calc(var(--space-xxs) * -1);
    inset-inline-start: calc(100% - var(--space-xxs));
  }

  /* One line, end-truncated, as Figma draws it (spec warn "Truncation"). */
  .label {
    display: block;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    font: var(--text-indicator-small);
    letter-spacing: var(--indicator-small-letter-spacing);
  }

  :host([expanded]) .label {
    text-align: start;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .item:hover {
      --_bg: var(--interactive-ghost-background-hover);
    }
  }

  :host(:not([disabled])) .item:active {
    --_bg: var(--interactive-ghost-background-pressed);
  }

  :host([selected]:not([disabled])) .item {
    --_fg: var(--interactive-subtle-foreground-default);
  }

  :host([disabled]) .item {
    cursor: not-allowed;
    --_bg: transparent;
    --_fg: var(--interactive-subtle-foreground-disabled);
    color: var(--_fg);
    --icon-color: var(--_fg);
  }

  /* No focus variant in Figma; the focus ring is the implementation's. */
  .item:focus-visible {
    --_bg: var(--interactive-ghost-background-focused);
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thick) * -1);
  }
`;
