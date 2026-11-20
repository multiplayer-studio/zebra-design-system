import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing, type PropertyValues, type TemplateResult } from "lit";
import styles from "./stepper-item.styles.js";
import "../icon/icon.js";

/** Where a step stands. One step in a stepper is `active`. */
export type StepperItemStatus = "default" | "complete" | "active" | "partial" | "error" | "disabled";

/** Which step part the item draws. Set by the parent zeta-stepper. */
export type StepperItemKind = "horizontal" | "vertical" | "card" | "segment";

/** @deprecated Use `status`. `success` is `complete`. */
export type StepperItemFlavor = "partial" | "success" | "active" | "default";

const FLAVOR_STATUS: Record<StepperItemFlavor, StepperItemStatus> = {
  partial: "partial",
  success: "complete",
  active: "active",
  default: "default"
};

const STATUS_TEXT: Record<StepperItemStatus, string> = {
  default: "not started",
  complete: "complete",
  active: "current step",
  partial: "in progress",
  error: "failed",
  disabled: "unavailable"
};

/** Absent means "decide for me"; "false" is the only way to turn the boolean off from HTML. */
const optionalBoolean = { fromAttribute: (v: string | null) => (v === null ? undefined : v !== "false") };

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
@customElement("zeta-stepper-item")
export class ZetaStepperItem extends LitElement {
  /** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
  @property({ type: String, reflect: true }) status: StepperItemStatus = "default";

  /** @deprecated Use `status`. Sets `status`, with `success` as `complete`. */
  @property({ type: String, reflect: true }) flavor?: StepperItemFlavor;

  /** Names the step in a word or two. Wins over the slotted label. */
  @property({ type: String }) label = "";

  /** A qualifier under the label, a word or two. Drawn when `show-subtitle` is on. */
  @property({ type: String }) subtitle?: string;

  /** Draws the subtitle. Defaults to on when a subtitle is given; `show-subtitle="false"` hides it. */
  @property({ attribute: "show-subtitle", converter: optionalBoolean }) showSubtitle?: boolean;

  /** Draws the connector to the next step. By default every step but the last draws it. */
  @property({ attribute: "show-line", converter: optionalBoolean }) showLine?: boolean;

  /** The number in the indicator. Defaults to the step's position. complete and error show a glyph instead. */
  @property({ attribute: "step-number" }) stepNumber?: string | number;

  /** Makes the step's text a button that fires `select`, for going back to a step. Only the focus ring shows it. */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /** Shows a pen on the indicator while the step is being edited. Kept from the old item; not in the spec. */
  @property({ type: Boolean, reflect: true }) editing = false;

  /** Which step part to draw. Set by the parent zeta-stepper. */
  @property({ type: String, reflect: true }) kind: StepperItemKind = "horizontal";

  /** Card corners. Set by the parent's `rounded`. */
  @property({ type: String, reflect: true }) shape: "rounded" | "sharp" = "sharp";

  /** The step's 1-based position. Set by the parent zeta-stepper. */
  @property({ attribute: false }) position = 0;

  /** Whether this is the last step. Set by the parent zeta-stepper. */
  @property({ attribute: false }) last = false;

  /** False when the parent zeta-stepper's `show-subtitle` is off, which hides this step's subtitle too. */
  @property({ attribute: false }) parentShowSubtitle = true;

  connectedCallback(): void {
    // @ts-expect-error-next-line
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.setAttribute("role", "listitem");
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("flavor") && this.flavor) this.status = FLAVOR_STATUS[this.flavor];
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("status")) {
      if (this.status === "active") this.setAttribute("aria-current", "step");
      else this.removeAttribute("aria-current");
    }
    this.toggleAttribute("has-line", this.hasLine);
  }

  private get hasLine() {
    return (this.kind === "horizontal" || this.kind === "vertical") && (this.showLine ?? !this.last);
  }

  private indicator(): TemplateResult {
    const glyph = this.status === "complete" ? "check_mark" : this.status === "error" ? "priority" : null;
    return html`<span class="indicator" part="indicator" aria-hidden="true">
      ${glyph ? html`<zeta-icon size="small" name=${glyph}></zeta-icon>` : (this.stepNumber ?? (this.position || nothing))}
      ${this.editing ? html`<zeta-icon class="edit" size="small" name="edit"></zeta-icon>` : nothing}
    </span>`;
  }

  private text(): TemplateResult {
    const showSubtitle = this.parentShowSubtitle && (this.showSubtitle ?? !!this.subtitle) && !!this.subtitle;
    const content = html`<span class="label">${this.label || html`<slot></slot>`}</span>${
      showSubtitle ? html`<span class="subtitle">${this.subtitle}</span>` : nothing
    }<span class="sr">, ${STATUS_TEXT[this.status]}</span>`;
    return this.selectable && this.status !== "disabled"
      ? html`<button type="button" class="text" @click=${this.handleSelect}>${content}</button>`
      : html`<span class="text">${content}</span>`;
  }

  private handleSelect = () => {
    this.dispatchEvent(new CustomEvent("select", { detail: { position: this.position }, bubbles: true, composed: true }));
  };

  protected render() {
    switch (this.kind) {
      case "segment":
        return nothing;
      case "card":
        return html`${this.indicator()}${this.text()}`;
      case "vertical":
        return html`<span class="rail"
            >${this.indicator()}${this.hasLine ? html`<span class="line" aria-hidden="true"></span>` : nothing}</span
          >${this.text()}`;
      default:
        return html`<span class="head">${this.indicator()}${this.text()}</span>${
          this.hasLine ? html`<span class="track" aria-hidden="true"><span class="line"></span></span>` : nothing
        }`;
    }
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper-item": ZetaStepperItem;
  }
}
