import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressBar } from "../../../components/progress-indicators/progress-bar/progress-bar.js";
import { html } from "lit";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaProgressBar);

const meta: Meta<ZetaProgressBar> = {
  component: "zeta-progress-bar",
  title: "Components/Progress",
  args: {
    rounded: true,
    size: "small",
    value: 0.5,
    buffer: 0.75,
    showTrack: true,
    label: "Loading...",
    indeterminate: false,
    buffering: false,
    maxValue: undefined
  },
  argTypes: {
    size: {
      options: ["small", "medium"],
      control: {
        type: "select"
      }
    },
    maxValue: {
      control: {
        type: "number"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-1997"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const ProgressBar: StoryObj = {
  render: ({ ...args }) => {
    return html`
      ${
        args["--progress-bar-color"] &&
        html`<style>
          zeta-progress-bar {
            --progress-bar-color: ${args["--progress-bar-color"]};
          }
        </style>`
      }
      <zeta-progress-bar ${spread(args)}></zeta-progress-bar>
    `;
  }
};
