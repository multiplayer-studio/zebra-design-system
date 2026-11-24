import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Avatar } from "../avatar/Avatar.js";
import { AssistChip } from "../assist-chip/AssistChip.js";
import { BadgeLabel } from "../badge-label/BadgeLabel.js";
import { Button } from "../button/Button.js";
import { Card } from "../card/Card.js";
import { CardHeading } from "../card-heading/CardHeading.js";
import { CardBody } from "../card-body/CardBody.js";
import { CardFooter } from "../card-footer/CardFooter.js";
import { Divider } from "../divider/Divider.js";
import { Dialog } from "../dialog/Dialog.js";
import { Dropdown } from "../dropdown/Dropdown.js";
import { FilterChip } from "../filter-chip/FilterChip.js";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Input } from "../input/Input.js";
import { MenuItem } from "../menu-item/MenuItem.js";
import { ProgressBar } from "../progress-bar/ProgressBar.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import "./chat.css";
/** The reactions on offer in the picker. */
export const CHAT_REACTIONS = [
    { icon: "like", label: "Like" },
    { icon: "happy", label: "Happy" },
    { icon: "check-circle", label: "Done" },
    { icon: "star", label: "Star" },
    { icon: "bad-mood", label: "Sad" },
];
const ChatShapeContext = React.createContext("rounded");
const ChatFillContext = React.createContext("light");
const ChatOwnStyleContext = React.createContext("bubble");
/** True inside a card: text there is card body copy, not another bubble. */
const ChatInCardContext = React.createContext(false);
/** The shape the nearest thread or message has set; nested components follow it. */
export const useChatShape = () => React.useContext(ChatShapeContext);
const btnShape = (s) => (s === "sharp" ? "sharp" : "rounded");
const glyphStyle = (s) => (s === "sharp" ? "sharp" : "rounded");
const cx = (...c) => c.filter(Boolean).join(" ");
/** True when white text reads better than black on this computed colour (relative luminance below ~0.18). */
const isDark = (color) => {
    const [r, g, b] = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map((v) => {
        const c = Number(v) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return r === undefined ? true : 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.179;
};
/* ---- bubble surface and progress dots ----------------------------------- */
/**
 * The bubble: the one surface a message paints. Text, voice notes, the edit
 * field and typing sit on it; files, images, video and cards are their own
 * card surfaces beside it, so nothing is framed twice. A solid bubble takes
 * the theme that matches its fill, decided from the painted colour, so its
 * text and every component inside read against it.
 */
function ChatBubble({ className, children, ...rest }) {
    const fill = React.useContext(ChatFillContext);
    const ref = React.useRef(null);
    const [inverse, setInverse] = React.useState("mode-dark");
    React.useLayoutEffect(() => {
        if (fill !== "solid" || !ref.current)
            return;
        setInverse(isDark(getComputedStyle(ref.current).backgroundColor) ? "mode-dark" : "mode-light");
    });
    return _jsx("div", { ref: ref, ...rest, className: cx("zds-chat-bubble", fill === "solid" && inverse, className), children: children });
}
/** Three dots that pulse in turn: typing, thinking and writing. Quiet where a spinner shouts. */
function ChatDots() {
    return _jsxs("span", { className: "zds-chat-dots", "aria-hidden": "true", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] });
}
/** The status line: dots, then a label with a highlight sweeping across it. */
function ChatProgress({ label }) {
    return _jsxs("span", { className: "zds-chat-progress", role: "status", children: [_jsx(ChatDots, {}), _jsx("span", { className: "zds-chat-progress__label", children: label })] });
}
/**
 * One message in a conversation. Its content is any mix of the Chat blocks —
 * `ChatText`, `ChatFile`, `ChatImages`, `ChatCard`, `ChatAudio`,
 * `ChatVideo`, `ChatChoices`, `ChatSources` — stacked in the bubble.
 *
 * An `article` named by sender and time. Actions live in a `toolbar` that
 * appears on hover and on keyboard focus anywhere inside the message, so it
 * is reachable without a pointer.
 */
export const ChatMessage = React.forwardRef(function ChatMessage({ role = "other", author, time, position = "single", header, avatar, footer, fill: fillProp = "light", ownStyle: ownStyleProp, shape: shapeProp, status, receipts = true, onRetry, edited, replyTo, reactions, onReact, actions, thinking, streaming, editableText, onEdit, actionsVisible, actionsPosition, className, children, ...rest }, ref) {
    const inherited = useChatShape();
    const shape = shapeProp ?? inherited;
    const inheritedOwnStyle = React.useContext(ChatOwnStyleContext);
    // Plain is text on the page: everyone else's messages, and yours in a channel.
    const plain = role !== "me" || (ownStyleProp ?? inheritedOwnStyle) === "plain";
    // Conversation or channel, for the row's data-style.
    const channel = (role === "me" ? ownStyleProp ?? inheritedOwnStyle : inheritedOwnStyle) === "plain";
    const fill = plain ? "light" : fillProp;
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(editableText ?? "");
    const [picking, setPicking] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);
    // Touch has no hover: a long press reveals the bar, a tap elsewhere hides it.
    const [held, setHeld] = React.useState(false);
    const own = React.useRef(null);
    const press = React.useRef(undefined);
    const setRef = (node) => {
        own.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    };
    const cancelPress = () => { window.clearTimeout(press.current); press.current = undefined; };
    React.useEffect(() => {
        if (!held)
            return;
        const away = (e) => { if (!own.current?.contains(e.target))
            setHeld(false); };
        document.addEventListener("pointerdown", away);
        return () => document.removeEventListener("pointerdown", away);
    }, [held]);
    React.useEffect(() => cancelPress, []);
    const placement = actionsPosition ?? (role === "assistant" ? "below" : "float");
    const leads = position === "single" || position === "first";
    const ends = position === "single" || position === "last";
    const showHeader = header === undefined ? leads && plain : header !== false;
    const showAvatar = avatar ?? plain;
    // A thinking row is only its status line (Figma's loading state has no footer).
    const showFooter = !thinking && (footer === undefined ? ends : footer !== false);
    const failed = status === "failed";
    const name = author?.name ?? (role === "me" ? "You" : role === "assistant" ? "Assistant" : "");
    let allActions = [...(actions ?? [])];
    if (onReact)
        allActions.unshift({ id: "react", icon: "happy", label: "React", pressed: picking, onSelect: () => setPicking((p) => !p) });
    if (onEdit && editableText !== undefined) {
        const startEdit = () => { setDraft(editableText); setEditing(true); };
        const inMenu = allActions.some((a) => a.menu?.some((m) => m.id === "edit"));
        const i = allActions.findIndex((a) => a.id === "edit");
        // Edit sits in the More menu (Figma); it opens the inline editor wherever it is.
        if (inMenu)
            allActions = allActions.map((a) => a.menu ? { ...a, menu: a.menu.map((m) => m.id === "edit" ? { ...m, onSelect: startEdit } : m) } : a);
        else if (i >= 0)
            allActions[i] = { ...allActions[i], onSelect: startEdit };
        else {
            const more = allActions.findIndex((x) => x.menu);
            if (more >= 0)
                allActions[more] = { ...allActions[more], menu: [{ id: "edit", icon: "edit", label: "Edit", onSelect: startEdit }, ...allActions[more].menu] };
            else
                allActions.push({ id: "edit", icon: "edit", label: "Edit", onSelect: startEdit });
        }
    }
    const toolbar = allActions.length && !editing && !thinking ? (_jsx("div", { className: "zds-chat-message__toolbar", role: "toolbar", "aria-label": "Message actions", children: allActions.map((a) => _jsx(ChatActionButton, { action: a, shape: shape, onOpenChange: setMenuOpen }, a.id)) })) : null;
    const longPress = toolbar && placement === "float" ? {
        onPointerDown: (e) => {
            rest.onPointerDown?.(e);
            if (e.pointerType === "mouse")
                return;
            cancelPress();
            press.current = window.setTimeout(() => setHeld(true), 500);
        },
        onPointerUp: (e) => { rest.onPointerUp?.(e); cancelPress(); },
        onPointerMove: (e) => { rest.onPointerMove?.(e); if (e.pointerType !== "mouse" && (Math.abs(e.movementX) > 4 || Math.abs(e.movementY) > 4))
            cancelPress(); },
        onPointerCancel: (e) => { rest.onPointerCancel?.(e); cancelPress(); },
        // The long press opens the bar, not the browser's own menu.
        onContextMenu: (e) => { rest.onContextMenu?.(e); if (held || press.current !== undefined)
            e.preventDefault(); },
    } : {};
    const label = [author?.name ?? (role === "me" ? "You" : role === "assistant" ? "Assistant" : "Message"), time].filter(Boolean).join(", ");
    return (_jsx(ChatShapeContext.Provider, { value: shape, children: _jsx(ChatFillContext.Provider, { value: fill, children: _jsxs("article", { ref: setRef, ...rest, ...longPress, "aria-label": label, "aria-busy": thinking || streaming ? true : undefined, className: cx("zds-chat-message", className), "data-role": role, "data-side": plain ? "start" : "end", "data-plain": plain ? "" : undefined, "data-style": channel ? "channel" : "conversation", "data-position": position, "data-shape": shape, "data-fill": fill, "data-status": status, "data-avatar": showAvatar ? "" : undefined, "data-actions-visible": actionsVisible || picking || menuOpen || held ? "" : undefined, "data-actions": placement, children: [showAvatar ? (_jsx("div", { className: "zds-chat-message__gutter", "aria-hidden": "true", children: leads ? (role === "assistant" && !author?.src
                            ? _jsx(Avatar, { size: "xsmall", type: "icon", icon: "ai-stars", showClose: false, showStatus: false, showRing: false })
                            : author?.src || name
                                ? _jsx(Avatar, { size: "xsmall", type: author?.src ? "photo" : "initials", src: author?.src, swatchColor: author?.swatch ?? (role === "me" ? "orange" : "sea"), initials: author?.initials ?? name.split(/\s+/).map((w) => w[0]).slice(0, 2).join(""), showClose: false, showStatus: false, showRing: false })
                                : _jsx(Avatar, { size: "xsmall", type: "icon", icon: "person", swatchColor: author?.swatch ?? (role === "me" ? "orange" : "sea"), showClose: false, showStatus: false, showRing: false })) : null })) : null, _jsxs("div", { className: "zds-chat-message__main", children: [showHeader ? (_jsxs("div", { className: "zds-chat-message__header", children: [_jsx("span", { className: "zds-chat-message__name", children: header === true || header === undefined ? name : header }), time ? _jsx("time", { children: time }) : null] })) : null, _jsxs("div", { className: "zds-chat-message__blocks", children: [replyTo ? (_jsxs("div", { className: "zds-chat-message__quote", children: [_jsx(Icon, { name: "reply", size: "xsmall", iconStyle: glyphStyle(shape) }), _jsx("span", { className: "zds-chat-message__quote-author", children: replyTo.author }), _jsx("span", { className: "zds-chat-message__quote-text", children: replyTo.text })] })) : null, editing ? (_jsx(ChatBubble, { children: _jsxs("form", { className: "zds-chat-message__edit", onSubmit: (e) => { e.preventDefault(); onEdit?.(draft.trim()); setEditing(false); }, children: [_jsx(Input, { "aria-label": "Edit message", block: true, shape: btnShape(shape), value: draft, autoFocus: true, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => { if (e.key === "Escape")
                                                        setEditing(false); } }), _jsxs("div", { className: "zds-chat-message__edit-actions", children: [_jsx(Button, { flavour: "text", size: "small", shape: btnShape(shape), type: "button", onClick: () => setEditing(false), children: "Cancel" }), _jsx(Button, { flavour: "primary", size: "small", shape: btnShape(shape), type: "submit", disabled: !draft.trim(), children: "Save" })] })] }) })) : thinking ? (
                                    // A status line, not a message: the label names the step.
                                    _jsx(ChatProgress, { label: typeof thinking === "string" ? thinking : "Thinking" })) : (_jsxs(_Fragment, { children: [children, streaming ? _jsxs("span", { className: "zds-chat-progress", role: "status", children: [_jsx(ChatDots, {}), _jsx("span", { className: "zds-chat-sr", children: "Writing" })] }) : null] }))] }), picking && onReact ? (_jsx("div", { className: "zds-chat-message__picker", role: "group", "aria-label": "Add a reaction", children: CHAT_REACTIONS.map((r) => (_jsx(IconButton, { flavour: "text", size: "small", shape: btnShape(shape), icon: r.icon, label: r.label, onClick: () => { onReact(r.icon); setPicking(false); } }, r.icon))) })) : null, reactions?.length ? (_jsx("div", { className: "zds-chat-message__reactions", children: reactions.map((r) => (
                                // Assist Chips: a glyph and a count, blue when one of them is yours. Selecting toggles yours.
                                _jsx(AssistChip, { shape: shape, icon: r.icon, showLeadingIcon: !r.text, discardable: false, color: r.mine ? "blue" : "neutral", disabled: !onReact, "aria-pressed": !!r.mine, "aria-label": `${r.text ?? r.label}, ${r.count}${r.mine ? ", including you" : ""}`, onClick: () => onReact?.(r.icon), children: r.text ? `${r.text} ${r.count}` : r.count }, r.icon))) })) : null, toolbar && placement === "below" ? toolbar : null, failed ? (_jsxs("div", { className: "zds-chat-message__failed", role: "alert", children: [_jsx(Icon, { name: "error", size: "small", iconStyle: glyphStyle(shape) }), _jsx("span", { children: "Not sent." }), onRetry ? _jsx(Button, { flavour: "text", size: "small", shape: btnShape(shape), onClick: onRetry, children: "Try again" }) : null] })) : showFooter && (time || edited || status || (footer !== true && footer)) ? (
                            // Figma's footer: the time (again, under a header), the status glyph, then the receipt words.
                            _jsxs("div", { className: "zds-chat-message__meta", children: [edited ? _jsx("span", { children: "Edited" }) : null, time ? _jsx("time", { children: time }) : null, role === "me" && status ? _jsx(ChatStatusMark, { status: status, shape: shape }) : null, footer !== true && footer ? _jsx("span", { children: footer }) : role === "me" && status && receipts ? _jsx("span", { children: STATUS_TEXT[status] }) : null] })) : null] }), toolbar && placement !== "below" ? toolbar : null] }) }) }));
});
function ChatActionButton({ action, shape, onOpenChange }) {
    const button = (_jsx(IconButton, { flavour: "text", size: "small", shape: btnShape(shape), icon: action.icon, label: action.label, "aria-pressed": action.pressed === undefined || action.menu ? undefined : action.pressed, "data-pressed": action.pressed ? "" : undefined, onClick: action.menu ? undefined : action.onSelect }));
    if (action.menu) {
        return (_jsx(Dropdown, { rounded: shape === "rounded", position: "bottom", align: "right", trigger: button, onOpenChange: (open) => onOpenChange(open), children: action.menu.map((m) => _jsx(MenuItem, { leadingIcon: m.icon, onClick: m.onSelect, "data-chat-tone": m.tone, children: m.label }, m.id)) }));
    }
    return _jsx(Tooltip, { point: "bottom", shape: shape, trigger: button, children: action.label });
}
const STATUS_TEXT = {
    sending: "Sending", sent: "Sent", delivered: "Delivered", read: "Seen", failed: "Not sent",
};
/** The status glyph; the words beside it carry the meaning, so it is hidden from assistive tech. */
function ChatStatusMark({ status, shape }) {
    const icons = {
        sending: "clock", sent: "check-mark", delivered: "check-circle-outline", read: "check-circle", failed: "error",
    };
    const icon = icons[status];
    return (_jsx("span", { className: "zds-chat-message__status", "aria-hidden": "true", children: _jsx(Icon, { name: icon, size: "small", iconStyle: glyphStyle(shape) }) }));
}
/** The bar's buttons, then a More menu when it has anything in it. */
const more = (bar, menu) => {
    const items = menu.filter(Boolean);
    return [...bar.filter(Boolean), ...(items.length ? [{ id: "more", icon: "more-horizontal", label: "More", menu: items }] : [])];
};
/** Ready-made action sets. Pass handlers for the ones you support; the rest are left out. */
export const chatActions = {
    /** Someone else's message: reply, then More with copy text and mark as unread. React comes from `onReact`. */
    forOther: (h) => more([
        h.onReply && { id: "reply", icon: "reply", label: "Reply", onSelect: h.onReply },
    ], [
        h.onCopy && { id: "copy", icon: "copy-file", label: "Copy text", onSelect: h.onCopy },
        h.onMarkUnread && { id: "unread", icon: "chat-message-unread", label: "Mark as unread", onSelect: h.onMarkUnread },
    ]),
    /** An image, file or audio message: the save action named for what it saves, then reply, delete and more. */
    forAttachment: (kind, h) => [
        h.onDownload && { id: "download", icon: (kind === "audio" ? "save" : "download"), label: kind === "image" ? "Download image" : kind === "file" ? "Download file" : "Save audio", onSelect: h.onDownload },
        h.onReply && { id: "reply", icon: "reply", label: "Reply", onSelect: h.onReply },
        h.onDelete && { id: "delete", icon: "delete", label: "Delete", onSelect: h.onDelete },
        h.onMore && { id: "more", icon: "more-horizontal", label: "More options", onSelect: h.onMore },
    ].filter(Boolean),
    /** Your message: reply, then More with edit, copy text and delete. React comes from `onReact`. */
    forMine: (h) => more([
        h.onReply && { id: "reply", icon: "reply", label: "Reply", onSelect: h.onReply },
    ], [
        h.onEdit && { id: "edit", icon: "edit", label: "Edit", onSelect: h.onEdit },
        h.onCopy && { id: "copy", icon: "copy-file", label: "Copy text", onSelect: h.onCopy },
        h.onForward && { id: "forward", icon: "forward", label: "Forward", onSelect: h.onForward },
        h.onPin && { id: "pin", icon: "pin", label: "Pin", onSelect: h.onPin },
        h.onDelete && { id: "delete", icon: "delete-outline", label: "Delete", onSelect: h.onDelete, tone: "danger" },
    ]),
    /** Copy, reply, rate and regenerate stay in view; reading aloud and the Improve rewrites wait under More. */
    forAssistant: (h) => {
        const more = [
            h.onSpeak && { id: "speak", icon: "volume-up", label: "Read aloud", onSelect: h.onSpeak },
            ...(h.onImprove ? [
                { id: "shorter", label: "Make it shorter", onSelect: () => h.onImprove("shorter") },
                { id: "longer", label: "Add more detail", onSelect: () => h.onImprove("longer") },
                { id: "simpler", label: "Simplify the language", onSelect: () => h.onImprove("simpler") },
            ] : []),
        ].filter(Boolean);
        return [
            h.onCopy && { id: "copy", icon: "copy-file", label: "Copy", onSelect: h.onCopy },
            h.onReply && { id: "reply", icon: "reply", label: "Reply", onSelect: h.onReply },
            h.onLike && { id: "like", icon: "like", label: "Good response", pressed: h.liked === "like", onSelect: h.onLike },
            h.onDislike && { id: "dislike", icon: "dislike", label: "Bad response", pressed: h.liked === "dislike", onSelect: h.onDislike },
            h.onRegenerate && { id: "regenerate", icon: "refresh", label: "Regenerate", onSelect: h.onRegenerate },
            more.length && { id: "more", icon: "more-horizontal", label: "More", menu: more },
        ].filter(Boolean);
    },
};
/* ---- content blocks ------------------------------------------------------ */
/** Plain text. Line breaks in the string are kept. */
export function ChatText({ children }) {
    const p = _jsx("p", { className: "zds-chat-text", children: children });
    return React.useContext(ChatInCardContext) ? p : _jsx(ChatBubble, { children: p });
}
/** A person named in the text, set in the medium weight. */
export function ChatMention({ children }) {
    return _jsxs("span", { className: "zds-chat-mention", children: ["@", children] });
}
const FILE_ICON = {
    pdf: "document", sheet: "document", doc: "document", image: "image", video: "video", audio: "audio", archive: "attachment", other: "attachment",
};
export const fileKindOf = (name) => {
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    if (ext === "pdf")
        return "pdf";
    if (["xls", "xlsx", "csv", "numbers", "ods"].includes(ext))
        return "sheet";
    if (["doc", "docx", "txt", "rtf", "pages", "odt", "md"].includes(ext))
        return "doc";
    if (["png", "jpg", "jpeg", "gif", "webp", "heic", "svg"].includes(ext))
        return "image";
    if (["mp4", "mov", "webm", "mkv"].includes(ext))
        return "video";
    if (["mp3", "wav", "m4a", "ogg"].includes(ext))
        return "audio";
    if (["zip", "rar", "7z", "tar", "gz"].includes(ext))
        return "archive";
    return "other";
};
/** A file attachment on a card tile: the type's glyph, the name, size, and open / download controls. */
export function ChatFile({ name, meta, kind, progress, transfer = "upload", onOpen, onDownload }) {
    const shape = useChatShape();
    const uploading = progress !== undefined && progress < 100;
    const downloaded = transfer === "download" && progress !== undefined && progress >= 100;
    return (_jsxs("div", { className: "zds-chat-file", children: [_jsx("span", { className: "zds-chat-file__tile", "aria-hidden": "true", children: _jsx(Icon, { name: FILE_ICON[kind ?? fileKindOf(name)], size: "medium", iconStyle: glyphStyle(shape) }) }), _jsxs("span", { className: "zds-chat-file__body", children: [_jsx("span", { className: "zds-chat-file__name", children: name }), uploading && transfer === "download" ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "zds-chat-file__meta zds-chat-file__progress", "aria-hidden": "true", children: [_jsx("span", { children: "Downloading\u2026" }), _jsxs("span", { children: [Math.round(progress), "%"] })] }), _jsx(ProgressBar, { value: progress, shape: shape, label: `Downloading ${name}`, showLabel: false, size: "small" })] })) : uploading ? _jsx(ProgressBar, { value: progress, shape: shape, label: `Uploading ${name}`, showLabel: false, size: "small" })
                        : _jsx("span", { className: "zds-chat-file__meta", children: downloaded ? _jsxs("span", { role: "status", children: [meta ? `${meta} · ` : "", "Download complete"] }) : meta })] }), onOpen && !uploading ? _jsx(IconButton, { flavour: "text", size: "small", shape: btnShape(shape), icon: "open-in-new-window", label: `Open ${name}`, onClick: onOpen }) : null, onDownload && !uploading ? _jsx(IconButton, { flavour: "text", size: "small", shape: btnShape(shape), icon: "download", label: `Download ${name}`, onClick: onDownload }) : null] }));
}
function ChatPicture({ image, shape }) {
    return image?.src
        ? _jsx("img", { src: image.src, alt: "", loading: "lazy" })
        : _jsx("span", { className: "zds-chat-placeholder", children: _jsx(Icon, { name: "image", size: "medium", iconStyle: glyphStyle(shape) }) });
}
/**
 * Photos sent together: one alone, two side by side, three as one large and
 * two stacked. Past three, the last shows a count of the rest. Every photo is
 * its own control when `onOpen` is set, so any of them opens the viewer.
 */
export function ChatImages({ images, onOpen, noun = "photos" }) {
    const shape = useChatShape();
    if (!images.length)
        return null;
    const shown = images.slice(0, 3);
    const more = images.length - shown.length;
    const label = images.length > 1 ? `${images.length} ${noun}` : undefined;
    return (_jsx("figure", { className: "zds-chat-images", "data-count": shown.length, "aria-label": label, children: shown.map((image, index) => {
            const count = more && index === shown.length - 1 ? _jsx("span", { className: "zds-chat-chip", "aria-hidden": "true", children: `+${more}` }) : null;
            return onOpen ? (_jsxs("button", { type: "button", className: "zds-chat-images__photo", "aria-label": `Open ${image.alt}`, onClick: () => onOpen(index), children: [_jsx(ChatPicture, { image: image, shape: shape }), count] }, index)) : (_jsxs("span", { className: "zds-chat-images__photo", role: "img", "aria-label": image.alt, children: [_jsx(ChatPicture, { image: image, shape: shape }), count] }, index));
        }) }));
}
/** A full-size view of a message's images in a library Dialog, paging between them. */
export function ChatImageViewer({ images, index, onIndexChange, onClose }) {
    const shape = useChatShape();
    const image = index === null ? undefined : images[index];
    return (_jsx(Dialog, { open: index !== null, onOpenChange: (open) => { if (!open)
            onClose(); }, shape: shape, showFooter: false, heading: images.length > 1 && index !== null ? `${index + 1} of ${images.length}` : "Photo", className: "zds-chat-viewer", children: image ? (_jsxs("div", { className: "zds-chat-viewer__stage", children: [_jsx("span", { className: "zds-chat-viewer__image", role: "img", "aria-label": image.alt, children: _jsx(ChatPicture, { image: image, shape: shape }) }), images.length > 1 ? (_jsxs("div", { className: "zds-chat-viewer__nav", children: [_jsx(IconButton, { flavour: "subtle", size: "small", shape: btnShape(shape), icon: "chevron-left", label: "Previous photo", disabled: index === 0, onClick: () => onIndexChange?.(index - 1) }), _jsx(IconButton, { flavour: "subtle", size: "small", shape: btnShape(shape), icon: "chevron-right", label: "Next photo", disabled: index === images.length - 1, onClick: () => onIndexChange?.(index + 1) })] })) : null] })) : null }));
}
/** A structured result — a booking, an order, a task — on the library Card. */
export function ChatCard({ heading, subheading, media, trailing, children, actions }) {
    const shape = useChatShape();
    return (_jsxs(Card, { className: "zds-chat-card", shape: shape, hasFooter: !!actions?.length, header: _jsx(CardHeading, { heading: heading, subheading: subheading, trailingContent: trailing }), footer: actions?.length ? (_jsx(CardFooter, { className: "zds-chat-card__actions", children: actions.map((a, i) => _jsx(Button, { size: "small", shape: btnShape(shape), flavour: i === 0 ? "outline" : "text", leadingIcon: a.icon, onClick: a.onClick, children: a.label }, a.label)) })) : undefined, children: [media ? _jsx("span", { className: "zds-chat-card__media", role: "img", "aria-label": media.alt, children: _jsx(ChatPicture, { image: media, shape: shape }) }) : null, children ? _jsx(CardBody, { children: _jsx(ChatInCardContext.Provider, { value: true, children: children }) }) : null] }));
}
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
/** A voice note or audio file: play / pause, a waveform that fills as it plays, and the time. */
export function ChatAudio({ src, duration, peaks, label = "Voice message" }) {
    const shape = useChatShape();
    const audio = React.useRef(null);
    const [playing, setPlaying] = React.useState(false);
    const [at, setAt] = React.useState(0);
    const bars = peaks ?? Array.from({ length: 18 }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));
    const progress = duration ? at / duration : 0;
    return (_jsxs("div", { className: "zds-chat-audio", role: "group", "aria-label": label, children: [_jsx(IconButton, { className: "zds-chat-audio__play", flavour: "text", size: "small", shape: shape === "sharp" ? "sharp" : "full", icon: playing ? "pause" : "play", label: playing ? "Pause" : `Play ${label.toLowerCase()}`, onClick: () => { const a = audio.current; if (!a)
                    return; if (a.paused)
                    void a.play();
                else
                    a.pause(); } }), _jsx("div", { className: "zds-chat-audio__wave", "aria-hidden": "true", children: bars.map((p, i) => _jsx("span", { style: { blockSize: `${Math.round(p * 100)}%` }, "data-played": i / bars.length < progress ? "" : undefined }, i)) }), _jsx("span", { className: "zds-chat-audio__time", children: clock(playing || at ? at : duration) }), _jsx("audio", { ref: audio, src: src, preload: "metadata", onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onEnded: () => { setPlaying(false); setAt(0); }, onTimeUpdate: (e) => setAt(e.currentTarget.currentTime) })] }));
}
/** A video: the poster (or the placeholder tile) with a play control and duration, then the native player once started. */
export function ChatVideo({ src, poster, duration, label = "Video" }) {
    const shape = useChatShape();
    const [started, setStarted] = React.useState(false);
    return (_jsx("div", { className: "zds-chat-video", children: started ? (_jsx("video", { src: src, poster: poster, controls: true, autoPlay: true, "aria-label": label })) : (_jsxs("div", { className: "zds-chat-video__poster", children: [poster ? _jsx("img", { src: poster, alt: "" }) : _jsx("span", { className: "zds-chat-placeholder", children: _jsx(Icon, { name: "video", size: "medium", iconStyle: glyphStyle(shape) }) }), _jsx("span", { className: "zds-chat-video__play", children: _jsx(IconButton, { flavour: "text", shape: shape === "sharp" ? "sharp" : "full", size: "large", icon: "play", label: `Play ${label}${duration ? `, ${clock(duration)}` : ""}`, onClick: () => setStarted(true) }) }), duration ? _jsx("span", { className: "zds-chat-video__duration zds-chat-chip", "aria-hidden": "true", children: clock(duration) }) : null] })) }));
}
/**
 * An interactive response: quick replies (pick one and it is sent) or a
 * multiple choice with a confirm. Once answered it locks and shows the answer,
 * so the thread keeps a record of what was chosen.
 */
export function ChatChoices({ prompt, choices, multiple, answer, onAnswer, confirmLabel = "Confirm" }) {
    const shape = useChatShape();
    const [picked, setPicked] = React.useState([]);
    if (answer) {
        // Answered: a quiet record of the choice, not a row of dead chips.
        const chosen = choices.filter((c) => answer.includes(c.value)).map((c) => c.label).join(", ");
        return (_jsxs("div", { className: "zds-chat-choices", "data-locked": "", children: [prompt ? _jsx("div", { className: "zds-chat-choices__prompt", children: prompt }) : null, _jsxs("div", { className: "zds-chat-choices__answer", children: [_jsx(Icon, { name: "check-mark", size: "small", iconStyle: glyphStyle(shape) }), chosen] })] }));
    }
    return (_jsxs("div", { className: "zds-chat-choices", role: "group", "aria-label": prompt ?? "Choose a reply", children: [prompt ? _jsx("div", { className: "zds-chat-choices__prompt", children: prompt }) : null, _jsx("div", { className: "zds-chat-choices__list", children: choices.map((c) => multiple ? (_jsx(FilterChip, { shape: shape, active: picked.includes(c.value), onActiveChange: (on) => setPicked((p) => on ? [...p, c.value] : p.filter((v) => v !== c.value)), children: c.label }, c.value)) : (
                // Quick replies: picking one sends it.
                _jsx(AssistChip, { shape: shape, icon: c.icon, showLeadingIcon: !!c.icon, discardable: false, onClick: () => onAnswer?.([c.value]), children: c.label }, c.value))) }), multiple && picked.length ? (_jsx(Button, { size: "small", shape: btnShape(shape), flavour: "primary", onClick: () => onAnswer?.(picked), children: `${confirmLabel} (${picked.length})` })) : null] }));
}
/** Where an AI answer came from: numbered sources as link chips. */
export function ChatSources({ sources }) {
    const shape = useChatShape();
    return (_jsxs("div", { className: "zds-chat-sources", role: "group", "aria-label": "Sources", children: [_jsx("span", { className: "zds-chat-sources__label", children: "Sources" }), sources.map((s, i) => (_jsx(AssistChip, { shape: shape, icon: "link", showLeadingIcon: true, onClick: s.onOpen ?? (s.href ? () => window.open(s.href, "_blank", "noopener") : undefined), children: `${i + 1}. ${s.title}` }, s.title)))] }));
}
/* ---- conversation header -------------------------------------------------- */
/** Who the conversation is with: avatar, name, presence in words, and actions at the end. */
export function ChatHeader({ author, presence, online, actions }) {
    const initials = author.initials ?? author.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
    return (_jsxs("header", { className: "zds-chat-header", children: [_jsx(Avatar, { size: "small", type: author.src ? "photo" : "initials", src: author.src, initials: initials, showClose: false, showRing: false, showStatus: !!online, status: "available", statusLabel: online ? "Online" : undefined }), _jsxs("div", { className: "zds-chat-header__text", children: [_jsx("span", { className: "zds-chat-header__name", children: author.name }), presence ? _jsx("span", { className: "zds-chat-header__presence", children: presence }) : null] }), actions ? _jsx("div", { className: "zds-chat-header__actions", children: actions }) : null] }));
}
/* ---- thread helpers ------------------------------------------------------ */
/** Someone is typing. Sits where their next message will appear. */
export function ChatTyping({ author, role = "other" }) {
    return _jsx(ChatMessage, { role: role, author: author, thinking: author ? `${author.name} is typing` : "Typing" });
}
/** A day break, an unread marker, or a system note (a Label badge) across the thread. */
export function ChatDivider({ children, tone = "neutral" }) {
    const shape = useChatShape();
    if (tone === "system") {
        return _jsx("div", { className: "zds-chat-divider", "data-tone": "system", role: "note", children: _jsx(BadgeLabel, { variant: "neutral", bold: false, shape: btnShape(shape), children: children }) });
    }
    return (_jsxs("div", { className: "zds-chat-divider", "data-tone": tone, children: [_jsx(Divider, {}), _jsx("span", { children: children }), _jsx(Divider, {})] }));
}
/** The scrolling column of messages. */
export const ChatThread = React.forwardRef(function ChatThread({ shape = "rounded", ownStyle = "bubble", className, ...rest }, ref) {
    return (_jsx(ChatShapeContext.Provider, { value: shape, children: _jsx(ChatOwnStyleContext.Provider, { value: ownStyle, children: _jsx("div", { ref: ref, role: "log", "aria-live": "polite", ...rest, className: cx("zds-chat-thread", className), "data-shape": shape }) }) }));
});
