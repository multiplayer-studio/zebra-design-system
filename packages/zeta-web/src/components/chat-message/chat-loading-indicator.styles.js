import { css } from "lit";

/* Chat Loading Indicator — part of Chat Message. */
export default css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
  }
  .dots {
    display: inline-flex;
    gap: var(--space-3xs);
  }
  .dots > span {
    inline-size: var(--space-2xs);
    block-size: var(--space-2xs);
    border-radius: var(--zebra-radius-none);
    background: var(--foreground-tertiary);
  }
  :host([rounded]) .dots > span {
    border-radius: var(--radius-pill);
  }
  /* Figma's 1/0.6/0.3 dot opacities are motion, not tokens. */
  .dots > span:nth-child(2) {
    opacity: 0.6;
  }
  .dots > span:nth-child(3) {
    opacity: 0.3;
  }
  .label {
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-tertiary);
  }
  @media (prefers-reduced-motion: no-preference) {
    .dots > span {
      animation: ripple 1.2s ease-in-out infinite;
    }
    .dots > span:nth-child(2) {
      animation-delay: 0.2s;
    }
    .dots > span:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  @keyframes ripple {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
`;
