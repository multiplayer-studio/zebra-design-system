var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./label.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
/** Names a category on an item in a word or two. `status` carries the standing of that category, and `bold` and
 * `outlined` decide how hard it pushes, from a solid fill down to a tint with no visible edge. It reports and never
 * responds, which is the line between it and Chip.
 *
 * Bold and outlined combine into three forms: bold, outlined (bold off) and plain (both off). Bold wins when both are
 * set, because that pair is not built.
 *
 * @slot  - Text displayed on the label. If not provided, the `label` property will be used.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-328
 * @storybook ?path=/docs/components-badges--docs
 */
let ZetaLabel = class ZetaLabel extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The standing of the category (spec: variant). */
        this.status = "neutral";
        /** Solid fill with light text, the strongest form. Turn off for a tint that supports the item rather than leads it. */
        this.bold = true;
        /** Adds a thin border to the tinted fill. Applies only when `bold` is off. */
        this.outlined = false;
    }
    static { this.styles = [styles, super.styles ?? []]; }
    render() {
        return html `
      <div class="container">
        <div class="text">${this.label}<slot></slot></div>
      </div>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaLabel.prototype, "status", void 0);
__decorate([
    property({ type: String })
], ZetaLabel.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaLabel.prototype, "bold", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaLabel.prototype, "outlined", void 0);
ZetaLabel = __decorate([
    customElement("zeta-label")
], ZetaLabel);
export { ZetaLabel };
//# sourceMappingURL=label.js.map