import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatPhotos } from "../src/index.js";

const asset = (n: string) => new URL(`./assets/chat-message/${n}.jpg`, import.meta.url).href;
/* Images from the Figma Chat Message page (Message Sample). Five, so Count=more shows the spec's default "+2". */
const IMAGES = ["photo-lead", "photo-top", "photo-bottom", "video-poster-a", "video-poster-b"].map(asset);
const COUNTS = { "1": 1, "2": 2, "3": 3, more: 5 } as const;
type Count = keyof typeof COUNTS;

/** Story-only args: the spec's Count and a switch between real images and empty placeholder tiles. */
type PhotosArgs = React.ComponentProps<typeof ChatPhotos> & { count: Count; images: boolean };
const photosFor = (count: Count, images = true) => (images ? IMAGES : IMAGES.map(() => "")).slice(0, COUNTS[count]);

const meta: Meta<PhotosArgs> = {
  title: "Components/Chat Message/Photos",
  component: ChatPhotos,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19282" },
    docs: { description: { component: "Photos in a message's Attachment Slot, grouped into one grid. Count follows the number of images: one fills the width, two sit side by side, three put one large tile beside two stacked, and more shows the hidden total on the last tile. Subcomponent of `specs/chat-message`." } },
  },
  argTypes: {
    count: { control: "inline-radio", options: Object.keys(COUNTS), description: "Spec Count. Set by how many images you pass; more is four or over." },
    images: { control: "boolean", description: "Story only: real images, or empty tiles showing the placeholder." },
    showIcon: { control: "boolean", description: "The placeholder image glyph on a tile with no image." },
    rounded: { control: "boolean" },
    photos: { table: { disable: true } },
    alt: { table: { disable: true } },
    onOpen: { action: "open" },
  },
  args: { count: "3", images: true, showIcon: true, rounded: true },
  render: ({ count, images, ...a }) => <ChatPhotos {...a} photos={photosFor(count, images)} alt={(i) => `Photo ${i + 1}`} />,
};
export default meta;
type Story = StoryObj<PhotosArgs>;

export const Playground: Story = {};

const row = (cells: [string, React.ReactNode][]) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 24 }}>
    {cells.map(([cap, el]) => <div key={cap}><div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7, marginBlockEnd: 8 }}>{cap}</div>{el}</div>)}
  </div>
);

/** Count: 1, 2, 3 and more. More counts the hidden photos on the last tile. */
export const Count: Story = {
  render: () => row((Object.keys(COUNTS) as Count[]).map((c) => [`count ${c}`, <ChatPhotos photos={photosFor(c)} />])),
};

/** Show Icon: the placeholder glyph on empty tiles, on and off. Turn it off once tiles hold real images. */
export const ShowIcon: Story = {
  name: "Show Icon",
  render: () => row([["showIcon true", <ChatPhotos photos={photosFor("3", false)} />], ["showIcon false", <ChatPhotos photos={photosFor("3", false)} showIcon={false} />]]),
};

/** Rounded and sharp tiles. */
export const Rounded: Story = {
  render: () => row([["rounded", <ChatPhotos photos={photosFor("more")} rounded />], ["sharp", <ChatPhotos photos={photosFor("more")} rounded={false} />]]),
};
