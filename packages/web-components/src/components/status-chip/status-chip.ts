import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./status-chip.styles.js";
import type { ChipShape } from "../chip/chip.js";

export type StatusChipStatus = "default" | "success" | "warning" | "negative" | "info";

/**
 * Shows a read-only state or attribute of an item, such as its progress or
 * availability, so it can be scanned at a glance. The label is the only
 * thing that names the state — the colour supports the word, it does not
 * replace it. Not interactive: no role, not focusable, no hover. Use
 * `<zds-filter-chip>` or `<zds-assist-chip>` when someone needs to act on it.
 *
 * Overlap: this is the same read-only state word as `<zds-status-label>`
 * (five standings, the same feedback fills). Built as specced by owner
 * decision; Status Label is the richer of the two (border, dot or icon).
 * Prefer one per product. status=default uses the neutral feedback fill,
 * not Figma's interactive hover token (spec issue).
 *
 * @slot - The label: the state, in a word or two.
 * @csspart chip - The chip.
 *
 * @spec specs/status-chip/status-chip.spec.json
 */
@customElement("zds-status-chip")
export class ZdsStatusChip extends LitElement {
  static styles = [chipBase, styles];

  /** The standing being reported. Sets the fill only; the label colour never changes. */
  @property({ type: String, reflect: true }) status: StatusChipStatus = "default";

  /** radius/element-sm (rounded) or square (sharp) corners. */
  @property({ type: String, reflect: true }) shape: ChipShape = "rounded";

  protected render() {
    return html`<span part="chip" class="zds-chip zds-status-chip" data-status=${this.status} data-shape=${this.shape}
      ><span class="zds-chip__label"><slot></slot></span
    ></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-status-chip": ZdsStatusChip;
  }
}
