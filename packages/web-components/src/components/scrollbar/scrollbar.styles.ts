import { css } from "lit";

/* Spec: specs/scrollbar/scrollbar.spec.md
   The gutter (12px) is a raw value in Figma with no token (spec issue:
   thickness has no token). The handle needs none of its own: the space/2xs
   padding leaves the 4px content box, and the handle fills its cross axis.
   Hover is a CSS state on the host, never a property. */
export default css`
  :host {
    --zds-scrollbar-track: var(--interactive-ghost-background-default);
    --zds-scrollbar-handle: var(--foreground-disabled);
    position: relative;
    display: block;
    flex: none;
    box-sizing: border-box;
    padding: var(--space-2xs);
  }

  /* The tokens' own alpha is the scrim — no extra paint opacity (the Figma
     paints double it; spec issue). The track covers the whole bar. */
  :host(:hover) {
    --zds-scrollbar-track: var(--interactive-ghost-background-hover);
    --zds-scrollbar-handle: var(--foreground-secondary);
  }

  .track {
    position: absolute;
    inset: 0;
    background: var(--zds-scrollbar-track);
  }

  .rail {
    /* A span is inline by default, which would ignore the sizing and
       collapse the handle's percentage maths with it. */
    display: block;
    position: relative;
    inline-size: 100%;
    block-size: 100%;
  }

  /* The resting handle binds foreground/disabled, faithfully to Figma — a
     text-role token on a part that is not disabled (spec issue). */
  .handle {
    position: absolute;
    background: var(--zds-scrollbar-handle);
    border-radius: var(--radius-pill);
  }

  /* 200px is the drawn sample length. Size the bar to the scrolling region's
     edge (typically 100%) via --zds-scrollbar-length or width/height. */
  :host([orientation="vertical"]) {
    inline-size: 12px;
    block-size: var(--zds-scrollbar-length, 200px);
  }
  :host([orientation="vertical"]) .handle {
    inline-size: 100%;
    block-size: calc(var(--zds-scrollbar-size) * 100%);
    inset-block-start: calc(var(--zds-scrollbar-value) * (100% - var(--zds-scrollbar-size) * 100%));
  }

  :host([orientation="horizontal"]) {
    inline-size: var(--zds-scrollbar-length, 200px);
    block-size: 12px;
  }
  :host([orientation="horizontal"]) .handle {
    block-size: 100%;
    inline-size: calc(var(--zds-scrollbar-size) * 100%);
    inset-inline-start: calc(var(--zds-scrollbar-value) * (100% - var(--zds-scrollbar-size) * 100%));
  }
`;
