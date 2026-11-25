import * as React from "react";
import "./input.css";
/** Marker after the name: none, an asterisk (`required`) or `(optional)`. */
export type InputLabelType = "default" | "required" | "optional";
export interface InputLabelProps {
    /** The field's name. */
    children: React.ReactNode;
    /** Marker after the name. Mark whichever of required or optional is the exception. */
    type?: InputLabelType;
    /** Adds an information icon after the name (Show Information). */
    information?: boolean;
    /** Accessible name of the information icon. */
    informationLabel?: string;
    /** Supporting line under the name (Show Sub Label). Empty hides it. */
    subLabel?: React.ReactNode;
    /** `false` when the control is not a native form control (Select's button). */
    nativeLabel?: boolean;
}
/**
 * Input Label — the field's name with its marker and information icon, and
 * an optional sub label under it. A Base UI `Field.Label` (and, for the sub
 * label, a `Field.Description`), so it must sit inside a `Field.Root`: the
 * sub label reaches the control's `aria-describedby` alongside the hint.
 * Shared by Input and Select. Dimming comes from the assembly's
 * `data-state="disabled"`. Styles are `.zds-input__label*` in `input.css`.
 *
 * Kept in step with packages/web-components `renderInputLabel`.
 *
 * @spec specs/input/input.spec.md (subcomponents.inputLabel)
 */
export declare function InputLabel({ children, type, information, informationLabel, subLabel, nativeLabel }: InputLabelProps): React.JSX.Element;
