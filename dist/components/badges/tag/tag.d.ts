import{ZetaTagProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";declare const ZetaTag_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Tags are used to draw attention to a specific area or information. The arrow shape helps direct the users attention to the desired place.
 *
 * @slot - The text to display in the tag.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-13170
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */export declare class ZetaTag extends ZetaTag_base{
/** Text displayed in the tag.
 *
 * Currently, it is best to use this property instead of the slot, as the slot does not provide an aria label.
 */
label?:string;
/** Direction of the tag point.  */
direction:"right"|"left";textSpan:HTMLElement;static styles:import("lit").CSSResultGroup[];protected render():import("lit-html").TemplateResult<1>;protected updated():void;}declare global{interface HTMLElementTagNameMap{"zeta-tag":ZetaTag;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Tags are used to draw attention to a specific area or information. The arrow shape helps direct the users attention to the desired place.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The text to display in the tag.
 */"zeta-tag":Partial<ZetaTagProps&BaseProps&BaseEvents>}}}