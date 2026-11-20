import { html, LitElement, nothing, type PropertyValues } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property, state } from "lit/decorators.js";
import type { ZetaIconName } from "../../icons.js";
import styles from "./navigation-rail.styles.js";
import "./navigation-rail-item.js";
import "../button/button.js";
import "../icon/icon.js";

const RAIL_PARTS = "zeta-navigation-rail-item, zeta-navigation-header, zeta-sub-menu-header, zeta-sub-menu-item, zeta-collapsible-menu-item";

type RailPart = HTMLElement & { rounded?: boolean; expanded?: boolean; showLabel?: boolean };

const toLength = (v: string | number | undefined) => (v === undefined || v === "" ? null : /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v));

/**
 * Navigation rails allow navigation between sections of an app: a narrow icon rail at the edge of a desktop view,
 * and a sub menu panel beside it for destinations with a second level.
 *
 * The rail follows the page's mode. `inverse` shows the opposite shade, and `locked` keeps it dark (light with
 * `inverse`) whatever the page does; contrast still follows the page. It sets `expanded`,
 * `showLabel` and `rounded` on every rail part inside it. Widening and narrowing run on animations/smooth, never on
 * first render, and are off under reduced motion.
 *
 * @slot - The menu: `zeta-navigation-rail-item`s, optionally separated by a `zeta-divider`.
 * @slot header - A `zeta-navigation-header`.
 * @slot footer - Destinations pinned to the bottom, above the toggle item.
 * @slot sub-menu-header - A `zeta-sub-menu-header`. The panel shows when it or the sub-menu slot is filled.
 * @slot sub-menu - `zeta-sub-menu-item`s and `zeta-collapsible-menu-item`s.
 * @event expanded-change - Fired when the toggle item widens or narrows the rail; `detail.expanded` is the new state.
 * @event action - Fired when the header action is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54061
 * @storybook ?path=/docs/components-navigation-rail--docs
 */
@customElement("zeta-navigation-rail")
export class ZetaNavigationRail extends Contourable(LitElement) {
  /** The wide rail, with every item's label beside its glyph. The toggle item flips it. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Captions under each glyph in the narrow rail (spec: label). No effect when expanded. */
  @property({ type: Boolean, reflect: true, attribute: "show-labels" }) showLabels = false;

  /** Shows the create or compose action under the header. Off by default, so existing rails keep their layout. */
  @property({ type: Boolean, reflect: true, attribute: "show-header-action" }) showHeaderAction = false;

  /** The header action's label: its text in the wide rail, its name in the narrow one, where only the glyph shows. */
  @property({ type: String, attribute: "action-label" }) actionLabel = "Create";

  /** The header action's glyph. */
  @property({ type: String, attribute: "action-icon" }) actionIcon: ZetaIconName = "add_circle_outline";

  /** Shows the toggle item that widens and narrows the rail. Off by default, so existing rails keep their layout. */
  @property({ type: Boolean, reflect: true, attribute: "show-toggle-item" }) showToggleItem = false;

  /** Shows the divider down the rail's trailing edge, between the rail and the page. Off by default, so existing rails keep their layout. */
  @property({ type: Boolean, reflect: true, attribute: "show-divider" }) showDivider = false;

  /** The toggle item's label in the narrow rail. */
  @property({ type: String, attribute: "expand-label" }) expandLabel = "Open";

  /** The toggle item's label in the wide rail. */
  @property({ type: String, attribute: "collapse-label" }) collapseLabel = "Close";

  /** Shows the rail in the opposite shade of the page's mode: dark on a light page, light on a dark one. Contrast still follows the page. */
  @property({ type: Boolean, reflect: true }) inverse = false;

  /** Keeps the rail in one mode whatever the page's mode: dark, or light with `inverse`. Contrast still follows the page. */
  @property({ type: Boolean, reflect: true }) locked = false;

  /**
   * The wide rail's width: 200px by default (Figma's measure), a CSS length or a number in px set by the project, or
   * `fill` to take the width of the rail's container. The narrow rail is unaffected.
   */
  @property({ attribute: "rail-width", reflect: true }) railWidth?: string | number;

  /** Caps the wide rail. A CSS length, or a number in px. The narrow rail is unaffected. */
  @property({ attribute: "rail-max-width" }) railMaxWidth?: string | number;

  /** Caps the sub menu, which otherwise hugs its rows from 240px up. A cap below 240px lowers the minimum. */
  @property({ attribute: "sub-menu-max-width" }) subMenuMaxWidth?: string | number;

  /** Accessible name of the navigation landmark. */
  @property({ type: String, attribute: "nav-label" }) navLabel = "Main";

  @state() private hasHeader = false;
  @state() private hasFooter = false;
  @state() private hasPanel = { header: false, menu: false };
  @state() private ready = false;
  /** The form the parts are drawn in. It follows `expanded` at once when widening, but only once the rail has finished
      narrowing, so the shrinking width clips the wide layout instead of every part re-laying itself out mid-way. */
  @state() private wide = false;
  private narrowTimer?: ReturnType<typeof setTimeout>;
  private themeObserver?: MutationObserver;
  private themeMedia?: MediaQueryList;
  /** The `data-theme` this rail set on itself, so one a consumer set is never removed. */
  private appliedTheme?: "light" | "dark";

  connectedCallback() {
    super.connectedCallback?.();
    if (this.hasUpdated) this.syncTheme();
    requestAnimationFrame(() => (this.ready = true));
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("expanded")) {
      clearTimeout(this.narrowTimer);
      if (this.expanded || !this.ready || !this.wide) this.wide = this.expanded;
      else this.narrowTimer = setTimeout(this.narrow, this.transitionMs() + 50);
    }
    if (changed.has("inverse") || changed.has("locked")) this.syncTheme();
    const set = (name: string, v?: string | number) => {
      const length = toLength(v);
      if (length) this.style.setProperty(name, length);
      else this.style.removeProperty(name);
    };
    if (changed.has("railWidth")) set("--navigation-rail-width", this.railWidth === "fill" ? undefined : this.railWidth);
    if (changed.has("railMaxWidth")) set("--navigation-rail-max-width", this.railMaxWidth);
    if (changed.has("subMenuMaxWidth")) set("--navigation-rail-sub-menu-max-width", this.subMenuMaxWidth);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    clearTimeout(this.narrowTimer);
    this.unwatchTheme();
  }

  /** The page's shade around the rail: the nearest ancestor's `data-theme`, else the system preference. */
  private pageIsDark() {
    const parentOf = (n: Element): Element | null => n.parentElement ?? ((n.getRootNode() as ShadowRoot).host as Element | undefined) ?? null;
    for (let n = parentOf(this); n; n = parentOf(n)) {
      const theme = n.getAttribute("data-theme");
      if (theme === "dark" || theme === "light") return theme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  private unwatchTheme() {
    this.themeObserver?.disconnect();
    this.themeObserver = undefined;
    this.themeMedia?.removeEventListener("change", this.syncTheme);
    this.themeMedia = undefined;
  }

  /**
   * The rail's mode. By default it sets none and inherits the page's. `inverse` sets the opposite of the page's shade
   * and follows the page when it changes; `locked` sets dark, or light with `inverse`. Contrast is a separate attribute
   * on the page, so it carries through either way.
   */
  private syncTheme = () => {
    const owns = this.isConnected && (this.locked || this.inverse);
    const follows = owns && !this.locked;
    if (follows && !this.themeObserver) {
      this.themeObserver = new MutationObserver(this.syncTheme);
      const parentOf = (n: Element): Element | null => n.parentElement ?? ((n.getRootNode() as ShadowRoot).host as Element | undefined) ?? null;
      for (let n = parentOf(this); n; n = parentOf(n)) this.themeObserver.observe(n, { attributes: true, attributeFilter: ["data-theme"] });
      this.themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
      this.themeMedia.addEventListener("change", this.syncTheme);
    } else if (!follows) {
      this.unwatchTheme();
    }
    const next = !owns ? undefined : (this.locked ? !this.inverse : !this.pageIsDark()) ? "dark" : "light";
    if (next) {
      if (this.getAttribute("data-theme") !== next) this.setAttribute("data-theme", next);
    } else if (this.appliedTheme && this.getAttribute("data-theme") === this.appliedTheme) {
      this.removeAttribute("data-theme");
    }
    this.appliedTheme = next;
  };

  /** The rail's width transition in ms; 0 under reduced motion. The timer is the fallback for a missed transitionend. */
  private transitionMs() {
    const rail = this.shadowRoot?.querySelector(".rail");
    if (!rail) return 0;
    const s = getComputedStyle(rail);
    const ms = (v: string) => parseFloat(v) * (v.trim().endsWith("ms") ? 1 : 1000);
    return ms(s.transitionDuration) + ms(s.transitionDelay);
  }

  private narrow = () => {
    clearTimeout(this.narrowTimer);
    if (!this.expanded) this.wide = false;
  };

  private onTransitionEnd = (e: TransitionEvent) => {
    if (e.target === e.currentTarget && e.propertyName === "width") this.narrow();
  };

  protected updated() {
    this.syncParts();
  }

  private syncParts() {
    for (const el of this.querySelectorAll<RailPart>(RAIL_PARTS)) {
      if (el.closest("zeta-navigation-rail") !== this) continue;
      el.rounded = this.rounded;
      if (el.localName === "zeta-navigation-rail-item" || el.localName === "zeta-navigation-header") el.expanded = this.wide;
      if (el.localName === "zeta-navigation-rail-item") el.showLabel = this.showLabels;
    }
  }

  private onSlot = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const filled = slot.assignedElements().length > 0;
    if (slot.name === "header") this.hasHeader = filled;
    if (slot.name === "footer") this.hasFooter = filled;
    if (slot.name === "sub-menu-header") this.hasPanel = { ...this.hasPanel, header: filled };
    if (slot.name === "sub-menu") this.hasPanel = { ...this.hasPanel, menu: filled };
    this.syncParts();
  };

  private toggle = () => {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent("expanded-change", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
  };

  private onAction = () => this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }));

  /* One Button in both forms: it is as wide as the rail's content and its label shrinks away, so the glyph sits centred
     in the narrow rail and the label is revealed, still centred, as the rail widens. The label stays its name. */
  private renderAction() {
    return html`<zeta-button
      class="action"
      size="large"
      flavor="primary"
      shape=${this.rounded ? "rounded" : "sharp"}
      .leadingIcon=${this.actionIcon}
      @click=${this.onAction}
      >${this.actionLabel}</zeta-button
    >`;
  }

  protected render() {
    const showHeader = this.hasHeader || this.showHeaderAction;
    const showFooter = this.hasFooter || this.showToggleItem;
    return html`<nav class="root" aria-label=${this.navLabel} ?data-ready=${this.ready}>
      <div class=${this.wide ? "rail wide" : "rail"} @transitionend=${this.onTransitionEnd}>
        <div class="header" ?hidden=${!showHeader}>
          <slot name="header" @slotchange=${this.onSlot}></slot>
          ${this.showHeaderAction ? this.renderAction() : nothing}
        </div>
        <div class="menu"><slot id="content-slot" @slotchange=${this.onSlot}></slot></div>
        <div class="footer" ?hidden=${!showFooter}>
          <slot name="footer" @slotchange=${this.onSlot}></slot>
          ${
            this.showToggleItem
              ? html`<zeta-navigation-rail-item
                  class="toggle"
                  ?expanded=${this.wide}
                  ?show-label=${this.showLabels}
                  .rounded=${this.rounded}
                  .toggleExpanded=${this.expanded}
                  @click=${this.toggle}
                  ><zeta-icon slot="icon" .rounded=${this.rounded}>${this.expanded ? "left_panel_close" : "left_panel_open"}</zeta-icon>${
                    this.expanded ? this.collapseLabel : this.expandLabel
                  }</zeta-navigation-rail-item
                >`
              : nothing
          }
        </div>
      </div>
      <div class="panel" ?hidden=${!this.hasPanel.header && !this.hasPanel.menu}>
        <slot name="sub-menu-header" @slotchange=${this.onSlot}></slot>
        <div class="sub-menu" ?hidden=${!this.hasPanel.menu}><slot name="sub-menu" @slotchange=${this.onSlot}></slot></div>
      </div>
    </nav>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-rail": ZetaNavigationRail;
  }
}
