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
var _ZdsNavigationRailItem_guard;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-rail-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
/**
 * A single destination in a Navigation Rail: a glyph in a square target, or
 * glyph and label on one row in the wide form.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `selected` sets `aria-current="page"`. Focus is delegated to that element.
 * Inside `<zds-navigation-rail>` the rail sets `expanded`, `show-label` and
 * `shape`.
 *
 * Hover and pressed scrims are the ghost tokens alone (spec warn "Double
 * alpha": Figma stacks a paint opacity on already-translucent tokens).
 * Figma's `Collapsible` boolean is wired to nothing and has no caret — it is
 * dropped; a group that expands is a zds-collapsible-menu-item.
 *
 * Kept in step with React `<NavigationRailItem>`.
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/navigation-rail-item/navigation-rail-item.spec.json
 */
let ZdsNavigationRailItem = class ZdsNavigationRailItem extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The destination's name. Always the accessible name; shown beside the
         * glyph in the wide form and under it in the narrow form when `show-label`.
         */
        this.label = "Label";
        /** The glyph. Figma ships a `star` placeholder — swap it on every item. */
        this.icon = "star";
        /**
         * The destination the user is on: sets `aria-current="page"` and recolours
         * glyph and label (no scrim). Figma's State=selected. Exactly one item
         * across the rail and its panel should carry it; nothing enforces that.
         */
        this.selected = false;
        /**
         * Unavailable. A link loses its `href` and gets `aria-disabled`; a button
         * gets `disabled`. Disabled wins over `selected`.
         */
        this.disabled = false;
        /** The wide form: glyph and label on one row. Inside a rail, the rail sets it. */
        this.expanded = false;
        /** Caption under the glyph in the narrow form. Inside a rail, the rail's `show-labels` sets it. */
        this.showLabel = false;
        /**
         * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
         * zds-navigation-rail the rail's `shape` sets it.
         */
        this.shape = "rounded";
        /** Shows the glyph (and the badge anchored to it). Keep it on in the narrow form. */
        this.showIcon = true;
        /** The Badges-page Notification Indicator dot (Size=small) over the glyph's top-right corner. */
        this.badge = false;
        /** Text equivalent of the badge, appended (visually hidden) to the accessible name. */
        this.badgeLabel = null;
        /**
         * Makes the item a disclosure toggle: its button carries `aria-expanded`
         * with this value. The rail's own toggle item uses it.
         */
        this.toggleExpanded = null;
        /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
        this.href = null;
        this.target = null;
        this.rel = null;
        /** A disabled link must not fire click listeners on the host. */
        _ZdsNavigationRailItem_guard.set(this, (e) => {
            if (this.disabled) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }
    render() {
        const isSelected = this.selected && !this.disabled;
        const captionVisible = this.expanded || this.showLabel;
        const content = html `
      ${this.showIcon
            ? html `<span class="icon" aria-hidden="true">
            <!-- Icon pinned to Size=small, Framed off (spec); colour is currentColor. -->
            <zds-icon name=${this.icon} size="small"></zds-icon>
            ${this.badge ? html `<zds-notification-indicator class="badge" size="small"></zds-notification-indicator>` : nothing}
          </span>`
            : nothing}
      <span part="label" class=${captionVisible ? "label" : "sr"}>${this.label}</span>
      ${this.badge && this.badgeLabel ? html `<span class="sr">, ${this.badgeLabel}</span>` : nothing}
    `;
        const current = isSelected ? "page" : nothing;
        const title = captionVisible ? nothing : this.label;
        const d = (b) => (b ? "" : nothing);
        if (this.href !== null) {
            return html `<a
        part="item"
        class="item"
        href=${this.disabled ? nothing : this.href}
        target=${this.target ?? nothing}
        rel=${this.rel ?? nothing}
        title=${title}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${current}
        data-expanded=${d(this.expanded)}
        data-show-label=${d(this.showLabel)}
        data-shape=${this.shape}
        data-selected=${d(isSelected)}
        data-disabled=${d(this.disabled)}
        @click=${__classPrivateFieldGet(this, _ZdsNavigationRailItem_guard, "f")}
      >${content}</a>`;
        }
        return html `<button
      part="item"
      class="item"
      type="button"
      title=${title}
      ?disabled=${this.disabled}
      aria-current=${current}
      aria-expanded=${this.toggleExpanded === null ? nothing : String(this.toggleExpanded)}
      data-expanded=${d(this.expanded)}
      data-show-label=${d(this.showLabel)}
      data-shape=${this.shape}
      data-selected=${d(isSelected)}
      data-disabled=${d(this.disabled)}
    >${content}</button>`;
    }
};
_ZdsNavigationRailItem_guard = new WeakMap();
ZdsNavigationRailItem.styles = styles;
ZdsNavigationRailItem.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: String })
], ZdsNavigationRailItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationRailItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationRailItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationRailItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationRailItem.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-label" })
], ZdsNavigationRailItem.prototype, "showLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsNavigationRailItem.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-icon" })
], ZdsNavigationRailItem.prototype, "showIcon", void 0);
__decorate([
    property({ type: Boolean })
], ZdsNavigationRailItem.prototype, "badge", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZdsNavigationRailItem.prototype, "badgeLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "toggle-expanded" })
], ZdsNavigationRailItem.prototype, "toggleExpanded", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationRailItem.prototype, "href", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationRailItem.prototype, "target", void 0);
__decorate([
    property({ type: String })
], ZdsNavigationRailItem.prototype, "rel", void 0);
ZdsNavigationRailItem = __decorate([
    customElement("zds-navigation-rail-item")
], ZdsNavigationRailItem);
export { ZdsNavigationRailItem };
