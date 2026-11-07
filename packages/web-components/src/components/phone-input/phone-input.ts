import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import inputStyles from "../input/input.styles.js";
import { inputHintStyles, renderInputHint } from "../input/input-hint.js";
import styles from "./phone-input.styles.js";
import "../dropdown/dropdown.js";
import "../icon/icon.js";
import "../input-field/input-field.js";
import "../menu-item/menu-item.js";
import type { ZdsDropdown } from "../dropdown/dropdown.js";
import type { InputLabelType, InputState } from "../input/input.js";
import type { InputFieldFlavour, InputFieldShape, InputFieldSize, ZdsInputField } from "../input-field/input-field.js";
import type { ZdsMenuItem } from "../menu-item/menu-item.js";

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
export const PHONE_COUNTRIES: PhoneCountry[] = [
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

const digitsOf = (text: string) => text.replace(/\D/g, "");
const emojiFlag = (code: string) => String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
const maxDigits = (country: PhoneCountry) => (country.format ? country.format.split("#").length - 1 : 15 - country.dialCode.length);

function formatNumber(digits: string, country: PhoneCountry) {
  if (!country.format) return digits;
  let used = 0;
  let out = "";
  for (const char of country.format) {
    if (used === digits.length) break;
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
@customElement("zds-phone-input")
export class ZdsPhoneInput extends LitElement {
  static formAssociated = true;
  static styles = [inputStyles, inputHintStyles, styles];

  /** The field's name, shown above it. Empty hides the label. */
  @property({ type: String }) label = "";

  /** Marker after the name: none, an asterisk (`required`) or `(optional)`. */
  @property({ type: String, reflect: true, attribute: "label-type" }) labelType: InputLabelType = "default";

  /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it. */
  @property({ type: String }) hint = "";

  /** Icon ahead of the hint. */
  @property({ type: Boolean, reflect: true, attribute: "hint-icon" }) hintIcon = true;

  /** One state across label, country control, number and hint. */
  @property({ type: String, reflect: true }) state: InputState = "default";

  /** Fits the field to its surface. Only `small` also reduces the text. */
  @property({ type: String, reflect: true }) size: InputFieldSize = "medium";

  /** Corners, shared by the country control's start and the number's end. */
  @property({ type: String, reflect: true }) shape: InputFieldShape = "rounded";

  /** `default` in a form, `gradient` for a distinct interaction, `ghost` on a surface that already bounds it. */
  @property({ type: String, reflect: true }) flavour: InputFieldFlavour = "default";

  /** Fills the container's width. */
  @property({ type: Boolean, reflect: true }) block = false;

  /** National digits, without the dial code. */
  @property({ type: String }) value = "";

  /** The selected country's code. */
  @property({ type: String }) country = "US";

  /** The countries offered. */
  @property({ attribute: false }) countries: PhoneCountry[] = PHONE_COUNTRIES;

  /** Accessible name of the country control. The selected country follows it. */
  @property({ type: String, attribute: "country-label" }) countryLabel = "Country code";

  /** Shown while the field is empty. */
  @property({ type: String }) placeholder = "";

  /** Submits the number in E.164 under this name. */
  @property({ type: String }) name: string | null = null;

  /** The country menu is showing. */
  @state() private open = false;

  @query("zds-input-field") private field!: ZdsInputField;
  @query("zds-dropdown") private dropdown!: ZdsDropdown;

  private readonly internals: ElementInternals;
  private defaultValue = "";
  private pendingCaret: number | null = null;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }

  get #country() {
    return this.countries.find((c) => c.code === this.country) ?? this.countries[0];
  }

  get #digits() {
    return digitsOf(this.value).slice(0, maxDigits(this.#country));
  }

  /** The whole number in E.164, or empty with no digits. */
  get e164() {
    return this.#digits ? `+${this.#country.dialCode}${this.#digits}` : "";
  }

  get #rows() {
    return [...this.renderRoot.querySelectorAll("zds-menu-item")] as ZdsMenuItem[];
  }

  get #input() {
    return this.field?.renderRoot.querySelector("input") ?? null;
  }

  #emit() {
    this.dispatchEvent(new CustomEvent<PhoneInputDetail>("zds-value-change", { detail: { value: this.#digits, country: this.#country, e164: this.e164 }, bubbles: true, composed: true }));
  }

  /* Grouping rewrites the text, so the caret is restored by how many digits sit before it. */
  #onInput = (event: Event) => {
    event.stopPropagation();
    const raw = this.field.value;
    const previous = formatNumber(this.#digits, this.#country);
    const caret = this.#input?.selectionStart ?? raw.length;
    let before = digitsOf(raw.slice(0, caret)).length;
    let next = digitsOf(raw);
    // Deleting a bracket or space takes the digit in front of it, or backspace would stop there.
    if (next === this.#digits && raw.length < previous.length && before > 0) {
      next = next.slice(0, before - 1) + next.slice(before);
      before -= 1;
    }
    this.pendingCaret = before;
    this.value = next.slice(0, maxDigits(this.#country));
    // The field keeps what was typed until told otherwise, so an edit that changes nothing still has to reset it.
    this.field.value = formatNumber(this.value, this.#country);
    this.#emit();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  };

  #pick(country: PhoneCountry) {
    this.dropdown.open = false;
    if (country.code === this.country) return;
    this.country = country.code;
    this.value = digitsOf(this.value).slice(0, maxDigits(country));
    this.dispatchEvent(new CustomEvent("zds-country-change", { detail: { country }, bubbles: true, composed: true }));
    void this.updateComplete.then(() => this.#emit());
  }

  /* Neither zds-menu-item nor zds-input-field delegates focus to a row, so it has to land inside. */
  #focusRow(index: number) {
    const rows = this.#rows;
    rows[(index + rows.length) % rows.length]?.renderRoot.querySelector<HTMLElement>("[tabindex]")?.focus();
  }

  /* zds-dropdown owns open, outside click and Escape. Moving through the rows is left to whoever fills it. */
  #onKeydown = (event: KeyboardEvent) => {
    if (!this.open) return;
    const current = this.#rows.indexOf((this.renderRoot as ShadowRoot).activeElement as ZdsMenuItem);
    const moves: Record<string, number> = { ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: -1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    this.#focusRow(moves[event.key]);
  };

  #onOpenChange = async (event: CustomEvent<{ open: boolean }>) => {
    this.open = event.detail.open;
    if (!this.open) return;
    await Promise.all(this.#rows.map((row) => row.updateComplete));
    const selected = this.#rows.findIndex((row) => row.selected);
    this.#focusRow(Math.max(selected, 0));
  };

  formResetCallback() { this.value = this.defaultValue; }
  formDisabledCallback(disabled: boolean) { this.state = disabled ? "disabled" : "default"; }
  focus(options?: FocusOptions) { this.field?.focus(options); }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("value") || changed.has("country") || changed.has("name")) this.internals.setFormValue(this.name ? this.e164 : null);
    if (changed.has("value") || changed.has("labelType") || changed.has("state")) {
      const missing = this.labelType === "required" && !this.value && this.state !== "disabled";
      this.internals.setValidity(missing ? { valueMissing: true } : {}, missing ? "Fill in this field." : "", this.field);
    }
    if (this.pendingCaret === null) return;
    const wanted = this.pendingCaret;
    this.pendingCaret = null;
    void this.field.updateComplete.then(() => {
      const input = this.#input;
      if (!input) return;
      let seen = 0;
      let index = 0;
      while (index < input.value.length && seen < wanted) if (/\d/.test(input.value[index++])) seen++;
      input.setSelectionRange(index, index);
    });
  }

  #flag(country: PhoneCountry) {
    return html`<span class="flag" aria-hidden="true">${country.flag ?? emojiFlag(country.code)}</span>`;
  }

  protected render() {
    const disabled = this.state === "disabled";
    const invalid = this.state === "invalid";
    const country = this.#country;
    return html`
      ${this.label ? html`<div part="label" class="label ${disabled ? "disabled" : ""}">
        <span class="name" aria-hidden="true">${this.label}</span>
        ${this.labelType === "required" ? html`<span class="required" aria-hidden="true">*</span>` : nothing}
        ${this.labelType === "optional" ? html`<span class="optional">(optional)</span>` : nothing}
      </div>` : nothing}
      <div class="control">
        <zds-dropdown .rounded=${this.shape !== "sharp"} @open-change=${this.#onOpenChange} @keydown=${this.#onKeydown}>
          <button slot="trigger" part="country" class="country" type="button" ?disabled=${disabled}
            aria-label="${this.countryLabel}: ${country.name}, +${country.dialCode}" aria-haspopup="menu" aria-expanded=${String(this.open)}>
            ${this.#flag(country)}
            <zds-icon name="expand-more" size="small" .iconStyle=${"rounded"}></zds-icon>
          </button>
          ${this.countries.map((c) => html`<zds-menu-item type="custom" ?selected=${c.code === country.code} ?rounded=${this.shape !== "sharp"} @click=${() => this.#pick(c)}>
            <span slot="leading">${this.#flag(c)}</span><span>${c.name} <span class="dial">+${c.dialCode}</span></span>
          </zds-menu-item>`)}
        </zds-dropdown>
        <zds-input-field block class="number" keyboard="tel" autocomplete="tel-national"
          .type=${"text"} .size=${this.size} .shape=${this.shape} .flavour=${this.flavour}
          .value=${formatNumber(this.#digits, country)} .placeholder=${this.placeholder}
          .leadingText=${`+ ${country.dialCode}`}
          .disabled=${disabled} .invalid=${invalid} .required=${this.labelType === "required"}
          .label=${this.label || null} .description=${this.hint || null}
          @input=${this.#onInput}
          @change=${(event: Event) => { event.stopPropagation(); this.dispatchEvent(new Event("change", { bubbles: true, composed: true })); }}
        ></zds-input-field>
      </div>
      ${this.hint ? renderInputHint(disabled ? "disabled" : invalid ? "error" : "default", this.hint, this.hintIcon) : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-phone-input": ZdsPhoneInput; }
}
