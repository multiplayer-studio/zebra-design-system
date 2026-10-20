import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./input.styles.js";
import "../icon/icon.js";
import "../input-field/input-field.js";
import type { ZdsInputField, InputFieldType, InputFieldSize, InputFieldShape, InputFieldFlavour } from "../input-field/input-field.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type InputState = "default" | "invalid" | "disabled";
export type InputLabelType = "default" | "required" | "optional";

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
 * @csspart hint - The hint row.
 *
 * @spec specs/input/input.spec.json
 */
@customElement("zds-input")
export class ZdsInput extends LitElement {
  static styles = styles;
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** The field's name, shown above it. Empty hides the label (Show Label). */
  @property({ type: String }) label = "";

  /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception in the form. */
  @property({ type: String, reflect: true, attribute: "label-type" }) labelType: InputLabelType = "default";

  /** Adds an information icon after the name (the label's Show Information). Name it with `information-label`. */
  @property({ type: Boolean, reflect: true }) information = false;

  /** Accessible name of the information icon. */
  @property({ type: String, attribute: "information-label" }) informationLabel = "More information";

  /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
  @property({ type: String }) hint = "";

  /** Icon ahead of the hint (the hint's Show Icon). */
  @property({ type: Boolean, reflect: true, attribute: "hint-icon" }) hintIcon = true;

  /** One state across label, field and hint. */
  @property({ type: String, reflect: true }) state: InputState = "default";

  // ---- the field's own properties, surfaced -------------------------------
  @property({ type: String, reflect: true }) type: InputFieldType = "text";
  /** Default medium: the size an Input arrives with. */
  @property({ type: String, reflect: true }) size: InputFieldSize = "medium";
  /** Default rounded: the shape an Input arrives with. */
  @property({ type: String, reflect: true }) shape: InputFieldShape = "rounded";
  @property({ type: String, reflect: true }) flavour: InputFieldFlavour = "default";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) name: string | null = null;
  @property({ type: String }) min: string | null = null;
  @property({ type: String }) max: string | null = null;
  @property({ type: String }) step: string | null = null;
  @property({ type: String, attribute: "leading-icon" }) leadingIcon: IconName | null = null;
  @property({ type: String, attribute: "trailing-icon" }) trailingIcon: IconName | "" | null = null;
  @property({ type: Boolean, reflect: true }) readonly = false;

  @query("zds-input-field") private field!: ZdsInputField;
  private readonly internals: ElementInternals;
  private defaultValue = "";

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("value")) this.internals.setFormValue(this.value);
    if (changed.has("value") || changed.has("labelType") || changed.has("state")) {
      const missing = this.labelType === "required" && !this.value && this.state !== "disabled";
      this.internals.setValidity(missing ? { valueMissing: true } : {}, missing ? "Fill in this field." : "", this.field);
    }
  }

  formResetCallback() { this.value = this.defaultValue; }
  formDisabledCallback(disabled: boolean) { this.state = disabled ? "disabled" : "default"; }
  focus(options?: FocusOptions) { this.field?.focus(options); }

  private onFieldInput(e: Event) {
    e.stopPropagation();
    this.value = (e.target as ZdsInputField).value;
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }

  protected render() {
    const disabled = this.state === "disabled";
    const hintType = disabled ? "disabled" : this.state === "invalid" ? "error" : "default";
    return html`
      ${this.label ? html`<div part="label" class="label ${disabled ? "disabled" : ""}">
        <span class="name" aria-hidden="true">${this.label}</span>
        ${this.labelType === "required" ? html`<span class="required" aria-hidden="true">*</span>` : nothing}
        ${this.labelType === "optional" ? html`<span class="optional">(optional)</span>` : nothing}
        ${this.information ? html`<zds-icon class="information" name="info" size="medium" .iconStyle=${"rounded"} label=${this.informationLabel}></zds-icon>` : nothing}
      </div>` : nothing}
      <zds-input-field
        .type=${this.type} .size=${this.size} .shape=${this.shape} .flavour=${this.flavour}
        .value=${this.value} .placeholder=${this.placeholder}
        .min=${this.min} .max=${this.max} .step=${this.step}
        .leadingIcon=${this.leadingIcon} .trailingIcon=${this.trailingIcon}
        .readonly=${this.readonly} .disabled=${disabled} .invalid=${this.state === "invalid"}
        .required=${this.labelType === "required"}
        .label=${this.label || null} .description=${this.hint || null}
        @input=${this.onFieldInput}
        @change=${(e: Event) => { e.stopPropagation(); this.dispatchEvent(new Event("change", { bubbles: true, composed: true })); }}
      ></zds-input-field>
      ${this.hint ? html`<div part="hint" class="hint ${hintType}">
        ${this.hintIcon ? html`<zds-icon class="hint-icon" name=${hintType === "error" ? "error" : "info"} size="small" .iconStyle=${"rounded"} aria-hidden="true"></zds-icon>` : nothing}
        <span class="message" aria-live=${hintType === "error" ? "polite" : "off"}>${this.hint}</span>
      </div>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-input": ZdsInput; }
}
