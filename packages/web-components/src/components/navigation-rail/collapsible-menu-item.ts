import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import { collapsibleStyles } from "./navigation-rail.styles.js";
import { subMenuRowContent, truncatedLabelTooltip, type SubMenuItemBadge } from "../sub-menu-item/sub-menu-item.js";
import type { ZdsSubMenuItem } from "../sub-menu-item/sub-menu-item.js";
import type { NavigationRailShape } from "./navigation-rail.js";

/** The first duration in an element's computed `transition-duration`, in ms (0 under reduced motion). */
function motionMs(el: Element): number {
  const d = getComputedStyle(el).transitionDuration.split(",")[0]?.trim() ?? "0s";
  const n = parseFloat(d);
  return Number.isFinite(n) ? (d.endsWith("ms") ? n : n * 1000) : 0;
}

/**
 * A Sub Menu Item that opens a group of nested rows beneath it.
 *
 * The header is a `<button>` with `aria-expanded` / `aria-controls`; the
 * rows sit in a `role="region"` named by it, `hidden` while closed — the
 * semantics React gets from Base UI's Collapsible. The header is a sub menu
 * row with its caret turned vertical (`expand-more`, rotated 180° when open —
 * one glyph, owner decision). Open, the header takes the ghost pressed fill
 * as Figma draws (State=active), the token alone (spec warn "Double alpha"),
 * and the rows sit on surface/subtle. The group sets `nested` and its `shape`
 * on its rows. Opening and closing animate the rows' height on
 * animations/smooth (owner decision), with the same state attributes Base
 * UI's Collapsible gives the React build; not on first render, and not
 * under prefers-reduced-motion.
 *
 * @slot - zds-sub-menu-item rows.
 * @fires zds-open-change - The header was pressed. `detail.open` is the new value (already applied).
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Collapsible Menu Item)
 */
@customElement("zds-collapsible-menu-item")
export class ZdsCollapsibleMenuItem extends LitElement {
  static styles = collapsibleStyles;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** The group's name, on its header row. */
  @property({ type: String }) label = "Label";

  /** Header glyph. Figma ships a `verified` placeholder. */
  @property({ type: String }) icon: IconName = "verified";

  /** Shows the header glyph. */
  @property({ type: Boolean, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Counter badge on the header row, as on zds-sub-menu-item. */
  @property({
    converter: { fromAttribute: (v: string | null) => (v === null || v === "" ? null : v) },
  })
  badge: SubMenuItemBadge = null;

  /** Text equivalent of the badge. */
  @property({ type: String, attribute: "badge-label" }) badgeLabel: string | null = null;

  /** Whether the group is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Corner shape of the group and its rows: rounded (`radius/sm`) or sharp
   * (`radius/none`). Inside a zds-navigation-rail the rail's `shape` sets it.
   */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /** The header cannot be pressed. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected render() {
    return html`
      <button
        part="header"
        id="header"
        type="button"
        class="row header"
        aria-expanded=${String(this.open)}
        aria-controls="panel"
        ?disabled=${this.disabled}
        data-disabled=${this.disabled ? "" : nothing}
        data-shape=${this.shape}
        @click=${this.#toggle}
      >
        ${subMenuRowContent({
          label: this.label,
          icon: this.icon,
          showLeadingIcon: this.showLeadingIcon,
          badge: this.badge,
          badgeLabel: this.badgeLabel,
          caret: "vertical",
          open: this.open,
        })}
      </button>
      <!-- A truncated header label shows in full after a 3s hover, as on the rows. -->
      ${truncatedLabelTooltip({ anchorId: "header", label: this.label, shape: this.shape, root: this.renderRoot as ShadowRoot })}
      <div part="panel" id="panel" class="panel" role="region" aria-labelledby="header">
        <div class="children"><slot @slotchange=${this.#nest}></slot></div>
      </div>
    `;
  }

  #motionTimer: ReturnType<typeof setTimeout> | undefined;

  private get panel() {
    return this.renderRoot.querySelector<HTMLElement>(".panel")!;
  }

  protected firstUpdated() {
    // `hidden` is managed here, not bound in the template, so a close can
    // hold the rows visible until its transition ends.
    this.panel.hidden = !this.open;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("shape")) this.#nestRows();
    // A real change only (the previous value is a boolean): no motion on first render.
    if (changed.has("open") && typeof changed.get("open") === "boolean") this.#animatePanel();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.#motionTimer);
    if (this.hasUpdated) this.#settle();
  }

  /** The resting state: no motion attributes, auto height, `hidden` while closed. */
  #settle() {
    const panel = this.panel;
    panel.removeAttribute("data-starting-style");
    panel.removeAttribute("data-ending-style");
    panel.style.setProperty("--collapsible-panel-height", "auto");
    panel.hidden = !this.open;
  }

  /** One transition per change, from the measured height to 0 or back; settles when it ends. */
  #animatePanel() {
    const panel = this.panel;
    clearTimeout(this.#motionTimer);
    const ms = motionMs(panel);
    if (!ms) return this.#settle();
    if (this.open) {
      panel.removeAttribute("data-ending-style");
      panel.hidden = false;
      panel.setAttribute("data-starting-style", "");
      panel.style.setProperty("--collapsible-panel-height", `${panel.scrollHeight}px`);
      void panel.offsetHeight; // commit the starting frame
      panel.removeAttribute("data-starting-style");
    } else {
      panel.style.setProperty("--collapsible-panel-height", `${panel.scrollHeight}px`);
      void panel.offsetHeight; // commit the measured height
      panel.setAttribute("data-ending-style", "");
    }
    this.#motionTimer = setTimeout(() => this.#settle(), ms);
  }

  #nest = () => this.#nestRows();

  #nestRows() {
    const slot = this.renderRoot.querySelector("slot");
    for (const el of slot?.assignedElements() ?? []) {
      if (el.localName !== "zds-sub-menu-item") continue;
      (el as ZdsSubMenuItem).nested = true;
      (el as ZdsSubMenuItem).shape = this.shape;
    }
  }

  #toggle = () => {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open: this.open }, bubbles: true, composed: true }));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-collapsible-menu-item": ZdsCollapsibleMenuItem;
  }
}
