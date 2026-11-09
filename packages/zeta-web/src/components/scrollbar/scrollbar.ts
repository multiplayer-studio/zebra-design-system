import { html, LitElement, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./scrollbar.styles.js";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The scroll indicator for a region that clips its content. A padded gutter holds a pill handle whose position and
 * length mirror the scroll offset; hovering raises a track scrim so the grab target reads. The scrolling region, not
 * the bar, owns the behaviour: the element is presentational, takes no focus and fires no events — expose scrolling
 * through the region itself.
 *
 * `value` and `size` are code inputs the spec leaves to the implementation (Figma draws one sample). Size the bar to
 * the region's edge with `--scrollbar-length` (typically `100%`); unset, it draws at the sample length.
 *
 * @cssproperty --scrollbar-length - The bar's length along its axis. Defaults to the drawn sample (200px); set it to the scrolling region's edge.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6057-11947
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-scrollbar--docs
 */
@customElement("zeta-scrollbar")
export class ZetaScrollbar extends LitElement {
  /** The axis the region scrolls. Vertical stands against the trailing edge; horizontal lies along the bottom. */
  @property({ type: String, reflect: true }) orientation: "vertical" | "horizontal" = "vertical";

  /** Where the handle sits: 0 is the start of the content, 1 the end. Code-only — Figma draws one sample. */
  @property({ type: Number }) value = 0;

  /** The handle's length as the viewport's share of the content, 0–1. Code-only; defaults to the drawn sample. */
  @property({ type: Number }) size = 0.32;

  private internals = this.attachInternals();

  constructor() {
    super();
    // Presentational: assistive technology reaches scrolling through the region, not the bar.
    this.internals.role = "none";
  }

  connectedCallback() {
    super.connectedCallback?.();
    // Not in the constructor: a custom element must not gain attributes there.
    this.setAttribute("aria-hidden", "true");
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("value")) this.style.setProperty("--_value", String(clamp01(this.value)));
    if (changed.has("size")) this.style.setProperty("--_size", String(clamp01(this.size)));
  }

  protected render() {
    return html`<span class="track"></span><span class="rail"><span class="handle"></span></span>`;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-scrollbar": ZetaScrollbar;
  }
}
