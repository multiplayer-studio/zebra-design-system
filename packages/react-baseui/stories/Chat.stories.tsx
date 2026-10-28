import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ChatMessage, ChatText, ChatFile, ChatImages, ChatCard, ChatAudio, ChatVideo, ChatChoices, ChatSources,
  ChatTyping, ChatDivider, ChatThread, chatActions, CHAT_REACTIONS, StatusLabel, MessageInput,
  type ChatReaction, type ChatImage, type IconName, type MessageSubmission,
} from "../src/index.js";

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
    docs: { description: { component: "**Experimental — no Figma spec.** Chat elements built only from the library's components, icon font and tokens: `ChatMessage` (roles, grouping, reply quotes, glyph reactions, an action toolbar, inline edit, delivery status) and content blocks that stack inside it — text, files, images (a stack when there are several), cards, audio, video, interactive choices and AI sources — plus typing and dividers. `shape` on the thread or message flows to every nested component. Hover or tab into a message to see its actions." } },
  },
};
export default meta;
type Story = StoryObj<typeof ChatMessage>;

/* ---- playground ---------------------------------------------------------- */

interface PlaygroundArgs {
  sender: "me" | "other" | "assistant";
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
      <ChatThread shape={a.shape}>
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
    sender: "other", avatar: true, header: true, footer: true, controls: "below", grouped: false,
    reply: false, reactions: false, content: "text", status: "read", fill: "light", shape: "rounded",
  },
  argTypes: {
    sender: { control: "inline-radio", options: ["me", "other", "assistant"], description: "Who sent it: you (right), someone else (left), or the assistant (no bubble)." },
    avatar: { control: "boolean", description: "Avatar beside the bubble, on the sender's side." },
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
