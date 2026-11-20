import{ZetaListItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";
/** An item in a list comprised of a single row, typically containing some text as well as leading or trailing widgets.
 *
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-17&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-list--docs
 */export declare class ZetaListItem extends LitElement{
/** The headline text of the list element. */
headline?:string;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-list-item":ZetaListItem;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * An item in a list comprised of a single row, typically containing some text as well as leading or trailing widgets.
 * ---
 *
 *
 * ### **Slots:**
 *  - **leading** - Content placed before the headline
 * - **trailing** - Content placed after the headline
 */"zeta-list-item":Partial<ZetaListItemProps&BaseProps&BaseEvents>}}}