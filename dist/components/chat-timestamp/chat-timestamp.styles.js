import { css } from "lit";
/** body/xsmall on foreground/secondary. Spec: specs/chat-message/chat-message.spec.json */
export default css `
  :host { display: inline; font: var(--text-body-xsmall); letter-spacing: var(--body-xsmall-letter-spacing); color: var(--foreground-secondary); white-space: nowrap; }
  :host([hidden]) { display: none; }
`;
