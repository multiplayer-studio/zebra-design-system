import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaBreadcrumb } from "../../../components/breadcrumbs/breadcrumb.js";
import "../../../components/breadcrumbs/breadcrumb.js";
import "../../../components/icon/icon.js";
import { html } from "lit";

const meta: Meta<ZetaBreadcrumb> = {
  component: "zeta-breadcrumb",
  title: "Components/Breadcrumb",
  args: {
    rounded: true,
    flavor: "default",
    maxItems: 0,
    label: "Breadcrumb",
    overflowLabel: "Show hidden pages"
  },
  argTypes: {
    flavor: { options: ["default", "accent"], control: { type: "inline-radio" } },
    maxItems: { control: { type: "number", min: 0 } },
    disabled: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
    items: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-447"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

const crumbs = ["Sites", "North America", "Chicago", "Warehouse 12", "Receiving"];

const trail = (args: ZetaBreadcrumb, labels: string[]) =>
  html`<zeta-breadcrumb .rounded=${args.rounded} .flavor=${args.flavor} .maxItems=${args.maxItems} .label=${args.label} .overflowLabel=${args.overflowLabel}>
    ${labels.map(label => html`<zeta-breadcrumb-item href="#${label.toLowerCase().replace(/\s+/g, "-")}">${label}</zeta-breadcrumb-item>`)}
    <zeta-breadcrumb-item><zeta-icon slot="icon">location</zeta-icon>Dock 4</zeta-breadcrumb-item>
  </zeta-breadcrumb>`;

export const Breadcrumb2Items: StoryObj<ZetaBreadcrumb> = {
  render: args => trail(args, ["Sites"])
};

export const Breadcrumb3Items: StoryObj<ZetaBreadcrumb> = {
  render: args => trail(args, ["Sites", "Warehouse 12"])
};

export const Breadcrumb4Items: StoryObj<ZetaBreadcrumb> = {
  render: args => trail(args, ["Sites", "Warehouse 12", "Receiving"])
};

/** The first crumb stays, then the rest from the end. The hidden middle opens from the overflow control. */
export const BreadcrumbTruncated: StoryObj<ZetaBreadcrumb> = {
  args: { maxItems: 4 },
  render: args => trail(args, crumbs)
};

/** `accent` sets the current page and its icon in blue. */
export const BreadcrumbAccent: StoryObj<ZetaBreadcrumb> = {
  args: { flavor: "accent" },
  render: args => trail(args, ["Sites", "Warehouse 12", "Receiving"])
};

/** A long trail wraps, and each new line starts on a crumb. */
export const BreadcrumbWrapping: StoryObj<ZetaBreadcrumb> = {
  render: args => html`<div style="max-width:360px">${trail(args, crumbs)}</div>`
};
