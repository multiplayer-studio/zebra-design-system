var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./fab.styles.js";
import "../icon/icon.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { Flavored } from "../../mixins/flavor.js";
import { BaseButton } from "../button/base-button.js";
/** Floating Action Buttons are used to trigger the primary action on a screen. They are circular buttons that float above the content.
 *
 * @slot - The icon of the button. Entered as a plain string.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21816-4283&m=dev
 * @storybook ?path=/docs/components-fabs--docs
 */
let ZetaFab = class ZetaFab extends Flavored(BaseButton) {
    constructor() {
        super(...arguments);
        /**
         * The label display on or below the button.
         */
        this.label = "";
        this.flavor = "primary";
        this.extended = false;
        this.size = "small";
    }
    static get styles() {
        return [super.styles ?? [], styles];
    }
    getLabel() {
        return this.label ? html `<div class="label">${this.label}</div>` : nothing;
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} value=${ifDefined(this.value)} name=${ifDefined(this.name)} type=${ifDefined(this.type)}>
        <zeta-icon .rounded=${this.shape != "sharp"}><slot></slot></zeta-icon>
        ${this.extended ? this.getLabel() : nothing}
      </button>
      ${this.extended ? nothing : this.getLabel()}
    `;
    }
};
__decorate([
    property({ type: String })
], ZetaFab.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaFab.prototype, "flavor", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaFab.prototype, "extended", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaFab.prototype, "size", void 0);
ZetaFab = __decorate([
    customElement("zeta-fab")
], ZetaFab);
export { ZetaFab };
//# sourceMappingURL=fab.js.map