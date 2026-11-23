var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, state } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";
import styles from "./navigation-bar.styles.js";
export * from "../grid-menu-item/grid-menu-item.js";
/**
 * A bottom bar of an app's primary destinations, built from `zeta-grid-menu-item`s. A second group in the `right`
 * slot sits at the far end, for account or utility entries, with an optional rule between the two (`showDivider`).
 * The `action` slot holds a single button for a call to action that is not a destination.
 *
 * @slot - The main group of destinations: `zeta-grid-menu-item`s.
 * @slot right - A second group at the far end (spec: spacer).
 * @slot action - A single action at the end of the bar, such as a zeta-button.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2835-796
 * @storybook ?path=/docs/components-navigation-bar--docs
 */
let ZetaNavigationBar = class ZetaNavigationBar extends LitElement {
    constructor() {
        super(...arguments);
        /** Items keep their natural width and the groups sit against the ends. Off, the items share the width evenly. */
        this.shrinkItems = false;
        /** Draws a vertical rule between the main and the `right` group. */
        this.showDivider = false;
        this.hasRight = false;
        this.hasAction = false;
    }
    connectedCallback() {
        super.connectedCallback?.();
        if (!this.hasAttribute("role"))
            this.setAttribute("role", "navigation");
    }
    filled(e) {
        return e.target.assignedElements({ flatten: true }).length > 0;
    }
    render() {
        return html `<div class="group main"><slot></slot></div>
      ${this.showDivider && this.hasRight ? html `<span class="divider" aria-hidden="true"></span>` : nothing}
      <div class="group right" ?hidden=${!this.hasRight}><slot name="right" @slotchange=${(e) => (this.hasRight = this.filled(e))}></slot></div>
      <div class="action" ?hidden=${!this.hasAction}><slot name="action" @slotchange=${(e) => (this.hasAction = this.filled(e))}></slot></div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationBar.prototype, "shrinkItems", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationBar.prototype, "showDivider", void 0);
__decorate([
    state()
], ZetaNavigationBar.prototype, "hasRight", void 0);
__decorate([
    state()
], ZetaNavigationBar.prototype, "hasAction", void 0);
ZetaNavigationBar = __decorate([
    customElement("zeta-navigation-bar")
], ZetaNavigationBar);
export { ZetaNavigationBar };
//# sourceMappingURL=navigation-bar.js.map