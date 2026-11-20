import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAssistChip } from "../../../components/chips/assist-chip/assist-chip.js";
import { html } from "lit";
import { ZetaIconNameList } from "../../../icons.js";

const meta: Meta<ZetaAssistChip> = {
  component: "zeta-assist-chip",
  title: "Components/Chips",
  args: {
    rounded: true,
    disabled: false,
    icon: "star",
    slot: "Label"
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: "select"
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4423"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const AssistChip: StoryObj<ZetaAssistChip> = {
  render: args => html`<zeta-assist-chip ?rounded=${args.rounded} ?disabled=${args.disabled} .icon=${args.icon}>${args.slot}</zeta-assist-chip>`
};

/** Each colour, with and without the remove control, enabled and disabled. */
export const AssistChipStates: StoryObj<ZetaAssistChip> = {
  render: () =>
    html`<div style="display: grid; gap: var(--space-sm); justify-items: start;">
      ${(["neutral", "green", "orange", "blue", "red"] as const).map(
        color =>
          html`<div style="display: flex; gap: var(--space-sm);">
            <zeta-assist-chip color=${color} icon="star">Share</zeta-assist-chip>
            <zeta-assist-chip color=${color} icon="attachment" discardable discard-label="Remove file">report.pdf</zeta-assist-chip>
            <zeta-assist-chip color=${color} icon="star" disabled>Share</zeta-assist-chip>
          </div>`
      )}
    </div>`
};
