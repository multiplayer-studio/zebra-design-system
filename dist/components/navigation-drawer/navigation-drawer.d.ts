import{ZetaNavigationDrawerProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";export*from"./navigation-drawer-footer/navigation-drawer-footer.js";export*from"./navigation-drawer-header/navigation-drawer-header.js";export*from"./navigation-drawer-item/navigation-drawer-item.js";export*from"./navigation-drawer-sub-item/navigation-drawer-sub-item.js";declare const ZetaNavigationDrawer_base:import("../../mixins/utils.js").Constructor<{returnValue:string;open:boolean;hide:(returnValue?:string)=>Promise<void>;show:()=>Promise<void>;showModal:()=>Promise<void>;onBarrierClicked:(e:Event)=>void;closeOnBarrierClicked:boolean;}&LitElement>&typeof LitElement;
/**
 * Navigation drawers provide access to destinations and app functionality, such as switching accounts.
 * They can either be permanently on-screen or controlled by a navigation menu icon
 *
 *
 * @slot - The main content of the drawer.
 * @slot header - The drawer header.
 * @slot footer - The drawer footer.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */export declare class ZetaNavigationDrawer extends ZetaNavigationDrawer_base{
/** The side of the screen that the drawer is anchored on. */
anchor:"left"|"right";
/** Toggles the animation for the navigation drawer. */
showAnimation:boolean;
/**  Whether the modal is initially open. */
initialOpen:boolean;static shadowRootOptions:{delegatesFocus:boolean;clonable?:boolean;customElementRegistry?:CustomElementRegistry;mode:ShadowRootMode;serializable?:boolean;slotAssignment?:SlotAssignmentMode;};protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-drawer":ZetaNavigationDrawer;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Navigation drawers provide access to destinations and app functionality, such as switching accounts.
 * They can either be permanently on-screen or controlled by a navigation menu icon
 * ---
 *
 *
 * ### **Events:**
 *  - **close**
 * - **cancel**
 *
 * ### **Slots:**
 *  - _default_ - The main content of the drawer.
 * - **header** - The drawer header.
 * - **footer** - The drawer footer.
 */"zeta-navigation-drawer":Partial<ZetaNavigationDrawerProps&BaseProps&BaseEvents>}}}