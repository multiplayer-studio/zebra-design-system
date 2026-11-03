import { css } from "lit";

/* Spec: specs/slider. Back to front: the base track (surface/track), the active fill, the step dots
   (foreground/inverse), the thumbs. The track and dot sizes have no token (spec warn), so they ride on stroke/heavy and
   stroke/thick, which resolve to the measured 4 and 2. A thumb is control/icon-sm at rest and control/icon-md only
   while it is hovered or dragged. Selected (a thumb pressed or keyboard-focused) recolours the fill and both thumbs to
   interactive/ghost/foreground/default; disabled drops both to interactive/neutral/foreground/disabled. */
export default css`
  :host {
    display: block;
    --_track: var(--stroke-heavy);
    --_dot: var(--stroke-thick);
    --_thumb: var(--control-icon-sm);
    --_thumb-active: var(--control-icon-md);
    --_active: var(--interactive-neutral-foreground-default);
    --_radius: var(--zebra-radius-none);
    --_thumb-radius: var(--zebra-radius-none);
  }

  :host([rounded]) {
    --_radius: var(--radius-xs);
    --_thumb-radius: var(--radius-pill);
  }

  /* Tall enough for the larger thumb; the inline margin keeps an end thumb inside the host. */
  .slider {
    position: relative;
    height: var(--_thumb-active);
    margin: 0 calc(var(--_thumb) / 2);
    touch-action: none;
    cursor: pointer;
  }

  .track,
  .selected-area {
    position: absolute;
    top: calc(50% - var(--_track) / 2);
    height: var(--_track);
    border-radius: var(--_radius);
  }

  /* Near-invisible against the page in both modes (spec warn), built as drawn. */
  .track {
    left: 0;
    right: 0;
    background-color: var(--surface-track);
  }

  /* Rounded with the track, as Figma binds it (spec warn: the metadata says square). */
  .selected-area {
    background-color: var(--_active);
  }

  /* One dot per stop, across the whole track, inset space/2xs at each end. */
  .step-container {
    position: absolute;
    top: calc(50% - var(--_dot) / 2);
    left: var(--space-2xs);
    right: var(--space-2xs);
    height: var(--_dot);
    pointer-events: none;
  }

  .step {
    position: absolute;
    width: var(--_dot);
    height: var(--_dot);
    margin-left: calc(var(--_dot) / -2);
    border-radius: var(--radius-pill);
    background-color: var(--foreground-inverse);
  }

  .handle {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    width: var(--_thumb);
    height: var(--_thumb);
    border-radius: var(--_thumb-radius);
    background-color: var(--_active);
    transform: translate(-50%, -50%);
    outline: none;
  }

  /* Only the thumb under the pointer, or being dragged, grows. */
  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .handle:hover {
      width: var(--_thumb-active);
      height: var(--_thumb-active);
    }
  }

  .handle.dragging {
    width: var(--_thumb-active);
    height: var(--_thumb-active);
    z-index: 1;
  }

  /* Selected: pressing a thumb or keyboard focus. Colour only, on the fill and both thumbs. */
  .slider.dragging,
  .slider:has(.handle:focus-visible) {
    --_active: var(--interactive-ghost-foreground-default);
  }

  /* No focus variant in Figma; the ring is the implementation's, as on the zds- slider. */
  .handle:focus-visible {
    box-shadow: 0 0 0 var(--stroke-thick) var(--border-focus);
  }

  :host([disabled]) .slider {
    cursor: not-allowed;
    --_active: var(--interactive-neutral-foreground-disabled);
  }
`;
