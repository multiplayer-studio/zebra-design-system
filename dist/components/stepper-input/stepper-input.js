var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from "lit/decorators.js";
import { FormField } from "../../mixins/form-field.js";
import { html, LitElement, nothing } from "lit";
import styles from "./stepper-input.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button.js";
import "../icon/icon.js";
/** A numeric value with a button either side to decrease or increase it. A button disables itself at `min` or `max`,
 * and a typed value is held between them. Size large suits a touch surface. The hint shows below the control and is
 * removed while disabled; `error` swaps it for `errorText`.
 *
 * @event {Event} change - Fired when the value of the stepper input changes.
 * @event {FocusEvent} focus - Fired when the stepper input receives focus.
 * @event {FocusEvent} blur - Fired when the stepper input loses focus.
 * @event {InputEvent} input - Fired when the value of the stepper input changes.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5595-122
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper-input--docs
 */
let ZetaStepperInput = class ZetaStepperInput extends FormField(Contourable(LitElement)) {
    constructor() {
        super(...arguments);
        this._valueOnLastFocus = null;
        this.value = "";
        /** Disables the control: the field greys out, the buttons move to the primary flavour and the hint is removed. */
        this.disabled = false;
        this.size = "medium";
        /** Whether text field is in error state. */
        this.error = false;
        /** Accessible name of the value. */
        this.valueLabel = "Value";
        /** Accessible name of the decrease button. */
        this.decrementLabel = "Decrease";
        /** Accessible name of the increase button. */
        this.incrementLabel = "Increase";
        this.type = "stepper";
        // Check needed as safari does not focus the input element when clicking on the buttons
        this._isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
    static { this.shadowRootOptions = { delegatesFocus: true, mode: "open" }; }
    static { this.styles = [super.styles || [], styles]; }
    handleFocus(_event) {
        super.handleFocus(_event);
        this._valueOnLastFocus = this.value;
    }
    handleBlur(_event) {
        super.handleBlur(_event);
        this.value = this.validateValue(this.value);
        //Fire the onChange event if and only if the value has changed
        if (this._valueOnLastFocus !== this.value) {
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            this._valueOnLastFocus = null;
        }
    }
    // Keep value in sync with input element
    updated(changedProps) {
        super.updated?.(changedProps);
        if (changedProps.has("valueLabel"))
            this.inputEl?.setAttribute("aria-label", this.valueLabel);
        if (changedProps.has("value") && this.inputEl) {
            const newValue = this.value;
            if (newValue !== this.inputEl.value) {
                this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            }
            if (document.activeElement !== this.inputEl && document.activeElement !== this) {
                this.value = this.validateValue(newValue);
            }
        }
    }
    handleChange(_event) {
        this.value = this.validateValue(this.value);
        return;
    }
    firstUpdated() {
        this.value = this.validateValue(this.value);
    }
    focus() {
        this.inputEl?.focus();
    }
    blur() {
        this.inputEl?.blur();
    }
    validateValue(value) {
        const valueToNumber = Number(value);
        if (isNaN(valueToNumber) || valueToNumber === undefined) {
            value = "0";
        }
        else if (this.max && valueToNumber >= this.max) {
            value = this.max.toString();
        }
        else if (this.min !== undefined && valueToNumber <= this.min) {
            value = this.min.toString();
        }
        else {
            value = valueToNumber.toString();
        }
        return value;
    }
    onButtonClick(increment) {
        if (this._isSafari())
            this.focus();
        const currentValue = Number(this.value);
        this.value = this.validateValue((currentValue + (increment ? 1 : -1)).toString());
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    }
    render() {
        const flavor = this.disabled ? "primary" : "outline-subtle";
        const shape = this.rounded ? "rounded" : "sharp";
        const hint = this.error ? this.errorText : this.hintText;
        return html `
      <div class="stepper">
        <div class="container">
          <zeta-icon-button
            class="decrement"
            .disabled=${this.disabled || (this.min !== undefined && Number(this.value) <= this.min)}
            shape=${shape}
            size=${this.size}
            flavor=${flavor}
            aria-label=${this.decrementLabel}
            @blur=${(e) => this.handleBlur(e)}
            @focus=${(e) => this.handleFocus(e)}
            @click=${() => this.onButtonClick(false)}
          >
            remove
          </zeta-icon-button>
          <div class="input-container contourable-target">${super.render()}</div>
          <zeta-icon-button
            class="increment"
            .disabled=${this.disabled || (this.max !== undefined && Number(this.value) >= this.max)}
            shape=${shape}
            size=${this.size}
            flavor=${flavor}
            aria-label=${this.incrementLabel}
            @blur=${(e) => this.handleBlur(e)}
            @focus=${(e) => this.handleFocus(e)}
            @click=${() => this.onButtonClick(true)}
          >
            add
          </zeta-icon-button>
        </div>
        ${hint && !this.disabled
            ? html `<div class="hint-text">
                <zeta-icon .rounded=${this.rounded}>${this.error ? "error" : "info"}</zeta-icon>
                <span id="hint-text">${hint}</span>
              </div>`
            : nothing}
      </div>
    `;
    }
};
__decorate([
    query("input")
], ZetaStepperInput.prototype, "inputEl", void 0);
__decorate([
    property({ type: String })
], ZetaStepperInput.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaStepperInput.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true })
], ZetaStepperInput.prototype, "size", void 0);
__decorate([
    property()
], ZetaStepperInput.prototype, "hintText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaStepperInput.prototype, "error", void 0);
__decorate([
    property()
], ZetaStepperInput.prototype, "errorText", void 0);
__decorate([
    property({ type: String, attribute: "value-label" })
], ZetaStepperInput.prototype, "valueLabel", void 0);
__decorate([
    property({ type: String, attribute: "decrement-label" })
], ZetaStepperInput.prototype, "decrementLabel", void 0);
__decorate([
    property({ type: String, attribute: "increment-label" })
], ZetaStepperInput.prototype, "incrementLabel", void 0);
ZetaStepperInput = __decorate([
    customElement("zeta-stepper-input")
], ZetaStepperInput);
export { ZetaStepperInput };
//# sourceMappingURL=stepper-input.js.map