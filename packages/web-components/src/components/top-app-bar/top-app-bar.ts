import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import styles from "./top-app-bar.styles.js";
import "../avatar/avatar.js";
import "../button/button.js";
import "../icon-button/icon-button.js";
import "../search/search.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type TopAppBarType = "default" | "centered" | "contextual" | "contextual alt" | "search" | "extended";
export type TopAppBarShape = "sharp" | "rounded";
export type TopAppBarHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const LEADING: Record<TopAppBarType, { icon: IconName; label: string }> = {
  default: { icon: "hamburger-menu", label: "Menu" },
  centered: { icon: "hamburger-menu", label: "Menu" },
  extended: { icon: "hamburger-menu", label: "Menu" },
  contextual: { icon: "close", label: "Clear selection" },
  "contextual alt": { icon: "close", label: "Clear selection" },
  search: { icon: "arrow-back", label: "Back" },
};

/**
 * The header at the top of a mobile screen. `type` switches between six
 * arrangements, each with its own leading control and content.
 *
 * Departures from Figma, each a spec issue:
 * - `count`, `avatar-src`, `avatar-initials`, `search-value` and the leading
 *   label are inputs, because Figma draws them as fixed sample content.
 * - The title and count use foreground/primary, because Figma's raw black
 *   would not follow dark mode.
 * - contextual keeps space/md after the leading control, as the metadata says.
 *   Figma binds none there.
 * - The search field opens empty, not in Figma's typing state.
 * - The bar fills its container (Figma ships a fixed 390).
 *
 * @slot trailing - Trailing actions on `default` and `extended`: `zds-icon-button` at size small, flavour subtle.
 * @slot contextual-controls - Actions on `contextual` and `contextual alt`.
 * @fires zds-leading-click - The leading control was activated.
 * @fires zds-trailing-click - The fixed `centered` control was activated.
 * @csspart bar - The bar.
 * @csspart title - The heading element.
 *
 * @spec specs/top-app-bar/top-app-bar.spec.json
 */
@customElement("zds-top-app-bar")
export class ZdsTopAppBar extends LitElement {
  static styles = styles;

  /** The arrangement. Each value brings its own content. */
  @property({ type: String, reflect: true }) type: TopAppBarType = "default";

  /** The bar's own corner. Nested controls stay rounded either way. */
  @property({ type: String, reflect: true }) shape: TopAppBarShape = "sharp";

  /** Names the screen on `default`, `centered` and `extended`. */
  @property({ type: String, attribute: "page-title" }) pageTitle = "Title";

  /** Heading level of the title. */
  @property({ type: Number, attribute: "heading-level" }) headingLevel: TopAppBarHeadingLevel = 1;

  /** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
  @property({ type: String }) count = "2 Items";

  /** Avatar photo on `default`. Without a photo or initials there is no avatar. */
  @property({ type: String, attribute: "avatar-src" }) avatarSrc: string | null = null;

  /** Avatar initials on `default`, used when there is no photo. */
  @property({ type: String, attribute: "avatar-initials" }) avatarInitials: string | null = null;

  /** Accessible name of the leading control. Defaults to one that follows `type`. */
  @property({ type: String, attribute: "leading-label" }) leadingLabel: string | null = null;

  /** Accessible name of the fixed trailing control on `centered`. */
  @property({ type: String, attribute: "trailing-label" }) trailingLabel = "Account";

  /** The query on `search`. */
  @property({ type: String, attribute: "search-value" }) searchValue = "";

  #emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  #leading() {
    const { icon, label } = LEADING[this.type] ?? LEADING.default;
    if (this.type === "contextual alt") {
      return html`<zds-button flavour="subtle" size="small" shape="rounded" leading-icon=${icon} aria-label=${this.leadingLabel ?? label} @click=${() => this.#emit("zds-leading-click")}>
        <span role="status">${this.count}</span>
      </zds-button>`;
    }
    return html`<zds-icon-button
      flavour="subtle"
      size="small"
      shape="rounded"
      icon=${icon}
      .label=${this.leadingLabel ?? label}
      @click=${() => this.#emit("zds-leading-click")}
    ></zds-icon-button>`;
  }

  #title() {
    const level = [1, 2, 3, 4, 5, 6].includes(Number(this.headingLevel)) ? Number(this.headingLevel) : 1;
    const tag = unsafeStatic(`h${level}`);
    return staticHtml`<${tag} part="title" class="title">${this.pageTitle}</${tag}>`;
  }

  #middle() {
    switch (this.type) {
      case "default":
        return html`<span class="page-header">
          ${this.avatarSrc || this.avatarInitials
            ? html`<zds-avatar
                size="xxxsmall"
                type=${this.avatarSrc ? "photo" : "initials"}
                src=${this.avatarSrc ?? nothing}
                initials=${this.avatarInitials ?? nothing}
                alt=""
                .showClose=${false}
                .showStatus=${false}
                .showRing=${false}
              ></zds-avatar>`
            : nothing}
          ${this.#title()}
        </span>`;
      case "centered":
        return html`<span class="page-header">${this.#title()}</span>`;
      case "contextual":
        return html`<span class="count" role="status">${this.count}</span>`;
      default:
        return nothing;
    }
  }

  #trailing() {
    switch (this.type) {
      case "default":
      case "extended":
        return html`<div class="trailing"><slot name="trailing"></slot></div>`;
      case "contextual":
      case "contextual alt":
        return html`<div class="trailing"><slot name="contextual-controls"></slot></div>`;
      case "centered":
        return html`<zds-icon-button
          flavour="subtle"
          size="small"
          shape="rounded"
          icon="user-circle"
          .label=${this.trailingLabel}
          @click=${() => this.#emit("zds-trailing-click")}
        ></zds-icon-button>`;
      default:
        return nothing;
    }
  }

  protected render() {
    if (this.type === "search") {
      return html`<div part="bar" class="bar">
        <div class="main search">
          ${this.#leading()}
          <zds-search class="field" block size="small" flavour="ghost" shape="rounded" .value=${this.searchValue}></zds-search>
        </div>
      </div>`;
    }
    return html`<div part="bar" class="bar">
      <div class="main">
        <div class="leading">${this.#leading()} ${this.#middle()}</div>
        ${this.#trailing()}
      </div>
      ${this.type === "extended" ? html`<div class="second-row">${this.#title()}</div>` : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-top-app-bar": ZdsTopAppBar;
  }
}
