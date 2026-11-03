import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaTabItem } from "../../../components/tab-bar/tab-item/tab-item.js";
import "../../../components/tab-bar/tab-item/tab-item.js";
import "../../../components/icon/icon.js";

const meta: Meta<ZetaTabItem> = {
  component: "zeta-tab-item",
  title: "Components/Tab Bar",
  args: {
    selected: false,
    disabled: false,
    showLeadingIcon: true,
    showBadge: false,
    badgeValue: 99
  },
  argTypes: { active: { table: { disable: true } } },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237"
    }
  }
};
export default meta;

export const Item: StoryObj<ZetaTabItem> = {
  render: args =>
    html`<zeta-tab-item
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      ?show-leading-icon=${args.showLeadingIcon}
      ?show-badge=${args.showBadge}
      badge-value=${args.badgeValue ?? 0}
      ><zeta-icon slot="icon">star</zeta-icon>Tab Item</zeta-tab-item
    >`
};
