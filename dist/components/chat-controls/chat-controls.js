var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ZdsChatControls = class ZdsChatControls extends LitElement {
    constructor() {
        super(...arguments);
        this.controlsStyle = "fill";
        this.rounded = true;
        this.showReact = true;
        this.showMore = true;
        this.reactOpen = false;
        this.moreOpen = false;
        this.reactLabel = "Add reaction";
        this.replyLabel = "Reply";
        this.moreLabel = "More actions";
        this.filled = false;
    }
    connectedCallback() { super.connectedCallback(); this.setAttribute("role", "toolbar"); }
    fire(n) { this.dispatchEvent(new CustomEvent(n, { bubbles: true, composed: true })); }
    render() {
        const shape = this.rounded ? "rounded" : "sharp";
        return html `
      ${this.showReact ? html `<zds-icon-button flavour="text" size="small" shape=${shape} icon="happy" label=${this.reactLabel}
        ?data-pressed=${this.reactOpen} @click=${() => this.fire("zds-react")}></zds-icon-button>` : nothing}
      <slot @slotchange=${(e) => (this.filled = e.target.assignedElements().length > 0)}></slot>
      ${this.filled ? nothing : html `<zds-icon-button flavour="text" size="small" shape=${shape} icon="reply" label=${this.replyLabel}></zds-icon-button>`}
      ${this.showMore ? html `<slot name="more"><zds-icon-button flavour="text" size="small" shape=${shape} icon="more-horizontal"
        label=${this.moreLabel} ?data-pressed=${this.moreOpen} @click=${() => this.fire("zds-more")}></zds-icon-button></slot>` : nothing}`;
    }
};
ZdsChatControls.styles = styles;
__decorate([
    property({ type: String, reflect: true, attribute: "controls-style" })
], ZdsChatControls.prototype, "controlsStyle", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsChatControls.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-react" })
], ZdsChatControls.prototype, "showReact", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-more" })
], ZdsChatControls.prototype, "showMore", void 0);
__decorate([
    property({ type: Boolean, attribute: "react-open" })
], ZdsChatControls.prototype, "reactOpen", void 0);
__decorate([
    property({ type: Boolean, attribute: "more-open" })
], ZdsChatControls.prototype, "moreOpen", void 0);
__decorate([
    property({ type: String, attribute: "react-label" })
], ZdsChatControls.prototype, "reactLabel", void 0);
__decorate([
    property({ type: String, attribute: "reply-label" })
], ZdsChatControls.prototype, "replyLabel", void 0);
__decorate([
    property({ type: String, attribute: "more-label" })
], ZdsChatControls.prototype, "moreLabel", void 0);
__decorate([
    state()
], ZdsChatControls.prototype, "filled", void 0);
ZdsChatControls = __decorate([
    customElement("zds-chat-controls")
], ZdsChatControls);
export { ZdsChatControls };
