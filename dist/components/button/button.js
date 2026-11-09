var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./button.styles.js";
import "../icon/icon.js";
/**
 * Triggers an action from a text label, with optional icons on either side.
 *
 * Eleven flavours set how much weight the action carries, three sizes and three shapes fit it to the surface it sits on. The label is the only content a
 * consumer writes, everything else is a variant choice. When an action has no
 * text label, reach for Icon Button rather than hiding this one's label.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the button and everything beside it.
 *
 * @slot - The label. A verb phrase naming the action.
 * @part button - The button element.
 *
 * @spec specs/button/button.spec.json
 */
let ZdsButton = class ZdsButton extends LitElement {
    constructor() {
        super(...arguments);
        /** How much weight the action carries. */
        this.flavour = "primary";
        /** Fits the control to the surface it sits on. Drives height, padding, type ramp and icon size together. */
        this.size = "medium";
        /** Corner treatment. Match the container; don't mix shapes inside one group. */
        this.shape = "rounded";
        /** The action is unavailable. Say why nearby — a disabled control with no explanation is indistinguishable from a broken one. */
        this.disabled = false;
        /** Icon before the label. Reinforces the action at a glance. */
        this.leadingIcon = null;
        /** Icon after the label. Use for directional or disclosure actions. */
        this.trailingIcon = null;
        /** Native button type, forwarded to the inner element. */
        this.type = "button";
    }
    render() {
        // The icon follows the button's shape: only shape="sharp" takes the sharp
        // family. Button pins this rather than exposing it.
        const iconStyle = this.shape === "sharp" ? "sharp" : "rounded";
        // Icon's size axis has no "large" consumer here: medium and large buttons
        // both use the medium icon (see the icon spec's own size note).
        const iconSize = this.size === "small" ? "small" : "medium";
        return html `
      <button part="button" type=${this.type} ?disabled=${this.disabled}>
        ${this.leadingIcon
            ? html `<zds-icon class="icon" name=${this.leadingIcon} .iconStyle=${iconStyle} size=${iconSize}></zds-icon>`
            : nothing}
        <span class="label"><slot></slot></span>
        ${this.trailingIcon
            ? html `<zds-icon class="icon" name=${this.trailingIcon} .iconStyle=${iconStyle} size=${iconSize}></zds-icon>`
            : nothing}
      </button>
    `;
    }
};
ZdsButton.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsButton.prototype, "flavour", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsButton.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsButton.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsButton.prototype, "disabled", void 0);
__decorate([
    property({ type: String, attribute: "leading-icon" })
], ZdsButton.prototype, "leadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "trailing-icon" })
], ZdsButton.prototype, "trailingIcon", void 0);
__decorate([
    property({ type: String })
], ZdsButton.prototype, "type", void 0);
ZdsButton = __decorate([
    customElement("zds-button")
], ZdsButton);
export { ZdsButton };
