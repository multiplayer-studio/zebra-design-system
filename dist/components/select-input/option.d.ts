import{ZetaOptionProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";declare const ZetaOption_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&import("../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&typeof LitElement;
/** ZetaOption web component. A selected option shows a trailing check mark, as Select's selected row does in the spec.
 *
 * @slot - The default slot
 * @part option-text - The text of the option.
 * @part check - The trailing check mark on the selected option.
 * @cssproperty --option-max-lines - The maximum number of lines to display before truncating with an ellipsis. Default is 2.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-39&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-select-input--docs
 */export declare class ZetaOption extends ZetaOption_base{value:string;selected:boolean;disabled:boolean;type:"option";private _handleClick;private _handleKeyDown;connectedCallback():void;protected updated():void;disconnectedCallback():void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-option":ZetaOption;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * ZetaOption web component. A selected option shows a trailing check mark, as Select's selected row does in the spec.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The default slot
 *
 * ### **CSS Properties:**
 *  - **--option-max-lines** - The maximum number of lines to display before truncating with an ellipsis. Default is 2. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **option-text** - The text of the option.
 * - **check** - The trailing check mark on the selected option.
 */"zeta-option":Partial<ZetaOptionProps&BaseProps&BaseEvents>}}}