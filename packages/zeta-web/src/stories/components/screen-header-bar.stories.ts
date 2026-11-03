import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaScreenHeaderBar } from "../../components/screen-header-bar/screen-header-bar.js";
import { html } from "lit";
import "../../components/screen-header-bar/screen-header-bar.js";
import "../../components/button/button.js";

const meta: Meta<ZetaScreenHeaderBar> = {
  title: "Components/Screen Header Bar",
  component: "zeta-screen-header-bar",
  args: {
    headline: "Add Subscribers",
    showLeadingIcon: true,
    rounded: true
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5712-3566"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const ScreenHeaderBar: StoryObj<ZetaScreenHeaderBar> = {
  render: args => html`
    <zeta-screen-header-bar headline=${args.headline} ?show-leading-icon=${args.showLeadingIcon} .rounded=${args.rounded}>
      <zeta-button slot="action">Button</zeta-button>
    </zeta-screen-header-bar>
  `
};
