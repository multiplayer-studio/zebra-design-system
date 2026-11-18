import { css } from "lit";

/**
 * Three dots at space/2xs on foreground/tertiary and a label/small label.
 * Figma's 1/0.6/0.3 dot opacities are motion, not tokens.
 *
 * Spec: specs/chat-message/chat-message.spec.json
 */
export default css`
  :host { display: inline-flex; align-items: center; gap: var(--space-xs); }
  :host([hidden]) { display: none; }
  .dots { display: inline-flex; gap: var(--space-3xs); }
  .dots > span { inline-size: var(--space-2xs); block-size: var(--space-2xs); border-radius: var(--radius-none); background: var(--foreground-tertiary); }
  :host([rounded]) .dots > span { border-radius: var(--radius-pill); }
  .dots > span:nth-child(2) { opacity: 0.6; }
  .dots > span:nth-child(3) { opacity: 0.3; }
  .label { font: var(--text-label-small); letter-spacing: var(--label-small-letter-spacing); color: var(--foreground-tertiary); }
  @media (prefers-reduced-motion: no-preference) {
    .dots > span { animation: ripple 1.2s ease-in-out infinite; }
    .dots > span:nth-child(2) { animation-delay: 0.2s; }
    .dots > span:nth-child(3) { animation-delay: 0.4s; }
    .label {
      background: linear-gradient(90deg, var(--foreground-tertiary) 40%, var(--foreground-primary) 50%, var(--foreground-tertiary) 60%) 0 0 / 300% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: sweep 2s linear infinite;
    }
  }
  @keyframes ripple { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
  @keyframes sweep { from { background-position: 100% 0; } to { background-position: 0 0; } }
`;
