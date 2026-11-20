import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./caret-indicator.styles.js";
import "../icon/icon.js";

/**
 * The caret that marks something as able to open, and turns when it does. Figma swaps glyphs per state; here one
 * glyph rotates (owner decision): `expand_more` turned 180° for vertical, `chevron_right` turned 90° for horizontal.
 * Decorative: the control it sits in carries `aria-expanded`. The colour is currentColor.
 *
 * @cssproperty --caret-indicator-motion - Duration and easing of the turn. Inside the rail it is animations/smooth.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54347
 * @storybook ?path=/docs/components-navigation-rail--docs
 */
@customElement("zeta-caret-indicator")
export class ZetaCaretIndicator extends Contourable(LitElement) {
  /** Whether the thing it marks is open. Turns the glyph. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** vertical: a list that drops down. horizontal: a row that opens a further level. */
  @property({ type: String, reflect: true }) direction: "vertical" | "horizontal" = "vertical";

  /** The nested Icon's size: small 16px, medium 20px, large 28px (measured in Figma). */
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large" = "small";

  protected render() {
    return html`<zeta-icon class="glyph" aria-hidden="true" .rounded=${this.rounded}
      >${this.direction === "vertical" ? "expand_more" : "chevron_right"}</zeta-icon
    >`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-caret-indicator": ZetaCaretIndicator;
  }
}
