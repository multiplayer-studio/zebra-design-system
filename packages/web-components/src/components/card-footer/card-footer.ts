import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-footer.styles.js";

/**
 * A row of closing actions for `zds-card`'s footer slot — one button fills
 * the width, two sit side by side with a gap, or pass anything else entirely
 * (the spec's "custom" option). The count and arrangement are left to
 * whatever is slotted rather than a separate `actions` property.
 *
 * @slot - The footer actions.
 * @spec specs/card/card.spec.json
 */
@customElement("zds-card-footer")
export class ZdsCardFooter extends LitElement {
  static styles = styles;

  protected render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-card-footer": ZdsCardFooter;
  }
}
