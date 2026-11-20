import{ZetaNavigationDrawerItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";declare const ZetaNavigationDrawerItem_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../../mixins/utils.js").Constructor<import("../../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * A navigation item to be used in a zeta-navigation-drawer
 *
 * @slot - The headline text.
 * @slot badge - Content to be placed in the badge.
 * @slot leading - Content to be placed before the headline.
 * @slot trailing - Content to be placed after the headline.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */export declare class ZetaNavigationDrawerItem extends ZetaNavigationDrawerItem_base{
/** The headline text. Can also be slotted. */
headline?:string;
/** Sets the item to active. */
active:boolean;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-drawer-item":ZetaNavigationDrawerItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A navigation item to be used in a zeta-navigation-drawer
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The headline text.
 * - **badge** - Content to be placed in the badge.
 * - **leading** - Content to be placed before the headline.
 * - **trailing** - Content to be placed after the headline.
 */"zeta-navigation-drawer-item":Partial<ZetaNavigationDrawerItemProps&BaseProps&BaseEvents>}}}