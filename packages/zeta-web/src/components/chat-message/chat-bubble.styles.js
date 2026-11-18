import { css } from "lit";

/* Chat Bubble — part of Chat Message. */
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
  :host([bubblestyle="fill"]) {
    max-inline-size: 80%;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--zebra-radius-none);
  }
  :host([bubblestyle="fill"][rolename="sender"]) {
    background: var(--interactive-primary-background-default);
    color: var(--foreground-on-strong);
  }
  :host([bubblestyle="fill"][rolename="receiver"]) {
    background: var(--surface-brand);
  }
  :host([bubblestyle="fill"][rounded]) {
    border-radius: var(--radius-lg);
  }
  :host([rounded][rolename="sender"][status="first"]) {
    border-end-end-radius: var(--radius-xs);
  }
  :host([rounded][rolename="sender"][status="middle"]) {
    border-start-end-radius: var(--radius-xs);
    border-end-end-radius: var(--radius-xs);
  }
  :host([rounded][rolename="sender"][status="last"]) {
    border-start-end-radius: var(--radius-xs);
  }
  :host([rounded][rolename="receiver"][status="first"]) {
    border-end-start-radius: var(--radius-xs);
  }
  :host([rounded][rolename="receiver"][status="middle"]) {
    border-start-start-radius: var(--radius-xs);
    border-end-start-radius: var(--radius-xs);
  }
  :host([rounded][rolename="receiver"][status="last"]) {
    border-start-start-radius: var(--radius-xs);
  }
`;
