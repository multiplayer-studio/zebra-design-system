import{ZetaListProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";export*from"./list-item/list-item.js";
/**
 * Lists display lists of list items.
 *
 * @slot - The list items. Should be a collection of `zeta-list-item`s.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-17&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-list--docs
 */export declare class ZetaList extends LitElement{
/** Adds dividers in between the list items.*/
divide:boolean;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-list":ZetaList;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Lists display lists of list items.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The list items. Should be a collection of `zeta-list-item`s.
 */"zeta-list":Partial<ZetaListProps&BaseProps&BaseEvents>}}}