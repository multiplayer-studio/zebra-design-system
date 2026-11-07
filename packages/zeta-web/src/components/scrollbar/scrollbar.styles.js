import { css } from "lit";

/* Spec: specs/scrollbar. The gutter (12px) is a raw value in Figma with no token (spec issue). The handle needs no
   thickness of its own: the space/2xs padding leaves the 4px content box, and the handle fills its cross axis. Hover
   is a CSS state on the host, never a property. The track tokens carry their own alpha — no extra paint opacity (the
   Figma paints double it; spec issue). The resting handle binds foreground/disabled, faithfully to Figma — a
   text-role token on a part that is not disabled (spec issue). */
export default css`
  :host {
    --_track: var(--interactive-ghost-background-default);
    --_handle: var(--foreground-disabled);
    position: relative;
    display: block;
    flex: none;
    box-sizing: border-box;
    padding: var(--space-2xs);
  }

  :host(:hover) {
    --_track: var(--interactive-ghost-background-hover);
    --_handle: var(--foreground-secondary);
  }

  .track {
    position: absolute;
    inset: 0;
    background: var(--_track);
  }

  .rail {
    /* A span is inline by default, which would ignore the sizing and collapse the handle's percentage maths. */
    display: block;
    position: relative;
    inline-size: 100%;
    block-size: 100%;
  }

  .handle {
    position: absolute;
    background: var(--_handle);
    border-radius: var(--radius-pill);
  }

  /* 200px is the drawn sample length. Size the bar to the scrolling region's edge (typically 100%) via
     --scrollbar-length or width/height. */
  :host([orientation="vertical"]) {
    inline-size: 12px;
    block-size: var(--scrollbar-length, 200px);
  }
  :host([orientation="vertical"]) .handle {
    inline-size: 100%;
    block-size: calc(var(--_size) * 100%);
    inset-block-start: calc(var(--_value) * (100% - var(--_size) * 100%));
  }

  :host([orientation="horizontal"]) {
    inline-size: var(--scrollbar-length, 200px);
    block-size: 12px;
  }
  :host([orientation="horizontal"]) .handle {
    block-size: 100%;
    inline-size: calc(var(--_size) * 100%);
    inset-inline-start: calc(var(--_value) * (100% - var(--_size) * 100%));
  }
`;
