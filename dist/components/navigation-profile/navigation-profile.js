var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./navigation-profile.styles.js";
import { Contourable } from "../../mixins/mixins.js";
/**
 * TODO this has been removed from the FIGMA, this may become deprecated soon
 * @slot - The headline text.
 * @slot leading - The leading content. Typically a zeta-avatar.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook ?path=/story/components-navigation-header--profile
 */
let ZetaNavigationProfile = class ZetaNavigationProfile extends Contourable(LitElement) {
    render() {
        // TODO: dropdown variant
        return html `
      <div class="navigation-profile">
        <div class="leading">
          <slot name="leading"></slot>
        </div>
        <slot></slot>
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
ZetaNavigationProfile = __decorate([
    customElement("zeta-navigation-profile")
], ZetaNavigationProfile);
export { ZetaNavigationProfile };
//# sourceMappingURL=navigation-profile.js.map