var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ZdsNavigationHeader_onAction;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { headerStyles } from "./navigation-rail.styles.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
/**
 * The top of a Navigation Rail: an avatar or logo mark, and in the wide form
 * a title and a settings action. Inside zds-navigation-rail the rail sets
 * `expanded` and `shape`.
 *
 * @fires zds-action - The settings action was pressed.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Navigation Header)
 */
let ZdsNavigationHeader = class ZdsNavigationHeader extends LitElement {
    constructor() {
        super(...arguments);
        /** The mark: the user's Avatar, or the `zebra` logo glyph. */
        this.type = "avatar";
        /** The wide form, with title and action. */
        this.expanded = true;
        /** The product or user name beside the mark (called `heading`, since `title` is the native tooltip), in the wide form. */
        this.heading = "Title";
        /** Shows the title (wide form only). */
        this.showTitle = true;
        /** Shows the trailing Icon Button (wide form only). */
        this.showIconButton = true;
        /** The trailing Icon Button's glyph. Settings by default; set any icon, with `action-label` to match. */
        this.actionIcon = "settings";
        /** Accessible name of the action. */
        this.actionLabel = "Settings";
        /** The settings Icon Button's shape. Inside a zds-navigation-rail the rail's `shape` sets it. */
        this.shape = "rounded";
        /** Avatar initials (type=avatar). */
        this.avatarInitials = "ZB";
        /** Avatar photo (type=avatar). */
        this.avatarSrc = null;
        _ZdsNavigationHeader_onAction.set(this, () => {
            this.dispatchEvent(new CustomEvent("zds-action", { bubbles: true, composed: true }));
        });
    }
    render() {
        return html `
      <div class="brand">
        ${this.type === "avatar"
            ? html `<!-- Avatar Size=small, status on, ring and close off (spec). -->
              <zds-avatar
                size="small"
                type=${this.avatarSrc ? "photo" : "initials"}
                .src=${this.avatarSrc}
                .initials=${this.avatarInitials}
                .alt=${this.heading}
                .showStatus=${true}
                .showRing=${false}
                .showClose=${false}
              ></zds-avatar>`
            : html `<!-- Icon Size=large, Framed (spec: height control/target-min). -->
              <zds-icon class="logo" name="zebra" size="large" framed .label=${this.expanded ? null : this.heading}></zds-icon>`}
        ${this.expanded && this.showTitle ? html `<span part="title" class="title">${this.heading}</span>` : nothing}
      </div>
      ${this.expanded && this.showIconButton
            ? // Figma pins Shape=sharp; the rail's shape sets it (owner decision).
                html `<zds-icon-button flavour="subtle" size="small" shape=${this.shape} icon=${this.actionIcon} label=${this.actionLabel} @click=${__classPrivateFieldGet(this, _ZdsNavigationHeader_onAction, "f")}></zds-icon-button>`
            : nothing}
    `;
    }
};
_ZdsNavigationHeader_onAction = new WeakMap();
ZdsNavigationHeader.styles = headerStyles;
__decorate([
    property({ type: String, reflect: true })
], ZdsNavigationHeader.prototype, "type", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationHeader.prototype, "expanded", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationHeader.prototype, "heading", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-title" })
], ZdsNavigationHeader.prototype, "showTitle", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-icon-button" })
], ZdsNavigationHeader.prototype, "showIconButton", void 0);
__decorate([
    property({ type: String, attribute: "action-icon" })
], ZdsNavigationHeader.prototype, "actionIcon", void 0);
__decorate([
    property({ type: String, attribute: "action-label" })
], ZdsNavigationHeader.prototype, "actionLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsNavigationHeader.prototype, "shape", void 0);
__decorate([
    property({ type: String, attribute: "avatar-initials" })
], ZdsNavigationHeader.prototype, "avatarInitials", void 0);
__decorate([
    property({ type: String, attribute: "avatar-src" })
], ZdsNavigationHeader.prototype, "avatarSrc", void 0);
ZdsNavigationHeader = __decorate([
    customElement("zds-navigation-header")
], ZdsNavigationHeader);
export { ZdsNavigationHeader };
