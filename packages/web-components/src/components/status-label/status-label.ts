import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
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
 * Reports a read-only state on an item, such as Active, Overdue or Failed.
 * Status sets the fill, the border and the leading element together while
 * the label text holds one colour throughout, and Leading decides whether
 * the status also shows as a dot, an icon or nothing at all. Reach for it
 * where a state is being reported, and for `<zds-badge-label>` where the
 * thing shown is a category rather than a state.
 *
 * Not interactive and not focusable. The label (default slot) is the
 * accessible name; the dot and icon are decorative. Use `leading="icon"`
 * where the status has to survive greyscale.
 *
 * @slot - The state being reported. Two words at most.
 * @csspart root - The surround.
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

  protected render() {
    const lead =
      this.leading === "indicator" ? html`<span class="lead"><span class="dot"></span></span>`
      : this.leading === "icon" ? html`<zds-icon class="lead" name=${GLYPH[this.status] ?? "info"} size="small" .iconStyle=${"rounded"}></zds-icon>`
      : nothing;
    return html`<span part="root" class="root">${lead}<span class="label"><slot></slot></span></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-status-label": ZdsStatusLabel; }
}
