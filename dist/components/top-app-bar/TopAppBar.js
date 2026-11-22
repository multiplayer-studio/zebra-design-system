import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Avatar } from "../avatar/Avatar.js";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Search } from "../search/Search.js";
import "./top-app-bar.css";
const LEADING = {
    default: { icon: "hamburger-menu", label: "Menu" },
    centered: { icon: "hamburger-menu", label: "Menu" },
    extended: { icon: "hamburger-menu", label: "Menu" },
    contextual: { icon: "close", label: "Clear selection" },
    "contextual alt": { icon: "close", label: "Clear selection" },
    search: { icon: "arrow-back", label: "Back" },
};
/**
 * The header at the top of a mobile screen. `type` switches between six
 * arrangements, each with its own leading control and content.
 *
 * Departures from Figma, each a spec issue:
 * - `count`, `avatarSrc`, `avatarInitials`, `searchValue` and the leading
 *   label are inputs, because Figma draws them as fixed sample content.
 * - The title and count use foreground/primary, because Figma's raw black
 *   would not follow dark mode.
 * - contextual keeps space/md after the leading control, as the metadata says.
 *   Figma binds none there.
 * - The search field opens empty, not in Figma's typing state.
 * - The bar fills its container (Figma ships a fixed 390).
 *
 * No Base UI primitive: the bar is a static layout, and its controls bring
 * their own.
 *
 * Kept in step with packages/web-components `<zds-top-app-bar>`.
 *
 * @spec specs/top-app-bar/top-app-bar.spec.md
 */
export const TopAppBar = React.forwardRef(function TopAppBar({ type = "default", shape = "sharp", pageTitle = "Title", headingLevel = 1, trailing, contextualControls, count = "2 Items", avatarSrc, avatarInitials, leadingLabel, trailingLabel = "Account", searchValue, onSearchChange, onLeadingClick, onTrailingClick, className, ...rest }, ref) {
    const { icon, label } = LEADING[type];
    const Heading = `h${headingLevel}`;
    const title = _jsx(Heading, { className: "zds-top-app-bar__title", children: pageTitle });
    const leading = type === "contextual alt"
        ? _jsx(Button, { flavour: "subtle", size: "small", shape: "rounded", leadingIcon: icon, "aria-label": leadingLabel ?? label, onClick: onLeadingClick, children: _jsx("span", { role: "status", children: count }) })
        : _jsx(IconButton, { flavour: "subtle", size: "small", shape: "rounded", icon: icon, label: leadingLabel ?? label, onClick: onLeadingClick });
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-top-app-bar", className].filter(Boolean).join(" "), "data-type": type, "data-shape": shape, children: [type === "search" ? (_jsxs("div", { className: "zds-top-app-bar__main zds-top-app-bar__main--search", children: [leading, _jsx(Search, { className: "zds-top-app-bar__field", block: true, size: "small", flavour: "ghost", shape: "rounded", value: searchValue, onValueChange: onSearchChange })] })) : (_jsxs("div", { className: "zds-top-app-bar__main", children: [_jsxs("div", { className: "zds-top-app-bar__leading", children: [leading, type === "default" ? (_jsxs("span", { className: "zds-top-app-bar__page-header", children: [avatarSrc || avatarInitials ? _jsx(Avatar, { size: "xxxsmall", type: avatarSrc ? "photo" : "initials", src: avatarSrc, initials: avatarInitials, alt: "", showClose: false, showStatus: false, showRing: false }) : null, title] })) : null, type === "centered" ? _jsx("span", { className: "zds-top-app-bar__page-header", children: title }) : null, type === "contextual" ? _jsx("span", { className: "zds-top-app-bar__count", role: "status", children: count }) : null] }), type === "default" || type === "extended" ? _jsx("div", { className: "zds-top-app-bar__trailing", children: trailing }) : null, type === "contextual" || type === "contextual alt" ? _jsx("div", { className: "zds-top-app-bar__trailing", children: contextualControls }) : null, type === "centered" ? _jsx(IconButton, { flavour: "subtle", size: "small", shape: "rounded", icon: "user-circle", label: trailingLabel, onClick: onTrailingClick }) : null] })), type === "extended" ? _jsx("div", { className: "zds-top-app-bar__second-row", children: title }) : null] }));
});
