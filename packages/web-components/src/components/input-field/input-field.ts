import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./input-field.styles.js";
import "../icon/icon.js";
import "../divider/divider.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type InputFieldType = "text" | "number" | "password" | "date" | "time";
export type InputFieldSize = "small" | "medium" | "large";
export type InputFieldShape = "sharp" | "rounded" | "full";
export type InputFieldFlavour = "default" | "gradient" | "ghost";
/** The spec's State axis. Interaction states are derived; `invalid`, `read-only` and `disabled` come from properties. */
export type InputFieldState = "enabled" | "hover" | "focus" | "selected" | "typing" | "filled" | "invalid" | "read-only" | "disabled";

/**
 * The text entry control on its own, without a label or hint around it. One
 * model covers five input types, Text, Number, Password, Date and Time, which
 * share the same Size, Shape, State and Flavour and differ only in their
 * placeholder and in the control sitting at the trailing edge. Reach for it
 * directly when a field needs no label or supporting text, and reach for
 * `<zds-input>` when it does.
 *
 * Figma builds one component set per type; here they are one element with a
 * `type`. On a native `<input>`:
 * - **text**: optional `trailing-icon` (the spec's hasTrailing, off by default).
 * - **number**: native numeric input; arrow keys step it. Its trailing icon
 *   defaults to `dialpad` (the spec's hasTrailing, on by default); set
 *   `trailing-icon=""` for none.
 * - **password**: a reveal control, always present.
 * - **date**, **time**: a `calendar-3-day` / `clock-outline` control opening
 *   the platform picker, always present. No leading icon.
 *
 * State, as the spec's run enabled → focus → selected → typing → filled:
 * keyboard focus on an empty field is `focus`, pointer focus `selected`, any
 * focus with a value `typing` (the only state offering clear), a value at
 * rest `filled`. `invalid`, `readonly` and `disabled` are set by the form.
 * `:focus-visible` cannot separate keyboard from pointer focus on a text
 * input, so the modality is tracked from pointerdown.
 *
 * Every icon and control takes the value's colour: foreground/primary, and
 * foreground/disabled when disabled (spec, fixed in Figma 2026-10-15).
 *
 * @fires input - The value changed.
 * @fires change - The value was committed.
 * @fires clear - The clear control emptied the field.
 * @csspart field - The bordered field.
 * @csspart input - The native input.
 *
 * @spec specs/input/input.spec.json
 */
@customElement("zds-input-field")
export class ZdsInputField extends LitElement {
  static styles = styles;
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** What the field holds; brings its own placeholder shape and trailing control. */
  @property({ type: String, reflect: true }) type: InputFieldType = "text";

  /** Fits the field to its surface. Only `small` also reduces the text. Default medium (spec decision). */
  @property({ type: String, reflect: true }) size: InputFieldSize = "medium";

  /** Corners. Match the controls around the field. */
  @property({ type: String, reflect: true }) shape: InputFieldShape = "sharp";

  /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction such as an AI companion field. */
  @property({ type: String, reflect: true }) flavour: InputFieldFlavour = "default";

  /** The value failed validation. Changes the border only; pair it with an error hint. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Fills the container's width. Without it the field starts at 280 and narrows to fit its container. */
  @property({ type: Boolean, reflect: true }) block = false;

  /** Shown but not editable; stays legible, selectable and in the tab order. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  @property({ type: Boolean, reflect: true }) required = false;

  /** Accessible name. A visible label belongs to `<zds-input>`. */
  @property({ type: String }) label: string | null = null;

  /** Accessible description, e.g. the hint text of a surrounding `<zds-input>`. */
  @property({ type: String }) description: string | null = null;

  /** The value, as the native input formats it (dates `YYYY-MM-DD`, times `HH:MM`). */
  @property({ type: String }) value = "";

  /** Shown while empty. Not a label. Spec placeholders: Placeholder, 0, Password; date and time show the platform's format. */
  @property({ type: String }) placeholder = "";

  /** Field name submitted with a form. */
  @property({ type: String }) name: string | null = null;

  /** Bounds and step (number, date, time). */
  @property({ type: String }) min: string | null = null;
  @property({ type: String }) max: string | null = null;
  @property({ type: String }) step: string | null = null;

  /** Leading icon (the spec's hasLeading). Text, number and password only. */
  @property({ type: String, attribute: "leading-icon" }) leadingIcon: IconName | null = null;

  /** Trailing icon on text and number (the spec's hasTrailing). Number defaults to `dialpad`; `""` for none. */
  @property({ type: String, attribute: "trailing-icon" }) trailingIcon: IconName | "" | null = null;

  /** Text between the leading icon and the value, such as a dial code. It reads with the value. */
  @property({ type: String, attribute: "leading-text" }) leadingText: string | null = null;

  /** The on-screen keyboard to ask for, the native `inputmode`. Defaults to `decimal` on number. */
  @property({ type: String }) keyboard: string | null = null;

  /** The native `autocomplete`. Defaults to `current-password` on password and `off` otherwise. */
  @property({ type: String }) autocomplete: string | null = null;

  /** Accessible name of the clear control. */
  @property({ type: String, attribute: "clear-label" }) clearLabel = "Clear";

  @state() private focused = false;
  @state() private keyboardFocus = false;
  @state() private revealed = false;
  @query("input") private input!: HTMLInputElement;

  private pointerPressed = false;
  private readonly internals: ElementInternals;
  private defaultValue = "";

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.addEventListener("pointerdown", () => { this.pointerPressed = true; });
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("value")) this.internals.setFormValue(this.value);
    if (this.input) {
      if (!this.input.validity.valid) this.internals.setValidity(this.input.validity, this.input.validationMessage, this.input);
      else this.internals.setValidity({});
    }
    if (changed.has("type") && this.type !== "password") this.revealed = false;
  }

  formResetCallback() { this.value = this.defaultValue; }
  formDisabledCallback(disabled: boolean) { this.disabled = disabled; }
  focus(options?: FocusOptions) { this.input?.focus(options); }

  /** The current State, as the spec names it. */
  get currentState(): InputFieldState {
    if (this.disabled) return "disabled";
    if (this.focused) return this.value ? "typing" : this.keyboardFocus ? "focus" : "selected";
    if (this.invalid) return "invalid";
    if (this.readonly) return "read-only";
    return this.value ? "filled" : "enabled";
  }

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  private onFocus() {
    this.focused = true;
    this.keyboardFocus = !this.pointerPressed;
    this.pointerPressed = false;
  }

  private onBlur(e: FocusEvent) {
    if (this.renderRoot.contains(e.relatedTarget as Node)) return; // focus moved to a control inside
    this.focused = false;
    this.keyboardFocus = false;
    this.pointerPressed = false;
  }

  private clear() {
    this.value = "";
    this.input.focus();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("clear", { bubbles: true, composed: true }));
  }

  private openPicker() {
    if (this.disabled || this.readonly) return;
    this.input.focus();
    try { (this.input as HTMLInputElement & { showPicker?: () => void }).showPicker?.(); } catch { /* needs a user gesture; focus is enough */ }
  }

  private get iconSize() { return this.size === "small" ? "small" : "medium"; }

  /** A trailing control: tabbable (nothing else reaches it), keeps focus in the input on press. */
  private control(icon: IconName, label: string, onClick: () => void, pressed?: boolean) {
    return html`<button class="control" type="button" aria-label=${label} aria-pressed=${ifDefined(pressed === undefined ? undefined : String(pressed))}
      ?disabled=${this.disabled || this.readonly}
      @pointerdown=${(e: PointerEvent) => e.preventDefault()} @click=${onClick} @blur=${this.onBlur}
    ><zds-icon name=${icon} size=${this.iconSize} .iconStyle=${"rounded"}></zds-icon></button>`;
  }

  private renderTrailing(st: InputFieldState) {
    const typing = st === "typing" && !this.readonly;
    const clear = this.control("cancel", this.clearLabel, () => this.clear());
    let typeControl: unknown = nothing;
    if (this.type === "password") typeControl = this.control(this.revealed ? "visibility-off" : "visibility", this.revealed ? "Hide password" : "Show password", () => { this.revealed = !this.revealed; }, this.revealed);
    if (this.type === "date") typeControl = this.control("calendar-3-day", "Choose date", () => this.openPicker());
    if (this.type === "time") typeControl = this.control("clock-outline", "Choose time", () => this.openPicker());
    if (typeControl !== nothing) {
      // Password, date, time: clear joins the type control, divided (spec typing group).
      return typing ? html`${clear}<zds-divider class="divider" orientation="vertical" aria-hidden="true"></zds-divider>${typeControl}` : typeControl;
    }
    // Text, number: clear replaces the trailing icon while typing.
    if (typing) return clear;
    const icon = this.trailingIcon === "" ? null : this.trailingIcon ?? (this.type === "number" ? "dialpad" : null);
    return icon ? html`<zds-icon class="icon" name=${icon} size=${this.iconSize} .iconStyle=${"rounded"} aria-hidden="true"></zds-icon>` : nothing;
  }

  protected render() {
    const st = this.currentState;
    const showLeading = !!this.leadingIcon && this.type !== "date" && this.type !== "time";
    const trailing = this.renderTrailing(st);
    return html`
      <div part="field" class=${classMap({ field: true, [st]: true })}>
        ${showLeading ? html`<zds-icon class="icon" name=${this.leadingIcon} size=${this.iconSize} .iconStyle=${"rounded"} aria-hidden="true"></zds-icon>` : nothing}
        ${this.leadingText ? html`<span class="leading-text">${this.leadingText}</span>` : nothing}
        <input id="input" part="input"
          type=${this.type === "password" && this.revealed ? "text" : this.type}
          .value=${live(this.value)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          name=${ifDefined(this.name ?? undefined)}
          min=${ifDefined(this.min ?? undefined)} max=${ifDefined(this.max ?? undefined)} step=${ifDefined(this.step ?? undefined)}
          inputmode=${ifDefined(this.keyboard ?? (this.type === "number" ? "decimal" : undefined))}
          ?disabled=${this.disabled} ?readonly=${this.readonly} ?required=${this.required}
          aria-invalid=${this.invalid ? "true" : "false"}
          aria-label=${ifDefined(this.label ?? undefined)}
          aria-description=${ifDefined(this.description ?? undefined)}
          autocomplete=${this.autocomplete ?? (this.type === "password" ? "current-password" : "off")}
          @input=${this.onInput} @change=${() => this.dispatchEvent(new Event("change", { bubbles: true }))}
          @focus=${this.onFocus} @blur=${this.onBlur} />
        ${trailing === nothing ? nothing : html`<span class="trailing">${trailing}</span>`}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-input-field": ZdsInputField; }
}
