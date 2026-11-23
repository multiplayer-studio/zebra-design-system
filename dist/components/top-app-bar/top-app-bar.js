var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ZdsTopAppBar_instances, _ZdsTopAppBar_emit, _ZdsTopAppBar_leading, _ZdsTopAppBar_title, _ZdsTopAppBar_middle, _ZdsTopAppBar_trailing;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import styles from "./top-app-bar.styles.js";
import "../avatar/avatar.js";
import "../button/button.js";
import "../icon-button/icon-button.js";
import "../search/search.js";
const LEADING = {
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
let ZdsTopAppBar = class ZdsTopAppBar extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsTopAppBar_instances.add(this);
        /** The arrangement. Each value brings its own content. */
        this.type = "default";
        /** The bar's own corner. Nested controls stay rounded either way. */
        this.shape = "sharp";
        /** Names the screen on `default`, `centered` and `extended`. */
        this.pageTitle = "Title";
        /** Heading level of the title. */
        this.headingLevel = 1;
        /** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
        this.count = "2 Items";
        /** Avatar photo on `default`. Without a photo or initials there is no avatar. */
        this.avatarSrc = null;
        /** Avatar initials on `default`, used when there is no photo. */
        this.avatarInitials = null;
        /** Accessible name of the leading control. Defaults to one that follows `type`. */
        this.leadingLabel = null;
        /** Accessible name of the fixed trailing control on `centered`. */
        this.trailingLabel = "Account";
        /** The query on `search`. */
        this.searchValue = "";
    }
    render() {
        if (this.type === "search") {
            return html `<div part="bar" class="bar">
        <div class="main search">
          ${__classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_leading).call(this)}
          <zds-search class="field" block size="small" flavour="ghost" shape="rounded" .value=${this.searchValue}></zds-search>
        </div>
      </div>`;
        }
        return html `<div part="bar" class="bar">
      <div class="main">
        <div class="leading">${__classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_leading).call(this)} ${__classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_middle).call(this)}</div>
        ${__classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_trailing).call(this)}
      </div>
      ${this.type === "extended" ? html `<div class="second-row">${__classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_title).call(this)}</div>` : nothing}
    </div>`;
    }
};
_ZdsTopAppBar_instances = new WeakSet();
_ZdsTopAppBar_emit = function _ZdsTopAppBar_emit(name) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
};
_ZdsTopAppBar_leading = function _ZdsTopAppBar_leading() {
    const { icon, label } = LEADING[this.type] ?? LEADING.default;
    if (this.type === "contextual alt") {
        return html `<zds-button flavour="subtle" size="small" shape="rounded" leading-icon=${icon} aria-label=${this.leadingLabel ?? label} @click=${() => __classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_emit).call(this, "zds-leading-click")}>
        <span role="status">${this.count}</span>
      </zds-button>`;
    }
    return html `<zds-icon-button
      flavour="subtle"
      size="small"
      shape="rounded"
      icon=${icon}
      .label=${this.leadingLabel ?? label}
      @click=${() => __classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_emit).call(this, "zds-leading-click")}
    ></zds-icon-button>`;
};
_ZdsTopAppBar_title = function _ZdsTopAppBar_title() {
    const level = [1, 2, 3, 4, 5, 6].includes(Number(this.headingLevel)) ? Number(this.headingLevel) : 1;
    const tag = unsafeStatic(`h${level}`);
    return staticHtml `<${tag} part="title" class="title">${this.pageTitle}</${tag}>`;
};
_ZdsTopAppBar_middle = function _ZdsTopAppBar_middle() {
    switch (this.type) {
        case "default":
            return html `<span class="page-header">
          ${this.avatarSrc || this.avatarInitials
                ? html `<zds-avatar
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
          ${__classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_title).call(this)}
        </span>`;
        case "centered":
            return html `<span class="page-header">${__classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_title).call(this)}</span>`;
        case "contextual":
            return html `<span class="count" role="status">${this.count}</span>`;
        default:
            return nothing;
    }
};
_ZdsTopAppBar_trailing = function _ZdsTopAppBar_trailing() {
    switch (this.type) {
        case "default":
        case "extended":
            return html `<div class="trailing"><slot name="trailing"></slot></div>`;
        case "contextual":
        case "contextual alt":
            return html `<div class="trailing"><slot name="contextual-controls"></slot></div>`;
        case "centered":
            return html `<zds-icon-button
          flavour="subtle"
          size="small"
          shape="rounded"
          icon="user-circle"
          .label=${this.trailingLabel}
          @click=${() => __classPrivateFieldGet(this, _ZdsTopAppBar_instances, "m", _ZdsTopAppBar_emit).call(this, "zds-trailing-click")}
        ></zds-icon-button>`;
        default:
            return nothing;
    }
};
ZdsTopAppBar.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsTopAppBar.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsTopAppBar.prototype, "shape", void 0);
__decorate([
    property({ type: String, attribute: "page-title" })
], ZdsTopAppBar.prototype, "pageTitle", void 0);
__decorate([
    property({ type: Number, attribute: "heading-level" })
], ZdsTopAppBar.prototype, "headingLevel", void 0);
__decorate([
    property({ type: String })
], ZdsTopAppBar.prototype, "count", void 0);
__decorate([
    property({ type: String, attribute: "avatar-src" })
], ZdsTopAppBar.prototype, "avatarSrc", void 0);
__decorate([
    property({ type: String, attribute: "avatar-initials" })
], ZdsTopAppBar.prototype, "avatarInitials", void 0);
__decorate([
    property({ type: String, attribute: "leading-label" })
], ZdsTopAppBar.prototype, "leadingLabel", void 0);
__decorate([
    property({ type: String, attribute: "trailing-label" })
], ZdsTopAppBar.prototype, "trailingLabel", void 0);
__decorate([
    property({ type: String, attribute: "search-value" })
], ZdsTopAppBar.prototype, "searchValue", void 0);
ZdsTopAppBar = __decorate([
    customElement("zds-top-app-bar")
], ZdsTopAppBar);
export { ZdsTopAppBar };
