import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  HorizontalStepper, VerticalStepper, StepHorizontal, StepVertical, StepCard, StepSegment,
  type HorizontalStepperProps, type StepStatus,
} from "../src/index.js";

const STEPS: Array<{ label: string; subtitle?: string; status: StepStatus }> = [
  { label: "Account", status: "complete" },
  { label: "Shipping", status: "complete" },
  { label: "Payment", subtitle: "Card", status: "active" },
  { label: "Confirm", status: "default" },
  { label: "Review", status: "default" },
];
const STATUSES: StepStatus[] = ["default", "complete", "active", "partial", "error", "disabled"];

type PlaygroundArgs = HorizontalStepperProps;

const meta: Meta<PlaygroundArgs> = {
  title: "Components/Stepper",
  component: HorizontalStepper,
  subcomponents: { VerticalStepper, StepHorizontal, StepVertical, StepCard, StepSegment } as Record<string, React.ComponentType<unknown>>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Shows where a person is in a fixed sequence of steps. **Horizontal Stepper** holds `StepHorizontal`s, or on `compact` a summary above one `StepSegment` per step. **Vertical Stepper** holds `StepVertical`s, or with `card` a column of `StepCard`s. Each step sets its own `status`; keep exactly one `active`. Spec: specs/stepper.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["default", "compact"] },
    showSubtitle: { control: "boolean" },
  },
  args: { size: "default", currentStep: "3", totalSteps: "5", label: "Payment", subtitle: "Card", showSubtitle: true },
  render: (args) => (
    <div style={{ inlineSize: args.size === "compact" ? 340 : 640 }}>
      <HorizontalStepper {...args} aria-label="Checkout">
        {args.size === "compact"
          ? STEPS.map((s) => <StepSegment key={s.label} status={s.status} />)
          : STEPS.map((s) => <StepHorizontal key={s.label} {...s} />)}
      </HorizontalStepper>
    </div>
  ),
};
export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {};

/** Horizontal Stepper `size`: default names every step; compact names the current one above the bar. */
export const HorizontalSizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-3xl)" }}>
      <div style={{ inlineSize: 640 }}>
        <HorizontalStepper aria-label="Checkout">{STEPS.map((s) => <StepHorizontal key={s.label} {...s} />)}</HorizontalStepper>
      </div>
      <div style={{ inlineSize: 340 }}>
        <HorizontalStepper size="compact" aria-label="Checkout" currentStep="3" totalSteps="5" label="Payment" subtitle="Card or invoice">
          {[...STEPS.slice(0, 2), { ...STEPS[2], status: "partial" as StepStatus }, ...STEPS.slice(3)].map((s) => <StepSegment key={s.label} status={s.status} />)}
        </HorizontalStepper>
      </div>
    </div>
  ),
};

/** Vertical Stepper `card` × `rounded`: a rail, sharp cards and rounded cards. */
export const VerticalArrangements: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "var(--space-3xl)" }}>
      <div style={{ inlineSize: 220 }}>
        <VerticalStepper aria-label="Setup">{STEPS.map((s) => <StepVertical key={s.label} {...s} />)}</VerticalStepper>
      </div>
      <div style={{ inlineSize: 220 }}>
        <VerticalStepper card aria-label="Setup">{STEPS.slice(1, 4).map((s) => <StepCard key={s.label} {...s} />)}</VerticalStepper>
      </div>
      <div style={{ inlineSize: 220 }}>
        <VerticalStepper card rounded aria-label="Setup">{STEPS.slice(1, 4).map((s) => <StepCard key={s.label} {...s} />)}</VerticalStepper>
      </div>
    </div>
  ),
};

const Column = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: "var(--space-sm)", alignContent: "start", inlineSize: 220 }}>
    <span style={{ font: "var(--text-label-small)", color: "var(--foreground-secondary)" }}>{title}</span>
    {children}
  </div>
);

/** Every `status` on every step part, numbered by position. */
export const Statuses: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3xl)" }}>
      <Column title="Step / Vertical">
        <VerticalStepper aria-label="Statuses">
          {STATUSES.map((s) => <StepVertical key={s} status={s} label={s} subtitle={s === "active" ? "Subtitle" : undefined} />)}
        </VerticalStepper>
      </Column>
      <Column title="Step Card">
        <VerticalStepper card rounded aria-label="Statuses">
          {STATUSES.map((s) => <StepCard key={s} status={s} label={s} />)}
        </VerticalStepper>
      </Column>
      <Column title="Step Segment">
        {STATUSES.map((s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
            <ol style={{ display: "flex", flex: 1, margin: 0, padding: 0, listStyle: "none" }}><StepSegment status={s} /></ol>
            <span style={{ font: "var(--text-body-small)", inlineSize: 64 }}>{s}</span>
          </div>
        ))}
      </Column>
      <div style={{ inlineSize: "100%" }}>
        <Column title="Step / Horizontal">
          <div style={{ inlineSize: 760 }}>
            <HorizontalStepper aria-label="Statuses">
              {STATUSES.map((s) => <StepHorizontal key={s} status={s} label={s} />)}
            </HorizontalStepper>
          </div>
        </Column>
      </div>
    </div>
  ),
};

/** `showSubtitle` and `showLine` on a step. The last step drops its line on its own. */
export const SubtitlesAndLines: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-3xl)" }}>
      <div style={{ inlineSize: 640 }}>
        <HorizontalStepper aria-label="Subtitles">
          {STEPS.map((s) => <StepHorizontal key={s.label} {...s} subtitle="Subtitle" />)}
        </HorizontalStepper>
      </div>
      <div style={{ inlineSize: 220 }}>
        <VerticalStepper aria-label="Subtitles">
          {STEPS.map((s) => <StepVertical key={s.label} {...s} subtitle="A longer subtitle that wraps" />)}
        </VerticalStepper>
      </div>
    </div>
  ),
};

/** Going back: with `onSelect`, a step's text becomes a button. */
export const GoingBack: Story = {
  render: function GoingBack() {
    const [at, setAt] = React.useState(2);
    const status = (i: number): StepStatus => (i < at ? "complete" : i === at ? "active" : "default");
    return (
      <div style={{ inlineSize: 640 }}>
        <HorizontalStepper aria-label="Checkout">
          {STEPS.map((s, i) => <StepHorizontal key={s.label} label={s.label} status={status(i)} onSelect={i < at ? () => setAt(i) : undefined} />)}
        </HorizontalStepper>
      </div>
    );
  },
};
