import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatAttachment } from "../src/index.js";

const POSTER = new URL("./assets/chat-message/video-poster-a.jpg", import.meta.url).href;

/** Story-only args: the spec's Playback as an enum over `playing`, and a switch for the video poster. */
type AttachmentArgs = React.ComponentProps<typeof ChatAttachment> & { playback: "default" | "active"; withPoster: boolean };

const meta: Meta<AttachmentArgs> = {
  title: "Components/Chat Message/Attachment",
  component: ChatAttachment,
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
    playing: { table: { disable: true } },
    poster: { table: { disable: true } },
    src: { control: "text" },
    onDownload: { action: "download" },
  },
  args: { type: "file", playback: "default", fileName: "Delivery receipt.pdf", fileMeta: "PDF · 248 KB", duration: "0:08", withPoster: true, showIcon: true, rounded: true },
  render: ({ playback, withPoster, ...a }) => (
    <div style={{ maxInlineSize: 360 }}><ChatAttachment {...a} playing={playback === "active"} poster={withPoster ? POSTER : undefined} /></div>
  ),
};
export default meta;
type Story = StoryObj<AttachmentArgs>;

export const Playground: Story = {};

const row = (cells: [string, React.ReactNode][]) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 24, alignItems: "start" }}>
    {cells.map(([cap, el]) => <div key={cap}><div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7, marginBlockEnd: 8 }}>{cap}</div>{el}</div>)}
  </div>
);

/** Type: a file tile with download, a video preview with play and duration, an audio waveform with play and duration. */
export const Type: Story = {
  render: () => row([
    ["type file", <ChatAttachment fileName="Delivery receipt.pdf" fileMeta="PDF · 248 KB" />],
    ["type video", <ChatAttachment type="video" duration="0:08" poster={POSTER} />],
    ["type audio", <ChatAttachment type="audio" duration="0:08" />],
  ]),
};

/** Playback: default (not playing) and active (playing; play becomes pause, the waveform fills as it plays). A playing video shows pause on hover or focus. */
export const Playback: Story = {
  render: () => row([
    ["video · default", <ChatAttachment type="video" duration="0:08" poster={POSTER} />],
    ["video · active", <ChatAttachment type="video" duration="0:08" poster={POSTER} playing />],
    ["audio · default", <ChatAttachment type="audio" duration="0:08" />],
    ["audio · active", <ChatAttachment type="audio" duration="0:08" playing />],
  ]),
};

/** Show Icon: the placeholder glyph on a video with no poster, on and off. */
export const ShowIcon: Story = {
  name: "Show Icon",
  render: () => row([
    ["showIcon true", <ChatAttachment type="video" duration="0:08" />],
    ["showIcon false", <ChatAttachment type="video" duration="0:08" showIcon={false} />],
  ]),
};

/** A long file name truncates at the end; meta is type and size. */
export const LongFileName: Story = {
  render: () => <div style={{ maxInlineSize: 300 }}><ChatAttachment fileName="How to calibrate a printer requiring an update.pdf" fileMeta="PDF · 248 KB" /></div>,
};

/** Rounded and sharp, per type. */
export const Rounded: Story = {
  render: () => row((["file", "video", "audio"] as const).flatMap((t) => ([true, false] as const).map((r): [string, React.ReactNode] => [
    `${t} · ${r ? "rounded" : "sharp"}`, <ChatAttachment type={t} rounded={r} fileName="Delivery receipt.pdf" fileMeta="PDF · 248 KB" duration="0:08" poster={POSTER} />,
  ]))),
};
