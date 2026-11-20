import { LitElement, html, type PropertyValues } from "lit";
import styles from "./button-group.styles.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import type { ZetaButtonGroupItem } from "./button-group-item/button-group-item.js";

export * from "./button-group-item/button-group-item.js";

/** A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading.
 * The group owns the fill, the outline and the rules between items; each item is a subtle button. Size is the
 * group's call and every item inherits it. Reach for a single Button when one action is clearly the primary one.
 *
 * `rounded` reaches the group's outline and the outer corners of the first and last items, nothing else.
 *
 * @slot - Children must be of type `zeta-button-group-item` otherwise they will not be displayed.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5763-1251
 * @storybook ?path=/docs/components-button-group--docs
 */
@customElement("zeta-button-group")
export class ZetaButtonGroup extends Contourable(LitElement) {
  /** Size of the group. Every item takes it. */
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large" = "medium";

  @queryAssignedElements({ selector: "zeta-button-group-item", flatten: true }) private items!: ZetaButtonGroupItem[];

  /** Items take the group's size; it is never set per item (spec: size). */
  private syncItems() {
    for (const item of this.items ?? []) item.size = this.size;
  }

  protected updated(changed: PropertyValues) {
    if (changed.has("size")) this.syncItems();
  }

  protected override render() {
    return html`<slot @slotchange=${() => this.syncItems()}></slot>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button-group": ZetaButtonGroup;
  }
}
