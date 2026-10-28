import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { iconGlyphs, iconFamily, type IconStyle } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type { IconName, IconStyle };
export type IconSize = "xsmall" | "small" | "medium" | "large";

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
 * token (`control-icon-xs/sm/md/lg`); `framed` pads it to a fixed 40px
 * (`control-target-min`) touch target for a standalone tappable icon. A
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
@customElement("zds-icon")
export class ZdsIcon extends LitElement {
  static styles = styles;

  /** Glyph name, e.g. `alarm`. See `@zebra-design-system/icons` for the full list. */
  @property({ type: String }) name: IconName | null = null;

  /** Which family to draw from. Same codepoints, different outlines. */
  @property({ type: String, reflect: true }) iconStyle: IconStyle = "rounded";

  /** The glyph's own box — 16 / 20 / 28px. */
  @property({ type: String, reflect: true }) size: IconSize = "small";

  /** Pads the glyph to a fixed 40px touch target. Only for a standalone tappable icon — wrong inside a control that already provides one. */
  @property({ type: Boolean, reflect: true }) framed = false;

  /**
   * Accessible name. Leave unset for a decorative icon that repeats adjacent
   * text — which is the case inside a Button, where the label already says it.
   */
  @property({ type: String }) label: string | null = null;

  protected render() {
    const glyph = this.name ? iconGlyphs[this.name] : undefined;
    if (this.name && !glyph) {
      // A typo here renders an invisible glyph, which is hard to spot; say so.
      console.warn(`<zds-icon>: unknown icon "${this.name}"`);
    }
    return html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-icon": ZdsIcon;
  }
}
