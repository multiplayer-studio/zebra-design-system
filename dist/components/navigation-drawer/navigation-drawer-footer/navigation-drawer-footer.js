var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./navigation-drawer-footer.styles.js";
import ZebraLogo from "../../../../assets/zebra-logo.svg";
/**
 * The footer used on a navigation drawer.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline. Not shown if 'variant' is set to 'logo'.
 * @slot trailing - Content placed after the headline. Not shown if 'variant' is set to 'logo'.
 * @slot logo - The element that replaces the default Zebra logo. Not shown if 'variant' is set to 'profile'.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook ?path=/docs/components-navigation-drawer--docs
 */
let ZetaNavigationDrawerFooter = class ZetaNavigationDrawerFooter extends LitElement {
    constructor() {
        super(...arguments);
        /** Shows a divider above the footer. */
        this.divide = false;
        /**
         * The variant of the footer.
         *
         * If set to 'logo' the zebra logo or the contents of the 'logo' slot will be shown and the headline text will be displayed beneath the logo.
         */
        this.variant = "profile";
        this.handleSlotChange = () => {
            this.requestUpdate();
            if (this.customLogo.length > 0) {
                this.hideDefaultLogo = true;
            }
            else {
                this.hideDefaultLogo = false;
            }
        };
    }
    getProfileFooter() {
        return html `<footer class="drawer-footer-profile">
      <div class="leading">
        <slot name="leading"></slot>
        <div class="main-content">
          <h1>${this.headline}<slot></slot></h1>
          ${this.subHeadline ? html `<h2>${this.subHeadline}</h2>` : nothing}
        </div>
      </div>
      <div class="trailing">
        <slot name="trailing"></slot>
      </div>
    </footer>`;
    }
    getLogoFooter() {
        // TODO remove unsafeSVG and try and use svg instead
        return html `<footer class="drawer-footer-logo">
      <slot name="logo" @slotchange=${this.handleSlotChange}></slot>
      <div class="logo">${unsafeSVG(ZebraLogo)}</div>
      <h3>${this.headline}<slot></slot></h3>
    </footer>`;
    }
    render() {
        switch (this.variant) {
            case "profile":
                return this.getProfileFooter();
            case "logo":
                return this.getLogoFooter();
        }
    }
    static { this.styles = [styles]; }
};
__decorate([
    property({ type: String })
], ZetaNavigationDrawerFooter.prototype, "headline", void 0);
__decorate([
    property({ type: String })
], ZetaNavigationDrawerFooter.prototype, "subHeadline", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationDrawerFooter.prototype, "divide", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaNavigationDrawerFooter.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationDrawerFooter.prototype, "hideDefaultLogo", void 0);
__decorate([
    queryAssignedElements({ slot: "logo", flatten: true })
], ZetaNavigationDrawerFooter.prototype, "customLogo", void 0);
ZetaNavigationDrawerFooter = __decorate([
    customElement("zeta-navigation-drawer-footer")
], ZetaNavigationDrawerFooter);
export { ZetaNavigationDrawerFooter };
//# sourceMappingURL=navigation-drawer-footer.js.map