var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { query, state } from "lit/decorators.js";
import { property } from "lit/decorators.js";
import { Interactive, Size } from "../../mixins/mixins.js";
import { LitElement } from "lit";
import styles from "./base-button.styles.js";
import { ContourableThree } from "../../mixins/contourable-three.js";
/**
 * @event {SubmitEvent} submit - Fired when the button is clicked and has the type submit
 */
export class BaseButton extends ContourableThree(Size(Interactive(LitElement))) {
    static { this.formAssociated = true; }
    /** @internal */
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: true
    }; }
    constructor() {
        super();
        this.internals = this.attachInternals();
    }
    focus() {
        this.buttonElement?.focus();
    }
    blur() {
        this.buttonElement?.blur();
    }
    click() {
        if (!this.disabled)
            this.buttonElement?.click();
    }
    //TODO do i need to change the target of on click events?
    _handleClick(event) {
        if (this.type === "submit") {
            const form = this.internals.form;
            form?.dispatchEvent(new SubmitEvent("submit", { bubbles: true, composed: true })); //Triggers the form to submit, this doesnt need to be defined in events.ts
        }
        else if (this.type === "reset") {
            const form = this.internals.form;
            form?.reset();
        }
        return event;
    }
    static { this.styles = [super.styles ?? [], styles]; }
}
__decorate([
    property({ type: String })
], BaseButton.prototype, "type", void 0);
__decorate([
    state()
], BaseButton.prototype, "internals", void 0);
__decorate([
    property({ type: String })
], BaseButton.prototype, "name", void 0);
__decorate([
    property({ type: String })
], BaseButton.prototype, "value", void 0);
__decorate([
    query("button")
], BaseButton.prototype, "buttonElement", void 0);
//# sourceMappingURL=base-button.js.map