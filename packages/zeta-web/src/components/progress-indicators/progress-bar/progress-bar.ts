import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./progress-bar.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import { styleMap } from "lit/directives/style-map.js";

/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A determinate bar reports `value` (a share of 1, or of `maxValue`). `indeterminate` slides a short segment along the
 * track. `buffering` adds a band for what has preloaded (`buffer`); the indicator never runs past it, and an
 * indeterminate bar never shows it. The bar is a `progressbar` named by its label.
 *
 * @slot trailing - Supporting detail at the trailing end of the label row (spec: Show More Details).
 * @cssproperty --progress-bar-color The color of the indicator. Defaults to foreground/link.
 * @cssproperty --progress-bar-buffer-color The color of the buffer band.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-1997
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-progress--docs
 */
@customElement("zeta-progress-bar")
export class ZetaProgressBar extends Contourable(LitElement) {
  /** The thickness: small (8px) for a bar beside other content, large (16px) when progress is the main thing. `thin`
   * and `medium` are the old names for small and large. */
  @property({ type: String, reflect: true }) size: "small" | "large" | "thin" | "medium" = "large";

  /** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
  @property({ type: Boolean, reflect: true }) indeterminate?: boolean;

  /**
   * The % complete of the process indicator.
   * Input a floating point number to represent a percentage. Values must be between 0.0-1.0.
   * If maxValue is set, value can be any number between 0 and maxValue.
   */
  @property({ type: Number }) value: number = 0;

  /** If maxValue is null treat value as a percentage */
  @property({ type: Number }) maxValue?: number;

  /** The label for the progress indicator. The label row shows when it is set. */
  @property({ type: String }) label?: string;

  /** Shows the buffer band for what has preloaded. Determinate bars only. */
  @property({ type: Boolean, reflect: true }) buffering?: boolean;

  /** How much has preloaded, on the same scale as value. The indicator never runs past it. */
  @property({ type: Number }) buffer: number = 0;

  /** Shows the unfilled track behind the indicator, and the buffer band with it. */
  @property({ type: Boolean, reflect: true, attribute: "show-track" }) showTrack = true;

  @state() private hasTrailing = false;

  private share(n: number) {
    return Math.max(0, Math.min(1, this.maxValue ? n / this.maxValue : n));
  }

  protected override render() {
    const band = this.buffering && !this.indeterminate;
    const bufferShare = this.share(this.buffer);
    const valueShare = band ? Math.min(this.share(this.value), bufferShare) : this.share(this.value);
    const max = this.maxValue ?? 1;
    const showLabelRow = !!this.label || this.hasTrailing;

    return html`<div class="progress-bar">
      <div class="label-row" ?hidden=${!showLabelRow}>
        <span class="label" id="label">${this.label ?? nothing}</span>
        <span class="trailing" ?hidden=${!this.hasTrailing}>
          <slot name="trailing" @slotchange=${(e: Event) => (this.hasTrailing = (e.target as HTMLSlotElement).assignedNodes().length > 0)}></slot>
        </span>
      </div>
      <div
        class="track"
        role="progressbar"
        aria-labelledby=${this.label ? "label" : nothing}
        aria-label=${this.label ? nothing : "Progress"}
        aria-valuemin="0"
        aria-valuemax=${this.indeterminate ? nothing : max}
        aria-valuenow=${this.indeterminate ? nothing : valueShare * max}
      >
        ${band && this.showTrack ? html`<div class="buffer" style=${styleMap({ width: `${bufferShare * 100}%` })}></div>` : nothing}
        <div class="bar" style=${!this.indeterminate ? styleMap({ width: `${valueShare * 100}%` }) : nothing}></div>
      </div>
    </div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-progress-bar": ZetaProgressBar;
  }
}
