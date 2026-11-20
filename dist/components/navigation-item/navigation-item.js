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
var _ZdsNavigationItem_guard;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
function badgeParts(badge) {
    if (badge === true)
        return { size: "small" };
    if (badge === false || badge === null || badge === undefined || badge === "" || badge === 0)
        return null;
    const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
    return { size: value.length > 1 ? "large" : "medium", value };
}
/**
 * A single destination inside a Navigation Bar: an icon above a label, with
 * an optional badge.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `active` sets `aria-current="page"`. Focus is delegated to that element, so
 * `item.focus()` and Tab land on it. Inside `<zds-navigation-bar>` the bar
 * gives the host `role="listitem"`.
 *
 * Hover, pressed and focus are not in Figma (spec issue); they come from the
 * ghost interactive tokens, like a ghost Button. The icon takes the label's
 * colour via currentColor in every state (spec issue: Figma's icon bindings
 * disagree with the label's).
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/navigation-item/navigation-item.spec.json
 */
let ZdsNavigationItem = class ZdsNavigationItem extends LitElement {
    constructor() {
        super(...arguments);
        /** The destination's name, and the only text on the item. One or two words. */
        this.label = "Label";
        /** Glyph above the label. Figma ships a `star` placeholder — swap it on every item. */
        this.icon = "star";
        /**
         * The destination the user is on: sets `aria-current="page"`. Exactly one
         * item in a bar should carry it; nothing enforces that.
         */
        this.active = false;
        /**
         * The destination is unavailable. A link loses its `href` and gets
         * `aria-disabled`; a button gets the native `disabled`. Figma offers it on
         * inactive items only — when both are set, disabled wins and `active` is
         * ignored (spec issue: no active+disabled variant).
         */
        this.disabled = false;
        /**
         * A Notification Indicator over the icon's top-right corner. `true` (bare
         * attribute) is the dot, Figma's pinned Size=small; a count shows the
         * number — medium for one character, large for more, capped at "99+".
         */
        this.badge = null;
        /**
         * Text equivalent of the badge, appended (visually hidden) to the item's
         * accessible name, e.g. "3 unread". Defaults to the count itself; a dot
         * badge has none unless you give one.
         */
        this.badgeLabel = null;
        /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
        this.href = null;
        /** Link target, when `href` is set. */
        this.target = null;
        /** Link rel, when `href` is set. */
        this.rel = null;
        /** A disabled item must not fire click listeners on the host. */
        _ZdsNavigationItem_guard.set(this, (e) => {
            if (this.disabled) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }
    render() {
        const isActive = this.active && !this.disabled;
        const b = badgeParts(this.badge);
        const srText = b ? (this.badgeLabel ?? b.value) : undefined;
        const content = html `
      <span class="icon" aria-hidden="true">
        <!-- Icon pinned to Size=medium, Framed off (spec); colour is currentColor. -->
        <zds-icon name=${this.icon} size="medium"></zds-icon>
        ${b
            ? html `<zds-notification-indicator class="badge" size=${b.size} .value=${b.value ?? ""}></zds-notification-indicator>`
            : nothing}
      </span>
      <span part="label" class="label">${this.label}</span>
      ${srText ? html `<span class="sr">, ${srText}</span>` : nothing}
    `;
        const current = isActive ? "page" : nothing;
        if (this.href !== null) {
            return html `<a
        part="item"
        class="item"
        href=${this.disabled ? nothing : this.href}
        target=${this.target ?? nothing}
        rel=${this.rel ?? nothing}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${current}
        @click=${__classPrivateFieldGet(this, _ZdsNavigationItem_guard, "f")}
      >${content}</a>`;
        }
        return html `<button part="item" class="item" type="button" ?disabled=${this.disabled} aria-current=${current}>
      ${content}
    </button>`;
    }
};
_ZdsNavigationItem_guard = new WeakMap();
ZdsNavigationItem.styles = styles;
ZdsNavigationItem.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: String })
], ZdsNavigationItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationItem.prototype, "disabled", void 0);
__decorate([
    property({
        converter: { fromAttribute: (v) => (v === null ? null : v === "" ? true : v) },
    })
], ZdsNavigationItem.prototype, "badge", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZdsNavigationItem.prototype, "badgeLabel", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationItem.prototype, "href", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationItem.prototype, "target", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationItem.prototype, "rel", void 0);
ZdsNavigationItem = __decorate([
    customElement("zds-navigation-item")
], ZdsNavigationItem);
export { ZdsNavigationItem };
