import { html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./switch.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import "../icon/icon.js";
import type { ZetaInputType } from "../../mixins/form-field.js";

/**
 * A single on or off toggle: a track with a thumb that slides between its ends. `activeIcon` shows at the start while
 * on and `inactiveIcon` at the end while off; leave both unset for a plain track. Name it with a label beside it, or
 * aria-label, since the switch has no text of its own.
 *
 * @cssproperty --switch-track-color Color of the switch track
 * @cssproperty --switch-track-active-color Color of the switch track when switch is ON
 * @cssproperty --switch-track-disabled-color Color of the switch track when switch is disabled
 * @cssproperty --switch-icon-color Color of the activeIcon & inactiveIcon
 * @cssproperty --switch-icon-disabled-color Color of the activeIcon & inactiveIcon when disabled
 * @cssproperty --switch-thumb-color Color of the switch thumb
 * @cssproperty --switch-thumb-disabled-color Color of the switch thumb when disabled
 * @cssproperty --switch-height Height of the switch
 * @cssproperty --switch-width Width of the switch
 * @cssproperty --switch-thumb-size Height & Width of the switch thumb
 * @cssproperty --switch-icon-size Height & Width of the activeIcon & inactiveIcon
 *
 * @part track - The switch track
 * @part thumb - The switch thumb
 * @part icon active - The active icon
 * @part icon inactive - The inactive icon
 *
 * @event {Event} change - Fired when the checkbox value changes
 * @event {InputEvent} input - Fired when the checkbox value changes
 *
 * @figma https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5655-893
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-switch--docs
 */
@customElement("zeta-switch")
export class ZetaSwitch extends BaseToggleFormElement {
  constructor() {
    super();
    this.internals.role = "switch";
  }

  override type: Extract<ZetaInputType, "checkbox"> = "checkbox";

  /** Icon name to display when switch is ON. */
  @property({ type: String }) activeIcon?: ZetaIconName;

  /** Icon name to display when switch is OFF. */
  @property({ type: String }) inactiveIcon?: ZetaIconName;

  override handleChange(event: Event) {
    super.handleChange(event);
    event.stopPropagation();
    this.internals.ariaChecked = this.input.checked ? "true" : "false";
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated?.(changed);
    if (changed.has("checked")) {
      this.internals.ariaChecked = this.checked ? "true" : "false";
      // The thumb widens to 1.3 mid-slide, then settles (spec: Motion). Not on first render or with reduced motion.
      const thumb = this.shadowRoot?.querySelector<HTMLElement>('[part="thumb"]');
      if (changed.get("checked") !== undefined && thumb && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const w = thumb.getBoundingClientRect().width;
        thumb.animate([{ width: `${w}px` }, { width: `${w * 1.3}px`, offset: 0.5 }, { width: `${w}px` }], { duration: 250, easing: "ease-out" });
      }
    }
    if (changed.has("disabled")) this.internals.ariaDisabled = this.disabled ? "true" : null;
  }

  static styles = [super.styles || [], styles];

  protected render() {
    return html`
      <div
        part="track"
        @click=${(_e: Event) => {
          _e.stopPropagation(); //TODO BK: is this the click problem?
          this.input.click();
        }}
        @keydown=${(e: KeyboardEvent) => this.key(e, "down")}
        @keyup=${(e: KeyboardEvent) => this.key(e, "up")}
        tabindex="${this.disabled ? "-1" : this.tabIndex}"
      >
        <div part="thumb"></div>
        ${
          this.activeIcon &&
          html`
            <zeta-icon part="icon active" size=${"var(--switch-icon-size, var(--_switch-thumb-size))"} .rounded=${this.rounded}> ${this.activeIcon} </zeta-icon>
          `
        }
        ${
          this.inactiveIcon &&
          html`
            <zeta-icon part="icon inactive" size=${"var(--switch-icon-size, var(--_switch-thumb-size))"} .rounded=${this.rounded}>
              ${this.inactiveIcon}
            </zeta-icon>
          `
        }
      </div>
      ${super.render()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-switch": ZetaSwitch;
  }
}
