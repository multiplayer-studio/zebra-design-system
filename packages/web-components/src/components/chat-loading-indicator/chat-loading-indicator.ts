import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./chat-loading-indicator.styles.js";

/**
 * Stands in while the assistant or someone else produces a reply: three
 * pulsing dots and a short present-tense label (Thinking, Typing). Both stop
 * under reduced motion.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-loading-indicator")
export class ZdsChatLoadingIndicator extends LitElement {
  static styles = styles;
  @property({ type: String }) label = "Thinking";
  @property({ type: Boolean, reflect: true }) rounded = true;
  connectedCallback() { super.connectedCallback(); this.setAttribute("role", "status"); }
  protected render() {
    return html`<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span><span class="label">${this.label}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-loading-indicator": ZdsChatLoadingIndicator }
}
