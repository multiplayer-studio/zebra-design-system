import * as React from "react";
import { Dropdown } from "../dropdown/Dropdown.js";
import { type UserProfileProps } from "../user-profile/UserProfile.js";
import "./global-header.css";
export type GlobalHeaderMode = "dark" | "light";
export interface GlobalHeaderProps extends Omit<React.ComponentPropsWithoutRef<"header">, "className" | "children"> {
    /** Rounds every control inside the bar. The bar's own corners round only when it floats (`anchored={false}`). */
    rounded?: boolean;
    /**
     * Locked to the top of the page, with square corners on the bar. Set it to
     * false for a rounded header that floats with space around it; it has no
     * effect on a sharp header.
     */
    anchored?: boolean;
    /** Keeps the account control. */
    showProfile?: boolean;
    /** Keeps the grid button that moves a person between products. */
    appSwitcher?: boolean;
    /** Keeps search in the middle band. */
    searchBar?: boolean;
    /** Opens the navigation region before search. */
    menuItems?: boolean;
    /** The navigation controls. Only drawn when `menuItems` is on. */
    menuItemsSlot?: React.ReactNode;
    /** Opens the action region after search. */
    actionMenu?: boolean;
    /** The trailing action controls. Only drawn when `actionMenu` is on. */
    actionMenuSlot?: React.ReactNode;
    /** Draws a hairline before the middle band and another after it. */
    dividers?: boolean;
    /** The product's name. It does not change as a person navigates. */
    platformName?: string;
    /** Keeps the product name beside the mark. */
    showPlatformName?: boolean;
    /** Keeps the logo region. */
    showLogo?: boolean;
    /** The product's mark. Defaults to the Zebra logo. */
    logoSlot?: React.ReactNode;
    /** The person's name on the account control. */
    username?: string;
    /** Avatar photo on the account control. */
    avatarSrc?: string;
    /** Avatar initials, used when there is no photo. */
    initials?: string;
    /** Any other property of the account Avatar (type, icon, swatchColor, status…); its size stays xxsmall. */
    avatarProps?: UserProfileProps["avatarProps"];
    /** `MenuItem` rows for the account menu. */
    accountMenu?: React.ReactNode;
    /** The search field's query (controlled). */
    searchValue?: string;
    /** Called on every search edit. */
    onSearchChange?: (value: string) => void;
    /** The menu button was activated. */
    onMenuClick?: () => void;
    /** The app switcher was activated. */
    onAppSwitcherClick?: () => void;
    /** Accessible name of the menu button. */
    menuLabel?: string;
    /** Accessible name of the app switcher. */
    appSwitcherLabel?: string;
    /** Accessible name of the navigation landmark. */
    navigationLabel?: string;
    /** Frozen in dark whatever the page mode. Set `light` to override it on this header. */
    mode?: GlobalHeaderMode;
    /** Where the account menu mounts. Defaults to the header, so the menu keeps the header's mode. */
    portalContainer?: React.ComponentProps<typeof Dropdown>["portalContainer"];
    className?: string;
}
/**
 * The bar across the top of an application: identity at the leading edge,
 * navigation and search in the middle, the person's account at the trailing
 * edge. Most of it is optional, and `rounded` carries into every control.
 *
 * Departures from Figma, each a spec issue:
 * - `username`, `avatarSrc`, `initials` and the labels are inputs, because
 *   Figma fixes them or leaves them unnamed.
 * - `showLogo` hides the logo region. Figma declares it but binds it to
 *   nothing.
 * - Search keeps a fixed width. Figma's metadata calls it both fixed and a
 *   maximum, and the instance sets it as a minimum.
 * - The bar fills its container (Figma ships a fixed width).
 * - The account menu aligns to the control's right edge, not left, because
 *   the control sits at the end of the bar.
 *
 * Frozen in dark (spec: modeLock): the root carries `.mode-dark` whatever mode
 * the page is in. `mode="light"` is the only override.
 *
 * Kept in step with packages/web-components `<zds-global-header>`.
 *
 * @spec specs/global-header/global-header.spec.md
 */
export declare const GlobalHeader: React.ForwardRefExoticComponent<GlobalHeaderProps & React.RefAttributes<HTMLElement>>;
