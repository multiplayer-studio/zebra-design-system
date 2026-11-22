var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-body.styles.js";
/**
 * A block of supporting text in a card, inset by space/lg on every side.
 *
 * @slot - The body content.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */
let ZetaCardBody = class ZetaCardBody extends LitElement {
    render() {
        return html ` <div class="card-body"><slot></slot></div> `;
    }
    static { this.styles = [styles]; }
};
ZetaCardBody = __decorate([
    customElement("zeta-card-body")
], ZetaCardBody);
export { ZetaCardBody };
//# sourceMappingURL=card-body.js.map