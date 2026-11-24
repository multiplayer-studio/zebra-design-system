import { css } from "lit";
/**
 * Binds no tokens of its own (spec): the glyph is the icon font on
 * currentColor at the nested Icon's size. Kept rule-for-rule identical to
 * packages/react-baseui caret-indicator.css.
 *
 * Spec: specs/navigation-rail/navigation-rail.spec.json (Caret Indicator)
 */
export default css `
  :host {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    line-height: 0;
    /* Switch's motion: tokens/ has no motion collection, so the duration and
       the spring are literals, the same ones switch.styles uses. */
    --zds-caret-indicator-duration: 250ms;
    --zds-caret-indicator-ease: cubic-bezier(0.34, 1.36, 0.64, 1);
  }
  :host([hidden]) {
    display: none;
  }

  .glyph {
    /* Hook: --zds-caret-indicator-motion (duration + timing, e.g.
       var(--animations-smooth)) overrides the spring for a scope — the
       Navigation Rail family sets it. Unset, the default spring applies. */
    transition: transform var(--zds-caret-indicator-motion, var(--zds-caret-indicator-duration) var(--zds-caret-indicator-ease));
  }

  /* ---- open: one glyph turned, in place of Figma's glyph swap ----------- */
  :host([direction="vertical"][open]) .glyph {
    transform: rotate(180deg);
  }
  :host([direction="horizontal"][open]) .glyph {
    transform: rotate(90deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .glyph {
      transition: none;
    }
  }
`;
