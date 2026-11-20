var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./caret-indicator.styles.js";
import "../icon/icon.js";
const GLYPH = { vertical: "expand-more", horizontal: "chevron-right" };
/**
 * The caret that marks something as able to open, and turns when it does.
 *
 * Decorative (`aria-hidden`): the control it sits in carries `aria-expanded`.
 * Figma swaps glyphs per state (expand-more → expand-less, chevron-right →
 * expand-more); here it is ONE glyph rotated with Switch's motion — owner
 * decision. The colour is currentColor, so it follows the row's label.
 *
 * Shared by zds-sub-menu-item, zds-collapsible-menu-item and anything else
 * with a disclosure caret. Kept in step with React `<CaretIndicator>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Caret Indicator)
 */
let ZdsCaretIndicator = class ZdsCaretIndicator extends LitElement {
    constructor() {
        super(...arguments);
        /** Whether the thing it marks is open. Turns the glyph; it never swaps it. */
        this.open = false;
        /**
         * vertical: `expand-more`, turned 180° when open (a list that drops down).
         * horizontal: `chevron-right`, turned 90° when open (a row that opens a level).
         */
        this.direction = "vertical";
        /** The glyph's own box: 16 / 20 / 28px, the nested Icon's sizes. */
        this.size = "small";
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("aria-hidden", "true");
    }
    render() {
        // Rounded family, Framed off (spec).
        return html `<zds-icon class="glyph" name=${GLYPH[this.direction] ?? GLYPH.vertical} size=${this.size}></zds-icon>`;
    }
};
ZdsCaretIndicator.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsCaretIndicator.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsCaretIndicator.prototype, "direction", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsCaretIndicator.prototype, "size", void 0);
ZdsCaretIndicator = __decorate([
    customElement("zds-caret-indicator")
], ZdsCaretIndicator);
export { ZdsCaretIndicator };
