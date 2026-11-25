import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./segmented-control.styles.js";
import "../icon/icon.js";

/** Rounded, square-cornered or pill-shaped track and segments. Spec: the `shape` axis. */
export type SegmentedControlShape = "rounded" | "sharp" | "full";

/**
 * What every segment shows, set once on the control (spec: "Pick one Flavour
 * and hold it across every segment"). This is the segment's Flavour in the
 * spec; the control's own Flavour (default or inverse) is the `inverse` prop. `default` is icon + label, `text-only`
 * the label alone, `icon-only` the icon alone with the label as its
 * accessible name and tooltip.
 */
export type SegmentedControlFlavour = "default" | "text-only" | "icon-only";

/** One option in the control. */
export interface SegmentedControlOption {
  /** The value reported when this option is chosen. Unique within the control. */
  value: string;
  /** The option's name: the label, and the accessible name (and `title`) when the control's flavour is `icon-only`. */
  label: string;
  /** Leading glyph. Replaces Figma's locked Star (spec issue "Icon locked to star"). */
  icon?: IconName;
  /** This one option cannot be chosen. */
  disabled?: boolean;
}

/** The flavour one segment renders as: the control's flavour, narrowed by what the option provides. */
export function segmentFlavour(option: SegmentedControlOption, flavour: SegmentedControlFlavour): SegmentedControlFlavour {
  if (flavour === "text-only" || !option.icon) return "text-only";
  return flavour;
}

/**
 * The value actually shown as chosen: `wanted` when it names an enabled
 * option, else the first enabled option (spec Selection: "there most always
 * be an active segment on"). With every option disabled, `wanted` if it names
 * one, else the first.
 */
export function resolveSegmentedValue(options: readonly SegmentedControlOption[], wanted: string | undefined) {
  const enabled = options.filter((o) => !o.disabled);
  if (enabled.some((o) => o.value === wanted)) return wanted;
  if (enabled.length) return enabled[0]!.value;
  return options.some((o) => o.value === wanted) ? wanted : options[0]?.value;
}

const ARROWS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

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
@customElement("zds-segmented-control")
export class ZdsSegmentedControl extends LitElement {
  static styles = styles;
  static formAssociated = true;

  /** The options, in order. Each segment hugs its own content. */
  @property({ type: Array }) options: SegmentedControlOption[] = [];

  /** The chosen option's value. One that names no enabled option (or empty) falls back to the first enabled option, so exactly one is always chosen. */
  @property({ type: String }) value = "";

  /** Rounded, sharp or pill-shaped corners on the track, every segment and the active indicator. Match the surrounding controls. */
  @property({ type: String, reflect: true }) shape: SegmentedControlShape = "rounded";

  /** Stronger emphasis on the chosen option (the spec's control Flavour `inverse`): a dark chosen segment on a lighter, bordered track. */
  @property({ type: Boolean, reflect: true }) inverse = false;

  /**
   * What every segment shows. `default`: icon + label (an option without an
   * icon shows its label alone). `text-only`: labels only, icons hidden even
   * when options have them. `icon-only`: icons only, each label becomes the
   * segment's accessible name and `title`; an option without an icon still
   * shows its label, so nothing goes unnamed on screen.
   */
  @property({ type: String, reflect: true }) flavour: SegmentedControlFlavour = "default";

  /** Disables every option. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Accessible name of the control. */
  @property({ type: String }) label: string | null = null;

  /** Field name submitted with a form. */
  @property({ type: String }) name: string | null = null;

  private readonly internals: ElementInternals;
  private defaultValue = "";
  /** The value the indicator was last placed on; undefined before the first placement. */
  private placed: string | undefined;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
    // Reattached: observe again (hasUpdated, so updated() will not run by itself).
    if (this.hasUpdated) this.observeSegments();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  protected willUpdate(changed: PropertyValues<this>) {
    // Exactly one chosen: a value naming no enabled option moves to the first enabled one.
    if (changed.has("value") || changed.has("options")) {
      const resolved = resolveSegmentedValue(this.options, this.value);
      if (resolved !== undefined && resolved !== this.value) this.value = resolved;
    }
  }

  protected updated(changed: PropertyValues<this>) {
    this.internals.setFormValue(this.value || null);
    if (changed.has("options") || changed.has("flavour") || !this.resizeObserver) this.observeSegments();
    // The first placement lands in place, a change of value slides, anything
    // else re-measures and leaves the sliding state alone.
    // Only a placement that landed counts (options can arrive after the first render).
    if (this.placeIndicator(this.placed === undefined ? false : this.placed !== this.value || undefined))
      this.placed = this.value;
  }

  private get track(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>(".zds-segmented-control");
  }

  /** Segment sizes change without an update (web fonts landing, reflow): re-measure. */
  private observeSegments() {
    const track = this.track;
    if (!track || typeof ResizeObserver === "undefined") return;
    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver(() => this.placeIndicator());
    this.resizeObserver.observe(track);
    this.segments.forEach((s) => this.resizeObserver!.observe(s));
  }

  /**
   * Places the track's one active indicator over the chosen segment by
   * writing its box into custom properties on the track. `data-indicator`
   * turns the indicator on (until then the chosen segment carries its own
   * fill) and `data-sliding` turns the transition on only for a change of
   * value, so the first placement lands in place.
   */
  private placeIndicator(slide?: boolean): boolean {
    const track = this.track;
    if (!track) return false;
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
    if (slide !== undefined) track.toggleAttribute("data-sliding", slide);
    const st = track.style;
    st.setProperty("--zds-seg-indicator-x", `${x}px`);
    st.setProperty("--zds-seg-indicator-y", `${y}px`);
    st.setProperty("--zds-seg-indicator-w", `${s.width}px`);
    st.setProperty("--zds-seg-indicator-h", `${s.height}px`);
    track.setAttribute("data-indicator", "");
    return true;
  }

  private get segments(): HTMLElement[] {
    return [...this.renderRoot.querySelectorAll<HTMLElement>(".zds-segmented-control__segment")];
  }

  private isDisabled(o: SegmentedControlOption) {
    return this.disabled || !!o.disabled;
  }

  private choose(o: SegmentedControlOption) {
    if (this.isDisabled(o) || o.value === this.value) return;
    this.value = o.value;
    this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: o.value }, bubbles: true, composed: true }));
  }

  private onKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === " ") {
      e.preventDefault();
      this.choose(this.options[index]);
      return;
    }
    if (!(e.key in ARROWS)) return;
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

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  protected render() {
    // Roving tabindex: one stop, on the chosen option (even when disabled, so
    // the control stays discoverable — as Base UI's RadioGroup does) or else
    // the first enabled one.
    const stop =
      this.options.find((o) => o.value === this.value) ??
      this.options.find((o) => !this.isDisabled(o));
    // The icon family stays rounded in every shape: Figma pins the rounded
    // Star in all 54 _Segmented item variants (spec note "The icon family
    // stays rounded in every Shape"), unlike Button.
    return html`<div
      part="track"
      class="zds-segmented-control"
      role="radiogroup"
      aria-label=${this.label ?? nothing}
      aria-disabled=${this.disabled ? "true" : nothing}
      data-shape=${this.shape}
      data-inverse=${this.inverse ? "" : nothing}
      data-flavour=${this.flavour}
    >
      <span class="zds-segmented-control__indicator" aria-hidden="true"></span>
      ${this.options.map((o, i) => {
        const flavour = segmentFlavour(o, this.flavour);
        const checked = o.value === this.value;
        const disabled = this.isDisabled(o);
        return html`<span
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
          @keydown=${(e: KeyboardEvent) => this.onKeyDown(e, i)}
        >
          ${o.icon && flavour !== "text-only"
            ? html`<zds-icon class="zds-segmented-control__icon" name=${o.icon} size="small" .iconStyle=${"rounded"}></zds-icon>`
            : nothing}
          ${flavour !== "icon-only" ? html`<span class="zds-segmented-control__label">${o.label}</span>` : nothing}
        </span>`;
      })}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-segmented-control": ZdsSegmentedControl;
  }
}
