import { css } from "lit";

/**
 * Lays out the message: lead column (avatar or time), main column (header,
 * reply, content, reactions, footer), and the controls. Kept in step with
 * packages/react-baseui `chat-message.css`.
 *
 * Spec: specs/chat-message/chat-message.spec.json
 */
export default css`
  :host { display: block; }
  :host([hidden]) { display: none; }
  /* Message actions are neutral glyphs; send-like primaries stay the only coloured controls. */
  zds-icon-button[flavour="text"]:not([disabled]) { --zds-button-fg: var(--interactive-neutral-foreground-default); }
  /* Message text is slotted here and forwarded into the bubble. Paragraphs in the message sit one body/small line apart, a blank line; line breaks inside a paragraph stay tight. */
  ::slotted(p) { margin: 0; }
  ::slotted(p:not(:first-of-type)) { margin-block-start: var(--body-small-line-height); }
  .root {
    position: relative; box-sizing: border-box; display: flex; gap: var(--space-sm); padding: var(--space-sm);
    border-radius: var(--radius-none); color: var(--foreground-primary); -webkit-tap-highlight-color: transparent;
  }
  :host([rounded]) .root { border-radius: var(--radius-md); }
  .root[data-header] { padding-block-start: var(--space-card); }
  :host([chat-style="conversation"][role-name="sender"]) .root { justify-content: flex-end; }

  /* ---- active: desktop hover or focus, pinned, or a panel open ---------- */
  :host([platform="desktop"]:not([state="loading"])) .root:is(:hover, :focus-within),
  :host([platform="desktop"][state="active"]) .root { background: var(--interactive-ghost-background-hover); }

  /* ---- lead column ------------------------------------------------------ */
  zds-avatar { flex: none; }
  /* One body/small line tall with the time centred, so it sits on the message's first line (Figma: an 18 slot
     holding the 16 time). In a conversation it drops by the bubble's space/sm padding. */
  .time-column {
    flex: none; box-sizing: content-box; display: flex; align-items: center; justify-content: center;
    inline-size: var(--control-sm); block-size: var(--body-small-line-height);
  }
  :host([chat-style="conversation"]) .time-column { padding-block-start: var(--space-sm); }
  :host([hide-time]) .time-column zds-chat-timestamp { visibility: hidden; }
  .root:is(:hover, :focus-within) .time-column zds-chat-timestamp, :host([state="active"]) .time-column zds-chat-timestamp { visibility: visible; }
  :host([chat-style="conversation"][role-name="sender"]) .time-column { order: -1; }

  /* ---- main column ------------------------------------------------------ */
  .main { flex: 1 1 auto; min-inline-size: 0; display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-sm); }
  :host([chat-style="conversation"][role-name="sender"]) .main { align-items: flex-end; }
  .header { display: flex; align-items: baseline; gap: var(--space-xs); }
  .name { font: var(--text-label-medium); letter-spacing: var(--label-medium-letter-spacing); color: var(--foreground-primary); }
  .reply { display: flex; align-items: center; gap: var(--space-2xs); max-inline-size: 100%; min-inline-size: 0; --zds-icon-size: var(--control-icon-xs); }
  .reply-to { flex: none; font: var(--text-label-small); letter-spacing: var(--label-small-letter-spacing); color: var(--foreground-primary); }
  .reply-text { min-inline-size: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font: var(--text-body-xsmall); letter-spacing: var(--body-xsmall-letter-spacing); color: var(--foreground-secondary); }
  .content { display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-sm); align-self: stretch; }
  :host([chat-style="conversation"][role-name="sender"]) .content { align-items: flex-end; }
  .attachments { display: flex; flex-direction: column; gap: var(--space-sm); align-self: stretch; align-items: inherit; }
  .attachments[hidden], .reactions[hidden], .footer[hidden] { display: none; }
  .reactions { display: flex; flex-wrap: wrap; gap: var(--space-2xs); }
  .footer { display: inline-flex; align-items: center; gap: var(--space-2xs); font: var(--text-body-xsmall); letter-spacing: var(--body-xsmall-letter-spacing); color: var(--foreground-secondary); }

  /* ---- desktop controls: over the top edge, overlapping by space/lg ------ */
  .float {
    position: absolute; inset-block-start: var(--space-lg); inset-inline-end: var(--space-sm); z-index: 1;
    display: none; flex-direction: column; align-items: flex-end; gap: var(--space-2xs); translate: 0 -100%;
  }
  .root:is(:hover, :focus-within) > .float, :host([state="active"]) .float { display: flex; }
  .assistant-controls { margin-inline-start: calc(-1 * var(--space-2xs)); }
  .assistant-controls[data-hidden] { visibility: hidden; }
  :host([platform="desktop"]) .root:is(:hover, :focus-within) .assistant-controls[data-hidden] { visibility: visible; }

  /* ---- the thread's own container: outside the surface, indented to the text --
     The message's space/sm padding, the lead column (control/sm) and its gap. */
  .thread { padding-inline: calc(2 * var(--space-sm) + var(--control-sm)) var(--space-sm); }
  .thread[hidden] { display: none; }
  :host([chat-style="conversation"][role-name="sender"]) .thread { padding-inline: var(--space-sm); }

  /* ---- reactions row ---------------------------------------------------- */
  .reactions-row {
    display: flex; align-items: center; gap: var(--space-3xs); padding: var(--space-3xs); border-radius: var(--radius-none);
    background: var(--surface-overlay); box-shadow: var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }
  :host([rounded]) .reactions-row { border-radius: var(--radius-md); }
  .reaction {
    display: inline-grid; place-items: center; inline-size: var(--control-sm); block-size: var(--control-sm); padding: 0; border: 0;
    border-radius: var(--radius-pill); background: var(--interactive-ghost-background-default); font-size: var(--body-large-font-size); cursor: pointer;
  }
  .reaction:hover { background: var(--interactive-ghost-background-hover); }
  .reaction:active { background: var(--interactive-ghost-background-pressed); }
  .reaction:focus-visible { outline: var(--stroke-thick) solid var(--border-focus); }
  .reactions-row zds-icon-button::part(button) { color: var(--interactive-neutral-foreground-default); }

  /* ---- mobile long press: lifted over the scrim ------------------------- */
  :host([platform="mobile"]) .root { user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }
  .scrim { position: fixed; inset: 0; z-index: 1000; }
  .root[data-held] { z-index: 1001; background: var(--surface-card); translate: 0 var(--zds-chat-lift, 0); }
  .held-reactions { position: absolute; inset-block-end: calc(100% + var(--space-sm)); inset-inline-start: var(--space-sm); }
  .held-menu { position: absolute; inset-block-start: calc(100% + var(--space-sm)); inset-inline-start: var(--space-sm); z-index: 1002; }
  :host([chat-style="conversation"][role-name="sender"]) :is(.held-reactions, .held-menu) { inset-inline-start: auto; inset-inline-end: var(--space-sm); }
`;
