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
var _ZdsSubMenuItem_instances, _ZdsSubMenuItem_row, _ZdsSubMenuItem_guard;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sub-menu-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import "../caret-indicator/caret-indicator.js";
import "../tooltip/tooltip.js";
function badgeParts(badge) {
    if (badge === null || badge === undefined || badge === "" || badge === 0 || badge === "0")
        return null;
    const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
    return { size: value.length > 1 ? "large" : "medium", value };
}
/** @internal The row's inside, shared with zds-collapsible-menu-item's header. */
export function subMenuRowContent(o) {
    const b = badgeParts(o.badge);
    const sr = b ? (o.badgeLabel ?? b.value) : null;
    // Icon and Title: their own group at space/md, inside the row's space/sm
    // (spec warn "Gap": the bound tokens, not the metadata's single space/sm).
    return html `
    <span class="lead">
      ${o.showLeadingIcon ? html `<zds-icon class="icon" name=${o.icon} size="small"></zds-icon>` : nothing}
      <span part="label" class="label">${o.label}</span>
    </span>
    ${b ? html `<zds-notification-indicator class="badge" size=${b.size} .value=${b.value} aria-hidden="true"></zds-notification-indicator>` : nothing}
    ${sr ? html `<span class="sr">, ${sr}</span>` : nothing}
    ${o.caret ? html `<zds-caret-indicator class="caret" direction=${o.caret} ?open=${o.open} size="small"></zds-caret-indicator>` : nothing}
  `;
}
/** A label actually cut off by its ellipsis. Measured when asked, never observed. */
function isTruncated(el) {
    return !!el && el.scrollWidth > el.clientWidth;
}
/**
 * @internal The full label of a row (or a zds-collapsible-menu-item header), in a
 * zds-tooltip after a 3s hover — only when the label is truncated (owner
 * decision). `canOpen` measures the label at hover start, when the delay
 * ends and on keyboard focus, so a resize or a label change is always
 * current. `no-describe`: the bubble repeats the row's own accessible name.
 * The bubble stays in this shadow tree, so it inherits the rail's mode.
 */
export function truncatedLabelTooltip(o) {
    const canOpen = () => isTruncated(o.root?.querySelector(`#${o.anchorId} .label`));
    return html `<zds-tooltip for=${o.anchorId} delay="3000" point="left" shape=${o.shape} no-describe .canOpen=${canOpen}>${o.label}</zds-tooltip>`;
}
/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an
 * optional counter badge and an optional caret.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `selected` sets `aria-current="page"`. Inside a zds-collapsible-menu-item
 * the group sets `nested`. A truncated label shows in full in a tooltip
 * after a 3s hover. Hover, pressed and selected fills are the ghost
 * tokens alone (spec warn "Double alpha"). Kept in step with React
 * `<SubMenuItem>`.
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/sub-menu-item/sub-menu-item.spec.json
 */
let ZdsSubMenuItem = class ZdsSubMenuItem extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsSubMenuItem_instances.add(this);
        /** The row's name. One line; a long name is end-truncated. */
        this.label = "Label";
        /** Leading glyph. Figma ships a `verified` placeholder — swap it. */
        this.icon = "verified";
        /** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
        this.showLeadingIcon = true;
        /** The row the user is on: `aria-current="page"`, the selected ghost fill and label colour. */
        this.selected = false;
        /** Unavailable. Disabled wins over `selected`. */
        this.disabled = false;
        /** A child row under a collapsible group: indented, quieter label, smaller type. Set by the group. */
        this.nested = false;
        /**
         * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
         * zds-navigation-rail the rail's `shape` sets it, inside a
         * zds-collapsible-menu-item the group's.
         */
        this.shape = "rounded";
        /**
         * The Badges-page Notification Indicator counter, in the row's layout.
         * Its visibility depends on this alone (spec warn: Figma also hides it with
         * the leading icon). Not Figma's drifted copy (2837:1489).
         */
        this.badge = null;
        /** Text equivalent of the badge in the accessible name. Defaults to the count. */
        this.badgeLabel = null;
        /**
         * Shows the trailing `chevron-right` caret: a row that opens a further
         * level. Figma defaults it on; here it defaults off, because the spec's own
         * usage says a caret on a row that opens nothing "promises a level that is
         * not there".
         */
        this.subMenu = false;
        /** Turns the caret (90°) while the level it opens is showing. */
        this.open = false;
        /** Renders an `<a>`. Without it the row is a `<button type="button">`. */
        this.href = null;
        this.target = null;
        this.rel = null;
        _ZdsSubMenuItem_guard.set(this, (e) => {
            if (this.disabled) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }
    render() {
        // Every row gets the truncation tooltip: it opens only while the label is
        // actually cut off (a group's width, or the rail's sub-menu-max-width).
        const tip = truncatedLabelTooltip({ anchorId: "row", label: this.label, shape: this.shape, root: this.renderRoot });
        return html `${__classPrivateFieldGet(this, _ZdsSubMenuItem_instances, "m", _ZdsSubMenuItem_row).call(this)}${tip}`;
    }
};
_ZdsSubMenuItem_guard = new WeakMap();
_ZdsSubMenuItem_instances = new WeakSet();
_ZdsSubMenuItem_row = function _ZdsSubMenuItem_row() {
    const isSelected = this.selected && !this.disabled;
    const d = (b) => (b ? "" : nothing);
    const content = subMenuRowContent({
        label: this.label,
        icon: this.icon,
        showLeadingIcon: this.showLeadingIcon,
        badge: this.badge,
        badgeLabel: this.badgeLabel,
        caret: this.subMenu ? "horizontal" : null,
        open: this.open,
    });
    if (this.href !== null) {
        return html `<a
        part="item"
        id="row"
        class="row"
        href=${this.disabled ? nothing : this.href}
        target=${this.target ?? nothing}
        rel=${this.rel ?? nothing}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${isSelected ? "page" : nothing}
        data-nested=${d(this.nested)}
        data-shape=${this.shape}
        data-selected=${d(isSelected)}
        data-disabled=${d(this.disabled)}
        @click=${__classPrivateFieldGet(this, _ZdsSubMenuItem_guard, "f")}
      >${content}</a>`;
    }
    return html `<button
      part="item"
      id="row"
      class="row"
      type="button"
      ?disabled=${this.disabled}
      aria-current=${isSelected ? "page" : nothing}
      data-nested=${d(this.nested)}
      data-shape=${this.shape}
      data-selected=${d(isSelected)}
      data-disabled=${d(this.disabled)}
    >${content}</button>`;
};
ZdsSubMenuItem.styles = styles;
ZdsSubMenuItem.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: String })
], ZdsSubMenuItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsSubMenuItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-leading-icon" })
], ZdsSubMenuItem.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSubMenuItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSubMenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSubMenuItem.prototype, "nested", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSubMenuItem.prototype, "shape", void 0);
__decorate([
    property({
        converter: { fromAttribute: (v) => (v === null || v === "" ? null : v) },
    })
], ZdsSubMenuItem.prototype, "badge", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZdsSubMenuItem.prototype, "badgeLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "sub-menu" })
], ZdsSubMenuItem.prototype, "subMenu", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSubMenuItem.prototype, "open", void 0);
__decorate([
    property({ type: String })
], ZdsSubMenuItem.prototype, "href", void 0);
__decorate([
    property({ type: String })
], ZdsSubMenuItem.prototype, "target", void 0);
__decorate([
    property({ type: String })
], ZdsSubMenuItem.prototype, "rel", void 0);
ZdsSubMenuItem = __decorate([
    customElement("zds-sub-menu-item")
], ZdsSubMenuItem);
export { ZdsSubMenuItem };
