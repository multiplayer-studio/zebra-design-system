import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { type IconName } from "../icon/Icon.js";
import "./input-field.css";
export type InputFieldType = "text" | "number" | "password" | "date" | "time";
export type InputFieldSize = "small" | "medium" | "large";
export type InputFieldShape = "sharp" | "rounded" | "full";
export type InputFieldFlavour = "default" | "gradient" | "ghost";
export type InputFieldState = "enabled" | "focus" | "selected" | "typing" | "filled" | "invalid" | "read-only" | "disabled";
export interface InputFieldProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, "className" | "children" | "size" | "type" | "value" | "defaultValue" | "onValueChange"> {
    /** What the field holds; brings its own placeholder shape and trailing control. */
    type?: InputFieldType;
    /** Fits the field to its surface. Only `small` also reduces the text. Default medium (spec decision). */
    size?: InputFieldSize;
    /** Corners. Match the controls around the field. */
    shape?: InputFieldShape;
    /** Fills the container's width. Without it the field starts at 280 and narrows to fit its container. */
    block?: boolean;
    /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction. */
    flavour?: InputFieldFlavour;
    /** The value failed validation. Changes the border only; pair it with an error hint. */
    invalid?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** The clear control emptied the field. */
    onClear?: () => void;
    /** Leading icon (the spec's hasLeading). Text, number and password only. */
    leadingIcon?: IconName | null;
    /** Content between the leading icon and the text, such as a dial code. It reads with the value. */
    leadingContent?: React.ReactNode;
    /** Trailing icon on text and number (hasTrailing). Number defaults to `dialpad`; `null` for none. */
    trailingIcon?: IconName | null;
    /** Accessible name of the clear control. */
    clearLabel?: string;
    className?: string;
}
/**
 * The text entry control on its own, without a label or hint around it. One
 * model covers five input types, Text, Number, Password, Date and Time, which
 * share the same Size, Shape, State and Flavour and differ only in their
 * placeholder and in the control sitting at the trailing edge.
 *
 * Behaviour — the native input, disabled semantics, form participation, and
 * labelling when it sits in a Base UI Field — comes from Base UI's Input.
 * Everything visual comes from the token layer via `input-field.css`, keyed
 * off data attributes. The spec's State is derived and reflected as
 * `data-state`: keyboard focus on an empty field `focus`, pointer focus
 * `selected`, focus with a value `typing` (clear appears), a value at rest
 * `filled`; `invalid`, `readOnly` and `disabled` come from props.
 *
 * Kept in step with packages/web-components `<zds-input-field>`.
 *
 * @spec specs/input/input.spec.md
 */
export declare const InputField: React.ForwardRefExoticComponent<InputFieldProps & React.RefAttributes<HTMLInputElement>>;
