import{ZetaSelectInputProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues,type TemplateResult}from"lit";import{type ZetaInputType}from"../../mixins/form-field.js";import"./option.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";import"../icon/icon.js";declare const ZetaSelectInput_base:import("../../mixins/utils.js").AbstractConstructor<{type:ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * TODO:
 * Multi-select
 * Typing
 * Arrow keys to navigate options
 */
/** A text input field for selecting from a list of options.
 *
 * Currently no typing or multi-select support.
 *
 * Label, field and hint stack space/xs apart. The field reads the same tokens as Input: `flavor`, `shape` and `size`
 * pick its border, corners and height; `open`, `error`, `readOnly` and `disabled` its state. The options open 4px
 * below the field, as wide as it, on surface/overlay.
 *
 * @event {Event} change - Fired when the value of the select input changes.
 * @event {FocusEvent} focus - Fired when the select input receives focus.
 * @event {FocusEvent} blur - Fired when the select input loses focus.
 *
 * @part input-text - The text of the selected option or placeholder.
 * @cssproperty --select-input-min-width - The field's minimum width. Defaults to Input Field's minimum width.
 * @cssproperty --select-input-options-min-width - The options panel's minimum width; it is otherwise as wide as the field.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6602-712
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-select-input--docs
 */export declare class ZetaSelectInput extends ZetaSelectInput_base{
/** @internal */static shadowRootOptions:ShadowRootInit;static styles:import("lit").CSSResultGroup[];
/** The type used in FormField mixin */type:Extract<ZetaInputType,"select">;
/** Whether field is in error state. */
error:boolean;
/** Whether an option is selected. */
isSelected:boolean;
/** Whether the dialog is open. */
open:boolean;
/** Leading icon name. */
icon?:ZetaIconName;
/** Label shown above the field. */
label:string;
/** Hint text shown below text field.
 *  if `error`, then `errorText` is shown instead. */
hintText:string;
/** Error hint text
 *  Shown if `error`, replaces `hintText`. */
errorText:string;
/** Height of options dropdown
 *  Default is 200px */
optionsDialogHeight:number;
/** default: a bordered field for forms. gradient: a highlight such as an AI field. ghost: no border at rest. */
flavor:"default"|"gradient"|"ghost";
/** The field's corners. Overrides rounded: sharp, rounded, or full (a pill). */
shape?:"sharp"|"rounded"|"full";
/** Appends "(optional)" after the label. */
optional:boolean;
/** Opens the options on the compact menu (Dropdown Menu's compact): a tighter inset for a cramped spot. */
compact:boolean;
/** Adds an information icon after the label. */
showInformation:boolean;
/** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
subLabel:string;
/** Keeps the icon ahead of the hint message. */
showHintIcon:boolean;
/** Whether to use fixed positioning for the options dropdown, so it escapes overflow:hidden ancestors. */
fixedDropdown:boolean;optionsNodeList:NodeListOf<HTMLOptionElement>;private _selectedOption;slotElement:HTMLSlotElement;select:HTMLSelectElement;handleChange:(event:Event)=>void;protected firstUpdated(_changedProperties:PropertyValues):void;protected updated(changedProperties:PropertyValues):void;setValue(v:string):void;updateSelectedOption:()=>HTMLOptionElement|undefined;updateOptionsWidth:()=>void;handleSlotChange:(e:Event)=>void;renderLabel():TemplateResult|void;private renderLabelRow;renderInputContent():TemplateResult;renderHint():TemplateResult|void;toggleOpen:()=>void;key(e:KeyboardEvent,type:"down"|"up"):void;private handleOutsideClick;connectedCallback():void;disconnectedCallback():void;protected render():TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-select-input":ZetaSelectInput;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A text input field for selecting from a list of options.
 *
 * Currently no typing or multi-select support.
 *
 * Label, field and hint stack space/xs apart. The field reads the same tokens as Input: `flavor`, `shape` and `size`
 * pick its border, corners and height; `open`, `error`, `readOnly` and `disabled` its state. The options open 4px
 * below the field, as wide as it, on surface/overlay.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when the value of the select input changes.
 * - **focus** - Fired when the select input receives focus.
 * - **blur** - Fired when the select input loses focus.
 *
 * ### **Methods:**
 *  - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 *
 * ### **CSS Properties:**
 *  - **--select-input-min-width** - The field's minimum width. Defaults to Input Field's minimum width. _(default: undefined)_
 * - **--select-input-options-min-width** - The options panel's minimum width; it is otherwise as wide as the field. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **input-text** - The text of the selected option or placeholder.
 */"zeta-select-input":Partial<Omit<React.InputHTMLAttributes<ZetaSelectInputProps>,keyof ZetaSelectInputProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaSelectInputProps&BaseProps&BaseEvents>}}}