import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./priority-pill.styles.js";
import "../icon/icon.js";

export type PriorityLevel = "low" | "medium" | "high" | "urgent";
export type PriorityVariant = "lozenge" | "badge";
export type PrioritySize = "small" | "large";
export type PriorityLeading = "icon" | "number";

/** Fixed per level (spec): the glyph, the default rank and the default name. */
const LEVELS: Record<PriorityLevel, { glyph: IconName; rank: string; text: string }> = {
  low: { glyph: "arrow-down", rank: "4", text: "Low" },
  medium: { glyph: "remove", rank: "3", text: "Medium" },
  high: { glyph: "arrow-up", rank: "2", text: "High" },
  urgent: { glyph: "priority", rank: "1", text: "Urgent" },
};

/**
 * Shows where an item sits on a four step scale, from low to urgent. Level
 * sets the fill, the circle and the glyph together, Variant decides whether
 * the name appears beside the circle or the circle stands alone, and Leading
 * swaps the glyph for a rank number. Reach for it where items compete for
 * attention and the order between them is the point.
 *
 * Not interactive. On `badge` the label is not drawn; it is kept as a
 * visually hidden accessible name so the level still reaches assistive
 * technology (the spec asks for a name from the surrounding structure).
 *
 * @slot - The priority name (Label). Defaults to the level's name.
 * @csspart root - The pill.
 *
 * @spec specs/badges/priority-pill.spec.json
 */
@customElement("zds-priority-pill")
export class ZdsPriorityPill extends LitElement {
  static styles = styles;

  /** Fill, circle, label colour and glyph move together. */
  @property({ type: String, reflect: true }) level: PriorityLevel = "low";

  /** lozenge: circle and label. badge: the circle alone. */
  @property({ type: String, reflect: true }) variant: PriorityVariant = "lozenge";

  @property({ type: String, reflect: true }) size: PrioritySize = "large";

  /** A direction glyph, or the rank number. */
  @property({ type: String, reflect: true }) leading: PriorityLeading = "icon";

  /** The rank shown when `leading="number"`. One or two characters. Defaults to the level's rank (urgent 1 … low 4). */
  @property({ type: String, attribute: "priority-number" }) priorityNumber: string | null = null;

  protected render() {
    const l = LEVELS[this.level] ?? LEVELS.low;
    const content = this.leading === "number"
      ? html`<span class="rank">${this.priorityNumber ?? l.rank}</span>`
      : html`<zds-icon name=${l.glyph} size="small" .iconStyle=${"rounded"}></zds-icon>`;
    return html`<span part="root" class="root"><span class="circle" aria-hidden="true">${content}</span><span class="label"><slot>${l.text}</slot></span></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-priority-pill": ZdsPriorityPill; }
}
