import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./caret-indicator.styles.js";
import "../icon/icon.js";
import type { IconSize } from "../icon/icon.js";

export type CaretIndicatorDirection = "vertical" | "horizontal";
export type CaretIndicatorSize = IconSize;

const GLYPH = { vertical: "expand-more", horizontal: "chevron-right" } as const;

/**
 * The caret that marks something as able to open, and turns when it does.
 *
 * Decorative (`aria-hidden`): the control it sits in carries `aria-expanded`.
 * Figma swaps glyphs per state (expand-more → expand-less, chevron-right →
 * expand-more); here it is ONE glyph rotated with Switch's motion — owner
 * decision. The colour is currentColor, so it follows the row's label.
 *
 * Shared by zds-sub-menu-item, zds-collapsible-menu-item and anything else
 * with a disclosure caret. Kept in step with React `<CaretIndicator>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Caret Indicator)
 */
@customElement("zds-caret-indicator")
export class ZdsCaretIndicator extends LitElement {
  static styles = styles;

  /** Whether the thing it marks is open. Turns the glyph; it never swaps it. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * vertical: `expand-more`, turned 180° when open (a list that drops down).
   * horizontal: `chevron-right`, turned 90° when open (a row that opens a level).
   */
  @property({ type: String, reflect: true }) direction: CaretIndicatorDirection = "vertical";

  /** The glyph's own box: 16 / 20 / 28px, the nested Icon's sizes. */
  @property({ type: String, reflect: true }) size: CaretIndicatorSize = "small";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }

  protected render() {
    // Rounded family, Framed off (spec).
    return html`<zds-icon class="glyph" name=${GLYPH[this.direction] ?? GLYPH.vertical} size=${this.size}></zds-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-caret-indicator": ZdsCaretIndicator;
  }
}
