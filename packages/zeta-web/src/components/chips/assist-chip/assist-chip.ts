import { customElement, property } from "lit/decorators.js";
import "../../icon/icon.js";
import { html, nothing } from "lit";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import { BaseChip } from "../base-chips/base-chip.js";
import { ZetaCloseEvent } from "../../../events.js";
import chipStyles from "../base-chips/chip.styles.js";
import styles from "./assist-chip.styles.js";

/** A compact action, phrased as a verb, with an optional leading glyph naming its domain. `color` marks a state or a
 * kind of item through the border and text; `discardable` adds a remove control for an item someone can discard,
 * such as an attached file.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4423
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 *
 * @slot - The content of the chip.
 * @cssproperty --assist-chip-foreground - Overrides the label, icon and remove colour.
 * @cssproperty --assist-chip-background - Overrides the fill.
 * @cssproperty --assist-chip-border - Overrides the border colour.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the remove control is clicked.
 */
@customElement("zeta-assist-chip")
export class ZetaAssistChip extends BaseChip {
  /** The leading glyph naming the action's domain (spec: showLeadingIcon, on when set). */
  @property({ type: String }) icon?: ZetaIconName;

  /** Marks a state or a kind of item through the border and the text. The fill stays neutral. */
  @property({ type: String, reflect: true }) color: "neutral" | "green" | "orange" | "blue" | "red" = "neutral";

  /** Adds a remove control after the label. */
  @property({ type: Boolean, reflect: true }) discardable = false;

  /** Accessible name for the remove control, saying what it removes. */
  @property({ type: String, attribute: "discard-label" }) discardLabel = "Remove";

  static styles = [super.styles || [], chipStyles, styles];

  getIcon() {
    return this.icon ? html`<zeta-icon class="icon" .rounded=${this.rounded}>${this.icon}</zeta-icon>` : nothing;
  }

  protected override render() {
    return html`<span class="chip">
      <button class="action interactive-target" ?disabled=${this.disabled}>
        ${this.getIcon()}<span class="label"><slot></slot></span>
      </button>
      ${
        this.discardable
          ? html`<button
              class="remove"
              type="button"
              aria-label=${this.discardLabel}
              ?disabled=${this.disabled}
              @click=${() => this.dispatchEvent(new ZetaCloseEvent().toEvent())}
            >
              <zeta-icon .rounded=${this.rounded}>close</zeta-icon>
            </button>`
          : nothing
      }
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-assist-chip": ZetaAssistChip;
  }
}
