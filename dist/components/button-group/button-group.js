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
var _ZdsButtonGroup_instances, _ZdsButtonGroup_observer, _ZdsButtonGroup_collect, _ZdsButtonGroup_adopt;
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles, { itemStyles } from "./button-group.styles.js";
import "../divider/divider.js";
/** The items the group configures. Anything else is slotted as-is. */
const ITEM_TAGS = new Set(["ZDS-BUTTON", "ZDS-ICON-BUTTON"]);
/** One shared sheet, adopted into each item's shadow root (see `#adopt`). */
let itemSheet = null;
/**
 * A row of related actions sharing one bordered surface, where each carries
 * equal weight rather than one leading. Reach for a single `<zds-button>`
 * when one action is clearly the primary one.
 *
 * Items are slotted `<zds-button>` and/or `<zds-icon-button>` children. The
 * group sets each one's `size` from its own, pins `flavour="subtle"` and
 * `shape="sharp"` (spec: size, shape and flavour belong to the group, never
 * set per item) and draws a vertical `<zds-divider>` between every pair.
 * Figma's per-size, per-position wrapper sets are an authoring arrangement
 * and are not reproduced: position comes from the item's index.
 *
 * The dividers sit between slotted children, which a single default slot
 * can't do, so the shadow root uses manual slot assignment: one slot per
 * child, assigned in `updated()`, re-synced whenever children change.
 *
 * Semantics match the React package: a `role="group"` named by `label`, each
 * item its own tab stop (no roving focus — see ButtonGroup.tsx for why Base
 * UI's Toolbar was not used there).
 *
 * @slot - The actions: `<zds-button>` / `<zds-icon-button>` elements.
 * @csspart group - The bordered `role="group"` surface.
 * @csspart divider - Each rule between two items.
 *
 * @spec specs/button-group/button-group.spec.json
 */
let ZdsButtonGroup = class ZdsButtonGroup extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsButtonGroup_instances.add(this);
        /** Row height and the size of every item. The group's call, never set per item. */
        this.size = "medium";
        /** Rounds the group's outline and the outer ends of its first and last item only. */
        this.shape = "sharp";
        /** The accessible name: what the actions have in common. */
        this.label = "";
        this._items = [];
        _ZdsButtonGroup_observer.set(this, new MutationObserver(() => __classPrivateFieldGet(this, _ZdsButtonGroup_instances, "m", _ZdsButtonGroup_collect).call(this)));
    }
    connectedCallback() {
        super.connectedCallback();
        __classPrivateFieldGet(this, _ZdsButtonGroup_observer, "f").observe(this, { childList: true, characterData: true, subtree: false });
        __classPrivateFieldGet(this, _ZdsButtonGroup_instances, "m", _ZdsButtonGroup_collect).call(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        __classPrivateFieldGet(this, _ZdsButtonGroup_observer, "f").disconnect();
    }
    updated() {
        const slots = this.renderRoot.querySelectorAll("slot");
        this._items.forEach((node, i) => {
            slots[i]?.assign(node);
            if (!(node instanceof Element) || !ITEM_TAGS.has(node.tagName))
                return;
            const item = node;
            if (item.size !== this.size)
                item.size = this.size;
            if (item.flavour !== "subtle")
                item.flavour = "subtle";
            if (item.shape !== "sharp")
                item.shape = "sharp";
            node.toggleAttribute("data-zds-group-start", i === 0);
            node.toggleAttribute("data-zds-group-end", i === this._items.length - 1);
            void __classPrivateFieldGet(this, _ZdsButtonGroup_instances, "m", _ZdsButtonGroup_adopt).call(this, node);
        });
    }
    render() {
        return html `
      <div part="group" class="group" role="group" aria-label=${this.label || nothing}>
        ${this._items.map((_, i) => html `${i > 0
            ? /* Spec issue: Figma drops the divider after item 1 on
                 medium/rounded. Here every pair gets one. */
                html `<zds-divider part="divider" orientation="vertical"></zds-divider>`
            : nothing}<slot></slot>`)}
      </div>
    `;
    }
};
_ZdsButtonGroup_observer = new WeakMap();
_ZdsButtonGroup_instances = new WeakSet();
_ZdsButtonGroup_collect = function _ZdsButtonGroup_collect() {
    const next = [...this.childNodes].filter((n) => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim()));
    for (const old of this._items) {
        if (old instanceof Element && !next.includes(old)) {
            old.removeAttribute("data-zds-group-start");
            old.removeAttribute("data-zds-group-end");
        }
    }
    this._items = next;
};
_ZdsButtonGroup_adopt = 
/**
 * The outer-end radius has to land on the item's inner `<button>`, inside
 * its own shadow root, which the group's styles can't reach (`::part()`
 * doesn't apply to slotted elements). So one small sheet is adopted into
 * each item's shadow root, keyed off `data-zds-group-start` / `-end`; it
 * reads `--zds-button-group-inner-radius`, which only a rounded group sets.
 * Button itself is unchanged. React styles `.zds-button` directly.
 */
async function _ZdsButtonGroup_adopt(el) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    const root = el.shadowRoot;
    if (!root)
        return;
    itemSheet ??= (() => {
        const s = new CSSStyleSheet();
        s.replaceSync(itemStyles);
        return s;
    })();
    if (!root.adoptedStyleSheets.includes(itemSheet))
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, itemSheet];
};
ZdsButtonGroup.styles = styles;
ZdsButtonGroup.shadowRootOptions = { ...LitElement.shadowRootOptions, slotAssignment: "manual" };
__decorate([
    property({ type: String, reflect: true })
], ZdsButtonGroup.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsButtonGroup.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], ZdsButtonGroup.prototype, "label", void 0);
__decorate([
    state()
], ZdsButtonGroup.prototype, "_items", void 0);
ZdsButtonGroup = __decorate([
    customElement("zds-button-group")
], ZdsButtonGroup);
export { ZdsButtonGroup };
