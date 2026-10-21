import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/button-group/button-group.js";
import "../src/components/button/button.js";
import "../src/components/icon-button/icon-button.js";

const stack = (c: unknown) => html`<div style="display:grid;gap:16px;justify-items:start">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

/** Figma's sample content: leading verified, trailing expand-more. */
const figmaItems = () => ["Approve", "Review", "Assign", "Archive"].map(
  (l) => html`<zds-button leading-icon="verified" trailing-icon="expand-more">${l}</zds-button>`,
);
const fileItems = () => html`
  <zds-button leading-icon="edit">Edit</zds-button>
  <zds-button leading-icon="share">Share</zds-button>
  <zds-button leading-icon="download">Download</zds-button>
`;

const meta: Meta = {
  title: "Components/Buttons/Button Group",
  component: "zds-button-group",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "A row of peer actions on one bordered surface. Items are slotted `<zds-button>` / `<zds-icon-button>`; the group sets their size, pins them to subtle and draws a divider between every pair. Spec: specs/button-group." } } },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
  },
  args: { size: "medium", shape: "sharp", label: "File actions" },
  render: (a) => html`<zds-button-group size=${a.size} shape=${a.shape} label=${a.label}>${fileItems()}</zds-button-group>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`size\`: row height and every item's size together. */
export const Size: Story = {
  render: () => stack((["small", "medium", "large"] as const).map(
    (s) => html`${cap(s)}<zds-button-group label="Review actions" size=${s}>${figmaItems()}</zds-button-group>`,
  )),
};

/** Spec \`shape\`: only the group's outline and the outer ends of the first and last item round. */
export const Shape: Story = {
  render: () => stack((["sharp", "rounded"] as const).map(
    (s) => html`${cap(s)}<zds-button-group label="File actions" shape=${s}>${fileItems()}</zds-button-group>`,
  )),
};

/** Every size × shape: a divider between every pair, no overlap (fixes the three mis-assembled Figma variants). */
export const SizeByShape: Story = {
  render: () => stack((["small", "medium", "large"] as const).flatMap((size) =>
    (["sharp", "rounded"] as const).map(
      (shape) => html`${cap(`${size} / ${shape}`)}<zds-button-group label="File actions" size=${size} shape=${shape}>${fileItems()}</zds-button-group>`,
    ),
  )),
};

/** Spec \`items\`: any number of buttons, icon buttons or both. Hover, press and keyboard focus (Tab) come from each item. */
export const Items: Story = {
  render: () => stack(html`
    ${cap("two")}
    <zds-button-group label="Confirm" shape="rounded"><zds-button>Cancel</zds-button><zds-button>Save draft</zds-button></zds-button-group>
    ${cap("Figma sample (leading + trailing icon)")}
    <zds-button-group label="Review actions" shape="rounded">${figmaItems()}</zds-button-group>
    ${cap("icon buttons")}
    <zds-button-group label="History and zoom" shape="rounded">
      <zds-icon-button icon="undo" label="Undo"></zds-icon-button>
      <zds-icon-button icon="redo" label="Redo"></zds-icon-button>
      <zds-icon-button icon="zoom-in" label="Zoom in"></zds-icon-button>
      <zds-icon-button icon="zoom-out" label="Zoom out"></zds-icon-button>
    </zds-button-group>
    ${cap("mixed, one disabled")}
    <zds-button-group label="Message actions" shape="rounded">
      <zds-button leading-icon="send">Send</zds-button>
      <zds-button leading-icon="attachment" disabled>Attach</zds-button>
      <zds-icon-button icon="more-vertical" label="More options"></zds-icon-button>
    </zds-button-group>
  `),
};

export const ThemingCascade: Story = {
  render: () => html`
    <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(360px,1fr))">
      ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
        <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px;justify-items:start">
          ${cap(cls || "base / light")}
          <zds-button-group label="File actions">${fileItems()}</zds-button-group>
          <zds-button-group label="File actions" shape="rounded" size="small">${fileItems()}</zds-button-group>
          <zds-button-group label="History" shape="rounded">
            <zds-icon-button icon="undo" label="Undo"></zds-icon-button>
            <zds-icon-button icon="redo" label="Redo"></zds-icon-button>
            <zds-icon-button icon="more-vertical" label="More options" disabled></zds-icon-button>
          </zds-button-group>
        </div>
      `)}
    </div>
  `,
};
