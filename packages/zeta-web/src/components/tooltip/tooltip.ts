import { customElement, property } from "lit/decorators.js";
import { html, LitElement, type PropertyValues } from "lit";
import styles from "./tooltip.styles.js";
import { Contourable } from "../../mixins/mixins.js";

/* Each point slides in from the side away from its tip, toward the trigger. */
const ENTER_FROM: Record<ZetaTooltip["point"], string> = {
  bottom: "translateY(-4px)",
  top: "translateY(4px)",
  left: "translateX(4px)",
  right: "translateX(-4px)"
};

/** A short floating message that names what an adjacent control does. `point` is the edge the arrow sits on, the edge
 * facing the trigger: bottom puts the bubble above its trigger, left puts it to the right. Placing it against the
 * trigger, and showing and hiding it, belong to whatever uses it. Give the control its own accessible name too: a
 * tooltip alone never reaches anyone who doesn't hover.
 *
 * @slot - The label: a few words naming the action. A long one wraps.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5470-1664
 * @storybook ?path=/docs/components-tooltip--docs
 */
@customElement("zeta-tooltip")
export class ZetaTooltip extends Contourable(LitElement) {
  /** The edge the pointer sits on, facing the trigger. */
  @property({ type: String, reflect: true }) point: "left" | "right" | "top" | "bottom" = "bottom";

  /** The label, when nothing is slotted. */
  @property({ type: String }) label = "";

  private internals = this.attachInternals();

  constructor() {
    super();
    this.internals.role = "tooltip";
  }

  protected firstUpdated(_changed: PropertyValues<this>) {
    // Fades in while sliding toward the trigger, on animations/smooth; nothing under reduced motion.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timing = getComputedStyle(this).getPropertyValue("--animations-smooth").trim().split(" ");
    const duration = parseFloat(timing[0]) || 250;
    this.renderRoot.querySelector(".container")?.animate(
      [
        { opacity: 0, transform: ENTER_FROM[this.point] },
        { opacity: 1, transform: "none" }
      ],
      {
        duration,
        easing: timing.slice(1).join(" ") || "ease-in-out"
      }
    );
  }

  static styles = [super.styles ?? [], styles];

  protected render() {
    return html`
      <div class="container">
        <slot>${this.label}</slot>
        <svg class="point" xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none" aria-hidden="true">
          <path d="${this.rounded ? "M3.29289 3.29289C3.68342 3.68342 4.31658 3.68342 4.70711 3.29289L8 0H0L3.29289 3.29289Z" : "M4 4L8 0H0L4 4Z"}" />
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tooltip": ZetaTooltip;
  }
}
