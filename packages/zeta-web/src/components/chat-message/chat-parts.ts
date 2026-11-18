import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import bubbleStyles from "./chat-bubble.styles.js";
import timestampStyles from "./chat-timestamp.styles.js";
import loadingStyles from "./chat-loading-indicator.styles.js";
import controlsStyles from "./chat-controls.styles.js";
import "../button/icon-button/icon-button.js";

/** The text of a message. fill: a tinted bubble that wraps at 80% of the chat; none: plain text on the page. In a run
 * the corner toward the neighbour tightens.
 *
 * @slot - The message text.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19217
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
@customElement("zeta-chat-bubble")
export class ZetaChatBubble extends Contourable(LitElement) {
  /** fill: a tinted bubble; none: plain text. */
  @property({ type: String, reflect: true }) bubbleStyle: "fill" | "none" = "fill";

  /** Position in a run of one sender's bubbles. */
  @property({ type: String, reflect: true }) status: "single" | "first" | "middle" | "last" = "single";

  /** The spec's Role, named so as not to collide with the ARIA role attribute. */
  @property({ type: String, reflect: true }) roleName: "sender" | "receiver" = "sender";

  protected render() {
    return html`<slot></slot>`;
  }

  static styles = [super.styles ?? [], bubbleStyles];
}

/** The send time, formatted by the product.
 *
 * @slot - The time.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-24563
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
@customElement("zeta-chat-timestamp")
export class ZetaChatTimestamp extends LitElement {
  protected render() {
    return html`<slot></slot>`;
  }

  static styles = [timestampStyles];
}

/** Stands in while the assistant or someone else produces a reply: three pulsing dots and a short present-tense label.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19269
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
@customElement("zeta-chat-loading-indicator")
export class ZetaChatLoadingIndicator extends Contourable(LitElement) {
  /** What is happening: Thinking, Typing. */
  @property({ type: String }) label = "Thinking";

  connectedCallback() {
    super.connectedCallback?.();
    this.setAttribute("role", "status");
  }

  protected render() {
    return html`<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span><span class="label">${this.label}</span>`;
  }

  static styles = [super.styles ?? [], loadingStyles];
}

/** The bar of message actions: React, the Control Slot (Reply by default) and More. React and More are toggles; only
 * one of their panels is open at a time. Every control follows `rounded`.
 *
 * @slot - The Control Slot: extra actions. Reply when empty.
 * @event {CustomEvent} react - React pressed.
 * @event {CustomEvent} more - More pressed.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19258
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
@customElement("zeta-chat-controls")
export class ZetaChatControls extends Contourable(LitElement) {
  /** fill: a floating bar; none: transparent (the assistant's). */
  @property({ type: String, reflect: true }) controlsStyle: "fill" | "none" = "fill";

  /** Shows the React toggle. */
  @property({ type: Boolean }) showReact = true;

  /** Shows the More toggle. */
  @property({ type: Boolean }) showMore = true;

  /** The reactions row is open. */
  @property({ type: Boolean }) reactOpen = false;

  /** The menu is open. */
  @property({ type: Boolean }) moreOpen = false;

  @state() private filled = false;

  connectedCallback() {
    super.connectedCallback?.();
    this.setAttribute("role", "toolbar");
  }

  private fire(n: string) {
    this.dispatchEvent(new CustomEvent(n, { bubbles: true, composed: true }));
  }

  protected render() {
    const shape = this.rounded ? "rounded" : "sharp";
    return html`${
        this.showReact
          ? html`<zeta-icon-button
              flavor="text"
              size="small"
              shape=${shape}
              aria-label="Add reaction"
              ?data-pressed=${this.reactOpen}
              @click=${() => this.fire("react")}
              >happy</zeta-icon-button
            >`
          : nothing
      }<slot @slotchange=${(e: Event) => (this.filled = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot
      >${this.filled ? nothing : html`<zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Reply">reply</zeta-icon-button>`}${
        this.showMore
          ? html`<zeta-icon-button
              flavor="text"
              size="small"
              shape=${shape}
              aria-label="More actions"
              aria-haspopup="menu"
              ?data-pressed=${this.moreOpen}
              @click=${() => this.fire("more")}
              >more_horizontal</zeta-icon-button
            >`
          : nothing
      }`;
  }

  static styles = [super.styles ?? [], controlsStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-chat-bubble": ZetaChatBubble;
    "zeta-chat-timestamp": ZetaChatTimestamp;
    "zeta-chat-loading-indicator": ZetaChatLoadingIndicator;
    "zeta-chat-controls": ZetaChatControls;
  }
}
