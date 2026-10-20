import { css } from "lit";

/**
 * No token governs height; the spec's own 259px is an unbound, authored
 * canvas value (spec issue), not a constraint, so this element leaves height
 * to the consumer.
 *
 * Spec: specs/card/card.spec.json
 */
export default css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;
