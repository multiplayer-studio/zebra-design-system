import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { horizontalStyles, verticalStyles } from "./stepper.styles.js";
import "./step.js";
import type { ZdsStepBase } from "./step.js";

export type HorizontalStepperSize = "default" | "compact";

const isStep = (el: Element): el is ZdsStepBase => /^zds-step-(horizontal|vertical|card)$/.test(el.localName);

/** Numbers the steps and marks the last, so it drops its connector. */
function syncSteps(host: HTMLElement) {
  const steps = [...host.children].filter(isStep);
  steps.forEach((s, i) => {
    s.position = i + 1;
    if ("last" in s) (s as ZdsStepBase & { last: boolean }).last = i === steps.length - 1;
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
@customElement("zds-horizontal-stepper")
export class ZdsHorizontalStepper extends LitElement {
  static styles = horizontalStyles;

  /** `default` names every step under its indicator; `compact`, for mobile, names only the current step above a bar of segments. */
  @property({ type: String, reflect: true }) size: HorizontalStepperSize = "default";

  /** Accessible name of the stepper, e.g. "Checkout". */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel = "Progress";

  /** Compact: the current step number in "STEP n OF m". */
  @property({ type: String, attribute: "current-step" }) currentStep = "";

  /** Compact: the total number of steps in "STEP n OF m". */
  @property({ type: String, attribute: "total-steps" }) totalSteps = "";

  /** Compact: the current step's title. */
  @property({ type: String }) label = "";

  /** Compact: the current step's subtitle. */
  @property({ type: String }) subtitle: string | null = null;

  /**
   * Draws subtitles: the current step's on compact, every step's on default.
   * `show-subtitle="false"` hides them all, whatever each step sets.
   */
  @property({ attribute: "show-subtitle", converter: { fromAttribute: (v: string | null) => v !== "false" } }) showSubtitle = true;

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("showSubtitle")) this.#sync();
  }

  #sync = () => {
    for (const s of syncSteps(this)) s.parentShowSubtitle = this.showSubtitle;
  };

  protected render() {
    if (this.size === "compact") {
      return html`<nav aria-label=${this.accessibleLabel}>
        <div class="summary">
          <p class="step-info"><span>STEP</span> <span>${this.currentStep}</span> <span>OF</span> <span>${this.totalSteps}</span></p>
          <div class="heading">
            <p class="title">${this.label}</p>
            ${this.showSubtitle && this.subtitle != null ? html`<p class="subtitle">${this.subtitle}</p>` : nothing}
          </div>
        </div>
        <div class="segments" aria-hidden="true"><slot></slot></div>
      </nav>`;
    }
    return html`<nav aria-label=${this.accessibleLabel}><div class="steps" role="list"><slot @slotchange=${this.#sync}></slot></div></nav>`;
  }
}

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
@customElement("zds-vertical-stepper")
export class ZdsVerticalStepper extends LitElement {
  static styles = verticalStyles;

  /** A column of cards instead of a rail. Adds a gap between steps. */
  @property({ type: Boolean, reflect: true }) card = false;

  /** Card corners: rounded (Step Card/Round) or sharp (Step Card/Sharp). Only applies with `card`; sets every card's `shape`. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** Accessible name of the stepper, e.g. "Setup". */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel = "Progress";

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("rounded")) this.#sync();
  }

  #sync = () => {
    for (const s of syncSteps(this)) if (s.localName === "zds-step-card") s.setAttribute("shape", this.rounded ? "rounded" : "sharp");
  };

  protected render() {
    return html`<nav aria-label=${this.accessibleLabel}><div class="steps" role="list"><slot @slotchange=${this.#sync}></slot></div></nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-horizontal-stepper": ZdsHorizontalStepper;
    "zds-vertical-stepper": ZdsVerticalStepper;
  }
}
