import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFilterChip } from "../../../components/chips/filter-chip/filter-chip.js";
import { html } from "lit";
import { fn } from "@storybook/test";

const meta: Meta<ZetaFilterChip> = {
  component: "zeta-filter-chip",
  title: "Components/Chips",
  args: {
    active: false,
    rounded: false,
    slot: "Chip",
    disabled: false,
    onchange: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5126-3677"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const FilterChip: StoryObj<ZetaFilterChip> = {
  render: ({ slot, onchange, ...args }) =>
    html`<zeta-filter-chip ?disabled=${args.disabled} @change=${onchange} ?rounded=${args.rounded} ?active=${args.active}> ${slot} </zeta-filter-chip>`
};

/** Off, on and disabled, rounded and sharp. */
export const FilterChipStates: StoryObj<ZetaFilterChip> = {
  render: () =>
    html`<div style="display: grid; gap: var(--space-sm); justify-items: start;">
      ${[true, false].map(
        rounded =>
          html`<div style="display: flex; gap: var(--space-sm);">
            <zeta-filter-chip .rounded=${rounded}>In stock</zeta-filter-chip>
            <zeta-filter-chip .rounded=${rounded} active>In stock</zeta-filter-chip>
            <zeta-filter-chip .rounded=${rounded} disabled>In stock</zeta-filter-chip>
          </div>`
      )}
    </div>`
};
