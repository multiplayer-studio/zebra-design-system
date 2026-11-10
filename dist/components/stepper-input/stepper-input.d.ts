import { LitElement, type PropertyValues } from "lit";
import "../icon-button/icon-button.js";
export type StepperInputSize = "medium" | "large";
/** Figma's `rounded` false | true, exposed as the library's `shape` (sharp | rounded), as on Button and Input. */
export type StepperInputShape = "sharp" | "rounded";
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
export declare class ZdsStepperInput extends LitElement {
    static styles: import("lit").CSSResult[];
    static formAssociated: boolean;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** The value. `null` is an empty field. Defaults to 0 held inside `min` / `max`. */
    value: number | null;
    /** Lowest value. Decrease disables on reaching it; Home jumps to it. */
    min: number | null;
    /** Highest value. Increase disables on reaching it; End jumps to it. Also sizes the value box. */
    max: number | null;
    /** Amount one press or arrow key moves the value. */
    step: number;
    /** Amount PageUp / PageDown and Shift + arrow move the value. */
    largeStep: number;
    /** medium sits among other medium fields; large is easier to tap. Only the buttons and the value height grow. */
    size: StepperInputSize;
    /** Corners of the two step buttons. The value box stays square either way (spec metadata). */
    shape: StepperInputShape;
    /** Dims the whole control; the hint stays, dimmed. */
    disabled: boolean;
    /** The value failed validation: error border on the value and the hint as an error. */
    invalid: boolean;
    /** Supporting line below, e.g. the range. On `invalid` it carries the reason. Empty hides it (Figma's Hint). */
    hint: string;
    /** Accessible name of the value, e.g. "Quantity". There is no visible label. */
    label: string;
    /** Accessible name of the decrement button. */
    decrementLabel: string;
    /** Accessible name of the increment button. */
    incrementLabel: string;
    /** Field name submitted with a form. */
    name: string | null;
    /** Raw text while the user is typing; null shows the formatted value. */
    private text;
    private focused;
    private keyboardFocus;
    private input;
    private pointerPressed;
    private holdTimer;
    private fromPointer;
    private readonly internals;
    private defaultValue;
    private readonly fmt;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    focus(options?: FocusOptions): void;
    private parse;
    private setValue;
    /** Move by `delta` from the current (possibly typed) value, rounded to the step's precision and clamped. */
    private stepBy;
    private commitTyped;
    private get atMin();
    private get atMax();
    private onInput;
    private onKeyDown;
    private onFocus;
    private onBlur;
    private onButtonPointerDown;
    private stopHold;
    /** Activation without a pointer (assistive technology, a synthetic click) steps once. */
    private onButtonClick;
    /** InputField's State, derived as `<zds-input-field>` derives it. */
    private get fieldState();
    private stepButton;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-stepper-input": ZdsStepperInput;
    }
}
//# sourceMappingURL=stepper-input.d.ts.map