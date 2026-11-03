import { css } from "lit";

/* Spec: specs/switch. A 64 by 32 track (no size token) with space/xxs padding and radius/pill. The thumb is a
   control/xs pill on interactive/primary/foreground/default that slides 32 to the end when on, on animations/spring,
   while the track moves from interactive/selection/background/default to …/pressed in step. Disabled moves both to
   their disabled tokens. The icons are control/icon-md glyphs on foreground/inverse at either end, each covered by the
   thumb at its own end. Focus draws stroke/thick border/focus outside the track: inside it would be 1.1–1.5:1 against
   the track (spec warn). The documented --switch-* overrides still win. */
export default css`
  :host {
    --_switch-width: var(--switch-width, 64px);
    --_switch-height: var(--switch-height, 32px);
    --_switch-padding: var(--space-xxs);
    --_switch-thumb-size: var(--switch-thumb-size, var(--control-xs));
    --_switch-icon-size: var(--switch-icon-size, var(--control-icon-md));
    --_switch-travel: calc(var(--_switch-width) - var(--_switch-thumb-size) - 2 * var(--_switch-padding));
    --_switch-icon-inset: calc(var(--_switch-padding) + (var(--_switch-thumb-size) - var(--_switch-icon-size)) / 2);

    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 0;
    border: none;
    -webkit-tap-highlight-color: transparent;
  }

  div[part="track"] {
    position: relative;
    box-sizing: border-box;
    width: var(--_switch-width);
    height: var(--_switch-height);
    border-radius: var(--radius-pill);
    background-color: var(--switch-track-color, var(--interactive-selection-background-default));
    cursor: pointer;
    outline: none;
    transition: background-color var(--animations-spring);
  }

  div[part="track"]:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  div[part="thumb"] {
    position: absolute;
    z-index: 1;
    top: var(--_switch-padding);
    left: var(--_switch-padding);
    width: var(--_switch-thumb-size);
    height: var(--_switch-thumb-size);
    border-radius: var(--radius-pill);
    background-color: var(--switch-thumb-color, var(--interactive-primary-foreground-default));
    transition: transform var(--animations-spring);
  }

  zeta-icon {
    position: absolute;
    top: calc((var(--_switch-height) - var(--_switch-icon-size)) / 2);
    --icon-size: var(--_switch-icon-size);
    --icon-color: var(--switch-icon-color, var(--foreground-inverse));
    color: var(--switch-icon-color, var(--foreground-inverse));
  }

  /* The on icon sits at the start, covered while off; the off icon at the end, covered while on. */
  zeta-icon[part~="active"] {
    left: var(--_switch-icon-inset);
  }

  zeta-icon[part~="inactive"] {
    right: var(--_switch-icon-inset);
  }

  :host([checked]) div[part="thumb"] {
    transform: translateX(var(--_switch-travel));
  }

  :host([checked]) div[part="track"] {
    background-color: var(--switch-track-active-color, var(--interactive-selection-background-pressed));
  }

  :host([disabled]) div[part="track"] {
    cursor: not-allowed;
    background-color: var(--switch-track-disabled-color, var(--interactive-selection-background-disabled));
  }

  :host([disabled]) div[part="thumb"] {
    background-color: var(--switch-thumb-disabled-color, var(--interactive-primary-foreground-disabled));
  }

  :host([disabled]) zeta-icon {
    --icon-color: var(--switch-icon-disabled-color, var(--foreground-disabled));
    color: var(--switch-icon-disabled-color, var(--foreground-disabled));
  }

  /* With reduced motion the state changes at once; the colour change stays. */
  @media (prefers-reduced-motion: reduce) {
    div[part="track"],
    div[part="thumb"] {
      transition: none;
    }
  }
`;
