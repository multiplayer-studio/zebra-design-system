var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./chat-bubble.styles.js";
/**
 * The text of a message. fill: a tinted bubble; none: plain text on the page.
 * `role-name` stands for the spec's Role (sender, receiver), named so as not
 * to collide with the ARIA `role` attribute.
 *
 * @slot - The message text.
 * @spec specs/chat-message/chat-message.spec.json
 */
let ZdsChatBubble = class ZdsChatBubble extends LitElement {
    constructor() {
        super(...arguments);
        this.bubbleStyle = "fill";
        /** Position in a run of one sender's bubbles. The corner toward the neighbour tightens. */
        this.status = "single";
        this.roleName = "sender";
        this.rounded = true;
    }
    render() { return html `<slot></slot>`; }
};
ZdsChatBubble.styles = styles;
__decorate([
    property({ type: String, reflect: true, attribute: "bubble-style" })
], ZdsChatBubble.prototype, "bubbleStyle", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsChatBubble.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "role-name" })
], ZdsChatBubble.prototype, "roleName", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsChatBubble.prototype, "rounded", void 0);
ZdsChatBubble = __decorate([
    customElement("zds-chat-bubble")
], ZdsChatBubble);
export { ZdsChatBubble };
