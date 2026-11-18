var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-rail-item.styles.js";
import { Navigate } from "../../mixins/navigate.js";
import "../badges/indicators/indicators.js";
/**
 * A single destination in a Navigation Rail: a glyph in a square target, or glyph and label on one row in the wide
 * form. Selection recolours the glyph and label instead of laying a scrim behind them.
 *
 * Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
 * `zeta-navigation-rail` the rail sets `expanded`, `showLabel` and `rounded`. The label is always the accessible name,
 * even when it is hidden in the narrow form.
 *
 * @slot - The label of the navigation item.
 * @slot {zeta-icon} icon - The glyph. Figma ships a `star` placeholder; swap it on every item.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54230
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
let ZetaNavigationRailItem = class ZetaNavigationRailItem extends Navigate(Contourable(Interactive(LitElement))) {
    constructor() {
        super(...arguments);
        /** The destination the user is on. Exactly one item across the rail and its panel should carry it. */
        this.selected = false;
        /** The wide form: glyph and label on one row. Inside a rail, the rail sets it. */
        this.expanded = false;
        /** Adds the caption under the glyph in the narrow form. No effect in the wide form, where the label always shows. */
        this.showLabel = false;
        /** Shows the glyph, and the badge anchored to it. Keep it on in the narrow form. */
        this.showIcon = true;
        /** A notification dot over the glyph's top-right corner. It sits outside the layout. */
        this.showBadge = false;
        /** A disabled link must not navigate or reach click listeners on the host. */
        this.guard = (e) => {
            if (this.disabled) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: true
    }; }
    renderContent() {
        return html `
      ${this.showIcon
            ? html `<span class="icon" aria-hidden="true">
              <slot name="icon"></slot>
              ${this.showBadge ? html `<zeta-notification-indicator class="badge" size="small"></zeta-notification-indicator>` : nothing}
            </span>`
            : nothing}
      <span class=${this.expanded || this.showLabel ? "label" : "label sr"}><slot></slot></span>
      ${this.showBadge && this.badgeLabel ? html `<span class="sr">, ${this.badgeLabel}</span>` : nothing}
    `;
    }
    render() {
        const current = this.selected && !this.disabled ? "page" : nothing;
        if (this.href) {
            return html `<a
        class="item interactive-target"
        href=${this.disabled ? nothing : this.href}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${current}
        @click=${this.guard}
        >${this.renderContent()}</a
      >`;
        }
        return html `<button
      class="item interactive-target"
      type="button"
      ?disabled=${this.disabled}
      aria-current=${current}
      aria-expanded=${this.toggleExpanded === undefined ? nothing : String(this.toggleExpanded)}
    >
      ${this.renderContent()}
    </button>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationRailItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationRailItem.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-label" })
], ZetaNavigationRailItem.prototype, "showLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-icon" })
], ZetaNavigationRailItem.prototype, "showIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-badge" })
], ZetaNavigationRailItem.prototype, "showBadge", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZetaNavigationRailItem.prototype, "badgeLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "toggle-expanded" })
], ZetaNavigationRailItem.prototype, "toggleExpanded", void 0);
ZetaNavigationRailItem = __decorate([
    customElement("zeta-navigation-rail-item")
], ZetaNavigationRailItem);
export { ZetaNavigationRailItem };
//# sourceMappingURL=navigation-rail-item.js.map