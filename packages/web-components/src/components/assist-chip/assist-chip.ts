import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { IconName } from "@zebra-design-system/icons/names";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./assist-chip.styles.js";
import { defaultTrue, type ChipShape } from "../chip/chip.js";
import "../icon/icon.js";

export type AssistChipColor = "neutral" | "green" | "orange" | "blue" | "red";

/** `feedback/info/foreground` -> `var(--feedback-info-foreground)`; anything else passes through. */
const paint = (v: string | null) => (v && /^[a-z0-9-]+(\/[a-z0-9-]+)+$/.test(v) ? `var(--${v.replace(/\//g, "-")})` : v ?? undefined);

/**
 * Offers a contextual action, or stands for an item someone can discard,
 * such as an attached file. Five colours borrow the status tokens to mark a
 * state or a kind of item, and `foreground`, `background` and `border`
 * override any one paint beyond those five (override > color > state).
 * Reach for `<zds-button>` when the action is the primary next step, and
 * `<zds-filter-chip>` when the control narrows content.
 *
 * Without `discardable` the chip is one native button; listen for `click`.
 * With it, a button cannot hold another, so the chip becomes a group holding
 * the label (a button only when `clickable` is set) and a remove control
 * that fires `zds-discard`, as `<zds-input-chip>` does. Not modelled from
 * Figma (spec issues): the single-value `active` axis and State=selected.
 * 28px tall in every state (Figma's 30/28 jump is a layout artefact of its
 * inside border).
 *
 * @slot - The label.
 * @fires zds-discard - The remove control was activated. `detail.label` is the chip's text.
 * @csspart chip - The chip.
 * @csspart remove - The remove control.
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

  /** The action is unavailable. Say why nearby. Hides the remove control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Pill (rounded) or square (sharp) corners. Match the controls around the chip. */
  @property({ type: String, reflect: true }) shape: ChipShape = "rounded";

  /** Status colour for the border, label and icons. Use one per kind of item, e.g. red for PDF. */
  @property({ type: String, reflect: true }) color: AssistChipColor = "neutral";

  /** Overrides the label, icon and remove colour. A token path (`feedback/info/foreground`) or any CSS colour. */
  @property({ type: String }) foreground: string | null = null;

  /** Overrides the fill, which `color` leaves neutral. A token path or any CSS colour. */
  @property({ type: String }) background: string | null = null;

  /** Overrides the border colour. A token path or any CSS colour. */
  @property({ type: String }) border: string | null = null;

  /** Show the remove control after the label (fires `zds-discard`). Never shown while disabled. */
  @property({ type: Boolean, reflect: true }) discardable = false;

  /** With `discardable`, keep the label a button so it can still be clicked. */
  @property({ type: Boolean }) clickable = false;

  /** Accessible name of the remove control. Defaults to "Remove <label>". */
  @property({ type: String, attribute: "discard-label" }) discardLabel: string | null = null;

  @property({ type: String }) type: "button" | "submit" | "reset" = "button";

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
    const style = styleMap({
      "--zds-assist-fg": paint(this.foreground),
      "--zds-assist-bg": paint(this.background),
      "--zds-assist-border": paint(this.border),
    });
    const content = html`
      <!-- Decorative: the label names the action. Rounded family, Icon xsmall (control/icon-xs, Figma). -->
      ${this.showLeadingIcon && this.icon
        ? html`<zds-icon class="zds-chip__glyph" name=${this.icon} size="xsmall" .iconStyle=${"rounded"}></zds-icon>`
        : nothing}
      <span class="zds-chip__label"><slot @slotchange=${this.onSlotChange}></slot></span>`;

    if (!this.discardable || this.disabled) {
      return html`<button
        part="chip"
        type=${this.type}
        class="zds-chip zds-assist-chip"
        data-interactive=""
        data-shape=${this.shape}
        data-color=${this.color}
        data-disabled=${this.disabled ? "" : nothing}
        style=${style}
        ?disabled=${this.disabled}
      >${content}</button>`;
    }
    return html`<span
      part="chip"
      class="zds-chip zds-assist-chip"
      data-interactive=""
      data-discardable=""
      data-shape=${this.shape}
      data-color=${this.color}
      style=${style}
    >
      ${this.clickable ? html`<button type=${this.type} class="zds-assist-chip__action">${content}</button>` : content}
      <button
        part="remove"
        type="button"
        class="zds-assist-chip__remove"
        aria-label=${this.discardLabel ?? (this.text ? `Remove ${this.text}` : "Remove")}
        @click=${this.discard}
        @keydown=${this.onKeyDown}
      >
        <!-- Figma pins the close glyph to the rounded family at Icon small. -->
        <zds-icon class="zds-chip__glyph" name="close" size="small" .iconStyle=${"rounded"}></zds-icon>
      </button>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-assist-chip": ZdsAssistChip;
  }
}
