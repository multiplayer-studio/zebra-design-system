import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
export type CheckboxSize = "medium" | "large";
/**
 * A square control for turning a single option on or off, with an optional
 * label beside it. Checked carries three values rather than two, so a
 * checkbox that summarises a set of others can say indeterminate instead of
 * guessing between on and off. Reach for it wherever options are independent
 * of each other, and reach for `<zds-radio>` where exactly one of a set has
 * to win.
 *
 * The spec's one Checked axis (false / true / indeterminate) maps to the
 * native-compatible pair `checked` + `indeterminate`; they never show at
 * once: indeterminate wins, and toggling clears it. Indeterminate is set
 * from the state of the children and read back, never chosen; it is exposed
 * as `aria-checked="mixed"`.
 *
 * The host is the control: `role="checkbox"` and `aria-checked` come through
 * ElementInternals, and it is form-associated, so it submits `value` under
 * `name` when checked, like a native checkbox. The whole 40 square target is
 * pressable, and the label extends it.
 *
 * @slot - The label (the spec's hasLabel / Label). Leave it empty only when
 *   the option is named another way, e.g. `aria-label`.
 * @fires change - The user toggled it. Read `checked`.
 * @fires input - Same moment as `change`, as on a native checkbox.
 * @csspart box - The box.
 *
 * @spec specs/checkbox/checkbox.spec.json
 */
export declare class ZdsCheckbox extends LitElement {
    static styles: import("lit").CSSResult;
    static formAssociated: boolean;
    /** On or off. */
    checked: boolean;
    /** Neither on nor off — a parent of a partly checked set. Cleared when the user toggles it. */
    indeterminate: boolean;
    /** Not interactive. */
    disabled: boolean;
    /** Must be checked for the form to submit. */
    required: boolean;
    /** The box's size. The touch target and the label's type stay the same. */
    size: CheckboxSize;
    /** Field name submitted with a form. */
    name: string | null;
    /** Value submitted when checked. */
    value: string;
    private readonly internals;
    private defaultChecked;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    /** Toggle, as the user would. */
    toggle(): void;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-checkbox": ZdsCheckbox;
    }
}
//# sourceMappingURL=checkbox.d.ts.map