import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./chat-timestamp.styles.js";

/**
 * The send time, formatted by the product.
 *
 * @slot - The time.
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-timestamp")
export class ZdsChatTimestamp extends LitElement {
  static styles = styles;
  protected render() { return html`<slot></slot>`; }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-timestamp": ZdsChatTimestamp }
}
