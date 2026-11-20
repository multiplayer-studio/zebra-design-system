var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./slider.styles.js";
/** Above this many stops the dots would crowd into a solid line, so none are drawn. */
const MAX_DOTS = 101;
/**
 * A control for choosing a value along a range by dragging a thumb.
 *
 * Behaviour comes from native `<input type="range">` elements in the shadow
 * root — one, or two in range mode. They provide the `slider` role with its
 * value, minimum and maximum (spec accessibility: "exposed as a number
 * together with its minimum and maximum"), arrow / Page / Home / End keys, and
 * pointer dragging. The track, active fill and step dots are drawn behind
 * them; the inputs' own thumbs are restyled.
 *
 * Mapping from the spec:
 * - `state` is not a property. `disabled` is `disabled`. The larger thumb
 *   size follows the pointer only: the thumb under it, or being dragged, grows,
 *   and the other doesn't, in every state. `selected` is colour only: the fill
 *   and both thumbs take the selected foreground during a drag or while a
 *   thumb has keyboard focus, and the focused thumb also gets a focus ring
 *   (spec "designerClarifications").
 * - `value`, `min`, `max`, `step` and `valueStart` have no Figma reference
 *   (spec blocker "nothing models the value, minimum, maximum or step");
 *   they follow the native range input.
 * - `stepped` draws one dot per stop, derived from min, max and step,
 *   rather than from slotted dots — so the dots sit at the values they mark,
 *   across the whole track (spec warn "the step dots span the full track
 *   only at 50%").
 * - `range` adds a start thumb, and the fill runs between the two thumbs:
 *   a true span, which the Figma structure can't draw (spec warn "range mode
 *   can't show a span that doesn't start at the minimum").
 *
 * In range mode each thumb needs its own name (spec accessibility); set
 * `label` and `start-label`.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the slider with no JavaScript.
 *
 * @fires input - The value is changing (during a drag or a key press).
 * @fires change - The value was committed.
 * @csspart track - The base track.
 * @csspart fill - The active fill.
 *
 * @spec specs/slider/slider.spec.json
 */
let ZdsSlider = class ZdsSlider extends LitElement {
    constructor() {
        super();
        /** Corner treatment of the track and thumb together. Match the controls around it; it carries no meaning. */
        this.shape = "rounded";
        /** The value cannot be changed. Track and thumb drop to the disabled foreground. */
        this.disabled = false;
        /**
         * Only certain values can be chosen: draws a dot at every valid stop. Use
         * it with a coarse `step`. The spec defaults this on; it defaults off here
         * because an HTML boolean attribute can only default to false, and because
         * at the native default step of 1 the dots would crowd into a line.
         */
        this.stepped = false;
        /** Choose a span rather than a value: adds a start thumb, and the fill runs between the two. */
        this.range = false;
        /** Lowest value. */
        this.min = 0;
        /** Highest value. */
        this.max = 100;
        /** Distance between valid values. */
        this.step = 1;
        /** The value — or, in range mode, the end of the span. */
        this.value = 50;
        /** Start of the span, in range mode only. */
        this.valueStart = 0;
        /** Accessible name — for the end thumb in range mode. */
        this.label = null;
        /** Accessible name of the start thumb in range mode. */
        this.startLabel = null;
        /** Field name submitted with a form. In range mode the start and end are submitted under this name, in that order. */
        this.name = null;
        /** A thumb is being dragged: one of the two triggers of the spec's `selected` state (keyboard focus is the other, in CSS). */
        this.dragging = false;
        this.defaults = { value: 50, valueStart: 0 };
        this.startDrag = () => {
            if (this.disabled)
                return;
            this.dragging = true;
            window.addEventListener("pointerup", this.endDrag);
            window.addEventListener("pointercancel", this.endDrag);
        };
        this.endDrag = () => {
            this.dragging = false;
            window.removeEventListener("pointerup", this.endDrag);
            window.removeEventListener("pointercancel", this.endDrag);
        };
        this.internals = this.attachInternals();
    }
    connectedCallback() {
        super.connectedCallback();
        this.defaults = { value: this.value, valueStart: this.valueStart };
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("pointerup", this.endDrag);
        window.removeEventListener("pointercancel", this.endDrag);
    }
    willUpdate(changed) {
        // Keep the pair ordered and inside the bounds, whatever was set.
        if (changed.has("value") || changed.has("valueStart") || changed.has("min") || changed.has("max") || changed.has("range")) {
            this.value = this.clamp(this.value);
            if (this.range)
                this.valueStart = Math.min(this.clamp(this.valueStart), this.value);
        }
    }
    updated(changed) {
        if (changed.has("value") || changed.has("valueStart") || changed.has("range") || changed.has("name")) {
            if (this.range && this.name) {
                const fd = new FormData();
                fd.append(this.name, String(this.valueStart));
                fd.append(this.name, String(this.value));
                this.internals.setFormValue(fd);
            }
            else {
                this.internals.setFormValue(String(this.value));
            }
        }
    }
    /** Called by the browser when a containing `<form>` resets. */
    formResetCallback() {
        this.value = this.defaults.value;
        this.valueStart = this.defaults.valueStart;
    }
    /** Called by the browser when a containing `<fieldset disabled>` changes. */
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    clamp(v) {
        return Math.min(this.max, Math.max(this.min, Number.isFinite(v) ? v : this.min));
    }
    percent(v) {
        const span = this.max - this.min;
        return span > 0 ? ((v - this.min) / span) * 100 : 0;
    }
    onInput(which, e) {
        const input = e.target;
        const v = Number(input.value);
        if (which === "end") {
            this.value = this.range ? Math.max(v, this.valueStart) : v;
            if (this.value !== v)
                input.value = String(this.value);
        }
        else {
            this.valueStart = Math.min(v, this.value);
            if (this.valueStart !== v)
                input.value = String(this.valueStart);
        }
        // The native input event is composed and already reaches outside the
        // shadow root; only change needs re-dispatching from the host.
    }
    onChange() {
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    renderDots() {
        if (!this.stepped || !(this.step > 0))
            return nothing;
        const count = Math.floor((this.max - this.min) / this.step) + 1;
        if (count < 2 || count > MAX_DOTS)
            return nothing;
        const dots = [];
        for (let i = 0; i < count; i++) {
            const pos = this.percent(this.min + i * this.step);
            dots.push(html `<span class="dot" style=${styleMap({ insetInlineStart: `${pos}%` })}></span>`);
        }
        return html `<span class="dots" aria-hidden="true">${dots}</span>`;
    }
    renderInput(which) {
        const isStart = which === "start";
        const v = isStart ? this.valueStart : this.value;
        const name = isStart ? this.startLabel : this.label;
        return html `<input
      class=${classMap({ input: true, start: isStart, end: !isStart })}
      type="range"
      .min=${String(this.min)}
      .max=${String(this.max)}
      .step=${String(this.step)}
      .value=${String(v)}
      ?disabled=${this.disabled}
      aria-label=${name ?? nothing}
      @input=${(e) => this.onInput(which, e)}
      @change=${this.onChange}
      @pointerdown=${this.startDrag}
    />`;
    }
    render() {
        const start = this.range ? this.percent(this.valueStart) : 0;
        const end = this.percent(this.value);
        // When both thumbs meet near the maximum, the start thumb must be on top
        // or it could never be dragged back down.
        const startOnTop = this.range && this.valueStart > (this.min + this.max) / 2;
        return html `
      <div class=${classMap({ control: true, selected: this.dragging, "start-on-top": startOnTop })}>
        <span part="track" class="track">
          <span part="fill" class="fill" style=${styleMap({ insetInlineStart: `${start}%`, inlineSize: `${end - start}%` })}></span>
        </span>
        ${this.renderDots()}
        ${this.range ? this.renderInput("start") : nothing}
        ${this.renderInput("end")}
      </div>
    `;
    }
};
ZdsSlider.styles = styles;
ZdsSlider.formAssociated = true;
__decorate([
    property({ type: String, reflect: true })
], ZdsSlider.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSlider.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSlider.prototype, "stepped", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSlider.prototype, "range", void 0);
__decorate([
    property({ type: Number })
], ZdsSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], ZdsSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], ZdsSlider.prototype, "step", void 0);
__decorate([
    property({ type: Number })
], ZdsSlider.prototype, "value", void 0);
__decorate([
    property({ type: Number, attribute: "value-start" })
], ZdsSlider.prototype, "valueStart", void 0);
__decorate([
    property({ type: String })
], ZdsSlider.prototype, "label", void 0);
__decorate([
    property({ type: String, attribute: "start-label" })
], ZdsSlider.prototype, "startLabel", void 0);
__decorate([
    property({ type: String })
], ZdsSlider.prototype, "name", void 0);
__decorate([
    state()
], ZdsSlider.prototype, "dragging", void 0);
ZdsSlider = __decorate([
    customElement("zds-slider")
], ZdsSlider);
export { ZdsSlider };
