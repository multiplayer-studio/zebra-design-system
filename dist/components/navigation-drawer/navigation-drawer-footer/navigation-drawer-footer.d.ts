import{ZetaNavigationDrawerFooterProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";
/**
 * The footer used on a navigation drawer.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline. Not shown if 'variant' is set to 'logo'.
 * @slot trailing - Content placed after the headline. Not shown if 'variant' is set to 'logo'.
 * @slot logo - The element that replaces the default Zebra logo. Not shown if 'variant' is set to 'profile'.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */export declare class ZetaNavigationDrawerFooter extends LitElement{
/** The headline text. Can also be slotted. */
headline?:string;
/** The sub headline text. */
subHeadline?:string;
/** Shows a divider above the footer. */
divide:boolean;
/**
 * The variant of the footer.
 *
 * If set to 'logo' the zebra logo or the contents of the 'logo' slot will be shown and the headline text will be displayed beneath the logo.
 */
variant:"profile"|"logo";hideDefaultLogo?:boolean;customLogo:NodeList;private getProfileFooter;private handleSlotChange;private getLogoFooter;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-drawer-footer":ZetaNavigationDrawerFooter;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The footer used on a navigation drawer.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The headline text.
 * - **leading** - Content placed before the headline. Not shown if 'variant' is set to 'logo'.
 * - **trailing** - Content placed after the headline. Not shown if 'variant' is set to 'logo'.
 * - **logo** - The element that replaces the default Zebra logo. Not shown if 'variant' is set to 'profile'.
 */"zeta-navigation-drawer-footer":Partial<ZetaNavigationDrawerFooterProps&BaseProps&BaseEvents>}}}