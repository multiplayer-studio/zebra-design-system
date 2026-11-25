var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ZdsChatThread = class ZdsChatThread extends LitElement {
    constructor() {
        super(...arguments);
        this.replyCount = 0;
        this.open = false;
        this.repliesLabel = "replies";
        /** The word after a count of one. */
        this.replyLabel = "reply";
    }
    get noun() { return this.replyCount === 1 ? this.replyLabel : this.repliesLabel; }
    toggle() {
        this.open = !this.open;
        this.dispatchEvent(new CustomEvent("zds-toggle", { detail: { open: this.open }, bubbles: true, composed: true }));
    }
    render() {
        return html `<button type="button" aria-expanded=${String(this.open)} aria-controls="replies"
        aria-label=${`${this.replyCount} ${this.noun}`} @click=${() => this.toggle()}>
        <span class="count" aria-hidden="true">${this.replyCount} ${this.noun}</span>
        <zds-divider></zds-divider>
        <zds-caret-indicator ?open=${this.open} direction="vertical" size="medium"></zds-caret-indicator>
      </button>
      <div id="replies" class="replies" ?hidden=${!this.open}><slot></slot></div>`;
    }
};
ZdsChatThread.styles = styles;
__decorate([
    property({ type: Number, attribute: "reply-count" })
], ZdsChatThread.prototype, "replyCount", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsChatThread.prototype, "open", void 0);
__decorate([
    property({ type: String, attribute: "replies-label" })
], ZdsChatThread.prototype, "repliesLabel", void 0);
__decorate([
    property({ type: String, attribute: "reply-label" })
], ZdsChatThread.prototype, "replyLabel", void 0);
ZdsChatThread = __decorate([
    customElement("zds-chat-thread")
], ZdsChatThread);
export { ZdsChatThread };
