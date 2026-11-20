import { customElement, property, query } from "lit/decorators.js";
import { FormField, type ZetaInputType } from "../../mixins/form-field.js";
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
 * @storybook ?path=/docs/components-stepper-input--docs
 */
@customElement("zeta-stepper-input")
export class ZetaStepperInput extends FormField(Contourable(LitElement)) {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };

  static styles = [super.styles || [], styles];

  @query("input") private readonly inputEl!: HTMLInputElement;

  private _valueOnLastFocus: string | null = null;

  override handleFocus(_event: FocusEvent): void {
    super.handleFocus(_event);
    this._valueOnLastFocus = this.value;
  }

  override handleBlur(_event: FocusEvent): void {
    super.handleBlur(_event);
    this.value = this.validateValue(this.value);
    //Fire the onChange event if and only if the value has changed
    if (this._valueOnLastFocus !== this.value) {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      this._valueOnLastFocus = null;
    }
  }

  @property({ type: String })
  override value: string = "";

  // Keep value in sync with input element
  updated(changedProps: Map<string, unknown>) {
    super.updated?.(changedProps);
    if (changedProps.has("valueLabel")) this.inputEl?.setAttribute("aria-label", this.valueLabel);
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

  /** Disables the control: the field greys out, the buttons move to the primary flavour and the hint is removed. */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ reflect: true }) size: "medium" | "large" = "medium";

  /**
   * Hint text shown below text field.
   *
   * if `error`, then `errorText` is shown instead.
   */
  @property() hintText?: string;

  /** Whether text field is in error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /**
   * Error hint text
   *
   * Shown if `error`, replaces `hintText`.
   */
  @property() errorText?: string;

  /** Accessible name of the value. */
  @property({ type: String, attribute: "value-label" }) valueLabel = "Value";

  /** Accessible name of the decrease button. */
  @property({ type: String, attribute: "decrement-label" }) decrementLabel = "Decrease";

  /** Accessible name of the increase button. */
  @property({ type: String, attribute: "increment-label" }) incrementLabel = "Increase";

  override type: Extract<ZetaInputType, "stepper"> = "stepper";

  handleChange(_event: Event) {
    this.value = this.validateValue(this.value);
    return;
  }

  protected firstUpdated() {
    this.value = this.validateValue(this.value);
  }

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  private validateValue(value: string): string {
    const valueToNumber = Number(value);
    if (isNaN(valueToNumber) || valueToNumber === undefined) {
      value = "0";
    } else if (this.max && valueToNumber >= this.max) {
      value = this.max.toString();
    } else if (this.min !== undefined && valueToNumber <= this.min) {
      value = this.min.toString();
    } else {
      value = valueToNumber.toString();
    }
    return value;
  }

  // Check needed as safari does not focus the input element when clicking on the buttons
  private _isSafari = (): boolean => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  private onButtonClick(increment: boolean): void {
    if (this._isSafari()) this.focus();
    const currentValue = Number(this.value);
    this.value = this.validateValue((currentValue + (increment ? 1 : -1)).toString());
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
  }

  protected render() {
    const flavor = this.disabled ? "primary" : "outline-subtle";
    const shape = this.rounded ? "rounded" : "sharp";
    const hint = this.error ? this.errorText : this.hintText;
    return html`
      <div class="stepper">
        <div class="container">
          <zeta-icon-button
            class="decrement"
            .disabled=${this.disabled || (this.min !== undefined && Number(this.value) <= this.min)}
            shape=${shape}
            size=${this.size}
            flavor=${flavor}
            aria-label=${this.decrementLabel}
            @blur=${(e: FocusEvent) => this.handleBlur(e)}
            @focus=${(e: FocusEvent) => this.handleFocus(e)}
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
            @blur=${(e: FocusEvent) => this.handleBlur(e)}
            @focus=${(e: FocusEvent) => this.handleFocus(e)}
            @click=${() => this.onButtonClick(true)}
          >
            add
          </zeta-icon-button>
        </div>
        ${
          hint && !this.disabled
            ? html`<div class="hint-text">
                <zeta-icon .rounded=${this.rounded}>${this.error ? "error" : "info"}</zeta-icon>
                <span id="hint-text">${hint}</span>
              </div>`
            : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper-input": ZetaStepperInput;
  }
}
