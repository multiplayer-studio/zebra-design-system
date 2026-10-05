import { css } from "lit";
export default css`
  :host {
    display: flex;
    --thin-size: var(--space-sm);
    --medium-size: var(--space-lg);
    --progress-bar-color: var(--foreground-link);
  }

  .progress-bar {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
  }

  .wrapper {
    display: flex;
    gap: var(--space-lg);
    width: 100%;
  }

  label {
    font: var(--label-medium);
    font-size: var(--label-medium-font-size);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-secondary);
  }

  :host([size="thin"]) .wrapper,
  :host([size="small"]) .wrapper {
    height: var(--thin-size);
  }

  :host([size="medium"]) .wrapper {
    height: var(--medium-size);
  }

  .wrapper {
    border-radius: var(--radius-none);
  }

  :host([rounded]) .wrapper {
    border-radius: var(--radius-sm);
  }

  :host([rounded][size="medium"]) .wrapper {
    border-radius: var(--radius-md);
  }

  .track {
    background-color: var(--border-subtle);
    display: flex;
    position: relative;
    border-radius: inherit;
    flex: 1;
  }

  :host([buffering]) .track,
  .buffering-dot {
    background-color: var(--border-subtle);
  }

  .buffering-dot {
    border-radius: var(--radius-pill);
    height: 100%;
    display: flex;
  }

  :host([size="thin"]) .buffering-dot,
  :host([size="small"]) .buffering-dot {
    width: var(--thin-size);
  }

  :host([size="medium"]) .buffering-dot {
    width: var(--medium-size);
  }

  .bar {
    background-color: var(--progress-bar-color);
    height: 100%;
    border-radius: inherit;
  }

  :host(:not([indeterminate])) .bar {
    transition: width 0.5s;
  }

  :host([indeterminate]) .bar {
    width: 30%;
    position: absolute;
    animation: loading 2s linear infinite;
  }

  :host([indeterminate][buffering]) .bar {
    animation-play-state: paused;
  }

  @keyframes loading {
    0% {
      left: 0%;
      right: 100%;
      width: 0%;
    }
    10% {
      left: 0%;
      right: 75%;
      width: 30%;
    }
    90% {
      left: 75%;
      right: 0%;
      width: 30%;
    }
    100% {
      left: 100%;
      right: 0%;
      width: 0%;
    }
  }
`;
