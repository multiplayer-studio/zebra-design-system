var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable, Interactive } from "../../mixins/mixins.js";
import styles from "./collapsible-menu-item.styles.js";
import "./caret-indicator.js";
import "./sub-menu-item.js";
/**
 * A group in the Navigation Rail's sub menu: a header row that opens to show nested Sub Menu Items on surface/subtle.
 * The header carries `aria-expanded`; the rows reveal on animations/smooth, off under reduced motion. Slotted
 * `zeta-sub-menu-item`s are set to `nested` and follow the group's `rounded`.
 *
 * @slot - The nested rows: `zeta-sub-menu-item`s.
 * @slot heading - The group's name.
 * @slot {zeta-icon} icon - The header's leading glyph.
 * @event toggle - Fired when the header opens or closes the group; `detail.open` is the new state.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54352
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
let ZetaCollapsibleMenuItem = class ZetaCollapsibleMenuItem extends Contourable(Interactive(LitElement)) {
    constructor() {
        super(...arguments);
        /** Whether the group's rows show. */
        this.open = false;
        /** Shows the header's leading glyph. */
        this.showLeadingIcon = true;
        this.nestRows = () => {
            const slot = this.renderRoot.querySelector("slot:not([name])");
            for (const el of slot?.assignedElements() ?? []) {
                if (el.localName !== "zeta-sub-menu-item")
                    continue;
                el.nested = true;
                el.rounded = this.rounded;
            }
        };
        this.toggle = () => {
            if (this.disabled)
                return;
            this.open = !this.open;
            this.dispatchEvent(new CustomEvent("toggle", { detail: { open: this.open }, bubbles: true, composed: true }));
        };
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: true
    }; }
    updated() {
        this.nestRows();
    }
    render() {
        return html `<button
        id="header"
        class="header interactive-target"
        type="button"
        aria-expanded=${String(this.open)}
        aria-controls="panel"
        ?disabled=${this.disabled}
        @click=${this.toggle}
      >
        <span class="lead">
          ${this.showLeadingIcon ? html `<span class="icon" aria-hidden="true"><slot name="icon"></slot></span>` : nothing}
          <span class="label"><slot name="heading"></slot></span>
        </span>
        <zeta-caret-indicator class="caret" direction="vertical" ?open=${this.open} .rounded=${this.rounded}></zeta-caret-indicator>
      </button>
      <div id="panel" class="panel" role="region" aria-labelledby="header">
        <div class="clip">
          <div class="children"><slot @slotchange=${this.nestRows}></slot></div>
        </div>
      </div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaCollapsibleMenuItem.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-leading-icon" })
], ZetaCollapsibleMenuItem.prototype, "showLeadingIcon", void 0);
ZetaCollapsibleMenuItem = __decorate([
    customElement("zeta-collapsible-menu-item")
], ZetaCollapsibleMenuItem);
export { ZetaCollapsibleMenuItem };
//# sourceMappingURL=collapsible-menu-item.js.map