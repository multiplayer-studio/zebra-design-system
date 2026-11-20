import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./priority-pill.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import "../../icon/icon.js";

/** Shows where an item sits on a four step scale, from low to urgent. `status` (spec: level) sets the fill, the
 * circle and the glyph together, `type` (spec: variant) decides whether the name appears beside the circle or the
 * circle stands alone, and `leading` swaps the direction glyph for a rank number.
 *
 * The glyphs point the way the level does: down for low, a dash for medium, up for high and the priority mark for
 * urgent. A number removes that cue, so prefer the glyph unless the exact position in a queue matters.
 *
 * @cssproperty --priority-pill-index-background-color - Color of the index character.
 * @cssproperty --priority-pill-index-text-color - Background color of the index.
 * @cssproperty --priority-pill-text-color - Color of the text.
 * @cssproperty --priority-pill-background-color - Background color of the pill.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-410
 * @storybook ?path=/docs/components-badges--docs
 */
@customElement("zeta-priority-pill")
export class ZetaPriorityPill extends Contourable(LitElement) {
  /** Text of Priority.
   *
   * Can also be slotted. */
  @property({ type: String }) label?: string;

  /** Character shown at start of component. Will be truncated to a single character if longer.
   *
   * Can also be slotted.
   *
   * The value of this property is usually a single digit number that indicates the priority level. */
  @property() index?: string | number;

  /**
   * (Optional) Status of the priority pill.
   *
   * This changes the color and content of the pill.
   *
   * If not provided, the pill is drawn as low. */
  @property({ type: String, reflect: true }) status?: "urgent" | "high" | "medium" | "low";

  /** Size of the priority pill */
  @property({ type: String, reflect: true }) size: "small" | "large" = "large";

  /** Type of the priority pill
   *
   * Lozenge shows the whole badge, including the text, while badge only shows the index character.  */
  @property({ type: String, reflect: true }) type: "badge" | "lozenge" = "lozenge";

  /** What the circle holds: a direction glyph or the rank in `index`. Defaults to `number` when `index` is set. */
  @property({ type: String, reflect: true }) leading?: "icon" | "number";

  static styles = [styles, super.styles ?? []];

  private static readonly GLYPH = { low: "arrow_down", medium: "remove", high: "arrow_up", urgent: "priority" } as const;

  getIndex = () => {
    if (this.index) {
      return String(this.index)[0];
    }
    if (this.status) {
      return { urgent: "U", high: "1", medium: "2", low: "3" }[this.status];
    }
    if (this.label) {
      return this.label[0];
    }
    return "";
  };

  getText = () => {
    if (this.label) {
      return this.label;
    }
    if (this.status) {
      return { urgent: "Urgent", high: "High", medium: "Medium", low: "Low" }[this.status];
    }
    return "";
  };

  protected override render() {
    const leading = this.leading ?? (this.index !== undefined ? "number" : "icon");
    return html`
      <div class="container contourable-target">
        <div class="number contourable-target">
          ${
            leading === "number"
              ? this.getIndex()
              : html`<zeta-icon class="glyph" .rounded=${this.rounded !== false}>${ZetaPriorityPill.GLYPH[this.status ?? "low"]}</zeta-icon>`
          }
        </div>
        ${this.type === "lozenge" ? html`<div class="text">${this.getText()}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-priority-pill": ZetaPriorityPill;
  }
}
