import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { ZetaStepper } from "../../../components/stepper/stepper.js";
import type { StepperItemStatus } from "../../../components/stepper/stepper-item.js";
import "../../../components/stepper/stepper.js";

const STEPS: Array<{ label: string; subtitle?: string; status: StepperItemStatus }> = [
  { label: "Account", status: "complete" },
  { label: "Shipping", status: "complete" },
  { label: "Payment", subtitle: "Card", status: "active" },
  { label: "Confirm", status: "default" },
  { label: "Review", status: "default" }
];

const items = (steps = STEPS) =>
  steps.map(
    s => html`<zeta-stepper-item status=${s.status} label=${s.label} subtitle=${ifDefined(s.subtitle)}></zeta-stepper-item>`
  );

const meta: Meta<ZetaStepper> = {
  component: "zeta-stepper",
  title: "Components/Stepper",
  args: {
    variant: "horizontal",
    size: "default",
    card: false,
    rounded: false,
    currentStep: "3",
    totalSteps: "5",
    label: "Payment",
    subtitle: "Card",
    showSubtitle: true,
    accessibleLabel: "Checkout"
  },
  argTypes: {
    variant: { options: ["horizontal", "vertical"], control: { type: "inline-radio" } },
    size: { options: ["default", "compact"], control: { type: "inline-radio" } },
    card: { control: { type: "boolean" } },
    rounded: { control: { type: "boolean" } },
    showSubtitle: { control: { type: "boolean" } },
    progress: { table: { disable: true } },
    progressBar: { table: { disable: true } },
    showOverflowButton: { table: { disable: true } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7357-18457" },
    status: { type: "ready" }
  },
  render: args => {
    const narrow = args.variant === "vertical" || args.size === "compact";
    return html`<div style="inline-size:${narrow ? 340 : 640}px">
      <zeta-stepper
        variant=${args.variant}
        size=${args.size}
        ?card=${args.card}
        ?rounded=${args.rounded}
        current-step=${args.currentStep}
        total-steps=${args.totalSteps}
        label=${args.label}
        subtitle=${ifDefined(args.subtitle)}
        .showSubtitle=${args.showSubtitle}
        accessible-label=${args.accessibleLabel}
        >${items(args.variant === "vertical" && args.card ? STEPS.slice(1, 4) : STEPS)}</zeta-stepper
      >
    </div>`;
  }
};
export default meta;

/** Horizontal, size default: every step named under its indicator. Use the controls to try every arrangement. */
export const Stepper: StoryObj<ZetaStepper> = {};

/** Horizontal, size compact: for mobile. The count and the current step's title above a bar of segments. */
export const Compact: StoryObj<ZetaStepper> = {
  args: { size: "compact", subtitle: "Card or invoice" }
};

/** Vertical: a rail, each label beside its indicator. */
export const Vertical: StoryObj<ZetaStepper> = {
  args: { variant: "vertical" }
};

/** Vertical with card: a column of Step Cards. `rounded` picks Step Card/Round over Step Card/Sharp. */
export const Cards: StoryObj<ZetaStepper> = {
  args: { variant: "vertical", card: true, rounded: true }
};
