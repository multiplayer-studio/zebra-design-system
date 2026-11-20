import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDropdownMenuItem } from "../../../components/dropdown/menu-item/dropdown-menu-item.js";
import { ZetaIconNameList, type ZetaIconName } from "../../../icons.js";

const meta: Meta<ZetaDropdownMenuItem & { icon: ZetaIconName }> = {
  component: "zeta-dropdown-menu-item",
  title: "Components/Dropdown",
  args: {
    rounded: true,
    disabled: false,
    selected: false,
    type: "icon",
    icon: "star",
    slot: "Menu Item"
  },
  argTypes: {
    type: {
      options: ["icon", "checkbox", "radio"],
      control: { type: "inline-radio" }
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select"
      }
    },
    icon: {
      options: ZetaIconNameList,
      control: { type: "select" }
    },
    tabIndex: {
      table: { disable: true }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2364-5903"
    },
    status: { type: "ready" }
  }
};

export default meta;

export const DropdownMenuItem: StoryObj<ZetaDropdownMenuItem & { icon: ZetaIconName }> = {
  render: args =>
    html`<zeta-dropdown-menu-item .rounded=${args.rounded} .disabled=${args.disabled} .selected=${args.selected} type=${args.type} size=${args.size}>
      <zeta-icon .rounded=${args.rounded} slot="icon">${args.icon}</zeta-icon>
      ${args.slot}
    </zeta-dropdown-menu-item>`
};

/** Every type at rest, selected and disabled. Checkbox and radio rows lead with the real control and drop the gap. */
export const DropdownMenuItemTypes: StoryObj<ZetaDropdownMenuItem> = {
  render: args =>
    html`<div
      style="display: grid; grid-template-columns: repeat(3, 220px); gap: var(--space-2xs); padding: var(--space-card); background: var(--surface-overlay);"
    >
      ${(["icon", "checkbox", "radio"] as const).map(
        type => html`
          <zeta-dropdown-menu-item type=${type} .rounded=${args.rounded}><zeta-icon slot="icon">star</zeta-icon>Default</zeta-dropdown-menu-item>
          <zeta-dropdown-menu-item type=${type} .rounded=${args.rounded} selected><zeta-icon slot="icon">star</zeta-icon>Selected</zeta-dropdown-menu-item>
          <zeta-dropdown-menu-item type=${type} .rounded=${args.rounded} disabled><zeta-icon slot="icon">star</zeta-icon>Disabled</zeta-dropdown-menu-item>
        `
      )}
    </div>`
};
