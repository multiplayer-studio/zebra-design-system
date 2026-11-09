var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer.styles.js";
import { Popup } from "../../mixins/mixins.js";
export * from "./navigation-drawer-footer/navigation-drawer-footer.js";
export * from "./navigation-drawer-header/navigation-drawer-header.js";
export * from "./navigation-drawer-item/navigation-drawer-item.js";
export * from "./navigation-drawer-sub-item/navigation-drawer-sub-item.js";
// TODO: When anchored to the right, the drawer causes page overflow when animating away.
/**
 * Navigation drawers provide access to destinations and app functionality, such as switching accounts.
 * They can either be permanently on-screen or controlled by a navigation menu icon
 *
 *
 * @slot - The main content of the drawer.
 * @slot header - The drawer header.
 * @slot footer - The drawer footer.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */
let ZetaNavigationDrawer = class ZetaNavigationDrawer extends Popup(LitElement) {
    constructor() {
        super(...arguments);
        /** The side of the screen that the drawer is anchored on. */
        this.anchor = "left";
        /** Toggles the animation for the navigation drawer. */
        this.showAnimation = true;
        /**  Whether the modal is initially open. */
        this.initialOpen = false;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
    }; }
    render() {
        return html `
      <dialog class="navigation-drawer" @click=${this.onBarrierClicked} id=${this.id} .open=${this.initialOpen}>
        <slot name="header"></slot>
        <div class="scrollable-content">
          <div class="content">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaNavigationDrawer.prototype, "anchor", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationDrawer.prototype, "showAnimation", void 0);
__decorate([
    property({ type: Boolean })
], ZetaNavigationDrawer.prototype, "initialOpen", void 0);
ZetaNavigationDrawer = __decorate([
    customElement("zeta-navigation-drawer")
], ZetaNavigationDrawer);
export { ZetaNavigationDrawer };
//# sourceMappingURL=navigation-drawer.js.map