import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { base, horizontal, vertical, card, segment } from "./step.styles.js";
import "../icon/icon.js";

/** Where a step stands. One step in a stepper is `active`. */
export type StepStatus = "default" | "complete" | "active" | "partial" | "error" | "disabled";
/** Step Card corners: Figma's Step Card/Round and Step Card/Sharp sets. */
export type StepCardShape = "rounded" | "sharp";

const STATUS_TEXT: Record<StepStatus, string> = {
  default: "not started", complete: "complete", active: "current step", partial: "in progress", error: "failed", disabled: "unavailable",
};

/** Absent means "decide for me"; "false" is the only way to turn a boolean off from HTML. */
const optionalBoolean = { fromAttribute: (v: string | null) => (v === null ? undefined : v !== "false") };

/**
 * What every step shares: status, label, subtitle, number and the indicator.
 * Not registered; each kind below is.
 */
export class ZdsStepBase extends LitElement {
  /** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
  @property({ type: String, reflect: true }) status: StepStatus = "default";

  /** Names the step in a word or two. */
  @property({ type: String }) label = "";

  /** A qualifier under the label, a word or two. Drawn when `show-subtitle` is on. */
  @property({ type: String }) subtitle: string | null = null;

  /** Draws the subtitle. Defaults to on when a subtitle is given; `show-subtitle="false"` hides it. */
  @property({ attribute: "show-subtitle", converter: optionalBoolean }) showSubtitle: boolean | undefined = undefined;

  /** The number in the indicator. Defaults to the step's position in its stepper. complete and error show a glyph instead. */
  @property({ type: String, attribute: "step-number" }) stepNumber: string | null = null;

  /**
   * Makes the step's text a button that fires `zds-step-select`, for going
   * back to a step. Figma models no interaction states, so the only visible
   * change is the focus ring.
   */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /** Set by the stepper: the step's 1-based position, used when `step-number` is absent. */
  @property({ attribute: false }) position = 0;

  /** Set by `<zds-horizontal-stepper>`: false when its `show-subtitle` is off, which hides this step's subtitle too. */
  @property({ attribute: false }) parentShowSubtitle = true;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "listitem");
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("status")) {
      if (this.status === "active") this.setAttribute("aria-current", "step");
      else this.removeAttribute("aria-current");
    }
  }

  protected indicator(): TemplateResult {
    const glyph = this.status === "complete" ? "check-mark" : this.status === "error" ? "priority" : null;
    return html`<span class="indicator" part="indicator" aria-hidden="true">
      ${glyph ? html`<zds-icon name=${glyph} size="small"></zds-icon>` : this.stepNumber ?? (this.position || nothing)}
    </span>`;
  }

  protected text(): TemplateResult {
    const showSubtitle = this.parentShowSubtitle && (this.showSubtitle ?? this.subtitle != null) && this.subtitle != null;
    const content = html`<span class="label" part="label">${this.label}</span>${showSubtitle
      ? html`<span class="subtitle" part="subtitle">${this.subtitle}</span>` : nothing}<span class="sr">, ${STATUS_TEXT[this.status]}</span>`;
    return this.selectable && this.status !== "disabled"
      ? html`<button type="button" class="text" @click=${this.#select}>${content}</button>`
      : html`<span class="text">${content}</span>`;
  }

  #select = () => {
    this.dispatchEvent(new CustomEvent("zds-step-select", { bubbles: true, composed: true, detail: { position: this.position } }));
  };
}

/** A step that draws a connector to the next one. */
class ZdsStepWithLine extends ZdsStepBase {
  /** Draws the connector to the next step. By default every step but the last draws it; `show-line="false"` drops it. */
  @property({ attribute: "show-line", converter: optionalBoolean }) showLine: boolean | undefined = undefined;

  /** Set by the stepper on its last step, which then drops its line unless `show-line` says otherwise. */
  @property({ type: Boolean, reflect: true }) last = false;

  protected get hasLine() { return this.showLine ?? !this.last; }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);
    this.toggleAttribute("has-line", this.hasLine);
  }
}

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
@customElement("zds-step-horizontal")
export class ZdsStepHorizontal extends ZdsStepWithLine {
  static styles = [base, horizontal];

  protected render() {
    return html`<span class="head">${this.indicator()}${this.text()}</span>${this.hasLine
      ? html`<span class="track" aria-hidden="true"><span class="line"></span></span>` : nothing}`;
  }
}

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
@customElement("zds-step-vertical")
export class ZdsStepVertical extends ZdsStepWithLine {
  static styles = [base, vertical];

  protected render() {
    return html`<span class="rail">${this.indicator()}${this.hasLine
      ? html`<span class="line" aria-hidden="true"></span>` : nothing}</span>${this.text()}`;
  }
}

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
@customElement("zds-step-card")
export class ZdsStepCard extends ZdsStepBase {
  static styles = [base, card];

  /** Corner style. Inside `<zds-vertical-stepper>` the stepper's `rounded` sets it. */
  @property({ type: String, reflect: true }) shape: StepCardShape = "sharp";

  protected render() {
    return html`${this.indicator()}${this.text()}`;
  }
}

/**
 * One division of the compact `<zds-horizontal-stepper>`'s bar. It carries no
 * text: the summary above the bar does the naming. Never interactive.
 *
 * @spec specs/stepper/stepper.spec.json
 */
@customElement("zds-step-segment")
export class ZdsStepSegment extends LitElement {
  static styles = segment;

  /** Fills neither, the leading half (partial) or both halves of the segment. */
  @property({ type: String, reflect: true }) status: StepStatus = "default";

  protected render() {
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-step-horizontal": ZdsStepHorizontal;
    "zds-step-vertical": ZdsStepVertical;
    "zds-step-card": ZdsStepCard;
    "zds-step-segment": ZdsStepSegment;
  }
}
