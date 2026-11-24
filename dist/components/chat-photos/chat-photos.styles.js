import { css } from "lit";
/** One grid: tiles space/3xs apart at radius/lg on surface/card with a border/subtle stroke. Spec: specs/chat-message/chat-message.spec.json */
export default css `
  :host { position: relative; display: grid; grid-template-columns: 1fr; gap: var(--space-3xs); inline-size: min(100%, calc(6 * var(--control-lg))); aspect-ratio: 3 / 2; }
  :host([hidden]) { display: none; }
  :host([count="2"]) { grid-template-columns: 1fr 1fr; aspect-ratio: 2 / 1; }
  :host([count="3"]), :host([count="more"]) { grid-template-columns: 2fr 1fr; }
  .stack { display: grid; grid-template-rows: 1fr 1fr; gap: var(--space-3xs); min-block-size: 0; }
  .photo {
    display: grid; place-items: center; min-block-size: 0; overflow: hidden; padding: 0;
    border: var(--stroke-thin) solid var(--border-subtle); border-radius: var(--radius-none);
    background: var(--surface-card); color: var(--foreground-tertiary);
  }
  :host([rounded]) .photo { border-radius: var(--radius-lg); }
  button.photo { cursor: zoom-in; }
  .photo img { inline-size: 100%; block-size: 100%; object-fit: cover; }
  .extra {
    position: absolute; inset-block-end: var(--space-xs); inset-inline-end: var(--space-xs);
    padding: var(--space-3xs) var(--space-xs); border-radius: var(--radius-pill);
    background: var(--surface-inverse); color: var(--foreground-inverse); font: var(--text-body-xsmall);
  }
`;
