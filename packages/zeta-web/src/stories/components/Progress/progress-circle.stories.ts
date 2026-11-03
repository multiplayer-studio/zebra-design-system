import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressCircle } from "../../../components/progress-indicators/progress-circle/progress-circle.js";
import "../../../components/progress-indicators/progress-circle/progress-circle.js";
import { html } from "lit";
import { spreadGenerator } from "../../utils.js";
import { fn } from "@storybook/test";
const spread = spreadGenerator(ZetaProgressCircle);

type ProgressCircleStory = ZetaProgressCircle & {
  slot: string;
  subtitle: string;
  leading: string;
  oncancelupload: () => void;
  "--progress-circle-color"?: string;
};
const meta: Meta<ProgressCircleStory> = {
  component: "zeta-progress-circle",
  title: "Components/Progress",
  args: {
    progress: 75,
    size: "large",
    rounded: true,
    upload: false,
    showTrack: true,
    type: "default",
    oncancelupload: fn(),
    indeterminate: false
  },
  argTypes: {
    size: {
      options: ["xxsmall", "xsmall", "small", "medium", "large"],
      control: {
        type: "inline-radio"
      }
    },
    type: {
      options: ["default", "upload"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-77"
    },
    status: {
      type: "ready"
    }
  }
};

export const ProgressCircle: StoryObj<ProgressCircleStory> = {
  render: ({ oncancelupload, ...args }) => {
    return html`
      ${
        args["--progress-circle-color"] &&
        html`<style>
          zeta-progress-circle {
            --progress-circle-color: ${args["--progress-circle-color"]};
          }
        </style>`
      }
      <zeta-progress-circle @cancel-upload=${oncancelupload} ${spread(args)}></zeta-progress-circle>
    `;
  }
};

export default meta;
