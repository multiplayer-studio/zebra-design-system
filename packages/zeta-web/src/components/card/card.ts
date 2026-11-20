import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/mixins.js";
import { customElement } from "lit/decorators.js";
import styles from "./card.styles.js";

export * from "./card-body/card-body.js";
export * from "./card-footer/card-footer.js";
export * from "./card-header/card-header.js";

/** The card shell: a bordered surface holding a header, a body and a footer, stacked. It decides the surface, the
 * border, the corners and that content is clipped to the frame, and nothing else; every inset comes from the slotted
 * parts (`zeta-card-header`, `zeta-card-body`, `zeta-card-footer`). Content follows a rounded corner, so a full-bleed
 * image curves with it. The card itself is not interactive.
 *
 * @slot - The content of the card.
 * @cssproperty --card-border-line-width  The line width of the border
 * @cssproperty --card-border-color The color of the border
 * @cssproperty --card-border-line-style The line style of the border
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 * @storybook ?path=/docs/components-cards--docs
 */
@customElement("zeta-card")
export class ZetaCard extends Contourable(LitElement) {
  protected render() {
    return html`<div class="card"><slot></slot></div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card": ZetaCard;
  }
}
