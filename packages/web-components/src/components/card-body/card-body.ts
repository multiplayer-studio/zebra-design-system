import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-body.styles.js";

/**
 * A plain padded text block for `zds-card`'s body slot.
 *
 * @slot - The body content.
 * @spec specs/card/card.spec.json
 */
@customElement("zds-card-body")
export class ZdsCardBody extends LitElement {
  static styles = styles;

  protected render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-card-body": ZdsCardBody;
  }
}
