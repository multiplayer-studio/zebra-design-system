var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultTrue } from "../chip/chip.js";
import styles from "./badge-label.styles.js";
/**
 * Figma's "Label" badge. Names a category on an item in a word or two.
 * Variant carries the standing of that category, and Bold and Outlined
 * decide how hard it pushes: bold (solid), outlined (tint with an edge) or
 * plain (tint with none). Reach for `<zds-status-label>` where the thing
 * shown is a state rather than a category.
 *
 * Bold and Outlined together are not built in Figma, so bold wins.
 *
 * Named `zds-badge-label` so it does not read as a form label. Not
 * interactive; the text is the accessible name and the only thing naming the
 * category.
 *
 * @slot - The category. One or two words.
 * @csspart root - The badge.
 *
 * @spec specs/badges/label.spec.json
 */
let ZdsBadgeLabel = class ZdsBadgeLabel extends LitElement {
    constructor() {
        super(...arguments);
        /** The standing of the category; fill, border and text move together. positive / negative draw the success / error tokens. */
        this.variant = "neutral";
        /** Softly rounded (radius/element-sm) or square (radius/none). */
        this.shape = "rounded";
        /** Solid fill with knocked-out text, the strongest form. `bold="false"` gives a tinted fill. */
        this.bold = true;
        /** Adds a 1px border to the tinted fill. Only applies while `bold` is false. */
        this.outlined = false;
    }
    render() {
        const emphasis = this.bold ? "bold" : this.outlined ? "outlined" : "plain";
        return html `<span part="root" class="root" data-emphasis=${emphasis}><slot></slot></span>`;
    }
};
ZdsBadgeLabel.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsBadgeLabel.prototype, "variant", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsBadgeLabel.prototype, "shape", void 0);
__decorate([
    property({ converter: defaultTrue, reflect: true })
], ZdsBadgeLabel.prototype, "bold", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsBadgeLabel.prototype, "outlined", void 0);
ZdsBadgeLabel = __decorate([
    customElement("zds-badge-label")
], ZdsBadgeLabel);
export { ZdsBadgeLabel };
