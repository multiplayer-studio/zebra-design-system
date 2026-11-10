var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./phone-input.styles.js";
import "../dropdown/droppable.js";
import "../dropdown/menu-item/dropdown-menu-item.js";
import "../icon/icon.js";
import "../text-input/text-input.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
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
    { code: "JP", name: "Japan", dialCode: "81" }
];
const digitsOf = (text) => text.replace(/\D/g, "");
const emojiFlag = (code) => String.fromCodePoint(...[...code.toUpperCase()].map(char => 0x1f1e6 + char.charCodeAt(0) - 65));
const maxDigits = (country) => (country.format ? country.format.split("#").length - 1 : 15 - country.dialCode.length);
const formatNumber = (digits, country) => {
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
};
/** Takes a phone number, with a country picker joined to its start. The picker sets the flag and dial code, the field
 * groups digits as they are typed, and the whole number is available in E.164.
 *
 * The number is `zeta-text-input` and the menu is `zeta-droppable`, so states and tokens match Text Input. It submits in
 * forms as E.164 under `name`. Grouping is presentational: pair it with validation and set `error` with `errorText`.
 *
 * Departures from Figma, each a spec issue. The error stays on the number while it is focused, where Figma's typing and
 * focus states replace invalid and the metadata says it stays. `flag` takes real artwork, with the system emoji as the
 * default, where Figma holds the flag glyph as a placeholder.
 *
 * @event {CustomEvent<PhoneInputDetail>} value-change - The digits changed.
 * @event {CustomEvent} country-change - A person picked another country. `detail.country` is the country.
 * @event {Event} input - Fired when the number changes.
 * @event {Event} change - Fired when the number changes and is committed.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7682-19850
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-phone-input--docs
 */
let ZetaPhoneInput = class ZetaPhoneInput extends Size(Contourable(Interactive(LitElement))) {
    constructor() {
        super(...arguments);
        /** Label shown above the field. Empty hides it. */
        this.label = "";
        /** Whether the number is in error state. */
        this.error = false;
        /** Marks the label with an asterisk, and a form won't submit without a number. */
        this.required = false;
        /** Marks the label "(optional)", for a mostly required form. */
        this.optional = false;
        /** Keeps the icon ahead of the hint, which is what makes an error read as an error before it is read. */
        this.showHintIcon = true;
        /** default: bordered. gradient: a unique highlight, for a distinct interaction. ghost: no border at rest. */
        this.flavor = "default";
        /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
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
        this.name = "";
        /** The country menu is showing. */
        this.open = false;
        this.internals = this.attachInternals();
        this.defaultValue = "";
        this.pendingCaret = null;
        /* Grouping rewrites the text, so the caret is restored by how many digits sit before it. */
        this.handleInput = () => {
            const input = this.inputEl;
            if (!input)
                return;
            const raw = input.value;
            const previous = formatNumber(this.digits, this.selected);
            let before = digitsOf(raw.slice(0, input.selectionStart ?? raw.length)).length;
            let next = digitsOf(raw);
            // Deleting a bracket or space takes the digit in front of it, or backspace would stop there.
            if (next === this.digits && raw.length < previous.length && before > 0) {
                next = next.slice(0, before - 1) + next.slice(before);
                before -= 1;
            }
            this.pendingCaret = before;
            this.value = next.slice(0, maxDigits(this.selected));
            // The field keeps what was typed until told otherwise, so an edit that changes nothing still has to reset it.
            this.field.value = formatNumber(this.value, this.selected);
            this.emitValue();
        };
        this.handleOutsideClick = (event) => {
            if (this.open && !event.composedPath().includes(this))
                this.open = false;
        };
        this.toggle = () => {
            this.open = !this.open;
        };
        /** zeta-droppable has no keyboard handling of its own. */
        this.handleMenuKey = (event) => {
            const current = this.rows.indexOf(this.shadowRoot?.activeElement);
            switch (event.key) {
                case "ArrowDown":
                    this.focusRow(current + 1);
                    break;
                case "ArrowUp":
                    this.focusRow(current - 1);
                    break;
                case "Home":
                    this.focusRow(0);
                    break;
                case "End":
                    this.focusRow(-1);
                    break;
                case "Enter":
                    this.rows[current]?.click();
                    break;
                case "Escape":
                    this.close();
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };
    }
    static { this.formAssociated = true; }
    static { this.shadowRootOptions = { delegatesFocus: true, mode: "open" }; }
    static { this.styles = [super.styles ?? [], styles]; }
    get selected() {
        return this.countries.find(country => country.code === this.country) ?? this.countries[0];
    }
    get digits() {
        return digitsOf(this.value).slice(0, maxDigits(this.selected));
    }
    /** The whole number in E.164, or empty with no digits. */
    get e164() {
        return this.digits ? `+${this.selected.dialCode}${this.digits}` : "";
    }
    get rows() {
        return [...(this.shadowRoot?.querySelectorAll("zeta-dropdown-menu-item") ?? [])];
    }
    get inputEl() {
        return this.field?.shadowRoot?.querySelector("input");
    }
    emitValue() {
        const detail = { value: this.digits, country: this.selected, e164: this.e164 };
        this.dispatchEvent(new CustomEvent("value-change", { detail, bubbles: true, composed: true }));
    }
    close() {
        this.open = false;
        this.trigger?.focus();
    }
    pick(country) {
        this.close();
        if (country.code === this.country)
            return;
        this.country = country.code;
        this.value = digitsOf(this.value).slice(0, maxDigits(country));
        this.dispatchEvent(new CustomEvent("country-change", { detail: { country }, bubbles: true, composed: true }));
        this.emitValue();
    }
    focusRow(index) {
        const rows = this.rows;
        rows
            .at(index % rows.length)
            ?.shadowRoot?.querySelector(".droppable-item")
            ?.focus();
    }
    /** Waits for the menu to draw its rows, then moves focus to the selected one. */
    async focusSelectedRow() {
        await (this.shadowRoot?.querySelector("zeta-droppable")).updateComplete;
        this.focusRow(Math.max(this.rows.findIndex(row => row.selected), 0));
    }
    /** Fills in what zeta-text-input has no property for. Its label and hint are drawn here, so the row sits between them. */
    syncInput() {
        const input = this.inputEl;
        if (!input)
            return;
        // zeta-text-input gives its host the abstract role input, which assistive technology can't use.
        this.field.removeAttribute("role");
        input.setAttribute("inputmode", "tel");
        input.setAttribute("aria-invalid", String(this.error));
        if (this.label)
            input.setAttribute("aria-label", this.label);
        const hint = this.error ? this.errorText : this.hintText;
        if (hint)
            input.setAttribute("aria-description", hint);
        else
            input.removeAttribute("aria-description");
    }
    restoreCaret(wanted) {
        const input = this.inputEl;
        if (!input)
            return;
        let seen = 0;
        let index = 0;
        while (index < input.value.length && seen < wanted)
            if (/\d/.test(input.value[index++]))
                seen++;
        input.setSelectionRange(index, index);
    }
    focus() {
        this.field?.focus();
    }
    formResetCallback() {
        this.value = this.defaultValue;
    }
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.defaultValue = this.value;
        document.addEventListener("click", this.handleOutsideClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback?.();
        document.removeEventListener("click", this.handleOutsideClick);
    }
    updated(changed) {
        this.internals.setFormValue(this.name ? this.e164 : null);
        const missing = this.required && !this.digits && !this.disabled;
        this.internals.setValidity(missing ? { valueMissing: true } : {}, missing ? "Fill in this field." : "", this.inputEl ?? undefined);
        void this.field.updateComplete.then(() => {
            this.syncInput();
            if (this.pendingCaret === null)
                return;
            this.restoreCaret(this.pendingCaret);
            this.pendingCaret = null;
        });
        if (changed.has("open") && this.open)
            void this.focusSelectedRow();
    }
    renderFlag(country) {
        return html `<span class="flag" aria-hidden="true">${country.flag ?? emojiFlag(country.code)}</span>`;
    }
    renderRow(country) {
        return html `<zeta-dropdown-menu-item ?selected=${country.code === this.selected.code} @click=${() => this.pick(country)}>
      <span slot="icon">${this.renderFlag(country)}</span>
      <span>${country.name} <span class="dial">+${country.dialCode}</span></span>
    </zeta-dropdown-menu-item>`;
    }
    renderHint() {
        const hint = this.error ? this.errorText : this.hintText;
        if (!hint)
            return nothing;
        return html `<div class="hint-text">
      ${this.showHintIcon ? html `<zeta-icon .rounded=${this.rounded}>${this.error ? "error" : "info"}</zeta-icon>` : nothing}
      <span>${hint}</span>
    </div>`;
    }
    render() {
        const country = this.selected;
        // The inner field's own error state would draw a second, empty hint, so the error is styled through its parts.
        const flavor = this.error && this.flavor === "gradient" ? "default" : this.flavor;
        return html `<div class="container">
      ${this.label
            ? html `<span class="label" aria-hidden="true">
              ${this.label} ${this.required ? html `<span class="required">*</span>` : nothing}
              ${this.optional && !this.required ? html `<span class="optional">(optional)</span>` : nothing}
            </span>`
            : nothing}
      <div class="control">
        <button
          id="country"
          class="country"
          type="button"
          ?disabled=${this.disabled}
          aria-label="${this.countryLabel}: ${country.name}, +${country.dialCode}"
          aria-haspopup="menu"
          aria-expanded=${this.open ? "true" : "false"}
          @click=${this.toggle}
        >
          ${this.renderFlag(country)}
          <zeta-icon .rounded=${this.rounded}>expand_more</zeta-icon>
        </button>
        <zeta-droppable ?open=${this.open} ?rounded=${this.shape !== "sharp" && this.rounded} .anchor=${this.trigger} @keydown=${this.handleMenuKey}>
          ${this.countries.map(option => this.renderRow(option))}
        </zeta-droppable>
        <zeta-text-input
          class="number"
          block
          autoComplete="tel-national"
          .size=${this.size}
          .shape=${this.shape}
          .rounded=${this.rounded}
          .flavor=${flavor}
          .disabled=${this.disabled}
          .required=${this.required}
          .placeholder=${this.placeholder}
          .prefix=${`+ ${country.dialCode}`}
          .value=${formatNumber(this.digits, country)}
          @input=${this.handleInput}
          @change=${() => this.dispatchEvent(new Event("change", { bubbles: true, composed: true }))}
        ></zeta-text-input>
      </div>
      ${this.renderHint()}
    </div>`;
    }
};
__decorate([
    property()
], ZetaPhoneInput.prototype, "label", void 0);
__decorate([
    property()
], ZetaPhoneInput.prototype, "hintText", void 0);
__decorate([
    property()
], ZetaPhoneInput.prototype, "errorText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaPhoneInput.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaPhoneInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaPhoneInput.prototype, "optional", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-hint-icon" })
], ZetaPhoneInput.prototype, "showHintIcon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaPhoneInput.prototype, "flavor", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaPhoneInput.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaPhoneInput.prototype, "block", void 0);
__decorate([
    property({ type: String })
], ZetaPhoneInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ZetaPhoneInput.prototype, "country", void 0);
__decorate([
    property({ type: Array })
], ZetaPhoneInput.prototype, "countries", void 0);
__decorate([
    property({ type: String })
], ZetaPhoneInput.prototype, "countryLabel", void 0);
__decorate([
    property({ type: String })
], ZetaPhoneInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaPhoneInput.prototype, "name", void 0);
__decorate([
    state()
], ZetaPhoneInput.prototype, "open", void 0);
__decorate([
    query("zeta-text-input")
], ZetaPhoneInput.prototype, "field", void 0);
__decorate([
    query("#country")
], ZetaPhoneInput.prototype, "trigger", void 0);
ZetaPhoneInput = __decorate([
    customElement("zeta-phone-input")
], ZetaPhoneInput);
export { ZetaPhoneInput };
//# sourceMappingURL=phone-input.js.map