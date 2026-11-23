import{ZetaGlobalHeaderProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";import"../button/icon-button/icon-button.js";import"../search/search.js";import"../avatar/avatar.js";import"../divider/divider.js";import"../dropdown/dropdown-menu/dropdown-menu-button.js";import"../../index.css";declare const ZetaGlobalHeader_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * TODO:
 * UX(1516) - Work with designers to make the component more dynamically responsive on a wider range of screen sizes.
 */
/**
 * The bar across the top of an application, carrying the product's identity at the leading edge, navigation and search
 * in the middle, and the person's account at the trailing edge. `rounded` carries into every control the header draws.
 * Header will only allow a maximum of 6 menu items and 6 action items. Any additional items will be hidden.
 * If you have a maximum amount (6) of menu and action items, the search bar will be hidden at a screen size of 1440px or smaller.
 *
 * @property {String} name - The name to show in the header, next to the user icon.
 * @property {String} initials - The initials to display within the user icon.
 * @property {Boolean} anchored - Locked to the top of the page with a square bar. Make false for a rounded header that floats.
 * @property {Boolean} showProfile - Shows the account control. Make false to hide it.
 * @property {Boolean} appSwitcher - Shows the app switcher icon. Make true to show the app switcher icon.
 * @property {Boolean} searchbar - Shows the search bar. Make true to show the search bar.
 *
 * @event user-info-click - Fired when the user info button is clicked.
 * @event hamburger-menu-click - Fired when the hamburger menu button is clicked.
 * @event app-switcher-click - Fired when the app switcher button is clicked.
 *
 * @slot platform-name - Slot for the platform name in the header. Falls back to the platformName property if not provided.
 * @slot menu-items - Slot for menu items on the left side of the header. Expects elements of type zeta-button or zeta-dropdown-menu-button.
 * @slot action-items - Slot for action items on the right side of the header. Expects elements of type zeta-icon-button or zeta-action-menu-button.
 * @slot user-avatar - The account avatar: a zeta-avatar with any of its properties (photo, initials, an icon, swatch-color,
 *   status…). Its size is set to xxs for you.
 * @slot logo - Slot for a custom logo to replace the default Zebra logo.
 *
 * @part logo - The container for the logo in the header. By default, this will contain the Zebra logo, but if you use the "logo" slot, your custom logo will be placed here instead.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2356-5644
 * @storybook ?path=/docs/components-global-header--docs
 *
 * @example <zeta-global-header
 *  platformName="Platform Name"
 *  name="Name"
 *  initials="RK"
 *  appSwitcher
 *  searchbar
 *  rounded
 * >
 * <zeta-button slot="menu-items"></zeta-button>
 * <zeta-icon-button slot="action-items"></zeta-icon-button>
 * <zeta-avatar slot="user-avatar" size="xxs">${this.initials}</zeta-avatar>
 * </zeta-icon-button></zeta-global-header>
 */export declare class ZetaGlobalHeader extends ZetaGlobalHeader_base{
/** Frozen in dark whatever the page mode. Set `data-theme="light"` to override it on this header. */
theme:"dark"|"light";
/** The product's name. It does not change as a person navigates. */
platformName?:string;
/** Locked to the top of the page, with square corners on the bar. Set it to false for a rounded header that floats with space around it; it has no effect on a sharp header. */
anchored:boolean;
/** Keeps the account control. */
showProfile:boolean;
/** Keeps the product name beside the mark. */
showPlatformName:boolean;
/** Keeps the logo region. Figma declares this without binding it (spec issue). */
showLogo:boolean;
/** Draws a hairline before the menu items and another after the action items. */
dividers:boolean;
/** The name to show in the header, next to the user icon. */
name:string;
/** The initials to display within the user icon. */
initials:string;
/**
 * Shows the app switcher icon.
 * Make true to show the app switcher icon.
 */
appSwitcher:boolean;
/**
 * Shows the search bar.
 * Make true to show the search bar.
 */
searchbar:boolean;
/** Accessible name of the menu button (spec issue: Figma has none). */
menuLabel:string;
/** Accessible name of the app switcher (spec issue: Figma has none). */
appSwitcherLabel:string;
/** Accessible name of the navigation region. */
navigationLabel:string;
/**
 * Slot for menu items on the left side of the header.
 * Expects elements of type zeta-button or zeta-dropdown-menu-button.
 */
menuItems:Array<Node>;
/**
 * Slot for action items on the right side of the header.
 * Expects elements of type zeta-icon-button or zeta-action-menu-button.
 */
actionItems:Array<Node>;
/**
 * Tracks whether there are any menu items present. Used for styling purposes.
 */private hasMenuItems;
/**
 * Tracks whether there are any action items present. Used for styling purposes.
 */private hasActionItems;
/**
 * Updates which regions have content. Called whenever the menu or action slot changes.
 */private _handleSlotChange;
/**
 * Limits the number of visible items in the menu-items and action-items slots to 6 each.
 * Any items beyond the sixth will have their display style set to 'none'.
 * This method is called during the updated lifecycle to ensure it runs after any slot content changes.
 */private limitSlotItems;
/**
 * Applies or removes the 'six-menu-action-items' class to the header-right container
 * based on whether there are exactly 6 menu items and 6 action items.
 * Used to start hiding components in CSS when the header gets smaller.
 */private checkMaxSlotItems;
/**
 * Handles the click event on the user info button.
 */private _handleUserInfoClick;
/**
 * Handles the click event on the hamburger menu button.
 */private _handleHamburgerMenuClick;
/**
 * Handles the click event on the app switcher button.
 */private _handleAppSwitcherClick;
/**
 * Applies the item limits after the component has been updated, so that slot changes are picked up.
 */protected updated():void;
/** The slotted avatar keeps every property it is given except its size, which the account button fixes at xxs. */private _sizeAvatar;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-global-header":ZetaGlobalHeader;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The bar across the top of an application, carrying the product's identity at the leading edge, navigation and search
 * in the middle, and the person's account at the trailing edge. `rounded` carries into every control the header draws.
 * Header will only allow a maximum of 6 menu items and 6 action items. Any additional items will be hidden.
 * If you have a maximum amount (6) of menu and action items, the search bar will be hidden at a screen size of 1440px or smaller.
 * ---
 *
 *
 * ### **Events:**
 *  - **user-info-click** - Fired when the user info button is clicked.
 * - **hamburger-menu-click** - Fired when the hamburger menu button is clicked.
 * - **app-switcher-click** - Fired when the app switcher button is clicked.
 *
 * ### **Slots:**
 *  - **platform-name** - Slot for the platform name in the header. Falls back to the platformName property if not provided.
 * - **menu-items** - Slot for menu items on the left side of the header. Expects elements of type zeta-button or zeta-dropdown-menu-button.
 * - **action-items** - Slot for action items on the right side of the header. Expects elements of type zeta-icon-button or zeta-action-menu-button.
 * - **user-avatar** - The account avatar: a zeta-avatar with any of its properties (photo, initials, an icon, swatch-color, status…). Its size is set to xxs for you.
 * - **logo** - Slot for a custom logo to replace the default Zebra logo.
 *
 * ### **CSS Parts:**
 *  - **logo** - The container for the logo in the header. By default, this will contain the Zebra logo, but if you use the "logo" slot, your custom logo will be placed here instead.
 */"zeta-global-header":Partial<ZetaGlobalHeaderProps&BaseProps&BaseEvents>}}}