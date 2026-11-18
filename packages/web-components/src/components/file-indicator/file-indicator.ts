import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./file-indicator.styles.js";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type FileIndicatorType = "extension" | "unknown" | "icon";

/**
 * The file's badge in a File Upload Item: a surface/shade tile carrying the
 * extension, a "?" for an unknown type, or a glyph. Decorative: the row
 * names the file.
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
@customElement("zds-file-indicator")
export class ZdsFileIndicator extends LitElement {
  static styles = styles;

  /** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */
  @property({ type: String, reflect: true }) type: FileIndicatorType = "extension";
  /** The file's extension, four letters at most. */
  @property({ type: String }) extension = "";
  /** The glyph on the icon type. */
  @property({ type: String }) icon: IconName = "video-play";
  @property({ type: String, reflect: true }) shape: "rounded" | "sharp" = "rounded";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }

  protected render() {
    return html`<span class="badge">${this.type === "icon"
      ? html`<zds-icon name=${this.icon} size="small"></zds-icon>`
      : this.type === "unknown" ? "?" : this.extension.slice(0, 4).toUpperCase()}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-file-indicator": ZdsFileIndicator;
  }
}
