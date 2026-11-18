import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./chat-bubble.styles.js";

export type ChatBubbleStatus = "single" | "first" | "middle" | "last";

/**
 * The text of a message. fill: a tinted bubble; none: plain text on the page.
 * `role-name` stands for the spec's Role (sender, receiver), named so as not
 * to collide with the ARIA `role` attribute.
 *
 * @slot - The message text.
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-bubble")
export class ZdsChatBubble extends LitElement {
  static styles = styles;
  @property({ type: String, reflect: true, attribute: "bubble-style" }) bubbleStyle: "fill" | "none" = "fill";
  /** Position in a run of one sender's bubbles. The corner toward the neighbour tightens. */
  @property({ type: String, reflect: true }) status: ChatBubbleStatus = "single";
  @property({ type: String, reflect: true, attribute: "role-name" }) roleName: "sender" | "receiver" = "sender";
  @property({ type: Boolean, reflect: true }) rounded = true;
  protected render() { return html`<slot></slot>`; }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-bubble": ZdsChatBubble }
}
