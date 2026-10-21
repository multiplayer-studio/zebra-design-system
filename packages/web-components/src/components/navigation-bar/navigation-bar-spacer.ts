import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-bar-spacer.styles.js";
import "../divider/divider.js";

/**
 * Splits a Navigation Bar's items into groups: with `distribution="start"`
 * the bar gives it all free space, pushing the items after it to the end.
 * Replaces Figma's `spacer` variant + Right Slot (and its `showDivider`
 * axis) with one part placed where the split goes, so any number of groups
 * works. Decorative: the bar hides it from assistive tech.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.json
 */
@customElement("zds-navigation-bar-spacer")
export class ZdsNavigationBarSpacer extends LitElement {
  static styles = styles;

  /**
   * Draws a vertical rule in the gap. Figma's Spacer has this boolean but it
   * is wired to nothing, so its divider always shows (spec issue) — wired
   * here. Defaults to false to match the bar's own `showDivider` default.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-divider" }) showDivider = false;

  protected render() {
    return this.showDivider ? html`<zds-divider orientation="vertical"></zds-divider>` : nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-navigation-bar-spacer": ZdsNavigationBarSpacer;
  }
}
