var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ZetaPriorityPill_1;
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./priority-pill.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
/** Shows where an item sits on a four step scale, from low to urgent. `status` (spec: level) sets the fill, the
 * circle and the glyph together, `type` (spec: variant) decides whether the name appears beside the circle or the
 * circle stands alone, and `leading` swaps the direction glyph for a rank number.
 *
 * The glyphs point the way the level does: down for low, a dash for medium, up for high and the priority mark for
 * urgent. A number removes that cue, so prefer the glyph unless the exact position in a queue matters.
 *
 * @cssproperty --priority-pill-index-background-color - Color of the index character.
 * @cssproperty --priority-pill-index-text-color - Background color of the index.
 * @cssproperty --priority-pill-text-color - Color of the text.
 * @cssproperty --priority-pill-background-color - Background color of the pill.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-410
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
let ZetaPriorityPill = class ZetaPriorityPill extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Size of the priority pill */
        this.size = "large";
        /** Type of the priority pill
         *
         * Lozenge shows the whole badge, including the text, while badge only shows the index character.  */
        this.type = "lozenge";
        this.getIndex = () => {
            if (this.index) {
                return String(this.index)[0];
            }
            if (this.status) {
                return { urgent: "U", high: "1", medium: "2", low: "3" }[this.status];
            }
            if (this.label) {
                return this.label[0];
            }
            return "";
        };
        this.getText = () => {
            if (this.label) {
                return this.label;
            }
            if (this.status) {
                return { urgent: "Urgent", high: "High", medium: "Medium", low: "Low" }[this.status];
            }
            return "";
        };
    }
    static { ZetaPriorityPill_1 = this; }
    static { this.styles = [styles, super.styles ?? []]; }
    static { this.GLYPH = { low: "arrow_down", medium: "remove", high: "arrow_up", urgent: "priority" }; }
    render() {
        const leading = this.leading ?? (this.index !== undefined ? "number" : "icon");
        return html `
      <div class="container contourable-target">
        <div class="number contourable-target">
          ${leading === "number"
            ? this.getIndex()
            : html `<zeta-icon class="glyph" .rounded=${this.rounded !== false}>${ZetaPriorityPill_1.GLYPH[this.status ?? "low"]}</zeta-icon>`}
        </div>
        ${this.type === "lozenge" ? html `<div class="text">${this.getText()}</div>` : nothing}
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], ZetaPriorityPill.prototype, "label", void 0);
__decorate([
    property()
], ZetaPriorityPill.prototype, "index", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaPriorityPill.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaPriorityPill.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaPriorityPill.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaPriorityPill.prototype, "leading", void 0);
ZetaPriorityPill = ZetaPriorityPill_1 = __decorate([
    customElement("zeta-priority-pill")
], ZetaPriorityPill);
export { ZetaPriorityPill };
//# sourceMappingURL=priority-pill.js.map