import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import styles from "./stepper.styles.js";
import "../icon/icon.js";
import "./stepper-item.js";
import type { ZetaStepperItem } from "./stepper-item.js";
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
@customElement("zeta-stepper")
export class ZetaStepper extends LitElement {
  /** Stepper direction. Defaults to horizontal. */
  @property({ reflect: true }) variant: "vertical" | "horizontal" = "horizontal";

  /** Horizontal only. `default` names every step; `compact`, for mobile, names the current step above a bar. */
  @property({ type: String, reflect: true }) size: "default" | "compact" = "default";

  /** Vertical only. A column of cards instead of a rail. */
  @property({ type: Boolean, reflect: true }) card = false;

  /** Vertical cards only. Rounded corners (Step Card/Round) instead of sharp (Step Card/Sharp). */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** Compact: the current step number in "STEP n OF m". */
  @property({ attribute: "current-step" }) currentStep: string | number = "";

  /** Compact: the total number of steps in "STEP n OF m". */
  @property({ attribute: "total-steps" }) totalSteps: string | number = "";

  /** Compact: the current step's title. */
  @property({ type: String }) label = "";

  /** Compact: the current step's subtitle. */
  @property({ type: String }) subtitle?: string;

  /**
   * Draws subtitles: the current step's on compact, and every step's on the other arrangements.
   * `show-subtitle="false"` hides them all, whatever each step sets.
   */
  @property({ attribute: "show-subtitle", converter: { fromAttribute: (v: string | null) => v !== "false" } })
  showSubtitle = true;

  /** Accessible name of the stepper, e.g. "Checkout". */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel = "Progress";

  /**
   * The current progress of the stepper, represented as a floating point number (0.0-1.0).
   * This number is used by the progress bar. Kept from the old stepper; not in the spec.
   */
  @property({ type: Number }) progress: number = 0;

  /**
   * Set to true when not all stepper items can be displayed on screen at once.
   * Displays a button that allows users to view additional stepper items.
   * User can set their own functionality to the button. Kept from the old stepper; not in the spec.
   */
  @property({ type: Boolean }) showOverflowButton: boolean = false;

  /** Set to true for the progress bar to be shown. Kept from the old stepper; not in the spec. */
  @property({ type: Boolean }) progressBar: boolean = false;

  private get compact() {
    return this.variant === "horizontal" && this.size === "compact";
  }

  /** Tells every item which part to draw, its position, whether it is last, and the card corners. */
  private syncItems = () => {
    const items = [...this.children].filter((el): el is ZetaStepperItem => el.localName === "zeta-stepper-item");
    const kind = this.compact ? "segment" : this.variant === "horizontal" ? "horizontal" : this.card ? "card" : "vertical";
    items.forEach((item, i) => {
      item.kind = kind;
      item.position = i + 1;
      item.last = i === items.length - 1;
      item.shape = this.rounded ? "rounded" : "sharp";
      item.parentShowSubtitle = this.showSubtitle;
    });
  };

  protected updated(changed: PropertyValues<this>) {
    const synced = ["variant", "size", "card", "rounded", "showSubtitle"] as const;
    if (synced.some(key => changed.has(key))) this.syncItems();
  }

  protected render() {
    if (this.compact) {
      return html`<nav aria-label=${this.accessibleLabel}>
        <div class="summary">
          <p class="step-info">
            <span>STEP</span> <span>${this.currentStep}</span> <span>OF</span> <span>${this.totalSteps}</span>
          </p>
          <div class="heading">
            <p class="title">${this.label}</p>
            ${this.showSubtitle && this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : nothing}
          </div>
        </div>
        <div class="segments" aria-hidden="true"><slot @slotchange=${this.syncItems}></slot></div>
      </nav>`;
    }
    return html`
      <nav aria-label=${this.accessibleLabel}>
        <div class="steps" role="list"><slot @slotchange=${this.syncItems}></slot></div>
        ${this.showOverflowButton
          ? html`<zeta-button flavor="outline-subtle" class="stepper-item-overflow-button"
              ><zeta-icon>chevron_right</zeta-icon></zeta-button
            >`
          : nothing}
      </nav>
      ${this.progressBar ? html`<zeta-progress-bar value=${this.progress}></zeta-progress-bar>` : nothing}
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper": ZetaStepper;
  }
}
