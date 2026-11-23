import { css } from "lit";
import buttonStyles from "../button/button.styles.js";
/**
 * Colour, border, shape, focus and disabled come from Button's own styles:
 * the spec gives Icon Button the same nine flavours, three shapes and four
 * states, so sharing the rules is what keeps the two from drifting. Only the
 * geometry is Icon Button's own, and it maps onto the spec's size table: a
 * square bound to control/sm, -md or -lg on both axes, with space/xs on all
 * four sides.
 *
 * Spec: specs/icon-button/icon-button.spec.json
 */
export default [
    buttonStyles,
    css `
    /* ---- size: a fixed square, never hugging its content ------------- */
    button {
      width: var(--control-sm);
      padding: var(--space-2xs);
    }
    :host([size="medium"]) button {
      width: var(--control-md);
      padding: var(--space-2xs);
    }
    :host([size="large"]) button {
      width: var(--control-lg);
      padding: var(--space-2xs);
    }
  `,
];
