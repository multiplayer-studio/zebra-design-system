import{ZetaNavigationDrawerProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../scrim/scrim.js";import"../button/button.js";export*from"./navigation-drawer-footer/navigation-drawer-footer.js";export*from"./navigation-drawer-header/navigation-drawer-header.js";export*from"./navigation-drawer-item/navigation-drawer-item.js";export*from"./navigation-drawer-sub-item/navigation-drawer-sub-item.js";declare const ZetaNavigationDrawer_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<{returnValue:string;open:boolean;hide:(returnValue?:string)=>Promise<void>;show:()=>Promise<void>;showModal:()=>Promise<void>;onBarrierClicked:(e:Event)=>void;closeOnBarrierClicked:boolean;}&LitElement>&typeof LitElement;
/**
 * The app's destinations in a tall panel at the edge of the screen, opened from a menu button.
 *
 * Built from the Navigation Rail family: a `zeta-navigation-header` in the `header` slot, then `zeta-sub-menu-item`
 * rows, `zeta-collapsible-menu-item` groups and `zeta-divider` in the menu and footer. The drawer hands them its
 * `rounded` and the header its wide form. It follows the page's theme.
 *
 * Modal (default): a dialog at the screen's edge over a `zeta-scrim` (tone scrim), opened with `show()` or
 * `showModal()`. Escape, a scrim click, the header's close button or a chosen destination closes it. With
 * `modal="false"` it is a standard drawer in the layout, opened with `show()`; closed, it narrows to nothing.
 *
 * Only the header is frozen (sticky). The menu never scrolls on its own and the footer follows it.
 *
 * The legacy `zeta-navigation-drawer-header`, `-item`, `-sub-item` and `-footer` still slot in, but are deprecated:
 * use the Navigation Rail family's parts.
 *
 * @slot - The menu: `zeta-sub-menu-item`, `zeta-collapsible-menu-item`, `zeta-divider`.
 * @slot header - A `zeta-navigation-header`. Sticky.
 * @slot footer - More rows after the menu (settings, help). Not pinned.
 *
 * @part dialog - The drawer surface.
 *
 * @event open - The drawer opened.
 * @event close - The drawer closed. `returnValue` is "close", "navigate" or "cancel".
 * @event cancel - Escape or a scrim click dismissed it.
 * @event action - The header action button was pressed.
 *
 * @cssproperty --navigation-drawer-width - The drawer's width; 320px by default (no width token exists).
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8255-1584
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */export declare class ZetaNavigationDrawer extends ZetaNavigationDrawer_base{
/** The side of the screen that the drawer is anchored on (spec `side`: left = start, right = end). */
anchor:"left"|"right";
/** Toggles the animation for the navigation drawer. */
showAnimation:boolean;
/** Whether the drawer is initially open. */
initialOpen:boolean;
/** Slides over the page on a scrim. `false` is a standard drawer that sits in the layout and pushes the content. */
modal:boolean;
/** Escape and a scrim click close a modal drawer. */
dismissible:boolean;
/** Choosing a destination closes a modal drawer. Opening a group never does. */
closeOnNavigate:boolean;
/** The header's icon button becomes the close button. */
showClose:boolean;
/** Accessible name of the close button. */
closeLabel:string;
/** Accessible name of the navigation landmark and of the modal drawer. */
navLabel:string;
/** A full-width primary button under the header. Unset, there is none. */
actionLabel?:string;
/** The action's icon (Zeta icon name). */
actionIcon:string;private hasHeader;static shadowRootOptions:{delegatesFocus:boolean;clonable?:boolean;customElementRegistry?:CustomElementRegistry;mode:ShadowRootMode;serializable?:boolean;slotAssignment?:SlotAssignmentMode;};
/**
 * Popup's opener, made to follow `modal`: `show()` and `showModal()` both open a modal drawer in the top layer over
 * its scrim, and a standard drawer in place.
 */
_show(_isModal:boolean):Promise<void>;protected willUpdate():void;protected firstUpdated():void;protected updated():void;
/** Shape onto every rail part inside; the header gets the wide form and, with show-close, becomes the close. */private syncParts;private onHeaderSlot;private onHeaderAction;private onActionClick;private onCloseEvent;private onCancelEvent;private onClick;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-drawer":ZetaNavigationDrawer;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The app's destinations in a tall panel at the edge of the screen, opened from a menu button.
 *
 * Built from the Navigation Rail family: a `zeta-navigation-header` in the `header` slot, then `zeta-sub-menu-item`
 * rows, `zeta-collapsible-menu-item` groups and `zeta-divider` in the menu and footer. The drawer hands them its
 * `rounded` and the header its wide form. It follows the page's theme.
 *
 * Modal (default): a dialog at the screen's edge over a `zeta-scrim` (tone scrim), opened with `show()` or
 * `showModal()`. Escape, a scrim click, the header's close button or a chosen destination closes it. With
 * `modal="false"` it is a standard drawer in the layout, opened with `show()`; closed, it narrows to nothing.
 *
 * Only the header is frozen (sticky). The menu never scrolls on its own and the footer follows it.
 *
 * The legacy `zeta-navigation-drawer-header`, `-item`, `-sub-item` and `-footer` still slot in, but are deprecated:
 * use the Navigation Rail family's parts.
 * ---
 *
 *
 * ### **Events:**
 *  - **open** - The drawer opened.
 * - **close** - The drawer closed. `returnValue` is "close", "navigate" or "cancel".
 * - **cancel** - Escape or a scrim click dismissed it.
 * - **action** - The header action button was pressed.
 *
 * ### **Methods:**
 *  - **_show(_isModal: _boolean_)** - Popup's opener, made to follow `modal`: `show()` and `showModal()` both open a modal drawer in the top layer over
 * its scrim, and a standard drawer in place.
 *
 * ### **Slots:**
 *  - _default_ - The menu: `zeta-sub-menu-item`, `zeta-collapsible-menu-item`, `zeta-divider`.
 * - **header** - A `zeta-navigation-header`. Sticky.
 * - **footer** - More rows after the menu (settings, help). Not pinned.
 *
 * ### **CSS Properties:**
 *  - **--navigation-drawer-width** - The drawer's width; 320px by default (no width token exists). _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **dialog** - The drawer surface.
 */"zeta-navigation-drawer":Partial<ZetaNavigationDrawerProps&BaseProps&BaseEvents>}}}