import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Field } from "@base-ui/react/field";
import { Icon } from "../icon/Icon.js";
import { CaretIndicator } from "../caret-indicator/CaretIndicator.js";
import { InputHint } from "../input/InputHint.js";
import { InputLabel } from "../input/InputLabel.js";
import "../input-field/input-field.css";
import "../input/input.css";
import "../dropdown-menu/dropdown-menu.css";
import "../menu-item/menu-item.css";
import "./select.css";
// Hoisted: a fresh [] default would change identity every render.
const NO_OPTIONS = [];
/**
 * The full select assembly: a label above, a Select Field in the middle and a
 * hint below, stacked and spaced as one unit. Opening it reveals a Dropdown
 * Menu of the options, overlaid below the field.
 *
 * Built by composition: the field wears Input Field's classes and `data-*`
 * axes, the list Dropdown Menu's panel and Menu Item's rows, the label and
 * hint Input's. `select.css` holds only the deltas — the `open` state, the
 * placeholder colour, the list's width and scroll.
 *
 * Behaviour — the WAI-ARIA listbox select (a button with `aria-haspopup`
 * and `aria-expanded`, `role="listbox"` / `role="option"` with
 * `aria-selected`), typeahead, arrow / Home / End navigation, Enter or Space
 * to choose, Escape to close, focus return, collision flipping and form
 * participation — comes from Base UI's Select. That model opens on Enter,
 * Space and the arrow keys, so it satisfies both metadata keyboard
 * descriptions (spec issue 7: Select's "Space or Enter" and Select Field's
 * "Alt+Down or Enter"); it follows Select's, the fuller one.
 *
 * The field's State is derived and reflected as `data-state`, in Input /
 * Select's names: open → `open` (spec issue 11: not Input Field's
 * `selected`), a value at rest → `filled`, plus `invalid`, `read-only` and
 * `disabled` from props. Keyboard focus is `:focus-visible`. Open outranks
 * invalid, as focus does on Input Field.
 *
 * Kept in step with packages/web-components `<zds-select>`.
 *
 * @spec specs/select/select.spec.md
 */
export const Select = React.forwardRef(function Select({ options = NO_OPTIONS, value: valueProp, defaultValue = null, onValueChange, open: openProp, defaultOpen = false, onOpenChange, placeholder = "Select an option", label, labelType = "default", information = false, informationLabel = "More information", subLabel, hint, hintIcon = true, state = "default", readOnly = false, name, leadingIcon = null, size = "medium", shape = "rounded", flavour = "default", compact = false, block = false, portalContainer, "aria-label": ariaLabel, className, }, ref) {
    const [innerValue, setInnerValue] = React.useState(defaultValue);
    const value = valueProp === undefined ? innerValue : valueProp;
    const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
    const open = openProp ?? innerOpen;
    const rootRef = React.useRef(null);
    // The default portal target is the Select's own root, known only after
    // mount: hold the list back until then so it never lands in <body> first.
    const [root, setRoot] = React.useState(null);
    const setRootRef = React.useCallback((el) => { rootRef.current = el; setRoot(el); }, []);
    const container = portalContainer ?? root;
    const disabled = state === "disabled";
    const invalid = state === "invalid";
    const hintType = disabled ? "disabled" : invalid ? "error" : "default";
    const chosen = options.find((o) => o.value === value) ?? null;
    const fieldState = disabled ? "disabled"
        : open ? "open"
            : invalid ? "invalid" : readOnly ? "read-only" : chosen ? "filled" : "enabled";
    const items = React.useMemo(() => options.map((o) => ({ value: o.value, label: o.label ?? o.value })), [options]);
    const iconSize = size === "small" ? "small" : "medium";
    const shownIcon = chosen?.icon ?? leadingIcon;
    // Positioner offsets take a number, never a CSS value: resolve --space-2xs
    // (the spec's 4 Px under the field) at the field's place in the cascade.
    const sideOffset = React.useCallback(() => {
        if (typeof window === "undefined")
            return 4; // SSR fallback: --space-2xs's shipped 4px.
        const px = parseFloat(getComputedStyle(rootRef.current ?? document.documentElement).getPropertyValue("--space-2xs"));
        return Number.isFinite(px) ? px : 4;
    }, []);
    return (_jsxs(Field.Root, { ref: setRootRef, className: ["zds-input", "zds-select", className].filter(Boolean).join(" "), name: name, disabled: disabled, invalid: invalid, "data-state": state, "data-block": block ? "" : undefined, children: [label ? (_jsx(InputLabel, { type: labelType, information: information, informationLabel: informationLabel, subLabel: subLabel, nativeLabel: false, children: label })) : null, _jsxs(BaseSelect.Root, { items: items, value: value, onValueChange: (v) => { if (valueProp === undefined)
                    setInnerValue(v); onValueChange?.(v); }, open: open, onOpenChange: (o) => { if (openProp === undefined)
                    setInnerOpen(o); onOpenChange?.(o); }, name: name, disabled: disabled, readOnly: readOnly, required: labelType === "required", children: [_jsxs(BaseSelect.Trigger, { ref: ref, "aria-label": label ? undefined : ariaLabel, className: "zds-input-field zds-select__trigger", "data-size": size, "data-shape": shape, "data-flavour": flavour, "data-state": fieldState, children: [shownIcon ? _jsx(Icon, { className: "zds-input-field__icon", name: shownIcon, size: iconSize, iconStyle: "rounded" }) : null, _jsx(BaseSelect.Value, { className: "zds-input-field__input zds-select__value", "data-empty": chosen ? undefined : "", placeholder: placeholder }), _jsx(BaseSelect.Icon, { className: "zds-select__chevron", render: _jsx("span", {}), children: _jsx(CaretIndicator, { direction: "vertical", open: open, size: iconSize }) })] }), container ? _jsx(BaseSelect.Portal, { container: container, children: _jsx(BaseSelect.Positioner, { className: "zds-select__positioner", alignItemWithTrigger: false, side: "bottom", align: "start", sideOffset: sideOffset, positionMethod: "fixed", children: _jsx(BaseSelect.Popup, { className: "zds-dropdown-menu zds-select__popup", "data-rounded": "true", "data-compact": compact, children: _jsx(BaseSelect.List, { className: "zds-dropdown-menu__content", children: options.map((o) => (_jsxs(BaseSelect.Item, { value: o.value, disabled: o.disabled, className: "zds-menu-item zds-select__item", "data-rounded": "true", children: [o.icon ? _jsx("span", { className: "zds-menu-item__leading", children: _jsx(Icon, { name: o.icon, size: "small" }) }) : null, _jsx(BaseSelect.ItemText, { className: "zds-menu-item__label zds-select__item-label", children: o.label ?? o.value }), _jsx(BaseSelect.ItemIndicator, { className: "zds-menu-item__trailing zds-select__check", children: _jsx(Icon, { name: "check-mark", size: "small", iconStyle: "rounded" }) })] }, o.value))) }) }) }) }) : null] }), hint ? _jsx(InputHint, { type: hintType, icon: hintIcon, children: hint }) : null] }));
});
