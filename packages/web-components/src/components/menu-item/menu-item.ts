import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./menu-item.styles.js";
import "../icon/icon.js";
import "../checkbox/checkbox.js";
import "../radio/radio.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type MenuItemType = "icon" | "checkbox" | "radio" | "custom";

/**
 * A single selectable row inside a `zds-dropdown-menu` (or any menu-shaped
 * list built without one).
 *
 * `type` picks what leads the row. Icon rows take `leading-icon`; checkbox
 * and radio rows lead with a real `zds-checkbox` / `zds-radio` at size
 * medium, checked when the row is `selected` and disabled with it. Figma
 * leaves that control unchecked in every state (spec warn), so code follows
 * the row instead. The control only shows state: the row stays the one
 * interactive element, with the matching ARIA role (`menuitemcheckbox` /
 * `menuitemradio`), and the control is inert and hidden from assistive
 * technology. The whole row is the click target: activating a checkbox row
 * toggles `selected`, a radio row selects itself and clears the radio rows
 * beside it, and both fire `change`.
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
 * @fires change - A checkbox or radio row's `selected` changed from the row being activated.
 *
 * @spec specs/dropdown/dropdown.spec.json
 */
@customElement("zds-menu-item")
export class ZdsMenuItem extends LitElement {
  static styles = styles;

  /** What leads the row: an icon, a real checkbox or radio that shows `selected`, or the `leading` slot. */
  @property({ type: String, reflect: true }) type: MenuItemType = "icon";

  /** Corner treatment. Match the `zds-dropdown-menu` panel that holds it. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** The option is unavailable. Only the label's colour changes, so say why nearby. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The option is currently chosen. Combined with real `:focus-visible`, this also covers Figma's "selected focus". */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Icon before the label, for `type="icon"`. `null` hides the leading position. */
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

  // The whole row is the control's click target: a checkbox row toggles, a
  // radio row selects itself and clears the radio rows beside it.
  private onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
    if (this.type === "checkbox") this.setSelected(!this.selected);
    else if (this.type === "radio" && !this.selected) {
      for (const row of this.parentElement?.children ?? []) {
        if (row !== this && row instanceof ZdsMenuItem && row.type === "radio") row.selected = false;
      }
      this.setSelected(true);
    }
  }

  private setSelected(selected: boolean) {
    this.selected = selected;
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  private renderLeading() {
    if (this.type === "custom") return html`<span class="leading"><slot name="leading"></slot></span>`;
    if (this.type === "checkbox")
      return html`<zds-checkbox class="leading control" size="medium" inert aria-hidden="true" .checked=${this.selected} .disabled=${this.disabled}></zds-checkbox>`;
    if (this.type === "radio")
      return html`<zds-radio class="leading control" size="medium" inert aria-hidden="true" .checked=${this.selected} .disabled=${this.disabled}></zds-radio>`;
    return this.leadingIcon ? html`<zds-icon class="leading" name=${this.leadingIcon} size="small"></zds-icon>` : nothing;
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
        ${this.renderLeading()}
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
