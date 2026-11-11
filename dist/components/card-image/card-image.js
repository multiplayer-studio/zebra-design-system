var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./card-image.styles.js";
/**
 * A full-bleed image for `zds-card`'s body slot. Fills the width and clips to
 * the card's own corner radius (via the card's `overflow: hidden`); height is
 * left to the consumer — the spec's own 259px is an unbound, authored canvas
 * value, not a real constraint.
 *
 * @part image - The image element.
 * @spec specs/card/card.spec.json
 */
let ZdsCardImage = class ZdsCardImage extends LitElement {
    constructor() {
        super(...arguments);
        /** Image source. */
        this.src = null;
        /** Accessible text for the image. */
        this.alt = null;
    }
    render() {
        return html `<img part="image" src=${this.src ?? nothing} alt=${this.alt ?? ""} />`;
    }
};
ZdsCardImage.styles = styles;
__decorate([
    property({ type: String })
], ZdsCardImage.prototype, "src", void 0);
__decorate([
    property({ type: String })
], ZdsCardImage.prototype, "alt", void 0);
ZdsCardImage = __decorate([
    customElement("zds-card-image")
], ZdsCardImage);
export { ZdsCardImage };
