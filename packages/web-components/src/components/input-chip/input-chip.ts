import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./input-chip.styles.js";
import { defaultTrue, initialsOf, type ChipShape } from "../chip/chip.js";
import "../avatar/avatar.js";
import "../icon/icon.js";

/**
 * Represents a person, entity or value someone has entered or picked, such
 * as a recipient on a message, so it can be reviewed and removed without
 * retyping. Belongs inside input and selection fields; reach for
 * `<zds-filter-chip>` to narrow content or `<zds-assist-chip>` to offer an
 * action.
 *
 * The chip itself is not a control: its one interactive part is the remove
 * control, a native button named "Remove <label>". Figma gives that control
 * no API and shows it even when disabled (spec issue); here it renders only
 * when `removable` is set — the element's equivalent of passing a handler —
 * and never on a disabled chip. Activating it (click, Enter / Space, or
 * Backspace / Delete while focused) fires `zds-remove`; removing the chip,
 * announcing the change and moving focus belong to the field that owns it.
 * The chip shows its focus treatment while the remove control has keyboard
 * focus.
 *
 * @slot - The label: the value itself, usually a name or a term.
 * @fires zds-remove - The remove control was activated. `detail.label` is the chip's text.
 * @csspart chip - The chip.
 * @csspart remove - The remove control.
 *
 * @spec specs/input-chip/input-chip.spec.json
 */
@customElement("zds-input-chip")
export class ZdsInputChip extends LitElement {
  static styles = [chipBase, styles];

  /** Lead with the person's face or initials. Defaults to true; `show-avatar="false"` turns it off. */
  @property({ type: Boolean, attribute: "show-avatar", reflect: true, converter: defaultTrue }) showAvatar = true;

  /** Photo for the avatar. Without it the avatar shows initials. */
  @property({ type: String, attribute: "avatar-src" }) avatarSrc: string | null = null;

  /** Initials for the avatar. Defaults to the first letters of the label. */
  @property({ type: String, attribute: "avatar-initials" }) avatarInitials: string | null = null;

  /**
   * The avatar's swatch behind the initials: one of zds-avatar's seven
   * swatches, a token name (`chart/series/2`), a custom property or any CSS colour.
   */
  @property({ type: String, attribute: "avatar-color" }) avatarColor: string | null = null;

  /** The value is fixed: the chip greys out and the remove control is hidden. Say why nearby. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Pill (rounded) or square (sharp) corners. Match the field the chips sit in. */
  @property({ type: String, reflect: true }) shape: ChipShape = "rounded";

  /** Show the remove control (fires `zds-remove`). Never shown while disabled. */
  @property({ type: Boolean, reflect: true }) removable = false;

  /** Accessible name of the remove control. Defaults to "Remove <label>". */
  @property({ type: String, attribute: "remove-label" }) removeLabel: string | null = null;

  @state() private text = "";

  connectedCallback() {
    super.connectedCallback();
    this.text = (this.textContent ?? "").trim();
  }

  private onSlotChange() {
    this.text = (this.textContent ?? "").trim();
  }

  private remove_() {
    this.dispatchEvent(new CustomEvent("zds-remove", { detail: { label: this.text }, bubbles: true, composed: true }));
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      this.remove_();
    }
  }

  protected render() {
    const canRemove = this.removable && !this.disabled;
    return html`<span
      part="chip"
      class="zds-chip zds-input-chip"
      data-interactive=""
      data-shape=${this.shape}
      data-disabled=${this.disabled ? "" : nothing}
      aria-disabled=${this.disabled ? "true" : nothing}
    >
      ${this.showAvatar
        ? html`<zds-avatar
            class="zds-input-chip__avatar"
            aria-hidden="true"
            size="xxxsmall"
            type=${this.avatarSrc ? "photo" : "initials"}
            src=${this.avatarSrc ?? nothing}
            initials=${this.avatarInitials ?? initialsOf(this.text)}
            swatch-color=${this.avatarColor ?? nothing}
            .showStatus=${false}
            .showRing=${false}
            .showClose=${false}
          ></zds-avatar>`
        : nothing}
      <span class="zds-chip__label"><slot @slotchange=${this.onSlotChange}></slot></span>
      ${canRemove
        ? html`<button
            part="remove"
            type="button"
            class="zds-input-chip__remove"
            aria-label=${this.removeLabel ?? (this.text ? `Remove ${this.text}` : "Remove")}
            @click=${this.remove_}
            @keydown=${this.onKeyDown}
          >
            <!-- Figma pins the close glyph to the rounded family at Icon small. -->
            <zds-icon class="zds-chip__glyph" name="close" size="small" .iconStyle=${"rounded"}></zds-icon>
          </button>`
        : nothing}
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-input-chip": ZdsInputChip;
  }
}
