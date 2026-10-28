import { css } from "lit";

/**
 * Every colour and dimension here is a semantic token from the generated CSS
 * layer. Because custom properties inherit through shadow roots, an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes this component with no
 * JavaScript and no re-render.
 *
 * Spec: specs/switch/switch.spec.json
 */
export default css`
  :host {
    /* --- geometry ------------------------------------------------------ */
    /* The spec has no token for the root's 64x32 (spec gap "root size is
       raw"). Both are derived from the tokens that do exist, so they hold
       at every size mode rather than at one: height is the thumb plus its
       padding; width is padding + two thumb-widths + the root's own gap,
       which is exactly 64 at the default size. */
    --zds-switch-pad: var(--space-xxs);
    --zds-switch-thumb: var(--control-xs);
    --zds-switch-gap: var(--space-sm);

    /* --- motion -------------------------------------------------------- */
    /* The spring is the animations/spring token (size collection): 250ms on
       cubic-bezier(0.34, 1.36, 0.64, 1), shared with Segmented Control. The
       stretch's trailing edge keeps its own slower-starting curve, which has
       no token; its 250ms matches animations/spring's duration. */
    --zds-switch-trailing-duration: 250ms;

    display: inline-block;
    vertical-align: middle;
    width: calc(2 * var(--zds-switch-pad) + 2 * var(--zds-switch-thumb) + var(--zds-switch-gap));
    height: calc(2 * var(--zds-switch-pad) + var(--zds-switch-thumb));
    border-radius: var(--radius-pill);
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none;
  }

  /* 1. Track: behind everything, clips the thumb's spring overshoot. */
  .track {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
    background: var(--zds-switch-track);
  }

  /* 2-3. Icon slots, one at each end, inside the same padding as the thumb.
     The thumb sits above and covers whichever slot is at its end. */
  .icons {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--zds-switch-pad);
    color: var(--zds-switch-icon);
  }
  .slot {
    display: inline-flex;
    width: var(--control-icon-md);
    height: var(--control-icon-md);
  }

  /* 4. Thumb. Positioned by its two logical edges rather than a transform:
     inset-inline-* mirrors in RTL for free, and transitioning the edges
     separately is what produces the stretch (see motion, below). Both its
     width and height come out as control-xs; Figma binds only the height
     (spec warn "thumb width is unbound"), which would let a size mode turn
     the circle into an oval. */
  .thumb {
    position: absolute;
    top: var(--zds-switch-pad);
    bottom: var(--zds-switch-pad);
    inset-inline-start: var(--zds-switch-pad);
    inset-inline-end: calc(100% - var(--zds-switch-pad) - var(--zds-switch-thumb));
    border-radius: var(--radius-pill);
    background: var(--zds-switch-thumb-fill);
  }

  /* Border, drawn INSIDE the footprint per the metadata (States & Triggers,
     How to use, Layout & Theming). Figma draws the focus stroke outside;
     the inside reading was chosen deliberately — spec warn "focus border is
     outside in Figma". It sits above the thumb so the thumb can't hide it.
     Known cost: inside the track, border/focus has almost no contrast
     against either track colour, and none in Dark on the on track (spec warn
     "focus ring is effectively invisible when drawn inside"). Moving it
     outside is a one-rule change: outline on :host instead of this inset
     shadow. */
  .ring {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 0 0 var(--zds-switch-ring-width) var(--zds-switch-ring);
  }

  /* ---- switch: off (default) / on ------------------------------------ */
  :host {
    --zds-switch-track: var(--interactive-selection-background-default);
    --zds-switch-thumb-fill: var(--interactive-primary-foreground-default);
    --zds-switch-icon: var(--foreground-inverse);
  }
  :host([checked]) {
    --zds-switch-track: var(--interactive-selection-background-pressed);
  }
  :host([checked]) .thumb {
    inset-inline-start: calc(100% - var(--zds-switch-pad) - var(--zds-switch-thumb));
    inset-inline-end: var(--zds-switch-pad);
  }

  /* ---- state: enabled / focus ---------------------------------------- */
  /* At rest the border is border/default at stroke/base, which resolves to
     zero weight — invisible, as the metadata says ("0 weight"). Kept as a
     binding so a theme that gives stroke/base weight shows it. */
  :host {
    --zds-switch-ring: var(--border-default);
    --zds-switch-ring-width: var(--stroke-base);
  }
  :host(:focus-visible) {
    --zds-switch-ring: var(--border-focus);
    --zds-switch-ring-width: var(--stroke-thick);
  }

  /* ---- state: disabled ----------------------------------------------- */
  /* Track, thumb and icons take their disabled tokens regardless of on/off. */
  :host([disabled]) {
    cursor: not-allowed;
    --zds-switch-track: var(--interactive-selection-background-disabled);
    --zds-switch-thumb-fill: var(--interactive-primary-foreground-disabled);
    --zds-switch-icon: var(--foreground-disabled);
  }

  /* ---- motion -------------------------------------------------------- */
  /* Only after the first user toggle (.animated), so a switch that renders
     checked doesn't slide into place on page load.

     The leading edge (the one in the direction of travel) takes the spec's
     ease-spring; the trailing edge takes a slower-starting curve and catches
     up by the end. The gap between them is the stretch: with these curves
     the thumb peaks at 1.3x its width about a quarter of the way through,
     then settles back, and is never narrower than at rest. Interpretation of
     an underspecified line — spec warn "the stretch motion is
     underspecified" lists what the metadata leaves open.

     Transitions, not keyframes: toggling mid-flight reverses from where the
     thumb is, without jumping or restarting. The track colour shares the
     leading edge's timing so it lands exactly when the thumb arrives. */
  :host {
    --zds-switch-ease-trailing: cubic-bezier(0.5, 1.1, 0.64, 1);
  }
  .track.animated {
    transition: background-color var(--animations-spring);
  }
  /* Turning on: the end edge leads. */
  :host([checked]) .animated .thumb {
    transition:
      inset-inline-end var(--animations-spring),
      inset-inline-start var(--zds-switch-trailing-duration) var(--zds-switch-ease-trailing),
      background-color var(--animations-spring);
  }
  /* Turning off: the start edge leads. */
  :host(:not([checked])) .animated .thumb {
    transition:
      inset-inline-start var(--animations-spring),
      inset-inline-end var(--zds-switch-trailing-duration) var(--zds-switch-ease-trailing),
      background-color var(--animations-spring);
  }
  /* The focus ring appears on keyboard focus only and never animates. */

  /* Reduced motion: the state changes instantly; the colour change remains
     because it carries the state (spec accessibility guidelines). */
  @media (prefers-reduced-motion: reduce) {
    .track.animated,
    :host([checked]) .animated .thumb,
    :host(:not([checked])) .animated .thumb {
      transition: none;
    }
  }
`;
