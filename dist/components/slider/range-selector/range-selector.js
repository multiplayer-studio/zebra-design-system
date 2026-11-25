var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "../slider-input-field/slider-input-field.styles.js";
import { live } from "lit/directives/live.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ZetaRangeSliderEvent } from "../../../events.js";
import "../../text-input/text-input.js";
import "../slider.js";
import { FormField } from "../../../mixins/form-field.js";
/** Used for selecting values in a numerical range.
 *
 * A ranged input field using a Zeta Slider
 *
 * The "name" is required when in a form.
 *
 * @event {CustomEvent<ZetaRangeSliderEventDetail>} change - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=980-16448&m=dev
 * @storybook ?path=/story/components-range-selector--range-slider
 */
let ZetaRangeSelector = class ZetaRangeSelector extends FormField(Contourable(LitElement)) {
    constructor() {
        super(...arguments);
        /** The initial values of the range selector  */
        this.initialValues = { min: 10, max: 90 };
        /** Error state. */
        this.error = false;
        /** The minimum value of the slider input field. */
        this.min = 0;
        /** The maximum value of the slider input field. */
        this.max = 100;
        this.id = "hidden-range-selector-input";
        this.type = "range-selector";
        /**
         * @listens ZetaRangeSliderEvent:change
         */
        this.sliderChange = (e) => {
            this.initialValues = { min: e.detail.min, max: e.detail.max };
            this.updateVisibleInputs(this.initialValues);
            this.onValueUpdated(true);
        };
    }
    /**
     * @fires ZetaRangeSliderEvent:change
     */
    onValueUpdated(sliderChange = false) {
        if (this.initialValues.min != undefined && this.initialValues.max != undefined) {
            this.error = this.isError(this.initialValues);
            if (!this.isError(this.initialValues)) {
                this.updateHiddenInput();
            }
            if (!sliderChange) {
                this.dispatchEvent(new ZetaRangeSliderEvent({ min: this.initialValues.min, max: this.initialValues.max }).toEvent());
            }
        }
    }
    isError(values) {
        return values.min < this.min || values.min > this.max || values.max > this.max || values.min > values.max || isNaN(values.min) || isNaN(values.max);
    }
    handleInputChange(e, isLower) {
        const target = e.target;
        if (isLower) {
            this.initialValues.min = parseInt(target.value);
        }
        else {
            this.initialValues.max = parseInt(target.value);
        }
        this.onValueUpdated();
    }
    updateVisibleInputs(values) {
        this.lowerInput.value = values.min.toString();
        this.upperInput.value = values.max.toString();
    }
    updateHiddenInput() {
        if (this.hiddenInput) {
            this.hiddenInput.value = `${this.initialValues.min}-${this.initialValues.max}`;
            this.hiddenInput.dispatchEvent(new Event("input"));
        }
    }
    handleChange(event) {
        return event;
        // this.dispatchEvent(new Event(event.type, event)); //TODO something dont work here
    }
    firstUpdated() {
        this.updateHiddenInput();
    }
    getLabel() {
        if (this.label) {
            return html `<label for=${this.id} class="range-selector-label">${this.label}</label>`;
        }
        else {
            return nothing;
        }
    }
    getInput(isLower) {
        return html `
      <input
        aria-label=${this.label ?? "slider input"}
        ?disabled=${this.disabled}
        class="contourable-target ${isLower ? "lower-input" : "upper-input"}"
        type="number"
        min=${isLower ? this.min : live(this.initialValues.min.toString())}
        max=${isLower ? live(this.initialValues.max?.toString()) : this.max}
        name=${(ifDefined(this.name), isLower ? "-lower" : "-upper")}
        step=${ifDefined(this.stepIncrement)}
        value=${ifDefined(isLower ? live(this.initialValues.min) : live(this.initialValues.max))}
        @input=${(e) => this.handleInputChange(e, isLower)}
      />
    `;
    }
    render() {
        return html `
      ${this.getLabel()}
      <div class="slider-input-container center">
        ${super.render()} ${this.getInput(true)}
        <div class="slider-container">
          <zeta-slider
            type="range"
            stepIncrement=${ifDefined(this.stepIncrement)}
            .rounded=${this.rounded}
            .disabled=${this.disabled}
            lowerValue=${ifDefined(this.initialValues.min)}
            upperValue=${ifDefined(this.initialValues.max)}
            min=${this.min}
            max=${this.max}
            @change=${this.sliderChange}
          >
          </zeta-slider>
        </div>
        ${this.getInput(false)}
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaRangeSelector.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZetaRangeSelector.prototype, "name", void 0);
__decorate([
    property({ type: Object })
], ZetaRangeSelector.prototype, "initialValues", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaRangeSelector.prototype, "error", void 0);
__decorate([
    property({ type: Number })
], ZetaRangeSelector.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], ZetaRangeSelector.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], ZetaRangeSelector.prototype, "stepIncrement", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaRangeSelector.prototype, "disabled", void 0);
__decorate([
    query("input#hidden-range-selector-input")
], ZetaRangeSelector.prototype, "hiddenInput", void 0);
__decorate([
    query(".lower-input")
], ZetaRangeSelector.prototype, "lowerInput", void 0);
__decorate([
    query(".upper-input")
], ZetaRangeSelector.prototype, "upperInput", void 0);
ZetaRangeSelector = __decorate([
    customElement("zeta-range-selector")
], ZetaRangeSelector);
export { ZetaRangeSelector };
//# sourceMappingURL=range-selector.js.map