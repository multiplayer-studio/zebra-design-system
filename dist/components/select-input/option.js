var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
import { Size } from "../../mixins/size.js";
import styles from "./option.styles.js";
import { ZetaOptionClickEvent } from "../../events.js";
import "../icon/icon.js";
/** ZetaOption web component. A selected option shows a trailing check mark, as Select's selected row does in the spec.
 *
 * @slot - The default slot
 * @part option-text - The text of the option.
 * @part check - The trailing check mark on the selected option.
 * @cssproperty --option-max-lines - The maximum number of lines to display before truncating with an ellipsis. Default is 2.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-39&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-select-input--docs
 */
let ZetaOption = class ZetaOption extends Contourable(Interactive(Size(LitElement))) {
    constructor() {
        super(...arguments);
        this.value = "";
        this.selected = false;
        this.disabled = false;
        this.type = "option";
        this._handleClick = () => {
            if (!this.disabled) {
                // uncomment this to enable deselection
                // this.selected = !this.selected;
                this.dispatchEvent(new ZetaOptionClickEvent({ value: this.value }).toEvent());
            }
        };
        this._handleKeyDown = (e) => {
            if (e.key === " " || e.key === "Enter") {
                this._handleClick();
            }
        };
    }
    connectedCallback() {
        // @ts-expect-error-next-line
        if (super.connectedCallback)
            super.connectedCallback();
        this.addEventListener("keydown", this._handleKeyDown);
        // An option of a Select's listbox; on its own it is just a pressable row.
        if (this.closest("zeta-select-input"))
            this.setAttribute("role", "option");
    }
    updated() {
        if (this.getAttribute("role") === "option") {
            this.setAttribute("aria-selected", String(this.selected));
            this.setAttribute("aria-disabled", String(this.disabled));
        }
    }
    disconnectedCallback() {
        // @ts-expect-error-next-line
        if (super.disconnectedCallback)
            super.disconnectedCallback();
        this.removeEventListener("keydown", this._handleKeyDown);
    }
    render() {
        return html `
      <div tabindex=${this.disabled ? -1 : 0} class="option" @click=${this._handleClick}>
        <span part="option-text"><slot></slot></span>
        ${this.selected ? html `<zeta-icon part="check" class="check" aria-hidden="true" .rounded=${this.rounded}>check_mark</zeta-icon>` : nothing}
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaOption.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaOption.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], ZetaOption.prototype, "disabled", void 0);
ZetaOption = __decorate([
    customElement("zeta-option")
], ZetaOption);
export { ZetaOption };
//# sourceMappingURL=option.js.map