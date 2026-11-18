import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing, type TemplateResult } from "lit";
import "../src/index.js";
import { CHAT_EXAMPLES, type ChatExample, type ExampleAttachment, type ExampleMessage } from "./chat-examples.js";

const asset = (n: string) => new URL(`./assets/chat-message/${n}.jpg`, import.meta.url).href;
/* Photos and video posters from the Figma Chat Message page (Message Sample). */
const PHOTOS = [asset("photo-lead"), asset("photo-top"), asset("photo-bottom"), asset("video-poster-a")];
const POSTER = asset("video-poster-b");
const MENU = html`<zds-menu-item slot="menu" leading-icon="copy-file">Copy text</zds-menu-item>
  <zds-menu-item slot="menu" leading-icon="reply">Reply</zds-menu-item>
  <zds-menu-item slot="menu" leading-icon="forward">Forward</zds-menu-item>`;
const ROLES = ["receiver", "sender", "assistant"] as const;

const meta: Meta = {
  title: "Components/Chat Message/Chat Message",
  component: "zds-chat-message",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Built from `specs/chat-message`. One message from someone else, you or the assistant. Desktop shows controls on hover or focus; mobile opens reactions and actions with a long press over a scrim." } } },
  argTypes: {
    platform: { control: "inline-radio", options: ["desktop", "mobile"] },
    chatStyle: { control: "inline-radio", options: ["channel", "conversation"] },
    roleName: { control: "inline-radio", options: ROLES },
    state: { control: "select", options: [null, "default", "active", "loading"] },
    sequence: { control: "inline-radio", options: ["first", "consecutive"] },
  },
  args: { platform: "desktop", chatStyle: "channel", roleName: "receiver", state: null, sequence: "first", rounded: true },
  render: (a) => html`<div style="max-inline-size:400px;padding-block-start:48px">
    <zds-chat-message platform=${a.platform} chat-style=${a.chatStyle} role-name=${a.roleName} state=${a.state ?? nothing}
      sequence=${a.sequence} ?rounded=${a.rounded} name="First Last" initials="FL" time="09:41">Chilled delivery is in at door 2.${MENU}</zds-chat-message>
  </div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Style × Role. */
export const StyleAndRole: Story = {
  render: () => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:24px">
    ${(["channel", "conversation"] as const).flatMap((s) => ROLES.map((r) => html`<zds-chat-message chat-style=${s} role-name=${r}
      name=${r === "assistant" ? "Assistant" : "First Last"} initials="FL" time="09:41">${r === "assistant" ? "Door 2 has 14 pallets waiting." : "Chilled delivery is in at door 2."}${MENU}</zds-chat-message>`))}
  </div>`,
};

/** State: active pins what hover shows; loading stands in while a reply is produced. */
export const State: Story = {
  render: () => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:56px 24px;padding-block-start:48px">
    <zds-chat-message name="First Last" initials="FL" time="09:41">Default.${MENU}</zds-chat-message>
    <zds-chat-message state="active" name="First Last" initials="FL" time="09:41">Active.${MENU}</zds-chat-message>
    <zds-chat-message state="loading" sequence="consecutive"></zds-chat-message>
  </div>`,
};

/** Sequence: consecutive messages line up under the first; the time shows on hover. */
export const Sequence: Story = {
  render: () => html`<div style="max-inline-size:400px">
    <zds-chat-message name="First Last" initials="FL" time="09:41">Chilled delivery is in at door 2.</zds-chat-message>
    <zds-chat-message sequence="consecutive" time="09:42">Bay 4 is clear for it.</zds-chat-message>
    <zds-chat-message sequence="consecutive" time="09:42" .hideTime=${false}>Time shown at rest.</zds-chat-message>
  </div>`,
};

/** Reply, reactions and footer, and the Attachment Slot. */
export const Content: Story = {
  render: () => html`<div style="display:grid;gap:8px;max-inline-size:420px">
    <zds-chat-message chat-style="conversation" role-name="sender" reply-to="Sam Lee" reply-text="Is the chilled delivery here yet?">Yes, at door 2.
      <zds-assist-chip slot="reactions" color="blue" .showLeadingIcon=${false}>👍 3</zds-assist-chip>
      <span slot="footer">Seen</span></zds-chat-message>
    <zds-chat-message name="First Last" initials="FL" time="09:41">Photos from bay 4.<zds-chat-photos slot="attachments" .photos=${PHOTOS}></zds-chat-photos></zds-chat-message>
    <zds-chat-message sequence="consecutive" time="09:42"><zds-chat-attachment slot="attachments" file-name="Delivery receipt.pdf" file-meta="PDF · 248 KB"></zds-chat-attachment></zds-chat-message>
    <zds-chat-message sequence="consecutive" time="09:42"><zds-chat-attachment slot="attachments" type="video" duration="0:08" poster=${POSTER}></zds-chat-attachment>
      <zds-chat-attachment slot="attachments" type="audio" duration="0:08"></zds-chat-attachment></zds-chat-message>
    <zds-chat-message name="Sam Lee" initials="SL" time="09:44">Which door?
      <zds-chat-thread slot="thread" reply-count="2" open>
        <zds-chat-message name="First Last" initials="FL" time="09:45">Door 2.</zds-chat-message>
        <zds-chat-message sequence="consecutive" time="09:45">Bay 4 behind it.</zds-chat-message>
      </zds-chat-thread></zds-chat-message>
  </div>`,
};

/** Mobile: press and hold a message to lift it over the scrim with reactions above and actions below. */
export const MobileLongPress: Story = {
  render: () => html`<div style="max-inline-size:360px;padding-block:120px">
    <zds-chat-message platform="mobile" name="First Last" initials="FL" time="09:41">Press and hold me.${MENU}</zds-chat-message>
    <zds-chat-message platform="mobile" chat-style="conversation" role-name="sender">And me.${MENU}</zds-chat-message>
  </div>`,
};

/* ---- Examples: the three Message Sample screens from Figma ------------------------------------------------------- */

const exampleAttachment = (a: ExampleAttachment) =>
  a.kind === "photos" ? html`<zds-chat-photos slot="attachments" .photos=${a.photos.map(asset)}></zds-chat-photos>`
  : a.kind === "file" ? html`<zds-chat-attachment slot="attachments" file-name=${a.name} file-meta=${a.meta}></zds-chat-attachment>`
  : a.kind === "video" ? html`<zds-chat-attachment slot="attachments" type="video" duration=${a.duration} poster=${asset(a.poster)}></zds-chat-attachment>`
  : html`<zds-chat-attachment slot="attachments" type="audio" duration=${a.duration}></zds-chat-attachment>`;

const exampleMessage = (m: ExampleMessage, platform: "mobile" | "desktop"): TemplateResult => html`<zds-chat-message
  platform=${platform} chat-style=${m.chatStyle} role-name=${m.role} state=${m.state ?? nothing} sequence=${m.sequence ?? "first"}
  name=${m.name ?? nothing} time=${m.time ?? nothing} reply-to=${m.replyTo ?? nothing} reply-text=${m.replyText ?? nothing}
  initials=${m.initials ?? nothing} avatar-icon=${m.assistantAvatar ? "companion" : nothing}
  avatar-color=${m.assistantAvatar ? "purple" : m.color ?? nothing}
  .showAvatar=${m.showAvatar ?? true} .showControls=${m.showControls ?? true}
  >${m.text?.split("\n\n").map((para) => html`<p>${para.split("\n").map((line, i) => (i ? html`<br />${line}` : line))}</p>`)}${(m.attachments ?? []).map(exampleAttachment)}${(m.reactions ?? []).map(
    (r) => html`<zds-assist-chip slot="reactions" icon=${r.glyph}>${r.count}</zds-assist-chip>`)}${m.thread
    ? html`<zds-chat-thread slot="thread" reply-count=${m.thread.replies.length} open>${m.thread.replies.map((r) => exampleMessage(r, platform))}</zds-chat-thread>`
    : nothing}${MENU}</zds-chat-message>`;

/** A screen from the Message Sample page: app bar, the conversation scrolling under it, then the Message Input. */
const exampleScreen = (ex: ChatExample) => {
  const mobile = ex.container === "mobile";
  const trailing = ex.people
    ? html`<zds-avatar-rail slot="trailing" size="xsmall" max="2" label="Members">${ex.people.map((p) => html`<zds-avatar initials=${p.initials} swatch-color=${p.color}></zds-avatar>`)}</zds-avatar-rail>
        <zds-icon-button slot="trailing" flavour="text" size="medium" icon="world" label="Translate"></zds-icon-button>`
    : html`<zds-icon-button slot="trailing" flavour="text" size="medium" icon="world" label="Translate"></zds-icon-button>
        <zds-icon-button slot="trailing" flavour="text" size="medium" icon="love" label="Favourite"></zds-icon-button>
        <zds-icon-button slot="trailing" flavour="text" size="medium" icon="more-vertical" label="More"></zds-icon-button>`;
  return html`<div style="box-sizing:border-box;display:flex;flex-direction:column;inline-size:100%;max-inline-size:${mobile ? 393 : 999}px;
      block-size:${mobile ? 852 : 760}px;margin-inline:auto;overflow:hidden;background:var(--surface-page);border:var(--stroke-thin) solid var(--border-subtle)">
    <zds-top-app-bar shape="sharp" page-title=${ex.title}>${trailing}</zds-top-app-bar>
    <!-- Room above the first message for its desktop controls, which float over its top edge. -->
    <div style="flex:1 1 auto;min-block-size:0;overflow-x:hidden;overflow-y:auto;padding:var(--space-2xl) var(--space-sm) var(--space-sm)">
      ${ex.messages.map((m) => exampleMessage(m, ex.container))}
    </div>
    ${ex.replying
      ? html`<div style="display:flex;align-items:center;gap:var(--space-xs);padding-inline:var(--space-md) var(--space-xs);border-block-start:var(--stroke-thin) solid var(--border-subtle);color:var(--foreground-secondary)">
          <span style="font:var(--text-body-xsmall)">Replying to</span>
          <span style="font:var(--text-label-small);color:var(--foreground-primary)">${ex.replying.to}</span>
          <span style="flex:1 1 auto;min-inline-size:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font:var(--text-body-xsmall)">${ex.replying.text}</span>
          <zds-icon-button flavour="text" size="small" icon="close" label="Cancel reply"></zds-icon-button>
        </div>`
      : nothing}
    <div style="padding:var(--space-sm)"><zds-message-input placeholder="Placeholder"></zds-message-input></div>
  </div>`;
};

const FIGMA = "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=";
const exampleStory = (id: string, about: string): Story => {
  const ex = CHAT_EXAMPLES.find((e) => e.id === id)!;
  return {
    name: `${ex.container === "mobile" ? "Mobile" : "Desktop"} · ${ex.instance}`,
    render: () => exampleScreen(ex),
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
