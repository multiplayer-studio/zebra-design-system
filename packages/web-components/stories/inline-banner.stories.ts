import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/inline-banner/inline-banner.js";
import "../src/components/button/button.js";

const STATUSES = ["neutral", "info", "positive", "warning", "negative"] as const;
const COPY: Record<(typeof STATUSES)[number], [string, string]> = {
  neutral: ["Printer profiles sync every hour", "Changes made on another device appear after the next sync."],
  info: ["A firmware update is available", "Version 3.0.3720 adds wireless roaming. Install it from Settings."],
  positive: ["Profile applied to 12 printers", "Every printer reported back with the new settings."],
  warning: ["Protected Mode is on", "Printer actions are unavailable until the security mode changes."],
  negative: ["The printer stopped responding", "Check the cable or network, then try again."],
};

/** Solid takes outline-contrast actions; subtle takes outline-subtle. */
const action = (appearance: string) =>
  html`<zds-button slot="actions" flavour=${appearance === "solid" ? "outline-contrast" : "outline-subtle"} size="small">Take action</zds-button>`;
const stack = (content: unknown) => html`<div style="display:grid;gap:16px">${content}</div>`;

type Args = { status: string; appearance: string; shape: string; heading: string; description: string; showIcon: boolean; showClose: boolean };

const meta: Meta<Args> = {
  title: "Components/Inline Banner",
  component: "zds-inline-banner",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: { description: { component: "A status message inside the content it is about. **Solid** is for the one message on a view that must be seen now. **Subtle** is for context and guidance that should be read without interrupting. Spec: specs/inline-banner." } },
  },
  argTypes: {
    status: { control: "inline-radio", options: STATUSES },
    appearance: { control: "inline-radio", options: ["subtle", "solid"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    showIcon: { control: "boolean" },
    showClose: { control: "boolean" },
  },
  args: { status: "info", appearance: "subtle", shape: "rounded", heading: COPY.info[0], description: COPY.info[1], showIcon: true, showClose: false },
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (a) => html`<zds-inline-banner status=${a.status} appearance=${a.appearance} shape=${a.shape} heading=${a.heading} description=${a.description}
    show-icon=${String(a.showIcon)} ?show-close=${a.showClose}>${action(a.appearance)}</zds-inline-banner>`,
};

/** Subtle: faint tint, status border, the status colour on the glyph only. */
export const Subtle: Story = {
  render: () => stack(STATUSES.map((s) => html`<zds-inline-banner status=${s} appearance="subtle" heading=${COPY[s][0]} description=${COPY[s][1]} show-close>${action("subtle")}</zds-inline-banner>`)),
};

/** Solid: strong fill, foreground/on-strong text; the controls draw light. */
export const Solid: Story = {
  render: () => stack(STATUSES.map((s) => html`<zds-inline-banner status=${s} appearance="solid" heading=${COPY[s][0]} description=${COPY[s][1]} show-close>${action("solid")}</zds-inline-banner>`)),
};

/** Shape: the corners, the actions and the dismiss follow it. */
export const Shape: Story = {
  render: () => stack(html`
    <zds-inline-banner shape="rounded" heading="Rounded" description=${COPY.info[1]} show-close>${action("subtle")}</zds-inline-banner>
    <zds-inline-banner shape="sharp" appearance="solid" heading="Sharp" description=${COPY.info[1]} show-close>${action("solid")}</zds-inline-banner>`),
};

/** Title only, no description or actions: the smallest form. */
export const Compact: Story = {
  render: () => stack(STATUSES.map((s) => html`<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    <zds-inline-banner status=${s} heading=${COPY[s][0]}></zds-inline-banner>
    <zds-inline-banner status=${s} appearance="solid" heading=${COPY[s][0]}></zds-inline-banner></div>`)),
};

/** Narrow: the text keeps its minimum width and the actions wrap beneath it. */
export const Narrow: Story = {
  render: () => html`<div style="inline-size:360px"><zds-inline-banner status="warning" heading=${COPY.warning[0]} description=${COPY.warning[1]} show-close>${action("subtle")}</zds-inline-banner></div>`,
};
