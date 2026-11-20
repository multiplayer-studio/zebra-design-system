import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./filter-chip.styles.js";
import chipStyles from "../base-chips/chip.styles.js";
import "../../icon/icon.js";
import { BaseChip } from "../base-chips/base-chip.js";

/** A switch for one filter criterion. `active` is the real switch: it adds a check mark and flips the chip to the
 * inverse palette, so the on state reads without colour. Name the criterion, not the result.
 *
 * @event {Event} change - Fired when the filter chip is selected/deselected
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5126-3677
 * @storybook ?path=/docs/components-chips--docs
 */
@customElement("zeta-filter-chip")
export class ZetaFilterChip extends BaseChip {
  /** Whether the filter is on. */
  @property({ type: Boolean, reflect: true }) active?: boolean;

  static styles = [super.styles ?? [], chipStyles, styles];

  getIcon() {
    return this.active ? html`<zeta-icon class="icon" .rounded=${this.rounded}>check_mark</zeta-icon>` : nothing;
  }

  clickHandler() {
    this.active = !this.active;
    this.dispatchEvent(new Event("change"));
  }

  protected override render() {
    return html`<button
      class="chip interactive-target"
      aria-pressed=${this.active ? "true" : "false"}
      @click=${() => this.clickHandler()}
      ?disabled=${this.disabled}
    >
      ${this.getIcon()}<slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-filter-chip": ZetaFilterChip;
  }
}
