import { css } from "lit";

/**
 * The container. Every value is a semantic token from the generated CSS
 * layer. Kept rule-for-rule identical to packages/react-baseui accordion.css
 * (same class names) so the two packages cannot drift.
 *
 * Spec: specs/accordion/accordion.spec.json
 */
export default css`
  :host {
    display: block;
    /* Fills its parent: the metadata says "Fill/Flexible width"; Figma's
       fixed 381px is an authoring size (spec warn "Width is fixed, not fill"). */
    width: 100%;
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- 1. container (root) --------------------------------------------- */
  .zds-accordion {
    display: flex;
    flex-direction: column;
    gap: var(--space-none);
    box-sizing: border-box;
    width: 100%;
    padding: var(--space-none);
    border-radius: var(--radius-none);
    /* Clip the rows' hover fill to the rounded corners. */
    overflow: hidden;
    /* No fill of its own: every surface comes from the rows. */
    background: none;
    color: var(--foreground-primary);
  }

  /* ---- inCard ----------------------------------------------------------- */
  /* The root stroke is a raw 1px in Figma with only its colour bound (spec
     warn "Untokenised border width"); stroke/thin is the nearest token and
     is what the row divider already uses. Inside stroke, as drawn. */
  .zds-accordion[data-in-card] {
    border: var(--stroke-thin) solid var(--border-default);
  }

  /* ---- rounded ---------------------------------------------------------- */
  .zds-accordion[data-rounded] {
    border-radius: var(--radius-lg);
  }
`;
