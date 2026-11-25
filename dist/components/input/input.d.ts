import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import "../input-field/input-field.js";
import type { InputFieldType, InputFieldSize, InputFieldShape, InputFieldFlavour } from "../input-field/input-field.js";
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
 * @csspart sub-label - The supporting line under the label row.
 * @csspart hint - The hint row.
 *
 * @spec specs/input/input.spec.json
 */
export declare class ZdsInput extends LitElement {
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
    /** The field's name, shown above it. Empty hides the label (Show Label). */
    label: string;
    /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception in the form. */
    labelType: InputLabelType;
    /** Adds an information icon after the name (the label's Show Information). Name it with `information-label`. */
    information: boolean;
    /** Accessible name of the information icon. */
    informationLabel: string;
    /** Supporting line under the name, read as part of the field's description. Empty hides it; needs a `label` (Show Sub Label). */
    subLabel: string;
    /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
    hint: string;
    /** Icon ahead of the hint (the hint's Show Icon). */
    hintIcon: boolean;
    /** One state across label, field and hint. */
    state: InputState;
    type: InputFieldType;
    /** Default medium: the size an Input arrives with. */
    size: InputFieldSize;
    /** Default rounded: the shape an Input arrives with. */
    shape: InputFieldShape;
    /** Fills the container's width. Without it the field is a tentative 280 wide and narrows to fit its container. */
    block: boolean;
    flavour: InputFieldFlavour;
    value: string;
    placeholder: string;
    name: string | null;
    min: string | null;
    max: string | null;
    step: string | null;
    leadingIcon: IconName | null;
    trailingIcon: IconName | "" | null;
    readonly: boolean;
    private field;
    private readonly internals;
    private defaultValue;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    focus(options?: FocusOptions): void;
    private onFieldInput;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-input": ZdsInput;
    }
}
//# sourceMappingURL=input.d.ts.map