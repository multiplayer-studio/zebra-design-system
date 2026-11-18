var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ZetaChatBubble = class ZetaChatBubble extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** fill: a tinted bubble; none: plain text. */
        this.bubbleStyle = "fill";
        /** Position in a run of one sender's bubbles. */
        this.status = "single";
        /** The spec's Role, named so as not to collide with the ARIA role attribute. */
        this.roleName = "sender";
    }
    render() {
        return html `<slot></slot>`;
    }
    static { this.styles = [super.styles ?? [], bubbleStyles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaChatBubble.prototype, "bubbleStyle", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaChatBubble.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaChatBubble.prototype, "roleName", void 0);
ZetaChatBubble = __decorate([
    customElement("zeta-chat-bubble")
], ZetaChatBubble);
export { ZetaChatBubble };
/** The send time, formatted by the product.
 *
 * @slot - The time.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-24563
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
let ZetaChatTimestamp = class ZetaChatTimestamp extends LitElement {
    render() {
        return html `<slot></slot>`;
    }
    static { this.styles = [timestampStyles]; }
};
ZetaChatTimestamp = __decorate([
    customElement("zeta-chat-timestamp")
], ZetaChatTimestamp);
export { ZetaChatTimestamp };
/** Stands in while the assistant or someone else produces a reply: three pulsing dots and a short present-tense label.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19269
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
let ZetaChatLoadingIndicator = class ZetaChatLoadingIndicator extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** What is happening: Thinking, Typing. */
        this.label = "Thinking";
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.setAttribute("role", "status");
    }
    render() {
        return html `<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span><span class="label">${this.label}</span>`;
    }
    static { this.styles = [super.styles ?? [], loadingStyles]; }
};
__decorate([
    property({ type: String })
], ZetaChatLoadingIndicator.prototype, "label", void 0);
ZetaChatLoadingIndicator = __decorate([
    customElement("zeta-chat-loading-indicator")
], ZetaChatLoadingIndicator);
export { ZetaChatLoadingIndicator };
/** The bar of message actions: React, the Control Slot (Reply by default) and More. React and More are toggles; only
 * one of their panels is open at a time. Every control follows `rounded`.
 *
 * @slot - The Control Slot: extra actions. Reply when empty.
 * @event {CustomEvent} react - React pressed.
 * @event {CustomEvent} more - More pressed.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19258
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
let ZetaChatControls = class ZetaChatControls extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** fill: a floating bar; none: transparent (the assistant's). */
        this.controlsStyle = "fill";
        /** Shows the React toggle. */
        this.showReact = true;
        /** Shows the More toggle. */
        this.showMore = true;
        /** The reactions row is open. */
        this.reactOpen = false;
        /** The menu is open. */
        this.moreOpen = false;
        this.filled = false;
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.setAttribute("role", "toolbar");
    }
    fire(n) {
        this.dispatchEvent(new CustomEvent(n, { bubbles: true, composed: true }));
    }
    render() {
        const shape = this.rounded ? "rounded" : "sharp";
        return html `${this.showReact
            ? html `<zeta-icon-button
              flavor="text"
              size="small"
              shape=${shape}
              aria-label="Add reaction"
              ?data-pressed=${this.reactOpen}
              @click=${() => this.fire("react")}
              >happy</zeta-icon-button
            >`
            : nothing}<slot @slotchange=${(e) => (this.filled = e.target.assignedElements().length > 0)}></slot
      >${this.filled ? nothing : html `<zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Reply">reply</zeta-icon-button>`}${this.showMore
            ? html `<zeta-icon-button
              flavor="text"
              size="small"
              shape=${shape}
              aria-label="More actions"
              aria-haspopup="menu"
              ?data-pressed=${this.moreOpen}
              @click=${() => this.fire("more")}
              >more_horizontal</zeta-icon-button
            >`
            : nothing}`;
    }
    static { this.styles = [super.styles ?? [], controlsStyles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaChatControls.prototype, "controlsStyle", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatControls.prototype, "showReact", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatControls.prototype, "showMore", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatControls.prototype, "reactOpen", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatControls.prototype, "moreOpen", void 0);
__decorate([
    state()
], ZetaChatControls.prototype, "filled", void 0);
ZetaChatControls = __decorate([
    customElement("zeta-chat-controls")
], ZetaChatControls);
export { ZetaChatControls };
//# sourceMappingURL=chat-parts.js.map