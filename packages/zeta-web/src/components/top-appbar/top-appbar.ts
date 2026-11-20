import { html, LitElement, nothing } from "lit";
import styles from "./top-appbar.styles.js";
import { customElement, property } from "lit/decorators.js";
import { type ZetaIconName } from "../../icons.js";
import "../avatar/avatar.js";
import "../button/button.js";
import "../button/icon-button/icon-button.js";
import "../search/search.js";

/** The leading control `type` draws when nothing is in the `leading` slot. */
const LEADING: Record<ZetaTopAppbarType, { icon: ZetaIconName; label: string }> = {
  default: { icon: "hamburger_menu", label: "Menu" },
  centered: { icon: "hamburger_menu", label: "Menu" },
  extended: { icon: "hamburger_menu", label: "Menu" },
  contextual: { icon: "close", label: "Clear selection" },
  "contextual alt": { icon: "close", label: "Clear selection" },
  search: { icon: "arrow_back", label: "Back" }
};

export type ZetaTopAppbarType = "default" | "centered" | "contextual" | "contextual alt" | "search" | "extended";

/** The header at the top of a mobile screen, carrying the screen's name between a leading control and its actions.
 * Setting `type` picks one of six arrangements, each drawing its own leading control and content; slotted content
 * replaces what it draws. Without `type` the element only lays out its slots, and `centered` and `extended` still work.
 *
 * @slot - The content of the appbar.
 * @slot leading - The content to be placed at the start of the appbar.
 * @slot trailing - The content to be placed at the end of the appbar.
 * @slot contextual-controls - The actions on `contextual` and `contextual alt`, in place of `trailing`.
 *
 * @event leading-click - The leading control `type` draws was activated.
 * @event trailing-click - The fixed control on `centered` was activated.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1217
 * @storybook ?path=/docs/components-top-appbar--docs
 */
@customElement("zeta-top-appbar")
export class ZetaTopAppbar extends LitElement {
  /** Centers the content of the title. */
  @property({ type: Boolean, reflect: true }) centered = false;

  /** Places the title below the main appbar. */
  @property({ type: Boolean, reflect: true }) extended = false;

  /** The arrangement. Each value brings its own leading control and content. */
  @property({ type: String, reflect: true }) type?: ZetaTopAppbarType;

  /** The bar's own corner. Controls inside keep theirs. */
  @property({ type: String, reflect: true }) shape: "sharp" | "rounded" = "sharp";

  /** Names the screen when `type` is set and nothing is in the default slot. */
  @property({ type: String }) pageTitle?: string;

  /** Heading level of the title `type` draws. */
  @property({ type: Number }) headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 1;

  /** Avatar photo on `default`. Without a photo or initials there is no avatar. */
  @property({ type: String }) avatarSrc?: string;

  /** Avatar initials on `default`, used when there is no photo. */
  @property({ type: String }) avatarInitials?: string;

  /** The search field's value on `search`. It opens empty (spec issue: Figma draws its typing state). */
  @property({ type: String }) searchValue: string = "";

  /** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
  @property({ type: String }) count: string = "2 Items";

  /** Accessible name of the leading control `type` draws. */
  @property({ type: String }) leadingLabel?: string;

  /** Accessible name of the fixed control on `centered`. */
  @property({ type: String }) trailingLabel: string = "Account";

  private get isExtended() {
    return this.extended || this.type === "extended";
  }

  private get isContextual() {
    return this.type === "contextual" || this.type === "contextual alt";
  }

  private emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  getTitle() {
    // Rendered beside the slot, not as its fallback: whitespace in the light DOM would hide a fallback.
    return html` <div class="title">
      <slot id="content-slot"></slot>
      ${this.renderAvatar()}${this.type === "contextual" ? html`<span class="count" role="status">${this.count}</span>` : this.renderPageTitle()}
    </div>`;
  }

  private renderAvatar() {
    if (this.type !== "default" || !(this.avatarSrc || this.avatarInitials)) return nothing;
    return html`<zeta-avatar size="xxxs">${this.avatarSrc ? html`<img src=${this.avatarSrc} alt="" />` : this.avatarInitials}</zeta-avatar>`;
  }

  private renderPageTitle() {
    if (!this.pageTitle) return nothing;
    return this.type ? html`<span role="heading" aria-level=${this.headingLevel}>${this.pageTitle}</span>` : this.pageTitle;
  }

  private renderLeading() {
    if (!this.type) return nothing;
    const { icon, label } = LEADING[this.type];
    if (this.type === "contextual alt") {
      return html`<zeta-button flavor="subtle" size="small" shape="rounded" aria-label=${this.leadingLabel ?? label} @click=${() => this.emit("leading-click")}>
        <zeta-icon>${icon}</zeta-icon><span role="status">${this.count}</span>
      </zeta-button>`;
    }
    return html`<zeta-icon-button
      flavor="subtle"
      size="small"
      shape="rounded"
      aria-label=${this.leadingLabel ?? label}
      @click=${() => this.emit("leading-click")}
      >${icon}</zeta-icon-button
    >`;
  }

  private renderTrailing() {
    if (this.type !== "centered") return nothing;
    return html`<zeta-icon-button flavor="subtle" size="small" shape="rounded" aria-label=${this.trailingLabel} @click=${() => this.emit("trailing-click")}
      >user_circle</zeta-icon-button
    >`;
  }

  protected render() {
    return html`
      <header>
        <div class="body">
          <slot id="leading-slot" name="leading">${this.renderLeading()}</slot>
          ${this.type === "search" ? html`<zeta-search class="search" block size="small" flavor="ghost" shape="rounded" placeholder="Search" .value=${this.searchValue}></zeta-search>` : nothing}
          ${!this.isExtended && this.type !== "search" && this.type !== "contextual alt" ? this.getTitle() : nothing}
          ${
            this.type === "search"
              ? nothing
              : html`<slot id="trailing-slot" name=${this.isContextual ? "contextual-controls" : "trailing"}>${this.renderTrailing()}</slot>`
          }
        </div>
        ${this.isExtended ? this.getTitle() : nothing}
      </header>
    `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-top-appbar": ZetaTopAppbar;
  }
}
