import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import styles from "./text-input.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
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
@customElement("zeta-text-input")
export class ZetaTextInput extends FormField(Size(Contourable(Interactive(LitElement)))) {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };

  static styles = [styles, super.styles ?? []];

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.internals.role = "input";
    this.role = "input";
  }

  @query("input") private readonly inputEl!: HTMLInputElement;

  /** Whether text field is in error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
  @property({ type: Boolean, reflect: true }) block = false;

  /** Leading icon name. */
  @property({ type: String }) leadingIcon?: ZetaIconName;

  /** Trailing icon name. */
  @property({ type: String }) trailingIcon?: ZetaIconName;

  /** Prefix text. */
  @property({ type: String }) prefix: string = "";

  /** Suffix text. */
  @property({ type: String }) suffix?: string;

  /** The number of visible text lines for the control. If it is specified, it must be a positive integer. If it is not specified, the default value is 2.
   *
   * Prop only applies when `type` is set to `textarea`.
   */
  @property({ type: Number }) rows?: number;

  /**
   * Label shown above text field.
   *
   */
  @property() label = "";

  /**
   * Hint text shown below text field.
   *
   * if `error`, then `errorText` is shown instead.
   */
  @property() hintText?: string;

  /**
   * Error hint text
   *
   * Shown if `error`, replaces `hintText`.
   */
  @property() errorText?: string;

  /** Type of field */
  /** default: bordered. gradient: a unique highlight, such as an AI field. ghost: no border at rest. */
  @property({ type: String, reflect: true }) flavor: "default" | "gradient" | "ghost" = "default";

  /** Corner shape; `full` is a pill. When unset, `rounded` decides between rounded and sharp. */
  @property({ type: String, reflect: true }) shape?: "sharp" | "rounded" | "full";

  /** Marks the label "(optional)", for a mostly required form. */
  @property({ type: Boolean, reflect: true }) optional = false;

  /** Adds an information icon after the label. */
  @property({ type: Boolean, attribute: "show-information" }) showInformation = false;

  /** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
  @property({ type: String, attribute: "sub-label" }) subLabel = "";

  /** Keeps the icon ahead of the hint, which is what makes an error read as an error before it is read. */
  @property({ type: Boolean, attribute: "show-hint-icon" }) showHintIcon = true;

  @property({ type: String, reflect: true }) type: "text" | "textarea" | "password" | "time" | "date" | "number" | "integer" = "text";

  private _valueOnLastFocus: string | null = null;

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  override handleChange(_event: Event): void {
    //Ignore Change Events, we calculate this on blur;
    return;
  }

  override handleFocus(_event: FocusEvent): void {
    super.handleFocus(_event);
    this._valueOnLastFocus = this.value;
  }

  override handleBlur(_event: FocusEvent): void {
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

  private _incId: number | null = null;
  private _decId: number | null = null;

  private _startHold(isIncrement: boolean) {
    this._stopHold(isIncrement);
    const fn = isIncrement ? () => this.increment() : () => this.decrement();
    const id = window.setTimeout(() => {
      const intervalId = window.setInterval(fn, 50);
      if (isIncrement) {
        this._incId = intervalId;
      } else {
        this._decId = intervalId;
      }
    }, 300);
    if (isIncrement) {
      this._incId = id;
    } else {
      this._decId = id;
    }
  }

  private _stopHold(isIncrement: boolean) {
    const id = isIncrement ? this._incId : this._decId;
    if (id !== null) {
      clearTimeout(id);
      clearInterval(id);
      if (isIncrement) {
        this._incId = null;
      } else {
        this._decId = null;
      }
    }
  }
  /* INTEGER MODE */

  protected render() {
    return html`<div class="container">
      ${this.label ? html`<label class="labelled">${this.renderLabel()} ${this.renderInput()}</label>` : this.renderInput()} ${this.renderHint()}
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // The sub label sits inside the <label> but is hidden from it, so it reaches assistive technology as the
    // field's description rather than as part of its name.
    const field = this.shadowRoot?.querySelector("input, textarea");
    if (field) {
      if (this.label && this.subLabel) field.setAttribute("aria-description", this.subLabel);
      else field.removeAttribute("aria-description");
    }
  }

  private renderLabel() {
    const row = this.renderLabelRow();
    return this.subLabel
      ? html`<span class="label-group">${row}<span class="sub-label" aria-hidden="true">${this.subLabel}</span></span>`
      : row;
  }

  private renderLabelRow() {
    return html`<span class="label">
      ${this.label} ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : nothing}
      ${this.optional && !this.required ? html`<span class="optional">(optional)</span>` : nothing}
      ${this.showInformation ? html`<zeta-icon class="information" aria-hidden="true" .rounded=${this.rounded}>info</zeta-icon>` : nothing}
    </span>`;
  }

  private renderInput() {
    const containerClass = classMap({
      "input-container": true,
      "interactive-target": true,
      "text-area": this.type === "textarea"
    });
    return html`<div part="field" class=${containerClass}>
      ${this.renderLeftIcon()} ${this.renderPrefix()} ${super.render()} ${this.renderRightIcon()} ${this.renderSuffix()}
    </div>`;
  }

  private renderHint() {
    return this.error || this.hintText
      ? html`<div class="hint-text">
          ${this.showHintIcon ? html`<zeta-icon .rounded=${this.rounded}>${this.error ? "error" : "info"}</zeta-icon>` : nothing}
          <span id="hint-text">${this.error ? this.errorText : this.hintText}</span>
        </div>`
      : nothing;
  }

  private renderLeftIcon() {
    return this.leadingIcon && this.type === "text" && !this.toggled
      ? html`<zeta-icon class="left" .rounded=${this.rounded}>${this.leadingIcon}</zeta-icon> `
      : nothing;
  }

  private renderRightIcon() {
    return this.trailingIcon && this.type === "text" && !this.toggled
      ? html`<zeta-icon class="right" .rounded=${this.rounded}>${this.trailingIcon}</zeta-icon>`
      : this.type === "password" || this.toggled
        ? html`<zeta-icon
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
          ? html`<zeta-icon @click=${() => this.inputEl.showPicker()} class="right" .rounded=${this.rounded}
              >${this.type === "time" ? "clock_outline" : "calendar_3_day"}</zeta-icon
            >`
          : this.type === "integer"
            ? html`<div class="arrows-container right">
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

  private renderPrefix() {
    return this.prefix && (this.type === "text" || this.type === "number") && !this.toggled ? html`<span part="prefix" class="left affix">${this.prefix}</span>` : nothing;
  }

  private renderSuffix() {
    return this.suffix && (this.type === "text" || this.type === "number") && !this.toggled ? html`<span class="right affix">${this.suffix}</span>` : nothing;
  }

  private toggled = false;
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-text-input": ZetaTextInput;
  }
}
