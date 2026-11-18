import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing, type TemplateResult } from "lit";
import { ZetaChatMessage } from "../../../components/chat-message/chat-message.js";
import "../../../components/chat-message/chat-message.js";
import "../../../components/chips/assist-chip/assist-chip.js";
import "../../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../../components/top-appbar/top-appbar.js";
import "../../../components/avatar-rail/avatar-rail.js";
import "../../../components/button/icon-button/icon-button.js";
import "../../../components/message-input/message-input.js";
import { CHAT_EXAMPLES, type ChatExample, type ExampleAttachment, type ExampleMessage } from "./chat-examples.js";

const asset = (n: string) => new URL(`./assets/${n}.jpg`, import.meta.url).href;
/* Photos and video posters from the Figma Chat Message page (Message Sample). */
const PHOTOS = [asset("photo-lead"), asset("photo-top"), asset("photo-bottom"), asset("video-poster-a")];
const POSTER = asset("video-poster-b");
const MENU = html`<zeta-dropdown-menu-item slot="menu"><zeta-icon slot="icon">copy_file</zeta-icon>Copy text</zeta-dropdown-menu-item>
  <zeta-dropdown-menu-item slot="menu"><zeta-icon slot="icon">reply</zeta-icon>Reply</zeta-dropdown-menu-item>
  <zeta-dropdown-menu-item slot="menu"><zeta-icon slot="icon">forward</zeta-icon>Forward</zeta-dropdown-menu-item>`;

const meta: Meta<ZetaChatMessage> = {
  component: "zeta-chat-message",
  title: "Components/Chat Message",
  args: {
    platform: "desktop",
    chatStyle: "channel",
    roleName: "receiver",
    state: undefined,
    sequence: "first",
    rounded: true,
    name: "First Last",
    initials: "FL",
    time: "09:41"
  },
  argTypes: {
    platform: { options: ["desktop", "mobile"], control: { type: "inline-radio" } },
    chatStyle: { options: ["channel", "conversation"], control: { type: "inline-radio" } },
    roleName: { options: ["receiver", "sender", "assistant"], control: { type: "inline-radio" } },
    state: { options: [undefined, "default", "active", "loading"], control: { type: "select" } },
    sequence: { options: ["first", "consecutive"], control: { type: "inline-radio" } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-18698" },
    status: { type: "ready" }
  },
  render: args =>
    html`<div style="max-inline-size: 400px; padding-block-start: 48px">
      <zeta-chat-message
        platform=${args.platform}
        chatStyle=${args.chatStyle}
        roleName=${args.roleName}
        state=${args.state ?? nothing}
        sequence=${args.sequence}
        .rounded=${args.rounded}
        name=${args.name}
        initials=${args.initials}
        time=${args.time}
        >Chilled delivery is in at door 2.${MENU}</zeta-chat-message
      >
    </div>`
};
export default meta;

export const ChatMessage: StoryObj<ZetaChatMessage> = {};

/** Your messages in a conversation sit in bubbles on the right, without avatar or header. */
export const Conversation: StoryObj<ZetaChatMessage> = { args: { chatStyle: "conversation", roleName: "sender" } };

/** The assistant keeps its controls under the message. */
export const Assistant: StoryObj<ZetaChatMessage> = { args: { chatStyle: "conversation", roleName: "assistant", name: "Assistant" } };

/** A reply being produced. */
export const Loading: StoryObj<ZetaChatMessage> = { args: { state: "loading", roleName: "assistant", name: "Assistant" } };

/** Mobile: press and hold to lift the message over a scrim with reactions above and actions below. */
export const Mobile: StoryObj<ZetaChatMessage> = { args: { platform: "mobile" } };

/** Reply, reactions, footer and the Attachment Slot. */
export const Content: StoryObj<ZetaChatMessage> = {
  render: () =>
    html`<div style="display: grid; gap: 8px; max-inline-size: 420px">
      <zeta-chat-message chatStyle="conversation" roleName="sender" replyTo="Sam Lee" replyText="Is the chilled delivery here yet?"
        >Yes, at door 2.<zeta-assist-chip slot="reactions" color="blue">👍 3</zeta-assist-chip><span slot="footer">Seen</span></zeta-chat-message
      >
      <zeta-chat-message name="First Last" initials="FL" time="09:41"
        >Photos from bay 4.<zeta-chat-photos slot="attachments" .photos=${PHOTOS}></zeta-chat-photos
        ><zeta-chat-attachment slot="attachments" fileName="Delivery receipt.pdf" fileMeta="PDF · 248 KB"></zeta-chat-attachment
        ><zeta-chat-attachment slot="attachments" type="video" duration="0:08" poster=${POSTER}></zeta-chat-attachment
      ></zeta-chat-message>
      <zeta-chat-message name="Sam Lee" initials="SL" time="09:44"
        >Which door?<zeta-chat-thread slot="thread" replyCount="1" open
          ><zeta-chat-message name="First Last" initials="FL" time="09:45">Door 2.</zeta-chat-message></zeta-chat-thread
        ></zeta-chat-message
      >
    </div>`
};

/* ---- Examples: the three Message Sample screens from Figma ------------------------------------------------------- */

const exampleAttachment = (a: ExampleAttachment) =>
  a.kind === "photos"
    ? html`<zeta-chat-photos slot="attachments" .photos=${a.photos.map(asset)}></zeta-chat-photos>`
    : a.kind === "file"
      ? html`<zeta-chat-attachment slot="attachments" fileName=${a.name} fileMeta=${a.meta}></zeta-chat-attachment>`
      : a.kind === "video"
        ? html`<zeta-chat-attachment slot="attachments" type="video" duration=${a.duration} poster=${asset(a.poster)}></zeta-chat-attachment>`
        : html`<zeta-chat-attachment slot="attachments" type="audio" duration=${a.duration}></zeta-chat-attachment>`;

/** Zeta's ligatures are snake_case. */
const ligature = (name: string) => name.replace(/-/g, "_");

const exampleMessage = (m: ExampleMessage, platform: "mobile" | "desktop"): TemplateResult =>
  html`<zeta-chat-message
    platform=${platform}
    chatStyle=${m.chatStyle}
    roleName=${m.role}
    state=${m.state ?? nothing}
    sequence=${m.sequence ?? "first"}
    name=${m.name ?? nothing}
    time=${m.time ?? nothing}
    replyTo=${m.replyTo ?? nothing}
    replyText=${m.replyText ?? nothing}
    initials=${m.initials ?? nothing}
    avatarIcon=${m.assistantAvatar ? "companion" : nothing}
    avatarColor=${m.assistantAvatar ? "purple" : (m.color ?? nothing)}
    .showAvatar=${m.showAvatar ?? true}
    .showControls=${m.showControls ?? true}
    >${m.text?.split("\n\n").map(para => html`<p>${para.split("\n").map((line, i) => (i ? html`<br />${line}` : line))}</p>`)}${(m.attachments ?? []).map(exampleAttachment)}${(
      m.reactions ?? []
    ).map(r => html`<zeta-assist-chip slot="reactions" icon=${ligature(r.glyph)}>${r.count}</zeta-assist-chip>`)}${m.thread
      ? html`<zeta-chat-thread slot="thread" replyCount=${m.thread.replies.length} open
          >${m.thread.replies.map(r => exampleMessage(r, platform))}</zeta-chat-thread
        >`
      : nothing}${MENU}</zeta-chat-message
  >`;

/** A screen from the Message Sample page: app bar, the conversation scrolling under it, then the Message Input. */
const exampleScreen = (ex: ChatExample) => {
  const mobile = ex.container === "mobile";
  const trailing = ex.people
    ? html`<zeta-avatar-rail slot="trailing" size="xs" max="2">${ex.people.map(p => html`<zeta-avatar swatch-color=${p.color}>${p.initials}</zeta-avatar>`)}</zeta-avatar-rail>
        <zeta-icon-button slot="trailing" flavor="text" size="medium" aria-label="Translate">world</zeta-icon-button>`
    : html`<zeta-icon-button slot="trailing" flavor="text" size="medium" aria-label="Translate">world</zeta-icon-button>
        <zeta-icon-button slot="trailing" flavor="text" size="medium" aria-label="Favourite">love</zeta-icon-button>
        <zeta-icon-button slot="trailing" flavor="text" size="medium" aria-label="More">more_vertical</zeta-icon-button>`;
  return html`<div
    style="box-sizing: border-box; display: flex; flex-direction: column; inline-size: 100%; max-inline-size: ${mobile
      ? 393
      : 999}px; block-size: ${mobile
      ? 852
      : 760}px; margin-inline: auto; overflow: hidden; background: var(--surface-page); border: var(--stroke-thin) solid var(--zebra-border-subtle)"
  >
    <zeta-top-appbar shape="sharp" pageTitle=${ex.title}
      ><zeta-icon-button slot="leading" flavor="text" size="medium" aria-label="Menu">hamburger_menu</zeta-icon-button>${trailing}</zeta-top-appbar
    >
    <!-- Room above the first message for its desktop controls, which float over its top edge. -->
    <div
      style="flex: 1 1 auto; min-block-size: 0; overflow-x: hidden; overflow-y: auto; padding: var(--space-2xl) var(--space-sm) var(--space-sm)"
    >
      ${ex.messages.map(m => exampleMessage(m, ex.container))}
    </div>
    <!-- The reply sits in the Message Input's own Reply Bar; pressing the bar cancels it. -->
    <div style="padding: var(--space-sm)">
      <zeta-message-input
        placeholder="Placeholder"
        replyTo=${ex.replying?.to ?? nothing}
        replyText=${ex.replying?.text ?? nothing}
        @cancelreply=${(e: Event) => {
          (e.currentTarget as HTMLElement & { replyTo: string }).replyTo = "";
        }}
      ></zeta-message-input>
    </div>
  </div>`;
};

const FIGMA = "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=";
const exampleStory = (id: string): StoryObj<ZetaChatMessage> => {
  const ex = CHAT_EXAMPLES.find(e => e.id === id)!;
  return {
    name: `${ex.container === "mobile" ? "Mobile" : "Desktop"} · ${ex.instance}`,
    render: () => exampleScreen(ex),
    parameters: { layout: "padded", design: { url: FIGMA + ex.figma } }
  };
};

/** Container: Mobile. Instance: Group channel. Press and hold a message for reactions and actions. */
export const ExampleMobileGroupChannel: StoryObj<ZetaChatMessage> = exampleStory("mobile-group-channel");
/** Container: Desktop. Instance: Group channel. Hover a message for its controls. */
export const ExampleDesktopGroupChannel: StoryObj<ZetaChatMessage> = exampleStory("desktop-group-channel");
/** Container: Desktop. Instance: Assistant conversation. Your messages sit in bubbles on the right. */
export const ExampleDesktopAssistantConversation: StoryObj<ZetaChatMessage> = exampleStory("desktop-assistant-conversation");
