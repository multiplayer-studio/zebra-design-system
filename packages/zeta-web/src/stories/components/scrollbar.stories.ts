import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaScrollbar } from "../../components/scrollbar/scrollbar.js";
import { html } from "lit";
import "../../components/scrollbar/scrollbar.js";

const meta: Meta<ZetaScrollbar> = {
  title: "Components/Scrollbar",
  component: "zeta-scrollbar",
  args: {
    orientation: "vertical",
    value: 0,
    size: 0.32
  },
  argTypes: {
    orientation: { options: ["vertical", "horizontal"], control: { type: "inline-radio" } },
    value: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    size: { control: { type: "range", min: 0.05, max: 1, step: 0.01 } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6057-11947"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

/** Hover the bar: the track scrims and the handle darkens. The scrolling region owns the behaviour; the bar only reports position. */
export const Scrollbar: StoryObj<ZetaScrollbar> = {
  render: args => html`<zeta-scrollbar orientation=${args.orientation} .value=${args.value} .size=${args.size}></zeta-scrollbar>`
};

/** The two axes draw the same bar: same padding, colours and radius. */
export const Orientation: StoryObj<ZetaScrollbar> = {
  render: () => html`<div style="display: flex; gap: var(--space-xl); align-items: flex-start">
    <zeta-scrollbar .value=${0.3}></zeta-scrollbar>
    <zeta-scrollbar orientation="horizontal" .value=${0.3}></zeta-scrollbar>
  </div>`
};

/** The handle's length is the viewport's share of the content; its offset mirrors the scroll position. */
export const Values: StoryObj<ZetaScrollbar> = {
  render: () => html`<div style="display: flex; gap: var(--space-lg)">
    <zeta-scrollbar .value=${0}></zeta-scrollbar>
    <zeta-scrollbar .value=${0.5}></zeta-scrollbar>
    <zeta-scrollbar .value=${1}></zeta-scrollbar>
    <zeta-scrollbar .value=${0.25} .size=${0.7}></zeta-scrollbar>
  </div>`
};
