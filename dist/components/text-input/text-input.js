var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./text-input.styles.js";
import {} from "@zebra-fed/zeta-icons";
import { classMap } from "lit/directives/class-map.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";
import { FormField } from "../../mixins/form-field.js";
// TODO: Split into separate TextInput and TextArea components, as the shared code is minimal and this would simplify the implementation of both components. This would also allow us to remove the `rows` property from TextInput, which is not applicable to it.
/** A field for entering a value, stacked with its label above and a hint below (spec: Input). `type` picks text,
 * number, password, date or time, each bringing its own trailing control; Zeta adds textarea and integer. The label
 * can mark the field required or optional and carry an information icon; the hint holds guidance at rest and the
 * reason when `error` is set. `flavor` is default (bordered), gradient (a unique highlight, such as an AI field) or
 * ghost (borderless, for a surface that already bounds it).
 *
 * Set `block` to fill the container's width. For any other width, wrap it in a sized container.
 *
 * @event {FocusEvent} focus - Fired when the input field is focused
 * @event {FocusEvent} blur - Fired when the input field is blurred
 * @event {Event} change - Fired when the input value changes and is committed
 * @event {InputEvent} input - Fired when the input value changes
 *
 * @part field - The bordered box around the value.
 * @part prefix - The prefix text.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-text-input--docs
 */
let ZetaTextInput = class ZetaTextInput extends FormField(Size(Contourable(Interactive(LitElement)))) {
    constructor() {
        super(...arguments);
        /** Whether text field is in error state. */
        this.error = false;
        /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
        this.block = false;
        /** Prefix text. */
        this.prefix = "";
        /**
         * Label shown above text field.
         *
         */
        this.label = "";
        /** Type of field */
        /** default: bordered. gradient: a unique highlight, such as an AI field. ghost: no border at rest. */
        this.flavor = "default";
        /** Marks the label "(optional)", for a mostly required form. */
        this.optional = false;
        /** Adds an information icon after the label. */
        this.showInformation = false;
        /** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
        this.subLabel = "";
        /** Keeps the icon ahead of the hint, which is what makes an error read as an error before it is read. */
        this.showHintIcon = true;
        this.type = "text";
        this._valueOnLastFocus = null;
        this._incId = null;
        this._decId = null;
        this.toggled = false;
    }
    static { this.shadowRootOptions = { delegatesFocus: true, mode: "open" }; }
    static { this.styles = [styles, super.styles ?? []]; }
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        this.internals.role = "input";
        this.role = "input";
    }
    focus() {
        this.inputEl?.focus();
    }
    blur() {
        this.inputEl?.blur();
    }
    handleChange(_event) {
        //Ignore Change Events, we calculate this on blur;
        return;
    }
    handleFocus(_event) {
        super.handleFocus(_event);
        this._valueOnLastFocus = this.value;
    }
    handleBlur(_event) {
        super.handleBlur(_event);
        //Fire the onChange event if and only if the value has changed
        if (this._valueOnLastFocus !== this.value) {
            this.dispatchEvent(new Event("change"));
            this._valueOnLastFocus = null;
        }
    }
    /* INTEGER MODE */
    increment() {
        if (this.type === "integer" && Number(this.value) !== this.max) {
            this.value = ((parseFloat(this.value) || 0) + 1).toString();
            this.dispatchEvent(new Event("change"));
        }
    }
    decrement() {
        if (this.type === "integer" && Number(this.value) !== this.min) {
            this.value = ((parseFloat(this.value) || 0) - 1).toString();
            this.dispatchEvent(new Event("change"));
        }
    }
    _startHold(isIncrement) {
        this._stopHold(isIncrement);
        const fn = isIncrement ? () => this.increment() : () => this.decrement();
        const id = window.setTimeout(() => {
            const intervalId = window.setInterval(fn, 50);
            if (isIncrement) {
                this._incId = intervalId;
            }
            else {
                this._decId = intervalId;
            }
        }, 300);
        if (isIncrement) {
            this._incId = id;
        }
        else {
            this._decId = id;
        }
    }
    _stopHold(isIncrement) {
        const id = isIncrement ? this._incId : this._decId;
        if (id !== null) {
            clearTimeout(id);
            clearInterval(id);
            if (isIncrement) {
                this._incId = null;
            }
            else {
                this._decId = null;
            }
        }
    }
    /* INTEGER MODE */
    render() {
        return html `<div class="container">
      ${this.label ? html `<label class="labelled">${this.renderLabel()} ${this.renderInput()}</label>` : this.renderInput()} ${this.renderHint()}
    </div>`;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        // The sub label sits inside the <label> but is hidden from it, so it reaches assistive technology as the
        // field's description rather than as part of its name.
        const field = this.shadowRoot?.querySelector("input, textarea");
        if (field) {
            if (this.label && this.subLabel)
                field.setAttribute("aria-description", this.subLabel);
            else
                field.removeAttribute("aria-description");
        }
    }
    renderLabel() {
        const row = this.renderLabelRow();
        return this.subLabel
            ? html `<span class="label-group">${row}<span class="sub-label" aria-hidden="true">${this.subLabel}</span></span>`
            : row;
    }
    renderLabelRow() {
        return html `<span class="label">
      ${this.label} ${this.required ? html `<span class="required" aria-hidden="true">*</span>` : nothing}
      ${this.optional && !this.required ? html `<span class="optional">(optional)</span>` : nothing}
      ${this.showInformation ? html `<zeta-icon class="information" aria-hidden="true" .rounded=${this.rounded}>info</zeta-icon>` : nothing}
    </span>`;
    }
    renderInput() {
        const containerClass = classMap({
            "input-container": true,
            "interactive-target": true,
            "text-area": this.type === "textarea"
        });
        return html `<div part="field" class=${containerClass}>
      ${this.renderLeftIcon()} ${this.renderPrefix()} ${super.render()} ${this.renderRightIcon()} ${this.renderSuffix()}
    </div>`;
    }
    renderHint() {
        return this.error || this.hintText
            ? html `<div class="hint-text">
          ${this.showHintIcon ? html `<zeta-icon .rounded=${this.rounded}>${this.error ? "error" : "info"}</zeta-icon>` : nothing}
          <span id="hint-text">${this.error ? this.errorText : this.hintText}</span>
        </div>`
            : nothing;
    }
    renderLeftIcon() {
        return this.leadingIcon && this.type === "text" && !this.toggled
            ? html `<zeta-icon class="left" .rounded=${this.rounded}>${this.leadingIcon}</zeta-icon> `
            : nothing;
    }
    renderRightIcon() {
        return this.trailingIcon && this.type === "text" && !this.toggled
            ? html `<zeta-icon class="right" .rounded=${this.rounded}>${this.trailingIcon}</zeta-icon>`
            : this.type === "password" || this.toggled
                ? html `<zeta-icon
            @click=${() => {
                    this.toggled = !this.toggled;
                    this.type = this.type === "text" ? "password" : "text";
                }}
            class="right"
            .rounded=${this.rounded}
          >
            ${this.toggled ? "visibility" : "visibility_off"}
          </zeta-icon>`
                : this.type === "time" || this.type === "date"
                    ? html `<zeta-icon @click=${() => this.inputEl.showPicker()} class="right" .rounded=${this.rounded}
              >${this.type === "time" ? "clock_outline" : "calendar_3_day"}</zeta-icon
            >`
                    : this.type === "integer"
                        ? html `<div class="arrows-container right">
                <div
                  class="arrow up"
                  @click=${() => this.increment()}
                  @mousedown=${() => this._startHold(true)}
                  @mouseup=${() => this._stopHold(true)}
                  @mouseleave=${() => this._stopHold(true)}
                >
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden="true">
                    <polygon points="3.5,0 7,5 0,5" />
                  </svg>
                </div>
                <div
                  class="arrow down"
                  @click=${() => this.decrement()}
                  @mousedown=${() => this._startHold(false)}
                  @mouseup=${() => this._stopHold(false)}
                  @mouseleave=${() => this._stopHold(false)}
                >
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden="true" style="transform: rotate(180deg);">
                    <polygon points="3.5,0 7,5 0,5" />
                  </svg>
                </div>
              </div>`
                        : nothing;
    }
    renderPrefix() {
        return this.prefix && (this.type === "text" || this.type === "number") && !this.toggled ? html `<span part="prefix" class="left affix">${this.prefix}</span>` : nothing;
    }
    renderSuffix() {
        return this.suffix && (this.type === "text" || this.type === "number") && !this.toggled ? html `<span class="right affix">${this.suffix}</span>` : nothing;
    }
};
__decorate([
    query("input")
], ZetaTextInput.prototype, "inputEl", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTextInput.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTextInput.prototype, "block", void 0);
__decorate([
    property({ type: String })
], ZetaTextInput.prototype, "leadingIcon", void 0);
__decorate([
    property({ type: String })
], ZetaTextInput.prototype, "trailingIcon", void 0);
__decorate([
    property({ type: String })
], ZetaTextInput.prototype, "prefix", void 0);
__decorate([
    property({ type: String })
], ZetaTextInput.prototype, "suffix", void 0);
__decorate([
    property({ type: Number })
], ZetaTextInput.prototype, "rows", void 0);
__decorate([
    property()
], ZetaTextInput.prototype, "label", void 0);
__decorate([
    property()
], ZetaTextInput.prototype, "hintText", void 0);
__decorate([
    property()
], ZetaTextInput.prototype, "errorText", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaTextInput.prototype, "flavor", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaTextInput.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTextInput.prototype, "optional", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-information" })
], ZetaTextInput.prototype, "showInformation", void 0);
__decorate([
    property({ type: String, attribute: "sub-label" })
], ZetaTextInput.prototype, "subLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-hint-icon" })
], ZetaTextInput.prototype, "showHintIcon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaTextInput.prototype, "type", void 0);
ZetaTextInput = __decorate([
    customElement("zeta-text-input")
], ZetaTextInput);
export { ZetaTextInput };
//# sourceMappingURL=text-input.js.map