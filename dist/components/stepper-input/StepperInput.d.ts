import * as React from "react";
import "../input-field/input-field.css";
import "./stepper-input.css";
export type StepperInputSize = "medium" | "large";
/** Figma's `rounded` false | true, exposed as the library's `shape` (sharp | rounded), as on Button and Input. */
export type StepperInputShape = "sharp" | "rounded";
export interface StepperInputProps {
    /** The value (controlled). `null` is an empty field. */
    value?: number | null;
    /** The starting value (uncontrolled). Defaults to 0 held inside `min`/`max`. */
    defaultValue?: number;
    /** Fires on every change: a step, a key, or a parsed typed value. */
    onValueChange?: (value: number | null) => void;
    /** Lowest value. Decrease disables on reaching it; Home jumps to it. */
    min?: number;
    /** Highest value. Increase disables on reaching it; End jumps to it. Also sizes the value box. */
    max?: number;
    /** Amount one press or arrow key moves the value. */
    step?: number;
    /** Amount PageUp / PageDown and Shift + arrow move the value. */
    largeStep?: number;
    /** medium sits among other medium fields; large is easier to tap. Only the buttons and the value height grow. */
    size?: StepperInputSize;
    /** Corners of the two step buttons. The value box stays square either way (spec metadata). */
    shape?: StepperInputShape;
    /** Dims the whole control; the hint stays, dimmed. */
    disabled?: boolean;
    /** The value failed validation: error border on the value and the hint as an error. */
    invalid?: boolean;
    /** Supporting line below, e.g. the range. On `invalid` it carries the reason. Empty hides it (Figma's Hint). */
    hint?: React.ReactNode;
    /** Accessible name of the value, e.g. "Quantity". There is no visible label. */
    label?: string;
    /** Accessible name of the decrement button. */
    decrementLabel?: string;
    /** Accessible name of the increment button. */
    incrementLabel?: string;
    /** Field name submitted with a form. */
    name?: string;
    className?: string;
}
/**
 * A numeric value with a button on either side to decrease or increase it,
 * and an optional hint below.
 *
 * Behaviour comes from Base UI's NumberField: typing a value, the buttons
 * disabling at `min` / `max`, press-and-hold repeat, ArrowUp / ArrowDown
 * (Shift for `largeStep`) and Home / End. Two things it lacks are added here,
 * matching `<zds-stepper-input>`: PageUp / PageDown move by `largeStep`, and
 * the input carries spinbutton semantics (role, aria-valuenow / min / max).
 *
 * Reuses rather than redraws: the buttons are IconButton (outline-subtle,
 * `remove` / `add`), the value box is InputField's styling (`.zds-input-field`
 * classes and data attributes), the hint is Input Hint, so all three keep
 * their own hover, focus, disabled and invalid states.
 *
 * Kept in step with packages/web-components `<zds-stepper-input>`.
 *
 * @spec specs/stepper-input/stepper-input.spec.md
 */
export declare const StepperInput: React.ForwardRefExoticComponent<StepperInputProps & React.RefAttributes<HTMLInputElement>>;
