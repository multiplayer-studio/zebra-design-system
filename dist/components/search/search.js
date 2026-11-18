var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./search.styles.js";
import { Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";
import { FormField } from "../../mixins/form-field.js";
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
let ZetaSearch = class ZetaSearch extends FormField(Size(ContourableThree(Interactive(LitElement)))) {
    constructor() {
        super(...arguments);
        this.type = "search";
        this._round = false;
        /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
        this.block = false;
        /** Show microphone icon: the trailing voice-input control (spec: hasTrailing). Shown where speech recognition is
         * available. */
        this.hasIcon = false;
        /** Shows the leading magnifier. */
        this.hasLeading = true;
        /** default: a bordered field for forms. gradient: a highlight such as an AI search. ghost: no border at rest, for a
         * surface that already bounds it. */
        this.flavor = "default";
        /** Accessible name of the clear button. */
        this.clearLabel = "Clear search";
        /** Accessible name of the voice input button. */
        this.voiceLabel = "Search by voice";
        this.resetInput = () => {
            this.value = "";
            this.dispatchEvent(new InputEvent("input", { inputType: "deleteContent" }));
        };
        /* eslint-disable @typescript-eslint/no-unsafe-call */
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        /* eslint-disable @typescript-eslint/no-explicit-any */
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        this.handleSpeechRecognition = () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const s = new SpeechRecognition();
                s.onspeechend = () => {
                    s.stop();
                };
                s.onresult = (e) => {
                    this.value = e.results[0][0].transcript;
                };
                s.start();
            }
        };
        this.renderRightIcon = () => {
            if (("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && this.hasIcon) {
                return html ` ${this.value ? html `<div class="divider"></div>` : nothing}
        <button type="button" class="control right" aria-label=${this.voiceLabel} ?disabled=${this.disabled} @click=${() => this.handleSpeechRecognition()}>
          <zeta-icon .rounded=${this.shape != "sharp"}>microphone</zeta-icon>
        </button>`;
            }
            else {
                return nothing;
            }
        };
        this.renderCancelIcon = () => {
            return this.value
                ? html `<button type="button" class="control clear" aria-label=${this.clearLabel} ?disabled=${this.disabled} @click=${this.resetInput}>
          <zeta-icon .rounded=${this.shape != "sharp"}>cancel</zeta-icon>
        </button>`
                : nothing;
        };
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
        mode: "open"
    }; }
    handleChange(_event) {
        return _event;
        // this.dispatchEvent(new ZetaInputChangeEvent().toEvent());
    }
    focus() {
        this.inputEl?.focus();
    }
    blur() {
        this.inputEl?.blur();
    }
    render() {
        return html `
      <form
        class="contourable-target ${this.value ? "has-value" : ""}"
        @submit=${(e) => {
            e.preventDefault();
            return e;
        }}
      >
        ${this.hasLeading ? html `<zeta-icon id="search-icon" aria-hidden="true" .rounded=${this.shape != "sharp"}>search</zeta-icon>` : nothing}
        ${super.render()} ${this.renderCancelIcon()} ${this.renderRightIcon()}
      </form>
    `;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    query("input")
], ZetaSearch.prototype, "inputEl", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSearch.prototype, "block", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSearch.prototype, "hasIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "has-leading" })
], ZetaSearch.prototype, "hasLeading", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSearch.prototype, "flavor", void 0);
__decorate([
    property({ type: String, attribute: "clear-label" })
], ZetaSearch.prototype, "clearLabel", void 0);
__decorate([
    property({ type: String, attribute: "voice-label" })
], ZetaSearch.prototype, "voiceLabel", void 0);
ZetaSearch = __decorate([
    customElement("zeta-search")
], ZetaSearch);
export { ZetaSearch };
//# sourceMappingURL=search.js.map