import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, type BreadcrumbItem } from "../src/index.js";

const PATH: BreadcrumbItem[] = [
  { label: "Sites", href: "#sites" },
  { label: "North America", href: "#north-america" },
  { label: "Chicago", href: "#chicago" },
  { label: "Warehouse 12", href: "#warehouse-12" },
  { label: "Receiving", href: "#receiving" },
  { label: "Dock 4", icon: "location" },
];

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Where a page sits in the hierarchy, as a trail of links ending on the current page. `maxItems` collapses the middle into an overflow menu." } },
  },
  argTypes: {
    flavour: { control: "inline-radio", options: ["default", "accent"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    maxItems: { control: { type: "number", min: 2 } },
  },
  args: { items: PATH, flavour: "default", shape: "rounded" },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const stack = { display: "grid", gap: 24, justifyItems: "start" } as const;

export const Playground: Story = {};

/** Text crumbs, and a glyph before the current page. */
export const Depths: Story = {
  render: (args) => (
    <div style={stack}>
      <Breadcrumb {...args} items={[PATH[0], PATH[5]]} />
      <Breadcrumb {...args} items={[PATH[0], PATH[3], PATH[5]]} />
      <Breadcrumb {...args} items={[{ ...PATH[0], icon: "home" }, PATH[3], PATH[5]]} />
    </div>
  ),
};

/** The first crumb stays, then the rest from the end. The hidden middle opens from the overflow control. */
export const Collapsed: Story = { args: { maxItems: 4 } };

/** How the current page stands out. `accent` sets it and its icon in blue. */
export const Flavours: Story = {
  render: (args) => (
    <div style={stack}>
      <Breadcrumb {...args} flavour="default" />
      <Breadcrumb {...args} flavour="accent" />
    </div>
  ),
};

/** Corners of the overflow control and its menu. */
export const Shapes: Story = {
  render: (args) => (
    <div style={stack}>
      <Breadcrumb {...args} shape="rounded" maxItems={4} />
      <Breadcrumb {...args} shape="sharp" maxItems={4} />
    </div>
  ),
};

/** A long trail wraps rather than scrolling. */
export const Wrapping: Story = { render: (args) => <div style={{ inlineSize: 360 }}><Breadcrumb {...args} /></div> };
