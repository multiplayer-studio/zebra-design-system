import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../components/avatar/avatar.js";

type AvatarRailArgs = {
  "show-close": boolean;
  size?: string;
};

const meta: Meta<AvatarRailArgs> = {
  component: "zeta-avatar-rail",
  title: "Components/Avatar Rail",
  tags: ["autodocs"],
  args: {
    "show-close": true,
    size: "m"
  },
  argTypes: {
    "show-close": { control: { type: "boolean" } },
    size: {
      options: ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21300-52147&t=8Ym0ztJUuB4iD83l-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const AvatarRail: StoryObj<AvatarRailArgs> = {
  render: args => {
    return html`
      <zeta-avatar-rail ?show-close=${args["show-close"]} size=${args.size}>
        <zeta-avatar>AD</zeta-avatar>
        <zeta-avatar>AB</zeta-avatar>
        <zeta-avatar>AC</zeta-avatar>
      </zeta-avatar-rail>
    `;
  }
};
