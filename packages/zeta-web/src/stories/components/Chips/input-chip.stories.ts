import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaInputChip } from "../../../components/chips/input-chip/input-chip.js";
import { html } from "lit";
import "../../../components/avatar/avatar.js";

const meta: Meta<ZetaInputChip> = {
  title: "Components/Chips",
  component: "zeta-input-chip",
  args: {
    rounded: false,
    slot: "Label"
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5125-3467"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const InputChip: StoryObj<ZetaInputChip> = {
  render: args =>
    html`<zeta-input-chip ?rounded=${args.rounded} ?disabled=${args.disabled}
      ><zeta-avatar slot="leading" size="xxxs">WW</zeta-avatar>${args.slot}</zeta-input-chip
    >`
};

/** A person with an avatar, a term without one, and disabled. */
export const InputChipStates: StoryObj<ZetaInputChip> = {
  render: () =>
    html`<div style="display: flex; gap: var(--space-sm);">
      <zeta-input-chip remove-label="Remove Jane Doe"><zeta-avatar slot="leading" size="xxxs">JD</zeta-avatar>Jane Doe</zeta-input-chip>
      <zeta-input-chip remove-label="Remove urgent">urgent</zeta-input-chip>
      <zeta-input-chip disabled>archived</zeta-input-chip>
    </div>`
};
