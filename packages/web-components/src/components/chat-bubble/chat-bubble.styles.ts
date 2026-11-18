import { css } from "lit";

/**
 * A fill bubble hugs its text and wraps at 80% of the chat; the sender's on
 * interactive/primary, the receiver's on surface/brand; in a run the inner
 * corners tighten to radius/xs. Kept in step with packages/react-baseui
 * `chat-message.css`.
 *
 * Spec: specs/chat-message/chat-message.spec.json
 */
export default css`
  :host {
    box-sizing: border-box;
    display: block;
    max-inline-size: 100%;
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-primary);
    overflow-wrap: anywhere;
  }
  :host([hidden]) { display: none; }
  :host([bubble-style="fill"]) { max-inline-size: 80%; padding: var(--space-sm) var(--space-md); border-radius: var(--radius-none); }
  :host([bubble-style="fill"][role-name="sender"]) { background: var(--interactive-primary-background-default); color: var(--foreground-on-strong); }
  :host([bubble-style="fill"][role-name="receiver"]) { background: var(--surface-brand); }
  :host([bubble-style="fill"][rounded]) { border-radius: var(--radius-lg); }
  :host([rounded][role-name="sender"][status="first"]) { border-end-end-radius: var(--radius-xs); }
  :host([rounded][role-name="sender"][status="middle"]) { border-start-end-radius: var(--radius-xs); border-end-end-radius: var(--radius-xs); }
  :host([rounded][role-name="sender"][status="last"]) { border-start-end-radius: var(--radius-xs); }
  :host([rounded][role-name="receiver"][status="first"]) { border-end-start-radius: var(--radius-xs); }
  :host([rounded][role-name="receiver"][status="middle"]) { border-start-start-radius: var(--radius-xs); border-end-start-radius: var(--radius-xs); }
  :host([rounded][role-name="receiver"][status="last"]) { border-start-start-radius: var(--radius-xs); }
`;
