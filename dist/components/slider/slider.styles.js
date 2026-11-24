import { css } from "lit";
/**
 * Every colour and dimension here is a semantic token from the generated CSS
 * layer. Because custom properties inherit through shadow roots, an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes this component with no
 * JavaScript and no re-render.
 *
 * The native inputs' thumbs are restyled through vendor pseudo-elements. A
 * selector list mixing -webkit- and -moz- pseudo-elements is dropped whole by
 * any engine that doesn't know one of them, so each thumb rule is written
 * twice; both read the same local custom properties.
 *
 * Spec: specs/slider/slider.spec.json
 */
export default css `
  :host {
    /* --- geometry ------------------------------------------------------ */
    /* Track height and dot size have no token in the spec (spec warn "raw
       values"). They are bound to the line-weight tokens that resolve to the
       measured sizes, stroke/heavy and stroke/thick, so a theme that thickens
       lines thickens the track with them. */
    --zds-slider-track: var(--stroke-heavy);
    --zds-slider-dot: var(--stroke-thick);
    /* The thumb's box is always the larger size, so the value-to-position
       mapping never shifts. At rest a transparent border insets the visible
       thumb to the smaller size; hover, drag and focus remove it. Width and
       height share one token, so the thumb stays square (spec warn: Figma
       binds only the height). */
    --zds-slider-thumb-box: var(--control-icon-md);
    --zds-slider-thumb-rest-inset: calc((var(--control-icon-md) - var(--control-icon-sm)) / 2);
    --zds-slider-thumb-inset: var(--zds-slider-thumb-rest-inset);

    display: block;
    min-inline-size: calc(4 * var(--zds-slider-thumb-box));
  }

  :host([hidden]) {
    display: none;
  }

  .control {
    position: relative;
    /* Tall enough for the larger thumb, which overhangs the track above and
       below. */
    block-size: var(--zds-slider-thumb-box);
  }

  /* 1. Track: the base, full width, in surface/track. */
  .track {
    position: absolute;
    inset-inline: 0;
    inset-block-start: calc(50% - var(--zds-slider-track) / 2);
    block-size: var(--zds-slider-track);
    border-radius: var(--zds-slider-track-radius);
    /* Near-invisible against the page in both modes (spec warn "the base
       track is near-invisible against the page"). Built faithfully. */
    background: var(--surface-track);
  }

  /* 1. Active fill: from the start of the span to the value. Rounded with
     the base track, as Figma binds it (radius/xs when rounded, radius/none
     when sharp). The revised metadata says the fill is square-ended on both
     shapes; the bound tokens are followed until that is resolved (spec warn
     "the metadata says the active fill is square-ended; Figma rounds it").
     Rounding the fill itself, rather than clipping it to the track, also
     gives a range span that starts mid-track rounded ends. */
  .fill {
    position: absolute;
    inset-block: 0;
    border-radius: var(--zds-slider-track-radius);
    background: var(--zds-slider-active);
  }

  /* 2. Step dots: one per stop, at the value each marks, across the whole
     track; above both track layers and below the thumbs. Invisible on the
     unfilled side (spec warn "the step dots are invisible on the unfilled
     side"). Built faithfully. */
  .dots {
    position: absolute;
    inset-inline: 0;
    inset-block-start: calc(50% - var(--zds-slider-dot) / 2);
    block-size: var(--zds-slider-dot);
    pointer-events: none;
  }
  .dot {
    position: absolute;
    inline-size: var(--zds-slider-dot);
    block-size: var(--zds-slider-dot);
    margin-inline-start: calc(var(--zds-slider-dot) / -2);
    border-radius: var(--radius-pill);
    background: var(--foreground-inverse);
  }

  /* 3. Thumbs: native range inputs, widened by one thumb box and pulled back
     by half of one, so each thumb's centre runs exactly from the start of
     the track to its end, as in the spec. */
  .input {
    position: absolute;
    inset-block: 0;
    inset-inline-start: calc(var(--zds-slider-thumb-box) / -2);
    inline-size: calc(100% + var(--zds-slider-thumb-box));
    block-size: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    outline: none;
  }
  .input::-webkit-slider-runnable-track {
    block-size: 100%;
    background: transparent;
  }
  .input::-moz-range-track {
    block-size: 100%;
    background: transparent;
  }
  .input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    inline-size: var(--zds-slider-thumb-box);
    block-size: var(--zds-slider-thumb-box);
    border: var(--zds-slider-thumb-inset) solid transparent;
    border-radius: var(--zds-slider-thumb-radius);
    background: var(--zds-slider-thumb-fill);
    background-clip: padding-box;
    box-shadow: var(--zds-slider-thumb-ring, none);
    pointer-events: auto;
  }
  .input::-moz-range-thumb {
    box-sizing: border-box;
    inline-size: var(--zds-slider-thumb-box);
    block-size: var(--zds-slider-thumb-box);
    border: var(--zds-slider-thumb-inset) solid transparent;
    border-radius: var(--zds-slider-thumb-radius);
    background: var(--zds-slider-thumb-fill);
    background-clip: padding-box;
    box-shadow: var(--zds-slider-thumb-ring, none);
    pointer-events: auto;
  }

  /* Range mode: two inputs share the track, so only their thumbs take the
     pointer; a press on bare track does nothing rather than reaching
     whichever input happens to be on top. */
  :host([range]) .input {
    pointer-events: none;
  }
  .start-on-top .start {
    z-index: 1;
  }

  /* ---- shape --------------------------------------------------------- */
  :host {
    --zds-slider-track-radius: var(--radius-xs);
    --zds-slider-thumb-radius: var(--radius-pill);
  }
  :host([shape="sharp"]) {
    --zds-slider-track-radius: var(--radius-none);
    --zds-slider-thumb-radius: var(--radius-none);
  }

  /* ---- state: default ------------------------------------------------ */
  :host {
    --zds-slider-active: var(--interactive-neutral-foreground-default);
    --zds-slider-thumb-fill: var(--interactive-neutral-foreground-default);
  }

  /* ---- state: hover -------------------------------------------------- */
  /* Size follows the pointer and nothing else: only the thumb under it, or
     the one being dragged, takes the larger size, in every state. The fill,
     the track and, in range mode, the other thumb keep theirs (designer
     clarifications 2026-10-14; Figma's hover and selected variants grow
     both thumbs). Selected on the thumb pseudo-element itself, so hovering
     bare track grows nothing. */
  :host(:not([disabled])) .input::-webkit-slider-thumb:hover,
  :host(:not([disabled])) .input:active::-webkit-slider-thumb {
    border-width: 0;
  }
  :host(:not([disabled])) .input::-moz-range-thumb:hover,
  :host(:not([disabled])) .input:active::-moz-range-thumb {
    border-width: 0;
  }

  /* ---- state: selected (pressed or keyboard focus) ------------------- */
  /* A thumb is being dragged, or a thumb has keyboard focus. Either way the
     colour is the slider's: the fill and BOTH thumbs take the selected
     foreground (designer clarification 2026-10-14). Size is not part of
     it; see hover above. */
  .control.selected,
  :host(:not([disabled])) .control:has(.input:focus-visible) {
    --zds-slider-active: var(--interactive-ghost-foreground-default);
    --zds-slider-thumb-fill: var(--interactive-ghost-foreground-default);
  }

  /* ---- state: disabled ----------------------------------------------- */
  :host([disabled]) {
    --zds-slider-active: var(--interactive-neutral-foreground-disabled);
    --zds-slider-thumb-fill: var(--interactive-neutral-foreground-disabled);
  }
  :host([disabled]) .input {
    cursor: not-allowed;
  }

  /* ---- focus ring --------------------------------------------------- */
  /* On top of the selected colour above, the focused thumb alone gets a
     border/focus ring at stroke/thick, the same ring Button uses, so in
     range mode it says which end the keys will move. At rest size the ring
     sits on the edge of the thumb's larger box, leaving a gap the width of
     the inset around the visible thumb. Not in the Figma file. */
  .input:focus-visible {
    --zds-slider-thumb-ring: 0 0 0 var(--stroke-thick) var(--border-focus);
  }

  /* No transitions: the spec defines no motion ("No transition is
     defined"). */
`;
