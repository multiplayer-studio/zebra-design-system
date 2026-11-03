import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html } from "lit";
import { ZetaStatusLabel } from "../../../components/badges/status-label/status-label.js";

const meta: Meta<ZetaStatusLabel> = {
  title: "Components/Badges",
  component: "zeta-status-label",
  args: {
    rounded: true,
    status: "neutral",
    icon: undefined,
    label: "Label",
    showIcon: true,
    leading: "indicator",
    discardable: false
  },
  argTypes: {
    status: {
      options: ["neutral", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    },
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    leading: {
      options: ["indicator", "icon", "none"],
      control: { type: "inline-radio" }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-297"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const StatusLabel: StoryObj<ZetaStatusLabel> = {};

/** Every status at each leading, with the dismiss on the last column. */
export const StatusLabelForms: StoryObj<ZetaStatusLabel> = {
  render: () =>
    html`<div style="display: grid; grid-template-columns: repeat(4, max-content); gap: var(--space-sm);">
      ${(["neutral", "info", "positive", "warning", "negative"] as const).map(
        status => html`
          ${(["indicator", "icon", "none"] as const).map(leading => html`<zeta-status-label status=${status} leading=${leading} label=${status}></zeta-status-label>`)}
          <zeta-status-label status=${status} leading="icon" label=${status} discardable discard-label=${`Remove ${status}`}></zeta-status-label>
        `
      )}
    </div>`
};
