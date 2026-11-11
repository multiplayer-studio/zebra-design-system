import { LitElement, type PropertyValues } from "lit";
export type RadioSize = "medium" | "large";
/**
 * One option in a set where exactly one can be chosen. Use inside
 * `<zds-radio-group>`, which owns the value, the form name and the keyboard
 * model; a native radio can't group across shadow roots, so the group
 * element does it.
 *
 * The host is the control: `role="radio"` and `aria-checked` come through
 * ElementInternals. The label is the default slot — leave it empty (the
 * spec's hasLabel=false) only when the option is named another way, e.g.
 * `aria-label`.
 *
 * Built to the spec's intent where Figma can't express it: a disabled option
 * shows whether it is chosen (spec blocker), and focus is one outline (spec
 * warn "the focus ring is built two ways").
 *
 * @slot - The option's label.
 * @fires change - This option was chosen by the user.
 * @csspart ring - The ring.
 *
 * @spec specs/radio-button/radio-button.spec.json
 */
export declare class ZdsRadio extends LitElement {
    static styles: import("lit").CSSResult;
    /** Value submitted by the group when this option is chosen. */
    value: string;
    /** Whether this option is the one chosen. Set by the group; set it directly only outside a group. */
    checked: boolean;
    /** Not interactive. */
    disabled: boolean;
    /** The ring's size. The touch target and the label's type stay the same. */
    size: RadioSize;
    private readonly internals;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    /** Choose this option, as the user would. */
    choose(): void;
    protected render(): import("lit").TemplateResult<1>;
}
/**
 * The group that makes exactly one `<zds-radio>` selectable: `role=
 * "radiogroup"`, one tab stop (the chosen option, or the first enabled one),
 * arrow keys move and select with wrap-around, and the chosen value is
 * submitted with a form under `name`. Grouping is "carried by whatever groups
 * the instances in code" (spec accessibility) — this is that. Name it with
 * `label` or `aria-labelledby`.
 *
 * @slot - The `<zds-radio>` options.
 * @fires change - The chosen value changed. Read `value`.
 */
export declare class ZdsRadioGroup extends LitElement {
    static formAssociated: boolean;
    /** The chosen option's value; empty for none. */
    value: string;
    /** Field name submitted with a form. */
    name: string | null;
    /** Disables every option. */
    disabled: boolean;
    /** Accessible name of the group. */
    label: string | null;
    private readonly internals;
    private defaultValue;
    constructor();
    connectedCallback(): void;
    private get radios();
    private sync;
    protected updated(changed: PropertyValues<this>): void;
    private onKeyDown;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    protected render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-radio": ZdsRadio;
        "zds-radio-group": ZdsRadioGroup;
    }
}
//# sourceMappingURL=radio.d.ts.map