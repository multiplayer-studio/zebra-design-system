import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./global-header.styles.js";
import "../divider/divider.js";
import "../dropdown/dropdown.js";
import "../icon-button/icon-button.js";
import "../search/search.js";
import "../user-profile/user-profile.js";

/** Slotted controls whose `shape` the header sets. Anything else is slotted as-is. */
const SHAPED_TAGS = new Set(["ZDS-BUTTON", "ZDS-ICON-BUTTON"]);

export type GlobalHeaderMode = "dark" | "light";

/**
 * The bar across the top of an application: identity at the leading edge,
 * navigation and search in the middle, the person's account at the trailing
 * edge. Most of it is optional, and `rounded` carries into every control.
 *
 * Departures from Figma, each a spec issue:
 * - `username`, `avatar-src`, `initials` and the labels are inputs, because
 *   Figma fixes them or leaves them unnamed.
 * - `show-logo` hides the logo region. Figma declares it but binds it to
 *   nothing.
 * - Search keeps a fixed width. Figma's metadata calls it both fixed and a
 *   maximum, and the instance sets it as a minimum.
 * - The bar fills its container (Figma ships a fixed width).
 * - The account menu aligns to the control's right edge, not left, because
 *   the control sits at the end of the bar and the panel has no collision
 *   handling.
 *
 * @slot logo - The product's mark. Defaults to the Zebra logo.
 * @slot menu-items - Navigation controls. Shown when `menu-items` is on.
 * @slot actions - Icon actions after search. Shown when `action-menu` is on.
 * @slot account-menu - `zds-menu-item` rows for the account menu.
 * @fires zds-menu-click - The menu button was activated.
 * @fires zds-app-switcher-click - The app switcher was activated.
 * @csspart bar - The bar.
 * @csspart search - The `zds-search`.
 * @slot avatar - A zds-avatar for the account, with any avatar property
 *   (type, icon, swatch-color, status…); its size stays xxsmall.
 * @csspart account - The `zds-user-profile`.
 *
 * Frozen in dark (spec: modeLock): the host carries `.mode-dark` whatever mode
 * the page is in. `mode="light"` is the only override.
 *
 * @spec specs/global-header/global-header.spec.json
 */
@customElement("zds-global-header")
export class ZdsGlobalHeader extends LitElement {
  static styles = styles;

  /** Frozen in dark whatever the page mode. Set `light` to override it on this header. */
  @property({ type: String, reflect: true }) mode: GlobalHeaderMode = "dark";

  /** Rounds every control inside the bar. The bar's own corners round only when it floats (`anchored` false). */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /**
   * Locked to the top of the page, with square corners on the bar. Set it to
   * false for a rounded header that floats with space around it; it has no
   * effect on a sharp header.
   */
  @property({ type: Boolean }) anchored = true;

  /** Keeps the account control. */
  @property({ type: Boolean, attribute: "show-profile" }) showProfile = true;

  /** Keeps the grid button that moves a person between products. */
  @property({ type: Boolean, attribute: "app-switcher" }) appSwitcher = true;

  /** Keeps search in the middle band. */
  @property({ type: Boolean, attribute: "search-bar" }) searchBar = true;

  /** Opens the navigation region before search. */
  @property({ type: Boolean, attribute: "menu-items" }) menuItems = false;

  /** Opens the action region after search. */
  @property({ type: Boolean, attribute: "action-menu" }) actionMenu = false;

  /** Draws a hairline before the middle band and another after it. */
  @property({ type: Boolean, reflect: true }) dividers = false;

  /** The product's name. It does not change as a person navigates. */
  @property({ type: String, attribute: "platform-name" }) platformName = "Platform Name";

  /** Keeps the product name beside the mark. */
  @property({ type: Boolean, attribute: "show-platform-name" }) showPlatformName = true;

  /** Keeps the logo region. */
  @property({ type: Boolean, attribute: "show-logo" }) showLogo = true;

  /** The person's name on the account control. */
  @property({ type: String }) username = "Username";

  /** Avatar photo on the account control. */
  @property({ type: String, attribute: "avatar-src" }) avatarSrc: string | null = null;

  /** Avatar initials, used when there is no photo. */
  @property({ type: String }) initials: string | null = null;

  /** Accessible name of the menu button. */
  @property({ type: String, attribute: "menu-label" }) menuLabel = "Menu";

  /** Accessible name of the app switcher. */
  @property({ type: String, attribute: "app-switcher-label" }) appSwitcherLabel = "Switch app";

  /** Accessible name of the navigation landmark. */
  @property({ type: String, attribute: "navigation-label" }) navigationLabel = "Main";

  @state() private accountOpen = false;

  get #shape() {
    return this.rounded ? "rounded" : "sharp";
  }

  #sync = () => {
    for (const slot of this.renderRoot.querySelectorAll<HTMLSlotElement>("slot[data-shaped]")) {
      for (const el of slot.assignedElements({ flatten: true })) {
        if (!SHAPED_TAGS.has(el.tagName)) continue;
        const item = el as Element & { shape: string };
        if (item.shape !== this.#shape) item.shape = this.#shape;
      }
    }
  };

  protected willUpdate() {
    this.classList.toggle("mode-dark", this.mode === "dark");
    this.classList.toggle("mode-light", this.mode === "light");
  }

  protected updated() {
    this.#sync();
  }

  #emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  protected render() {
    return html`
      <header part="bar" class="bar" data-floating=${this.rounded && !this.anchored ? "" : nothing}>
        <div class="leading">
          <zds-icon-button
            flavour="subtle"
            size="medium"
            shape=${this.#shape}
            icon="hamburger-menu"
            .label=${this.menuLabel}
            @click=${() => this.#emit("zds-menu-click")}
          ></zds-icon-button>
          ${this.showLogo ? html`<span class="logo"><slot name="logo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 40" width="80" height="32" ><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 792h1224V0H0Z" /></clipPath></defs><path d="M25.94 20.55 23.2 17.8v7.79h2.75Z" /><g clip-path="url(#a)" transform="matrix(.2222 0 0 -.2222 -75.5 107.79)"><path d="M407.08 429.98h30.17l-12.34 12.33-.05.06H409a20.4 20.4 0 0 1-1.92 40.7v-40.75l-33.9 33.79a61 61 0 0 1-10.56-6.97l32.08-31.95v-70.17l24.77-24.77v17.51l-12.39 12.39Z"/><path d="m419.47 429.9-.06-59.82h12.38l.06 47.38zm42.5-24.84-12.39 12.38h-17.73l12.37-12.38Zm-79.66-26.39v53.29l-28.45 28.45a62 62 0 0 1-6.98-10.55l23.04-23.04V409.3l-27.95 27.97a62 62 0 0 1-2.1-15.42s41.05-41.74 42.44-43.18m-42.23 25.46v-17.51l79.4-79.39v17.51zm141.32-18.48h-12.39v-15.66h-12.38a20.4 20.4 0 1 1 40.8 0zm100.88-15.92-9.3-17.67h-57.87l37.63 72.3h-33.32l9.3 17.67h57.88l-37.64-72.3Zm33.61 36.28h29.68v-17.67h-29.68v-18.61h29.68v-17.67h-51.53v89.97h51.53v-17.67h-29.68Zm62.24-38.31h7.96c9.17 0 13.09 3.1 13.09 10.4 0 4.3-1.62 7.41-4.86 9.17-2.43 1.34-4.59 1.61-11.2 1.61h-4.99Zm0 37.1h5.4c9.98 0 14.16 3.1 14.16 10.52 0 7.29-4.18 10.39-14.43 10.39h-5.13Zm8.9 37.23c11.47 0 18.08-1.22 22.94-4.32 6.2-3.77 9.98-11.46 9.98-20.1 0-6.33-2.03-11.6-6.07-15.64-2.57-2.7-4.59-3.92-9.44-5.26 5.53-1.22 7.95-2.43 10.79-5.13 4.04-3.77 6.07-9.04 6.07-15.65 0-8.36-3.38-15.78-9.18-19.69-4.45-2.97-9.84-4.18-19.01-4.18h-36.83v89.97zm71.62-42.89c8.9 0 14.3 4.58 14.3 12.4 0 7.42-5.27 12.55-12.95 12.55h-8.37v-24.95Zm-7.02-47.08h-21.85v89.97h29.14c11.87 0 20.5-2.16 26.43-6.74 6.2-4.86 9.72-12.95 9.72-22.8 0-13.76-5.8-22.8-17.4-27.38l19.82-33.05h-26.16l-19.7 34.8zm80.01 35.39 9.04 28.8 9.02-28.8Zm29.15-35.4h23.71l-29.54 89.98h-27.79l-29.67-89.97h23.04l5.55 17.7h29.16z"/></g></svg></slot></span>` : nothing}
          ${this.showPlatformName ? html`<span class="platform-name">${this.platformName}</span>` : nothing}
        </div>
        ${this.dividers ? html`<zds-divider orientation="vertical"></zds-divider>` : nothing}
        <div class="middle">
          ${this.menuItems
            ? html`<nav class="navigation" aria-label=${this.navigationLabel}><slot name="menu-items" data-shaped @slotchange=${this.#sync}></slot></nav>`
            : nothing}
          ${this.searchBar ? html`<zds-search part="search" class="search" block size="medium" shape=${this.#shape}></zds-search>` : nothing}
          ${this.actionMenu ? html`<div class="actions"><slot name="actions" data-shaped @slotchange=${this.#sync}></slot></div>` : nothing}
        </div>
        ${this.dividers ? html`<zds-divider orientation="vertical"></zds-divider>` : nothing}
        ${this.showProfile || this.appSwitcher ? html`<div class="account-group">
          ${this.showProfile ? html`<zds-dropdown .rounded=${this.rounded} align="right" @open-change=${(e: CustomEvent<{ open: boolean }>) => (this.accountOpen = e.detail.open)}>
            <zds-user-profile
              slot="trigger"
              part="account"
              username=${this.username}
              avatar-src=${this.avatarSrc ?? nothing}
              initials=${this.initials ?? nothing}
              ?rounded=${this.rounded}
              .expanded=${this.accountOpen}
            ><slot name="avatar" slot="avatar"></slot></zds-user-profile>
            <slot name="account-menu"></slot>
          </zds-dropdown>` : nothing}
          ${this.appSwitcher
            ? html`<zds-icon-button
                flavour="subtle"
                size="medium"
                shape=${this.#shape}
                icon="apps"
                .label=${this.appSwitcherLabel}
                @click=${() => this.#emit("zds-app-switcher-click")}
              ></zds-icon-button>`
            : nothing}
        </div>` : nothing}
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-global-header": ZdsGlobalHeader;
  }
}
