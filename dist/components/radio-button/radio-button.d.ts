import{ZetaRadioButtonProps,BaseProps,BaseEvents}from"../../jsx.js";import{BaseToggleFormElement}from"../base-toggle-form-element.js";import type{ZetaInputType}from"../../mixins/form-field.js";
/** Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected.
 *
 * The ring is 16px at medium and 24px at large, inside a 40px target. The label is the default slot; leave it empty
 * only when the option is named some other way, such as aria-label.
 *
 * @slot - The label.
 *
 * @event {Event} change - Fired when the radio button becomes checked (but not when unchecked)
 * @event {InputEvent} input - Fired when the radio button value changes
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3121
 * @storybook ?path=/docs/components-radio-button--docs
 */export declare class ZetaRadioButton extends BaseToggleFormElement{private readonly radioButtonController;constructor();type:Extract<ZetaInputType,"radio">;handleChange(event:Event):void;static styles:(import("lit").CSSResult|import("lit").CSSResultGroup[])[];}declare global{interface HTMLElementTagNameMap{"zeta-radio-button":ZetaRadioButton;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected.
 *
 * The ring is 16px at medium and 24px at large, inside a 40px target. The label is the default slot; leave it empty
 * only when the option is named some other way, such as aria-label.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when the radio button becomes checked (but not when unchecked)
 * - **input** - Fired when the radio button value changes
 *
 * ### **Methods:**
 *  - **handleChange(event: _Event_): _void_** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 *
 * ### **Slots:**
 *  - _default_ - The label.
 *
 * ### **CSS Parts:**
 *  - **icon** - The icon of the element.
 */"zeta-radio-button":Partial<Omit<React.InputHTMLAttributes<ZetaRadioButtonProps>,keyof ZetaRadioButtonProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaRadioButtonProps&BaseProps&BaseEvents>}}}