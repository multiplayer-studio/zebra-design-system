import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./avatar.styles.js";
import { iconGlyphs, iconFamily } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type AvatarSize =
  | "xxxsmall" | "xxsmall" | "xsmall" | "small" | "medium"
  | "large" | "xlarge" | "xxlarge" | "xxxlarge";
export type AvatarContentType = "initials" | "photo" | "icon";
export type AvatarSwatchColor = "purple" | "blue" | "sea" | "yellow" | "orange" | "green" | "burgundy";
export type AvatarStatus = "available" | "away" | "busy" | "dnd" | "on-shift" | "offline" | "icon";

/**
 * A visual representation of a user or entity, shown as a photo, initials,
 * or icon, with an optional status indicator.
 *
 * Nine sizes step from xxxsmall to xxxlarge with medium as the base; only
 * medium's width, ring weight and initials font size are bound to real
 * tokens (`control-lg`, `stroke-thick`, `label-large/font-size`) — every
 * other step is an authored value carried over from Figma as-is (spec
 * issue). Badge size and initials font size are otherwise unbound and are
 * implemented here as exactly one third of the avatar's own size, matching
 * the ratio measured across all nine Figma variants. The ring is drawn
 * outside the avatar's content circle rather than inset over it.
 *
 * Content type, swatch colour, presence status and the custom status icon
 * are all swap-only in Figma, not exposed component properties there — this
 * element exposes them as real properties because a consumer has to set them
 * somehow (see the spec's `internalVariations`).
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the avatar with no re-render.
 *
 * @part avatar - The root element.
 * @part ring - The outline ring.
 * @part close - The dismiss badge.
 * @part status - The presence badge.
 * @fires close - The dismiss badge was activated.
 *
 * @spec specs/avatar/avatar.spec.json
 */
@customElement("zds-avatar")
export class ZdsAvatar extends LitElement {
  static styles = styles;

  /** Fits the avatar to its context. Nine steps, xxxsmall to xxxlarge. */
  @property({ type: String, reflect: true }) size: AvatarSize = "xxxsmall";

  /**
   * What fills the circle. Figma models this as a swap on a nested instance
   * rather than an exposed property (spec issue); this element exposes it
   * because a consumer has to set the content somehow.
   */
  @property({ type: String, reflect: true }) type: AvatarContentType = "initials";

  /** Shown when `type="initials"`. Usually one or two characters. */
  @property({ type: String }) initials: string | null = null;

  /** Background behind initials or an icon. Not used behind a photo. */
  @property({ type: String, attribute: "swatch-color", reflect: true }) swatchColor: AvatarSwatchColor = "purple";

  /** Shown when `type="photo"`. */
  @property({ type: String }) src: string | null = null;

  /** Accessible text for the photo. Also seeds the default Close accessible name ("Remove {alt}"). */
  @property({ type: String }) alt: string | null = null;

  /** Shown when `type="icon"`. */
  @property({ type: String }) icon: IconName | null = null;

  /** Shows a dismiss badge pinned to the top-right corner. */
  @property({ type: Boolean, attribute: "show-close", reflect: true }) showClose = true;

  /** Accessible name for the dismiss badge. Defaults to `Remove ${alt}`, or "Remove" with no `alt`. */
  @property({ type: String, attribute: "close-label" }) closeLabel: string | null = null;

  /** Shows a presence badge pinned to the bottom-right corner. */
  @property({ type: Boolean, attribute: "show-status", reflect: true }) showStatus = true;

  /**
   * Presence state. Each state (other than "icon") draws its own verified
   * glyph as well as its own fill colour.
   */
  @property({ type: String, reflect: true }) status: AvatarStatus = "available";

  /** Shown when `status="icon"`. */
  @property({ type: String, attribute: "status-icon" }) statusIcon: IconName | null = null;

  /** Accessible text for the presence badge. Presence is colour-only otherwise, so provide this whenever `showStatus` is true. */
  @property({ type: String, attribute: "status-label" }) statusLabel: string | null = null;

  /** Shows a border/default outline ring around the avatar. */
  @property({ type: Boolean, attribute: "show-ring", reflect: true }) showRing = true;

  // Every state but "icon" has its own verified glyph in the font, confirmed
  // by resolving each status's icon swap to its parent component set (not
  // just the swap's own variant name — see the spec's extraction-method
  // issue). Close's Figma swap currently points at Offline's glyph, which
  // reads as an authoring bug there; the dismiss badge below uses "close".
  private static readonly STATUS_GLYPH: Record<Exclude<AvatarStatus, "icon">, IconName> = {
    available: "available",
    away: "away",
    busy: "busy",
    dnd: "dnd",
    "on-shift": "on-shift",
    offline: "offline",
  };

  private renderGlyph(name: IconName, part: string) {
    const glyph = iconGlyphs[name];
    if (!glyph) {
      // A typo renders an invisible glyph, which is hard to spot; say so.
      console.warn(`<zds-avatar>: unknown icon "${name}"`);
    }
    return html`<span part=${part} class=${part} style="font-family:'${iconFamily.rounded}', sans-serif" aria-hidden="true"
      >${glyph ?? ""}</span
    >`;
  }

  protected render() {
    return html`
      <span part="avatar" class="content" data-type=${this.type}>
        ${this.type === "photo"
          ? html`<img class="photo" src=${this.src ?? nothing} alt=${this.alt ?? ""} />`
          : html`<span class="swatch" data-swatch-color=${this.swatchColor}>
              ${this.type === "initials"
                ? html`<span class="initials">${this.initials ?? nothing}</span>`
                : this.icon
                  ? this.renderGlyph(this.icon, "content-icon")
                  : nothing}
            </span>`}
      </span>

      ${this.showRing ? html`<span part="ring" class="ring" aria-hidden="true"></span>` : nothing}

      ${this.showClose
        ? html`<button
            part="close"
            class="badge badge--close"
            type="button"
            aria-label=${this.closeLabel ?? (this.alt ? `Remove ${this.alt}` : "Remove")}
            @click=${() => this.dispatchEvent(new Event("close", { bubbles: true, composed: true }))}
          >
            ${this.renderGlyph("close", "badge-icon")}
          </button>`
        : nothing}
      ${this.showStatus
        ? html`<span
            part="status"
            class="badge badge--status"
            data-status=${this.status}
            role=${this.statusLabel ? "img" : nothing}
            aria-label=${this.statusLabel ?? nothing}
            aria-hidden=${this.statusLabel ? nothing : "true"}
          >
            ${this.status === "icon"
              ? this.statusIcon
                ? this.renderGlyph(this.statusIcon, "badge-icon")
                : nothing
              : this.renderGlyph(ZdsAvatar.STATUS_GLYPH[this.status], "badge-icon")}
          </span>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-avatar": ZdsAvatar;
  }
}
