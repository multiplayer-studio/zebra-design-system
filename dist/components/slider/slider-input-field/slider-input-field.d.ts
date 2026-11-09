import{ZetaSliderInputFieldProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../../text-input/text-input.js";import"../slider.js";import{type ZetaInputType}from"../../../mixins/form-field.js";declare const ZetaSliderInputField_base:import("../../../mixins/utils.js").AbstractConstructor<{type:ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A text input and slider field for entering numerical values.
 *
 * @event {CustomEvent<ZetaSliderEventDetail>} change - Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=875-11860&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-slider--docs
 */export declare class ZetaSliderInputField extends ZetaSliderInputField_base{
/** @internal */static shadowRootOptions:ShadowRootInit;
/** The label displayed above the input. */
label?:string;
/** Error state. */
error:boolean;
/** The minimum value of the slider input field. */
min:number;
/** The maximum value of the slider input field. */
max:number;value:string;
/** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
stepIncrement?:number;
/**  Disables the input field. */
disabled:boolean;type:Extract<ZetaInputType,"slider">;input:HTMLInputElement;update(_changedProperties:PropertyValues):void;handleChange(event:Event):void;private getLabel;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-slider-input-field":ZetaSliderInputField;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A text input and slider field for entering numerical values.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`.
 *
 * ### **Methods:**
 *  - **handleChange(event: _Event_)** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 */"zeta-slider-input-field":Partial<Omit<React.InputHTMLAttributes<ZetaSliderInputFieldProps>,keyof ZetaSliderInputFieldProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaSliderInputFieldProps&BaseProps&BaseEvents>}}}