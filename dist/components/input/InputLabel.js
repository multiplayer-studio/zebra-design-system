import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "@base-ui/react/field";
import { Icon } from "../icon/Icon.js";
import "./input.css";
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
export function InputLabel({ children, type = "default", information = false, informationLabel = "More information", subLabel, nativeLabel = true }) {
    const row = (_jsxs(Field.Label, { className: "zds-input__label", ...(nativeLabel ? {} : { nativeLabel: false, render: _jsx("div", {}) }), children: [_jsx("span", { className: "zds-input__name", children: children }), type === "required" ? _jsx("span", { className: "zds-input__required", "aria-hidden": "true", children: "*" }) : null, type === "optional" ? _jsx("span", { className: "zds-input__optional", children: "(optional)" }) : null, information ? _jsx(Icon, { className: "zds-input__information", name: "info", size: "medium", iconStyle: "rounded", label: informationLabel }) : null] }));
    if (!subLabel)
        return row;
    // Input Label's root: the label row, then the sub label, space/xs apart.
    return (_jsxs("div", { className: "zds-input__label-group", children: [row, _jsx(Field.Description, { className: "zds-input__sub-label", children: subLabel })] }));
}
