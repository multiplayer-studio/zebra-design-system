import{ZetaNavigationDrawerHeaderProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";
/**
 * The header used on a navigation drawer.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline.
 * @slot trailing - Content placed after the headline.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */export declare class ZetaNavigationDrawerHeader extends LitElement{
/** The headline text. Can also be slotted. */
headline?:string;
/** The sub headline text.*/
subHeadline?:string;
/** Shows a divider below the header. */
divide:boolean;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-drawer-header":ZetaNavigationDrawerHeader;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The header used on a navigation drawer.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The headline text.
 * - **leading** - Content placed before the headline.
 * - **trailing** - Content placed after the headline.
 */"zeta-navigation-drawer-header":Partial<ZetaNavigationDrawerHeaderProps&BaseProps&BaseEvents>}}}