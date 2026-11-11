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
var _ZdsStepBase_select;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { base, horizontal, vertical, card, segment } from "./step.styles.js";
import "../icon/icon.js";
const STATUS_TEXT = {
    default: "not started", complete: "complete", active: "current step", partial: "in progress", error: "failed", disabled: "unavailable",
};
/** Absent means "decide for me"; "false" is the only way to turn a boolean off from HTML. */
const optionalBoolean = { fromAttribute: (v) => (v === null ? undefined : v !== "false") };
/**
 * What every step shares: status, label, subtitle, number and the indicator.
 * Not registered; each kind below is.
 */
export class ZdsStepBase extends LitElement {
    constructor() {
        super(...arguments);
        /** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
        this.status = "default";
        /** Names the step in a word or two. */
        this.label = "";
        /** A qualifier under the label, a word or two. Drawn when `show-subtitle` is on. */
        this.subtitle = null;
        /** Draws the subtitle. Defaults to on when a subtitle is given; `show-subtitle="false"` hides it. */
        this.showSubtitle = undefined;
        /** The number in the indicator. Defaults to the step's position in its stepper. complete and error show a glyph instead. */
        this.stepNumber = null;
        /**
         * Makes the step's text a button that fires `zds-step-select`, for going
         * back to a step. Figma models no interaction states, so the only visible
         * change is the focus ring.
         */
        this.selectable = false;
        /** Set by the stepper: the step's 1-based position, used when `step-number` is absent. */
        this.position = 0;
        /** Set by `<zds-horizontal-stepper>`: false when its `show-subtitle` is off, which hides this step's subtitle too. */
        this.parentShowSubtitle = true;
        _ZdsStepBase_select.set(this, () => {
            this.dispatchEvent(new CustomEvent("zds-step-select", { bubbles: true, composed: true, detail: { position: this.position } }));
        });
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "listitem");
    }
    updated(changed) {
        if (changed.has("status")) {
            if (this.status === "active")
                this.setAttribute("aria-current", "step");
            else
                this.removeAttribute("aria-current");
        }
    }
    indicator() {
        const glyph = this.status === "complete" ? "check-mark" : this.status === "error" ? "priority" : null;
        return html `<span class="indicator" part="indicator" aria-hidden="true">
      ${glyph ? html `<zds-icon name=${glyph} size="small"></zds-icon>` : this.stepNumber ?? (this.position || nothing)}
    </span>`;
    }
    text() {
        const showSubtitle = this.parentShowSubtitle && (this.showSubtitle ?? this.subtitle != null) && this.subtitle != null;
        const content = html `<span class="label" part="label">${this.label}</span>${showSubtitle
            ? html `<span class="subtitle" part="subtitle">${this.subtitle}</span>` : nothing}<span class="sr">, ${STATUS_TEXT[this.status]}</span>`;
        return this.selectable && this.status !== "disabled"
            ? html `<button type="button" class="text" @click=${__classPrivateFieldGet(this, _ZdsStepBase_select, "f")}>${content}</button>`
            : html `<span class="text">${content}</span>`;
    }
}
_ZdsStepBase_select = new WeakMap();
__decorate([
    property({ type: String, reflect: true })
], ZdsStepBase.prototype, "status", void 0);
__decorate([
    property({ type: String })
], ZdsStepBase.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsStepBase.prototype, "subtitle", void 0);
__decorate([
    property({ attribute: "show-subtitle", converter: optionalBoolean })
], ZdsStepBase.prototype, "showSubtitle", void 0);
__decorate([
    property({ type: String, attribute: "step-number" })
], ZdsStepBase.prototype, "stepNumber", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsStepBase.prototype, "selectable", void 0);
__decorate([
    property({ attribute: false })
], ZdsStepBase.prototype, "position", void 0);
__decorate([
    property({ attribute: false })
], ZdsStepBase.prototype, "parentShowSubtitle", void 0);
/** A step that draws a connector to the next one. */
class ZdsStepWithLine extends ZdsStepBase {
    constructor() {
        super(...arguments);
        /** Draws the connector to the next step. By default every step but the last draws it; `show-line="false"` drops it. */
        this.showLine = undefined;
        /** Set by the stepper on its last step, which then drops its line unless `show-line` says otherwise. */
        this.last = false;
    }
    get hasLine() { return this.showLine ?? !this.last; }
    updated(changed) {
        super.updated(changed);
        this.toggleAttribute("has-line", this.hasLine);
    }
}
__decorate([
    property({ attribute: "show-line", converter: optionalBoolean })
], ZdsStepWithLine.prototype, "showLine", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsStepWithLine.prototype, "last", void 0);
/**
 * One step of `<zds-horizontal-stepper>`: the label centred under its
 * indicator, and the connector running on to the next step.
 *
 * @fires zds-step-select - The step's text was chosen. Only with `selectable`.
 * @csspart indicator - The numbered circle.
 * @csspart label - The label text.
 * @csspart subtitle - The subtitle text.
 *
 * @spec specs/stepper/stepper.spec.json
 */
let ZdsStepHorizontal = class ZdsStepHorizontal extends ZdsStepWithLine {
    render() {
        return html `<span class="head">${this.indicator()}${this.text()}</span>${this.hasLine
            ? html `<span class="track" aria-hidden="true"><span class="line"></span></span>` : nothing}`;
    }
};
ZdsStepHorizontal.styles = [base, horizontal];
ZdsStepHorizontal = __decorate([
    customElement("zds-step-horizontal")
], ZdsStepHorizontal);
export { ZdsStepHorizontal };
/**
 * One step of `<zds-vertical-stepper>`'s rail: the label beside its
 * indicator, and the connector dropping to the next step.
 *
 * @fires zds-step-select - The step's text was chosen. Only with `selectable`.
 * @csspart indicator - The numbered circle.
 * @csspart label - The label text.
 * @csspart subtitle - The subtitle text.
 *
 * @spec specs/stepper/stepper.spec.json
 */
let ZdsStepVertical = class ZdsStepVertical extends ZdsStepWithLine {
    render() {
        return html `<span class="rail">${this.indicator()}${this.hasLine
            ? html `<span class="line" aria-hidden="true"></span>` : nothing}</span>${this.text()}`;
    }
};
ZdsStepVertical.styles = [base, vertical];
ZdsStepVertical = __decorate([
    customElement("zds-step-vertical")
], ZdsStepVertical);
export { ZdsStepVertical };
/**
 * One step of the cards arrangement: a bordered surface carrying the
 * indicator and the label side by side, with no connector.
 *
 * @fires zds-step-select - The step's text was chosen. Only with `selectable`.
 * @csspart indicator - The numbered circle.
 * @csspart label - The label text.
 * @csspart subtitle - The subtitle text.
 *
 * @spec specs/stepper/stepper.spec.json
 */
let ZdsStepCard = class ZdsStepCard extends ZdsStepBase {
    constructor() {
        super(...arguments);
        /** Corner style. Inside `<zds-vertical-stepper>` the stepper's `rounded` sets it. */
        this.shape = "sharp";
    }
    render() {
        return html `${this.indicator()}${this.text()}`;
    }
};
ZdsStepCard.styles = [base, card];
__decorate([
    property({ type: String, reflect: true })
], ZdsStepCard.prototype, "shape", void 0);
ZdsStepCard = __decorate([
    customElement("zds-step-card")
], ZdsStepCard);
export { ZdsStepCard };
/**
 * One division of the compact `<zds-horizontal-stepper>`'s bar. It carries no
 * text: the summary above the bar does the naming. Never interactive.
 *
 * @spec specs/stepper/stepper.spec.json
 */
let ZdsStepSegment = class ZdsStepSegment extends LitElement {
    constructor() {
        super(...arguments);
        /** Fills neither, the leading half (partial) or both halves of the segment. */
        this.status = "default";
    }
    render() {
        return nothing;
    }
};
ZdsStepSegment.styles = segment;
__decorate([
    property({ type: String, reflect: true })
], ZdsStepSegment.prototype, "status", void 0);
ZdsStepSegment = __decorate([
    customElement("zds-step-segment")
], ZdsStepSegment);
export { ZdsStepSegment };
