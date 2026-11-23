var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tab-item.styles.js";
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
 * One tab in a Tab Bar: an optional icon, a label and an optional badge.
 *
 * The host is the tab: it carries `role="tab"` and `aria-selected`, and the
 * surrounding `<zds-tab-bar>` sets `selected` and the roving `tabindex`.
 * Figma's separate State, Selected and Disabled axes collapse into the
 * `selected` and `disabled` properties (spec issue).
 *
 * @part label - The label text.
 *
 * @spec specs/tab-bar/tab-bar.spec.json
 */
let ZdsTabItem = class ZdsTabItem extends LitElement {
    constructor() {
        super(...arguments);
        /** The value the bar reports when this tab is chosen. Unique within the bar. */
        this.value = "";
        /** The tab's name: one or two real words. Figma has no text property for it (spec note). */
        this.label = "Tab Item";
        /** Leading glyph. Omit for a label-only tab (Figma's Show Leading Icon off). */
        this.icon = null;
        /** Whether this is the chosen tab. Set by `<zds-tab-bar>` from its `value`. */
        this.selected = false;
        /** The tab cannot be chosen. The surface holds; the label carries it alone (spec). */
        this.disabled = false;
        /**
         * A Notification Indicator after the label. `true` (bare attribute) is a
         * dot; a count shows the number, capped at "99+" (spec issue: Figma pins a
         * large count while the metadata describes a dot, so both are offered).
         */
        this.badge = null;
        /** Text equivalent of the badge, read after the label, e.g. "3 new". Defaults to the count. */
        this.badgeLabel = null;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "tab");
        if (!this.hasAttribute("tabindex"))
            this.tabIndex = -1;
    }
    updated(changed) {
        if (changed.has("selected"))
            this.setAttribute("aria-selected", String(this.selected));
        if (changed.has("disabled"))
            this.toggleAttribute("aria-disabled", this.disabled);
    }
    render() {
        const b = badgeParts(this.badge);
        const srText = b ? (this.badgeLabel ?? b.value) : undefined;
        return html `
      ${this.icon
            ? html `<!-- Icon pinned to Size=medium, Framed off (spec); colour is currentColor. -->
            <zds-icon class="icon" name=${this.icon} size="medium"></zds-icon>`
            : nothing}
      <span part="label" class="label">${this.label}</span>
      ${b
            ? html `<zds-notification-indicator class="badge" aria-hidden="true" size=${b.size} .value=${b.value ?? ""}></zds-notification-indicator>`
            : nothing}
      ${srText ? html `<span class="sr">, ${srText}</span>` : nothing}
    `;
    }
};
ZdsTabItem.styles = styles;
__decorate([
    property({ type: String })
], ZdsTabItem.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ZdsTabItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsTabItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsTabItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsTabItem.prototype, "disabled", void 0);
__decorate([
    property({
        converter: { fromAttribute: (v) => (v === null ? null : v === "" ? true : v) },
    })
], ZdsTabItem.prototype, "badge", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZdsTabItem.prototype, "badgeLabel", void 0);
ZdsTabItem = __decorate([
    customElement("zds-tab-item")
], ZdsTabItem);
export { ZdsTabItem };
