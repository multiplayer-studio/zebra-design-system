import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaTabBar } from "../../../components/tab-bar/tab-bar.js";
import "../../../components/tab-bar/tab-bar.js";
import "../../../components/icon/icon.js";

const meta: Meta<ZetaTabBar> = {
  component: "zeta-tab-bar",
  title: "Components/Tab Bar",
  args: { flavor: "full-width" },
  argTypes: { flavor: { options: ["full-width", "condensed"], control: { type: "inline-radio" } } },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const TabBar: StoryObj<ZetaTabBar> = {
  render: args =>
    html`<zeta-tab-bar flavor=${args.flavor}>
      <zeta-tab-item selected><zeta-icon slot="icon">star</zeta-icon>Overview</zeta-tab-item>
      <zeta-tab-item><zeta-icon slot="icon">star</zeta-icon>Orders</zeta-tab-item>
      <zeta-tab-item show-badge badge-value="12" badge-label="12 new"><zeta-icon slot="icon">star</zeta-icon>Messages</zeta-tab-item>
      <zeta-tab-item disabled><zeta-icon slot="icon">star</zeta-icon>Archive</zeta-tab-item>
    </zeta-tab-bar>`
};
