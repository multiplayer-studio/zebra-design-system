var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "./slider-input-field.styles.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../text-input/text-input.js";
import "../slider.js";
import { FormField } from "../../../mixins/form-field.js";
import { ZetaSlider } from "../slider.js";
//TODO: min / max dont seem to change values of slider correctly.
/** A text input and slider field for entering numerical values.
 *
 * @event {CustomEvent<ZetaSliderEventDetail>} change - Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=875-11860&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-slider--docs
 */
let ZetaSliderInputField = class ZetaSliderInputField extends FormField(Contourable(LitElement)) {
    constructor() {
        super(...arguments);
        /** Error state. */
        this.error = false;
        /** The minimum value of the slider input field. */
        this.min = 0;
        /** The maximum value of the slider input field. */
        this.max = 100;
        this.value = "50";
        this.type = "slider";
    }
    /** @internal */
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: true
    }; }
    update(_changedProperties) {
        super.update(_changedProperties);
        this.internals.setFormValue(this.value);
    }
    handleChange(event) {
        const target = event.target;
        const intValue = Number(target.value);
        this.value = intValue.toString();
        this.error = intValue < this.min || intValue > this.max || isNaN(intValue);
        if (target instanceof ZetaSlider)
            this.internals.setFormValue(this.value);
    }
    getLabel() {
        if (this.label)
            return html `<label for=${this.id}>${this.label}</label>`;
        else
            return nothing;
    }
    render() {
        return html `
      ${this.getLabel()}
      <div class="slider-input-container">
        <div class="slider-container">
          <zeta-slider
            stepIncrement=${ifDefined(this.stepIncrement)}
            .rounded=${this.rounded}
            .disabled=${this.disabled}
            value=${isNaN(Number(this.value)) ? this.min : Number(this.value)}
            min=${this.min}
            max=${this.max}
            label=${this.label || "Value"}
            @change=${(e) => this.handleChange(e)}
          >
          </zeta-slider>
          <div class="range-label-container">
            <p>${this.min}</p>
            <p>${this.max}</p>
          </div>
        </div>
        ${super.render()}
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaSliderInputField.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSliderInputField.prototype, "error", void 0);
__decorate([
    property({ type: Number, reflect: true })
], ZetaSliderInputField.prototype, "min", void 0);
__decorate([
    property({ type: Number, reflect: true })
], ZetaSliderInputField.prototype, "max", void 0);
__decorate([
    property({ type: String })
], ZetaSliderInputField.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ZetaSliderInputField.prototype, "stepIncrement", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSliderInputField.prototype, "disabled", void 0);
__decorate([
    query("input.contourable-target")
], ZetaSliderInputField.prototype, "input", void 0);
ZetaSliderInputField = __decorate([
    customElement("zeta-slider-input-field")
], ZetaSliderInputField);
export { ZetaSliderInputField };
//# sourceMappingURL=slider-input-field.js.map