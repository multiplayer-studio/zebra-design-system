import { css } from "lit";

/* Chat Controls — part of Chat Message. */
export default css`
  zeta-icon-button[flavor="text"],
  ::slotted(zeta-icon-button[flavor="text"]) {
    --icon-button-icon-color: var(--interactive-neutral-foreground-default);
  }

  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3xs);
    padding: var(--space-3xs);
    border-radius: var(--zebra-radius-none);
  }
  :host([rounded]) {
    border-radius: var(--radius-md);
  }
  :host([controlsstyle="fill"]) {
    background: var(--surface-overlay);
    box-shadow: var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }
  zeta-icon-button[data-pressed]::part(button) {
    background: var(--interactive-ghost-background-pressed);
  }
`;
