import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./label.styles.js";
import { Contourable } from "../../../mixins/mixins.js";

/** Names a category on an item in a word or two. `status` carries the standing of that category, and `bold` and
 * `outlined` decide how hard it pushes, from a solid fill down to a tint with no visible edge. It reports and never
 * responds, which is the line between it and Chip.
 *
 * Bold and outlined combine into three forms: bold, outlined (bold off) and plain (both off). Bold wins when both are
 * set, because that pair is not built.
 *
 * @slot  - Text displayed on the label. If not provided, the `label` property will be used.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-328
 * @storybook ?path=/docs/components-badges--docs
 */
@customElement("zeta-label")
export class ZetaLabel extends Contourable(LitElement) {
  /** The standing of the category (spec: variant). */
  @property({ type: String, reflect: true }) status: "info" | "positive" | "warning" | "negative" | "neutral" = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted. */
  @property({ type: String }) label?: string;

  /** Solid fill with light text, the strongest form. Turn off for a tint that supports the item rather than leads it. */
  @property({ type: Boolean, reflect: true }) bold = true;

  /** Adds a thin border to the tinted fill. Applies only when `bold` is off. */
  @property({ type: Boolean, reflect: true }) outlined = false;

  static styles = [styles, super.styles ?? []];

  protected override render() {
    return html`
      <div class="container">
        <div class="text">${this.label}<slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-label": ZetaLabel;
  }
}
