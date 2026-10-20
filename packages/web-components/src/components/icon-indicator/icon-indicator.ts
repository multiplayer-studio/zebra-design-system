import { LitElement, html, type PropertyValues } from "lit";
import styles from "./icon-indicator.styles.js";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import "../icon/icon.js";

export type IconIndicatorSize = "small" | "medium" | "large";

/** `--some-token` → `var(--some-token)`; anything else is used as written. */
const toCss = (v: string) => (v.startsWith("--") ? `var(${v})` : v);

/**
 * A small circular marker carrying a glyph, sized to sit beside text or on
 * its own. Size moves the circle and the glyph together. It names nothing, so
 * whatever it refers to has to be named beside it (or given with `label`).
 *
 * Defaults are the spec's: the Clock glyph on foreground/secondary, size
 * small. Beyond the spec, the host can set the glyph (`icon`) and both
 * colours (`fill`, `foreground`, or the `--zds-icon-indicator-fill` /
 * `-foreground` custom properties) — the owner's decision, recorded against
 * the spec's "fixed meaning" warn. Property beats CSS beats default.
 *
 * Glyph colour defaults to foreground/inverse, which flips with the fill.
 * Figma binds foreground/on-strong; the spec warns it measures 1.51:1 in dark
 * mode and names foreground/inverse as the fix.
 *
 * Decorative unless given `label`, which becomes its accessible name.
 *
 * @spec specs/badges/icon-indicator.spec.json
 */
@customElement("zds-icon-indicator")
export class ZdsIconIndicator extends LitElement {
  /** The glyph. */
  @property({ type: String }) icon: IconName = "clock";

  /** Circle colour: a CSS colour or a `--token` name. */
  @property({ type: String }) fill: string | null = null;

  /** Glyph colour: a CSS colour or a `--token` name. Defaults to foreground/inverse. */
  @property({ type: String }) foreground: string | null = null;

  @property({ type: String, reflect: true }) size: IconIndicatorSize = "small";

  /** Accessible name. Without it the indicator is hidden from assistive tech. */
  @property({ type: String }) label: string | null = null;

  protected willUpdate(changed: PropertyValues<this>) {
    // Set on the host, so a property overrides any inherited CSS value.
    // Only ever remove what this element set itself: a host's own inline
    // --zds-icon-indicator-* must survive the first render.
    this.applyColour(changed, "fill", "--zds-icon-indicator-fill");
    this.applyColour(changed, "foreground", "--zds-icon-indicator-foreground");
  }

  private readonly owned = new Set<string>();

  private applyColour(changed: PropertyValues<this>, key: "fill" | "foreground", prop: string) {
    if (!changed.has(key)) return;
    const value = this[key];
    if (value) {
      this.style.setProperty(prop, toCss(value));
      this.owned.add(prop);
    } else if (this.owned.delete(prop)) {
      this.style.removeProperty(prop);
    }
  }

  protected render() {
    return html`<span part="root" class="root" role=${this.label ? "img" : "presentation"} aria-label=${this.label ?? ""} aria-hidden=${this.label ? "false" : "true"}
      ><zds-icon name=${this.icon}></zds-icon
    ></span>`;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-icon-indicator": ZdsIconIndicator;
  }
}
