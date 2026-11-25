var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./card-header.styles.js";
/**
 * The heading row of a card: optional leading content (usually a small Avatar), a heading and a subheading, and
 * optional trailing content (usually a text Icon Button). Use it in a card's header, or in its body above a block of
 * text.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */
let ZetaCardHeader = class ZetaCardHeader extends LitElement {
    render() {
        return html `<div class="card-header">
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
    </div>`;
    }
    static { this.styles = [styles]; }
};
__decorate([
    property({ type: String })
], ZetaCardHeader.prototype, "headline", void 0);
__decorate([
    property({ type: String })
], ZetaCardHeader.prototype, "subHeadline", void 0);
ZetaCardHeader = __decorate([
    customElement("zeta-card-header")
], ZetaCardHeader);
export { ZetaCardHeader };
//# sourceMappingURL=card-header.js.map