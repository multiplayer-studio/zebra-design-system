import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./accordion-item.styles.js";
import "../icon/icon.js";
import "../divider/divider.js";

let uid = 0;

/**
 * One row of an Accordion: a header holding the title and its disclosure
 * control, and the content it reveals. Use inside `<zds-accordion>`, which
 * opens and closes it and decides whether it is selectable, its divider and
 * its control's shape.
 *
 * The disclosure control is a native `button` with `aria-expanded` /
 * `aria-controls` in this row's shadow root, next to the `region` panel it
 * controls. On a selectable row it is drawn with Icon Button's subtle /
 * medium tokens rather than nesting `<zds-icon-button>`: that element's
 * button sits in its own shadow root, where `aria-expanded` and
 * `aria-controls` can't reach it or the panel. The rest of a selectable row
 * is a toggle button with `aria-pressed`. A disabled row's disclosure button
 * stays focusable with `aria-disabled` (as Base UI's trigger does in React);
 * its selection button is natively disabled (as Base UI's Toggle is).
 *
 * @slot - What the row reveals when open. Any content; it fills the row's width.
 * @fires zds-selected-change - The row body was pressed on a selectable accordion. `detail` is `{ value, selected }`.
 * @csspart header - The header row (a heading element).
 * @csspart panel - The content region.
 *
 * @spec specs/accordion/accordion.spec.json (subcomponents › Accordion Item, Accordion Header)
 */
@customElement("zds-accordion-item")
export class ZdsAccordionItem extends LitElement {
  static styles = styles;

  /** Identifies the row in the accordion's `value`. Unique within the accordion; generated when left empty. */
  @property({ type: String, reflect: true }) value = "";

  /**
   * The row's label (the spec's Title). Name the section it opens — the caret
   * says a row opens, never what is inside. Called `heading`, not `title`, so
   * it can't turn into the native tooltip over the whole row.
   */
  @property({ type: String }) heading = "";

  /** Whether the row is chosen. Only meaningful on a selectable accordion. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** This one row cannot be opened, closed or selected. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Open state. Set by `<zds-accordion>` from its `value`; change that instead. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Set by `<zds-accordion>`. */
  @property({ attribute: false }) selectable = false;
  /** Set by `<zds-accordion>`. */
  @property({ attribute: false }) rounded = false;
  /** Set by `<zds-accordion>`. */
  @property({ attribute: false }) inCard = true;
  /** Set by `<zds-accordion>` from its own `disabled`. */
  @property({ attribute: false }) groupDisabled = false;

  @query(".zds-accordion__panel") private panel!: HTMLElement;

  private readonly ids = `zds-acc-${++uid}`;
  private animation = 0;
  /** Open changes in the first frame (the accordion's initial sync) jump rather than animate, as in Base UI. */
  private settled = false;

  get isDisabled() {
    return this.disabled || this.groupDisabled;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.value) this.value = this.ids;
  }

  /** Move focus to this row's disclosure button. */
  focusTrigger() {
    this.renderRoot.querySelector<HTMLElement>(".zds-accordion__trigger, .zds-accordion__control")?.focus();
  }

  private toggle() {
    if (this.isDisabled) return;
    this.dispatchEvent(new CustomEvent("zds-accordion-toggle", { detail: { value: this.value }, bubbles: true, composed: false }));
  }

  private toggleSelected() {
    if (this.isDisabled) return;
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent("zds-selected-change", { detail: { value: this.value, selected: this.selected }, bubbles: true, composed: true }),
    );
  }

  protected firstUpdated() {
    this.panel.hidden = !this.open;
    requestAnimationFrame(() => (this.settled = true));
  }

  protected updated(changed: PropertyValues<this>) {
    // Animate the panel height the way Base UI's Accordion.Panel does in the
    // React package: measure, run height 0 <-> px via [data-starting-style] /
    // [data-ending-style], then settle on auto (open) or hidden (closed).
    if (!changed.has("open") || changed.get("open") === undefined) return;
    if (this.settled) this.animatePanel(this.open);
    else this.panel.hidden = !this.open;
  }

  private animatePanel(opening: boolean) {
    const panel = this.panel;
    const run = ++this.animation;
    const animated = parseFloat(getComputedStyle(panel).transitionDuration) > 0;
    const set = (h: string) => panel.style.setProperty("--zds-accordion-panel-height", h);
    const done = (fn: () => void) => {
      if (!animated) return fn();
      const end = (e: TransitionEvent) => {
        if (e.target !== panel || e.propertyName !== "height") return;
        panel.removeEventListener("transitionend", end);
        if (run === this.animation) fn();
      };
      panel.addEventListener("transitionend", end);
    };
    panel.removeAttribute("data-starting-style");
    panel.removeAttribute("data-ending-style");
    if (opening) {
      panel.hidden = false;
      set(`${panel.scrollHeight}px`);
      panel.setAttribute("data-starting-style", "");
      panel.getBoundingClientRect();
      panel.removeAttribute("data-starting-style");
      done(() => set("auto"));
    } else {
      set(`${panel.scrollHeight}px`);
      panel.getBoundingClientRect();
      panel.setAttribute("data-ending-style", "");
      done(() => {
        panel.hidden = true;
        panel.removeAttribute("data-ending-style");
        set("auto");
      });
    }
  }

  protected render() {
    const disabled = this.isDisabled;
    const header = this.selectable
      ? html`
          <button
            id="${this.ids}-trigger"
            class="zds-accordion__control"
            type="button"
            aria-expanded=${this.open ? "true" : "false"}
            aria-controls="${this.ids}-panel"
            aria-label="${this.heading} details"
            aria-disabled=${disabled ? "true" : nothing}
            ?data-disabled=${disabled}
            @click=${this.toggle}
          >
            <!-- One chevron-right glyph rotated 90° when open, in place of
                 Figma's chevron-right -> expand-more swap (owner decision; spec
                 warn "The caret swaps glyphs"). The family follows the
                 control's shape, as on Icon Button. -->
            <zds-icon
              class="zds-accordion__control-icon"
              name="chevron-right"
              size="medium"
              .iconStyle=${this.rounded ? "rounded" : "sharp"}
            ></zds-icon>
          </button>
          <button
            class="zds-accordion__select"
            type="button"
            aria-pressed=${this.selected ? "true" : "false"}
            ?disabled=${disabled}
            ?data-disabled=${disabled}
            ?data-pressed=${this.selected}
            @click=${this.toggleSelected}
          >
            <span class="zds-accordion__heading"><span class="zds-accordion__title">${this.heading}</span></span>
            ${this.selected
              ? html`<zds-icon class="zds-accordion__mark" name="check-mark" size="medium" framed></zds-icon>`
              : nothing}
          </button>
        `
      : html`<button
          id="${this.ids}-trigger"
          class="zds-accordion__trigger"
          type="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="${this.ids}-panel"
          aria-disabled=${disabled ? "true" : nothing}
          ?data-disabled=${disabled}
          @click=${this.toggle}
        >
          <span class="zds-accordion__heading"><span class="zds-accordion__title">${this.heading}</span></span>
          <!-- One expand-more glyph rotated 180° when open, in place of the
               expand-more -> expand-less swap (owner decision). -->
          <zds-icon class="zds-accordion__caret" name="expand-more" size="medium"></zds-icon>
        </button>`;

    return html`<div class="zds-accordion__item" ?data-open=${this.open} ?data-disabled=${disabled}>
      <h3
        part="header"
        class="zds-accordion__header"
        ?data-selectable=${this.selectable}
        ?data-rounded=${this.rounded}
        ?data-disabled=${disabled}
      >
        ${header}
      </h3>
      <div
        part="panel"
        id="${this.ids}-panel"
        class="zds-accordion__panel"
        role="region"
        aria-labelledby="${this.ids}-trigger"
      >
        <div class="zds-accordion__content"><slot></slot></div>
      </div>
      ${this.inCard ? html`<zds-divider class="zds-accordion__divider"></zds-divider>` : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-accordion-item": ZdsAccordionItem;
  }
}
