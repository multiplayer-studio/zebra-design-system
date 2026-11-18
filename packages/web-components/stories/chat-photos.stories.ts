import type { Meta, StoryObj } from "@storybook/web-components";
import { html, type TemplateResult } from "lit";
import "../src/index.js";

const asset = (n: string) => new URL(`./assets/chat-message/${n}.jpg`, import.meta.url).href;
/* Images from the Figma Chat Message page (Message Sample). Five, so count more shows the spec's default "+2". */
const IMAGES = ["photo-lead", "photo-top", "photo-bottom", "video-poster-a", "video-poster-b"].map(asset);
const COUNTS = { "1": 1, "2": 2, "3": 3, more: 5 } as const;
type Count = keyof typeof COUNTS;
const photosFor = (count: Count, images = true) => (images ? IMAGES : IMAGES.map(() => "")).slice(0, COUNTS[count]);

const photos = (count: Count, o: { images?: boolean; showIcon?: boolean; rounded?: boolean; clickable?: boolean } = {}) =>
  html`<zds-chat-photos .photos=${photosFor(count, o.images ?? true)} .showIcon=${o.showIcon ?? true} .rounded=${o.rounded ?? true}
    ?clickable=${o.clickable ?? false}></zds-chat-photos>`;

const meta: Meta = {
  title: "Components/Chat Message/Photos",
  component: "zds-chat-photos",
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19282" },
    docs: { description: { component: "Photos in a message's Attachment Slot, grouped into one grid. `count` follows the number of images: one fills the width, two sit side by side, three put one large tile beside two stacked, and more shows the hidden total on the last tile. Subcomponent of `specs/chat-message`." } },
  },
  argTypes: {
    count: { control: "inline-radio", options: Object.keys(COUNTS), description: "Spec Count. Set from how many photos you pass; more is four or over." },
    images: { control: "boolean", description: "Story only: real images, or empty tiles showing the placeholder." },
    showIcon: { control: "boolean", description: "The placeholder image glyph on a tile with no image." },
    rounded: { control: "boolean" },
    clickable: { control: "boolean", description: "Tiles become buttons that fire `zds-open` with the index." },
    photos: { table: { disable: true } },
  },
  args: { count: "3", images: true, showIcon: true, rounded: true, clickable: false },
  render: (a) => photos(a.count, a),
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const row = (cells: [string, TemplateResult][]) => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:24px">
  ${cells.map(([cap, el]) => html`<div><div style="font:500 12px/1.4 system-ui;opacity:.7;margin-block-end:8px">${cap}</div>${el}</div>`)}
</div>`;

/** Count: 1, 2, 3 and more. More counts the hidden photos on the last tile. */
export const Count: Story = { render: () => row((Object.keys(COUNTS) as Count[]).map((c) => [`count ${c}`, photos(c)])) };

/** Show Icon: the placeholder glyph on empty tiles, on and off. Turn it off once tiles hold real images. */
export const ShowIcon: Story = {
  name: "Show Icon",
  render: () => row([["show-icon true", photos("3", { images: false })], ["show-icon false", photos("3", { images: false, showIcon: false })]]),
};

/** Rounded and sharp tiles. */
export const Rounded: Story = { render: () => row([["rounded", photos("more")], ["sharp", photos("more", { rounded: false })]]) };
