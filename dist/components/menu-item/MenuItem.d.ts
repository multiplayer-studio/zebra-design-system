import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { type IconName } from "../icon/Icon.js";
import "../checkbox/checkbox.css";
import "../radio/radio.css";
import "./menu-item.css";
export type MenuItemType = "icon" | "checkbox" | "radio" | "custom";
/**
 * The nearest enclosing `DropdownMenu`'s own `rounded`, so a `MenuItem`
 * defaults to matching its panel without every row having to say so. Not
 * exported — it's plumbing between `DropdownMenu` and `MenuItem`, not a
 * public theming context (see the skill's "no React context" rule, which is
 * about theming; this carries a structural default, not a theme).
 *
 * @spec specs/dropdown/dropdown.spec.md — "Rounded propagation"
 */
export declare const MenuItemRoundedContext: React.Context<boolean>;
export interface MenuItemProps extends Omit<React.ComponentPropsWithoutRef<typeof Menu.Item>, "className"> {
    /**
     * What leads the row. `icon` takes `leadingIcon`; `checkbox` and `radio`
     * lead with the real Checkbox / Radio at size medium, checked when the row
     * is `selected` and disabled with it; `custom` takes `leadingSlot`.
     */
    type?: MenuItemType;
    /** Glyph in the leading position for `type="icon"`. Undefined hides it (spec: `leadingElement`). */
    leadingIcon?: IconName;
    /** Glyph at the trailing edge — a submenu arrow or external-link mark. Undefined hides it (spec: `trailingIcon`). */
    trailingIcon?: IconName;
    /**
     * `type="custom"` only: replaces the leading Icon with an arbitrary node
     * (an avatar, a colour swatch) the icon font can't supply. Ships empty per
     * spec; ignored for every other `type`.
     */
    leadingSlot?: React.ReactNode;
    /**
     * Softens the row's corners. Defaults to the nearest enclosing
     * `DropdownMenu`'s own `rounded` when nested inside one — matching the
     * panel is enforced, not just a convention to remember. Pass this
     * explicitly to override, e.g. for a standalone row outside a DropdownMenu.
     */
    rounded?: boolean;
    /**
     * Marks the row as the currently-chosen option, painted as the spec's 10%
     * brand tint. For `checkbox` and `radio` it also checks the control and
     * sets `aria-checked`.
     */
    selected?: boolean;
    /** Uncontrolled starting value of `selected`. */
    defaultSelected?: boolean;
    /**
     * The whole row is the control's click target: a `checkbox` row toggles
     * and a `radio` row selects itself. Called with the new value; with a
     * controlled `selected`, update it from here. Radio rows clear each other
     * through their own `selected` props, as a group does.
     */
    onSelectedChange?: (selected: boolean) => void;
    className?: string;
}
export declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLElement>>;
