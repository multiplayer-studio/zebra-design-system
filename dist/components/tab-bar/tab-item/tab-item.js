var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./tab-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import "../../badges/indicators/indicators.js";
/** One tab in a zeta-tab-bar: an optional icon, a label and an optional badge. The tab bar sets which tab is selected
 * and moves keyboard focus between them; set `selected` on the tab that shows the current view.
 *
 * @slot - The label. Use real words: it is the tab's name.
 * @slot icon - A leading zeta-icon.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237
 * @storybook ?path=/docs/components-tab-bar--docs
 */
let ZetaTabItem = class ZetaTabItem extends Contourable(Interactive(LitElement)) {
    constructor() {
        super();
        /** The tab shows the current view. */
        this.selected = false;
        /** The legacy name for `selected`. */
        this.active = false;
        /** Shows the slotted icon. */
        this.showLeadingIcon = true;
        /** Shows a Notification Indicator after the label. */
        this.showBadge = false;
        this.hasIcon = false;
        this.internals = this.attachInternals();
        this.internals.role = "tab";
    }
    /** Selected, by either name. */
    get isSelected() {
        return this.selected || this.active;
    }
    updated(changed) {
        if (changed.has("selected") || changed.has("active"))
            this.internals.ariaSelected = String(this.isSelected);
        // On the element itself, where checkers read it (disabled text is exempt from contrast).
        if (changed.has("disabled")) {
            if (this.disabled)
                this.setAttribute("aria-disabled", "true");
            else
                this.removeAttribute("aria-disabled");
        }
        // Interactive keeps tabIndex as a property; the tab bar's roving tab stop needs the attribute.
        if (changed.has("tabIndex"))
            this.setAttribute("tabindex", String(this.tabIndex));
    }
    render() {
        return html `<span class="icon" ?hidden=${!this.showLeadingIcon || !this.hasIcon}
        ><slot name="icon" @slotchange=${(e) => (this.hasIcon = e.target.assignedElements().length > 0)}></slot></span
      ><slot></slot>${this.showBadge
            ? html `<zeta-notification-indicator size="large" .value=${this.badgeValue} aria-hidden="true"></zeta-notification-indicator>${this.badgeLabel ? html `<span class="sr">, ${this.badgeLabel}</span>` : nothing}`
            : nothing}`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTabItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTabItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-leading-icon" })
], ZetaTabItem.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-badge" })
], ZetaTabItem.prototype, "showBadge", void 0);
__decorate([
    property({ type: Number, attribute: "badge-value" })
], ZetaTabItem.prototype, "badgeValue", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZetaTabItem.prototype, "badgeLabel", void 0);
__decorate([
    state()
], ZetaTabItem.prototype, "hasIcon", void 0);
ZetaTabItem = __decorate([
    customElement("zeta-tab-item")
], ZetaTabItem);
export { ZetaTabItem };
//# sourceMappingURL=tab-item.js.map