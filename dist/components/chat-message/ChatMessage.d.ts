import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./chat-message.css";
export type ChatPlatform = "mobile" | "desktop";
export type ChatStyle = "conversation" | "channel";
export type ChatRole = "receiver" | "sender" | "assistant";
export type ChatState = "default" | "active" | "loading";
export type ChatSequence = "first" | "consecutive";
export type ChatBubbleStatus = "single" | "first" | "middle" | "last";
/** Every string the message shows or announces. `{count}` and `{name}` are filled in. */
export declare const chatMessageStrings: {
    react: string;
    replyAction: string;
    more: string;
    reply: string;
    replies: string;
    threadToggle: string;
    loading: string;
    moreReactions: string;
    download: string;
    play: string;
    pause: string;
};
export type ChatMessageStrings = typeof chatMessageStrings;
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
export declare function ChatBubble({ bubbleStyle, status, role, rounded, children, className }: ChatBubbleProps): React.JSX.Element;
/** The send time, formatted by the product. body/xsmall on foreground/secondary. */
export declare function ChatTimestamp({ children, dateTime, className }: {
    children?: React.ReactNode;
    dateTime?: string;
    className?: string;
}): React.JSX.Element;
/** Three pulsing dots and a short present-tense label: Thinking, Typing. Stops under reduced motion. */
export declare function ChatLoadingIndicator({ label, rounded, className }: {
    label?: string;
    rounded?: boolean;
    className?: string;
}): React.JSX.Element;
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
export declare function ChatControls({ controlsStyle, rounded, showReact, showMore, reactOpen, moreOpen, onReact, onMore, children, renderMore, strings, className }: ChatControlsProps): React.JSX.Element;
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
export declare function ChatThread({ replyCount, open: openProp, defaultOpen, onOpenChange, children, strings, className }: ChatThreadProps): React.JSX.Element;
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
export declare function ChatPhotos({ photos, showIcon, rounded, onOpen, alt, className }: ChatPhotosProps): React.JSX.Element;
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
/**
 * A file tile with a download control, a video preview, or an audio
 * waveform, in a message's Attachment Slot. Send each video as its own
 * attachment so it can preview. Playback is real when `src` is set.
 *
 * Spec issue followed as intended: a playing video keeps a pause control.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export declare function ChatAttachment({ type, fileName, fileMeta, duration, src, poster, showIcon, playing: playingProp, rounded, onDownload, strings, className }: ChatAttachmentProps): React.JSX.Element;
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
    avatar?: {
        src?: string;
        initials?: string;
        icon?: IconName;
    };
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
export declare const ChatMessage: React.ForwardRefExoticComponent<ChatMessageProps & React.RefAttributes<HTMLDivElement>>;
