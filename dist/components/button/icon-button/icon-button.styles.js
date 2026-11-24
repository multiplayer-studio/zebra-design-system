import { css } from "lit";
/* Geometry from specs/icon-button; colour, border, shape, focus and disabled come from button.styles.js, which this
   extends. Rules repeat button.styles.js's own selectors so they win by order. */
export default css `
  :host {
    height: fit-content;
    width: fit-content;
  }

  /* A fixed square per size with space/2xs around the glyph (spec: variants bySize). Small is under the 40px
     control/target-min, so prefer medium wherever the control is tapped. */
  :host > button,
  :host([size="small"]) > button {
    box-sizing: border-box;
    width: var(--control-sm);
    height: var(--control-sm);
    padding: var(--space-2xs);
    --icon-size: var(--control-icon-sm);
  }

  :host([size="medium"]) > button {
    width: var(--control-md);
    height: var(--control-md);
    padding: var(--space-2xs);
    --icon-size: var(--control-icon-md);
  }

  /* Large reuses the medium glyph, so the glyph does not grow between medium and large even though the button does. */
  :host([size="large"]) > button {
    width: var(--control-lg);
    height: var(--control-lg);
    padding: var(--space-2xs);
    --icon-size: var(--control-icon-md);
  }

  :host([flavor]:not([disabled]):not(:hover):not(:active)) > button {
    --flavor-background-color: var(--icon-button-color);
  }
`;
//# sourceMappingURL=icon-button.styles.js.map