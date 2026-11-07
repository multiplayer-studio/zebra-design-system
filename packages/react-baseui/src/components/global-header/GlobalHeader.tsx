import * as React from "react";
import { Button } from "../button/Button.js";
import { Divider } from "../divider/Divider.js";
import { Dropdown } from "../dropdown/Dropdown.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Search } from "../search/Search.js";
import { UserProfile, type UserProfileProps } from "../user-profile/UserProfile.js";
import "./global-header.css";

export type GlobalHeaderMode = "dark" | "light";

export interface GlobalHeaderProps extends Omit<React.ComponentPropsWithoutRef<"header">, "className" | "children"> {
  /** Rounds the bar and every control inside it. */
  rounded?: boolean;
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

const SHAPED: readonly unknown[] = [Button, IconButton];

/** Pass the header's shape to Buttons and IconButtons (top level or inside a fragment). */
function shapeControls(node: React.ReactNode, shape: "rounded" | "sharp"): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (!React.isValidElement<{ shape?: string; children?: React.ReactNode }>(child)) return child;
    if (child.type === React.Fragment) return <>{shapeControls(child.props.children, shape)}</>;
    return SHAPED.includes(child.type) ? React.cloneElement(child, { shape }) : child;
  });
}

const ZebraLogo = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 40" width="80" height="32"><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 792h1224V0H0Z" /></clipPath></defs><path d="M25.94 20.55 23.2 17.8v7.79h2.75Z" /><g clipPath="url(#a)" transform="matrix(.2222 0 0 -.2222 -75.5 107.79)"><path d="M407.08 429.98h30.17l-12.34 12.33-.05.06H409a20.4 20.4 0 0 1-1.92 40.7v-40.75l-33.9 33.79a61 61 0 0 1-10.56-6.97l32.08-31.95v-70.17l24.77-24.77v17.51l-12.39 12.39Z" /><path d="m419.47 429.9-.06-59.82h12.38l.06 47.38zm42.5-24.84-12.39 12.38h-17.73l12.37-12.38Zm-79.66-26.39v53.29l-28.45 28.45a62 62 0 0 1-6.98-10.55l23.04-23.04V409.3l-27.95 27.97a62 62 0 0 1-2.1-15.42s41.05-41.74 42.44-43.18m-42.23 25.46v-17.51l79.4-79.39v17.51zm141.32-18.48h-12.39v-15.66h-12.38a20.4 20.4 0 1 1 40.8 0zm100.88-15.92-9.3-17.67h-57.87l37.63 72.3h-33.32l9.3 17.67h57.88l-37.64-72.3Zm33.61 36.28h29.68v-17.67h-29.68v-18.61h29.68v-17.67h-51.53v89.97h51.53v-17.67h-29.68Zm62.24-38.31h7.96c9.17 0 13.09 3.1 13.09 10.4 0 4.3-1.62 7.41-4.86 9.17-2.43 1.34-4.59 1.61-11.2 1.61h-4.99Zm0 37.1h5.4c9.98 0 14.16 3.1 14.16 10.52 0 7.29-4.18 10.39-14.43 10.39h-5.13Zm8.9 37.23c11.47 0 18.08-1.22 22.94-4.32 6.2-3.77 9.98-11.46 9.98-20.1 0-6.33-2.03-11.6-6.07-15.64-2.57-2.7-4.59-3.92-9.44-5.26 5.53-1.22 7.95-2.43 10.79-5.13 4.04-3.77 6.07-9.04 6.07-15.65 0-8.36-3.38-15.78-9.18-19.69-4.45-2.97-9.84-4.18-19.01-4.18h-36.83v89.97zm71.62-42.89c8.9 0 14.3 4.58 14.3 12.4 0 7.42-5.27 12.55-12.95 12.55h-8.37v-24.95Zm-7.02-47.08h-21.85v89.97h29.14c11.87 0 20.5-2.16 26.43-6.74 6.2-4.86 9.72-12.95 9.72-22.8 0-13.76-5.8-22.8-17.4-27.38l19.82-33.05h-26.16l-19.7 34.8zm80.01 35.39 9.04 28.8 9.02-28.8Zm29.15-35.4h23.71l-29.54 89.98h-27.79l-29.67-89.97h23.04l5.55 17.7h29.16z" /></g></svg>
);

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
export const GlobalHeader = React.forwardRef<HTMLElement, GlobalHeaderProps>(function GlobalHeader(
  {
    mode = "dark", rounded = false, appSwitcher = true, searchBar = true, menuItems = false, menuItemsSlot, actionMenu = false, actionMenuSlot, dividers = false,
    platformName = "Platform Name", showPlatformName = true, showLogo = true, logoSlot, username = "Username", avatarSrc, initials, avatarProps, accountMenu,
    searchValue, onSearchChange, onMenuClick, onAppSwitcherClick, menuLabel = "Menu", appSwitcherLabel = "Switch app", navigationLabel = "Main",
    portalContainer, className, ...rest
  },
  ref,
) {
  const shape = rounded ? "rounded" : "sharp";
  const [menuHost, setMenuHost] = React.useState<HTMLDivElement | null>(null);
  return (
    <header ref={ref} {...rest} className={["zds-global-header", `mode-${mode}`, className].filter(Boolean).join(" ")} data-rounded={rounded ? "" : undefined}>
      <div className="zds-global-header__leading">
        <IconButton flavour="subtle" size="medium" shape={shape} icon="hamburger-menu" label={menuLabel} onClick={onMenuClick} />
        {showLogo ? <span className="zds-global-header__logo">{logoSlot ?? <ZebraLogo />}</span> : null}
        {showPlatformName ? <span className="zds-global-header__platform-name">{platformName}</span> : null}
      </div>
      {dividers ? <Divider orientation="vertical" /> : null}
      <div className="zds-global-header__middle">
        {menuItems ? <nav className="zds-global-header__navigation" aria-label={navigationLabel}>{shapeControls(menuItemsSlot, shape)}</nav> : null}
        {searchBar ? <Search className="zds-global-header__search" block size="medium" shape={shape} value={searchValue} onValueChange={onSearchChange} /> : null}
        {actionMenu ? <div className="zds-global-header__actions">{shapeControls(actionMenuSlot, shape)}</div> : null}
      </div>
      {dividers ? <Divider orientation="vertical" /> : null}
      <div className="zds-global-header__account-group">
        <Dropdown rounded={rounded} align="right" portalContainer={portalContainer ?? menuHost} trigger={<UserProfile username={username} avatarSrc={avatarSrc} initials={initials} avatarProps={avatarProps} rounded={rounded} />}>
          {accountMenu}
        </Dropdown>
        {appSwitcher ? <IconButton flavour="subtle" size="medium" shape={shape} icon="apps" label={appSwitcherLabel} onClick={onAppSwitcherClick} /> : null}
      </div>
      <div ref={setMenuHost} className="zds-global-header__menu-host" />
    </header>
  );
});
