import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./status-label.styles.js";
import "../icon/icon.js";

export type StatusLabelStatus = "neutral" | "info" | "positive" | "warning" | "negative";
export type StatusLabelLeading = "indicator" | "icon" | "none";
export type StatusLabelShape = "rounded" | "sharp";

/** Fixed per status (spec): Info for neutral and info, then Check Circle, Warning and Error. */
const GLYPH: Record<StatusLabelStatus, IconName> = {
  neutral: "info",
  info: "info",
  positive: "check-circle",
  warning: "warning",
  negative: "error",
};

/**
 * Reports a read-only state on an item, such as Active or Overdue. Status
 * sets the fill, the border and the leading element together while the
 * label text holds one colour throughout, and Leading decides whether the
 * status also shows as a dot, an icon or nothing. Reach for
 * `<zds-badge-label>` where the thing shown is a category rather than a state.
 *
 * `discardable` adds the one control in the badge family: a dismiss after
 * the label that fires `zds-discard` (click, Enter / Space, or Backspace /
 * Delete while focused). Removing the element is the caller's job. Nothing
 * else here is focusable. The label (default slot) is the accessible name;
 * the dot and icon are decorative. Use `leading="icon"` where the status has
 * to survive greyscale.
 *
 * @slot - The state being reported. Two words at most.
 * @fires zds-discard - The discard control was activated. `detail.label` is the label's text.
 * @csspart root - The surround.
 * @csspart discard - The discard control.
 *
 * @spec specs/badges/status-label.spec.json
 */
@customElement("zds-status-label")
export class ZdsStatusLabel extends LitElement {
  static styles = styles;

  /** Sets the fill, the border and the leading element together. positive / negative draw the success / error tokens. */
  @property({ type: String, reflect: true }) status: StatusLabelStatus = "neutral";

  /** A dot, a fixed status glyph, or nothing. */
  @property({ type: String, reflect: true }) leading: StatusLabelLeading = "indicator";

  /** Pill (rounded) or square corners (sharp). */
  @property({ type: String, reflect: true }) shape: StatusLabelShape = "rounded";

  /** Show the discard control after the label (fires `zds-discard`). */
  @property({ type: Boolean, reflect: true }) discardable = false;

  /** Accessible name of the discard control. Defaults to "Remove <label>". */
  @property({ type: String, attribute: "discard-label" }) discardLabel: string | null = null;

  @state() private text = "";

  connectedCallback() {
    super.connectedCallback();
    this.text = (this.textContent ?? "").trim();
  }

  private onSlotChange() {
    this.text = (this.textContent ?? "").trim();
  }

  private discard() {
    this.dispatchEvent(new CustomEvent("zds-discard", { detail: { label: this.text }, bubbles: true, composed: true }));
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      this.discard();
    }
  }

  protected render() {
    const lead =
      this.leading === "indicator" ? html`<span class="lead"><span class="dot"></span></span>`
      : this.leading === "icon" ? html`<zds-icon class="lead" name=${GLYPH[this.status] ?? "info"} size="small" .iconStyle=${"rounded"}></zds-icon>`
      : nothing;
    const discard = this.discardable
      ? html`<button
          part="discard"
          type="button"
          class="discard"
          aria-label=${this.discardLabel ?? (this.text ? `Remove ${this.text}` : "Remove")}
          @click=${this.discard}
          @keydown=${this.onKeyDown}
        >
          <!-- Figma pins the close glyph to the rounded family at Icon small. -->
          <zds-icon name="close" size="small" .iconStyle=${"rounded"}></zds-icon>
        </button>`
      : nothing;
    return html`<span part="root" class="root">${lead}<span class="label"><slot @slotchange=${this.onSlotChange}></slot></span>${discard}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-status-label": ZdsStatusLabel; }
}
