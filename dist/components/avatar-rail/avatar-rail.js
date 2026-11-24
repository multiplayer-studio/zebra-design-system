var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./avatar-rail.styles.js";
/** Four positions, the first two always present (spec: composition limits). */
const MIN = 2;
const POSITIONS = 4;
/**
 * Shows a group of people as overlapping avatars, with an optional counter
 * standing in for everyone who did not fit. Size moves the whole rail
 * together rather than any single avatar.
 *
 * The avatars are slotted `<zds-avatar>` elements. The rail owns their
 * presentation, as the spec's "parent owned" row says: it sets each one's
 * `size` and turns off its ring, dismiss badge and presence badge, so the
 * group stays uniform; the person shown is the only thing set per avatar.
 * `max` sets how many avatars show (2 to 4, the spec's four positions with
 * the first two always present); Figma does the same with Show Avatar 3/4.
 * Avatars past `max` are given `hidden` (and given back if they come into
 * range), and the counter is generated from them: "+" and the avatars
 * passed in less `max`, a remainder rather than a total (owner decision,
 * 2026-10-18). It shows while `show-overflow` is on and there is a
 * remainder, so a trimmed group never reads as complete.
 *
 * Static: no hover, focus or press, and no motion (spec).
 *
 * @slot - `<zds-avatar>` elements, in display order.
 * @csspart overflow - The counter circle.
 *
 * @spec specs/avatar-rail/avatar-rail.spec.json
 */
let ZdsAvatarRail = class ZdsAvatarRail extends LitElement {
    constructor() {
        super();
        /** One diameter for every avatar in the rail, and for the counter. */
        this.size = "xxxsmall";
        /** start: the first avatar sits above the ones after it. end: reversed. */
        this.stacking = "start";
        /** How many avatars show, 2 to 4. The rest are counted in the overflow. */
        this.max = POSITIONS;
        /** Shows the generated counter when there are more avatars than `max`. */
        this.showOverflow = true;
        /** Accessible name for the group, such as "Assignees". */
        this.label = null;
        /**
         * What the counter counts, for assistive tech; `{count}` is replaced with
         * the number in the counter. The spec: "+2 on its own does not say two
         * more people".
         */
        this.overflowLabel = "{count} more";
        this.hiddenCount = 0;
        this.avatars = [];
        this.internals = this.attachInternals();
        this.internals.role = "group";
    }
    updated() {
        this.internals.ariaLabel = this.label;
        this.arrange();
    }
    onSlotChange(e) {
        const next = e.target
            .assignedElements()
            .filter((el) => el.localName === "zds-avatar");
        // Give back anything the rail hid that has left the slot.
        for (const el of this.avatars)
            if (!next.includes(el))
                el.hidden = false;
        this.avatars = next;
        this.arrange();
    }
    arrange() {
        const n = this.avatars.length;
        const max = this.visibleMax;
        this.avatars.forEach((el, i) => {
            el.size = this.size;
            el.showRing = false;
            el.showClose = false;
            el.showStatus = false;
            el.hidden = i >= max;
            // Paint order is the only thing Stacking changes (spec).
            el.style.zIndex = String(this.stacking === "start" ? n - i : i + 1);
        });
        const hidden = Math.max(0, n - max);
        if (hidden !== this.hiddenCount)
            this.hiddenCount = hidden;
    }
    /** `max` clamped to the spec's positions; anything unparseable falls back to four. */
    get visibleMax() {
        const m = Math.floor(Number(this.max));
        return Number.isFinite(m) ? Math.min(POSITIONS, Math.max(MIN, m)) : POSITIONS;
    }
    /** The remainder the counter shows, such as "+2", or "" when nothing is hidden. */
    get overflowCount() {
        return this.hiddenCount ? `+${this.hiddenCount}` : "";
    }
    render() {
        const text = this.overflowCount;
        const count = String(this.hiddenCount);
        return html `<span class="rail"
      ><slot @slotchange=${this.onSlotChange}></slot
      >${this.showOverflow && text
            ? html `<span
            part="overflow"
            class="overflow"
            style="z-index:${this.stacking === "end" ? POSITIONS + 1 : 0}"
            role="img"
            aria-label=${this.overflowLabel.replace("{count}", count)}
            ><span class="count" aria-hidden="true">${text}</span></span
          >`
            : nothing}</span
    >`;
    }
};
ZdsAvatarRail.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsAvatarRail.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsAvatarRail.prototype, "stacking", void 0);
__decorate([
    property({ type: Number, reflect: true })
], ZdsAvatarRail.prototype, "max", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-overflow", reflect: true })
], ZdsAvatarRail.prototype, "showOverflow", void 0);
__decorate([
    property({ type: String })
], ZdsAvatarRail.prototype, "label", void 0);
__decorate([
    property({ type: String, attribute: "overflow-label" })
], ZdsAvatarRail.prototype, "overflowLabel", void 0);
__decorate([
    state()
], ZdsAvatarRail.prototype, "hiddenCount", void 0);
ZdsAvatarRail = __decorate([
    customElement("zds-avatar-rail")
], ZdsAvatarRail);
export { ZdsAvatarRail };
