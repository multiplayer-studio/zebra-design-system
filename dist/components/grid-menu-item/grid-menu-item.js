var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import { html, LitElement, nothing } from "lit";
import styles from "./grid-menu-item.styles.js";
import "../badges/indicators/indicators.js";
/**
 * A destination in a navigation bar, or an entry in a bottom sheet's grid (spec: Navigation Item): an icon over a
 * one- or two-word label. `active` marks where the user is, so give it to exactly one item in a bar; `disabled`
 * applies to inactive items only. `notificationValue` set to `true` puts a dot over the icon's corner without
 * changing the item's size; a number shows a count (a Zeta extension). `tile` is the bottom sheet form (spec: Grid Menu
 * Item): a square with a larger icon and label, which a `zeta-bottom-sheet` sets on its grid items.
 *
 * @slot - Label to be displayed.
 * @slot {zeta-icon} icon - Icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2838-3508
 * @storybook ?path=/docs/components-grid-menu-item--docs
 */
let ZetaGridMenuItem = class ZetaGridMenuItem extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        this.active = false;
        /** The destination is unavailable. Applies to inactive items only. */
        this.disabled = false;
        /** The bottom sheet tile: a focusable square with a larger icon and label. */
        this.tile = false;
        this.onKeydown = (event) => {
            if (!this.tile || this.disabled || (event.key !== "Enter" && event.key !== " "))
                return;
            event.preventDefault();
            this.click();
        };
    }
    render() {
        return html `
      <div class="icon-container">
        ${this.renderBadge()}
        <slot name="icon"></slot>
      </div>
      <div class="label">
        <slot></slot>
      </div>
    `;
    }
    updated() {
        // Announce an unavailable destination; WCAG then exempts its dimmed label from contrast.
        if (this.disabled && !this.active)
            this.setAttribute("aria-disabled", "true");
        else
            this.removeAttribute("aria-disabled");
        if (this.tile) {
            this.setAttribute("role", "button");
            if (this.active)
                this.setAttribute("aria-current", "true");
            else
                this.removeAttribute("aria-current");
            if (this.disabled)
                this.removeAttribute("tabindex");
            else
                this.setAttribute("tabindex", "0");
        }
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.addEventListener("keydown", this.onKeydown);
    }
    disconnectedCallback() {
        super.disconnectedCallback?.();
        this.removeEventListener("keydown", this.onKeydown);
    }
    renderBadge() {
        const v = this.notificationValue;
        if (!v || v === "false")
            return nothing;
        // true draws the spec's dot; a number keeps Zeta's count.
        const dot = v === true || v === "true" || v === "";
        return dot
            ? html `<zeta-notification-indicator class="badge" size="small"></zeta-notification-indicator>`
            : html `<zeta-notification-indicator class="badge count" .value=${Number(v)}></zeta-notification-indicator>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaGridMenuItem.prototype, "notificationValue", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaGridMenuItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaGridMenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaGridMenuItem.prototype, "tile", void 0);
ZetaGridMenuItem = __decorate([
    customElement("zeta-grid-menu-item")
], ZetaGridMenuItem);
export { ZetaGridMenuItem };
//# sourceMappingURL=grid-menu-item.js.map