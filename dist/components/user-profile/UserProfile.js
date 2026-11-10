import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Avatar } from "../avatar/Avatar.js";
import { Icon } from "../icon/Icon.js";
import "./user-profile.css";
/**
 * The account control in a GlobalHeader: a username, an avatar and a chevron
 * on a neutral ground. It takes every prop `Dropdown` passes its trigger, so
 * the ARIA and the open state come from Base UI.
 *
 * Figma fixes the username and avatar as sample content; both are inputs here
 * (spec issue).
 *
 * Kept in step with packages/web-components `<zds-user-profile>`.
 *
 * @spec specs/global-header/global-header.spec.md
 */
export const UserProfile = React.forwardRef(function UserProfile({ username = "Username", avatarSrc, initials, avatarProps, rounded = false, disabled = false, className, ...rest }, ref) {
    return (_jsxs(BaseButton, { ref: ref, ...rest, disabled: disabled, className: ["zds-user-profile", className].filter(Boolean).join(" "), "data-rounded": rounded ? "" : undefined, children: [_jsx("span", { className: "zds-user-profile__username", children: username }), _jsx(Avatar, { type: avatarSrc ? "photo" : "initials", src: avatarSrc, initials: initials, alt: "", showClose: false, showStatus: false, showRing: false, ...avatarProps, size: "xxsmall" }), _jsx(Icon, { name: "expand-more", size: "small" })] }));
});
