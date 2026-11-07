import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { ZetaStepperItem } from "../../../components/stepper/stepper-item.js";
import "../../../components/stepper/stepper.js";

const STATUSES = ["default", "complete", "active", "partial", "error", "disabled"] as const;

type Args = ZetaStepperItem & { part: "horizontal" | "vertical" | "card" };

const meta: Meta<Args> = {
  component: "zeta-stepper-item",
  title: "Components/Stepper",
  args: { part: "vertical", status: "active", label: "Payment", subtitle: "Card", selectable: false },
  argTypes: {
    part: {
      name: "Drawn as",
      description: "Not a property: the parent stepper picks the part. Shown here by its variant and card.",
      options: ["horizontal", "vertical", "card"],
      control: { type: "inline-radio" }
    },
    status: { options: STATUSES, control: { type: "select" } },
    kind: { table: { disable: true } },
    shape: { table: { disable: true } },
    flavor: { table: { disable: true } },
    position: { table: { disable: true } },
    last: { table: { disable: true } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7357-18457" }
  }
};
export default meta;

/** One step, in the part its stepper asks for. */
export const Item: StoryObj<Args> = {
  render: args => html`<div style="inline-size:${args.part === "horizontal" ? 160 : 240}px">
    <zeta-stepper variant=${args.part === "horizontal" ? "horizontal" : "vertical"} ?card=${args.part === "card"} rounded>
      <zeta-stepper-item
        status=${args.status}
        label=${args.label}
        subtitle=${ifDefined(args.subtitle)}
        ?selectable=${args.selectable}
      ></zeta-stepper-item>
    </zeta-stepper>
  </div>`
};

/** Every status, in the part chosen under Drawn as. */
export const Statuses: StoryObj<Args> = {
  render: args => html`<div style="inline-size:${args.part === "horizontal" ? 760 : 240}px">
    <zeta-stepper variant=${args.part === "horizontal" ? "horizontal" : "vertical"} ?card=${args.part === "card"} rounded>
      ${STATUSES.map(s => html`<zeta-stepper-item status=${s} label=${s}></zeta-stepper-item>`)}
    </zeta-stepper>
  </div>`
};
