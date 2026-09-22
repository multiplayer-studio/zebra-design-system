import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { iconGlyphs, iconFamily, type IconStyle } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type { IconName, IconStyle };

/**
 * A glyph from the Zebra icon font.
 *
 * Renders the glyph as a character rather than an SVG. `@font-face` is
 * registered on the document and reaches into shadow roots, but the
 * `.zds-icon-*` class rules from icons.css do not — so this component looks the
 * character up itself and only sets the family. Load `icons.css` (or at least
 * its `@font-face` blocks) once in the host page.
 *
 * Colour and size come from `currentColor` and `font-size`, which is the whole
 * reason to ship icons as a font: an icon inside a button inherits that
 * button's colour and scale with no extra rule and no per-flavour wiring.
 *
 * Both families share codepoints, so `sharp` is a family swap, never a
 * content change.
 *
 * @csspart glyph - The element carrying the glyph.
 */
@customElement("zds-icon")
export class ZdsIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      color: inherit;
      /* An icon is decoration unless it is given a label. */
      -webkit-user-select: none;
      user-select: none;
    }
    .glyph {
      font-family: var(--zds-icon-family), sans-serif;
      font-weight: normal;
      font-style: normal;
      font-size: 1em;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
  `;

  /** Glyph name, e.g. `alarm`. See `@zebra-design-system/icons` for the full list. */
  @property({ type: String }) name: IconName | null = null;

  /** Which family to draw from. Same codepoints, different outlines. */
  @property({ type: String, reflect: true }) iconStyle: IconStyle = "rounded";

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
