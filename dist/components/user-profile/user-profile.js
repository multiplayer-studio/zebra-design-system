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
var _ZdsUserProfile_instances, _ZdsUserProfile_sizeAvatar;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./user-profile.styles.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
/**
 * The account control in a Global Header: a username, an avatar and a chevron
 * on a neutral ground. It is the header's dropdown trigger, so it reports
 * `aria-haspopup`, and `expanded` when the header passes it on.
 *
 * @slot avatar - A zds-avatar to show in place of the default, carrying any
 *   avatar property (type, icon, swatch-color, status…); its size stays xxsmall.
 *
 * Figma fixes the username and avatar as sample content; both are inputs here
 * (spec issue).
 *
 * @csspart control - The `<button>`.
 * @spec specs/global-header/global-header.spec.json
 */
let ZdsUserProfile = class ZdsUserProfile extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsUserProfile_instances.add(this);
        /** The person's name. */
        this.username = "Username";
        /** Avatar photo. Without it the avatar shows `initials`. */
        this.avatarSrc = null;
        /** Avatar initials, used when there is no photo. */
        this.initials = null;
        /** Softens the control's corners. */
        this.rounded = false;
        this.disabled = false;
        /** Whether the menu it opens is showing. */
        this.expanded = false;
    }
    render() {
        return html `
      <button
        part="control"
        class="control"
        type="button"
        ?disabled=${this.disabled}
        aria-haspopup="menu"
        aria-expanded=${this.expanded ? "true" : "false"}
      >
        <span class="username">${this.username}</span>
        <slot name="avatar" @slotchange=${__classPrivateFieldGet(this, _ZdsUserProfile_instances, "m", _ZdsUserProfile_sizeAvatar)}>
          <zds-avatar
            size="xxsmall"
            type=${this.avatarSrc ? "photo" : "initials"}
            src=${this.avatarSrc ?? nothing}
            initials=${this.initials ?? nothing}
            alt=""
            .showClose=${false}
            .showStatus=${false}
            .showRing=${false}
          ></zds-avatar>
        </slot>
        <zds-icon name="expand-more" size="small"></zds-icon>
      </button>
    `;
    }
};
_ZdsUserProfile_instances = new WeakSet();
_ZdsUserProfile_sizeAvatar = function _ZdsUserProfile_sizeAvatar(e) {
    for (const el of e.target.assignedElements({ flatten: true })) {
        if (el.localName === "zds-avatar")
            el.setAttribute("size", "xxsmall");
    }
};
ZdsUserProfile.styles = styles;
ZdsUserProfile.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: String })
], ZdsUserProfile.prototype, "username", void 0);
__decorate([
    property({ type: String, attribute: "avatar-src" })
], ZdsUserProfile.prototype, "avatarSrc", void 0);
__decorate([
    property({ type: String })
], ZdsUserProfile.prototype, "initials", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsUserProfile.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsUserProfile.prototype, "disabled", void 0);
__decorate([
    property({ attribute: false })
], ZdsUserProfile.prototype, "expanded", void 0);
ZdsUserProfile = __decorate([
    customElement("zds-user-profile")
], ZdsUserProfile);
export { ZdsUserProfile };
