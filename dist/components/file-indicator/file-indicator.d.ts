import { LitElement } from "lit";
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
export declare class ZdsFileIndicator extends LitElement {
    static styles: import("lit").CSSResult;
    /** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */
    type: FileIndicatorType;
    /** The file's extension, four letters at most. */
    extension: string;
    /** The glyph on the icon type. */
    icon: IconName;
    shape: "rounded" | "sharp";
    connectedCallback(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-file-indicator": ZdsFileIndicator;
    }
}
//# sourceMappingURL=file-indicator.d.ts.map