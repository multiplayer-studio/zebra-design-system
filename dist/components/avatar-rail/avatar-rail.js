var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import styles from "./avatar-rail.styles.js";
import { customElement, property, state } from "lit/decorators.js";
/**
 * Shows a group of people as overlapping avatars, with a counter standing in for everyone who did not fit. Up to `max`
 * avatars show (two to four, the first two always), each overlapping the next by a quarter of its diameter. Everyone
 * past `max` is counted into the overflow, so six avatars at `max` 4 read +2. Size moves the whole rail together.
 *
 * Reach for it where the group matters more than the individuals, and for a single Avatar where one person is the
 * subject.
 *
 * @slot {zeta-avatar[]} - The avatars to be displayed in the rail.
 * @part overflow - The counter circle.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6494-1953
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-avatar-rail--docs
 */
let ZetaAvatarRail = class ZetaAvatarRail extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Shows the close icon on all avatars in the rail. An avatar's own `show-close` attribute takes precedence.
         * The spec's rail pins close off; this stays for existing Zeta use.
         */
        this.showClose = false;
        /** Which end of the stack is shown whole: `start` puts the first avatar on top, `end` the last (and the counter). */
        this.stacking = "start";
        /** How many avatars show, from 2 to 4. Everyone past it is counted into the overflow. */
        this.max = 4;
        /** Shows the counter when there are more avatars than `max`. Turn off only where the rail shows the whole group. */
        this.showOverflow = true;
        this.avatarCount = 0;
        this.handleSlotChange = () => {
            this.avatarCount = this.avatars.length;
            this.syncClose();
        };
    }
    get avatars() {
        const slot = this.shadowRoot?.querySelector("slot");
        return (slot?.assignedElements({ flatten: true }) ?? []).filter(el => el.tagName === "ZETA-AVATAR");
    }
    /** Propagates the rail's `show-close` to avatars that do not set their own. */
    syncClose() {
        for (const avatar of this.avatars) {
            if (this.showClose && !avatar.hasAttribute("show-close")) {
                avatar.showClose = true;
                avatar.dataset.railClose = "";
            }
            else if (!this.showClose && "railClose" in avatar.dataset) {
                avatar.showClose = false;
                delete avatar.dataset.railClose;
            }
        }
    }
    updated(changed) {
        if (changed.has("showClose"))
            this.syncClose();
    }
    render() {
        const remainder = this.avatarCount - this.max;
        return html `<slot @slotchange=${this.handleSlotChange}></slot>${this.showOverflow && remainder > 0
            ? html `<span class="overflow" part="overflow" role="img" aria-label=${`${remainder} more`}>+${remainder}</span>`
            : nothing}`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-close" })
], ZetaAvatarRail.prototype, "showClose", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaAvatarRail.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaAvatarRail.prototype, "stacking", void 0);
__decorate([
    property({ type: Number, reflect: true })
], ZetaAvatarRail.prototype, "max", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-overflow" })
], ZetaAvatarRail.prototype, "showOverflow", void 0);
__decorate([
    state()
], ZetaAvatarRail.prototype, "avatarCount", void 0);
ZetaAvatarRail = __decorate([
    customElement("zeta-avatar-rail")
], ZetaAvatarRail);
export { ZetaAvatarRail };
//# sourceMappingURL=avatar-rail.js.map