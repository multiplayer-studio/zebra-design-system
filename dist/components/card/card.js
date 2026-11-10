var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/mixins.js";
import { customElement } from "lit/decorators.js";
import styles from "./card.styles.js";
export * from "./card-body/card-body.js";
export * from "./card-footer/card-footer.js";
export * from "./card-header/card-header.js";
/** The card shell: a bordered surface holding a header, a body and a footer, stacked. It decides the surface, the
 * border, the corners and that content is clipped to the frame, and nothing else; every inset comes from the slotted
 * parts (`zeta-card-header`, `zeta-card-body`, `zeta-card-footer`). Content follows a rounded corner, so a full-bleed
 * image curves with it. The card itself is not interactive.
 *
 * @slot - The content of the card.
 * @cssproperty --card-border-line-width  The line width of the border
 * @cssproperty --card-border-color The color of the border
 * @cssproperty --card-border-line-style The line style of the border
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-cards--docs
 */
let ZetaCard = class ZetaCard extends Contourable(LitElement) {
    render() {
        return html `<div class="card"><slot></slot></div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
ZetaCard = __decorate([
    customElement("zeta-card")
], ZetaCard);
export { ZetaCard };
//# sourceMappingURL=card.js.map