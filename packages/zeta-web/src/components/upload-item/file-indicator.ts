import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./file-indicator.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import type { ZetaIconName } from "../../icons.js";
import "../icon/icon.js";

/** The file's badge in an upload item: a surface/shade tile carrying the extension, a "?" for an unknown type, or a
 * glyph. Decorative: the row names the file.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8416-636
 * @storybook ?path=/docs/components-file-upload--docs
 */
@customElement("zeta-file-indicator")
export class ZetaFileIndicator extends Contourable(LitElement) {
  /** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */
  @property({ type: String, reflect: true }) type: "extension" | "unknown" | "icon" = "extension";

  /** The file's extension, four letters at most. */
  @property({ type: String }) extension = "";

  /** The glyph on the icon type. */
  @property({ type: String }) icon: ZetaIconName = "video_play";

  connectedCallback() {
    super.connectedCallback?.();
    this.setAttribute("aria-hidden", "true");
  }

  protected render() {
    return html`<span class="badge"
      >${
        this.type === "icon"
          ? html`<zeta-icon .rounded=${this.rounded}>${this.icon}</zeta-icon>`
          : this.type === "unknown"
            ? "?"
            : this.extension.slice(0, 4).toUpperCase()
      }</span
    >`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-file-indicator": ZetaFileIndicator;
  }
}
