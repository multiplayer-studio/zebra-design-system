import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSystemBanner } from "../../components/system-banner/system-banner.js";
import { html } from "lit";
import "../../components/system-banner/system-banner.js";
import "../../components/button/button.js";

const meta: Meta<ZetaSystemBanner> = {
  title: "Components/System Banner",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146"
    },
    status: {
      type: "ready"
    }
  },
  component: "zeta-system-banner",
  args: {
    heading: "Banner Title",
    description: "",
    status: "default",
    layout: "desktop",
    showLeadingIcon: true,
    showClose: true,
    rounded: true
  },
  argTypes: {
    status: { options: ["default", "negative", "warning", "info"], control: { type: "select" } },
    layout: { options: ["desktop", "mobile"], control: { type: "inline-radio" } },
    align: { table: { disable: true } },
    text: { table: { disable: true } }
  }
};
export default meta;

export const Banner: StoryObj<ZetaSystemBanner> = {
  render: args =>
    html`<zeta-system-banner
      heading=${args.heading}
      description=${args.description}
      status=${args.status}
      layout=${args.layout}
      ?show-leading-icon=${args.showLeadingIcon}
      ?show-close=${args.showClose}
      .rounded=${args.rounded}
    >
      <zeta-button slot="actions" size="small" flavor="outline-contrast">Primary</zeta-button>
    </zeta-system-banner>`
};

/** Every status, single line and multiline on desktop, and the mobile layout. */
export const BannerStatuses: StoryObj<ZetaSystemBanner> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--space-md);">
      ${(["default", "negative", "warning", "info"] as const).map(
        s =>
          html`<zeta-system-banner status=${s} heading="Banner Title"
            ><zeta-button slot="actions" size="small" flavor="outline-contrast">Primary</zeta-button></zeta-system-banner
          >`
      )}
      <zeta-system-banner status="info" heading="Banner Title" description="A description that explains why."
        ><zeta-button slot="actions" size="small" flavor="outline-contrast">Primary</zeta-button></zeta-system-banner
      >
      <div style="width: 412px;">
        <zeta-system-banner layout="mobile" status="warning" heading="Banner Title" description="A description that explains why."
          ><zeta-button slot="actions" size="small" flavor="outline-contrast">Primary</zeta-button></zeta-system-banner
        >
      </div>
    </div>
  `
};
