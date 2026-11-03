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
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Input } from "../input/Input.js";
import { MenuItem } from "../menu-item/MenuItem.js";
import { ProgressBar } from "../progress-bar/ProgressBar.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import "./chat.css";

/* EXPERIMENTAL — no spec yet. Follows the Chat Experimental Figma page
   (2GFIWOxSrIPRwEewSQtXUj, node 7517:535). Chat elements built only from the
   library's own components, icon font and semantic tokens: no emoji, no
   generated colour, no hand-built controls. chat.css only lays things out and
   paints the chat's own surfaces from tokens.

   Shape flows down: a thread or message is rounded (default) or sharp, and
   every nested component takes the matching variant through
   ChatShapeContext. */

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
export const CHAT_REACTIONS: { icon: IconName; label: string }[] = [
  { icon: "like", label: "Like" },
  { icon: "happy", label: "Happy" },
  { icon: "check-circle", label: "Done" },
  { icon: "star", label: "Star" },
  { icon: "bad-mood", label: "Sad" },
];

export interface ChatAction {
  id: string;
  icon: IconName;
  label: string;
  /** For toggles such as like / dislike. */
  pressed?: boolean;
  onSelect?: () => void;
  /** Turns the button into a menu of follow-ups, e.g. Improve → Shorter, Longer. */
  menu?: { id: string; icon?: IconName; label: string; onSelect?: () => void }[];
}

const ChatShapeContext = React.createContext<ChatShape>("rounded");
const ChatFillContext = React.createContext<ChatFill>("light");
const ChatOwnStyleContext = React.createContext<ChatOwnStyle>("bubble");
/** True inside a card: text there is card body copy, not another bubble. */
const ChatInCardContext = React.createContext(false);
/** The shape the nearest thread or message has set; nested components follow it. */
export const useChatShape = () => React.useContext(ChatShapeContext);
const btnShape = (s: ChatShape) => (s === "sharp" ? "sharp" : "rounded");
const glyphStyle = (s: ChatShape) => (s === "sharp" ? "sharp" : "rounded");

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** True when white text reads better than black on this computed colour (relative luminance below ~0.18). */
const isDark = (color: string) => {
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
function ChatBubble({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const fill = React.useContext(ChatFillContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const [inverse, setInverse] = React.useState<"mode-dark" | "mode-light">("mode-dark");
  React.useLayoutEffect(() => {
    if (fill !== "solid" || !ref.current) return;
    setInverse(isDark(getComputedStyle(ref.current).backgroundColor) ? "mode-dark" : "mode-light");
  });
  return <div ref={ref} {...rest} className={cx("zds-chat-bubble", fill === "solid" && inverse, className)}>{children}</div>;
}

/** Three dots that pulse in turn: typing, thinking and writing. Quiet where a spinner shouts. */
function ChatDots() {
  return <span className="zds-chat-dots" aria-hidden="true"><span /><span /><span /></span>;
}

/** The status line: dots, then a label with a highlight sweeping across it. */
function ChatProgress({ label }: { label: string }) {
  return <span className="zds-chat-progress" role="status"><ChatDots /><span className="zds-chat-progress__label">{label}</span></span>;
}

/* ---- message ------------------------------------------------------------ */

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
  replyTo?: { author: string; text: string };
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
export const ChatMessage = React.forwardRef<HTMLElement, ChatMessageProps>(function ChatMessage(
  {
    role = "other", author, time, position = "single", header, avatar, footer, fill: fillProp = "light", ownStyle: ownStyleProp, shape: shapeProp,
    status, onRetry, edited, replyTo, reactions, onReact, actions, thinking, streaming, editableText, onEdit,
    actionsVisible, actionsPosition, className, children, ...rest
  },
  ref,
) {
  const inherited = useChatShape();
  const shape = shapeProp ?? inherited;
  const inheritedOwnStyle = React.useContext(ChatOwnStyleContext);
  // Plain is text on the page: everyone else's messages, and yours in a channel.
  const plain = role !== "me" || (ownStyleProp ?? inheritedOwnStyle) === "plain";
  // A channel sets lines at text height; a conversation gives each one a control-height slot.
  const channel = (role === "me" ? ownStyleProp ?? inheritedOwnStyle : inheritedOwnStyle) === "plain";
  const fill = plain ? "light" : fillProp;
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(editableText ?? "");
  const [picking, setPicking] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const placement = actionsPosition ?? (role === "assistant" ? "below" : "float");
  const leads = position === "single" || position === "first";
  const ends = position === "single" || position === "last";
  const showHeader = header === undefined ? leads && plain : header !== false;
  const showAvatar = avatar ?? plain;
  const showFooter = footer === undefined ? ends : footer !== false;
  const failed = status === "failed";
  const name = author?.name ?? (role === "me" ? "You" : role === "assistant" ? "Assistant" : "");

  const allActions: ChatAction[] = [...(actions ?? [])];
  if (onReact) allActions.unshift({ id: "react", icon: "react-thumbsup", label: "React", pressed: picking, onSelect: () => setPicking((p) => !p) });
  if (onEdit && editableText !== undefined) {
    const i = allActions.findIndex((a) => a.id === "edit");
    const edit = { id: "edit", icon: "edit" as IconName, label: "Edit", onSelect: () => { setDraft(editableText); setEditing(true); } };
    if (i >= 0) allActions[i] = { ...allActions[i], ...edit };
    else { const more = allActions.findIndex((x) => x.menu); allActions.splice(more >= 0 ? more : allActions.length, 0, edit); }
  }

  const toolbar = allActions.length && !editing && !thinking ? (
    placement === "menu" ? (
      <div className="zds-chat-message__toolbar">
        <ChatActionsMenu actions={allActions} shape={shape} onOpenChange={setMenuOpen} />
      </div>
    ) : (
      <div className="zds-chat-message__toolbar" role="toolbar" aria-label="Message actions">
        {allActions.map((a) => <ChatActionButton key={a.id} action={a} shape={shape} onOpenChange={setMenuOpen} />)}
      </div>
    )
  ) : null;

  const label = [author?.name ?? (role === "me" ? "You" : role === "assistant" ? "Assistant" : "Message"), time].filter(Boolean).join(", ");

  return (
    <ChatShapeContext.Provider value={shape}>
    <ChatFillContext.Provider value={fill}>
      <article
        ref={ref}
        {...rest}
        aria-label={label}
        aria-busy={thinking || streaming ? true : undefined}
        className={cx("zds-chat-message", className)}
        data-role={role}
        data-side={plain ? "start" : "end"}
        data-plain={plain ? "" : undefined}
        data-style={channel ? "channel" : "conversation"}
        data-position={position}
        data-shape={shape}
        data-fill={fill}
        data-status={status}
        data-avatar={showAvatar ? "" : undefined}
        data-actions-visible={actionsVisible || picking || menuOpen ? "" : undefined}
        data-actions={placement}
      >
        {showAvatar ? (
          <div className="zds-chat-message__gutter" aria-hidden="true">
            {leads ? (
              role === "assistant" && !author?.src
                ? <Avatar size="xsmall" type="icon" icon="ai-stars" showClose={false} showStatus={false} showRing={false} />
                : author?.src || name
                  ? <Avatar size="xsmall" type={author?.src ? "photo" : "initials"} src={author?.src} initials={author?.initials ?? name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("")} showClose={false} showStatus={false} showRing={false} />
                  : <Avatar size="xsmall" type="icon" icon="person" showClose={false} showStatus={false} showRing={false} />
            ) : null}
          </div>
        ) : null}

        <div className="zds-chat-message__main">
          {showHeader ? (
            <div className="zds-chat-message__header">
              <span className="zds-chat-message__name">{header === true || header === undefined ? name : header}</span>
              {time ? <time>{time}</time> : null}
            </div>
          ) : null}

          <div className="zds-chat-message__blocks">
            {replyTo ? (
              <div className="zds-chat-message__quote">
                <Icon name="reply" size="xsmall" iconStyle={glyphStyle(shape)} />
                <span className="zds-chat-message__quote-author">{replyTo.author}</span>
                <span className="zds-chat-message__quote-text">{replyTo.text}</span>
              </div>
            ) : null}

            {editing ? (
              <ChatBubble>
                <form className="zds-chat-message__edit" onSubmit={(e) => { e.preventDefault(); onEdit?.(draft.trim()); setEditing(false); }}>
                  <Input aria-label="Edit message" block shape={btnShape(shape)} value={draft} autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Escape") setEditing(false); }} />
                  <div className="zds-chat-message__edit-actions">
                    <Button flavour="text" size="small" shape={btnShape(shape)} type="button" onClick={() => setEditing(false)}>Cancel</Button>
                    <Button flavour="primary" size="small" shape={btnShape(shape)} type="submit" disabled={!draft.trim()}>Save</Button>
                  </div>
                </form>
              </ChatBubble>
            ) : thinking ? (
              // A status line, not a message: the label names the step.
              <ChatProgress label={typeof thinking === "string" ? thinking : "Thinking"} />
            ) : (
              <>
                {children}
                {streaming ? <span className="zds-chat-progress" role="status"><ChatDots /><span className="zds-chat-sr">Writing</span></span> : null}
              </>
            )}
          </div>

          {picking && onReact ? (
            <div className="zds-chat-message__picker" role="group" aria-label="Add a reaction">
              {CHAT_REACTIONS.map((r) => (
                <IconButton key={r.icon} flavour="text" shape={btnShape(shape)} icon={r.icon} label={r.label}
                  onClick={() => { onReact(r.icon); setPicking(false); }} />
              ))}
            </div>
          ) : null}

          {reactions?.length ? (
            <div className="zds-chat-message__reactions">
              {reactions.map((r) => (
                // Assist Chips: a glyph and a count, blue when one of them is yours. Selecting toggles yours.
                <AssistChip key={r.icon} shape={shape} icon={r.icon} showLeadingIcon={!r.text} discardable={false}
                  color={r.mine ? "blue" : "neutral"} disabled={!onReact} aria-pressed={!!r.mine}
                  aria-label={`${r.text ?? r.label}, ${r.count}${r.mine ? ", including you" : ""}`}
                  onClick={() => onReact?.(r.icon)}>{r.text ? `${r.text} ${r.count}` : r.count}</AssistChip>
              ))}
            </div>
          ) : null}

          {toolbar && placement === "below" ? toolbar : null}

          {failed ? (
            <div className="zds-chat-message__failed" role="alert">
              <Icon name="error" size="small" iconStyle={glyphStyle(shape)} />
              <span>Not sent.</span>
              {onRetry ? <Button flavour="text" size="small" shape={btnShape(shape)} onClick={onRetry}>Try again</Button> : null}
            </div>
          ) : showFooter && ((time && !showHeader) || edited || status || (footer !== true && footer)) ? (
            <div className="zds-chat-message__meta">
              {edited ? <span>Edited</span> : null}
              {time && !showHeader ? <time>{time}</time> : null}
              {role === "me" && status ? <ChatStatusMark status={status} shape={shape} /> : null}
              {footer !== true && footer ? <span>{footer}</span> : role === "me" && status ? <span>{STATUS_TEXT[status]}</span> : null}
            </div>
          ) : null}
        </div>

        {toolbar && placement !== "below" ? toolbar : null}
      </article>
    </ChatFillContext.Provider>
    </ChatShapeContext.Provider>
  );
});

function ChatActionButton({ action, shape, onOpenChange }: { action: ChatAction; shape: ChatShape; onOpenChange: (open: boolean) => void }) {
  const button = (
    <IconButton flavour="text" shape={btnShape(shape)} icon={action.icon} label={action.label}
      aria-pressed={action.pressed === undefined || action.menu ? undefined : action.pressed}
      data-pressed={action.pressed ? "" : undefined} onClick={action.menu ? undefined : action.onSelect} />
  );
  if (action.menu) {
    return (
      <Dropdown rounded={shape === "rounded"} position="bottom" align="right" trigger={button} onOpenChange={(open: boolean) => onOpenChange(open)}>
        {action.menu.map((m) => <MenuItem key={m.id} leadingIcon={m.icon} onClick={m.onSelect}>{m.label}</MenuItem>)}
      </Dropdown>
    );
  }
  return <Tooltip point="bottom" shape={shape} trigger={button}>{action.label}</Tooltip>;
}

/**
 * Every action folded into one Message actions control: a chevron that opens
 * a menu. Follow-ups under More are listed in place, and a pressed toggle
 * reads as selected.
 */
function ChatActionsMenu({ actions, shape, onOpenChange }: { actions: ChatAction[]; shape: ChatShape; onOpenChange: (open: boolean) => void }) {
  const items = actions.flatMap((a) => a.menu ? a.menu.map((m) => ({ ...m, pressed: undefined as boolean | undefined })) : [{ id: a.id, icon: a.icon, label: a.label, onSelect: a.onSelect, pressed: a.pressed }]);
  return (
    <Dropdown rounded={shape === "rounded"} position="bottom" align="left" onOpenChange={(open: boolean) => onOpenChange(open)}
      trigger={<IconButton flavour="text" size="small" shape={btnShape(shape)} icon="expand-more" label="Message actions" />}>
      {items.map((m) => <MenuItem key={m.id} leadingIcon={m.icon} selected={!!m.pressed} onClick={m.onSelect}>{m.label}</MenuItem>)}
    </Dropdown>
  );
}

const STATUS_TEXT: Record<ChatStatus, string> = {
  sending: "Sending", sent: "Sent", delivered: "Delivered", read: "Seen", failed: "Not sent",
};

/** The status glyph; the words beside it carry the meaning, so it is hidden from assistive tech. */
function ChatStatusMark({ status, shape }: { status: ChatStatus; shape: ChatShape }) {
  const icons: Record<ChatStatus, IconName> = {
    sending: "clock", sent: "check-mark", delivered: "check-circle-outline", read: "check-circle", failed: "error",
  };
  const icon = icons[status];
  return (
    <span className="zds-chat-message__status" aria-hidden="true">
      <Icon name={icon} size="small" iconStyle={glyphStyle(shape)} />
    </span>
  );
}

/** Ready-made action sets. Pass handlers for the ones you support; the rest are left out. */
export const chatActions = {
  /** Someone else's message: copy, reply, like and more. */
  forOther: (h: { onCopy?: () => void; onReply?: () => void; liked?: boolean; onLike?: () => void; onMore?: () => void }): ChatAction[] => [
    h.onCopy && { id: "copy", icon: "copy-file" as IconName, label: "Copy", onSelect: h.onCopy },
    h.onReply && { id: "reply", icon: "reply" as IconName, label: "Reply", onSelect: h.onReply },
    h.onLike && { id: "like", icon: "like" as IconName, label: h.liked ? "Unlike" : "Like", pressed: !!h.liked, onSelect: h.onLike },
    h.onMore && { id: "more", icon: "more-horizontal" as IconName, label: "More options", onSelect: h.onMore },
  ].filter(Boolean) as ChatAction[],
  /** An image, file or audio message: the save action named for what it saves, then reply, delete and more. */
  forAttachment: (kind: "image" | "file" | "audio", h: { onDownload?: () => void; onReply?: () => void; onDelete?: () => void; onMore?: () => void }): ChatAction[] => [
    h.onDownload && { id: "download", icon: (kind === "audio" ? "save" : "download") as IconName, label: kind === "image" ? "Download image" : kind === "file" ? "Download file" : "Save audio", onSelect: h.onDownload },
    h.onReply && { id: "reply", icon: "reply" as IconName, label: "Reply", onSelect: h.onReply },
    h.onDelete && { id: "delete", icon: "delete" as IconName, label: "Delete", onSelect: h.onDelete },
    h.onMore && { id: "more", icon: "more-horizontal" as IconName, label: "More options", onSelect: h.onMore },
  ].filter(Boolean) as ChatAction[],
  forMine: (h: { onEdit?: () => void; onReply?: () => void; onCopy?: () => void; onForward?: () => void; onPin?: () => void; onDelete?: () => void }): ChatAction[] => [
    h.onEdit && { id: "edit", icon: "edit" as IconName, label: "Edit", onSelect: h.onEdit },
    h.onReply && { id: "reply", icon: "reply" as IconName, label: "Reply", onSelect: h.onReply },
    h.onCopy && { id: "copy", icon: "copy-file" as IconName, label: "Copy", onSelect: h.onCopy },
    { id: "more", icon: "more-horizontal" as IconName, label: "More", menu: [
      h.onForward && { id: "forward", icon: "forward" as IconName, label: "Forward", onSelect: h.onForward },
      h.onPin && { id: "pin", icon: "pin" as IconName, label: "Pin", onSelect: h.onPin },
      h.onDelete && { id: "delete", icon: "delete" as IconName, label: "Delete", onSelect: h.onDelete },
    ].filter(Boolean) as NonNullable<ChatAction["menu"]> },
  ].filter(Boolean) as ChatAction[],
  /** Copy, reply, rate and regenerate stay in view; reading aloud and the Improve rewrites wait under More. */
  forAssistant: (h: { liked?: "like" | "dislike" | null; onLike?: () => void; onDislike?: () => void; onCopy?: () => void; onReply?: () => void; onRegenerate?: () => void; onImprove?: (how: string) => void; onSpeak?: () => void }): ChatAction[] => {
    const more = [
      h.onSpeak && { id: "speak", icon: "volume-up" as IconName, label: "Read aloud", onSelect: h.onSpeak },
      ...(h.onImprove ? [
        { id: "shorter", label: "Make it shorter", onSelect: () => h.onImprove!("shorter") },
        { id: "longer", label: "Add more detail", onSelect: () => h.onImprove!("longer") },
        { id: "simpler", label: "Simplify the language", onSelect: () => h.onImprove!("simpler") },
      ] : []),
    ].filter(Boolean) as NonNullable<ChatAction["menu"]>;
    return [
      h.onCopy && { id: "copy", icon: "copy-file" as IconName, label: "Copy", onSelect: h.onCopy },
      h.onReply && { id: "reply", icon: "reply" as IconName, label: "Reply", onSelect: h.onReply },
      h.onLike && { id: "like", icon: "like" as IconName, label: "Good response", pressed: h.liked === "like", onSelect: h.onLike },
      h.onDislike && { id: "dislike", icon: "dislike" as IconName, label: "Bad response", pressed: h.liked === "dislike", onSelect: h.onDislike },
      h.onRegenerate && { id: "regenerate", icon: "refresh" as IconName, label: "Regenerate", onSelect: h.onRegenerate },
      more.length && { id: "more", icon: "more-horizontal" as IconName, label: "More", menu: more },
    ].filter(Boolean) as ChatAction[];
  },
};

/* ---- content blocks ------------------------------------------------------ */

/** Plain text. Line breaks in the string are kept. */
export function ChatText({ children }: { children: React.ReactNode }) {
  const p = <p className="zds-chat-text">{children}</p>;
  return React.useContext(ChatInCardContext) ? p : <ChatBubble>{p}</ChatBubble>;
}

export type ChatFileKind = "pdf" | "sheet" | "doc" | "image" | "video" | "audio" | "archive" | "other";
const FILE_ICON: Record<ChatFileKind, IconName> = {
  pdf: "document", sheet: "document", doc: "document", image: "image", video: "video", audio: "audio", archive: "attachment", other: "attachment",
};
export const fileKindOf = (name: string): ChatFileKind => {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["xls", "xlsx", "csv", "numbers", "ods"].includes(ext)) return "sheet";
  if (["doc", "docx", "txt", "rtf", "pages", "odt", "md"].includes(ext)) return "doc";
  if (["png", "jpg", "jpeg", "gif", "webp", "heic", "svg"].includes(ext)) return "image";
  if (["mp4", "mov", "webm", "mkv"].includes(ext)) return "video";
  if (["mp3", "wav", "m4a", "ogg"].includes(ext)) return "audio";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "archive";
  return "other";
};

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
export function ChatFile({ name, meta, kind, progress, transfer = "upload", onOpen, onDownload }: ChatFileProps) {
  const shape = useChatShape();
  const uploading = progress !== undefined && progress < 100;
  const downloaded = transfer === "download" && progress !== undefined && progress >= 100;
  return (
    <div className="zds-chat-file">
      <span className="zds-chat-file__tile" aria-hidden="true"><Icon name={FILE_ICON[kind ?? fileKindOf(name)]} size="medium" iconStyle={glyphStyle(shape)} /></span>
      <span className="zds-chat-file__body">
        <span className="zds-chat-file__name">{name}</span>
        {uploading && transfer === "download" ? (
          <>
            <span className="zds-chat-file__meta zds-chat-file__progress" aria-hidden="true"><span>Downloading…</span><span>{Math.round(progress!)}%</span></span>
            <ProgressBar value={progress} shape={shape} label={`Downloading ${name}`} showLabel={false} size="small" />
          </>
        ) : uploading ? <ProgressBar value={progress} shape={shape} label={`Uploading ${name}`} showLabel={false} size="small" />
          : <span className="zds-chat-file__meta">{downloaded ? <span role="status">{meta ? `${meta} · ` : ""}Download complete</span> : meta}</span>}
      </span>
      {onOpen && !uploading ? <IconButton flavour="text" shape={btnShape(shape)} icon="open-in-new-window" label={`Open ${name}`} onClick={onOpen} /> : null}
      {onDownload && !uploading ? <IconButton flavour="text" shape={btnShape(shape)} icon="download" label={`Download ${name}`} onClick={onDownload} /> : null}
    </div>
  );
}

/** An image. Without a `src` it shows the library placeholder: a card tile with the image glyph. */
export interface ChatImage { src?: string; alt: string }

function ChatPicture({ image, shape }: { image?: ChatImage; shape: ChatShape }) {
  return image?.src
    ? <img src={image.src} alt="" loading="lazy" />
    : <span className="zds-chat-placeholder"><Icon name="image" size="medium" iconStyle={glyphStyle(shape)} /></span>;
}

/**
 * Photos sent together: one alone, two side by side, three as one large and
 * two stacked. Past three, the last shows a count of the rest. Every photo is
 * its own control when `onOpen` is set, so any of them opens the viewer.
 */
export function ChatImages({ images, onOpen, noun = "photos" }: { images: ChatImage[]; onOpen?: (index: number) => void; noun?: string }) {
  const shape = useChatShape();
  if (!images.length) return null;
  const shown = images.slice(0, 3);
  const more = images.length - shown.length;
  const label = images.length > 1 ? `${images.length} ${noun}` : undefined;
  return (
    <figure className="zds-chat-images" data-count={shown.length} aria-label={label}>
      {shown.map((image, index) => {
        const count = more && index === shown.length - 1 ? <span className="zds-chat-chip" aria-hidden="true">{`+${more}`}</span> : null;
        return onOpen ? (
          <button key={index} type="button" className="zds-chat-images__photo" aria-label={`Open ${image.alt}`} onClick={() => onOpen(index)}>
            <ChatPicture image={image} shape={shape} />{count}
          </button>
        ) : (
          <span key={index} className="zds-chat-images__photo" role="img" aria-label={image.alt}><ChatPicture image={image} shape={shape} />{count}</span>
        );
      })}
    </figure>
  );
}

/** A full-size view of a message's images in a library Dialog, paging between them. */
export function ChatImageViewer({ images, index, onIndexChange, onClose }: {
  images: ChatImage[]; index: number | null; onIndexChange?: (index: number) => void; onClose: () => void;
}) {
  const shape = useChatShape();
  const image = index === null ? undefined : images[index];
  return (
    <Dialog open={index !== null} onOpenChange={(open) => { if (!open) onClose(); }} shape={shape} showFooter={false}
      heading={images.length > 1 && index !== null ? `${index + 1} of ${images.length}` : "Photo"} className="zds-chat-viewer">
      {image ? (
        <div className="zds-chat-viewer__stage">
          <span className="zds-chat-viewer__image" role="img" aria-label={image.alt}><ChatPicture image={image} shape={shape} /></span>
          {images.length > 1 ? (
            <div className="zds-chat-viewer__nav">
              <IconButton flavour="subtle" shape={btnShape(shape)} icon="chevron-left" label="Previous photo" disabled={index === 0} onClick={() => onIndexChange?.(index! - 1)} />
              <IconButton flavour="subtle" shape={btnShape(shape)} icon="chevron-right" label="Next photo" disabled={index === images.length - 1} onClick={() => onIndexChange?.(index! + 1)} />
            </div>
          ) : null}
        </div>
      ) : null}
    </Dialog>
  );
}

export interface ChatCardProps {
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  media?: ChatImage;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
  /** Buttons along the bottom. The first is outlined, the rest are text, so the card never outshouts the thread. */
  actions?: { label: string; onClick?: () => void; icon?: IconName }[];
}

/** A structured result — a booking, an order, a task — on the library Card. */
export function ChatCard({ heading, subheading, media, trailing, children, actions }: ChatCardProps) {
  const shape = useChatShape();
  return (
    <Card className="zds-chat-card" shape={shape} hasFooter={!!actions?.length}
      header={<CardHeading heading={heading} subheading={subheading} trailingContent={trailing} />}
      footer={actions?.length ? (
        <CardFooter className="zds-chat-card__actions">
          {actions.map((a, i) => <Button key={a.label} size="small" shape={btnShape(shape)} flavour={i === 0 ? "outline" : "text"} leadingIcon={a.icon} onClick={a.onClick}>{a.label}</Button>)}
        </CardFooter>
      ) : undefined}>
      {media ? <span className="zds-chat-card__media" role="img" aria-label={media.alt}><ChatPicture image={media} shape={shape} /></span> : null}
      {children ? <CardBody><ChatInCardContext.Provider value>{children}</ChatInCardContext.Provider></CardBody> : null}
    </Card>
  );
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** A voice note or audio file: play / pause, a waveform that fills as it plays, and the time. */
export function ChatAudio({ src, duration, peaks, label = "Voice message" }: { src: string; duration: number; peaks?: number[]; label?: string }) {
  const shape = useChatShape();
  const audio = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [at, setAt] = React.useState(0);
  const bars = peaks ?? Array.from({ length: 18 }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));
  const progress = duration ? at / duration : 0;
  return (
    <div className="zds-chat-audio" role="group" aria-label={label}>
      <IconButton className="zds-chat-audio__play" flavour="text" shape={shape === "sharp" ? "sharp" : "full"} icon={playing ? "pause" : "play"} label={playing ? "Pause" : `Play ${label.toLowerCase()}`}
        onClick={() => { const a = audio.current; if (!a) return; if (a.paused) void a.play(); else a.pause(); }} />
      <div className="zds-chat-audio__wave" aria-hidden="true">
        {bars.map((p, i) => <span key={i} style={{ blockSize: `${Math.round(p * 100)}%` }} data-played={i / bars.length < progress ? "" : undefined} />)}
      </div>
      <span className="zds-chat-audio__time">{clock(playing || at ? at : duration)}</span>
      <audio ref={audio} src={src} preload="metadata"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setAt(0); }} onTimeUpdate={(e) => setAt(e.currentTarget.currentTime)} />
    </div>
  );
}

/** A video: the poster (or the placeholder tile) with a play control and duration, then the native player once started. */
export function ChatVideo({ src, poster, duration, label = "Video" }: { src: string; poster?: string; duration?: number; label?: string }) {
  const shape = useChatShape();
  const [started, setStarted] = React.useState(false);
  return (
    <div className="zds-chat-video">
      {started ? (
        <video src={src} poster={poster} controls autoPlay aria-label={label} />
      ) : (
        <div className="zds-chat-video__poster">
          {poster ? <img src={poster} alt="" /> : <span className="zds-chat-placeholder"><Icon name="video" size="medium" iconStyle={glyphStyle(shape)} /></span>}
          <span className="zds-chat-video__play">
            <IconButton flavour="text" shape={shape === "sharp" ? "sharp" : "full"} size="large" icon="play" label={`Play ${label}${duration ? `, ${clock(duration)}` : ""}`} onClick={() => setStarted(true)} />
          </span>
          {duration ? <span className="zds-chat-video__duration zds-chat-chip" aria-hidden="true">{clock(duration)}</span> : null}
        </div>
      )}
    </div>
  );
}

export interface ChatChoice { value: string; label: string; icon?: IconName }

/**
 * An interactive response: quick replies (pick one and it is sent) or a
 * multiple choice with a confirm. Once answered it locks and shows the answer,
 * so the thread keeps a record of what was chosen.
 */
export function ChatChoices({ prompt, choices, multiple, answer, onAnswer, confirmLabel = "Confirm" }: {
  prompt?: string; choices: ChatChoice[]; multiple?: boolean;
  /** Set once answered; the choices lock. */
  answer?: string[]; onAnswer?: (values: string[]) => void; confirmLabel?: string;
}) {
  const shape = useChatShape();
  const [picked, setPicked] = React.useState<string[]>([]);
  if (answer) {
    // Answered: a quiet record of the choice, not a row of dead chips.
    const chosen = choices.filter((c) => answer.includes(c.value)).map((c) => c.label).join(", ");
    return (
      <div className="zds-chat-choices" data-locked="">
        {prompt ? <div className="zds-chat-choices__prompt">{prompt}</div> : null}
        <div className="zds-chat-choices__answer"><Icon name="check-mark" size="small" iconStyle={glyphStyle(shape)} />{chosen}</div>
      </div>
    );
  }
  return (
    <div className="zds-chat-choices" role="group" aria-label={prompt ?? "Choose a reply"}>
      {prompt ? <div className="zds-chat-choices__prompt">{prompt}</div> : null}
      <div className="zds-chat-choices__list">
        {choices.map((c) => multiple ? (
          <FilterChip key={c.value} shape={shape} active={picked.includes(c.value)}
            onActiveChange={(on) => setPicked((p) => on ? [...p, c.value] : p.filter((v) => v !== c.value))}>{c.label}</FilterChip>
        ) : (
          // Quick replies: picking one sends it.
          <AssistChip key={c.value} shape={shape} icon={c.icon} showLeadingIcon={!!c.icon} discardable={false} onClick={() => onAnswer?.([c.value])}>{c.label}</AssistChip>
        ))}
      </div>
      {multiple && picked.length ? (
        <Button size="small" shape={btnShape(shape)} flavour="primary" onClick={() => onAnswer?.(picked)}>{`${confirmLabel} (${picked.length})`}</Button>
      ) : null}
    </div>
  );
}

/** Where an AI answer came from: numbered sources as link chips. */
export function ChatSources({ sources }: { sources: { title: string; href?: string; onOpen?: () => void }[] }) {
  const shape = useChatShape();
  return (
    <div className="zds-chat-sources" role="group" aria-label="Sources">
      <span className="zds-chat-sources__label">Sources</span>
      {sources.map((s, i) => (
        <AssistChip key={s.title} shape={shape} icon="link" showLeadingIcon onClick={s.onOpen ?? (s.href ? () => window.open(s.href, "_blank", "noopener") : undefined)}>
          {`${i + 1}. ${s.title}`}
        </AssistChip>
      ))}
    </div>
  );
}

/* ---- conversation header -------------------------------------------------- */

/** Who the conversation is with: avatar, name, presence in words, and actions at the end. */
export function ChatHeader({ author, presence, online, actions }: {
  author: ChatAuthor;
  /** e.g. "Online", "Last seen 09:12". */
  presence?: string;
  /** Adds the available dot to the avatar. */
  online?: boolean;
  /** Buttons at the trailing edge, e.g. Details. */
  actions?: React.ReactNode;
}) {
  const initials = author.initials ?? author.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  return (
    <header className="zds-chat-header">
      <Avatar size="small" type={author.src ? "photo" : "initials"} src={author.src} initials={initials}
        showClose={false} showRing={false} showStatus={!!online} status="available" statusLabel={online ? "Online" : undefined} />
      <div className="zds-chat-header__text">
        <span className="zds-chat-header__name">{author.name}</span>
        {presence ? <span className="zds-chat-header__presence">{presence}</span> : null}
      </div>
      {actions ? <div className="zds-chat-header__actions">{actions}</div> : null}
    </header>
  );
}

/* ---- thread helpers ------------------------------------------------------ */

/** Someone is typing. Sits where their next message will appear. */
export function ChatTyping({ author, role = "other" }: { author?: ChatAuthor; role?: Exclude<ChatRole, "me"> }) {
  return <ChatMessage role={role} author={author} thinking={author ? `${author.name} is typing` : "Typing"} />;
}

/** A day break, an unread marker, or a system note (a Label badge) across the thread. */
export function ChatDivider({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "unread" | "system" }) {
  const shape = useChatShape();
  if (tone === "system") {
    return <div className="zds-chat-divider" data-tone="system" role="note"><BadgeLabel variant="neutral" bold={false} shape={btnShape(shape)}>{children}</BadgeLabel></div>;
  }
  return (
    <div className="zds-chat-divider" data-tone={tone}>
      <Divider /><span>{children}</span><Divider />
    </div>
  );
}

export interface ChatThreadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  /** Rounded (default) or sharp, for every message and component in the thread. */
  shape?: ChatShape;
  /** `bubble` (default) for a conversation between a few people; `plain` for a channel or larger conversation. */
  ownStyle?: ChatOwnStyle;
  className?: string;
}

/** The scrolling column of messages. */
export const ChatThread = React.forwardRef<HTMLDivElement, ChatThreadProps>(function ChatThread({ shape = "rounded", ownStyle = "bubble", className, ...rest }, ref) {
  return (
    <ChatShapeContext.Provider value={shape}>
    <ChatOwnStyleContext.Provider value={ownStyle}>
      <div ref={ref} role="log" aria-live="polite" {...rest} className={cx("zds-chat-thread", className)} data-shape={shape} />
    </ChatOwnStyleContext.Provider>
    </ChatShapeContext.Provider>
  );
});
