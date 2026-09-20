import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import type { PropertyValues } from "lit";
import styles from "./search.styles.js";
import { Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";
import { FormField, type ZetaInputType } from "../../mixins/form-field.js";
import { ContourableThree } from "../../mixins/contourable-three.js";
import type { SearchFlavor } from "../../mixins/flavor.js";

//TODO onsubmit

/** A text input field for entering search queries.
 *
 * Supports speech recognition search on Chrome.
 *
 * @event {FocusEvent} focus - Fired when the search field is focused
 * @event {FocusEvent} blur - Fired when the search field is blurred
 * @event {Event} change - Fired when the search value changes and is committed
 * @event {Event} submit - Fired when the enter is pressed within the search box
 * @event {InputEvent} input - Fired when the search value changes
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21286-35997
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

  /**
   * The flavor of the component determines the visual style of the component.
   *
   * @type {SearchFlavor}
   *
   * @defaultValue "default"
   *
   * @remarks
   * Supported values for `flavor`:
   * - `"default"`
   * - `"ghost"`
   * - `"gradient"`
   */
  @property({ type: String, reflect: true }) flavor: SearchFlavor = "default";

  @query("input") private readonly inputEl!: HTMLElement | null;
  _round: false | true | "full" = false;

  private lastInteractionType: "keyboard" | "mouse" = "mouse";

  protected override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    document.addEventListener(
      "mousedown",
      () => {
        this.lastInteractionType = "mouse";
      },
      true
    );
    document.addEventListener(
      "keydown",
      e => {
        if (e.key === "Tab") {
          this.lastInteractionType = "keyboard";
        }
      },
      true
    );
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    if (input) {
      input.addEventListener("focus", () => {
        this.setAttribute("data-focus-source", this.lastInteractionType);
      });
      input.addEventListener("blur", () => {
        this.removeAttribute("data-focus-source");
      });
      input.addEventListener("input", () => {
        if (this.lastInteractionType === "keyboard") {
          this.setAttribute("data-focus-source", "mouse");
        }
      });
    }
  }

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

  /** Show the leading search icon. */
  @property({ type: Boolean, reflect: true }) hasLeading = true;

  /** Show the trailing microphone icon. */
  @property({ type: Boolean, reflect: true }) hasTrailing = false;

  /** Show microphone icon.
   *
   * @deprecated Use `hasTrailing` instead.
   */
  @property({ type: Boolean, reflect: true }) hasIcon = false;

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

  private getIconSize = (size: string) => {
    switch (size) {
      case "small":
        return "small";
      case "medium":
        return "medium";
      case "large":
        return "medium";
      default:
        return size;
    }
  };

  private renderRightIcon = () => {
    if (("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && (this.hasTrailing || this.hasIcon)) {
      return html` ${this.value ? html`<div class="divider"></div>` : nothing}
        <zeta-icon @click=${() => this.handleSpeechRecognition()} .rounded=${this.shape != "sharp"} .size=${this.getIconSize(this.size)} class="right"
          >microphone</zeta-icon
        >`;
    } else {
      return nothing;
    }
  };

  private renderCancelIcon = () => {
    return this.value
      ? html`<zeta-icon @click=${this.resetInput} .rounded=${this.shape != "sharp"} .size=${this.getIconSize(this.size)}>cancel</zeta-icon>`
      : nothing;
  };

  protected render() {
    return html`
      <form
        class="contourable-target"
        @submit=${(e: Event) => {
          e.preventDefault();
          return e;
        }}
      >
        ${this.hasLeading ? html`<zeta-icon id="search-icon" .rounded=${this.shape != "sharp"} .size=${this.getIconSize(this.size)}>search</zeta-icon>` : nothing}
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
