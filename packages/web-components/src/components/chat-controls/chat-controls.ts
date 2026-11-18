import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./chat-controls.styles.js";
import "../icon-button/icon-button.js";

/**
 * The bar of message actions: React, the Control Slot (Reply by default)
 * and More. React and More are toggles; only one of their panels is open at
 * a time. Every control follows `rounded` (spec issue: Figma mixes shapes).
 *
 * @slot - The Control Slot: extra actions (zds-icon-button, size small, flavour text). Reply when empty.
 * @slot more - Wraps the More control, e.g. a zds-dropdown holding it.
 * @fires zds-react - React pressed.
 * @fires zds-more - More pressed.
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-controls")
export class ZdsChatControls extends LitElement {
  static styles = styles;
  @property({ type: String, reflect: true, attribute: "controls-style" }) controlsStyle: "fill" | "none" = "fill";
  @property({ type: Boolean, reflect: true }) rounded = true;
  @property({ type: Boolean, attribute: "show-react" }) showReact = true;
  @property({ type: Boolean, attribute: "show-more" }) showMore = true;
  @property({ type: Boolean, attribute: "react-open" }) reactOpen = false;
  @property({ type: Boolean, attribute: "more-open" }) moreOpen = false;
  @property({ type: String, attribute: "react-label" }) reactLabel = "Add reaction";
  @property({ type: String, attribute: "reply-label" }) replyLabel = "Reply";
  @property({ type: String, attribute: "more-label" }) moreLabel = "More actions";
  @state() private filled = false;

  connectedCallback() { super.connectedCallback(); this.setAttribute("role", "toolbar"); }
  private fire(n: string) { this.dispatchEvent(new CustomEvent(n, { bubbles: true, composed: true })); }

  protected render() {
    const shape = this.rounded ? "rounded" : "sharp";
    return html`
      ${this.showReact ? html`<zds-icon-button flavour="text" size="small" shape=${shape} icon="happy" label=${this.reactLabel}
        ?data-pressed=${this.reactOpen} @click=${() => this.fire("zds-react")}></zds-icon-button>` : nothing}
      <slot @slotchange=${(e: Event) => (this.filled = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot>
      ${this.filled ? nothing : html`<zds-icon-button flavour="text" size="small" shape=${shape} icon="reply" label=${this.replyLabel}></zds-icon-button>`}
      ${this.showMore ? html`<slot name="more"><zds-icon-button flavour="text" size="small" shape=${shape} icon="more-horizontal"
        label=${this.moreLabel} ?data-pressed=${this.moreOpen} @click=${() => this.fire("zds-more")}></zds-icon-button></slot>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-controls": ZdsChatControls }
}
