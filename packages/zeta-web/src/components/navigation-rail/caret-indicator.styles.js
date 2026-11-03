import { css } from "lit";

/* Spec: specs/navigation-rail (Caret Indicator). Binds no tokens of its own; the glyph follows the text colour. The
   turn uses animations/spring by default, as Switch does, and is off under reduced motion. */
export default css`
  :host {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    line-height: 0;
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  :host([size="medium"]) {
    --icon-size: var(--control-icon-md);
  }

  :host([size="large"]) {
    --icon-size: var(--control-icon-lg);
  }

  .glyph {
    transition: transform var(--caret-indicator-motion, var(--animations-spring));
  }

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
