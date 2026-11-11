var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ZdsHorizontalStepper_sync, _ZdsVerticalStepper_sync;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { horizontalStyles, verticalStyles } from "./stepper.styles.js";
import "./step.js";
const isStep = (el) => /^zds-step-(horizontal|vertical|card)$/.test(el.localName);
/** Numbers the steps and marks the last, so it drops its connector. */
function syncSteps(host) {
    const steps = [...host.children].filter(isStep);
    steps.forEach((s, i) => {
        s.position = i + 1;
        if ("last" in s)
            s.last = i === steps.length - 1;
    });
    return steps;
}
/**
 * Shows where a person is in a fixed sequence of steps, in a row.
 *
 * On `default`, slot `<zds-step-horizontal>`s; on `compact`, one
 * `<zds-step-segment>` per step. Each step sets its own `status`; keep
 * exactly one `active`. A navigation landmark holding a list; the active step
 * carries `aria-current="step"`. On compact the bar holds no text and is
 * hidden from assistive tech, so the count and title above it are what is
 * announced.
 *
 * @slot - The steps, or the segments on compact.
 *
 * @spec specs/stepper/stepper.spec.json
 */
let ZdsHorizontalStepper = class ZdsHorizontalStepper extends LitElement {
    constructor() {
        super(...arguments);
        /** `default` names every step under its indicator; `compact`, for mobile, names only the current step above a bar of segments. */
        this.size = "default";
        /** Accessible name of the stepper, e.g. "Checkout". */
        this.accessibleLabel = "Progress";
        /** Compact: the current step number in "STEP n OF m". */
        this.currentStep = "";
        /** Compact: the total number of steps in "STEP n OF m". */
        this.totalSteps = "";
        /** Compact: the current step's title. */
        this.label = "";
        /** Compact: the current step's subtitle. */
        this.subtitle = null;
        /**
         * Draws subtitles: the current step's on compact, every step's on default.
         * `show-subtitle="false"` hides them all, whatever each step sets.
         */
        this.showSubtitle = true;
        _ZdsHorizontalStepper_sync.set(this, () => {
            for (const s of syncSteps(this))
                s.parentShowSubtitle = this.showSubtitle;
        });
    }
    updated(changed) {
        if (changed.has("showSubtitle"))
            __classPrivateFieldGet(this, _ZdsHorizontalStepper_sync, "f").call(this);
    }
    render() {
        if (this.size === "compact") {
            return html `<nav aria-label=${this.accessibleLabel}>
        <div class="summary">
          <p class="step-info"><span>STEP</span> <span>${this.currentStep}</span> <span>OF</span> <span>${this.totalSteps}</span></p>
          <div class="heading">
            <p class="title">${this.label}</p>
            ${this.showSubtitle && this.subtitle != null ? html `<p class="subtitle">${this.subtitle}</p>` : nothing}
          </div>
        </div>
        <div class="segments" aria-hidden="true"><slot></slot></div>
      </nav>`;
        }
        return html `<nav aria-label=${this.accessibleLabel}><div class="steps" role="list"><slot @slotchange=${__classPrivateFieldGet(this, _ZdsHorizontalStepper_sync, "f")}></slot></div></nav>`;
    }
};
_ZdsHorizontalStepper_sync = new WeakMap();
ZdsHorizontalStepper.styles = horizontalStyles;
__decorate([
    property({ type: String, reflect: true })
], ZdsHorizontalStepper.prototype, "size", void 0);
__decorate([
    property({ type: String, attribute: "accessible-label" })
], ZdsHorizontalStepper.prototype, "accessibleLabel", void 0);
__decorate([
    property({ type: String, attribute: "current-step" })
], ZdsHorizontalStepper.prototype, "currentStep", void 0);
__decorate([
    property({ type: String, attribute: "total-steps" })
], ZdsHorizontalStepper.prototype, "totalSteps", void 0);
__decorate([
    property({ type: String })
], ZdsHorizontalStepper.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsHorizontalStepper.prototype, "subtitle", void 0);
__decorate([
    property({ attribute: "show-subtitle", converter: { fromAttribute: (v) => v !== "false" } })
], ZdsHorizontalStepper.prototype, "showSubtitle", void 0);
ZdsHorizontalStepper = __decorate([
    customElement("zds-horizontal-stepper")
], ZdsHorizontalStepper);
export { ZdsHorizontalStepper };
/**
 * Shows where a person is in a fixed sequence of steps, in a column: a rail
 * of `<zds-step-vertical>`s, or with `card` a column of `<zds-step-card>`s.
 * Each step sets its own `status`; keep exactly one `active`. A navigation
 * landmark holding a list; the active step carries `aria-current="step"`.
 *
 * @slot - The steps.
 *
 * @spec specs/stepper/stepper.spec.json
 */
let ZdsVerticalStepper = class ZdsVerticalStepper extends LitElement {
    constructor() {
        super(...arguments);
        /** A column of cards instead of a rail. Adds a gap between steps. */
        this.card = false;
        /** Card corners: rounded (Step Card/Round) or sharp (Step Card/Sharp). Only applies with `card`; sets every card's `shape`. */
        this.rounded = false;
        /** Accessible name of the stepper, e.g. "Setup". */
        this.accessibleLabel = "Progress";
        _ZdsVerticalStepper_sync.set(this, () => {
            for (const s of syncSteps(this))
                if (s.localName === "zds-step-card")
                    s.setAttribute("shape", this.rounded ? "rounded" : "sharp");
        });
    }
    updated(changed) {
        if (changed.has("rounded"))
            __classPrivateFieldGet(this, _ZdsVerticalStepper_sync, "f").call(this);
    }
    render() {
        return html `<nav aria-label=${this.accessibleLabel}><div class="steps" role="list"><slot @slotchange=${__classPrivateFieldGet(this, _ZdsVerticalStepper_sync, "f")}></slot></div></nav>`;
    }
};
_ZdsVerticalStepper_sync = new WeakMap();
ZdsVerticalStepper.styles = verticalStyles;
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsVerticalStepper.prototype, "card", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsVerticalStepper.prototype, "rounded", void 0);
__decorate([
    property({ type: String, attribute: "accessible-label" })
], ZdsVerticalStepper.prototype, "accessibleLabel", void 0);
ZdsVerticalStepper = __decorate([
    customElement("zds-vertical-stepper")
], ZdsVerticalStepper);
export { ZdsVerticalStepper };
