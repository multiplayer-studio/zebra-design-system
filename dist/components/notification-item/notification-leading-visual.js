var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import styles from "./notification-leading-visual.styles.js";
/**
 * The private `_Leading Visual` part of `<zds-notification-item>`: a circular
 * control/sm slot holding an Avatar, an image or an Icon. Registered by the
 * item and not exported from the package — the flavour is chosen through the
 * item's `leading`.
 *
 * Decorative in all three flavours (spec accessibility: it carries no text),
 * so the item's heading has to name the source.
 *
 * Spec: specs/notification-item/notification-item.spec.json (subcomponents)
 */
let ZdsNotificationLeadingVisual = class ZdsNotificationLeadingVisual extends LitElement {
    constructor() {
        super(...arguments);
        this.flavour = "avatar";
        /** avatar: the photo (initials are shown without one). image: the artwork. */
        this.src = null;
        /** avatar: shown when there is no `src`. */
        this.initials = null;
        /** icon: the glyph. */
        this.icon = "verified";
    }
    updated() {
        this.setAttribute("aria-hidden", "true");
        // The artwork is the slot's own background (spec: "a background rather
        // than a separate element"). A content URL, not a themed value.
        if (this.flavour === "image" && this.src)
            this.style.backgroundImage = `url("${this.src}")`;
        else
            this.style.removeProperty("background-image");
    }
    render() {
        if (this.flavour === "avatar") {
            return html `<zds-avatar
        size="xxsmall"
        type=${this.src ? "photo" : "initials"}
        src=${this.src ?? nothing}
        .initials=${this.initials}
        alt=""
        .showStatus=${false}
        .showRing=${false}
        .showClose=${false}
      ></zds-avatar>`;
        }
        // Family pinned to rounded: the `shape` token is a string no component
        // can read from CSS yet (same as zds-icon-indicator).
        if (this.flavour === "icon")
            return html `<zds-icon name=${this.icon} size="medium" .iconStyle=${"rounded"}></zds-icon>`;
        return nothing;
    }
};
ZdsNotificationLeadingVisual.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsNotificationLeadingVisual.prototype, "flavour", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationLeadingVisual.prototype, "src", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationLeadingVisual.prototype, "initials", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationLeadingVisual.prototype, "icon", void 0);
ZdsNotificationLeadingVisual = __decorate([
    customElement("zds-notification-leading-visual")
], ZdsNotificationLeadingVisual);
export { ZdsNotificationLeadingVisual };
