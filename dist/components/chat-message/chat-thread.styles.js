import { css } from "lit";
/* Chat Thread — part of Chat Message. */
export default css `
  :host {
    display: flex;
    flex-direction: column;
    align-self: stretch;
  }
  button {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-block-size: calc(var(--control-icon-md) + 2 * var(--space-2xs));
    padding: var(--space-2xs) 0;
    border: 0;
    background: none;
    cursor: pointer;
    text-align: start;
    /* Thread's count binds no colour in Figma (spec gap); foreground/secondary as its meta text. */
    color: var(--foreground-secondary);
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    --icon-size: var(--control-icon-md);
  }
  button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--space-3xs);
  }
  .count {
    flex: none;
  }
  /* Centres with the count and caret (spec). */
  zeta-divider {
    flex: 1 1 auto;
    align-self: center;
  }
  .replies {
    display: flex;
    flex-direction: column;
    padding-block-end: var(--space-sm);
  }
  .replies[hidden] {
    display: none;
  }
`;
//# sourceMappingURL=chat-thread.styles.js.map