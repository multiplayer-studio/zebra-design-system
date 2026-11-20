import { LitElement, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./divider.styles.js";

/**
 * A thin line that separates content into sections or groups, such as list rows, cards or menu items. Orientation
 * matches the direction it divides: horizontal between stacked content, vertical between side-by-side content.
 *
 * It fills its container along its length and has no padding of its own, so space it with the layout's gap rather than
 * margins. Assistive technology hears it as a separator.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8795
 * @storybook ?path=/story/components-divider--divider
 */
@customElement("zeta-divider")
export class ZetaDivider extends LitElement {
  /** The direction the line runs. Vertical fills the height of its container, so give that container a height. */
  @property({ type: String, reflect: true }) orientation: "horizontal" | "vertical" = "horizontal";

  private internals = this.attachInternals();

  constructor() {
    super();
    this.internals.role = "separator";
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("orientation")) this.internals.ariaOrientation = this.orientation === "vertical" ? "vertical" : null;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-divider": ZetaDivider;
  }
}
