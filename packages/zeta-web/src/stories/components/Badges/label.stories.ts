import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaLabel } from "../../../components/badges/label/label.js";

const meta: Meta<ZetaLabel> = {
  title: "Components/Badges",
  component: "zeta-label",
  args: {
    label: "Label",
    rounded: true,
    status: "neutral",
    bold: true,
    outlined: false
  },
  argTypes: {
    status: {
      options: ["neutral", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-328"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Label: StoryObj<ZetaLabel> = {};

/** Every status in the three forms: bold, outlined and plain. */
export const LabelForms: StoryObj<ZetaLabel> = {
  render: args =>
    html`<div style="display: grid; grid-template-columns: repeat(5, max-content); gap: var(--space-sm);">
      ${(
        [
          [true, false],
          [false, true],
          [false, false]
        ] as const
      ).map(([bold, outlined]) =>
        (["neutral", "info", "positive", "warning", "negative"] as const).map(
          status => html`<zeta-label status=${status} .bold=${bold} .outlined=${outlined} .rounded=${args.rounded}>${status}</zeta-label>`
        )
      )}
    </div>`
};
