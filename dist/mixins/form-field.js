var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import {} from "./utils.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
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
export const FormField = (superClass) => {
    /**
     * Represents a form control element that can be associated with a form.
     */
    class FormFieldClass extends superClass {
        static { this.formAssociated = true; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            super(...args);
            /**
             * The default value of the form control. This is the initial "value" when created
             */
            this._defaultValue = "";
            /**
             * The default checked value of the form control if it is a checkbox/switch.
             * This is the initial "checked" when created
             */
            this._defaultChecked = false;
            /**
             * The name of the form control.
             */
            this.name = "";
            /**
             * The id of the form control.
             */
            this.id = "";
            /**
             * Indicates whether the form control is required to be filled out before submitting the form.
             */
            this.required = false;
            /**
             * The value of the Form Control that is submitted when part of a form.
             */
            this.value = null;
            /** The state of the Switch or Checkbox that is submitted when part of a form. */
            this.checked = this._defaultChecked ?? false;
            /**
             * The state of the Switch or Checkbox defined by a mixed or unknown state.
             */
            this.indeterminate = false;
            /**
             * Boolean for if component is disabled.
             *
             * This will apply disabled styles.
             */
            this.disabled = false;
            this.internals = this.attachInternals();
        }
        get isCheckable() {
            return this.type === "checkbox" || this.type === "radio";
        }
        willUpdate(changedProperties) {
            super.willUpdate(changedProperties);
            if (changedProperties.has("checked")) {
                if (this.checked) {
                    this.internals.setFormValue(this.value != null || this.value != undefined ? this.value : "on");
                }
                else {
                    this.internals.setFormValue(null);
                }
            }
        }
        checkValidity() {
            return this.internals.checkValidity();
        }
        reportValidity() {
            return this.internals.reportValidity();
        }
        get validity() {
            return this.internals.validity;
        }
        get validationMessage() {
            return this.internals.validationMessage;
        }
        getValue(value, checked) {
            if (this.isCheckable) {
                if (checked) {
                    return this.value ?? "on";
                }
                else {
                    return null;
                }
            }
            return value;
        }
        connectedCallback() {
            super.connectedCallback();
            if (this.checked !== undefined) {
                this._defaultChecked = this.checked;
            }
            this._defaultValue = this.getValue(this.value, this._defaultChecked);
            // Removed the below line as it violates accessability rules https://dequeuniversity.com/rules/axe/4.8/nested-interactive?application=axeAPI
            // if (this.internals.role) this.role = this.internals.role;
            if (this.isCheckable) {
                this.ariaChecked = String(this.checked);
            }
        }
        firstUpdated(_changedProperties) {
            super.firstUpdated(_changedProperties);
            if (this.type === "slider")
                this.setToInitialValues();
            if (this.isCheckable)
                this.addEventListener("click", this.click);
            // if (this.isCheckable) this.addEventListener("click", this.input.click); //TODO this is probably the source of the click problem
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            if (this.isCheckable)
                this.removeEventListener("click", this.click);
            // if (this.isCheckable) this.removeEventListener("click", this.input.click); //TODO this is probably the source of the click problem
        }
        formResetCallback() {
            this.setToInitialValues();
        }
        setToInitialValues() {
            this._setValue({ checked: this._defaultChecked, value: this._defaultValue });
        }
        //Might need to override or abstract: setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement)
        /**
         * Event fired when the input value changes and is committed:
         * @param event - The input event.
         * @param isInput - Whether the event is an input event, false if change event
         */
        _handleInput(event, isInput = true) {
            const input = event.target;
            if (this.type === "integer") {
                this._handleInteger(event);
            }
            this._setValue(input);
            if (isInput)
                this.handleInput(event);
        }
        _handleInteger(event) {
            const input = event.target;
            const cursor = input.selectionStart ?? 0;
            // Remove leading minus if min >= 0
            if (this.min !== undefined && this.min >= 0) {
                input.value = input.value.replace(/^-/, "");
            }
            // Remove non-integer characters except leading minus
            const filtered = input.value.replace(/(?!^)-|[^\d-]/g, "");
            if (input.value !== filtered) {
                input.value = filtered;
                this.value = filtered;
                // Adjust cursor position
                const dataLen = event.data?.length ?? 0;
                const cursorBefore = cursor - dataLen;
                const filteredDataLen = event.data?.replace(/(?!^)-|[^\d-]/g, "").length ?? 0;
                const newCursor = dataLen === 1 ? Math.max(0, cursor - 1) : cursorBefore + filteredDataLen;
                input.setSelectionRange(newCursor, newCursor);
            }
        }
        _handleIntegerMinMax(input) {
            // Clamp to min/max if needed
            if (this.min !== undefined && Number(input.value) < this.min) {
                input.value = String(this.min);
                this.value = String(this.min);
            }
            if (this.max !== undefined && Number(input.value) > this.max) {
                input.value = String(this.max);
                this.value = String(this.max);
            }
        }
        _setValue(input) {
            const newVal = this.getValue(input.value, input.checked);
            if (this.isCheckable) {
                this.checked = !!input.checked;
                this.indeterminate = false;
            }
            else {
                this.value = newVal;
                this.internals.setFormValue(newVal);
            }
        }
        _handleChange(event) {
            this._handleInput(event, false);
            if (this.type === "integer")
                this._handleIntegerMinMax(event.target);
            this.handleChange(event);
        }
        /**
         * Event fired when the input is focussed
         */
        handleFocus(_event) {
            return _event;
        }
        /**
         * Event fired when the input is blurred
         */
        handleBlur(_event) {
            return _event;
        }
        /**
         * Event fired when the input value changes and is committed:
         * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
         * or if it is a text-like input, when the user loses focus from the input.
         * or if it is a checkbox-like input, when the checkbox is toggled.
         * or if it is a radio-like input, when the radio is selected (but not unselected).
         */
        handleChange(_event) {
            return _event;
        }
        /**
         * Event fired when the input value changes
         */
        handleInput(_event) {
            return _event;
        }
        /*
          max=${'date'|'month'|'week'|'time'|'datetime-local'|'number'|'range'}
          maxlength=${'text'|'search'|'tel'|'url'|'email'|'password'}
          min=${'date'|'month'|'week'|'time'|'datetime-local'|'number'|'range'}
          minlength=${'text'|'search'|'tel'|'url'|'email'|'password'}
          step=${'date'|'month'|'week'|'time'|'datetime-local'|'number'|'range'}
    
          multiple=${'email'}
          
          //autofocus?
          aria-describedby=${}
          aria-label=${this.label}
          placeholder=${this.placeholder}
          autocomplete=${this.autoComplete}
          spellcheck=${this.spellCheck}
        */
        render() {
            const notUrlEmailPassword = /*this.type !== 'url' && this.type !== 'email' && */ this.type !== "password";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            const autoCompleteValue = this.autoComplete;
            const rawRows = this.type === "textarea" ? this.rows : undefined;
            const rows = rawRows && rawRows > 0 ? rawRows : 2;
            switch (this.type) {
                case "checkbox":
                case "radio":
                    return html `<input
            type=${this.type}
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.ariaLabel || nothing}
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-required=${this.required ? "true" : "false"}
            value=${ifDefined(live(this.value))}
            .checked=${live(this.checked !== undefined ? this.checked : false)}
            aria-checked=${this.checked ? "true" : "false"}
            .indeterminate=${live(this.indeterminate)}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          /> `;
                case "textarea":
                    return html `<textarea
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(this.autoCapitalize)}
            autocomplete=${ifDefined(autoCompleteValue)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            spellcheck=${ifDefined(notUrlEmailPassword ? this.spellCheck : undefined)}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            .value=${live(this.value ?? "")}
            rows=${rows}
          ></textarea>`;
                case "text-dropdown":
                case "checkbox-dropdown":
                case "radio-dropdown":
                    return html `<input
            type="text"
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(notUrlEmailPassword ? this.autoCapitalize : undefined)}
            autocomplete=${ifDefined(autoCompleteValue)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            ?hidden=${true}
          /> `;
                case "slider":
                    return html `<input
            type="number"
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            .id=${this.id}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            class="contourable-target"
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
          />`;
                case "range-selector":
                    return html `<input
            type="text"
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            .id=${this.id}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            ?hidden=${true}
          />`;
                case "select":
                    return html `
            <select
              id=${ifDefined(this.id !== "" ? this.id : undefined)}
              name=${this.name}
              ?disabled=${this.disabled}
              aria-disabled=${this.disabled ? "true" : "false"}
              ?required=${this.required}
              aria-required=${this.required ? "true" : "false"}
              .value=${live(this.value ?? "")}
              @input=${this._handleInput}
              @change=${this._handleChange}
              ?hidden=${true}
            ></select>
          `;
                case "stepper":
                    return html `<input
            type="number"
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(notUrlEmailPassword ? this.autoCapitalize : undefined)}
            autocomplete=${ifDefined(autoCompleteValue)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
          /> `;
                case "integer":
                    return html `<input
            type="text"
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(notUrlEmailPassword ? this.autoCapitalize : undefined)}
            autocomplete=${ifDefined(autoCompleteValue)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
          /> `;
                default:
                    return html `<input
            type=${this.type}
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(notUrlEmailPassword ? this.autoCapitalize : undefined)}
            autocomplete=${ifDefined(autoCompleteValue)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
          /> `;
                /*
                -spellcheck
                  list
                  placeholder=$ {'text'|'search'|'tel'|'url'|'email'|'password'}
                  pattern=$     {'text'|'search'|'tel'|'url'|'email'|'password'}
                  readonly
                */
            }
            /* There is scope to add more form control events in the above. I.e:
             * @cancel=${this.handleCancel}
             * @drag=${}
             * @dragend=${}
             * @dragenter=${}
             * @dragleave=${}
             * @dragover=${}
             * @dragstart=${}
             * @drop=${}
             */
        }
    }
    __decorate([
        state()
    ], FormFieldClass.prototype, "internals", void 0);
    __decorate([
        query("input")
    ], FormFieldClass.prototype, "input", void 0);
    __decorate([
        query("label")
    ], FormFieldClass.prototype, "label", void 0);
    __decorate([
        queryAssignedNodes()
    ], FormFieldClass.prototype, "slottedElements", void 0);
    __decorate([
        property({ type: String })
    ], FormFieldClass.prototype, "autoCapitalize", void 0);
    __decorate([
        property({ type: String })
    ], FormFieldClass.prototype, "autoComplete", void 0);
    __decorate([
        property({ type: String, reflect: true })
    ], FormFieldClass.prototype, "name", void 0);
    __decorate([
        property({ type: String, reflect: true })
    ], FormFieldClass.prototype, "id", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], FormFieldClass.prototype, "required", void 0);
    __decorate([
        property({ type: String })
    ], FormFieldClass.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], FormFieldClass.prototype, "checked", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], FormFieldClass.prototype, "indeterminate", void 0);
    __decorate([
        property({ type: String, reflect: true })
    ], FormFieldClass.prototype, "placeholder", void 0);
    __decorate([
        property({ type: Number, reflect: true })
    ], FormFieldClass.prototype, "min", void 0);
    __decorate([
        property({ type: Number, reflect: true })
    ], FormFieldClass.prototype, "max", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], FormFieldClass.prototype, "readOnly", void 0);
    __decorate([
        property({ type: Boolean })
    ], FormFieldClass.prototype, "spellCheck", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], FormFieldClass.prototype, "disabled", void 0);
    return FormFieldClass;
};
//# sourceMappingURL=form-field.js.map