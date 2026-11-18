import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/message-input/message-input.js";
import "../src/components/icon-button/icon-button.js";
import type { MessageAttachment } from "../src/components/message-input/message-input.js";

const STATES = ["empty", "filled", "attachment-open", "listening", "transcribing", "dictated", "recording", "playback", "speaking", "disabled"] as const;
const file = (name: string, type: string): MessageAttachment =>
  ({ id: name, file: new File([""], name, { type }), kind: type.startsWith("video/") ? "video" : "document" });
const FILES = [file("Document.pdf", "application/pdf"), file("Video_file.mp4", "video/mp4")];
const REPLY = "I found a table for four at Marlow's on Friday at seven. It's by the window, and they can hold it until six thirty. Shall I book it and send the confirmation to your calendar?";
const frame = (c: unknown) => html`<div style="max-inline-size:440px">${c}</div>`;

const meta: Meta = {
  title: "Components/Message Input",
  component: "zds-message-input",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Built from `specs/message-input`. A composer for conversational, AI-assisted surfaces: type, attach (tray, drop or paste), dictate (listening → transcribing → dictated), record a voice message (recording → playback) and hear the reply (speaking). `state` pins any of the spec's ten states without the microphone." } },
  },
  argTypes: { state: { control: "select", options: [null, ...STATES] } },
  args: { state: null, placeholder: "Placeholder", disabled: false },
  render: (a) => frame(html`<zds-message-input state=${a.state ?? nothing} placeholder=${a.placeholder} ?disabled=${a.disabled}></zds-message-input>`),
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** One composer per spec state, each pinned with `state`. */
export const State: Story = {
  render: () => html`<div style="display:grid;gap:16px;max-inline-size:440px">
    ${STATES.map((s) => html`<div>
      <div style="font:500 12px/1.4 system-ui;opacity:.7;margin-block-end:4px">state="${s}"</div>
      <zds-message-input state=${s} placeholder="Placeholder"
        .value=${s === "filled" ? "Message goes in here." : s === "dictated" ? "Book a table for four on Friday at 7" : s === "disabled" ? "Can't send right now" : ""}
        .attachments=${s === "filled" || s === "attachment-open" ? FILES : []}
        speaking-text=${s === "speaking" ? REPLY : ""} speaking-char-index=${s === "speaking" ? 116 : ""}></zds-message-input>
    </div>`)}
  </div>`,
};

/**
 * The spec's slots: `attachments` adds the product's own content above the
 * text; `more-tools` puts icon controls beside Attachment and drops out while
 * the tray is open and while listening; `attachment-controls` adds types to
 * the tray.
 */
export const Slots: Story = {
  render: () => frame(html`<zds-message-input placeholder="Placeholder" .value=${"Message goes in here."} .attachments=${FILES} tray-open>
    <zds-icon-button slot="more-tools" flavour="subtle" shape="full" size="small" icon="sticker" label="Add a sticker"></zds-icon-button>
    <zds-icon-button slot="attachment-controls" flavour="subtle" shape="full" size="small" icon="sticker" label="Add a sticker"></zds-icon-button>
  </zds-message-input>`),
};

/** The real thing: type, attach, dictate or record. Sent messages are logged. */
export const Interactive: Story = {
  render: () => frame(html`<zds-message-input placeholder="Ask anything" show-read-aloud
    @zds-send=${(e: CustomEvent) => console.log("send", e.detail)}></zds-message-input>`),
};

/** Theme classes on any ancestor reach into the shadow root. */
export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:16px;max-inline-size:440px">
    <div class="mode-dark" style="padding:16px;background:var(--surface-page)"><zds-message-input state="recording"></zds-message-input></div>
    <div class="ext-companion mode-dark" style="padding:16px;background:var(--surface-page)"><zds-message-input state="playback"></zds-message-input></div>
  </div>`,
};
