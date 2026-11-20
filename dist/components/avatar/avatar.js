var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ZdsAvatar_1;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./avatar.styles.js";
import { iconGlyphs, iconFamily } from "@zebra-design-system/icons/codepoints.js";
const SWATCHES = ["purple", "blue", "sea", "yellow", "orange", "green", "burgundy"];
/**
 * A swatch that isn't one of the seven named ones: a token name
 * (`chart/series/2`), a custom property (`--brand-accent`) or any CSS colour.
 */
export const swatchFill = (color) => color.startsWith("--") ? `var(${color})`
    : /^[a-z][\w-]*(\/[\w-]+)+$/i.test(color) ? `var(--${color.replace(/\//g, "-")})`
        : color;
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
let ZdsAvatar = ZdsAvatar_1 = class ZdsAvatar extends LitElement {
    constructor() {
        super(...arguments);
        /** Fits the avatar to its context. Nine steps, xxxsmall to xxxlarge. */
        this.size = "xxxsmall";
        /**
         * What fills the circle. Figma models this as a swap on a nested instance
         * rather than an exposed property (spec issue); this element exposes it
         * because a consumer has to set the content somehow.
         */
        this.type = "initials";
        /** Shown when `type="initials"`. Usually one or two characters. */
        this.initials = null;
        /**
         * Background behind initials or an icon. Not used behind a photo. One of
         * the seven swatches, or any other colour: a token name (`chart/series/2`),
         * a custom property (`--brand-accent`) or a CSS colour value.
         */
        this.swatchColor = "purple";
        /** Shown when `type="photo"`. */
        this.src = null;
        /** Accessible text for the photo. Also seeds the default Close accessible name ("Remove {alt}"). */
        this.alt = null;
        /** Shown when `type="icon"`. */
        this.icon = null;
        /** Shows a dismiss badge pinned to the top-right corner. */
        this.showClose = true;
        /** Accessible name for the dismiss badge. Defaults to `Remove ${alt}`, or "Remove" with no `alt`. */
        this.closeLabel = null;
        /** Shows a presence badge pinned to the bottom-right corner. */
        this.showStatus = true;
        /**
         * Presence state. Each state (other than "icon") draws its own verified
         * glyph as well as its own fill colour.
         */
        this.status = "available";
        /** Shown when `status="icon"`. */
        this.statusIcon = null;
        /** Accessible text for the presence badge. Presence is colour-only otherwise, so provide this whenever `showStatus` is true. */
        this.statusLabel = null;
        /** Shows a border/default outline ring around the avatar. */
        this.showRing = true;
    }
    renderGlyph(name, part) {
        const glyph = iconGlyphs[name];
        if (!glyph) {
            // A typo renders an invisible glyph, which is hard to spot; say so.
            console.warn(`<zds-avatar>: unknown icon "${name}"`);
        }
        return html `<span part=${part} class=${part} style="font-family:'${iconFamily.rounded}', sans-serif" aria-hidden="true"
      >${glyph ?? ""}</span
    >`;
    }
    render() {
        return html `
      <span part="avatar" class="content" data-type=${this.type}>
        ${this.type === "photo"
            ? html `<img class="photo" src=${this.src ?? nothing} alt=${this.alt ?? ""} />`
            : html `<span class="swatch" data-swatch-color=${SWATCHES.includes(this.swatchColor) ? this.swatchColor : "custom"}
              style=${SWATCHES.includes(this.swatchColor) ? nothing : `background: ${swatchFill(this.swatchColor)}`}>
              ${this.type === "initials"
                ? html `<span class="initials">${this.initials ?? nothing}</span>`
                : this.icon
                    ? this.renderGlyph(this.icon, "content-icon")
                    : nothing}
            </span>`}
      </span>

      ${this.showRing ? html `<span part="ring" class="ring" aria-hidden="true"></span>` : nothing}

      ${this.showClose
            ? html `<button
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
            ? html `<span
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
                : this.renderGlyph(ZdsAvatar_1.STATUS_GLYPH[this.status], "badge-icon")}
          </span>`
            : nothing}
    `;
    }
};
ZdsAvatar.styles = styles;
// Every state but "icon" has its own verified glyph in the font, confirmed
// by resolving each status's icon swap to its parent component set (not
// just the swap's own variant name — see the spec's extraction-method
// issue). Close's Figma swap currently points at Offline's glyph, which
// reads as an authoring bug there; the dismiss badge below uses "close".
ZdsAvatar.STATUS_GLYPH = {
    available: "available",
    away: "away",
    busy: "busy",
    dnd: "dnd",
    "on-shift": "on-shift",
    offline: "offline",
};
__decorate([
    property({ type: String, reflect: true })
], ZdsAvatar.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsAvatar.prototype, "type", void 0);
__decorate([
    property({ type: String })
], ZdsAvatar.prototype, "initials", void 0);
__decorate([
    property({ type: String, attribute: "swatch-color", reflect: true })
], ZdsAvatar.prototype, "swatchColor", void 0);
__decorate([
    property({ type: String })
], ZdsAvatar.prototype, "src", void 0);
__decorate([
    property({ type: String })
], ZdsAvatar.prototype, "alt", void 0);
__decorate([
    property({ type: String })
], ZdsAvatar.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-close", reflect: true })
], ZdsAvatar.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZdsAvatar.prototype, "closeLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-status", reflect: true })
], ZdsAvatar.prototype, "showStatus", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsAvatar.prototype, "status", void 0);
__decorate([
    property({ type: String, attribute: "status-icon" })
], ZdsAvatar.prototype, "statusIcon", void 0);
__decorate([
    property({ type: String, attribute: "status-label" })
], ZdsAvatar.prototype, "statusLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-ring", reflect: true })
], ZdsAvatar.prototype, "showRing", void 0);
ZdsAvatar = ZdsAvatar_1 = __decorate([
    customElement("zds-avatar")
], ZdsAvatar);
export { ZdsAvatar };
