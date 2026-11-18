import { css } from "lit";

/* Chat Message — lays out the lead column, the main column and the controls. radius/none goes through its --zebra-
   alias. */
export default css`
  /* Message actions are neutral glyphs. */
  zeta-icon-button[flavor="text"] {
    --icon-button-icon-color: var(--interactive-neutral-foreground-default);
  }
  .reply {
    --icon-size: var(--control-icon-xs);
  }
  .footer {
    --icon-size: var(--control-icon-sm);
  }

  :host {
    display: block;
  }
  :host([hidden]) {
    display: none;
  }
  /* Message actions are neutral glyphs; send-like primaries stay the only coloured controls. */
  .root {
    position: relative;
    box-sizing: border-box;
    display: flex;
    gap: var(--space-sm);
    padding: var(--space-sm);
    border-radius: var(--zebra-radius-none);
    color: var(--foreground-primary);
    -webkit-tap-highlight-color: transparent;
  }
  :host([rounded]) .root {
    border-radius: var(--radius-md);
  }
  .root[data-header] {
    padding-block-start: var(--space-card);
  }
  :host([chatstyle="conversation"][rolename="sender"]) .root {
    justify-content: flex-end;
  }

  /* ---- active: desktop hover or focus, pinned, or a panel open ---------- */
  :host([platform="desktop"]:not([state="loading"])) .root:is(:hover, :focus-within),
  :host([platform="desktop"][state="active"]) .root {
    background: var(--interactive-ghost-background-hover);
  }

  /* ---- lead column ------------------------------------------------------ */
  zeta-avatar {
    flex: none;
  }
  /* An icon avatar draws from the Zebra font (Zeta's has no companion glyph), loaded by zeta-avatar's styles. */
  .avatar-glyph {
    font-family: "ZdsIcons-Rounded";
    font-size: var(--icon-size, var(--control-icon-sm));
    line-height: 1;
  }
  :host(:not([rounded])) .avatar-glyph {
    font-family: "ZdsIcons-Sharp";
  }
  /* One body/small line tall with the time centred, so it sits on the message's first line (Figma: an 18 slot
     holding the 16 time). In a conversation it drops by the bubble's space/sm padding. */
  .time-column {
    flex: none;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: var(--control-sm);
    block-size: var(--body-small-line-height);
  }
  :host([chatstyle="conversation"]) .time-column {
    padding-block-start: var(--space-sm);
  }
  :host([hidetime]) .time-column zeta-chat-timestamp {
    visibility: hidden;
  }
  .root:is(:hover, :focus-within) .time-column zeta-chat-timestamp,
  :host([state="active"]) .time-column zeta-chat-timestamp {
    visibility: visible;
  }
  :host([chatstyle="conversation"][rolename="sender"]) .time-column {
    order: -1;
  }

  /* ---- main column ------------------------------------------------------ */
  .main {
    flex: 1 1 auto;
    min-inline-size: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
  :host([chatstyle="conversation"][rolename="sender"]) .main {
    align-items: flex-end;
  }
  .header {
    display: flex;
    align-items: baseline;
    gap: var(--space-xs);
  }
  .name {
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
  }
  .reply {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    max-inline-size: 100%;
    min-inline-size: 0;
    --zds-icon-size: var(--control-icon-xs);
  }
  .reply-to {
    flex: none;
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-primary);
  }
  .reply-text {
    min-inline-size: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
    align-self: stretch;
  }
  :host([chatstyle="conversation"][rolename="sender"]) .content {
    align-items: flex-end;
  }
  .attachments {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    align-self: stretch;
    align-items: inherit;
  }
  .attachments[hidden],
  .reactions[hidden],
  .footer[hidden] {
    display: none;
  }
  .reactions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs);
  }
  .footer {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
  }

  /* ---- desktop controls: over the top edge, overlapping by space/lg ------ */
  .float {
    position: absolute;
    inset-block-start: var(--space-lg);
    inset-inline-end: var(--space-sm);
    z-index: 1;
    display: none;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-2xs);
    translate: 0 -100%;
  }
  .root:is(:hover, :focus-within) > .float,
  :host([state="active"]) .float {
    display: flex;
  }
  .assistant-controls {
    margin-inline-start: calc(-1 * var(--space-2xs));
  }
  .assistant-controls[data-hidden] {
    visibility: hidden;
  }
  :host([platform="desktop"]) .root:is(:hover, :focus-within) .assistant-controls[data-hidden] {
    visibility: visible;
  }

  /* ---- reactions row ---------------------------------------------------- */
  .reactions-row {
    display: flex;
    align-items: center;
    gap: var(--space-3xs);
    padding: var(--space-3xs);
    border-radius: var(--zebra-radius-none);
    background: var(--surface-overlay);
    box-shadow: var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }
  :host([rounded]) .reactions-row {
    border-radius: var(--radius-md);
  }
  .reaction {
    display: inline-grid;
    place-items: center;
    inline-size: var(--control-sm);
    block-size: var(--control-sm);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--interactive-ghost-background-default);
    font-size: var(--body-large-font-size);
    cursor: pointer;
  }
  .reaction:hover {
    background: var(--interactive-ghost-background-hover);
  }
  .reaction:active {
    background: var(--interactive-ghost-background-pressed);
  }
  .reaction:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }
  .reactions-row zeta-icon-button::part(button) {
    color: var(--interactive-neutral-foreground-default);
  }

  /* ---- mobile long press: lifted over the scrim ------------------------- */
  :host([platform="mobile"]) .root {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  .scrim {
    position: fixed;
    inset: 0;
    z-index: 1000;
  }
  .root[data-held] {
    z-index: 1001;
    background: var(--surface-card);
    translate: 0 var(--zds-chat-lift, 0);
  }
  .held-reactions {
    position: absolute;
    inset-block-end: calc(100% + var(--space-sm));
    inset-inline-start: var(--space-sm);
  }
  .held-menu {
    position: absolute;
    inset-block-start: calc(100% + var(--space-sm));
    inset-inline-start: var(--space-sm);
    z-index: 1002;
  }
  .menu {
    position: absolute;
    inset-block-start: calc(100% + var(--space-sm));
    inset-inline-end: 0;
    z-index: 2;
  }
  :host([chatstyle="conversation"][rolename="sender"]) :is(.held-reactions, .held-menu) {
    inset-inline-start: auto;
    inset-inline-end: var(--space-sm);
  }

  /* The action menu panel: the Dropdown Menu's surface and elevation around zeta-dropdown-menu-item rows. */
  .panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    min-inline-size: calc(4 * var(--control-lg));
    padding: var(--space-xs);
    background: var(--surface-overlay);
    border-radius: var(--zebra-radius-none);
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }
  :host([rounded]) .panel {
    border-radius: var(--radius-md);
  }
  .panel[hidden] {
    display: none;
  }

  /* The thread's own container: outside the surface, indented to the text (the message's space/sm padding, the lead
     column at control/sm and its gap). */
  .thread {
    padding-inline: calc(2 * var(--space-sm) + var(--control-sm)) var(--space-sm);
  }
  .thread[hidden] {
    display: none;
  }
  :host([chatstyle="conversation"][rolename="sender"]) .thread {
    padding-inline: var(--space-sm);
  }
`;
