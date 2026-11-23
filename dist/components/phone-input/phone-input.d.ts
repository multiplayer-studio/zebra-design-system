import { LitElement, type PropertyValues, type TemplateResult } from "lit";
import "../dropdown/dropdown.js";
import "../icon/icon.js";
import "../input-field/input-field.js";
import "../menu-item/menu-item.js";
import type { InputLabelType, InputState } from "../input/input.js";
import type { InputFieldFlavour, InputFieldShape, InputFieldSize } from "../input-field/input-field.js";
export interface PhoneCountry {
    /** ISO 3166-1 alpha-2 code. */
    code: string;
    name: string;
    /** Dial code without the plus. */
    dialCode: string;
    /** How the number groups, with `#` per digit. Without one the digits are left ungrouped. */
    format?: string;
    /** Real flag artwork, such as an `<img>` or `<svg>` template. It replaces the system's emoji flag in the control and the menu. */
    flag?: TemplateResult | string;
}
export interface PhoneInputDetail {
    /** National digits, without the dial code. */
    value: string;
    /** The country the number is dialled in. */
    country: PhoneCountry;
    /** The whole number in E.164, or empty with no digits. */
    e164: string;
}
/** The countries offered by default. Set `countries` for your own list. */
export declare const PHONE_COUNTRIES: PhoneCountry[];
/**
 * Takes a phone number, with a country picker joined to its start. The picker
 * sets the flag and dial code, the field groups digits as they are typed, and
 * the whole number is available in E.164.
 *
 * The number is `<zds-input-field>` and the menu is `<zds-dropdown>`, so states
 * and tokens match Input. It submits in forms as E.164 under `name`. Grouping is
 * presentational: pair it with validation and set `state="invalid"` with the
 * reason in `hint`.
 *
 * Departures from Figma, each a spec issue:
 * - The error stays on the number while it is focused. Figma's typing and focus
 *   states replace invalid, and the metadata says it stays.
 * - `flag` takes real artwork, and the system emoji is the default. Figma holds
 *   the flag glyph as a placeholder.
 * - The menu has no portal or collision handling, as `<zds-dropdown>` documents,
 *   so there is no `portalContainer`.
 *
 * @fires zds-value-change - The digits changed. `detail` is `PhoneInputDetail`.
 * @fires zds-country-change - A person picked another country. `detail.country` is the country.
 * @csspart country - The country control.
 * @csspart label - The label row.
 *
 * @spec specs/phone-input/phone-input.spec.json
 */
export declare class ZdsPhoneInput extends LitElement {
    #private;
    static formAssociated: boolean;
    static styles: import("lit").CSSResult[];
    /** The field's name, shown above it. Empty hides the label. */
    label: string;
    /** Marker after the name: none, an asterisk (`required`) or `(optional)`. */
    labelType: InputLabelType;
    /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it. */
    hint: string;
    /** Icon ahead of the hint. */
    hintIcon: boolean;
    /** One state across label, country control, number and hint. */
    state: InputState;
    /** Fits the field to its surface. Only `small` also reduces the text. */
    size: InputFieldSize;
    /** Corners, shared by the country control's start and the number's end. */
    shape: InputFieldShape;
    /** `default` in a form, `gradient` for a distinct interaction, `ghost` on a surface that already bounds it. */
    flavour: InputFieldFlavour;
    /** Fills the container's width. */
    block: boolean;
    /** National digits, without the dial code. */
    value: string;
    /** The selected country's code. */
    country: string;
    /** The countries offered. */
    countries: PhoneCountry[];
    /** Accessible name of the country control. The selected country follows it. */
    countryLabel: string;
    /** Shown while the field is empty. */
    placeholder: string;
    /** Submits the number in E.164 under this name. */
    name: string | null;
    /** The country menu is showing. */
    private open;
    private field;
    private dropdown;
    private readonly internals;
    private defaultValue;
    private pendingCaret;
    constructor();
    connectedCallback(): void;
    /** The whole number in E.164, or empty with no digits. */
    get e164(): string;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    focus(options?: FocusOptions): void;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-phone-input": ZdsPhoneInput;
    }
}
//# sourceMappingURL=phone-input.d.ts.map