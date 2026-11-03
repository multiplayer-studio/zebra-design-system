import { css } from "lit";

/* Spec: specs/avatar-rail. Every size is medium scaled by diameter / 48, so the overlap, cutout, ring and count are
   ratios of the diameter: gap -1/4, strokes 1/24, count font 1/3, line height 1/2. Only medium binds tokens. */
export default css`
  :host {
    --_d: var(--avatar-size, var(--control-lg));
    --_gap: calc(var(--_d) / -4);
    --_stroke: calc(var(--_d) / 24);
    --initials-size: calc(var(--_d) / 3);
    display: flex;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    height: min-content;
  }

  :host(:not([size])),
  :host([size="m"]) {
    --avatar-size: var(--control-lg);
    --_gap: var(--space-neg-xl);
    --_stroke: var(--stroke-thick);
    --initials-size: var(--label-large-font-size);
  }

  :host([size="xxxs"]) {
    --avatar-size: 24px;
  }

  :host([size="xxs"]) {
    --avatar-size: 32px;
  }

  :host([size="xs"]) {
    --avatar-size: 36px;
  }

  :host([size="s"]) {
    --avatar-size: 40px;
  }

  :host([size="l"]) {
    --avatar-size: 60px;
  }

  :host([size="xl"]) {
    --avatar-size: 80px;
  }

  :host([size="xxl"]) {
    --avatar-size: 120px;
  }

  :host([size="xxxl"]) {
    --avatar-size: 200px;
  }

  ::slotted(:not(zeta-avatar)) {
    display: none;
  }

  /* Each avatar is cut out of the one beneath it by a border/inverse stroke outside its edge. */
  ::slotted(zeta-avatar) {
    position: relative;
    flex: none;
    border-radius: var(--radius-pill);
    box-shadow: 0 0 0 var(--_stroke) var(--border-inverse);
  }

  ::slotted(zeta-avatar:not(:first-child)),
  .overflow {
    margin-inline-start: var(--_gap);
  }

  /* Only the first max avatars show (spec: max, 2 to 4). */
  ::slotted(zeta-avatar:nth-child(n + 5)),
  :host([max="3"]) ::slotted(zeta-avatar:nth-child(n + 4)),
  :host([max="2"]) ::slotted(zeta-avatar:nth-child(n + 3)) {
    display: none;
  }

  /* Stacking only changes paint order: start puts the first on top, end the last (and the counter). */
  ::slotted(zeta-avatar:nth-child(1)) {
    z-index: 4;
  }
  ::slotted(zeta-avatar:nth-child(2)) {
    z-index: 3;
  }
  ::slotted(zeta-avatar:nth-child(3)) {
    z-index: 2;
  }
  ::slotted(zeta-avatar:nth-child(4)) {
    z-index: 1;
  }
  .overflow {
    z-index: 0;
  }

  :host([stacking="end"]) ::slotted(zeta-avatar:nth-child(1)) {
    z-index: 1;
  }
  :host([stacking="end"]) ::slotted(zeta-avatar:nth-child(2)) {
    z-index: 2;
  }
  :host([stacking="end"]) ::slotted(zeta-avatar:nth-child(3)) {
    z-index: 3;
  }
  :host([stacking="end"]) ::slotted(zeta-avatar:nth-child(4)) {
    z-index: 4;
  }
  :host([stacking="end"]) .overflow {
    z-index: 5;
  }

  /* The counter is drawn by the rail, not an Avatar: a neutral circle with a border/default ring inside. */
  .overflow {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--_d);
    height: var(--_d);
    border-radius: var(--radius-pill);
    background: var(--feedback-neutral-background-subtle);
    border: var(--_stroke) solid var(--zebra-border-default);
    color: var(--foreground-primary);
    font-family: var(--label-large-font-family);
    font-weight: var(--label-large-font-weight);
    font-size: var(--initials-size);
    line-height: calc(var(--_d) / 2);
    letter-spacing: var(--label-large-letter-spacing);
  }
`;
