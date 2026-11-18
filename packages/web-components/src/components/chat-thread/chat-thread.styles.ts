import { css } from "lit";

/** Count, divider and caret on one line; the replies under it. Spec: specs/chat-message/chat-message.spec.json */
export default css`
  :host { display: flex; flex-direction: column; align-self: stretch; }
  :host([hidden]) { display: none; }
  button {
    display: flex; align-items: center; gap: var(--space-xs);
    min-block-size: calc(var(--control-icon-md) + 2 * var(--space-2xs)); padding: var(--space-2xs) 0; border: 0; background: none; cursor: pointer; text-align: start;
    /* Thread's count binds no colour in Figma (spec gap); foreground/secondary as its meta text. */
    color: var(--foreground-secondary); font: var(--text-body-xsmall); letter-spacing: var(--body-xsmall-letter-spacing);
  }
  button:focus-visible { outline: var(--stroke-thick) solid var(--border-focus); outline-offset: var(--space-3xs); }
  .count { flex: none; }
  /* Divider stretches by default; here it centres with the count and caret (spec). */
  zds-divider { flex: 1 1 auto; align-self: center; }
  .replies { display: flex; flex-direction: column; padding-block-end: var(--space-sm); }
  .replies[hidden] { display: none; }
`;
