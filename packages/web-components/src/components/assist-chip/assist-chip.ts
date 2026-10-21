import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./assist-chip.styles.js";
import { defaultTrue, type ChipShape } from "../chip/chip.js";
import "../icon/icon.js";

/**
 * Offers a contextual action related to nearby content, such as adding an
 * event to a calendar, when the action helps but is not the main task.
 * Phrase the label as a verb. Reach for `<zds-button>` when the action is
 * the primary next step, and `<zds-filter-chip>` when the control narrows
 * content.
 *
 * A native button (role, focus, Enter / Space); listen for `click`. Not
 * modelled from Figma (spec issues): the single-value `active` axis, and
 * State=selected — an action does not stay selected, so a chip that should
 * is a filter chip. 32px tall in every state (Figma's 34/32 jump is a layout
 * artefact of its inside border).
 *
 * @slot - The label: the action, phrased as a verb.
 * @csspart chip - The button.
 *
 * @spec specs/assist-chip/assist-chip.spec.json
 */
@customElement("zds-assist-chip")
export class ZdsAssistChip extends LitElement {
  static styles = [chipBase, styles];

  /** Show the glyph naming the action's domain. Defaults to true; `show-leading-icon="false"` turns it off. */
  @property({ type: Boolean, attribute: "show-leading-icon", reflect: true, converter: defaultTrue }) showLeadingIcon = true;

  /** The leading glyph. Figma ships it swapped to `star`. */
  @property({ type: String }) icon: IconName = "star";

  /** The action is unavailable. Say why nearby. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Pill (rounded) or square (sharp) corners. Match the controls around the chip. */
  @property({ type: String, reflect: true }) shape: ChipShape = "rounded";

  @property({ type: String }) type: "button" | "submit" | "reset" = "button";

  protected render() {
    return html`<button
      part="chip"
      type=${this.type}
      class="zds-chip zds-assist-chip"
      data-interactive=""
      data-shape=${this.shape}
      data-disabled=${this.disabled ? "" : nothing}
      ?disabled=${this.disabled}
    >
      <!-- Decorative: the label names the action. Rounded family, Icon small (Figma). -->
      ${this.showLeadingIcon && this.icon
        ? html`<zds-icon class="zds-chip__glyph" name=${this.icon} size="small" .iconStyle=${"rounded"}></zds-icon>`
        : nothing}
      <span class="zds-chip__label"><slot></slot></span>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-assist-chip": ZdsAssistChip;
  }
}
