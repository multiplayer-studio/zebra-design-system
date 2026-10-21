import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { ifDefined } from "lit/directives/if-defined.js";
import inputFieldStyles from "../input-field/input-field.styles.js";
import { inputHintStyles, renderInputHint } from "../input/input-hint.js";
import styles from "./stepper-input.styles.js";
import "../icon-button/icon-button.js";

export type StepperInputSize = "medium" | "large";
/** Figma's `rounded` false | true, exposed as the library's `shape` (sharp | rounded), as on Button and Input. */
export type StepperInputShape = "sharp" | "rounded";

// Press-and-hold timing, Base UI NumberField's (START_AUTO_CHANGE_DELAY,
// CHANGE_VALUE_TICK_DELAY) so the two packages repeat at the same rate.
const HOLD_DELAY = 400;
const HOLD_TICK = 60;

const clamp = (v: number, min: number | null, max: number | null) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v));
const decimals = (n: number) => (String(n).split(".")[1] ?? "").length;

/**
 * A numeric value with a button on either side to decrease or increase it,
 * and an optional hint below.
 *
 * The number model matches the React package's Base UI NumberField: a typed
 * value is kept (clamped to `min` / `max` on blur or Enter), the buttons
 * disable at the bounds, pressing and holding a button repeats, ArrowUp /
 * ArrowDown step (Shift for `large-step`), PageUp / PageDown move by
 * `large-step`, Home / End jump to `min` / `max`. The input is a
 * `role="spinbutton"` with aria-valuenow / -min / -max; the buttons are out of
 * the tab order (the keyboard drives the input) but stay pressable by pointer
 * and assistive technology.
 *
 * Reuses rather than redraws: the buttons are `<zds-icon-button>`
 * (outline-subtle, `remove` / `add`), the value box is `<zds-input-field>`'s
 * own stylesheet, the hint is Input Hint, so each keeps its own hover, focus,
 * disabled and invalid states. The value box is the field's styles rather
 * than the element because spinbutton semantics must sit on the native input,
 * which the element's shadow root would hide.
 *
 * Form-associated: submits `value` under `name`.
 *
 * @fires zds-value-change - The value changed. `detail.value` is the number, or null when emptied.
 * @csspart field - The value box.
 * @csspart input - The native input.
 * @csspart hint - The hint row.
 *
 * @spec specs/stepper-input/stepper-input.spec.json
 */
@customElement("zds-stepper-input")
export class ZdsStepperInput extends LitElement {
  // input-field's styles bind to :host([size]) — the same medium / large values.
  static styles = [inputFieldStyles, inputHintStyles, styles];
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** The value. `null` is an empty field. Defaults to 0 held inside `min` / `max`. */
  @property({ type: Number }) value: number | null = 0;

  /** Lowest value. Decrease disables on reaching it; Home jumps to it. */
  @property({ type: Number }) min: number | null = null;

  /** Highest value. Increase disables on reaching it; End jumps to it. Also sizes the value box. */
  @property({ type: Number }) max: number | null = null;

  /** Amount one press or arrow key moves the value. */
  @property({ type: Number }) step = 1;

  /** Amount PageUp / PageDown and Shift + arrow move the value. */
  @property({ type: Number, attribute: "large-step" }) largeStep = 10;

  /** medium sits among other medium fields; large is easier to tap. Only the buttons and the value height grow. */
  @property({ type: String, reflect: true }) size: StepperInputSize = "medium";

  /** Corners of the two step buttons. The value box stays square either way (spec metadata). */
  @property({ type: String, reflect: true }) shape: StepperInputShape = "sharp";

  /** Dims the whole control; the hint stays, dimmed. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The value failed validation: error border on the value and the hint as an error. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Supporting line below, e.g. the range. On `invalid` it carries the reason. Empty hides it (Figma's Hint). */
  @property({ type: String }) hint = "";

  /** Accessible name of the value, e.g. "Quantity". There is no visible label. */
  @property({ type: String }) label = "";

  /** Accessible name of the decrement button. */
  @property({ type: String, attribute: "decrement-label" }) decrementLabel = "Decrease";

  /** Accessible name of the increment button. */
  @property({ type: String, attribute: "increment-label" }) incrementLabel = "Increase";

  /** Field name submitted with a form. */
  @property({ type: String }) name: string | null = null;

  /** Raw text while the user is typing; null shows the formatted value. */
  @state() private text: string | null = null;
  @state() private focused = false;
  @state() private keyboardFocus = false;
  @query("input") private input!: HTMLInputElement;

  private pointerPressed = false;
  private holdTimer: ReturnType<typeof setTimeout> | undefined;
  private fromPointer = false;
  private readonly internals: ElementInternals;
  private defaultValue: number | null = 0;
  private readonly fmt = new Intl.NumberFormat();

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    // The default 0 is held inside the bounds, as the React package's default.
    if (!this.hasAttribute("value") && this.value === 0) this.value = clamp(0, this.min, this.max);
    this.defaultValue = this.value;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopHold();
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("value")) this.internals.setFormValue(this.value == null ? "" : String(this.value));
  }

  formResetCallback() { this.value = this.defaultValue; this.text = null; }
  formDisabledCallback(disabled: boolean) { this.disabled = disabled; }
  focus(options?: FocusOptions) { this.input?.focus(options); }

  // ---- number model ---------------------------------------------------------

  private parse(text: string): number | null {
    const parts = this.fmt.formatToParts(11111.1);
    const group = parts.find((p) => p.type === "group")?.value ?? ",";
    const decimal = parts.find((p) => p.type === "decimal")?.value ?? ".";
    const clean = text.trim().split(group).join("").replace(decimal, ".").replace(/−/g, "-");
    if (clean === "" || clean === "-" || clean === "+") return null;
    const n = Number(clean);
    return Number.isFinite(n) ? n : null;
  }

  private setValue(v: number | null) {
    if (v === this.value) return;
    this.value = v;
    this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: v }, bubbles: true, composed: true }));
  }

  /** Move by `delta` from the current (possibly typed) value, rounded to the step's precision and clamped. */
  private stepBy(delta: number) {
    const typed = this.text != null ? this.parse(this.text) : null;
    const from = typed ?? this.value ?? clamp(0, this.min, this.max);
    const next = Number((from + delta).toFixed(Math.max(decimals(this.step), decimals(Math.abs(delta)), decimals(from))));
    this.text = null;
    this.setValue(clamp(next, this.min, this.max));
  }

  private commitTyped() {
    if (this.text == null) return;
    const parsed = this.parse(this.text);
    this.text = null;
    this.setValue(parsed == null ? null : clamp(parsed, this.min, this.max));
  }

  private get atMin() { return this.value != null && this.min != null && this.value <= this.min; }
  private get atMax() { return this.value != null && this.max != null && this.value >= this.max; }

  // ---- input ----------------------------------------------------------------

  private onInput(e: Event) {
    this.text = (e.target as HTMLInputElement).value;
    // As Base UI: a parseable typed value is the value straight away; the
    // clamp waits for blur or Enter.
    const parsed = this.parse(this.text);
    if (parsed != null || this.text.trim() === "") this.setValue(parsed);
  }

  private onKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    const big = this.largeStep;
    const small = this.step;
    switch (e.key) {
      case "ArrowUp": this.stepBy(e.shiftKey ? big : small); break;
      case "ArrowDown": this.stepBy(-(e.shiftKey ? big : small)); break;
      case "PageUp": this.stepBy(big); break;
      case "PageDown": this.stepBy(-big); break;
      case "Home": if (this.min == null) return; this.text = null; this.setValue(this.min); break;
      case "End": if (this.max == null) return; this.text = null; this.setValue(this.max); break;
      case "Enter": this.commitTyped(); return;
      default:
        // Block characters a number cannot hold (Base UI does the same).
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !/[0-9.,\-+−\s]/.test(e.key)) e.preventDefault();
        return;
    }
    e.preventDefault();
  }

  private onFocus() {
    this.focused = true;
    this.keyboardFocus = !this.pointerPressed;
    this.pointerPressed = false;
  }

  private onBlur() {
    this.focused = false;
    this.keyboardFocus = false;
    this.pointerPressed = false;
    this.commitTyped();
  }

  // ---- step buttons: press and hold ----------------------------------------

  private onButtonPointerDown(e: PointerEvent, direction: 1 | -1) {
    if (this.disabled || e.button !== 0 || (direction < 0 ? this.atMin : this.atMax)) return;
    e.preventDefault(); // keep focus where it is; the input takes it below
    this.fromPointer = true;
    if (e.pointerType !== "touch") { this.pointerPressed = true; this.input?.focus(); }
    this.stepBy(direction * this.step);
    const tick = () => {
      if (direction < 0 ? this.atMin : this.atMax) return this.stopHold();
      this.stepBy(direction * this.step);
      this.holdTimer = setTimeout(tick, HOLD_TICK);
    };
    this.holdTimer = setTimeout(tick, HOLD_DELAY);
    const stop = () => { this.stopHold(); setTimeout(() => { this.fromPointer = false; }); window.removeEventListener("pointerup", stop); window.removeEventListener("pointercancel", stop); };
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  }

  private stopHold() {
    clearTimeout(this.holdTimer);
    this.holdTimer = undefined;
  }

  /** Activation without a pointer (assistive technology, a synthetic click) steps once. */
  private onButtonClick(direction: 1 | -1) {
    if (this.fromPointer) { this.fromPointer = false; return; }
    if (this.disabled || (direction < 0 ? this.atMin : this.atMax)) return;
    this.stepBy(direction * this.step);
  }

  // ---- render ---------------------------------------------------------------

  /** InputField's State, derived as `<zds-input-field>` derives it. */
  private get fieldState() {
    if (this.disabled) return "disabled";
    const hasValue = this.value != null || !!this.text;
    if (this.focused) return hasValue ? "typing" : this.keyboardFocus ? "focus" : "selected";
    if (this.invalid) return "invalid";
    return hasValue ? "filled" : "enabled";
  }

  private stepButton(icon: "remove" | "add", label: string, direction: 1 | -1, atBound: boolean) {
    // Corners: buttons follow `shape`; the value box does not (see styles).
    // Disabled keeps outline-subtle with its disabled tokens; Figma's switch
    // to primary is not copied (spec note).
    return html`<zds-icon-button class=${direction < 0 ? "decrement" : "increment"} tabindex="-1"
      flavour="outline-subtle" size=${this.size} shape=${this.shape} icon=${icon} label=${label}
      ?disabled=${this.disabled || atBound}
      @pointerdown=${(e: PointerEvent) => this.onButtonPointerDown(e, direction)}
      @click=${() => this.onButtonClick(direction)}></zds-icon-button>`;
  }

  protected render() {
    // Value width: Figma's fixed 72px has no token; the box fits the widest
    // bound as formatted, in ch (see styles). The count is the one inline value.
    const chars = Math.max(this.fmt.format(this.max ?? 999).length, this.fmt.format(this.min ?? 0).length);
    const display = this.text ?? (this.value == null ? "" : this.fmt.format(this.value));
    // Hint stays when disabled, dimmed (owner decision; Figma removes it). The
    // error message type, unused in Figma, is wired to `invalid`.
    const hintType = this.disabled ? "disabled" : this.invalid ? "error" : "default";
    return html`
      <div class="row">
        ${this.stepButton("remove", this.decrementLabel, -1, this.atMin)}
        <div part="field" class="field value ${this.fieldState}" style="--zds-stepper-input-chars: ${chars}"
          @pointerdown=${() => { this.pointerPressed = true; }}>
          <input id="input" part="input" type="text" inputmode="decimal" role="spinbutton"
            autocomplete="off" autocorrect="off" spellcheck="false"
            .value=${live(display)}
            name=${ifDefined(this.name ?? undefined)}
            aria-label=${ifDefined(this.label || undefined)}
            aria-valuenow=${ifDefined(this.value ?? undefined)}
            aria-valuemin=${ifDefined(this.min ?? undefined)}
            aria-valuemax=${ifDefined(this.max ?? undefined)}
            aria-invalid=${this.invalid && !this.disabled ? "true" : "false"}
            aria-describedby=${ifDefined(this.hint ? "hint" : undefined)}
            ?disabled=${this.disabled}
            @input=${this.onInput} @keydown=${this.onKeyDown} @focus=${this.onFocus} @blur=${this.onBlur} />
        </div>
        ${this.stepButton("add", this.incrementLabel, 1, this.atMax)}
      </div>
      ${this.hint ? renderInputHint(hintType, this.hint, true, "hint") : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-stepper-input": ZdsStepperInput; }
}
