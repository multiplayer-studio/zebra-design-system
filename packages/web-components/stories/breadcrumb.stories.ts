import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/breadcrumb/breadcrumb.js";

const CRUMBS = ["Sites", "North America", "Chicago", "Warehouse 12", "Receiving"];

const trail = (a: Record<string, unknown>, labels = CRUMBS) => html`<zds-breadcrumb
  flavour=${a.flavour as string}
  shape=${a.shape as string}
  .maxItems=${a.maxItems as number | null}
>
  ${labels.map((label) => html`<zds-breadcrumb-item href="#${label.toLowerCase().replace(/\s+/g, "-")}">${label}</zds-breadcrumb-item>`)}
  <zds-breadcrumb-item icon="location">Dock 4</zds-breadcrumb-item>
</zds-breadcrumb>`;

const meta: Meta = {
  title: "Components/Breadcrumb",
  component: "zds-breadcrumb",
  tags: ["autodocs"],
  argTypes: {
    flavour: { control: "inline-radio", options: ["default", "accent"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    maxItems: { control: { type: "number", min: 2 } },
  },
  args: { flavour: "default", shape: "rounded", maxItems: null },
  render: (a) => trail(a),
};
export default meta;
type Story = StoryObj;

const stack = (...children: unknown[]) => html`<div style="display:grid;gap:24px;justify-items:start">${children}</div>`;

export const Playground: Story = {};

/** The first crumb stays, then the rest from the end. The hidden middle opens from the overflow control. */
export const Collapsed: Story = { args: { maxItems: 4 } };

/** How the current page stands out. */
export const Flavours: Story = {
  render: (a) => stack(trail({ ...a, flavour: "default" }, ["Sites", "Receiving"]), trail({ ...a, flavour: "accent" }, ["Sites", "Receiving"])),
};

/** Corners of the overflow control and its menu. */
export const Shapes: Story = {
  render: (a) => stack(trail({ ...a, shape: "rounded", maxItems: 4 }), trail({ ...a, shape: "sharp", maxItems: 4 })),
};

/** A long trail wraps, and each new line starts on a crumb. */
export const Wrapping: Story = { render: (a) => html`<div style="inline-size:360px">${trail(a)}</div>` };
