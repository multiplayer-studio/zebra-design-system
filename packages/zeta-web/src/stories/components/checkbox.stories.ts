import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "@storybook/test";
import { spreadGenerator } from "../utils";
import { ZetaCheckbox } from "../../components/checkbox/checkbox";

const spread = spreadGenerator(ZetaCheckbox);

const meta: Meta<ZetaCheckbox> = {
  component: "zeta-checkbox",
  title: "Components/Checkbox",
  tags: ["autodocs"],
  args: {
    rounded: true,
    disabled: false,
    checked: false,
    indeterminate: false,
    slot: undefined,
    name: "",
    id: "",
    onchange: fn(),
    oninput: fn()
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"]
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6382-52"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Checkbox: StoryObj<ZetaCheckbox> = {
  render: ({ slot, ...args }) => {
    return html` <zeta-checkbox ${spread(args)}>${slot}</zeta-checkbox> `;
  }
};
export const CheckboxWithLabel: StoryObj<ZetaCheckbox> = {
  args: { slot: "Checkbox Label" },
  render: Checkbox.render
};

/** Unchecked, checked and indeterminate, enabled and disabled, at medium and large. */
export const CheckboxStates: StoryObj<ZetaCheckbox> = {
  render: () =>
    html`<div style="display: grid; grid-template-columns: repeat(3, max-content); column-gap: var(--space-xl);">
      ${(["medium", "large"] as const).map(size =>
        [false, true].map(
          disabled => html`
            <zeta-checkbox size=${size} ?disabled=${disabled}>Off</zeta-checkbox>
            <zeta-checkbox size=${size} ?disabled=${disabled} checked>On</zeta-checkbox>
            <zeta-checkbox size=${size} ?disabled=${disabled} indeterminate>Mixed</zeta-checkbox>
          `
        )
      )}
    </div>`
};
