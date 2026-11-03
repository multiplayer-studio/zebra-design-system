import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./status-label.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable } from "../../../mixins/mixins.js";
import { ZetaCloseEvent } from "../../../events.js";
import "../../icon/icon.js";

/** Reports a read-only state on an item, such as Active or Overdue. `status` sets the fill, the border and the leading
 * element together while the label text holds one colour throughout, and `leading` decides whether the status also
 * shows as a dot, an icon or nothing. `discardable` adds the one control anywhere in the badge family, a dismiss that
 * removes the label rather than selecting it.
 *
 * Use `leading="icon"` where the status has to survive greyscale: the dot and the fill are colour alone.
 *
 * @slot - Text displayed on label.
 *
 * @part container - The top level div making up the component.
 * @part icon-container - Wrapper around the leading dot or icon.
 * @part text - The div wrapping the text of either the label or the slot.
 * @part discard - The dismiss button.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the dismiss button is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-297
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
@customElement("zeta-status-label")
export class ZetaStatusLabel extends Contourable(LitElement) {
  /** Type of status label.*/
  @property({ type: String, reflect: true }) status: "info" | "positive" | "warning" | "negative" | "neutral" = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted.
   *
   * @defaultValue `undefined`. This will render a slot for text.
   *
   * If provided, it will override the slot.
   * */
  @property({ type: String }) label?: string;

  /** A custom glyph for the leading icon. Leave unset to use the glyph fixed per status. @see {ZetaIconName}. */
  @property({ type: String }) icon?: ZetaIconName;

  /** Whether to show the leading element. Superseded by `leading`, which takes precedence when set. */
  @property({ type: Boolean }) showIcon = true;

  /** The leading element: a dot, a glyph fixed per status, or nothing. Defaults from `showIcon` and `icon`. */
  @property({ type: String, reflect: true }) leading?: "indicator" | "icon" | "none";

  /** Adds a dismiss button after the label. It removes the label rather than selecting it. */
  @property({ type: Boolean, reflect: true }) discardable = false;

  /** Accessible name for the dismiss button, saying what it removes. */
  @property({ type: String, attribute: "discard-label" }) discardLabel = "Remove";

  static styles = [super.styles ?? [], styles];

  private static readonly GLYPH = { neutral: "info", info: "info", positive: "check_circle", warning: "warning", negative: "error" } as const;

  protected override render() {
    const leading = this.leading ?? (!this.showIcon ? "none" : this.icon ? "icon" : "indicator");
    const icon =
      leading === "icon"
        ? html`<zeta-icon .rounded=${this.rounded}>${this.icon ?? ZetaStatusLabel.GLYPH[this.status]}</zeta-icon>`
        : html`<span class="dot"></span>`;

    return html`
      <div part="container">
        ${leading !== "none" ? html`<div part="icon-container">${icon}</div>` : nothing}
        <div part="text">${this.label ? this.label : html`<slot></slot>`}</div>
        ${
          this.discardable
            ? html`<button part="discard" type="button" aria-label=${this.discardLabel} @click=${() => this.dispatchEvent(new ZetaCloseEvent().toEvent())}>
                <zeta-icon .rounded=${this.rounded}>close</zeta-icon>
              </button>`
            : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-status-label": ZetaStatusLabel;
  }
}
