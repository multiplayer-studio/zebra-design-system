import * as React from "react";
import { Field } from "@base-ui/react/field";
import { Icon } from "../icon/Icon.js";
import { InputField, type InputFieldProps } from "../input-field/InputField.js";
import { InputHint } from "./InputHint.js";
import "./input.css";

export type InputState = "default" | "invalid" | "disabled";
export type InputLabelType = "default" | "required" | "optional";

export interface InputProps extends Omit<InputFieldProps, "invalid" | "disabled"> {
  /** The field's name, shown above it. Empty hides the label (Show Label). */
  label?: React.ReactNode;
  /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception. */
  labelType?: InputLabelType;
  /** Adds an information icon after the name (the label's Show Information). */
  information?: boolean;
  /** Accessible name of the information icon. */
  informationLabel?: string;
  /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
  hint?: React.ReactNode;
  /** Icon ahead of the hint (the hint's Show Icon). */
  hintIcon?: boolean;
  /** One state across label, field and hint. */
  state?: InputState;
}

/**
 * The full field assembly, a label above, the field itself and a hint below,
 * stacked and spaced as one unit.
 *
 * Behaviour — the label and hint wired to the input, disabled and invalid
 * semantics, form name — comes from Base UI's Field. In code the assembly
 * surfaces its parts' properties itself (spec decision), including one
 * general `state`: `invalid` makes the field invalid and the hint an error;
 * `disabled` disables the field and dims the label and hint. A required label
 * carries the asterisk and makes the field required.
 *
 * Defaults are the size and shape an Input arrives with: medium, rounded.
 * Kept in step with packages/web-components `<zds-input>`.
 *
 * @spec specs/input/input.spec.md
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label, labelType = "default", information = false, informationLabel = "More information",
    hint, hintIcon = true, state = "default", size = "medium", shape = "rounded", name, className, ...fieldProps
  },
  ref,
) {
  const disabled = state === "disabled";
  const invalid = state === "invalid";
  const hintType = disabled ? "disabled" : invalid ? "error" : "default";
  return (
    <Field.Root className={["zds-input", className].filter(Boolean).join(" ")} name={name} disabled={disabled} invalid={invalid} data-state={state}>
      {label ? (
        <Field.Label className="zds-input__label">
          <span className="zds-input__name">{label}</span>
          {labelType === "required" ? <span className="zds-input__required" aria-hidden="true">*</span> : null}
          {labelType === "optional" ? <span className="zds-input__optional">(optional)</span> : null}
          {information ? <Icon className="zds-input__information" name="info" size="medium" iconStyle="rounded" label={informationLabel} /> : null}
        </Field.Label>
      ) : null}
      <InputField ref={ref} {...fieldProps} size={size} shape={shape} name={name} disabled={disabled} invalid={invalid} required={labelType === "required"} />
      {hint ? <InputHint type={hintType} icon={hintIcon}>{hint}</InputHint> : null}
    </Field.Root>
  );
});
