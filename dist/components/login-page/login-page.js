var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./login-page.styles.js";
import { Contourable } from "../../mixins/contour.js";
import "../button/button.js";
/**
 * TODO
 *
 * @figma TODO
 * @storybook ?path=/story/templates-login-page--login-page
 */
let ZetaLoginPage = class ZetaLoginPage extends Contourable(LitElement) {
    login() {
        window.location.href = this.url;
    }
    //TODO read queryParams for auth success/failure
    render() {
        return html ` <div class="header"></div>
      <main>
        <div class="logo">
          <div class="zebra">Zebra</div>
          <div class="product">${this.name}</div>
        </div>
        <zeta-button
          shape=${this.rounded ? "rounded" : "sharp"}
          flavor="primary"
          @click=${() => {
            this.login();
        }}
          >Sign In With SSO</zeta-button
        >
      </main>
      <footer><slot name="footer"></slot></footer>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String })
], ZetaLoginPage.prototype, "url", void 0);
__decorate([
    property({ type: String })
], ZetaLoginPage.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZetaLoginPage.prototype, "description", void 0);
ZetaLoginPage = __decorate([
    customElement("zeta-login-page")
], ZetaLoginPage);
export { ZetaLoginPage };
//# sourceMappingURL=login-page.js.map