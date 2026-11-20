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
var _ZdsBreadcrumbItem_instances, _ZdsBreadcrumbItem_content, _ZdsBreadcrumbItem_crumb;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./breadcrumb-item.styles.js";
import "../icon/icon.js";
/**
 * One crumb in a `zds-breadcrumb`: an optional glyph, a label and the separator
 * after it. A link with `href`, otherwise a button for a click listener. The
 * breadcrumb sets `current` and `separator`, so neither needs setting by hand.
 *
 * @slot - The crumb's label.
 * @csspart crumb - The link, button or current page text.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.json (subcomponents._Breadcrumb Item)
 */
let ZdsBreadcrumbItem = class ZdsBreadcrumbItem extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsBreadcrumbItem_instances.add(this);
        /** Where the crumb goes. Without one it is a button. */
        this.href = null;
        /** A glyph before the label. */
        this.icon = null;
        /** The page a person is on. It is text, not a link, even with an `href`. */
        this.current = false;
        /** Shows the chevron after the crumb. */
        this.separator = false;
    }
    /** Activates the crumb, for the overflow menu's rows. */
    activate() {
        this.renderRoot.querySelector("a, button")?.click();
    }
    render() {
        return html `${__classPrivateFieldGet(this, _ZdsBreadcrumbItem_instances, "m", _ZdsBreadcrumbItem_crumb).call(this)}${this.separator ? html `<zds-icon class="separator" name="chevron-right" size="small"></zds-icon>` : nothing}`;
    }
};
_ZdsBreadcrumbItem_instances = new WeakSet();
_ZdsBreadcrumbItem_content = function _ZdsBreadcrumbItem_content() {
    return html `${this.icon ? html `<zds-icon class="icon" name=${this.icon} size="small"></zds-icon>` : nothing}<span><slot></slot></span>`;
};
_ZdsBreadcrumbItem_crumb = function _ZdsBreadcrumbItem_crumb() {
    if (this.current)
        return html `<span part="crumb" class="crumb" aria-current="page">${__classPrivateFieldGet(this, _ZdsBreadcrumbItem_instances, "m", _ZdsBreadcrumbItem_content).call(this)}</span>`;
    if (this.href)
        return html `<a part="crumb" class="crumb" href=${this.href}>${__classPrivateFieldGet(this, _ZdsBreadcrumbItem_instances, "m", _ZdsBreadcrumbItem_content).call(this)}</a>`;
    return html `<button part="crumb" class="crumb" type="button">${__classPrivateFieldGet(this, _ZdsBreadcrumbItem_instances, "m", _ZdsBreadcrumbItem_content).call(this)}</button>`;
};
ZdsBreadcrumbItem.styles = styles;
__decorate([
    property({ type: String })
], ZdsBreadcrumbItem.prototype, "href", void 0);
__decorate([
    property({ type: String })
], ZdsBreadcrumbItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsBreadcrumbItem.prototype, "current", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsBreadcrumbItem.prototype, "separator", void 0);
ZdsBreadcrumbItem = __decorate([
    customElement("zds-breadcrumb-item")
], ZdsBreadcrumbItem);
export { ZdsBreadcrumbItem };
