import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaLightbox, type LightboxItem } from "../../../components/lightbox/lightbox.js";
import "../../../components/lightbox/lightbox.js";
import "../../../components/button/button.js";

/* Everything previewed here is generated in the browser — no network. */
const scene = (name: string, sky: string, hill: string): LightboxItem => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="${sky}"/><circle cx="250" cy="60" r="32" fill="#ffd34d"/><path d="M0 240 120 110l70 70 50-50 80 80v30z" fill="${hill}"/></svg>`;
  return { file: new File([svg], name, { type: "image/svg+xml" }) };
};
const IMAGES: LightboxItem[] = [
  scene("Morning-ridge.svg", "#bfe0ff", "#2f7a4b"),
  scene("Evening-dunes.svg", "#ffd9b0", "#a3541f"),
  scene("Night-pass.svg", "#1d2a4a", "#0e1527")
];
const OTHER: LightboxItem = { file: new File(["zebra"], "Inventory-export.zip", { type: "application/zip" }) };

const meta: Meta<ZetaLightbox> = {
  component: "zeta-lightbox",
  title: "Components/Lightbox",
  args: {
    rounded: true,
    showOpenInNew: true,
    showDownload: true,
    showNavigation: true,
    animated: true
  },
  argTypes: {
    index: { control: { type: "number", min: 0, max: 2 } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8186-337"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

/** Opens over the page from a button; arrow keys and the side arrows page through three images. */
export const Lightbox: StoryObj<ZetaLightbox> = {
  render: args =>
    html`<zeta-button
        flavor="primary"
        @click=${(e: Event) => {
          void ((e.target as HTMLElement).parentElement?.querySelector("zeta-lightbox") as ZetaLightbox).showModal();
        }}
        >Open the lightbox</zeta-button
      >
      <zeta-lightbox
        .items=${IMAGES}
        .rounded=${args.rounded}
        .showOpenInNew=${args.showOpenInNew}
        .showDownload=${args.showDownload}
        .showNavigation=${args.showNavigation}
        .animated=${args.animated}
      ></zeta-lightbox>`
};

/** The panel in flow (initialOpen, non-modal), paging three images. */
export const Paging: StoryObj<ZetaLightbox> = {
  render: args => html`<zeta-lightbox initialOpen index="1" .items=${IMAGES} .rounded=${args.rounded}></zeta-lightbox>`
};

/** An unpreviewable file: the drawn sheet and "No preview for this file". */
export const NoPreview: StoryObj<ZetaLightbox> = {
  render: args => html`<zeta-lightbox initialOpen .items=${[OTHER]} .rounded=${args.rounded}></zeta-lightbox>`
};
