import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaBreadcrumbItem } from "../../../components/breadcrumbs/breadcrumb-item/breadcrumb-item.js";
import { html } from "lit";
import "../../../components/breadcrumbs/breadcrumb-item/breadcrumb-item.js";
import "../../../components/icon/icon.js";

const meta: Meta<ZetaBreadcrumbItem> = {
  component: "zeta-breadcrumb-item",
  title: "Components/Breadcrumb",
  args: {
    href: "#sites",
    current: false,
    separator: true,
    rounded: true
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7665-138"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const BreadcrumbItem: StoryObj<ZetaBreadcrumbItem> = {
  render: args => html`
    <zeta-breadcrumb-item .href=${args.href} .current=${args.current} .separator=${args.separator} .rounded=${args.rounded}>
      <zeta-icon slot="icon">location</zeta-icon>
      Sites
    </zeta-breadcrumb-item>
  `
};
