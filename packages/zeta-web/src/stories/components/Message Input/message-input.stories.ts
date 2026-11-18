import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaMessageInput, type MessageAttachment } from "../../../components/message-input/message-input.js";
import "../../../components/message-input/message-input.js";
import "../../../components/button/icon-button/icon-button.js";

const file = (name: string, type: string): MessageAttachment => ({
  id: name,
  file: new File([""], name, { type }),
  kind: type.startsWith("video/") ? "video" : "document"
});
const FILES = [file("Document.pdf", "application/pdf"), file("Video_file.mp4", "video/mp4")];
const REPLY =
  "I found a table for four at Marlow's on Friday at seven. It's by the window, and they can hold it until six thirty. Shall I book it and send the confirmation to your calendar?";
const STATES = ["empty", "filled", "attachment-open", "listening", "transcribing", "dictated", "recording", "playback", "speaking", "disabled"] as const;

const meta: Meta<ZetaMessageInput> = {
  component: "zeta-message-input",
  title: "Components/Message Input",
  args: {
    state: null,
    placeholder: "Placeholder",
    disabled: false
  },
  argTypes: {
    state: { options: [null, ...STATES], control: { type: "select" } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6649-196"
    },
    status: {
      type: "ready"
    }
  },
  render: args =>
    html`<div style="max-inline-size: 440px">
      <zeta-message-input
        state=${args.state ?? nothing}
        placeholder=${args.placeholder}
        ?disabled=${args.disabled}
        .value=${args.state === "filled" ? "Message goes in here." : args.state === "dictated" ? "Book a table for four on Friday at 7" : ""}
        .attachments=${args.state === "filled" || args.state === "attachment-open" ? FILES : []}
        speakingText=${args.state === "speaking" ? REPLY : nothing}
      ></zeta-message-input>
    </div>`
};
export default meta;

/** The playground: pick a state, or leave it unset to type, attach, dictate and record for real. */
export const MessageInput: StoryObj<ZetaMessageInput> = {};

/** A voice message being recorded: the dot, the live waveform and the elapsed time, with Stop in the actions. */
export const Recording: StoryObj<ZetaMessageInput> = { args: { state: "recording" } };

/** A take waiting to be sent or discarded: play it back, record again or delete it. */
export const Playback: StoryObj<ZetaMessageInput> = { args: { state: "playback" } };

/** The assistant replying aloud: the orb and the caption, with Stop speaking and no toolbar. */
export const Speaking: StoryObj<ZetaMessageInput> = { args: { state: "speaking" } };

/** The spec's slots: product content above the text, a tool beside Attachment and an extra type in the tray. */
export const Slots: StoryObj<ZetaMessageInput> = {
  render: () =>
    html`<div style="max-inline-size: 440px">
      <zeta-message-input placeholder="Placeholder" .value=${"Message goes in here."} .attachments=${FILES} trayOpen>
        <zeta-icon-button slot="more-tools" flavor="subtle" shape="full" size="small" aria-label="Add a sticker">sticker</zeta-icon-button>
        <zeta-icon-button slot="attachment-controls" flavor="subtle" shape="full" size="small" aria-label="Add a sticker">sticker</zeta-icon-button>
      </zeta-message-input>
    </div>`
};
