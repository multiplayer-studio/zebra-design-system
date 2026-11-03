import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-body.styles.js";

/**
 * A block of supporting text in a card, inset by space/lg on every side.
 *
 * @slot - The body content.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */
@customElement("zeta-card-body")
export class ZetaCardBody extends LitElement {
  protected render() {
    return html` <div class="card-body"><slot></slot></div> `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-body": ZetaCardBody;
  }
}
