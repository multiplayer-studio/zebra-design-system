import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import { zetaIconGlyph, type ZetaIconName } from "../../icons.js";

/**
 *
 * The Zeta icon component draws glyphs from the Zebra Design System icon set, `@zebra-design-system/icons`.
 * A name is the set's own kebab-case name (`expand-more`); the same name with underscores (`expand_more`) also works.
 * These icons can be rendered as rounded or sharp; and the size and color can be customized using CSS variables.
 *
 * To use this component, you can either use the `name` prop or place an icon in the slot.
 * Using the name prop allows for better typescript integration, whereas using the slot allows for more flexibility in terms of custom icons.
 *
 * ```html
 * <zeta-icon name="home"></zeta-icon>
 * ```
 * or
 * ```html
 * <zeta-icon>home</zeta-icon>
 * ```
 *
 *
 * Custom icons can be created by placing an SVG in the slot:
 *
 * ```html
 * <zeta-icon>
 *   <svg>
 *   ...
 *   </svg>
 * </zeta-icon>
 * ```
 *
 * The embedding component passes its foreground through `--icon-color` (falling back to `--main-default`). The icon is
 * decorative on its own: the meaning has to come from a label beside it or an accessible name on the control around it.
 *
 * `size` picks one of the Zebra icon sizes (`control/icon-xs`, `-sm`, `-md`, `-lg`: 12, 16, 20 and 28px); without it the icon keeps
 * `--icon-size` or its 24px default, as every existing embed expects. `framed` pads the glyph to a 40px box
 * (`control/target-min`) so a standalone icon meets the touch target on its own; xsmall frames to 24px (`control/xs`).
 *
 * @cssproperty --icon-size The width/height of the icon
 * @cssproperty --icon-color The color of the icon
 * @cssproperty --icon-border-width The border width of the icon.
 * @cssproperty --icon-border-color The border color of the icon.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2046-15004
 * @slot {ZetaIconName} - Name of icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`. If this value and the name prop are both populated, the name prop will take precedence.
 */
@customElement("zeta-icon")
export class ZetaIcon extends Contourable(LitElement) {
  /** Name of icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
   *
   * If this value and the slot are both populated, this will take precedence.
   */
  @property({ type: String }) name: ZetaIconName;

  /** Size of the glyph: xsmall (12px), small (16px), medium (20px) or large (28px). Unset, the icon keeps `--icon-size` or 24px. */
  @property({ type: String, reflect: true }) size?: "xsmall" | "small" | "medium" | "large";

  /** Pads the glyph to a fixed box, 40px (24px at xsmall), so it meets the minimum touch target on its own. Adds space, nothing visible. */
  @property({ type: Boolean, reflect: true }) framed: boolean = false;

  /** The glyph for a name placed in the slot, directly or forwarded through another component's slot. */
  @state() private slottedGlyph?: string;

  private observer?: MutationObserver;

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call -- LitElement always implements it
    super.connectedCallback();
    // A slotted name is text, and text can change without the slot changing.
    this.observer = new MutationObserver(() => this.readSlot());
  }

  disconnectedCallback() {
    // eslint-disable-next-line wc/guard-super-call -- LitElement always implements it
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  protected firstUpdated() {
    this.readSlot();
  }

  /**
   * Reads the name that reaches the slot. A component such as Icon Button forwards its own slot into this one, so the
   * name is read from what the slot finally holds, not from this element's children.
   */
  private readSlot = () => {
    const slot = this.renderRoot.querySelector("slot");
    const nodes = slot?.assignedNodes({ flatten: true }) ?? [];
    const texts = nodes.filter(node => node.nodeType === Node.TEXT_NODE);
    // Anything other than text, such as an SVG, is shown as it is.
    const name = texts.length === nodes.length ? texts.map(node => node.textContent ?? "").join("") : "";
    this.slottedGlyph = zetaIconGlyph(name);
    // Watch the text itself: it may live in another component, where a change does not reach this slot as an event.
    this.observer?.disconnect();
    this.observer?.observe(this, { characterData: true, childList: true, subtree: true });
    texts.forEach(node => this.observer?.observe(node, { characterData: true }));
  };

  protected render() {
    // The name property wins. A name the set doesn't have is shown as written, so a mistake is visible.
    if (this.name) return html`${zetaIconGlyph(this.name) ?? this.name}`;
    // A slotted name is drawn as its glyph. The name itself stays in the page as text, taking no room, so it can
    // still be read and found.
    const glyph = this.slottedGlyph;
    return html`${glyph ? html`<span aria-hidden="true">${glyph}</span>` : nothing}<slot
        class=${glyph ? "named" : nothing}
        @slotchange=${this.readSlot}
      ></slot>`;
  }
  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon": ZetaIcon;
  }
}
