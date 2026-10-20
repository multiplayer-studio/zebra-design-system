import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon, type IconName } from "../icon/Icon.js";
import "./button.css";

export type ButtonFlavour =
  | "primary" | "positive" | "negative" | "subtle" | "text"
  | "outline-subtle" | "outline" | "gradient" | "text-gradient";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonShape = "sharp" | "rounded" | "full";

export interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className"> {
  /** How much weight the action carries. One primary per view. */
  flavour?: ButtonFlavour;
  /** Fits the control to its surface. Drives height, padding, type ramp and icon size together. */
  size?: ButtonSize;
  /** Corner treatment. Match the container; don't mix shapes in one group. */
  shape?: ButtonShape;
  /** Glyph before the label. */
  leadingIcon?: IconName;
  /** Glyph after the label. Use for directional or disclosure actions. */
  trailingIcon?: IconName;
  className?: string;
}

/**
 * Triggers an action from a text label, with optional icons on either side.
 *
 * Behaviour — focus handling, the disabled semantics, `render` polymorphism —
 * comes from Base UI's Button. Everything visual comes from the token layer via
 * `button.css`, keyed off data attributes, so an `.ext-*` / `.mode-*` class on
 * any ancestor re-themes it with no re-render.
 *
 * @spec specs/button/button.spec.md
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  { flavour = "primary", size = "small", shape = "sharp", leadingIcon, trailingIcon, className, children, ...rest },
  ref,
) {
  // The icon follows the button's shape: only shape="sharp" takes the sharp
  // family. Button pins this rather than exposing it.
  const iconStyle = shape === "sharp" ? "sharp" : "rounded";
  // Icon's size axis has no "large" consumer here: medium and large buttons
  // both use the medium icon (see the icon spec's own size note).
  const iconSize = size === "small" ? "small" : "medium";
  return (
    <BaseButton
      ref={ref}
      {...rest}
      className={["zds-button", className].filter(Boolean).join(" ")}
      data-flavour={flavour}
      data-size={size}
      data-shape={shape}
    >
      {leadingIcon ? (
        <Icon className="zds-button__icon" name={leadingIcon} iconStyle={iconStyle} size={iconSize} />
      ) : null}
      <span className="zds-button__label">{children}</span>
      {trailingIcon ? (
        <Icon className="zds-button__icon" name={trailingIcon} iconStyle={iconStyle} size={iconSize} />
      ) : null}
    </BaseButton>
  );
});
