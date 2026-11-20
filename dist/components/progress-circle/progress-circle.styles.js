import { css } from "lit";
/**
 * Progress Circle. Every colour, dimension and type value is a semantic token
 * from the generated CSS layer. Kept in step with packages/react-baseui
 * progress-circle.css — same tokens, same decisions, same comments.
 *
 * Colours follow this spec's bindings — arc border/info, track border/subtle —
 * which differ from Progress Bar's foreground/link / surface/track for the
 * same roles (spec note). Each component is built as specced.
 *
 * Spec: specs/progress-circle/progress-circle.spec.json
 */
export default css `
  /* ---- anatomy: ring (root) ---------------------------------------------- */
  :host {
    /* spec issue "Sizes aren't tokens": ring diameters are unbound in Figma.
       Mapped to the control heights of the same value (24/36/40/48); 64 has no
       single token and is --control-lg + --space-lg (48 + 16). */
    --zds-progress-circle-size: var(--control-xs);

    position: relative;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    flex: none;
    inline-size: var(--zds-progress-circle-size);
    block-size: var(--zds-progress-circle-size);
  }
  :host([hidden]) { display: none; }

  .ring {
    position: absolute;
    inset: 0;
  }

  /* ---- anatomy: track and arc -------------------------------------------- */
  /* One stroked circle each, centred, radius inset by half the stroke so the
     stroke/heavy weight stays inside the box at every size (it does not
     scale, as specced). The svg is turned so the arc starts at twelve o'clock
     and runs clockwise; pathLength=100 makes the dash length the percentage. */
  .svg {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    overflow: visible;
    transform: rotate(-90deg);
  }

  .track,
  .arc {
    cx: 50%;
    cy: 50%;
    r: calc(50% - var(--stroke-heavy) / 2);
    fill: none;
    stroke-width: var(--stroke-heavy);
  }

  .track {
    stroke: var(--border-subtle);
    stroke-linecap: butt;
  }

  .arc {
    stroke: var(--border-info);
    /* rounded=false is Figma's "none" cap, i.e. butt — never square, which
       would overshoot the endpoint (spec note). */
    stroke-linecap: butt;
    stroke-dasharray: var(--zds-progress-circle-value, 0) 100;
    /* tokens/ has no motion collection; Switch's duration with a standard ease. */
    transition: stroke-dasharray 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  :host([rounded]) .arc {
    stroke-linecap: round;
  }
  /* A round cap would draw a dot at 0%. */
  .arc[data-empty] {
    visibility: hidden;
  }

  /* ---- progress: indeterminate ------------------------------------------- */
  /* The three-quarter arc Figma draws in every variant, spinning. */
  .ring[data-indeterminate] .arc {
    stroke-dasharray: 75 100;
  }
  .ring[data-indeterminate] .svg {
    animation: zds-progress-circle-spin 1s linear infinite;
  }
  @keyframes zds-progress-circle-spin {
    from { transform: rotate(-90deg); }
    to { transform: rotate(270deg); }
  }

  /* Reduced motion: no spin and no sweep transition; the arc rests at twelve
     o'clock and fades slowly so it still reads as live. Pair with text. */
  @keyframes zds-progress-circle-pulse {
    from { opacity: 1; }
    to { opacity: 0.4; }
  }
  @media (prefers-reduced-motion: reduce) {
    .arc { transition: none; }
    .ring[data-indeterminate] .svg {
      animation: zds-progress-circle-pulse 1.6s ease-in-out infinite alternate;
    }
  }

  /* ---- size --------------------------------------------------------------- */
  :host([size="xsmall"]) { --zds-progress-circle-size: var(--control-sm); }
  :host([size="small"]) { --zds-progress-circle-size: var(--control-md); }
  :host([size="medium"]) { --zds-progress-circle-size: var(--control-lg); }
  :host([size="large"]) {
    --zds-progress-circle-size: calc(var(--control-lg) + var(--space-lg));
  }

  /* ---- upload control (private _Upload) ---------------------------------- */
  /* Centred, 36px at every ring size (--control-sm, the cancel icon button's
     own small height). Present only at small, medium and large: at xsmall the
     control is as wide as the ring itself and would cover the stroke, so the
     component leaves it out there and at xxsmall (as Figma does). */
  .upload {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    inline-size: var(--control-sm);
    block-size: var(--control-sm);
    display: grid;
    place-items: center;
  }

  /* spec issue "Readout colour is raw": Figma's raw black would not flip in
     dark; foreground/primary is the intent. */
  .readout {
    color: var(--foreground-primary);
    font-family: var(--indicator-medium-font-family);
    font-size: var(--indicator-medium-font-size);
    font-weight: var(--indicator-medium-font-weight);
    line-height: var(--indicator-medium-line-height);
    letter-spacing: var(--indicator-medium-letter-spacing);
    white-space: nowrap;
    text-align: center;
  }
`;
