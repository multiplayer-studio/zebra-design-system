import * as React from "react";
import { Field } from "@base-ui/react/field";
import { Icon } from "../icon/Icon.js";
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
export function InputLabel({ children, type = "default", information = false, informationLabel = "More information", subLabel, nativeLabel = true }: InputLabelProps) {
  const row = (
    <Field.Label className="zds-input__label" {...(nativeLabel ? {} : { nativeLabel: false, render: <div /> })}>
      <span className="zds-input__name">{children}</span>
      {type === "required" ? <span className="zds-input__required" aria-hidden="true">*</span> : null}
      {type === "optional" ? <span className="zds-input__optional">(optional)</span> : null}
      {information ? <Icon className="zds-input__information" name="info" size="medium" iconStyle="rounded" label={informationLabel} /> : null}
    </Field.Label>
  );
  if (!subLabel) return row;
  // Input Label's root: the label row, then the sub label, space/xs apart.
  return (
    <div className="zds-input__label-group">
      {row}
      <Field.Description className="zds-input__sub-label">{subLabel}</Field.Description>
    </div>
  );
}
