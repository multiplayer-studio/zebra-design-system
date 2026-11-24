var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import styles from "./checkbox.styles.js";
import "../icon/icon.js";
import { LitElement } from "lit";
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
 */
let ZetaCheckbox = class ZetaCheckbox extends BaseToggleFormElement {
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: true
    }; }
    constructor() {
        super();
        this.type = "checkbox";
        this.value = "on";
        /**
         * Whether the order of the checkbox and its label should be reversed.
         */
        this.reverse = false;
        this.internals.role = "checkbox";
    }
    static { this.styles = [super.styles, styles]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaCheckbox.prototype, "reverse", void 0);
ZetaCheckbox = __decorate([
    customElement("zeta-checkbox")
], ZetaCheckbox);
export { ZetaCheckbox };
//# sourceMappingURL=checkbox.js.map