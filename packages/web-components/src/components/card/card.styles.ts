import { css } from "lit";

/**
 * Every value here is a semantic token. No fixed width: the spec's own 330px
 * is a Figma canvas artifact ("whoever places it decides the width"), not a
 * constraint, so this shell sizes to its container. Zero padding and gap on
 * the shell itself — every inset comes from whatever fills the slots.
 *
 * Spec: specs/card/card.spec.json
 */
export default css`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: var(--surface-card);
    border: var(--stroke-thin) solid var(--border-default);
    border-radius: var(--radius-none);
    overflow: hidden;
  }

  :host([hidden]) {
    display: none;
  }

  :host([shape="rounded"]) {
    border-radius: var(--radius-sm);
  }

  .header,
  .body,
  .footer {
    background: var(--surface-card);
  }
`;
