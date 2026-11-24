import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { Icon } from "../icon/Icon.js";
import "./switch.css";
/**
 * A single on or off toggle, a track with a thumb slider that switches
 * between its two ends.
 *
 * Behaviour — `role="switch"`, keyboard toggling, focus, disabled semantics,
 * the hidden form input and label association — comes from Base UI's Switch.
 * Everything visual comes from the token layer via `switch.css`, keyed off
 * Base UI's `[data-checked]` / `[data-disabled]`, so an `.ext-*` / `.mode-*`
 * class on any ancestor re-themes it with no re-render.
 *
 * Mapping from the spec's Figma API:
 * - `Switch` on/off → `checked` / `defaultChecked`. A two-value enum is a
 *   boolean in code (spec note on `api`).
 * - `State` → not a prop. `disabled` is `disabled`; `focus` comes from
 *   keyboard focus (`:focus-visible`).
 * - `hasIcons` → whether any glyph is set. The icon slots are swap-only in
 *   Figma (spec `internalVariations`); here they are `onIcon` (the start
 *   slot, uncovered while on) and `offIcon` (the end slot, uncovered while
 *   off). Leave both unset for a plain track and thumb.
 *
 * Switch has no visible label part: name it with a `<label>` around it or
 * `htmlFor` its `id`, or `aria-label`.
 *
 * @spec specs/switch/switch.spec.md
 */
export const Switch = React.forwardRef(function Switch({ onIcon, offIcon, className, onCheckedChange, ...rest }, ref) {
    // Motion only after the first user toggle, so a switch that renders checked
    // doesn't slide into place on mount.
    const [animated, setAnimated] = React.useState(false);
    const handleCheckedChange = React.useCallback((checked, details) => {
        setAnimated(true);
        onCheckedChange?.(checked, details);
    }, [onCheckedChange]);
    // Rounded is the family the spec pins (Style=rounded on both slots). Size is
    // the nested Icon's own medium variant, also pinned — never a token on
    // Switch. Colour is inherited from the icons wrapper (currentColor).
    return (_jsxs(BaseSwitch.Root, { ref: ref, ...rest, onCheckedChange: handleCheckedChange, className: ["zds-switch", className].filter(Boolean).join(" "), "data-animated": animated ? "" : undefined, children: [onIcon || offIcon ? (_jsxs("span", { className: "zds-switch__icons", "aria-hidden": "true", children: [_jsx("span", { className: "zds-switch__slot", children: onIcon ? _jsx(Icon, { name: onIcon, size: "medium", iconStyle: "rounded" }) : null }), _jsx("span", { className: "zds-switch__slot", children: offIcon ? _jsx(Icon, { name: offIcon, size: "medium", iconStyle: "rounded" }) : null })] })) : null, _jsx(BaseSwitch.Thumb, { className: "zds-switch__thumb" }), _jsx("span", { className: "zds-switch__ring", "aria-hidden": "true" })] }));
});
