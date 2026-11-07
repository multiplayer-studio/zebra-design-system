import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import styles from "./screen-header-bar.styles.js";
import "../icon-button/icon-button.js";

export type ScreenHeaderBarShape = "sharp" | "rounded";
export type ScreenHeaderBarHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Slotted actions whose `shape` the bar sets. Anything else is slotted as-is. */
const SHAPED_TAGS = new Set(["ZDS-BUTTON", "ZDS-ICON-BUTTON"]);

/**
 * The bar at the top of a screen: a back button, the screen's title and one
 * trailing action. Reach for it on a pushed screen with exactly one primary
 * action.
 *
 * Overlaps `<zds-top-app-bar>`, which covers the same screen-level role with
 * more layouts and slots; this is effectively its single-action preset. Use
 * Top App Bar when a screen needs more than one action or a different leading
 * control.
 *
 * Departures from Figma, each a spec issue:
 * - The leading control is a `<zds-icon-button>` (medium, subtle,
 *   `chevron-left`) with its own states, not the "locked Icon" the metadata
 *   describes. It is reachable by keyboard, named "Back" (`back-label`), and
 *   fires `zds-back`.
 * - Height, padding and gap are the bound tokens (space/md around control/md,
 *   left space/sm, gap space/2xs = 64px), not the metadata's 56 / space/lg.
 * - `shape` (Figma `Rounded`) also reaches a slotted `<zds-button>` /
 *   `<zds-icon-button>`, not only the one Figma ships in the slot.
 * - The bar fills its container's width (Figma ships a fixed 474).
 * - No subtitle: Figma's heading wrapper has a gap for one but no property.
 *
 * @slot action - The single trailing action: a `<zds-button>` or `<zds-icon-button>`. The bar sets its `shape`.
 * @fires zds-back - The back button was activated. Bubbles and is composed.
 * @csspart back - The back `<zds-icon-button>`.
 * @csspart title - The heading element.
 *
 * @spec specs/screen-header-bar/screen-header-bar.spec.json
 */
@customElement("zds-screen-header-bar")
export class ZdsScreenHeaderBar extends LitElement {
  static styles = styles;

  /** The screen's name. Name the screen, not the task in progress. Rendered as a real heading. */
  @property({ type: String }) title = "";

  /** Heading level of the title. A screen's own title is its `h1`; lower it when the bar sits inside a larger page. */
  @property({ type: Number, attribute: "heading-level" }) headingLevel: ScreenHeaderBarHeadingLevel = 1;

  /** Show the back button. Leave on for a pushed screen; turn off on a root screen with nowhere to go back to. */
  @property({ type: Boolean, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Accessible name of the back button. */
  @property({ type: String, attribute: "back-label" }) backLabel = "Back";

  /**
   * Corner treatment of the back button and of a slotted action. Figma's
   * `Rounded` true/false, renamed to the `shape` vocabulary the rest of the
   * package uses.
   */
  @property({ type: String, reflect: true }) shape: ScreenHeaderBarShape = "rounded";

  // `title` is also the global tooltip attribute. Read it into the property,
  // then take it off the host so the browser doesn't show a native tooltip
  // over the whole bar (back button and action included): the heading
  // carries the text.
  #strippingTitle = false;

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    if (name !== "title") return super.attributeChangedCallback(name, old, value);
    if (this.#strippingTitle) return;
    super.attributeChangedCallback(name, old, value);
    if (value !== null) {
      this.#strippingTitle = true;
      this.removeAttribute("title");
      this.#strippingTitle = false;
    }
  }

  #actionSlot(): HTMLSlotElement | null {
    return this.renderRoot.querySelector('slot[name="action"]');
  }

  #syncAction = () => {
    const slot = this.#actionSlot();
    if (!slot) return;
    for (const el of slot.assignedElements({ flatten: true })) {
      if (!SHAPED_TAGS.has(el.tagName)) continue;
      const item = el as Element & { shape: string };
      if (item.shape !== this.shape) item.shape = this.shape;
    }
    slot.parentElement?.toggleAttribute("hidden", slot.assignedNodes({ flatten: true }).length === 0);
  };

  #onBack() {
    this.dispatchEvent(new CustomEvent("zds-back", { bubbles: true, composed: true }));
  }

  protected updated() {
    this.#syncAction();
  }

  protected render() {
    const level = [1, 2, 3, 4, 5, 6].includes(Number(this.headingLevel)) ? Number(this.headingLevel) : 1;
    const tag = unsafeStatic(`h${level}`);
    return html`
      ${this.showLeadingIcon
        ? html`<zds-icon-button
            part="back"
            class="leading"
            flavour="subtle"
            size="medium"
            shape=${this.shape}
            icon="chevron-left"
            .label=${this.backLabel}
            @click=${this.#onBack}
          ></zds-icon-button>`
        : ""}
      <div class="heading">${staticHtml`<${tag} part="title" class="title">${this.title}</${tag}>`}</div>
      <div class="action" hidden><slot name="action" @slotchange=${this.#syncAction}></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-screen-header-bar": ZdsScreenHeaderBar;
  }
}
