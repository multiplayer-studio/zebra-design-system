import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./filter-chip.styles.js";
import type { ChipShape } from "../chip/chip.js";
import "../icon/icon.js";

/**
 * Lets someone narrow a set of content by switching a criterion on and off,
 * such as a category in a list of results. Use them in groups where more
 * than one can be on at once. Name the filter, not the result.
 *
 * A toggle button: `aria-pressed` follows `active`, Enter / Space switch it
 * (native button), and switching fires `zds-active-change`. Figma's
 * separate State=selected (colour only, no check mark) is not modelled: it
 * overlaps `active`, and the metadata says prefer active (spec issue).
 *
 * @slot - The label: the criterion the chip switches.
 * @fires zds-active-change - The chip was switched by the user. `detail.active` is the new value.
 * @csspart chip - The button.
 *
 * @spec specs/filter-chip/filter-chip.spec.json
 */
@customElement("zds-filter-chip")
export class ZdsFilterChip extends LitElement {
  static styles = [chipBase, styles];

  /** Whether the filter is on. Adds the check mark and flips to the inverse palette. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** The criterion cannot be switched right now. Say why nearby. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Pill (rounded) or square (sharp) corners. Match the controls around the filter row. */
  @property({ type: String, reflect: true }) shape: ChipShape = "rounded";

  /** Form value, for a consumer collecting the active chips of a group. */
  @property({ type: String }) value: string | null = null;

  private toggle() {
    if (this.disabled) return;
    this.active = !this.active;
    this.dispatchEvent(new CustomEvent("zds-active-change", { detail: { active: this.active }, bubbles: true, composed: true }));
  }

  protected render() {
    return html`<button
      part="chip"
      type="button"
      class="zds-chip zds-filter-chip"
      data-interactive=""
      data-shape=${this.shape}
      data-pressed=${this.active ? "" : nothing}
      data-disabled=${this.disabled ? "" : nothing}
      aria-pressed=${this.active ? "true" : "false"}
      ?disabled=${this.disabled}
      @click=${this.toggle}
    >
      <!-- Only while on. Rounded family, Icon small (Figma). -->
      ${this.active ? html`<zds-icon class="zds-chip__glyph" name="check-mark" size="small" .iconStyle=${"rounded"}></zds-icon>` : nothing}
      <span class="zds-chip__label"><slot></slot></span>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-filter-chip": ZdsFilterChip;
  }
}
