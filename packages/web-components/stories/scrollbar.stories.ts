import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { ZdsScrollbar } from "../src/components/scrollbar/scrollbar.js";
import "../src/components/scrollbar/scrollbar.js";

const meta: Meta<ZdsScrollbar> = {
  title: "Components/Scrollbar",
  component: "zds-scrollbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The scroll indicator for a region that clips its content. The scrolling region owns the behaviour; the bar only reports position. Hover it: the track scrims and the handle darkens. Spec: specs/scrollbar.",
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
    value: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    size: { control: { type: "range", min: 0.05, max: 1, step: 0.01 } },
  },
  args: { orientation: "vertical", value: 0, size: 0.32 },
};
export default meta;
type Story = StoryObj<ZdsScrollbar>;

export const Playground: Story = {
  render: (a) => html`<zds-scrollbar orientation=${a.orientation} .value=${a.value} .size=${a.size}></zds-scrollbar>`,
};

/** The two axes draw the same bar: same padding, colours and radius. */
export const Orientation: Story = {
  render: () => html`<div style="display: flex; gap: 32px; align-items: flex-start">
    <zds-scrollbar .value=${0.3}></zds-scrollbar>
    <zds-scrollbar orientation="horizontal" .value=${0.3}></zds-scrollbar>
  </div>`,
};

/** The handle's length is the viewport's share of the content; its offset mirrors the scroll position. */
export const Values: Story = {
  render: () => html`<div style="display: flex; gap: 16px">
    <zds-scrollbar .value=${0}></zds-scrollbar>
    <zds-scrollbar .value=${0.5}></zds-scrollbar>
    <zds-scrollbar .value=${1}></zds-scrollbar>
    <zds-scrollbar .value=${0.25} .size=${0.7}></zds-scrollbar>
  </div>`,
};
