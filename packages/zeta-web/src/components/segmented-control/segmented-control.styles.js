import { css } from "lit";

/* Spec: specs/segmented-control. The track is interactive/neutral/background/pressed, space/2xs padding and gap,
   radius/sm when rounded, radius/pill when full. The active fill is one control-level indicator on
   interactive/neutral/background/focused that slides on animations/spring (owner decision; the metadata's 0.15s
   ease-in has no token). Inverse: the track is interactive/neutral/background/default with a border/default border
   (stroke/thin; Figma's weight is a raw 1) and the indicator is interactive/inverse/background/focused. */
export default css`
  :host {
    position: relative;
    display: flex;
    width: fit-content;
    user-select: none;
  }

  .track {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    width: fit-content;
    padding: var(--space-2xs);
    border-radius: var(--zebra-radius-none);
    background-color: var(--interactive-neutral-background-pressed);
    isolation: isolate;
  }

  :host([rounded]) .track,
  :host([rounded]) .indicator {
    border-radius: var(--radius-sm);
  }

  :host([shape="full"]) .track,
  :host([shape="full"]) .indicator {
    border-radius: var(--radius-pill);
  }

  :host([inverse]) .track {
    border: var(--stroke-thin) solid var(--zebra-border-default);
    background-color: var(--interactive-neutral-background-default);
  }

  .indicator {
    position: absolute;
    top: var(--space-2xs);
    left: 0;
    z-index: -1;
    border-radius: var(--zebra-radius-none);
    background-color: var(--interactive-neutral-background-focused);
  }

  :host([inverse]) .indicator {
    background-color: var(--interactive-inverse-background-focused);
  }

  .indicator[data-ready] {
    transition:
      transform var(--animations-spring),
      width var(--animations-spring);
  }

  ::slotted(:not(zeta-segmented-item)) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    :host([inverse]) .indicator {
      background-color: var(--interactive-inverse-background-focused);
    }

    .indicator[data-ready] {
      transition: none;
    }
  }
`;
