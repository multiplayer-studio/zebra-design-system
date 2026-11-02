import * as React from "react";
import { Field } from "@base-ui/react/field";
import { Dropdown } from "../dropdown/Dropdown.js";
import { Icon } from "../icon/Icon.js";
import { InputField, type InputFieldProps } from "../input-field/InputField.js";
import { InputHint } from "../input/InputHint.js";
import type { InputLabelType, InputState } from "../input/Input.js";
import { MenuItem } from "../menu-item/MenuItem.js";
import "../input/input.css";
import "./phone-input.css";

export interface PhoneCountry {
  /** ISO 3166-1 alpha-2 code. */
  code: string;
  name: string;
  /** Dial code without the plus. */
  dialCode: string;
  /** How the number groups, with `#` per digit. Without one the digits are left ungrouped. */
  format?: string;
  /** Real flag artwork, such as an `<img>` or `<svg>`. It replaces the system's emoji flag in the control and the menu. */
  flag?: React.ReactNode;
}

/** The countries offered by default. Pass `countries` for your own list. */
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

export interface PhoneInputDetail {
  /** The country the number is dialled in. */
  country: PhoneCountry;
  /** The whole number in E.164, or empty with no digits. */
  e164: string;
}

export interface PhoneInputProps
  extends Omit<InputFieldProps, "type" | "value" | "defaultValue" | "onValueChange" | "invalid" | "disabled" | "leadingContent" | "leadingIcon" | "trailingIcon" | "name"> {
  /** The field's name, shown above it. Empty hides the label. */
  label?: React.ReactNode;
  /** Marker after the name: none, an asterisk (`required`) or `(optional)`. */
  labelType?: InputLabelType;
  /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it. */
  hint?: React.ReactNode;
  /** Icon ahead of the hint. */
  hintIcon?: boolean;
  /** One state across label, country control, number and hint. */
  state?: InputState;
  /** National digits, without the dial code (controlled). */
  value?: string;
  /** National digits, without the dial code. */
  defaultValue?: string;
  /** Called on every edit and country change, with the national digits. */
  onValueChange?: (value: string, detail: PhoneInputDetail) => void;
  /** The selected country's code (controlled). */
  country?: string;
  /** The country selected at first. */
  defaultCountry?: string;
  /** Called when a person picks another country. */
  onCountryChange?: (country: PhoneCountry) => void;
  /** The countries offered. */
  countries?: PhoneCountry[];
  /** Accessible name of the country control. The selected country follows it. */
  countryLabel?: string;
  /** Submits the number in E.164 under this name. */
  name?: string;
  /** Where the country menu mounts, for a theme scoped below `<body>`. */
  portalContainer?: React.ComponentProps<typeof Dropdown>["portalContainer"];
}

const digitsOf = (text: string) => text.replace(/\D/g, "");
const emojiFlag = (code: string) => String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
const Flag = ({ country }: { country: PhoneCountry }) => <span className="zds-phone-input__flag" aria-hidden="true">{country.flag ?? emojiFlag(country.code)}</span>;

const maxDigits = (country: PhoneCountry) => (country.format ? digitsOf(country.format.replace(/#/g, "0")).length : 15 - country.dialCode.length);

function formatNumber(digits: string, country: PhoneCountry) {
  if (!country.format) return digits;
  let used = 0;
  let out = "";
  for (const char of country.format) {
    if (used === digits.length) break;
    if (char === "#") out += digits[used++];
    else out += char;
  }
  return out;
}

/* Dropdown hands its trigger props through `render`, so this has to take them. */
const CountryButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button"> & { country: PhoneCountry }>(function CountryButton({ country, ...props }, ref) {
  return (
    <button ref={ref} type="button" className="zds-phone-input__country" {...props}>
      <Flag country={country} />
      <Icon name="expand-more" size="small" iconStyle="rounded" />
    </button>
  );
});

/**
 * A phone number field with a country picker joined to its start. The picker
 * sets the flag and dial code, the field groups the digits as they are typed,
 * and the whole number is available in E.164.
 *
 * The label, number and hint are Base UI Field and InputField, so it sits in a
 * form beside an Input with the same `state`, `size` and `shape`. The country
 * control is its own button with a name, and its menu is the library Dropdown.
 *
 * Grouping is presentational. It does not validate that a number exists, so
 * pair it with validation and set `state="invalid"` with the reason in `hint`.
 *
 * Departures from Figma, each a spec issue:
 * - The error stays on the number while it is focused. Figma's typing and focus
 *   states replace invalid, and the metadata says it stays.
 * - `flag` takes real artwork, and the system emoji is the default. Figma holds
 *   the flag glyph as a placeholder.
 * - `label`, `labelType`, `hint`, `block` and `portalContainer` are inputs Figma
 *   has no property for.
 *
 * Kept in step with packages/web-components `<zds-phone-input>`.
 *
 * @spec specs/phone-input/phone-input.spec.md
 */
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  {
    label, labelType = "default", hint, hintIcon = true, state = "default", size = "medium", shape = "rounded", flavour = "default", block = false,
    value: valueProp, defaultValue = "", onValueChange, country: countryProp, defaultCountry = "US", onCountryChange,
    countries = PHONE_COUNTRIES, countryLabel = "Country code", name, portalContainer, className, placeholder, ...fieldProps
  },
  forwardedRef,
) {
  const [ownCode, setOwnCode] = React.useState(defaultCountry);
  const code = countryProp ?? ownCode;
  const country = countries.find((c) => c.code === code) ?? countries[0];
  const [ownValue, setOwnValue] = React.useState(digitsOf(defaultValue));
  const digits = digitsOf(valueProp ?? ownValue).slice(0, maxDigits(country));

  const disabled = state === "disabled";
  const invalid = state === "invalid";
  const e164Of = (d: string, c: PhoneCountry) => (d ? `+${c.dialCode}${d}` : "");
  const commit = (next: string, c: PhoneCountry) => {
    if (valueProp === undefined) setOwnValue(next);
    onValueChange?.(next, { country: c, e164: e164Of(next, c) });
  };

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const setRefs = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  // Grouping rewrites the text, so the caret is restored by how many digits sit before it.
  const pendingCaret = React.useRef<number | null>(null);
  const formatted = formatNumber(digits, country);
  React.useLayoutEffect(() => {
    if (pendingCaret.current === null) return;
    let seen = 0;
    let index = 0;
    while (index < formatted.length && seen < pendingCaret.current) if (/\d/.test(formatted[index++])) seen++;
    inputRef.current?.setSelectionRange(index, index);
    pendingCaret.current = null;
  });

  const edit = (raw: string) => {
    const caret = inputRef.current?.selectionStart ?? raw.length;
    let before = digitsOf(raw.slice(0, caret)).length;
    let next = digitsOf(raw);
    // Deleting a bracket or space takes the digit in front of it, or backspace would stop there.
    if (next === digits && raw.length < formatted.length && before > 0) {
      next = next.slice(0, before - 1) + next.slice(before);
      before -= 1;
    }
    pendingCaret.current = before;
    commit(next.slice(0, maxDigits(country)), country);
  };

  const pick = (c: PhoneCountry) => {
    if (countryProp === undefined) setOwnCode(c.code);
    onCountryChange?.(c);
    commit(digits.slice(0, maxDigits(c)), c);
  };

  const hintType = disabled ? "disabled" : invalid ? "error" : "default";
  return (
    <Field.Root className={["zds-input", "zds-phone-input", className].filter(Boolean).join(" ")} disabled={disabled} invalid={invalid}
      data-state={state} data-size={size} data-shape={shape} data-flavour={flavour} data-block={block ? "" : undefined}>
      {label ? (
        <Field.Label className="zds-input__label">
          <span className="zds-input__name">{label}</span>
          {labelType === "required" ? <span className="zds-input__required" aria-hidden="true">*</span> : null}
          {labelType === "optional" ? <span className="zds-input__optional">(optional)</span> : null}
        </Field.Label>
      ) : null}
      <div className="zds-phone-input__control">
        <Dropdown className="zds-phone-input__menu" rounded={shape !== "sharp"} portalContainer={portalContainer}
          trigger={<CountryButton country={country} disabled={disabled} aria-label={`${countryLabel}: ${country.name}, +${country.dialCode}`} />}>
          {countries.map((c) => (
            <MenuItem key={c.code} type="custom" leadingSlot={<Flag country={c} />} selected={c.code === country.code} onClick={() => pick(c)}>
              {c.name} <span className="zds-phone-input__dial">+{c.dialCode}</span>
            </MenuItem>
          ))}
        </Dropdown>
        <InputField ref={setRefs} {...fieldProps} block type="text" inputMode="tel" autoComplete="tel-national" size={size} shape={shape} flavour={flavour}
          disabled={disabled} invalid={invalid} required={labelType === "required"} value={formatted} onValueChange={edit} placeholder={placeholder}
          leadingContent={`+ ${country.dialCode}`} />
      </div>
      {name ? <input type="hidden" name={name} value={e164Of(digits, country)} disabled={disabled} /> : null}
      {hint ? <InputHint type={hintType} icon={hintIcon}>{hint}</InputHint> : null}
    </Field.Root>
  );
});
