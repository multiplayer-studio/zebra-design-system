var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./card.styles.js";
/**
 * The empty card shell: three stacked slots inside a bordered surface. It
 * decides the surface, the border, the corner treatment and clipping, and
 * nothing else — every inset comes from whatever fills the slots
 * (`zds-card-heading`, `zds-card-body`, `zds-card-image`, `zds-card-footer`,
 * or anything else).
 *
 * Header and footer can each be switched off; the body has no toggle. Width
 * is not fixed here — the spec's own 330px is a Figma canvas artifact, not a
 * constraint ("whoever places it decides the width"), so this shell sizes to
 * its container.
 *
 * @slot header - The header slot, hidden by has-header.
 * @slot - The body slot. Always present.
 * @slot footer - The footer slot, hidden by has-footer.
 * @part header - The header wrapper.
 * @part body - The body wrapper.
 * @part footer - The footer wrapper.
 *
 * @spec specs/card/card.spec.json
 */
let ZdsCard = class ZdsCard extends LitElement {
    constructor() {
        super(...arguments);
        /** Corner treatment. Content clips to it, so a full-bleed image follows the curve. */
        this.shape = "sharp";
        /** Shows the header slot above the body. */
        this.hasHeader = true;
        /** Shows the footer slot below the body. */
        this.hasFooter = true;
    }
    render() {
        return html `
      ${this.hasHeader ? html `<div part="header" class="header"><slot name="header"></slot></div>` : nothing}
      <div part="body" class="body"><slot></slot></div>
      ${this.hasFooter ? html `<div part="footer" class="footer"><slot name="footer"></slot></div>` : nothing}
    `;
    }
};
ZdsCard.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsCard.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, attribute: "has-header", reflect: true })
], ZdsCard.prototype, "hasHeader", void 0);
__decorate([
    property({ type: Boolean, attribute: "has-footer", reflect: true })
], ZdsCard.prototype, "hasFooter", void 0);
ZdsCard = __decorate([
    customElement("zds-card")
], ZdsCard);
export { ZdsCard };
