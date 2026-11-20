import { html, LitElement, type PropertyValues } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property } from "lit/decorators.js";
import styles from "./segmented.item.styles.js";
/** A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button. Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * A segment is a radio in its control's group. Give an icon-only segment an `aria-label`.
 *
 * @slot - The content of the item: a `zeta-icon`, a label, or both.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-774
 * @storybook ?path=/docs/components-segmented-control--docs
 */
@customElement("zeta-segmented-item")
export class ZetaSegmentedItem extends Contourable(LitElement) {
  /**
   * Whether the item is active.
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Set by the control: icon and label, the label alone, or the icon alone. */
  @property({ type: String, reflect: true }) flavor: "default" | "text-only" | "icon-only" = "default";

  connectedCallback() {
    super.connectedCallback?.();
    this.setAttribute("role", "radio");
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("active")) {
      this.setAttribute("aria-checked", String(this.active));
      this.tabIndex = this.active ? 0 : -1;
    }
  }

  render() {
    return html`<div class="segment"><slot></slot></div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-segmented-item": ZetaSegmentedItem;
  }
}
