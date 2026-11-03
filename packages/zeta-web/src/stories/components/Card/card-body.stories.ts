import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaCardBody } from "../../../components/card/card-body/card-body.js";

const meta: Meta<ZetaCardBody> = {
  title: "Components/Cards",
  component: "zeta-card-body",
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Body: StoryObj<ZetaCardBody> = {
  render: () =>
    html`<zeta-card-body>
      Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliqua.
    </zeta-card-body>`
};
