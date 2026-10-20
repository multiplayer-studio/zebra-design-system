import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./menu-item.styles.js";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type MenuItemType = "icon" | "checkbox" | "radio" | "custom";

/**
 * A single selectable row inside a `zds-dropdown-menu` (or any menu-shaped
 * list built without one).
 *
 * `type` names the role the row plays, but Figma models no anatomy
 * difference between icon, checkbox and radio — all three are the same
 * exposed Icon instance, and the tick/dot mark is whichever glyph a consumer
 * picks for `leading-icon` (spec `internalVariations`: "the radio mark has to
 * come from the glyph you pick rather than from the variant"). This element
 * still surfaces `type` as a real property instead of a documentation-only
 * label because it drives the row's ARIA role — `menuitemradio` /
 * `menuitemcheckbox` / `menuitem` — which the spec explicitly leaves to code
 * ("Radio and checkbox are named roles rather than built controls... has to
 * be set in code"). This is a deliberate accessibility improvement beyond
 * what Figma models, not a faithful reproduction of an anatomy Figma draws.
 *
 * `state` in the spec is mostly CSS: hover and focus are real `:hover` /
 * `:focus-visible`. `selected` is the one state Figma models that has no
 * native pseudo-class, so it is the one exposed as a property here (folding
 * in "selected focus" too, since that is just selected + real :focus-visible
 * together).
 *
 * The spec's `leadingElement` boolean and the implicit "which Icon instance"
 * choice are collapsed into one `leading-icon` property, the same way
 * `zds-button` already turns "is there a leading icon" + "which one" into a
 * single nullable prop rather than a separate visibility toggle.
 *
 * @slot - The label text.
 * @slot leading - Replaces the leading icon when `type="custom"`. Figma
 *   ships this empty (spec: "Nothing is provided by default"), and the exact
 *   node swap for Type=custom was not independently re-verified from Figma
 *   (spec issue, extraction-limit) — confirm visually if this ever looks off.
 * @part row - The row element.
 *
 * @spec specs/dropdown/dropdown.spec.json
 */
@customElement("zds-menu-item")
export class ZdsMenuItem extends LitElement {
  static styles = styles;

  /** Names the row's role — Icon, checkbox and radio share one anatomy; only the ARIA role and the glyph you pick differ. */
  @property({ type: String, reflect: true }) type: MenuItemType = "icon";

  /** Corner treatment. Match the `zds-dropdown-menu` panel that holds it. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** The option is unavailable. Only the label's colour changes, so say why nearby. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The option is currently chosen. Combined with real `:focus-visible`, this also covers Figma's "selected focus". */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Icon before the label. `null` hides the leading position (ignored when `type="custom"`, which uses the `leading` slot instead). */
  @property({ type: String, attribute: "leading-icon" }) leadingIcon: IconName | null = null;

  /** Icon after the label, e.g. a submenu arrow or an external-link mark. */
  @property({ type: String, attribute: "trailing-icon" }) trailingIcon: IconName | null = null;

  // A native <button> would give us click/keydown/disabled for free, but the
  // row's role has to vary (menuitem/menuitemradio/menuitemcheckbox), which a
  // <button> can't express — so keyboard activation is wired up by hand here,
  // matching what real interaction on a role="menuitem" div requires per the
  // spec's own accessibility notes ("Rows are the interactive targets...
  // has to be built in code").
  private onKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (e.currentTarget as HTMLElement).click();
    }
  }

  private onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }

  protected render() {
    const role = this.type === "radio" ? "menuitemradio" : this.type === "checkbox" ? "menuitemcheckbox" : "menuitem";
    const showsCheckedState = this.type === "radio" || this.type === "checkbox";
    return html`
      <div
        part="row"
        class="row"
        role=${role}
        tabindex=${this.disabled ? "-1" : "0"}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-checked=${showsCheckedState ? String(this.selected) : nothing}
        @keydown=${this.onKeydown}
        @click=${this.onClick}
      >
        ${this.type === "custom"
          ? html`<span class="leading"><slot name="leading"></slot></span>`
          : this.leadingIcon
            ? html`<zds-icon class="leading" name=${this.leadingIcon} size="small"></zds-icon>`
            : nothing}
        <span class="label"><slot></slot></span>
        ${this.trailingIcon ? html`<zds-icon class="trailing" name=${this.trailingIcon} size="small"></zds-icon>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-menu-item": ZdsMenuItem;
  }
}
