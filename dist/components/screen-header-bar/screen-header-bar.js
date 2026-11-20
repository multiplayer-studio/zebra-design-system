var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ZdsScreenHeaderBar_instances, _ZdsScreenHeaderBar_strippingTitle, _ZdsScreenHeaderBar_actionSlot, _ZdsScreenHeaderBar_syncAction, _ZdsScreenHeaderBar_onBack;
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import styles from "./screen-header-bar.styles.js";
import "../icon-button/icon-button.js";
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
let ZdsScreenHeaderBar = class ZdsScreenHeaderBar extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsScreenHeaderBar_instances.add(this);
        /** The screen's name. Name the screen, not the task in progress. Rendered as a real heading. */
        this.title = "";
        /** Heading level of the title. A screen's own title is its `h1`; lower it when the bar sits inside a larger page. */
        this.headingLevel = 1;
        /** Show the back button. Leave on for a pushed screen; turn off on a root screen with nowhere to go back to. */
        this.showLeadingIcon = true;
        /** Accessible name of the back button. */
        this.backLabel = "Back";
        /**
         * Corner treatment of the back button and of a slotted action. Figma's
         * `Rounded` true/false, renamed to the `shape` vocabulary the rest of the
         * package uses.
         */
        this.shape = "rounded";
        // `title` is also the global tooltip attribute. Read it into the property,
        // then take it off the host so the browser doesn't show a native tooltip
        // over the whole bar (back button and action included): the heading
        // carries the text.
        _ZdsScreenHeaderBar_strippingTitle.set(this, false);
        _ZdsScreenHeaderBar_syncAction.set(this, () => {
            const slot = __classPrivateFieldGet(this, _ZdsScreenHeaderBar_instances, "m", _ZdsScreenHeaderBar_actionSlot).call(this);
            if (!slot)
                return;
            for (const el of slot.assignedElements({ flatten: true })) {
                if (!SHAPED_TAGS.has(el.tagName))
                    continue;
                const item = el;
                if (item.shape !== this.shape)
                    item.shape = this.shape;
            }
            slot.parentElement?.toggleAttribute("hidden", slot.assignedNodes({ flatten: true }).length === 0);
        });
    }
    attributeChangedCallback(name, old, value) {
        if (name !== "title")
            return super.attributeChangedCallback(name, old, value);
        if (__classPrivateFieldGet(this, _ZdsScreenHeaderBar_strippingTitle, "f"))
            return;
        super.attributeChangedCallback(name, old, value);
        if (value !== null) {
            __classPrivateFieldSet(this, _ZdsScreenHeaderBar_strippingTitle, true, "f");
            this.removeAttribute("title");
            __classPrivateFieldSet(this, _ZdsScreenHeaderBar_strippingTitle, false, "f");
        }
    }
    updated() {
        __classPrivateFieldGet(this, _ZdsScreenHeaderBar_syncAction, "f").call(this);
    }
    render() {
        const level = [1, 2, 3, 4, 5, 6].includes(Number(this.headingLevel)) ? Number(this.headingLevel) : 1;
        const tag = unsafeStatic(`h${level}`);
        return html `
      ${this.showLeadingIcon
            ? html `<zds-icon-button
            part="back"
            class="leading"
            flavour="subtle"
            size="medium"
            shape=${this.shape}
            icon="chevron-left"
            .label=${this.backLabel}
            @click=${__classPrivateFieldGet(this, _ZdsScreenHeaderBar_instances, "m", _ZdsScreenHeaderBar_onBack)}
          ></zds-icon-button>`
            : ""}
      <div class="heading">${staticHtml `<${tag} part="title" class="title">${this.title}</${tag}>`}</div>
      <div class="action" hidden><slot name="action" @slotchange=${__classPrivateFieldGet(this, _ZdsScreenHeaderBar_syncAction, "f")}></slot></div>
    `;
    }
};
_ZdsScreenHeaderBar_strippingTitle = new WeakMap();
_ZdsScreenHeaderBar_syncAction = new WeakMap();
_ZdsScreenHeaderBar_instances = new WeakSet();
_ZdsScreenHeaderBar_actionSlot = function _ZdsScreenHeaderBar_actionSlot() {
    return this.renderRoot.querySelector('slot[name="action"]');
};
_ZdsScreenHeaderBar_onBack = function _ZdsScreenHeaderBar_onBack() {
    this.dispatchEvent(new CustomEvent("zds-back", { bubbles: true, composed: true }));
};
ZdsScreenHeaderBar.styles = styles;
__decorate([
    property({ type: String })
], ZdsScreenHeaderBar.prototype, "title", void 0);
__decorate([
    property({ type: Number, attribute: "heading-level" })
], ZdsScreenHeaderBar.prototype, "headingLevel", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-leading-icon" })
], ZdsScreenHeaderBar.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "back-label" })
], ZdsScreenHeaderBar.prototype, "backLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsScreenHeaderBar.prototype, "shape", void 0);
ZdsScreenHeaderBar = __decorate([
    customElement("zds-screen-header-bar")
], ZdsScreenHeaderBar);
export { ZdsScreenHeaderBar };
