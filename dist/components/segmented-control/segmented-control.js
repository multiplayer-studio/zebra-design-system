var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./segmented-control.styles.js";
import "../icon/icon.js";
/** The flavour one segment renders as: the control's flavour, narrowed by what the option provides. */
export function segmentFlavour(option, flavour) {
    if (flavour === "text-only" || !option.icon)
        return "text-only";
    return flavour;
}
/**
 * The value actually shown as chosen: `wanted` when it names an enabled
 * option, else the first enabled option (spec Selection: "there most always
 * be an active segment on"). With every option disabled, `wanted` if it names
 * one, else the first.
 */
export function resolveSegmentedValue(options, wanted) {
    const enabled = options.filter((o) => !o.disabled);
    if (enabled.some((o) => o.value === wanted))
        return wanted;
    if (enabled.length)
        return enabled[0].value;
    return options.some((o) => o.value === wanted) ? wanted : options[0]?.value;
}
const ARROWS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
/**
 * A row of mutually exclusive options sharing one track, where exactly one
 * is active at a time. Use it to switch a mode within one view; reach for
 * tabs when the choice moves between views.
 *
 * A radio group, matching the React package's Base UI RadioGroup: an inner
 * `role="radiogroup"` holding one `role="radio"` + `aria-checked` per option,
 * one tab stop (roving tabindex on the chosen option), arrow keys move and
 * select with wrap-around (mirrored in RTL), Space selects, and nothing can
 * be deselected — exactly one option is always chosen: a `value` that names
 * no enabled option falls back to the first enabled one (spec Selection).
 * The value is submitted with a form under `name`.
 *
 * The active background is one indicator bound to the track, not to a
 * segment, and slides between segments (spec Motion). The chosen segment is
 * measured in `updated()` and by a ResizeObserver into custom properties the
 * styles position it from, as the React package does.
 *
 * Options are data, not slotted children (spec note: the slot "makes use of
 * the segment options"): set `options` as a property, or as JSON in the
 * attribute.
 *
 * @fires zds-value-change - The user chose another option. `detail.value` is the new value.
 * @csspart track - The radiogroup track.
 * @csspart segment - Each option.
 *
 * @spec specs/segmented-control/segmented-control.spec.json
 */
let ZdsSegmentedControl = class ZdsSegmentedControl extends LitElement {
    constructor() {
        super();
        /** The options, in order. Each segment hugs its own content. */
        this.options = [];
        /** The chosen option's value. One that names no enabled option (or empty) falls back to the first enabled option, so exactly one is always chosen. */
        this.value = "";
        /** Rounded or sharp corners on the track, every segment and the active indicator. Match the surrounding controls. */
        this.shape = "rounded";
        /**
         * What every segment shows. `default`: icon + label (an option without an
         * icon shows its label alone). `text-only`: labels only, icons hidden even
         * when options have them. `icon-only`: icons only, each label becomes the
         * segment's accessible name and `title`; an option without an icon still
         * shows its label, so nothing goes unnamed on screen.
         */
        this.flavour = "default";
        /** Disables every option. */
        this.disabled = false;
        /** Accessible name of the control. */
        this.label = null;
        /** Field name submitted with a form. */
        this.name = null;
        this.defaultValue = "";
        this.resizeObserver = null;
        this.internals = this.attachInternals();
    }
    connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
        // Reattached: observe again (hasUpdated, so updated() will not run by itself).
        if (this.hasUpdated)
            this.observeSegments();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
    }
    willUpdate(changed) {
        // Exactly one chosen: a value naming no enabled option moves to the first enabled one.
        if (changed.has("value") || changed.has("options")) {
            const resolved = resolveSegmentedValue(this.options, this.value);
            if (resolved !== undefined && resolved !== this.value)
                this.value = resolved;
        }
    }
    updated(changed) {
        this.internals.setFormValue(this.value || null);
        if (changed.has("options") || changed.has("flavour") || !this.resizeObserver)
            this.observeSegments();
        // The first placement lands in place, a change of value slides, anything
        // else re-measures and leaves the sliding state alone.
        // Only a placement that landed counts (options can arrive after the first render).
        if (this.placeIndicator(this.placed === undefined ? false : this.placed !== this.value || undefined))
            this.placed = this.value;
    }
    get track() {
        return this.renderRoot.querySelector(".zds-segmented-control");
    }
    /** Segment sizes change without an update (web fonts landing, reflow): re-measure. */
    observeSegments() {
        const track = this.track;
        if (!track || typeof ResizeObserver === "undefined")
            return;
        this.resizeObserver?.disconnect();
        this.resizeObserver = new ResizeObserver(() => this.placeIndicator());
        this.resizeObserver.observe(track);
        this.segments.forEach((s) => this.resizeObserver.observe(s));
    }
    /**
     * Places the track's one active indicator over the chosen segment by
     * writing its box into custom properties on the track. `data-indicator`
     * turns the indicator on (until then the chosen segment carries its own
     * fill) and `data-sliding` turns the transition on only for a change of
     * value, so the first placement lands in place.
     */
    placeIndicator(slide) {
        const track = this.track;
        if (!track)
            return false;
        const seg = this.segments[this.options.findIndex((o) => o.value === this.value)];
        if (!seg) {
            track.removeAttribute("data-indicator");
            return false;
        }
        // Read everything first, then write: a layout read between the writes
        // would commit the new position before [data-sliding] lands, and that
        // property would jump instead of sliding.
        const t = track.getBoundingClientRect();
        const s = seg.getBoundingClientRect();
        const x = s.left - t.left - track.clientLeft;
        const y = s.top - t.top - track.clientTop;
        // undefined (a re-measure) leaves the sliding state as it is, so a
        // re-measure mid-slide cannot cut the slide short.
        if (slide !== undefined)
            track.toggleAttribute("data-sliding", slide);
        const st = track.style;
        st.setProperty("--zds-seg-indicator-x", `${x}px`);
        st.setProperty("--zds-seg-indicator-y", `${y}px`);
        st.setProperty("--zds-seg-indicator-w", `${s.width}px`);
        st.setProperty("--zds-seg-indicator-h", `${s.height}px`);
        track.setAttribute("data-indicator", "");
        return true;
    }
    get segments() {
        return [...this.renderRoot.querySelectorAll(".zds-segmented-control__segment")];
    }
    isDisabled(o) {
        return this.disabled || !!o.disabled;
    }
    choose(o) {
        if (this.isDisabled(o) || o.value === this.value)
            return;
        this.value = o.value;
        this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: o.value }, bubbles: true, composed: true }));
    }
    onKeyDown(e, index) {
        if (e.key === " ") {
            e.preventDefault();
            this.choose(this.options[index]);
            return;
        }
        if (!(e.key in ARROWS))
            return;
        e.preventDefault();
        const rtl = getComputedStyle(this).direction === "rtl" && (e.key === "ArrowLeft" || e.key === "ArrowRight");
        const step = ARROWS[e.key] * (rtl ? -1 : 1);
        const n = this.options.length;
        for (let i = 1; i <= n; i++) {
            const j = (index + step * i + n * n) % n;
            const o = this.options[j];
            if (!this.isDisabled(o)) {
                this.segments[j]?.focus();
                this.choose(o);
                return;
            }
        }
    }
    formResetCallback() {
        this.value = this.defaultValue;
    }
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    render() {
        // Roving tabindex: one stop, on the chosen option (even when disabled, so
        // the control stays discoverable — as Base UI's RadioGroup does) or else
        // the first enabled one.
        const stop = this.options.find((o) => o.value === this.value) ??
            this.options.find((o) => !this.isDisabled(o));
        // The icon family stays rounded even when shape="sharp": Figma pins the
        // rounded Star in all 18 _Segmented item variants (spec note "The icon
        // family stays rounded even when Rounded=false"), unlike Button.
        return html `<div
      part="track"
      class="zds-segmented-control"
      role="radiogroup"
      aria-label=${this.label ?? nothing}
      aria-disabled=${this.disabled ? "true" : nothing}
      data-shape=${this.shape}
      data-flavour=${this.flavour}
    >
      <span class="zds-segmented-control__indicator" aria-hidden="true"></span>
      ${this.options.map((o, i) => {
            const flavour = segmentFlavour(o, this.flavour);
            const checked = o.value === this.value;
            const disabled = this.isDisabled(o);
            return html `<span
          part="segment"
          class="zds-segmented-control__segment"
          role="radio"
          tabindex=${o === stop ? 0 : -1}
          aria-checked=${checked ? "true" : "false"}
          aria-disabled=${disabled ? "true" : nothing}
          aria-label=${flavour === "icon-only" ? o.label : nothing}
          title=${flavour === "icon-only" ? o.label : nothing}
          data-flavour=${flavour}
          data-checked=${checked ? "" : nothing}
          data-disabled=${disabled ? "" : nothing}
          @click=${() => this.choose(o)}
          @keydown=${(e) => this.onKeyDown(e, i)}
        >
          ${o.icon && flavour !== "text-only"
                ? html `<zds-icon class="zds-segmented-control__icon" name=${o.icon} size="small" .iconStyle=${"rounded"}></zds-icon>`
                : nothing}
          ${flavour !== "icon-only" ? html `<span class="zds-segmented-control__label">${o.label}</span>` : nothing}
        </span>`;
        })}
    </div>`;
    }
};
ZdsSegmentedControl.styles = styles;
ZdsSegmentedControl.formAssociated = true;
__decorate([
    property({ type: Array })
], ZdsSegmentedControl.prototype, "options", void 0);
__decorate([
    property({ type: String })
], ZdsSegmentedControl.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSegmentedControl.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSegmentedControl.prototype, "flavour", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSegmentedControl.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], ZdsSegmentedControl.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsSegmentedControl.prototype, "name", void 0);
ZdsSegmentedControl = __decorate([
    customElement("zds-segmented-control")
], ZdsSegmentedControl);
export { ZdsSegmentedControl };
