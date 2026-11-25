import{ZetaCheckboxProps,BaseProps,BaseEvents}from"../../jsx.js";import{BaseToggleFormElement}from"../base-toggle-form-element.js";import"../icon/icon.js";import type{ZetaInputType}from"../../mixins/form-field.js";
/**
 * A square control for turning a single option on or off, with an optional label beside it. `indeterminate` says a
 * checkbox that summarises others is mixed; nothing cycles into it, so set it from code. Reach for it wherever options
 * are independent, and for Radio Button where exactly one of a set has to win.
 *
 * The box sits in a 40px target, and the label beside it extends what a person can aim at. Keep the label, or name
 * the checkbox from the surrounding structure.
 *
 * @event {Event} change - Fired when the checkbox value changes
 * @event {InputEvent} input - Fired when the checkbox value changes
 *
 * @cssproperty --checkbox-background - Background colour of the checkbox in its default/unchecked state
 * @cssproperty --checkbox-checked-background - Background colour when the checkbox is checked or indeterminate
 * @cssproperty --checkbox-hover-background - Background colour when hovering over a checked/indeterminate checkbox
 * @cssproperty --checkbox-border-color - Border colour of the checkbox container
 * @cssproperty --checkbox-icon-color - Colour of the checkmark or indeterminate icon inside the checkbox
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6382-52
 * @storybook ?path=/docs/components-checkbox--docs
 */export declare class ZetaCheckbox extends BaseToggleFormElement{static shadowRootOptions:ShadowRootInit;constructor();type:Extract<ZetaInputType,"checkbox">;value:string;
/**
 * Whether the order of the checkbox and its label should be reversed.
 */
reverse:boolean;static styles:(import("lit").CSSResult|import("lit").CSSResultGroup[])[];}declare global{interface HTMLElementTagNameMap{"zeta-checkbox":ZetaCheckbox;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A square control for turning a single option on or off, with an optional label beside it. `indeterminate` says a
 * checkbox that summarises others is mixed; nothing cycles into it, so set it from code. Reach for it wherever options
 * are independent, and for Radio Button where exactly one of a set has to win.
 *
 * The box sits in a 40px target, and the label beside it extends what a person can aim at. Keep the label, or name
 * the checkbox from the surrounding structure.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when the checkbox value changes
 * - **input** - Fired when the checkbox value changes
 *
 * ### **Methods:**
 *  - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
 * - **handleChange(_event: _Event_): _Event | void_** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 *
 * ### **CSS Properties:**
 *  - **--checkbox-background** - Background colour of the checkbox in its default/unchecked state _(default: undefined)_
 * - **--checkbox-checked-background** - Background colour when the checkbox is checked or indeterminate _(default: undefined)_
 * - **--checkbox-hover-background** - Background colour when hovering over a checked/indeterminate checkbox _(default: undefined)_
 * - **--checkbox-border-color** - Border colour of the checkbox container _(default: undefined)_
 * - **--checkbox-icon-color** - Colour of the checkmark or indeterminate icon inside the checkbox _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **icon** - The icon of the element.
 */"zeta-checkbox":Partial<Omit<React.InputHTMLAttributes<ZetaCheckboxProps>,keyof ZetaCheckboxProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaCheckboxProps&BaseProps&BaseEvents>}}}