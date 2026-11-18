import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing, type TemplateResult } from "lit";
import type { ZetaChatAttachment } from "../../../components/chat-message/chat-media.js";
import "../../../components/chat-message/chat-media.js";

const POSTER = new URL("./assets/video-poster-a.jpg", import.meta.url).href;

/** Story-only args: the spec's Playback as an enum over `playing`, and a switch for the video poster. */
type AttachmentArgs = ZetaChatAttachment & { playback: "default" | "active"; withPoster: boolean };
type A = Partial<Pick<ZetaChatAttachment, "type" | "playing" | "fileName" | "fileMeta" | "duration" | "poster" | "showIcon" | "rounded" | "src">>;

const attachment = (a: A) =>
  html`<zeta-chat-attachment
    type=${a.type ?? "file"}
    fileName=${a.fileName ?? "Delivery receipt.pdf"}
    fileMeta=${a.fileMeta ?? "PDF · 248 KB"}
    duration=${a.duration ?? "0:08"}
    poster=${a.poster || nothing}
    src=${a.src || nothing}
    .showIcon=${a.showIcon ?? true}
    .rounded=${a.rounded ?? true}
    .playing=${a.playing ?? false}
  ></zeta-chat-attachment>`;

const meta: Meta<AttachmentArgs> = {
  component: "zeta-chat-attachment",
  title: "Components/Chat Message",
  args: {
    type: "file",
    playback: "default",
    fileName: "Delivery receipt.pdf",
    fileMeta: "PDF · 248 KB",
    duration: "0:08",
    withPoster: true,
    showIcon: true,
    rounded: true,
    src: ""
  },
  argTypes: {
    type: { options: ["file", "video", "audio"], control: { type: "inline-radio" } },
    playback: {
      options: ["default", "active"],
      control: { type: "inline-radio" },
      description: "Spec Playback, set through `playing`. Video and audio."
    },
    fileName: { control: { type: "text" }, if: { arg: "type", eq: "file" } },
    fileMeta: { control: { type: "text" }, if: { arg: "type", eq: "file" } },
    duration: { control: { type: "text" }, if: { arg: "type", neq: "file" } },
    withPoster: { control: { type: "boolean" }, description: "Story only: the video's poster image.", if: { arg: "type", eq: "video" } },
    showIcon: { control: { type: "boolean" }, if: { arg: "type", eq: "video" } },
    rounded: { control: { type: "boolean" } },
    src: { control: { type: "text" } },
    playing: { table: { disable: true } },
    poster: { table: { disable: true } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19335" },
    status: { type: "ready" }
  },
  render: ({ playback, withPoster, ...args }) =>
    html`<div style="max-inline-size: 360px">
      ${attachment({ ...args, playing: playback === "active", poster: withPoster ? POSTER : "" })}
    </div>`
};
export default meta;

const row = (cells: [string, TemplateResult][]) =>
  html`<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 24px; align-items: start">
    ${cells.map(
      ([cap, el]) => html`<div><div style="font: var(--text-label-small); color: var(--foreground-secondary); margin-block-end: 8px">${cap}</div>${el}</div>`
    )}
  </div>`;

/** A file, video or audio clip in a message's attachments. */
export const Attachment: StoryObj<AttachmentArgs> = {};

/** Type: a file tile with download, a video preview with play and duration, an audio waveform with play and duration. */
export const AttachmentType: StoryObj<AttachmentArgs> = {
  name: "Attachment Type",
  render: () =>
    row([
      ["type file", attachment({})],
      ["type video", attachment({ type: "video", poster: POSTER })],
      ["type audio", attachment({ type: "audio" })]
    ])
};

/** Playback: default (not playing) and active (playing; play becomes pause, the waveform fills as it plays). A playing video shows pause on hover or focus. */
export const AttachmentPlayback: StoryObj<AttachmentArgs> = {
  name: "Attachment Playback",
  render: () =>
    row([
      ["video · default", attachment({ type: "video", poster: POSTER })],
      ["video · active", attachment({ type: "video", poster: POSTER, playing: true })],
      ["audio · default", attachment({ type: "audio" })],
      ["audio · active", attachment({ type: "audio", playing: true })]
    ])
};

/** Show Icon: the placeholder glyph on a video with no poster, on and off. */
export const AttachmentShowIcon: StoryObj<AttachmentArgs> = {
  name: "Attachment Show Icon",
  render: () =>
    row([
      ["showIcon true", attachment({ type: "video" })],
      ["showIcon false", attachment({ type: "video", showIcon: false })]
    ])
};

/** A long file name truncates at the end; meta is type and size. */
export const AttachmentLongFileName: StoryObj<AttachmentArgs> = {
  name: "Attachment Long File Name",
  render: () => html`<div style="max-inline-size: 300px">${attachment({ fileName: "How to calibrate a printer requiring an update.pdf" })}</div>`
};

/** Rounded and sharp, per type. */
export const AttachmentRounded: StoryObj<AttachmentArgs> = {
  name: "Attachment Rounded",
  render: () =>
    row(
      (["file", "video", "audio"] as const).flatMap(t =>
        [true, false].map((r): [string, TemplateResult] => [`${t} · ${r ? "rounded" : "sharp"}`, attachment({ type: t, rounded: r, poster: POSTER })])
      )
    )
};
