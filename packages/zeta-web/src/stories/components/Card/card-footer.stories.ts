import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaCardFooter } from "../../../components/card/card-footer/card-footer.js";
import "../../../components/button/button.js";

const meta: Meta<ZetaCardFooter> = {
  title: "Components/Cards",
  component: "zeta-card-footer",
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

export const FooterOneAction: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button>Button</zeta-button>
    </zeta-card-footer>`
};

export const FooterTwoActions: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button flavor="outline">Button</zeta-button>
      <zeta-button>Button</zeta-button>
    </zeta-card-footer>`
};

export const FooterOneActionLeft: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button flavor="text">Button</zeta-button>
    </zeta-card-footer>`
};
