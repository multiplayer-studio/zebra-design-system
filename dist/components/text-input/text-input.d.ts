import{ZetaTextInputProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import{type ZetaIconName}from"../../icons.js";import"../icon/icon.js";declare const ZetaTextInput_base:import("../../mixins/utils.js").AbstractConstructor<{type:import("../../mixins/form-field.js").ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/** A field for entering a value, stacked with its label above and a hint below (spec: Input). `type` picks text,
 * number, password, date or time, each bringing its own trailing control; Zeta adds textarea and integer. The label
 * can mark the field required or optional and carry an information icon; the hint holds guidance at rest and the
 * reason when `error` is set. `flavor` is default (bordered), gradient (a unique highlight, such as an AI field) or
 * ghost (borderless, for a surface that already bounds it).
 *
 * Set `block` to fill the container's width. For any other width, wrap it in a sized container.
 *
 * @event {FocusEvent} focus - Fired when the input field is focused
 * @event {FocusEvent} blur - Fired when the input field is blurred
 * @event {Event} change - Fired when the input value changes and is committed
 * @event {InputEvent} input - Fired when the input value changes
 *
 * @part field - The bordered box around the value.
 * @part prefix - The prefix text.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997
 * @storybook ?path=/docs/components-text-input--docs
 */export declare class ZetaTextInput extends ZetaTextInput_base{static shadowRootOptions:ShadowRootInit;static styles:import("lit").CSSResultGroup[];connectedCallback():void;private readonly inputEl;
/** Whether text field is in error state. */
error:boolean;
/** Fills the container's width. Without it the field keeps its default width, capped at its container. */
block:boolean;
/** Leading icon name. */
leadingIcon?:ZetaIconName;
/** Trailing icon name. */
trailingIcon?:ZetaIconName;
/** Prefix text. */
prefix:string;
/** Suffix text. */
suffix?:string;
/** The number of visible text lines for the control. If it is specified, it must be a positive integer. If it is not specified, the default value is 2.
 *
 * Prop only applies when `type` is set to `textarea`.
 */
rows?:number;
/**
 * Label shown above text field.
 *
 */
label:string;
/**
 * Hint text shown below text field.
 *
 * if `error`, then `errorText` is shown instead.
 */
hintText?:string;
/**
 * Error hint text
 *
 * Shown if `error`, replaces `hintText`.
 */
errorText?:string;
/** Type of field */
/** default: bordered. gradient: a unique highlight, such as an AI field. ghost: no border at rest. */
flavor:"default"|"gradient"|"ghost";
/** Corner shape; `full` is a pill. When unset, `rounded` decides between rounded and sharp. */
shape?:"sharp"|"rounded"|"full";
/** Marks the label "(optional)", for a mostly required form. */
optional:boolean;
/** Adds an information icon after the label. */
showInformation:boolean;
/** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
subLabel:string;
/** Keeps the icon ahead of the hint, which is what makes an error read as an error before it is read. */
showHintIcon:boolean;type:"text"|"textarea"|"password"|"time"|"date"|"number"|"integer";private _valueOnLastFocus;focus():void;blur():void;handleChange(_event:Event):void;handleFocus(_event:FocusEvent):void;handleBlur(_event:FocusEvent):void;increment():void;decrement():void;private _incId;private _decId;private _startHold;private _stopHold;protected render():import("lit").TemplateResult<1>;protected updated(changedProperties:PropertyValues):void;private renderLabel;private renderLabelRow;private renderInput;private renderHint;private renderLeftIcon;private renderRightIcon;private renderPrefix;private renderSuffix;private toggled;}declare global{interface HTMLElementTagNameMap{"zeta-text-input":ZetaTextInput;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A field for entering a value, stacked with its label above and a hint below (spec: Input). `type` picks text,
 * number, password, date or time, each bringing its own trailing control; Zeta adds textarea and integer. The label
 * can mark the field required or optional and carry an information icon; the hint holds guidance at rest and the
 * reason when `error` is set. `flavor` is default (bordered), gradient (a unique highlight, such as an AI field) or
 * ghost (borderless, for a surface that already bounds it).
 *
 * Set `block` to fill the container's width. For any other width, wrap it in a sized container.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when the input value changes and is committed
 * - **focus** - Fired when the input field is focused
 * - **blur** - Fired when the input field is blurred
 * - **input** - Fired when the input value changes
 *
 * ### **Methods:**
 *  - **handleChange(_event: _Event_): _void_** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleFocus(_event: _FocusEvent_): _void_** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_): _void_** - Event fired when the input is blurred
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 *
 * ### **CSS Parts:**
 *  - **field** - The bordered box around the value.
 * - **prefix** - The prefix text.
 */"zeta-text-input":Partial<Omit<React.InputHTMLAttributes<ZetaTextInputProps>,keyof ZetaTextInputProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaTextInputProps&BaseProps&BaseEvents>}}}