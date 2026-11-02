import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, type StepperStep } from "../src/index.js";

const STEPS: StepperStep[] = [
  { label: "Account", status: "complete" },
  { label: "Shipping", status: "complete" },
  { label: "Payment", subtitle: "Card or invoice", status: "active" },
  { label: "Confirmation", status: "upcoming" },
  { label: "Review", status: "upcoming" },
];

const meta: Meta<typeof Stepper> = {
  title: "Experimental/Stepper",
  component: Stepper,
  parameters: {
    docs: { description: { component: "**Experimental — no spec yet.** Built from the Stepper Experimental Figma page. Progress through a fixed sequence: complete, partial, active, upcoming, error and disabled steps, horizontal or vertical, and a mobile summary with a segmented bar. With `onStepSelect`, steps already reached become buttons." } },
  },
  args: { steps: STEPS, orientation: "horizontal", layout: "desktop" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    layout: { control: "inline-radio", options: ["desktop", "mobile"] },
  },
  render: (args) => <div style={{ inlineSize: args.orientation === "vertical" || args.layout === "mobile" ? 336 : 720 }}><Stepper {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {};

export const Vertical: Story = { args: { orientation: "vertical" } };

export const Mobile: Story = { args: { layout: "mobile" } };

/** Every status, from the `_Step` set. */
export const Statuses: Story = {
  args: {
    orientation: "vertical",
    steps: [
      { label: "Complete", status: "complete" },
      { label: "Partial", status: "partial" },
      { label: "Active", subtitle: "Supporting line", status: "active" },
      { label: "Error", status: "error" },
      { label: "Upcoming", status: "upcoming" },
      { label: "Disabled", status: "disabled" },
    ],
  },
};

/** Going back: completed steps are buttons. */
export const Interactive: Story = {
  render: function Interactive() {
    const [at, setAt] = React.useState(2);
    const steps = STEPS.map((s, i) => ({ ...s, subtitle: i === at ? s.subtitle ?? "In progress" : undefined, status: (i < at ? "complete" : i === at ? "active" : "upcoming") as StepperStep["status"] }));
    return <div style={{ inlineSize: 720 }}><Stepper steps={steps} onStepSelect={setAt} /></div>;
  },
};
