import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { createPortal } from "react-dom";
import { Menu } from "@base-ui/react/menu";
import { Avatar } from "../avatar/Avatar.js";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Dropdown } from "../dropdown/Dropdown.js";
import { DropdownMenu } from "../dropdown-menu/DropdownMenu.js";
import { Divider } from "../divider/Divider.js";
import { CaretIndicator } from "../caret-indicator/CaretIndicator.js";
import { Scrim } from "../scrim/Scrim.js";
import "./chat-message.css";
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
const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const cx = (...c) => c.filter(Boolean).join(" ");
const RoundedContext = React.createContext(null);
const useRounded = (own) => own ?? React.useContext(RoundedContext) ?? true;
/** The space/xs scale value, read from the token layer for Base UI's numeric offsets. */
const spaceOffset = () => {
    if (typeof window === "undefined")
        return 8;
    const px = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--space-sm"));
    return Number.isFinite(px) ? px : 8;
};
/**
 * The text of a message. A fill bubble hugs its text and wraps at 80% of the
 * chat's width; the sender's on interactive/primary/background/default, the
 * receiver's on surface/brand. In a run the inner corners tighten.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatBubble({ bubbleStyle = "fill", status = "single", role = "sender", rounded, children, className }) {
    const r = useRounded(rounded);
    return (_jsx("div", { className: cx("zds-chat-bubble", className), "data-style": bubbleStyle, "data-status": status, "data-role": role, "data-rounded": r || undefined, children: children }));
}
// ---- Timestamp --------------------------------------------------------------
/** The send time, formatted by the product. body/xsmall on foreground/secondary. */
export function ChatTimestamp({ children, dateTime, className }) {
    return _jsx("time", { className: cx("zds-chat-timestamp", className), dateTime: dateTime, children: children });
}
// ---- Loading Indicator -------------------------------------------------------
/** Three pulsing dots and a short present-tense label: Thinking, Typing. Stops under reduced motion. */
export function ChatLoadingIndicator({ label = chatMessageStrings.loading, rounded, className }) {
    const r = useRounded(rounded);
    return (_jsxs("span", { className: cx("zds-chat-loading", className), "data-rounded": r || undefined, role: "status", children: [_jsxs("span", { className: "zds-chat-loading__dots", "aria-hidden": "true", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsx("span", { className: "zds-chat-loading__label", children: label })] }));
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
export function ChatControls({ controlsStyle = "fill", rounded, showReact = true, showMore = true, reactOpen, moreOpen, onReact, onMore, children, renderMore, strings, className }) {
    const r = useRounded(rounded);
    const S = { ...chatMessageStrings, ...strings };
    const shape = r ? "rounded" : "sharp";
    const more = (_jsx(IconButton, { flavour: "text", size: "small", shape: shape, icon: "more-horizontal", label: S.more, "aria-pressed": moreOpen, "data-pressed": moreOpen || undefined, onClick: onMore }));
    return (_jsxs("div", { className: cx("zds-chat-controls", className), "data-style": controlsStyle, "data-rounded": r || undefined, role: "toolbar", children: [showReact ? (_jsx(IconButton, { flavour: "text", size: "small", shape: shape, icon: "happy", label: S.react, "aria-pressed": reactOpen, "data-pressed": reactOpen || undefined, onClick: onReact })) : null, children ?? _jsx(IconButton, { flavour: "text", size: "small", shape: shape, icon: "reply", label: S.replyAction }), showMore ? (renderMore ? renderMore(more) : more) : null] }));
}
/**
 * "X replies", a divider and a caret; pressing it expands the replies in
 * place, pushing the messages below down. In code the thread sits in its own
 * container under the message, lined up with the text (spec behaviour), and
 * hovering a reply never lights the parent message as well.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatThread({ replyCount, open: openProp, defaultOpen = false, onOpenChange, children, strings, className }) {
    const S = { ...chatMessageStrings, ...strings };
    const [inner, setInner] = React.useState(defaultOpen);
    const open = openProp ?? inner;
    const id = React.useId();
    const toggle = () => { if (openProp === undefined)
        setInner(!open); onOpenChange?.(!open); };
    return (_jsxs("div", { className: cx("zds-chat-thread", className), "data-open": open || undefined, children: [_jsxs("button", { type: "button", className: "zds-chat-thread__toggle", "aria-expanded": open, "aria-controls": id, onClick: toggle, "aria-label": fmt(S.threadToggle, { count: replyCount, noun: replyCount === 1 ? S.reply : S.replies }), children: [_jsxs("span", { className: "zds-chat-thread__count", "aria-hidden": "true", children: [replyCount, " ", replyCount === 1 ? S.reply : S.replies] }), _jsx(Divider, { className: "zds-chat-thread__divider" }), _jsx(CaretIndicator, { open: open, direction: "vertical", size: "medium" })] }), _jsx("div", { id: id, className: "zds-chat-thread__replies", hidden: !open, children: open ? children : null })] }));
}
/**
 * Photos grouped as one grid: one full width, two equal tiles, or one large
 * tile beside two stacked, the last counting what does not fit.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export function ChatPhotos({ photos, showIcon = true, rounded, onOpen, alt = (i) => `Photo ${i + 1}`, className }) {
    const r = useRounded(rounded);
    const count = photos.length >= 4 ? "more" : String(Math.max(1, photos.length));
    const shown = photos.slice(0, 3);
    const extra = photos.length - 3;
    const tile = (src, i) => {
        const inner = src ? _jsx("img", { src: src, alt: alt(i) }) : showIcon ? _jsx(Icon, { name: "image", size: "medium" }) : null;
        return onOpen
            ? _jsx("button", { type: "button", className: "zds-chat-photos__photo", onClick: () => onOpen(i), children: inner }, i)
            : _jsx("span", { className: "zds-chat-photos__photo", children: inner }, i);
    };
    return (_jsxs("div", { className: cx("zds-chat-photos", className), "data-count": count, "data-rounded": r || undefined, children: [tile(shown[0], 0), shown.length === 2 ? tile(shown[1], 1) : null, shown.length >= 3 ? (_jsxs("span", { className: "zds-chat-photos__stack", children: [tile(shown[1], 1), tile(shown[2], 2)] })) : null, extra > 0 ? _jsxs("span", { className: "zds-chat-photos__extra", children: ["+", extra] }) : null] }));
}
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
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
export function ChatAttachment({ type = "file", fileName = "", fileMeta, duration, src, poster, showIcon = true, playing: playingProp, rounded, onDownload, strings, className }) {
    const r = useRounded(rounded);
    const S = { ...chatMessageStrings, ...strings };
    const media = React.useRef(null);
    const [playing, setPlaying] = React.useState(playingProp ?? false);
    React.useEffect(() => {
        if (playingProp === undefined)
            return;
        const m = media.current;
        if (m) {
            if (playingProp)
                void m.play();
            else
                m.pause();
        }
        else
            setPlaying(playingProp);
    }, [playingProp]);
    const [progress, setProgress] = React.useState(0);
    const [elapsed, setElapsed] = React.useState(0);
    const toggle = () => { const m = media.current; if (!m) {
        setPlaying((p) => !p);
        return;
    } if (m.paused)
        void m.play();
    else
        m.pause(); };
    const mediaEvents = {
        onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onEnded: () => { setPlaying(false); setProgress(0); },
        onTimeUpdate: (e) => { const m = e.currentTarget; setElapsed(m.currentTime); setProgress(m.duration ? m.currentTime / m.duration : 0); },
    };
    const shape = r ? "rounded" : "sharp";
    if (type === "file") {
        return (_jsxs("div", { className: cx("zds-chat-attachment", className), "data-type": "file", "data-rounded": r || undefined, children: [_jsx("span", { className: "zds-chat-attachment__tile", children: _jsx(Icon, { name: "document", size: "large" }) }), _jsxs("span", { className: "zds-chat-attachment__text", children: [_jsx("span", { className: "zds-chat-attachment__name", title: fileName, children: fileName }), fileMeta ? _jsx("span", { className: "zds-chat-attachment__meta", children: fileMeta }) : null] }), src && !onDownload
                    ? _jsx("a", { className: "zds-chat-attachment__download", href: src, download: fileName, "aria-label": fmt(S.download, { name: fileName }), children: _jsx(Icon, { name: "download", size: "medium" }) })
                    : _jsx(IconButton, { className: "zds-chat-attachment__download", flavour: "text", size: "medium", shape: shape, icon: "download", label: fmt(S.download, { name: fileName }), onClick: onDownload })] }));
    }
    if (type === "video") {
        return (_jsxs("div", { className: cx("zds-chat-attachment", className), "data-type": "video", "data-rounded": r || undefined, "data-playing": playing || undefined, children: [src ? _jsx("video", { ref: (el) => { media.current = el; }, src: src, poster: poster, playsInline: true, ...mediaEvents })
                    : poster ? _jsx("img", { src: poster, alt: "" }) : showIcon ? _jsx(Icon, { className: "zds-chat-attachment__poster", name: "image", size: "medium" }) : null, _jsx(IconButton, { className: "zds-chat-attachment__play", flavour: "primary", size: "large", shape: r ? "full" : "sharp", icon: playing ? "pause" : "play", label: playing ? S.pause : S.play, onClick: toggle }), duration && !playing ? _jsx("span", { className: "zds-chat-attachment__chip", children: duration }) : null] }));
    }
    const played = Math.round(progress * LEVELS.length);
    return (_jsxs("div", { className: cx("zds-chat-attachment", className), "data-type": "audio", "data-rounded": r || undefined, "data-playing": playing || undefined, children: [src ? _jsx("audio", { ref: (el) => { media.current = el; }, src: src, preload: "metadata", ...mediaEvents }) : null, _jsx(IconButton, { className: "zds-chat-attachment__audio-play", flavour: "primary", size: "small", shape: r ? "full" : "sharp", icon: playing ? "pause" : "play", label: playing ? S.pause : S.play, onClick: toggle }), _jsx("span", { className: "zds-chat-attachment__wave", "aria-hidden": "true", children: LEVELS.map((l, i) => _jsx("span", { "data-played": playing && i < played ? "" : undefined, style: { "--zds-level": l } }, i)) }), _jsx("span", { className: "zds-chat-attachment__duration", children: playing ? clock(elapsed) : duration })] }));
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
export const ChatMessage = React.forwardRef(function ChatMessage({ platform = "desktop", chatStyle = "channel", role = "receiver", state: pinned, sequence = "first", rounded = true, showAvatar = true, showHeader = true, replyTo, replyText, hideTime = true, showControls = true, reactionControls, onReactionControlsChange, expandMenu, onExpandMenuChange, name, avatar, time, message, bubbleStatus = "single", attachments: attachmentsProp, thread: threadProp, reactions, footer, loadingLabel, controls, reactionOptions = REACTIONS, onReact, onMoreReactions, menu, portalContainer, strings, className }, ref) {
    const S = { ...chatMessageStrings, ...strings };
    // Figma carries the thread in the Attachment Slot; in code it moves to its
    // own container under the message (spec Threads).
    const isThread = (n) => React.isValidElement(n) && n.type === ChatThread;
    const flat = (n) => React.Children.toArray(n).flatMap((c) => (React.isValidElement(c) && c.type === React.Fragment ? flat(c.props.children) : [c]));
    const parts = flat(attachmentsProp);
    const moved = parts.filter(isThread);
    const rest = parts.filter((c) => !isThread(c));
    const attachments = rest.length ? rest : null;
    const thread = threadProp ?? (moved.length ? moved : null);
    const root = React.useRef(null);
    const [reactInner, setReactInner] = React.useState(false);
    const [menuInner, setMenuInner] = React.useState(false);
    const [held, setHeld] = React.useState(false);
    const [lift, setLift] = React.useState(0);
    const reactOpen = reactionControls ?? reactInner;
    const menuOpen = expandMenu ?? menuInner;
    const setReact = (o) => { if (reactionControls === undefined)
        setReactInner(o); onReactionControlsChange?.(o); };
    const setMenu = (o) => { if (expandMenu === undefined)
        setMenuInner(o); onExpandMenuChange?.(o); };
    const assistant = role === "assistant";
    const mobile = platform === "mobile";
    const ownBubble = chatStyle === "conversation" && role === "sender";
    const first = sequence === "first";
    const loading = (pinned ?? "default") === "loading";
    const active = pinned === "active" || reactOpen || menuOpen || held;
    // ---- mobile long press --------------------------------------------------
    const press = React.useRef(undefined);
    const startPress = (e) => {
        if (!mobile || assistant || loading || e.button !== 0)
            return;
        window.clearTimeout(press.current);
        press.current = window.setTimeout(() => { setHeld(true); setReact(true); setMenu(!!menu); }, 450);
    };
    const cancelPress = () => window.clearTimeout(press.current);
    const release = React.useCallback(() => { setHeld(false); setReact(false); setMenu(false); setLift(0); }, []); // eslint-disable-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if (!held)
            return;
        const onKey = (e) => { if (e.key === "Escape")
            release(); };
        document.addEventListener("keydown", onKey);
        // Slide up just enough for the menu, leaving space/sm at the bottom.
        const raf = requestAnimationFrame(() => {
            const el = root.current, list = document.querySelector(".zds-chat-message__held-menu");
            if (!el)
                return;
            const gap = spaceOffset();
            const bottom = el.getBoundingClientRect().bottom + (list?.offsetHeight ?? 0) + gap * 2;
            const over = bottom - window.innerHeight;
            setLift(over > 0 ? Math.min(over, el.getBoundingClientRect().top - gap * 8) : 0);
        });
        return () => { document.removeEventListener("keydown", onKey); cancelAnimationFrame(raf); };
    }, [held, release]);
    // ---- desktop: reactions row and menu exclude each other --------------------
    React.useEffect(() => {
        if (mobile || !reactOpen)
            return;
        const away = (e) => { if (!root.current?.contains(e.target))
            setReact(false); };
        const esc = (e) => { if (e.key === "Escape")
            setReact(false); };
        document.addEventListener("pointerdown", away);
        document.addEventListener("keydown", esc);
        return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
    }, [mobile, reactOpen]); // eslint-disable-line react-hooks/exhaustive-deps
    const reactionRow = (_jsxs("div", { className: "zds-chat-message__reactions-row", role: "toolbar", "aria-label": S.react, "data-rounded": rounded || undefined, children: [reactionOptions.map((r) => (_jsx("button", { type: "button", className: "zds-chat-message__reaction-option", onClick: () => { onReact?.(r); release(); }, children: r }, r))), _jsx(IconButton, { flavour: "text", size: "small", shape: rounded ? "rounded" : "sharp", icon: "add", label: S.moreReactions, onClick: () => { onMoreReactions?.(); release(); } })] }));
    const bubble = message !== undefined && message !== null ? (_jsx(ChatBubble, { bubbleStyle: chatStyle === "conversation" && !assistant ? "fill" : "none", status: bubbleStatus, role: role === "sender" ? "sender" : "receiver", children: message })) : null;
    const desktopControls = !mobile && !assistant && !loading ? (_jsxs("div", { className: "zds-chat-message__float", children: [reactOpen ? reactionRow : null, _jsx(ChatControls, { reactOpen: reactOpen, moreOpen: menuOpen, showMore: !!menu, onReact: () => { setMenu(false); setReact(!reactOpen); }, renderMore: (btn) => (_jsx(Dropdown, { trigger: btn, position: "bottom", align: "right", rounded: rounded, compact: true, open: menuOpen, onOpenChange: (o) => { if (o)
                        setReact(false); setMenu(o); }, portalContainer: portalContainer ?? undefined, children: menu })), strings: strings, children: controls })] })) : null;
    const assistantControls = assistant && !loading ? (_jsx("div", { className: "zds-chat-message__assistant-controls", "data-hidden": !showControls || undefined, children: _jsx(ChatControls, { controlsStyle: "none", showReact: false, showMore: false, strings: strings, children: controls ?? _jsxs(_Fragment, { children: [_jsx(IconButton, { flavour: "text", size: "small", shape: rounded ? "rounded" : "sharp", icon: "copy-file", label: "Copy" }), _jsx(IconButton, { flavour: "text", size: "small", shape: rounded ? "rounded" : "sharp", icon: "reply", label: S.replyAction }), _jsx(IconButton, { flavour: "text", size: "small", shape: rounded ? "rounded" : "sharp", icon: "refresh", label: "Regenerate" })] }) }) })) : null;
    const lead = first ? (showAvatar && !ownBubble ? _jsx(Avatar, { className: "zds-chat-message__avatar", size: "xsmall", showStatus: false, showClose: false, showRing: false, src: avatar?.src, initials: avatar?.initials, icon: avatar?.icon, swatchColor: avatar?.swatchColor, type: avatar?.src ? "photo" : avatar?.icon ? "icon" : "initials", alt: "" }) : null) : (_jsx("span", { className: "zds-chat-message__time-column", "data-hide-time": hideTime || undefined, children: time ? _jsx(ChatTimestamp, { children: time }) : null }));
    const body = (_jsxs("div", { ref: (el) => { root.current = el; if (typeof ref === "function")
            ref(el);
        else if (ref)
            ref.current = el; }, className: cx("zds-chat-message", className), "data-platform": platform, "data-style": chatStyle, "data-role": role, "data-sequence": sequence, "data-state": loading ? "loading" : active ? "active" : pinned ?? "default", "data-pinned": pinned === "active" || undefined, "data-rounded": rounded || undefined, "data-held": held || undefined, "data-header": first && showHeader && !ownBubble ? "" : undefined, style: held && lift ? { "--zds-chat-lift": `${-lift}px` } : undefined, onPointerDown: startPress, onPointerUp: cancelPress, onPointerLeave: cancelPress, onPointerCancel: cancelPress, onContextMenu: mobile ? (e) => e.preventDefault() : undefined, children: [lead, _jsxs("div", { className: "zds-chat-message__main", children: [first && showHeader && !ownBubble ? (_jsxs("div", { className: "zds-chat-message__header", children: [_jsx("span", { className: "zds-chat-message__name", children: name }), time ? _jsx(ChatTimestamp, { children: time }) : null] })) : null, replyTo ? (_jsxs("div", { className: "zds-chat-message__reply", children: [_jsx(Icon, { name: "reply", size: "xsmall" }), _jsx("span", { className: "zds-chat-message__reply-to", children: replyTo }), _jsx("span", { className: "zds-chat-message__reply-text", children: replyText })] })) : null, loading ? _jsx(ChatLoadingIndicator, { label: loadingLabel ?? (assistant ? S.loading : "Typing") }) : (_jsxs("div", { className: "zds-chat-message__content", children: [bubble, attachments ? _jsx("div", { className: "zds-chat-message__attachments", children: attachments }) : null] })), reactions && !assistant && !loading ? _jsx("div", { className: "zds-chat-message__reactions", children: reactions }) : null, footer && !assistant && !loading ? (_jsxs("div", { className: "zds-chat-message__footer", children: [_jsx(Icon, { name: "check-mark", size: "small" }), _jsx("span", { children: footer })] })) : null, assistantControls] }), desktopControls, held ? _jsx("div", { className: "zds-chat-message__held-reactions", children: reactionRow }) : null] }));
    return (_jsxs(RoundedContext.Provider, { value: rounded, children: [body, thread ? (_jsx("div", { className: "zds-chat-message__thread", "data-style": chatStyle, "data-role": role, children: thread })) : null, held && typeof document !== "undefined"
                ? createPortal(_jsx("div", { className: "zds-chat-message__scrim", onPointerDown: release, children: _jsx(Scrim, {}) }), portalContainer ?? document.body)
                : null, held && menu ? (_jsx(Menu.Root, { open: true, onOpenChange: (o) => { if (!o)
                    release(); }, children: _jsx(Menu.Portal, { container: portalContainer ?? undefined, children: _jsx(Menu.Positioner, { className: "zds-chat-message__held-positioner", anchor: root, side: "bottom", align: ownBubble ? "end" : "start", sideOffset: spaceOffset, collisionAvoidance: { side: "none" }, children: _jsx(DropdownMenu, { rounded: rounded, compact: true, className: "zds-chat-message__held-menu", children: menu }) }) }) })) : null] }));
});
