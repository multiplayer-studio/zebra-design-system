import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./slider.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import { ZetaRangeSliderEvent, ZetaSliderEvent } from "../../events.js";

export * from "./slider-input-field/slider-input-field.js";

type Thumb = "lower" | "upper";

/** Sliders choose a value along a range by dragging a thumb. `stepIncrement` marks the valid stops and snaps to them,
 * and `type="range"` adds a second thumb so a span is chosen instead of a single value.
 *
 * Each thumb is a slider for assistive technology, with its own name and value, and moves with the arrow, Page and
 * Home/End keys as well as a pointer. Pressing a thumb or focusing it from the keyboard colours the fill and both
 * thumbs; only the thumb under the pointer grows.
 *
 * @event {CustomEvent<ZetaSliderEventDetail>} change - Fired when the value of a default slider changes: at the end of a drag, on a track press and on each key press. Contains `value:number`.
 * @event {CustomEvent<ZetaRangeSliderEventDetail>} change - Fired when a range slider's values change. Contains `min:number` and `max:number`.
 * @event input - Fired while a thumb is being dragged.
 *
 * @figma https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6125-1084
 * @storybook ?path=/docs/components-slider--docs
 */
@customElement("zeta-slider")
export class ZetaSlider extends Contourable(LitElement) {
  /** Disables the slider. The track and thumbs drop to the disabled colour. */
  @property({ type: Boolean, reflect: true }) disabled?: boolean;

  /** Puts a stop at every increment and snaps the thumbs to the nearest one (spec: stepped). */
  @property({ type: Number }) stepIncrement?: number;

  /** `range` adds a second thumb so a span is chosen (spec: range). */
  @property({ type: String }) type: "default" | "range" = "default";

  /** The value of a default slider. */
  @property({ type: Number, reflect: true }) value: number = 50;

  /** The start of a range slider's span. */
  @property({ type: Number, reflect: true }) lowerValue: number = 10;

  /** The end of a range slider's span. */
  @property({ type: Number, reflect: true }) upperValue: number = 90;

  /** The minimum value. */
  @property({ type: Number }) min: number = 0;

  /** The maximum value. */
  @property({ type: Number }) max: number = 100;

  /** Accessible name of a default slider's thumb. */
  @property({ type: String }) label = "Value";

  /** Accessible name of a range slider's start thumb. */
  @property({ type: String, attribute: "lower-label" }) lowerLabel = "Minimum";

  /** Accessible name of a range slider's end thumb. */
  @property({ type: String, attribute: "upper-label" }) upperLabel = "Maximum";

  @query(".slider") private slider!: HTMLDivElement;
  @query(".track") track!: HTMLDivElement;

  @state() private dragging: Thumb | null = null;

  private get isRange() {
    return this.type === "range";
  }

  private get step() {
    return this.stepIncrement && this.stepIncrement > 0 ? this.stepIncrement : 1;
  }

  private clamp(v: number, lo = this.min, hi = this.max) {
    return Math.min(hi, Math.max(lo, v));
  }

  /** Snaps to the nearest stop counted from the minimum. */
  private snap(v: number) {
    const stepped = this.min + Math.round((v - this.min) / this.step) * this.step;
    return Number(stepped.toFixed(10));
  }

  private percent(v: number) {
    const span = this.max - this.min;
    return span > 0 ? ((this.clamp(v) - this.min) / span) * 100 : 0;
  }

  private thumbValue(thumb: Thumb) {
    return this.isRange ? (thumb === "lower" ? this.lowerValue : this.upperValue) : this.value;
  }

  /** Sets one thumb, held between the minimum, the maximum and (in range mode) the other thumb. */
  private setThumb(thumb: Thumb, raw: number) {
    let v = this.snap(this.clamp(raw));
    if (this.isRange) {
      v = thumb === "lower" ? Math.min(v, this.upperValue) : Math.max(v, this.lowerValue);
      if (thumb === "lower") this.lowerValue = v;
      else this.upperValue = v;
    } else this.value = v;
  }

  private emitChange() {
    if (this.isRange) this.dispatchEvent(new ZetaRangeSliderEvent({ min: this.lowerValue, max: this.upperValue }).toEvent());
    else this.dispatchEvent(new ZetaSliderEvent({ value: this.value }).toEvent());
  }

  private valueAt(clientX: number) {
    const r = this.track.getBoundingClientRect();
    const t = r.width > 0 ? (clientX - r.left) / r.width : 0;
    return this.min + Math.min(1, Math.max(0, t)) * (this.max - this.min);
  }

  /** The thumb a press should move: the one pressed, or else the nearer one. */
  private thumbFor(e: PointerEvent, v: number): Thumb {
    const pressed = (e.composedPath()[0] as HTMLElement).dataset?.thumb as Thumb | undefined;
    if (pressed || !this.isRange) return pressed ?? "lower";
    return Math.abs(v - this.lowerValue) <= Math.abs(v - this.upperValue) ? "lower" : "upper";
  }

  private onPointerDown = (e: PointerEvent) => {
    if (this.disabled || e.button !== 0) return;
    const v = this.valueAt(e.clientX);
    const thumb = this.thumbFor(e, v);
    const before = this.thumbValue(thumb);
    this.dragging = thumb;
    if (!(e.composedPath()[0] as HTMLElement).dataset?.thumb) this.setThumb(thumb, v);
    this.slider.setPointerCapture?.(e.pointerId);
    this.renderRoot.querySelector<HTMLElement>(`[data-thumb="${thumb}"]`)?.focus({ preventScroll: true });
    const move = (ev: PointerEvent) => {
      this.setThumb(thumb, this.valueAt(ev.clientX));
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    };
    const up = () => {
      this.slider.removeEventListener("pointermove", move);
      this.slider.removeEventListener("pointerup", up);
      this.slider.removeEventListener("pointercancel", up);
      this.dragging = null;
      if (this.thumbValue(thumb) !== before) this.emitChange();
    };
    this.slider.addEventListener("pointermove", move);
    this.slider.addEventListener("pointerup", up);
    this.slider.addEventListener("pointercancel", up);
    e.preventDefault();
  };

  private onKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    const thumb = (e.currentTarget as HTMLElement).dataset.thumb as Thumb;
    const v = this.thumbValue(thumb);
    const page = Math.max(this.step, this.snap(this.min + (this.max - this.min) / 10) - this.min);
    const next: Record<string, number> = {
      ArrowRight: v + this.step,
      ArrowUp: v + this.step,
      ArrowLeft: v - this.step,
      ArrowDown: v - this.step,
      PageUp: v + page,
      PageDown: v - page,
      Home: this.min,
      End: this.max
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    this.setThumb(thumb, next[e.key]);
    if (this.thumbValue(thumb) !== v) this.emitChange();
  };

  private renderThumb(thumb: Thumb, id: string) {
    const v = this.thumbValue(thumb);
    const name = this.isRange ? (thumb === "lower" ? this.lowerLabel : this.upperLabel) : this.label;
    const lo = this.isRange && thumb === "upper" ? this.lowerValue : this.min;
    const hi = this.isRange && thumb === "lower" ? this.upperValue : this.max;
    return html`<div
      id=${id}
      class="handle ${this.dragging === thumb ? "dragging" : ""}"
      data-thumb=${thumb}
      role="slider"
      tabindex=${this.disabled ? -1 : 0}
      aria-label=${name}
      aria-valuemin=${lo}
      aria-valuemax=${hi}
      aria-valuenow=${v}
      aria-orientation="horizontal"
      aria-disabled=${this.disabled ? "true" : nothing}
      style=${styleMap({ left: `${this.percent(v)}%` })}
      @keydown=${this.onKeyDown}
    ></div>`;
  }

  private renderSteps() {
    if (!this.stepIncrement || this.stepIncrement <= 0 || this.max <= this.min) return nothing;
    const count = Math.floor((this.max - this.min) / this.stepIncrement);
    const dots = Array.from({ length: count + 1 }, (_, i) => this.percent(this.min + i * this.stepIncrement!));
    return html`<div class="step-container">${dots.map(p => html`<div class="step" style=${styleMap({ left: `${p}%` })}></div>`)}</div>`;
  }

  protected override render() {
    const start = this.isRange ? this.percent(this.lowerValue) : 0;
    const end = this.percent(this.isRange ? this.upperValue : this.value);
    return html`
      <div class="slider ${this.dragging ? "dragging" : ""}" @pointerdown=${this.onPointerDown}>
        <div id="track" class="track"></div>
        <div id="selected-area" class="selected-area" style=${styleMap({ left: `${start}%`, right: `${100 - end}%` })}></div>
        ${this.renderSteps()} ${this.renderThumb("lower", "handle-l")} ${this.isRange ? this.renderThumb("upper", "handle-r") : nothing}
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-slider": ZetaSlider;
  }
}
