import { LitElement } from "lit";
import "../divider/divider.js";
import "../dropdown/dropdown.js";
import "../icon-button/icon-button.js";
import "../search/search.js";
import "../user-profile/user-profile.js";
export type GlobalHeaderMode = "dark" | "light";
/**
 * The bar across the top of an application: identity at the leading edge,
 * navigation and search in the middle, the person's account at the trailing
 * edge. Most of it is optional, and `rounded` carries into every control.
 *
 * Departures from Figma, each a spec issue:
 * - `username`, `avatar-src`, `initials` and the labels are inputs, because
 *   Figma fixes them or leaves them unnamed.
 * - `show-logo` hides the logo region. Figma declares it but binds it to
 *   nothing.
 * - Search keeps a fixed width. Figma's metadata calls it both fixed and a
 *   maximum, and the instance sets it as a minimum.
 * - The bar fills its container (Figma ships a fixed width).
 * - The account menu aligns to the control's right edge, not left, because
 *   the control sits at the end of the bar and the panel has no collision
 *   handling.
 *
 * @slot logo - The product's mark. Defaults to the Zebra logo.
 * @slot menu-items - Navigation controls. Shown when `menu-items` is on.
 * @slot actions - Icon actions after search. Shown when `action-menu` is on.
 * @slot account-menu - `zds-menu-item` rows for the account menu.
 * @fires zds-menu-click - The menu button was activated.
 * @fires zds-app-switcher-click - The app switcher was activated.
 * @csspart bar - The bar.
 * @csspart search - The `zds-search`.
 * @slot avatar - A zds-avatar for the account, with any avatar property
 *   (type, icon, swatch-color, status…); its size stays xxsmall.
 * @csspart account - The `zds-user-profile`.
 *
 * Frozen in dark (spec: modeLock): the host carries `.mode-dark` whatever mode
 * the page is in. `mode="light"` is the only override.
 *
 * @spec specs/global-header/global-header.spec.json
 */
export declare class ZdsGlobalHeader extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** Frozen in dark whatever the page mode. Set `light` to override it on this header. */
    mode: GlobalHeaderMode;
    /** Rounds every control inside the bar. The bar's own corners round only when it floats (`anchored` false). */
    rounded: boolean;
    /**
     * Locked to the top of the page, with square corners on the bar. Set it to
     * false for a rounded header that floats with space around it; it has no
     * effect on a sharp header.
     */
    anchored: boolean;
    /** Keeps the account control. */
    showProfile: boolean;
    /** Keeps the grid button that moves a person between products. */
    appSwitcher: boolean;
    /** Keeps search in the middle band. */
    searchBar: boolean;
    /** Opens the navigation region before search. */
    menuItems: boolean;
    /** Opens the action region after search. */
    actionMenu: boolean;
    /** Draws a hairline before the middle band and another after it. */
    dividers: boolean;
    /** The product's name. It does not change as a person navigates. */
    platformName: string;
    /** Keeps the product name beside the mark. */
    showPlatformName: boolean;
    /** Keeps the logo region. */
    showLogo: boolean;
    /** The person's name on the account control. */
    username: string;
    /** Avatar photo on the account control. */
    avatarSrc: string | null;
    /** Avatar initials, used when there is no photo. */
    initials: string | null;
    /** Accessible name of the menu button. */
    menuLabel: string;
    /** Accessible name of the app switcher. */
    appSwitcherLabel: string;
    /** Accessible name of the navigation landmark. */
    navigationLabel: string;
    private accountOpen;
    protected willUpdate(): void;
    protected updated(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-global-header": ZdsGlobalHeader;
    }
}
//# sourceMappingURL=global-header.d.ts.map