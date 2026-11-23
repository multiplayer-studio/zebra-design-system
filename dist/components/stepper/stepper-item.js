var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./stepper-item.styles.js";
import "../icon/icon.js";
const FLAVOR_STATUS = {
    partial: "partial",
    success: "complete",
    active: "active",
    default: "default"
};
const STATUS_TEXT = {
    default: "not started",
    complete: "complete",
    active: "current step",
    partial: "in progress",
    error: "failed",
    disabled: "unavailable"
};
/** Absent means "decide for me"; "false" is the only way to turn the boolean off from HTML. */
const optionalBoolean = { fromAttribute: (v) => (v === null ? undefined : v !== "false") };
/**
 * One step of a zeta-stepper. It draws Step / Horizontal, Step / Vertical, Step Card or Step Segment, whichever the
 * parent's `variant`, `size` and `card` call for. Each step sets its own `status`; keep exactly one `active`.
 * Steps are numbered from 1 automatically, and the last drops its connector.
 *
 * @slot - The label, when `label` is not set.
 * @part indicator - The numbered circle.
 * @event select - The step's text was chosen. Only with `selectable`. `detail.position` is the step's number.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7357-18457
 * @storybook ?path=/docs/components-stepper--docs
 */
let ZetaStepperItem = class ZetaStepperItem extends LitElement {
    constructor() {
        super(...arguments);
        /** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
        this.status = "default";
        /** Names the step in a word or two. Wins over the slotted label. */
        this.label = "";
        /** Makes the step's text a button that fires `select`, for going back to a step. Only the focus ring shows it. */
        this.selectable = false;
        /** Shows a pen on the indicator while the step is being edited. Kept from the old item; not in the spec. */
        this.editing = false;
        /** Which step part to draw. Set by the parent zeta-stepper. */
        this.kind = "horizontal";
        /** Card corners. Set by the parent's `rounded`. */
        this.shape = "sharp";
        /** The step's 1-based position. Set by the parent zeta-stepper. */
        this.position = 0;
        /** Whether this is the last step. Set by the parent zeta-stepper. */
        this.last = false;
        /** False when the parent zeta-stepper's `show-subtitle` is off, which hides this step's subtitle too. */
        this.parentShowSubtitle = true;
        this.handleSelect = () => {
            this.dispatchEvent(new CustomEvent("select", { detail: { position: this.position }, bubbles: true, composed: true }));
        };
    }
    connectedCallback() {
        // @ts-expect-error-next-line
        if (super.connectedCallback) {
            super.connectedCallback();
        }
        this.setAttribute("role", "listitem");
    }
    willUpdate(changed) {
        if (changed.has("flavor") && this.flavor)
            this.status = FLAVOR_STATUS[this.flavor];
    }
    updated(changed) {
        if (changed.has("status")) {
            if (this.status === "active")
                this.setAttribute("aria-current", "step");
            else
                this.removeAttribute("aria-current");
        }
        this.toggleAttribute("has-line", this.hasLine);
    }
    get hasLine() {
        return (this.kind === "horizontal" || this.kind === "vertical") && (this.showLine ?? !this.last);
    }
    indicator() {
        const glyph = this.status === "complete" ? "check_mark" : this.status === "error" ? "priority" : null;
        return html `<span class="indicator" part="indicator" aria-hidden="true">
      ${glyph ? html `<zeta-icon size="small" name=${glyph}></zeta-icon>` : (this.stepNumber ?? (this.position || nothing))}
      ${this.editing ? html `<zeta-icon class="edit" size="small" name="edit"></zeta-icon>` : nothing}
    </span>`;
    }
    text() {
        const showSubtitle = this.parentShowSubtitle && (this.showSubtitle ?? !!this.subtitle) && !!this.subtitle;
        const content = html `<span class="label">${this.label || html `<slot></slot>`}</span>${showSubtitle ? html `<span class="subtitle">${this.subtitle}</span>` : nothing}<span class="sr">, ${STATUS_TEXT[this.status]}</span>`;
        return this.selectable && this.status !== "disabled"
            ? html `<button type="button" class="text" @click=${this.handleSelect}>${content}</button>`
            : html `<span class="text">${content}</span>`;
    }
    render() {
        switch (this.kind) {
            case "segment":
                return nothing;
            case "card":
                return html `${this.indicator()}${this.text()}`;
            case "vertical":
                return html `<span class="rail"
            >${this.indicator()}${this.hasLine ? html `<span class="line" aria-hidden="true"></span>` : nothing}</span
          >${this.text()}`;
            default:
                return html `<span class="head">${this.indicator()}${this.text()}</span>${this.hasLine ? html `<span class="track" aria-hidden="true"><span class="line"></span></span>` : nothing}`;
        }
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaStepperItem.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaStepperItem.prototype, "flavor", void 0);
__decorate([
    property({ type: String })
], ZetaStepperItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZetaStepperItem.prototype, "subtitle", void 0);
__decorate([
    property({ attribute: "show-subtitle", converter: optionalBoolean })
], ZetaStepperItem.prototype, "showSubtitle", void 0);
__decorate([
    property({ attribute: "show-line", converter: optionalBoolean })
], ZetaStepperItem.prototype, "showLine", void 0);
__decorate([
    property({ attribute: "step-number" })
], ZetaStepperItem.prototype, "stepNumber", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaStepperItem.prototype, "selectable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaStepperItem.prototype, "editing", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaStepperItem.prototype, "kind", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaStepperItem.prototype, "shape", void 0);
__decorate([
    property({ attribute: false })
], ZetaStepperItem.prototype, "position", void 0);
__decorate([
    property({ attribute: false })
], ZetaStepperItem.prototype, "last", void 0);
__decorate([
    property({ attribute: false })
], ZetaStepperItem.prototype, "parentShowSubtitle", void 0);
ZetaStepperItem = __decorate([
    customElement("zeta-stepper-item")
], ZetaStepperItem);
export { ZetaStepperItem };
//# sourceMappingURL=stepper-item.js.map