var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-footer.styles.js";
/**
 * The actions that close out a card. Slotted buttons share the row equally, with space/sm between them; use one
 * primary, or an outline and a primary.
 *
 * @slot - The footer actions, usually zeta-button elements at size small.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */
let ZetaCardFooter = class ZetaCardFooter extends LitElement {
    render() {
        return html `<div class="card-footer"><slot></slot></div>`;
    }
    static { this.styles = [styles]; }
};
ZetaCardFooter = __decorate([
    customElement("zeta-card-footer")
], ZetaCardFooter);
export { ZetaCardFooter };
//# sourceMappingURL=card-footer.js.map