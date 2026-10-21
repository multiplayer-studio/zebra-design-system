import { css } from "lit";

/**
 * Progress Bar. Every colour, dimension and type value is a semantic token
 * from the generated CSS layer. Kept in step with packages/react-baseui
 * progress-bar.css — same tokens, same decisions, same comments.
 *
 * Spec: specs/progress-bar/progress-bar.spec.json
 */
export default css`
  /* ---- anatomy: bar (root) ----------------------------------------------- */
  :host {
    /* spec issue "Thickness has no token": Figma's 8px / 16px bar heights are
       unbound. The nearest documented dimensions of the same value are
       --space-sm (8) and --space-lg (16); both scale with the bp-* modes. */
    --zds-progress-bar-thickness: var(--space-sm);
    --zds-progress-bar-radius: var(--radius-sm);

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    /* Figma fixes 408px; the metadata says whoever places the bar decides the
       width, so it fills its container. */
    inline-size: 100%;
    min-inline-size: 0;
  }
  :host([hidden]) { display: none; }
  [hidden] { display: none !important; }

  /* ---- anatomy: label row ------------------------------------------------- */
  .label-row {
    display: flex;
    align-items: center;
    /* spec issue "Raw gap": the row's 10px gap is unbound in Figma; --space-sm
       (8) is the nearest step. */
    gap: var(--space-sm);
    min-inline-size: 0;
  }

  .label {
    flex: 1 1 auto;
    min-inline-size: 0;
    overflow-wrap: anywhere;
    text-align: start;
    color: var(--foreground-secondary);
    font-family: var(--label-medium-font-family);
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  .trailing {
    /* Same type as the label: the two share the row. */
    font-family: var(--label-medium-font-family);
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-none);
    margin-inline-start: auto;
    color: var(--foreground-secondary);
  }

  /* ---- anatomy: indicator group (the progressbar element) --------------- */
  .bar {
    position: relative;
    block-size: var(--zds-progress-bar-thickness);
    /* Clips the indeterminate segment as it enters and leaves; the radius
       matches the parts so a full indicator is not cut. */
    overflow: hidden;
    border-radius: var(--zds-progress-bar-radius);
  }

  .track,
  .buffer,
  .indicator {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    border-radius: var(--zds-progress-bar-radius);
  }

  /* Track: follows the bound token, surface/track (spec warn "Track colour":
     the metadata's border/subtle is not what any variant binds). */
  .track {
    inset-inline-end: 0;
    background: var(--surface-track);
  }

  /* Buffer band: surface/track, the owner's decision (spec blocker "Buffer
     band token doesn't resolve": Figma's surface/subtle is a remote leftover).
     That is the track's own colour, so while buffering the unbuffered
     remainder of the track is drawn at half strength — the stand-in for
     Figma's 10%-alpha band, and the only untokenised value here (color-mix,
     as Button's ghost scrims). Without a track the band stays: hiding it would
     leave Buffering looking like a stuck bar (spec issue "Show Track hides
     Buffering too"). */
  .buffer {
    background: var(--surface-track);
  }
  .bar[data-buffering] .track {
    background: color-mix(in srgb, var(--surface-track) 50%, transparent);
  }

  /* Indicator: width from the value. A zero value is a zero-width indicator
     (spec issue "0% is faked" — no padding hack). */
  .indicator {
    background: var(--foreground-link);
    /* tokens/ has no motion collection; Switch's duration with a standard ease. */
    transition: inline-size 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ---- progress: indeterminate ------------------------------------------- */
  /* A segment the length Figma draws (143 of 408px, ~35%) travelling the
     track. Figma draws it frozen; the spec says it must move. */
  .indicator[data-indeterminate] {
    inline-size: 35%;
    animation: zds-progress-bar-slide 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes zds-progress-bar-slide {
    from { inset-inline-start: -35%; }
    to { inset-inline-start: 100%; }
  }

  /* Reduced motion: no travel and no growth transition. The segment rests
     where Figma draws it (133 of 408px, ~33%) and fades slowly instead, so it
     still reads as live; the label must carry the meaning (spec: pair with
     text). */
  @keyframes zds-progress-bar-pulse {
    from { opacity: 1; }
    to { opacity: 0.4; }
  }
  @media (prefers-reduced-motion: reduce) {
    .indicator { transition: none; }
    .indicator[data-indeterminate] {
      inset-inline-start: 33%;
      animation: zds-progress-bar-pulse 1.6s ease-in-out infinite alternate;
    }
  }

  /* ---- shape x size ------------------------------------------------------- */
  :host([size="medium"]) {
    --zds-progress-bar-thickness: var(--space-lg);
    --zds-progress-bar-radius: var(--radius-md);
  }
  :host([shape="sharp"]) {
    --zds-progress-bar-radius: var(--radius-none);
  }
`;
