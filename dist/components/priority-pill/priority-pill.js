var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./priority-pill.styles.js";
import "../icon/icon.js";
/** Fixed per level (spec): the glyph, the default rank and the default name. */
const LEVELS = {
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
let ZdsPriorityPill = class ZdsPriorityPill extends LitElement {
    constructor() {
        super(...arguments);
        /** Fill, circle, label colour and glyph move together. */
        this.level = "low";
        /** lozenge: circle and label. badge: the circle alone. */
        this.variant = "lozenge";
        this.size = "large";
        /** A direction glyph, or the rank number. */
        this.leading = "icon";
        /** The rank shown when `leading="number"`. One or two characters. Defaults to the level's rank (urgent 1 … low 4). */
        this.priorityNumber = null;
    }
    render() {
        const l = LEVELS[this.level] ?? LEVELS.low;
        const content = this.leading === "number"
            ? html `<span class="rank">${this.priorityNumber ?? l.rank}</span>`
            : html `<zds-icon name=${l.glyph} size="small" .iconStyle=${"rounded"}></zds-icon>`;
        return html `<span part="root" class="root"><span class="circle" aria-hidden="true">${content}</span><span class="label"><slot>${l.text}</slot></span></span>`;
    }
};
ZdsPriorityPill.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsPriorityPill.prototype, "level", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsPriorityPill.prototype, "variant", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsPriorityPill.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsPriorityPill.prototype, "leading", void 0);
__decorate([
    property({ type: String, attribute: "priority-number" })
], ZdsPriorityPill.prototype, "priorityNumber", void 0);
ZdsPriorityPill = __decorate([
    customElement("zds-priority-pill")
], ZdsPriorityPill);
export { ZdsPriorityPill };
