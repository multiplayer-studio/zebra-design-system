var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./caret-indicator.styles.js";
import "../icon/icon.js";
/**
 * The caret that marks something as able to open, and turns when it does. Figma swaps glyphs per state; here one
 * glyph rotates (owner decision): `expand_more` turned 180° for vertical, `chevron_right` turned 90° for horizontal.
 * Decorative: the control it sits in carries `aria-expanded`. The colour is currentColor.
 *
 * @cssproperty --caret-indicator-motion - Duration and easing of the turn. Inside the rail it is animations/smooth.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54347
 * @storybook ?path=/docs/components-navigation-rail--docs
 */
let ZetaCaretIndicator = class ZetaCaretIndicator extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Whether the thing it marks is open. Turns the glyph. */
        this.open = false;
        /** vertical: a list that drops down. horizontal: a row that opens a further level. */
        this.direction = "vertical";
        /** The nested Icon's size: small 16px, medium 20px, large 28px (measured in Figma). */
        this.size = "small";
    }
    render() {
        return html `<zeta-icon class="glyph" aria-hidden="true" .rounded=${this.rounded}
      >${this.direction === "vertical" ? "expand_more" : "chevron_right"}</zeta-icon
    >`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaCaretIndicator.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaCaretIndicator.prototype, "direction", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaCaretIndicator.prototype, "size", void 0);
ZetaCaretIndicator = __decorate([
    customElement("zeta-caret-indicator")
], ZetaCaretIndicator);
export { ZetaCaretIndicator };
//# sourceMappingURL=caret-indicator.js.map