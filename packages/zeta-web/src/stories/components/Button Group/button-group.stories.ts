import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaButtonGroup } from "../../../components/button-group/button-group.js";
import "../../../components/button-group/button-group-item/button-group-item.js";
import { html } from "lit";
import { ZetaIconNameList, type ZetaIconName } from "@zebra-fed/zeta-icons";

const testFunc = () => console.log("Click");
const options = { testFunc, undefined };

const meta: Meta<ZetaButtonGroup> = {
  component: "zeta-button-group",
  title: "Components/Button Group",
  args: {
    rounded: true,
    size: "medium"
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" }
    },
    onclick: {
      options: Object.keys(options),
      mapping: options,
      control: {
        type: "select",
        labels: {
          testFunc: "Dropdown on",
          undefined: "Dropdown off"
        }
      }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5763-1251"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const ButtonGroup: StoryObj<ZetaButtonGroup & { count: number; showDropdown: boolean; icon?: ZetaIconName }> = {
  args: {
    icon: "star",
    count: 4,
    showDropdown: false
  },
  argTypes: {
    icon: {
      options: [null, ...ZetaIconNameList],
      control: {
        type: "select"
      }
    }
  },
  render: args => {
    const array = Array(args.count).fill(0);
    const mappedArray = array.map((_, index) => {
      return html`<zeta-button-group-item .onclick=${args.onclick} ?showDropdown=${args.showDropdown}>
        Label ${index} ${args.icon && html`<zeta-icon slot="icon">${args.icon}</zeta-icon>`}
      </zeta-button-group-item> `;
    });

    return html` <zeta-button-group .rounded=${args.rounded} size=${args.size}> ${mappedArray.flat()} </zeta-button-group> `;
  }
};

/** The three sizes, sharp and rounded. */
export const ButtonGroupSizes: StoryObj<ZetaButtonGroup> = {
  render: () =>
    html`<div style="display: grid; gap: var(--space-lg); justify-items: start;">
      ${(["small", "medium", "large"] as const).map(size =>
        [false, true].map(
          rounded =>
            html`<zeta-button-group size=${size} .rounded=${rounded}>
              <zeta-button-group-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-button-group-item>
              <zeta-button-group-item>Label</zeta-button-group-item>
              <zeta-button-group-item showDropdown>Label</zeta-button-group-item>
            </zeta-button-group>`
        )
      )}
    </div>`
};
