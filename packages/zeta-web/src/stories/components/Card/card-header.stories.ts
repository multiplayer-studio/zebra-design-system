import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaCardHeader } from "../../../components/card/card-header/card-header.js";
import { spreadGenerator } from "../../utils.js";
const spread = spreadGenerator(ZetaCardHeader);
import "../../../components/avatar/avatar.js";
import "../../../components/button/icon-button/icon-button.js";

const meta: Meta<ZetaCardHeader> = {
  component: "zeta-card-header",
  title: "Components/Cards",
  args: {
    headline: "Headline",
    subHeadline: "Subhead"
  },
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

export const Header: StoryObj = {
  render: args => html` <zeta-card-header ${spread(args)}></zeta-card-header> `
};

export const HeaderWithLeadingContent: StoryObj = {
  render: args => html` <zeta-card-header ${spread(args)}><zeta-avatar slot="leading"></zeta-avatar></zeta-card-header> `
};

export const HeaderWithTrailingContent: StoryObj = {
  render: args => html`
    <zeta-card-header ${spread(args)}>
      <zeta-icon-button slot="trailing" flavor="text">more_vertical</zeta-icon-button>
    </zeta-card-header>
  `
};

export const HeaderWithLeadingAndTrailingContent: StoryObj = {
  render: args => html`
    <zeta-card-header ${spread(args)}>
      <zeta-avatar slot="leading"></zeta-avatar>
      <zeta-icon-button slot="trailing" flavor="text">more_vertical</zeta-icon-button>
    </zeta-card-header>
  `
};
