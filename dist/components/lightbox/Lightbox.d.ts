import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import "./lightbox.css";
export type LightboxKind = "image" | "video" | "pdf" | "other";
export type LightboxShape = "rounded" | "sharp";
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
export interface LightboxProps {
    /** What can be paged through. One item is fine; the navigation then hides itself. */
    items: LightboxItem[];
    /** Which item shows; null is closed — controlled, as ChatImageViewer's. */
    index: number | null;
    onIndexChange?: (index: number) => void;
    onClose: () => void;
    /** The open-in-a-new-tab control. */
    showOpenInNew?: boolean;
    /** The download control. */
    showDownload?: boolean;
    /** The previous / next controls and arrow keys. Hidden anyway with one item. */
    showNavigation?: boolean;
    /** Corner radius, and the glyph family of every icon. */
    shape?: LightboxShape;
    /**
     * Slide between frames when paging, the old one leaving as the new one
     * arrives. On by default; it always yields to the reduced-motion preference.
     */
    animated?: boolean;
    /** Replaces any of the lightbox's texts — see `lightboxStrings` for the keys and defaults. */
    strings?: Partial<LightboxStrings>;
    /** Where the backdrop and panel portal to; defaults to document.body (see Dialog's note on theme scopes). */
    portalContainer?: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>["container"];
    className?: string;
}
/** What the item is, from its MIME type first and its name's extension second. */
export declare const lightboxKindOf: (item: LightboxItem) => LightboxKind;
/**
 * EXPERIMENTAL — no Figma spec. A full-size preview over the page: images,
 * videos and PDFs render themselves; anything else shows a drawn file sheet
 * with its glyph and "no preview". A toolbar names the item and offers open
 * in a new tab, download and close; previous / next page through the items
 * (buttons and arrow keys). Each control hides behind its `show*` prop.
 *
 * Paging slides a track of frames rather than swapping one for another: the
 * neighbouring items stay mounted either side of the current one, so moving
 * between them never reloads media or flickers, and the old frame glides out
 * as the new one glides in on one CSS transition (`animated`, yielding to
 * reduced motion). The stage's height follows the current frame on the same
 * timing.
 *
 * Behaviour — backdrop, focus trap, Escape, scroll lock and portalling —
 * comes from Base UI's Dialog, as the library Dialog. Everything visual
 * comes from the token layer via `lightbox.css`.
 *
 * @spec none — experimental.
 */
export declare const Lightbox: React.ForwardRefExoticComponent<LightboxProps & React.RefAttributes<HTMLDivElement>>;
