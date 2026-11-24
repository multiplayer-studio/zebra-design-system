var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { iconGlyphs, iconFamily } from "@zebra-design-system/icons/codepoints.js";
/**
 * A glyph from the Zebra icon font.
 *
 * Renders the glyph as a character rather than an SVG. `@font-face` is
 * registered on the document and reaches into shadow roots, but the
 * `.zds-icon-*` class rules from icons.css do not — so this component looks the
 * character up itself and only sets the family. Load `icons.css` (or at least
 * its `@font-face` blocks) once in the host page.
 *
 * Colour comes from `currentColor` — the whole reason to ship icons as a
 * font: an icon inside a button inherits that button's colour with no extra
 * rule and no per-flavour wiring. `size` binds the glyph's own dimension
 * token (`control-icon-xs/sm/md/lg`); `framed` pads it to a fixed box,
 * 40px (`control-target-min`) or 24px (`control-xs`) at xsmall, for a
 * standalone tappable icon. A
 * component that already provides its own target area, like Button, locks
 * both rather than leaving them open to the consumer.
 *
 * Both families share codepoints, so `sharp` is a family swap, never a
 * content change. The spec pins this axis to rounded and does not expose it
 * (spec issue 1); this component exposes it deliberately since both families
 * ship in the font at no extra cost.
 *
 * @csspart glyph - The element carrying the glyph.
 * @spec specs/icon/icon.spec.json
 */
let ZdsIcon = class ZdsIcon extends LitElement {
    constructor() {
        super(...arguments);
        /** Glyph name, e.g. `alarm`. See `@zebra-design-system/icons` for the full list. */
        this.name = null;
        /** Which family to draw from. Same codepoints, different outlines. */
        this.iconStyle = "rounded";
        /** The glyph's own box — 12 / 16 / 20 / 28px. */
        this.size = "small";
        /** Pads the glyph to a fixed box: 40px, or 24px at xsmall. Only for a standalone tappable icon — wrong inside a control that already provides one. */
        this.framed = false;
        /**
         * Accessible name. Leave unset for a decorative icon that repeats adjacent
         * text — which is the case inside a Button, where the label already says it.
         */
        this.label = null;
    }
    render() {
        const glyph = this.name ? iconGlyphs[this.name] : undefined;
        if (this.name && !glyph) {
            // A typo here renders an invisible glyph, which is hard to spot; say so.
            console.warn(`<zds-icon>: unknown icon "${this.name}"`);
        }
        return html `
      <span
        part="glyph"
        class="glyph"
        style="--zds-icon-family:${iconFamily[this.iconStyle] ?? iconFamily.rounded}"
        role=${this.label ? "img" : nothing}
        aria-label=${this.label ?? nothing}
        aria-hidden=${this.label ? nothing : "true"}
        >${glyph ?? ""}</span
      >
    `;
    }
};
ZdsIcon.styles = styles;
__decorate([
    property({ type: String })
], ZdsIcon.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsIcon.prototype, "iconStyle", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsIcon.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsIcon.prototype, "framed", void 0);
__decorate([
    property({ type: String })
], ZdsIcon.prototype, "label", void 0);
ZdsIcon = __decorate([
    customElement("zds-icon")
], ZdsIcon);
export { ZdsIcon };
