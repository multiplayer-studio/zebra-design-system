import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon } from "../icon/Icon.js";
import { cx, textOf } from "../chip/chip.js";
import "./assist-chip.css";
/** `feedback/info/foreground` -> `var(--feedback-info-foreground)`; anything else passes through. */
const paint = (v) => (v && /^[a-z0-9-]+(\/[a-z0-9-]+)+$/.test(v) ? `var(--${v.replace(/\//g, "-")})` : v);
/**
 * Offers a contextual action, or stands for an item someone can discard,
 * such as an attached file. Five colours borrow the status tokens to mark a
 * state or a kind of item, and `foreground`, `background` and `border`
 * override any one paint beyond those five (override > color > state). The
 * children are the label. Reach for Button when the action is the primary
 * next step, and FilterChip when the control narrows content.
 *
 * Without a remove control the chip is one Base UI Button. With one, a
 * button cannot hold another, so the root becomes a span carrying the label
 * (a Base UI Button only when `onClick` is set) and the remove control side
 * by side, as InputChip does. Not modelled from Figma (spec issues): the
 * single-value `active` axis and State=selected. 28px tall in every state
 * (Figma's 30/28 jump is a layout artefact of its inside border).
 *
 * Kept in step with packages/web-components `<zds-assist-chip>`.
 *
 * @spec specs/assist-chip/assist-chip.spec.md
 */
export const AssistChip = React.forwardRef(function AssistChip({ showLeadingIcon = true, icon = "star", shape = "rounded", color = "neutral", foreground, background, border, discardable, onDiscard, discardLabel, disabled = false, className, style, children, ...rest }, ref) {
    const canDiscard = (discardable ?? onDiscard !== undefined) && !disabled;
    const overrides = {
        "--zds-assist-fg": paint(foreground),
        "--zds-assist-bg": paint(background),
        "--zds-assist-border": paint(border),
    };
    const content = (_jsxs(_Fragment, { children: [showLeadingIcon && icon ? _jsx(Icon, { className: "zds-chip__glyph", name: icon, size: "xsmall", iconStyle: "rounded" }) : null, _jsx("span", { className: "zds-chip__label", children: children })] }));
    const common = {
        "data-interactive": "",
        "data-shape": shape,
        "data-color": color,
        style: { ...overrides, ...style },
    };
    if (!canDiscard) {
        return (_jsx(BaseButton, { ref: ref, ...rest, disabled: disabled, className: cx("zds-chip", "zds-assist-chip", className), ...common, children: content }));
    }
    const text = textOf(children);
    const onKeyDown = (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            onDiscard?.(e);
        }
    };
    return (_jsxs("span", { ref: ref, className: cx("zds-chip", "zds-assist-chip", className), "data-discardable": "", ...common, children: [rest.onClick ? _jsx(BaseButton, { ...rest, className: "zds-assist-chip__action", children: content }) : content, _jsx(BaseButton, { className: "zds-assist-chip__remove", "aria-label": discardLabel ?? (text ? `Remove ${text}` : "Remove"), onClick: (e) => onDiscard?.(e), onKeyDown: onKeyDown, children: _jsx(Icon, { className: "zds-chip__glyph", name: "close", size: "small", iconStyle: "rounded" }) })] }));
});
