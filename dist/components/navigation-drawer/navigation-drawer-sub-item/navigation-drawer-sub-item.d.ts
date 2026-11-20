import{ZetaNavigationDrawerSubItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";declare const ZetaNavigationDrawerSubItem_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../../mixins/utils.js").Constructor<import("../../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * A navigation sub item to be used in a zeta-navigation-drawer
 *
 * @slot - The headline text.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */export declare class ZetaNavigationDrawerSubItem extends ZetaNavigationDrawerSubItem_base{
/** The headline text. Can also be slotted. */
headline?:string;
/** Sets the item to active. */
active:boolean;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-drawer-sub-item":ZetaNavigationDrawerSubItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A navigation sub item to be used in a zeta-navigation-drawer
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The headline text.
 */"zeta-navigation-drawer-sub-item":Partial<ZetaNavigationDrawerSubItemProps&BaseProps&BaseEvents>}}}