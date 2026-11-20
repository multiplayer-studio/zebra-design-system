import { LitElement, type PropertyValues } from "lit";
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
export declare class ZdsInputField extends LitElement {
    static styles: import("lit").CSSResult;
    static formAssociated: boolean;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** What the field holds; brings its own placeholder shape and trailing control. */
    type: InputFieldType;
    /** Fits the field to its surface. Only `small` also reduces the text. Default medium (spec decision). */
    size: InputFieldSize;
    /** Corners. Match the controls around the field. */
    shape: InputFieldShape;
    /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction such as an AI companion field. */
    flavour: InputFieldFlavour;
    /** The value failed validation. Changes the border only; pair it with an error hint. */
    invalid: boolean;
    disabled: boolean;
    /** Fills the container's width. Without it the field starts at 280 and narrows to fit its container. */
    block: boolean;
    /** Shown but not editable; stays legible, selectable and in the tab order. */
    readonly: boolean;
    required: boolean;
    /** Accessible name. A visible label belongs to `<zds-input>`. */
    label: string | null;
    /** Accessible description, e.g. the hint text of a surrounding `<zds-input>`. */
    description: string | null;
    /** The value, as the native input formats it (dates `YYYY-MM-DD`, times `HH:MM`). */
    value: string;
    /** Shown while empty. Not a label. Spec placeholders: Placeholder, 0, Password; date and time show the platform's format. */
    placeholder: string;
    /** Field name submitted with a form. */
    name: string | null;
    /** Bounds and step (number, date, time). */
    min: string | null;
    max: string | null;
    step: string | null;
    /** Leading icon (the spec's hasLeading). Text, number and password only. */
    leadingIcon: IconName | null;
    /** Trailing icon on text and number (the spec's hasTrailing). Number defaults to `dialpad`; `""` for none. */
    trailingIcon: IconName | "" | null;
    /** Text between the leading icon and the value, such as a dial code. It reads with the value. */
    leadingText: string | null;
    /** The on-screen keyboard to ask for, the native `inputmode`. Defaults to `decimal` on number. */
    keyboard: string | null;
    /** The native `autocomplete`. Defaults to `current-password` on password and `off` otherwise. */
    autocomplete: string | null;
    /** Accessible name of the clear control. */
    clearLabel: string;
    private focused;
    private keyboardFocus;
    private revealed;
    private input;
    private pointerPressed;
    private readonly internals;
    private defaultValue;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    focus(options?: FocusOptions): void;
    /** The current State, as the spec names it. */
    get currentState(): InputFieldState;
    private onInput;
    private onFocus;
    private onBlur;
    private clear;
    private openPicker;
    private get iconSize();
    /** A trailing control: tabbable (nothing else reaches it), keeps focus in the input on press. */
    private control;
    private renderTrailing;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-input-field": ZdsInputField;
    }
}
//# sourceMappingURL=input-field.d.ts.map