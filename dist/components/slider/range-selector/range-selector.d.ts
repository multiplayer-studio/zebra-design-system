import{ZetaRangeSelectorProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../text-input/text-input.js";import"../slider.js";import{type ZetaInputType}from"../../../mixins/form-field.js";export type ZetaRangeValues={min:number;max:number;};declare const ZetaRangeSelector_base:import("../../../mixins/utils.js").AbstractConstructor<{type:ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Used for selecting values in a numerical range.
 *
 * A ranged input field using a Zeta Slider
 *
 * The "name" is required when in a form.
 *
 * @event {CustomEvent<ZetaRangeSliderEventDetail>} change - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=980-16448&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/story/components-range-selector--range-slider
 */export declare class ZetaRangeSelector extends ZetaRangeSelector_base{
/** The label displayed above the input. */
label?:string;
/** The name given to the input field. This is required when in a form.*/
name:string;
/** The initial values of the range selector  */
initialValues:ZetaRangeValues;
/** Error state. */
error:boolean;
/** The minimum value of the slider input field. */
min:number;
/** The maximum value of the slider input field. */
max:number;
/** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
stepIncrement?:number;
/**  Disables the input field. */
disabled:boolean;id:string;type:Extract<ZetaInputType,"range-selector">;hiddenInput:HTMLInputElement;lowerInput:HTMLInputElement;upperInput:HTMLInputElement;
/**
 * @listens ZetaRangeSliderEvent:change
 */private sliderChange;
/**
 * @fires ZetaRangeSliderEvent:change
 */private onValueUpdated;private isError;private handleInputChange;private updateVisibleInputs;private updateHiddenInput;handleChange(event:Event):Event;protected firstUpdated():void;private getLabel;private getInput;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-range-selector":ZetaRangeSelector;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Used for selecting values in a numerical range.
 *
 * A ranged input field using a Zeta Slider
 *
 * The "name" is required when in a form.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
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
 */"zeta-range-selector":Partial<Omit<React.InputHTMLAttributes<ZetaRangeSelectorProps>,keyof ZetaRangeSelectorProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaRangeSelectorProps&BaseProps&BaseEvents>}}}