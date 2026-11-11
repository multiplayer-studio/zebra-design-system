import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import "./screen-header-bar.css";
const SHAPED = [Button, IconButton];
/** Pass the bar's shape to a Button / IconButton action (top level or inside a fragment). */
function shapeAction(node, shape) {
    return React.Children.map(node, (child) => {
        if (!React.isValidElement(child))
            return child;
        if (child.type === React.Fragment)
            return _jsx(_Fragment, { children: shapeAction(child.props.children, shape) });
        return SHAPED.includes(child.type) ? React.cloneElement(child, { shape }) : child;
    });
}
/**
 * The bar at the top of a screen: a back button, the screen's title and one
 * trailing action. Reach for it on a pushed screen with exactly one primary
 * action.
 *
 * Overlaps `TopAppBar`, which covers the same screen-level role with
 * more layouts and slots; this is effectively its single-action preset. Use
 * Top App Bar when a screen needs more than one action or a different leading
 * control.
 *
 * Departures from Figma, each a spec issue:
 * - The leading control is an `IconButton` (medium, subtle, `chevron-left`)
 *   with its own states, not the "locked Icon" the metadata describes. It is
 *   reachable by keyboard, named "Back" (`backLabel`), and calls `onBack`.
 * - Height, padding and gap are the bound tokens (space/md around control/md,
 *   left space/sm, gap space/xs = 64px), not the metadata's 56 / space/lg.
 * - `shape` (Figma `Rounded`) also reaches an `IconButton` / `Button` placed
 *   as the action, not only the one Figma ships in the slot.
 * - The bar fills its container's width (Figma ships a fixed 474).
 * - No subtitle: Figma's heading wrapper has a gap for one but no property.
 *
 * No Base UI primitive: the bar is a static layout; the only behaviour is the
 * back button's, which comes from IconButton (Base UI Button).
 *
 * Kept in step with packages/web-components `<zds-screen-header-bar>`.
 *
 * @spec specs/screen-header-bar/screen-header-bar.spec.md
 */
export const ScreenHeaderBar = React.forwardRef(function ScreenHeaderBar({ title, headingLevel = 1, showLeadingIcon = true, onBack, backLabel = "Back", shape = "rounded", action, className, ...rest }, ref) {
    const Heading = `h${headingLevel}`;
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-screen-header-bar", className].filter(Boolean).join(" "), "data-shape": shape, children: [showLeadingIcon ? (_jsx(IconButton, { className: "zds-screen-header-bar__leading", flavour: "subtle", size: "medium", shape: shape, icon: "chevron-left", label: backLabel, onClick: onBack })) : null, _jsx("div", { className: "zds-screen-header-bar__heading", children: _jsx(Heading, { className: "zds-screen-header-bar__title", children: title }) }), action != null && action !== false ? (_jsx("div", { className: "zds-screen-header-bar__action", children: shapeAction(action, shape) })) : null] }));
});
