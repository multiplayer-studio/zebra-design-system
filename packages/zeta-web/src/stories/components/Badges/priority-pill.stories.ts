import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPriorityPill } from "../../../components/badges/priority-pill/priority-pill.js";
import { spreadGenerator } from "../../utils.js";
import { html } from "lit";

const spread = spreadGenerator(ZetaPriorityPill);

const meta: Meta<ZetaPriorityPill> = {
  title: "Components/Badges",
  component: "zeta-priority-pill",
  args: {
    rounded: true,
    status: "urgent",
    type: "lozenge",
    size: "large",
    leading: "icon"
  },
  argTypes: {
    status: {
      options: ["urgent", "high", "medium", "low"],
      control: { type: "inline-radio" }
    },
    size: {
      options: ["small", "large"],
      control: { type: "inline-radio" }
    },
    type: {
      options: ["badge", "lozenge"],
      control: { type: "inline-radio" }
    },
    leading: {
      options: ["icon", "number"],
      control: { type: "inline-radio" }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-410"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const PriorityPill: StoryObj = {
  render: args => {
    return html`
      <style>
        zeta-priority-pill {
          ${args["--priority-pill-index-background-color"] && html`--priority-pill-index-background-color: ${args["--priority-pill-index-background-color"]}`};
          ${args["--priority-pill-index-text-color"] && html`--priority-pill-index-text-color: ${args["--priority-pill-index-text-color"]}`};
          ${args["--priority-pill-text-color"] && html`--priority-pill-text-color: ${args["--priority-pill-text-color"]}`};
          ${args["--priority-pill-background-color"] && html`--priority-pill-background-color: ${args["--priority-pill-background-color"]}`};
        }
      </style>
      <zeta-priority-pill ${spread(args)}> </zeta-priority-pill>
    `;
  }
};

/** Every level as lozenge and badge, at both sizes. */
export const PriorityPillLevels: StoryObj = {
  render: () =>
    html`<div style="display: grid; grid-template-columns: repeat(4, max-content); gap: var(--space-sm); align-items: center;">
      ${(["large", "small"] as const).map(size =>
        (["lozenge", "badge"] as const).map(type =>
          (["low", "medium", "high", "urgent"] as const).map(
            status => html`<zeta-priority-pill status=${status} size=${size} type=${type}></zeta-priority-pill>`
          )
        )
      )}
    </div>`
};
