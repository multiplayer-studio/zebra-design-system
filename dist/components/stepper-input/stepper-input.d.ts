import{ZetaStepperInputProps,BaseProps,BaseEvents}from"../../jsx.js";import{type ZetaInputType}from"../../mixins/form-field.js";import{LitElement}from"lit";import"../button/icon-button/icon-button.js";import"../icon/icon.js";declare const ZetaStepperInput_base:import("../../mixins/utils.js").AbstractConstructor<{type:ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A numeric value with a button either side to decrease or increase it. A button disables itself at `min` or `max`,
 * and a typed value is held between them. Size large suits a touch surface. The hint shows below the control and is
 * removed while disabled; `error` swaps it for `errorText`.
 *
 * @event {Event} change - Fired when the value of the stepper input changes.
 * @event {FocusEvent} focus - Fired when the stepper input receives focus.
 * @event {FocusEvent} blur - Fired when the stepper input loses focus.
 * @event {InputEvent} input - Fired when the value of the stepper input changes.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5595-122
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper-input--docs
 */export declare class ZetaStepperInput extends ZetaStepperInput_base{static shadowRootOptions:ShadowRootInit;static styles:import("lit").CSSResultGroup[];private readonly inputEl;private _valueOnLastFocus;handleFocus(_event:FocusEvent):void;handleBlur(_event:FocusEvent):void;value:string;updated(changedProps:Map<string,unknown>):void;
/** Disables the control: the field greys out, the buttons move to the primary flavour and the hint is removed. */
disabled:boolean;size:"medium"|"large";
/**
 * Hint text shown below text field.
 *
 * if `error`, then `errorText` is shown instead.
 */
hintText?:string;
/** Whether text field is in error state. */
error:boolean;
/**
 * Error hint text
 *
 * Shown if `error`, replaces `hintText`.
 */
errorText?:string;
/** Accessible name of the value. */
valueLabel:string;
/** Accessible name of the decrease button. */
decrementLabel:string;
/** Accessible name of the increase button. */
incrementLabel:string;type:Extract<ZetaInputType,"stepper">;handleChange(_event:Event):void;protected firstUpdated():void;focus():void;blur():void;private validateValue;private _isSafari;private onButtonClick;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-stepper-input":ZetaStepperInput;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A numeric value with a button either side to decrease or increase it. A button disables itself at `min` or `max`,
 * and a typed value is held between them. Size large suits a touch surface. The hint shows below the control and is
 * removed while disabled; `error` swaps it for `errorText`.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when the value of the stepper input changes.
 * - **input** - Fired when the value of the stepper input changes.
 * - **focus** - Fired when the stepper input receives focus.
 * - **blur** - Fired when the stepper input loses focus.
 *
 * ### **Methods:**
 *  - **handleFocus(_event: _FocusEvent_): _void_** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_): _void_** - Event fired when the input is blurred
 * - **handleChange(_event: _Event_)** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 */"zeta-stepper-input":Partial<Omit<React.InputHTMLAttributes<ZetaStepperInputProps>,keyof ZetaStepperInputProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaStepperInputProps&BaseProps&BaseEvents>}}}