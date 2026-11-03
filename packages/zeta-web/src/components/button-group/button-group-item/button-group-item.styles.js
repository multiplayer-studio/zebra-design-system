import { css } from "lit";

/* Spec: specs/button-group (Group item). Button's subtle flavour at the group's size: ghost fill, neutral label,
   Button's control heights, padding and label styles. The rule after the item and its outer corners come from the
   group through --group-item-divider and --group-item-left/right-radius. */
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;
    -webkit-tap-highlight-color: transparent;
    border-inline-end: var(--group-item-divider, none);
  }

  :host > button {
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    height: var(--control-sm);
    padding: var(--space-xxs) var(--space-md);
    background: var(--_bg);
    color: var(--_fg);
    border-radius: var(--group-item-left-radius) var(--group-item-right-radius) var(--group-item-right-radius) var(--group-item-left-radius);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    --_bg: var(--interactive-ghost-background-default);
    --_fg: var(--interactive-neutral-foreground-default);
    --icon-color: var(--_fg);
    --icon-size: var(--control-icon-sm);
    transition: background-color 120ms ease;
  }

  label {
    display: flex;
    cursor: inherit;
  }

  /* The label's own padding separates it from the icons, as on Button. */
  label.pad {
    padding-inline: var(--space-xxs);
  }

  :host([size="medium"]) > button {
    height: var(--control-md);
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
    --icon-size: var(--control-icon-md);
  }

  :host([size="large"]) > button {
    height: var(--control-lg);
    padding-inline: var(--space-lg);
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
    --icon-size: var(--control-icon-md);
  }

  zeta-icon,
  ::slotted(zeta-icon) {
    flex: none;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) > button:hover {
      --_bg: var(--interactive-ghost-background-hover);
    }
  }

  :host(:not([disabled])) > button:active {
    --_bg: var(--interactive-ghost-background-pressed);
  }

  :host > button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  :host([disabled]) > button {
    cursor: not-allowed;
    --_bg: var(--interactive-primary-background-disabled);
    --_fg: var(--interactive-primary-foreground-disabled);
  }

  /* inverse: a Zeta flavour with no Zebra spec, kept on the contrast tokens. */
  :host([flavor="inverse"]) > button {
    --_bg: var(--interactive-inverse-background-default);
    --_fg: var(--interactive-inverse-foreground-default);
  }
  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="inverse"]:not([disabled])) > button:hover {
      --_bg: var(--interactive-inverse-background-hover);
    }
  }
  :host([flavor="inverse"]:not([disabled])) > button:active {
    --_bg: var(--interactive-inverse-background-pressed);
  }

  @media (prefers-reduced-motion: reduce) {
    :host > button {
      transition: none;
    }
  }
`;
