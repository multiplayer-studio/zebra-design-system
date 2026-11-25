import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { DropdownMenu } from "../dropdown-menu/DropdownMenu.js";
import "./dropdown.css";
// Our `position` is Base UI's `side`; our `align` is Base UI's `align`, but
// the value sets don't line up 1:1. Base UI's Align is logical (`start` /
// `center` / `end`) relative to the cross axis of whatever `side` is picked;
// the spec's Align is physical (`left` / `right` / `top` / `bottom`) and only
// two of its four values apply to any given Position (see the spec's
// Variants table — "top"/"bottom" align has no effect while Position is
// itself "bottom"/"top", and vice versa). In this app's LTR-only layout,
// "left" and "top" both mean "line up the leading/top edge", i.e. Base UI's
// `start`; "right" and "bottom" both mean `end`. `center` is never reached
// because the spec's Align never offers it.
const ALIGN_TO_BASE_UI = {
    left: "start",
    top: "start",
    right: "end",
    bottom: "end",
};
/**
 * A trigger paired with a Dropdown Menu, positioned relative to it — a
 * pattern rather than a component (per the spec, the page's "Dropdown" is
 * three sibling component sets; this composes all three: `trigger` swaps in
 * for the spec's `triggerComponent`, `children` fill the Dropdown Menu's
 * slot).
 *
 * Behaviour — open/close state, focus return, escape-to-close, collision
 * avoidance when the menu would open off-screen — comes from Base UI's
 * `Menu.Root` / `Menu.Positioner`. The spec explicitly leaves all of that to
 * the implementation ("flipping Position [at a viewport edge] is the
 * implementation's job") and only models the fixed anchor math for the
 * non-colliding case, so Base UI's Positioner (which auto-flips) is strictly
 * more capable than the spec — that's intentional, not a deviation.
 *
 * The gap between trigger and menu is `--space-sm` (8px), read from the
 * token layer via `getComputedStyle` and handed to `sideOffset`, which only
 * accepts a number or a function — see the `offset` callback below. This
 * keeps the single literal traceable to its token instead of a hard-coded
 * `8`.
 *
 * @spec specs/dropdown/dropdown.spec.md
 */
export const Dropdown = React.forwardRef(function Dropdown({ trigger, position = "bottom", align = "left", rounded = true, compact = false, open, defaultOpen, onOpenChange, children, portalContainer, className, }, ref) {
    // `Menu.Positioner`'s `sideOffset` takes a number (or a function returning
    // one), never a CSS value — read the resolved px value of `--space-sm`
    // once per open rather than hard-coding it, so a token change keeps this
    // in sync without touching code.
    const sideOffset = React.useCallback(() => {
        if (typeof window === "undefined")
            return 8; // SSR fallback; matches --space-sm's shipped 8px.
        const el = document.documentElement;
        const px = parseFloat(getComputedStyle(el).getPropertyValue("--space-sm"));
        return Number.isFinite(px) ? px : 8;
    }, []);
    return (_jsxs(Menu.Root, { open: open, defaultOpen: defaultOpen, onOpenChange: onOpenChange, children: [_jsx(Menu.Trigger, { render: trigger }), _jsx(Menu.Portal, { container: portalContainer, children: _jsx(Menu.Positioner, { ref: ref, className: "zds-dropdown__positioner", side: position, align: ALIGN_TO_BASE_UI[align], sideOffset: sideOffset, children: _jsx(DropdownMenu, { rounded: rounded, compact: compact, className: className, children: children }) }) })] }));
});
