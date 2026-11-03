import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./search.styles.js";
import { Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";
import { FormField, type ZetaInputType } from "../../mixins/form-field.js";
import { ContourableThree } from "../../mixins/contourable-three.js";

//TODO onsubmit

/** A text input field for entering search queries.
 *
 * Supports speech recognition search on Chrome. While there is text, a clear button appears before the trailing
 * control. `flavor` picks a bordered, gradient or ghost field; `shape` its corners; `size` its height.
 *
 * @event {FocusEvent} focus - Fired when the search field is focused
 * @event {FocusEvent} blur - Fired when the search field is blurred
 * @event {Event} change - Fired when the search value changes and is committed
 * @event {Event} submit - Fired when the enter is pressed within the search box
 * @event {InputEvent} input - Fired when the search value changes
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8811
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-search--docs
 *
 * @slot leading - Leading icon
 */
@customElement("zeta-search")
export class ZetaSearch extends FormField(Size(ContourableThree(Interactive(LitElement)))) {
  override type: Extract<ZetaInputType, "search"> = "search";

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: "open"
  };

  @query("input") private readonly inputEl!: HTMLElement | null;
  _round: false | true | "full" = false;

  override handleChange(_event: Event) {
    return _event;
    // this.dispatchEvent(new ZetaInputChangeEvent().toEvent());
  }

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
  @property({ type: Boolean, reflect: true }) block = false;

  /** Show microphone icon: the trailing voice-input control (spec: hasTrailing). Shown where speech recognition is
   * available. */
  @property({ type: Boolean, reflect: true }) hasIcon = false;

  /** Shows the leading magnifier. */
  @property({ type: Boolean, reflect: true, attribute: "has-leading" }) hasLeading = true;

  /** default: a bordered field for forms. gradient: a highlight such as an AI search. ghost: no border at rest, for a
   * surface that already bounds it. */
  @property({ type: String, reflect: true }) flavor: "default" | "gradient" | "ghost" = "default";

  /** Accessible name of the clear button. */
  @property({ type: String, attribute: "clear-label" }) clearLabel = "Clear search";

  /** Accessible name of the voice input button. */
  @property({ type: String, attribute: "voice-label" }) voiceLabel = "Search by voice";

  private resetInput = () => {
    this.value = "";
    this.dispatchEvent(new InputEvent("input", { inputType: "deleteContent" }));
  };

  /* eslint-disable @typescript-eslint/no-unsafe-call */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  private handleSpeechRecognition = () => {
    const SpeechRecognition = (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const s = new SpeechRecognition();

      s.onspeechend = () => {
        s.stop();
      };

      s.onresult = (e: any) => {
        this.value = e.results[0][0].transcript;
      };

      s.start();
    }
  };

  private renderRightIcon = () => {
    if (("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && this.hasIcon) {
      return html` ${this.value ? html`<div class="divider"></div>` : nothing}
        <button type="button" class="control right" aria-label=${this.voiceLabel} ?disabled=${this.disabled} @click=${() => this.handleSpeechRecognition()}>
          <zeta-icon .rounded=${this.shape != "sharp"}>microphone</zeta-icon>
        </button>`;
    } else {
      return nothing;
    }
  };

  private renderCancelIcon = () => {
    return this.value
      ? html`<button type="button" class="control clear" aria-label=${this.clearLabel} ?disabled=${this.disabled} @click=${this.resetInput}>
          <zeta-icon .rounded=${this.shape != "sharp"}>cancel</zeta-icon>
        </button>`
      : nothing;
  };

  protected render() {
    return html`
      <form
        class="contourable-target ${this.value ? "has-value" : ""}"
        @submit=${(e: Event) => {
          e.preventDefault();
          return e;
        }}
      >
        ${this.hasLeading ? html`<zeta-icon id="search-icon" aria-hidden="true" .rounded=${this.shape != "sharp"}>search</zeta-icon>` : nothing}
        ${super.render()} ${this.renderCancelIcon()} ${this.renderRightIcon()}
      </form>
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-search": ZetaSearch;
  }
}
