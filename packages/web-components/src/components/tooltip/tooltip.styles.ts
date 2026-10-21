import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. Keyed
 * off the host's `shape` attribute and the `data-side` the positioner writes
 * on the bubble and the pointer — the side the bubble actually landed on
 * after flipping, so the pointer follows a flip; a static bubble takes it
 * from `point`. Mirrors packages/react-baseui/src/components/tooltip/tooltip.css.
 *
 * Spec: specs/tooltip/tooltip.spec.json
 */
export default css`
  :host {
    display: inline-flex; /* not inline-block: no baseline strut under the bubble */
    vertical-align: middle;
  }
  :host([hidden]) {
    display: none;
  }
  /* Anchored: the bubble lives in the top layer, so the host takes no space. */
  :host([data-anchored]) {
    display: contents;
  }
  /* Closed: hidden outright, so the host — the trigger's aria-describedby
     target — is itself the hidden node a description may read through. */
  :host([data-anchored]:not([open])) {
    display: none;
  }

  /* ---- anatomy: bubble ------------------------------------------------- */
  .bubble {
    /* Pointer geometry. spec issue "Pointer isn't token sized": Figma draws a
       fixed 8x4 vector; here its depth is --space-xs (4px, the bubble's own
       block padding) and its base twice that, so a theme that shrinks the
       bubble's padding shrinks the pointer with it. Drawn as a square of side
       depth*sqrt(2) rotated 45deg and half-buried in the bubble edge. */
    --zds-tooltip-pointer-depth: var(--space-xs);
    --zds-tooltip-pointer-box: calc(var(--zds-tooltip-pointer-depth) * 1.41421);
    --zds-tooltip-pointer-tip: var(--radius-none);

    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    background: var(--surface-inverse);
    color: var(--foreground-inverse);

    /* spec issue "No max width or wrapping": Figma hugs a single line with no
       limit. Decision: wrap at 32ch of the label's own font (~230px at
       label/small 12px; it follows the type tokens, so it shrinks with them),
       never wider than the viewport less --space-sm each side. No token covers
       a max width, hence ch. */
    max-inline-size: min(32ch, 100vw - 2 * var(--space-sm));

    /* Shadow/medium: two drop shadows on shadow/soft. A filter rather than
       box-shadow so the pointer and the bubble cast one shadow as one shape. */
    filter:
      drop-shadow(var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft))
      drop-shadow(var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft));
  }

  /* Anchored: a manual popover in the top layer, placed in viewport
     coordinates by the element. Resets the UA popover box. */
  .bubble[popover] {
    position: fixed;
    inset: auto;
    margin: 0;
    border: 0;
    overflow: visible;
    width: max-content;
  }
  .bubble[popover]:not(:popover-open) {
    display: none;
  }

  /* ---- anatomy: label -------------------------------------------------- */
  .label {
    position: relative; /* paints above the half of the pointer inside the bubble */
    font-family: var(--label-small-font-family), system-ui, sans-serif;
    font-size: var(--label-small-font-size);
    font-weight: var(--label-small-font-weight);
    line-height: var(--label-small-line-height);
    letter-spacing: var(--label-small-letter-spacing);
    white-space: normal;
    overflow-wrap: break-word;
    /* Centred per the spec on a single line, where it makes no difference;
       a wrapped label reads better ranged to the start edge. */
    text-align: start;
  }

  /* ---- anatomy: pointer ------------------------------------------------ */
  .pointer {
    position: absolute;
    box-sizing: border-box;
    width: var(--zds-tooltip-pointer-box);
    height: var(--zds-tooltip-pointer-box);
    background: var(--surface-inverse);
    transform: rotate(45deg);
    /* Centred on the edge by default; the positioner writes an inline
       left/top for the cross axis (aiming at the trigger after a shift). */
    left: calc(50% - var(--zds-tooltip-pointer-box) / 2);
    top: calc(50% - var(--zds-tooltip-pointer-box) / 2);
  }
  .pointer[data-side="top"] {          /* bubble above: tip down */
    top: calc(100% - var(--zds-tooltip-pointer-box) / 2);
    border-bottom-right-radius: var(--zds-tooltip-pointer-tip);
  }
  .pointer[data-side="bottom"] {       /* bubble below: tip up */
    top: calc(var(--zds-tooltip-pointer-box) / -2);
    border-top-left-radius: var(--zds-tooltip-pointer-tip);
  }
  .pointer[data-side="right"] {        /* bubble right: tip left */
    left: calc(var(--zds-tooltip-pointer-box) / -2);
    border-bottom-left-radius: var(--zds-tooltip-pointer-tip);
  }
  .pointer[data-side="left"] {         /* bubble left: tip right */
    left: calc(100% - var(--zds-tooltip-pointer-box) / 2);
    border-top-right-radius: var(--zds-tooltip-pointer-tip);
  }

  /* ---- shape ----------------------------------------------------------- */
  :host([shape="rounded"]) .bubble {
    border-radius: var(--radius-sm);
    /* Figma's rounded tip stops 3.586 short of the sharp 4 — exactly what a
       1px corner radius on the rotated square gives (r * (sqrt2 - 1)).
       No 1px radius token: half of --radius-xs (2px), so it scales with it. */
    --zds-tooltip-pointer-tip: calc(var(--radius-xs) / 2);
  }
  :host([shape="sharp"]) .bubble {
    border-radius: var(--radius-none);
    --zds-tooltip-pointer-tip: var(--radius-none);
  }

  /* Motion: none authored in Figma, and none added — it appears and goes. */
`;
