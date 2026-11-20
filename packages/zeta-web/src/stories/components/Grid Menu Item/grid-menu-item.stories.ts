import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaIconNameList, type ZetaIconName } from "../../../icons.js";
import type { ZetaGridMenuItem } from "../../../components/grid-menu-item/grid-menu-item.js";
import "../../../components/grid-menu-item/grid-menu-item.js";
import "../../../components/badges/indicators/indicators.js";
import "../../../components/icon/icon.js";

const meta: Meta<ZetaGridMenuItem | { icon?: ZetaIconName }> = {
  component: "zeta-grid-menu-item",
  title: "Components/Grid Menu Item",
  tags: ["autodocs"],
  args: {
    rounded: true,
    active: false,
    icon: "camera",
    slot: "Camera",
    notificationValue: ""
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    notificationValue: {
      options: [true, false, "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2838-3508"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Item: StoryObj<ZetaGridMenuItem & { icon: ZetaIconName }> = {
  render: args => {
    return html`<zeta-grid-menu-item .rounded=${args.rounded} .active=${args.active} .notificationValue=${args.notificationValue}>
      <zeta-icon slot="icon">${args.icon}</zeta-icon>
      ${args.slot}
    </zeta-grid-menu-item>`;
  }
};
