import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import { type NavigationRailShape } from "./context.js";
import "./navigation-rail.css";
export type NavigationHeaderType = "avatar" | "logo";
export interface NavigationHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "children"> {
    /** The mark: the user's Avatar, or the `zebra` logo glyph. */
    type?: NavigationHeaderType;
    /** The wide form, with title and action. Inside a NavigationRail the rail sets it. */
    expanded?: boolean;
    /** The product or user name beside the mark, in the wide form. */
    heading?: string;
    /** Shows the title (wide form only). */
    showTitle?: boolean;
    /** Shows the trailing Icon Button (wide form only). */
    showIconButton?: boolean;
    /** The trailing Icon Button's glyph. Settings by default; set any icon, with `actionLabel` and `onAction` to match. */
    actionIcon?: IconName;
    /** Accessible name of the action. */
    actionLabel?: string;
    /** Called when the action is pressed. */
    onAction?: () => void;
    /**
     * The settings Icon Button's shape. Inside a NavigationRail the rail's
     * `shape` sets it and this prop is ignored.
     */
    shape?: NavigationRailShape;
    /** Avatar initials (type=avatar). */
    avatarInitials?: string;
    /** Avatar photo (type=avatar). */
    avatarSrc?: string;
    className?: string;
}
/**
 * The top of a Navigation Rail: an avatar or logo mark, and in the wide form
 * a title and a settings action.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Navigation Header)
 */
export declare const NavigationHeader: React.ForwardRefExoticComponent<NavigationHeaderProps & React.RefAttributes<HTMLDivElement>>;
