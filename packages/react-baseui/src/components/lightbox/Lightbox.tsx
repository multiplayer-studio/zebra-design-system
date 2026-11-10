import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
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
export const lightboxStrings = {
  close: "Close",
  openInNew: "Open in a new tab",
  download: "Download",
  previous: "Previous",
  next: "Next",
  counter: "{index} of {count}",
  noPreview: "No preview for this file",
  untitled: "File",
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

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

/** What the item is, from its MIME type first and its name's extension second. */
export const lightboxKindOf = (item: LightboxItem): LightboxKind => {
  const type = (item.type ?? item.file?.type ?? "").toLowerCase();
  const name = (item.name ?? item.file?.name ?? item.src ?? "").toLowerCase().split(/[?#]/)[0];
  if (type.startsWith("image/") || /\.(png|jpe?g|gif|webp|avif|svg)$/.test(name)) return "image";
  if (type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/.test(name)) return "video";
  if (type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  return "other";
};

/** The glyph on the unpreviewable sheet: the broad family of the file. */
const SHEET_ICON = (item: LightboxItem): IconName => {
  const type = (item.type ?? item.file?.type ?? "").toLowerCase();
  if (type.startsWith("audio/")) return "audio";
  return "document";
};

const nameOf = (item: LightboxItem, fallback: string) =>
  item.name ?? item.file?.name ?? item.src?.split(/[?#]/)[0].split("/").pop() ?? fallback;

/**
 * One item's content, mounted while its slot is near the current index. It
 * owns its item's object URL (made on mount, revoked on unmount) and reports
 * when its media has real dimensions, so the stage can take its height.
 */
function Media({ item, name, iconStyle, noPreview, onSized }: {
  item: LightboxItem;
  name: string;
  iconStyle: "rounded" | "sharp";
  noPreview: string;
  onSized?: () => void;
}) {
  const url = React.useMemo(() => (item.file ? URL.createObjectURL(item.file) : item.src ?? null), [item.file, item.src]);
  React.useEffect(() => () => { if (item.file && url) URL.revokeObjectURL(url); }, [item.file, url]);
  const kind = lightboxKindOf(item);
  if (kind === "image" && url) return <img className="zds-lightbox__media" src={url} alt={name} onLoad={onSized} />;
  if (kind === "video" && url) {
    // eslint-disable-next-line jsx-a11y/media-has-caption -- the caller's file carries no track
    return <video className="zds-lightbox__media" src={url} controls aria-label={name} onLoadedMetadata={onSized} />;
  }
  if (kind === "pdf" && url) return <iframe className="zds-lightbox__document" src={url} title={name} onLoad={onSized} />;
  return (
    <div className="zds-lightbox__unpreviewable">
      {/* A drawn file sheet with a folded corner; decorative. */}
      <span className="zds-lightbox__sheet" aria-hidden="true">
        <Icon name={SHEET_ICON(item)} size="large" iconStyle={iconStyle} />
      </span>
      <p className="zds-lightbox__no-preview">{noPreview}</p>
    </div>
  );
}

/**
 * A full-size preview over the page: images, videos and PDFs render
 * themselves; anything else shows a drawn file sheet with its glyph and
 * "no preview". A toolbar names the item and offers open in a new tab,
 * download and close; previous / next page through the items (buttons and
 * arrow keys). Each control hides behind its `show*` prop.
 *
 * Paging slides a track of frames rather than swapping one for another: the
 * neighbouring items stay mounted either side of the current one, so moving
 * between them never reloads media or flickers, and the old frame glides out
 * as the new one glides in on one CSS transition (`animated`, yielding to
 * reduced motion). The stage's height follows the current frame on the same
 * timing. Opening is different: the panel springs in from the bottom
 * (animations/spring) with the stage already at the first frame's height —
 * the height never animates on open.
 *
 * Behaviour — backdrop, focus trap, Escape, scroll lock and portalling —
 * comes from Base UI's Dialog, as the library Dialog. Everything visual
 * comes from the token layer via `lightbox.css`.
 *
 * @spec specs/lightbox/lightbox.spec.json
 */
export const Lightbox = React.forwardRef<HTMLDivElement, LightboxProps>(function Lightbox(
  {
    items, index, onIndexChange, onClose,
    showOpenInNew = true, showDownload = true, showNavigation = true,
    shape = "rounded", animated = true, strings, portalContainer, className,
  },
  ref,
) {
  const S = React.useMemo(() => ({ ...lightboxStrings, ...strings }), [strings]);
  const iconStyle = shape === "sharp" ? "sharp" : "rounded";
  const item = index === null ? undefined : items[index];

  // The toolbar's own URL for open-in-new and download (frames own theirs).
  const objectUrl = React.useMemo(() => (item?.file ? URL.createObjectURL(item.file) : null), [item?.file]);
  React.useEffect(() => () => { if (objectUrl) URL.revokeObjectURL(objectUrl); }, [objectUrl]);
  const url = objectUrl ?? item?.src ?? null;

  const kind = item ? lightboxKindOf(item) : "other";
  const name = item ? nameOf(item, S.untitled) : "";
  const paging = showNavigation && items.length > 1 && index !== null;
  // Paging arms the transitions even if no media ever reported a size.
  const prev = () => { if (paging && index! > 0) { setSettled(true); onIndexChange?.(index! - 1); } };
  const next = () => { if (paging && index! < items.length - 1) { setSettled(true); onIndexChange?.(index! + 1); } };

  const openInNew = () => { if (url) window.open(url, "_blank", "noopener"); };
  const download = () => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.rel = "noopener";
    a.click();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  // The panel springs in with the stage already at the first frame's height:
  // the height and track transitions arm only once the current frame reports
  // its real size, or on the first page — never on open itself, so opening
  // never animates the height to meet late-loading media.
  const [settled, setSettled] = React.useState(false);
  const open = index !== null;
  React.useEffect(() => { if (!open) setSettled(false); }, [open]);
  const sliding = animated && settled;

  // The stage takes the current frame's height, re-measured when its media
  // gets real dimensions; the CSS transition does the gliding. The height is
  // state rendered as a style, not an imperative write: a transition needs a
  // length on both sides (auto never interpolates), and state survives the
  // popup element being replaced where a written style would be lost.
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const [stageHeight, setStageHeight] = React.useState<number | null>(null);
  const [measureTick, bumpMeasure] = React.useReducer((n: number) => n + 1, 0);
  // The current frame reported real dimensions: take the height without
  // animating, then arm the transitions one painted frame later.
  const onCurrentSized = React.useCallback(() => {
    bumpMeasure();
    requestAnimationFrame(() => setSettled(true));
  }, []);
  // Base UI mounts the popup a beat after `open` flips, so the index-change
  // effect can run before the stage exists; measuring again when the node
  // attaches covers it (media load events alone don't — a PDF iframe's load
  // event is unreliable).
  const setStage = React.useCallback((node: HTMLDivElement | null) => {
    stageRef.current = node;
    if (node) bumpMeasure();
  }, []);
  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || index === null) { setStageHeight(null); return; }
    const content = stage.querySelector<HTMLElement>(`[data-slot="${index}"] > *`);
    if (!content) return;
    const min = parseFloat(getComputedStyle(stage).minBlockSize) || 0;
    const h = Math.max(content.getBoundingClientRect().height, min);
    setStageHeight((p) => (p !== null && Math.abs(p - h) < 1 ? p : h));
  }, [index, measureTick, open]);

  // A frame slid out of view must not keep talking.
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage || index === null) return;
    for (const v of stage.querySelectorAll<HTMLVideoElement>("video")) {
      if (!v.closest(`[data-slot="${index}"]`)) v.pause();
    }
  }, [index]);

  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <BaseDialog.Portal container={portalContainer}>
        <BaseDialog.Backdrop className="zds-lightbox__backdrop" />
        <BaseDialog.Popup ref={ref} onKeyDown={onKeyDown}
          className={["zds-lightbox", className].filter(Boolean).join(" ")} data-shape={shape}>
          <div className="zds-lightbox__toolbar">
            <BaseDialog.Title className="zds-lightbox__name" title={name}>{name}</BaseDialog.Title>
            {paging ? <span className="zds-lightbox__counter">{fmt(S.counter, { index: index! + 1, count: items.length })}</span> : null}
            <div className="zds-lightbox__actions">
              {showOpenInNew ? <IconButton flavour="subtle" size="medium" shape={shape} icon="open-in-new-window" label={S.openInNew} disabled={!url} onClick={openInNew} /> : null}
              {showDownload ? <IconButton flavour="subtle" size="medium" shape={shape} icon="download" label={S.download} disabled={!url} onClick={download} /> : null}
              <BaseDialog.Close render={<IconButton flavour="subtle" size="medium" shape={shape} icon="close" label={S.close} />} />
            </div>
          </div>
          <div ref={setStage} className="zds-lightbox__stage" data-kind={kind} data-animated={sliding || undefined}
            style={stageHeight !== null ? { blockSize: stageHeight } : undefined}>
            {/* One slot per item; the track slides to the current one. Only
                the current and neighbouring slots hold content, so paging
                never remounts what is already on screen. */}
            <div className="zds-lightbox__track"
              style={{ translate: `calc(${-(index ?? 0)} * 100%) 0` }}>
              {items.map((it, i) => {
                const near = index !== null && Math.abs(i - index) <= 1;
                const current = i === index;
                return (
                  <div key={i} className="zds-lightbox__slot" data-slot={i}
                    aria-hidden={!current || undefined} inert={!current}>
                    {near ? (
                      <Media item={it} name={nameOf(it, S.untitled)} iconStyle={iconStyle}
                        noPreview={S.noPreview} onSized={current ? onCurrentSized : undefined} />
                    ) : null}
                  </div>
                );
              })}
            </div>
            {paging ? (
              // Contrast: the strongest neutral, so the arrows read over any media.
              <>
                <IconButton className="zds-lightbox__prev" flavour="contrast" size="medium" shape={shape}
                  icon="chevron-left" label={S.previous} disabled={index === 0} onClick={prev} />
                <IconButton className="zds-lightbox__next" flavour="contrast" size="medium" shape={shape}
                  icon="chevron-right" label={S.next} disabled={index === items.length - 1} onClick={next} />
              </>
            ) : null}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
});
