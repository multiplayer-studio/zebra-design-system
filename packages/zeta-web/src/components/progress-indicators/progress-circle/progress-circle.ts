import { customElement, property, state } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import { html, LitElement, nothing, svg } from "lit";
import styles from "./progress-circle.styles.js";
import "../../icon/icon.js";
import "../../button/icon-button/icon-button.js";
import { ZetaCancelUploadEvent } from "../../../events.js";

/** Ring diameters by spec size, measured in Figma (spec warn "Sizes aren't tokens"). */
const DIAMETERS = { xxsmall: 24, xsmall: 36, small: 40, medium: 48, large: 64 } as const;

/** Reads a pixel number as a number, and a size name as itself. */
const sizeConverter = { fromAttribute: (v: string | null) => (v !== null && /^\d+$/.test(v) ? Number(v) : v) };

export type ProgressCircleSize = keyof typeof DIAMETERS | 20 | 24 | 36 | 40 | 48 | 64;

/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A ring whose arc starts at twelve o'clock and runs clockwise. With `upload` (small and up) a readout sits in the
 * middle and swaps for a cancel button on hover or focus. The ring is a `progressbar`.
 *
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button is clicked.
 *
 * @cssproperty --progress-circle-color The color of the arc. Defaults to border/info.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-77
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-progress--docs
 */
@customElement("zeta-progress-circle")
export class ZetaProgressCircle extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Size: xxsmall (24px), xsmall (36px), small (40px), medium (48px) or large (64px). Pixel numbers still work. */
  @property({ reflect: true, converter: sizeConverter }) size: ProgressCircleSize = 64;

  /** Progress (0-100). */
  @property({ type: Number }) get progress() {
    return this.progressValue;
  }

  /** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
  @property({ type: Boolean, reflect: true }) indeterminate?: boolean;

  /** The type of the progress circle. `upload` is the same as setting the upload property. */
  @property({ type: String }) type: "default" | "upload" = "default";

  /** Places the readout and cancel control at the centre. No effect at xsmall or xxsmall, where it is not built. */
  @property({ type: Boolean, reflect: true }) upload = false;

  /** Shows the unfilled track behind the arc. */
  @property({ type: Boolean, reflect: true, attribute: "show-track" }) showTrack = true;

  /** Accessible name of the cancel button. */
  @property({ type: String, attribute: "cancel-label" }) cancelLabel = "Cancel upload";

  /** Accessible name of the progress ring. */
  @property({ type: String }) label = "Progress";

  set progress(value: number) {
    if (value <= 0 || !value) {
      this.progressValue = 0;
      return;
    }

    if (value >= 100) {
      this.progressValue = 100;
      return;
    }

    this.progressValue = value;
  }

  private progressValue = 0;

  @state() private strokeWidth = 4;

  private get diameter() {
    return typeof this.size === "number" ? this.size : (DIAMETERS[this.size] ?? 64);
  }

  protected firstUpdated() {
    const stroke = parseFloat(getComputedStyle(this).getPropertyValue("--stroke-heavy"));
    if (stroke) this.strokeWidth = stroke;
  }

  private renderUpload() {
    if (!(this.upload || this.type === "upload") || this.diameter < DIAMETERS.small) return nothing;
    return html`<div class="uploading">
      <span class="percentage" aria-hidden="true">${this.progress}%</span>
      <zeta-icon-button
        class="cancel"
        size="small"
        flavor="subtle"
        shape="full"
        aria-label=${this.cancelLabel}
        @click=${() => this.dispatchEvent(new ZetaCancelUploadEvent().toEvent())}
        >close</zeta-icon-button
      >
    </div>`;
  }

  protected render() {
    const d = this.diameter;
    const r = (d - this.strokeWidth) / 2;
    const sweep = this.indeterminate ? 25 : this.progress;
    return html`
      <div class="container" style="width:${d}px;height:${d}px">
        <svg
          width=${d}
          height=${d}
          viewBox="0 0 ${d} ${d}"
          role="progressbar"
          aria-label=${this.label}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${this.indeterminate ? nothing : this.progress}
        >
          ${this.showTrack ? svg`<circle class="track" r=${r} cx=${d / 2} cy=${d / 2} stroke-width=${this.strokeWidth}></circle>` : nothing}
          <circle
            class="arc"
            r=${r}
            cx=${d / 2}
            cy=${d / 2}
            pathLength="100"
            stroke-width=${this.strokeWidth}
            stroke-linecap=${this.rounded ? "round" : "butt"}
            stroke-dasharray="${sweep} 100"
            visibility=${sweep === 0 ? "hidden" : "visible"}
          ></circle>
        </svg>
        ${this.renderUpload()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-progress-circle": ZetaProgressCircle;
  }
}
