import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Avatar } from "../avatar/Avatar.js";
import { Icon } from "../icon/Icon.js";
import { cx, initialsOf, textOf } from "../chip/chip.js";
import "./input-chip.css";
/**
 * Represents a person, entity or value someone has entered or picked, such
 * as a recipient on a message, so it can be reviewed and removed without
 * retyping. Belongs inside input and selection fields; reach for FilterChip
 * to narrow content or AssistChip to offer an action. The children are the
 * label.
 *
 * The chip itself is not a control: its one interactive part is the remove
 * control, a Base UI Button named "Remove <label>". Figma gives that control
 * no API and shows it even when disabled (spec issue); here it renders only
 * when there is something to call (`onRemove`, or `removable`) and never on
 * a disabled chip. The chip shows its focus treatment while the remove
 * control has keyboard focus.
 *
 * Kept in step with packages/web-components `<zds-input-chip>`.
 *
 * @spec specs/input-chip/input-chip.spec.md
 */
export const InputChip = React.forwardRef(function InputChip({ showAvatar = true, avatarSrc, avatarInitials, avatarColor, disabled = false, shape = "rounded", onRemove, removable, removeLabel, className, children, ...rest }, ref) {
    const text = textOf(children);
    const canRemove = (removable ?? onRemove !== undefined) && !disabled;
    const onKeyDown = (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            onRemove?.(e);
        }
    };
    return (_jsxs("span", { ref: ref, ...rest, className: cx("zds-chip", "zds-input-chip", className), "data-interactive": "", "data-shape": shape, "data-disabled": disabled ? "" : undefined, "aria-disabled": disabled || undefined, children: [showAvatar ? (_jsx(Avatar, { className: "zds-input-chip__avatar", "aria-hidden": "true", size: "xxxsmall", type: avatarSrc ? "photo" : "initials", src: avatarSrc, initials: avatarInitials ?? initialsOf(text), swatchColor: avatarColor, showStatus: false, showRing: false, showClose: false })) : null, _jsx("span", { className: "zds-chip__label", children: children }), canRemove ? (_jsx(BaseButton, { className: "zds-input-chip__remove", "aria-label": removeLabel ?? (text ? `Remove ${text}` : "Remove"), onClick: (e) => onRemove?.(e), onKeyDown: onKeyDown, children: _jsx(Icon, { className: "zds-chip__glyph", name: "close", size: "small", iconStyle: "rounded" }) })) : null] }));
});
