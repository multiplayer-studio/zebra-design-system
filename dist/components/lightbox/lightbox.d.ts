import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
export type LightboxKind = "image" | "video" | "pdf" | "other";
export type LightboxShape = "rounded" | "sharp";
/** Why the open state changed. */
export type LightboxOpenChangeReason = "close" | "escape" | "backdrop" | "other";
export interface LightboxItem {
    /** Where the content lives: a URL, or a File (an object URL is made and revoked). One of the two. */
    src?: string;
    file?: File;
    /** The name in the toolbar and on the download. Defaults to the file's name, or the URL's last segment. */
    name?: string;
    /** MIME type, when neither the file nor the name can say. */
    type?: string;
}
/** Every string the lightbox shows or announces, so a product can localise it. */
export declare const lightboxStrings: {
    close: string;
    openInNew: string;
    download: string;
    previous: string;
    next: string;
    counter: string;
    noPreview: string;
    untitled: string;
};
export type LightboxStrings = typeof lightboxStrings;
/** What the item is, from its MIME type first and its name's extension second. */
export declare const lightboxKindOf: (item: LightboxItem) => LightboxKind;
/**
 * A full-size preview over the page: images, videos and PDFs render
 * themselves; anything else shows a drawn file sheet with its glyph and
 * "no preview". A toolbar names the item and offers open in a new tab,
 * download and close; previous / next page through the items (buttons and
 * arrow keys). Each control hides behind its `show-*` attribute.
 *
 * Paging slides a track of frames rather than swapping one for another: the
 * neighbouring items stay mounted either side of the current one, so moving
 * between them never reloads media or flickers, and the old frame glides out
 * as the new one glides in on one CSS transition (`animated`, yielding to
 * reduced motion). The stage's height follows the current frame on the same
 * timing, measured again when media reports real dimensions — sizes arrive
 * after mount, so the first measure is never final. Opening is different: the
 * panel springs in from the bottom (animations/spring) with the stage already
 * at the first frame's height — the height never animates on open.
 *
 * Modal behaviour — the top layer, the inert page, Escape, scroll lock and
 * focus return — comes from the native `<dialog>` and `showModal()`, exactly
 * as `zds-dialog`. Kept in step with packages/react-baseui `<Lightbox>`.
 *
 * @fires zds-open-change - `{ open, reason }` when close, Escape or the backdrop closes it. Not fired for a programmatic `open` change.
 * @fires zds-index-change - `{ index }` when paging changes the current item.
 * @part lightbox - The panel.
 * @part stage - The media well.
 *
 * @spec specs/lightbox/lightbox.spec.json
 */
export declare class ZdsLightbox extends LitElement {
    static styles: import("lit").CSSResult;
    /** Whether the lightbox is open. Reflected. */
    open: boolean;
    /** The items being previewed. One is fine; the navigation then hides itself. */
    items: LightboxItem[];
    /** Which item shows. */
    index: number;
    /** The open-in-a-new-tab control. `show-open-in-new="false"` removes it. */
    showOpenInNew: boolean;
    /** The download control. `show-download="false"` removes it. */
    showDownload: boolean;
    /** The previous / next controls and arrow keys. Hidden anyway with one item. */
    showNavigation: boolean;
    /** Corner radius, and the glyph family of every icon. */
    shape: LightboxShape;
    /**
     * Slide between frames when paging, the old one leaving as the new one
     * arrives. On by default; it always yields to the reduced-motion preference.
     */
    animated: boolean;
    /** Replaces any of the lightbox's texts — see `lightboxStrings` for the keys and defaults. */
    strings: Partial<LightboxStrings>;
    /**
     * Renders the panel in normal flow, always shown, with no backdrop, focus
     * trap or dismissal — the component exactly as the spec draws it, for
     * documentation and screenshots.
     */
    inline: boolean;
    private dialogEl?;
    private scrimEl?;
    private stageEl?;
    private stageHeight;
    private settled;
    private returnFocus;
    private locked;
    private settleFrame;
    private urls;
    disconnectedCallback(): void;
    /** Opens the lightbox, optionally at an item (same as setting `index` and `open`). */
    show(index?: number): void;
    /** Closes the lightbox (same as `open = false`). */
    close(): void;
    private get s();
    private urlFor;
    private revokeAll;
    /** A user-originated close: update `open` and announce it. */
    private setClosed;
    private setIndex;
    private get paging();
    private prev;
    private next;
    private onKeydown;
    private onCancel;
    private onDialogClick;
    private onMediaSized;
    protected updated(changed: PropertyValues<this>): void;
    private syncDialog;
    /** The stage takes the current frame's height. Never trust the first measure. */
    private measure;
    private openInNew;
    private download;
    private renderMedia;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-lightbox": ZdsLightbox;
    }
    interface HTMLElementEventMap {
        "zds-index-change": CustomEvent<{
            index: number;
        }>;
    }
}
//# sourceMappingURL=lightbox.d.ts.map