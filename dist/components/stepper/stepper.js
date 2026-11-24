var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./stepper.styles.js";
import "../icon/icon.js";
import "./stepper-item.js";
import "../progress-indicators/progress-bar/progress-bar.js";
import "../button/button.js";
/** Shows where a person is in a fixed sequence of steps, marking what is finished, what is current and what is still
 * ahead. `variant="horizontal"` is a row: `size="default"` names every step, `size="compact"` (mobile) names only the
 * current step above a bar of segments. `variant="vertical"` is a rail, or with `card` a column of cards.
 *
 * Pass `zeta-stepper-item`s as children; each sets its own `status`. They are numbered from 1 and drawn as the part
 * the stepper calls for. A navigation landmark holding a list; the active step carries `aria-current="step"`. On
 * compact the bar is hidden from assistive tech, so the count and title above it are what is announced.
 *
 * @slot - The steps: `zeta-stepper-item`s.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7357-18457
 * @storybook ?path=/docs/components-stepper--docs
 */
let ZetaStepper = class ZetaStepper extends LitElement {
    constructor() {
        super(...arguments);
        /** Stepper direction. Defaults to horizontal. */
        this.variant = "horizontal";
        /** Horizontal only. `default` names every step; `compact`, for mobile, names the current step above a bar. */
        this.size = "default";
        /** Vertical only. A column of cards instead of a rail. */
        this.card = false;
        /** Vertical cards only. Rounded corners (Step Card/Round) instead of sharp (Step Card/Sharp). */
        this.rounded = false;
        /** Compact: the current step number in "STEP n OF m". */
        this.currentStep = "";
        /** Compact: the total number of steps in "STEP n OF m". */
        this.totalSteps = "";
        /** Compact: the current step's title. */
        this.label = "";
        /**
         * Draws subtitles: the current step's on compact, and every step's on the other arrangements.
         * `show-subtitle="false"` hides them all, whatever each step sets.
         */
        this.showSubtitle = true;
        /** Accessible name of the stepper, e.g. "Checkout". */
        this.accessibleLabel = "Progress";
        /**
         * The current progress of the stepper, represented as a floating point number (0.0-1.0).
         * This number is used by the progress bar. Kept from the old stepper; not in the spec.
         */
        this.progress = 0;
        /**
         * Set to true when not all stepper items can be displayed on screen at once.
         * Displays a button that allows users to view additional stepper items.
         * User can set their own functionality to the button. Kept from the old stepper; not in the spec.
         */
        this.showOverflowButton = false;
        /** Set to true for the progress bar to be shown. Kept from the old stepper; not in the spec. */
        this.progressBar = false;
        /** Tells every item which part to draw, its position, whether it is last, and the card corners. */
        this.syncItems = () => {
            const items = [...this.children].filter((el) => el.localName === "zeta-stepper-item");
            const kind = this.compact ? "segment" : this.variant === "horizontal" ? "horizontal" : this.card ? "card" : "vertical";
            items.forEach((item, i) => {
                item.kind = kind;
                item.position = i + 1;
                item.last = i === items.length - 1;
                item.shape = this.rounded ? "rounded" : "sharp";
                item.parentShowSubtitle = this.showSubtitle;
            });
        };
    }
    get compact() {
        return this.variant === "horizontal" && this.size === "compact";
    }
    updated(changed) {
        const synced = ["variant", "size", "card", "rounded", "showSubtitle"];
        if (synced.some(key => changed.has(key)))
            this.syncItems();
    }
    render() {
        if (this.compact) {
            return html `<nav aria-label=${this.accessibleLabel}>
        <div class="summary">
          <p class="step-info">
            <span>STEP</span> <span>${this.currentStep}</span> <span>OF</span> <span>${this.totalSteps}</span>
          </p>
          <div class="heading">
            <p class="title">${this.label}</p>
            ${this.showSubtitle && this.subtitle ? html `<p class="subtitle">${this.subtitle}</p>` : nothing}
          </div>
        </div>
        <div class="segments" aria-hidden="true"><slot @slotchange=${this.syncItems}></slot></div>
      </nav>`;
        }
        return html `
      <nav aria-label=${this.accessibleLabel}>
        <div class="steps" role="list"><slot @slotchange=${this.syncItems}></slot></div>
        ${this.showOverflowButton
            ? html `<zeta-button flavor="outline-subtle" class="stepper-item-overflow-button"
              ><zeta-icon>chevron_right</zeta-icon></zeta-button
            >`
            : nothing}
      </nav>
      ${this.progressBar ? html `<zeta-progress-bar value=${this.progress}></zeta-progress-bar>` : nothing}
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ reflect: true })
], ZetaStepper.prototype, "variant", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaStepper.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaStepper.prototype, "card", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaStepper.prototype, "rounded", void 0);
__decorate([
    property({ attribute: "current-step" })
], ZetaStepper.prototype, "currentStep", void 0);
__decorate([
    property({ attribute: "total-steps" })
], ZetaStepper.prototype, "totalSteps", void 0);
__decorate([
    property({ type: String })
], ZetaStepper.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZetaStepper.prototype, "subtitle", void 0);
__decorate([
    property({ attribute: "show-subtitle", converter: { fromAttribute: (v) => v !== "false" } })
], ZetaStepper.prototype, "showSubtitle", void 0);
__decorate([
    property({ type: String, attribute: "accessible-label" })
], ZetaStepper.prototype, "accessibleLabel", void 0);
__decorate([
    property({ type: Number })
], ZetaStepper.prototype, "progress", void 0);
__decorate([
    property({ type: Boolean })
], ZetaStepper.prototype, "showOverflowButton", void 0);
__decorate([
    property({ type: Boolean })
], ZetaStepper.prototype, "progressBar", void 0);
ZetaStepper = __decorate([
    customElement("zeta-stepper")
], ZetaStepper);
export { ZetaStepper };
//# sourceMappingURL=stepper.js.map