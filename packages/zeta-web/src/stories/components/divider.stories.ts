import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaDivider } from "../../components/divider/divider.js";
import { html } from "lit";
import "../../components/divider/divider.js";

const meta: Meta<ZetaDivider> = {
  title: "Components/Divider",
  component: "zeta-divider",
  args: {
    orientation: "horizontal"
  },
  argTypes: {
    orientation: { options: ["horizontal", "vertical"], control: { type: "inline-radio" } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8795"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

/** Horizontal between stacked content; vertical between side-by-side content, filling the row's height. */
export const Divider: StoryObj<ZetaDivider> = {
  render: args =>
    args.orientation === "vertical"
      ? html`<div style="display: flex; align-items: stretch; gap: var(--space-md); height: 40px; font: var(--text-body-medium)">
          <span>Left</span><zeta-divider orientation="vertical"></zeta-divider><span>Right</span>
        </div>`
      : html`<div style="display: flex; flex-direction: column; gap: var(--space-md); width: 320px; font: var(--text-body-medium)">
          <span>Above</span><zeta-divider></zeta-divider><span>Below</span>
        </div>`
};
