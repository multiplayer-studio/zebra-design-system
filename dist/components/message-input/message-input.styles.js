import { css } from "lit";
/**
 * Every value is a semantic token. Buttons are zds-icon-button and chips
 * zds-assist-chip, each themed by its own styles; this file lays out the
 * composer and draws the parts that are its own: the voice bar, the
 * waveform, the recording dot and the orb. Keyed off the reflected `state`
 * on the host, which carries the spec's State values. Kept in step with
 * packages/react-baseui `message-input.css`.
 *
 * Spec: specs/message-input/message-input.spec.json
 */
export default css `
  :host {
    display: block;
    --zds-message-input-duration: 250ms;
    --zds-message-input-ease-spring: cubic-bezier(0.34, 1.36, 0.64, 1);
    --zds-message-input-stagger: 30ms;
  }
  :host([hidden]) { display: none; }

  /* ---- root: surface, padding and gap (spec Layout) ------------------- */
  .root {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-md);
    background: var(--surface-card);
    border: var(--stroke-thin) solid var(--border-default);
    border-radius: var(--radius-container);
    color: var(--foreground-primary);
  }
  .root:focus-within { border-color: var(--border-focus); }
  :host([state="disabled"]) .root {
    background: var(--interactive-neutral-background-disabled);
    border-color: var(--border-disabled);
  }
  .root[data-dragging] {
    border-style: dashed;
    border-color: var(--border-focus);
    background: var(--interactive-ghost-background-selected);
  }

  /* ---- body: text ------------------------------------------------------ */
  textarea {
    box-sizing: border-box;
    inline-size: 100%;
    /* Spec: the Text region is at least 56 tall, two body/medium lines plus
       its space/2xs padding (the 56 itself has no token, spec issue). */
    min-block-size: calc(2 * var(--body-medium-line-height) + 2 * var(--space-2xs));
    max-block-size: calc(8 * var(--body-medium-line-height));
    field-sizing: content;
    margin: 0;
    padding: var(--space-2xs) var(--space-md);
    border: 0;
    outline: none;
    resize: none;
    background: transparent;
    color: var(--foreground-primary);
    caret-color: var(--foreground-cursor);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }
  textarea::placeholder { color: var(--foreground-disabled); opacity: 1; }
  textarea:disabled { color: var(--foreground-disabled); cursor: not-allowed; }

  /* ---- Attachment File Slot: chips above the text ---------------------- */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .chips[hidden] { display: none; }
  .chips > li { display: flex; max-inline-size: 100%; }
  ::slotted([slot="attachments"]) { max-inline-size: 100%; }

  /* ---- body: voice ----------------------------------------------------- */
  .voice { display: flex; flex-direction: column; gap: var(--space-sm); }
  .bar {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-block-size: var(--control-lg);
    padding: var(--space-2xs) var(--space-2xs) var(--space-2xs) var(--space-md);
    border-radius: var(--radius-element-md);
    /* Figma binds surface/subtle; the metadata's surface/track is a spec issue. */
    background: var(--surface-subtle);
    color: var(--foreground-primary);
  }
  :host([state="playback"]) .bar { padding-inline-start: var(--space-2xs); }
  .bar-label {
    flex: 1 1 auto;
    min-inline-size: 0;
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }
  .bar-label[data-heard] { white-space: nowrap; overflow: hidden; }
  .time {
    color: var(--foreground-secondary);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    line-height: var(--body-medium-line-height);
    font-variant-numeric: tabular-nums;
  }
  :host([state="playback"]) .time { margin-inline-start: auto; }
  .hint, .error, .count {
    margin: 0;
    font-family: var(--body-xsmall-font-family), system-ui, sans-serif;
    font-size: var(--body-xsmall-font-size);
    font-weight: var(--body-xsmall-font-weight);
    line-height: var(--body-xsmall-line-height);
    letter-spacing: var(--body-xsmall-letter-spacing);
  }
  .hint { color: var(--foreground-secondary); }
  .error { color: var(--foreground-error); }
  .count { align-self: flex-end; color: var(--foreground-secondary); font-variant-numeric: tabular-nums; }
  .count[data-full] { color: var(--foreground-error); }

  /* Waveform: bars in currentColor, height from --zds-bar-level (0–1). */
  .wave {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-3xs);
    block-size: var(--control-icon-md);
  }
  .level {
    display: block;
    inline-size: var(--stroke-thick);
    block-size: calc(var(--zds-bar-level) * 100%);
    min-block-size: var(--stroke-thick);
    border-radius: var(--radius-pill);
    background: currentColor;
    opacity: 0.35;
  }
  .level[data-played] { opacity: 1; }
  .wave.long .level[data-played] { color: var(--interactive-primary-background-default); }
  .rec-dot {
    flex: none;
    inline-size: var(--space-sm);
    block-size: var(--space-sm);
    border-radius: var(--radius-pill);
    background: var(--foreground-error);
  }

  /* ---- body: speaking -------------------------------------------------- */
  .speaking {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    padding-block: var(--space-md) var(--space-2xs);
  }
  .orb {
    --zds-orb-level: 0;
    position: relative;
    display: block;
    inline-size: calc(1.75 * var(--control-lg));
    aspect-ratio: 1;
  }
  .orb::before {
    content: "";
    position: absolute;
    inset: -6%;
    border-radius: 50%;
    background: radial-gradient(closest-side, transparent 62%, var(--surface-gradient-start) 82%, transparent);
    opacity: calc(0.2 + var(--zds-orb-level) * 0.6);
    scale: calc(0.94 + var(--zds-orb-level) * 0.12);
  }
  .stop-start { stop-color: var(--surface-gradient-start); }
  .stop-end { stop-color: var(--surface-gradient-end); }
  .ring {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    overflow: visible;
    scale: calc(1 + var(--zds-orb-level) * (0.12 + var(--ring) * 0.04) / (0.7 + var(--ring) * 0.05));
    opacity: calc(0.45 + var(--zds-orb-level) * 0.55);
  }
  .ring ellipse { fill: none; stroke-width: 1.5; vector-effect: non-scaling-stroke; }
  .caption {
    box-sizing: border-box;
    inline-size: 100%;
    max-block-size: calc(4 * var(--body-medium-line-height));
    margin: 0;
    padding-inline: var(--space-md);
    overflow: hidden;
    text-align: center;
    color: var(--foreground-primary);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }
  .caption .past { color: var(--foreground-secondary); }
  .caption .next { opacity: 0; }

  .sr-only {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* ---- toolbar: Tools left, Actions right ------------------------------ */
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
  }
  .tools, .actions, .more-tools {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
  }
  .tools { flex-wrap: wrap; }
  .more-tools[hidden] { display: none; }
  /* Attachment open: the toggle holds the pressed ghost surface (spec). */
  .tray-toggle[data-open]::part(button) { background: var(--interactive-ghost-background-pressed); }
  .speak[data-pressed]:not([disabled])::part(button) {
    background: var(--interactive-ghost-background-selected);
    color: var(--foreground-info);
  }

  /* ---- Attachment: the tray, growing out of the toggle ----------------- */
  .tray { display: grid; grid-template-columns: 0fr; }
  .tray[data-open] { grid-template-columns: 1fr; }
  .tray-items {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    min-inline-size: 0;
    overflow: clip;
    overflow-clip-margin: var(--space-2xs);
  }
  .tray-items > *, .tray-items ::slotted(*) {
    opacity: 0;
    transform: translateX(calc(-1 * var(--space-sm))) scale(0.8);
  }
  .tray[data-open] .tray-items > *, .tray[data-open] .tray-items ::slotted(*) { opacity: 1; transform: none; }

  /* ---- motion ---------------------------------------------------------- */
  /* As React: Switch's timing and curve, literals because tokens/ has no
     motion collection. Reduced motion opens and closes instantly. */
  @media (prefers-reduced-motion: no-preference) {
    .tray { transition: grid-template-columns var(--zds-message-input-duration) var(--zds-message-input-ease-spring); }
    .tray-items > *, .tray-items ::slotted(*) {
      transition:
        opacity var(--zds-message-input-duration) var(--zds-message-input-ease-spring),
        transform var(--zds-message-input-duration) var(--zds-message-input-ease-spring);
    }
    .tray[data-open] .tray-items > :nth-child(2) { transition-delay: calc(1 * var(--zds-message-input-stagger)); }
    .tray[data-open] .tray-items > :nth-child(3) { transition-delay: calc(2 * var(--zds-message-input-stagger)); }
    .tray[data-open] .tray-items > :nth-child(n + 4) { transition-delay: calc(3 * var(--zds-message-input-stagger)); }
    :host([state="recording"]) .rec-dot { animation: zds-message-input-fade 1.2s ease-in-out infinite; }
    .orb::before, .orb[data-reactive] .ring { transition: scale 90ms linear, opacity 90ms linear; }
    .ring { animation: zds-message-input-turn calc(9s + var(--ring) * 2.3s) linear infinite; }
    .ring:nth-of-type(odd) { animation-direction: reverse; }
    .orb:not([data-reactive]) { --zds-orb-level: 0.1; }
    .orb:not([data-reactive]) .ring {
      animation:
        zds-message-input-turn calc(9s + var(--ring) * 2.3s) linear infinite,
        zds-message-input-breathe calc(2.4s + var(--ring) * 0.35s) ease-in-out infinite;
    }
    .orb:not([data-reactive]) .ring:nth-of-type(odd) { animation-direction: reverse, normal; }
  }
  @media (prefers-reduced-motion: reduce) {
    .orb:not([data-reactive]) { --zds-orb-level: 0.4; }
  }
  @keyframes zds-message-input-turn { from { rotate: 0turn; } to { rotate: 1turn; } }
  @keyframes zds-message-input-breathe { 50% { scale: 1.12; opacity: 0.8; } }
  @keyframes zds-message-input-fade { 50% { opacity: 0; } }
`;
