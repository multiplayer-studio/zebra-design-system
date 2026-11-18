import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AssistChip, Avatar, AvatarRail, ChatAttachment, ChatBubble, ChatControls, ChatLoadingIndicator, ChatMessage, ChatPhotos,
  ChatThread, IconButton, MenuItem, MessageInput, TopAppBar, type ChatMessageProps,
} from "../src/index.js";
import { CHAT_EXAMPLES, type ChatExample, type ExampleAttachment, type ExampleMessage } from "./chat-examples.js";

const asset = (n: string) => new URL(`./assets/chat-message/${n}.jpg`, import.meta.url).href;
/* Photos and video posters from the Figma Chat Message page (Message Sample). */
const PHOTOS = [asset("photo-lead"), asset("photo-top"), asset("photo-bottom"), asset("video-poster-a")];
const POSTER = asset("video-poster-b");
const MENU = (
  <>
    <MenuItem leadingIcon="copy-file">Copy text</MenuItem>
    <MenuItem leadingIcon="reply">Reply</MenuItem>
    <MenuItem leadingIcon="forward">Forward</MenuItem>
    <MenuItem leadingIcon="chat-message-unread">Mark as unread</MenuItem>
  </>
);
const REACTIONS = <><AssistChip showLeadingIcon={false} color="blue">👍 3</AssistChip><AssistChip showLeadingIcon={false}>❤️ 1</AssistChip></>;

const meta: Meta<typeof ChatMessage> = {
  title: "Components/Chat Message/Chat Message",
  component: ChatMessage,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Built from `specs/chat-message`. One message from someone else, you or the assistant. Desktop shows controls on hover or focus; mobile opens reactions and actions with a long press over a scrim." } } },
  argTypes: {
    platform: { control: "inline-radio", options: ["desktop", "mobile"] },
    chatStyle: { control: "inline-radio", options: ["channel", "conversation"] },
    role: { control: "inline-radio", options: ["receiver", "sender", "assistant"] },
    state: { control: "select", options: [undefined, "default", "active", "loading"] },
    sequence: { control: "inline-radio", options: ["first", "consecutive"] },
  },
  args: { platform: "desktop", chatStyle: "channel", role: "receiver", sequence: "first", rounded: true, name: "First Last",
    avatar: { initials: "FL" }, time: "09:41", message: "Chilled delivery is in at door 2.", menu: MENU },
  render: (a) => <div style={{ maxInlineSize: 400, paddingBlockStart: 48 }}><ChatMessage {...a} /></div>,
};
export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const Playground: Story = {};

const grid = (cells: [string, ChatMessageProps][]) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "56px 24px", paddingBlockStart: 48 }}>
    {cells.map(([cap, p]) => (
      <div key={cap}><div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cap}</div><ChatMessage name="First Last" avatar={{ initials: "FL" }} time="09:41" menu={MENU} {...p} /></div>
    ))}
  </div>
);

/** Style × Role: channel is plain text for everyone; conversation puts others in surface/brand bubbles and yours in primary ones on the right. */
export const StyleAndRole: Story = {
  render: () => grid((["channel", "conversation"] as const).flatMap((s) => (["receiver", "sender", "assistant"] as const).map((r) => [
    `${s} · ${r}`, { chatStyle: s, role: r, name: r === "assistant" ? "Assistant" : "First Last", message: r === "assistant" ? "Door 2 has 14 pallets waiting. Want the manifest?" : "Chilled delivery is in at door 2." },
  ] as [string, ChatMessageProps]))),
};

/** State: active pins what hover shows (the surface and the floating controls); loading stands in while a reply is produced. */
export const State: Story = {
  render: () => grid([
    ["default", { message: "Chilled delivery is in at door 2." }],
    ["active", { state: "active", message: "Chilled delivery is in at door 2." }],
    ["loading · receiver", { state: "loading", sequence: "consecutive" }],
    ["loading · assistant", { state: "loading", role: "assistant", chatStyle: "conversation", name: "Assistant" }],
    ["active · conversation sender", { state: "active", chatStyle: "conversation", role: "sender", message: "On my way." }],
  ]),
};

/** Sequence: a consecutive message drops the avatar and header and lines up under the first; its time shows on hover. */
export const Sequence: Story = {
  render: () => (
    <div style={{ maxInlineSize: 400, paddingBlockStart: 48 }}>
      <ChatMessage name="First Last" avatar={{ initials: "FL" }} time="09:41" message="Chilled delivery is in at door 2." menu={MENU} />
      <ChatMessage sequence="consecutive" time="09:42" message="Bay 4 is clear for it." menu={MENU} />
      <ChatMessage sequence="consecutive" time="09:42" hideTime={false} message="Time shown at rest when hideTime is off." menu={MENU} />
    </div>
  ),
};

/** A run of your bubbles: the inner corners tighten so the run reads as one block. */
export const BubbleStatus: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 4, maxInlineSize: 400, justifyItems: "end" }}>
      {(["first", "middle", "last"] as const).map((st) => <ChatBubble key={st} status={st}>{`On my way (${st}).`}</ChatBubble>)}
      <div style={{ justifySelf: "start", display: "grid", gap: 4 }}>
        {(["first", "middle", "last"] as const).map((st) => <ChatBubble key={st} role="receiver" status={st}>{`Thanks (${st}).`}</ChatBubble>)}
      </div>
    </div>
  ),
};

export const Rounded: Story = { args: { rounded: false, state: "active", chatStyle: "conversation", message: "Sharp corners throughout." } };

/** Reply, reactions and footer. */
export const ReplyReactionsFooter: Story = {
  args: { replyTo: "Sam Lee", replyText: "Is the chilled delivery here yet?", reactions: REACTIONS, footer: "Seen", chatStyle: "conversation", role: "sender", message: "Yes, at door 2." },
};

/** The Attachment Slot: photos, a file, video and audio, and a thread. */
export const Attachments: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 8, maxInlineSize: 420 }}>
      <ChatMessage name="First Last" avatar={{ initials: "FL" }} time="09:41" message="Photos from bay 4." attachments={<ChatPhotos photos={PHOTOS} />} />
      <ChatMessage sequence="consecutive" time="09:42" attachments={<ChatAttachment fileName="Delivery receipt.pdf" fileMeta="PDF · 248 KB" />} />
      <ChatMessage sequence="consecutive" time="09:42" attachments={<><ChatAttachment type="video" duration="0:08" poster={POSTER} /><ChatAttachment type="audio" duration="0:08" /></>} />
      <ChatMessage name="Sam Lee" avatar={{ initials: "SL" }} time="09:44" message="Which door?"
        thread={<ChatThread replyCount={2} defaultOpen>
          <ChatMessage name="First Last" avatar={{ initials: "FL" }} time="09:45" message="Door 2." />
          <ChatMessage sequence="consecutive" time="09:45" message="Bay 4 behind it." />
        </ChatThread>} />
    </div>
  ),
};

/** The parts on their own. Photos and Attachment have their own stories in this folder. */
export const Parts: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <ChatControls><></></ChatControls>
      <ChatControls controlsStyle="none" showReact={false} showMore={false} />
      <ChatLoadingIndicator label="Typing" />
    </div>
  ),
};

/** Mobile: press and hold a message (about half a second) to lift it over the scrim with reactions above and actions below. */
export const MobileLongPress: Story = {
  render: () => (
    <div style={{ maxInlineSize: 360, paddingBlock: 120 }}>
      <ChatMessage platform="mobile" name="First Last" avatar={{ initials: "FL" }} time="09:41" message="Press and hold me." menu={MENU} />
      <ChatMessage platform="mobile" chatStyle="conversation" role="sender" message="And me." menu={MENU} />
    </div>
  ),
};

/* ---- Examples: the three Message Sample screens from Figma ------------------------------------------------------- */

const exampleAttachment = (a: ExampleAttachment, i: number) =>
  a.kind === "photos" ? <ChatPhotos key={i} photos={a.photos.map(asset)} />
  : a.kind === "file" ? <ChatAttachment key={i} fileName={a.name} fileMeta={a.meta} />
  : a.kind === "video" ? <ChatAttachment key={i} type="video" duration={a.duration} poster={asset(a.poster)} />
  : <ChatAttachment key={i} type="audio" duration={a.duration} />;

const exampleMessage = (m: ExampleMessage, platform: "mobile" | "desktop", key: number): React.ReactElement => (
  <ChatMessage key={key} platform={platform} chatStyle={m.chatStyle} role={m.role} state={m.state} sequence={m.sequence}
    name={m.name} time={m.time} replyTo={m.replyTo} replyText={m.replyText} showAvatar={m.showAvatar}
    showControls={m.showControls} menu={MENU}
    // A blank line starts a paragraph; a single line break stays inside it.
    message={m.text?.split("\n\n").map((para, p) => <p key={p}>{para.split("\n").flatMap((line, i) => (i ? [<br key={i} />, line] : [line]))}</p>)}
    // The assistant's own avatar is the companion glyph.
    avatar={m.assistantAvatar ? { icon: "companion", swatchColor: "purple" } : m.initials ? { initials: m.initials, swatchColor: m.color } : undefined}
    attachments={m.attachments ? <>{m.attachments.map(exampleAttachment)}</> : undefined}
    reactions={m.reactions ? <>{m.reactions.map((r) => <AssistChip key={r.glyph} icon={r.glyph}>{String(r.count)}</AssistChip>)}</> : undefined}
    thread={m.thread ? <ChatThread replyCount={m.thread.replies.length} defaultOpen>{m.thread.replies.map((r, i) => exampleMessage(r, platform, i))}</ChatThread> : undefined} />
);

/** A screen from the Message Sample page: app bar, the conversation scrolling under it, then the Message Input. */
function ExampleScreen({ ex }: { ex: ChatExample }) {
  const mobile = ex.container === "mobile";
  const trailing = ex.people ? (
    <>
      <AvatarRail size="xsmall" max={2} label="Members">{ex.people.map((p) => <Avatar key={p.initials} initials={p.initials} swatchColor={p.color} />)}</AvatarRail>
      <IconButton flavour="text" size="medium" icon="world" label="Translate" />
    </>
  ) : (
    <>
      <IconButton flavour="text" size="medium" icon="world" label="Translate" />
      <IconButton flavour="text" size="medium" icon="love" label="Favourite" />
      <IconButton flavour="text" size="medium" icon="more-vertical" label="More" />
    </>
  );
  return (
    <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", inlineSize: "100%", maxInlineSize: mobile ? 393 : 999,
      blockSize: mobile ? 852 : 760, marginInline: "auto", overflow: "hidden", background: "var(--surface-page)",
      border: "var(--stroke-thin) solid var(--border-subtle)" }}>
      <TopAppBar shape="sharp" pageTitle={ex.title} trailing={trailing} />
      {/* Room above the first message for its desktop controls, which float over its top edge. */}
      <div style={{ flex: "1 1 auto", minBlockSize: 0, overflowX: "hidden", overflowY: "auto", padding: "var(--space-2xl) var(--space-sm) var(--space-sm)" }}>
        {ex.messages.map((m, i) => exampleMessage(m, ex.container, i))}
      </div>
      {ex.replying ? (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", paddingInline: "var(--space-md) var(--space-xs)",
          borderBlockStart: "var(--stroke-thin) solid var(--border-subtle)", color: "var(--foreground-secondary)" }}>
          <span style={{ font: "var(--text-body-xsmall)" }}>Replying to</span>
          <span style={{ font: "var(--text-label-small)", color: "var(--foreground-primary)" }}>{ex.replying.to}</span>
          <span style={{ flex: "1 1 auto", minInlineSize: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", font: "var(--text-body-xsmall)" }}>{ex.replying.text}</span>
          <IconButton flavour="text" size="small" icon="close" label="Cancel reply" />
        </div>
      ) : null}
      <div style={{ padding: "var(--space-sm)" }}><MessageInput placeholder="Placeholder" /></div>
    </div>
  );
}

const FIGMA = "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=";
const exampleStory = (id: string, about: string): Story => {
  const ex = CHAT_EXAMPLES.find((e) => e.id === id)!;
  return {
    name: `${ex.container === "mobile" ? "Mobile" : "Desktop"} · ${ex.instance}`,
    render: () => <ExampleScreen ex={ex} />,
    parameters: { layout: "padded", design: { type: "figma", url: FIGMA + ex.figma }, docs: { description: { story: about } } },
  };
};

/** Container: Mobile. Instance: Group channel. A team channel where the assistant is called in, with a thread, media and replies. */
export const ExampleMobileGroupChannel: Story = exampleStory("mobile-group-channel",
  "**Container:** Mobile. **Instance:** Group channel. Press and hold a message for reactions and actions.");
/** Container: Desktop. Instance: Group channel. The same channel on desktop, where controls show on hover. */
export const ExampleDesktopGroupChannel: Story = exampleStory("desktop-group-channel",
  "**Container:** Desktop. **Instance:** Group channel. Hover a message for its controls.");
/** Container: Desktop. Instance: Assistant conversation. One person and the assistant; your messages sit in bubbles. */
export const ExampleDesktopAssistantConversation: Story = exampleStory("desktop-assistant-conversation",
  "**Container:** Desktop. **Instance:** Assistant conversation. Your messages sit in bubbles on the right.");
