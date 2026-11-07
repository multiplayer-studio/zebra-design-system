import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/system-banner/system-banner.js";
import "../src/components/button/button.js";

const STATUSES = ["default", "negative", "warning", "info"] as const;
const DESCRIPTION = "Description of the badge goes here but avoid making multiple lines without braking the bank.";

/** The slot's default content: one small outline-contrast button. The banner sets its shape. */
const action = html`<zds-button slot="actions" flavour="outline-contrast" size="small">Primary</zds-button>`;
const stack = (content: unknown, width?: number) => html`<div style="display:grid;gap:16px;inline-size:${width ? `${width}px` : "100%"}">${content}</div>`;

type Args = { layout: string; status: string; shape: string; heading: string; description: string; showLeadingIcon: boolean; showClose: boolean };

const meta: Meta<Args> = {
  title: "Components/System Banner",
  component: "zds-system-banner",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: { description: { component: "A full-width status message pinned to the top of a screen or view. Locked to Dark: every element inside resolves dark tokens whatever mode the page is in. Spec: specs/system-banner-mobile, specs/system-banner-desktop." } },
  },
  argTypes: {
    layout: { control: "inline-radio", options: ["desktop", "mobile"] },
    status: { control: "inline-radio", options: STATUSES },
    showLeadingIcon: { control: "boolean" },
    showClose: { control: "boolean" },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
  },
  args: { layout: "desktop", status: "default", shape: "sharp", heading: "Banner Title", description: "", showLeadingIcon: true, showClose: true },
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (a) => html`<zds-system-banner layout=${a.layout} status=${a.status} shape=${a.shape} heading=${a.heading} description=${a.description}
    show-leading-icon=${String(a.showLeadingIcon)} show-close=${String(a.showClose)}>${action}</zds-system-banner>`,
};

/** Status sets the background and, on desktop, the glyph. negative has no dismiss. */
export const Status: Story = {
  render: () => stack(STATUSES.map((s) => html`<zds-system-banner status=${s} heading=${`Status ${s}`}>${action}</zds-system-banner>`)),
};

/** Desktop's Content Type: a description makes it multiline, with the actions beneath. */
export const ContentType: Story = {
  render: () => stack(html`
    <zds-system-banner heading="Banner Title">${action}</zds-system-banner>
    <zds-system-banner heading="Banner Title" description=${DESCRIPTION}>${action}</zds-system-banner>`),
};

/** The mobile layout: title, a description clamped at two lines and the action row beneath. */
export const Mobile: Story = {
  render: () => stack(STATUSES.map((s) => html`<zds-system-banner layout="mobile" status=${s} heading="Banner Title" description=${DESCRIPTION}>${action}</zds-system-banner>`), 412),
};

/** Each toggle off: no glyph, no actions, no dismiss. */
export const Minimal: Story = {
  render: () => stack(html`
    <zds-system-banner heading="Banner Title" show-leading-icon="false" show-close="false"></zds-system-banner>
    <zds-system-banner layout="mobile" heading="Banner Title" show-leading-icon="false" show-close="false" style="inline-size:412px"></zds-system-banner>`),
};

/** Locked to Dark: the banner and everything in it look the same in a light and a dark container. */
export const LockedToDark: Story = {
  render: () => html`<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    ${["mode-light", "mode-dark"].map((m) => html`<div class=${m} style="padding:16px;background:var(--surface-page)">
      <zds-system-banner status="info" heading=${m} description=${DESCRIPTION}>${action}</zds-system-banner></div>`)}
  </div>`,
};

/** One shape from the container: the action and the dismiss follow it; the banner stays square. */
export const Shape: Story = {
  render: () => stack(html`
    ${["sharp", "rounded"].map((sh) => html`<zds-system-banner shape=${sh} status="info" heading=${`shape ${sh}`}>${action}</zds-system-banner>`)}
    ${["sharp", "rounded"].map((sh) => html`<zds-system-banner layout="mobile" shape=${sh} status="info" heading=${`shape ${sh}`} description=${DESCRIPTION} style="inline-size:412px">${action}</zds-system-banner>`)}`),
};
