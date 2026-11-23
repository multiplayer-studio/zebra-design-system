import type { LitElement } from "lit";
import { type AbstractConstructor } from "./utils.js";
type GenericInputTypes = "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
type ZetaExtraInputTypes = "checkbox-dropdown" | "integer" | "radio-dropdown" | "range-selector" | "select" | "slider" | "stepper" | "text-dropdown" | "textarea";
export type ZetaInputType = Exclude<GenericInputTypes, "color" | "datetime-local" | "file" | "hidden" | "image" | "range" | "reset" | "submit" | "week"> | ZetaExtraInputTypes;
declare abstract class FormFieldInterface {
    abstract type: ZetaInputType;
    name: string;
    required: boolean;
    value: string;
    disabled: boolean;
    checked?: boolean;
    indeterminate: boolean;
    input: HTMLInputElement;
    internals: ElementInternals;
    placeholder: string;
    min: number;
    max: number;
    readOnly?: boolean;
    abstract handleChange(event: Event): void;
    handleInput(event: Event): void;
    handleFocus(event: FocusEvent): void;
    handleBlur(event: FocusEvent): void;
}
/**
 * Class mixin to add form control properties to a component.
 *
 * @slot - Slot for a label.
 * @param superClass - LitElement to add mixin to
 *
 * @event {FocusEvent>} focus - Fired when the form field is focused
 * @event {BlurEvent} blur - Fired when the form field is blurred
 * @event {InputEvent} input - Fired when the value of the element changes.
 *
 * @returns - component with mixin applied.
 */
export declare const FormField: <T extends AbstractConstructor<LitElement>>(superClass: T) => AbstractConstructor<FormFieldInterface & LitElement> & T;
export {};
//# sourceMappingURL=form-field.d.ts.map