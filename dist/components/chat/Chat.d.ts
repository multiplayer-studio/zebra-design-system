import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./chat.css";
export type ChatRole = "me" | "other" | "assistant";
export type ChatPosition = "single" | "first" | "middle" | "last";
export type ChatStatus = "sending" | "sent" | "delivered" | "read" | "failed";
export type ChatShape = "rounded" | "sharp";
/** `light` tints the bubble; `solid` fills it and flips everything inside to the opposite theme. */
export type ChatFill = "light" | "solid";
/** How your own messages read: `bubble` at the end for a conversation, `plain` at the start like everyone else's for a channel. */
export type ChatOwnStyle = "bubble" | "plain";
export interface ChatAuthor {
    name: string;
    initials?: string;
    src?: string;
}
/** A reaction is a glyph from the icon font, never an emoji. */
export interface ChatReaction {
    icon: IconName;
    label: string;
    count: number;
    /** Words instead of the glyph, e.g. "Looks good". The glyph still keys the reaction. */
    text?: string;
    /** The current user added this one; selecting it again takes it away. */
    mine?: boolean;
}
/** The reactions on offer in the picker. */
export declare const CHAT_REACTIONS: {
    icon: IconName;
    label: string;
}[];
export interface ChatAction {
    id: string;
    icon: IconName;
    label: string;
    /** For toggles such as like / dislike. */
    pressed?: boolean;
    onSelect?: () => void;
    /** Turns the button into a menu of follow-ups, e.g. Improve → Shorter, Longer. */
    menu?: {
        id: string;
        icon?: IconName;
        label: string;
        onSelect?: () => void;
    }[];
}
/** The shape the nearest thread or message has set; nested components follow it. */
export declare const useChatShape: () => ChatShape;
export interface ChatMessageProps extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
    /** Who sent it. `me` is a bubble at the end, unless `ownStyle` is `plain`. `other` and `assistant` are text on the page at the start, with no bubble. */
    role?: ChatRole;
    author?: ChatAuthor;
    /** Sits in the header when there is one, otherwise in the footer. Read by assistive tech on every message. */
    time?: string;
    /** Where the message sits in a run from one sender. Sets the defaults for `header`, `avatar` and `footer`, and which bubble corners tighten. */
    position?: ChatPosition;
    /** Name and time above the bubble. On by default for the first message of a group from someone else. A node replaces the name. */
    header?: boolean | React.ReactNode;
    /** Avatar beside the bubble, on the sender's side. On by default for others and the assistant, off for `me`. Grouped messages keep its space so bubbles line up. */
    avatar?: boolean;
    /** Edited mark, time (when there is no header) and delivery status in words. On by default for the last message of a group. A node replaces the status text. */
    footer?: boolean | React.ReactNode;
    /** `light` (default) or `solid`, for your bubble. Solid fills it and switches everything inside to the opposite theme. */
    fill?: ChatFill;
    /** `bubble` or `plain`, for your own messages. Defaults to the thread's. */
    ownStyle?: ChatOwnStyle;
    /** Rounded or sharp. Defaults to the thread's; every component inside follows it. */
    shape?: ChatShape;
    /** Delivery state, for `me` only. `failed` shows a retry. */
    status?: ChatStatus;
    onRetry?: () => void;
    edited?: boolean;
    /** Quote of the message this one answers. */
    replyTo?: {
        author: string;
        text: string;
    };
    reactions?: ChatReaction[];
    /** Adds or removes a reaction by its glyph; turns on the reaction picker. */
    onReact?: (icon: IconName) => void;
    /** Controls shown on hover and focus. See `chatActions` for ready-made sets. */
    actions?: ChatAction[];
    /** The assistant is still working: a progress indicator replaces the content. */
    thinking?: boolean | string;
    /** The assistant is still writing: a progress indicator follows the content. */
    streaming?: boolean;
    /** Plain text of the message; with `onEdit`, the Edit action swaps the bubble for a text field. */
    editableText?: string;
    onEdit?: (text: string) => void;
    /** Keep the action toolbar visible instead of on hover and focus only (touch layouts). */
    actionsVisible?: boolean;
    /**
     * `float` (others and you) shows the quick bar on the row's top-end corner on hover;
     * `below` (the assistant) keeps them in a row under it; `menu` folds them
     * into one Message actions control on hover, the quiet form for older
     * messages once a newer one carries the row.
     */
    actionsPosition?: "float" | "below" | "menu";
    className?: string;
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
export declare const ChatMessage: React.ForwardRefExoticComponent<ChatMessageProps & React.RefAttributes<HTMLElement>>;
/** Ready-made action sets. Pass handlers for the ones you support; the rest are left out. */
export declare const chatActions: {
    /** Someone else's message: copy, reply, like and more. */
    forOther: (h: {
        onCopy?: () => void;
        onReply?: () => void;
        liked?: boolean;
        onLike?: () => void;
        onMore?: () => void;
    }) => ChatAction[];
    /** An image, file or audio message: the save action named for what it saves, then reply, delete and more. */
    forAttachment: (kind: "image" | "file" | "audio", h: {
        onDownload?: () => void;
        onReply?: () => void;
        onDelete?: () => void;
        onMore?: () => void;
    }) => ChatAction[];
    forMine: (h: {
        onEdit?: () => void;
        onReply?: () => void;
        onCopy?: () => void;
        onForward?: () => void;
        onPin?: () => void;
        onDelete?: () => void;
    }) => ChatAction[];
    /** Copy, reply, rate and regenerate stay in view; reading aloud and the Improve rewrites wait under More. */
    forAssistant: (h: {
        liked?: "like" | "dislike" | null;
        onLike?: () => void;
        onDislike?: () => void;
        onCopy?: () => void;
        onReply?: () => void;
        onRegenerate?: () => void;
        onImprove?: (how: string) => void;
        onSpeak?: () => void;
    }) => ChatAction[];
};
/** Plain text. Line breaks in the string are kept. */
export declare function ChatText({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export type ChatFileKind = "pdf" | "sheet" | "doc" | "image" | "video" | "audio" | "archive" | "other";
export declare const fileKindOf: (name: string) => ChatFileKind;
export interface ChatFileProps {
    name: string;
    /** e.g. "2.4 MB · PDF". */
    meta?: string;
    kind?: ChatFileKind;
    /** 0–100 while transferring; the controls wait until it is done. */
    progress?: number;
    /** What `progress` measures. A download says so, shows the percentage, then "Download complete". */
    transfer?: "upload" | "download";
    onOpen?: () => void;
    onDownload?: () => void;
}
/** A file attachment on a card tile: the type's glyph, the name, size, and open / download controls. */
export declare function ChatFile({ name, meta, kind, progress, transfer, onOpen, onDownload }: ChatFileProps): React.JSX.Element;
/** An image. Without a `src` it shows the library placeholder: a card tile with the image glyph. */
export interface ChatImage {
    src?: string;
    alt: string;
}
/**
 * Photos sent together: one alone, two side by side, three as one large and
 * two stacked. Past three, the last shows a count of the rest. Every photo is
 * its own control when `onOpen` is set, so any of them opens the viewer.
 */
export declare function ChatImages({ images, onOpen, noun }: {
    images: ChatImage[];
    onOpen?: (index: number) => void;
    noun?: string;
}): React.JSX.Element | null;
/** A full-size view of a message's images in a library Dialog, paging between them. */
export declare function ChatImageViewer({ images, index, onIndexChange, onClose }: {
    images: ChatImage[];
    index: number | null;
    onIndexChange?: (index: number) => void;
    onClose: () => void;
}): React.JSX.Element;
export interface ChatCardProps {
    heading: React.ReactNode;
    subheading?: React.ReactNode;
    media?: ChatImage;
    trailing?: React.ReactNode;
    children?: React.ReactNode;
    /** Buttons along the bottom. The first is outlined, the rest are text, so the card never outshouts the thread. */
    actions?: {
        label: string;
        onClick?: () => void;
        icon?: IconName;
    }[];
}
/** A structured result — a booking, an order, a task — on the library Card. */
export declare function ChatCard({ heading, subheading, media, trailing, children, actions }: ChatCardProps): React.JSX.Element;
/** A voice note or audio file: play / pause, a waveform that fills as it plays, and the time. */
export declare function ChatAudio({ src, duration, peaks, label }: {
    src: string;
    duration: number;
    peaks?: number[];
    label?: string;
}): React.JSX.Element;
/** A video: the poster (or the placeholder tile) with a play control and duration, then the native player once started. */
export declare function ChatVideo({ src, poster, duration, label }: {
    src: string;
    poster?: string;
    duration?: number;
    label?: string;
}): React.JSX.Element;
export interface ChatChoice {
    value: string;
    label: string;
    icon?: IconName;
}
/**
 * An interactive response: quick replies (pick one and it is sent) or a
 * multiple choice with a confirm. Once answered it locks and shows the answer,
 * so the thread keeps a record of what was chosen.
 */
export declare function ChatChoices({ prompt, choices, multiple, answer, onAnswer, confirmLabel }: {
    prompt?: string;
    choices: ChatChoice[];
    multiple?: boolean;
    /** Set once answered; the choices lock. */
    answer?: string[];
    onAnswer?: (values: string[]) => void;
    confirmLabel?: string;
}): React.JSX.Element;
/** Where an AI answer came from: numbered sources as link chips. */
export declare function ChatSources({ sources }: {
    sources: {
        title: string;
        href?: string;
        onOpen?: () => void;
    }[];
}): React.JSX.Element;
/** Who the conversation is with: avatar, name, presence in words, and actions at the end. */
export declare function ChatHeader({ author, presence, online, actions }: {
    author: ChatAuthor;
    /** e.g. "Online", "Last seen 09:12". */
    presence?: string;
    /** Adds the available dot to the avatar. */
    online?: boolean;
    /** Buttons at the trailing edge, e.g. Details. */
    actions?: React.ReactNode;
}): React.JSX.Element;
/** Someone is typing. Sits where their next message will appear. */
export declare function ChatTyping({ author, role }: {
    author?: ChatAuthor;
    role?: Exclude<ChatRole, "me">;
}): React.JSX.Element;
/** A day break, an unread marker, or a system note (a Label badge) across the thread. */
export declare function ChatDivider({ children, tone }: {
    children: React.ReactNode;
    tone?: "neutral" | "unread" | "system";
}): React.JSX.Element;
export interface ChatThreadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    /** Rounded (default) or sharp, for every message and component in the thread. */
    shape?: ChatShape;
    /** `bubble` (default) for a conversation between a few people; `plain` for a channel or larger conversation. */
    ownStyle?: ChatOwnStyle;
    className?: string;
}
/** The scrolling column of messages. */
export declare const ChatThread: React.ForwardRefExoticComponent<ChatThreadProps & React.RefAttributes<HTMLDivElement>>;
