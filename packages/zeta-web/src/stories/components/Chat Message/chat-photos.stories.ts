import type { Meta, StoryObj } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import type { ZetaChatPhotos } from "../../../components/chat-message/chat-media.js";
import "../../../components/chat-message/chat-media.js";

const asset = (n: string) => new URL(`./assets/${n}.jpg`, import.meta.url).href;
/* Images from the Figma Chat Message page (Message Sample). Five, so count more shows the spec's default "+2". */
const IMAGES = ["photo-lead", "photo-top", "photo-bottom", "video-poster-a", "video-poster-b"].map(asset);
const COUNTS = { "1": 1, "2": 2, "3": 3, more: 5 } as const;
type Count = keyof typeof COUNTS;
const photosFor = (count: Count, images = true) => (images ? IMAGES : IMAGES.map(() => "")).slice(0, COUNTS[count]);

/** Story-only args: the spec's Count, and real images or empty placeholder tiles. */
type PhotosArgs = Omit<ZetaChatPhotos, "count"> & { count: Count; images: boolean };

const photos = (count: Count, o: { images?: boolean; showIcon?: boolean; rounded?: boolean; clickable?: boolean } = {}) =>
  html`<zeta-chat-photos
    .photos=${photosFor(count, o.images ?? true)}
    .showIcon=${o.showIcon ?? true}
    .rounded=${o.rounded ?? true}
    ?clickable=${o.clickable ?? false}
  ></zeta-chat-photos>`;

const meta: Meta<PhotosArgs> = {
  component: "zeta-chat-photos",
  title: "Components/Chat Message",
  args: { count: "3", images: true, showIcon: true, rounded: true, clickable: false },
  argTypes: {
    count: {
      options: Object.keys(COUNTS),
      control: { type: "inline-radio" },
      description: "Spec Count. Set from how many photos you pass; more is four or over."
    },
    images: { control: { type: "boolean" }, description: "Story only: real images, or empty tiles showing the placeholder." },
    showIcon: { control: { type: "boolean" } },
    rounded: { control: { type: "boolean" } },
    clickable: { control: { type: "boolean" } },
    photos: { table: { disable: true } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19282" },
    status: { type: "ready" }
  },
  render: args => photos(args.count, args)
};
export default meta;

const row = (cells: [string, TemplateResult][]) =>
  html`<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 24px">
    ${cells.map(
      ([cap, el]) => html`<div><div style="font: var(--text-label-small); color: var(--foreground-secondary); margin-block-end: 8px">${cap}</div>${el}</div>`
    )}
  </div>`;

/** Photos in a message's attachments, grouped into one grid. */
export const Photos: StoryObj<PhotosArgs> = {};

/** Count: 1, 2, 3 and more. More counts the hidden photos on the last tile. */
export const PhotosCount: StoryObj<PhotosArgs> = {
  name: "Photos Count",
  render: () => row((Object.keys(COUNTS) as Count[]).map(c => [`count ${c}`, photos(c)]))
};

/** Show Icon: the placeholder glyph on empty tiles, on and off. Turn it off once tiles hold real images. */
export const PhotosShowIcon: StoryObj<PhotosArgs> = {
  name: "Photos Show Icon",
  render: () =>
    row([
      ["showIcon true", photos("3", { images: false })],
      ["showIcon false", photos("3", { images: false, showIcon: false })]
    ])
};

/** Rounded and sharp tiles. */
export const PhotosRounded: StoryObj<PhotosArgs> = {
  name: "Photos Rounded",
  render: () =>
    row([
      ["rounded", photos("more")],
      ["sharp", photos("more", { rounded: false })]
    ])
};
