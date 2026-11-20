var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ZdsChatLoadingIndicator = class ZdsChatLoadingIndicator extends LitElement {
    constructor() {
        super(...arguments);
        this.label = "Thinking";
        this.rounded = true;
    }
    connectedCallback() { super.connectedCallback(); this.setAttribute("role", "status"); }
    render() {
        return html `<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span><span class="label">${this.label}</span>`;
    }
};
ZdsChatLoadingIndicator.styles = styles;
__decorate([
    property({ type: String })
], ZdsChatLoadingIndicator.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsChatLoadingIndicator.prototype, "rounded", void 0);
ZdsChatLoadingIndicator = __decorate([
    customElement("zds-chat-loading-indicator")
], ZdsChatLoadingIndicator);
export { ZdsChatLoadingIndicator };
