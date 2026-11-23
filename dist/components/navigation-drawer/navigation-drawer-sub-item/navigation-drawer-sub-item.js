var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-sub-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
/**
 * A navigation sub item to be used in a zeta-navigation-drawer
 *
 * @slot - The headline text.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook ?path=/docs/components-navigation-drawer--docs
 */
let ZetaNavigationDrawerSubItem = class ZetaNavigationDrawerSubItem extends Contourable(Interactive(LitElement)) {
    constructor() {
        super(...arguments);
        /** Sets the item to active. */
        this.active = false;
    }
    render() {
        return html `
      <div class="container">
        <div class="border"></div>
        <h1 class="sub-item interactive-target contourable-target">${this.headline}<slot></slot></h1>
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaNavigationDrawerSubItem.prototype, "headline", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationDrawerSubItem.prototype, "active", void 0);
ZetaNavigationDrawerSubItem = __decorate([
    customElement("zeta-navigation-drawer-sub-item")
], ZetaNavigationDrawerSubItem);
export { ZetaNavigationDrawerSubItem };
//# sourceMappingURL=navigation-drawer-sub-item.js.map