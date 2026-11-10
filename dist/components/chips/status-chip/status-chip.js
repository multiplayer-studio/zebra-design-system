var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./status-chip.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
/** A chip that looks like a label.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14282
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 */
let ZetaStatusChip = class ZetaStatusChip extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Text displayed in the chip.  */
        this.text = "";
    }
    static { this.styles = [super.styles ?? [], styles]; }
    render() {
        return html `<label for="" class="container">${this.text}</label>`;
    }
};
__decorate([
    property({ type: String })
], ZetaStatusChip.prototype, "text", void 0);
ZetaStatusChip = __decorate([
    customElement("zeta-status-chip")
], ZetaStatusChip);
export { ZetaStatusChip };
//# sourceMappingURL=status-chip.js.map