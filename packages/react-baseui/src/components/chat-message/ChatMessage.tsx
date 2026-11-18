import * as React from "react";
import { createPortal } from "react-dom";
import { Menu } from "@base-ui/react/menu";
import { Avatar } from "../avatar/Avatar.js";
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Dropdown } from "../dropdown/Dropdown.js";
import { DropdownMenu } from "../dropdown-menu/DropdownMenu.js";
import { Divider } from "../divider/Divider.js";
import { CaretIndicator } from "../caret-indicator/CaretIndicator.js";
import { Scrim } from "../scrim/Scrim.js";
import "./chat-message.css";

export type ChatPlatform = "mobile" | "desktop";
export type ChatStyle = "conversation" | "channel";
export type ChatRole = "receiver" | "sender" | "assistant";
export type ChatState = "default" | "active" | "loading";
export type ChatSequence = "first" | "consecutive";
export type ChatBubbleStatus = "single" | "first" | "middle" | "last";

/** Every string the message shows or announces. `{count}` and `{name}` are filled in. */
export const chatMessageStrings = {
  react: "Add reaction",
  replyAction: "Reply",
  more: "More actions",
  reply: "reply",
  replies: "replies",
  threadToggle: "{count} {noun}",
  loading: "Thinking",
  moreReactions: "More reactions",
  download: "Download {name}",
  play: "Play",
  pause: "Pause",
};
export type ChatMessageStrings = typeof chatMessageStrings;

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
const RoundedContext = React.createContext<boolean | null>(null);
const useRounded = (own?: boolean) => own ?? React.useContext(RoundedContext) ?? true;
/** The space/xs scale value, read from the token layer for Base UI's numeric offsets. */
const spaceOffset = () => {
  if (typeof window === "undefined") return 8;
  const px = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--space-sm"));
  return Number.isFinite(px) ? px : 8;
};

// ---- Bubble ---------------------------------------------------------------

export interface ChatBubbleProps {
  /** fill: a tinted bubble; none: plain text on the page. */
  bubbleStyle?: "fill" | "none";
  /** Position in a run of one sender's bubbles. The corner toward the neighbour tightens. */
  status?: ChatBubbleStatus;
  role?: "sender" | "receiver";
  rounded?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * The text of a message. A fill bubble hugs its text and wraps at 80% of the
 * chat's width; the sender's on interactive/primary/background/default, the
 * receiver's on surface/brand. In a run the inner corners tighten.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatBubble({ bubbleStyle = "fill", status = "single", role = "sender", rounded, children, className }: ChatBubbleProps) {
  const r = useRounded(rounded);
  return (
    <div className={cx("zds-chat-bubble", className)} data-style={bubbleStyle} data-status={status} data-role={role} data-rounded={r || undefined}>
      {children}
    </div>
  );
}

// ---- Timestamp --------------------------------------------------------------

/** The send time, formatted by the product. body/xsmall on foreground/secondary. */
export function ChatTimestamp({ children, dateTime, className }: { children?: React.ReactNode; dateTime?: string; className?: string }) {
  return <time className={cx("zds-chat-timestamp", className)} dateTime={dateTime}>{children}</time>;
}

// ---- Loading Indicator -------------------------------------------------------

/** Three pulsing dots and a short present-tense label: Thinking, Typing. Stops under reduced motion. */
export function ChatLoadingIndicator({ label = chatMessageStrings.loading, rounded, className }: { label?: string; rounded?: boolean; className?: string }) {
  const r = useRounded(rounded);
  return (
    <span className={cx("zds-chat-loading", className)} data-rounded={r || undefined} role="status">
      <span className="zds-chat-loading__dots" aria-hidden="true"><span /><span /><span /></span>
      <span className="zds-chat-loading__label">{label}</span>
    </span>
  );
}

// ---- Controls ---------------------------------------------------------------

export interface ChatControlsProps {
  /** fill: a floating bar on surface/overlay; none: transparent (the assistant's). */
  controlsStyle?: "fill" | "none";
  rounded?: boolean;
  /** Shows the React toggle. */
  showReact?: boolean;
  /** Shows the More toggle. */
  showMore?: boolean;
  reactOpen?: boolean;
  moreOpen?: boolean;
  onReact?: () => void;
  onMore?: () => void;
  /** The Control Slot: extra actions. Defaults to Reply. */
  children?: React.ReactNode;
  /** Wraps the More button, e.g. in a Dropdown. */
  renderMore?: (button: React.ReactElement) => React.ReactNode;
  strings?: Partial<ChatMessageStrings>;
  className?: string;
}

/**
 * The bar of message actions: React, the Control Slot (Reply by default) and
 * More. React and More are toggles; only one of their panels is open at a time.
 *
 * Spec issue followed as intended: every control follows `rounded` (Figma
 * mixes sharp and rounded buttons in one bar).
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatControls({ controlsStyle = "fill", rounded, showReact = true, showMore = true, reactOpen, moreOpen,
  onReact, onMore, children, renderMore, strings, className }: ChatControlsProps) {
  const r = useRounded(rounded);
  const S = { ...chatMessageStrings, ...strings };
  const shape = r ? "rounded" : "sharp";
  const more = (
    <IconButton flavour="text" size="small" shape={shape} icon="more-horizontal" label={S.more}
      aria-pressed={moreOpen} data-pressed={moreOpen || undefined} onClick={onMore} />
  );
  return (
    <div className={cx("zds-chat-controls", className)} data-style={controlsStyle} data-rounded={r || undefined} role="toolbar">
      {showReact ? (
        <IconButton flavour="text" size="small" shape={shape} icon="happy" label={S.react}
          aria-pressed={reactOpen} data-pressed={reactOpen || undefined} onClick={onReact} />
      ) : null}
      {children ?? <IconButton flavour="text" size="small" shape={shape} icon="reply" label={S.replyAction} />}
      {showMore ? (renderMore ? renderMore(more) : more) : null}
    </div>
  );
}

// ---- Thread -------------------------------------------------------------------

export interface ChatThreadProps {
  replyCount: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The Thread Slot: reply messages, each a ChatMessage. */
  children?: React.ReactNode;
  strings?: Partial<ChatMessageStrings>;
  className?: string;
}

/**
 * "X replies", a divider and a caret; pressing it expands the replies in
 * place, pushing the messages below down. In code the thread sits in its own
 * container under the message, lined up with the text (spec behaviour), and
 * hovering a reply never lights the parent message as well.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatThread({ replyCount, open: openProp, defaultOpen = false, onOpenChange, children, strings, className }: ChatThreadProps) {
  const S = { ...chatMessageStrings, ...strings };
  const [inner, setInner] = React.useState(defaultOpen);
  const open = openProp ?? inner;
  const id = React.useId();
  const toggle = () => { if (openProp === undefined) setInner(!open); onOpenChange?.(!open); };
  return (
    <div className={cx("zds-chat-thread", className)} data-open={open || undefined}>
      <button type="button" className="zds-chat-thread__toggle" aria-expanded={open} aria-controls={id} onClick={toggle}
        aria-label={fmt(S.threadToggle, { count: replyCount, noun: replyCount === 1 ? S.reply : S.replies })}>
        <span className="zds-chat-thread__count" aria-hidden="true">{replyCount} {replyCount === 1 ? S.reply : S.replies}</span>
        <Divider className="zds-chat-thread__divider" />
        <CaretIndicator open={open} direction="vertical" size="medium" />
      </button>
      <div id={id} className="zds-chat-thread__replies" hidden={!open}>{open ? children : null}</div>
    </div>
  );
}

// ---- Photos -----------------------------------------------------------------

export interface ChatPhotosProps {
  /** Image URLs. Up to three show; the rest are counted on the last tile. */
  photos: string[];
  /** Placeholder glyph while a tile has no image. */
  showIcon?: boolean;
  rounded?: boolean;
  onOpen?: (index: number) => void;
  /** Alt text per photo. */
  alt?: (index: number) => string;
  className?: string;
}

/**
 * Photos grouped as one grid: one full width, two equal tiles, or one large
 * tile beside two stacked, the last counting what does not fit.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatPhotos({ photos, showIcon = true, rounded, onOpen, alt = (i) => `Photo ${i + 1}`, className }: ChatPhotosProps) {
  const r = useRounded(rounded);
  const count = photos.length >= 4 ? "more" : String(Math.max(1, photos.length));
  const shown = photos.slice(0, 3);
  const extra = photos.length - 3;
  const tile = (src: string | undefined, i: number) => {
    const inner = src ? <img src={src} alt={alt(i)} /> : showIcon ? <Icon name="image" size="medium" /> : null;
    return onOpen
      ? <button key={i} type="button" className="zds-chat-photos__photo" onClick={() => onOpen(i)}>{inner}</button>
      : <span key={i} className="zds-chat-photos__photo">{inner}</span>;
  };
  return (
    <div className={cx("zds-chat-photos", className)} data-count={count} data-rounded={r || undefined}>
      {tile(shown[0], 0)}
      {shown.length === 2 ? tile(shown[1], 1) : null}
      {shown.length >= 3 ? (
        <span className="zds-chat-photos__stack">
          {tile(shown[1], 1)}
          {tile(shown[2], 2)}
        </span>
      ) : null}
      {extra > 0 ? <span className="zds-chat-photos__extra">+{extra}</span> : null}
    </div>
  );
}

// ---- Attachments --------------------------------------------------------------

export interface ChatAttachmentProps {
  type?: "file" | "video" | "audio";
  fileName?: string;
  /** Type and size, e.g. "PDF · 248 KB". */
  fileMeta?: string;
  /** Media length, e.g. "0:08". */
  duration?: string;
  /** Media or file URL. Audio and video play from it; a file downloads it. */
  src?: string;
  /** Video poster image. */
  poster?: string;
  /** Placeholder glyph while there is no poster. */
  showIcon?: boolean;
  /** Playback (spec): true is active, playing. Pressing play or pause still toggles it. */
  playing?: boolean;
  rounded?: boolean;
  onDownload?: () => void;
  strings?: Partial<ChatMessageStrings>;
  className?: string;
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const LEVELS = [0.3, 0.55, 0.42, 0.85, 0.6, 1, 0.5, 0.72, 0.38, 0.9, 0.62, 0.42, 0.78, 0.5, 0.3, 0.62, 0.45, 0.26];

/**
 * A file tile with a download control, a video preview, or an audio
 * waveform, in a message's Attachment Slot. Send each video as its own
 * attachment so it can preview. Playback is real when `src` is set.
 *
 * Spec issue followed as intended: a playing video keeps a pause control.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatAttachment({ type = "file", fileName = "", fileMeta, duration, src, poster, showIcon = true, playing: playingProp,
  rounded, onDownload, strings, className }: ChatAttachmentProps) {
  const r = useRounded(rounded);
  const S = { ...chatMessageStrings, ...strings };
  const media = React.useRef<HTMLMediaElement | null>(null);
  const [playing, setPlaying] = React.useState(playingProp ?? false);
  React.useEffect(() => {
    if (playingProp === undefined) return;
    const m = media.current;
    if (m) { if (playingProp) void m.play(); else m.pause(); } else setPlaying(playingProp);
  }, [playingProp]);
  const [progress, setProgress] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);
  const toggle = () => { const m = media.current; if (!m) { setPlaying((p) => !p); return; } if (m.paused) void m.play(); else m.pause(); };
  const mediaEvents = {
    onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onEnded: () => { setPlaying(false); setProgress(0); },
    onTimeUpdate: (e: React.SyntheticEvent<HTMLMediaElement>) => { const m = e.currentTarget; setElapsed(m.currentTime); setProgress(m.duration ? m.currentTime / m.duration : 0); },
  };
  const shape = r ? "rounded" : "sharp";
  if (type === "file") {
    return (
      <div className={cx("zds-chat-attachment", className)} data-type="file" data-rounded={r || undefined}>
        <span className="zds-chat-attachment__tile"><Icon name="document" size="large" /></span>
        <span className="zds-chat-attachment__text">
          <span className="zds-chat-attachment__name" title={fileName}>{fileName}</span>
          {fileMeta ? <span className="zds-chat-attachment__meta">{fileMeta}</span> : null}
        </span>
        {src && !onDownload
          ? <a className="zds-chat-attachment__download" href={src} download={fileName} aria-label={fmt(S.download, { name: fileName })}><Icon name="download" size="medium" /></a>
          : <IconButton className="zds-chat-attachment__download" flavour="text" size="medium" shape={shape} icon="download" label={fmt(S.download, { name: fileName })} onClick={onDownload} />}
      </div>
    );
  }
  if (type === "video") {
    return (
      <div className={cx("zds-chat-attachment", className)} data-type="video" data-rounded={r || undefined} data-playing={playing || undefined}>
        {src ? <video ref={(el) => { media.current = el; }} src={src} poster={poster} playsInline {...mediaEvents} />
          : poster ? <img src={poster} alt="" /> : showIcon ? <Icon className="zds-chat-attachment__poster" name="image" size="medium" /> : null}
        <IconButton className="zds-chat-attachment__play" flavour="primary" size="large" shape={r ? "full" : "sharp"}
          icon={playing ? "pause" : "play"} label={playing ? S.pause : S.play} onClick={toggle} />
        {duration && !playing ? <span className="zds-chat-attachment__chip">{duration}</span> : null}
      </div>
    );
  }
  const played = Math.round(progress * LEVELS.length);
  return (
    <div className={cx("zds-chat-attachment", className)} data-type="audio" data-rounded={r || undefined} data-playing={playing || undefined}>
      {src ? <audio ref={(el) => { media.current = el; }} src={src} preload="metadata" {...mediaEvents} /> : null}
      <IconButton className="zds-chat-attachment__audio-play" flavour="primary" size="small" shape={r ? "full" : "sharp"}
        icon={playing ? "pause" : "play"} label={playing ? S.pause : S.play} onClick={toggle} />
      <span className="zds-chat-attachment__wave" aria-hidden="true">
        {LEVELS.map((l, i) => <span key={i} data-played={playing && i < played ? "" : undefined} style={{ "--zds-level": l } as React.CSSProperties} />)}
      </span>
      <span className="zds-chat-attachment__duration">{playing ? clock(elapsed) : duration}</span>
    </div>
  );
}

// ---- Chat Message -------------------------------------------------------------

export interface ChatMessageProps {
  /** desktop: controls on hover or focus. mobile: a long press opens reactions and actions over a scrim. */
  platform?: ChatPlatform;
  /** channel: group chats, every message plain text with avatar and name. conversation: assistant and one-to-one, your messages in bubbles on the right. */
  chatStyle?: ChatStyle;
  role?: ChatRole;
  /** Pins the state. Unset, active follows hover or focus (desktop) or a long press (mobile). */
  state?: ChatState;
  /** first starts a run and carries the header; consecutive lines up under it. */
  sequence?: ChatSequence;
  rounded?: boolean;
  showAvatar?: boolean;
  showHeader?: boolean;
  /** The quoted line this message answers. Shown when `replyTo` is set. */
  replyTo?: string;
  replyText?: string;
  /** Keeps a consecutive message's time hidden until hover. Off, it shows at rest. The column stays either way. */
  hideTime?: boolean;
  /** The assistant's controls under the message. Its space is kept when off, so heights never shift. */
  showControls?: boolean;
  /** Opens the reactions row (controlled). */
  reactionControls?: boolean;
  onReactionControlsChange?: (open: boolean) => void;
  /** Opens the action menu (controlled). */
  expandMenu?: boolean;
  onExpandMenuChange?: (open: boolean) => void;
  name?: string;
  avatar?: { src?: string; initials?: string; icon?: IconName };
  /** The send time, formatted. */
  time?: string;
  /** The message text. Rendered in a Bubble. */
  message?: React.ReactNode;
  /** Position in a run; follows the conversation's own grouping. */
  bubbleStatus?: ChatBubbleStatus;
  /** The Attachment Slot: Photos or Attachments. A ChatThread passed here moves to `thread`. */
  attachments?: React.ReactNode;
  /**
   * The reply thread. It renders in its own container under the message,
   * outside the message's surface and indented to line up with its text, so
   * opening it or hovering a reply never makes the parent active (spec
   * Threads).
   */
  thread?: React.ReactNode;
  /** The Reactions Slot: Assist Chips with counts. */
  reactions?: React.ReactNode;
  /** Delivery status under your own most recent message, e.g. "Seen". */
  footer?: React.ReactNode;
  loadingLabel?: string;
  /** The Control Slot: extra actions between React and More. */
  controls?: React.ReactNode;
  /** The reactions offered in the row. */
  reactionOptions?: string[];
  onReact?: (reaction: string) => void;
  onMoreReactions?: () => void;
  /** Menu Items for the action menu (desktop More, mobile long press). */
  menu?: React.ReactNode;
  /** Where the menu and the mobile scrim mount. Defaults to document.body. */
  portalContainer?: HTMLElement | null;
  strings?: Partial<ChatMessageStrings>;
  className?: string;
}

const REACTIONS = ["👍", "❤️", "😂", "😮", "🙏"];

/**
 * One message in a chat, from someone else, you or the assistant. Style sets
 * the setting: channel for group chats, conversation for assistant and
 * one-to-one chats. Platform sets how actions open: hover on desktop, long
 * press on mobile. Sequence separates the first message in a run, which
 * carries the header, from the consecutive messages under it.
 *
 * Desktop: the controls float over the message's top edge, overlapping it by
 * space/lg, on hover or focus; the reactions row and the menu never show
 * together. Mobile: a long press (about 450 ms) lifts the message over a
 * Scrim, reactions above it and the menu below, sliding it up just enough
 * when the menu would not fit. Escape, a tap on the scrim or a press outside
 * closes everything. The assistant keeps its controls under the message,
 * with no reactions row or menu.
 *
 * Spec issues followed as intended rather than as drawn: channel messages
 * are start aligned; `hideTime` hides only the time, never the column; the
 * bubble's status comes from `bubbleStatus`; reactions and footer never
 * show for the assistant.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(function ChatMessage(
  { platform = "desktop", chatStyle = "channel", role = "receiver", state: pinned, sequence = "first", rounded = true,
    showAvatar = true, showHeader = true, replyTo, replyText, hideTime = true, showControls = true,
    reactionControls, onReactionControlsChange, expandMenu, onExpandMenuChange,
    name, avatar, time, message, bubbleStatus = "single", attachments: attachmentsProp, thread: threadProp, reactions, footer, loadingLabel,
    controls, reactionOptions = REACTIONS, onReact, onMoreReactions, menu, portalContainer, strings, className },
  ref,
) {
  const S = { ...chatMessageStrings, ...strings };
  // Figma carries the thread in the Attachment Slot; in code it moves to its
  // own container under the message (spec Threads).
  const isThread = (n: React.ReactNode) => React.isValidElement(n) && n.type === ChatThread;
  const flat = (n: React.ReactNode): React.ReactNode[] =>
    React.Children.toArray(n).flatMap((c) => (React.isValidElement(c) && c.type === React.Fragment ? flat((c.props as { children?: React.ReactNode }).children) : [c]));
  const parts = flat(attachmentsProp);
  const moved = parts.filter(isThread);
  const rest = parts.filter((c) => !isThread(c));
  const attachments = rest.length ? rest : null;
  const thread = threadProp ?? (moved.length ? moved : null);
  const root = React.useRef<HTMLDivElement | null>(null);
  const [reactInner, setReactInner] = React.useState(false);
  const [menuInner, setMenuInner] = React.useState(false);
  const [held, setHeld] = React.useState(false);
  const [lift, setLift] = React.useState(0);
  const reactOpen = reactionControls ?? reactInner;
  const menuOpen = expandMenu ?? menuInner;
  const setReact = (o: boolean) => { if (reactionControls === undefined) setReactInner(o); onReactionControlsChange?.(o); };
  const setMenu = (o: boolean) => { if (expandMenu === undefined) setMenuInner(o); onExpandMenuChange?.(o); };
  const assistant = role === "assistant";
  const mobile = platform === "mobile";
  const ownBubble = chatStyle === "conversation" && role === "sender";
  const first = sequence === "first";
  const loading = (pinned ?? "default") === "loading";
  const active = pinned === "active" || reactOpen || menuOpen || held;

  // ---- mobile long press --------------------------------------------------
  const press = React.useRef<number | undefined>(undefined);
  const startPress = (e: React.PointerEvent) => {
    if (!mobile || assistant || loading || e.button !== 0) return;
    window.clearTimeout(press.current);
    press.current = window.setTimeout(() => { setHeld(true); setReact(true); setMenu(!!menu); }, 450);
  };
  const cancelPress = () => window.clearTimeout(press.current);
  const release = React.useCallback(() => { setHeld(false); setReact(false); setMenu(false); setLift(0); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!held) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") release(); };
    document.addEventListener("keydown", onKey);
    // Slide up just enough for the menu, leaving space/sm at the bottom.
    const raf = requestAnimationFrame(() => {
      const el = root.current, list = document.querySelector<HTMLElement>(".zds-chat-message__held-menu");
      if (!el) return;
      const gap = spaceOffset();
      const bottom = el.getBoundingClientRect().bottom + (list?.offsetHeight ?? 0) + gap * 2;
      const over = bottom - window.innerHeight;
      setLift(over > 0 ? Math.min(over, el.getBoundingClientRect().top - gap * 8) : 0);
    });
    return () => { document.removeEventListener("keydown", onKey); cancelAnimationFrame(raf); };
  }, [held, release]);

  // ---- desktop: reactions row and menu exclude each other --------------------
  React.useEffect(() => {
    if (mobile || !reactOpen) return;
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setReact(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setReact(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [mobile, reactOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const reactionRow = (
    <div className="zds-chat-message__reactions-row" role="toolbar" aria-label={S.react} data-rounded={rounded || undefined}>
      {reactionOptions.map((r) => (
        <button key={r} type="button" className="zds-chat-message__reaction-option" onClick={() => { onReact?.(r); release(); }}>{r}</button>
      ))}
      <IconButton flavour="text" size="small" shape={rounded ? "rounded" : "sharp"} icon="add" label={S.moreReactions}
        onClick={() => { onMoreReactions?.(); release(); }} />
    </div>
  );

  const bubble = message !== undefined && message !== null ? (
    <ChatBubble bubbleStyle={chatStyle === "conversation" && !assistant ? "fill" : "none"} status={bubbleStatus}
      role={role === "sender" ? "sender" : "receiver"}>{message}</ChatBubble>
  ) : null;

  const desktopControls = !mobile && !assistant && !loading ? (
    <div className="zds-chat-message__float">
      {reactOpen ? reactionRow : null}
      <ChatControls reactOpen={reactOpen} moreOpen={menuOpen} showMore={!!menu}
        onReact={() => { setMenu(false); setReact(!reactOpen); }}
        renderMore={(btn) => (
          <Dropdown trigger={btn} position="bottom" align="right" rounded={rounded} compact open={menuOpen}
            onOpenChange={(o) => { if (o) setReact(false); setMenu(o); }} portalContainer={portalContainer ?? undefined}>{menu}</Dropdown>
        )} strings={strings}>{controls}</ChatControls>
    </div>
  ) : null;

  const assistantControls = assistant && !loading ? (
    <div className="zds-chat-message__assistant-controls" data-hidden={!showControls || undefined}>
      <ChatControls controlsStyle="none" showReact={false} showMore={false} strings={strings}>
        {controls ?? <>
          <IconButton flavour="text" size="small" shape={rounded ? "rounded" : "sharp"} icon="copy-file" label="Copy" />
          <IconButton flavour="text" size="small" shape={rounded ? "rounded" : "sharp"} icon="reply" label={S.replyAction} />
          <IconButton flavour="text" size="small" shape={rounded ? "rounded" : "sharp"} icon="refresh" label="Regenerate" />
        </>}
      </ChatControls>
    </div>
  ) : null;

  const lead = first ? (
    showAvatar && !ownBubble ? <Avatar className="zds-chat-message__avatar" size="xsmall" showStatus={false} showClose={false} showRing={false} src={avatar?.src} initials={avatar?.initials}
      icon={avatar?.icon} type={avatar?.src ? "photo" : avatar?.icon ? "icon" : "initials"} alt="" /> : null
  ) : (
    <span className="zds-chat-message__time-column" data-hide-time={hideTime || undefined}>
      {time ? <ChatTimestamp>{time}</ChatTimestamp> : null}
    </span>
  );

  const body = (
    <div ref={(el) => { root.current = el; if (typeof ref === "function") ref(el); else if (ref) ref.current = el; }}
      className={cx("zds-chat-message", className)}
      data-platform={platform} data-style={chatStyle} data-role={role} data-sequence={sequence}
      data-state={loading ? "loading" : active ? "active" : pinned ?? "default"} data-pinned={pinned === "active" || undefined}
      data-rounded={rounded || undefined} data-held={held || undefined} data-header={first && showHeader && !ownBubble ? "" : undefined}
      style={held && lift ? ({ "--zds-chat-lift": `${-lift}px` } as React.CSSProperties) : undefined}
      onPointerDown={startPress} onPointerUp={cancelPress} onPointerLeave={cancelPress} onPointerCancel={cancelPress}
      onContextMenu={mobile ? (e) => e.preventDefault() : undefined}>
      {lead}
      <div className="zds-chat-message__main">
        {first && showHeader && !ownBubble ? (
          <div className="zds-chat-message__header">
            <span className="zds-chat-message__name">{name}</span>
            {time ? <ChatTimestamp>{time}</ChatTimestamp> : null}
          </div>
        ) : null}
        {replyTo ? (
          <div className="zds-chat-message__reply">
            <Icon name="reply" size="xsmall" />
            <span className="zds-chat-message__reply-to">{replyTo}</span>
            <span className="zds-chat-message__reply-text">{replyText}</span>
          </div>
        ) : null}
        {loading ? <ChatLoadingIndicator label={loadingLabel ?? (assistant ? S.loading : "Typing")} /> : (
          <div className="zds-chat-message__content">
            {bubble}
            {attachments ? <div className="zds-chat-message__attachments">{attachments}</div> : null}
          </div>
        )}
        {reactions && !assistant && !loading ? <div className="zds-chat-message__reactions">{reactions}</div> : null}
        {footer && !assistant && !loading ? (
          <div className="zds-chat-message__footer"><Icon name="check-mark" size="small" /><span>{footer}</span></div>
        ) : null}
        {assistantControls}
      </div>
      {desktopControls}
      {held ? <div className="zds-chat-message__held-reactions">{reactionRow}</div> : null}
    </div>
  );

  return (
    <RoundedContext.Provider value={rounded}>
      {body}
      {thread ? (
        <div className="zds-chat-message__thread" data-style={chatStyle} data-role={role}>{thread}</div>
      ) : null}
      {held && typeof document !== "undefined"
        ? createPortal(<div className="zds-chat-message__scrim" onPointerDown={release}><Scrim /></div>, portalContainer ?? document.body)
        : null}
      {held && menu ? (
        <Menu.Root open onOpenChange={(o) => { if (!o) release(); }}>
          <Menu.Portal container={portalContainer ?? undefined}>
            <Menu.Positioner className="zds-chat-message__held-positioner" anchor={root} side="bottom"
              align={ownBubble ? "end" : "start"} sideOffset={spaceOffset} collisionAvoidance={{ side: "none" }}>
              <DropdownMenu rounded={rounded} compact className="zds-chat-message__held-menu">{menu}</DropdownMenu>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      ) : null}
    </RoundedContext.Provider>
  );
});
