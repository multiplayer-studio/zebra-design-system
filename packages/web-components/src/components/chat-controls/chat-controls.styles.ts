import { css } from "lit";

/** The bar: space/3xs padding and gap; fill on surface/overlay with the small shadow. Spec: specs/chat-message/chat-message.spec.json */
export default css`
  :host { display: inline-flex; align-items: center; gap: var(--space-3xs); padding: var(--space-3xs); border-radius: var(--radius-none); }
  :host([hidden]) { display: none; }
  :host([rounded]) { border-radius: var(--radius-md); }
  :host([controls-style="fill"]) {
    background: var(--surface-overlay);
    box-shadow: var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }
  /* Neutral glyphs; an open toggle keeps the pressed ghost surface. */
  zds-icon-button[flavour="text"]:not([disabled]), ::slotted(zds-icon-button[flavour="text"]) { --zds-button-fg: var(--interactive-neutral-foreground-default); }
  zds-icon-button[data-pressed]::part(button) { background: var(--interactive-ghost-background-pressed); }
`;
