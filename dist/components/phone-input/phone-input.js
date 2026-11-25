var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ZdsPhoneInput_instances, _ZdsPhoneInput_country_get, _ZdsPhoneInput_digits_get, _ZdsPhoneInput_rows_get, _ZdsPhoneInput_input_get, _ZdsPhoneInput_emit, _ZdsPhoneInput_onInput, _ZdsPhoneInput_pick, _ZdsPhoneInput_focusRow, _ZdsPhoneInput_onKeydown, _ZdsPhoneInput_onOpenChange, _ZdsPhoneInput_flag;
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import inputStyles from "../input/input.styles.js";
import { inputHintStyles, renderInputHint } from "../input/input-hint.js";
import styles from "./phone-input.styles.js";
import "../dropdown/dropdown.js";
import "../icon/icon.js";
import "../input-field/input-field.js";
import "../menu-item/menu-item.js";
/** The countries offered by default. Set `countries` for your own list. */
export const PHONE_COUNTRIES = [
    { code: "US", name: "United States", dialCode: "1", format: "(###)###-####" },
    { code: "CA", name: "Canada", dialCode: "1", format: "(###)###-####" },
    { code: "GB", name: "United Kingdom", dialCode: "44", format: "#### ######" },
    { code: "IE", name: "Ireland", dialCode: "353", format: "## ### ####" },
    { code: "DE", name: "Germany", dialCode: "49" },
    { code: "FR", name: "France", dialCode: "33", format: "# ## ## ## ##" },
    { code: "ES", name: "Spain", dialCode: "34", format: "### ### ###" },
    { code: "NL", name: "Netherlands", dialCode: "31", format: "# ########" },
    { code: "IN", name: "India", dialCode: "91", format: "##### #####" },
    { code: "NG", name: "Nigeria", dialCode: "234", format: "### ### ####" },
    { code: "ZA", name: "South Africa", dialCode: "27", format: "## ### ####" },
    { code: "AU", name: "Australia", dialCode: "61", format: "### ### ###" },
    { code: "BR", name: "Brazil", dialCode: "55" },
    { code: "JP", name: "Japan", dialCode: "81" },
];
const digitsOf = (text) => text.replace(/\D/g, "");
const emojiFlag = (code) => String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
const maxDigits = (country) => (country.format ? country.format.split("#").length - 1 : 15 - country.dialCode.length);
function formatNumber(digits, country) {
    if (!country.format)
        return digits;
    let used = 0;
    let out = "";
    for (const char of country.format) {
        if (used === digits.length)
            break;
        out += char === "#" ? digits[used++] : char;
    }
    return out;
}
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
let ZdsPhoneInput = class ZdsPhoneInput extends LitElement {
    constructor() {
        super();
        _ZdsPhoneInput_instances.add(this);
        /** The field's name, shown above it. Empty hides the label. */
        this.label = "";
        /** Marker after the name: none, an asterisk (`required`) or `(optional)`. */
        this.labelType = "default";
        /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it. */
        this.hint = "";
        /** Icon ahead of the hint. */
        this.hintIcon = true;
        /** One state across label, country control, number and hint. */
        this.state = "default";
        /** Fits the field to its surface. Only `small` also reduces the text. */
        this.size = "medium";
        /** Corners, shared by the country control's start and the number's end. */
        this.shape = "rounded";
        /** `default` in a form, `gradient` for a distinct interaction, `ghost` on a surface that already bounds it. */
        this.flavour = "default";
        /** Fills the container's width. */
        this.block = false;
        /** National digits, without the dial code. */
        this.value = "";
        /** The selected country's code. */
        this.country = "US";
        /** The countries offered. */
        this.countries = PHONE_COUNTRIES;
        /** Accessible name of the country control. The selected country follows it. */
        this.countryLabel = "Country code";
        /** Shown while the field is empty. */
        this.placeholder = "";
        /** Submits the number in E.164 under this name. */
        this.name = null;
        /** The country menu is showing. */
        this.open = false;
        this.defaultValue = "";
        this.pendingCaret = null;
        /* Grouping rewrites the text, so the caret is restored by how many digits sit before it. */
        _ZdsPhoneInput_onInput.set(this, (event) => {
            event.stopPropagation();
            const raw = this.field.value;
            const previous = formatNumber(__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_digits_get), __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_country_get));
            const caret = __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_input_get)?.selectionStart ?? raw.length;
            let before = digitsOf(raw.slice(0, caret)).length;
            let next = digitsOf(raw);
            // Deleting a bracket or space takes the digit in front of it, or backspace would stop there.
            if (next === __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_digits_get) && raw.length < previous.length && before > 0) {
                next = next.slice(0, before - 1) + next.slice(before);
                before -= 1;
            }
            this.pendingCaret = before;
            this.value = next.slice(0, maxDigits(__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_country_get)));
            // The field keeps what was typed until told otherwise, so an edit that changes nothing still has to reset it.
            this.field.value = formatNumber(this.value, __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_country_get));
            __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "m", _ZdsPhoneInput_emit).call(this);
            this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
        });
        /* zds-dropdown owns open, outside click and Escape. Moving through the rows is left to whoever fills it. */
        _ZdsPhoneInput_onKeydown.set(this, (event) => {
            if (!this.open)
                return;
            const current = __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_rows_get).indexOf(this.renderRoot.activeElement);
            const moves = { ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: -1 };
            if (!(event.key in moves))
                return;
            event.preventDefault();
            __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "m", _ZdsPhoneInput_focusRow).call(this, moves[event.key]);
        });
        _ZdsPhoneInput_onOpenChange.set(this, async (event) => {
            this.open = event.detail.open;
            if (!this.open)
                return;
            await Promise.all(__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_rows_get).map((row) => row.updateComplete));
            const selected = __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_rows_get).findIndex((row) => row.selected);
            __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "m", _ZdsPhoneInput_focusRow).call(this, Math.max(selected, 0));
        });
        this.internals = this.attachInternals();
    }
    connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
    }
    /** The whole number in E.164, or empty with no digits. */
    get e164() {
        return __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_digits_get) ? `+${__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_country_get).dialCode}${__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_digits_get)}` : "";
    }
    formResetCallback() { this.value = this.defaultValue; }
    formDisabledCallback(disabled) { this.state = disabled ? "disabled" : "default"; }
    focus(options) { this.field?.focus(options); }
    updated(changed) {
        if (changed.has("value") || changed.has("country") || changed.has("name"))
            this.internals.setFormValue(this.name ? this.e164 : null);
        if (changed.has("value") || changed.has("labelType") || changed.has("state")) {
            const missing = this.labelType === "required" && !this.value && this.state !== "disabled";
            this.internals.setValidity(missing ? { valueMissing: true } : {}, missing ? "Fill in this field." : "", this.field);
        }
        if (this.pendingCaret === null)
            return;
        const wanted = this.pendingCaret;
        this.pendingCaret = null;
        void this.field.updateComplete.then(() => {
            const input = __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_input_get);
            if (!input)
                return;
            let seen = 0;
            let index = 0;
            while (index < input.value.length && seen < wanted)
                if (/\d/.test(input.value[index++]))
                    seen++;
            input.setSelectionRange(index, index);
        });
    }
    render() {
        const disabled = this.state === "disabled";
        const invalid = this.state === "invalid";
        const country = __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_country_get);
        return html `
      ${this.label ? html `<div part="label" class="label ${disabled ? "disabled" : ""}">
        <span class="name" aria-hidden="true">${this.label}</span>
        ${this.labelType === "required" ? html `<span class="required" aria-hidden="true">*</span>` : nothing}
        ${this.labelType === "optional" ? html `<span class="optional">(optional)</span>` : nothing}
      </div>` : nothing}
      <div class="control">
        <zds-dropdown .rounded=${this.shape !== "sharp"} @open-change=${__classPrivateFieldGet(this, _ZdsPhoneInput_onOpenChange, "f")} @keydown=${__classPrivateFieldGet(this, _ZdsPhoneInput_onKeydown, "f")}>
          <button slot="trigger" part="country" class="country" type="button" ?disabled=${disabled}
            aria-label="${this.countryLabel}: ${country.name}, +${country.dialCode}" aria-haspopup="menu" aria-expanded=${String(this.open)}>
            ${__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "m", _ZdsPhoneInput_flag).call(this, country)}
            <zds-icon name="expand-more" size="small" .iconStyle=${"rounded"}></zds-icon>
          </button>
          ${this.countries.map((c) => html `<zds-menu-item type="custom" ?selected=${c.code === country.code} ?rounded=${this.shape !== "sharp"} @click=${() => __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "m", _ZdsPhoneInput_pick).call(this, c)}>
            <span slot="leading">${__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "m", _ZdsPhoneInput_flag).call(this, c)}</span><span>${c.name} <span class="dial">+${c.dialCode}</span></span>
          </zds-menu-item>`)}
        </zds-dropdown>
        <zds-input-field block class="number" keyboard="tel" autocomplete="tel-national"
          .type=${"text"} .size=${this.size} .shape=${this.shape} .flavour=${this.flavour}
          .value=${formatNumber(__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_digits_get), country)} .placeholder=${this.placeholder}
          .leadingText=${`+ ${country.dialCode}`}
          .disabled=${disabled} .invalid=${invalid} .required=${this.labelType === "required"}
          .label=${this.label || null} .description=${this.hint || null}
          @input=${__classPrivateFieldGet(this, _ZdsPhoneInput_onInput, "f")}
          @change=${(event) => { event.stopPropagation(); this.dispatchEvent(new Event("change", { bubbles: true, composed: true })); }}
        ></zds-input-field>
      </div>
      ${this.hint ? renderInputHint(disabled ? "disabled" : invalid ? "error" : "default", this.hint, this.hintIcon) : nothing}`;
    }
};
_ZdsPhoneInput_onInput = new WeakMap();
_ZdsPhoneInput_onKeydown = new WeakMap();
_ZdsPhoneInput_onOpenChange = new WeakMap();
_ZdsPhoneInput_instances = new WeakSet();
_ZdsPhoneInput_country_get = function _ZdsPhoneInput_country_get() {
    return this.countries.find((c) => c.code === this.country) ?? this.countries[0];
};
_ZdsPhoneInput_digits_get = function _ZdsPhoneInput_digits_get() {
    return digitsOf(this.value).slice(0, maxDigits(__classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_country_get)));
};
_ZdsPhoneInput_rows_get = function _ZdsPhoneInput_rows_get() {
    return [...this.renderRoot.querySelectorAll("zds-menu-item")];
};
_ZdsPhoneInput_input_get = function _ZdsPhoneInput_input_get() {
    return this.field?.renderRoot.querySelector("input") ?? null;
};
_ZdsPhoneInput_emit = function _ZdsPhoneInput_emit() {
    this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_digits_get), country: __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_country_get), e164: this.e164 }, bubbles: true, composed: true }));
};
_ZdsPhoneInput_pick = function _ZdsPhoneInput_pick(country) {
    this.dropdown.open = false;
    if (country.code === this.country)
        return;
    this.country = country.code;
    this.value = digitsOf(this.value).slice(0, maxDigits(country));
    this.dispatchEvent(new CustomEvent("zds-country-change", { detail: { country }, bubbles: true, composed: true }));
    void this.updateComplete.then(() => __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "m", _ZdsPhoneInput_emit).call(this));
};
_ZdsPhoneInput_focusRow = function _ZdsPhoneInput_focusRow(index) {
    const rows = __classPrivateFieldGet(this, _ZdsPhoneInput_instances, "a", _ZdsPhoneInput_rows_get);
    rows[(index + rows.length) % rows.length]?.renderRoot.querySelector("[tabindex]")?.focus();
};
_ZdsPhoneInput_flag = function _ZdsPhoneInput_flag(country) {
    return html `<span class="flag" aria-hidden="true">${country.flag ?? emojiFlag(country.code)}</span>`;
};
ZdsPhoneInput.formAssociated = true;
ZdsPhoneInput.styles = [inputStyles, inputHintStyles, styles];
__decorate([
    property({ type: String })
], ZdsPhoneInput.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "label-type" })
], ZdsPhoneInput.prototype, "labelType", void 0);
__decorate([
    property({ type: String })
], ZdsPhoneInput.prototype, "hint", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "hint-icon" })
], ZdsPhoneInput.prototype, "hintIcon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsPhoneInput.prototype, "state", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsPhoneInput.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsPhoneInput.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsPhoneInput.prototype, "flavour", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsPhoneInput.prototype, "block", void 0);
__decorate([
    property({ type: String })
], ZdsPhoneInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ZdsPhoneInput.prototype, "country", void 0);
__decorate([
    property({ attribute: false })
], ZdsPhoneInput.prototype, "countries", void 0);
__decorate([
    property({ type: String, attribute: "country-label" })
], ZdsPhoneInput.prototype, "countryLabel", void 0);
__decorate([
    property({ type: String })
], ZdsPhoneInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], ZdsPhoneInput.prototype, "name", void 0);
__decorate([
    state()
], ZdsPhoneInput.prototype, "open", void 0);
__decorate([
    query("zds-input-field")
], ZdsPhoneInput.prototype, "field", void 0);
__decorate([
    query("zds-dropdown")
], ZdsPhoneInput.prototype, "dropdown", void 0);
ZdsPhoneInput = __decorate([
    customElement("zds-phone-input")
], ZdsPhoneInput);
export { ZdsPhoneInput };
