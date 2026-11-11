import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "@base-ui/react/field";
import { Icon } from "../icon/Icon.js";
import "./input.css";
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
export function InputHint({ type = "default", icon = true, children }) {
    return (_jsxs(Field.Description, { className: "zds-input__hint", "data-type": type, children: [icon ? _jsx(Icon, { className: "zds-input__hint-icon", name: type === "error" ? "error" : "info", size: "small", iconStyle: "rounded" }) : null, _jsx("span", { className: "zds-input__message", "aria-live": type === "error" ? "polite" : undefined, children: children })] }));
}
