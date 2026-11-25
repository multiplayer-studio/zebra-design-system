var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./input.styles.js";
import { inputHintStyles, renderInputHint } from "./input-hint.js";
import "../icon/icon.js";
import "../input-field/input-field.js";
/**
 * The full field assembly, a label above, the field itself and a hint below,
 * stacked and spaced as one unit. Type chooses which of the five field types
 * sits in the middle, and the label and the hint can each be turned off.
 * Reach for it wherever a field needs a name or supporting text, and reach for
 * `<zds-input-field>` on its own where it needs neither.
 *
 * In code the assembly surfaces its parts' properties itself (spec decision:
 * Figma reaches them through the nested instances), including one general
 * `state` that keeps the three parts in agreement:
 * - `invalid` → field invalid, hint as an error.
 * - `disabled` → field disabled, label dimmed, hint dimmed.
 *
 * The label and the hint are text properties; empty means hidden (the spec's
 * Show Label / Show Hint). The label names the field and the hint describes
 * it for assistive technology. A required label carries the asterisk and
 * makes the field required, so the requirement is in its semantics as well
 * as shown.
 *
 * The assembly is the form-associated element: the field lives in its shadow
 * root, where no form can reach it.
 *
 * @fires input - The value changed.
 * @fires change - The value was committed.
 * @csspart label - The label row.
 * @csspart sub-label - The supporting line under the label row.
 * @csspart hint - The hint row.
 *
 * @spec specs/input/input.spec.json
 */
let ZdsInput = class ZdsInput extends LitElement {
    constructor() {
        super();
        /** The field's name, shown above it. Empty hides the label (Show Label). */
        this.label = "";
        /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception in the form. */
        this.labelType = "default";
        /** Adds an information icon after the name (the label's Show Information). Name it with `information-label`. */
        this.information = false;
        /** Accessible name of the information icon. */
        this.informationLabel = "More information";
        /** Supporting line under the name, read as part of the field's description. Empty hides it; needs a `label` (Show Sub Label). */
        this.subLabel = "";
        /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
        this.hint = "";
        /** Icon ahead of the hint (the hint's Show Icon). */
        this.hintIcon = true;
        /** One state across label, field and hint. */
        this.state = "default";
        // ---- the field's own properties, surfaced -------------------------------
        this.type = "text";
        /** Default medium: the size an Input arrives with. */
        this.size = "medium";
        /** Default rounded: the shape an Input arrives with. */
        this.shape = "rounded";
        /** Fills the container's width. Without it the field is a tentative 280 wide and narrows to fit its container. */
        this.block = false;
        this.flavour = "default";
        this.value = "";
        this.placeholder = "";
        this.name = null;
        this.min = null;
        this.max = null;
        this.step = null;
        this.leadingIcon = null;
        this.trailingIcon = null;
        this.readonly = false;
        this.defaultValue = "";
        this.internals = this.attachInternals();
    }
    connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
    }
    updated(changed) {
        if (changed.has("value"))
            this.internals.setFormValue(this.value);
        if (changed.has("value") || changed.has("labelType") || changed.has("state")) {
            const missing = this.labelType === "required" && !this.value && this.state !== "disabled";
            this.internals.setValidity(missing ? { valueMissing: true } : {}, missing ? "Fill in this field." : "", this.field);
        }
    }
    formResetCallback() { this.value = this.defaultValue; }
    formDisabledCallback(disabled) { this.state = disabled ? "disabled" : "default"; }
    focus(options) { this.field?.focus(options); }
    onFieldInput(e) {
        e.stopPropagation();
        this.value = e.target.value;
        this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    }
    render() {
        const disabled = this.state === "disabled";
        const hintType = disabled ? "disabled" : this.state === "invalid" ? "error" : "default";
        return html `
      ${this.label ? html `<div class=${this.subLabel ? "label-group" : "label-contents"}><div part="label" class="label ${disabled ? "disabled" : ""}">
        <span class="name" aria-hidden="true">${this.label}</span>
        ${this.labelType === "required" ? html `<span class="required" aria-hidden="true">*</span>` : nothing}
        ${this.labelType === "optional" ? html `<span class="optional">(optional)</span>` : nothing}
        ${this.information ? html `<zds-icon class="information" name="info" size="medium" .iconStyle=${"rounded"} label=${this.informationLabel}></zds-icon>` : nothing}
      </div>${this.subLabel ? html `<span part="sub-label" class="sub-label ${disabled ? "disabled" : ""}" aria-hidden="true">${this.subLabel}</span>` : nothing}</div>` : nothing}
      <zds-input-field
        block
        .type=${this.type} .size=${this.size} .shape=${this.shape} .flavour=${this.flavour}
        .value=${this.value} .placeholder=${this.placeholder}
        .min=${this.min} .max=${this.max} .step=${this.step}
        .leadingIcon=${this.leadingIcon} .trailingIcon=${this.trailingIcon}
        .readonly=${this.readonly} .disabled=${disabled} .invalid=${this.state === "invalid"}
        .required=${this.labelType === "required"}
        .label=${this.label || null} .description=${[this.label ? this.subLabel : "", this.hint].filter(Boolean).join(". ") || null}
        @input=${this.onFieldInput}
        @change=${(e) => { e.stopPropagation(); this.dispatchEvent(new Event("change", { bubbles: true, composed: true })); }}
      ></zds-input-field>
      ${this.hint ? renderInputHint(hintType, this.hint, this.hintIcon) : nothing}`;
    }
};
ZdsInput.styles = [styles, inputHintStyles];
ZdsInput.formAssociated = true;
ZdsInput.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: String })
], ZdsInput.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "label-type" })
], ZdsInput.prototype, "labelType", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsInput.prototype, "information", void 0);
__decorate([
    property({ type: String, attribute: "information-label" })
], ZdsInput.prototype, "informationLabel", void 0);
__decorate([
    property({ type: String, attribute: "sub-label" })
], ZdsInput.prototype, "subLabel", void 0);
__decorate([
    property({ type: String })
], ZdsInput.prototype, "hint", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "hint-icon" })
], ZdsInput.prototype, "hintIcon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInput.prototype, "state", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInput.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInput.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInput.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsInput.prototype, "block", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInput.prototype, "flavour", void 0);
__decorate([
    property({ type: String })
], ZdsInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ZdsInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], ZdsInput.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZdsInput.prototype, "min", void 0);
__decorate([
    property({ type: String })
], ZdsInput.prototype, "max", void 0);
__decorate([
    property({ type: String })
], ZdsInput.prototype, "step", void 0);
__decorate([
    property({ type: String, attribute: "leading-icon" })
], ZdsInput.prototype, "leadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "trailing-icon" })
], ZdsInput.prototype, "trailingIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsInput.prototype, "readonly", void 0);
__decorate([
    query("zds-input-field")
], ZdsInput.prototype, "field", void 0);
ZdsInput = __decorate([
    customElement("zds-input")
], ZdsInput);
export { ZdsInput };
