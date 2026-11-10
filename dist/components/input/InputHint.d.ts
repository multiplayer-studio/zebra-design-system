import * as React from "react";
import "./input.css";
/** Input Hint's message type: `default` (info), `error` (the reason a value is invalid), `disabled` (dimmed). */
export type InputHintType = "default" | "error" | "disabled";
export interface InputHintProps {
    /** Which message: info, error or dimmed. */
    type?: InputHintType;
    /** Icon ahead of the message (the hint's Show Icon). */
    icon?: boolean;
    children: React.ReactNode;
}
/**
 * Input Hint — the supporting line below a field. A Base UI
 * `Field.Description`, so it must sit inside a `Field.Root`, which wires it to
 * the control's `aria-describedby`. Shared by Input and Stepper Input so the
 * two cannot drift (Stepper Input's spec: its private `_Hint text` duplicates
 * Input Hint; reuse it). Styles are `.zds-input__hint` in `input.css`.
 *
 * Kept in step with packages/web-components `renderInputHint`.
 *
 * @spec specs/input/input.spec.md (subcomponents.inputHint)
 */
export declare function InputHint({ type, icon, children }: InputHintProps): React.JSX.Element;
