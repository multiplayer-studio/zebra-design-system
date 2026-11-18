import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./chat-thread.styles.js";
import "../divider/divider.js";
import "../caret-indicator/caret-indicator.js";

/**
 * "X replies", a divider and a caret; pressing it expands the replies in
 * place, pushing the messages below down. In code the thread sits in its own
 * container under the message, lined up with the text (spec behaviour).
 *
 * @slot - The Thread Slot: reply messages, each a zds-chat-message.
 * @fires zds-toggle - Opened or closed. `detail.open`.
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-thread")
export class ZdsChatThread extends LitElement {
  static styles = styles;
  @property({ type: Number, attribute: "reply-count" }) replyCount = 0;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, attribute: "replies-label" }) repliesLabel = "replies";
  /** The word after a count of one. */
  @property({ type: String, attribute: "reply-label" }) replyLabel = "reply";
  private get noun() { return this.replyCount === 1 ? this.replyLabel : this.repliesLabel; }

  private toggle() {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent("zds-toggle", { detail: { open: this.open }, bubbles: true, composed: true }));
  }

  protected render() {
    return html`<button type="button" aria-expanded=${String(this.open)} aria-controls="replies"
        aria-label=${`${this.replyCount} ${this.noun}`} @click=${() => this.toggle()}>
        <span class="count" aria-hidden="true">${this.replyCount} ${this.noun}</span>
        <zds-divider></zds-divider>
        <zds-caret-indicator ?open=${this.open} direction="vertical" size="medium"></zds-caret-indicator>
      </button>
      <div id="replies" class="replies" ?hidden=${!this.open}><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-thread": ZdsChatThread }
}
