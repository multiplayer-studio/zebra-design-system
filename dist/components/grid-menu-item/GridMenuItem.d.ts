import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { type IconName } from "../icon/Icon.js";
import "./grid-menu-item.css";
export interface GridMenuItemProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className" | "children"> {
    /** Names the option beneath its icon. A long label wraps and makes every tile in the row taller. */
    label?: string;
    /** Glyph above the label. Figma fixes it to `star` (spec issue). */
    icon?: IconName;
    /** Marks the option a person is on now. Sets `aria-current`. */
    active?: boolean;
    /** Puts the option out of reach and takes it out of the tab order. */
    disabled?: boolean;
    /** Softens the tile's corners. */
    rounded?: boolean;
    /** Adds a dot over the icon. It carries no number. */
    showBadge?: boolean;
    className?: string;
}
/**
 * One tile of the grid arrangement inside a bottom sheet: an icon above a
 * short label. Hover and press come from the pointer. Figma draws `active`
 * and `disabled` at the default state only, so neither takes pointer feedback.
 *
 * Kept in step with packages/web-components `<zds-grid-menu-item>`.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.md
 */
export declare const GridMenuItem: React.ForwardRefExoticComponent<GridMenuItemProps & React.RefAttributes<HTMLElement>>;
