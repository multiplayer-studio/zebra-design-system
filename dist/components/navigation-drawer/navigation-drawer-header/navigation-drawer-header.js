var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-header.styles.js";
/**
 * The header used on a navigation drawer.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline.
 * @slot trailing - Content placed after the headline.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook ?path=/docs/components-navigation-drawer--docs
 */
let ZetaNavigationDrawerHeader = class ZetaNavigationDrawerHeader extends LitElement {
    constructor() {
        super(...arguments);
        /** Shows a divider below the header. */
        this.divide = false;
    }
    render() {
        return html `<header class="drawer-header">
      <div class="leading">
        <slot name="leading"></slot>
        <div class="main-content">
          <h1>${this.headline}<slot></slot></h1>
          <h2>${this.subHeadline}</h2>
        </div>
      </div>
      <div class="trailing">
        <slot name="trailing"></slot>
      </div>
    </header>`;
    }
    static { this.styles = [styles]; }
};
__decorate([
    property({ type: String })
], ZetaNavigationDrawerHeader.prototype, "headline", void 0);
__decorate([
    property({ type: String })
], ZetaNavigationDrawerHeader.prototype, "subHeadline", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationDrawerHeader.prototype, "divide", void 0);
ZetaNavigationDrawerHeader = __decorate([
    customElement("zeta-navigation-drawer-header")
], ZetaNavigationDrawerHeader);
export { ZetaNavigationDrawerHeader };
//# sourceMappingURL=navigation-drawer-header.js.map