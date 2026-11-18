import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing, type TemplateResult } from "lit";
import "../src/index.js";

const POSTER = new URL("./assets/chat-message/video-poster-a.jpg", import.meta.url).href;

type A = { type?: "file" | "video" | "audio"; playing?: boolean; fileName?: string; fileMeta?: string; duration?: string;
  poster?: string; showIcon?: boolean; rounded?: boolean; src?: string };
const attachment = (a: A) => html`<zds-chat-attachment type=${a.type ?? "file"} file-name=${a.fileName ?? "Delivery receipt.pdf"}
  file-meta=${a.fileMeta ?? "PDF · 248 KB"} duration=${a.duration ?? "0:08"} poster=${a.poster ?? nothing} src=${a.src || nothing}
  .showIcon=${a.showIcon ?? true} .rounded=${a.rounded ?? true} .playing=${a.playing ?? false}></zds-chat-attachment>`;

const meta: Meta = {
  title: "Components/Chat Message/Attachment",
  component: "zds-chat-attachment",
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19335" },
    docs: { description: { component: "A file, video or audio clip in a message's Attachment Slot. Send each video as its own attachment so it can preview. Playback is real when `src` is set. Subcomponent of `specs/chat-message`." } },
  },
  argTypes: {
    type: { control: "inline-radio", options: ["file", "video", "audio"] },
    playback: { control: "inline-radio", options: ["default", "active"], description: "Spec Playback, set through `playing`. Video and audio." },
    fileName: { control: "text", if: { arg: "type", eq: "file" } },
    fileMeta: { control: "text", if: { arg: "type", eq: "file" } },
    duration: { control: "text", if: { arg: "type", neq: "file" } },
    withPoster: { control: "boolean", description: "Story only: the video's poster image.", if: { arg: "type", eq: "video" } },
    showIcon: { control: "boolean", description: "The placeholder glyph while a video has no poster.", if: { arg: "type", eq: "video" } },
    rounded: { control: "boolean" },
    src: { control: "text" },
  },
  args: { type: "file", playback: "default", fileName: "Delivery receipt.pdf", fileMeta: "PDF · 248 KB", duration: "0:08", withPoster: true, showIcon: true, rounded: true, src: "" },
  render: (a) => html`<div style="max-inline-size:360px">${attachment({ ...a, playing: a.playback === "active", poster: a.withPoster ? POSTER : undefined })}</div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const row = (cells: [string, TemplateResult][]) => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:24px;align-items:start">
  ${cells.map(([cap, el]) => html`<div><div style="font:500 12px/1.4 system-ui;opacity:.7;margin-block-end:8px">${cap}</div>${el}</div>`)}
</div>`;

/** Type: a file tile with download, a video preview with play and duration, an audio waveform with play and duration. */
export const Type: Story = {
  render: () => row([["type file", attachment({})], ["type video", attachment({ type: "video", poster: POSTER })], ["type audio", attachment({ type: "audio" })]]),
};

/** Playback: default (not playing) and active (playing; play becomes pause, the waveform fills as it plays). A playing video shows pause on hover or focus. */
export const Playback: Story = {
  render: () => row([
    ["video · default", attachment({ type: "video", poster: POSTER })],
    ["video · active", attachment({ type: "video", poster: POSTER, playing: true })],
    ["audio · default", attachment({ type: "audio" })],
    ["audio · active", attachment({ type: "audio", playing: true })],
  ]),
};

/** Show Icon: the placeholder glyph on a video with no poster, on and off. */
export const ShowIcon: Story = {
  name: "Show Icon",
  render: () => row([["show-icon true", attachment({ type: "video" })], ["show-icon false", attachment({ type: "video", showIcon: false })]]),
};

/** A long file name truncates at the end; meta is type and size. */
export const LongFileName: Story = {
  render: () => html`<div style="max-inline-size:300px">${attachment({ fileName: "How to calibrate a printer requiring an update.pdf" })}</div>`,
};

/** Rounded and sharp, per type. */
export const Rounded: Story = {
  render: () => row((["file", "video", "audio"] as const).flatMap((t) => [true, false].map((r): [string, TemplateResult] =>
    [`${t} · ${r ? "rounded" : "sharp"}`, attachment({ type: t, rounded: r, poster: POSTER })]))),
};
