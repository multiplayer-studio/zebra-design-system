import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, StatusLabel, TopAppBar, type IconName } from "../src/index.js";
import {
  ChatMessage, ChatText, ChatMention, ChatFile, ChatImages, ChatCard, ChatAudio, ChatVideo, ChatChoices, ChatSources,
  ChatTyping, ChatDivider, ChatThread, ChatHeader, ChatImageViewer, chatActions, CHAT_REACTIONS, MessageInput,
  type ChatReaction, type ChatImage, type MessageSubmission,
} from "../src/experimental.js";

/* No external media: images have no src, so they render the library
   placeholder (a card tile with the image glyph). The audio clip is a tone
   generated in the browser. */
const PHOTOS: ChatImage[] = [
  { alt: "Aisle 1, chilled bays" }, { alt: "Aisle 2, ambient shelves" }, { alt: "Aisle 3, weekly offers" },
  { alt: "Back room returns cage" }, { alt: "Loading dock 2" }, { alt: "Freezer run" },
];
const tone = (() => {
  const rate = 8000, n = rate * 3, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const w = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); w(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, "data"); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.sin((i / rate) * 2 * Math.PI * 330) * 6000 * (0.5 + 0.5 * Math.sin((i / n) * Math.PI * 5)), true);
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
})();

const AMARA = { name: "Amara Okafor", initials: "AO" };
const JONAS = { name: "Jonas Weber", initials: "JW" };
const noop = () => {};
const labelOf = (icon: IconName) => CHAT_REACTIONS.find((r) => r.icon === icon)?.label ?? icon;
/** Toggle a reaction: add it, or flip whether it is mine and adjust the count. */
const toggle = (rs: ChatReaction[], icon: IconName): ChatReaction[] => {
  const r = rs.find((x) => x.icon === icon);
  if (!r) return [...rs, { icon, label: labelOf(icon), count: 1, mine: true }];
  return rs.map((x) => x.icon === icon ? { ...x, mine: !x.mine, count: x.count + (x.mine ? -1 : 1) } : x).filter((x) => x.count > 0);
};
const Column = ({ children, width = 560 }: { children: React.ReactNode; width?: number }) => (
  <div style={{ maxInlineSize: width, background: "var(--surface-page)" }}>{children}</div>
);

const meta: Meta<typeof ChatMessage> = {
  title: "Experimental/Chat",
  component: ChatMessage,
  parameters: {
    docs: { description: { component: "**Experimental — no spec yet.** Follows the Chat Experimental Figma page. Chat elements built only from the library's components, icon font and tokens: `ChatMessage` (roles, grouping, reply quotes, glyph reactions, an action toolbar, inline edit, delivery status) and content blocks that stack inside it — text, files, images (a stack when there are several), cards, audio, video, interactive choices and AI sources — plus typing and dividers. `shape` on the thread or message flows to every nested component. Hover or tab into a message to see its actions." } },
  },
};
export default meta;
type Story = StoryObj<typeof ChatMessage>;

/* ---- playground ---------------------------------------------------------- */

interface PlaygroundArgs {
  sender: "me" | "other" | "assistant";
  ownStyle: "bubble" | "plain";
  avatar: boolean;
  header: boolean;
  footer: boolean;
  controls: "none" | "on hover" | "below";
  grouped: boolean;
  reply: boolean;
  reactions: boolean;
  content: "text" | "text + file" | "text + images" | "voice note";
  status: "sending" | "sent" | "delivered" | "read" | "failed";
  fill: "light" | "solid";
  shape: "rounded" | "sharp";
}

const GROUP = ["Chilled delivery is in at door 2.", "42 cases, bays 4–7 are free.", "Can someone help unload?"];

function PlaygroundView(a: PlaygroundArgs) {
  const [liked, setLiked] = React.useState(false);
  const [reactions, setReactions] = React.useState<ChatReaction[]>([{ icon: "like", label: "Like", count: 2 }]);
  const author = a.sender === "me" ? { name: "You", initials: "ME" } : a.sender === "assistant" ? undefined : AMARA;
  const texts = a.grouped ? GROUP : [GROUP[0]];
  const actions = a.controls === "none" ? undefined : [
    { id: "copy", icon: "copy-file" as IconName, label: "Copy", onSelect: noop },
    { id: "reply", icon: "reply" as IconName, label: "Reply", onSelect: noop },
    { id: "regenerate", icon: "refresh" as IconName, label: a.sender === "assistant" ? "Regenerate" : "Resend", onSelect: noop },
    // With reactions on, React takes the thumb; a separate Like would repeat it.
    ...(a.reactions ? [] : [{ id: "like", icon: "like" as IconName, label: "Like", pressed: liked, onSelect: () => setLiked((l) => !l) }]),
    { id: "more", icon: "more-horizontal" as IconName, label: "More", menu: [
      { id: "forward", icon: "forward" as IconName, label: "Forward", onSelect: noop },
      { id: "pin", icon: "pin" as IconName, label: "Pin", onSelect: noop },
      { id: "delete", icon: "delete" as IconName, label: "Delete", onSelect: noop },
    ] },
  ];
  return (
    <Column>
      <ChatThread shape={a.shape} ownStyle={a.ownStyle}>
        {texts.map((t, i) => {
          const first = i === 0, last = i === texts.length - 1;
          return (
            <ChatMessage key={i} role={a.sender} author={author} time="09:41"
              position={texts.length === 1 ? "single" : first ? "first" : last ? "last" : "middle"}
              avatar={a.avatar} header={a.header && first} footer={a.footer && last}
              fill={a.fill} status={a.sender === "me" ? a.status : undefined} onRetry={noop}
              replyTo={a.reply && first ? { author: "Jonas Weber", text: "Is the chilled delivery here yet?" } : undefined}
              reactions={a.reactions && last ? reactions : undefined}
              onReact={a.reactions ? (icon) => setReactions((r) => toggle(r, icon)) : undefined}
              // A group keeps one row of controls, under its last message; the others float on hover.
              actions={actions} actionsPosition={a.controls === "below" && last ? "below" : "float"}>
              {a.content === "voice note" && last ? <ChatAudio src={tone} duration={3} /> : <ChatText>{t}</ChatText>}
              {a.content === "text + file" && last ? <ChatFile name="Manifest_door2.pdf" meta="248 KB · PDF" onOpen={noop} onDownload={noop} /> : null}
              {a.content === "text + images" && last ? <ChatImages images={PHOTOS.slice(0, 3)} onOpen={noop} /> : null}
            </ChatMessage>
          );
        })}
      </ChatThread>
    </Column>
  );
}

/** Every part of a message on a switch: sender, avatar, header, footer, controls, grouping, content, fill and shape. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    sender: "other", ownStyle: "bubble", avatar: true, header: true, footer: true, controls: "below", grouped: false,
    reply: false, reactions: false, content: "text", status: "read", fill: "light", shape: "rounded",
  },
  argTypes: {
    sender: { control: "inline-radio", options: ["me", "other", "assistant"], description: "Who sent it: you (right), someone else (left), or the assistant (no bubble)." },
    ownStyle: { control: "inline-radio", options: ["bubble", "plain"], description: "How your own messages read: a bubble at the end for a conversation, plain at the start for a channel.", if: { arg: "sender", eq: "me" } },
    avatar: { control: "boolean", description: "Avatar beside the message, on the sender's side." },
    header: { control: "boolean", description: "Name and time above the bubble (first in a group)." },
    footer: { control: "boolean", description: "Time and delivery status under the bubble (last in a group)." },
    controls: { control: "inline-radio", options: ["none", "on hover", "below"], description: "Copy, reply, regenerate, like and more: floating on hover, or a row under the message." },
    grouped: { control: "boolean", description: "Three messages from one sender, with tightened corners." },
    reply: { control: "boolean", description: "A quoted reply above the first bubble." },
    reactions: { control: "boolean", description: "Reaction chips and the React control." },
    content: { control: "select", options: ["text", "text + file", "text + images", "voice note"] },
    status: { control: "select", options: ["sending", "sent", "delivered", "read", "failed"], if: { arg: "sender", eq: "me" } },
    fill: { control: "inline-radio", options: ["light", "solid"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
  },
  parameters: { controls: { expanded: true, sort: "none" } },
  render: (a) => <PlaygroundView {...a} />,
};

/** Your own messages: a bubble at the end for a conversation, plain at the start like everyone else's for a channel. */
export const ConversationAndChannel: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xl)" }}>
      {(["bubble", "plain"] as const).map((ownStyle) => (
        <Column key={ownStyle}>
          <ChatThread ownStyle={ownStyle}>
            <ChatMessage role="other" author={AMARA} time="09:41"><ChatText>Chilled delivery is in at door 2.</ChatText></ChatMessage>
            <ChatMessage role="me" author={{ name: "You", initials: "ME" }} time="09:42" status="read"><ChatText>On my way.</ChatText></ChatMessage>
            <ChatMessage role="assistant" time="09:42"><ChatText>Bays 4–7 are free for this delivery.</ChatText></ChatMessage>
          </ChatThread>
        </Column>
      ))}
    </div>
  ),
};

/** Each row at rest, then with its controls showing, then the assistant working. Hover any row to see it live. */
export const RowStates: Story = {
  render: () => {
    const bar = [{ id: "reply", icon: "reply" as IconName, label: "Reply", onSelect: noop }, { id: "more", icon: "more-horizontal" as IconName, label: "More", menu: [{ id: "copy", icon: "copy-file" as IconName, label: "Copy", onSelect: noop }, { id: "pin", icon: "pin" as IconName, label: "Pin", onSelect: noop }] }];
    return (
      <Column>
        <ChatThread>
          <ChatMessage role="other" author={AMARA} time="09:41" actions={bar} onReact={noop}><ChatText>At rest, until you hover it.</ChatText></ChatMessage>
          <ChatMessage role="other" author={AMARA} time="09:41" actions={bar} onReact={noop} actionsVisible><ChatText>The row tints, and the quick bar sits on its top-end corner.</ChatText></ChatMessage>
          <ChatMessage role="me" time="09:42" status="read" actions={bar} onReact={noop} actionsVisible><ChatText>Your bubble tints the same way.</ChatText></ChatMessage>
          <ChatMessage role="assistant" time="09:42" actions={chatActions.forAssistant({ onCopy: noop, onReply: noop, onRegenerate: noop })} actionsVisible><ChatText>The assistant keeps its controls below.</ChatText></ChatMessage>
          <ChatMessage role="assistant" time="09:43" thinking="Searching deliveries" />
        </ChatThread>
      </Column>
    );
  },
};

/** Photos, files, voice notes and video from someone else and from you. Files and voice notes sit on a bordered card. */
export const Attachments: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xl)" }}>
      <Column>
        <ChatThread>
          {[1, 2, 3, PHOTOS.length].map((n) => (
            <ChatMessage key={n} role="other" author={AMARA} time="09:41" position={n === 1 ? "first" : n === PHOTOS.length ? "last" : "middle"} header={n === 1}>
              <ChatImages images={PHOTOS.slice(0, n)} onOpen={noop} />
            </ChatMessage>
          ))}
        </ChatThread>
      </Column>
      <Column>
        <ChatThread>
          <ChatMessage role="other" author={AMARA} time="09:41">
            <ChatFile name="Delivery receipt.pdf" meta="PDF · 248 KB" onDownload={noop} />
            <ChatAudio src={tone} duration={8} />
            <ChatVideo src="" duration={8} />
          </ChatMessage>
          <ChatMessage role="me" time="09:42" status="read">
            <ChatText>Here is the receipt.</ChatText>
            <ChatFile name="Delivery receipt.pdf" meta="PDF · 248 KB" onDownload={noop} />
            <ChatAudio src={tone} duration={8} />
          </ChatMessage>
        </ChatThread>
      </Column>
    </div>
  ),
};

/** A whole conversation you can use: send, react, reply, edit, answer the choices, rate the assistant. */
export const Conversation: Story = {
  render: function Render() {
    const [reactions, setReactions] = React.useState<ChatReaction[]>([{ icon: "like", label: "Like", count: 2 }]);
    const [liked, setLiked] = React.useState<"like" | "dislike" | null>(null);
    const [choice, setChoice] = React.useState<string[] | undefined>();
    const [mine, setMine] = React.useState<{ id: number; text: string; status: "sending" | "read" }[]>([]);
    const [thinking, setThinking] = React.useState(false);
    const send = (m: MessageSubmission) => {
      const id = Date.now();
      setMine((xs) => [...xs, { id, text: m.text, status: "sending" }]);
      setTimeout(() => { setMine((xs) => xs.map((x) => x.id === id ? { ...x, status: "read" } : x)); setThinking(true); }, 600);
      setTimeout(() => setThinking(false), 2200);
    };
    return (
      <div style={{ display: "grid", gridTemplateRows: "1fr auto", blockSize: 760, maxInlineSize: 640, background: "var(--surface-page)" }}>
        <ChatThread style={{ overflowY: "auto" }}>
          <ChatDivider>Today</ChatDivider>
          <ChatMessage role="other" author={AMARA} position="first" onReact={(i) => setReactions((rs) => toggle(rs, i))}
            actions={[{ id: "reply", icon: "reply", label: "Reply", onSelect: noop }]}>
            <ChatText>Chilled delivery is in. Can someone help unload?</ChatText>
          </ChatMessage>
          <ChatMessage role="other" author={AMARA} position="last" time="09:41" reactions={reactions} onReact={(i) => setReactions((rs) => toggle(rs, i))}>
            <ChatImages images={PHOTOS.slice(0, 3)} onOpen={noop} />
          </ChatMessage>

          <ChatMessage role="me" time="09:42" status="read" replyTo={{ author: AMARA.name, text: "Chilled delivery is in. Can someone help unload?" }}
            actions={chatActions.forMine({ onReply: noop, onCopy: noop, onForward: noop, onPin: noop, onDelete: noop })}>
            <ChatText>On my way. Bringing the manifest.</ChatText>
            <ChatFile name="Manifest_door2.pdf" meta="248 KB · PDF" onDownload={noop} onOpen={noop} />
          </ChatMessage>

          <ChatDivider tone="system">Assistant joined the chat</ChatDivider>

          <ChatMessage role="assistant" time="09:43" actions={chatActions.forAssistant({
            liked, onLike: () => setLiked((l) => l === "like" ? null : "like"), onDislike: () => setLiked((l) => l === "dislike" ? null : "dislike"),
            onCopy: noop, onRegenerate: noop, onImprove: noop, onSpeak: noop,
          })}>
            <ChatText>The delivery has 42 cases. Bays 4–7 are free, so I'd unload chilled first. Where should the overflow go?</ChatText>
            <ChatChoices prompt="Overflow location" answer={choice} onAnswer={setChoice}
              choices={[{ value: "back", label: "Back room", icon: "location" }, { value: "dock", label: "Dock 2 chiller", icon: "location" }, { value: "later", label: "Ask me later", icon: "clock" }]} />
            <ChatSources sources={[{ title: "Delivery manifest" }, { title: "Bay availability" }]} />
          </ChatMessage>

          {choice ? (
            <ChatMessage role="assistant">
              <ChatCard heading="Overflow booked" subheading={choice[0] === "back" ? "Back room · Cage 3" : choice[0] === "dock" ? "Dock 2 chiller" : "Reminder at 10:30"}
                trailing={<StatusLabel status="neutral" leading="indicator">Confirmed</StatusLabel>}
                actions={[{ label: "View route", icon: "location" }, { label: "Undo" }]}>
                <ChatText>12 cases will go there. I've told the team lead.</ChatText>
              </ChatCard>
            </ChatMessage>
          ) : null}

          {mine.map((m, i) => (
            <ChatMessage key={m.id} role="me" time="now" status={m.status} position={mine.length === 1 ? "single" : i === 0 ? "first" : i === mine.length - 1 ? "last" : "middle"}
              editableText={m.text} onEdit={(t) => setMine((xs) => xs.map((x) => x.id === m.id ? { ...x, text: t } : x))}
              actions={chatActions.forMine({ onCopy: noop, onDelete: () => setMine((xs) => xs.filter((x) => x.id !== m.id)) })}>
              <ChatText>{m.text}</ChatText>
            </ChatMessage>
          ))}
          {thinking ? <ChatMessage role="assistant" thinking /> : null}
        </ChatThread>
        <div style={{ padding: "0 var(--space-md) var(--space-md)" }}>
          <MessageInput placeholder="Message the team" onSend={send} />
        </div>
      </div>
    );
  },
};

/** Who sent it and how runs group: corners tighten where messages join, the name shows once, the time once. */
export const RolesAndGrouping: Story = {
  render: () => (
    <Column>
      <ChatThread>
        <ChatMessage role="other" author={JONAS} position="first"><ChatText>Morning! Are the price labels in?</ChatText></ChatMessage>
        <ChatMessage role="other" author={JONAS} position="middle"><ChatText>Need them for the weekly offers.</ChatText></ChatMessage>
        <ChatMessage role="other" author={JONAS} position="last" time="08:02"><ChatText>Aisle 3 especially.</ChatText></ChatMessage>
        <ChatMessage role="me" position="first"><ChatText>Yes, box by the tills.</ChatText></ChatMessage>
        <ChatMessage role="me" position="last" time="08:03" status="read"><ChatText>I'll bring them over at 9.</ChatText></ChatMessage>
        <ChatMessage role="assistant" time="08:03"><ChatText>Tip: Aisle 3 has 14 labels to change. I can sort them by shelf if that helps.</ChatText></ChatMessage>
      </ChatThread>
    </Column>
  ),
};

/** The optional parts — header (name and time), avatar and footer (status in words) — on each fill. Solid fills the bubbles (text and voice notes) and switches what is inside them to the matching theme; files and images keep their card surface. */
export const Structure: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24, maxInlineSize: 1080 }}>
      {(["light", "solid"] as const).map((fill) => (
        <div key={fill} style={{ background: "var(--surface-page)" }}>
          <div style={{ padding: "var(--space-sm) var(--space-md) 0", color: "var(--foreground-secondary)" }}>{fill}</div>
          <ChatThread>
            <ChatMessage fill={fill} role="other" author={AMARA} header={false} avatar={false} footer={false}><ChatText>Bubble only.</ChatText></ChatMessage>
            <ChatMessage fill={fill} role="other" author={AMARA} time="09:12" avatar={false}><ChatText>With a header.</ChatText></ChatMessage>
            <ChatMessage fill={fill} role="other" author={AMARA} time="09:12"><ChatText>Header and avatar.</ChatText></ChatMessage>
            <ChatMessage fill={fill} role="me" time="09:13" status="read"><ChatText>Footer with the time and status.</ChatText></ChatMessage>
            <ChatMessage fill={fill} role="me" author={{ name: "Kemi Ade", initials: "KA" }} time="09:13" header avatar status="read"><ChatText>Everything on, mine.</ChatText></ChatMessage>
            <ChatMessage fill={fill} role="other" author={JONAS} time="09:14" footer="Seen by 3"
              replyTo={{ author: "Kemi Ade", text: "Everything on, mine." }}>
              <ChatText>Quote, file and audio inside.</ChatText>
              <ChatFile name="Planogram.pdf" meta="3.4 MB · PDF" onDownload={noop} />
              <ChatAudio src={tone} duration={3} />
            </ChatMessage>
            <ChatMessage fill={fill} role="me" time="09:15" status="delivered" edited><ChatImages images={PHOTOS.slice(0, 3)} onOpen={noop} /></ChatMessage>
          </ChatThread>
        </div>
      ))}
    </div>
  ),
};

/** Every content block, on both sides. Several images become a stack of card layers. */
export const ContentTypes: Story = {
  render: () => (
    <Column width={600}>
      <ChatThread>
        <ChatMessage role="other" author={AMARA} time="10:00"><ChatText>{"Plain text keeps\nits line breaks."}</ChatText></ChatMessage>
        <ChatMessage role="me" time="10:01" status="delivered">
          <ChatText>Text with files</ChatText>
          <ChatFile name="Weekly_offers.xlsx" meta="1.2 MB · Spreadsheet" onDownload={noop} />
          <ChatFile name="Planogram.pdf" meta="3.4 MB · PDF" onDownload={noop} onOpen={noop} />
          <ChatFile name="Shelf_notes.docx" progress={62} />
        </ChatMessage>
        <ChatMessage role="other" author={AMARA} time="10:02"><ChatText>One image</ChatText><ChatImages images={PHOTOS.slice(0, 1)} onOpen={noop} /></ChatMessage>
        <ChatMessage role="me" time="10:03" status="read"><ChatText>A stack of six</ChatText><ChatImages images={PHOTOS} onOpen={noop} /></ChatMessage>
        <ChatMessage role="other" author={JONAS} time="10:04">
          <ChatCard heading="Order #48213" subheading="Chilled · 42 cases" media={PHOTOS[0]}
            trailing={<StatusLabel status="neutral" leading="indicator">Delayed</StatusLabel>}
            actions={[{ label: "Track", icon: "location" }, { label: "Details" }]}>
            <ChatText>Now due at 10:15 at door 2.</ChatText>
          </ChatCard>
        </ChatMessage>
        <ChatMessage role="me" time="10:05" status="read"><ChatAudio src={tone} duration={3} /></ChatMessage>
        <ChatMessage role="other" author={AMARA} time="10:05"><ChatAudio src={tone} duration={3} /></ChatMessage>
        <ChatMessage role="other" author={JONAS} time="10:06"><ChatText>How to stack the chiller</ChatText><ChatVideo src="" duration={84} label="Stacking the chiller" /></ChatMessage>
      </ChatThread>
    </Column>
  ),
};

/** The assistant: thinking, writing (streaming), and the finished answer with its controls, sources and a follow-up choice. */
export const AiResponse: Story = {
  render: function Render() {
    const [liked, setLiked] = React.useState<"like" | "dislike" | null>(null);
    const [multi, setMulti] = React.useState<string[] | undefined>();
    return (
      <Column width={640}>
        <ChatThread>
          <ChatMessage role="me" time="11:20" status="read"><ChatText>Plan my shift around the late delivery.</ChatText></ChatMessage>
          <ChatMessage role="assistant" thinking="Checking the delivery and your tasks" />
          <ChatMessage role="assistant" streaming><ChatText>Here's a plan that keeps the chilled restock first and fits your break</ChatText></ChatMessage>
          <ChatMessage role="assistant" time="11:21" actions={chatActions.forAssistant({
            liked, onLike: () => setLiked((l) => l === "like" ? null : "like"), onDislike: () => setLiked((l) => l === "dislike" ? null : "dislike"),
            onCopy: noop, onRegenerate: noop, onImprove: noop, onSpeak: noop,
          })}>
            <ChatText>{"Here's a plan that keeps the chilled restock first:\n\n1. 09:30–10:15  Price labels, Aisle 3\n2. 10:15–11:00  Unload and restock chilled bays 4–7\n3. 11:00–11:15  Break\n4. 11:15–12:00  Count the returns cage"}</ChatText>
            <ChatSources sources={[{ title: "Your task list" }, { title: "Delivery tracker" }, { title: "Break rota" }]} />
            <ChatChoices prompt="Anything else to fit in?" multiple answer={multi} onAnswer={setMulti}
              choices={[{ value: "facing", label: "Face up Aisle 2" }, { value: "freezer", label: "Freezer check" }, { value: "training", label: "Training module" }]} />
          </ChatMessage>
        </ChatThread>
      </Column>
    );
  },
};

/** Reply quotes, glyph reactions, inline edit, delivery status and a failed send with retry. The toolbar shows on hover or keyboard focus. */
export const MessageControls: Story = {
  render: function Render() {
    const [reactions, setReactions] = React.useState<ChatReaction[]>([{ icon: "like", label: "Like", count: 3, mine: true }, { icon: "star", label: "Star", count: 1 }]);
    const [text, setText] = React.useState("Fridge 4 is reading 7°C, can someone check it?");
    const [edited, setEdited] = React.useState(false);
    const [failed, setFailed] = React.useState(true);
    return (
      <Column>
        <ChatThread>
          <ChatMessage role="other" author={AMARA} time="12:01" actionsVisible reactions={reactions} onReact={(i) => setReactions((rs) => toggle(rs, i))}
            actions={[{ id: "reply", icon: "reply", label: "Reply", onSelect: noop }, { id: "more", icon: "more-horizontal", label: "More", menu: [{ id: "pin", icon: "pin", label: "Pin" }, { id: "flag", icon: "flag", label: "Report" }] }]}>
            <ChatText>Stock count done for Aisle 2.</ChatText>
          </ChatMessage>
          <ChatMessage role="me" time="12:02" status="read" edited={edited} actionsVisible editableText={text}
            onEdit={(t) => { setText(t); setEdited(true); }} actions={chatActions.forMine({ onReply: noop, onCopy: noop, onDelete: noop })}
            replyTo={{ author: AMARA.name, text: "Stock count done for Aisle 2." }}>
            <ChatText>{text}</ChatText>
          </ChatMessage>
          <ChatMessage role="me" status="sending" time="12:03"><ChatText>Sending…</ChatText></ChatMessage>
          <ChatMessage role="me" status={failed ? "failed" : "sent"} time="12:03" onRetry={() => setFailed(false)}><ChatText>Photo of the fridge display</ChatText></ChatMessage>
          <ChatDivider tone="unread">2 unread</ChatDivider>
          <ChatTyping author={JONAS} />
        </ChatThread>
      </Column>
    );
  },
};

/** Shape flows down: a sharp thread squares every bubble, tile and nested component — buttons, chips, cards, menus, badges. */
export const Shape: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24, maxInlineSize: 1080 }}>
      {(["rounded", "sharp"] as const).map((shape) => (
        <div key={shape} style={{ background: "var(--surface-page)" }}>
          <div style={{ padding: "var(--space-sm) var(--space-md) 0", color: "var(--foreground-secondary)" }}>{shape}</div>
          <ChatThread shape={shape}>
            <ChatMessage role="other" author={AMARA} time="10:02" actionsVisible reactions={[{ icon: "like", label: "Like", count: 2, mine: true }]} onReact={noop}
              actions={[{ id: "reply", icon: "reply", label: "Reply", onSelect: noop }]}>
              <ChatText>Shelf photos from this morning</ChatText>
              <ChatImages images={PHOTOS.slice(0, 4)} onOpen={noop} />
            </ChatMessage>
            <ChatMessage role="me" time="10:03" status="read">
              <ChatText>Thanks, planogram attached.</ChatText>
              <ChatFile name="Planogram.pdf" meta="3.4 MB · PDF" onDownload={noop} />
            </ChatMessage>
            <ChatMessage role="assistant" time="10:03" actions={chatActions.forAssistant({ onCopy: noop, onLike: noop, onDislike: noop, onImprove: noop })}>
              <ChatCard heading="Order #48213" subheading="Chilled · 42 cases" trailing={<StatusLabel status="neutral" shape={shape} leading="indicator">Delayed</StatusLabel>}
                actions={[{ label: "Track", icon: "location" }, { label: "Details" }]}>
                <ChatText>Now due at 10:15 at door 2.</ChatText>
              </ChatCard>
              <ChatChoices prompt="Where should the overflow go?" onAnswer={noop}
                choices={[{ value: "back", label: "Back room" }, { value: "dock", label: "Dock 2 chiller" }]} />
            </ChatMessage>
          </ChatThread>
        </div>
      ))}
    </div>
  ),
};

/* ---- review attached content ------------------------------------------------ */

type Sent = { id: number; text?: string; file?: { name: string; meta: string } };
const DELIVERY: ChatImage[] = [
  { alt: "Delivery beside a planter in a modern apartment" }, { alt: "Apartment delivery location" }, { alt: "Apartment delivery location, wide" },
];

/**
 * A short conversation with attachments. Hover a message (long press on
 * touch) for its actions, open the photos, play the voice note, and send a
 * reply or a file from the composer.
 */
export const ReviewAttachedContent: Story = {
  parameters: { layout: "fullscreen" },
  render: function Review() {
    const [viewing, setViewing] = React.useState<number | null>(null);
    const [sent, setSent] = React.useState<Sent[]>([]);
    const [draft, setDraft] = React.useState("");

    const send = (m: MessageSubmission) => {
      const files = m.attachments.map((a, i) => ({ id: Date.now() + i, file: { name: a.file.name, meta: `${Math.max(1, Math.round(a.file.size / 1024))} KB` } }));
      const text = m.text.trim() ? [{ id: Date.now() + files.length, text: m.text.trim() }] : [];
      setSent((s) => [...s, ...files, ...text]);
      setDraft("");
    };

    return (
      <div style={{ display: "grid", gridTemplateRows: "auto minmax(0, 1fr) auto", inlineSize: 760, blockSize: "100vh", marginInline: "auto", background: "var(--surface-section)" }}>
        <ChatHeader author={AMARA} presence="Online" online />

        <ChatThread style={{ overflow: "auto" }}>
          <ChatDivider>Today</ChatDivider>

          <ChatMessage role="other" author={AMARA} time="09:41" actions={chatActions.forOther({ onCopy: noop, onReply: noop })}>
            <ChatText>Chilled delivery is in at door 2.</ChatText>
            <ChatText>I took a few photos so you can spot it.</ChatText>
            <ChatImages images={DELIVERY} onOpen={setViewing} />
          </ChatMessage>

          <ChatMessage role="me" time="09:44" status="read" actions={chatActions.forMine({ onCopy: noop, onReply: noop })}>
            <ChatText>Thanks. Is the receipt in the bag?</ChatText>
          </ChatMessage>

          <ChatMessage role="other" author={AMARA} time="09:46" actions={chatActions.forOther({ onCopy: noop, onReply: noop })}>
            <ChatText>Yes, and here is a copy and a quick voice note.</ChatText>
            <ChatFile name="Delivery receipt.pdf" meta="PDF · 248 KB" onDownload={noop} />
            <ChatAudio src={tone} duration={8} />
          </ChatMessage>

          {sent.length ? (
            <ChatMessage role="me" time="now" status="read" actions={chatActions.forMine({ onCopy: noop, onReply: noop })}>
              {sent.map((m) => m.text
                ? <ChatText key={m.id}>{m.text}</ChatText>
                : <ChatFile key={m.id} name={m.file!.name} meta={m.file!.meta} />)}
            </ChatMessage>
          ) : null}
        </ChatThread>

        <div style={{ padding: "var(--space-sm) var(--space-md)", borderBlockStart: "var(--stroke-thin) solid var(--border-default)" }}>
          <MessageInput placeholder="Message Amara…" value={draft} onValueChange={setDraft} onSend={send} defaultSpeakResponse={false} />
        </div>

        <ChatImageViewer images={DELIVERY} index={viewing} onIndexChange={setViewing} onClose={() => setViewing(null)} />
      </div>
    );
  },
};

/* ---- examples from the Figma Chat Experimental page --------------------- */

const img = (name: string) => new URL(`./assets/chat/${name}.jpg`, import.meta.url).href;
const PRINTER: ChatImage[] = [
  { src: img("printer-wide"), alt: "The label printer mid-print" },
  { src: img("printer-rolls"), alt: "Printed rolls stacking up" },
  { src: img("printer-magenta"), alt: "The print head with a magenta roll" },
];
const JORDAN = { name: "Jordan Alvarez", initials: "JA" };
const MAYA = { name: "Maya Chen", initials: "MC" };
const PRIYA = { name: "Priya Nair", initials: "PN" };
const ASSISTANT = { name: "Zebra Assistant" };
const rx = (icon: IconName, count: number, mine = false): ChatReaction => ({ icon, label: labelOf(icon), count, mine });

/** A phone screen: the app bar, the thread and the composer, at Figma's 393px. */
function Phone({ title, initials, children }: { title: string; initials?: string; children: React.ReactNode }) {
  const [draft, setDraft] = React.useState("");
  return (
    <div style={{ display: "grid", gridTemplateRows: "auto minmax(0, 1fr) auto", gridTemplateColumns: "minmax(0, 1fr)", inlineSize: 393, blockSize: "100vh", marginInline: "auto", background: "var(--surface-page)" }}>
      <TopAppBar type="default" pageTitle={title} avatarInitials={initials} trailing={<>
        <IconButton flavour="subtle" size="small" shape="rounded" icon="world" label="Translate" />
        <IconButton flavour="subtle" size="small" shape="rounded" icon="love" label="Favourite" />
        <IconButton flavour="subtle" size="small" shape="rounded" icon="more-vertical" label="More" />
      </>} />
      <div style={{ overflow: "auto" }}>{children}</div>
      <div style={{ padding: "var(--space-md) var(--space-sm)" }}>
        <MessageInput placeholder="Placeholder" value={draft} onValueChange={setDraft} onSend={() => setDraft("")} />
      </div>
    </div>
  );
}

/** Figma's group example: a channel, so your messages are text with your name, not bubbles. Hover (long press on touch) for React, Reply and More. */
export const ExampleChannel: Story = {
  parameters: { layout: "fullscreen" },
  render: function ExampleChannel() {
    const [viewing, setViewing] = React.useState<number | null>(null);
    const [reactions, setReactions] = React.useState<Record<string, ChatReaction[]>>({
      maya: [rx("like", 1)], jordan: [rx("dislike", 2, true)], calibrated: [rx("satisfied", 3, true), rx("point-heart", 1)], priya: [rx("satisfied", 1)],
    });
    const react = (key: string) => (icon: IconName) => setReactions((r) => ({ ...r, [key]: toggle(r[key] ?? [], icon) }));
    const other = chatActions.forOther({ onReply: noop, onCopy: noop, onMarkUnread: noop });
    const mine = chatActions.forMine({ onReply: noop, onEdit: noop, onCopy: noop, onDelete: noop });
    return (
      <Phone title="Project Team A">
        <ChatThread ownStyle="plain">
          <ChatMessage role="other" author={JORDAN} time="1:02" actions={other} onReact={react("a")}>
            <ChatText>Hey, the label printer in back is doing it again 😩</ChatText>
            <ChatText>It prints half a label then stops.</ChatText>
            <ChatImages images={PRINTER} onOpen={setViewing} />
          </ChatMessage>
          <ChatMessage role="me" author={MAYA} time="1:04" status="read" receipts={false} actions={mine} reactions={reactions.maya} onReact={react("maya")}>
            <ChatText>ugh ok</ChatText>
            <ChatText>Did you try power cycling it?</ChatText>
            <ChatText>And check if the ribbon is loaded right</ChatText>
          </ChatMessage>
          <ChatMessage role="other" author={JORDAN} time="1:06" actions={other} reactions={reactions.jordan} onReact={react("jordan")}>
            <ChatText>Yep. For both. Still stuck</ChatText>
          </ChatMessage>
          <ChatMessage role="me" author={MAYA} time="1:07" status="read" receipts={false} actions={mine} onReact={react("b")}>
            <ChatText><ChatMention>Zebra Assistant</ChatMention> can you help troubleshoot the ZD421 in the stockroom? It stops mid-print after we replaced the roll this morning, and the light is blinking amber. We’ve power cycled it twice and checked the ribbon. We have a truck delivery at 2 and need labels working before then.</ChatText>
          </ChatMessage>
          <ChatMessage role="assistant" author={ASSISTANT} time="1:08" thinking />
          <ChatMessage role="assistant" author={ASSISTANT} time="1:08" actions={chatActions.forAssistant({ onCopy: noop, onReply: noop, onRegenerate: noop })}>
            <ChatText>{"A blinking amber light after a roll change usually means the media sensor needs calibrating. Try this:\n\n•  Hold the feed button until the light flashes twice, then release.\n•  The printer will feed a few labels to calibrate.\n•  Print a test label.\n\nIf that doesn’t fix it, I can open a service ticket."}</ChatText>
            <ChatFile name="How to calibrate a printer requiring an update" kind="pdf" meta="PDF · 248 KB" onDownload={noop} />
          </ChatMessage>
          <ChatMessage role="me" author={MAYA} time="1:09" status="read" receipts={false} actions={mine} onReact={react("c")}
            replyTo={{ author: "Zebra Assistant", text: "A blinking amber light after a roll change usually means…" }}>
            <ChatText>Create ticket for stock room</ChatText>
          </ChatMessage>
          <ChatMessage role="other" author={JORDAN} time="1:16" actions={other} reactions={reactions.calibrated} onReact={react("calibrated")}>
            <ChatText>Calibration worked!! 🎉</ChatText>
            <ChatAudio src={tone} duration={8} />
            <ChatVideo src="" poster={img("video-team")} duration={8} label="Calibration video" />
          </ChatMessage>
          <ChatMessage role="other" author={PRIYA} time="1:18" actions={other} reactions={reactions.priya} onReact={react("priya")}
            replyTo={{ author: "Jordan Alvarez", text: "Calibration worked!! 🎉" }}>
            <ChatText>Nice work <ChatMention>Jordan Alvarez</ChatMention> 👏</ChatText>
          </ChatMessage>
          <ChatMessage role="me" author={MAYA} time="1:21" status="read" footer="Seen (2)" actions={mine} onReact={react("d")}>
            <ChatText>Perfect, thanks both 🙌</ChatText>
          </ChatMessage>
        </ChatThread>
        <ChatImageViewer images={PRINTER} index={viewing} onIndexChange={setViewing} onClose={() => setViewing(null)} />
      </Phone>
    );
  },
};

/** Figma's one-to-one example: a conversation, so your messages are bubbles on the right. Hover (long press on touch) for React, Reply and More. */
export const ExampleConversation: Story = {
  parameters: { layout: "fullscreen" },
  render: function ExampleConversation() {
    const [viewing, setViewing] = React.useState<number | null>(null);
    const [reactions, setReactions] = React.useState<Record<string, ChatReaction[]>>({
      mine: [rx("like", 1)], stuck: [rx("dislike", 1, true)], worked: [rx("point-heart", 1, true)],
    });
    const react = (key: string) => (icon: IconName) => setReactions((r) => ({ ...r, [key]: toggle(r[key] ?? [], icon) }));
    const other = chatActions.forOther({ onReply: noop, onCopy: noop, onMarkUnread: noop });
    const mine = chatActions.forMine({ onReply: noop, onEdit: noop, onCopy: noop, onDelete: noop });
    return (
      <Phone title="Jordan Alvarez" initials="JA">
        <ChatThread>
          <ChatMessage role="other" author={JORDAN} time="1:02" actions={other} onReact={react("a")}>
            <ChatText>Hey, the label printer in back is doing it again 😩</ChatText>
            <ChatText>It prints half a label then stops.</ChatText>
            <ChatAudio src={tone} duration={8} />
            <ChatImages images={PRINTER} onOpen={setViewing} />
          </ChatMessage>
          <ChatMessage role="me" time="1:04" status="read" receipts={false} actions={mine} reactions={reactions.mine} onReact={react("mine")}>
            <ChatText>ugh ok</ChatText>
            <ChatText>Did you try power cycling it?</ChatText>
            <ChatText>And check if the ribbon is loaded right</ChatText>
          </ChatMessage>
          <ChatMessage role="other" author={JORDAN} time="1:06" actions={other} reactions={reactions.stuck} onReact={react("stuck")}>
            <ChatText>Yep. For both. Still stuck</ChatText>
            <ChatVideo src="" poster={img("video-laptop")} duration={8} label="Printer video" />
          </ChatMessage>
          <ChatMessage role="me" time="1:07" status="read" receipts={false} actions={mine} onReact={react("b")}>
            <ChatText>Try referencing this doc I found. Hope it offers some help into what we’re doing.</ChatText>
            <ChatFile name="How to calibrate a printer requiring an update" kind="pdf" meta="PDF · 248 KB" onDownload={noop} />
            <ChatText>How did that do?</ChatText>
          </ChatMessage>
          <ChatMessage role="other" author={JORDAN} time="1:16" actions={other} reactions={reactions.worked} onReact={react("worked")}>
            <ChatText>Calibration worked!! 🎉</ChatText>
            <ChatAudio src={tone} duration={8} />
            <ChatVideo src="" poster={img("video-team")} duration={8} label="Calibration video" />
          </ChatMessage>
          <ChatMessage role="me" time="1:21" status="read" actions={mine} onReact={react("c")}>
            <ChatText>Perfect, thanks Jordan 🙌</ChatText>
          </ChatMessage>
        </ChatThread>
        <ChatImageViewer images={PRINTER} index={viewing} onIndexChange={setViewing} onClose={() => setViewing(null)} />
      </Phone>
    );
  },
};
