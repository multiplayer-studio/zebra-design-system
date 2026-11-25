import * as React from "react";
import { Dropdown } from "../dropdown/Dropdown.js";
import { type InputFieldProps } from "../input-field/InputField.js";
import type { InputLabelType, InputState } from "../input/Input.js";
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
export declare const PHONE_COUNTRIES: PhoneCountry[];
export interface PhoneInputDetail {
    /** The country the number is dialled in. */
    country: PhoneCountry;
    /** The whole number in E.164, or empty with no digits. */
    e164: string;
}
export interface PhoneInputProps extends Omit<InputFieldProps, "type" | "value" | "defaultValue" | "onValueChange" | "invalid" | "disabled" | "leadingContent" | "leadingIcon" | "trailingIcon" | "name"> {
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
export declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<HTMLInputElement>>;
