import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { type IconName } from "../icon/Icon.js";
import "./button.css";
export type ButtonFlavour = "primary" | "positive" | "negative" | "subtle" | "text" | "outline-subtle" | "outline" | "gradient" | "text-gradient"
/** `contrast` is the strongest neutral against the
    page; `outline-contrast` is its outline sibling. Both follow the mode. */
 | "contrast" | "outline-contrast";
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
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>>;
