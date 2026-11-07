import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/icon-button/icon-button.js";
import "../src/components/top-app-bar/top-app-bar.js";

const TYPES = ["default", "centered", "contextual", "contextual alt", "search", "extended"] as const;
const action = (icon: string, label: string, slot: string) => html`<zds-icon-button slot=${slot} flavour="subtle" size="small" shape="rounded" icon=${icon} label=${label}></zds-icon-button>`;
const bar = (a: Record<string, unknown>) => html`<zds-top-app-bar type=${a.type} shape=${a.shape} page-title=${a.pageTitle} avatar-initials=${a.avatarInitials}>
  ${action("world", "Language", "trailing")} ${action("love", "Favourite", "trailing")} ${action("more-vertical", "More", "trailing")}
  ${action("edit", "Edit", "contextual-controls")} ${action("share", "Share", "contextual-controls")} ${action("delete", "Delete", "contextual-controls")} ${action("more-vertical", "More", "contextual-controls")}
</zds-top-app-bar>`;

const meta: Meta = {
  title: "Components/Top App Bar",
  component: "zds-top-app-bar",
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: TYPES },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
  },
  args: { type: "default", shape: "sharp", pageTitle: "Title", avatarInitials: "RK" },
  render: (a) => html`<div style="max-width:390px">${bar(a)}</div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Each value brings its own content. */
export const Types: Story = {
  render: () => html`<div style="display:grid;gap:16px;max-width:390px">${TYPES.map((type) => bar({ type, shape: "sharp", pageTitle: "Title", avatarInitials: "RK" }))}</div>`,
};

/** Shape sets the bar's own corner only. */
export const Shape: Story = {
  args: { shape: "rounded" },
};
