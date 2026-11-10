import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/lightbox/lightbox.js";
import "../src/components/button/button.js";
import type { LightboxItem, LightboxShape, ZdsLightbox } from "../src/components/lightbox/lightbox.js";

/* Everything previewed here is generated in the browser — no network, as the
   react-baseui Lightbox stories. */
const scene = (name: string, sky: string, hill: string): LightboxItem => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="${sky}"/><circle cx="250" cy="60" r="32" fill="#ffd34d"/><path d="M0 240 120 110l70 70 50-50 80 80v30z" fill="${hill}"/></svg>`;
  return { file: new File([svg], name, { type: "image/svg+xml" }) };
};
const IMAGES: LightboxItem[] = [
  scene("Morning-ridge.svg", "#bfe0ff", "#2f7a4b"),
  scene("Evening-dunes.svg", "#ffd9b0", "#a3541f"),
  scene("Night-pass.svg", "#1d2a4a", "#0e1527"),
];
const OTHER: LightboxItem = { file: new File(["zebra"], "Inventory-export.zip", { type: "application/zip" }) };

type Args = {
  shape: LightboxShape;
  showOpenInNew: boolean;
  showDownload: boolean;
  showNavigation: boolean;
  animated: boolean;
};

const meta: Meta<Args> = {
  title: "Components/Lightbox",
  component: "zds-lightbox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A full-size preview over the page: images, videos and PDFs render themselves; anything else shows a drawn file sheet and “no preview”. The toolbar offers open in a new tab, download and close; previous / next page through the items with buttons or arrow keys, sliding a mounted track so nothing reloads, while the stage’s height follows the current frame. Built on the native `<dialog>` with `showModal()`, as `zds-dialog`. `inline` renders the panel in flow, always open, for documentation. Spec: specs/lightbox.",
      },
    },
  },
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    showOpenInNew: { control: "boolean" },
    showDownload: { control: "boolean" },
    showNavigation: { control: "boolean" },
    animated: { control: "boolean" },
  },
  args: { shape: "rounded", showOpenInNew: true, showDownload: true, showNavigation: true, animated: true },
};
export default meta;
type Story = StoryObj<Args>;

const assign = (items: LightboxItem[]) => (el: Element | undefined) => {
  if (el) (el as ZdsLightbox).items = items;
};

/** Opens over the page from a trigger; arrow keys and the side arrows page through three images. */
export const Playground: Story = {
  render: (args) => html`
    <zds-button
      flavour="primary"
      @click=${(e: Event) => {
        const lb = (e.target as HTMLElement).parentElement?.querySelector("zds-lightbox") as ZdsLightbox;
        lb.show(0);
      }}
      >Open the lightbox</zds-button
    >
    <zds-lightbox
      shape=${args.shape}
      show-open-in-new=${String(args.showOpenInNew)}
      show-download=${String(args.showDownload)}
      show-navigation=${String(args.showNavigation)}
      animated=${String(args.animated)}
      .items=${IMAGES}
    ></zds-lightbox>
  `,
};

/** The panel in flow (`inline`), one specimen per kind. */
export const Kinds: Story = {
  render: (args) => html`
    <div style="display:grid; gap: var(--space-xl); max-inline-size: 800px;">
      <zds-lightbox inline shape=${args.shape} .items=${IMAGES} index="1"></zds-lightbox>
      <zds-lightbox inline shape=${args.shape} .items=${[OTHER]}></zds-lightbox>
    </div>
  `,
};

/** Rounded beside sharp, inline. */
export const Shapes: Story = {
  render: () => html`
    <div style="display:grid; gap: var(--space-xl); max-inline-size: 800px;">
      <zds-lightbox inline shape="rounded" .items=${IMAGES}></zds-lightbox>
      <zds-lightbox inline shape="sharp" .items=${[OTHER]}></zds-lightbox>
    </div>
  `,
};

/** Every toolbar control hidden, leaving only close. */
export const MinimalToolbar: Story = {
  render: () => html`
    <zds-lightbox
      inline
      show-open-in-new="false"
      show-download="false"
      show-navigation="false"
      .items=${IMAGES}
      style="max-inline-size: 800px;"
    ></zds-lightbox>
  `,
};
