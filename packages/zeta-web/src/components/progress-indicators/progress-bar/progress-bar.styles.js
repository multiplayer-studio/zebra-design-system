import { css } from "lit";

/* Spec: specs/progress-bar. The label row (label/medium on foreground/secondary) sits space/lg above the bar. The track
   is surface/track, the indicator foreground/link. Thickness is 8px small and 16px medium, raw in Figma (spec warn
   "Thickness has no token"); rounded ends are radius/sm small and radius/md medium. The buffer band's surface/subtle is
   not in tokens/ (spec blocker), so it falls back to the 10% ghost pressed scrim, the alpha Figma's variable carries. */
export default css`
  :host {
    display: flex;
    --_thickness: 16px;
    --_radius: var(--zebra-radius-none);
    --progress-bar-color: var(--foreground-link);
    --progress-bar-buffer-color: var(--interactive-ghost-background-pressed);
  }

  :host([size="small"]),
  :host([size="thin"]) {
    --_thickness: 8px;
  }

  :host([rounded]) {
    --_radius: var(--radius-md);
  }

  :host([rounded][size="small"]),
  :host([rounded][size="thin"]) {
    --_radius: var(--radius-sm);
  }

  .progress-bar {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
  }

  .label-row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .label-row[hidden],
  .trailing[hidden] {
    display: none;
  }

  .label {
    flex: 1;
    min-width: 0;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-secondary);
  }

  .trailing {
    display: flex;
    align-items: center;
    gap: var(--space-xxs);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-secondary);
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  .track {
    position: relative;
    height: var(--_thickness);
    border-radius: var(--_radius);
    background-color: var(--surface-track);
    overflow: hidden;
  }

  :host(:not([show-track])) .track {
    background-color: transparent;
  }

  .buffer,
  .bar {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    border-radius: var(--_radius);
  }

  .buffer {
    background-color: var(--progress-bar-buffer-color);
  }

  .bar {
    background-color: var(--progress-bar-color);
  }

  :host(:not([indeterminate])) .bar {
    transition: width 0.5s;
  }

  :host([indeterminate]) .bar {
    width: 35%;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    0% {
      inset-inline-start: -35%;
    }
    100% {
      inset-inline-start: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :host(:not([indeterminate])) .bar {
      transition: none;
    }

    :host([indeterminate]) .bar {
      animation: none;
      inset-inline-start: 32.5%;
    }
  }
`;
