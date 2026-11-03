import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-footer.styles.js";

/**
 * The actions that close out a card. Slotted buttons share the row equally, with space/sm between them; use one
 * primary, or an outline and a primary.
 *
 * @slot - The footer actions, usually zeta-button elements at size small.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */
@customElement("zeta-card-footer")
export class ZetaCardFooter extends LitElement {
  protected render() {
    return html`<div class="card-footer"><slot></slot></div>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-footer": ZetaCardFooter;
  }
}
