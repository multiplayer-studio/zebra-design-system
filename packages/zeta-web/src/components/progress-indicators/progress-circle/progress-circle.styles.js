import { css } from "lit";

/* Spec: specs/progress-circle. Track border/subtle and arc border/info, both stroke/heavy. Rounded caps the arc ends;
   off, they are butt, not square (Figma's "none"). The readout is indicator/medium on foreground/primary (spec warn: the
   Figma fill is a raw black). */
export default css`
  :host {
    display: block;
    width: fit-content;
    height: fit-content;
    --progress-circle-color: var(--zebra-border-info);
  }

  .container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    /* The arc starts at twelve o'clock and runs clockwise. */
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
  }

  .track {
    stroke: var(--zebra-border-subtle);
  }

  .arc {
    stroke: var(--progress-circle-color);
    transition: stroke-dasharray 0.3s;
  }

  :host([indeterminate]) svg {
    animation: rotation 1.5s linear infinite;
  }

  @keyframes rotation {
    from {
      transform: rotate(-90deg);
    }
    to {
      transform: rotate(270deg);
    }
  }

  .uploading {
    position: absolute;
    display: grid;
    place-items: center;
  }

  .uploading > * {
    grid-area: 1 / 1;
  }

  .percentage {
    font: var(--text-indicator-medium);
    letter-spacing: var(--indicator-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  /* The cancel button stays focusable; it takes over from the readout on hover or keyboard focus. */
  .cancel {
    opacity: 0;
  }

  .uploading:hover .cancel,
  .uploading:focus-within .cancel {
    opacity: 1;
  }

  .uploading:hover .percentage,
  .uploading:focus-within .percentage {
    visibility: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .arc {
      transition: none;
    }

    :host([indeterminate]) svg {
      animation: none;
    }
  }
`;
